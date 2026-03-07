window.ABG = window.ABG || {};

window.ABG.modal = (function () {
    let lastFocusedEl = null;
    let durationPopoverEl = null;
    let durationPopoverTrigger = null;

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
        const infoText = window.ABG.helpers.escapeHTML(info);
        const refsText = Array.isArray(refs) && refs.length > 0
            ? `<p class="mt-2 text-xs text-gray-500 dark:text-slate-300"><span class="font-semibold">Fuente:</span> ${window.ABG.helpers.escapeHTML(refs.join("; "))}</p>`
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
        const { medModal, closeModalBtn } = window.ABG.state.dom;
        if (!medModal) return;
        lastFocusedEl = document.activeElement;
        medModal.classList.remove("hidden");
        document.body.classList.add("overflow-hidden");
        closeModalBtn?.focus?.();
    }

    function closeModal() {
        const { medModal } = window.ABG.state.dom;
        if (!medModal) return;
        closeDurationPopover();
        medModal.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
        if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
            lastFocusedEl.focus();
        }
        lastFocusedEl = null;
    }

    function initListeners() {
        const { medModal, closeModalBtn, modalContent } = window.ABG.state.dom;

        closeModalBtn?.addEventListener("click", closeModal);

        window.addEventListener("click", (e) => {
            if (e.target === medModal) closeModal();
            const closeBtn = e.target?.closest?.("[data-duration-popover-close],[data-duration-popover-backdrop]");
            if (!closeBtn) return;
            closeDurationPopover();
        });

        window.addEventListener("keydown", (e) => {
            if (e.key !== "Escape") return;
            if (isDurationPopoverOpen()) {
                closeDurationPopover();
                return;
            }
            if (medModal && !medModal.classList.contains("hidden")) {
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
                openDurationPopover({ trigger: infoBtn, info, refs });
                return;
            }

            const btn = e.target?.closest?.("[data-drugid],[data-drugname]");
            if (!btn) return;

            const drugId = btn.getAttribute("data-drugid");
            if (drugId) {
                const abx = window.ABG.helpers.getAntibioticById(drugId);
                if (abx) {
                    window.ABG.render.showMedDetail(abx);
                    return;
                }
            }

            const drugName = btn.getAttribute("data-drugname");
            if (drugName) {
                const abx = window.ABG.helpers.getAntibioticByName(drugName);
                if (abx) {
                    window.ABG.render.showMedDetail(abx);
                }
            }
        });
    }

    return {
        openModal,
        closeModal,
        openDurationPopover,
        closeDurationPopover,
        initListeners
    };
})();
