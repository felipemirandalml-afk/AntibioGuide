// Adapter function for backwards compatibility
let clinicalData;

if (typeof module !== "undefined" && module.exports) {
  // Node.js environment
  clinicalData = require('./data/index.js');
  module.exports = clinicalData;
} else if (typeof window !== "undefined") {
  // Browser environment
  // In the browser, the scripts load in index.html and expose window.abg_syndromes etc.
  // We assemble them back into window.clinicalData exactly as it was.
  clinicalData = {
    syndromes: window.abg_syndromes,
    pathogens: window.abg_pathogens,
    antibiotics: window.abg_antibiotics,
    interpretation: window.abg_interpretation,
    resistanceProfiles: window.abg_resistanceProfiles,
    meta: window.abg_meta
  };

  window.clinicalData = clinicalData;
}
