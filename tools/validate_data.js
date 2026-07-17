#!/usr/bin/env node
"use strict";

const path = require("path");
const clinicalData = require(path.join(__dirname, "..", "data.js"));

const errors = [];
const warnings = [];
/**
 * ROADMAP DE SÍNDROMES
 *
 * Referencias desde pathogens.clinical.usualSyndromes hacia síndromes que
 * todavía no existen en syndromes.js. Se mantienen a propósito: la capa de
 * patógenos declara la verdad clínica (qué causa cada germen) y va por delante
 * de la capa de síndromes.
 *
 * NO incluir aquí alias de síndromes ya definidos. El vocabulario de ids debe
 * ser único: si un patógeno referencia "neumonia_adquirida_comunidad" cuando
 * ya existe "nac", eso NO es backlog — es deuda de vocabulario, y se corrige
 * en pathogens.js.
 *
 * Alias normalizados (2026-07-12): neumonia_adquirida_comunidad→nac,
 * neumonia_intrahospitalaria→nih, meningitis_bacteriana→meningitis,
 * infeccion_intraabdominal→intraabdominal, enfermedad_pelvica_inflamatoria→epi,
 * itu_asociada_cateter→itu_cauti, cistitis_aguda/itu_baja→itu_cistitis.
 */
const expectedPendingSyndromeRefs = new Set([
  // --- Nuevos por escribir (30) ---
  "absceso_cerebral",
  "absceso_pulmonar",
  "artritis_septica",
  "bacteriemia",
  "bacteriemia_asociada_cateter",
  "candidemia",
  "cervicitis",
  "diarrea_disenterica",
  "espondilodiscitis",
  "exacerbacion_epoc",
  "gastroenteritis_aguda",
  "hepatitis_granulomatosa",
  "infeccion_asociada_embarazo",
  "infeccion_cervicofacial",
  "infeccion_herida_operatoria",
  "infeccion_necrotizante_tejidos_blandos",
  "infeccion_tracto_respiratorio_fq",
  "intoxicacion_alimentaria",
  "linfadenitis_regional",
  "mionecrosis",
  "neumonia_asociada_ventilacion",
  "neumonia_cavitada",
  "osteoartritis",
  "otitis_media_aguda",
  "sinusitis_aguda",
  "uretritis",

  // --- Posibles VARIANTES de un síndrome existente (5) ---
  // Decisión clínica pendiente: ¿síndrome propio, o `scenario` dentro del existente?
  "neumonia_adquirida_comunidad_grave",   // ¿escenario grave/UCI de `nac`?
  "neumonia_atipica",                     // ¿targets atípicos de `nac`?
  "endocarditis_cultivo_negativo",        // ¿escenario de `endocarditis_infecciosa`?
  "infeccion_cutanea_primaria",           // solapa con `celulitis`
  "infeccion_endovascular",               // solapa con `endocarditis_infecciosa` / `bacteriemia`
]);

/**
 * FUERA DE ALCANCE — no se implementarán como síndrome.
 *
 * La referencia se conserva en pathogens.js porque es CLÍNICAMENTE CIERTA
 * (S. agalactiae sí causa sepsis neonatal), pero queda fuera del alcance de
 * esta aplicación, que es de ADULTOS. Declararlo explícitamente evita que
 * reaparezca como "pendiente" en cada validación.
 */
const outOfScopeSyndromeRefs = new Map([
  ["sepsis_neonatal", "neonatal — la app es de adultos"],
  ["conjuntivitis_neonatal", "neonatal — la app es de adultos"],
  ["colonizacion_cutanea_persistente", "colonización, no infección tratable"],
  ["infeccion_invasora", "término inespecífico, no es un síndrome accionable"],
]);

