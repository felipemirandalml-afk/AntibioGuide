# Roadmap de síndromes — estado y fuentes

**Actualizado:** 12 de julio de 2026
**Rama:** `chore/normalizar-vocabulario-sindromes`

---

## De 47 a 25: qué pasó

El backlog decía **47 síndromes pendientes**. Al auditarlo, resultó que menos de la mitad eran trabajo real.

| Etapa | Backlog | Qué se hizo |
|---|:-:|---|
| Punto de partida | **47** | — |
| Normalizar vocabulario | **35** | 8 eran **alias** de síndromes que ya existían con otro id + 4 estaban **fuera de alcance** |
| Depurar por evidencia | **30** | 1 categoría **obsoleta** (HCAP) + 4 que **no son blancos de terapia empírica** |
| **Trabajo real** | **25 nuevos** | + 5 posibles variantes de un síndrome existente |

---

## 1. Alias normalizados (ya aplicado)

`pathogens.js` usaba un vocabulario de ids distinto al de `syndromes.js`. No eran síndromes faltantes: eran el mismo síndrome con otro nombre.

| Alias | → | Canónico |
|---|---|---|
| `neumonia_adquirida_comunidad` | → | `nac` |
| `neumonia_intrahospitalaria` | → | `nih` |
| `meningitis_bacteriana` | → | `meningitis` |
| `infeccion_intraabdominal` | → | `intraabdominal` |
| `enfermedad_pelvica_inflamatoria` | → | `epi` |
| `itu_asociada_cateter` | → | `itu_cauti` |
| `cistitis_aguda`, `itu_baja` | → | `itu_cistitis` |

> El validador ahora **rechaza** los alias: si alguien vuelve a referenciar un síndrome ya definido con otro id, sale como `missing_clinical_syndrome_ref`, no como backlog.

---

## 2. Eliminado por evidencia: HCAP

**`neumonia_asociada_cuidados_salud` — eliminado del roadmap.**

La categoría *healthcare-associated pneumonia* fue **abandonada**:

- **Ewig S, Kolditz M, Pletz MW, Chalmers J.** *Healthcare-associated pneumonia: is there any reason to continue to utilize this label in 2019?* **Clin Microbiol Infect. 2019;25(10):1173-9.** doi:10.1016/j.cmi.2019.02.022
  > *"HCAP should no longer be used to identify patients at risk of MDR pathogens."*

  Hallazgos: los criterios de HCAP **rindieron mal** para predecir patógenos multirresistentes, y el **tratamiento de amplio espectro según guía no redujo la mortalidad**.

- **Kalil AC, et al.** Guía IDSA/ATS 2016 de HAP/VAP. **Clin Infect Dis. 2016;63(5):e61-e111.** doi:10.1093/cid/ciw353 — **elimina la categoría HCAP.**

**Por qué importa en AntibioGuide:** esta es una app de *optimización* del uso de antimicrobianos. Mantener HCAP enseñaría un concepto obsoleto **cuyo efecto conocido es gatillar amplio espectro innecesario** — lo contrario de su propósito.

**Acción:** `serratia_marcescens` se remapeó a **`nih`**, que es la categoría vigente y clínicamente correcta (Serratia es un patógeno nosocomial clásico).

---

## 3. No son blancos de terapia empírica (4)

Referencias **clínicamente ciertas** —se conservan en `pathogens.js` porque informan al clínico— pero que **no se implementarán como síndrome**, porque no se tratan empíricamente:

| Síndrome | Patógeno | Por qué no |
|---|---|---|
| `sindrome_febril_agudo` | *Coxiella burnetii* | Presentación de la fiebre Q. Se estudia y se trata dirigido. |
| `sindrome_febril_prolongado` | *Brucella spp.* | **La FOD se investiga, NO se cubre empíricamente a ciegas.** Darle un régimen empírico sería un antipatrón. |
| `hepatitis_granulomatosa` | *Coxiella burnetii* | Diagnóstico serológico + doxiciclina dirigida. |
| `romboencefalitis` | *Listeria monocytogenes* | Mismo tratamiento que la meningitis por Listeria. **Evaluar como `scenario` de `meningitis`.** |

---

## 4. Fuera de alcance (4)

Clínicamente ciertas, pero fuera del alcance de la app (**adultos**):

- `sepsis_neonatal`, `conjuntivitis_neonatal` — neonatal
- `colonizacion_cutanea_persistente` — colonización, no infección tratable
- `infeccion_invasora` — término inespecífico, no accionable

---

## 5. Posibles variantes (5) — decisión clínica pendiente

