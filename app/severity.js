/**
 * =========================================================================
 * SEVERITY / SCENARIO (severity.js)
 * =========================================================================
 * ARCHITECTURE GUARDRAIL: lógica clínica PURA. Sin HTML, sin DOM.
 *
 * Mapea la severidad del paciente (ambulatorio / hospitalizado / UCI) contra el
 * `scenario` de cada régimen, para resaltar el que corresponde al ámbito de
 * atención. Es un HINT, no un filtro: el clínico sigue viendo todos los
 * regímenes.
 *
 * MODELO:
 *  - El prefijo del scenario domina: "outpatient*" es ambulatorio aunque diga
 *    "severe" (p. ej. outpatient_severe = grave pero manejable en casa).
 *  - "non_icu" es una NEGACIÓN: NO es UCI (bug clásico de subcadena).
 *  - Un paciente en UCI también recibe regímenes de sala: por eso el nivel UCI
 *    acepta hosp + icu. Un paciente ambulatorio NO puede recibir un esquema EV
 *    intrahospitalario: ambulatorio solo acepta amb.
 * =========================================================================
 */
window.ABG = window.ABG || {};

window.ABG.severity = (function () {
    // Niveles de paciente que expone la UI.
    const LEVELS = ["outpatient", "inpatient", "icu"];
    const LABELS = { outpatient: "Ambulatorio", inpatient: "Hospitalizado", icu: "UCI / grave" };

    /**
     * Clasifica el `scenario` de un régimen en un nivel de ámbito.
     * @returns {"amb"|"hosp"|"icu"|"mixto"|"otro"}
     */
    function scenarioLevel(scenario) {
        const s = String(scenario || "").toLowerCase();
        if (!s) return "otro";

        const hasOut = s.indexOf("outpatient") !== -1;
        const hasIn = s.indexOf("inpatient") !== -1;

        // Abarca ambos ámbitos (p. ej. outpatient_or_inpatient) → mixto. Se
        // chequea PRIMERO: si no, el prefijo lo capturaría antes.
        if (hasOut && hasIn) return "mixto";

        // Prefijo outpatient manda: outpatient_* es ambulatorio aunque diga
        // "severe" (grave pero manejable en casa).
        if (hasOut) return "amb";

        // Marcadores de UCI/crítico, EXCLUYENDO la negación "non_icu".
        const isNonIcu = /non[_-]?icu/.test(s);
        const icuMarker =
            !isNonIcu &&
            (/(^|_)icu(_|$)/.test(s) ||
                /severe|septic|moderate_severe|nosocomial|pseudomonas/.test(s));
        if (icuMarker) return "icu";

        // Intrahospitalario (incl. endocarditis nve/pve y "_or_ed": ED es
        // nivel hospitalario, no ambulatorio).
        if (hasIn || s.startsWith("nve") || s.startsWith("pve") || /or_ed/.test(s)) return "hosp";

        return "otro";
    }

    // Qué niveles de scenario acepta cada severidad del paciente.
    const ACCEPTS = {
        outpatient: ["amb", "mixto"],
        inpatient: ["hosp", "mixto"],
        icu: ["icu", "hosp", "mixto"], // en UCI también aplican los de sala
    };

    /**
     * ¿El régimen (por su scenario) corresponde a la severidad del paciente?
     * @param {string} scenario
     * @param {"outpatient"|"inpatient"|"icu"} severity
     * @returns {boolean}
     */
    function matches(scenario, severity) {
        const accepts = ACCEPTS[severity];
        if (!accepts) return false;
        return accepts.indexOf(scenarioLevel(scenario)) !== -1;
    }

    return {
        LEVELS,
        LABELS,
        scenarioLevel,
        matches,
    };
})();
