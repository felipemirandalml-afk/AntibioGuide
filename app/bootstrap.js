window.ABG = window.ABG || {};

window.ABG.bootstrap = (function () {
    function init() {
        // 1. Initial configuration
        if (typeof window.ABG.helpers.initTheme === "function") {
            window.ABG.helpers.initTheme();
        }

        if (typeof window.ABG.localContext.init === "function") {
            window.ABG.localContext.init();
        }

        // 2. EPIVIGILA
        if (window.EPIVIGILA && typeof window.EPIVIGILA.init === "function") {
            window.EPIVIGILA.init({
                normalize: window.ABG.helpers.normalize
            });
        }

        // 3. Attach standard DOM Listeners
        if (typeof window.ABG.modal.initListeners === "function") {
            window.ABG.modal.initListeners();
        }

        if (typeof window.ABG.tabs.initListeners === "function") {
            window.ABG.tabs.initListeners();
        }

        if (typeof window.ABG.search.initListeners === "function") {
            window.ABG.search.initListeners();
        }

        // 4. Start active view & meta data
        window.ABG.state.showWelcome();

        if (typeof window.ABG.render.renderFooterMeta === "function") {
            window.ABG.render.renderFooterMeta();
        }
    }

    return {
        init
    };
})();

// Application Entry Point
document.addEventListener("DOMContentLoaded", () => {
    window.ABG.bootstrap.init();
});
