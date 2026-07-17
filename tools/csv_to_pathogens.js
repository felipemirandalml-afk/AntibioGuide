/**
 * @fileoverview INGESTA CSV → data/pathogens.js
 *
 * ⚠ ESTA HERRAMIENTA SOBRESCRIBE LA FUENTE DE VERDAD. Hace `upsert`: cada fila
 * del CSV REEMPLAZA el registro completo del patógeno en data/pathogens.js.
 * Desde marzo esos registros se editan a mano (ver README), así que correrla sin
 * pensar destruye trabajo. Por eso exige --force.
 *
 * Guardas (existen por defectos reales, no por precaución teórica):
 *
 *  1. ESQUEMA. La herramienta lee columnas `tax_*`/`clin_*`/`res_*`. Si el CSV
 *     no las trae, `row.tax_gram` es undefined y escribe registros EN BLANCO
 *     sin avisar. Pasó: seeds/pathogens.csv tiene otro esquema (9 columnas).
 *  2. ANCHO DE FILA. Una coma sin encomillar dentro de un campo corre todas las
 *     columnas siguientes. Pasó: corrompió 5 registros (treponema, TB, lepra,
 *     candida, borrelia) y nadie lo vio por meses.
 *  3. MAPA DE SÍNDROMES. `validSyndromesMap` quedó congelado en marzo y ya
 *     contradice la curación del worklist.
 */
const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '..', 'data-files', 'seeds', 'pathogens.csv');
const outPath = path.join(__dirname, '..', 'data', 'pathogens.js');

const FORCE = process.argv.includes('--force');

// Las columnas que este script realmente lee más abajo.
const REQUIRED_COLUMNS = [
    'id', 'name', 'tax_gram', 'clin_summary', 'clin_syndromes',
    'clin_context', 'clin_pearls', 'res_intrinsic', 'res_acquired',
    'res_stewardship', 'meta_relevance'
];

function abort(title, detail) {
    console.error('\n✗ ABORTADO — ' + title + '\n');
    console.error(detail + '\n');
    console.error('No se escribió nada en data/pathogens.js.\n');
    process.exit(1);
}

// Load current pathogens to preserve those not in the CSV
const clinicalData = require(path.join(__dirname, '..', 'data.js'));
const existingPathogens = clinicalData.pathogens || [];
const pathogensMap = new Map();
existingPathogens.forEach(p => pathogensMap.set(p.id, p));

const rawCSV = fs.readFileSync(csvPath, 'utf8');

function parseCSVRow(text) {
    let ret = [], inQuotes = false, value = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char === '\"') {
            if (inQuotes && text[i + 1] === '\"') {
                value += '\"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            ret.push(value.trim());
            value = '';
        } else {
            value += char;
        }
    }
    ret.push(value.trim());
    return ret;
}

const lines = rawCSV.trim().split(/\r?\n/);
const headers = parseCSVRow(lines[0]);

// --- Guarda 1: el CSV trae las columnas que este script lee ---------------
const missing = REQUIRED_COLUMNS.filter(c => !headers.includes(c));
if (missing.length) {
    abort(
        'el CSV no tiene el esquema que esta herramienta espera',
        `Archivo : ${path.relative(path.join(__dirname, '..'), csvPath)}\n` +
        `Columnas: ${headers.join(', ')}\n\n` +
        `Faltan  : ${missing.join(', ')}\n\n` +
        `Sin esas columnas el script leería undefined y escribiría los registros EN BLANCO,\n` +
        `borrando gram, resumen, síndromes, resistencia y notas de cada patógeno del CSV.\n` +
        `Apunta csvPath al archivo con el esquema completo, o actualiza el mapeo de abajo.`
    );
}

// --- Guarda 2: ninguna fila corrida por comas sin encomillar --------------
const badRows = [];
lines.slice(1).forEach((line, i) => {
    if (!line.trim()) return;
    const cells = parseCSVRow(line);
    if (cells.length !== headers.length) {
        badRows.push(`  línea ${i + 2}: ${cells[0] || '(sin id)'} → ${cells.length} columnas, se esperaban ${headers.length}`);
    }
});
if (badRows.length) {
    abort(
        `${badRows.length} fila(s) con el número de columnas equivocado`,
        badRows.join('\n') +
        `\n\nCausa habitual: una coma dentro de un campo sin encomillar. El CSV usa ';' para\n` +
        `separar ítems y ',' para columnas, así que una coma suelta corre todos los campos\n` +
        `siguientes y el registro queda desalineado en silencio.\n` +
        `Arreglo: encomilla el campo — "Comensal humano, causa común de micosis".`
    );
}

// --- Guarda 3: sobrescribir la fuente de verdad exige confirmación --------
if (!FORCE) {
    const willOverwrite = lines.slice(1)
        .filter(l => l.trim())
        .map(l => parseCSVRow(l)[0])
        .filter(id => pathogensMap.has(id));
    abort(
        'esta herramienta sobrescribe data/pathogens.js (la fuente de verdad)',
        `Reemplazaría por completo ${willOverwrite.length} registro(s) que ya existen:\n` +
        `  ${willOverwrite.slice(0, 8).join(', ')}${willOverwrite.length > 8 ? `, … (+${willOverwrite.length - 8})` : ''}\n\n` +
        `Desde marzo esos registros se refinan A MANO en data/pathogens.js, y el CSV no tiene\n` +
        `ese trabajo. Además 'validSyndromesMap' quedó congelado en marzo: mapea\n` +
        `"sepsis"→sepsis_urinaria (el over-claim que el worklist eliminó) y\n` +
        `"fascitis necrotizante"→celulitis pese a existir ya el síndrome propio.\n\n` +
        `Si de verdad quieres reingestar: revisa primero validSyndromesMap y corre con --force.`
    );
}

