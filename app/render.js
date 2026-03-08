window.ABG = window.ABG || {};

window.ABG.render = (function () {
    const { escapeHTML } = window.ABG.helpers;

    function evaluateEpivigila(queryRaw = "") {
        const { epiBanner } = window.ABG.state.dom;
        if (!epiBanner) return;
        if (!window.EPIVIGILA) return;
        if (typeof window.EPIVIGILA.matchEpivigila !== "function") return;
        if (typeof window.EPIVIGILA.renderEpivigilaBanner !== "function") return;

        if ((queryRaw || "").trim() === "") {
            window.EPIVIGILA.renderEpivigilaBanner({
                bannerElement: epiBanner,
                match: null
            });
            return;
        }

        const match = window.EPIVIGILA.matchEpivigila({
            query: queryRaw,
            normalize: window.ABG.helpers.normalize
        });

        window.EPIVIGILA.renderEpivigilaBanner({
            bannerElement: epiBanner,
            match
        });
    }

    function getLocalSusceptibilityForPathogen(profile, pathogenId) {
        try {
            if (!profile || !pathogenId) return null;
            const profileData = profile?.data?.[pathogenId];
            if (!profileData || typeof profileData !== "object") return null;

            let sourceData = profileData;
            const keys = Object.keys(profileData);
            const hasSubsources = keys.some((k) => {
                const v = profileData[k];
                return v && typeof v === "object" && !Array.isArray(v) && !("s_pct" in v) && !("ri" in v);
            });

            if (hasSubsources) {
                const selectedKey = Object.prototype.hasOwnProperty.call(profileData, "sterile")
                    ? "sterile"
                    : keys.find((k) => profileData[k] && typeof profileData[k] === "object");
                sourceData = selectedKey ? profileData[selectedKey] : null;
            }

            if (!sourceData || typeof sourceData !== "object") return null;

            function humanizeId(id) {
                return String(id || "").replace(/_/g, " ").trim();
            }

            const items = [];
            let bleePct;

            Object.entries(sourceData).forEach(([abxId, value]) => {
                if (abxId === "blee_pct" && typeof value === "number") {
                    bleePct = value;
                    return;
                }

                if (!value || typeof value !== "object") return;

                const abxName = window.clinicalData?.antibiotics?.find((a) => a?.id === abxId)?.name || humanizeId(abxId);

                if (value.ri === true) {
                    items.push({ label: abxName, ri: true });
                    return;
                }

                if (typeof value.s_pct === "number") {
                    items.push({ label: abxName, s_pct: value.s_pct });
                }
            });

            if (items.length === 0 && bleePct === undefined) return null;
            return bleePct !== undefined ? { items, blee_pct: bleePct } : { items };
        } catch (_err) {
            return null;
        }
    }

    function renderLocalSusceptibilityBanner(profile, pathogenId) {
        try {
            const local = getLocalSusceptibilityForPathogen(profile, pathogenId);
            if (!local) return "";

            const threshold = Number(profile?.threshold_s_pct ?? profile?.threshold ?? 75);
            const items = Array.isArray(local.items) ? local.items : [];
            const maxItems = 6;
            const sortedItems = items
                .map((item, idx) => {
                    const isRi = item?.ri === true || String(item?.ri || "").toUpperCase() === "RI";
                    const s = Number(item?.s_pct);
                    let group = 4;
                    if (!isRi) {
                        if (s >= threshold) group = 1;
                        else if (s >= 50) group = 2;
                        else group = 3;
                    }
                    return { ...item, idx, group, s, isRi };
                })
                .sort((a, b) => {
                    if (a.group !== b.group) return a.group - b.group;
                    if (a.group !== 4 && b.group !== 4 && a.s !== b.s) return b.s - a.s;
                    return a.idx - b.idx;
                });
            const shown = sortedItems.slice(0, maxItems);

            const chips = shown
                .map((item) => {
                    if (item.isRi) {
                        return `<span class="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">🧬 ${escapeHTML(item.label)} RI</span>`;
                    }

                    const icon = item.s >= threshold ? "🟢" : item.s >= 50 ? "🟡" : "🔴";
                    return `<span class="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">${icon} ${escapeHTML(item.label)} ${escapeHTML(item.s)}%</span>`;
                })
                .join("");

            const bleeChip =
                typeof local.blee_pct === "number"
                    ? `<span class="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">BLEE ${escapeHTML(local.blee_pct)}%</span>`
                    : "";

            let subtitle = `Perfil local · Empírico ≥${threshold}%`;
            if (profile?.id === "hra_hosp_adulto_2024") {
                subtitle = `HRA PROA 2024 · Hospitalizados adultos · Empírico ≥${threshold}%`;
            } else if (profile?.label) {
                const shortLabel = String(profile.label).split("(")[0].trim() || "Perfil local";
                subtitle = `${shortLabel} · Empírico ≥${threshold}%`;
            }

            return `
        <div class="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
          <div class="font-semibold">Susceptibilidad local</div>
          <div class="text-slate-600 dark:text-slate-300">${escapeHTML(subtitle)}</div>
          <div class="mt-1 flex flex-wrap gap-2">${chips}${bleeChip}</div>
        </div>
      `;
        } catch (_err) {
            return "";
        }
    }

    function getRegimenWarnings(syndromeId, regimenDrugIds = []) {
        const profile = window.ABG.localContext.getActiveProfile();
        if (!profile || !Array.isArray(profile.modifiers)) return [];

        const warnings = [];

        profile.modifiers.forEach(mod => {
            if (mod.action !== "show_warning") return;
            if (mod.syndrome_id !== syndromeId) return;

            if (!regimenDrugIds.includes(mod.match?.antibiotic_id)) return;

            const rData =
                profile.data?.[mod.match?.pathogen_id]?.[mod.match?.antibiotic_id];

            if (!rData || typeof rData.r_pct !== "number") return;

            if (rData.r_pct >= mod.threshold_r_pct) {
                warnings.push(
                    `${mod.message} (R local: ${rData.r_pct}%, perfil: ${profile.label})`
                );
            }
        });

        return warnings;
    }

    function showSyndromeDetail(s) {
        const { modalContent } = window.ABG.state.dom;
        if (!modalContent) return;

        const name = escapeHTML(s?.name || "");
        const desc = escapeHTML(s?.description || "");
        const outpatient = escapeHTML(s?.criteria?.outpatient || "N/A");
        const hospital = escapeHTML(s?.criteria?.hospital || "N/A");
        const regimens = Array.isArray(s?.regimens) ? s.regimens : [];
        const pathogens = Array.isArray(s?.pathogens) ? s.pathogens : [];

        modalContent.innerHTML = `
      <h2 class="text-3xl font-bold text-blue-900 mb-2">${name}</h2>
      <p class="text-gray-600 dark:text-slate-300 italic mb-6">${desc}</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div class="bg-blue-50 border border-blue-200 p-4 rounded-lg dark:bg-blue-950/40 dark:border-blue-800/40 dark:text-blue-200">
          <h4 class="font-bold text-blue-800 dark:text-blue-300 text-sm uppercase"><i class="fas fa-home mr-2"></i> Manejo Ambulatorio</h4>
          <p class="text-sm text-gray-700 dark:text-blue-200 mt-1">${outpatient}</p>
        </div>
        <div class="bg-orange-50 border border-orange-200 p-4 rounded-lg dark:bg-amber-950/30 dark:border-amber-800/40 dark:text-amber-200">
          <h4 class="font-bold text-orange-800 dark:text-amber-300 text-sm uppercase"><i class="fas fa-hospital mr-2"></i> Criterios Hospitalización</h4>
          <p class="text-sm text-gray-700 dark:text-amber-200 mt-1">${hospital}</p>
        </div>
      </div>

      <h3 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Esquemas Antibióticos Recomendados</h3>
      <div class="space-y-6">
        ${regimens
                .map((r) => {
                    const rName = escapeHTML(r?.name || "");
                    const ref = escapeHTML(r?.reference || "");
                    const dose = escapeHTML(r?.dose || "");
                    const route = escapeHTML(r?.route || "");
                    const interval = escapeHTML(r?.interval || "");
                    const duration = escapeHTML(r?.duration || "");
                    const durationInfoRaw = typeof r?.durationInfo === "string" ? r.durationInfo.trim() : "";
                    const durationRefs = Array.isArray(r?.durationRefsShort) ? r.durationRefsShort.filter(Boolean) : [];
                    const durationInfo = escapeHTML(durationInfoRaw);
                    const durationRefsAttr = escapeHTML(durationRefs.join("||"));
                    const durationInfoBtn = durationInfoRaw
                        ? `<button type="button"
                  data-duration-info-btn="true"
                  data-duration-info="${durationInfo}"
                  data-duration-refs="${durationRefsAttr}"
                  class="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
                  aria-label="Ver respaldo de duración"
                  title="Ver respaldo de duración">
                  ⓘ
                </button>`
                        : "";
                    const comments = escapeHTML(r?.comments || "");

                    const ids = Array.isArray(r?.drugIds) ? r.drugIds.filter(Boolean) : [];
                    const regimenWarnings = getRegimenWarnings(s?.id, ids);
                    let drugBlock = "";

                    if (ids.length > 0) {
                        const chips = ids
                            .map((id) => {
                                const abx = window.ABG.helpers.getAntibioticById(id);
                                const label = escapeHTML(abx?.name || id);
                                return `<button type="button"
                    data-drugid="${escapeHTML(id)}"
                    class="inline-flex items-center px-2 py-1 mr-2 mt-2 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm font-semibold hover:bg-emerald-100">
                    <i class="fas fa-pills mr-1"></i>${label}
                  </button>`;
                            })
                            .join("");
                        drugBlock = `<div class="mt-2">${chips}</div>`;
                    } else {
                        const drugNameRaw = r?.drug || "";
                        const drugNameEsc = escapeHTML(drugNameRaw);
                        drugBlock = drugNameRaw
                            ? `<button type="button"
                    data-drugname="${drugNameEsc}"
                    class="text-lg font-semibold mt-1 text-emerald-800 underline hover:text-emerald-900">
                    ${drugNameEsc}
                  </button>`
                            : "";
                    }

                    return `
              <div class="border-l-4 border-blue-400 pl-4 py-2">
                <div class="flex justify-between items-start">
                  <h4 class="font-bold text-blue-700">${rName}</h4>
                  <span class="text-xs bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-slate-400 px-2 py-1 rounded">${ref}</span>
                </div>
                ${drugBlock}
                <p class="text-sm text-gray-600 dark:text-slate-300 font-medium">${dose} ${route} ${interval} (${duration})${durationInfoBtn}</p>
                <p class="text-sm text-gray-500 dark:text-slate-300 mt-2 italic">${comments}</p>
                ${regimenWarnings.length > 0
                            ? `
                    <div class="mt-3 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                      <div class="font-semibold">⚠️ Contexto local</div>
                      <ul class="list-disc pl-5 mt-1">
                        ${regimenWarnings.map(w => `<li>${escapeHTML(w)}</li>`).join("")}
                      </ul>
                    </div>
                    `
                            : ""
                        }
              </div>
            `;
                })
                .join("")}
      </div>

      <div class="mt-8 pt-6 border-t">
        <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Patógenos habituales</h4>
        <div class="flex flex-wrap gap-2">
          ${pathogens
                .map(
                    (p) =>
                        `<span class="bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-300 text-xs px-2 py-1 rounded-full border border-gray-200 dark:border-slate-700">${escapeHTML(
                            p
                        )}</span>`
                )
                .join("")}
        </div>
      </div>
    `;

        if (typeof window.ABG.modal.openModal === "function") {
            window.ABG.modal.openModal();
        }
    }

    function showMedDetail(a) {
        const { modalContent } = window.ABG.state.dom;
        if (!modalContent) return;

        const name = escapeHTML(a?.name || "");
        const family = escapeHTML(a?.family || "");
        const mechanism = escapeHTML(a?.mechanism || "");
        const spectrum = escapeHTML(a?.spectrum || "");
        const dose = escapeHTML(a?.dose || "");
        const renal = escapeHTML(a?.renal || "");
        const contraindications = escapeHTML(a?.contraindications || "");
        const adverse = escapeHTML(a?.adverse || "");
        const uses = escapeHTML(a?.uses || "");

        let metadataChips = "";
        if (a?.clinical_metadata) {
            const md = a.clinical_metadata;
            const chips = [];

            if (md.aware) {
                const colors = {
                    "Access": "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800/50",
                    "Watch": "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800/50",
                    "Reserve": "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800/50"
                };
                const color = colors[md.aware] || "bg-gray-100 text-gray-800 border-gray-200";
                chips.push(`<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${color}">AWaRe: ${escapeHTML(md.aware)}</span>`);
            }
            if (md.spectrum === "broad") {
                chips.push(`<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-800/50">Amplio espectro</span>`);
            }
            if (md.anti_pseudomonas) {
                chips.push(`<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800/50">Anti-Pseudomonas</span>`);
            }
            if (md.anaerobic_activity) {
                chips.push(`<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-stone-100 text-stone-800 border-stone-200 dark:bg-stone-800/60 dark:text-stone-300 dark:border-stone-700">Anaerobios</span>`);
            }
            if (md.oral_option) {
                chips.push(`<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/40 dark:text-teal-300 dark:border-teal-800/50">Opción VO</span>`);
            }

            if (chips.length > 0) {
                metadataChips = `<div class="flex flex-wrap gap-2 mt-2">${chips.join("")}</div>`;
            }
        }

        modalContent.innerHTML = `
      <div class="flex items-center mb-4">
        <i class="fas fa-pills text-3xl text-emerald-600 mr-3"></i>
        <div>
          <h2 class="text-3xl font-bold text-emerald-900 leading-tight">${name}</h2>
          <p class="text-emerald-700 font-semibold">${family}</p>
          ${metadataChips}
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 mt-6">
        <section>
          <h4 class="text-sm font-bold text-gray-400 uppercase border-b mb-2">Mecanismo y Espectro</h4>
          <p class="text-sm text-gray-800 dark:text-slate-300 mb-1"><strong>Mecanismo:</strong> ${mechanism}</p>
          <p class="text-sm text-gray-800 dark:text-slate-300"><strong>Espectro:</strong> ${spectrum}</p>
        </section>

        <section class="bg-emerald-50 border border-emerald-200 p-4 rounded-lg dark:bg-emerald-950/40 dark:border-emerald-800/40 dark:text-emerald-200">
          <h4 class="text-sm font-bold text-emerald-800 dark:text-emerald-300 uppercase mb-2">Posología Adultos</h4>
          <p class="text-lg font-bold text-emerald-900 dark:text-emerald-200">${dose}</p>
          <p class="text-sm text-emerald-700 dark:text-emerald-300 mt-1"><strong>Ajuste renal:</strong> ${renal}</p>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section>
            <h4 class="text-sm font-bold text-red-400 uppercase border-b mb-2">Contraindicaciones</h4>
            <p class="text-sm text-gray-700 dark:text-slate-300">${contraindications}</p>
          </section>
          <section>
            <h4 class="text-sm font-bold text-orange-400 uppercase border-b mb-2">Reacciones Adversas</h4>
            <p class="text-sm text-gray-700 dark:text-slate-300">${adverse}</p>
          </section>
        </div>

        <section>
          <h4 class="text-sm font-bold text-gray-400 uppercase border-b mb-2">Usos principales</h4>
          <p class="text-sm text-gray-700 dark:text-slate-300 font-medium">${uses}</p>
        </section>
      </div>
    `;

        if (typeof window.ABG.modal.openModal === "function") {
            window.ABG.modal.openModal();
        }
    }

    function createSyndromeCard(s) {
        const card = document.createElement("div");
        card.className =
            "bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md border-t-4 border-blue-500 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-slate-700 dark:shadow-none";

        const name = escapeHTML(s?.name || "");
        const desc = escapeHTML(s?.description || "");
        const pathogens = Array.isArray(s?.pathogens) ? s.pathogens.slice(0, 3) : [];

        card.innerHTML = `
      <h3 class="font-bold text-xl text-blue-800 dark:text-blue-300 mb-2">${name}</h3>
      <p class="text-gray-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">${desc}</p>
      <div class="flex flex-wrap gap-2 mb-4">
        ${pathogens
                .map((p) => `<span class="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded dark:bg-slate-800 dark:text-slate-300">${escapeHTML(p)}</span>`)
                .join("")}
      </div>
      <button type="button" class="text-blue-600 dark:text-blue-300 font-semibold text-sm flex items-center">
        Ver esquemas recomendados <i class="fas fa-chevron-right ml-1"></i>
      </button>
    `;

        card.addEventListener("click", () => showSyndromeDetail(s));
        return card;
    }

    function createPathogenCard(p) {
        const card = document.createElement("div");
        card.className =
            "bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md border-t-4 border-purple-500 hover:shadow-lg transition-shadow border border-gray-200 dark:border-slate-700 dark:shadow-none";

        const name = escapeHTML(p?.name || "");
        const summary = escapeHTML(p?.summary || "");
        const profile = window.ABG.localContext.getActiveProfile();
        const localBanner = renderLocalSusceptibilityBanner(profile, p?.id);
        const typical = Array.isArray(p?.typical_resistance) ? p.typical_resistance.filter(Boolean) : [];
        const intrinsic = Array.isArray(p?.intrinsic_resistance) ? p.intrinsic_resistance.filter(Boolean) : [];
        const stewardship = escapeHTML(p?.stewardship_note || "");
        const typicalHTML = typical
            .map((item) => `<li class="text-sm text-gray-700 dark:text-slate-300">${escapeHTML(item)}</li>`)
            .join("");
        const intrinsicHTML = intrinsic
            .map((item) => `<li class="text-sm text-gray-700 dark:text-slate-300">${escapeHTML(item)}</li>`)
            .join("");

        card.innerHTML = `
      <h3 class="font-bold text-xl text-purple-800 dark:text-purple-300 mb-2">${name}</h3>
      <p class="text-sm text-gray-700 dark:text-slate-300 mb-4">${summary}</p>
      ${localBanner}
      <div class="space-y-3 mt-4">
        ${typicalHTML
                ? `<div>
          <span class="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Resistencia tipica</span>
          <ul class="list-disc pl-5 mt-1 space-y-1">${typicalHTML}</ul>
        </div>`
                : ""
            }
        ${intrinsicHTML
                ? `<div>
          <span class="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Resistencia intrinseca</span>
          <ul class="list-disc pl-5 mt-1 space-y-1">${intrinsicHTML}</ul>
        </div>`
                : ""
            }
        ${stewardship
                ? `<div class="bg-amber-50 border border-amber-200 rounded p-2 dark:bg-amber-950/30 dark:border-amber-800/40 dark:text-amber-200">
          <span class="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">PROA</span>
          <p class="text-sm text-amber-900 dark:text-amber-200">PROA: ${stewardship}</p>
        </div>`
                : ""
            }
      </div>
    `;
        return card;
    }

    function createMedCard(a) {
        const card = document.createElement("div");
        card.className =
            "bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md border-t-4 border-emerald-500 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-slate-700 dark:shadow-none";

        const name = escapeHTML(a?.name || "");
        const family = escapeHTML(a?.family || "");
        const spectrum = escapeHTML(a?.spectrum || "");

        card.innerHTML = `
      <h3 class="font-bold text-xl text-emerald-800 dark:text-emerald-300 mb-1">${name}</h3>
      <p class="text-emerald-600 dark:text-emerald-300 text-xs font-semibold mb-3">${family}</p>
      <p class="text-gray-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">${spectrum}</p>
      <button type="button" class="text-emerald-700 dark:text-emerald-300 font-semibold text-sm">Ver ficha completa</button>
    `;

        card.addEventListener("click", () => showMedDetail(a));
        return card;
    }

    function renderAntibiogram(queryNormalized, queryRaw) {
        const { contentDisplay } = window.ABG.state.dom;
        if (!contentDisplay) return;

        const interpretation = window.clinicalData?.interpretation;
        if (!Array.isArray(interpretation)) {
            contentDisplay.innerHTML = `<div class="text-center py-12 text-gray-400">
        <i class="fas fa-triangle-exclamation text-4xl mb-2"></i>
        <p>La sección de antibiograma no está disponible (clinicalData.interpretation no existe).</p>
      </div>`;
            return;
        }

        const container = document.createElement("div");
        container.className = "max-w-5xl mx-auto space-y-12";

        if (queryNormalized === "") {
            const header = document.createElement("div");
            header.className = "bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 mb-8 dark:bg-slate-900 dark:border-blue-500";
            header.innerHTML = `
        <h2 class="text-xl font-bold text-blue-900 dark:text-blue-300 mb-2"><i class="fas fa-info-circle mr-2"></i> Guía de Interpretación Clínica</h2>
        <p class="text-blue-800 dark:text-slate-300 text-sm">
          Esta sección ayuda a interpretar resultados de microbiología basándose en estándares
          <strong>EUCAST/CLSI 2024-2026</strong>. Use el buscador para filtrar términos.
        </p>
      `;
            container.appendChild(header);
        }

        interpretation.forEach((section) => {
            const category = escapeHTML(section?.category || "");
            const items = Array.isArray(section?.items) ? section.items : [];

            const filteredItems = items.filter((item) => {
                const t = window.ABG.helpers.normalize(item?.title);
                const d = window.ABG.helpers.normalize(item?.description);
                const c = window.ABG.helpers.normalize(item?.clues || "");
                return t.includes(queryNormalized) || d.includes(queryNormalized) || c.includes(queryNormalized);
            });

            if (filteredItems.length === 0) return;

            const sectionEl = document.createElement("div");
            sectionEl.innerHTML = `<h2 class="text-2xl font-bold text-gray-700 dark:text-slate-200 mb-6 border-b-2 border-gray-200 dark:border-slate-700 pb-2 flex items-center">
        <i class="fas fa-book-medical mr-3 text-blue-500"></i> ${category}
      </h2>`;

            const itemGrid = document.createElement("div");
            itemGrid.className = "grid grid-cols-1 md:grid-cols-2 gap-4";

            filteredItems.forEach((item) => {
                const title = escapeHTML(item?.title || "");
                const description = escapeHTML(item?.description || "");
                const clues = item?.clues ? escapeHTML(item.clues) : "";

                const card = document.createElement("div");
                card.className =
                    "bg-white dark:bg-slate-900 p-5 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col dark:shadow-none";
                card.innerHTML = `
          <h3 class="font-bold text-blue-700 dark:text-blue-300 text-lg mb-2">${title}</h3>
          <p class="text-gray-700 dark:text-slate-300 text-sm mb-4 flex-grow">${description}</p>
          ${clues
                        ? `<div class="bg-blue-50 p-3 rounded text-xs text-blue-800 border-l-2 border-blue-300 dark:bg-slate-800 dark:text-slate-200 dark:border-blue-500/60">
                <strong><i class="fas fa-microscope"></i> Clave clínica:</strong> ${clues}
              </div>`
                        : ""
                    }
        `;
                itemGrid.appendChild(card);
            });

            sectionEl.appendChild(itemGrid);
            container.appendChild(sectionEl);
        });

        const anyCards = container.querySelectorAll(".grid > div").length > 0;
        if (!anyCards && queryNormalized !== "") {
            contentDisplay.innerHTML = `<div class="text-center py-12 text-gray-400">
        <i class="fas fa-search-minus text-4xl mb-2"></i>
        <p>No se encontraron términos de interpretación para "${escapeHTML(queryRaw)}".</p>
      </div>`;
            return;
        }

        contentDisplay.appendChild(container);
    }

    function renderFooterMeta() {
        const { footerMeta } = window.ABG.state.dom;
        if (!footerMeta) return;

        const meta = window.clinicalData?.meta || {};
        const appName = meta.appName || "AntibioGuide";
        const version = meta.version ? `v${meta.version}` : "";
        const lastUpdated = meta.lastUpdated
            ? `Actualizado: ${meta.lastUpdated}`
            : "";

        const parts = [
            `© 2026 ${appName} - Herramienta de Soporte Decisional`,
            version,
            lastUpdated,
        ]
            .filter(Boolean)
            .join(" · ");

        footerMeta.textContent = parts;
    }

    function renderResults(queryNormalized, queryRaw) {
        const { contentDisplay } = window.ABG.state.dom;
        const activeTabId = window.ABG.tabs.getActiveTabId();

        if (!contentDisplay) return;

        contentDisplay.innerHTML = "";

        if (activeTabId === "antibiogram") {
            renderAntibiogram(queryNormalized, queryRaw);
            return;
        }

        const grid = document.createElement("div");
        grid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

        if (activeTabId === "syndrome") {
            const scored = (window.clinicalData?.syndromes || [])
                .map((s) => {
                    const nameNorm = window.ABG.helpers.normalize(s?.name || "");
                    const synNorms = (s?.synonyms || []).map(window.ABG.helpers.normalize);

                    const nameScore = window.ABG.helpers.scoreMultiWord(queryNormalized, nameNorm);
                    const synScore = Math.max(...synNorms.map((sn) => window.ABG.helpers.scoreMultiWord(queryNormalized, sn)), 0);

                    const score = Math.max(nameScore, synScore > 0 ? synScore + 10 : 0);

                    return { s, score };
                })
                .filter((x) => x.score > 0)
                .sort((a, b) => b.score - a.score || String(a.s.name).localeCompare(String(b.s.name)));

            scored.forEach(({ s }) => grid.appendChild(createSyndromeCard(s)));
        } else if (activeTabId === "pathogen") {
            const scored = (window.clinicalData?.pathogens || [])
                .map((p) => {
                    const nameNorm = window.ABG.helpers.normalize(p?.name || "");
                    const aliasNorms = (p?.aliases || []).map(window.ABG.helpers.normalize);

                    const nameScore = window.ABG.helpers.scoreMultiWord(queryNormalized, nameNorm);
                    const aliasScore = Math.max(...aliasNorms.map((an) => window.ABG.helpers.scoreMultiWord(queryNormalized, an)), 0);

                    const score = Math.max(nameScore, aliasScore > 0 ? aliasScore + 10 : 0);

                    return { p, score };
                })
                .filter((x) => x.score > 0)
                .sort((a, b) => b.score - a.score || String(a.p.name).localeCompare(String(b.p.name)));

            scored.forEach(({ p }) => grid.appendChild(createPathogenCard(p)));
        } else if (activeTabId === "meds") {
            const scored = (window.clinicalData?.antibiotics || [])
                .map((a) => {
                    const nameNorm = window.ABG.helpers.normalize(a?.name || "");
                    const famNorm = window.ABG.helpers.normalize(a?.family || "");

                    const nameScore = window.ABG.helpers.scoreMultiWord(queryNormalized, nameNorm);
                    const famScore = window.ABG.helpers.scoreMultiWord(queryNormalized, famNorm);

                    const score = Math.max(nameScore, famScore > 0 ? famScore - 10 : 0);

                    return { a, score };
                })
                .filter((x) => x.score > 0)
                .sort((a, b) => b.score - a.score || String(a.a.name).localeCompare(String(b.a.name)));

            scored.forEach(({ a }) => grid.appendChild(createMedCard(a)));
        }

        if (grid.children.length === 0) {
            contentDisplay.innerHTML = `<div class="text-center py-12 text-gray-400">
        <i class="fas fa-search-minus text-4xl mb-2"></i>
        <p>No se encontraron resultados para "${escapeHTML(queryRaw)}" en esta sección.</p>
      </div>`;
        } else {
            contentDisplay.appendChild(grid);
        }
    }

    return {
        evaluateEpivigila,
        showSyndromeDetail,
        showMedDetail,
        renderFooterMeta,
        renderResults
    };
})();
