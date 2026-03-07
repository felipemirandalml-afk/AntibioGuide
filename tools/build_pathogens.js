const fs = require('fs');
const path = require('path');

const MASTER_PATH = path.join(__dirname, '../data-files/pathogens_master.json');
const OUT_PATH = path.join(__dirname, '../data/pathogens.js');

function build() {
    console.log('--- Starting Pathogens Build ---');
    let rawData;
    try {
        rawData = fs.readFileSync(MASTER_PATH, 'utf8');
    } catch (err) {
        console.error(`FATAL: No se pudo leer ${MASTER_PATH}`, err.message);
        process.exit(1);
    }

    let pathogensMaster = [];
    try {
        pathogensMaster = JSON.parse(rawData);
    } catch (err) {
        console.error(`FATAL: pathogens_master.json no es un JSON válido.`, err.message);
        process.exit(1);
    }

    if (!Array.isArray(pathogensMaster) || pathogensMaster.length === 0) {
        console.error(`FATAL: pathogens_master.json debe ser un array no vacío.`);
        process.exit(1);
    }

    let errors = 0;

    // 1. Validation and Transformation Route
    const appPathogens = pathogensMaster.map((p, idx) => {
        // Validate minimal canonical fields
        const missing = [];
        if (!p.id) missing.push('id');
        if (!p.name) missing.push('name');
        if (!p.shortName) missing.push('shortName');
        if (!p.taxonomy || !p.taxonomy.gram) missing.push('taxonomy.gram');
        if (!p.clinical || !p.clinical.summary) missing.push('clinical.summary');
        if (!p.clinical || !Array.isArray(p.clinical.usualSyndromes)) missing.push('clinical.usualSyndromes');
        if (!p.resistance || !Array.isArray(p.resistance.intrinsic)) missing.push('resistance.intrinsic');
        if (!p.resistance || !Array.isArray(p.resistance.typicalAcquired)) missing.push('resistance.typicalAcquired');
        if (!p.appMeta || !p.appMeta.relevance) missing.push('appMeta.relevance');

        if (missing.length > 0) {
            console.error(`ERROR (Index ${idx} - ${p.id || 'Unknown'}): Falta campo obligatorio -> ${missing.join(', ')}`);
            errors++;
        }

        // 2. Derive legacy fields to maintain 100% app.js backwards-compatibility
        const legacyCategory = p.taxonomy && p.taxonomy.group === 'Fungi' ? 'fungi' : 'bacteria';
        const legacyTags = [];

        if (p.taxonomy) {
            if (p.taxonomy.gram === 'negativo') legacyTags.push('gram_negative');
            if (p.taxonomy.gram === 'positivo') legacyTags.push('gram_positive');
            if (p.taxonomy.gram === 'atípico') legacyTags.push('atypical');
            if (p.taxonomy.morphology === 'coco') legacyTags.push('cocci');
            if (p.taxonomy.morphology === 'bacilo') legacyTags.push('bacilli');
            if (p.taxonomy.morphology === 'diplococo') legacyTags.push('diplococci');
            if (p.taxonomy.morphology === 'cocobacilo') legacyTags.push('cocobacilli');
            if (p.taxonomy.group === 'Enterobacterales') legacyTags.push('enterobacterales');
            if (p.taxonomy.group === 'Anaerobes') legacyTags.push('anaerobic');
        }

        const legacyCommonSyndromes = p.clinical && Array.isArray(p.clinical.usualSyndromes) ? p.clinical.usualSyndromes : [];

        const legacyIntrinsic = p.resistance && Array.isArray(p.resistance.intrinsic) ? p.resistance.intrinsic : [];
        const legacyAcquired = p.resistance && Array.isArray(p.resistance.typicalAcquired) ? p.resistance.typicalAcquired : [];
        const legacyNote = p.resistance ? p.resistance.stewardshipNote : "";

        return {
            // Direct pass-through of new canonical schema
            ...p,
            // Overrides/additions for legacy compatibility
            category: legacyCategory,
            tags: legacyTags,
            summary: p.clinical ? p.clinical.summary : "",
            common_syndromes: legacyCommonSyndromes,
            intrinsic_resistance: legacyIntrinsic,
            typical_resistance: legacyAcquired,
            stewardship_note: legacyNote
        };
    });

    if (errors > 0) {
        console.error(`\nBuild fallido con ${errors} errores de estructura en pathogens_master.json`);
        process.exit(1);
    }

    // 3. Write compiled string
    const fileContent = `const pathogens = ${JSON.stringify(appPathogens, null, 2)};\n\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = pathogens;\n}\nelse if (typeof window !== "undefined") {\n  window.abg_pathogens = pathogens;\n}\n`;

    try {
        fs.writeFileSync(OUT_PATH, fileContent, 'utf8');
        console.log(`✓ Build exitoso. Generados ${appPathogens.length} patógenos en data/pathogens.js`);
    } catch (err) {
        console.error(`FATAL: No se pudo escribir en ${OUT_PATH}`, err.message);
        process.exit(1);
    }
}

build();
