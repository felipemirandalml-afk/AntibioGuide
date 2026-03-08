window.ABG = window.ABG || {};

window.ABG.render = (function () {
    const { escapeHTML } = window.ABG.helpers;

    function renderLocalSusceptibilityBanner(profile, pathogenId) {
        if (!profile || !pathogenId) return "";
        const rawItems = window.ABG.clinicalEngine.getLocalSusceptibilityForPathogen(profile, pathogenId);
        if (!rawItems) return "";
        const viewModel = window.ABG.clinicalEngine.buildSusceptibilityViewModel(rawItems, profile);
        return window.ABG.templates.renderLocalSusceptibilityBanner(viewModel);
    }

    function evaluateEpivigila(queryRaw) {
        if (!window.EPIVIGILA) return;
        const match = window.EPIVIGILA.matchEpivigila({
            query: queryRaw,
            normalize: window.ABG.helpers.normalize
        });
        window.EPIVIGILA.renderEpivigilaBanner({
            match: match,
            bannerElement: window.ABG.state.dom.epiBanner
        });
    }

    function showSyndromeDetail(s) {
        const { modalContent } = window.ABG.state.dom;
        if (!modalContent) return;
        modalContent.innerHTML = window.ABG.templates.syndromeDetail(s);
        if (typeof window.ABG.modal.openModal === "function") {
            window.ABG.modal.openModal();
        }
    }

    function showMedDetail(a) {
        const { modalContent } = window.ABG.state.dom;
        if (!modalContent) return;
        modalContent.innerHTML = window.ABG.templates.medDetail(a);
        if (typeof window.ABG.modal.openModal === "function") {
            window.ABG.modal.openModal();
        }
    }

    function createSyndromeCard(s) {
        const card = document.createElement("div");
        card.className =
            "bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md border-t-4 border-blue-500 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-slate-700 dark:shadow-none";

        card.innerHTML = window.ABG.templates.syndromeCard(s);
        card.addEventListener("click", () => showSyndromeDetail(s));
        return card;
    }

    function createPathogenCard(p) {
        const card = document.createElement("div");
        card.className =
            "bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md border-t-4 border-purple-500 hover:shadow-lg transition-shadow border border-gray-200 dark:border-slate-700 dark:shadow-none";

        const profile = window.ABG.localContext.getActiveProfile();
        const localBannerHTML = renderLocalSusceptibilityBanner(profile, p?.id);

        card.innerHTML = window.ABG.templates.pathogenCard(p, localBannerHTML);
        return card;
    }

    function createMedCard(a) {
        const card = document.createElement("div");
        card.className =
            "bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md border-t-4 border-emerald-500 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-slate-700 dark:shadow-none";

        card.innerHTML = window.ABG.templates.medCard(a);
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
        const activeTabId = window.ABG.state.currentTab || window.ABG.tabs.getActiveTabId();

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
