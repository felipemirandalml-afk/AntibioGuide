document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const searchInput = document.getElementById("search-input");
  const contentDisplay = document.getElementById("content-display");
  const epiBanner = document.getElementById("epivigila-banner");
  const medModal = document.getElementById("med-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const modalContent = document.getElementById("modal-content");
  const welcomeScreen = document.getElementById("welcome-screen");

  // =============================
  // THEME (DARK MODE)
  // =============================
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  function applyTheme(theme) {
    const html = document.documentElement; // <html>
    const body = document.body;            // <body>

    const isDark = theme === "dark";

    // Apply to BOTH to avoid any Tailwind/selector edge-cases
    html.classList.toggle("dark", isDark);
    body.classList.toggle("dark", isDark);

    if (themeIcon) themeIcon.textContent = isDark ? "☀️" : "🌙";
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;

    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function setTheme(theme) {
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }

  // init
  applyTheme(getPreferredTheme());

  // Safety: if button missing, at least you don't crash silently
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.contains("dark") || document.body.classList.contains("dark");
      setTheme(isDark ? "light" : "dark");
    });
  } else {
    console.warn("No se encontró #theme-toggle en el DOM");
  }

  // --- Helpers: security + search robustness ---
  function escapeHTML(str = "") {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // Normalize: lower + remove accents + remove punctuation + collapse spaces
  function normalize(text = "") {
    return String(text)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove accents
      .replace(/[^\p{L}\p{N}\s]/gu, " ") // remove punctuation (unicode-safe)
      .replace(/\s+/g, " ")
      .trim();
  }

  function evaluateEpivigila() {
    if (!epiBanner) return;

    if ((searchInput?.value || "").trim() === "") {
      epiBanner.innerHTML = "";
      return;
    }

    if (!window.EPIVIGILA || typeof window.EPIVIGILA.evaluate !== "function") return;

    window.EPIVIGILA.evaluate({
      normalize,
      contentElement: contentDisplay,
      bannerElement: epiBanner
    });
  }

  function escapeRegExp(str = "") {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function scoreTextMatch(queryNorm, textNorm) {
    if (!queryNorm || !textNorm) return 0;

    // Exact match
    if (textNorm === queryNorm) return 100;

    let score = 0;

    // Starts with
    if (textNorm.startsWith(queryNorm)) score = Math.max(score, 70);

    // Word boundary match (whole word)
    const wordRe = new RegExp(`(^|\\s)${escapeRegExp(queryNorm)}(\\s|$)`, "i");
    if (wordRe.test(textNorm)) score = Math.max(score, 60);

    // Includes
    if (textNorm.includes(queryNorm)) score = Math.max(score, 40);

    return score;
  }

  function scoreMultiWord(queryNorm, textNorm) {
    // If query has multiple words, score per token + small boost for full-phrase containment
    const tokens = queryNorm.split(" ").filter(Boolean);
    if (tokens.length === 0) return 0;

    let total = 0;
    for (const t of tokens) total += scoreTextMatch(t, textNorm);

    if (tokens.length > 1 && textNorm.includes(queryNorm)) total += 15; // phrase bonus
    return total;
  }

  // --- Antibiotic lookup helpers (by id / name) ---
  function getAntibioticById(drugId) {
    return (clinicalData?.antibiotics || []).find((a) => a?.id === drugId) || null;
  }

  // Fallback: try find by name (case/accents insensitive)
  function getAntibioticByName(name) {
    const q = normalize(name || "");
    if (!q) return null;
    return (
      (clinicalData?.antibiotics || []).find((a) => normalize(a?.name || "") === q) ||
      (clinicalData?.antibiotics || []).find((a) => {
        const syns = Array.isArray(a?.synonyms) ? a.synonyms : [];
        return syns.some((s) => normalize(s) === q);
      }) ||
      null
    );
  }

  // Keep a stable welcome HTML (avoid moving DOM nodes around)
  const welcomeHTML = welcomeScreen ? welcomeScreen.outerHTML : "";
  function showWelcome() {
    contentDisplay.innerHTML = welcomeHTML || "";
    evaluateEpivigila();
  }

  // --- Tabs ---
  const tabs = {
    syndrome: document.getElementById("tab-syndrome"),
    pathogen: document.getElementById("tab-pathogen"),
    meds: document.getElementById("tab-meds"),
    antibiogram: document.getElementById("tab-antibiogram"), // may not exist in HTML
  };

  // Only keep tabs that exist in DOM
  const existingTabEntries = Object.entries(tabs).filter(([, el]) => !!el);
  const existingTabs = Object.fromEntries(existingTabEntries);

  let activeTabId = existingTabs.syndrome ? "syndrome" : existingTabEntries[0]?.[0] || "syndrome";

  function setTab(tabId) {
    Object.values(existingTabs).forEach((tab) => tab.classList.remove("active-tab"));
    existingTabs[tabId]?.classList.add("active-tab");
    activeTabId = tabId;

    const placeholders = {
      syndrome: "Buscar síndrome (NAC, ITU, Meningitis...)",
      pathogen: "Buscar patógeno (E. coli, MRSA, Pseudomonas...)",
      meds: "Buscar fármaco (Ceftriaxona, Vancomicina...)",
      antibiogram: "Filtrar guía de interpretación (CIM, BLEE, SIR...)",
    };
    if (searchInput) searchInput.placeholder = placeholders[tabId] || "Buscar...";
  }

  // Wire tab clicks
  Object.keys(existingTabs).forEach((tabId) => {
    existingTabs[tabId].addEventListener("click", () => {
      setTab(tabId);
      handleSearch(); // refresh
      evaluateEpivigila();
    });
  });

  // Ensure initial active styling
  setTab(activeTabId);

  if (window.EPIVIGILA && typeof window.EPIVIGILA.init === "function") {
    window.EPIVIGILA.init({
      csvPath: "data-files/epivigila_eno_epi.csv",
      normalize
    });
  }

  // --- Modal: open/close + UX improvements ---
  let lastFocusedEl = null;

  function openModal() {
    lastFocusedEl = document.activeElement;
    medModal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    // Focus close button for accessibility
    closeModalBtn?.focus?.();
  }

  function closeModal() {
    medModal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
      lastFocusedEl.focus();
    }
    lastFocusedEl = null;
  }

  closeModalBtn?.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === medModal) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !medModal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // Global delegation: clicking a drug chip inside the modal opens its med detail
  modalContent?.addEventListener("click", (e) => {
    const btn = e.target?.closest?.("[data-drugid],[data-drugname]");
    if (!btn) return;

    const drugId = btn.getAttribute("data-drugid");
    const drugName = btn.getAttribute("data-drugname");

    const abx = drugId ? getAntibioticById(drugId) : getAntibioticByName(drugName);
    if (abx) showMedDetail(abx);
  });

  // --- Search Logic ---
  searchInput?.addEventListener("input", handleSearch);
  searchInput?.addEventListener("input", evaluateEpivigila);

  function handleSearch() {
    const queryRaw = searchInput?.value ?? "";
    const query = normalize(queryRaw);

    // In 'antibiogram' tab, show content even if query is empty
    const allowEmptyInThisTab = activeTabId === "antibiogram";

    // For other tabs: if too short, show welcome (prevents noisy matches)
    if (!allowEmptyInThisTab && query.length < 2) {
      showWelcome();
      return;
    }

    renderResults(query, queryRaw);
  }

  function renderResults(queryNormalized, queryRaw) {
    contentDisplay.innerHTML = "";

    // Antibiogram tab can render without query
    if (activeTabId === "antibiogram") {
      renderAntibiogram(queryNormalized, queryRaw);
      return;
    }

    const grid = document.createElement("div");
    grid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

    if (activeTabId === "syndrome") {
      const scored = (clinicalData?.syndromes || [])
        .map((s) => {
          const nameNorm = normalize(s?.name || "");
          const synNorms = (s?.synonyms || []).map(normalize);

          const nameScore = scoreMultiWord(queryNormalized, nameNorm);
          const synScore = Math.max(...synNorms.map((sn) => scoreMultiWord(queryNormalized, sn)), 0);

          // Bonus if match came via synonym (abbrev like NAC/ITU)
          const score = Math.max(nameScore, synScore > 0 ? synScore + 10 : 0);

          return { s, score };
        })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score || String(a.s.name).localeCompare(String(b.s.name)));

      scored.forEach(({ s }) => grid.appendChild(createSyndromeCard(s)));
    } else if (activeTabId === "pathogen") {
      const scored = (clinicalData?.pathogens || [])
        .map((p) => {
          const nameNorm = normalize(p?.name || "");
          const abbrNorms = (p?.abbreviations || []).map(normalize);

          const nameScore = scoreMultiWord(queryNormalized, nameNorm);
          const abbrScore = Math.max(...abbrNorms.map((an) => scoreMultiWord(queryNormalized, an)), 0);

          const score = Math.max(nameScore, abbrScore > 0 ? abbrScore + 10 : 0);

          return { p, score };
        })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score || String(a.p.name).localeCompare(String(b.p.name)));

      scored.forEach(({ p }) => grid.appendChild(createPathogenCard(p)));
    } else if (activeTabId === "meds") {
      const scored = (clinicalData?.antibiotics || [])
        .map((a) => {
          const nameNorm = normalize(a?.name || "");
          const famNorm = normalize(a?.family || "");

          const nameScore = scoreMultiWord(queryNormalized, nameNorm);
          const famScore = scoreMultiWord(queryNormalized, famNorm);

          // Prefer name matches > family matches
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

    evaluateEpivigila();
  }

  // --- Card Creators (IMPORTANT: escape all data) ---
  function createSyndromeCard(s) {
    const card = document.createElement("div");
    card.className =
  "bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md border-t-4 border-blue-500 hover:shadow-lg transition-shadow cursor-pointer border border-transparent dark:border-slate-800";

    const name = escapeHTML(s?.name || "");
    const desc = escapeHTML(s?.description || "");
    const pathogens = Array.isArray(s?.pathogens) ? s.pathogens.slice(0, 3) : [];

    card.innerHTML = `
      <h3 class="font-bold text-xl text-blue-800 mb-2">${name}</h3>
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">${desc}</p>
      <div class="flex flex-wrap gap-2 mb-4">
        ${pathogens
          .map((p) => `<span class="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">${escapeHTML(p)}</span>`)
          .join("")}
      </div>
      <button type="button" class="text-blue-600 font-semibold text-sm flex items-center">
        Ver esquemas recomendados <i class="fas fa-chevron-right ml-1"></i>
      </button>
    `;

    card.addEventListener("click", () => showSyndromeDetail(s));
    return card;
  }

  function createPathogenCard(p) {
    const card = document.createElement("div");
    card.className =
      "bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500 hover:shadow-lg transition-shadow";

    const name = escapeHTML(p?.name || "");
    const firstLine = escapeHTML(p?.first_line || "");
    const resistance = escapeHTML(p?.resistance || "");

    card.innerHTML = `
      <h3 class="font-bold text-xl text-purple-800 mb-2">${name}</h3>
      <div class="space-y-3 mt-4">
        <div>
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">1ª Línea</span>
          <p class="text-sm font-semibold text-green-700">${firstLine}</p>
        </div>
        <div>
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Consideraciones</span>
          <p class="text-sm text-gray-600 italic">${resistance}</p>
        </div>
      </div>
    `;
    return card;
  }

  function createMedCard(a) {
    const card = document.createElement("div");
    card.className =
      "bg-white p-6 rounded-lg shadow-md border-t-4 border-emerald-500 hover:shadow-lg transition-shadow cursor-pointer";

    const name = escapeHTML(a?.name || "");
    const family = escapeHTML(a?.family || "");
    const spectrum = escapeHTML(a?.spectrum || "");

    card.innerHTML = `
      <h3 class="font-bold text-xl text-emerald-800 mb-1">${name}</h3>
      <p class="text-emerald-600 text-xs font-semibold mb-3">${family}</p>
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">${spectrum}</p>
      <button type="button" class="text-emerald-700 font-semibold text-sm">Ver ficha completa</button>
    `;

    card.addEventListener("click", () => showMedDetail(a));
    return card;
  }

  // --- Antibiogram renderer (guarded + escaped) ---
  function renderAntibiogram(queryNormalized, queryRaw) {
    const interpretation = clinicalData?.interpretation;
    if (!Array.isArray(interpretation)) {
      contentDisplay.innerHTML = `<div class="text-center py-12 text-gray-400">
        <i class="fas fa-triangle-exclamation text-4xl mb-2"></i>
        <p>La sección de antibiograma no está disponible (clinicalData.interpretation no existe).</p>
      </div>`;
      evaluateEpivigila();
      return;
    }

    const container = document.createElement("div");
    container.className = "max-w-5xl mx-auto space-y-12";

    if (queryNormalized === "") {
      const header = document.createElement("div");
      header.className = "bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 mb-8";
      header.innerHTML = `
        <h2 class="text-xl font-bold text-blue-900 mb-2"><i class="fas fa-info-circle mr-2"></i> Guía de Interpretación Clínica</h2>
        <p class="text-blue-800 text-sm">
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
        const t = normalize(item?.title);
        const d = normalize(item?.description);
        const c = normalize(item?.clues || "");
        return t.includes(queryNormalized) || d.includes(queryNormalized) || c.includes(queryNormalized);
      });

      if (filteredItems.length === 0) return;

      const sectionEl = document.createElement("div");
      sectionEl.innerHTML = `<h2 class="text-2xl font-bold text-gray-700 mb-6 border-b-2 border-gray-200 pb-2 flex items-center">
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
          "bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col";
        card.innerHTML = `
          <h3 class="font-bold text-blue-700 text-lg mb-2">${title}</h3>
          <p class="text-gray-700 text-sm mb-4 flex-grow">${description}</p>
          ${
            clues
              ? `<div class="bg-blue-50 p-3 rounded text-xs text-blue-800 border-l-2 border-blue-300">
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

    // No matches
    const anyCards = container.querySelectorAll(".grid > div").length > 0;
    if (!anyCards && queryNormalized !== "") {
      contentDisplay.innerHTML = `<div class="text-center py-12 text-gray-400">
        <i class="fas fa-search-minus text-4xl mb-2"></i>
        <p>No se encontraron términos de interpretación para "${escapeHTML(queryRaw)}".</p>
      </div>`;
      evaluateEpivigila();
      return;
    }

    contentDisplay.appendChild(container);
    evaluateEpivigila();
  }

  // --- Detail Views (Modal Content) ---
  function showSyndromeDetail(s) {
    const name = escapeHTML(s?.name || "");
    const desc = escapeHTML(s?.description || "");
    const outpatient = escapeHTML(s?.criteria?.outpatient || "N/A");
    const hospital = escapeHTML(s?.criteria?.hospital || "N/A");
    const regimens = Array.isArray(s?.regimens) ? s.regimens : [];
    const pathogens = Array.isArray(s?.pathogens) ? s.pathogens : [];

    modalContent.innerHTML = `
      <h2 class="text-3xl font-bold text-blue-900 mb-2">${name}</h2>
      <p class="text-gray-600 italic mb-6">${desc}</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-bold text-blue-800 text-sm uppercase"><i class="fas fa-home mr-2"></i> Manejo Ambulatorio</h4>
          <p class="text-sm text-gray-700 mt-1">${outpatient}</p>
        </div>
        <div class="bg-orange-50 p-4 rounded-lg">
          <h4 class="font-bold text-orange-800 text-sm uppercase"><i class="fas fa-hospital mr-2"></i> Criterios Hospitalización</h4>
          <p class="text-sm text-gray-700 mt-1">${hospital}</p>
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
            const comments = escapeHTML(r?.comments || "");

            const ids = Array.isArray(r?.drugIds) ? r.drugIds.filter(Boolean) : [];
            let drugBlock = "";

            if (ids.length > 0) {
              const chips = ids
                .map((id) => {
                  const abx = getAntibioticById(id);
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
              // Fallback: old regimen without drugIds
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
                  <span class="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">${ref}</span>
                </div>
                ${drugBlock}
                <p class="text-sm text-gray-600 font-medium">${dose} ${route} ${interval} (${duration})</p>
                <p class="text-sm text-gray-500 mt-2 italic">${comments}</p>
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
                `<span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full border border-gray-200">${escapeHTML(
                  p
                )}</span>`
            )
            .join("")}
        </div>
      </div>
    `;

    openModal();
  }

  function showMedDetail(a) {
    const name = escapeHTML(a?.name || "");
    const family = escapeHTML(a?.family || "");
    const mechanism = escapeHTML(a?.mechanism || "");
    const spectrum = escapeHTML(a?.spectrum || "");
    const dose = escapeHTML(a?.dose || "");
    const renal = escapeHTML(a?.renal || "");
    const contraindications = escapeHTML(a?.contraindications || "");
    const adverse = escapeHTML(a?.adverse || "");
    const uses = escapeHTML(a?.uses || "");

    modalContent.innerHTML = `
      <div class="flex items-center mb-4">
        <i class="fas fa-pills text-3xl text-emerald-600 mr-3"></i>
        <div>
          <h2 class="text-3xl font-bold text-emerald-900 leading-tight">${name}</h2>
          <p class="text-emerald-700 font-semibold">${family}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 mt-6">
        <section>
          <h4 class="text-sm font-bold text-gray-400 uppercase border-b mb-2">Mecanismo y Espectro</h4>
          <p class="text-sm text-gray-800 mb-1"><strong>Mecanismo:</strong> ${mechanism}</p>
          <p class="text-sm text-gray-800"><strong>Espectro:</strong> ${spectrum}</p>
        </section>

        <section class="bg-emerald-50 p-4 rounded-lg">
          <h4 class="text-sm font-bold text-emerald-800 uppercase mb-2">Posología Adultos</h4>
          <p class="text-lg font-bold text-emerald-900">${dose}</p>
          <p class="text-sm text-emerald-700 mt-1"><strong>Ajuste renal:</strong> ${renal}</p>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section>
            <h4 class="text-sm font-bold text-red-400 uppercase border-b mb-2">Contraindicaciones</h4>
            <p class="text-sm text-gray-700">${contraindications}</p>
          </section>
          <section>
            <h4 class="text-sm font-bold text-orange-400 uppercase border-b mb-2">Reacciones Adversas</h4>
            <p class="text-sm text-gray-700">${adverse}</p>
          </section>
        </div>

        <section>
          <h4 class="text-sm font-bold text-gray-400 uppercase border-b mb-2">Usos principales</h4>
          <p class="text-sm text-gray-700 font-medium">${uses}</p>
        </section>
      </div>
    `;

    openModal();
  }

  // --- Start state ---
  // If user hasn't typed yet, show welcome (stable)
 // =============================
  // FOOTER META (VERSION)
  // =============================
  function renderFooterMeta() {
    const el = document.getElementById("footer-meta");
    if (!el) return;

    const meta = clinicalData?.meta || {};
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

    el.textContent = parts;
  }

  renderFooterMeta();

  // --- Start state ---
  showWelcome();

});