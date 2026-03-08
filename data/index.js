const syndromes = typeof require !== 'undefined' ? require('./syndromes.js') : window.abg_syndromes;
const pathogens = typeof require !== 'undefined' ? require('./pathogens.js') : window.abg_pathogens;
const antibiotics = typeof require !== 'undefined' ? require('./antibiotics.js') : window.abg_antibiotics;
const resistanceProfiles = typeof require !== 'undefined' ? require('./resistanceProfiles.js') : window.abg_resistanceProfiles;

// --- 2. Rules Layer Base ---
const rules = typeof require !== 'undefined' ? require('./rules.js') : window.abg_rules;

// --- 3. Presentation & Meta ---
const interpretation = typeof require !== 'undefined' ? require('./interpretation.js') : window.abg_interpretation;
const meta = typeof require !== 'undefined' ? require('./meta.js') : window.abg_meta;

const clinicalData = {
  // 1. Core Clinical Model
  syndromes,
  pathogens,
  antibiotics,
  resistanceProfiles,

  // 2. Rules Layer Base
  rules,

  // 3. Presentation & Meta
  interpretation,
  meta
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = clinicalData;
}