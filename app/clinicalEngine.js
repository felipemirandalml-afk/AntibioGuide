/**
 * =========================================================================
 * CLINICAL ENGINE (clinicalEngine.js)
 * =========================================================================
 * ARCHITECTURE GUARDRAIL:
 * This file implements PURE CLINICAL LOGIC.
 * - It must NOT contain HTML or UI-specific formatting strings.
 * - It returns structured data that the UI layer (render.js/templates.js)
 *   will then use to build the interface.
 * =========================================================================
 */
window.ABG = window.ABG || {};

window.ABG.clinicalEngine = (function () {

    /**
     * Given a resistance profile and pathogen ID, returns the raw susceptibility items
     * and blee percentage, resolving nested keys like 'sterile' if present.
     */
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

            const items = [];
            let bleePct;

            Object.entries(sourceData).forEach(([abxId, value]) => {
                if (abxId === "blee_pct" && typeof value === "number") {
                    bleePct = value;
                    return;
                }

                if (!value || typeof value !== "object") return;

                const abxName = window.clinicalData?.antibiotics?.find((a) => a?.id === abxId)?.name || window.ABG.helpers.humanizeId(abxId);

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

    /**
     * Determines the local contextual warnings for a specific regimen based on 
     * both global rules and active profile modifiers.
     * Returns an array of structured objects for the UI layer to format.
     */
    function getRegimenWarnings(syndromeId, regimenDrugIds = []) {
        const profile = window.ABG.localContext.getActiveProfile();
        if (!profile) return [];

        const warnings = [];

        // 1. Process Global High Resistance Alerts (from rules.js)
        const globalRules = window.clinicalData?.rules?.clinical?.highResistanceAlerts || [];
        globalRules.forEach(rule => {
            if (rule.syndrome_id !== syndromeId) return;

            const abxIds = rule.antibiotic_ids || (rule.antibiotic_id ? [rule.antibiotic_id] : []);
            const matchingAbx = regimenDrugIds.filter(id => abxIds.includes(id));

            if (matchingAbx.length === 0) return;

            // Check if profile has resistance data for this pathogen
            const rMatrix = profile.data?.[rule.pathogen_id];
            if (!rMatrix) return;

            matchingAbx.forEach(abxId => {
                const rData = rMatrix[abxId];
                if (rData && typeof rData.r_pct === "number" && rData.r_pct >= rule.threshold_r_pct) {
                    warnings.push({
                        message: rule.message,
                        r_pct: rData.r_pct,
                        profileLabel: profile.label
                    });
                }
            });
        });

        // 2. Process Local Profile Modifiers (legacy/custom)
        const localModifiers = Array.isArray(profile.modifiers) ? profile.modifiers : [];
        localModifiers.forEach(mod => {
            if (mod.action !== "show_warning") return;
            if (mod.syndrome_id !== syndromeId) return;

            if (!regimenDrugIds.includes(mod.match?.antibiotic_id)) return;

            const rData =
                profile.data?.[mod.match?.pathogen_id]?.[mod.match?.antibiotic_id];

            if (!rData || typeof rData.r_pct !== "number") return;

            if (rData.r_pct >= mod.threshold_r_pct) {
                // Ensure we don't duplicate warnings if already added by global rules
                const isDuplicate = warnings.some(w => w.message === mod.message && w.r_pct === rData.r_pct);
                if (!isDuplicate) {
                    warnings.push({
                        message: mod.message,
                        r_pct: rData.r_pct,
                        profileLabel: profile.label
                    });
                }
            }
        });

        return warnings;
    }

    /**
     * Sorts and parses items for a susceptibility banner based on thresholds.
     */
    function buildSusceptibilityViewModel(localResult, profile) {
        if (!localResult) return null;

        const threshold = Number(profile?.threshold_s_pct ?? profile?.threshold ?? 75);
        const items = Array.isArray(localResult.items) ? localResult.items : [];
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

        // Move subtitle source logic here, but UI formatting belongs in render/templates.
        // We provide the source info for the renderer.
        return {
            items: shown,
            blee_pct: localResult.blee_pct,
            threshold,
            sourceInfo: {
                profileId: profile?.id,
                profileLabel: profile?.label
            }
        };
    }

    return {
        getLocalSusceptibilityForPathogen,
        getRegimenWarnings,
        buildSusceptibilityViewModel
    };
})();
