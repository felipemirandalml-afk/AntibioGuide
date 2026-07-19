#!/usr/bin/env node
"use strict";

/**
 * Tests de app/recommend.js — el cerebro de la recomendación.
 * Usa datos reales. Verifica que la resistencia local invierta el orden de guía,
 * que la alergia excluya, y que la severidad priorice el ámbito.
 */

const path = require("path");
const { makeBrowserGlobals, loadBrowserModule, assert, eq, makeRunner } = require("./test_lib.js");
const data = require(path.join(__dirname, "..", "data.js"));

// Perfil de resistencia inyectable por test (lo lee clinicalEngine).
let activeProfile = null;
makeBrowserGlobals({
    clinicalData: data,
    ABG: {
        localContext: { getActiveProfile: () => activeProfile },
        helpers: { humanizeId: (id) => String(id || "").replace(/_/g, " ") },
    },
});
// helpers.getAntibioticById lo usa recommend; se carga el módulo real de helpers.
loadBrowserModule("app/helpers.js");
loadBrowserModule("app/allergy.js");
loadBrowserModule("app/severity.js");
loadBrowserModule("app/clinicalEngine.js");
loadBrowserModule("app/recommend.js");
const REC = window.ABG.recommend;

const syndrome = (id) => data.syndromes.find((s) => s.id === id);
const { test, run } = makeRunner("recommend.js — motor de recomendación");

test("sin resistencia local: pielonefritis recomienda la 1ª línea (cipro)", () => {
    activeProfile = data.resistanceProfiles.general; // sin datos locales
    const out = REC.forSyndrome(syndrome("itu_pielonefritis"), { severity: "outpatient" });
    eq(out.recommended.regimen.drugIds[0], "ciprofloxacino", "cipro es la 1ª línea de guía");
});

test("CON resistencia local (RM 32%): cipro cae, recomienda ceftriaxona", () => {
    activeProfile = data.resistanceProfiles.cl_rm_2026; // E. coli cipro 32%
    const out = REC.forSyndrome(syndrome("itu_pielonefritis"), { severity: "outpatient" });
    assert(out.recommended.regimen.drugIds.indexOf("ciprofloxacino") === -1, "cipro NO es el recomendado");
    assert(out.recommended.regimen.drugIds.indexOf("ceftriaxona") !== -1, "recomienda ceftriaxona");
    // cipro aparece como alternativa, con su alerta de resistencia
    const ciproAlt = out.alternatives.find((a) => a.regimen.drugIds.indexOf("ciprofloxacino") !== -1);
    assert(ciproAlt && ciproAlt.warnings.length > 0, "cipro queda como alternativa con alerta de resistencia");
});

test("alergia excluye el régimen contraindicado", () => {
    activeProfile = data.resistanceProfiles.general;
    const out = REC.forSyndrome(syndrome("nac"), { severity: "outpatient", allergies: ["penicilina"] });
    // los esquemas de amoxicilina quedan excluidos
    const excludedDrugs = out.excluded.map((e) => e.regimen.drug).join(" ");
    assert(/Amoxicilina/i.test(excludedDrugs), "amoxicilina excluida por alergia");
    // el recomendado no es una penicilina
    assert(!/^Amoxicilina/i.test(out.recommended.regimen.drug), "no recomienda una penicilina");
});

test("severidad prioriza el régimen del ámbito", () => {
    activeProfile = data.resistanceProfiles.general;
    const amb = REC.forSyndrome(syndrome("itu_pielonefritis"), { severity: "outpatient" });
    const hosp = REC.forSyndrome(syndrome("itu_pielonefritis"), { severity: "inpatient" });
    eq(amb.recommended.regimen.scenario, "outpatient", "ambulatorio → escenario outpatient");
    eq(hosp.recommended.regimen.scenario, "inpatient", "hospitalizado → escenario inpatient");
});

test("sin severidad: rankea todos, empírico primero", () => {
    activeProfile = data.resistanceProfiles.general;
    const out = REC.forSyndrome(syndrome("itu_pielonefritis"), {});
    assert(out.recommended, "hay recomendación");
    eq(out.recommended.regimen.type, "empiric", "empírico gana sin más contexto");
});

test("severityFallback: severidad sin régimen del ámbito → recomienda igual", () => {
    activeProfile = data.resistanceProfiles.general;
    // faringitis solo tiene escenarios ambulatorios; pedir 'icu' fuerza el fallback
    const out = REC.forSyndrome(syndrome("faringitis"), { severity: "icu" });
    assert(out.recommended, "recomienda algo aunque no haya esquema de UCI");
    assert(out.severityFallback, "marca el fallback de severidad");
});

test("el recomendado trae sus flags (allergy, warnings, severityMatch)", () => {
    activeProfile = data.resistanceProfiles.cl_rm_2026;
    const out = REC.forSyndrome(syndrome("itu_pielonefritis"), { severity: "outpatient", allergies: [] });
    const r = out.recommended;
    assert(r.allergy && typeof r.allergy.level === "string", "trae nivel de alergia");
    assert(Array.isArray(r.warnings), "trae warnings de resistencia");
    assert(r.severityMatch === true, "trae severityMatch");
});

run();
