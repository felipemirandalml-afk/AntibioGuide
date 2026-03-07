window.ABG = window.ABG || {};

window.ABG.localContext = (function () {
    const PROFILE_STORAGE_KEY = "abg_active_profile_id";

    function getActiveProfileId() {
        const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
        if (stored && window.clinicalData?.resistanceProfiles?.[stored]) return stored;
        return "general";
    }

    let activeProfileId = getActiveProfileId();

    function getActiveProfile() {
        return window.clinicalData?.resistanceProfiles?.[activeProfileId]
            || window.clinicalData?.resistanceProfiles?.general
            || null;
    }

    function populateProfileSelect() {
        const { profileSelect, profileLabel } = window.ABG.state.dom;

        if (!profileSelect || !window.clinicalData?.resistanceProfiles) return;

        profileSelect.innerHTML = "";

        Object.values(window.clinicalData.resistanceProfiles).forEach(profile => {
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

    function init() {
        const { profileSelect, profileLabel } = window.ABG.state.dom;
        if (profileSelect) {
            populateProfileSelect();

            profileSelect.addEventListener("change", () => {
                activeProfileId = profileSelect.value;
                localStorage.setItem(PROFILE_STORAGE_KEY, activeProfileId);

                const active = getActiveProfile();
                if (profileLabel) {
                    profileLabel.textContent = active?.label || "General";
                }

                if (window.ABG.search && typeof window.ABG.search.handleSearch === "function") {
                    window.ABG.search.handleSearch();
                }
            });
        }
    }

    return {
        PROFILE_STORAGE_KEY,
        getActiveProfileId,
        getActiveProfile,
        init
    };
})();
