window.ABG = window.ABG || {};

window.ABG.tabs = (function () {
    const tabs = {
        syndrome: document.getElementById("tab-syndrome"),
        pathogen: document.getElementById("tab-pathogen"),
        meds: document.getElementById("tab-meds"),
        antibiogram: document.getElementById("tab-antibiogram")
    };

    const existingTabEntries = Object.entries(tabs).filter(([, el]) => !!el);
    const existingTabs = Object.fromEntries(existingTabEntries);
    let activeTabId = existingTabs.syndrome ? "syndrome" : existingTabEntries[0]?.[0] || "syndrome";

    function getActiveTabId() {
        return activeTabId;
    }

    function setTab(tabId) {
        if (window.ABG.modal && typeof window.ABG.modal.closeDurationPopover === "function") {
            window.ABG.modal.closeDurationPopover();
        }

        Object.values(existingTabs).forEach((tab) => {
            if (!tab) return;
            tab.classList.remove("active-tab");
            tab.setAttribute("aria-selected", "false");
            tab.setAttribute("tabindex", "-1");
        });

        const activeTabBtn = existingTabs[tabId];
        if (activeTabBtn) {
            activeTabBtn.classList.add("active-tab");
            activeTabBtn.setAttribute("aria-selected", "true");
            activeTabBtn.setAttribute("tabindex", "0");
        }

        activeTabId = tabId;
        window.ABG.state.currentTab = tabId;

        const { contentDisplay, searchInput } = window.ABG.state.dom;

        if (contentDisplay) {
            contentDisplay.setAttribute("aria-labelledby", `tab-${tabId}`);
        }

        const placeholders = {
            syndrome: "Buscar síndrome (NAC, ITU, Meningitis...)",
            pathogen: "Buscar patógeno (E. coli, MRSA, Pseudomonas...)",
            meds: "Buscar fármaco (Ceftriaxona, Vancomicina...)",
            antibiogram: "Filtrar guía de interpretación (CIM, BLEE, SIR...)",
        };
        if (searchInput) searchInput.placeholder = placeholders[tabId] || "Buscar...";
    }

    function initListeners() {
        const validTabIds = Object.keys(existingTabs);
        validTabIds.forEach((tabId, index) => {
            const tabEl = existingTabs[tabId];
            if (!tabEl) return;

            tabEl.addEventListener("click", () => {
                setTab(tabId);
                if (window.ABG.search && typeof window.ABG.search.handleSearch === "function") {
                    window.ABG.search.handleSearch();
                }
            });

            tabEl.addEventListener("keydown", (e) => {
                let nextIndex = index;
                if (e.key === "ArrowRight") {
                    nextIndex = (index + 1) % validTabIds.length;
                } else if (e.key === "ArrowLeft") {
                    nextIndex = (index - 1 + validTabIds.length) % validTabIds.length;
                } else if (e.key === "Home") {
                    nextIndex = 0;
                } else if (e.key === "End") {
                    nextIndex = validTabIds.length - 1;
                } else {
                    return;
                }
                e.preventDefault();

                const nextTabId = validTabIds[nextIndex];
                const nextTabEl = existingTabs[nextTabId];
                if (nextTabEl) {
                    nextTabEl.focus();
                    setTab(nextTabId);
                    if (window.ABG.search && typeof window.ABG.search.handleSearch === "function") {
                        window.ABG.search.handleSearch();
                    }
                }
            });
        });

        setTab(activeTabId);
    }

    return {
        getActiveTabId,
        setTab,
        initListeners
    };
})();
