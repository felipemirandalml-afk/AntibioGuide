const fs = require("fs");
const path = require("path");

const repoRoot = path.join(__dirname, "..");
const pathogensPath = path.join(repoRoot, "data", "pathogens.js");
const defaultSourcePaths = [
  path.join(repoRoot, "research", "NotebookLM", "Prueba patogeno1.md"),
  path.join(repoRoot, "research", "NotebookLM", "Prueba patogeno2.md"),
];

function readJsonFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadSourceArrays(sourcePaths) {
  let allNewPathogens = [];

  sourcePaths.forEach((sourcePath, index) => {
    if (!fs.existsSync(sourcePath)) {
      console.log(`Note: Source ${index + 1} missing, skipped: ${sourcePath}`);
      return;
    }

    try {
      const data = readJsonFile(sourcePath);
      if (Array.isArray(data)) {
        allNewPathogens = allNewPathogens.concat(data);
      } else {
        console.log(`Note: Source ${index + 1} is not an array, skipped: ${sourcePath}`);
      }
    } catch (error) {
      console.log(`Note: Source ${index + 1} failed to parse, skipped: ${sourcePath}`);
      console.log(error.message);
    }
  });

  return allNewPathogens;
}

const bartonella = {
  id: "bartonella_henselae",
  name: "Bartonella henselae",
  shortName: "B. henselae",
  aliases: ["Enfermedad por aranazo de gato"],
  taxonomy: {
    gram: "negative",
    morphology: "bacilo pequeno fastidioso",
    group: "Bartonellaceae"
  },
  clinical: {
    summary: "Causa principal de la linfadenitis regional tras contacto con gatos.",
    usualSyndromes: ["linfadenitis_regional", "endocarditis_cultivo_negativo"],
    context: "Zoonosis",
    pearls: [
      "Antecedente de aranazo o mordedura de gato (especialmente cachorros) en las 1-3 semanas previas.",
      "En inmunocomprometidos (VIH) puede causar angiomatosis bacilar y peliosis hepatica.",
      "Diagnostico suele ser serologico o por PCR de tejido ganglionar."
    ]
  },
  resistance: {
    intrinsic: [],
    typicalAcquired: [],
    stewardshipNote: "Tratamiento de eleccion en Chile: Azitromicina. Alternativa: Doxiciclina."
  },
  appMeta: {
    relevance: "alta",
    status: "active"
  }
};

const sourcePaths = process.argv.slice(2);
const activeSourcePaths = sourcePaths.length > 0 ? sourcePaths : defaultSourcePaths;
const allNewPathogens = loadSourceArrays(activeSourcePaths);

if (!allNewPathogens.some((p) => p && p.id === "bartonella_henselae")) {
  allNewPathogens.push(bartonella);
}

const existingPathogens = require(path.join(repoRoot, "data", "pathogens.js"));
const legacyId = "culture_negative_endocarditis_zoonotic";
const pathogens = existingPathogens.filter((p) => p.id !== legacyId);

allNewPathogens.forEach((newPathogen) => {
  if (!newPathogen || !newPathogen.id) return;

  const existingIndex = pathogens.findIndex((p) => p.id === newPathogen.id);
  if (existingIndex !== -1) {
    pathogens[existingIndex] = newPathogen;
    console.log(`Updated: ${newPathogen.id}`);
  } else {
    pathogens.push(newPathogen);
    console.log(`Added: ${newPathogen.id}`);
  }
});

const fileContent = `const pathogens = ${JSON.stringify(pathogens, null, 2)};

if (typeof module !== "undefined" && module.exports) {
  module.exports = pathogens;
}
else if (typeof window !== "undefined") {
  window.abg_pathogens = pathogens;
}
`;

fs.writeFileSync(pathogensPath, fileContent, "utf8");
console.log(`Success: Processed ${allNewPathogens.length} pathogens.`);
