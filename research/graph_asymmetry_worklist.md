# Worklist — asimetrías del grafo síndrome ↔ patógeno

**Generado:** 2026-07-16 · Fuente: `npm run audit:syndromes -- --verbose`

## Contexto

El auditor detectó 120 enlaces unidireccionales entre `syndrome.pathogenIds` y `pathogen.clinical.usualSyndromes`. De esos:

- **78 "hacia adelante"** (síndrome lista al germen, el germen no devuelve): NO son bugs. `usualSyndromes` es una lista curada *corta* de los síndromes principales de cada germen. **No se tocan** — el motor de búsqueda unirá ambas direcciones (Fase 3).
- **42 "hacia atrás"** (germen se auto-declara en un síndrome que no lo lista): estas SÍ merecen decisión clínica. Es este worklist.

Cada caso es: ¿el síndrome debería **cubrir** ese germen (ADD a `pathogenIds`), o el germen **sobre-declara** el síndrome (REMOVE de `usualSyndromes`), o la asimetría es **deliberada/redundante** (LEAVE)?

> Regla de oro: estos son datos clínicos. Ninguna edición se aplica sin visto bueno del médico.

---

## A. REMOVE — el germen sobre-declara (quitar de su `usualSyndromes`)

Estos gérmenes listan un síndrome del que **no son blanco empírico**; la asimetría es un error del lado del patógeno.

| Patógeno | quitar de `usualSyndromes` | Razón |
|---|---|---|
| `streptococcus_pneumoniae` | `sepsis_urinaria` | Neumococo no causa urosepsis. Probable confusión con "sepsis" genérica. |
| `staphylococcus_aureus` | `sepsis_urinaria` | S. aureus en orina = siembra hematógena, no urosepsis empírica. |
| `neisseria_meningitidis` | `sepsis_urinaria` | Meningococo no es uropatógeno. |
| `salmonella_enterica_typhi` | `sepsis_urinaria` | Fiebre tifoidea ≠ urosepsis. |
| `haemophilus_influenzae` | `faringitis` | H. influenzae coloniza, no es causa tratable de faringitis (empírico = solo S. pyogenes). |
| `cryptococcus_neoformans` | `nac` | Hongo en inmunocomprometido; no es NAC bacteriana empírica. |
| `clostridioides_difficile` | `intraabdominal` | C. difficile es colitis, no blanco empírico intraabdominal. |
| `streptococcus_agalactiae` | `itu_cistitis` | Bacteriuria por GBS suele ser asintomática/embarazo (fuera de alcance). |

**8 remociones.** El clúster de `sepsis_urinaria` (4) es el error más claro del dataset.

---

## B. ADD — vacío real del síndrome (agregar a `pathogenIds` + `pathogens`)

El germen es una causa clínicamente importante que el síndrome debería listar.

| Síndrome | agregar patógeno | Fuerza | Razón |
|---|---|---|---|
| `otitis_media_aguda` | `moraxella_catarrhalis` | ★★★ | Uno de los 3 patógenos core de OMA (neumococo, H. flu, Moraxella). |
| `sinusitis_aguda` | `moraxella_catarrhalis` | ★★★ | Igual que OMA: tríada clásica de sinusitis aguda. |
| `infeccion_cervicofacial` | `actinomyces_spp` | ★★★ | Actinomicosis cervicofacial ("lumpy jaw") es EL síndrome de Actinomyces. |
| `nac` | `moraxella_catarrhalis` | ★★ | Patógeno típico de NAC/EPOC. |
| `espondilodiscitis` | `brucella_spp` | ★★ | Espondilitis brucelar clásica; Brucella endémica en Chile. |
| `osteoartritis` | `brucella_spp` | ★★ | Compromiso osteoarticular brucelar. |
| `endocarditis_infecciosa` | `enterococcus_faecium` | ★★ | EI enterocócica; ya lista faecalis, falta faecium. |
| `nih` | `enterobacter_spp` | ★★ | Gramnegativo nosocomial clásico de NIH/HAP. |
| `nih` | `serratia_marcescens` | ★★ | Ídem, patógeno nosocomial de NIH. |
| `neumonia_asociada_ventilacion` | `stenotrophomonas_maltophilia` | ★★ | Patógeno de NAVM, sobre todo tras carbapenémicos. |
| `bacteriemia_asociada_cateter` | `acinetobacter_baumannii` | ★★ | CLABSI en UCI. |
| `bacteriemia_asociada_cateter` | `stenotrophomonas_maltophilia` | ★★ | CLABSI asociada a dispositivos. |
| `neumonia_cavitada` | `nocardia_spp` | ★★ | Nocardiosis cavitaria (inmunocomprometido). |
| `absceso_cerebral` | `nocardia_spp` | ★★ | Absceso cerebral por Nocardia (inmunocomprometido). |
| `absceso_pulmonar` | `actinomyces_spp` | ★ | Actinomicosis torácica; causa menos frecuente. |

**15 adiciones.** ★★★ = gap evidente; ★ = enriquecimiento.

---

## C. Opcionales (tu criterio; impacto bajo)

| Síndrome | patógeno | Nota |
|---|---|---|
| `intoxicacion_alimentaria` | `clostridium_perfringens` | Causa clásica de intoxicación alimentaria; el síndrome es de manejo sintomático. ADD por consistencia (ya lista S. aureus toxigénico). |
| `itu_cauti` | `serratia_marcescens` | Uropatógeno nosocomial; menor. |
| `nih` | `legionella_pneumophila` | HAP por Legionella (sistemas de agua); no siempre blanco empírico. |

---

## D. LEAVE — asimetría legítima (NO tocar)

No requieren acción. Son (1) no-blancos empíricos deliberados, o (2) gérmenes genéricos/grupo redundantes con una especie ya listada. El buscador une ambas direcciones igual.

- `nac` ← `staphylococcus_aureus`, `klebsiella_pneumoniae` — causas de NAC grave/aspirativa, deliberadamente NO blanco empírico de rutina.
- `meningitis` ← `escherichia_coli`, `streptococcus_agalactiae` — casos borde del adulto; cubiertos por ceftriaxona empírica.
- `bacteriemia` ← `enterococcus_faecium`, `serratia_marcescens`, `salmonella_no_tifoidea` — bacteriemia es catch-all; la lista del síndrome es curada.
- `celulitis` ← `streptococcus_spp` — genérico, redundante con `streptococcus_pyogenes`.
- `intraabdominal` ← `anaerobes`, `enterobacterales` (genéricos), `enterococcus_faecalis`, `enterococcus_faecium` (cubiertos por `enterococcus_spp`).
- `itu_cauti` ← `enterococcus_faecium`, `itu_complicada` ← `enterococcus_faecalis` — cubiertos por `enterococcus_spp`.
- `epi` ← `actinomyces_spp` — asociado a DIU, nicho, no empírico.
- `nih` ← `burkholderia_cepacia` — principalmente FQ/inmunocomprometido.

---

## Resumen de acciones propuestas

- **8 REMOVE** (over-claims de patógenos) → editar `usualSyndromes`.
- **15 ADD** (gaps de síndromes) → editar `pathogenIds` + `pathogens`.
- **3 opcionales** → decisión del médico.
- **~16 LEAVE** → sin acción; se resuelven en el buscador uniendo direcciones.

Tras aplicar A+B, el auditor bajaría de 42 a ~19 asimetrías "hacia atrás" (las LEAVE), todas justificadas.
