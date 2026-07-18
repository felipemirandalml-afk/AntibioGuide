# Graph Report - AntibioGuide  (2026-07-17)

## Corpus Check
- 57 files · ~176,925 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 501 nodes · 633 edges · 57 communities (40 shown, 17 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 59 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `549be8af`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Arquitectura y decisiones de diseño
- build_graph.js — explorador del grafo clínico
- validate_data.js — validador de integridad
- Contexto local y fuentes documentales
- Arnés de tests
- README — documentación del repo
- audit_syndromes.js — auditoría de consistencia
- package.json — scripts y gate
- csv_to_pathogens.js — ingesta (con guardas)
- Shell de la app: búsqueda, pestañas y explorador visual
- ingest_atb.js — ingesta de antibióticos
- build_syndromes_doc.js — generador del catálogo
- helpers.js — utilidades y scoring de búsqueda
- resistanceProfiles.js — perfiles de resistencia local
- ingest_pathogens_master.js — ingesta maestra
- epivigila.js — capa regulatoria
- render.js — renderizado de tarjetas
- ingest_pathogens_zoonotic.js — ingesta zoonóticos
- modal.js — modal y popovers
- templates.js — plantillas HTML
- build_pathogens.js — compilador de patógenos
- localContext.js — contexto local del usuario
- csv_to_json_pathogens.py — conversor Python
- search.js — búsqueda con debounce
- tabs.js — control de pestañas
- Bienvenida y metadatos (hallazgos UX)
- test_clinical_engine.js — smoke test
- antibiotics.js — datos de antibióticos
- index.js — ensamblador de clinicalData
- interpretation.js — datos de interpretación
- meta.js — metadatos de la app
- pathogens.js — datos de patógenos
- rules.js — capa de reglas
- syndromes.js — datos de síndromes
- Riesgo offline por CDN (Tailwind/Font Awesome)
- EPIVIGILA — banner regulatorio
- fix_template_escaper.js — script archivado
- Modal de fármaco (UI)
- Guía CDC — ITS y EPI
- Evidencia de duración — Cranendonk 2020
- Guía IDSA — piel y partes blandas
- Worklist de asimetrías del grafo
- PENDIENTES.md — traspaso de sesión
- patientPanel.js
- patientContext.js
- renal.js

## God Nodes (most connected - your core abstractions)
1. `scripts` - 12 edges
2. `addError()` - 12 edges
3. `main()` - 11 edges
4. `Arquitectura Oficial` - 11 edges
5. `Estado del roadmap de síndromes al 2026-07-15` - 9 edges
6. `draw()` - 9 edges
7. `validatePathogens()` - 8 edges
8. `Motor de búsqueda inteligente unificado` - 8 edges
9. `init()` - 7 edges
10. `validateSyndromes()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `La franja de severidad solo sirve si es escasa` --semantically_similar_to--> `Criterio de validación clínica — warning real vs backlog planificado`  [INFERRED] [semantically similar]
  tools/graph_template.html → README.md
- `Las guías GES prevalecen sobre la recomendación de la app` --semantically_similar_to--> `Alcance declarado: adultos, sin pediatría/embarazo/lactancia`  [INFERRED] [semantically similar]
  research/SINDROMES_Y_ESQUEMAS.md → index.html
- `Alias normalizados (pathogens.js ↔ syndromes.js)` --semantically_similar_to--> `Vocabularios canónicos (el validador los exige)`  [INFERRED] [semantically similar]
  research/ROADMAP_SINDROMES.md → README.md
- `matches() — búsqueda por nombre o id sobre todos los tipos` --semantically_similar_to--> `H1 — La búsqueda está aislada por pestaña`  [INFERRED] [semantically similar]
  tools/graph_template.html → research/AUDIT_2026-07.md
- `select() — panel de detalle con enlace cruzado` --semantically_similar_to--> `H7 — Sin enlace cruzado en resultados`  [INFERRED] [semantically similar]
  tools/graph_template.html → research/AUDIT_2026-07.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Camino al motor de búsqueda unificado: hallazgos + solución propuesta** — research_audit_2026_07_h1, research_audit_2026_07_h2, research_audit_2026_07_h7, research_audit_2026_07_motor_busqueda_inteligente, research_audit_2026_07_searchindex, research_audit_2026_07_grafo_clinico_latente, research_audit_2026_07_score_multi_word [EXTRACTED 1.00]
- **Las cinco fuentes documentales que respaldan los síndromes del roadmap** — research_roadmap_sindromes_tei_416, research_roadmap_sindromes_uc_2024, research_roadmap_sindromes_proa_04, research_roadmap_sindromes_ot_amb, research_roadmap_sindromes_nac_2024, research_roadmap_sindromes_mapa_cobertura, research_roadmap_sindromes_regla_de_oro [EXTRACTED 1.00]
- **Cadena de auditoría del grafo clínico: generador → visualización → hallazgos → worklist médico** — readme_audit_syndromes, readme_build_graph, tools_graph_template_g, tools_graph_template_rels, tools_graph_template_findings_asymmetric, research_graph_asymmetry_worklist_asimetrias, research_graph_asymmetry_worklist_regla_de_oro [INFERRED 0.95]

## Communities (57 total, 17 thin omitted)

### Community 0 - "Arquitectura y decisiones de diseño"
Cohesion: 0.06
Nodes (46): Alcance declarado: adultos, sin pediatría/embarazo/lactancia, AntibioGuide — soporte clínico de antibióticos, audit_syndromes.js — consistencia clínica y salud del grafo, tools/build_graph.js — explorador del grafo clínico, Criterio de validación clínica — warning real vs backlog planificado, tools/csv_to_pathogens.js — ingesta con --force, Ingesta CSV deprecada (/data-files), Gate completo — npm test (+38 more)

### Community 1 - "build_graph.js — explorador del grafo clínico"
Cohesion: 0.06
Nodes (30): aById, antibiotics, asymmetric, backlogRefs, causedBy, deg, drugsNoRegimen, edges (+22 more)

### Community 2 - "validate_data.js — validador de integridad"
Cohesion: 0.18
Nodes (26): addError(), addWarn(), assertArray(), assertObject(), assertString(), CANONICAL_GRAM, checkDenseArrays(), checkFamilyVocabulary() (+18 more)

### Community 3 - "Contexto local y fuentes documentales"
Cohesion: 0.11
Nodes (24): Selector de contexto local (#profile-select), Contexto local — data/resistanceProfiles.js, B. ADD — vacío real del síndrome (15 adiciones), Asimetrías del grafo síndrome ↔ patógeno (120 enlaces unidireccionales), Asimetrías 'hacia adelante' (78) — no son bugs, Asimetrías 'hacia atrás' (42) — requieren decisión clínica, pathogenIds — lista curada del síndrome (síndrome → patógeno), A. REMOVE — el germen sobre-declara (8 remociones) (+16 more)

### Community 4 - "Arnés de tests"
Cohesion: 0.12
Nodes (22): data, { makeBrowserGlobals, loadBrowserModule, assert, eq, makeRunner }, path, { test, run }, data, { makeBrowserGlobals, loadBrowserModule, assert, eq, gt, makeRunner }, path, { test, run } (+14 more)

### Community 5 - "README — documentación del repo"
Cohesion: 0.14
Nodes (15): Orden de carga de scripts (datos → adaptadores → app), 1. Logica de la aplicacion (`/app`), 2. Capa de reglas y datos (`/data`), 3. Insumos e ingesta (`/data-files`), 4. Compatibilidad legacy, AntibioGuide - Soporte Clinico de Antibioticos, Entry point — app/bootstrap.js, Arquitectura Oficial (+7 more)

### Community 6 - "audit_syndromes.js — auditoría de consistencia"
Cohesion: 0.11
Nodes (14): antibioticIds, clinicalData, cover, graphBackward, graphForward, orphanPathogens, path, pathogenById (+6 more)

### Community 7 - "package.json — scripts y gate"
Cohesion: 0.10
Nodes (19): author, description, keywords, license, main, name, scripts, audit:syndromes (+11 more)

### Community 8 - "csv_to_pathogens.js — ingesta (con guardas)"
Cohesion: 0.11
Nodes (15): badRows, clinicalData, csvPath, finalPathogensList, FORCE, fs, headers, lines (+7 more)

### Community 9 - "Shell de la app: búsqueda, pestañas y explorador visual"
Cohesion: 0.09
Nodes (28): Buscador global (#search-input), Navegación por pestañas (Síndromes / Patógenos / Vademécum / Antibiograma), ARCHITECTURE GUARDRAIL — engine devuelve datos, no HTML, El grafo clínico ya existe en los datos, H1 — La búsqueda está aislada por pestaña, H2 — La búsqueda indexa pocos campos, H7 — Sin enlace cruzado en resultados, Motor de búsqueda inteligente unificado (+20 more)

### Community 10 - "ingest_atb.js — ingesta de antibióticos"
Cohesion: 0.14
Nodes (14): cleanItem(), error(), existing, finalContent, fs, incoming, loadExisting(), merged (+6 more)

### Community 11 - "build_syndromes_doc.js — generador del catálogo"
Cohesion: 0.18
Nodes (14): build(), buildRegimen(), buildSyndrome(), cell(), check, doc, fmtDate(), fs (+6 more)

### Community 12 - "helpers.js — utilidades y scoring de búsqueda"
Cohesion: 0.24
Nodes (9): applyTheme(), escapeRegExp(), getAntibioticByName(), getPreferredTheme(), initTheme(), normalize(), scoreMultiWord(), scoreTextMatch() (+1 more)

### Community 13 - "resistanceProfiles.js — perfiles de resistencia local"
Cohesion: 0.15
Nodes (12): TODO: add to pathogens catalog if/when needed, TODO: add to pathogens catalog if/when needed, TODO: add to pathogens catalog if/when needed, TODO: add to pathogens catalog if/when needed, TODO: add to pathogens catalog if/when needed, TODO: add to pathogens catalog if/when needed, TODO: add to pathogens catalog if/when needed, TODO: add to pathogens catalog if/when needed (+4 more)

### Community 14 - "ingest_pathogens_master.js — ingesta maestra"
Cohesion: 0.17
Nodes (12): allNewPathogens, bartonella, defaultSourcePaths, existingPathogens, fs, loadSourceArrays(), path, pathogens (+4 more)

### Community 15 - "epivigila.js — capa regulatoria"
Cohesion: 0.30
Nodes (11): buildIndex(), clearBanner(), escapeHTML(), evaluate(), getKeywords(), getNormalize(), init(), matchEpivigila() (+3 more)

### Community 16 - "render.js — renderizado de tarjetas"
Cohesion: 0.31
Nodes (8): createMedCard(), createPathogenCard(), createSyndromeCard(), renderAntibiogram(), renderLocalSusceptibilityBanner(), renderResults(), showMedDetail(), showSyndromeDetail()

### Community 17 - "ingest_pathogens_zoonotic.js — ingesta zoonóticos"
Cohesion: 0.18
Nodes (10): defaultSourcePath, existingPathogens, fs, newPathogens, path, pathogens, pathogensPath, repoRoot (+2 more)

### Community 18 - "modal.js — modal y popovers"
Cohesion: 0.42
Nodes (7): closeDurationPopover(), closeModal(), ensureDurationPopover(), initListeners(), isDurationPopoverOpen(), isSmallViewport(), openDurationPopover()

### Community 20 - "build_pathogens.js — compilador de patógenos"
Cohesion: 0.33
Nodes (4): fs, MASTER_PATH, OUT_PATH, path

### Community 21 - "localContext.js — contexto local del usuario"
Cohesion: 0.70
Nodes (3): getActiveProfile(), init(), populateProfileSelect()

### Community 23 - "csv_to_json_pathogens.py — conversor Python"
Cohesion: 0.70
Nodes (4): Path, convert(), main(), parse_list()

### Community 25 - "search.js — búsqueda con debounce"
Cohesion: 0.83
Nodes (3): debounce(), handleSearch(), initListeners()

### Community 27 - "Bienvenida y metadatos (hallazgos UX)"
Cohesion: 0.67
Nodes (3): Pantalla de bienvenida y metadatos visibles, H5 — Metadatos visibles desactualizados, H6 — Descubrimiento nulo sin teclear

### Community 46 - "Worklist de asimetrías del grafo"
Cohesion: 0.25
Nodes (7): A. REMOVE — el germen sobre-declara (quitar de su `usualSyndromes`), B. ADD — vacío real del síndrome (agregar a `pathogenIds` + `pathogens`), C. Opcionales (tu criterio; impacto bajo), Contexto, D. LEAVE — asimetría legítima (NO tocar), Resumen de acciones propuestas, Worklist — asimetrías del grafo síndrome ↔ patógeno

### Community 47 - "PENDIENTES.md — traspaso de sesión"
Cohesion: 0.33
Nodes (5): Estado del repo, Grafo de conocimiento (graphify) — TERMINADO, Higiene menor (del audit de julio, aún abierta), Pendientes y estado — sesión 2026-07-16/17, Qué se hizo esta sesión

### Community 54 - "patientPanel.js"
Cohesion: 0.35
Nodes (11): els(), fillInputs(), init(), numOrNull(), onInput(), openPanel(), readInputs(), refreshOpenResults() (+3 more)

### Community 55 - "patientContext.js"
Cohesion: 0.31
Nodes (8): canEstimateRenal(), clear(), emptyPatient(), get(), getRenalEstimate(), load(), persist(), set()

### Community 56 - "renal.js"
Cohesion: 0.43
Nodes (7): buildNotes(), cockcroftGault(), inRange(), kdigoStage(), matchRenalBand(), num(), toMgDl()

## Ambiguous Edges - Review These
- `tools/csv_to_pathogens.js — ingesta con --force` → `Alias normalizados (pathogens.js ↔ syndromes.js)`  [AMBIGUOUS]
  research/ROADMAP_SINDROMES.md · relation: conceptually_related_to

## Knowledge Gaps
- **194 isolated node(s):** `antibiotics`, `clinicalData`, `interpretation`, `meta`, `pathogens` (+189 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `tools/csv_to_pathogens.js — ingesta con --force` and `Alias normalizados (pathogens.js ↔ syndromes.js)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `Arquitectura Oficial` connect `README — documentación del repo` to `Arquitectura y decisiones de diseño`, `Shell de la app: búsqueda, pestañas y explorador visual`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `Motor de búsqueda inteligente unificado` connect `Shell de la app: búsqueda, pestañas y explorador visual` to `Arquitectura y decisiones de diseño`, `Contexto local y fuentes documentales`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `ARCHITECTURE GUARDRAIL — engine devuelve datos, no HTML` connect `Shell de la app: búsqueda, pestañas y explorador visual` to `Arquitectura y decisiones de diseño`, `README — documentación del repo`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Arquitectura Oficial` (e.g. with `Orden de carga de scripts (datos → adaptadores → app)` and `ARCHITECTURE GUARDRAIL — engine devuelve datos, no HTML`) actually correct?**
  _`Arquitectura Oficial` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Estado del roadmap de síndromes al 2026-07-15` (e.g. with `Criterio de validación clínica — warning real vs backlog planificado` and `Catálogo de síndromes y esquemas (34 síndromes · 116 esquemas)`) actually correct?**
  _`Estado del roadmap de síndromes al 2026-07-15` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `antibiotics`, `clinicalData`, `interpretation` to the rest of the system?**
  _194 weakly-connected nodes found - possible documentation gaps or missing edges._