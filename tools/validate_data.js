#!/usr/bin/env node
"use strict";

const path = require("path");
const clinicalData = require(path.join(__dirname, "..", "data.js"));

function addIssue(issues, type, message, context) {
  issues.push({ type, message, context });
}

function collectDuplicateIds(items, groupName, issues) {
  const seen = new Map();
  (items || []).forEach((item, index) => {
    const id = item && item.id;
    if (!id) {
      addIssue(issues, "missing_id", `${groupName}[${index}] is missing id`, { groupName, index });
      return;
    }
    if (seen.has(id)) {
      addIssue(issues, "duplicate_id", `Duplicate id "${id}" in ${groupName}`, {
        groupName,
        firstIndex: seen.get(id),
        duplicateIndex: index,
        id,
      });
      return;
    }
    seen.set(id, index);
  });
}

function getIdSet(items) {
  return new Set((items || []).map((x) => x && x.id).filter(Boolean));
}

function validateSyndromePathogenRefs(data, pathogenIds, issues) {
  (data.syndromes || []).forEach((syndrome, sIndex) => {
    const refs = Array.isArray(syndrome.pathogenIds) ? syndrome.pathogenIds : [];
    refs.forEach((id, pIndex) => {
      if (!pathogenIds.has(id)) {
        addIssue(
          issues,
          "missing_pathogen_ref",
          `syndromes[${sIndex}] (${syndrome.id}) pathogenIds[${pIndex}] "${id}" not found in pathogens`,
          { syndromeId: syndrome.id, pathogenId: id }
        );
      }
    });
  });
}

function validateModifierMatchRefs(data, pathogenIds, antibioticIds, issues) {
  const profiles = data.resistanceProfiles || {};
  Object.keys(profiles).forEach((profileKey) => {
    const profile = profiles[profileKey];
    const modifiers = Array.isArray(profile && profile.modifiers) ? profile.modifiers : [];
    modifiers.forEach((modifier, mIndex) => {
      const match = modifier && modifier.match;
      if (!match || typeof match !== "object") return;

      if (match.pathogen_id && !pathogenIds.has(match.pathogen_id)) {
        addIssue(
          issues,
          "missing_modifier_pathogen_ref",
          `resistanceProfiles.${profileKey}.modifiers[${mIndex}].match.pathogen_id "${match.pathogen_id}" not found`,
          { profileKey, modifierId: modifier.id, pathogenId: match.pathogen_id }
        );
      }

      if (match.antibiotic_id && !antibioticIds.has(match.antibiotic_id)) {
        addIssue(
          issues,
          "missing_modifier_antibiotic_ref",
          `resistanceProfiles.${profileKey}.modifiers[${mIndex}].match.antibiotic_id "${match.antibiotic_id}" not found`,
          { profileKey, modifierId: modifier.id, antibioticId: match.antibiotic_id }
        );
      }
    });
  });
}

function validateResistanceDataPathogenKeys(data, pathogenIds, issues) {
  const profiles = data.resistanceProfiles || {};
  Object.keys(profiles).forEach((profileKey) => {
    const profile = profiles[profileKey];
    const profileData = profile && profile.data;
    if (!profileData || typeof profileData !== "object" || Array.isArray(profileData)) return;

    Object.keys(profileData).forEach((pathogenKey) => {
      if (!pathogenIds.has(pathogenKey)) {
        addIssue(
          issues,
          "missing_resistance_pathogen_key",
          `resistanceProfiles.${profileKey}.data key "${pathogenKey}" not found in pathogens`,
          { profileKey, pathogenId: pathogenKey }
        );
      }
    });
  });
}

function validateRegimenDrugIds(data, antibioticIds, issues) {
  (data.syndromes || []).forEach((syndrome, sIndex) => {
    const regimens = Array.isArray(syndrome.regimens) ? syndrome.regimens : [];
    regimens.forEach((regimen, rIndex) => {
      const regimenRef = regimen && regimen.id ? `id="${regimen.id}"` : `index=${rIndex}`;
      if (!Object.prototype.hasOwnProperty.call(regimen || {}, "drugIds")) {
        addIssue(
          issues,
          "missing_regimen_drugids",
          `syndromes[${sIndex}] (${syndrome.id}) regimen (${regimenRef}) regimen missing drugIds`,
          { syndromeId: syndrome.id, regimenId: regimen && regimen.id ? regimen.id : null, regimenIndex: rIndex }
        );
        return;
      }

      if (!Array.isArray(regimen.drugIds) || regimen.drugIds.length === 0) {
        addIssue(
          issues,
          "empty_regimen_drugids",
          `syndromes[${sIndex}] (${syndrome.id}) regimen (${regimenRef}) regimen has empty drugIds`,
          { syndromeId: syndrome.id, regimenId: regimen && regimen.id ? regimen.id : null, regimenIndex: rIndex }
        );
        return;
      }

      regimen.drugIds.forEach((drugId, dIndex) => {
        if (!antibioticIds.has(drugId)) {
          addIssue(
            issues,
            "missing_regimen_drugid_ref",
            `syndromes[${sIndex}] (${syndrome.id}) regimens[${rIndex}] drugIds[${dIndex}] "${drugId}" not found in antibiotics`,
            { syndromeId: syndrome.id, regimenName: regimen.name, drugId }
          );
        }
      });
    });
  });
}

function printReport(data, issues) {
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

  if (issues.length === 0) {
    console.log("Result: OK (no integrity errors)");
    return;
  }

  console.log(`Result: FAIL (${issues.length} error${issues.length === 1 ? "" : "s"})`);
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. [${issue.type}] ${issue.message}`);
  });
}

function main() {
  const issues = [];

  collectDuplicateIds(clinicalData.syndromes, "syndromes", issues);
  collectDuplicateIds(clinicalData.pathogens, "pathogens", issues);
  collectDuplicateIds(clinicalData.antibiotics, "antibiotics", issues);

  const pathogenIds = getIdSet(clinicalData.pathogens);
  const antibioticIds = getIdSet(clinicalData.antibiotics);

  validateSyndromePathogenRefs(clinicalData, pathogenIds, issues);
  validateModifierMatchRefs(clinicalData, pathogenIds, antibioticIds, issues);
  validateResistanceDataPathogenKeys(clinicalData, pathogenIds, issues);
  validateRegimenDrugIds(clinicalData, antibioticIds, issues);

  printReport(clinicalData, issues);
  if (issues.length > 0) process.exit(1);
}

main();