/**
 * NO SON SÍNDROMES DE TERAPIA EMPÍRICA.
 *
 * Estas referencias son CLÍNICAMENTE CIERTAS y se conservan en pathogens.js
 * porque informan al clínico (la fiebre Q sí causa hepatitis granulomatosa).
 * Pero NO son blancos de tratamiento antibiótico empírico: son presentaciones
 * que se ESTUDIAN y se tratan de forma DIRIGIDA una vez identificado el agente.
 *
 * Darle un régimen empírico a un "síndrome febril prolongado" sería un
 * antipatrón: la fiebre de origen desconocido se investiga, no se cubre a ciegas.
 * Por eso no se implementarán como síndrome en el motor.
 */
const notEmpiricSyndromeRefs = new Map([
  ["sindrome_febril_agudo", "presentación diagnóstica (fiebre Q), no blanco empírico — se estudia y se trata dirigido"],
  ["sindrome_febril_prolongado", "FOD (brucelosis): se investiga, NO se cubre empíricamente a ciegas"],
  ["hepatitis_granulomatosa", "manifestación de fiebre Q: diagnóstico serológico + terapia dirigida (doxiciclina)"],
  ["romboencefalitis", "listeriosis del SNC: mismo tratamiento que la meningitis por Listeria (ampicilina). Evaluar como escenario de `meningitis`"],
]);

/**
 * SÍNDROMES ELIMINADOS DEL ROADMAP POR EVIDENCIA.
 *
 * Documentado aquí para que la decisión no se pierda ni se revierta por olvido.
 *
 * - neumonia_asociada_cuidados_salud (HCAP)
 *   La categoría fue ABANDONADA. Los criterios de HCAP rindieron mal para
 *   predecir patógenos multirresistentes, y el tratamiento de amplio espectro
 *   según guía NO redujo la mortalidad.
 *     · Ewig S, Kolditz M, Pletz MW, Chalmers J. "Healthcare-associated
 *       pneumonia: is there any reason to continue to utilize this label in
 *       2019?" Clin Microbiol Infect. 2019;25(10):1173-9.
 *       doi:10.1016/j.cmi.2019.02.022
 *       → "HCAP should no longer be used to identify patients at risk of MDR pathogens."
 *     · La guía IDSA/ATS 2016 de HAP/VAP eliminó la categoría:
 *       Kalil AC, et al. Clin Infect Dis. 2016;63(5):e61-e111. doi:10.1093/cid/ciw353
 *
 *   Mantener HCAP en una app de OPTIMIZACIÓN de antimicrobianos sería
 *   contraproducente: su efecto conocido es gatillar amplio espectro innecesario.
 *
 *   Acción tomada: `serratia_marcescens` se remapeó de
 *   `neumonia_asociada_cuidados_salud` a `nih`, que es la categoría vigente y
 *   clínicamente correcta (Serratia es un patógeno nosocomial clásico).
 */

// Vocabularios canónicos. Existen porque el mismo concepto escrito de dos formas
// parte los grupos en dos y degrada la búsqueda (render.js puntúa sobre `family`).
const CANONICAL_GRAM = new Set(["positive", "negative", "atypical", "fungal", "variable"]);

// Algo "con forma de id": minúscula y snake_case, sin espacios ni mayúsculas.
const ID_SHAPED = /^[a-z0-9_]+$/;

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

/**
 * Arrays densos: sin elisiones (`["a", , "b"]`) ni null.
 *
 * Esta guarda existe por un bug real: una coma doble en `pathogenIds` pasó el
 * validador, la auditoría Y los tests. `.forEach`, `.map` y `.filter` SALTAN los
 * huecos en silencio, así que nada lo veía; pero `.length` sí los cuenta y
 * `for...of` devuelve `undefined`. Recorre todo el árbol porque el defecto puede
 * aparecer en cualquier array, no solo en los que se revisan a mano.
 */
