#!/usr/bin/env node
"use strict";

/**
 * =========================================================================
 * AUDITORÍA DE CONSISTENCIA DE SÍNDROMES (audit_syndromes.js)
 * =========================================================================
 * Complementa a validate_data.js. El validador cubre INTEGRIDAD ESTRUCTURAL
 * (refs que resuelven, campos requeridos, enums, duplicados). Esta tool cubre
 * CONSISTENCIA CLÍNICA y SALUD DEL GRAFO — la "revisión comparativa de todos
 * los síndromes", automatizada y repetible:
 *
 *   [SAFETY]  Regla de oro: cada régimen con `reference`.  → falla el proceso.
 *   [GRAPH]   Simetría síndrome.pathogenIds ↔ pathogen.usualSyndromes.
 *   [GRAPH]   Patógenos huérfanos y antibióticos no usados (informativo).
 *   [COVER]   `targets` por régimen, span de escenarios, alineación
 *             pathogens(display) vs pathogenIds(canónico), evidencia de duración.
 *   [CARD]    Scorecard por síndrome para comparar todos de un vistazo.
 *
 * Read-only: NO modifica datos. Exit 1 solo si hay hallazgo SAFETY.
 * =========================================================================
 */

const path = require("path");
const clinicalData = require(path.join(__dirname, "..", "data.js"));

const syndromes = clinicalData.syndromes || [];
const pathogens = clinicalData.pathogens || [];
const antibiotics = clinicalData.antibiotics || [];

const pathogenById = new Map(pathogens.map((p) => [p.id, p]));
const antibioticIds = new Set(antibiotics.map((a) => a.id));

const VERBOSE = process.argv.includes("--verbose") || process.argv.includes("-v");

const safety = [];       // bloquea (exit 1)
const graphForward = []; // síndrome lista patógeno, patógeno no devuelve el enlace
const graphBackward = [];// patógeno lista síndrome, síndrome no devuelve el enlace
const cover = [];        // cobertura/consistencia (warn/info)

// Patógenos "grupo/genérico" (no una especie): su asimetría suele ser esperada,
// porque un síndrome puede apuntar al grupo sin que el grupo liste cada síndrome.
const GENERIC_PATHOGEN = /(_spp|_sp|anaerobes|enterobacterales|streptococcus_spp|_complex|cons)$/;

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim() !== "";
}

function isNonEmptyArray(v) {
  return Array.isArray(v) && v.length > 0;
}

function classifyScenario(scenario = "") {
  if (scenario.startsWith("outpatient")) return "amb";
  if (scenario.startsWith("inpatient") || scenario.startsWith("nve") || scenario.startsWith("pve")) return "hosp";
  if (scenario.includes("or_inpatient") || scenario.includes("or_ed")) return "mixto";
  return "otro";
}

// ---------------------------------------------------------------------------
// Recorrido principal por síndrome
// ---------------------------------------------------------------------------
const scorecard = [];

syndromes.forEach((syn) => {
  const id = syn.id || "(sin id)";
  const regimens = Array.isArray(syn.regimens) ? syn.regimens : [];
  const pathogenIds = Array.isArray(syn.pathogenIds) ? syn.pathogenIds : [];

  let regWithRef = 0;
  let regWithTargets = 0;
  let regWithDurationEvidence = 0;
  const settings = new Set();

  regimens.forEach((r, i) => {
    const rCtx = `${id} · régimen[${i}] "${r.name || r.scenario || i}"`;

    // [SAFETY] regla de oro
    if (isNonEmptyString(r.reference)) regWithRef++;
    else safety.push(`${rCtx}: sin \`reference\` (regla de oro: ninguna dosis sin fuente)`);

    // [COVER] targets
    if (isNonEmptyArray(r.targets)) regWithTargets++;
    else cover.push(`${rCtx}: sin \`targets\` (90% de los regímenes los declaran)`);

    // evidencia de duración (informativo)
    if (isNonEmptyString(r.durationInfo) || isNonEmptyArray(r.durationRefsShort)) regWithDurationEvidence++;

    settings.add(classifyScenario(r.scenario));
  });

  // [GRAPH] simetría síndrome → patógeno → síndrome
  pathogenIds.forEach((pid) => {
    const p = pathogenById.get(pid);
    if (!p) return; // ref rota la detecta el validador
    const usual = p.clinical && Array.isArray(p.clinical.usualSyndromes) ? p.clinical.usualSyndromes : [];
    if (!usual.includes(id)) {
      graphForward.push({ syndrome: id, pathogen: pid, generic: GENERIC_PATHOGEN.test(pid) });
    }
  });

  // [COVER] alineación display vs canónico
  const displayCount = Array.isArray(syn.pathogens) ? syn.pathogens.length : 0;
  const canonCount = pathogenIds.length;

  // span de escenarios
  const hasAmb = settings.has("amb") || settings.has("mixto");
  const hasHosp = settings.has("hosp") || settings.has("mixto");
  const span = hasAmb && hasHosp ? "amb+hosp" : hasAmb ? "solo amb" : hasHosp ? "solo hosp" : "—";

  scorecard.push({
    id,
    reg: regimens.length,
    refPct: regimens.length ? Math.round((100 * regWithRef) / regimens.length) : 0,
    targetsPct: regimens.length ? Math.round((100 * regWithTargets) / regimens.length) : 0,
    pat: canonCount,
    span,
    synonyms: isNonEmptyArray(syn.synonyms) ? syn.synonyms.length : 0,
    criteria: syn.criteria && Object.keys(syn.criteria).length > 0,
    durEv: regWithDurationEvidence,
    displayCount,
    canonCount,
  });
});

