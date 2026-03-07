window.ABG = window.ABG || {};

window.ABG.helpers = (function () {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const themeSunSvg =
        '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M6.34 17.66l-1.41 1.41"></path><path d="M19.07 4.93l-1.41 1.41"></path></svg>';
    const themeMoonSvg =
        '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

    function applyTheme(theme) {
        const safeTheme = theme === "dark" ? "dark" : "light";
        const isDark = safeTheme === "dark";

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
            // Ignore
        }
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function setTheme(theme) {
        const safeTheme = theme === "dark" ? "dark" : "light";
        try {
            localStorage.setItem("theme", safeTheme);
        } catch (_err) { }
        applyTheme(safeTheme);
    }

    function escapeHTML(str) {
        if (str === null || str === undefined) return "";
        return String(str).replace(/[&<>"']/g, (ch) => {
            switch (ch) {
                case "&": return "&amp;";
                case "<": return "&lt;";
                case ">": return "&gt;";
                case '"': return "&quot;";
                case "'": return "&#39;";
                default: return ch;
            }
        });
    }

    function normalize(text = "") {
        return String(text)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\p{L}\p{N}\s]/gu, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function escapeRegExp(str = "") {
        return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function scoreTextMatch(queryNorm, textNorm) {
        if (!queryNorm || !textNorm) return 0;
        if (textNorm === queryNorm) return 100;

        let score = 0;
        const wordRe = new RegExp(`(^|\\s)${escapeRegExp(queryNorm)}(\\s|$)`, "i");
        if (wordRe.test(textNorm)) score = Math.max(score, 80);

        if (queryNorm.length >= 3) {
            if (textNorm.startsWith(queryNorm)) score = Math.max(score, 70);
            const wordPrefixRe = new RegExp(`(^|\\s)${escapeRegExp(queryNorm)}`, "i");
            if (wordPrefixRe.test(textNorm)) score = Math.max(score, 60);
            if (textNorm.includes(queryNorm)) score = Math.max(score, 40);
        }
        return score;
    }

    function scoreMultiWord(queryNorm, textNorm) {
        const tokens = queryNorm.split(" ").filter(Boolean);
        if (tokens.length === 0) return 0;

        let total = 0;
        for (const t of tokens) total += scoreTextMatch(t, textNorm);

        if (tokens.length > 1 && textNorm.includes(queryNorm)) total += 15;
        return total;
    }

    function getAntibioticById(drugId) {
        return (window.clinicalData?.antibiotics || []).find((a) => a?.id === drugId) || null;
    }

    function getAntibioticByName(name) {
        const q = normalize(name || "");
        if (!q) return null;
        return (
            (window.clinicalData?.antibiotics || []).find((a) => normalize(a?.name || "") === q) ||
            (window.clinicalData?.antibiotics || []).find((a) => {
                const syns = Array.isArray(a?.synonyms) ? a.synonyms : [];
                return syns.some((s) => normalize(s) === q);
            }) ||
            null
        );
    }

    function initTheme() {
        applyTheme(getPreferredTheme());
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
    }

    return {
        applyTheme,
        getPreferredTheme,
        setTheme,
        escapeHTML,
        normalize,
        escapeRegExp,
        scoreTextMatch,
        scoreMultiWord,
        getAntibioticById,
        getAntibioticByName,
        initTheme
    };
})();
