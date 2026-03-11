const fs = require('fs');
const path = require('path');

const pathogensPath = path.resolve('d:/AntibioGuide/data/pathogens.js');
const syndromesPath = path.resolve('d:/AntibioGuide/data/syndromes.js');
const sourcePath = path.resolve('d:/AntibioGuide/Prueba NotebookLM/Prueba patogeno1.md');

// 1. Read source data
const sourceContent = fs.readFileSync(sourcePath, 'utf8');
const newPathogens = JSON.parse(sourceContent);

// 2. Add Bartonella henselae (The missing piece)
newPathogens.push({
    "id": "bartonella_henselae",
    "name": "Bartonella henselae",
    "shortName": "B. henselae",
    "aliases": ["Enfermedad por arañazo de gato"],
    "taxonomy": {
      "gram": "negative",
      "morphology": "bacilo pequeño fastidioso",
      "group": "Bartonellaceae"
    },
    "clinical": {
      "summary": "Causa principal de la linfadenitis regional tras contacto con gatos.",
      "usualSyndromes": ["linfadenitis_regional", "endocarditis_cultivo_negativo"],
      "context": "Zoonosis",
      "pearls": [
        "Antecedente de arañazo o mordedura de gato (especialmente cachorros) en las 1-3 semanas previas.",
        "En inmunocomprometidos (VIH) puede causar angiomatosis bacilar y peliosis hepática.",
        "Diagnóstico suele ser serológico o por PCR de tejido ganglionar."
      ]
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [],
      "stewardshipNote": "Tratamiento de elección en Chile: Azitromicina (reduce el volumen ganglionar). Alternativa: Doxiciclina."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
});

// 3. Load existing pathogens
let pathogensContent = fs.readFileSync(pathogensPath, 'utf8');
const arrayStart = pathogensContent.indexOf('const pathogens = [');
const arrayEnd = pathogensContent.lastIndexOf('];');
const beforeArr = pathogensContent.substring(0, arrayStart + 'const pathogens = '.length);
const arrStr = pathogensContent.substring(arrayStart + 'const pathogens = '.length, arrayEnd + 1);
const afterArr = pathogensContent.substring(arrayEnd + 1);

let pathogens = eval(arrStr);

// 4. Remove the legacy composite ID
const legacyId = "culture_negative_endocarditis_zoonotic";
pathogens = pathogens.filter(p => p.id !== legacyId);

// 5. Merge new ones (avoiding duplicates if script is re-run)
newPathogens.forEach(newP => {
    const existingIndex = pathogens.findIndex(p => p.id === newP.id);
    if (existingIndex !== -1) {
        pathogens[existingIndex] = newP;
    } else {
        pathogens.push(newP);
    }
});

// 6. Write back pathogens.js
const newArrStr = JSON.stringify(pathogens, null, 2);
fs.writeFileSync(pathogensPath, beforeArr + newArrStr + afterArr, 'utf8');
console.log(`Pathogens updated: Added ${newPathogens.length} new/updated entries. Removed ${legacyId}.`);

// 7. Update syndromes.js references
let syndromesContent = fs.readFileSync(syndromesPath, 'utf8');
const oldRef = `"culture_negative_endocarditis_zoonotic"`;
const newRefs = `"coxiella_burnetii", "bartonella_henselae", "brucella_spp"`;

if (syndromesContent.includes(oldRef)) {
    syndromesContent = syndromesContent.replace(oldRef, newRefs);
    fs.writeFileSync(syndromesPath, syndromesContent, 'utf8');
    console.log("Syndromes updated: Replaced composite ID with individual IDs.");
} else {
    console.log("No legacy references found in syndromes.js.");
}
