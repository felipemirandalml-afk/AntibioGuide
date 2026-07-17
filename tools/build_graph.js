#!/usr/bin/env node
/**
 * @fileoverview BUILD GRAPH EXPLORER
 *
 * Construye el grafo clínico (síndrome ↔ patógeno ↔ antibiótico) desde la capa de
 * datos y lo inyecta en `tools/graph_template.html` para emitir un explorador
 * visual autocontenido en `research/graph.html`.
 *
 * Herramienta de AUDITORÍA — no es runtime. No modifica `/data`.
 *
 *   node tools/build_graph.js            → escribe research/graph.html
 *   node tools/build_graph.js --json     → además escribe research/graph.json
 *
 * MODELO DEL GRAFO
 *   nodos  syndrome · pathogen · drug
 *   aristas
 *     caused_by   syndrome—pathogen   union de syndrome.pathogenIds y
 *                                     pathogen.clinical.usualSyndromes.
 *                                     `dir` registra qué lado declara el enlace.
 *     treated_by  syndrome—drug       de regimens[].drugIds
 *     resistant_to pathogen—drug      de resistance.intrinsic/typicalAcquired.
 *                                     Signo OPUESTO a treated_by: "no sirve contra".
 *
 * Las entradas de resistencia que no resuelven a un id de antibiótico son prosa
 * (una clase como "Beta-lactámicos" o un mecanismo como "BLEE"), no una omisión:
 * se cuentan aparte y se reportan, nunca se descartan en silencio.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const syndromes = require(path.join(ROOT, "data/syndromes.js"));
const pathogens = require(path.join(ROOT, "data/pathogens.js"));
const antibiotics = require(path.join(ROOT, "data/antibiotics.js"));
const meta = require(path.join(ROOT, "data/meta.js"));

const sById = new Map(syndromes.map((s) => [s.id, s]));
const pById = new Map(pathogens.map((p) => [p.id, p]));
const aById = new Map(antibiotics.map((a) => [a.id, a]));

// `gram` mezcla vocabularios (atypical/atípico, fúngico/hongo): normalizar para agrupar.
const GRAM_CANON = {
  positive: "Gram +",
  negative: "Gram −",
  atypical: "Atípico",
  "atípico": "Atípico",
  variable: "Variable",
  "fúngico": "Hongo",
  hongo: "Hongo",
};

const nodes = [];
const edges = [];
const issues = [];

/**
 * Etiqueta corta para dibujar sobre el canvas (hasta 65 caracteres no caben).
 * El nombre clínico ya suele traer su forma corta: "Neumonía Adquirida en la
 * Comunidad (NAC)" → "NAC", que además es como se le dice. El nombre completo
 * sigue estando en el tooltip y en el panel de detalle.
 */
function shortLabel(name) {
  const m = name.match(/\(([^)]{2,10})\)\s*$/);
  if (m && m[1] === m[1].toUpperCase()) return m[1]; // acrónimo: "(NAVM)", "(ITS/CVC)"
  let s = name.replace(/\s*\([^)]*\)\s*$/, ""); // paréntesis no-acrónimo: "(adultos)"
  s = s.split(" / ")[0]; // "Fascitis Necrotizante / Infección…" → primera forma
  return s.length > 28 ? s.slice(0, 27) + "…" : s;
}

// --- NODOS ---------------------------------------------------------------
syndromes.forEach((s) => {
  nodes.push({
    id: s.id,
    type: "syndrome",
    label: s.name,
    short: shortLabel(s.name),
    sub: `${(s.regimens || []).length} esquema(s)`,
    desc: s.description || "",
    group: null,
    regimens: (s.regimens || []).length,
  });
});

pathogens.forEach((p) => {
  const gramRaw = p.taxonomy && p.taxonomy.gram;
  nodes.push({
    id: p.id,
    type: "pathogen",
    label: p.shortName || p.name,
    short: shortLabel(p.shortName || p.name),
    sub: GRAM_CANON[gramRaw] || gramRaw || "—",
    desc: (p.clinical && p.clinical.summary) || "",
    group: (p.taxonomy && p.taxonomy.group) || null,
    gram: GRAM_CANON[gramRaw] || "—",
    gramRaw: gramRaw || null,
  });
});

antibiotics.forEach((a) => {
  const cm = a.clinical_metadata || {};
  nodes.push({
    id: a.id,
    type: "drug",
    label: a.name,
    short: shortLabel(a.name),
    sub: a.family || "—",
    desc: a.spectrum || "",
    group: a.family || null,
    aware: cm.aware || null,
  });
});

