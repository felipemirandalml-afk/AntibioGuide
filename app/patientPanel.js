/**
 * =========================================================================
 * PATIENT PANEL (patientPanel.js)
 * =========================================================================
 * Capa de UI: conecta los inputs del panel de paciente con el estado
 * (window.ABG.patientContext) y renderiza el CrCl estimado. El cálculo y el
 * estado viven en las capas puras (renal.js / patientContext.js); acá solo
 * está el pegamento con el DOM.
 * =========================================================================
 */
window.ABG = window.ABG || {};

window.ABG.patientPanel = (function () {
    const esc = (s) =>
        String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
            ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

    function els() {
        return {
            toggle: document.getElementById("patient-toggle"),
            panel: document.getElementById("patient-panel"),
            chip: document.getElementById("patient-chip"),
            clear: document.getElementById("patient-clear"),
            age: document.getElementById("pt-age"),
            weight: document.getElementById("pt-weight"),
            sex: document.getElementById("pt-sex"),
            creatinine: document.getElementById("pt-creatinine"),
            result: document.getElementById("patient-renal-result"),
        };
    }

    // input vacío → null (no ingresado), distinto de 0.
    function numOrNull(v) {
        if (v == null || String(v).trim() === "") return null;
        const n = Number(v);
        return isFinite(n) ? n : null;
    }

    function readInputs(e) {
        return {
            age: numOrNull(e.age && e.age.value),
            weightKg: numOrNull(e.weight && e.weight.value),
            sex: (e.sex && e.sex.value) || null,
            creatinine: numOrNull(e.creatinine && e.creatinine.value),
        };
    }

    // Restaura los inputs desde el estado (persistencia en sessionStorage).
    function fillInputs(e) {
        const p = window.ABG.patientContext.get();
        if (e.age && p.age != null) e.age.value = p.age;
        if (e.weight && p.weightKg != null) e.weight.value = p.weightKg;
        if (e.sex && p.sex) e.sex.value = p.sex;
        if (e.creatinine && p.creatinine != null) e.creatinine.value = p.creatinine;
    }

    function stageColor(key) {
        // Color semántico por severidad (no es el acento de la marca).
        if (key === "G1" || key === "G2") return "text-green-700 dark:text-green-300";
        if (key === "G3a" || key === "G3b") return "text-amber-700 dark:text-amber-300";
        return "text-red-700 dark:text-red-300"; // G4 / G5
    }

    function renderResult(e) {
        if (!e.result) return;
        const pc = window.ABG.patientContext;

        if (!pc.canEstimateRenal()) {
            e.result.innerHTML =
                `<p class="text-xs text-gray-500 dark:text-slate-400">Completá edad, peso, sexo y creatinina para estimar el CrCl.</p>`;
            updateChip(e, null);
            return;
        }

        const r = pc.getRenalEstimate();
        if (!r || !r.ok) {
            const msgs = (r && r.errors ? r.errors : []).map((x) => `<li>${esc(x.message)}</li>`).join("");
            e.result.innerHTML =
                `<div class="text-xs text-red-700 dark:text-red-300"><p class="font-semibold mb-1">Revisá los datos:</p><ul class="list-disc pl-4">${msgs}</ul></div>`;
            updateChip(e, null);
            return;
        }

        const notes = (r.notes || []).map((n) => `<li>${esc(n)}</li>`).join("");
        e.result.innerHTML = `
            <div class="rounded-md border border-gray-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
              <div class="flex items-baseline gap-2 flex-wrap">
                <span class="text-2xl font-bold ${stageColor(r.stage.key)}" style="font-variant-numeric: tabular-nums;">${esc(r.crclRounded)}</span>
                <span class="text-sm text-gray-600 dark:text-slate-300">mL/min · CrCl estimado</span>
                <span class="text-xs font-medium ${stageColor(r.stage.key)}">${esc(r.stage.label)}</span>
              </div>
              <p class="text-[11px] text-gray-400 dark:text-slate-500 mt-1">${esc(r.formulaText)} · ${esc(r.reference)}</p>
              ${notes ? `<ul class="mt-2 list-disc pl-4 text-[11px] text-gray-500 dark:text-slate-400 space-y-0.5">${notes}</ul>` : ""}
            </div>`;
        updateChip(e, r);
    }

    function updateChip(e, r) {
        if (!e.chip) return;
        if (r && r.ok) {
            e.chip.textContent = `CrCl ${r.crclRounded}`;
            e.chip.classList.remove("hidden");
        } else {
            e.chip.textContent = "";
            e.chip.classList.add("hidden");
        }
    }

    // Cuando cambia el paciente, re-renderizar los resultados abiertos (cards de
    // fármaco) para que el resaltado de banda renal se actualice.
    function refreshOpenResults() {
        if (window.ABG.search && typeof window.ABG.search.handleSearch === "function") {
            window.ABG.search.handleSearch();
        }
    }

    function onInput(e) {
        window.ABG.patientContext.set(readInputs(e));
        renderResult(e);
        refreshOpenResults();
    }

    function init() {
        const e = els();
        if (!e.panel || !e.toggle) return; // panel ausente: no romper

        fillInputs(e);
        renderResult(e);

        // Si ya había datos (sessionStorage), abrir el panel al cargar.
        if (!window.ABG.patientContext.isEmpty()) {
            openPanel(e, true);
        }

        e.toggle.addEventListener("click", () => {
            const isOpen = !e.panel.hidden;
            openPanel(e, isOpen ? false : true);
        });

        ["age", "weight", "sex", "creatinine"].forEach((k) => {
            const el = e[k];
            if (el) el.addEventListener("input", () => onInput(e));
            if (el && el.tagName === "SELECT") el.addEventListener("change", () => onInput(e));
        });

        if (e.clear) {
            e.clear.addEventListener("click", () => {
                window.ABG.patientContext.clear();
                if (e.age) e.age.value = "";
                if (e.weight) e.weight.value = "";
                if (e.sex) e.sex.value = "";
                if (e.creatinine) e.creatinine.value = "";
                renderResult(e);
                refreshOpenResults();
            });
        }
    }

    function openPanel(e, open) {
        e.panel.hidden = !open;
        e.toggle.setAttribute("aria-expanded", String(open));
    }

    return { init };
})();
