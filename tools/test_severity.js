#!/usr/bin/env node
"use strict";

/**
 * Tests de app/severity.js — clasificación de escenario y match por severidad.
 * Cubre el bug de negación "non_icu", el dominio del prefijo outpatient, y la
 * regla ordinal (UCI acepta regímenes de sala; ambulatorio no acepta EV).
 */

const { makeBrowserGlobals, loadBrowserModule, assert, eq, makeRunner } = require("./test_lib.js");

makeBrowserGlobals({});
loadBrowserModule("app/severity.js");
const S = window.ABG.severity;

const { test, run } = makeRunner("severity.js — escenario ↔ severidad");

test("clasifica ambulatorio por prefijo", () => {
  eq(S.scenarioLevel("outpatient"), "amb");
  eq(S.scenarioLevel("outpatient_comorbid"), "amb");
  eq(S.scenarioLevel("outpatient_purulent_or_mrsa_risk"), "amb");
});

test("prefijo outpatient domina incluso con 'severe'", () => {
  eq(S.scenarioLevel("outpatient_severe"), "amb", "outpatient_severe sigue siendo ambulatorio");
});

test("'non_icu' NO es UCI (bug de subcadena)", () => {
  eq(S.scenarioLevel("inpatient_non_icu"), "hosp");
  eq(S.scenarioLevel("inpatient_non_icu_high_risk"), "hosp");
  eq(S.scenarioLevel("inpatient_non_icu_low_risk"), "hosp");
});

test("marcadores de UCI/crítico", () => {
  eq(S.scenarioLevel("inpatient_severe_nosocomial"), "icu");
  eq(S.scenarioLevel("inpatient_severe_or_risk_pseudomonas"), "icu");
  eq(S.scenarioLevel("inpatient_moderate_severe"), "icu");
  eq(S.scenarioLevel("pve_early_or_nosocomial"), "icu");
});

test("inpatient / endocarditis simples = hosp", () => {
  eq(S.scenarioLevel("inpatient"), "hosp");
  eq(S.scenarioLevel("inpatient_esbl_risk"), "hosp");
  eq(S.scenarioLevel("nve"), "hosp");
  eq(S.scenarioLevel("pve"), "hosp");
});

test("escenarios que abarcan ambos ámbitos", () => {
  eq(S.scenarioLevel("outpatient_or_inpatient"), "mixto", "abarca amb + hosp");
  eq(S.scenarioLevel("inpatient_or_ed"), "hosp", "ED es nivel hospitalario, no casa");
});

test("ambulatorio acepta amb, NO hospitalario (no se da EV en casa)", () => {
  assert(S.matches("outpatient", "outpatient"), "amb ↔ ambulatorio");
  assert(!S.matches("inpatient", "outpatient"), "hosp ✗ ambulatorio");
  assert(!S.matches("inpatient_severe_nosocomial", "outpatient"), "icu ✗ ambulatorio");
});

test("hospitalizado acepta hosp", () => {
  assert(S.matches("inpatient", "inpatient"), "hosp ↔ hospitalizado");
  assert(!S.matches("outpatient", "inpatient"), "amb ✗ hospitalizado");
  assert(!S.matches("inpatient_severe_nosocomial", "inpatient"), "icu ✗ hospitalizado (piso)");
});

test("UCI acepta icu Y hosp (recibe también regímenes de sala)", () => {
  assert(S.matches("inpatient_severe_nosocomial", "icu"), "icu ↔ UCI");
  assert(S.matches("inpatient", "icu"), "hosp también aplica en UCI");
  assert(!S.matches("outpatient", "icu"), "amb ✗ UCI");
});

test("mixto matchea ambulatorio y hospitalizado", () => {
  assert(S.matches("outpatient_or_inpatient", "outpatient"), "mixto ↔ ambulatorio");
  assert(S.matches("outpatient_or_inpatient", "inpatient"), "mixto ↔ hospitalizado");
  assert(S.matches("outpatient_or_inpatient", "icu"), "mixto ↔ UCI");
});

run();
