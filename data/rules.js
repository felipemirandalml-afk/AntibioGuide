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
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = rules;
} else if (typeof window !== "undefined") {
    window.abg_rules = rules;
}
