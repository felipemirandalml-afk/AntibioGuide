#!/usr/bin/env node
"use strict";

/**
 * Tests de app/allergy.js — chequeo de alergias con reactividad cruzada.
 * Usa fármacos reales del runtime para verificar la clasificación por familia
 * y el modelo clínico matizado (penicilina evita; cefalo/carbapenem precaución;
 * aztreonam seguro; sulfa/macrólido/quinolona directo).
 */

const path = require("path");
const { makeBrowserGlobals, loadBrowserModule, assert, eq, makeRunner } = require("./test_lib.js");
const data = require(path.join(__dirname, "..", "data.js"));

makeBrowserGlobals({ clinicalData: data });
loadBrowserModule("app/allergy.js");
const A = window.ABG.allergy;

const drug = (id) => data.antibiotics.find((x) => x.id === id);

const { test, run } = makeRunner("allergy.js — chequeo de alergias");

test("clasifica por familia normalizada", () => {
  eq(A.drugClass(drug("amoxicilina")), "penicilina", "amoxi = penicilina");
  eq(A.drugClass(drug("ceftriaxona")), "cefalosporina", "ceftriaxona = cefalosporina");
  eq(A.drugClass(drug("meropenem")), "carbapenemico", "meropenem = carbapenémico");
  eq(A.drugClass(drug("aztreonam")), "monobactamico", "aztreonam = monobactámico");
  eq(A.drugClass(drug("azitromicina")), "macrolido", "azitro = macrólido");
  eq(A.drugClass(drug("ciprofloxacino")), "quinolona", "cipro = quinolona");
  eq(A.drugClass(drug("tmp_smx")), "sulfa", "cotrimoxazol = sulfa (por nombre)");
  eq(A.drugClass(drug("vancomicina")), null, "vanco: sin clase de alergia");
});

test("alergia a penicilina EVITA penicilinas", () => {
  const r = A.checkDrug(drug("amoxicilina"), ["penicilina"]);
  assert(r && r.level === "avoid", "amoxi = evitar");
});

test("alergia a penicilina → cefalosporina es PRECAUCIÓN (no bloqueo)", () => {
  const r = A.checkDrug(drug("ceftriaxona"), ["penicilina"]);
  assert(r && r.level === "caution", "ceftriaxona = precaución, no avoid");
  assert(/cruzada/i.test(r.note), "trae la nota de reactividad cruzada");
});

test("alergia a penicilina → carbapenémico es PRECAUCIÓN", () => {
  eq(A.checkDrug(drug("meropenem"), ["penicilina"]).level, "caution", "meropenem = precaución");
});

test("alergia a penicilina → aztreonam es SEGURO", () => {
  const r = A.checkDrug(drug("aztreonam"), ["penicilina"]);
  eq(r.level, "safe", "aztreonam = seguro");
  assert(/sin reactividad/i.test(r.note), "nota de que es seguro");
});

test("sulfa/macrólido/quinolona son directas, sin cruce a otras clases", () => {
  eq(A.checkDrug(drug("tmp_smx"), ["sulfa"]).level, "avoid", "sulfa evita cotrimoxazol");
  eq(A.checkDrug(drug("azitromicina"), ["macrolido"]).level, "avoid", "macrólido evita azitro");
  eq(A.checkDrug(drug("ciprofloxacino"), ["quinolona"]).level, "avoid", "quinolona evita cipro");
  // alergia a sulfa NO afecta una cefalosporina
  eq(A.checkDrug(drug("ceftriaxona"), ["sulfa"]), null, "sulfa no toca cefalosporina");
});

test("sin alergias, nada aplica", () => {
  eq(A.checkDrug(drug("amoxicilina"), []), null, "sin alergias: null");
});

test("checkRegimen devuelve el peor nivel del régimen", () => {
  // régimen con ceftriaxona (precaución) + metronidazol (nada) → precaución
  const r1 = A.checkRegimen([drug("ceftriaxona"), drug("metronidazol")], ["penicilina"]);
  eq(r1.level, "caution", "peor = precaución");
  eq(r1.conflicts.length, 1, "solo ceftriaxona conflictúa");

  // régimen con amoxicilina (avoid) + azitromicina → avoid gana
  const r2 = A.checkRegimen([drug("amoxicilina"), drug("azitromicina")], ["penicilina"]);
  eq(r2.level, "avoid", "avoid domina sobre lo demás");

  // régimen limpio
  const r3 = A.checkRegimen([drug("vancomicina")], ["penicilina"]);
  eq(r3.level, "ok", "sin conflicto = ok");
});

test("conflicts ordenados por severidad (avoid primero)", () => {
  const r = A.checkRegimen([drug("ceftriaxona"), drug("amoxicilina")], ["penicilina"]);
  eq(r.conflicts[0].level, "avoid", "el más severo primero");
});

run();
