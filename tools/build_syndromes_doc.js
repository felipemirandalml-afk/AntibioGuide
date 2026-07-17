#!/usr/bin/env node
/**
 * @fileoverview BUILD SYNDROMES DOC
 *
 * Genera `research/SINDROMES_Y_ESQUEMAS.md` desde `data/syndromes.js`: el catálogo
 * navegable de los 34 síndromes con sus esquemas, dosis y fuentes.
 *
 * Existe porque el documento AFIRMABA en su cabecera ser "generado automáticamente"
 * pero no había ninguna herramienta que lo generara — se produjo a mano una vez y
 * quedó fósil. Su versión de julio seguía mostrando un hueco de array en
 * `bacteriemia_asociada_cateter` horas después de que el hueco se corrigiera en los
 * datos, y ese fósil terminó dentro del grafo de conocimiento del repo, listo para
 * enseñarle a una sesión futura un bug que ya no existe.
 *
 * Documento de LECTURA. La fuente de verdad es el runtime; esto solo lo refleja.
 *
 *   node tools/build_syndromes_doc.js           → escribe el documento
 *   node tools/build_syndromes_doc.js --check   → falla (exit 1) si está desactualizado
 *
 * `--check` es lo que lo mantiene honesto: cualquiera puede verificar que el
 * documento coincide con los datos sin escribir nada.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const syndromes = require(path.join(ROOT, "data/syndromes.js"));
const OUT = path.join(ROOT, "research/SINDROMES_Y_ESQUEMAS.md");

/** Ancla estilo GitHub: minúscula, sin puntuación, espacios → guiones. */
function slug(name) {
  return name
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "") // fuera paréntesis, barras, guiones largos
    .trim()
    .replace(/\s+/g, "-");
}

/** Una tubería sin escapar parte la celda en dos columnas. */
const cell = (v) => String(v == null ? "" : v).replace(/\|/g, "\\|");

const fmtDate = (d) => d.toLocaleDateString("sv-SE"); // local, no UTC

function buildRegimen(r, i) {
  const out = [];
  out.push(`### ${i}. ${r.name}`);
  out.push("");
  out.push("| Campo | Valor |");
  out.push("|---|---|");
  out.push(`| Tipo | ${cell(r.type)} |`);
  out.push(`| Escenario | ${cell(r.scenario)} |`);
  out.push(`| Cubre (targets) | ${cell((r.targets || []).join(", "))} |`);
  out.push(`| **Fármaco** | **${cell(r.drug)}** |`);
  out.push(`| Dosis | ${cell(r.dose)} |`);
  out.push(`| Vía | ${cell(r.route)} |`);
  out.push(`| Intervalo | ${cell(r.interval)} |`);
  out.push(`| Duración | ${cell(r.duration)} |`);
  out.push("");
  if (r.durationInfo) out.push(`> ⏱️ **Duración (evidencia):** ${r.durationInfo}`);
  if (r.durationRefsShort && r.durationRefsShort.length) {
    out.push(`> _Refs duración:_ ${r.durationRefsShort.join("; ")}`);
  }
  if (r.comments) out.push(`> 💬 **Comentario:** ${r.comments}`);
  // La regla de oro: ningún régimen sin fuente. Si falta, que se vea en el doc.
  out.push(`> 📖 **Fuente:** ${r.reference || "⚠ SIN FUENTE"}`);
  out.push("");
  return out;
}

function buildSyndrome(s) {
  const out = [];
  out.push(`## ${s.name}`);
  out.push("");
  if (s.synonyms && s.synonyms.length) {
    out.push(`**Sinónimos:** ${s.synonyms.join(" · ")}`);
    out.push("");
  }
  if (s.description) {
    out.push(s.description);
    out.push("");
  }
  if (s.criteria && (s.criteria.outpatient || s.criteria.hospital)) {
    out.push("**Criterios de ámbito**");
    out.push("");
    if (s.criteria.outpatient) out.push(`- *Ambulatorio:* ${s.criteria.outpatient}`);
    if (s.criteria.hospital) out.push(`- *Hospitalario:* ${s.criteria.hospital}`);
    out.push("");
  }
  // `pathogens` es la lista de display; el hueco de array que motivó esta
  // herramienta vivía justo aquí y se renderizaba como una coma suelta.
  const pats = (s.pathogens || []).filter((p) => p != null && String(p).trim() !== "");
  if (pats.length) {
    out.push(`**Patógenos:** ${pats.join(", ")}`);
    out.push("");
  }
  (s.regimens || []).forEach((r, i) => out.push(...buildRegimen(r, i + 1)));
  out.push("---");
  out.push("");
  return out;
}

function build() {
  const sorted = syndromes.slice().sort((a, b) => a.name.localeCompare(b.name, "es"));
  const totalReg = sorted.reduce((n, s) => n + (s.regimens || []).length, 0);

  const out = [];
  out.push("# AntibioGuide — Síndromes y esquemas de tratamiento");
  out.push("");
  out.push(`> Generado automáticamente desde \`data/syndromes.js\` el ${fmtDate(new Date())}.`);
  out.push(
    `> **${sorted.length} síndromes · ${totalReg} esquemas.** Fuente única de verdad: el runtime. No editar aquí.`
  );
  out.push("");
  out.push("## Índice");
  out.push("");
  sorted.forEach((s) =>
    out.push(`- [${s.name}](#${slug(s.name)}) — ${(s.regimens || []).length} esquema(s)`)
  );
  out.push("");
  out.push("---");
  out.push("");
  sorted.forEach((s) => out.push(...buildSyndrome(s)));

  return out.join("\n").replace(/\n+$/, "\n");
}

const doc = build();
const check = process.argv.includes("--check");

if (check) {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
  // La fecha cambia sola cada día: compararla haría fallar el check sin que nada
  // de fondo haya cambiado. Se ignora esa línea y se compara el resto.
  const strip = (t) => t.replace(/^> Generado automáticamente desde .*$/m, "");
  if (strip(current) === strip(doc)) {
    console.log("✔ research/SINDROMES_Y_ESQUEMAS.md está al día con data/syndromes.js");
    process.exit(0);
  }
  console.error("✗ research/SINDROMES_Y_ESQUEMAS.md NO refleja data/syndromes.js.");
  console.error("  Corre: node tools/build_syndromes_doc.js");
  process.exit(1);
}

fs.writeFileSync(OUT, doc);
const n = syndromes.length;
const r = syndromes.reduce((a, s) => a + (s.regimens || []).length, 0);
console.log(`=== AntibioGuide · build_syndromes_doc ===`);
console.log(`${n} síndromes · ${r} esquemas → research/SINDROMES_Y_ESQUEMAS.md`);