function checkDenseArrays(node, path, seen = new Set()) {
  if (node && typeof node === "object") {
    if (seen.has(node)) return; // los perfiles de resistencia se referencian entre sí
    seen.add(node);
  }
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) {
      if (!(i in node)) {
        addError(
          "array_hole",
          `${path}[${i}] es un HUECO de array (coma doble). Los métodos .forEach/.map lo saltan en silencio, ` +
          `pero .length lo cuenta y for...of devuelve undefined.`
        );
      } else if (node[i] === null || node[i] === undefined) {
        addError("array_null", `${path}[${i}] es ${node[i]} dentro de un array`);
      } else {
        checkDenseArrays(node[i], `${path}[${i}]`, seen);
      }
    }
  } else if (node && typeof node === "object") {
    Object.keys(node).forEach((k) => checkDenseArrays(node[k], `${path}.${k}`, seen));
  }
}

/**
 * Una clase de fármaco escrita de dos formas ("Macrólido" y "Macrólidos") son dos
 * familias distintas para el motor: la búsqueda puntúa sobre `family`
 * (render.js:239) y el agrupamiento las separa. Normaliza plural y acentos para
 * detectar el par.
 */
function checkFamilyVocabulary(data) {
  const norm = (s) =>
    s.toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/(es|s)$/, "")
      .replace(/[^a-z0-9]/g, "");
  const byKey = new Map();
  (data.antibiotics || []).forEach((a) => {
    if (!a || typeof a.family !== "string" || !a.family.trim()) return;
    const k = norm(a.family);
    if (!byKey.has(k)) byKey.set(k, new Set());
    byKey.get(k).add(a.family);
  });
  byKey.forEach((forms) => {
    if (forms.size > 1) {
      addError(
        "family_vocab_drift",
        `la misma clase escrita de dos formas: ${[...forms].map((f) => `"${f}"`).join(" vs ")}. ` +
        `Elige una: la búsqueda puntúa sobre 'family' y dos grafías dan resultados distintos.`
      );
    }
  });
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

  // Validate Rules Layer presence
  if (!data.rules || typeof data.rules !== "object") {
    addError("structure", "clinicalData.rules is missing or not a valid object");
  } else {
    if (!data.rules.stewardship || typeof data.rules.stewardship !== "object") {
      addError("structure", "clinicalData.rules.stewardship is missing");
    }
    if (!data.rules.regulatory || typeof data.rules.regulatory !== "object") {
      addError("structure", "clinicalData.rules.regulatory is missing");
    }
    if (!data.rules.contextual || typeof data.rules.contextual !== "object") {
      addError("structure", "clinicalData.rules.contextual is missing");
    }
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

      const validRoute = ["vo", "ev", "both", "im", null];
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

function validatePathogens(data, syndromeIds, antibioticIds) {
  (data.pathogens || []).forEach((p, index) => {
    if (!p) return;
    const ctx = `pathogens[${index}] (${p.id || 'unknown'})`;

    assertString(p, "id", ctx);
    assertString(p, "name", ctx);

    // Check canonical nested objects
    if (assertObject(p, "taxonomy", ctx)) {
      assertString(p.taxonomy, "gram", `${ctx}.taxonomy`);
      if (typeof p.taxonomy.gram === "string" && !CANONICAL_GRAM.has(p.taxonomy.gram)) {
        addError(
          "invalid_gram",
          `${ctx}.taxonomy.gram "${p.taxonomy.gram}" no está en el vocabulario canónico (${[...CANONICAL_GRAM].join(", ")}). ` +
          `Dos grafías del mismo concepto parten los grupos en dos.`
        );
      }
    }

    // `resistance` mezcla a propósito dos vocabularios: un id de antibiótico
    // (enlaza) y prosa que nombra una clase o un mecanismo ("Aminoglucósidos",
    // "BLEE"). Lo que NO se admite es el disfraz: algo con forma de id que no
    // existe se descarta en silencio, que es justo lo que no debe pasar.
    ["intrinsic", "typicalAcquired"].forEach((field) => {
      const list = p.resistance && p.resistance[field];
      if (!Array.isArray(list)) return;
      list.forEach((x) => {
        if (typeof x === "string" && ID_SHAPED.test(x) && !antibioticIds.has(x)) {
          addError(
            "resistance_vocab_drift",
            `${ctx}.resistance.${field} "${x}" tiene forma de id pero no existe ningún antibiótico así. ` +
            `Usa el id real, o escríbelo como prosa si es una clase (p. ej. "Aminoglucósidos").`
          );
        }
      });
    });

    if (assertObject(p, "clinical", ctx)) {
      assertString(p.clinical, "summary", `${ctx}.clinical`);

      if (p.clinical.usualSyndromes !== undefined) {
        assertArray(p.clinical, "usualSyndromes", `${ctx}.clinical`);
        if (Array.isArray(p.clinical.usualSyndromes)) {
          p.clinical.usualSyndromes.forEach(sId => {
            if (!syndromeIds.has(sId)) {
              if (outOfScopeSyndromeRefs.has(sId)) {
                // Fuera de alcance a propósito: no es backlog ni error.
                addWarn("out_of_scope_syndrome_ref", `${ctx} syndrome ref "${sId}" is out of scope (${outOfScopeSyndromeRefs.get(sId)})`);
              } else if (notEmpiricSyndromeRefs.has(sId)) {
                // Cierto clínicamente, pero no es blanco de terapia empírica.
                addWarn("not_empiric_syndrome_ref", `${ctx} syndrome ref "${sId}" no es blanco empírico (${notEmpiricSyndromeRefs.get(sId)})`);
              } else if (expectedPendingSyndromeRefs.has(sId)) {
                addWarn("planned_clinical_syndrome_ref", `${ctx} syndrome ref "${sId}" is pending by roadmap`);
              } else {
                // Ni definido, ni en el roadmap, ni fuera de alcance.
                // Suele ser un ALIAS de un síndrome existente → deuda de vocabulario.
                addWarn("missing_clinical_syndrome_ref", `${ctx} syndrome ref "${sId}" in usualSyndromes not found (¿alias de un síndrome ya definido?)`);
              }
            }
          });
        }
      }
    }

    assertObject(p, "resistance", ctx);

    // Reject legacy keys to prevent drift
    const obsoleteKeys = [
      "summary",
      "category",
      "tags",
      "intrinsic_resistance",
      "typical_resistance",
      "stewardship_note",
      "common_syndromes"
    ];

    obsoleteKeys.forEach(key => {
      if (p[key] !== undefined) {
        // Warning only since the user deferred the cleanup task
        addWarn("obsolete_key", `${ctx} contains legacy key '${key}'. This belongs in the nested schema (clinical.summary, taxonomy.group, etc).`);
      }
    });

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
  const validScenarios = new Set([
    "outpatient",
    "outpatient_comorbid",
    "outpatient_uncomplicated",
    "outpatient_mild",
    "outpatient_severe",   // contraparte de outpatient_mild: cuadro severo aún manejable de forma ambulatoria (p. ej. OMA del adulto con fiebre, hipoacusia marcada, dolor severo o eritema marcado)
    "outpatient_purulent_or_mrsa_risk",
    "outpatient_nonpurulent",
    "outpatient_or_inpatient",
    "inpatient",
    "inpatient_non_icu",
    "inpatient_or_ed",
    "inpatient_moderate_severe",
    "inpatient_severe_nosocomial",
    "inpatient_severe_or_risk_pseudomonas",
    "inpatient_esbl_risk",
    "inpatient_non_icu_low_risk",
    "inpatient_non_icu_high_risk",
    "inpatient_nonpurulent",
    "nve_or_pve_late",
    "pve_early_or_nosocomial",
    "nve",
    "nve_selected_short_course",
    "pve",
    "nve_or_pve"
  ]);

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

          assertString(regimen, "type", rCtx, true); 
          assertString(regimen, "scenario", rCtx, true);

          if (regimen.scenario && !validScenarios.has(regimen.scenario)) {
            addWarn("unknown_scenario", `${rCtx} has non-standard scenario "${regimen.scenario}"`);
          }

          if (regimen.drugIds === undefined) {
            addError("missing_drugIds", `${rCtx} is missing required drugIds array`);
          } else {
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
    const plannedRefWarnings = warnings.filter(w => w.type === "planned_clinical_syndrome_ref");
    const outOfScopeWarnings = warnings.filter(w => w.type === "out_of_scope_syndrome_ref");
    const notEmpiricWarnings = warnings.filter(w => w.type === "not_empiric_syndrome_ref");
    const obsoleteKeyWarnings = warnings.filter(w => w.type === "obsolete_key");
    const otherWarnings = warnings.filter((w) =>
      w.type !== "obsolete_key" &&
      w.type !== "planned_clinical_syndrome_ref" &&
      w.type !== "out_of_scope_syndrome_ref" &&
      w.type !== "not_empiric_syndrome_ref"
    );

    const summarizeIds = (list) => {
      const s = new Set();
      list.forEach((w) => {
        const m = w.message.match(/syndrome ref "([^"]+)"/);
        if (m) s.add(m[1]);
      });
      return s;
    };

    if (outOfScopeWarnings.length > 0) {
      const oosIds = summarizeIds(outOfScopeWarnings);
      console.log("[INFO] out_of_scope_syndrome_ref: clínicamente ciertas, pero fuera del alcance de la app (adultos)");
      console.log(`- occurrences: ${outOfScopeWarnings.length}`);
      console.log(`- unique syndrome ids: ${oosIds.size}  (${[...oosIds].join(", ")})`);
      console.log("");
    }

    if (notEmpiricWarnings.length > 0) {
      const neIds = summarizeIds(notEmpiricWarnings);
      console.log("[INFO] not_empiric_syndrome_ref: presentaciones reales, pero NO son blanco de terapia empírica (se estudian y se tratan dirigido)");
      console.log(`- occurrences: ${notEmpiricWarnings.length}`);
      console.log(`- unique syndrome ids: ${neIds.size}  (${[...neIds].join(", ")})`);
      console.log("");
    }

    if (plannedRefWarnings.length > 0) {
      const plannedIds = new Set();

      plannedRefWarnings.forEach((w) => {
        const syndromeMatch = w.message.match(/syndrome ref "([^"]+)"/);
        if (syndromeMatch) {
          plannedIds.add(syndromeMatch[1]);
        }
      });

      console.log("[WARN] planned_clinical_syndrome_ref summary: backlog references kept intentionally");
      console.log(`- occurrences: ${plannedRefWarnings.length}`);
      console.log(`- unique syndrome ids: ${plannedIds.size}`);
    }

    if (obsoleteKeyWarnings.length > 0) {
      const keyCounts = {};
      const affectedPathogens = new Set();

      obsoleteKeyWarnings.forEach(w => {
        const keyMatch = w.message.match(/legacy key '([^']+)'/);
        if (keyMatch) {
          const key = keyMatch[1];
          keyCounts[key] = (keyCounts[key] || 0) + 1;
        }

        const pathogenMatch = w.message.match(/pathogens\[\d+\] \(([^)]+)\)/);
        if (pathogenMatch) {
          affectedPathogens.add(pathogenMatch[1]);
        }
      });

      console.log(`[WARN] obsolete_key summary: pathogens contain legacy keys`);
      for (const [key, count] of Object.entries(keyCounts)) {
        console.log(`- ${key}: ${count}`);
      }
      if (affectedPathogens.size > 0) {
        console.log(`Affected pathogens: ${affectedPathogens.size}`);
      }
    }

    otherWarnings.forEach((w) => console.log(`[WARN] ${w.type}: ${w.message}`));
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

  checkDenseArrays(clinicalData.syndromes, "syndromes");
  checkDenseArrays(clinicalData.pathogens, "pathogens");
  checkDenseArrays(clinicalData.antibiotics, "antibiotics");
  checkFamilyVocabulary(clinicalData);

  const syndromeIds = validateSyndromes(clinicalData, pathogenIds, antibioticIds);
  validateAntibiotics(clinicalData);
  validatePathogens(clinicalData, syndromeIds, antibioticIds);
  validateResistanceProfiles(clinicalData, pathogenIds, antibioticIds, syndromeIds);

  printReport(clinicalData);

  if (errors.length > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main();
