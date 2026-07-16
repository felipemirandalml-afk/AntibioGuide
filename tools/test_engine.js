#!/usr/bin/env node
"use strict";

/**
 * Tests de app/clinicalEngine.js — lógica clínica pura.
 * Cubre las tres funciones del motor: alertas de resistencia local,
 * modelo de vista de susceptibilidad y resolución de susceptibilidad
 * por patógeno (incluyendo claves anidadas y BLEE).
 */

const path = require("path");
const { makeBrowserGlobals, loadBrowserModule, assert, eq, makeRunner } = require("./test_lib.js");

const data = require(path.join(__dirname, "..", "data.js"));

// El engine llama a localContext.getActiveProfile() y helpers.humanizeId().
// Se inyecta un perfil de prueba mutable por test.
let activeProfile = null;
makeBrowserGlobals({
  clinicalData: data,
  ABG: {
    localContext: { getActiveProfile: () => activeProfile },
    helpers: {
      humanizeId: (id) => String(id || "").replace(/_/g, " ").trim(),
    },
  },
});
loadBrowserModule("app/clinicalEngine.js");

const E = window.ABG.clinicalEngine;
const { test, run } = makeRunner("clinicalEngine.js — reglas y susceptibilidad");

// El dataset real trae la regla rule_fq_itu_cistitis:
//   syndrome itu_cistitis · pathogen escherichia_coli · abx ciprofloxacino · umbral r_pct >= 20
test("getRegimenWarnings dispara alerta cuando R local >= umbral", () => {
  activeProfile = {
    id: "test", label: "Perfil test",
    data: { escherichia_coli: { ciprofloxacino: { r_pct: 30 } } },
  };
  const warnings = E.getRegimenWarnings("itu_cistitis", ["ciprofloxacino"]);
  eq(warnings.length, 1, "una alerta esperada");
  eq(warnings[0].r_pct, 30, "reporta el r_pct local");
});

test("getRegimenWarnings NO dispara bajo el umbral", () => {
  activeProfile = {
    id: "test", label: "Perfil test",
    data: { escherichia_coli: { ciprofloxacino: { r_pct: 10 } } },
  };
  eq(E.getRegimenWarnings("itu_cistitis", ["ciprofloxacino"]).length, 0);
});

test("getRegimenWarnings NO dispara si el fármaco no está en el régimen", () => {
  activeProfile = {
    id: "test", label: "Perfil test",
    data: { escherichia_coli: { ciprofloxacino: { r_pct: 30 } } },
  };
  eq(E.getRegimenWarnings("itu_cistitis", ["nitrofurantoina"]).length, 0);
});

test("getRegimenWarnings sin perfil activo devuelve []", () => {
  activeProfile = null;
  eq(E.getRegimenWarnings("itu_cistitis", ["ciprofloxacino"]).length, 0);
});

// buildSusceptibilityViewModel: ordena sensibles primero, resistente intrínseco al final
test("buildSusceptibilityViewModel ordena por susceptibilidad (susceptible→RI)", () => {
  const profile = { id: "p", label: "P", threshold_s_pct: 75 };
  const localResult = {
    items: [
      { label: "A", s_pct: 40 },   // grupo bajo (<50)
      { label: "B", s_pct: 95 },   // alto (>=75)
      { label: "C", ri: true },    // resistente intrínseco → al final
      { label: "D", s_pct: 60 },   // medio (50-74)
      { label: "E", s_pct: 88 },   // alto
      { label: "F", s_pct: 80 },   // alto
    ],
  };
  const vm = E.buildSusceptibilityViewModel(localResult, profile);
  eq(vm.items.length, 6, "los 6 ítems entran (sin corte)");
  eq(vm.items.map((i) => i.label).join(""), "BEFDAC", "orden: altos desc, luego medio, bajo y RI último");
  eq(vm.threshold, 75, "usa el umbral del perfil");
});

test("buildSusceptibilityViewModel limita a 6 ítems", () => {
  const profile = { id: "p", label: "P", threshold_s_pct: 75 };
  const items = [];
  for (let i = 0; i < 9; i++) items.push({ label: `S${i}`, s_pct: 90 - i });
  const vm = E.buildSusceptibilityViewModel({ items }, profile);
  eq(vm.items.length, 6, "tope de 6");
  eq(vm.items[0].label, "S0", "el más susceptible primero");
});

// getLocalSusceptibilityForPathogen: resuelve clave anidada 'sterile' y extrae BLEE
test("getLocalSusceptibilityForPathogen resuelve 'sterile' anidado y BLEE", () => {
  const profile = {
    id: "p", label: "P",
    data: {
      escherichia_coli: {
        sterile: {
          ciprofloxacino: { s_pct: 82 },
          blee_pct: 12,
        },
      },
    },
  };
  const res = E.getLocalSusceptibilityForPathogen(profile, "escherichia_coli");
  assert(res && Array.isArray(res.items), "devuelve items");
  eq(res.blee_pct, 12, "extrae blee_pct del subnivel");
  assert(res.items.some((i) => typeof i.s_pct === "number"), "incluye ítem con s_pct");
});

test("getLocalSusceptibilityForPathogen devuelve null sin datos del patógeno", () => {
  const profile = { id: "p", label: "P", data: {} };
  eq(E.getLocalSusceptibilityForPathogen(profile, "escherichia_coli"), null);
});

run();