// --- ARISTAS: síndrome ↔ patógeno (union bidireccional) -------------------
const causedBy = new Map(); // "sid|pid" -> {fwd, back}
syndromes.forEach((s) => {
  (s.pathogenIds || []).forEach((pid) => {
    if (pid == null) {
      issues.push({ kind: "hueco_array", detail: `${s.id}.pathogenIds contiene un hueco` });
      return;
    }
    if (!pById.has(pid)) {
      issues.push({ kind: "ref_rota", detail: `${s.id} → patógeno inexistente "${pid}"` });
      return;
    }
    const k = `${s.id}|${pid}`;
    causedBy.set(k, { ...(causedBy.get(k) || {}), fwd: true });
  });
});

const backlogRefs = [];
pathogens.forEach((p) => {
  ((p.clinical && p.clinical.usualSyndromes) || []).forEach((sid) => {
    if (!sById.has(sid)) {
      // Síndrome del backlog planificado (lo gestiona el validador), no un bug.
      backlogRefs.push({ pathogen: p.id, syndrome: sid });
      return;
    }
    const k = `${sid}|${p.id}`;
    causedBy.set(k, { ...(causedBy.get(k) || {}), back: true });
  });
});

causedBy.forEach((v, k) => {
  const [sid, pid] = k.split("|");
  edges.push({
    s: sid,
    t: pid,
    rel: "caused_by",
    dir: v.fwd && v.back ? "both" : v.fwd ? "fwd" : "back",
  });
});

// --- ARISTAS: síndrome → fármaco -----------------------------------------
const treats = new Map(); // "sid|did" -> Set(regimen names)
syndromes.forEach((s) => {
  (s.regimens || []).forEach((r) => {
    (r.drugIds || []).forEach((did) => {
      if (!aById.has(did)) {
        issues.push({ kind: "ref_rota", detail: `${s.id} → fármaco inexistente "${did}"` });
        return;
      }
      const k = `${s.id}|${did}`;
      if (!treats.has(k)) treats.set(k, { types: new Set(), regs: [] });
      treats.get(k).types.add(r.type || "—");
      treats.get(k).regs.push(r.name || "—");
    });
  });
});
treats.forEach((v, k) => {
  const [sid, did] = k.split("|");
  edges.push({
    s: sid,
    t: did,
    rel: "treated_by",
    empiric: v.types.has("empiric"),
    regs: v.regs,
  });
});

// --- ARISTAS: patógeno → fármaco (resistencia; signo negativo) ------------
/*
 * Lo que no resuelve a un id NO es todo lo mismo, y mezclarlo esconde el problema:
 *
 *  - PROSA: lleva espacios, mayúsculas o paréntesis. Es una clase ("Beta-lactámicos")
 *    o un mecanismo ("BLEE", "Meticilina (MRSA)"). Nunca fue un id y no puede
 *    apuntar a un fármaco único. Esperable.
 *  - VOCABULARIO DIVERGENTE: tiene forma de id (snake_case) pero no existe —
 *    `fosfomicina` cuando el id es `fosfomicina_trometamol`, `tetraciclinas` cuando
 *    es `tetraciclina`, `penicilina_g` que no existe en ninguna forma. Fue escrito
 *    para enlazar y no enlaza. Accionable.
 */
const ID_SHAPED = /^[a-z0-9_]+$/;
let resProse = [];
let resDrift = [];
pathogens.forEach((p) => {
  const r = p.resistance || {};
  const walk = (list, kind) =>
    (list || []).forEach((x) => {
      if (typeof x !== "string") return;
      if (aById.has(x)) {
        edges.push({ s: p.id, t: x, rel: "resistant_to", kind });
      } else if (ID_SHAPED.test(x)) {
        // Sugerir el id más cercano: comparten prefijo o uno contiene al otro.
        const stem = x.split("_")[0];
        const near = antibiotics
          .map((a) => a.id)
          .filter((id) => id.startsWith(stem) || x.startsWith(id.split("_")[0]));
        resDrift.push({ pathogen: p.id, kind, text: x, near: near.slice(0, 3) });
      } else {
        resProse.push({ pathogen: p.id, kind, text: x });
      }
    });
  walk(r.intrinsic, "intrinsic");
  walk(r.typicalAcquired, "acquired");
});

// --- GRADOS Y HUÉRFANOS ---------------------------------------------------
const deg = new Map(nodes.map((n) => [n.id, 0]));
edges.forEach((e) => {
  deg.set(e.s, (deg.get(e.s) || 0) + 1);
  deg.set(e.t, (deg.get(e.t) || 0) + 1);
});
nodes.forEach((n) => (n.deg = deg.get(n.id) || 0));