¿Síndrome propio, o `scenario` dentro de uno existente?

| Candidato | ¿Variante de? |
|---|---|
| `neumonia_adquirida_comunidad_grave` | `nac` (escenario grave/UCI) |
| `neumonia_atipica` | `nac` (targets atípicos) |
| `endocarditis_cultivo_negativo` | `endocarditis_infecciosa` (escenario) |
| `infeccion_cutanea_primaria` | `celulitis` (solapa) |
| `infeccion_endovascular` | `endocarditis_infecciosa` / `bacteriemia` (solapa) |

---

## 6. MAPA DE COBERTURA — los 25 por escribir

**Los 25 tienen fuente documental con página.** Cobertura: **100 %**.

### Fuentes

| Tag | Documento | Págs |
|---|---|:-:|
| `TEI-416` | Tratamiento de las Enfermedades Infecciosas | 416 |
| `UC-2024` | Manual de Antibioterapia y Control de Infecciones — UC CHRISTUS 2024 | 154 |
| `PROA-04` | PROA-04 Guía de Tratamiento Antimicrobiano V1 | 73 |
| `OT-AMB` | Orientación Técnica — antibióticos en infecciones comunitarias ambulatorias 2021 | 42 |
| `NAC-2024` | Uso de antimicrobianos para neumonía en adultos (2024) | 12 |

> Los protocolos **PROA escaneados** no se usan: su contenido **ya está volcado** en la capa de patógenos y en los perfiles de resistencia por hospital. **No se requiere OCR.**

### Cobertura por síndrome

| Síndrome | Fuentes (páginas) |
|---|---|
| `absceso_cerebral` | PROA-04 p.3,49,50 · TEI-416 p.81,270 · UC-2024 p.16 |
| `absceso_pulmonar` | NAC-2024 p.4,8,9 · UC-2024 p.19 |
| `artritis_septica` | TEI-416 p.94,95 · UC-2024 p.13,48 · PROA-04 p.3,27 |
| `bacteriemia` | TEI-416 p.48,51,56,78… · UC-2024 p.15,18,44,46… |
| `bacteriemia_asociada_cateter` | UC-2024 p.23,65,87,88… · TEI-416 p.99 |
| `candidemia` | UC-2024 p.46,47,48,49… · TEI-416 p.72,153,266,268… |
| `cervicitis` | TEI-416 p.166 · UC-2024 p.17 |
| `diarrea_disenterica` | TEI-416 p.282,401 |
| `espondilodiscitis` | UC-2024 p.13,89 |
| `exacerbacion_epoc` | TEI-416 p.6,14,77,122… · OT-AMB p.3,16,35,39 |
| `gastroenteritis_aguda` | TEI-416 p.6,106,107,108… · UC-2024 p.100,103,108,110… |
| `infeccion_asociada_embarazo` | TEI-416 p.8,100,101,117… · UC-2024 p.2,6,28,42… |
| `infeccion_cervicofacial` | UC-2024 p.100 |
| `infeccion_herida_operatoria` | UC-2024 p.35,37,121,148 · TEI-416 p.200,201 |
| `infeccion_necrotizante_tejidos_blandos` | UC-2024 p.13,64,69,102… · TEI-416 p.90,135,136,332… |
| `infeccion_tracto_respiratorio_fq` | TEI-416 p.235,236,238,240… · UC-2024 p.134 |
| `intoxicacion_alimentaria` | TEI-416 p.128 · UC-2024 p.103 |
| `linfadenitis_regional` | TEI-416 p.90,385,395,406 |
| `mionecrosis` | UC-2024 p.101,103 |
| `neumonia_asociada_ventilacion` | TEI-416 p.7,13,14,15… · UC-2024 p.19,56,57,76… |
| `neumonia_cavitada` | UC-2024 p.30 · PROA-04 p.25 · NAC-2024 p.9 |
| `osteoartritis` | TEI-416 p.5,48,77,81… · PROA-04 p.3,27,28,65… |
| `otitis_media_aguda` | TEI-416 p.5,37,76,77… · OT-AMB p.3,14,35,39 |
| `sinusitis_aguda` | TEI-416 p.5,6,79,90… · OT-AMB p.3,12,13,14… |
| `uretritis` | UC-2024 p.17 |

---

## 7. Regla de oro para redactar

**Ninguna dosis, fármaco ni duración se escribe sin una fuente citada.**

Cada `regimen` debe llevar su campo `reference` apuntando al documento y la página de donde salió. Un régimen sin `reference` no puede considerarse validado.

Este es un motor que recomienda antibióticos: **no hay un clínico entre el dato y el paciente**.
