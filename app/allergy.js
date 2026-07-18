/**
 * =========================================================================
 * ALLERGY ENGINE (allergy.js)
 * =========================================================================
 * ARCHITECTURE GUARDRAIL: lógica clínica PURA. Sin HTML, sin DOM. Devuelve
 * datos estructurados que la capa de UI usa para marcar regímenes.
 *
 * Chequea los fármacos de un régimen contra las alergias del paciente. La
 * clasificación se apoya en `antibiotics[].family` (vocabulario ya normalizado).
 *
 * MODELO CLÍNICO (decisión del médico, matizado por evidencia):
 *  - Alergia a PENICILINA:
 *      · penicilinas            → EVITAR (conflicto directo)
 *      · cefalosporinas / carbapenémicos → PRECAUCIÓN, reactividad cruzada baja
 *        (~1-2%): la mayoría de los alérgicos las tolera, sobre todo 3ª/4ª gen.
 *        NO se bloquean — bloquearlas empujaría a amplio espectro innecesario,
 *        lo contrario del propósito de la app.
 *      · aztreonam (monobactámico) → SIN reactividad cruzada (seguro).
 *  - Alergia a sulfas / macrólidos / quinolonas → EVITAR la clase, sin cruce.
 *
 * Las cifras de reactividad cruzada son orientativas; el clínico debe validar
 * contra la guía local y la severidad de la alergia.
 * =========================================================================
 */
window.ABG = window.ABG || {};

window.ABG.allergy = (function () {
    // Clase de alergia de un fármaco, por su familia (o nombre para sulfas,
    // que quedó en la familia genérica "Antifolato").
    function drugClass(drug) {
        const family = String(drug?.family || "");
        const name = String(drug?.name || "");
        if (/penicilina/i.test(family)) return "penicilina";
        if (/cefalospor/i.test(family)) return "cefalosporina";
        if (/carbapen/i.test(family)) return "carbapenemico";
        if (/monobact/i.test(family)) return "monobactamico";
        if (/macr[oó]lido/i.test(family)) return "macrolido";
        if (/quinolona/i.test(family)) return "quinolona";
        if (/sulfonamida/i.test(family) || /cotrimoxazol|sulfa/i.test(name)) return "sulfa";
        return null;
    }

    // Alergias soportadas en v1 y qué implica cada una.
    const CROSS_NOTE =
        "Reactividad cruzada baja con penicilina (~1-2%); la mayoría la tolera, sobre todo 3ª/4ª generación. Evaluar según severidad de la alergia y guía local.";
    const SAFE_NOTE = "Sin reactividad cruzada con penicilina.";

    /**
     * Evalúa UN fármaco contra las alergias del paciente.
     * @returns {Object|null} el peor hallazgo, o null si no aplica ninguna alergia.
     *   { level: "avoid"|"caution"|"safe", allergy, drugClass, note }
     */
    function checkDrug(drug, allergies) {
        const list = Array.isArray(allergies) ? allergies.map((a) => String(a).toLowerCase()) : [];
        if (!list.length) return null;
        const cls = drugClass(drug);
        if (!cls) return null;

        // Conflicto directo: la clase del fármaco es exactamente una alergia.
        if (list.includes(cls)) {
            return { level: "avoid", allergy: cls, drugClass: cls, note: null };
        }

        // Cruce por alergia a penicilina.
        if (list.includes("penicilina")) {
            if (cls === "cefalosporina" || cls === "carbapenemico") {
                return { level: "caution", allergy: "penicilina", drugClass: cls, note: CROSS_NOTE };
            }
            if (cls === "monobactamico") {
                return { level: "safe", allergy: "penicilina", drugClass: cls, note: SAFE_NOTE };
            }
        }
        return null;
    }

    const RANK = { avoid: 3, caution: 2, safe: 1 };

    /**
     * Evalúa un régimen (lista de objetos fármaco) contra las alergias.
     * @returns {Object} { level, conflicts:[{drug, ...checkDrug}] }
     *   level = el peor nivel entre los fármacos ("avoid" > "caution" > "safe"),
     *   o "ok" si ninguno aplica.
     */
    function checkRegimen(drugs, allergies) {
        const conflicts = [];
        (Array.isArray(drugs) ? drugs : []).forEach((drug) => {
            const hit = checkDrug(drug, allergies);
            if (hit) conflicts.push(Object.assign({ drug: drug?.name || drug?.id || "?" }, hit));
        });
        conflicts.sort((a, b) => (RANK[b.level] || 0) - (RANK[a.level] || 0));
        const level = conflicts.length ? conflicts[0].level : "ok";
        return { level, conflicts };
    }

    return {
        drugClass,
        checkDrug,
        checkRegimen,
        CROSS_NOTE,
        SAFE_NOTE,
    };
})();
