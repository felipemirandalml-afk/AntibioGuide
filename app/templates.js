window.ABG = window.ABG || {};

window.ABG.templates = (function () {
  const { escapeHTML } = window.ABG.helpers;

  function renderLocalSusceptibilityBanner(viewModel) {
    if (!viewModel || !viewModel.items) return "";

    const chips = viewModel.items
      .map((item) => {
        if (item.isRi) {
          return `<span class="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">🧬 ${escapeHTML(item.label)} RI</span>`;
        }
        const icon = item.s >= viewModel.threshold ? "🟢" : item.s >= 50 ? "🟡" : "🔴";
        return `<span class="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">${icon} ${escapeHTML(item.label)} ${escapeHTML(item.s)}%</span>`;
      })
      .join("");

    const bleeChip =
      typeof viewModel.blee_pct === "number"
        ? `<span class="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">BLEE ${escapeHTML(viewModel.blee_pct)}%</span>`
        : "";

    return `
        <div class="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
          <div class="font-semibold">Susceptibilidad local</div>
          <div class="text-slate-600 dark:text-slate-300">${escapeHTML(viewModel.subtitle)}</div>
          <div class="mt-1 flex flex-wrap gap-2">${chips}${bleeChip}</div>
        </div>
      `;
  }

  function syndromeDetail(s) {
    const name = escapeHTML(s?.name || "");
    const desc = escapeHTML(s?.description || "");
    const outpatient = escapeHTML(s?.criteria?.outpatient || "N/A");
    const hospital = escapeHTML(s?.criteria?.hospital || "N/A");
    const regimens = Array.isArray(s?.regimens) ? s.regimens : [];
    const pathogens = Array.isArray(s?.pathogens) ? s.pathogens : [];

    const regimensHTML = regimens
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
        const regimenWarnings = window.ABG.clinicalEngine.getRegimenWarnings(s?.id, ids);

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
      .join("");

    const pathogensHTML = pathogens
      .map(
        (p) =>
          `<span class="bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-300 text-xs px-2 py-1 rounded-full border border-gray-200 dark:border-slate-700">${escapeHTML(
            p
          )}</span>`
      )
      .join("");

    return `
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
        ${regimensHTML}
      </div>

      <div class="mt-8 pt-6 border-t">
        <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Patógenos habituales</h4>
        <div class="flex flex-wrap gap-2">
          ${pathogensHTML}
        </div>
      </div>
    `;
  }

  function medDetail(a) {
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

    return `
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
  }

  function syndromeCard(s) {
    const name = escapeHTML(s?.name || "");
    const desc = escapeHTML(s?.description || "");
    const pathogens = Array.isArray(s?.pathogens) ? s.pathogens.slice(0, 3) : [];

    return `
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
  }

  function pathogenCard(p, localBannerHTML) {
    const name = escapeHTML(p?.name || "");

    // Backward compatibility fallbacks
    const summary = escapeHTML(p?.clinical?.summary || p?.summary || "");
    const typical = Array.isArray(p?.resistance?.typicalAcquired) && p.resistance.typicalAcquired.length > 0
      ? p.resistance.typicalAcquired.filter(Boolean)
      : Array.isArray(p?.typical_resistance) ? p.typical_resistance.filter(Boolean) : [];
    const intrinsic = Array.isArray(p?.resistance?.intrinsic) && p.resistance.intrinsic.length > 0
      ? p.resistance.intrinsic.filter(Boolean)
      : Array.isArray(p?.intrinsic_resistance) ? p.intrinsic_resistance.filter(Boolean) : [];
    const stewardship = escapeHTML(p?.resistance?.stewardshipNote || p?.stewardship_note || "");

    // New Rich Fields from CSV Load
    const gram = escapeHTML(p?.taxonomy?.gram || "");
    const morphology = escapeHTML(p?.taxonomy?.morphology || "");
    const family = escapeHTML(p?.taxonomy?.group || "");
    const context = escapeHTML(p?.clinical?.context || "");
    const pearls = Array.isArray(p?.clinical?.pearls) ? p.clinical.pearls.filter(Boolean) : [];
    const typicalHTML = typical
      .map((item) => `<li class="text-sm text-gray-700 dark:text-slate-300">${escapeHTML(item)}</li>`)
      .join("");
    const intrinsicHTML = intrinsic
      .map((item) => `<li class="text-sm text-gray-700 dark:text-slate-300">${escapeHTML(item)}</li>`)
      .join("");

    const pearlsHTML = pearls
      .map((item) => `<li class="text-sm text-gray-700 dark:text-slate-300">${escapeHTML(item)}</li>`)
      .join("");

    return `
      <h3 class="font-bold text-xl text-purple-800 dark:text-purple-300 mb-2">${name}</h3>
      <p class="text-sm text-gray-700 dark:text-slate-300 mb-4">${summary}</p>
      ${localBannerHTML || ""}
      <div class="space-y-3 mt-4">
        ${gram || morphology || family || context
        ? `<div>
            <span class="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Detalles adicionales</span>
            <ul class="list-disc pl-5 mt-1 space-y-1">
              ${gram ? `<li class="text-sm text-gray-700 dark:text-slate-300">Gram: ${gram}</li>` : ""}
              ${morphology ? `<li class="text-sm text-gray-700 dark:text-slate-300">Morfología: ${morphology}</li>` : ""}
              ${family ? `<li class="text-sm text-gray-700 dark:text-slate-300">Familia: ${family}</li>` : ""}
              ${context ? `<li class="text-sm text-gray-700 dark:text-slate-300">Contexto: ${context}</li>` : ""}
            </ul>
          </div>`
        : ""
      }
        ${pearlsHTML
        ? `<div>
            <span class="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Perlas clínicas</span>
            <ul class="list-disc pl-5 mt-1 space-y-1">${pearlsHTML}</ul>
          </div>`
        : ""
      }
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
          <p class="text-sm text-amber-900 dark:text-amber-200">${stewardship}</p>
        </div>`
        : ""
      }
      </div>
    `;
  }

  function medCard(a) {
    const name = escapeHTML(a?.name || "");
    const family = escapeHTML(a?.family || "");
    const spectrum = escapeHTML(a?.spectrum || "");

    return `
      <h3 class="font-bold text-xl text-emerald-800 dark:text-emerald-300 mb-1">${name}</h3>
      <p class="text-emerald-600 dark:text-emerald-300 text-xs font-semibold mb-3">${family}</p>
      <p class="text-gray-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">${spectrum}</p>
      <button type="button" class="text-emerald-700 dark:text-emerald-300 font-semibold text-sm">Ver ficha completa</button>
    `;
  }

  return {
    renderLocalSusceptibilityBanner,
    syndromeDetail,
    medDetail,
    syndromeCard,
    pathogenCard,
    medCard
  };
})();
