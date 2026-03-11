const fs = require('fs');
const path = require('path');

const pathogensPath = path.resolve('d:/AntibioGuide/data/pathogens.js');
const sourcePath1 = path.resolve('d:/AntibioGuide/Prueba NotebookLM/Prueba patogeno1.md');
const sourcePath2 = path.resolve('d:/AntibioGuide/Prueba NotebookLM/Prueba patogeno2.md');

// 1. Load source data from all files
let allNewPathogens = [];

try {
    const data1 = JSON.parse(fs.readFileSync(sourcePath1, 'utf8'));
    allNewPathogens = allNewPathogens.concat(data1);
} catch (e) {
    console.log("Note: Source 1 failed or missing (ignoring if expected)");
}

try {
    const data2 = JSON.parse(fs.readFileSync(sourcePath2, 'utf8'));
    allNewPathogens = allNewPathogens.concat(data2);
} catch (e) {
    console.log("Note: Source 2 failed or missing (ignoring if expected)");
}

// 2. Add Bartonella henselae (The missing piece we agreed on earlier)
const bartonella = {
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
};

if (!allNewPathogens.some(p => p.id === "bartonella_henselae")) {
    allNewPathogens.push(bartonella);
}

// 3. Load existing pathogens
let pathogensContent = fs.readFileSync(pathogensPath, 'utf8');
const arrayStart = pathogensContent.indexOf('const pathogens = [');
const arrayEnd = pathogensContent.lastIndexOf('];');
const beforeArr = pathogensContent.substring(0, arrayStart + 'const pathogens = '.length);
const arrStr = pathogensContent.substring(arrayStart + 'const pathogens = '.length, arrayEnd + 1);
const afterArr = pathogensContent.substring(arrayEnd + 1);

let pathogens = eval(arrStr);

// 4. Remove the legacy composite ID if it still exists
const legacyId = "culture_negative_endocarditis_zoonotic";
pathogens = pathogens.filter(p => p.id !== legacyId);

// 5. Merge/Update
allNewPathogens.forEach(newP => {
    const existingIndex = pathogens.findIndex(p => p.id === newP.id);
    if (existingIndex !== -1) {
        pathogens[existingIndex] = newP;
        console.log(`Updated: ${newP.id}`);
    } else {
        pathogens.push(newP);
        console.log(`Added: ${newP.id}`);
    }
});

// 6. Final Save
const newArrStr = JSON.stringify(pathogens, null, 2);
fs.writeFileSync(pathogensPath, beforeArr + newArrStr + afterArr, 'utf8');
console.log(`Success: Processed ${allNewPathogens.length} pathogens.`);
