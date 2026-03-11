# AntibioGuide — Soporte Clínico Antibióticos

Guía de apoyo a la decisión clínica para el uso de antibióticos en adultos, basada en guías nacionales (Chile) e internacionales (IDSA/CDC).

## 🏗️ Arquitectura Oficial (Guardrails)

Para mantener la consistencia clínica y técnica del proyecto, se debe respetar la siguiente estructura:

### 1. Lógica de la Aplicación (`/app`)
*   **Source of Truth Code**: Toda la lógica modular (motor clínico, renderizado, búsqueda) reside en esta carpeta.
*   **Entry Point**: El inicio real de la app ocurre en `app/bootstrap.js`.

### 2. Datos de Runtime (`/data`)
*   **Source of Truth Data**: Los archivos `.js` dentro de `/data` (ej: `pathogens.js`, `syndromes.js`) son la única fuente de verdad activa.
*   **Edición**: Cualquier corrección clínica o técnica de datos debe hacerse directamente en estos archivos.

### 3. Insumos e Ingestión (`/data-files/seeds`)
*   **Inputs**: Contiene los archivos CSV o JSON crudos que sirven como insumo para las herramientas de ingestión.
*   **Proceso**: Los cambios en estas "semillas" requieren ejecutar las herramientas en `/tools` para actualizar el runtime en `/data`.

### 4. Capas de Compatibilidad (Legacy)
*   **`data.js`**: Adaptador para retrocompatibilidad (hoisting a `window.clinicalData`). **NO EDITAR DATOS AQUÍ.**
*   **`package.json`**: El campo `"main"` apunta a `data/index.js` (entry point moderno).

---

## 🛠️ Herramientas y Operación

*   **Validación**: Ejecutar `node tools/validate_data.js` para asegurar la integridad de la base de datos clínica.
*   **Tests**: Ejecutar `npm run test:engine` para verificar la lógica del clinical engine.
*   **Ingestión**: Usar `tools/csv_to_pathogens.js` para sincronizar cambios desde el CSV maestro a la app.

---

## 🔬 Otros
*   **/research**: Material experimental y notas de investigación.
*   **/tools/archive**: Parches y scripts de un solo uso ya ejecutados.
