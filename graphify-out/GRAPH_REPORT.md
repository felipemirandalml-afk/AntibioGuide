# Graph Report - .  (2026-07-17)

## Corpus Check
- 46 files · ~0 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 459 nodes · 559 edges · 54 communities (38 shown, 16 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 59 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- helpers.js — utilidades y scoring de búsqueda
- localContext.js — contexto local del usuario
- modal.js — modal y popovers
- render.js — renderizado de tarjetas
- search.js — búsqueda con debounce
- tabs.js — control de pestañas
- antibiotics.js — datos de antibióticos
- index.js — ensamblador de clinicalData
- interpretation.js — datos de interpretación
- meta.js — metadatos de la app
- pathogens.js — datos de patógenos
- resistanceProfiles.js — perfiles de resistencia local
- rules.js — capa de reglas
- syndromes.js — datos de síndromes
- epivigila.js — capa regulatoria
- package.json — scripts y gate
- fix_template_escaper.js — script archivado
- audit_syndromes.js — auditoría de consistencia
- build_graph.js — explorador del grafo clínico
- build_pathogens.js — compilador de patógenos
- build_syndromes_doc.js — generador del catálogo
- csv_to_json_pathogens.py — conversor Python
- csv_to_pathogens.js — ingesta (con guardas)
- ingest_atb.js — ingesta de antibióticos
- ingest_pathogens_master.js — ingesta maestra
- ingest_pathogens_zoonotic.js — ingesta zoonóticos
- test_clinical_engine.js — smoke test
- Arnés de tests
- validate_data.js — validador de integridad
- README — documentación del repo
- PENDIENTES.md — traspaso de sesión
- Worklist de asimetrías del grafo
- Arquitectura y decisiones de diseño
- Contexto local y fuentes documentales
- EPIVIGILA — banner regulatorio
- Shell de la app: búsqueda, pestañas y explorador visual
- Modal de fármaco (UI)
- Bienvenida y metadatos (hallazgos UX)
- Riesgo offline por CDN (Tailwind/Font Awesome)
- Evidencia de duración — Cranendonk 2020
- Guía IDSA — piel y partes blandas
- Guía CDC — ITS y EPI

## God Nodes (most connected - your core abstractions)
1. `addError()` - 12 edges
2. `main()` - 11 edges
3. `Arquitectura Oficial` - 11 edges
4. `scripts` - 10 edges
5. `Estado del roadmap de síndromes al 2026-07-15` - 9 edges
6. `draw()` - 9 edges
7. `validatePathogens()` - 8 edges
8. `Motor de búsqueda inteligente unificado` - 8 edges
9. `validateSyndromes()` - 7 edges
10. `Worklist — asimetrías del grafo síndrome ↔ patógeno` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Criterio de validación clínica — warning real vs backlog planificado` --semantically_similar_to--> `La franja de severidad solo sirve si es escasa`  [INFERRED] [semantically similar]
  README.md → tools/graph_template.html
- `Alcance declarado: adultos, sin pediatría/embarazo/lactancia` --semantically_similar_to--> `Las guías GES prevalecen sobre la recomendación de la app`  [INFERRED] [semantically similar]
  index.html → research/SINDROMES_Y_ESQUEMAS.md
- `H7 — Sin enlace cruzado en resultados` --semantically_similar_to--> `select() — panel de detalle con enlace cruzado`  [INFERRED] [semantically similar]
  research/AUDIT_2026-07.md → tools/graph_template.html
- `app/searchIndex.js — módulo propuesto en la capa engine` --semantically_similar_to--> `matches() — búsqueda por nombre o id sobre todos los tipos`  [INFERRED] [semantically similar]
  research/AUDIT_2026-07.md → tools/graph_template.html
- `Vocabularios canónicos (el validador los exige)` --semantically_similar_to--> `Alias normalizados (pathogens.js ↔ syndromes.js)`  [INFERRED] [semantically similar]
  README.md → research/ROADMAP_SINDROMES.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Camino al motor de búsqueda unificado: hallazgos + solución propuesta** — research_audit_2026_07_h1, research_audit_2026_07_h2, research_audit_2026_07_h7, research_audit_2026_07_motor_busqueda_inteligente, research_audit_2026_07_searchindex, research_audit_2026_07_grafo_clinico_latente, research_audit_2026_07_score_multi_word [EXTRACTED 1.00]
- **Las cinco fuentes documentales que respaldan los síndromes del roadmap** — research_roadmap_sindromes_tei_416, research_roadmap_sindromes_uc_2024, research_roadmap_sindromes_proa_04, research_roadmap_sindromes_ot_amb, research_roadmap_sindromes_nac_2024, research_roadmap_sindromes_mapa_cobertura, research_roadmap_sindromes_regla_de_oro [EXTRACTED 1.00]
- **Cadena de auditoría del grafo clínico: generador → visualización → hallazgos → worklist médico** — readme_audit_syndromes, readme_build_graph, tools_graph_template_g, tools_graph_template_rels, tools_graph_template_findings_asymmetric, research_graph_asymmetry_worklist_asimetrias, research_graph_asymmetry_worklist_regla_de_oro [INFERRED 0.95]

## Communities (54 total, 16 thin omitted)

### Community 12 - "helpers.js — utilidades y scoring de búsqueda"
Cohesion: 0.24
Nodes (9): applyTheme(), getPreferredTheme(), setTheme(), normalize(), escapeRegExp(), scoreTextMatch(), scoreMultiWord(), getAntibioticByName() (+1 more)

### Community 21 - "localContext.js — contexto local del usuario"
Cohesion: 0.70
Nodes (3): getActiveProfile(), populateProfileSelect(), init()

### Community 18 - "modal.js — modal y popovers"
Cohesion: 0.42
Nodes (7): isSmallViewport(), ensureDurationPopover(), closeDurationPopover(), isDurationPopoverOpen(), openDurationPopover(), closeModal(), initListeners()

### Community 16 - "render.js — renderizado de tarjetas"
Cohesion: 0.31
Nodes (8): renderLocalSusceptibilityBanner(), showSyndromeDetail(), showMedDetail(), createSyndromeCard(), createPathogenCard(), createMedCard(), renderAntibiogram(), renderResults()

### Community 25 - "search.js — búsqueda con debounce"
Cohesion: 0.83
Nodes (3): debounce(), handleSearch(), initListeners()

### Community 13 - "resistanceProfiles.js — perfiles de resistencia local"
Cohesion: 0.15
Nodes (12): resistanceProfiles, TODO: add to pathogens catalog if/when needed, TODO: add to pathogens catalog if/when needed, TODO: add to pathogens catalog if/when needed, TODO: add to pathogens catalog if/when needed, TODO: add to pathogens catalog if/when needed, TODO: add to pathogens catalog if/when needed, TODO: add to pathogens catalog if/when needed (+4 more)

### Community 15 - "epivigila.js — capa regulatoria"
Cohesion: 0.30
Nodes (11): parseCSV(), clearBanner(), escapeHTML(), getNormalize(), getKeywords(), matchEpivigila(), renderEpivigilaBanner(), renderBanner() (+3 more)

### Community 7 - "package.json — scripts y gate"
Cohesion: 0.11
Nodes (17): name, version, description, main, scripts, validate:data, audit:syndromes, test:helpers (+9 more)

### Community 6 - "audit_syndromes.js — auditoría de consistencia"
Cohesion: 0.11
Nodes (14): path, clinicalData, pathogenById, antibioticIds, safety, graphForward, graphBackward, cover (+6 more)

### Community 1 - "build_graph.js — explorador del grafo clínico"
Cohesion: 0.06
Nodes (30): fs, path, ROOT, syndromes, pathogens, antibiotics, meta, sById (+22 more)

### Community 20 - "build_pathogens.js — compilador de patógenos"
Cohesion: 0.33
Nodes (4): fs, path, MASTER_PATH, OUT_PATH

### Community 11 - "build_syndromes_doc.js — generador del catálogo"
Cohesion: 0.18
Nodes (14): fs, path, ROOT, syndromes, OUT, slug(), cell(), fmtDate() (+6 more)

### Community 23 - "csv_to_json_pathogens.py — conversor Python"
Cohesion: 0.70
Nodes (4): parse_list(), convert(), Path, main()

### Community 8 - "csv_to_pathogens.js — ingesta (con guardas)"
Cohesion: 0.11
Nodes (15): fs, path, csvPath, outPath, FORCE, REQUIRED_COLUMNS, clinicalData, pathogensMap (+7 more)

### Community 10 - "ingest_atb.js — ingesta de antibióticos"
Cohesion: 0.14
Nodes (14): fs, path, TARGET_FILE, VALID_AWARE, VALID_SPECTRUM, VALID_ROUTES, error(), loadExisting() (+6 more)

### Community 14 - "ingest_pathogens_master.js — ingesta maestra"
Cohesion: 0.17
Nodes (12): fs, path, repoRoot, pathogensPath, defaultSourcePaths, readJsonFile(), loadSourceArrays(), bartonella (+4 more)

### Community 17 - "ingest_pathogens_zoonotic.js — ingesta zoonóticos"
Cohesion: 0.18
Nodes (10): fs, path, repoRoot, pathogensPath, syndromesPath, defaultSourcePath, newPathogens, existingPathogens (+2 more)

### Community 4 - "Arnés de tests"
Cohesion: 0.15
Nodes (17): path, { makeBrowserGlobals, loadBrowserModule, assert, eq, makeRunner }, data, { test, run }, path, { makeBrowserGlobals, loadBrowserModule, assert, eq, gt, makeRunner }, data, { test, run } (+9 more)

### Community 2 - "validate_data.js — validador de integridad"
Cohesion: 0.18
Nodes (26): path, clinicalData, errors, warnings, expectedPendingSyndromeRefs, outOfScopeSyndromeRefs, notEmpiricSyndromeRefs, CANONICAL_GRAM (+18 more)

### Community 5 - "README — documentación del repo"
Cohesion: 0.14
Nodes (15): AntibioGuide - Soporte Clinico de Antibioticos, Arquitectura Oficial, 1. Logica de la aplicacion (`/app`), 2. Capa de reglas y datos (`/data`), 3. Insumos e ingesta (`/data-files`), 4. Compatibilidad legacy, Que es runtime y que no, Herramientas y operacion (+7 more)

### Community 47 - "PENDIENTES.md — traspaso de sesión"
Cohesion: 0.33
Nodes (5): Pendientes y estado — sesión 2026-07-16/17, Estado del repo, Qué se hizo esta sesión, Lo que quedó PENDIENTE — grafo de conocimiento (graphify), Higiene menor (del audit de julio, aún abierta)

### Community 46 - "Worklist de asimetrías del grafo"
Cohesion: 0.25
Nodes (7): Worklist — asimetrías del grafo síndrome ↔ patógeno, Contexto, A. REMOVE — el germen sobre-declara (quitar de su `usualSyndromes`), B. ADD — vacío real del síndrome (agregar a `pathogenIds` + `pathogens`), C. Opcionales (tu criterio; impacto bajo), D. LEAVE — asimetría legítima (NO tocar), Resumen de acciones propuestas

### Community 0 - "Arquitectura y decisiones de diseño"
Cohesion: 0.06
Nodes (50): AntibioGuide — soporte clínico de antibióticos, Source of Truth Data (/data), Ingesta CSV deprecada (/data-files), tools/csv_to_pathogens.js — ingesta con --force, Gate completo — npm test, validate_data.js — integridad estructural, audit_syndromes.js — consistencia clínica y salud del grafo, tools/build_graph.js — explorador del grafo clínico (+42 more)

### Community 3 - "Contexto local y fuentes documentales"
Cohesion: 0.11
Nodes (25): Contexto local — data/resistanceProfiles.js, Selector de contexto local (#profile-select), Mapa de cobertura documental — 100% de los 25 con fuente y página, TEI-416 — Tratamiento de las Enfermedades Infecciosas (416 págs), UC-2024 — Manual de Antibioterapia y Control de Infecciones, UC CHRISTUS 2024, PROA-04 — Guía de Tratamiento Antimicrobiano V1 (73 págs), OT-AMB — Orientación Técnica MINSAL, antibióticos en infecciones comunitarias ambulatorias 2021, NAC-2024 — Uso de antimicrobianos para neumonía en adultos (2024) (+17 more)

### Community 9 - "Shell de la app: búsqueda, pestañas y explorador visual"
Cohesion: 0.11
Nodes (23): Navegación por pestañas (Síndromes / Patógenos / Vademécum / Antibiograma), Buscador global (#search-input), H1 — La búsqueda está aislada por pestaña, TYPES — modelo visual: color Y forma por tipo de nodo, state — estado de filtros, selección y viewport, sim — nodos con posición y velocidad para la simulación, tick(), draw() (+15 more)

### Community 27 - "Bienvenida y metadatos (hallazgos UX)"
Cohesion: 0.67
Nodes (3): Pantalla de bienvenida y metadatos visibles, H5 — Metadatos visibles desactualizados, H6 — Descubrimiento nulo sin teclear

## Ambiguous Edges - Review These
- `tools/csv_to_pathogens.js — ingesta con --force` → `Alias normalizados (pathogens.js ↔ syndromes.js)`  [AMBIGUOUS]
  research/ROADMAP_SINDROMES.md · relation: conceptually_related_to

## Knowledge Gaps
- **187 isolated node(s):** `antibiotics`, `clinicalData`, `interpretation`, `meta`, `pathogens` (+182 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `tools/csv_to_pathogens.js — ingesta con --force` and `Alias normalizados (pathogens.js ↔ syndromes.js)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `Arquitectura Oficial` connect `README — documentación del repo` to `Arquitectura y decisiones de diseño`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `Motor de búsqueda inteligente unificado` connect `Arquitectura y decisiones de diseño` to `Shell de la app: búsqueda, pestañas y explorador visual`, `Contexto local y fuentes documentales`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `ARCHITECTURE GUARDRAIL — engine devuelve datos, no HTML` connect `Arquitectura y decisiones de diseño` to `README — documentación del repo`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Arquitectura Oficial` (e.g. with `Orden de carga de scripts (datos → adaptadores → app)` and `ARCHITECTURE GUARDRAIL — engine devuelve datos, no HTML`) actually correct?**
  _`Arquitectura Oficial` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Estado del roadmap de síndromes al 2026-07-15` (e.g. with `Criterio de validación clínica — warning real vs backlog planificado` and `Catálogo de síndromes y esquemas (34 síndromes · 116 esquemas)`) actually correct?**
  _`Estado del roadmap de síndromes al 2026-07-15` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `antibiotics`, `clinicalData`, `interpretation` to the rest of the system?**
  _187 weakly-connected nodes found - possible documentation gaps or missing edges._