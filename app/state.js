window.ABG = window.ABG || {};

window.ABG.state = (function () {
    const dom = {
        searchInput: document.getElementById("search-input"),
        contentDisplay: document.getElementById("content-display"),
        epiBanner: document.getElementById("epivigila-banner"),
        medModal: document.getElementById("med-modal"),
        closeModalBtn: document.getElementById("close-modal"),
        modalContent: document.getElementById("modal-content"),
        welcomeScreen: document.getElementById("welcome-screen"),
        profileSelect: document.getElementById("profile-select"),
        profileLabel: document.getElementById("active-profile-label"),
        footerMeta: document.getElementById("footer-meta")
    };

    const welcomeHTML = dom.welcomeScreen ? dom.welcomeScreen.outerHTML : "";

    function showWelcome() {
        if (dom.contentDisplay) {
            dom.contentDisplay.innerHTML = welcomeHTML || "";
        }
    }

    return {
        dom,
        welcomeHTML,
        showWelcome
    };
})();
