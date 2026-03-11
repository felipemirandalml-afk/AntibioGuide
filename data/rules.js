/**
 * @fileoverview CLINICAL RULES LAYER (Base Stub)
 * 
 * This file serves as the strict architectural foundation for all future 
 * clinical rules logic (Stewardship, Regulatory, Validation scores).
 * Its purpose is to keep dynamic evaluation logic and contextual priorities
 * out of the static data dictionaries (/syndromes, /pathogens, etc) and 
 * out of the UI presentation layer (/app/render.js).
 * 
 * This object is injected into the global `clinicalData.rules` payload.
 */

const rules = {
    /**
     * Stewardship rules definitions.
     * e.g. future AWaRe classification engine, restriction alerts.
     */
    stewardship: {
        active: false,
        version: "1.0.0",
        enforceAWaRe: false,
    },

    /**
     * Regulatory rules definitions.
     * e.g. formal replacement for epivigila.js search heuristics, MINSAL mandates.
     */
    regulatory: {
        active: true,
        modules: ["epivigila_legacy"],
    },

    /**
     * Contextual/Resolution rules definitions.
     * e.g. engine specifying how to fallback or resolve conflicted resistance data.
     */
    contextual: {
        strictThresholds: true,
        defaultSusceptibilityThreshold: 75,
    },

    /**
     * Clinical decision support rules.
     * Defines logical triggers that the engine should evaluate.
     */
    clinical: {
        highResistanceAlerts: [
            {
                id: "rule_fq_itu_cistitis",
                syndrome_id: "itu_cistitis",
                pathogen_id: "escherichia_coli",
                antibiotic_id: "ciprofloxacino",
                threshold_r_pct: 20,
                message: "Resistencia local elevada a fluoroquinolonas en E. coli: evitar uso empírico si es posible."
            },
            {
                id: "rule_fq_itu_pielonefritis",
                syndrome_id: "itu_pielonefritis",
                pathogen_id: "escherichia_coli",
                antibiotic_ids: ["ciprofloxacino", "levofloxacino"],
                threshold_r_pct: 10,
                message: "Resistencia local elevada a fluoroquinolonas en E. coli: evitar uso empírico si es posible."
            },
            {
                id: "rule_macrolide_nac",
                syndrome_id: "nac",
                pathogen_id: "streptococcus_pneumoniae",
                antibiotic_id: "azitromicina",
                threshold_r_pct: 25,
                message: "Resistencia local elevada a macrólidos en neumococo: evitar monoterapia con macrólidos."
            }
        ],
        profileBranding: {
            "hra_hosp_adulto_2024": "HRA PROA 2024 · Hospitalizados adultos"
        }
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = rules;
} else if (typeof window !== "undefined") {
    window.abg_rules = rules;
}
