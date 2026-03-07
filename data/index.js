const syndromes = typeof require !== 'undefined' ? require('./syndromes.js') : window.abg_syndromes;
const pathogens = typeof require !== 'undefined' ? require('./pathogens.js') : window.abg_pathogens;
const antibiotics = typeof require !== 'undefined' ? require('./antibiotics.js') : window.abg_antibiotics;
const interpretation = typeof require !== 'undefined' ? require('./interpretation.js') : window.abg_interpretation;
const resistanceProfiles = typeof require !== 'undefined' ? require('./resistanceProfiles.js') : window.abg_resistanceProfiles;
const meta = typeof require !== 'undefined' ? require('./meta.js') : window.abg_meta;

const clinicalData = {
  syndromes,
  pathogens,
  antibiotics,
  interpretation,
  resistanceProfiles,
  meta
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = clinicalData;
}