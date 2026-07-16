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
- Proceso: si cambias semillas o insumos, ejecuta las herramientas de `/tools` para actualizar el runtime en `/data`.

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
- Ingesta CSV de patogenos: `node tools/csv_to_pathogens.js`

Los tests cargan los modulos de navegador (IIFE `window.ABG`) en Node mediante `tools/test_lib.js` (mocks de window/document, sin dependencias externas).

### validate vs audit

Son complementarios:
- **validate_data.js** = INTEGRIDAD estructural. Falla (exit 1) si un dato esta roto (ref que no resuelve, campo faltante, enum invalido).
- **audit_syndromes.js** = CONSISTENCIA clinica y salud del grafo. Falla (exit 1) solo si un regimen no tiene `reference` (regla de oro). El resto (asimetrias del grafo sindrome-patogeno, `targets` faltantes, huerfanos) es informativo para revision editorial, no bloqueante.

## Criterio de validacion clinica

El validador distingue entre:
- warnings reales que requieren correccion tecnica o de datos
- referencias clinicas pendientes que forman parte del backlog planificado

Las referencias a sindromes aun no cargados pueden mantenerse de forma intencional para acelerar la expansion clinica futura.
