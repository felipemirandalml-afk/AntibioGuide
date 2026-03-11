#!/usr/bin/env node
"use strict";

const path = require("path");

console.log("=== Clinical Engine Smoke Test ===\n");

let engine, data;

try {
    // Mock window and global objects for browser-based modules
    global.window = global;
    global.document = { documentElement: { classList: { toggle: () => { } } } };

    // Load standard data layer
    data = require(path.join(__dirname, "..", "data.js"));
    global.clinicalData = data;

    // Provide ABG namespace mock
    global.ABG = {
        localContext: {
            getActiveProfile: () => null
        },
        helpers: {
            getAntibioticById: (id) => data.antibiotics.find(a => a.id === id),
            humanizeId: (id) => String(id || "").replace(/_/g, " ").trim()
        }
    };

    // Load dependencies for engine natively 
    const engineSource = require("fs").readFileSync(path.join(__dirname, "..", "app", "clinicalEngine.js"), "utf8");

    // Evaluate the module context 
    eval(engineSource);

    // Engine is now loaded in window.ABG.clinicalEngine
    engine = window.ABG.clinicalEngine;

    if (!engine) {
        throw new Error("ClinicalEngine not found in global context after loading.");
    }
} catch (e) {
    console.error("❌ FAILED to initialize ClinicalEngine environment:", e.message);
    process.exit(1);
}

const testCases = [
    "escherichia_coli",
    "staphylococcus_aureus"
];

let failed = 0;

testCases.forEach(pathogenId => {
    console.log(`[TEST] pathogen: ${pathogenId}`);
    try {
        const profile = { threshold_s_pct: 75, data: { [pathogenId]: { "AMP": { s_pct: 80 } } } };
        const rawItems = engine.getLocalSusceptibilityForPathogen(profile, pathogenId);

        if (rawItems) {
            const viewModel = engine.buildSusceptibilityViewModel(rawItems, profile);
            if (viewModel && Array.isArray(viewModel.items)) {
                console.log(`  ✔ engine executed cleanly for pathogen (${viewModel.items.length} item(s) mapped)\n`);
            } else {
                throw new Error("Susceptibility view model build failed");
            }
        } else {
            console.log(`  ✔ engine executed cleanly (no raw items returned)\n`);
        }
    } catch (error) {
        console.error(`  ❌ ENGINE CRASH: ${error.message}\n`);
        failed++;
    }
});

console.log(`Smoke test complete. ${testCases.length - failed}/${testCases.length} tests passed.`);

if (failed > 0) {
    process.exit(1);
} else {
    process.exit(0);
}
