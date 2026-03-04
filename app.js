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
  const themeSunSvg =
    '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M6.34 17.66l-1.41 1.41"></path><path d="M19.07 4.93l-1.41 1.41"></path></svg>';
  const themeMoonSvg =
    '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

  function applyTheme(theme) {
    const safeTheme = theme === "dark" ? "dark" : "light";
    const isDark = safeTheme === "dark";

    // Apply to BOTH to avoid any Tailwind/selector edge-cases
    document.documentElement.classList.toggle("dark", isDark);
    document.body?.classList?.toggle("dark", isDark);

    if (themeIcon) themeIcon.innerHTML = isDark ? themeSunSvg : themeMoonSvg;
    if (themeToggleBtn) {
      const label = isDark ? "Activar modo claro" : "Activar modo oscuro";
      themeToggleBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
      themeToggleBtn.setAttribute("aria-label", label);
      themeToggleBtn.setAttribute("title", label);
    }
  }

  function getPreferredTheme() {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") return saved;
    } catch (_err) {
      // localStorage can fail (privacy mode / blocked storage), continue to fallback.
    }

    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function setTheme(theme) {
    const safeTheme = theme === "dark" ? "dark" : "light";
    try {
      localStorage.setItem("theme", safeTheme);
    } catch (_err) {
      // Ignore storage write failures; theme still applies for current session.
    }
    applyTheme(safeTheme);
  }

  // init
  applyTheme(getPreferredTheme());

  // Safety: if button missing, at least you don't crash silently
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isDark =
        document.documentElement.classList.contains("dark") ||
        document.body?.classList?.contains("dark");
      setTheme(isDark ? "light" : "dark");
    });
  } else {
    console.warn("No se encontró #theme-toggle en el DOM");
  }

  // --- Helpers: security + search robustness ---
  function escapeHTML(str) {
    if (str === null || str === undefined) return "";
    return String(str).replace(/[&<>"']/g, (ch) => {
      switch (ch) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case '"':
          return "&quot;";
        case "'":
          return "&#39;";
        default:
          return ch;
      }
    });
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

  function evaluateEpivigila(queryRaw = "") {
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
      normalize
    });

    window.EPIVIGILA.renderEpivigilaBanner({
      bannerElement: epiBanner,
      match
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
  let durationPopoverEl = null;
  let durationPopoverTrigger = null;

  function showWelcome() {
    contentDisplay.innerHTML = welcomeHTML || "";
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
    closeDurationPopover();
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
    });
  });

  // Ensure initial active styling
  setTab(activeTabId);

  // =============================
  // CONTEXTO LOCAL (PERFILES)
  // =============================
  const profileSelect = document.getElementById("profile-select");
  const profileLabel = document.getElementById("active-profile-label");

  const PROFILE_STORAGE_KEY = "abg_active_profile_id";

  function getActiveProfileId() {
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (stored && clinicalData?.resistanceProfiles?.[stored]) return stored;
    return "general";
  }

  let activeProfileId = getActiveProfileId();

  function getActiveProfile() {
    return clinicalData?.resistanceProfiles?.[activeProfileId]
      || clinicalData?.resistanceProfiles?.general
      || null;
  }

  function populateProfileSelect() {
    if (!profileSelect || !clinicalData?.resistanceProfiles) return;

    profileSelect.innerHTML = "";

    Object.values(clinicalData.resistanceProfiles).forEach(profile => {
      const option = document.createElement("option");
      option.value = profile.id;
      option.textContent = profile.label;
      profileSelect.appendChild(option);
    });

    profileSelect.value = activeProfileId;

    if (profileLabel) {
      const active = getActiveProfile();
      profileLabel.textContent = active?.label || "General";
    }
  }

  if (profileSelect) {
    populateProfileSelect();

    profileSelect.addEventListener("change", () => {
      activeProfileId = profileSelect.value;
      localStorage.setItem(PROFILE_STORAGE_KEY, activeProfileId);

      const active = getActiveProfile();
      if (profileLabel) {
        profileLabel.textContent = active?.label || "General";
      }

      handleSearch(); // re-render current tab
    });
  }

  if (window.EPIVIGILA && typeof window.EPIVIGILA.init === "function") {
    window.EPIVIGILA.init({
      normalize
    });
  }

  // --- Modal: open/close + UX improvements ---
  let lastFocusedEl = null;

  function isSmallViewport() {
    return window.matchMedia && window.matchMedia("(max-width: 639px)").matches;
  }

  function ensureDurationPopover() {
    if (durationPopoverEl) return durationPopoverEl;
    const el = document.createElement("div");
    el.id = "duration-popover";
    el.className = "hidden fixed z-[80]";
    document.body.appendChild(el);
    durationPopoverEl = el;
    return durationPopoverEl;
  }

  function closeDurationPopover() {
    if (!durationPopoverEl) return;
    durationPopoverEl.className = "hidden fixed z-[80]";
    durationPopoverEl.style.left = "";
    durationPopoverEl.style.top = "";
    durationPopoverEl.innerHTML = "";
    durationPopoverTrigger = null;
  }

  function isDurationPopoverOpen() {
    return !!durationPopoverEl && !durationPopoverEl.classList.contains("hidden");
  }

  function openDurationPopover({ trigger, info, refs }) {
    if (!trigger || !info) return;
    const popover = ensureDurationPopover();
    durationPopoverTrigger = trigger;
    const infoText = escapeHTML(info);
    const refsText = Array.isArray(refs) && refs.length > 0
      ? `<p class="mt-2 text-xs text-gray-500 dark:text-slate-300"><span class="font-semibold">Fuente:</span> ${escapeHTML(refs.join("; "))}</p>`
      : "";

    if (isSmallViewport()) {
      popover.className = "fixed inset-0 z-[80]";
      popover.style.left = "";
      popover.style.top = "";
      popover.innerHTML = `
        <div data-duration-popover-backdrop class="absolute inset-0 bg-black/40"></div>
        <div class="absolute inset-x-0 bottom-0 rounded-t-xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
          <p class="text-sm text-gray-700 dark:text-slate-200">${infoText}</p>
          ${refsText}
          <div class="mt-3 flex justify-end">
            <button type="button" data-duration-popover-close class="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800">Cerrar</button>
          </div>
        </div>
      `;
      return;
    }

    const rect = trigger.getBoundingClientRect();
    popover.className = "fixed z-[80]";
    popover.style.left = `${Math.max(8, rect.left)}px`;
    popover.style.top = `${Math.min(window.innerHeight - 8, rect.bottom + 8)}px`;
    popover.innerHTML = `
      <div class="w-80 max-w-[calc(100vw-1rem)] rounded-lg border border-slate-200 bg-white p-3 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <p class="text-sm text-gray-700 dark:text-slate-200">${infoText}</p>
        ${refsText}
        <div class="mt-3 flex justify-end">
          <button type="button" data-duration-popover-close class="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800">Cerrar</button>
        </div>
      </div>
    `;
  }

  function openModal() {
    lastFocusedEl = document.activeElement;
    medModal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    // Focus close button for accessibility
    closeModalBtn?.focus?.();
  }

  function closeModal() {
    closeDurationPopover();
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
    if (e.key !== "Escape") return;
    if (isDurationPopoverOpen()) {
      closeDurationPopover();
      return;
    }
    if (!medModal.classList.contains("hidden")) {
      closeModal();
    }
  });

  document.addEventListener("mousedown", (e) => {
    if (!isDurationPopoverOpen()) return;
    const target = e.target;
    const clickedInsidePopover = durationPopoverEl?.contains(target);
    const clickedTrigger = durationPopoverTrigger?.contains?.(target);
    if (clickedInsidePopover || clickedTrigger) return;
    closeDurationPopover();
  });

  document.addEventListener("click", (e) => {
    const closeBtn = e.target?.closest?.("[data-duration-popover-close],[data-duration-popover-backdrop]");
    if (!closeBtn) return;
    closeDurationPopover();
  });

  // Global delegation: clicking a drug chip inside the modal opens its med detail
  modalContent?.addEventListener("click", (e) => {
    const closePopoverBtn = e.target?.closest?.("[data-duration-popover-close],[data-duration-popover-backdrop]");
    if (closePopoverBtn) {
      closeDurationPopover();
      return;
    }

    const infoBtn = e.target?.closest?.("[data-duration-info-btn]");
    if (infoBtn) {
      const info = infoBtn.getAttribute("data-duration-info") || "";
      const refsRaw = infoBtn.getAttribute("data-duration-refs") || "";
      const refs = refsRaw ? refsRaw.split("||").map((x) => x.trim()).filter(Boolean) : [];
      openDurationPopover({
        trigger: infoBtn,
        info,
        refs
      });
      return;
    }

    const btn = e.target?.closest?.("[data-drugid],[data-drugname]");
    if (!btn) return;

    const drugId = btn.getAttribute("data-drugid");
    const drugName = btn.getAttribute("data-drugname");

    const abx = drugId ? getAntibioticById(drugId) : getAntibioticByName(drugName);
    if (abx) showMedDetail(abx);
  });

  // --- Search Logic ---
  searchInput?.addEventListener("input", handleSearch);

  function handleSearch() {
    const queryRaw = searchInput?.value ?? "";
    const query = normalize(queryRaw);
    evaluateEpivigila(queryRaw);

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
          const aliasNorms = (p?.aliases || []).map(normalize);

          const nameScore = scoreMultiWord(queryNormalized, nameNorm);
          const aliasScore = Math.max(...aliasNorms.map((an) => scoreMultiWord(queryNormalized, an)), 0);

          const score = Math.max(nameScore, aliasScore > 0 ? aliasScore + 10 : 0);

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

  }

  // --- Card Creators (IMPORTANT: escape all data) ---
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

        const abxName = clinicalData?.antibiotics?.find((a) => a?.id === abxId)?.name || humanizeId(abxId);

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
            return `<span class="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">🧬 ${escapeHTML(
              item.label
            )} RI</span>`;
          }

          const icon = item.s >= threshold ? "🟢" : item.s >= 50 ? "🟡" : "🔴";
          return `<span class="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">${icon} ${escapeHTML(
            item.label
          )} ${escapeHTML(item.s)}%</span>`;
        })
        .join("");

      const bleeChip =
        typeof local.blee_pct === "number"
          ? `<span class="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">BLEE ${escapeHTML(local.blee_pct)}%</span>`
          : "";

      // TODO: Optional future enhancement — expandable full antibiotic list view
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
    const profile = getActiveProfile();
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
        ${
          typicalHTML
            ? `<div>
          <span class="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Resistencia tipica</span>
          <ul class="list-disc pl-5 mt-1 space-y-1">${typicalHTML}</ul>
        </div>`
            : ""
        }
        ${
          intrinsicHTML
            ? `<div>
          <span class="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Resistencia intrinseca</span>
          <ul class="list-disc pl-5 mt-1 space-y-1">${intrinsicHTML}</ul>
        </div>`
            : ""
        }
        ${
          stewardship
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

  // --- Antibiogram renderer (guarded + escaped) ---
  function renderAntibiogram(queryNormalized, queryRaw) {
    const interpretation = clinicalData?.interpretation;
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
        const t = normalize(item?.title);
        const d = normalize(item?.description);
        const c = normalize(item?.clues || "");
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
          ${
            clues
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

    // No matches
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

  function getRegimenWarnings(syndromeId, regimenDrugIds = []) {
    const profile = getActiveProfile();
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
                  <span class="text-xs bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-slate-400 px-2 py-1 rounded">${ref}</span>
                </div>
                ${drugBlock}
                <p class="text-sm text-gray-600 dark:text-slate-300 font-medium">${dose} ${route} ${interval} (${duration})${durationInfoBtn}</p>
                <p class="text-sm text-gray-500 dark:text-slate-300 mt-2 italic">${comments}</p>
                ${
                  regimenWarnings.length > 0
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
