#!/usr/bin/env node
/**
 * @fileoverview INGEST_ATB.JS
 * Tool for smart ingestion of antibiotic data from NotebookLM (MD/JSON).
 * 
 * Usage: node tools/ingest_atb.js path/to/notebook_output.md
 */

const fs = require('fs');
const path = require('path');

// 1. Configuration
const TARGET_FILE = path.join(__dirname, '..', 'data', 'antibiotics.js');
const VALID_AWARE = ["Access", "Watch", "Reserve", null];
const VALID_SPECTRUM = ["narrow", "moderate", "broad", null];
const VALID_ROUTES = ["vo", "ev", "both", "im", null];

function log(msg) { console.log(`[INGEST] ${msg}`); }
function error(msg) { console.error(`[ERROR] ${msg}`); process.exit(1); }

// 2. Load Existing Data
function loadExisting() {
    try {
        // We delete the cache to ensure we read the latest from disk if running multiple times
        delete require.cache[require.resolve(TARGET_FILE)];
        return require(TARGET_FILE);
    } catch (e) {
        error(`Could not load target file ${TARGET_FILE}: ${e.message}`);
    }
}

// 3. Parse NotebookLM Output (MD with JSON block)
function parseInput(filePath) {
    if (!fs.existsSync(filePath)) error(`File not found: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract JSON from markdown fenced code blocks
    const jsonMatch = content.match(/```json\s+([\s\S]*?)```/);
    const jsonSource = jsonMatch ? jsonMatch[1] : content;
    
    try {
        return JSON.parse(jsonSource);
    } catch (e) {
        error(`Failed to parse JSON from ${filePath}: ${e.message}`);
    }
}

// 4. Transform and Clean
function cleanItem(item) {
    const cleaned = { ...item };

    // Standardize ID
    if (!cleaned.id && cleaned.name) {
        cleaned.id = cleaned.name.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
            .replace(/\s+/g, '_') // space to underscore
            .replace(/[^a-z0-9_]/g, ''); // sanitization
    }

    // Clinical Metadata Defaults & Normalization
    if (!cleaned.clinical_metadata) cleaned.clinical_metadata = {};
    const md = cleaned.clinical_metadata;

    // Normalization logic: "IM" should NOT be changed blindly to EV or BOTH
    // but we must ensure it matches one of our valid tokens.
    if (md.route_hint) {
        let route = md.route_hint.toLowerCase().trim();
        if (route === 'im') md.route_hint = 'im';
        else if (route === 'iv' || route === 'ev') md.route_hint = 'ev';
        else if (route === 'po' || route === 'vo' || route === 'oral') md.route_hint = 'vo';
        else if (route === 'iv/im' || route === 'im/iv' || route === 'both') md.route_hint = 'both';
        // if it doesn't match, we keep the original and let the validator complain or nullify
    }

    // Standardize Aware casing
    if (md.aware) {
        const found = VALID_AWARE.find(v => v && v.toLowerCase() === md.aware.toLowerCase());
        if (found) md.aware = found;
    }

    // Cleanup "Information no disponible"
    const fields = ['renal', 'contraindications', 'adverse', 'uses', 'mechanism', 'spectrum'];
    fields.forEach(f => {
        if (cleaned[f] && cleaned[f].includes('no disponible')) {
            cleaned[f] = ""; // Keep empty for manual check or keep it? 
            // Better to keep it empty so UI doesn't look like a placeholder
        }
    });

    return cleaned;
}

// 5. Build JS File Content
function generateFileContent(data) {
    const header = `/**
 * @fileoverview ANTIBIOTICS DATA (Enriched via NotebookLM + Manual Clinical Refinement)
 * 
 * ARCHITECTURAL CONTRACT (Clinical vs Presentation):
 * This file contains the primary vocabulary for drugs and their properties.
 */

const antibiotics = `;

    const footer = `

if (typeof module !== "undefined" && module.exports) {
  module.exports = antibiotics;
} else if (typeof window !== "undefined") {
  window.abg_antibiotics = antibiotics;
}
`;

    // We use JSON.stringify with 2 spaces for readability
    const body = JSON.stringify(data, null, 2);
    return header + body + ";" + footer;
}

// 6. Main Flow
const inputPath = process.argv[2];
if (!inputPath) {
    console.log("Usage: node tools/ingest_atb.js <path_to_md_file>");
    process.exit(0);
}

log("Starting ingestion...");
const existing = loadExisting();
const incoming = parseInput(inputPath);

const merged = [...existing];
let updatedCount = 0;
let addedCount = 0;

incoming.forEach(newItem => {
    const cleaned = cleanItem(newItem);
    const existingIndex = merged.findIndex(v => v.id === cleaned.id);

    if (existingIndex !== -1) {
        // SMART MERGE: Preserve some manual fields if incoming is empty?
        // For now, let's just overwrite but log it.
        merged[existingIndex] = { ...merged[existingIndex], ...cleaned };
        updatedCount++;
    } else {
        merged.push(cleaned);
        addedCount++;
    }
});

log(`Summary: ${addedCount} added, ${updatedCount} updated.`);

const finalContent = generateFileContent(merged);
fs.writeFileSync(TARGET_FILE, finalContent);

log(`Successfully updated ${TARGET_FILE}`);
log("Pro-tip: Run 'node tools/validate_data.js' to verify structure.");
