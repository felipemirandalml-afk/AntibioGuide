const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '..', 'data-files', 'seeds', 'pathogens.csv');
const outPath = path.join(__dirname, '..', 'data', 'pathogens.js');

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
