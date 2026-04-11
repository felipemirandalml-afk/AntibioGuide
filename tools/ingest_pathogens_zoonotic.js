const fs = require("fs");
const path = require("path");

const repoRoot = path.join(__dirname, "..");
const pathogensPath = path.join(repoRoot, "data", "pathogens.js");
const syndromesPath = path.join(repoRoot, "data", "syndromes.js");
const defaultSourcePath = path.join(repoRoot, "research", "NotebookLM", "Prueba patogeno1.md");

const sourcePath = process.argv[2] || defaultSourcePath;

if (!fs.existsSync(sourcePath)) {
  console.error(`Source file not found: ${sourcePath}`);
  process.exit(1);
}

const newPathogens = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

newPathogens.push({
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
});

const existingPathogens = require(path.join(repoRoot, "data", "pathogens.js"));
const legacyId = "culture_negative_endocarditis_zoonotic";
const pathogens = existingPathogens.filter((p) => p.id !== legacyId);

newPathogens.forEach((newPathogen) => {
  if (!newPathogen || !newPathogen.id) return;

  const existingIndex = pathogens.findIndex((p) => p.id === newPathogen.id);
  if (existingIndex !== -1) {
    pathogens[existingIndex] = newPathogen;
  } else {
    pathogens.push(newPathogen);
  }
});

const pathogensFileContent = `const pathogens = ${JSON.stringify(pathogens, null, 2)};

if (typeof module !== "undefined" && module.exports) {
  module.exports = pathogens;
}
else if (typeof window !== "undefined") {
  window.abg_pathogens = pathogens;
}
`;

fs.writeFileSync(pathogensPath, pathogensFileContent, "utf8");
console.log(`Pathogens updated: Added ${newPathogens.length} new or updated entries. Removed ${legacyId}.`);

let syndromesContent = fs.readFileSync(syndromesPath, "utf8");
const oldRef = `"culture_negative_endocarditis_zoonotic"`;
const newRefs = `"coxiella_burnetii", "bartonella_henselae", "brucella_spp"`;

if (syndromesContent.includes(oldRef)) {
  syndromesContent = syndromesContent.replace(oldRef, newRefs);
  fs.writeFileSync(syndromesPath, syndromesContent, "utf8");
  console.log("Syndromes updated: Replaced composite ID with individual IDs.");
} else {
  console.log("No legacy references found in syndromes.js.");
}
