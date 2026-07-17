/**
 * =========================================================================
 * RENAL FUNCTION (renal.js)
 * =========================================================================
 * ARCHITECTURE GUARDRAIL:
 * Lógica clínica PURA. No contiene HTML ni formato de UI. Devuelve datos
 * estructurados que render.js/templates.js usan para construir la interfaz.
 *
 * Estima la depuración de creatinina (CrCl) por Cockcroft-Gault, el primer
 * ladrillo hacia la personalización por paciente (ajuste de dosis renal).
 *
 * SEGURIDAD CLÍNICA: esta app no tiene un clínico entre el dato y el paciente.
 * Por eso el módulo:
 *  - devuelve SIEMPRE la fórmula y la fuente junto al número, para que la UI
 *    las muestre y el resultado sea auditable;
 *  - NO aplica en silencio ajustes controvertidos (p. ej. redondear la
 *    creatinina en el adulto mayor): los expone como `notes` para que el
 *    clínico decida;
 *  - valida las entradas y rechaza lo que está fuera de rango en vez de
 *    devolver un número engañoso.
 *
 * Fuente: Cockcroft DW, Gault MH. Prediction of creatinine clearance from
 * serum creatinine. Nephron. 1976;16(1):31-41.
 * =========================================================================
 */
window.ABG = window.ABG || {};

