#!/usr/bin/env node
"use strict";

/**
 * Tests de app/patientContext.js — estado del paciente activo.
 * Verifica set/get/clear, copia defensiva, alergias, la puerta de datos
 * suficientes para el CrCl y la delegación en la capa renal.
 */

const { makeBrowserGlobals, loadBrowserModule, assert, eq, makeRunner } = require("./test_lib.js");

makeBrowserGlobals({});
// El módulo usa sessionStorage (privacidad); el arnés solo mockea localStorage.
let store = {};
global.sessionStorage = {
  getItem: (k) => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; },
};

loadBrowserModule("app/renal.js");          // getRenalEstimate delega aquí
loadBrowserModule("app/patientContext.js");
const P = window.ABG.patientContext;

const { test, run } = makeRunner("patientContext.js — estado del paciente");

test("arranca vacío", () => {
  P.clear();
  assert(P.isEmpty(), "sin datos al inicio");
  eq(P.getRenalEstimate(), null, "sin CrCl si no hay datos");
});

test("set actualiza y get lo refleja", () => {
  P.clear();
  const p = P.set({ age: 60, weightKg: 80 });
  eq(p.age, 60, "edad");
  eq(p.weightKg, 80, "peso");
  assert(!P.isEmpty(), "ya no está vacío");
});

test("get devuelve copia defensiva (no se muta desde afuera)", () => {
  P.clear();
  P.set({ allergies: ["penicilina"] });
  const p = P.get();
  p.allergies.push("HACKEADO");
  p.age = 999;
  eq(P.get().allergies.length, 1, "la mutación externa no afectó el estado");
  eq(P.get().age, null, "la edad no cambió");
});

test("canEstimateRenal exige los 4 campos de Cockcroft-Gault", () => {
  P.clear();
  assert(!P.canEstimateRenal(), "vacío: no");
  P.set({ age: 60, weightKg: 80, sex: "male" });
  assert(!P.canEstimateRenal(), "falta creatinina: no");
  P.set({ creatinine: 1.0 });
  assert(P.canEstimateRenal(), "los 4 presentes: sí");
});

test("getRenalEstimate delega en la capa renal y calcula", () => {
  P.clear();
  P.set({ age: 60, weightKg: 80, sex: "male", creatinine: 1.0 });
  const est = P.getRenalEstimate();
  assert(est && est.ok, "devuelve un cálculo válido");
  assert(Math.abs(est.crcl - 88.9) < 0.5, "CrCl coherente con Cockcroft-Gault");
});

test("hasAllergy es case-insensitive", () => {
  P.clear();
  P.set({ allergies: ["Penicilina"] });
  assert(P.hasAllergy("penicilina"), "encuentra sin importar mayúsculas");
  assert(!P.hasAllergy("sulfas"), "no reporta alergia ausente");
});

test("clear vuelve a vacío", () => {
  P.set({ age: 50, weightKg: 70, sex: "female", creatinine: 1.1, allergies: ["sulfas"] });
  P.clear();
  assert(P.isEmpty(), "limpio");
  assert(!P.canEstimateRenal(), "sin datos para CrCl");
});

test("persiste en sessionStorage (no localStorage)", () => {
  P.clear();
  P.set({ age: 45 });
  assert(store[P.STORAGE_KEY], "guardó en sessionStorage");
  assert(/45/.test(store[P.STORAGE_KEY]), "contiene el dato");
});

run();
