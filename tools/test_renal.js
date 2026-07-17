#!/usr/bin/env node
"use strict";

/**
 * Tests de app/renal.js — calculadora de función renal (Cockcroft-Gault).
 * Verifica la fórmula contra valores calculados a mano, el factor de sexo,
 * la validación de entradas, la conversión de unidades y las advertencias.
 */

const { makeBrowserGlobals, loadBrowserModule, assert, eq, makeRunner } = require("./test_lib.js");

makeBrowserGlobals({});
loadBrowserModule("app/renal.js");
const R = window.ABG.renal;

const { test, run } = makeRunner("renal.js — Cockcroft-Gault");

// Aproximación: |a-b| <= tol
function near(a, b, tol, msg) {
  if (Math.abs(a - b) > tol) throw new Error(`${msg || "near"}: ${a} vs ${b} (tol ${tol})`);
}

test("hombre de referencia: 60a, 80kg, Cr 1.0 → CrCl 88.9", () => {
  // (140-60)=80 · 80×80=6400 · 72×1.0=72 · 6400/72 = 88.9
  const r = R.cockcroftGault({ age: 60, weightKg: 80, sex: "male", creatinine: 1.0 });
  assert(r.ok, "debe calcular");
  near(r.crcl, 88.9, 0.5, "CrCl hombre");
});

test("factor mujer = 0.85 (misma entrada, 85% del valor)", () => {
  const h = R.cockcroftGault({ age: 60, weightKg: 80, sex: "male", creatinine: 1.0 });
  const m = R.cockcroftGault({ age: 60, weightKg: 80, sex: "female", creatinine: 1.0 });
  near(m.crcl, h.crcl * 0.85, 0.01, "mujer = 0.85 × hombre");
});

test("insuficiencia renal: 75a, 60kg, Cr 2.5, mujer → CrCl bajo, reducedFunction", () => {
  // (140-75)=65; 65*60=3900; *0.85=3315; 72*2.5=180; 3315/180 = 18.4
  const r = R.cockcroftGault({ age: 75, weightKg: 60, sex: "female", creatinine: 2.5 });
  assert(r.ok, "calcula");
  near(r.crcl, 18.4, 0.5, "CrCl severo");
  eq(r.stage.key, "G4", "etapa G4 (15-29)");
  assert(r.reducedFunction === true, "marca función reducida");
});

test("conversión µmol/L → mg/dL (88.4 µmol/L ≈ 1.0 mg/dL)", () => {
  const mg = R.cockcroftGault({ age: 60, weightKg: 80, sex: "male", creatinine: 1.0, creatinineUnit: "mg/dL" });
  const umol = R.cockcroftGault({ age: 60, weightKg: 80, sex: "male", creatinine: 88.4, creatinineUnit: "umol/L" });
  near(umol.crcl, mg.crcl, 0.2, "µmol/L convierte a mg/dL");
});

test("siempre devuelve fórmula y fuente para auditar", () => {
  const r = R.cockcroftGault({ age: 40, weightKg: 70, sex: "male", creatinine: 0.9 });
  assert(/Cockcroft/.test(r.reference), "cita la fuente");
  assert(/140/.test(r.formulaText), "muestra la fórmula");
});

test("rechaza edad pediátrica (fuera de alcance)", () => {
  const r = R.cockcroftGault({ age: 8, weightKg: 25, sex: "male", creatinine: 0.5 });
  assert(!r.ok, "no calcula");
  assert(r.errors.some((e) => e.field === "age"), "error en edad");
});

test("rechaza creatinina inválida (0 o negativa)", () => {
  const r = R.cockcroftGault({ age: 40, weightKg: 70, sex: "male", creatinine: 0 });
  assert(!r.ok, "no calcula");
  assert(r.errors.some((e) => e.field === "creatinine"), "error en creatinina");
});

test("rechaza sexo faltante (necesario para el factor)", () => {
  const r = R.cockcroftGault({ age: 40, weightKg: 70, creatinine: 0.9 });
  assert(!r.ok, "no calcula");
  assert(r.errors.some((e) => e.field === "sex"), "error en sexo");
});

test("advierte redondeo de creatinina en adulto mayor con Cr < 1.0", () => {
  const r = R.cockcroftGault({ age: 80, weightKg: 65, sex: "male", creatinine: 0.7 });
  assert(r.ok, "calcula");
  assert(r.notes.some((n) => /redonde/i.test(n)), "incluye la advertencia del redondeo");
});

test("NO advierte redondeo cuando la creatinina es normal", () => {
  const r = R.cockcroftGault({ age: 80, weightKg: 65, sex: "male", creatinine: 1.2 });
  assert(!r.notes.some((n) => /redonde/i.test(n)), "sin advertencia de redondeo");
});

// ---- matchRenalBand: resaltar la banda que aplica en la prosa renal ----
const PROSE = "ClCr 10-29 mL/min: 250-500 mg c/12h; ClCr < 10 mL/min: 250-500 mg c/24h.";

test("CrCl 20 cae en la banda 10-29", () => {
  const m = R.matchRenalBand(PROSE, 20);
  assert(m.parseable, "prosa parseable");
  eq(m.matchIndex, 0, "matchea el primer segmento (10-29)");
  assert(m.segments[0].isMatch && !m.segments[1].isMatch, "solo la banda correcta");
});

test("CrCl 8 cae en la banda < 10", () => {
  const m = R.matchRenalBand(PROSE, 8);
  eq(m.matchIndex, 1, "matchea el segundo segmento (< 10)");
});

test("límite inclusivo: CrCl 10 cae en 10-29, no en < 10", () => {
  const m = R.matchRenalBand(PROSE, 10);
  eq(m.matchIndex, 0, "10 pertenece a 10-29");
});

test("CrCl 50 está por encima de todas las bandas → dosis estándar", () => {
  const m = R.matchRenalBand(PROSE, 50);
  eq(m.matchIndex, null, "ninguna banda de función reducida aplica");
  assert(m.aboveAllBands, "marca que está sobre el techo → función normal");
});

test("banda con cortes distintos (pip-tazo 20-40 / <20)", () => {
  const p = "ClCr 20-40 mL/min: 2.25 g c/6h; ClCr < 20 mL/min: 2.25 g c/8h.";
  eq(R.matchRenalBand(p, 30).matchIndex, 0, "30 en 20-40");
  eq(R.matchRenalBand(p, 15).matchIndex, 1, "15 en < 20");
  assert(R.matchRenalBand(p, 60).aboveAllBands, "60 sobre el techo");
});

test("prosa sin bandas numéricas → no parseable (se muestra tal cual)", () => {
  const m = R.matchRenalBand("Ajustar en IR significativa.", 25);
  assert(!m.parseable, "no hay banda que resaltar");
});

run();
