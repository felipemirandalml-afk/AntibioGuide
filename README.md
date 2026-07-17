# AntibioGuide - Soporte Clinico de Antibioticos

Guia de apoyo a la decision clinica para el uso de antibioticos en adultos, basada en guias nacionales (Chile) e internacionales.

## Arquitectura Oficial

Para mantener consistencia clinica y tecnica, esta es la estructura oficial del proyecto:

### 1. Logica de la aplicacion (`/app`)
- Source of Truth Code: toda la logica modular del front vive aqui.
- Entry Point: el inicio real de la app ocurre en `app/bootstrap.js`.

### 2. Capa de reglas y datos (`/data`)
- Rules Layer (`data/rules.js`): reglas clinicas estructuradas y reutilizables.
- Source of Truth Data: los archivos `.js` dentro de `/data` son la fuente de verdad activa para entidades.
- Contexto local (`data/resistanceProfiles.js`): matrices de susceptibilidad local y modificadores contextuales.
- Edicion: cualquier correccion clinica o tecnica de datos/reglas debe hacerse directamente aqui.

### 3. Insumos e ingesta (`/data-files`)
- `data-files/seeds/`: semillas operativas usadas por herramientas de ingesta.
- `data-files/`: tambien contiene artefactos intermedios y datasets de trabajo para compilacion o respaldo.
- **La ingesta ya no es el proceso normal.** Desde marzo los registros de `/data` se
  refinan a mano, y el CSV no tiene ese trabajo: reingestar lo sobrescribe. Los CSV
  quedan como insumo historico y respaldo. Edita `/data` directamente.
- `tools/csv_to_pathogens.js` aborta por defecto y exige `--force`. Antes de forzarlo,
  revisa su `validSyndromesMap`: quedo congelado en marzo y contradice la curacion
  actual (mapea `sepsis`→`sepsis_urinaria`, el over-claim que el worklist elimino).

### 4. Compatibilidad legacy
- `data.js`: adaptador de compatibilidad que recompone `window.clinicalData`. No editar datos aqui.
- `epivigila.js`: capa regulatoria independiente, mantenida por compatibilidad y autonomia funcional.

## Que es runtime y que no

Runtime principal:
- `/app`
- `/data`
- `index.html`
- `data.js`
- `epivigila.js`

Material de soporte o trabajo interno:
- `/research`
- `/tools/archive`
- backups y semillas auxiliares en `/data-files`

## Herramientas y operacion

**Gate completo:** `npm test` corre validador + auditoria + tests unitarios (exit 1 si algo falla). Correr antes de cada merge.

Scripts individuales:
- Validacion estructural: `npm run validate:data` (integridad: refs, campos, enums, duplicados)
- Auditoria de consistencia de sindromes: `npm run audit:syndromes` (`-- --verbose` para el detalle del grafo)
- Tests de helpers/busqueda: `npm run test:helpers`
- Tests del motor clinico: `npm run test:engine` (reglas de resistencia + susceptibilidad)
- Smoke test del motor: `npm run test:smoke`
- Explorador del grafo clinico: `node tools/build_graph.js` (auditoria; escribe `research/graph.html`)
- Ingesta CSV de patogenos: `node tools/csv_to_pathogens.js` — **sobrescribe `/data`; lee el aviso de arriba**

Los tests cargan los modulos de navegador (IIFE `window.ABG`) en Node mediante `tools/test_lib.js` (mocks de window/document, sin dependencias externas).

### validate vs audit

Son complementarios:
- **validate_data.js** = INTEGRIDAD estructural. Falla (exit 1) si un dato esta roto (ref que no resuelve, campo faltante, enum invalido).
- **audit_syndromes.js** = CONSISTENCIA clinica y salud del grafo. Falla (exit 1) solo si un regimen no tiene `reference` (regla de oro). El resto (asimetrias del grafo sindrome-patogeno, `targets` faltantes, huerfanos) es informativo para revision editorial, no bloqueante.

### Vocabularios canonicos (el validador los exige)

Un mismo concepto escrito de dos formas parte los grupos en dos y degrada la busqueda
(`render.js` puntua sobre `family`). El validador falla si reaparecen:

| Campo | Regla |
|---|---|
| `taxonomy.gram` | Solo `positive`, `negative`, `atypical`, `fungal`, `variable` |
| `antibiotics[].family` | Una sola grafia por clase (no `Macrolido` + `Macrolidos`) |
| `resistance.intrinsic` / `typicalAcquired` | Un id de antibiotico (enlaza) **o** prosa que nombre una clase o mecanismo. Lo que tenga forma de id debe existir: si no, se descarta en silencio |
| Cualquier array | Sin huecos (`["a", , "b"]`) ni `null` |

La ultima existe porque una coma doble paso el validador, la auditoria y los tests:
`.forEach`/`.map` saltan los huecos sin avisar, pero `.length` los cuenta y `for...of`
devuelve `undefined`.

## Criterio de validacion clinica

El validador distingue entre:
- warnings reales que requieren correccion tecnica o de datos
- referencias clinicas pendientes que forman parte del backlog planificado

Las referencias a sindromes aun no cargados pueden mantenerse de forma intencional para acelerar la expansion clinica futura.