window.ABG.renal = (function () {
    const REFERENCE = "Cockcroft & Gault, Nephron 1976;16(1):31-41";
    const FORMULA_TEXT = "CrCl = ((140 − edad) × peso × factorSexo) / (72 × creatinina)";
    const FEMALE_FACTOR = 0.85; // Cockcroft-Gault: mujeres × 0.85

    // La app es de adultos (meta.scope). Rangos plausibles para rechazar
    // entradas erróneas sin ser tan estrictos que molesten en la práctica.
    const LIMITS = {
        age: { min: 18, max: 120 },
        weightKg: { min: 20, max: 400 },
        creatinineMgDl: { min: 0.1, max: 20 },
    };

    // 1 mg/dL = 88.4 µmol/L. En Chile la creatinina suele venir en mg/dL,
    // pero se acepta µmol/L y se convierte para no forzar al usuario.
    const UMOL_PER_MGDL = 88.4;

    function toMgDl(value, unit) {
        if (unit === "umol/L" || unit === "umol" || unit === "µmol/L") {
            return value / UMOL_PER_MGDL;
        }
        return value; // mg/dL por defecto
    }

    function inRange(value, { min, max }) {
        return typeof value === "number" && isFinite(value) && value >= min && value <= max;
    }

    /**
     * @param {Object} p
     * @param {number} p.age          años
     * @param {number} p.weightKg     kg (peso total ingresado)
     * @param {"male"|"female"} p.sex
     * @param {number} p.creatinine   valor de creatinina sérica
     * @param {"mg/dL"|"umol/L"} [p.creatinineUnit="mg/dL"]
     * @returns {Object} resultado estructurado (nunca HTML)
     */
    function cockcroftGault(p) {
        const errors = [];
        const age = Number(p?.age);
        const weightKg = Number(p?.weightKg);
        const sex = p?.sex;
        const unit = p?.creatinineUnit || "mg/dL";
        const creatinineMgDl = toMgDl(Number(p?.creatinine), unit);

        if (!inRange(age, LIMITS.age)) {
            errors.push({ field: "age", message: `Edad fuera de rango (${LIMITS.age.min}–${LIMITS.age.max} años). La app es de adultos.` });
        }
        if (!inRange(weightKg, LIMITS.weightKg)) {
            errors.push({ field: "weightKg", message: `Peso fuera de rango (${LIMITS.weightKg.min}–${LIMITS.weightKg.max} kg).` });
        }
        if (sex !== "male" && sex !== "female") {
            errors.push({ field: "sex", message: "Sexo requerido (male | female) para el factor de Cockcroft-Gault." });
        }
        if (!inRange(creatinineMgDl, LIMITS.creatinineMgDl)) {
            errors.push({ field: "creatinine", message: `Creatinina fuera de rango (${LIMITS.creatinineMgDl.min}–${LIMITS.creatinineMgDl.max} mg/dL).` });
        }

        if (errors.length) {
            return { ok: false, errors, reference: REFERENCE, formulaText: FORMULA_TEXT };
        }

        const sexFactor = sex === "female" ? FEMALE_FACTOR : 1;
        const crcl = ((140 - age) * weightKg * sexFactor) / (72 * creatinineMgDl);
        const crclRounded = Math.round(crcl);

        return {
            ok: true,
            crcl,                     // valor crudo (mL/min)
            crclRounded,              // entero, para mostrar
            stage: kdigoStage(crcl),  // etapa KDIGO (contexto general)
            reducedFunction: crcl < 60,
            inputs: { age, weightKg, sex, creatinineMgDl, unit },
            formula: "Cockcroft-Gault",
            formulaText: FORMULA_TEXT,
            reference: REFERENCE,
            notes: buildNotes({ age, sex, creatinineMgDl }),
        };
    }

    /**
     * Etapa KDIGO por TFG estimada. Contexto general, NO umbral de dosificación:
     * el ajuste de dosis real depende de los cortes propios de cada antibiótico
     * (que hoy viven como prosa en antibiotics[].renal). Se estructurará después.
     */
    function kdigoStage(crcl) {
        if (crcl >= 90) return { key: "G1", label: "G1 — normal o alta (≥90)" };
        if (crcl >= 60) return { key: "G2", label: "G2 — leve (60–89)" };
        if (crcl >= 45) return { key: "G3a", label: "G3a — leve-moderada (45–59)" };
        if (crcl >= 30) return { key: "G3b", label: "G3b — moderada-severa (30–44)" };
        if (crcl >= 15) return { key: "G4", label: "G4 — severa (15–29)" };
        return { key: "G5", label: "G5 — falla renal (<15)" };
    }

    /**
     * Advertencias clínicas que NO se aplican solas: se muestran para que el
     * clínico decida. Cada una es un antipatrón conocido de Cockcroft-Gault.
     */
    function buildNotes({ age, sex, creatinineMgDl }) {
        const notes = [];
        // Peso: la fórmula se derivó con peso total, pero en obesidad lo
        // sobreestima. Sin talla no se puede calcular peso ideal/ajustado, así
        // que se advierte en vez de elegir en silencio.
        notes.push("Calculado con el peso ingresado. En obesidad, considerar peso ideal o ajustado (sobreestima con peso total).");
        // Creatinina baja en el adulto mayor: práctica controvertida de
        // redondear a 1.0. No se hace solo; se señala.
        if (age >= 65 && creatinineMgDl < 1.0) {
            notes.push("Adulto mayor con creatinina < 1,0 mg/dL: Cockcroft-Gault puede sobreestimar. Algunos redondean la creatinina a 1,0; decisión clínica, no se aplica automáticamente.");
        }
        notes.push("Estimación, no medición. Valores extremos de peso o masa muscular reducen su exactitud.");
        return notes;
    }

    /**
     * Matchea el CrCl de un paciente contra la prosa de ajuste renal de un
     * fármaco (antibiotics[].renal). Es la "victoria honesta": no inventa una
     * dosis, solo RESALTA la banda que aplica en el texto que ya tiene fuente.
     *
     * Formatos reales que maneja:
     *   "ClCr 10-29 mL/min: X; ClCr < 10 mL/min: Y."   → 2 bandas numéricas
     *   "Ajustar en IR significativa."                  → prosa sin bandas
     *
     * @param {string} prose  el texto de antibiotics[].renal
     * @param {number} crcl   depuración estimada (mL/min)
     * @returns {Object}
     *   parseable      ¿se encontró alguna banda numérica de ClCr?
     *   segments       [{ text, lo, hi, isMatch }]  (hi exclusivo en "< n")
     *   matchIndex     índice del segmento que aplica, o null
     *   aboveAllBands  el CrCl está por encima de toda banda de función reducida
     *                  listada → probablemente dosis estándar (la prosa solo
     *                  describe función reducida, no el rango normal)
     */
    function matchRenalBand(prose, crcl) {
        const text = String(prose || "");
        if (!text.trim() || typeof crcl !== "number" || !isFinite(crcl)) {
            return { parseable: false, segments: [], matchIndex: null, aboveAllBands: false };
        }

        const rawSegments = text.split(";").map((s) => s.trim()).filter(Boolean);
        const segments = rawSegments.map((seg) => {
            // "ClCr 10-29" / "ClCr 10 – 29"  → rango inclusivo [lo, hi]
            const range = seg.match(/ClCr\s*(\d+(?:[.,]\d+)?)\s*[-–]\s*(\d+(?:[.,]\d+)?)/i);
            if (range) {
                return { text: seg, lo: num(range[1]), hi: num(range[2]), kind: "range", isMatch: false };
            }
            // "ClCr < 10"  → por debajo de 10 (hi exclusivo)
            const below = seg.match(/ClCr\s*<\s*(\d+(?:[.,]\d+)?)/i);
            if (below) {
                return { text: seg, lo: -Infinity, hi: num(below[1]), kind: "below", isMatch: false };
            }
            return { text: seg, lo: null, hi: null, kind: "prose", isMatch: false };
        });

        const numeric = segments.filter((s) => s.kind !== "prose");
        if (numeric.length === 0) {
            return { parseable: false, segments, matchIndex: null, aboveAllBands: false };
        }

        let matchIndex = null;
        segments.forEach((s, i) => {
            if (matchIndex !== null) return;
            const hit =
                (s.kind === "range" && crcl >= s.lo && crcl <= s.hi) ||
                (s.kind === "below" && crcl < s.hi);
            if (hit) {
                s.isMatch = true;
                matchIndex = i;
            }
        });

        // Por encima del techo de todas las bandas de función reducida.
        const maxHi = Math.max(...numeric.map((s) => (s.kind === "range" ? s.hi : s.hi)));
        const aboveAllBands = matchIndex === null && crcl > maxHi;

        return { parseable: true, segments, matchIndex, aboveAllBands };
    }

    function num(s) {
        return parseFloat(String(s).replace(",", "."));
    }

    return {
        cockcroftGault,
        kdigoStage,
        matchRenalBand,
        REFERENCE,
        FORMULA_TEXT,
        LIMITS,
    };
})();
