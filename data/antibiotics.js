/**
 * @fileoverview ANTIBIOTICS DATA (Enriched via NotebookLM + Manual Clinical Refinement)
 * 
 * ARCHITECTURAL CONTRACT (Clinical vs Presentation):
 * This file contains the primary vocabulary for drugs and their properties.
 */

const antibiotics = [
  {
    "id": "amoxicilina",
    "name": "Amoxicilina",
    "family": "Aminopenicilina",
    "mechanism": "Bactericida. Inhibe la síntesis de pared celular (PBP).",
    "spectrum": "Grampositivos (Streptococcus spp. sensibles) y algunos Gramnegativos.",
    "dose": "500 mg - 1 g PO c/8h (Dosis alta en NAC según riesgo/resistencia local).",
    "renal": "ClCr 10-29 mL/min: 250-500 mg c/12h; ClCr < 10 mL/min: 250-500 mg c/24h.",
    "contraindications": "Hipersensibilidad a penicilinas.",
    "adverse": "Diarrea, exantema morbiliforme, náuseas.",
    "uses": "NAC ambulatoria, faringitis estreptocócica, infecciones odontogénicas sensibles.",
    "synonyms": [
      "amoxicillin"
    ],
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "route_hint": "vo",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "amoxicilina_clavulanico",
    "name": "Amoxicilina-Clavulánico",
    "family": "Penicilina + Inhibidor de beta-lactamasas",
    "mechanism": "Bactericida por inhibición de pared celular asociado a inhibición irreversible de beta-lactamasas.",
    "spectrum": "Grampositivos, Gramnegativos y anaerobios productores de beta-lactamasas.",
    "dose": "875/125 mg PO c/12h o 500/125 mg PO c/8h.",
    "renal": "ClCr 10-29 mL/min: 250-500 mg c/12h; ClCr < 10 mL/min: 250-500 mg c/24h.",
    "contraindications": "Alergia a penicilinas; antecedente de ictericia colestásica por el fármaco.",
    "adverse": "Diarrea (frecuente), náuseas, candidiasis, riesgo de enterocolitis en neonatos.",
    "uses": "Sinusitis, NAC con comorbilidad, mordeduras, infecciones de tracto biliar.",
    "synonyms": [
      "amoxi clav",
      "amoxiclav",
      "augmentin"
    ],
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "broad",
      "route_hint": "both",
      "anti_pseudomonas": false,
      "anaerobic_activity": true,
      "oral_option": true
    }
  },
  {
    "id": "ampicilina",
    "name": "Ampicilina",
    "family": "Aminopenicilina",
    "mechanism": "Bactericida. Inhibe la síntesis y reparación de la pared bacteriana.",
    "spectrum": "Enterococcus faecalis, Listeria monocytogenes, algunos Gramnegativos.",
    "dose": "2 g IV c/4-6 h (Especialmente en Meningitis/Listeria) o 500 mg PO c/6 h.",
    "renal": "ClCr 10-29 mL/min: 1-2 g IV c/8-12 h; ClCr < 10 mL/min: 1-2 g IV c/12-24 h.",
    "contraindications": "Hipersensibilidad a penicilinas.",
    "adverse": "Exantema, diarrea, elevación transitoria de enzimas hepáticas.",
    "uses": "Listeria (meningitis), Enterococo sensible, endocarditis (en combinación).",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "broad",
      "route_hint": "both",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "ampicilina_sulbactam",
    "name": "Ampicilina-Sulbactam",
    "family": "Penicilina + Inhibidor de beta-lactamasas",
    "mechanism": "Asociación de bactericida inhibidor de la pared celular con inhibidor irreversible de beta-lactamasas.",
    "spectrum": "Grampositivos, Gramnegativos y anaerobios productores de beta-lactamasas (No Pseudomonas).",
    "dose": "1.5 - 3 g IV c/6 h.",
    "renal": "ClCr 10-29 mL/min: 1.5-3 g IV c/12h; ClCr < 10 mL/min: 1.5-3 g IV c/24h.",
    "contraindications": "Hipersensibilidad a penicilinas o sulbactam.",
    "adverse": "Dolor en sitio de inyección, diarrea, rash.",
    "uses": "Infecciones intraabdominales, neumonía aspirativa, profilaxis quirúrgica abdominal.",
    "synonyms": [
      "unasyn"
    ],
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "broad",
      "route_hint": "ev",
      "anti_pseudomonas": false,
      "anaerobic_activity": true,
      "oral_option": false
    }
  },
  {
    "id": "cloxacilina",
    "name": "Cloxacilina",
    "family": "Penicilina antiestafilocócica",
    "mechanism": "Bactericida. Resistente a penicilinasas estafilocócicas.",
    "spectrum": "S. aureus sensible a meticilina (MSSA) y Streptococcus spp. (excluyendo Enterococcus).",
    "dose": "2 g IV c/4-6h (~12 g/día para endocarditis) o 500 mg PO c/6h.",
    "renal": "Ajuste no suele ser necesario salvo falla renal extrema (monitorizar).",
    "contraindications": "Alergia a penicilinas.",
    "adverse": "Hepatotoxicidad colestásica, nefritis intersticial, riesgo de flebitis.",
    "uses": "Endocarditis bacteriana MSSA, SSTI grave MSSA.",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "route_hint": "both",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "penicilina_g",
    "name": "Penicilina G (Sódica)",
    "family": "Penicilina natural",
    "mechanism": "Bactericida. Bloquea la síntesis de la pared celular bacteriana.",
    "spectrum": "Streptococcus spp., Neisseria meningitidis, Treponema pallidum y Clostridium spp.",
    "dose": "2 a 4 MUI IV c/4 h (Dosis total 12-24 MUI/día).",
    "renal": "ClCr 10-29 mL/min: 2-3 MUI c/4-6 h; ClCr < 10 mL/min: 1-2 MUI c/6 h.",
    "contraindications": "Alergia a penicilinas.",
    "adverse": "Convulsiones (dosis altas o falla renal no ajustada), hipopotasemia.",
    "uses": "Meningitis meningocócica, endocarditis estreptocócica, sífilis neurológica, tétanos.",
    "synonyms": [
      "bencilpenicilina"
    ],
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "route_hint": "ev",
      "anti_pseudomonas": false,
      "anaerobic_activity": true,
      "oral_option": false
    }
  },
  {
    "id": "penicilina_v",
    "name": "Penicilina V",
    "family": "Penicilina (oral)",
    "mechanism": "Inhibe síntesis de pared celular.",
    "spectrum": "Estreptococos (GAS).",
    "dose": "500 mg PO c/12h",
    "renal": "Ajustar en IR significativa.",
    "contraindications": "Alergia a penicilinas.",
    "adverse": "Hipersensibilidad, GI.",
    "uses": "Faringitis estreptocócica.",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "route_hint": "vo",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "penicilina_g_benzatinica",
    "name": "Penicilina G Benzatínica",
    "family": "Penicilina (IM depósito)",
    "mechanism": "Inhibe síntesis de pared celular.",
    "spectrum": "Estreptococos sensibles.",
    "dose": "1.2 millones UI IM dosis única",
    "renal": "Sin ajuste habitual.",
    "contraindications": "Alergia a penicilinas.",
    "adverse": "Dolor local, hipersensibilidad.",
    "uses": "Faringitis estreptocócica (adherencia).",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "route_hint": "im",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "piperacilina_tazobactam",
    "name": "Piperacilina-Tazobactam",
    "family": "Penicilina antipseudomónica + Inhibidor de beta-lactamasas",
    "mechanism": "Bactericida inhibidor de pared celular asociado a inhibidor de beta-lactamasas.",
    "spectrum": "Muy amplio: Pseudomonas aeruginosa, Enterobacterales, Grampositivos y Anaerobios.",
    "dose": "4.5 g IV c/6-8 h (Considerar infusión extendida de 4h en sepsis/VAP).",
    "renal": "ClCr 20-40 mL/min: 2.25 g c/6h; ClCr < 20 mL/min: 2.25 g c/8h.",
    "contraindications": "Hipersensibilidad a penicilinas, cefalosporinas o inhibidores de beta-lactamasas.",
    "adverse": "Diarrea, nefritis intersticial, trombocitopenia (uso prolongado).",
    "uses": "Sepsis de origen desconocido, neumonía intrahospitalaria, neutropenia febril.",
    "synonyms": [
      "tazocin"
    ],
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "route_hint": "ev",
      "anti_pseudomonas": true,
      "anaerobic_activity": true,
      "oral_option": false,
      "stewardship_flags": [
        "Uso restringido nosocomial"
      ]
    }
  },
  {
    "id": "cefazolina",
    "name": "Cefazolina",
    "family": "Cefalosporina de 1ra generación",
    "mechanism": "Bactericida. Inhibe la síntesis de pared bacteriana.",
    "spectrum": "Cocos Grampositivos (MSSA) y algunos bacilos Gramnegativos (E. coli sensible).",
    "dose": "1-2 g IV c/8 h.",
    "renal": "ClCr 10-29 mL/min: 1-2 g c/12 h; ClCr < 10 mL/min: 1-2 g c/24 h.",
    "contraindications": "Hipersensibilidad a cefalosporinas.",
    "adverse": "Hipersensibilidad, diarrea, flebitis.",
    "uses": "Profilaxis quirúrgica (elección), celulitis MSSA bacteriemia.",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "route_hint": "ev",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "cefadroxilo",
    "name": "Cefadroxilo",
    "family": "Cefalosporina de 1ra generación (Oral)",
    "mechanism": "Bactericida por inhibición de síntesis de pared.",
    "spectrum": "Grampositivos y algunos Gramnegativos (especialmente urinarios).",
    "dose": "500 mg - 1 g PO c/12 h.",
    "renal": "ClCr 10-29 mL/min: 500 mg-1 g c/24 h; ClCr < 10 mL/min: 500 mg-1 g c/48 h.",
    "contraindications": "Hipersensibilidad a cefalosporinas.",
    "adverse": "GI, exantema, raramente neutropenia.",
    "uses": "Cistitis no complicada, infecciones de piel y partes blandas leves.",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "route_hint": "vo",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "cefalexina",
    "name": "Cefalexina",
    "family": "Cefalosporina de 1ª generación",
    "mechanism": "Bactericida. Inhibición de la síntesis de la pared celular bacteriana",
    "spectrum": "Cocos Grampositivos (excepto enterococos y SARM) y algunos bacilos Gramnegativos (E. coli)",
    "dose": "250-500 mg c/6 h o 1 g c/12 h; máx. 4 g/día (Oral)",
    "renal": "Requiere ajuste en insuficiencia renal severa",
    "contraindications": "Alergia a cefalosporinas o betalactámicos",
    "adverse": "Molestias gastrointestinales, reacciones de hipersensibilidad",
    "uses": "Infecciones de piel y tejido subcutáneo, ITU no complicada, otitis media, infecciones dentales",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "cefuroxima",
    "name": "Cefuroxima",
    "family": "Cefalosporina de 2ra generación",
    "mechanism": "Bactericida por inhibición de síntesis de pared.",
    "spectrum": "Grampositivos y mayor cobertura contra Gramnegativos (E. coli, H. influenzae) que 1ra gen.",
    "dose": "750 mg - 1.5 g IV c/8 h o 250-500 mg PO c/12 h.",
    "renal": "ClCr 10-29 mL/min: 750 mg-1.5 g c/12 h (IV); ClCr < 10 mL/min: 750 mg-1.5 g c/24 h (IV).",
    "contraindications": "Hipersensibilidad a cefalosporinas.",
    "adverse": "Diarrea, nefritis intersticial (raro), elevación transitoria de transaminasas.",
    "uses": "Infecciones respiratorias bajas, profilaxis quirúrgica seleccionada.",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "route_hint": "both",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "ceftriaxona",
    "name": "Ceftriaxona",
    "family": "Cefalosporina de 3ra generación",
    "mechanism": "Bactericida. Inhibe la síntesis de pared celular bacteriana.",
    "spectrum": "Gram-, Streptococci. No Pseudomonas, no Enterococos.",
    "dose": "1-2 g IV c/24h (2 g IV c/12h en Meningitis/Endocarditis).",
    "renal": "No requiere ajuste significativo ante falla renal aislada (eliminación biliar).",
    "contraindications": "Alergia grave a beta-lactámicos; Neonatos con hiperbilirrubinemia (riesgo ictericia nuclear).",
    "adverse": "Diarrea por C. difficile, barro biliar, hipersensibilidad.",
    "uses": "NAC hospitalaria, meningitis, urosepsis, infección intraabdominal (con metronidazol).",
    "synonyms": [
      "rocephin"
    ],
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "route_hint": "ev",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": false,
      "stewardship_flags": [
        "Alto riesgo C. difficile y presión selectiva BLEE"
      ]
    }
  },
  {
    "id": "ceftazidima",
    "name": "Ceftazidima",
    "family": "Cefalosporina de 3ra generación antipseudomónica",
    "mechanism": "Bactericida. Alta afinidad hacia PBP de Pseudomonas aeruginosa.",
    "spectrum": "Bacilos Gramnegativos, alta y específica actividad antipseudomónica. Pobre Gram+.",
    "dose": "1-2 g IV c/8 h.",
    "renal": "ClCr 31-50 mL/min: 1 g c/12h; ClCr 16-30 mL/min: 1 g c/24h; ClCr < 15 mL/min: 500 mg c/24h.",
    "contraindications": "Hipersensibilidad a cefalosporinas.",
    "adverse": "Diarrea, convulsiones (en insuficiencia renal no ajustada), flebitis.",
    "uses": "Neutropenia febril, infecciones por Pseudomonas aeruginosa sensible.",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "narrow",
      "route_hint": "ev",
      "anti_pseudomonas": true,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "cefepime",
    "name": "Cefepime",
    "family": "Cefalosporina de 4ta generación",
    "mechanism": "Bactericida de amplio espectro con estabilidad frente a AmpC.",
    "spectrum": "Enterobacterias (incluyendo AmpC), Pseudomonas aeruginosa, MSSA y Streptococci.",
    "dose": "2 g IV c/8-12 h (2 g c/8 h en Neutropenia Febril / Meningitis).",
    "renal": "ClCr 30-60 mL/min: 2 g c/12h; ClCr 11-29 mL/min: 2 g c/24h; ClCr ≤10 mL/min: 1 g c/24h.",
    "contraindications": "Hipersensibilidad a cefalosporinas; cuidado extremo en falla renal (Neurotoxicidad).",
    "adverse": "Neurotoxicidad (Encefalopatía, mioclonías), convulsiones, diarrea.",
    "uses": "Neumonía nosocomial, neutropenia febril, infecciones por Gram- resistentes.",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "route_hint": "ev",
      "anti_pseudomonas": true,
      "anaerobic_activity": false,
      "oral_option": false,
      "stewardship_flags": [
        "Especial vigilancia de neurotoxicidad en falla renal"
      ]
    }
  },
  {
    "id": "ertapenem",
    "name": "Ertapenem",
    "family": "Carbapenémicos",
    "mechanism": "Bactericida. Inhibe la síntesis de pared celular bacteriana (vida media larga)",
    "spectrum": "Bacterias Gram+, Gram- (BLEE) y Anaerobios. Sin actividad contra Pseudomonas o Acinetobacter",
    "dose": "1 g c/24 h (IV/IM)",
    "renal": "Clcr < 30 ml/min: 500 mg c/24 h",
    "contraindications": "Hipersensibilidad severa a betalactámicos",
    "adverse": "Reacciones locales, flebitis, diarrea, cefalea, convulsiones (menor riesgo que imipenem)",
    "uses": "Infecciones intraabdominales, pélvicas, pie diabético, neumonía grave comunitaria, profilaxis colorrectal",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": true,
      "oral_option": false
    }
  },
  {
    "id": "meropenem",
    "name": "Meropenem",
    "family": "Carbapenémico",
    "mechanism": "Bactericida. Inactiva PBPs múltiples con alta estabilidad frente a beta-lactamasas.",
    "spectrum": "Muy amplio: Gram+, Gram-, anaerobios, Pseudomonas y Acinetobacter.",
    "dose": "1 g IV c/8 h (2 g c/8 h en Meningitis o infecciones graves por Pseudomonas).",
    "renal": "ClCr 26-50 mL/min: 1 g c/12h; ClCr 10-25 mL/min: 500 mg c/12h; ClCr < 10 mL/min: 500 mg c/24h.",
    "contraindications": "Hipersensibilidad a carbapenémicos.",
    "adverse": "Riesgo de convulsiones (menor que Imipenem), colitis pseudomembranosa.",
    "uses": "Sepsis grave nosocomial, meningitis por Gram-, neutropenia febril.",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "route_hint": "ev",
      "anti_pseudomonas": true,
      "anaerobic_activity": true,
      "oral_option": false,
      "stewardship_flags": [
        "Carbapenémico antipseudomónico",
        "Reserva PROA"
      ]
    }
  },
  {
    "id": "imipenem",
    "name": "Imipenem-Cilastatina",
    "family": "Carbapenémico",
    "mechanism": "Bactericida de amplio espectro. Cilastatina previene degradación renal por DHP-I.",
    "spectrum": "Extenso: Gram+, Gram-, Pseudomonas aeruginosa y Anaerobios.",
    "dose": "500 mg IV c/6 h o 1 g IV c/8 h.",
    "renal": "Requiere ajuste estricto basado en ClCr y peso para evitar neurotoxicidad.",
    "contraindications": "Alergia a carbapenémicos; precaución en epilepsia.",
    "adverse": "Náuseas/vómitos (más frecuente que otros), convulsiones (especialmente en IR).",
    "uses": "Infecciones nosocomiales graves, sepsis polimicrobiana.",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "route_hint": "ev",
      "anti_pseudomonas": true,
      "anaerobic_activity": true,
      "oral_option": false
    }
  },
  {
    "id": "vancomicina",
    "name": "Vancomicina",
    "family": "Glicopéptido",
    "mechanism": "Inhibe la síntesis de pared celular (unión a D-Ala-D-Ala). Bactericida concentración-tiempo dependiente.",
    "spectrum": "Cocos Grampositivos incluyendo MRSA y Enterococcus spp. (variable). No activa Gram-.",
    "dose": "15-20 mg/kg IV c/8-12 h (Guiado por niveles valle o AUC/MIC).",
    "renal": "Ajuste obligatorio basado en niveles plasmáticos y ClCr.",
    "contraindications": "Hipersensibilidad conocida.",
    "adverse": "Nefrotoxicidad (sinergia con otros nefrotóxicos), ototoxicidad, Síndrome de Hombre Rojo.",
    "uses": "Infección grave por MRSA, meningitis (con ceftriaxona), endocarditis MSSA (en alérgicos a beta-lactámicos).",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "narrow",
      "route_hint": "ev",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "linezolid",
    "name": "Linezolid",
    "family": "Oxazolidinona",
    "mechanism": "Inhibe la síntesis proteica (subunidad 50S). Bacteriostático.",
    "spectrum": "Grampositivos multirresistentes: MRSA, VRE y neumococo resistente.",
    "dose": "600 mg IV/PO c/12 h.",
    "renal": "No suele requerir ajuste renal habitual.",
    "contraindications": "Uso concomitante con IMAO o antidepresivos serotonérgicos (S. serotoninérgico).",
    "adverse": "Trombocitopenia (especialmente tras 14 días), neuropatía periférica y óptica.",
    "uses": "Neumonía nosocomial MRSA, infección de piel y partes blandas por resistentes.",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "narrow",
      "route_hint": "both",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "daptomicina",
    "name": "Daptomicina",
    "family": "Lipopéptido cíclico",
    "mechanism": "Bactericida. Despolariza la membrana celular inhibiendo síntesis de ADN/ARN.",
    "spectrum": "Exclusivo para bacterias Grampositivas, incluyendo MRSA y VRE.",
    "dose": "Bacteriemia/Endocarditis: 8-12 mg/kg IV c/24h. SSTI: 4-6 mg/kg c/24h.",
    "renal": "ClCr < 30 mL/min: administrar cada 48 h.",
    "contraindications": "NO USAR EN NEUMONÍA (inactivada por surfactante pulmonar).",
    "adverse": "Miopatía (elevación de CPK), neumonía eosinofílica.",
    "uses": "Bacteriemia por S. aureus, endocarditis derecha por MRSA.",
    "clinical_metadata": {
      "aware": "Reserve",
      "spectrum": "narrow",
      "route_hint": "ev",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "amikacina",
    "name": "Amikacina",
    "family": "Aminoglucósido",
    "mechanism": "Bactericida. Inhibe la síntesis proteica por unión a subunidad 30S.",
    "spectrum": "Bacilos Gramnegativos aerobios, incluyendo Pseudomonas aeruginosa y Acinetobacter.",
    "dose": "15-20 mg/kg IV c/24 h (Dosis única diaria preferida).",
    "renal": "Ajuste estricto requerido. ClCr 10-29 mL/min: 15 mg/kg c/48 h; ClCr < 10: 5-7.5 mg/kg c/24h.",
    "contraindications": "Hipersensibilidad a aminoglucósidos; Miastenia Gravis.",
    "adverse": "Nefrotoxicidad sistémica, ototoxicidad (auditiva y vestibular).",
    "uses": "Sepsis grave, infecciones urinarias multirresistentes, terapia combinada antipseudomónica.",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "narrow",
      "route_hint": "ev",
      "anti_pseudomonas": true,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "gentamicina",
    "name": "Gentamicina",
    "family": "Aminoglucósidos",
    "mechanism": "Bactericida. Inhibe la síntesis de proteínas mediante unión a la subunidad 30S",
    "spectrum": "Bacilos Gramnegativos aerobios y sinergia contra Grampositivos (enterococo y estafilococo)",
    "dose": "5 mg/kg c/24 h o 1-2 mg/kg c/8 h (IV/IM)",
    "renal": "Ajuste estricto requerido. Espaciar dosis en caso de disfunción renal",
    "contraindications": "Hipersensibilidad a aminoglucósidos",
    "adverse": "Nefrotoxicidad (aguda pero reversible) y Ototoxicidad (vestibular y coclear irreversible)",
    "uses": "Endocarditis (en sinergia), sepsis, infecciones urinarias complicadas, profilaxis quirúrgica",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "anti_pseudomonas": true,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "azitromicina",
    "name": "Azitromicina",
    "family": "Macrólido",
    "mechanism": "Bacteriostático. Inhibe síntesis proteica (unión a 50S).",
    "spectrum": "Atípicos (Mycoplasma, Chlamydia, Legionella), gérmenes respiratorios.",
    "dose": "500 mg PO/IV c/24h.",
    "renal": "Sin ajuste habitual necesario en falla renal moderada.",
    "contraindications": "Antecedente de prolongación del intervalo QT; Insuficiencia hepática grave.",
    "adverse": "GI, prolongación del QT, riesgo de arritmias.",
    "uses": "NAC (cobertura de atípicos), ETS (Uretritis), infecciones respiratorias.",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "route_hint": "both",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "claritromicina",
    "name": "Claritromicina",
    "family": "Macrólido",
    "mechanism": "Bacteriostático por unión a subunidad 50S.",
    "spectrum": "Grampositivos selectos y microorganismos atípicos.",
    "dose": "500 mg PO c/12 h.",
    "renal": "ClCr < 30 mL/min: 250-500 mg c/24 h.",
    "contraindications": "Hipersensibilidad; prolongación del QT.",
    "adverse": "Disgeusia, náuseas, diarrea, prolongación del QT.",
    "uses": "Neumonía atípica, erradicación de H. pylori (en combinación).",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "route_hint": "vo",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "ciprofloxacino",
    "name": "Ciprofloxacino",
    "family": "Fluoroquinolona",
    "mechanism": "Bactericida. Inhibe la ADN-girasa y topoisomerasa IV.",
    "spectrum": "Excelente contra bacilos Gramnegativos (incluye Pseudomonas sensible). Pobre contra Neumococo.",
    "dose": "400 mg IV c/8-12 h o 500-750 mg PO c/12 h.",
    "renal": "ClCr < 30 mL/min: Reducir dosis o aumentar intervalo (ej. 250-500 mg PO c/24h).",
    "contraindications": "Embarazo, lactancia, niños; Miastenia Gravis; Alergia a quinolonas.",
    "adverse": "Tendinitis/Rotura de tendón, neuropatía, fototoxicidad, confusión en ancianos.",
    "uses": "ITU complicada, prostatitis, infecciones gastrointestinales bacterianas graves.",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "route_hint": "both",
      "anti_pseudomonas": true,
      "anaerobic_activity": false,
      "oral_option": true,
      "stewardship_flags": [
        "Alto riesgo C. difficile",
        "Daño colateral significativo"
      ]
    }
  },
  {
    "id": "levofloxacino",
    "name": "Levofloxacino",
    "family": "Fluoroquinolona",
    "mechanism": "Bactericida. Actúa sobre ADN-girasa; mayor potencia contra Grampositivos.",
    "spectrum": "Amplio: Neumococo, Atípicos y Gramnegativos (actividad Pseudomonas variable).",
    "dose": "500-750 mg IV/PO c/24 h.",
    "renal": "ClCr 10-29 mL/min: 500-750 mg c/48 h; ClCr < 10 mL/min: 250-500 mg c/48 h.",
    "contraindications": "Alergia a quinolonas; Miastenia Gravis.",
    "adverse": "Tendinitis, alteraciones de la glucemia, prolongación QT.",
    "uses": "NAC (especialmente si hay riesgo de resistencia), urosepsis, exacerbación de EPOC.",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "route_hint": "both",
      "anti_pseudomonas": true,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "moxifloxacino",
    "name": "Moxifloxacino",
    "family": "Fluoroquinolonas",
    "mechanism": "Bactericida. Inhibe la topoisomerasa IV y la ADN girasa",
    "spectrum": "Potente contra Gram+, Atípicos (Mycoplasma, Legionella) y patógenos respiratorios. Menor actividad antipseudomónica",
    "dose": "400 mg/día (Oral/IV)",
    "renal": "No requiere ajuste de dosis en insuficiencia renal",
    "contraindications": "Alergia a quinolonas. Precaución severa en prolongación del QT o arritmias",
    "adverse": "Prolongación intervalo QT, tendinitis, fototoxicidad, neuropatía periférica",
    "uses": "Neumonía comunitaria, exacerbación de EPOC, infecciones complicadas de piel e intraabdominales",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": true,
      "oral_option": true
    }
  },
  {
    "id": "metronidazol",
    "name": "Metronidazol",
    "family": "Nitroimidazol",
    "mechanism": "Bactericida. Daña el ADN tras activación intracelular por microorganismos anaerobios.",
    "spectrum": "Anaerobios estrictos, protozoos. Bactericida potente contra B. fragilis.",
    "dose": "500 mg IV/PO c/8 h.",
    "renal": "Ajuste suele ser necesario solo en falla renal avanzada extrema (ClCr < 10).",
    "contraindications": "Consumo de Alcohol (Efecto Disulfiram).",
    "adverse": "Sabor metálico, náuseas, neuropatía periférica (uso crónico).",
    "uses": "Infección intraabdominal, peritonitis, colitis por C. difficile (leves), absceso pélvico.",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "route_hint": "both",
      "anti_pseudomonas": false,
      "anaerobic_activity": true,
      "oral_option": true
    }
  },
  {
    "id": "clindamicina",
    "name": "Clindamicina",
    "family": "Lincosamida",
    "mechanism": "Inhibe la síntesis proteica (subunidad 50S). Bacteriostático.",
    "spectrum": "Gran positivos (incluye MRSA comunitario) y anaerobios (excepto B. fragilis resistente).",
    "dose": "600-900 mg IV c/8 h o 300-450 mg PO c/6-8 h.",
    "renal": "Ajuste no suele ser necesario.",
    "contraindications": "Alergia a lincosamidas.",
    "adverse": "Alto riesgo de colitis pseudomembranosa por C. difficile, rash.",
    "uses": "Infecciones de piel y partes blandas, neumonía aspirativa, profilaxis quirúrgica en alérgicos a Penicilina.",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "route_hint": "both",
      "anti_pseudomonas": false,
      "anaerobic_activity": true,
      "oral_option": true,
      "stewardship_flags": [
        "Cuidado con riesgo C. difficile"
      ]
    }
  },
  {
    "id": "nitrofurantoina",
    "name": "Nitrofurantoína",
    "family": "Nitrofurano",
    "mechanism": "Interfiere en múltiples sistemas enzimáticos bacterianos. Bactericida urinario.",
    "spectrum": "Bacterias de vía urinaria (E. coli, Enterococcus). No activa contra Proteus ni Pseudomonas.",
    "dose": "100 mg PO c/12h (Mancrocristales).",
    "renal": "CONTRAINDICADA si TFG < 30-50 mL/min (riesgo de toxicidad sistémica e ineficacia urinaria).",
    "contraindications": "Insuficiencia renal moderada-severa, embarazo a término, déficit G6PD.",
    "adverse": "Náuseas, fibrosis pulmonar (en uso crónico), neuropatía periférica.",
    "uses": "Cistitis no complicada solamente. Profilaxis de ITU recurrente.",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "route_hint": "vo",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "fosfomicina_trometamol",
    "name": "Fosfomicina trometamol",
    "family": "Derivado del ácido fosfónico",
    "mechanism": "Inhibe la síntesis de pared celular (MurA). Bactericida.",
    "spectrum": "Amplio espectro urinario, incluyendo cepas productoras de BLEE.",
    "dose": "3 g PO dosis única.",
    "renal": "Ajuste usualmente no requerido para dosis única en cistitis.",
    "contraindications": "Hipersensibilidad.",
    "adverse": "Diarrea, náuseas.",
    "uses": "Cistitis aguda no complicada.",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "route_hint": "vo",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true,
      "stewardship_flags": [
        "Reserva para cistitis multirresistente"
      ]
    }
  },
  {
    "id": "tmp_smx",
    "name": "Trimetoprima-Sulfametoxazol",
    "family": "Antifolatos",
    "mechanism": "Inhibe síntesis de folato (dos pasos).",
    "spectrum": "MRSA comunitario, algunos Gram- urinarios.",
    "dose": "DS 160/800 mg PO c/12h (según indicación)",
    "renal": "Ajustar en IR; vigilar K+.",
    "contraindications": "Alergia sulfas, embarazo (según trimestre), déficit G6PD (precaución).",
    "adverse": "Rash, hiperK, citopenias, nefritis intersticial (raro).",
    "uses": "SSTI con riesgo MRSA, alternativas ITU, cobertura Listeria (según caso).",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "broad",
      "route_hint": "both",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "doxiciclina",
    "name": "Doxiciclina",
    "family": "Tetraciclina",
    "mechanism": "Bacteriostático de amplio espectro que inhibe la síntesis proteica (30S).",
    "spectrum": "Grampositivos, Gramnegativos, atípicos y espiroquetas. No Pseudomonas.",
    "dose": "100 mg PO/IV c/12h.",
    "renal": "No requiere ajuste renal habitual.",
    "contraindications": "Embarazo, lactancia, niños < 8 años (tinción dental permanente); Fotosensibilidad.",
    "adverse": "Fotosensibilidad, esofagitis (tomar con agua), trastornos GI.",
    "uses": "NAC (atípicos), EPI, infecciones por Rickettsia, acné.",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "broad",
      "route_hint": "both",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "rifampicina",
    "name": "Rifampicina",
    "family": "Rifamicinas",
    "mechanism": "Bactericida. Inhibe la ARN-polimerasa dependiente de ADN bacteriana",
    "spectrum": "Micobacterias (M. tuberculosis) y potentes sinergias contra Grampositivos (Estafilococos)",
    "dose": "600 mg/día o 10 mg/kg/día (Oral/IV)",
    "renal": "Clcr < 30 ml/min: 50-100% de la dosis normal",
    "contraindications": "Hipersensibilidad, porfiria, insuficiencia hepática grave",
    "adverse": "Coloración roja/naranja de secreciones (orina, lágrimas), hepatotoxicidad",
    "uses": "Tuberculosis (fase inicial y mantenimiento), brucelosis, endocarditis o infecciones por estafilococo (siempre combinada)",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "tigeciclina",
    "name": "Tigeciclina",
    "family": "Glicilciclina",
    "mechanism": "Derivado de tetraciclina que inhibe la síntesis proteica bacteriana.",
    "spectrum": "Muy amplio frente a multirresistentes (VRE, MRSA, BLEE). No cubre Pseudomonas ni Proteus.",
    "dose": "Dosis carga 100 mg IV, luego 50 mg IV c/12 h.",
    "renal": "No requiere ajuste renal habitual.",
    "contraindications": "Embarazo; mortalidad aumentada en algunos estudios (usar solo si no hay alternativa).",
    "adverse": "Náuseas y vómitos severos, pancreatitis.",
    "uses": "Infecciones intraabdominales complicadas o SSTI severas por resistentes.",
    "clinical_metadata": {
      "aware": "Reserve",
      "spectrum": "broad",
      "route_hint": "ev",
      "anti_pseudomonas": false,
      "anaerobic_activity": true,
      "oral_option": false
    }
  },
  {
    "id": "colistin",
    "name": "Colistín (Polimixina E)",
    "family": "Polimixina",
    "mechanism": "Detergente catiónico que rompe la membrana citoplasmática de Gramnegativos.",
    "spectrum": "Bacilos Gramnegativos pan-resistentes (XDR/PDR) incluyendo Pseudomonas y Acinetobacter.",
    "dose": "Dosis de carga 9 MUI IV, seguido de 4.5 MUI IV c/12 h (Dosis variable según guía local).",
    "renal": "Ajuste estricto requerido; Monitorizar creatinina y diuresis diariamente.",
    "contraindications": "Uso concomitante con otros nefrotóxicos si es posible evitarlo; Hipersensibilidad.",
    "adverse": "Nefrotoxicidad sistémica (AKI frec.), neurotoxicidad, parestesias.",
    "uses": "Rescate final en infecciones por gérmenes pan-resistentes en cuidados críticos.",
    "clinical_metadata": {
      "aware": "Reserve",
      "spectrum": "narrow",
      "route_hint": "ev",
      "anti_pseudomonas": true,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "aztreonam",
    "name": "Aztreonam",
    "family": "Monobactámico",
    "mechanism": "Bactericida. Inhibe síntesis de pared celular; activo exclusivamente contra Gramnegativos aerobios.",
    "spectrum": "Gramnegativos aerobios incluyendo Pseudomonas. NO activo contra Gram+ ni anaerobios.",
    "dose": "1-2 g IV c/8 h.",
    "renal": "Requiere ajuste en insuficiencia renal; Hemodiálisis: dosis suplementaria tras sesión.",
    "contraindications": "Hipersensibilidad. Precaución en alergia severa a beta-lactámicos (no reactividad cruzada con penicilinas).",
    "adverse": "Rash, elevación de transaminasas, diarrea asociada a C. difficile.",
    "uses": "Alternativa en alergia a beta-lactámicos para cobertura de Gramnegativos.",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "narrow",
      "route_hint": "ev",
      "anti_pseudomonas": true,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "dicloxacilina",
    "name": "Dicloxacilina",
    "family": "Penicilina resistente a beta-lactamasas (Isoxazolil)",
    "mechanism": "Bactericida. Inhibe la síntesis de la pared celular, resistente a penicilinasas",
    "spectrum": "Estafilococos productores de penicilinasa (S. aureus sensible a meticilina) y estreptococos",
    "dose": "Información no disponible",
    "renal": "",
    "contraindications": "Hipersensibilidad a penicilinas o betalactámicos",
    "adverse": "Exantema, molestias gastrointestinales, riesgo anafiláctico",
    "uses": "Infecciones de vías respiratorias, piel y tejidos blandos por estafilococos sensibles",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "oxacilina",
    "name": "Oxacilina",
    "family": "Penicilina resistente a beta-lactamasas (Grupo M)",
    "mechanism": "Bactericida. Inhibe la síntesis de la pared bacteriana. Resistente a penicilinasas estafilocócicas",
    "spectrum": "Bacterias Grampositivas, principalmente S. aureus sensible a meticilina (MSSA)",
    "dose": "8-12 g/día divididos en 4-6 dosis (IV en infusión lenta)",
    "renal": "",
    "contraindications": "Hipersensibilidad a penicilinas. Precaución en alergia a betalactámicos",
    "adverse": "Reacciones alérgicas, flebitis, alteraciones hepáticas",
    "uses": "Infecciones por estafilococos sensibles (respiratorias, neuromeníngeas, óseas, endocarditis), profilaxis neuroquirúrgica",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "sultamicilina",
    "name": "Sultamicilina",
    "family": "Penicilina + Inhibidor de beta-lactamasas",
    "mechanism": "Profármaco oral de ampicilina y sulbactam. Inhibe síntesis de pared y bloquea beta-lactamasas",
    "spectrum": "Gram+, Gram-, microorganismos productores de beta-lactamasas y Anaerobios",
    "dose": "375-750 mg c/12 h (Oral)",
    "renal": "Clcr 5-19 ml/min: 250-375 mg c/24 h; Clcr < 5 ml/min: 250-375 mg c/48 h",
    "contraindications": "Antecedente de hipersensibilidad a penicilinas o sulbactam",
    "adverse": "Colitis pseudomembranosa, sobrecrecimiento fúngico, diarrea",
    "uses": "Sinusitis, otitis media, neumonía, ITU, piel y partes blandas, gonorrea no complicada",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": true,
      "oral_option": true
    }
  },
  {
    "id": "cefalotina",
    "name": "Cefalotina",
    "family": "Cefalosporina de 1ª generación",
    "mechanism": "Bactericida. Inhibe la síntesis y reparación de pared bacteriana",
    "spectrum": "Grampositivos (estafilococos y estreptococos) y algunos Gramnegativos",
    "dose": "0.5-1 g c/4-6 h (IV/IM); infecciones críticas hasta 2 g c/4 h",
    "renal": "",
    "contraindications": "Alergia a cefalosporinas",
    "adverse": "Dolor en sitio de inyección, flebitis, hipersensibilidad",
    "uses": "Profilaxis quirúrgica (perioperatoria), infecciones estafilocócicas, infecciones respiratorias y de piel",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "cefoxitina",
    "name": "Cefoxitina",
    "family": "Cefalosporina de 2ª generación (Cefamicina)",
    "mechanism": "Bactericida. Inhibe la síntesis de la pared bacteriana",
    "spectrum": "Grampositivos, Gramnegativos y notable actividad contra Anaerobios (Bacteroides spp.)",
    "dose": "1-2 g c/6-8 h (IV)",
    "renal": "Clcr 10-29 ml/min: 1-2 g c/12-24 h; Clcr < 10 ml/min: 0.5-1 g c/24-48 h",
    "contraindications": "Alergia a cefalosporinas o betalactámicos",
    "adverse": "Reacciones de hipersensibilidad, flebitis en infusión",
    "uses": "Profilaxis quirúrgica (colorrectal, apendicectomía), infecciones intraabdominales y ginecológicas",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": true,
      "oral_option": false
    }
  },
  {
    "id": "cefixima",
    "name": "Cefixima",
    "family": "Cefalosporina de 3ª generación",
    "mechanism": "Bactericida. Inhibición de la síntesis de la pared celular bacteriana",
    "spectrum": "Actividad potente contra bacilos Gramnegativos (H. influenzae, E. coli, M. catarrhalis)",
    "dose": "400 mg/día o 200 mg c/12 h (Oral)",
    "renal": "Clcr < 20 ml/min o hemodiálisis: máximo 200 mg/día",
    "contraindications": "Alergia a cefalosporinas",
    "adverse": "Diarrea, riesgo de alteración de la flora intestinal",
    "uses": "Otitis media, sinusitis, exacerbación de bronquitis crónica, ITU no complicada, faringitis",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "ceftazidima_avibactam",
    "name": "Ceftazidima-Avibactam",
    "family": "Cefalosporina antipseudomónica + Inhibidor de beta-lactamasas",
    "mechanism": "Bactericida que inhibe pared celular, asociado a un inhibidor no betalactámico de betalactamasas (cubre KPC)",
    "spectrum": "Bacilos Gramnegativos multirresistentes, incluyendo productores de BLEE y carbapenemasas (KPC)",
    "dose": "2 g / 0.5 g c/8 h en infusión de 2 h (IV)",
    "renal": "Clcr 31-50: 1/0.25 g c/8 h; Clcr 16-30: 0.75/0.1875 g c/12 h; Clcr < 15: ajustar severamente",
    "contraindications": "Hipersensibilidad grave a betalactámicos, cefalosporinas o avibactam",
    "adverse": "Diarrea, test de Coombs positivo, posible nefrotoxicidad si se asocia a otros tóxicos",
    "uses": "Infección intraabdominal complicada, ITU complicada, neumonía intrahospitalaria por Gram- resistentes",
    "clinical_metadata": {
      "aware": "Reserve",
      "spectrum": "broad",
      "anti_pseudomonas": true,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "cefoperazona_sulbactam",
    "name": "Cefoperazona / Sulbactam",
    "family": "Cefalosporina de 3ª generación + Inhibidor de beta-lactamasas",
    "mechanism": "La cefoperazona actúa contra las bacterias inhibiendo la síntesis de pared; el sulbactam inactiva las beta-lactamasas impidiendo la destrucción antibiótica",
    "spectrum": "Enterobacterias y Pseudomonas aeruginosa",
    "dose": "1 - 2 g c/12 h (IV)",
    "renal": "Requiere ajuste en disfunción renal severa (ej. 1 g c/12 h o 500 mg c/12 h)",
    "contraindications": "Evaluar riesgo/beneficio. Evitar en casos de hipersensibilidad",
    "adverse": "",
    "uses": "",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "anti_pseudomonas": true,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "ceftarolina",
    "name": "Ceftarolina Fosamilo",
    "family": "Cefalosporina de 5ta generación",
    "mechanism": "Bactericida. Único betalactámico con alta afinidad por PBP2a; cubre MRSA.",
    "spectrum": "Amplia cobertura Grampositiva (MRSA, Neumococo resistente) y algunos Gramnegativos.",
    "dose": "600 mg IV c/12 h en infusión de 60 min.",
    "renal": "ClCr 30-50: 400 mg c/12 h; ClCr 15-30: 300 mg c/12 h.",
    "contraindications": "Alergia a cefalosporinas o betalactámicos.",
    "adverse": "Diarrea, exantema, test de Coombs positivo.",
    "uses": "SSTI complicada por MRSA, neumonía comunitaria grave.",
    "clinical_metadata": {
      "aware": "Reserve",
      "spectrum": "broad",
      "route_hint": "ev",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": false,
      "stewardship_flags": [
        "Único betalactámico anti-MRSA"
      ]
    }
  },
  {
    "id": "ceftobiprol",
    "name": "Ceftobiprol Medocarilo",
    "family": "Cefalosporina de 5ta generación",
    "mechanism": "Bactericida. Se une a PBPs incluyendo PBP2a del MRSA y PBP2x del neumococo resistente.",
    "spectrum": "Grampositivos (MRSA, Neumococo resistente) y Gramnegativos (limitado contra Pseudomonas).",
    "dose": "500 mg IV c/8 h en infusión de 2 h.",
    "renal": "ClCr 30-50: 500 mg c/12 h; ClCr < 30: 250 mg c/12 h.",
    "contraindications": "Hipersensibilidad a cefalosporinas.",
    "adverse": "Disgeusia, náuseas, vómitos.",
    "uses": "Neumonía intrahospitalaria (excluye NAVM), NAC grave.",
    "clinical_metadata": {
      "aware": "Reserve",
      "spectrum": "broad",
      "route_hint": "ev",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "doripenem",
    "name": "Doripenem",
    "family": "Carbapenémicos",
    "mechanism": "Bactericida. Inactiva PBPs esenciales, provocando inhibición de síntesis de pared celular",
    "spectrum": "Amplio: Gram+, Enterobacterias, Pseudomonas aeruginosa y Anaerobios",
    "dose": "500 mg c/8 h en infusión de 1-4 h (IV)",
    "renal": "Clcr 30-50 ml/min: 250 mg c/8 h; Clcr < 30 ml/min: 250 mg c/12 h",
    "contraindications": "Alergia a carbapenémicos o betalactámicos",
    "adverse": "Náuseas, diarrea, riesgo de convulsiones",
    "uses": "Neumonía nosocomial (incluyendo NAVM), infecciones intraabdominales y urinarias complicadas",
    "clinical_metadata": {
      "aware": "Reserve",
      "spectrum": "broad",
      "anti_pseudomonas": true,
      "anaerobic_activity": true,
      "oral_option": false
    }
  },
  {
    "id": "tobramicina",
    "name": "Tobramicina",
    "family": "Aminoglucósidos",
    "mechanism": "Bactericida. Inhibe la síntesis proteica uniéndose a la subunidad 30S ribosomal",
    "spectrum": "Bacilos Gramnegativos aerobios, especialmente Pseudomonas aeruginosa",
    "dose": "3 mg/kg/día o 1 mg/kg c/8 h (IV/IM); Inhalado: 300 mg c/12 h (en FQ)",
    "renal": "Requiere monitorización y ajuste estricto espaciando intervalos según clearance",
    "contraindications": "Alergia a aminoglucósidos",
    "adverse": "Ototoxicidad, nefrotoxicidad, bloqueo neuromuscular",
    "uses": "Infecciones graves por P. aeruginosa, fibrosis quística (inhalada), septicemia, infecciones urinarias complicadas",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "narrow",
      "anti_pseudomonas": true,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "teicoplanina",
    "name": "Teicoplanina",
    "family": "Glucopéptidos",
    "mechanism": "Bactericida. Inhibe la biosíntesis de la pared celular bacteriana",
    "spectrum": "Exclusivo para bacterias Grampositivas (S. aureus, SARM, Enterococcus)",
    "dose": "Carga: 6-12 mg/kg c/12 h por 3 dosis. Mantenimiento: 6-12 mg/kg/día (IV/IM)",
    "renal": "Clcr 30-80: 6-12 mg/kg c/48 h; Clcr < 30: 6-12 mg/kg c/72 h",
    "contraindications": "Hipersensibilidad a teicoplanina",
    "adverse": "Ototo y nefrotoxicidad (menor que vancomicina), erupción cutánea",
    "uses": "Infecciones graves por SARM, osteomielitis, endocarditis, neutropenia febril",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "polimixina_b",
    "name": "Polimixina B",
    "family": "Polimixinas",
    "mechanism": "Bactericida. Altera la permeabilidad de la membrana externa de bacterias Gramnegativas",
    "spectrum": "Bacilos Gramnegativos resistentes (P. aeruginosa, K. pneumoniae, Acinetobacter)",
    "dose": "15,000 - 25,000 U/kg/día divididos c/12 h (IV)",
    "renal": "No requiere ajuste de dosis (a diferencia del Colistín)",
    "contraindications": "Alergia a polimixinas. Evitar nefrotóxicos concurrentes",
    "adverse": "Nefrotoxicidad severa, neurotoxicidad, bloqueo neuromuscular",
    "uses": "Infecciones graves (bacteriemias, meningitis, NAC) por Pseudomonas o enterobacterias panresistentes",
    "clinical_metadata": {
      "aware": "Reserve",
      "spectrum": "narrow",
      "anti_pseudomonas": true,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "norfloxacino",
    "name": "Norfloxacino",
    "family": "Fluoroquinolonas",
    "mechanism": "Bactericida. Inhibe la ADN-girasa bacteriana",
    "spectrum": "Bacterias Gramnegativas del tracto urinario y gastrointestinal",
    "dose": "400 mg c/12 h (Oral)",
    "renal": "Clcr < 30 ml/min: 400 mg c/24 h",
    "contraindications": "Alergia a quinolonas, embarazo, lactancia, menores de 18 años",
    "adverse": "Tendinitis, alteraciones gastrointestinales, fototoxicidad",
    "uses": "Infecciones del tracto urinario, cistitis aguda no complicada, prostatitis",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "narrow",
      "anti_pseudomonas": true,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "isoniazida",
    "name": "Isoniazida",
    "family": "Hidrazidas (Antituberculoso)",
    "mechanism": "Bactericida. Inhibe la biosíntesis de ácido micólico de la pared micobacteriana",
    "spectrum": "Específico para Mycobacterium tuberculosis y M. bovis",
    "dose": "300 mg/día o 10-15 mg/kg/día (Oral)",
    "renal": "No requiere ajuste general, uso normal",
    "contraindications": "Daño hepático grave, antecedentes de hepatitis inducida por isoniazida",
    "adverse": "Hepatotoxicidad severa, neuropatía periférica (prevenida con piridoxina)",
    "uses": "Tuberculosis latente (quimioprofilaxis) y tuberculosis activa (en terapia combinada)",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "oxitetraciclina",
    "name": "Oxitetraciclina",
    "family": "Tetraciclinas",
    "mechanism": "Bacteriostático. Inhibidor de la síntesis proteica bacteriana por unión a la subunidad 30S",
    "spectrum": "Amplio espectro: Gram+, Gram-, atípicos y espiroquetas",
    "dose": "250 mg c/6 h o 500 mg c/12 h (Oral)",
    "renal": "",
    "contraindications": "Hipersensibilidad a tetraciclinas. Evitar exposición solar (fotosensibilidad)",
    "adverse": "Reacciones de fotosensibilidad, malestar gastrointestinal",
    "uses": "Infecciones ORL, dentales, gastrointestinales, genitourinarias, de piel, brucelosis y tifus",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "fenoximetilpenicilina",
    "name": "Fenoximetilpenicilina (Penicilina V)",
    "family": "Penicilinas sensibles a beta-lactamasa",
    "mechanism": "Bactericida. Bloquea la reparación y la síntesis de la pared bacteriana",
    "spectrum": "Estreptococos (incluyendo S. pyogenes) y algunos anaerobios orales",
    "dose": "500.000 - 1.000.000 UI c/12 h (Oral)",
    "renal": "",
    "contraindications": "Hipersensibilidad a penicilinas",
    "adverse": "Reacciones alérgicas, exantema cutáneo, molestias gastrointestinales leves",
    "uses": "Faringoamigdalitis estreptocócica, profilaxis de endocarditis y fiebre reumática",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": true,
      "oral_option": true
    }
  },
  {
    "id": "cefradina",
    "name": "Cefradina",
    "family": "Cefalosporina de 1ª generación",
    "mechanism": "Bactericida de amplio espectro. Inhibe la síntesis y reparación de pared bacteriana",
    "spectrum": "Grampositivos y selectos Gramnegativos",
    "dose": "250-500 mg c/6 h (Oral); 0.5-1 g c/6 h (IV/IM)",
    "renal": "Clcr 10-14 ml/min: 0.5 g c/24-40 h; Clcr < 10 ml/min: 0.5 g c/50-70 h",
    "contraindications": "Alergia a cefalosporinas",
    "adverse": "Diarrea, erupción cutánea, malestar general",
    "uses": "Infecciones genitourinarias, respiratorias, de piel y partes blandas",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "cefaclor",
    "name": "Cefaclor",
    "family": "Cefalosporina de 2ª generación",
    "mechanism": "Bactericida. Inhibe la síntesis de pared celular bacteriana",
    "spectrum": "Grampositivos y mayor cobertura de Gramnegativos (H. influenzae, M. catarrhalis) que 1ª generación",
    "dose": "250-500 mg c/8 h (Oral); máx. 4 g/día",
    "renal": "",
    "contraindications": "Hipersensibilidad a cefalosporinas",
    "adverse": "Riesgo de colitis pseudomembranosa, reacciones alérgicas",
    "uses": "Otitis media, infecciones respiratorias superiores e inferiores, ITU no complicada",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "loracarbef",
    "name": "Loracarbef",
    "family": "Cefalosporina de 2ª generación (Carbacefem)",
    "mechanism": "Bactericida. Inhibe la síntesis de la pared celular",
    "spectrum": "Grampositivos (S. pyogenes, S. aureus) y Gramnegativos (E. coli, H. influenzae)",
    "dose": "200-400 mg c/12 h (Oral)",
    "renal": "Clcr 10-49 ml/min: 50% de la dosis c/12 h o dosis normal c/24 h; Clcr < 10: dosis c/3-5 días",
    "contraindications": "Hipersensibilidad a cefalosporinas",
    "adverse": "",
    "uses": "Exacerbación de bronquitis, sinusitis, neumonía, ITU no complicada, infecciones de piel",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "cefoperazona",
    "name": "Cefoperazona",
    "family": "Cefalosporina de 3ª generación antipseudomónica",
    "mechanism": "Bactericida. Amplio espectro con acción preferente sobre Gram+, Gram- y Pseudomonas",
    "spectrum": "Bacterias Gram+, Gram- y Pseudomonas aeruginosa",
    "dose": "2-4 g/día divididos c/12 h; infecciones graves hasta 6-12 g/día (IV/IM)",
    "renal": "",
    "contraindications": "Alergia a cefalosporinas",
    "adverse": "Disfunción hepática leve, reacciones de hipersensibilidad",
    "uses": "Infecciones respiratorias, ITU, peritonitis, septicemias, infecciones ginecológicas",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "anti_pseudomonas": true,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "ceftibuteno",
    "name": "Ceftibuteno",
    "family": "Cefalosporina de 3ª generación",
    "mechanism": "Bactericida. Inhibe la síntesis de pared celular bacteriana. Estable frente a beta-lactamasas",
    "spectrum": "Enterobacterias y patógenos respiratorios (H. influenzae)",
    "dose": "400 mg 1 vez/día (Oral)",
    "renal": "Clcr 30-49: 200 mg/24 h o 400 mg/48 h; Clcr 5-29: 100 mg/24 h o 400 mg/96 h",
    "contraindications": "Hipersensibilidad a cefalosporinas",
    "adverse": "",
    "uses": "Exacerbación aguda de bronquitis crónica, sinusitis bacteriana, ITU",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "cefdinir",
    "name": "Cefdinir",
    "family": "Cefalosporina de 3ª generación",
    "mechanism": "Bactericida. Inhibe la síntesis de la pared celular bacteriana",
    "spectrum": "Grampositivos (S. aureus MSSA, S. pyogenes) y Gramnegativos respiratorios",
    "dose": "300 mg c/12 h o 600 mg c/24 h (Oral)",
    "renal": "Clcr < 30 ml/min: máximo 300 mg/día",
    "contraindications": "Alergia a cefalosporinas",
    "adverse": "Heces rojizas, diarrea, molestias gastrointestinales",
    "uses": "Neumonía comunitaria leve, exacerbación de bronquitis crónica, sinusitis aguda, infecciones de piel",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "ceftobiprol_medocarilo",
    "name": "Ceftobiprol Medocarilo",
    "family": "Cefalosporina de 5ª generación",
    "mechanism": "Bactericida. Inhibe síntesis de pared celular, uniéndose a PBPs (incluida PBP2a del SARM)",
    "spectrum": "Grampositivos (incluyendo SARM y S. pneumoniae resistente) y Gramnegativos (pseudomonas limitada)",
    "dose": "500 mg c/8 h en infusión de 2 h (IV)",
    "renal": "Clcr 30-50: 500 mg c/12 h; Clcr < 30: 250 mg c/12 h",
    "contraindications": "Hipersensibilidad a cefalosporinas",
    "adverse": "Disgeusia, náuseas, vómitos",
    "uses": "Neumonía intrahospitalaria (excluyendo NAVM), Neumonía adquirida en la comunidad severa",
    "clinical_metadata": {
      "aware": "Reserve",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "ceftarolina_fosamilo",
    "name": "Ceftarolina Fosamilo",
    "family": "Cefalosporina de 5ª generación",
    "mechanism": "Bactericida. Inhibe la pared celular uniéndose fuertemente a PBP2a y PBP2x",
    "spectrum": "Amplia cobertura Grampositiva (SARM y Neumococo resistente) y algunos Gramnegativos",
    "dose": "600 mg c/12 h en infusión de 60 min (IV)",
    "renal": "Clcr 30-50: 400 mg c/12 h; Clcr 15-30: 300 mg c/12 h",
    "contraindications": "Alergia a cefalosporinas o betalactámicos",
    "adverse": "Diarrea, erupción cutánea, test de Coombs positivo",
    "uses": "Infecciones complicadas de piel y tejidos blandos (SARM), Neumonía comunitaria grave",
    "clinical_metadata": {
      "aware": "Reserve",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "sulfametoxazol_trimetoprima",
    "name": "Sulfametoxazol-Trimetoprima (Cotrimoxazol)",
    "family": "Sulfonamida + Diaminopirimidina",
    "mechanism": "Bacteriostático dual que inhibe pasos secuenciales en la síntesis de ácido fólico bacteriano",
    "spectrum": "Bacterias Gram+, Gram- (incluyendo SARM comunitario) y Pneumocystis jirovecii",
    "dose": "800/160 mg c/12 h (Oral/IV); Dosis altas para Pneumocystis: 15-20 mg/kg/día de TMP divididos c/6-8 h",
    "renal": "Clcr 15-30 ml/min: reducir a la mitad; Clcr < 15 ml/min: evitar o uso condicionado",
    "contraindications": "Alergia a sulfamidas, deficiencia de G6PD, primer trimestre de embarazo, lactantes menores de 2 meses",
    "adverse": "Reacciones cutáneas severas (DRESS, SSJ), hiperpotasemia, nefrotoxicidad, supresión medular",
    "uses": "Tratamiento y profilaxis de P. jirovecii, infecciones urinarias, nocardiosis, listeriosis, toxoplasmosis",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "cloranfenicol",
    "name": "Cloranfenicol",
    "family": "Anfenicoles",
    "mechanism": "Bacteriostático de amplio espectro. Interfiere en la síntesis proteica bacteriana",
    "spectrum": "Amplio espectro: Salmonella typhi, H. influenzae, bacterias Gramnegativas y Rickettsias",
    "dose": "Información no disponible",
    "renal": "",
    "contraindications": "Evaluar riesgo/beneficio severo. Evitar uso a menos que no haya otra alternativa",
    "adverse": "",
    "uses": "Infección aguda por Salmonella typhi, infecciones graves por H. influenzae meningítica, bacteriemia, psitacosis",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "metampicilina",
    "name": "Metampicilina",
    "family": "Penicilinas de amplio espectro",
    "mechanism": "Bactericida. Inhibe la síntesis y la reparación de la pared bacteriana",
    "spectrum": "Amplio espectro frente a Grampositivos y Gramnegativos sensibles",
    "dose": "250-500 mg c/6 h (Oral). Neumonía: 500 mg c/6 h",
    "renal": "Clcr 10-50 ml/min: administrar 1/2 de la dosis habitual",
    "contraindications": "Hipersensibilidad a penicilinas o betalactámicos",
    "adverse": "",
    "uses": "Faringitis, otitis media, neumonía, gonorrea, infecciones de piel y tejidos blandos, meningitis",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "bencilpenicilina_benzatina",
    "name": "Bencilpenicilina Benzatina (Penicilina G Benzatina)",
    "family": "Penicilinas sensibles a beta-lactamasa",
    "mechanism": "Bactericida de depósito. Bloquea síntesis de pared bacteriana y mantiene niveles duraderos en sangre",
    "spectrum": "Estreptococos, neumococos y espiroquetas (Treponema pallidum)",
    "dose": "1.2 a 2.4 millones UI (IM) en dosis única o según protocolo (cada 4 semanas para profilaxis)",
    "renal": "",
    "contraindications": "Alergia a penicilinas",
    "adverse": "Reacciones anafilácticas, dolor en el sitio de inyección",
    "uses": "Sífilis, prevención de faringitis estreptocócica, profilaxis de enfermedad reumática",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "ticarcilina_acido_clavulanico",
    "name": "Ticarcilina-Ácido Clavulánico",
    "family": "Penicilina antipseudomónica + Inhibidor de beta-lactamasas",
    "mechanism": "Inhibe la síntesis de pared bacteriana mientras el clavulanato bloquea las beta-lactamasas",
    "spectrum": "Klebsiella spp, E. coli, S. aureus, P. aeruginosa y anaerobios como Bacteroides fragilis",
    "dose": "Información no disponible",
    "renal": "",
    "contraindications": "Alergia a penicilinas o inhibidores de beta-lactamasas",
    "adverse": "",
    "uses": "Septicemias, infecciones respiratorias bajas, osteoarticulares, ginecológicas e intraabdominales (peritonitis)",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "anti_pseudomonas": true,
      "anaerobic_activity": true,
      "oral_option": false
    }
  },
  {
    "id": "cefprozilo",
    "name": "Cefprozilo",
    "family": "Cefalosporina de 2ª generación",
    "mechanism": "Bactericida. Inhibe la síntesis de pared celular bacteriana",
    "spectrum": "Grampositivos (S. pyogenes, S. pneumoniae, S. aureus) y respiratorios (H. influenzae, M. catarrhalis)",
    "dose": "250-500 mg c/12-24 h (Oral)",
    "renal": "",
    "contraindications": "Hipersensibilidad a cefalosporinas",
    "adverse": "",
    "uses": "Faringitis, otitis media, sinusitis, exacerbación de bronquitis, neumonía, infecciones de piel",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "cefminox",
    "name": "Cefminox",
    "family": "Cefalosporina de 2ª generación (Cefamicina)",
    "mechanism": "Bactericida de amplio espectro. Inhibe la síntesis de pared celular",
    "spectrum": "Bacilos Gramnegativos, Grampositivos y actividad destacada frente a anaerobios",
    "dose": "2 g c/12 h (IV)",
    "renal": "Ajuste necesario en insuficiencia renal grave según características del paciente",
    "contraindications": "Hipersensibilidad a betalactámicos",
    "adverse": "",
    "uses": "Infecciones mixtas, peritonitis secundaria, profilaxis quirúrgica intraabdominal",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": true,
      "oral_option": false
    }
  },
  {
    "id": "cefpiroma",
    "name": "Cefpiroma",
    "family": "Cefalosporina de 4ª generación",
    "mechanism": "Bactericida. Altera síntesis de peptidoglicano. Alta estabilidad frente a beta-lactamasas",
    "spectrum": "Amplio espectro: cocos Grampositivos y bacilos Gramnegativos resistentes",
    "dose": "1-2 g c/12 h (IV en infusión de 20-30 min)",
    "renal": "Clcr 20-50: 1-2 g de ataque, luego 0.5-1 g c/12 h; Clcr < 20: reducir dosis a c/24 h",
    "contraindications": "Hipersensibilidad a cefalosporinas",
    "adverse": "",
    "uses": "Infección respiratoria baja grave, infección urinaria complicada, septicemia, bacteriemia",
    "clinical_metadata": {
      "aware": "Reserve",
      "spectrum": "broad",
      "anti_pseudomonas": true,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "meropenem_vaborbactam",
    "name": "Meropenem-Vaborbactam",
    "family": "Carbapenémico + Inhibidor de beta-lactamasas",
    "mechanism": "Meropenem inhibe la pared celular; vaborbactam protege inhibiendo serina betalactamasas (clase A y C)",
    "spectrum": "Enterobacterias productoras de carbapenemasas (KPC). Inactivo frente a metalo-beta-lactamasas (NDM)",
    "dose": "Información no disponible",
    "renal": "",
    "contraindications": "Hipersensibilidad a carbapenémicos o betalactámicos",
    "adverse": "",
    "uses": "Infecciones intraabdominales, urinarias o neumonías nosocomiales graves por Gramnegativos multirresistentes",
    "clinical_metadata": {
      "aware": "Reserve",
      "spectrum": "broad",
      "anti_pseudomonas": true,
      "anaerobic_activity": true,
      "oral_option": false
    }
  },
  {
    "id": "eritromicina",
    "name": "Eritromicina",
    "family": "Macrólidos",
    "mechanism": "Bacteriostático. Se une a la subunidad 50S ribosomal inhibiendo la síntesis proteica",
    "spectrum": "S. pyogenes, S. aureus (MSSA), Campylobacter jejuni, Corynebacterium y Atípicos",
    "dose": "250-500 mg c/6 h (Oral); 500 mg-1 g c/6 h (IV)",
    "renal": "100% de la dosis (no requiere ajuste severo)",
    "contraindications": "Alergia a macrólidos",
    "adverse": "Molestias gastrointestinales severas, riesgo de estenosis pilórica hipertrófica en lactantes, disfunción hepática",
    "uses": "NAC leve, eritrasma, enterocolitis por Campylobacter, tos ferina, profilaxis de difteria",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "estreptomicina",
    "name": "Estreptomicina",
    "family": "Aminoglucósidos",
    "mechanism": "Bactericida. Inhibe la síntesis proteica bacteriana uniéndose al ribosoma",
    "spectrum": "Bacilos Gramnegativos y Micobacterias (incluyendo M. tuberculosis)",
    "dose": "Información no disponible",
    "renal": "Requiere monitorización estricta por excreción renal",
    "contraindications": "Embarazo (riesgo de sordera bilateral irreversible fetal)",
    "adverse": "Ototoxicidad severa, nefrotoxicidad",
    "uses": "Tuberculosis, brucelosis (asociado a doxiciclina)",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "neomicina",
    "name": "Neomicina",
    "family": "Aminoglucósidos",
    "mechanism": "Inhibe la síntesis de proteínas bacterianas",
    "spectrum": "Bacterias Gramnegativas en el lumen intestinal",
    "dose": "500 mg (uso tópico/oral para efecto local intestinal)",
    "renal": "Precaución en absorción sistémica",
    "contraindications": "Hipersensibilidad a aminoglucósidos",
    "adverse": "Altamente ototóxico y nefrotóxico si alcanza circulación sistémica",
    "uses": "Preparación y descontaminación de colon en cirugía colorrectal electiva (junto a eritromicina o metronidazol)",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "ofloxacino",
    "name": "Ofloxacino",
    "family": "Fluoroquinolonas",
    "mechanism": "Bactericida. Inhibe las topoisomerasas bacterianas (ADN girasa y Topo IV)",
    "spectrum": "Grampositivos, Gramnegativos y Atípicos",
    "dose": "200-400 mg c/12 h (Oral)",
    "renal": "",
    "contraindications": "Embarazo, lactancia, alergia a quinolonas",
    "adverse": "Tendinitis, rotura tendinosa, alteraciones del SNC (ansiedad, insomnio, neuropatía), fotosensibilidad",
    "uses": "Infecciones urinarias y prostatitis, diarrea del viajero, infecciones de piel y respiratorias",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "anti_pseudomonas": true,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "delafloxacino",
    "name": "Delafloxacino",
    "family": "Fluoroquinolonas",
    "mechanism": "Bactericida aniónico. Inhibe la ADN girasa y la topoisomerasa IV",
    "spectrum": "Grampositivos (incluyendo SAMR y Enterococcus faecalis) y selectos Gramnegativos",
    "dose": "450 mg (Oral) / 300 mg (IV)",
    "renal": "",
    "contraindications": "Alergia a fluoroquinolonas",
    "adverse": "",
    "uses": "Infecciones bacterianas agudas de la piel y de estructuras de la piel (ABSSSI) por SAMR",
    "clinical_metadata": {
      "aware": "Reserve",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "quinupristina_dalfopristina",
    "name": "Quinupristina / Dalfopristina",
    "family": "Estreptograminas",
    "mechanism": "Inhibición sinérgica de la síntesis proteica bacteriana",
    "spectrum": "Grampositivos resistentes: Estafilococos, Estreptococos y E. faecium resistente a vancomicina (VRE)",
    "dose": "Información no disponible",
    "renal": "",
    "contraindications": "Usar solo sin alternativas disponibles",
    "adverse": "",
    "uses": "Neumonía nosocomial por cepas resistentes, infecciones cutáneas por E. faecium VRE",
    "clinical_metadata": {
      "aware": "Reserve",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "rifabutina",
    "name": "Rifabutina",
    "family": "Rifamicinas",
    "mechanism": "Inhibe la ARN-polimerasa ADN-dependiente micobacteriana",
    "spectrum": "Mycobacterium tuberculosis y Complejo Mycobacterium avium (MAC)",
    "dose": "Información no disponible",
    "renal": "",
    "contraindications": "Precaución en uso concomitante con terapias antirretrovirales",
    "adverse": "",
    "uses": "Tratamiento de tuberculosis multirresistente y profilaxis de MAC en pacientes con VIH avanzado",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "pirazinamida",
    "name": "Pirazinamida",
    "family": "Antituberculoso",
    "mechanism": "Bactericida. Actúa sobre bacilos intracelulares en medio ácido",
    "spectrum": "Exclusivo para Mycobacterium tuberculosis",
    "dose": "25 mg/kg c/24 h (Oral)",
    "renal": "Clcr < 20 ml/min: 25 mg/kg c/48 h. Diálisis: dosis post-hemodiálisis",
    "contraindications": "Insuficiencia hepática grave",
    "adverse": "Hepatotoxicidad severa, hiperuricemia, ictericia",
    "uses": "Tratamiento combinado de primera línea de la tuberculosis activa",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "bedaquilina",
    "name": "Bedaquilina",
    "family": "Diarilquinolinas (Antituberculoso)",
    "mechanism": "Bactericida específico. Inhibe la bomba de ATP sintasa micobacteriana",
    "spectrum": "Mycobacterium tuberculosis",
    "dose": "Terapia administrada junto a comidas (Oral)",
    "renal": "Precaución en falla renal grave o diálisis",
    "contraindications": "Uso concomitante con otros fármacos que prolonguen el intervalo QT",
    "adverse": "Prolongación del intervalo QTc, hepatotoxicidad",
    "uses": "Tuberculosis pulmonar multirresistente (combinado con al menos otros 3 agentes)",
    "clinical_metadata": {
      "aware": "Reserve",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "etambutol",
    "name": "Etambutol",
    "family": "Antituberculoso",
    "mechanism": "Bacteriostático. Interfiere en la síntesis de la pared celular micobacteriana",
    "spectrum": "Micobacterias típicas (M. tuberculosis) y atípicas",
    "dose": "15-25 mg/kg/día (Oral)",
    "renal": "Clcr 10-29 ml/min: 15-25 mg/kg c/36-48 h; Clcr < 10 ml/min: 15 mg/kg c/48 h",
    "contraindications": "Menores de 13 años, neuritis óptica previa",
    "adverse": "Neuritis óptica (disminución de la agudeza visual, ceguera a los colores)",
    "uses": "Tratamiento de tuberculosis e infecciones por micobacterias atípicas",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "rifaximina",
    "name": "Rifaximina",
    "family": "Rifamicinas",
    "mechanism": "Bactericida local (no absorbible). Inhibe la síntesis de ARN bacteriano",
    "spectrum": "Flora bacteriana gastrointestinal",
    "dose": "Mayores de 12 años: 400 mg c/8 h (Oral); Máx: 1600 mg/día",
    "renal": "Acción intraluminal, sin gran ajuste sistémico",
    "contraindications": "",
    "adverse": "",
    "uses": "Diarrea del viajero, profilaxis de encefalopatía hepática y modulación de microbiota entérica",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "flucloxacilina",
    "name": "Flucloxacilina",
    "family": "Penicilinas (Grupo Isoxazolil)",
    "mechanism": "Antibiótico con actividad bactericida",
    "spectrum": "Gérmenes productores de betalactamasa",
    "dose": "250 mg - 500 mg (Oral). Administrar alejado de alimentos (1-2 hr)",
    "renal": "",
    "contraindications": "Administrar con precaución",
    "adverse": "",
    "uses": "",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "cefotaxima",
    "name": "Cefotaxima",
    "family": "Cefalosporina de 3ª generación",
    "mechanism": "Bactericida. Inhibe la síntesis de la pared celular bacteriana",
    "spectrum": "Amplio espectro frente a gérmenes sensibles de vías respiratorias, urinarias, SNC, piel y abdomen",
    "dose": "1 - 2 g c/6-8 h o c/8-12 h",
    "renal": "Ajuste progresivo: 1-2 g c/12 h; 1-2 g c/12-24 h; 1-2 g c/24 h + suplemento post hemodiálisis (500 mg - 1 g)",
    "contraindications": "Evaluar riesgo/beneficio. Evitar en casos de hipersensibilidad",
    "adverse": "",
    "uses": "Infecciones ORL, respiratorias (incluye neumonía nosocomial), urinarias complicadas (pielonefritis), ETS, bacteriemia, meningitis (salvo Listeria), intraabdominales y osteoarticulares",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "ceftolozano_tazobactam",
    "name": "Ceftolozano / Tazobactam",
    "family": "Cefalosporina + Inhibidor de beta-lactamasa",
    "mechanism": "Bactericida. Inhibe la pared celular; el tazobactam protege al ceftolozano frente a la inactivación por beta-lactamasas",
    "spectrum": "Bacterias Gramnegativas y Grampositivas. Requiere asociación con metronidazol para cobertura de patógenos anaerobios",
    "dose": "1.5 g (1 g/0.5 g) c/8 h o 3 g (2 g/1 g) c/8 h en perfusión IV de 1 hora",
    "renal": "Ajuste según filtrado glomerular: 750 mg-1.5 g c/8 h; 375-750 mg c/8 h; o 150-450 mg c/8 h",
    "contraindications": "",
    "adverse": "",
    "uses": "Infección intraabdominal complicada, infección del tracto urinario complicada (pielonefritis aguda), neumonía intrahospitalaria y neumonía asociada a la ventilación mecánica",
    "clinical_metadata": {
      "aware": "Reserve",
      "spectrum": "broad",
      "anti_pseudomonas": true,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "dapsona",
    "name": "Dapsona",
    "family": "Medicamentos para el tratamiento de la lepra",
    "mechanism": "",
    "spectrum": "",
    "dose": "Información no disponible",
    "renal": "",
    "contraindications": "Evitar uso sin evaluación clínica previa",
    "adverse": "Puede afectar a la capacidad de conducir",
    "uses": "Tratamiento de la lepra",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  },
  {
    "id": "rifapentina",
    "name": "Rifapentina",
    "family": "Información no disponible",
    "mechanism": "",
    "spectrum": "",
    "dose": "Información no disponible",
    "renal": "",
    "contraindications": "",
    "adverse": "",
    "uses": "",
    "clinical_metadata": {
      "aware": "Watch",
      "spectrum": "narrow",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": false
    }
  },
  {
    "id": "tetraciclina",
    "name": "Tetraciclina",
    "family": "Tetraciclinas",
    "mechanism": "Antibiótico bacteriostático que inhibe la síntesis proteica bacteriana",
    "spectrum": "Amplio espectro de microorganismos sensibles",
    "dose": "500 mg (Oral). Ingerir con abundante agua, alejar de alimentos y cationes",
    "renal": "",
    "contraindications": "Contraindicado. Evitar uso en grupos de riesgo",
    "adverse": "Puede producir reacciones de fotosensibilidad (evitar exponerse a la luz solar o rayos UVA)",
    "uses": "Tratamiento de infecciones causadas por cepas de microorganismos sensibles",
    "clinical_metadata": {
      "aware": "Access",
      "spectrum": "broad",
      "anti_pseudomonas": false,
      "anaerobic_activity": false,
      "oral_option": true
    }
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = antibiotics;
} else if (typeof window !== "undefined") {
  window.abg_antibiotics = antibiotics;
}