const validSyndromesMap = {
    "ssti": "celulitis",
    "neumonía": "nac",
    "neumonía (nac)": "nac",
    "neumonía nosocomial": "nih",
    "neumonía asociada a ventilador": "nih",
    "neumonía en fq": "nih",
    "neumonía atípica": "nac",
    "endocarditis": "endocarditis_infecciosa",
    "osteomielitis": "pie_diabetico",
    "osteomielitis traumática": "pie_diabetico",
    "sepsis": "sepsis_urinaria",
    "faringoamigdalitis": "faringitis",
    "erisipela": "celulitis",
    "fascitis necrotizante": "celulitis",
    "meningitis": "meningitis",
    "itu": "itu_complicada",
    "itu en embarazadas": "itu_cistitis",
    "itu complicada": "itu_complicada",
    "itu nosocomial": "itu_complicada",
    "infección intraabdominal": "intraabdominal",
    "sepsis asociada a catéter": "nih",
    "enfermedad inflamatoria pélvica": "epi",
    "abscesos pélvicos": "epi",
    "peritonitis": "intraabdominal",
    "sepsis en quemados": "sepsis_urinaria",
    "sepsis neonatal": "meningitis",
    "epiglotitis": "faringitis",
    "diarrea asociada a salud": "intraabdominal",
    "colitis pseudomembranosa": "intraabdominal"
};

for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = parseCSVRow(lines[i]);
    const row = {};
    headers.forEach((h, idx) => {
        row[h] = values[idx] || '';
    });

    const splitField = (field) => field ? field.split(';').map(s => s.trim()).filter(Boolean) : [];

    const rawSyndromes = splitField(row.clin_syndromes);
    const mappedSyndromes = new Set();
    rawSyndromes.forEach(s => {
        const lower = s.toLowerCase();
        if (validSyndromesMap[lower]) {
            mappedSyndromes.add(validSyndromesMap[lower]);
        }
    });

    const pathogen = {
        id: row.id,
        name: row.name,
        shortName: row.shortName || row.name,
        aliases: splitField(row.aliases),
        taxonomy: {
            gram: row.tax_gram,
            morphology: row.tax_morphology || '',
            group: row.tax_group || ''
        },
        clinical: {
            summary: row.clin_summary || '',
            usualSyndromes: Array.from(mappedSyndromes),
            context: row.clin_context || '',
            pearls: splitField(row.clin_pearls)
        },
        resistance: {
            intrinsic: splitField(row.res_intrinsic),
            typicalAcquired: splitField(row.res_acquired),
            stewardshipNote: row.res_stewardship || ''
        },
        appMeta: {
            relevance: row.meta_relevance ? row.meta_relevance.toLowerCase() : 'medium',
            status: 'active'
        },
        category: row.category || 'bacteria',
        // Backward-compatibility properties
        tags: [
            row.tax_gram === 'positivo' ? 'gram_positive' :
                (row.tax_gram === 'negativo' ? 'gram_negative' :
                    (row.tax_gram === 'hongo' ? 'fungus' : 'atypical'))
        ],
        summary: row.clin_summary || '',
        common_syndromes: Array.from(mappedSyndromes),
        intrinsic_resistance: splitField(row.res_intrinsic),
        typical_resistance: splitField(row.res_acquired),
        stewardship_note: row.res_stewardship || ''
    };

    // Upsert to the map
    pathogensMap.set(pathogen.id, pathogen);
}

// Convert back to sequential array
const finalPathogensList = Array.from(pathogensMap.values());

const fileHeader = `/**
 * @fileoverview PATHOGENS DATA
 * 
 * ARCHITECTURAL CONTRACT (Clinical vs Presentation):
 * This file contains the root entities for clinical pathogens. 
 * 
 * [CLINICAL CORE] (Used for algorithmic rules/validation - do not change meaning arbitrarily)
 * - id: string
 * - taxonomy.gram: string
 * - resistance: object (canonical resistance patterns)
 * - clinical.usualSyndromes: string[] 
 * 
 * [PRESENTATION & CONTEXT] (Used primarily for UI display - safe to rephrase)
 * - name, synonyms, clinical.summary
 * - appMeta.order
 */\n\nconst pathogens = `;

const fileFooter = `;\n\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = pathogens;\n}\nelse if (typeof window !== "undefined") {\n  window.abg_pathogens = pathogens;\n}\n`;

const finalJsContent = fileHeader + JSON.stringify(finalPathogensList, null, 2) + fileFooter;
fs.writeFileSync(outPath, finalJsContent);

console.log('Successfully upserted pathogens. Total pathogens in system: ' + finalPathogensList.length);
