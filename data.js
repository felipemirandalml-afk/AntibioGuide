/**
 * =========================================================================
 * COMPATIBILITY ADAPTER (data.js)
 * =========================================================================
 * 
 * Notice: The official and structural source of data for AntibioGuide resides 
 * strictly in the `/data` directory (e.g. /data/syndromes.js, etc).
 * 
 * This file acts as a backwards compatibility adapter ensuring the data 
 * is correctly hoisted to `window.clinicalData` for external or legacy usage.
 * It SHOULD NOT grow as a primary source of logic/data.
 * =========================================================================
 */
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
    rules: window.abg_rules,
    interpretation: window.abg_interpretation,
    resistanceProfiles: window.abg_resistanceProfiles,
    meta: window.abg_meta
  };

  window.clinicalData = clinicalData;
}