// Huérfano = grado 0 contando AMBAS direcciones (misma definición que audit_syndromes.js).
const orphans = nodes.filter((n) => n.deg === 0);

// Un fármaco puede tener grado > 0 solo por aristas de resistencia y aun así no
// usarse en ningún régimen: es vademécum sin uso empírico, distinto de huérfano.
const usedDrugIds = new Set(edges.filter((e) => e.rel === "treated_by").map((e) => e.t));
const drugsNoRegimen = nodes.filter((n) => n.type === "drug" && !usedDrugIds.has(n.id));

const asymmetric = edges.filter((e) => e.rel === "caused_by" && e.dir !== "both");

// Vocabulario `gram` inconsistente (dos etiquetas para el mismo concepto).
const gramRawCounts = {};
nodes
  .filter((n) => n.type === "pathogen")
  .forEach((n) => {
    gramRawCounts[n.gramRaw] = (gramRawCounts[n.gramRaw] || 0) + 1;
  });

const graph = {
  meta: {
    app: meta.appName,
    version: meta.version,
    dataUpdated: meta.lastUpdated,
    // Fecha LOCAL: toISOString() da UTC y en Chile (UTC-4) mostraba mañana
    // durante toda la tarde.
    generated: new Date().toLocaleDateString("sv-SE"),
    scope: meta.scope,
  },
  stats: {
    syndromes: syndromes.length,
    pathogens: pathogens.length,
    drugs: antibiotics.length,
    nodes: nodes.length,
    edges: edges.length,
    causedBy: edges.filter((e) => e.rel === "caused_by").length,
    treatedBy: edges.filter((e) => e.rel === "treated_by").length,
    resistantTo: edges.filter((e) => e.rel === "resistant_to").length,
    asymmetric: asymmetric.length,
    orphans: orphans.length,
    drugsNoRegimen: drugsNoRegimen.length,
    resProse: resProse.length,
    resDrift: resDrift.length,
    resLinked: edges.filter((e) => e.rel === "resistant_to").length,
    backlogRefs: backlogRefs.length,
  },
  nodes,
  edges,
  findings: {
    orphans: orphans.map((n) => ({ id: n.id, type: n.type, label: n.label })),
    drugsNoRegimen: drugsNoRegimen.map((n) => ({ id: n.id, label: n.label, deg: n.deg })),
    asymmetric: asymmetric.map((e) => ({
      syndrome: e.s,
      pathogen: e.t,
      dir: e.dir,
    })),
    resProse,
    resDrift,
    backlogRefs,
    gramVocab: gramRawCounts,
    issues,
  },
};

// --- SALIDA ---------------------------------------------------------------
const outDir = path.join(ROOT, "research");
if (process.argv.includes("--json")) {
  fs.writeFileSync(path.join(outDir, "graph.json"), JSON.stringify(graph, null, 2));
  console.log("→ research/graph.json");
}

const tpl = fs.readFileSync(path.join(__dirname, "graph_template.html"), "utf8");
// Escapar `<` evita que un texto clínico con "</script>" cierre el bloque antes de tiempo.
const payload = JSON.stringify(graph).replace(/</g, "\\u003c");
const html = tpl.replace("__GRAPH_DATA__", () => payload);
fs.writeFileSync(path.join(outDir, "graph.html"), html);

console.log("=== AntibioGuide · build_graph ===");
console.log(
  `Nodos: ${graph.stats.nodes} (${graph.stats.syndromes} síndromes · ${graph.stats.pathogens} patógenos · ${graph.stats.drugs} fármacos)`
);
console.log(
  `Aristas: ${graph.stats.edges} (${graph.stats.causedBy} causa · ${graph.stats.treatedBy} trata · ${graph.stats.resistantTo} resiste)`
);
console.log(`Huérfanos (grado 0): ${graph.stats.orphans}`);
console.log(`Fármacos sin régimen: ${graph.stats.drugsNoRegimen}`);
console.log(`Resistencia — prosa (clase/mecanismo): ${graph.stats.resProse}`);
console.log(`Resistencia — vocabulario divergente: ${graph.stats.resDrift}  ← accionable`);
console.log(`Asimetrías síndrome↔patógeno: ${graph.stats.asymmetric}`);
console.log(`Refs a síndromes del backlog: ${graph.stats.backlogRefs}`);
if (issues.length) {
  console.log(`\n⚠ ${issues.length} problema(s) de integridad:`);
  issues.forEach((i) => console.log(`  - [${i.kind}] ${i.detail}`));
}
console.log("\n→ research/graph.html");