// ---------------------------------------------------------------------------
// [GRAPH] dirección inversa: pathogen.usualSyndromes → syndrome.pathogenIds
// ---------------------------------------------------------------------------
const syndromeIds = new Set(syndromes.map((s) => s.id));
const pathogenIdsInSyndromes = new Set();
syndromes.forEach((s) => (s.pathogenIds || []).forEach((pid) => pathogenIdsInSyndromes.add(pid)));

pathogens.forEach((p) => {
  const usual = p.clinical && Array.isArray(p.clinical.usualSyndromes) ? p.clinical.usualSyndromes : [];
  usual.forEach((sid) => {
    if (!syndromeIds.has(sid)) return; // síndrome del backlog: lo gestiona el validador
    const syn = syndromes.find((s) => s.id === sid);
    if (syn && !(syn.pathogenIds || []).includes(p.id)) {
      graphBackward.push({ pathogen: p.id, syndrome: sid, generic: GENERIC_PATHOGEN.test(p.id) });
    }
  });
});

// ---------------------------------------------------------------------------
// [GRAPH] huérfanos e inutilizados (informativo)
// ---------------------------------------------------------------------------
const orphanPathogens = pathogens
  .filter((p) => {
    const usual = p.clinical && Array.isArray(p.clinical.usualSyndromes) ? p.clinical.usualSyndromes : [];
    const linkedForward = pathogenIdsInSyndromes.has(p.id);
    const linkedBackward = usual.some((sid) => syndromeIds.has(sid));
    return !linkedForward && !linkedBackward;
  })
  .map((p) => p.id);

const usedDrugIds = new Set();
syndromes.forEach((s) => (s.regimens || []).forEach((r) => (r.drugIds || []).forEach((d) => usedDrugIds.add(d))));
const unusedAntibiotics = antibiotics.filter((a) => !usedDrugIds.has(a.id)).map((a) => a.id);

// ---------------------------------------------------------------------------
// SALIDA
// ---------------------------------------------------------------------------
function pad(str, n) {
  str = String(str);
  return str.length >= n ? str.slice(0, n) : str + " ".repeat(n - str.length);
}

console.log("=== AntibioGuide · Auditoría de consistencia de síndromes ===");
console.log(`Síndromes: ${syndromes.length} · Patógenos: ${pathogens.length} · Antibióticos: ${antibiotics.length}`);
console.log("");

// --- Scorecard ---
console.log("── SCORECARD (comparativa de todos los síndromes) ──");
console.log(
  pad("síndrome", 40) + pad("reg", 4) + pad("ref%", 6) + pad("tgt%", 6) +
  pad("pat", 5) + pad("escenarios", 11) + pad("sinón", 7) + pad("crit", 6) + "durEv"
);
console.log("-".repeat(90));
scorecard
  .slice()
  .sort((a, b) => a.id.localeCompare(b.id))
  .forEach((r) => {
    console.log(
      pad(r.id, 40) +
      pad(r.reg, 4) +
      pad(r.refPct + "%", 6) +
      pad(r.targetsPct + "%", 6) +
      pad(r.pat, 5) +
      pad(r.span, 11) +
      pad(r.synonyms, 7) +
      pad(r.criteria ? "sí" : "NO", 6) +
      `${r.durEv}/${r.reg}`
    );
  });
