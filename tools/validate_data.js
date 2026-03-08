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

function assertString(obj, field, context, required = true) {
  if (obj[field] === undefined) {
    if (required) addError(`missing_${field}`, `${context} is missing required string field '${field}'`);
    return;
  }
  if (typeof obj[field] !== "string") {
    addError(`invalid_${field}`, `${context} field '${field}' must be a string`);
  }
}

function assertArray(obj, field, context, required = true) {
  if (obj[field] === undefined) {
    if (required) addError(`missing_${field}`, `${context} is missing required array field '${field}'`);
    return;
  }
  if (!Array.isArray(obj[field])) {
    addError(`invalid_${field}`, `${context} field '${field}' must be an array`);
  }
}

function assertObject(obj, field, context, required = true) {
  if (obj[field] === undefined) {
    if (required) addError(`missing_${field}`, `${context} is missing required object field '${field}'`);
    return false;
  }
  if (typeof obj[field] !== "object" || obj[field] === null || Array.isArray(obj[field])) {
    addError(`invalid_${field}`, `${context} field '${field}' must be an object`);
    return false;
  }
  return true;
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

function validateAntibiotics(data) {
  (data.antibiotics || []).forEach((abx, index) => {
    if (!abx) return;
    const ctx = `antibiotics[${index}] (${abx.id || 'unknown'})`;

    assertString(abx, "id", ctx);
    assertString(abx, "name", ctx);
    assertString(abx, "mechanism", ctx);
    assertString(abx, "spectrum", ctx);
    assertString(abx, "dose", ctx);
    assertString(abx, "renal", ctx);
    assertString(abx, "contraindications", ctx);
    assertString(abx, "adverse", ctx);
    assertString(abx, "uses", ctx);
    assertString(abx, "family", ctx);

    if (Object.prototype.hasOwnProperty.call(abx, "clinical_metadata")) {
      const md = abx.clinical_metadata;
      if (md === null || typeof md !== "object" || Array.isArray(md)) {
        addError("invalid_clinical_metadata", `antibiotics[${index}] (${abx.id}) clinical_metadata must be an object`);
        return;
      }

      const validAware = ["Access", "Watch", "Reserve", null];
      if (md.aware !== undefined && !validAware.includes(md.aware)) {
        addError("invalid_metadata_aware", `antibiotics[${index}] (${abx.id}) aware must be Access, Watch, Reserve or null`);
      }

      const validSpectrum = ["narrow", "moderate", "broad", null];
      if (md.spectrum !== undefined && !validSpectrum.includes(md.spectrum)) {
        addError("invalid_metadata_spectrum", `antibiotics[${index}] (${abx.id}) spectrum must be narrow, moderate, broad or null`);
      }

      const validRoute = ["vo", "ev", "both", null];
      if (md.route_hint !== undefined && !validRoute.includes(md.route_hint)) {
        addError("invalid_metadata_route", `antibiotics[${index}] (${abx.id}) route_hint must be vo, ev, both or null`);
      }

      const booleanFlags = ["anti_pseudomonas", "anaerobic_activity", "atypical_activity", "mrsa_activity", "oral_option"];
      booleanFlags.forEach(flag => {
        if (md[flag] !== undefined && typeof md[flag] !== "boolean") {
          addError("invalid_metadata_boolean", `antibiotics[${index}] (${abx.id}) ${flag} must be boolean`);
        }
      });

      if (md.stewardship_flags !== undefined) {
        if (!Array.isArray(md.stewardship_flags)) {
          addError("invalid_metadata_stewardship", `antibiotics[${index}] (${abx.id}) stewardship_flags must be an array`);
        } else {
          md.stewardship_flags.forEach((flag, fIdx) => {
            if (typeof flag !== "string") {
              addError("invalid_metadata_stewardship_item", `antibiotics[${index}] (${abx.id}) stewardship_flags[${fIdx}] must be a string`);
            }
          });
        }
      }
    }
  });
}

function validatePathogens(data, syndromeIds) {
  (data.pathogens || []).forEach((p, index) => {
    if (!p) return;
    const ctx = `pathogens[${index}] (${p.id || 'unknown'})`;

    assertString(p, "id", ctx);
    assertString(p, "name", ctx);

    // Check canonical nested objects
    if (assertObject(p, "taxonomy", ctx)) {
      assertString(p.taxonomy, "gram", `${ctx}.taxonomy`);
    }

    if (assertObject(p, "clinical", ctx)) {
      assertString(p.clinical, "summary", `${ctx}.clinical`);

      if (p.clinical.usualSyndromes !== undefined) {
        assertArray(p.clinical, "usualSyndromes", `${ctx}.clinical`);
        if (Array.isArray(p.clinical.usualSyndromes)) {
          p.clinical.usualSyndromes.forEach(sId => {
            if (!syndromeIds.has(sId)) {
              addWarn("missing_clinical_syndrome_ref", `${ctx} syndrome ref "${sId}" in usualSyndromes not found`);
            }
          });
        }
      }
    }

    assertObject(p, "resistance", ctx);

    if (p.appMeta !== undefined) {
      if (assertObject(p, "appMeta", ctx)) {
        if (p.appMeta.order !== undefined && typeof p.appMeta.order !== "number") {
          addError("invalid_appMeta_order", `${ctx}.appMeta.order must be a number`);
        }
      }
    } else {
      addWarn("missing_appMeta", `${ctx} is missing the 'appMeta' object`);
    }
  });
}

function validateSyndromes(data, pathogenIds, antibioticsIds) {
  const syndromeIds = getIdSet(data.syndromes);

  (data.syndromes || []).forEach((syndrome, sIndex) => {
    if (!syndrome) return;
    const ctx = `syndromes[${sIndex}] (${syndrome.id || 'unknown'})`;

    assertString(syndrome, "id", ctx);
    assertString(syndrome, "name", ctx);
    assertString(syndrome, "description", ctx);

    // PathogenIds validation
    assertArray(syndrome, "pathogenIds", ctx);
    if (Array.isArray(syndrome.pathogenIds)) {
      syndrome.pathogenIds.forEach((id) => {
        if (!pathogenIds.has(id)) {
          addError("missing_pathogen_ref", `${ctx} pathogen ref "${id}" not found`);
        }
      });
    }

    // Regimens validation
    if (syndrome.regimens !== undefined) {
      assertArray(syndrome, "regimens", ctx);
      if (Array.isArray(syndrome.regimens)) {
        if (syndrome.regimens.length === 0) {
          addWarn("empty_regimens", `${ctx} regimens array is empty`);
        }
        syndrome.regimens.forEach((regimen, rIndex) => {
          if (!regimen) return;
          const rCtx = `${ctx} regimen[${rIndex}]`;
          const hasVisibleName = regimen.name || regimen.title || regimen.regimen;
          if (!hasVisibleName) {
            addWarn("missing_regimen_name", `${rCtx} missing name/title/regimen`);
          }

          assertString(regimen, "type", rCtx, false); // type might be optional in very old data, better safe

          if (regimen.drugIds !== undefined) {
            assertArray(regimen, "drugIds", rCtx);
            if (Array.isArray(regimen.drugIds)) {
              if (regimen.drugIds.length === 0) {
                addError("empty_drugIds", `${rCtx} drugIds is empty`);
              } else {
                regimen.drugIds.forEach((drugId) => {
                  if (!antibioticsIds.has(drugId)) {
                    addError("missing_drugId_ref", `${rCtx} drugId "${drugId}" not found`);
                  }
                });
              }
            }
          }
        });
      }
    } else {
      addWarn("missing_regimens", `${ctx} has no regimens`);
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
    const ctx = `resistanceProfiles.${profileKey}`;

    assertString(profile, "id", ctx);
    assertString(profile, "label", ctx);

    if (profile.data !== undefined) {
      if (assertObject(profile, "data", ctx)) {
        Object.keys(profile.data).forEach((pathogenKey) => {
          if (!pathogenIds.has(pathogenKey)) {
            addError("missing_resistance_pathogen_key", `${ctx}.data key "${pathogenKey}" not found in pathogens`);
          }
        });
      }
    }

    if (profile.modifiers !== undefined) {
      assertArray(profile, "modifiers", ctx);
      if (Array.isArray(profile.modifiers)) {
        profile.modifiers.forEach((modifier, mIndex) => {
          if (!modifier || typeof modifier !== "object") return;
          const mCtx = `${ctx}.modifiers[${mIndex}]`;

          if (modifier.syndrome_id && !syndromeIds.has(modifier.syndrome_id)) {
            addError("missing_modifier_syndrome_ref", `${mCtx} syndrome_id "${modifier.syndrome_id}" not found`);
          }
          if (modifier.pathogen_id && !pathogenIds.has(modifier.pathogen_id)) {
            addError("missing_modifier_pathogen_ref", `${mCtx} pathogen_id "${modifier.pathogen_id}" not found`);
          }
          if (modifier.antibiotic_id && !antibioticIds.has(modifier.antibiotic_id)) {
            addError("missing_modifier_antibiotic_ref", `${mCtx} antibiotic_id "${modifier.antibiotic_id}" not found`);
          }

          if (modifier.match && typeof modifier.match === "object") {
            const match = modifier.match;
            if (match.pathogen_id && !pathogenIds.has(match.pathogen_id)) {
              addError("missing_modifier_match_pathogen_ref", `${mCtx}.match.pathogen_id "${match.pathogen_id}" not found`);
            }
            if (match.antibiotic_id && !antibioticIds.has(match.antibiotic_id)) {
              addError("missing_modifier_match_antibiotic_ref", `${mCtx}.match.antibiotic_id "${match.antibiotic_id}" not found`);
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
  validateAntibiotics(clinicalData);
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
