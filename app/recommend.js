/**
 * =========================================================================
 * RECOMMENDATION ENGINE (recommend.js)
 * =========================================================================
 * ARCHITECTURE GUARDRAIL: lógica clínica PURA. Sin HTML, sin DOM. Devuelve
 * datos estructurados que la UI (tarjeta de recomendación) renderiza.
 *
 * Dado un síndrome + el paciente + el contexto local, RANKEA los regímenes y
 * elige el recomendado. Une las tres personalizaciones ya construidas:
 *   - alergia   (allergy.js)        → EXCLUYE lo contraindicado (avoid)
 *   - resistencia (clinicalEngine)  → DEMOTA lo que supera el umbral local
 *   - severidad (severity.js)       → prioriza el régimen del ámbito
 *
 * La resistencia local pesa por encima del orden de guía: si la 1ª línea
 * empírica tiene resistencia local elevada, cae por debajo de una alternativa
 * limpia. Sin resistencia local, gana el orden de guía (empírico primero). Ese
 * es el diferenciador para el generalista sin infectólogo.
 *
 * NO decide dosis. La dosis y el ajuste renal son capa de presentación.
 * =========================================================================
 */
window.ABG = window.ABG || {};

window.ABG.recommend = (function () {
    // Pesos del score (menor = mejor). La resistencia domina para poder invertir
    // el orden de guía; los demás desempatan.
    const W_RESISTANCE = 1000; // por cada alerta de resistencia local
    const W_SEV_MISS = 500;    // no coincide con el ámbito del paciente
    const W_NON_EMPIRIC = 100; // alternativa/dirigido por debajo de empírico
    const W_ALLERGY_CAUTION = 50; // reactividad cruzada (no bloqueo)

    function drugsOf(regimen) {
        const ids = Array.isArray(regimen && regimen.drugIds) ? regimen.drugIds.filter(Boolean) : [];
        const get = window.ABG.helpers && window.ABG.helpers.getAntibioticById;
        return ids.map((id) => (get ? get(id) : null)).filter(Boolean);
    }

    /** Evalúa un régimen contra el paciente + contexto local. */
    function evaluate(regimen, syndromeId, patient) {
        const drugs = drugsOf(regimen);

        const allergyEngine = window.ABG.allergy;
        const allergy = allergyEngine
            ? allergyEngine.checkRegimen(drugs, (patient && patient.allergies) || [])
            : { level: "ok", conflicts: [] };

        const engine = window.ABG.clinicalEngine;
        const warnings = engine && typeof engine.getRegimenWarnings === "function"
            ? engine.getRegimenWarnings(syndromeId, (regimen.drugIds || []))
            : [];

        const sev = window.ABG.severity;
        const patientSeverity = patient && patient.severity;
        const severityMatch = patientSeverity && sev ? sev.matches(regimen.scenario, patientSeverity) : null;

        const isEmpiric = regimen.type === "empiric";
        const score =
            warnings.length * W_RESISTANCE +
            (severityMatch === false ? W_SEV_MISS : 0) +
            (isEmpiric ? 0 : W_NON_EMPIRIC) +
            (allergy.level === "caution" ? W_ALLERGY_CAUTION : 0);

        return { regimen, drugs, allergy, warnings, severityMatch, score };
    }

    /**
     * Recomendación para un síndrome dado el paciente.
     * @returns {Object}
     *   recommended     entry | null
     *   alternatives    entry[]  (candidatos no recomendados)
     *   excluded        entry[]  (contraindicados por alergia — nivel avoid)
     *   severityFallback bool    (había severidad pero ningún régimen del ámbito)
     */
    function forSyndrome(syndrome, patient) {
        const regimens = Array.isArray(syndrome && syndrome.regimens) ? syndrome.regimens : [];
        const all = regimens.map((r) => evaluate(r, syndrome.id, patient));

        // Alergia nivel "avoid" → contraindicado, fuera del pool.
        const excluded = all.filter((e) => e.allergy.level === "avoid");
        let pool = all.filter((e) => e.allergy.level !== "avoid");

        // Si hay severidad, preferir los del ámbito; si NINGUNO coincide, no
        // filtrar por ámbito (mejor recomendar algo con nota que nada).
        let severityFallback = false;
        const hasSeverity = !!(patient && patient.severity);
        if (hasSeverity) {
            const matching = pool.filter((e) => e.severityMatch === true);
            if (matching.length) {
                pool = matching;
            } else if (pool.length) {
                severityFallback = true;
            }
        }

        // Orden estable por score (menor = mejor); mantiene el orden original
        // como desempate final.
        const ranked = pool
            .map((e, i) => ({ e, i }))
            .sort((a, b) => a.e.score - b.e.score || a.i - b.i)
            .map((x) => x.e);

        return {
            recommended: ranked[0] || null,
            alternatives: ranked.slice(1),
            excluded,
            severityFallback,
        };
    }

    return {
        forSyndrome,
        evaluate,
    };
})();
