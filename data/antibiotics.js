/**
 * @fileoverview ANTIBIOTICS DATA (Enriched via NotebookLM + Manual Clinical Refinement)
 * 
 * ARCHITECTURAL CONTRACT (Clinical vs Presentation):
 * This file contains the primary vocabulary for drugs and their properties.
 */

const antibiotics = [
  // --- PENICILINAS ---
  {
    id: "amoxicilina",
    name: "Amoxicilina",
    family: "Aminopenicilina",
    mechanism: "Bactericida. Inhibe la síntesis de pared celular (PBP).",
    spectrum: "Grampositivos (Streptococcus spp. sensibles) y algunos Gramnegativos.",
    dose: "500 mg - 1 g PO c/8h (Dosis alta en NAC según riesgo/resistencia local).",
    renal: "ClCr 10-29 mL/min: 250-500 mg c/12h; ClCr < 10 mL/min: 250-500 mg c/24h.",
    contraindications: "Hipersensibilidad a penicilinas.",
    adverse: "Diarrea, exantema morbiliforme, náuseas.",
    uses: "NAC ambulatoria, faringitis estreptocócica, infecciones odontogénicas sensibles.",
    synonyms: ["amoxicillin"],
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "vo",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true
    }
  },
  {
    id: "amoxicilina_clavulanico",
    name: "Amoxicilina-Clavulánico",
    family: "Penicilina + Inhibidor de beta-lactamasas",
    mechanism: "Bactericida por inhibición de pared celular asociado a inhibición irreversible de beta-lactamasas.",
    spectrum: "Grampositivos, Gramnegativos y anaerobios productores de beta-lactamasas.",
    dose: "875/125 mg PO c/12h o 500/125 mg PO c/8h.",
    renal: "ClCr 10-29 mL/min: 250-500 mg c/12h; ClCr < 10 mL/min: 250-500 mg c/24h.",
    contraindications: "Alergia a penicilinas; antecedente de ictericia colestásica por el fármaco.",
    adverse: "Diarrea (frecuente), náuseas, candidiasis, riesgo de enterocolitis en neonatos.",
    uses: "Sinusitis, NAC con comorbilidad, mordeduras, infecciones de tracto biliar.",
    synonyms: ["amoxi clav", "amoxiclav", "augmentin"],
    clinical_metadata: {
      aware: "Access",
      spectrum: "broad",
      route_hint: "both",
      anti_pseudomonas: false,
      anaerobic_activity: true,
      oral_option: true
    }
  },
  {
    id: "ampicilina",
    name: "Ampicilina",
    family: "Aminopenicilina",
    mechanism: "Bactericida. Inhibe la síntesis y reparación de la pared bacteriana.",
    spectrum: "Enterococcus faecalis, Listeria monocytogenes, algunos Gramnegativos.",
    dose: "2 g IV c/4-6 h (Especialmente en Meningitis/Listeria) o 500 mg PO c/6 h.",
    renal: "ClCr 10-29 mL/min: 1-2 g IV c/8-12 h; ClCr < 10 mL/min: 1-2 g IV c/12-24 h.",
    contraindications: "Hipersensibilidad a penicilinas.",
    adverse: "Exantema, diarrea, elevación transitoria de enzimas hepáticas.",
    uses: "Listeria (meningitis), Enterococo sensible, endocarditis (en combinación).",
    clinical_metadata: {
      aware: "Access",
      spectrum: "broad",
      route_hint: "both",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true
    }
  },
  {
    id: "ampicilina_sulbactam",
    name: "Ampicilina-Sulbactam",
    family: "Penicilina + Inhibidor de beta-lactamasas",
    mechanism: "Asociación de bactericida inhibidor de la pared celular con inhibidor irreversible de beta-lactamasas.",
    spectrum: "Grampositivos, Gramnegativos y anaerobios productores de beta-lactamasas (No Pseudomonas).",
    dose: "1.5 - 3 g IV c/6 h.",
    renal: "ClCr 10-29 mL/min: 1.5-3 g IV c/12h; ClCr < 10 mL/min: 1.5-3 g IV c/24h.",
    contraindications: "Hipersensibilidad a penicilinas o sulbactam.",
    adverse: "Dolor en sitio de inyección, diarrea, rash.",
    uses: "Infecciones intraabdominales, neumonía aspirativa, profilaxis quirúrgica abdominal.",
    synonyms: ["unasyn"],
    clinical_metadata: {
      aware: "Access",
      spectrum: "broad",
      route_hint: "ev",
      anti_pseudomonas: false,
      anaerobic_activity: true,
      oral_option: false
    }
  },
  {
    id: "cloxacilina",
    name: "Cloxacilina",
    family: "Penicilina antiestafilocócica",
    mechanism: "Bactericida. Resistente a penicilinasas estafilocócicas.",
    spectrum: "S. aureus sensible a meticilina (MSSA) y Streptococcus spp. (excluyendo Enterococcus).",
    dose: "2 g IV c/4-6h (~12 g/día para endocarditis) o 500 mg PO c/6h.",
    renal: "Ajuste no suele ser necesario salvo falla renal extrema (monitorizar).",
    contraindications: "Alergia a penicilinas.",
    adverse: "Hepatotoxicidad colestásica, nefritis intersticial, riesgo de flebitis.",
    uses: "Endocarditis bacteriana MSSA, SSTI grave MSSA.",
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "both",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true
    }
  },
  {
    id: "penicilina_g",
    name: "Penicilina G (Sódica)",
    family: "Penicilina natural",
    mechanism: "Bactericida. Bloquea la síntesis de la pared celular bacteriana.",
    spectrum: "Streptococcus spp., Neisseria meningitidis, Treponema pallidum y Clostridium spp.",
    dose: "2 a 4 MUI IV c/4 h (Dosis total 12-24 MUI/día).",
    renal: "ClCr 10-29 mL/min: 2-3 MUI c/4-6 h; ClCr < 10 mL/min: 1-2 MUI c/6 h.",
    contraindications: "Alergia a penicilinas.",
    adverse: "Convulsiones (dosis altas o falla renal no ajustada), hipopotasemia.",
    uses: "Meningitis meningocócica, endocarditis estreptocócica, sífilis neurológica, tétanos.",
    synonyms: ["bencilpenicilina"],
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "ev",
      anti_pseudomonas: false,
      anaerobic_activity: true,
      oral_option: false
    }
  },
  {
    id: "penicilina_v",
    name: "Penicilina V",
    family: "Penicilina (oral)",
    mechanism: "Inhibe síntesis de pared celular.",
    spectrum: "Estreptococos (GAS).",
    dose: "500 mg PO c/12h",
    renal: "Ajustar en IR significativa.",
    contraindications: "Alergia a penicilinas.",
    adverse: "Hipersensibilidad, GI.",
    uses: "Faringitis estreptocócica.",
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "vo",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true
    }
  },
  {
    id: "penicilina_g_benzatinica",
    name: "Penicilina G Benzatínica",
    family: "Penicilina (IM depósito)",
    mechanism: "Inhibe síntesis de pared celular.",
    spectrum: "Estreptococos sensibles.",
    dose: "1.2 millones UI IM dosis única",
    renal: "Sin ajuste habitual.",
    contraindications: "Alergia a penicilinas.",
    adverse: "Dolor local, hipersensibilidad.",
    uses: "Faringitis estreptocócica (adherencia).",
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "ev",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: false
    }
  },
  {
    id: "piperacilina_tazobactam",
    name: "Piperacilina-Tazobactam",
    family: "Penicilina antipseudomónica + Inhibidor de beta-lactamasas",
    mechanism: "Bactericida inhibidor de pared celular asociado a inhibidor de beta-lactamasas.",
    spectrum: "Muy amplio: Pseudomonas aeruginosa, Enterobacterales, Grampositivos y Anaerobios.",
    dose: "4.5 g IV c/6-8 h (Considerar infusión extendida de 4h en sepsis/VAP).",
    renal: "ClCr 20-40 mL/min: 2.25 g c/6h; ClCr < 20 mL/min: 2.25 g c/8h.",
    contraindications: "Hipersensibilidad a penicilinas, cefalosporinas o inhibidores de beta-lactamasas.",
    adverse: "Diarrea, nefritis intersticial, trombocitopenia (uso prolongado).",
    uses: "Sepsis de origen desconocido, neumonía intrahospitalaria, neutropenia febril.",
    synonyms: ["tazocin"],
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: true,
      oral_option: false,
      stewardship_flags: ["Uso restringido nosocomial"]
    }
  },

  // --- CEFALOSPORINAS ---
  {
    id: "cefazolina",
    name: "Cefazolina",
    family: "Cefalosporina de 1ra generación",
    mechanism: "Bactericida. Inhibe la síntesis de pared bacteriana.",
    spectrum: "Cocos Grampositivos (MSSA) y algunos bacilos Gramnegativos (E. coli sensible).",
    dose: "1-2 g IV c/8 h.",
    renal: "ClCr 10-29 mL/min: 1-2 g c/12 h; ClCr < 10 mL/min: 1-2 g c/24 h.",
    contraindications: "Hipersensibilidad a cefalosporinas.",
    adverse: "Hipersensibilidad, diarrea, flebitis.",
    uses: "Profilaxis quirúrgica (elección), celulitis MSSA bacteriemia.",
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "ev",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: false
    }
  },
  {
    id: "cefadroxilo",
    name: "Cefadroxilo",
    family: "Cefalosporina de 1ra generación (Oral)",
    mechanism: "Bactericida por inhibición de síntesis de pared.",
    spectrum: "Grampositivos y algunos Gramnegativos (especialmente urinarios).",
    dose: "500 mg - 1 g PO c/12 h.",
    renal: "ClCr 10-29 mL/min: 500 mg-1 g c/24 h; ClCr < 10 mL/min: 500 mg-1 g c/48 h.",
    contraindications: "Hipersensibilidad a cefalosporinas.",
    adverse: "GI, exantema, raramente neutropenia.",
    uses: "Cistitis no complicada, infecciones de piel y partes blandas leves.",
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "vo",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true
    }
  },
  {
    id: "cefalexina",
    name: "Cefalexina",
    family: "Cefalosporina 1ra gen (oral)",
    mechanism: "Inhibe síntesis de pared celular.",
    spectrum: "MSSA, estreptococos.",
    dose: "500 mg PO c/6h (o c/8h según caso)",
    renal: "Ajustar en insuficiencia renal.",
    contraindications: "Alergia grave a beta-lactámicos.",
    adverse: "Hipersensibilidad, diarrea.",
    uses: "Celulitis no purulenta, cistitis seleccionada.",
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "vo",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true
    }
  },
  {
    id: "cefuroxima",
    name: "Cefuroxima",
    family: "Cefalosporina de 2ra generación",
    mechanism: "Bactericida por inhibición de síntesis de pared.",
    spectrum: "Grampositivos y mayor cobertura contra Gramnegativos (E. coli, H. influenzae) que 1ra gen.",
    dose: "750 mg - 1.5 g IV c/8 h o 250-500 mg PO c/12 h.",
    renal: "ClCr 10-29 mL/min: 750 mg-1.5 g c/12 h (IV); ClCr < 10 mL/min: 750 mg-1.5 g c/24 h (IV).",
    contraindications: "Hipersensibilidad a cefalosporinas.",
    adverse: "Diarrea, nefritis intersticial (raro), elevación transitoria de transaminasas.",
    uses: "Infecciones respiratorias bajas, profilaxis quirúrgica seleccionada.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "both",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true
    }
  },
  {
    id: "ceftriaxona",
    name: "Ceftriaxona",
    family: "Cefalosporina de 3ra generación",
    mechanism: "Bactericida. Inhibe la síntesis de pared celular bacteriana.",
    spectrum: "Gram-, Streptococci. No Pseudomonas, no Enterococos.",
    dose: "1-2 g IV c/24h (2 g IV c/12h en Meningitis/Endocarditis).",
    renal: "No requiere ajuste significativo ante falla renal aislada (eliminación biliar).",
    contraindications: "Alergia grave a beta-lactámicos; Neonatos con hiperbilirrubinemia (riesgo ictericia nuclear).",
    adverse: "Diarrea por C. difficile, barro biliar, hipersensibilidad.",
    uses: "NAC hospitalaria, meningitis, urosepsis, infección intraabdominal (con metronidazol).",
    synonyms: ["rocephin"],
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "ev",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: false,
      stewardship_flags: ["Alto riesgo C. difficile y presión selectiva BLEE"]
    }
  },
  {
    id: "ceftazidima",
    name: "Ceftazidima",
    family: "Cefalosporina de 3ra generación antipseudomónica",
    mechanism: "Bactericida. Alta afinidad hacia PBP de Pseudomonas aeruginosa.",
    spectrum: "Bacilos Gramnegativos, alta y específica actividad antipseudomónica. Pobre Gram+.",
    dose: "1-2 g IV c/8 h.",
    renal: "ClCr 31-50 mL/min: 1 g c/12h; ClCr 16-30 mL/min: 1 g c/24h; ClCr < 15 mL/min: 500 mg c/24h.",
    contraindications: "Hipersensibilidad a cefalosporinas.",
    adverse: "Diarrea, convulsiones (en insuficiencia renal no ajustada), flebitis.",
    uses: "Neutropenia febril, infecciones por Pseudomonas aeruginosa sensible.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "narrow",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: false,
      oral_option: false
    }
  },
  {
    id: "cefepime",
    name: "Cefepime",
    family: "Cefalosporina de 4ta generación",
    mechanism: "Bactericida de amplio espectro con estabilidad frente a AmpC.",
    spectrum: "Enterobacterias (incluyendo AmpC), Pseudomonas aeruginosa, MSSA y Streptococci.",
    dose: "2 g IV c/8-12 h (2 g c/8 h en Neutropenia Febril / Meningitis).",
    renal: "ClCr 30-60 mL/min: 2 g c/12h; ClCr 11-29 mL/min: 2 g c/24h; ClCr ≤10 mL/min: 1 g c/24h.",
    contraindications: "Hipersensibilidad a cefalosporinas; cuidado extremo en falla renal (Neurotoxicidad).",
    adverse: "Neurotoxicidad (Encefalopatía, mioclonías), convulsiones, diarrea.",
    uses: "Neumonía nosocomial, neutropenia febril, infecciones por Gram- resistentes.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: false,
      oral_option: false,
      stewardship_flags: ["Especial vigilancia de neurotoxicidad en falla renal"]
    }
  },

  // --- CARBAPENÉMICOS ---
  {
    id: "ertapenem",
    name: "Ertapenem",
    family: "Carbapenémico",
    mechanism: "Bactericida de amplio espectro. Inhibe síntesis de pared.",
    spectrum: "Amplio Gram-/Gram+/anaerobios; NO cubre Pseudomonas ni Acinetobacter.",
    dose: "1 g IV c/24 h.",
    renal: "ClCr < 30 mL/min: 500 mg IV c/24 h.",
    contraindications: "Alergia grave a beta-lactámicos.",
    adverse: "GI, reacciones en sitio de inyección, convulsiones (raro).",
    uses: "Infecciones por BLEE en escenarios sin requerimiento antipseudomónico.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "ev",
      anti_pseudomonas: false,
      anaerobic_activity: true,
      oral_option: false
    }
  },
  {
    id: "meropenem",
    name: "Meropenem",
    family: "Carbapenémico",
    mechanism: "Bactericida. Inactiva PBPs múltiples con alta estabilidad frente a beta-lactamasas.",
    spectrum: "Muy amplio: Gram+, Gram-, anaerobios, Pseudomonas y Acinetobacter.",
    dose: "1 g IV c/8 h (2 g c/8 h en Meningitis o infecciones graves por Pseudomonas).",
    renal: "ClCr 26-50 mL/min: 1 g c/12h; ClCr 10-25 mL/min: 500 mg c/12h; ClCr < 10 mL/min: 500 mg c/24h.",
    contraindications: "Hipersensibilidad a carbapenémicos.",
    adverse: "Riesgo de convulsiones (menor que Imipenem), colitis pseudomembranosa.",
    uses: "Sepsis grave nosocomial, meningitis por Gram-, neutropenia febril.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: true,
      oral_option: false,
      stewardship_flags: ["Carbapenémico antipseudomónico", "Reserva PROA"]
    }
  },
  {
    id: "imipenem",
    name: "Imipenem-Cilastatina",
    family: "Carbapenémico",
    mechanism: "Bactericida de amplio espectro. Cilastatina previene degradación renal por DHP-I.",
    spectrum: "Extenso: Gram+, Gram-, Pseudomonas aeruginosa y Anaerobios.",
    dose: "500 mg IV c/6 h o 1 g IV c/8 h.",
    renal: "Requiere ajuste estricto basado en ClCr y peso para evitar neurotoxicidad.",
    contraindications: "Alergia a carbapenémicos; precaución en epilepsia.",
    adverse: "Náuseas/vómitos (más frecuente que otros), convulsiones (especialmente en IR).",
    uses: "Infecciones nosocomiales graves, sepsis polimicrobiana.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: true,
      oral_option: false
    }
  },

  // --- GLYCOPETIDES / OTROS G+ ---
  {
    id: "vancomicina",
    name: "Vancomicina",
    family: "Glicopéptido",
    mechanism: "Inhibe la síntesis de pared celular (unión a D-Ala-D-Ala). Bactericida concentración-tiempo dependiente.",
    spectrum: "Cocos Grampositivos incluyendo MRSA y Enterococcus spp. (variable). No activa Gram-.",
    dose: "15-20 mg/kg IV c/8-12 h (Guiado por niveles valle o AUC/MIC).",
    renal: "Ajuste obligatorio basado en niveles plasmáticos y ClCr.",
    contraindications: "Hipersensibilidad conocida.",
    adverse: "Nefrotoxicidad (sinergia con otros nefrotóxicos), ototoxicidad, Síndrome de Hombre Rojo.",
    uses: "Infección grave por MRSA, meningitis (con ceftriaxona), endocarditis MSSA (en alérgicos a beta-lactámicos).",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "narrow",
      route_hint: "ev",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: false
    }
  },
  {
    id: "linezolid",
    name: "Linezolid",
    family: "Oxazolidinona",
    mechanism: "Inhibe la síntesis proteica (subunidad 50S). Bacteriostático.",
    spectrum: "Grampositivos multirresistentes: MRSA, VRE y neumococo resistente.",
    dose: "600 mg IV/PO c/12 h.",
    renal: "No suele requerir ajuste renal habitual.",
    contraindications: "Uso concomitante con IMAO o antidepresivos serotonérgicos (S. serotoninérgico).",
    adverse: "Trombocitopenia (especialmente tras 14 días), neuropatía periférica y óptica.",
    uses: "Neumonía nosocomial MRSA, infección de piel y partes blandas por resistentes.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "narrow",
      route_hint: "both",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true
    }
  },
  {
    id: "daptomicina",
    name: "Daptomicina",
    family: "Lipopéptido cíclico",
    mechanism: "Bactericida. Despolariza la membrana celular inhibiendo síntesis de ADN/ARN.",
    spectrum: "Exclusivo para bacterias Grampositivas, incluyendo MRSA y VRE.",
    dose: "Bacteriemia/Endocarditis: 8-12 mg/kg IV c/24h. SSTI: 4-6 mg/kg c/24h.",
    renal: "ClCr < 30 mL/min: administrar cada 48 h.",
    contraindications: "NO USAR EN NEUMONÍA (inactivada por surfactante pulmonar).",
    adverse: "Miopatía (elevación de CPK), neumonía eosinofílica.",
    uses: "Bacteriemia por S. aureus, endocarditis derecha por MRSA.",
    clinical_metadata: {
      aware: "Reserve",
      spectrum: "narrow",
      route_hint: "ev",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: false
    }
  },

  // --- AMINOGLUCÓSIDOS ---
  {
    id: "amikacina",
    name: "Amikacina",
    family: "Aminoglucósido",
    mechanism: "Bactericida. Inhibe la síntesis proteica por unión a subunidad 30S.",
    spectrum: "Bacilos Gramnegativos aerobios, incluyendo Pseudomonas aeruginosa y Acinetobacter.",
    dose: "15-20 mg/kg IV c/24 h (Dosis única diaria preferida).",
    renal: "Ajuste estricto requerido. ClCr 10-29 mL/min: 15 mg/kg c/48 h; ClCr < 10: 5-7.5 mg/kg c/24h.",
    contraindications: "Hipersensibilidad a aminoglucósidos; Miastenia Gravis.",
    adverse: "Nefrotoxicidad sistémica, ototoxicidad (auditiva y vestibular).",
    uses: "Sepsis grave, infecciones urinarias multirresistentes, terapia combinada antipseudomónica.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "narrow",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: false,
      oral_option: false
    }
  },
  {
    id: "gentamicina",
    name: "Gentamicina",
    family: "Aminoglucósido",
    mechanism: "Inhibe síntesis proteica bacteriana (30S). Bactericida.",
    spectrum: "Gramnegativos; sinergia con beta-lactámicos para Enterococcus/Streptococcus.",
    dose: "3-5 mg/kg/día IV fraccionado o 5-7 mg/kg dosis única diaria.",
    renal: "Ajuste obligatorio basado en ClCr y niveles plasmáticos.",
    contraindications: "Hipersensibilidad, Miastenia Gravis.",
    adverse: "Nefrotoxicidad, ototoxicidad.",
    uses: "Endocarditis (sinergia), sepsis grave o urinaria complicada.",
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: false,
      oral_option: false
    }
  },

  // --- MACRÓLIDOS ---
  {
    id: "azitromicina",
    name: "Azitromicina",
    family: "Macrólido",
    mechanism: "Bacteriostático. Inhibe síntesis proteica (unión a 50S).",
    spectrum: "Atípicos (Mycoplasma, Chlamydia, Legionella), gérmenes respiratorios.",
    dose: "500 mg PO/IV c/24h.",
    renal: "Sin ajuste habitual necesario en falla renal moderada.",
    contraindications: "Antecedente de prolongación del intervalo QT; Insuficiencia hepática grave.",
    adverse: "GI, prolongación del QT, riesgo de arritmias.",
    uses: "NAC (cobertura de atípicos), ETS (Uretritis), infecciones respiratorias.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "both",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true
    }
  },
  {
    id: "claritromicina",
    name: "Claritromicina",
    family: "Macrólido",
    mechanism: "Bacteriostático por unión a subunidad 50S.",
    spectrum: "Grampositivos selectos y microorganismos atípicos.",
    dose: "500 mg PO c/12 h.",
    renal: "ClCr < 30 mL/min: 250-500 mg c/24 h.",
    contraindications: "Hipersensibilidad; prolongación del QT.",
    adverse: "Disgeusia, náuseas, diarrea, prolongación del QT.",
    uses: "Neumonía atípica, erradicación de H. pylori (en combinación).",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "vo",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true
    }
  },

  // --- FLUOROQUINOLONAS ---
  {
    id: "ciprofloxacino",
    name: "Ciprofloxacino",
    family: "Fluoroquinolona",
    mechanism: "Bactericida. Inhibe la ADN-girasa y topoisomerasa IV.",
    spectrum: "Excelente contra bacilos Gramnegativos (incluye Pseudomonas sensible). Pobre contra Neumococo.",
    dose: "400 mg IV c/8-12 h o 500-750 mg PO c/12 h.",
    renal: "ClCr < 30 mL/min: Reducir dosis o aumentar intervalo (ej. 250-500 mg PO c/24h).",
    contraindications: "Embarazo, lactancia, niños; Miastenia Gravis; Alergia a quinolonas.",
    adverse: "Tendinitis/Rotura de tendón, neuropatía, fototoxicidad, confusión en ancianos.",
    uses: "ITU complicada, prostatitis, infecciones gastrointestinales bacterianas graves.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "both",
      anti_pseudomonas: true,
      anaerobic_activity: false,
      oral_option: true,
      stewardship_flags: ["Alto riesgo C. difficile", "Daño colateral significativo"]
    }
  },
  {
    id: "levofloxacino",
    name: "Levofloxacino",
    family: "Fluoroquinolona",
    mechanism: "Bactericida. Actúa sobre ADN-girasa; mayor potencia contra Grampositivos.",
    spectrum: "Amplio: Neumococo, Atípicos y Gramnegativos (actividad Pseudomonas variable).",
    dose: "500-750 mg IV/PO c/24 h.",
    renal: "ClCr 10-29 mL/min: 500-750 mg c/48 h; ClCr < 10 mL/min: 250-500 mg c/48 h.",
    contraindications: "Alergia a quinolonas; Miastenia Gravis.",
    adverse: "Tendinitis, alteraciones de la glucemia, prolongación QT.",
    uses: "NAC (especialmente si hay riesgo de resistencia), urosepsis, exacerbación de EPOC.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "both",
      anti_pseudomonas: true,
      anaerobic_activity: false,
      oral_option: true
    }
  },
  {
    id: "moxifloxacino",
    name: "Moxifloxacino",
    family: "Fluoroquinolona",
    mechanism: "Inhibe DNA girasa/topoisomerasa.",
    spectrum: "Respiratoria; mejor Gram+ y anaerobios; NO Pseudomonas.",
    dose: "400 mg IV/PO c/24h",
    renal: "Sin ajuste renal habitual.",
    contraindications: "QT prolongado/arrítmias (precaución).",
    adverse: "QT, tendinopatía, neuropatía.",
    uses: "Alternativa en alergia beta-lactámicos (según escenario).",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "both",
      anti_pseudomonas: false,
      anaerobic_activity: true,
      oral_option: true
    }
  },

  // --- ANAEROBIOS / OTROS ---
  {
    id: "metronidazol",
    name: "Metronidazol",
    family: "Nitroimidazol",
    mechanism: "Bactericida. Daña el ADN tras activación intracelular por microorganismos anaerobios.",
    spectrum: "Anaerobios estrictos, protozoos. Bactericida potente contra B. fragilis.",
    dose: "500 mg IV/PO c/8 h.",
    renal: "Ajuste suele ser necesario solo en falla renal avanzada extrema (ClCr < 10).",
    contraindications: "Consumo de Alcohol (Efecto Disulfiram).",
    adverse: "Sabor metálico, náuseas, neuropatía periférica (uso crónico).",
    uses: "Infección intraabdominal, peritonitis, colitis por C. difficile (leves), absceso pélvico.",
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "both",
      anti_pseudomonas: false,
      anaerobic_activity: true,
      oral_option: true
    }
  },
  {
    id: "clindamicina",
    name: "Clindamicina",
    family: "Lincosamida",
    mechanism: "Inhibe la síntesis proteica (subunidad 50S). Bacteriostático.",
    spectrum: "Gran positivos (incluye MRSA comunitario) y anaerobios (excepto B. fragilis resistente).",
    dose: "600-900 mg IV c/8 h o 300-450 mg PO c/6-8 h.",
    renal: "Ajuste no suele ser necesario.",
    contraindications: "Alergia a lincosamidas.",
    adverse: "Alto riesgo de colitis pseudomembranosa por C. difficile, rash.",
    uses: "Infecciones de piel y partes blandas, neumonía aspirativa, profilaxis quirúrgica en alérgicos a Penicilina.",
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "both",
      anti_pseudomonas: false,
      anaerobic_activity: true,
      oral_option: true,
      stewardship_flags: ["Cuidado con riesgo C. difficile"]
    }
  },

  // --- ESPECÍFICOS UTI ---
  {
    id: "nitrofurantoina",
    name: "Nitrofurantoína",
    family: "Nitrofurano",
    mechanism: "Interfiere en múltiples sistemas enzimáticos bacterianos. Bactericida urinario.",
    spectrum: "Bacterias de vía urinaria (E. coli, Enterococcus). No activa contra Proteus ni Pseudomonas.",
    dose: "100 mg PO c/12h (Mancrocristales).",
    renal: "CONTRAINDICADA si TFG < 30-50 mL/min (riesgo de toxicidad sistémica e ineficacia urinaria).",
    contraindications: "Insuficiencia renal moderada-severa, embarazo a término, déficit G6PD.",
    adverse: "Náuseas, fibrosis pulmonar (en uso crónico), neuropatía periférica.",
    uses: "Cistitis no complicada solamente. Profilaxis de ITU recurrente.",
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "vo",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true
    }
  },
  {
    id: "fosfomicina_trometamol",
    name: "Fosfomicina trometamol",
    family: "Derivado del ácido fosfónico",
    mechanism: "Inhibe la síntesis de pared celular (MurA). Bactericida.",
    spectrum: "Amplio espectro urinario, incluyendo cepas productoras de BLEE.",
    dose: "3 g PO dosis única.",
    renal: "Ajuste usualmente no requerido para dosis única en cistitis.",
    contraindications: "Hipersensibilidad.",
    adverse: "Diarrea, náuseas.",
    uses: "Cistitis aguda no complicada.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "vo",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true,
      stewardship_flags: ["Reserva para cistitis multirresistente"]
    }
  },
  {
    id: "tmp_smx",
    name: "Trimetoprima-Sulfametoxazol",
    family: "Antifolatos",
    mechanism: "Inhibe síntesis de folato (dos pasos).",
    spectrum: "MRSA comunitario, algunos Gram- urinarios.",
    dose: "DS 160/800 mg PO c/12h (según indicación)",
    renal: "Ajustar en IR; vigilar K+.",
    contraindications: "Alergia sulfas, embarazo (según trimestre), déficit G6PD (precaución).",
    adverse: "Rash, hiperK, citopenias, nefritis intersticial (raro).",
    uses: "SSTI con riesgo MRSA, alternativas ITU, cobertura Listeria (según caso).",
    clinical_metadata: {
      aware: "Access",
      spectrum: "broad",
      route_hint: "both",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true
    }
  },

  // --- TETRACICLINAS ---
  {
    id: "doxiciclina",
    name: "Doxiciclina",
    family: "Tetraciclina",
    mechanism: "Bacteriostático de amplio espectro que inhibe la síntesis proteica (30S).",
    spectrum: "Grampositivos, Gramnegativos, atípicos y espiroquetas. No Pseudomonas.",
    dose: "100 mg PO/IV c/12h.",
    renal: "No requiere ajuste renal habitual.",
    contraindications: "Embarazo, lactancia, niños < 8 años (tinción dental permanente); Fotosensibilidad.",
    adverse: "Fotosensibilidad, esofagitis (tomar con agua), trastornos GI.",
    uses: "NAC (atípicos), EPI, infecciones por Rickettsia, acné.",
    clinical_metadata: {
      aware: "Access",
      spectrum: "broad",
      route_hint: "both",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true
    }
  },

  // --- OTRAS RELEVANTES ---
  {
    id: "rifampicina",
    name: "Rifampicina",
    family: "Rifamicina",
    mechanism: "Inhibe ARN polimerasa bacteriana.",
    spectrum: "Grampositivos (especialmente S. aureus en biofilm) y micobacterias.",
    dose: "300-600 mg c/12h.",
    renal: "Sin ajuste renal habitual.",
    contraindications: "Interacciones relevantes (inductor CYP), hepatopatía severa.",
    adverse: "Hepatotoxicidad, coloración naranja de fluidos, síndrome pseudogripal.",
    uses: "Endocarditis protésica (combinación), tuberculosis.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "narrow",
      route_hint: "both",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true
    }
  },

  // --- NUEVAS INCORPORACIONES / RESERVA ---
  {
    id: "tigeciclina",
    name: "Tigeciclina",
    family: "Glicilciclina",
    mechanism: "Derivado de tetraciclina que inhibe la síntesis proteica bacteriana.",
    spectrum: "Muy amplio frente a multirresistentes (VRE, MRSA, BLEE). No cubre Pseudomonas ni Proteus.",
    dose: "Dosis carga 100 mg IV, luego 50 mg IV c/12 h.",
    renal: "No requiere ajuste renal habitual.",
    contraindications: "Embarazo; mortalidad aumentada en algunos estudios (usar solo si no hay alternativa).",
    adverse: "Náuseas y vómitos severos, pancreatitis.",
    uses: "Infecciones intraabdominales complicadas o SSTI severas por resistentes.",
    clinical_metadata: {
      aware: "Reserve",
      spectrum: "broad",
      route_hint: "ev",
      anti_pseudomonas: false,
      anaerobic_activity: true,
      oral_option: false
    }
  },
  {
    id: "colistin",
    name: "Colistín (Polimixina E)",
    family: "Polimixina",
    mechanism: "Detergente catiónico que rompe la membrana citoplasmática de Gramnegativos.",
    spectrum: "Bacilos Gramnegativos pan-resistentes (XDR/PDR) incluyendo Pseudomonas y Acinetobacter.",
    dose: "Dosis de carga 9 MUI IV, seguido de 4.5 MUI IV c/12 h (Dosis variable según guía local).",
    renal: "Ajuste estricto requerido; Monitorizar creatinina y diuresis diariamente.",
    contraindications: "Uso concomitante con otros nefrotóxicos si es posible evitarlo; Hipersensibilidad.",
    adverse: "Nefrotoxicidad sistémica (AKI frec.), neurotoxicidad, parestesias.",
    uses: "Rescate final en infecciones por gérmenes pan-resistentes en cuidados críticos.",
    clinical_metadata: {
      aware: "Reserve",
      spectrum: "narrow",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: false,
      oral_option: false
    }
  },

  // Monobactámicos
  {
    id: "aztreonam",
    name: "Aztreonam",
    family: "Monobactámico",
    mechanism: "Bactericida. Inhibe síntesis de pared celular; activo exclusivamente contra Gramnegativos aerobios.",
    spectrum: "Gramnegativos aerobios incluyendo Pseudomonas. NO activo contra Gram+ ni anaerobios.",
    dose: "1-2 g IV c/8 h.",
    renal: "Requiere ajuste en insuficiencia renal; Hemodiálisis: dosis suplementaria tras sesión.",
    contraindications: "Hipersensibilidad. Precaución en alergia severa a beta-lactámicos (no reactividad cruzada con penicilinas).",
    adverse: "Rash, elevación de transaminasas, diarrea asociada a C. difficile.",
    uses: "Alternativa en alergia a beta-lactámicos para cobertura de Gramnegativos.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "narrow",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: false,
      oral_option: false
    }
  },

  // --- NUEVAS INCORPORACIONES (BLOQUE 2 - NotebookLM) ---

  // Penicilinas adicionales
  {
    id: "dicloxacilina",
    name: "Dicloxacilina",
    family: "Penicilina resistente a beta-lactamasas (Isoxazolil)",
    mechanism: "Bactericida. Inhibe la síntesis de pared celular, resistente a penicilinasas estafilocócicas.",
    spectrum: "S. aureus sensible a meticilina (MSSA) y Estreptococos.",
    dose: "500 mg PO c/6 h (Ayunas para maximizar absorción).",
    renal: "Sin ajuste renal habitual.",
    contraindications: "Hipersensibilidad a penicilinas o betalactámicos.",
    adverse: "Exantema, molestias gastrointestinales, riesgo de anafilaxia.",
    uses: "Infecciones leves de vías respiratorias, piel y tejidos blandos por MSSA (alternativa oral a cloxacilina).",
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "vo",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true
    }
  },
  {
    id: "oxacilina",
    name: "Oxacilina",
    family: "Penicilina resistente a beta-lactamasas",
    mechanism: "Bactericida. Inhibe la síntesis de pared bacteriana; resistente a penicilinasas estafilocócicas.",
    spectrum: "S. aureus sensible a meticilina (MSSA). No cubre MRSA.",
    dose: "8-12 g/día IV divididos en 4-6 dosis (en infusión lenta).",
    renal: "Sin ajuste habitual requerido.",
    contraindications: "Hipersensibilidad a penicilinas.",
    adverse: "Hepatotoxicidad, flebitis, reacciones alérgicas.",
    uses: "Endocarditis por MSSA, infecciones neuromeníngeas, óseas y articulares por MSSA.",
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "ev",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: false
    }
  },
  {
    id: "sultamicilina",
    name: "Sultamicilina",
    family: "Penicilina + Inhibidor de beta-lactamasas (oral)",
    mechanism: "Profármaco oral de Ampicilina-Sulbactam. Inhibe síntesis de pared y bloquea beta-lactamasas.",
    spectrum: "Gram+, Gram-, productores de beta-lactamasas y Anaerobios (excepto Pseudomonas).",
    dose: "375-750 mg PO c/12 h.",
    renal: "ClCr 5-19 mL/min: 250-375 mg c/24 h; ClCr < 5 mL/min: 250-375 mg c/48 h.",
    contraindications: "Hipersensibilidad a penicilinas o sulbactam.",
    adverse: "Diarrea, colitis pseudomembranosa, sobrecrecimiento fúngico.",
    uses: "Sinusitis, otitis media, neumonía, ITU, piel y partes blandas.",
    clinical_metadata: {
      aware: "Access",
      spectrum: "broad",
      route_hint: "vo",
      anti_pseudomonas: false,
      anaerobic_activity: true,
      oral_option: true
    }
  },

  // Cefalosporinas adicionales
  {
    id: "cefalotina",
    name: "Cefalotina",
    family: "Cefalosporina de 1ra generación (IV)",
    mechanism: "Bactericida. Inhibe la síntesis y reparación de pared bacteriana.",
    spectrum: "Grampositivos (MSSA, estreptococos) y algunos Gramnegativos.",
    dose: "0.5-1 g IV/IM c/4-6 h (hasta 2 g c/4 h en infecciones críticas).",
    renal: "Ajuste requerido en insuficiencia renal significativa.",
    contraindications: "Alergia a cefalosporinas.",
    adverse: "Dolor en sitio de inyección, flebitis, hipersensibilidad.",
    uses: "Profilaxis quirúrgica perioperatoria, infecciones estafilocócicas y respiratorias.",
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "ev",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: false
    }
  },
  {
    id: "cefoxitina",
    name: "Cefoxitina",
    family: "Cefalosporina de 2da generación (Cefamicina)",
    mechanism: "Bactericida. Inhibe síntesis de pared con actividad intrínseca contra anaerobios.",
    spectrum: "Grampositivos, Gramnegativos y actividad notable contra Bacteroides spp.",
    dose: "1-2 g IV c/6-8 h.",
    renal: "ClCr 10-29 mL/min: 1-2 g c/12-24 h; ClCr < 10 mL/min: 0.5-1 g c/24-48 h.",
    contraindications: "Alergia a cefalosporinas o betalactámicos.",
    adverse: "Hipersensibilidad, flebitis en infusión.",
    uses: "Profilaxis quirúrgica colorrectal/ginecológica, infecciones intraabdominales polimicrobianas.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "ev",
      anti_pseudomonas: false,
      anaerobic_activity: true,
      oral_option: false
    }
  },
  {
    id: "cefixima",
    name: "Cefixima",
    family: "Cefalosporina de 3ra generación (Oral)",
    mechanism: "Bactericida. Inhibe síntesis de pared celular; estable frente a muchas beta-lactamasas.",
    spectrum: "Potente contra bacilos Gramnegativos (H. influenzae, E. coli, M. catarrhalis). Pobre Gram+.",
    dose: "400 mg PO c/24 h o 200 mg c/12 h.",
    renal: "ClCr < 20 mL/min o hemodiálisis: máximo 200 mg/día.",
    contraindications: "Alergia a cefalosporinas.",
    adverse: "Diarrea, alteración de flora intestinal.",
    uses: "Otitis media, sinusitis, exacerbación de bronquitis crónica, ITU no complicada.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "vo",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true
    }
  },
  {
    id: "ceftazidima_avibactam",
    name: "Ceftazidima-Avibactam",
    family: "Cefalosporina antipseudomónica + Inhibidor de beta-lactamasas (nueva generación)",
    mechanism: "Bactericida inhibidor de pared celular; Avibactam es inhibidor no betalactámico que neutraliza carbapenemasas (KPC, OXA-48).",
    spectrum: "Bacilos Gramnegativos MDR/XDR incluyendo productores de BLEE, KPC y algunas OXA.",
    dose: "2 g/0.5 g IV c/8 h en infusión de 2 h.",
    renal: "ClCr 31-50: 1/0.25 g c/8 h; ClCr 16-30: 0.75/0.1875 g c/12 h; ClCr < 15: ajuste severo.",
    contraindications: "Hipersensibilidad a cefalosporinas o avibactam.",
    adverse: "Diarrea, test de Coombs positivo, nefrotoxicidad (si se asocia a nefrotóxicos).",
    uses: "ITU complicada, infección intraabdominal y neumonía nosocomial por Gram- resistentes (KPC).",
    clinical_metadata: {
      aware: "Reserve",
      spectrum: "broad",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: false,
      oral_option: false,
      stewardship_flags: ["Uso exclusivo bajo supervisión infectológica"]
    }
  },
  {
    id: "cefoperazona_sulbactam",
    name: "Cefoperazona-Sulbactam",
    family: "Cefalosporina de 3ra gen + Inhibidor de beta-lactamasas",
    mechanism: "Inhibición de pared celular combinada con inactivación de beta-lactamasas.",
    spectrum: "Amplio: Gram+, Gram- (incluyendo Pseudomonas y Acinetobacter baumannii) y Anaerobios.",
    dose: "1.5-3 g IV c/12 h (hasta 6-12 g/día divididos en infecciones graves).",
    renal: "Ajuste solo en insuficiencia renal muy severa con falla hepática concomitante.",
    contraindications: "Alergia a cefalosporinas, penicilinas o sulbactam.",
    adverse: "Diarrea, alteraciones de coagulación (deficiencia de vitamina K), elevación de transaminasas.",
    uses: "Infecciones nosocomiales graves por Acinetobacter baumannii multirresistente.",
    clinical_metadata: {
      aware: "Reserve",
      spectrum: "broad",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: true,
      oral_option: false,
      stewardship_flags: ["Uso especializado para Acinetobacter MDR"]
    }
  },
  {
    id: "ceftarolina",
    name: "Ceftarolina Fosamilo",
    family: "Cefalosporina de 5ta generación",
    mechanism: "Bactericida. Único betalactámico con alta afinidad por PBP2a; cubre MRSA.",
    spectrum: "Amplia cobertura Grampositiva (MRSA, Neumococo resistente) y algunos Gramnegativos.",
    dose: "600 mg IV c/12 h en infusión de 60 min.",
    renal: "ClCr 30-50: 400 mg c/12 h; ClCr 15-30: 300 mg c/12 h.",
    contraindications: "Alergia a cefalosporinas o betalactámicos.",
    adverse: "Diarrea, exantema, test de Coombs positivo.",
    uses: "SSTI complicada por MRSA, neumonía comunitaria grave.",
    clinical_metadata: {
      aware: "Reserve",
      spectrum: "broad",
      route_hint: "ev",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: false,
      stewardship_flags: ["Único betalactámico anti-MRSA"]
    }
  },
  {
    id: "ceftobiprol",
    name: "Ceftobiprol Medocarilo",
    family: "Cefalosporina de 5ta generación",
    mechanism: "Bactericida. Se une a PBPs incluyendo PBP2a del MRSA y PBP2x del neumococo resistente.",
    spectrum: "Grampositivos (MRSA, Neumococo resistente) y Gramnegativos (limitado contra Pseudomonas).",
    dose: "500 mg IV c/8 h en infusión de 2 h.",
    renal: "ClCr 30-50: 500 mg c/12 h; ClCr < 30: 250 mg c/12 h.",
    contraindications: "Hipersensibilidad a cefalosporinas.",
    adverse: "Disgeusia, náuseas, vómitos.",
    uses: "Neumonía intrahospitalaria (excluye NAVM), NAC grave.",
    clinical_metadata: {
      aware: "Reserve",
      spectrum: "broad",
      route_hint: "ev",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: false
    }
  },

  // Carbapenémicos adicionales
  {
    id: "doripenem",
    name: "Doripenem",
    family: "Carbapenémico",
    mechanism: "Bactericida. Inactiva PBPs esenciales con alta estabilidad ante beta-lactamasas.",
    spectrum: "Amplio: Gram+, Enterobacterales, Pseudomonas aeruginosa y Anaerobios.",
    dose: "500 mg IV c/8 h en infusión de 1-4 h.",
    renal: "ClCr 30-50 mL/min: 250 mg c/8 h; ClCr < 30 mL/min: 250 mg c/12 h.",
    contraindications: "Alergia a carbapenémicos o betalactámicos.",
    adverse: "Náuseas, diarrea, riesgo de convulsiones (menor que imipenem).",
    uses: "Neumonía nosocomial (incluyendo NAVM), infecciones intraabdominales y urinarias complicadas.",
    clinical_metadata: {
      aware: "Reserve",
      spectrum: "broad",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: true,
      oral_option: false
    }
  },

  // Aminoglucósidos adicionales
  {
    id: "tobramicina",
    name: "Tobramicina",
    family: "Aminoglucósido",
    mechanism: "Bactericida. Inhibe la síntesis proteica uniéndose a subunidad 30S ribosomal.",
    spectrum: "Bacilos Gramnegativos aerobios, especialmente Pseudomonas aeruginosa.",
    dose: "5-7 mg/kg/día IV c/24 h (o fraccionado 1-2 mg/kg c/8 h). Inhalado: 300 mg c/12 h.",
    renal: "Requiere monitorización estricta con espaciado de intervalos según ClCr.",
    contraindications: "Alergia a aminoglucósidos.",
    adverse: "Ototoxicidad (vestibular y coclear), nefrotoxicidad, bloqueo neuromuscular.",
    uses: "Infecciones graves por Pseudomonas, fibrosis quística (vía inhalada).",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "narrow",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: false,
      oral_option: false
    }
  },

  // Glucopéptidos adicionales
  {
    id: "teicoplanina",
    name: "Teicoplanina",
    family: "Glucopéptido",
    mechanism: "Bactericida. Inhibe la biosíntesis de pared celular (unión a D-Ala-D-Ala).",
    spectrum: "Exclusivo Grampositivos: MRSA, Enterococcus y S. epidermidis.",
    dose: "Dosis de carga: 6-12 mg/kg IV c/12 h por 3 dosis. Mantenimiento: 6-12 mg/kg/día.",
    renal: "ClCr 30-80: 6-12 mg/kg c/48 h; ClCr < 30: 6-12 mg/kg c/72 h.",
    contraindications: "Hipersensibilidad a teicoplanina.",
    adverse: "Ototoxicidad y nefrotoxicidad (menor que vancomicina), erupción cutánea.",
    uses: "Infecciones graves por MRSA, osteomielitis, endocarditis, neutropenia febril.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "narrow",
      route_hint: "ev",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: false
    }
  },

  // Polimixinas adicionales
  {
    id: "polimixina_b",
    name: "Polimixina B",
    family: "Polimixina",
    mechanism: "Bactericida. Altera permeabilidad de la membrana externa de bacterias Gramnegativas.",
    spectrum: "Bacilos Gramnegativos panresistentes (Pseudomonas, Klebsiella, Acinetobacter).",
    dose: "15.000-25.000 U/kg/día IV divididos c/12 h.",
    renal: "No requiere ajuste de dosis (a diferencia del Colistín).",
    contraindications: "Alergia a polimixinas. Evitar nefrotóxicos concomitantes.",
    adverse: "Nefrotoxicidad severa, neurotoxicidad, bloqueo neuromuscular.",
    uses: "Rescate en bacteriemias, meningitis y neumonía por Gramnegativos panresistentes.",
    clinical_metadata: {
      aware: "Reserve",
      spectrum: "narrow",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: false,
      oral_option: false
    }
  },

  // Fluoroquinolonas adicionales
  {
    id: "norfloxacino",
    name: "Norfloxacino",
    family: "Fluoroquinolona",
    mechanism: "Bactericida. Inhibe la ADN-girasa bacteriana.",
    spectrum: "Bacterias Gramnegativas del tracto urinario y gastrointestinal.",
    dose: "400 mg PO c/12 h.",
    renal: "ClCr < 30 mL/min: 400 mg c/24 h.",
    contraindications: "Alergia a quinolonas, embarazo, lactancia, menores de 18 años.",
    adverse: "Tendinitis, molestias gastrointestinales, fototoxicidad.",
    uses: "ITU no complicada, prostatitis (alternativa).",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "narrow",
      route_hint: "vo",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true
    }
  },

  // Antituberculosos
  {
    id: "isoniazida",
    name: "Isoniazida",
    family: "Hidrazida (Antituberculoso)",
    mechanism: "Bactericida. Inhibe la biosíntesis de ácido micólico de la pared micobacteriana.",
    spectrum: "Específico para Mycobacterium tuberculosis y M. bovis.",
    dose: "300 mg/día PO (o 10-15 mg/kg/día en regímenes intermitentes).",
    renal: "No requiere ajuste renal habitual.",
    contraindications: "Daño hepático grave; antecedentes de hepatitis inducida por isoniazida.",
    adverse: "Hepatotoxicidad severa, neuropatía periférica (se previene con Piridoxina 25-50 mg/día).",
    uses: "Tuberculosis latente (quimioprofilaxis) y tuberculosis activa (terapia combinada RIPE).",
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "vo",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true
    }
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = antibiotics;
} else if (typeof window !== "undefined") {
  window.abg_antibiotics = antibiotics;
}
