/**
 * =========================================================================
 * PATIENT CONTEXT (patientContext.js)
 * =========================================================================
 * Estado del paciente activo para la personalización de recomendaciones.
 * Es el cimiento sobre el que se apoyan el ajuste renal, el filtro por
 * alergia y la selección de escenario por severidad.
 *
 * Capa de ESTADO (como localContext.js), no de UI: guarda/lee el paciente y
 * expone el CrCl derivado llamando a la capa engine (window.ABG.renal). No
 * construye HTML.
 *
 * PRIVACIDAD: el paciente se guarda en sessionStorage, NO en localStorage —
 * se borra al cerrar la pestaña. Son datos sensibles de una consulta puntual,
 * no una preferencia persistente del usuario. Nada sale del navegador.
 * =========================================================================
 */
window.ABG = window.ABG || {};

window.ABG.patientContext = (function () {
    const STORAGE_KEY = "abg_patient_context";

    // Forma del paciente. `null` en un campo = no ingresado (distinto de 0).
    function emptyPatient() {
        return {
            age: null,
            weightKg: null,
            sex: null,             // "male" | "female"
            creatinine: null,      // valor numérico
            creatinineUnit: "mg/dL",
            allergies: [],         // p. ej. ["penicilina"]
            severity: null,        // "outpatient" | "inpatient" | "icu" (se mapea a escenario)
        };
    }

    let patient = load();

    function load() {
        try {
            const raw = sessionStorage.getItem(STORAGE_KEY);
            if (!raw) return emptyPatient();
            const parsed = JSON.parse(raw);
            return Object.assign(emptyPatient(), parsed);
        } catch (e) {
            return emptyPatient();
        }
    }

    function persist() {
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(patient));
        } catch (e) {
            /* sessionStorage lleno o bloqueado: seguir en memoria, sin romper */
        }
    }

    function get() {
        // Copia defensiva: el estado no se muta desde afuera.
        return Object.assign({}, patient, { allergies: patient.allergies.slice() });
    }

    /** Actualiza campos y persiste. Devuelve el paciente resultante. */
    function set(patch) {
        if (patch && typeof patch === "object") {
            patient = Object.assign({}, patient, patch);
            if (!Array.isArray(patient.allergies)) patient.allergies = [];
        }
        persist();
        return get();
    }

    function clear() {
        patient = emptyPatient();
        persist();
        return get();
    }

    function hasAllergy(name) {
        if (!name) return false;
        const n = String(name).toLowerCase();
        return patient.allergies.some((a) => String(a).toLowerCase() === n);
    }

    /**
     * ¿Alcanzan los datos para estimar la función renal?
     * (edad, peso, sexo y creatinina son los 4 que pide Cockcroft-Gault.)
     */
    function canEstimateRenal() {
        return (
            patient.age != null &&
            patient.weightKg != null &&
            (patient.sex === "male" || patient.sex === "female") &&
            patient.creatinine != null
        );
    }

    /**
     * CrCl del paciente actual, delegando en la capa engine. Devuelve el mismo
     * objeto estructurado que window.ABG.renal.cockcroftGault (ok/errors/crcl…),
     * o null si aún no hay datos suficientes.
     */
    function getRenalEstimate() {
        if (!canEstimateRenal()) return null;
        if (!window.ABG.renal || typeof window.ABG.renal.cockcroftGault !== "function") return null;
        return window.ABG.renal.cockcroftGault({
            age: patient.age,
            weightKg: patient.weightKg,
            sex: patient.sex,
            creatinine: patient.creatinine,
            creatinineUnit: patient.creatinineUnit,
        });
    }

    /** ¿Hay algún dato de paciente cargado? (para que la UI sepa si mostrar el resumen.) */
    function isEmpty() {
        return (
            patient.age == null &&
            patient.weightKg == null &&
            patient.sex == null &&
            patient.creatinine == null &&
            patient.allergies.length === 0 &&
            patient.severity == null
        );
    }

    return {
        STORAGE_KEY,
        emptyPatient,
        get,
        set,
        clear,
        hasAllergy,
        canEstimateRenal,
        getRenalEstimate,
        isEmpty,
    };
})();