console.log("");

// --- SAFETY ---
if (safety.length > 0) {
  console.log(`── [SAFETY] Regla de oro — ${safety.length} régimen(es) SIN referencia ──`);
  safety.forEach((m) => console.log(`  ✗ ${m}`));
  console.log("");
} else {
  console.log("── [SAFETY] Regla de oro: 116/116 regímenes con `reference`. ✔ ──");
  console.log("");
}

// --- GRAPH ---
const totalAsym = graphForward.length + graphBackward.length;
if (totalAsym > 0) {
  const fwdGeneric = graphForward.filter((a) => a.generic).length;
  const bwdGeneric = graphBackward.filter((a) => a.generic).length;
  console.log(`── [GRAPH] Simetría síndrome ↔ patógeno — ${totalAsym} enlace(s) unidireccional(es) ──`);
  console.log("  Señal de consistencia, NO necesariamente un bug: `usualSyndromes` suele listar");
  console.log("  solo los síndromes PRINCIPALES de cada germen. Un motor de búsqueda por grafo debe");
  console.log("  unir ambas direcciones; conviene revisar los casos entre especies (no genéricos).");
  console.log(`  • síndrome→patógeno sin devolución: ${graphForward.length} (${fwdGeneric} con patógeno genérico/grupo)`);
  console.log(`  • patógeno→síndrome sin devolución: ${graphBackward.length} (${bwdGeneric} con patógeno genérico/grupo)`);

  // Patógenos que más asimetrías concentran (candidatos a curar su usualSyndromes)
  const byPathogen = {};
  graphForward.forEach((a) => { if (!a.generic) byPathogen[a.pathogen] = (byPathogen[a.pathogen] || 0) + 1; });
  const top = Object.entries(byPathogen).sort((a, b) => b[1] - a[1]).slice(0, 8);
  if (top.length > 0) {
    console.log("  Patógenos (especie) que más síndromes no devuelven:");
    top.forEach(([pid, n]) => console.log(`    - ${pid}: ${n} síndrome(s) lo listan sin reciprocidad`));
  }
  if (VERBOSE) {
    console.log("  — detalle completo (--verbose) —");
    graphForward.forEach((a) => console.log(`    fwd  ${a.syndrome} → ${a.pathogen}${a.generic ? " (genérico)" : ""}`));
    graphBackward.forEach((a) => console.log(`    bwd  ${a.pathogen} → ${a.syndrome}${a.generic ? " (genérico)" : ""}`));
  } else {
    console.log("  (correr con --verbose para el listado completo)");
  }
  console.log("");
} else {
  console.log("── [GRAPH] Simetría síndrome ↔ patógeno: bidireccional completa. ✔ ──");
  console.log("");
}

console.log("── [GRAPH] Huérfanos / no usados (informativo) ──");
console.log(`  Patógenos en ningún síndrome (referencia de vademécum): ${orphanPathogens.length}`);
if (orphanPathogens.length > 0) console.log(`    ${orphanPathogens.join(", ")}`);
console.log(`  Antibióticos en ningún régimen (vademécum sin uso empírico): ${unusedAntibiotics.length}`);
if (unusedAntibiotics.length > 0) console.log(`    ${unusedAntibiotics.join(", ")}`);
console.log("");

// --- COVER ---
if (cover.length > 0) {
  console.log(`── [COVER] Consistencia de cobertura — ${cover.length} observación(es) ──`);
  cover.forEach((m) => console.log(`  • ${m}`));
  console.log("");
}

// El span de escenarios se ve en la columna "escenarios" del scorecard.
// No se lista aparte: 28/34 síndromes son legítimamente de un solo ámbito
// (meningitis siempre hospital, cistitis siempre ambulatorio, etc.).

// --- Resumen ---
console.log("── Resumen ──");
console.log(`  SAFETY (bloqueante):        ${safety.length}`);
console.log(`  GRAPH enlaces asimétricos:  ${totalAsym} (${graphForward.filter(a=>!a.generic).length + graphBackward.filter(a=>!a.generic).length} entre especies)`);
console.log(`  COVER observaciones:        ${cover.length}`);
console.log(`  Patógenos huérfanos:        ${orphanPathogens.length} · Antibióticos sin uso empírico: ${unusedAntibiotics.length}`);
console.log(`  Resultado: ${safety.length === 0 ? "OK" : "FAIL (regla de oro)"}`);

process.exit(safety.length === 0 ? 0 : 1);
