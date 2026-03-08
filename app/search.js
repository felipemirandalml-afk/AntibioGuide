window.ABG = window.ABG || {};

window.ABG.search = (function () {
    const { debounce } = (function () {
        function debounce(func, wait) {
            let timeout;
            return function (...args) {
                const context = this;
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(context, args), wait);
            };
        }
        return { debounce };
    })();

    function handleSearch() {
        const { searchInput } = window.ABG.state.dom;
        const queryRaw = searchInput?.value ?? "";
        const query = window.ABG.helpers.normalize(queryRaw);

        // Update Logical State
        window.ABG.state.searchQueryRaw = queryRaw;
        window.ABG.state.searchQuery = query;

        if (typeof window.ABG.render.evaluateEpivigila === "function") {
            window.ABG.render.evaluateEpivigila(queryRaw);
        }

        const activeTabId = window.ABG.tabs.getActiveTabId();
        const allowEmptyInThisTab = activeTabId === "antibiogram";

        if (!allowEmptyInThisTab && query.length < 2) {
            window.ABG.state.showWelcome();
            return;
        }

        if (typeof window.ABG.render.renderResults === "function") {
            window.ABG.render.renderResults(query, queryRaw);
        }
    }

    function initListeners() {
        const { searchInput } = window.ABG.state.dom;
        const debouncedHandleSearch = debounce(handleSearch, 300);

        if (searchInput) {
            searchInput.addEventListener("input", debouncedHandleSearch);
        }
    }

    return {
        handleSearch,
        initListeners
    };
})();
