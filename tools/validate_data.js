#!/usr/bin/env node
"use strict";

const path = require("path");
const clinicalData = require(path.join(__dirname, "..", "data.js"));

const errors = [];
const warnings = [];

function addError(type, message) {
  errors.push({ type, message });
}

function addWarn(type, message) {
  warnings.push({ type, message });
}

function normalizeName(name) {
  return (name || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function isInvalidId(id) {
  return typeof id !== "string" || id.trim() === "";
}

function checkTopLevelStructure(data) {
  if (!data || typeof data !== "object") {
    addError("structure", "clinicalData is not an object");
    return false;
  }
  if (!Array.isArray(data.antibiotics)) addError("structure", "clinicalData.antibiotics is not an array");
  if (!Array.isArray(data.pathogens)) addError("structure", "clinicalData.pathogens is not an array");
  if (!Array.isArray(data.syndromes)) addError("structure", "clinicalData.syndromes is not an array");
  if (!data.resistanceProfiles || typeof data.resistanceProfiles !== "object" || Array.isArray(data.resistanceProfiles)) {
    addWarn("structure", "clinicalData.resistanceProfiles is not a valid object");
  }
  return true;
}

function collectDuplicateIdsAndNames(items, groupName) {
  const seenIds = new Map();
  const seenNames = new Map();

  (items || []).forEach((item, index) => {
    if (!item) return;

    // Minimum fields
    if (!item.name) {
      addError("missing_name", `${groupName}[${index}] is missing name`);
    }

    const id = item.id;
    if (isInvalidId(id)) {
      addError("invalid_id", `${groupName}[${index}] has invalid or missing id: "${id}"`);
      return;
    }

    if (seenIds.has(id)) {
      addError("duplicate_id", `Duplicate id "${id}" in ${groupName}`);
    } else {
      seenIds.set(id, index);
    }

    if (item.name) {
      const normName = normalizeName(item.name);
      if (seenNames.has(normName)) {
        addWarn("duplicate_name", `Duplicate or similar name "${item.name}" in ${groupName}`);
      } else {
        seenNames.set(normName, index);
      }
    }
  });
}

function getIdSet(items) {
  return new Set((items || []).map((x) => x && x.id).filter(Boolean));
}

function validatePathogens(data, syndromeIds) {
  (data.pathogens || []).forEach((p, index) => {
    if (!p) return;

    // Check canonical nested objects
    if (!p.taxonomy || typeof p.taxonomy !== 'object') {
      addError("missing_taxonomy", `pathogens[${index}] (${p.id}) is missing the 'taxonomy' object`);
    } else {
      if (!p.taxonomy.gram) addError("missing_taxonomy_gram", `pathogens[${index}] (${p.id}) missing taxonomy.gram`);
    }

    if (!p.clinical || typeof p.clinical !== 'object') {
      addError("missing_clinical", `pathogens[${index}] (${p.id}) is missing the 'clinical' object`);
    } else {
      if (!p.clinical.summary) addError("missing_clinical_summary", `pathogens[${index}] (${p.id}) missing clinical.summary`);
      if (p.clinical.usualSyndromes && Array.isArray(p.clinical.usualSyndromes)) {
        p.clinical.usualSyndromes.forEach(sId => {
          if (!syndromeIds.has(sId)) {
            addWarn("missing_clinical_syndrome_ref", `pathogens[${index}] (${p.id}) syndrome ref "${sId}" in usualSyndromes not found`);
          }
        });
      }
    }

    if (!p.resistance || typeof p.resistance !== 'object') {
      addError("missing_resistance", `pathogens[${index}] (${p.id}) is missing the 'resistance' object`);
    }

    if (!p.appMeta || typeof p.appMeta !== 'object') {
      addWarn("missing_appMeta", `pathogens[${index}] (${p.id}) is missing the 'appMeta' object`);
    }
  });
}

function validateSyndromes(data, pathogenIds, antibioticsIds) {
  const syndromeIds = getIdSet(data.syndromes);

  (data.syndromes || []).forEach((syndrome, sIndex) => {
    if (!syndrome) return;

    // PathogenIds validation
    if (Object.prototype.hasOwnProperty.call(syndrome, "pathogenIds")) {
      if (!Array.isArray(syndrome.pathogenIds)) {
        addError("invalid_pathogenIds", `syndromes[${sIndex}] (${syndrome.id}) pathogenIds is not an array`);
      } else {
        syndrome.pathogenIds.forEach((id) => {
          if (!pathogenIds.has(id)) {
            addError("missing_pathogen_ref", `syndromes[${sIndex}] (${syndrome.id}) pathogen ref "${id}" not found`);
          }
        });
      }
    }

    // Regimens validation
    if (!Object.prototype.hasOwnProperty.call(syndrome, "regimens")) {
      addWarn("missing_regimens", `syndromes[${sIndex}] (${syndrome.id}) has no regimens`);
    } else if (!Array.isArray(syndrome.regimens)) {
      addError("invalid_regimens", `syndromes[${sIndex}] (${syndrome.id}) regimens is not an array`);
    } else {
      if (syndrome.regimens.length === 0) {
        addWarn("empty_regimens", `syndromes[${sIndex}] (${syndrome.id}) regimens array is empty`);
      }
      syndrome.regimens.forEach((regimen, rIndex) => {
        if (!regimen) return;
        const hasVisibleName = regimen.name || regimen.title || regimen.regimen;
        if (!hasVisibleName) {
          addWarn("missing_regimen_name", `syndromes[${sIndex}] (${syndrome.id}) regimen[${rIndex}] missing name/title/regimen`);
        }

        if (Object.prototype.hasOwnProperty.call(regimen, "drugIds")) {
          if (!Array.isArray(regimen.drugIds)) {
            addError("invalid_drugIds", `syndromes[${sIndex}] (${syndrome.id}) regimen[${rIndex}] drugIds is not an array`);
          } else if (regimen.drugIds.length === 0) {
            addError("empty_drugIds", `syndromes[${sIndex}] (${syndrome.id}) regimen[${rIndex}] drugIds is empty`);
          } else {
            regimen.drugIds.forEach((drugId) => {
              if (!antibioticsIds.has(drugId)) {
                addError("missing_drugId_ref", `syndromes[${sIndex}] (${syndrome.id}) regimen[${rIndex}] drugId "${drugId}" not found`);
              }
            });
          }
        }
      });
    }
  });

  return syndromeIds;
}

function validateResistanceProfiles(data, pathogenIds, antibioticIds, syndromeIds) {
  const profiles = data.resistanceProfiles;
  if (!profiles || typeof profiles !== "object" || Array.isArray(profiles)) return;

  Object.keys(profiles).forEach((profileKey) => {
    const profile = profiles[profileKey];
    if (!profile || typeof profile !== "object") return;

    if (isInvalidId(profile.id)) {
      addError("invalid_profile_id", `resistanceProfiles.${profileKey} missing or invalid id`);
    }
    if (!profile.label) {
      addError("missing_profile_label", `resistanceProfiles.${profileKey} missing label`);
    }

    const profileData = profile.data;
    if (profileData && typeof profileData === "object" && !Array.isArray(profileData)) {
      Object.keys(profileData).forEach((pathogenKey) => {
        if (!pathogenIds.has(pathogenKey)) {
          addError("missing_resistance_pathogen_key", `resistanceProfiles.${profileKey}.data key "${pathogenKey}" not found in pathogens`);
        }
      });
    }

    if (Object.prototype.hasOwnProperty.call(profile, "modifiers")) {
      if (!Array.isArray(profile.modifiers)) {
        addError("invalid_modifiers", `resistanceProfiles.${profileKey}.modifiers is not an array`);
      } else {
        profile.modifiers.forEach((modifier, mIndex) => {
          if (!modifier || typeof modifier !== "object") return;

          if (modifier.syndrome_id && !syndromeIds.has(modifier.syndrome_id)) {
            addError("missing_modifier_syndrome_ref", `resistanceProfiles.${profileKey}.modifiers[${mIndex}] syndrome_id "${modifier.syndrome_id}" not found`);
          }
          if (modifier.pathogen_id && !pathogenIds.has(modifier.pathogen_id)) {
            addError("missing_modifier_pathogen_ref", `resistanceProfiles.${profileKey}.modifiers[${mIndex}] pathogen_id "${modifier.pathogen_id}" not found`);
          }
          if (modifier.antibiotic_id && !antibioticIds.has(modifier.antibiotic_id)) {
            addError("missing_modifier_antibiotic_ref", `resistanceProfiles.${profileKey}.modifiers[${mIndex}] antibiotic_id "${modifier.antibiotic_id}" not found`);
          }

          if (modifier.match && typeof modifier.match === "object") {
            const match = modifier.match;
            if (match.pathogen_id && !pathogenIds.has(match.pathogen_id)) {
              addError("missing_modifier_match_pathogen_ref", `resistanceProfiles.${profileKey}.modifiers[${mIndex}].match.pathogen_id "${match.pathogen_id}" not found`);
            }
            if (match.antibiotic_id && !antibioticIds.has(match.antibiotic_id)) {
              addError("missing_modifier_match_antibiotic_ref", `resistanceProfiles.${profileKey}.modifiers[${mIndex}].match.antibiotic_id "${match.antibiotic_id}" not found`);
            }
          }
        });
      }
    }
  });
}

function printReport(data) {
  const counts = {
    syndromes: (data.syndromes || []).length,
    pathogens: (data.pathogens || []).length,
    antibiotics: (data.antibiotics || []).length,
    resistanceProfiles: Object.keys(data.resistanceProfiles || {}).length,
  };

  console.log("=== AntibioGuide Data Validation ===");
  console.log(
    `Collections: syndromes=${counts.syndromes}, pathogens=${counts.pathogens}, antibiotics=${counts.antibiotics}, resistanceProfiles=${counts.resistanceProfiles}`
  );
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);
  console.log("");

  if (errors.length > 0) {
    errors.forEach((e) => console.log(`[ERROR] ${e.type}: ${e.message}`));
    console.log("");
  }

  if (warnings.length > 0) {
    warnings.forEach((w) => console.log(`[WARN] ${w.type}: ${w.message}`));
    console.log("");
  }

  if (errors.length === 0) {
    console.log("Result: OK");
  } else {
    console.log("Result: FAIL");
  }
}

function main() {
  if (!checkTopLevelStructure(clinicalData)) {
    printReport(clinicalData);
    process.exit(1);
  }

  collectDuplicateIdsAndNames(clinicalData.syndromes, "syndromes");
  collectDuplicateIdsAndNames(clinicalData.pathogens, "pathogens");
  collectDuplicateIdsAndNames(clinicalData.antibiotics, "antibiotics");

  const pathogenIds = getIdSet(clinicalData.pathogens);
  const antibioticIds = getIdSet(clinicalData.antibiotics);

  const syndromeIds = validateSyndromes(clinicalData, pathogenIds, antibioticIds);
  validatePathogens(clinicalData, syndromeIds);
  validateResistanceProfiles(clinicalData, pathogenIds, antibioticIds, syndromeIds);

  printReport(clinicalData);

  if (errors.length > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main();
