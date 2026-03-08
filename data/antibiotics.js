/**
 * @fileoverview ANTIBIOTICS DATA
 * 
 * ARCHITECTURAL CONTRACT (Clinical vs Presentation):
 * This file contains the primary vocabulary for drugs and their properties.
 * 
 * [CLINICAL CORE] (Used for algorithmic rules/validation - do not change meaning arbitrarily)
 * - id: string
 * - mechanism, family: string
 * 
 * [PRESENTATION & CONTEXT] (Used primarily for UI display - safe to rephrase)
 * - name, spectrum, dose, renal, contraindications, adverse, uses
 * - clinical_metadata: object (deep presentation blocks)
 */

const antibiotics = [
  // --- Beta-lactámicos y afines ---
  {
    id: "amoxicilina",
    name: "Amoxicilina",
    family: "Aminopenicilina",
    mechanism: "Inhibe síntesis de pared celular (PBP).",
    spectrum: "Gram+ (S. pneumoniae sensible), algunos Gram-.",
    dose: "1 g PO c/8h (NAC dosis alta según caso)",
    renal: "Ajustar en insuficiencia renal significativa.",
    contraindications: "Alergia a penicilinas.",
    adverse: "Diarrea, exantema.",
    uses: "NAC ambulatoria, faringitis, infecciones sensibles.",
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
    family: "Penicilina + inhibidor beta-lactamasa",
    mechanism: "Inhibe pared celular + clavulanato inhibe beta-lactamasas.",
    spectrum: "Gram+, Gram-, anaerobios.",
    dose: "875/125 mg PO c/12h o 500/125 mg PO c/8h",
    renal: "Ajustar si ClCr < 30 mL/min.",
    contraindications: "Alergia a penicilina, ictericia colestásica previa por el fármaco.",
    adverse: "Diarrea, náuseas, exantema, candidiasis.",
    uses: "NAC con comorbilidad, mordeduras, pie diabético leve.",
    synonyms: ["amoxi clav", "amoxiclav"],
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
    mechanism: "Inhibe síntesis de pared celular (PBP).",
    spectrum: "Enterococcus faecalis, Listeria, algunos Gram-.",
    dose: "2 g IV c/4h (ej. meningitis/enterococo) o 12 g/día fraccionado",
    renal: "Ajustar en insuficiencia renal.",
    contraindications: "Alergia a penicilinas.",
    adverse: "Exantema, diarrea.",
    uses: "Listeria (meningitis), enterococo (combinaciones), endocarditis (según esquema)."
  },
  {
    id: "ceftriaxona",
    name: "Ceftriaxona",
    family: "Cefalosporina 3ra gen",
    mechanism: "Inhibe síntesis de pared celular.",
    spectrum: "Gram-, Streptococci. No Pseudomonas, no Enterococos.",
    dose: "1-2 g IV c/24h (2 g IV c/12h en meningitis)",
    renal: "Usualmente sin ajuste; precaución en falla renal + hepática extrema.",
    contraindications: "Alergia grave a beta-lactámicos, neonatos con hiperbilirrubinemia.",
    adverse: "Diarrea por C. difficile, barro biliar, hipersensibilidad.",
    uses: "NAC hospitalaria, meningitis, urosepsis, intraabdominal.",
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
  // --- Cefalosporinas antipseudomónicas ---
  {
    id: "cefepime",
    name: "Cefepime",
    family: "Cefalosporina de cuarta generación",
    mechanism: "Inhibición de la síntesis de pared bacteriana por unión a proteínas fijadoras de penicilina (PBP), con mayor estabilidad frente a beta-lactamasas de espectro extendido tipo AmpC que las cefalosporinas de tercera generación.",
    spectrum: "Amplio espectro gramnegativo incluyendo Pseudomonas aeruginosa, Enterobacterales (incluyendo productoras de AmpC), y grampositivos como Staphylococcus aureus sensible a meticilina (SASM) y Streptococcus spp. No activo frente a MRSA, Enterococcus spp., Listeria ni anaerobios.",
    dose: "Infección moderada-grave: 2 g IV c/8h. Neutropenia febril / HAP-VAP / sepsis grave: 2 g IV c/8h (considerar infusión extendida de 3-4 horas para optimizar T>MIC). Meningitis por gramnegativos susceptibles: 2 g IV c/8h.",
    renal: "Requiere ajuste si ClCr < 60 mL/min. Pautas orientativas: ClCr 30-60 mL/min: 2 g c/12h; ClCr 11-29 mL/min: 2 g c/24h; ClCr ≤10 mL/min o hemodiálisis: 1 g c/24h (dosis suplementaria post-diálisis). Monitorizar función renal y signos de neurotoxicidad (encefalopatía, mioclonías), especialmente en insuficiencia renal no reconocida.",
    contraindications: "Hipersensibilidad a cefepime u otras cefalosporinas. Precaución en alergia severa a penicilinas (reactividad cruzada <2%). Precaución en pacientes con antecedentes de convulsiones o insuficiencia renal no ajustada (riesgo de neurotoxicidad).",
    adverse: "Neurotoxicidad (encefalopatía, mioclonías, convulsiones) especialmente con sobredosificación o insuficiencia renal no ajustada; diarrea; elevación transitoria de transaminasas; reacciones de hipersensibilidad; colitis por Clostridioides difficile en tratamientos prolongados.",
    uses: "HAP/VAP, sepsis de origen nosocomial, infecciones del tracto urinario complicadas, neutropenia febril de alto riesgo, infecciones intraabdominales (en combinación con metronidazol). Útil en infecciones por Enterobacterales productoras de AmpC donde cefalosporinas de 3ª generación fallan.",
    synonyms: ["Cefepima", "Maxipime", "Cepimax", "CFP", "cefepime HCl", "BR-963", "BMY-28142"],
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: false,
      oral_option: false,
      stewardship_flags: ["Uso restringido nosocomial/Pseudomonas"]
    }
  },
  {
    id: "ceftazidima",
    name: "Ceftazidima",
    family: "Cefalosporina de tercera generación (con actividad antipseudomónica)",
    mechanism: "Inhibición de la síntesis de pared bacteriana por unión a proteínas fijadoras de penicilina (PBP). Destaca por alta afinidad hacia PBP de Pseudomonas aeruginosa. Moderadamente estable frente a beta-lactamasas, pero susceptible a BLEE y AmpC inducible.",
    spectrum: "Excelente actividad frente a Pseudomonas aeruginosa y Enterobacterales. Actividad limitada frente a grampositivos (Streptococcus spp., sin actividad relevante frente a SASM ni MRSA). No activo frente a anaerobios, Enterococcus spp. ni Acinetobacter spp. Susceptible a hidrólisis por BLEE y AmpC; en esos contextos preferir ceftazidima-avibactam.",
    dose: "Infecciones graves / HAP-VAP / sepsis: 2 g IV c/8h. Infección por Pseudomonas aeruginosa en paciente crítico: 2 g IV c/8h (considerar infusión extendida de 3-4 horas para maximizar T>MIC). Fibrosis quística (fuera de alcance estándar adulto general): dosis superiores bajo supervisión especializada.",
    renal: "Requiere ajuste si ClCr < 50 mL/min. Pautas orientativas: ClCr 31-50 mL/min: 1 g c/12h; ClCr 16-30 mL/min: 1 g c/24h; ClCr 6-15 mL/min: 500 mg c/24h; ClCr ≤5 mL/min o hemodiálisis: 500 mg c/48h (con dosis suplementaria post-diálisis). Monitorizar función renal y signos neurológicos en insuficiencia renal.",
    contraindications: "Hipersensibilidad a ceftazidima u otras cefalosporinas. Precaución en alergia grave a penicilinas. No usar como monoterapia empírica si prevalencia local de BLEE o AmpC inducible es alta sin confirmación de sensibilidad.",
    adverse: "Reacciones de hipersensibilidad; diarrea; elevación de transaminasas; eosinofilia; colitis por Clostridioides difficile; neurotoxicidad (menos frecuente que cefepime pero posible en insuficiencia renal no ajustada); tromboflebitis en administración IV periférica prolongada.",
    uses: "HAP/VAP e infecciones nosocomiales por Pseudomonas aeruginosa sensible, sepsis por gramnegativos, infecciones del tracto urinario complicadas de origen nosocomial, infecciones en pacientes neutropénicos (habitualmente en combinación). En infecciones por productoras de BLEE/KPC, preferir ceftazidima-avibactam.",
    synonyms: ["Ceftazidime", "Fortaz", "Tazicef", "Fortum", "CAZ", "GR-20263", "ceftazidima pentahidrato"]
  },
  {
    id: "cefazolina",
    name: "Cefazolina",
    family: "Cefalosporina 1ra gen",
    mechanism: "Inhibe síntesis de pared celular.",
    spectrum: "MSSA, estreptococos; Gram- limitado.",
    dose: "1-2 g IV c/8h",
    renal: "Ajustar en insuficiencia renal.",
    contraindications: "Alergia grave a beta-lactámicos.",
    adverse: "Hipersensibilidad, diarrea.",
    uses: "Celulitis grave no purulenta, MSSA (según escenario)."
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
    id: "cloxacilina",
    name: "Cloxacilina",
    family: "Penicilina antiestafilocócica",
    mechanism: "Inhibe síntesis de pared celular.",
    spectrum: "MSSA (no MRSA).",
    dose: "2 g IV c/4-6h (≈12 g/día)",
    renal: "Ajuste variable según función renal/local.",
    contraindications: "Alergia a penicilinas.",
    adverse: "Hepatotoxicidad colestásica (raro), exantema.",
    uses: "MSSA grave / endocarditis (según guía local)."
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
    uses: "Faringitis estreptocócica."
  },
  {
    id: "penicilina_g",
    name: "Penicilina G",
    family: "Penicilina (IV)",
    mechanism: "Inhibe síntesis de pared celular.",
    spectrum: "Estreptococos sensibles.",
    dose: "12–18 millones UI/día IV fraccionada o infusión continua (según escenario)",
    renal: "Ajustar en IR.",
    contraindications: "Alergia a penicilinas.",
    adverse: "Hipersensibilidad, convulsiones (altas dosis/IR).",
    uses: "Endocarditis por estreptococos sensibles."
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
    uses: "Faringitis estreptocócica (adherencia)."
  },
  {
    id: "piperacilina_tazobactam",
    name: "Piperacilina-Tazobactam",
    family: "Penicilina antipseudomónica + inhibidor",
    mechanism: "Inhibe pared celular + inhibe beta-lactamasas.",
    spectrum: "Muy amplio: Gram+, Gram-, Pseudomonas, anaerobios.",
    dose: "4.5 g IV c/6-8h (considerar infusión extendida según escenario)",
    renal: "Ajuste si ClCr < 40 mL/min.",
    contraindications: "Alergia a penicilinas.",
    adverse: "Diarrea, nefritis intersticial, trombocitopenia (raro).",
    uses: "Sepsis, urosepsis, pie diabético moderado/grave, intraabdominal grave.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: true,
      oral_option: false,
      stewardship_flags: ["Uso restringido", "Ahorro recomendado (Watch)"]
    }
  },
  {
    id: "aztreonam",
    name: "Aztreonam",
    family: "Monobactámico",
    mechanism: "Inhibe síntesis de pared celular.",
    spectrum: "Gram- aerobios (incluye Pseudomonas); NO Gram+ ni anaerobios.",
    dose: "1-2 g IV c/8h (según severidad)",
    renal: "Ajustar en IR.",
    contraindications: "Hipersensibilidad (cruzada baja con beta-lactámicos, salvo ceftazidima).",
    adverse: "Rash, elevación transaminasas.",
    uses: "Alternativa en alergia a beta-lactámicos (Gram-)."
  },
  {
    id: "ertapenem",
    name: "Ertapenem",
    family: "Carbapenémico",
    mechanism: "Inhibe pared celular.",
    spectrum: "Amplio Gram-/Gram+/anaerobios; NO Pseudomonas ni Acinetobacter.",
    dose: "1 g IV c/24h",
    renal: "Ajustar en IR.",
    contraindications: "Alergia grave a beta-lactámicos.",
    adverse: "GI, convulsiones (raro).",
    uses: "ESBL sin riesgo de Pseudomonas (p.ej. urosepsis seleccionada)."
  },
  {
    id: "meropenem",
    name: "Meropenem",
    family: "Carbapenémico",
    mechanism: "Inhibe pared celular.",
    spectrum: "Muy amplio; incluye Pseudomonas (a diferencia de ertapenem).",
    dose: "1 g IV c/8h (ajustar a severidad; infusión extendida según caso)",
    renal: "Ajustar en IR.",
    contraindications: "Alergia grave a beta-lactámicos.",
    adverse: "GI, convulsiones (raro).",
    uses: "Sepsis grave, ESBL con riesgo Pseudomonas.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: true,
      oral_option: false,
      stewardship_flags: ["Uso restringido", "Carbapenémico antipseudomónico"]
    }
  },

  {
    id: "imipenem",
    name: "Imipenem",
    family: "CarbapenÃ©mico",
    mechanism: "Inhibe pared celular.",
    spectrum: "Amplio Gram+/Gram-/anaerobios, incluyendo Pseudomonas.",
    dose: "500 mg IV c/6h (segÃºn severidad y funciÃ³n renal)",
    renal: "Requiere ajuste en insuficiencia renal.",
    contraindications: "Alergia grave a beta-lactÃ¡micos.",
    adverse: "NÃ¡useas, convulsiones (riesgo en IR o altas dosis).",
    uses: "Infecciones graves nosocomiales y enterobacterales resistentes.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: true,
      oral_option: false,
      stewardship_flags: ["Uso restringido", "Carbapenémico antipseudomónico"]
    }
  },
  {
    id: "amikacina",
    name: "Amikacina",
    family: "AminoglucÃ³sido",
    mechanism: "Inhibe sÃ­ntesis proteica (30S), bactericida.",
    spectrum: "Gram negativos, incluyendo Pseudomonas y enterobacterales.",
    dose: "15-20 mg/kg IV c/24h (ajustar segÃºn niveles)",
    renal: "Ajuste obligatorio en insuficiencia renal.",
    contraindications: "Hipersensibilidad; precauciÃ³n en miastenia gravis.",
    adverse: "Nefrotoxicidad y ototoxicidad.",
    uses: "Sepsis por Gram negativos y terapia combinada en cuadros graves.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: false,
      oral_option: false,
      stewardship_flags: ["Sinergia antipseudomónica", "Monitorizar niveles y AKI"]
    }
  },
  {
    id: "linezolid",
    name: "Linezolid",
    family: "Oxazolidinona",
    mechanism: "Inhibe sÃ­ntesis proteica (50S).",
    spectrum: "Gram positivos resistentes, incluyendo MRSA y VRE.",
    dose: "600 mg IV/PO c/12h",
    renal: "Sin ajuste renal habitual.",
    contraindications: "Uso concomitante con IMAO/serotonÃ©rgicos (precauciÃ³n).",
    adverse: "Trombocitopenia, neuropatÃ­a (uso prolongado).",
    uses: "Infecciones por MRSA/VRE y neumonÃ­a por Gram positivos."
  },

  // --- Anaerobios / otros ---
  {
    id: "metronidazol",
    name: "Metronidazol",
    family: "Nitroimidazol",
    mechanism: "Daño del ADN en anaerobios.",
    spectrum: "Anaerobios estrictos, protozoos.",
    dose: "500 mg IV/PO c/8h",
    renal: "Sin ajuste significativo.",
    contraindications: "Hipersensibilidad; evitar alcohol (efecto disulfiram).",
    adverse: "Sabor metálico, GI, neuropatía (uso prolongado).",
    uses: "Intraabdominal, EPI, anaerobios.",
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "both",
      anti_pseudomonas: false,
      anaerobic_activity: true,
      oral_option: true
    }
  },

  // --- Glicopéptidos / lipopeptidos ---
  {
    id: "vancomicina",
    name: "Vancomicina",
    family: "Glicopéptido",
    mechanism: "Inhibe síntesis de pared celular (unión D-Ala-D-Ala).",
    spectrum: "Gram+ incl. MRSA; actividad en enterococo variable (no VRE).",
    dose: "15-20 mg/kg IV c/8-12h (guiado por AUC/valle)",
    renal: "Ajuste obligatorio según niveles y ClCr.",
    contraindications: "Hipersensibilidad.",
    adverse: "Nefrotoxicidad, ototoxicidad, síndrome hombre rojo.",
    uses: "MRSA, meningitis (combinación), endocarditis, celulitis grave."
  },
  {
    id: "daptomicina",
    name: "Daptomicina",
    family: "Lipopeptido",
    mechanism: "Despolariza membrana (Gram+).",
    spectrum: "Gram+ incl. MRSA/VRE (según cepa).",
    dose: "8-10 mg/kg IV c/24h (según indicación)",
    renal: "Ajustar en IR.",
    contraindications: "Neumonía (inactivada por surfactante).",
    adverse: "Miopatía; CPK semanal.",
    uses: "Bacteriemia/endocarditis por MRSA (alternativa), VRE (según caso)."
  },

  // --- Macrólidos / tetraciclinas ---
  {
    id: "azitromicina",
    name: "Azitromicina",
    family: "Macrólido",
    mechanism: "Inhibe síntesis proteica (50S).",
    spectrum: "Atípicos; algunos Gram+.",
    dose: "500 mg día 1, luego 250 mg/día (o 500 mg/día según escenario)",
    renal: "Sin ajuste usual.",
    contraindications: "Prolongación QT significativa/arrítmias (precaución).",
    adverse: "GI, prolongación QT.",
    uses: "NAC (cobertura atípicos), alternativas en faringitis (según resistencia)."
  },
  {
    id: "doxiciclina",
    name: "Doxiciclina",
    family: "Tetraciclina",
    mechanism: "Inhibe síntesis proteica (30S).",
    spectrum: "Atípicos, algunos Gram+/-.",
    dose: "100 mg PO/IV c/12h",
    renal: "Sin ajuste usual.",
    contraindications: "Embarazo/lactancia (en general), hipersensibilidad.",
    adverse: "Fotosensibilidad, esofagitis.",
    uses: "NAC alternativa, EPI, infecciones sensibles."
  },

  // --- Fluoroquinolonas ---
  {
    id: "levofloxacino",
    name: "Levofloxacino",
    family: "Fluoroquinolona",
    mechanism: "Inhibe DNA girasa/topoisomerasa.",
    spectrum: "Amplio (Gram+, Gram-, atípicos).",
    dose: "500-750 mg IV/PO c/24h",
    renal: "Ajustar si ClCr < 50 mL/min.",
    contraindications: "Miastenia gravis; precaución QT y tendinopatía.",
    adverse: "Tendinitis/ruptura, QT, neuropatía.",
    uses: "NAC (alergia beta-lactámicos), infecciones seleccionadas.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "both",
      anti_pseudomonas: true,
      anaerobic_activity: false,
      oral_option: true,
      stewardship_flags: ["Alto riesgo C. difficile", "Daño colateral"]
    }
  },
  {
    id: "ciprofloxacino",
    name: "Ciprofloxacino",
    family: "Fluoroquinolona",
    mechanism: "Inhibe DNA girasa/topoisomerasa.",
    spectrum: "Gram- (mejor), algo de Pseudomonas; menor cobertura neumococo.",
    dose: "250-500 mg PO c/12h (o IV según caso)",
    renal: "Ajustar en IR.",
    contraindications: "Miastenia gravis; precaución QT y tendinopatía.",
    adverse: "Tendinitis/ruptura, QT, neuropatía.",
    uses: "ITU seleccionada, alternativas según susceptibilidad.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "both",
      anti_pseudomonas: true,
      anaerobic_activity: false,
      oral_option: true,
      stewardship_flags: ["Alto riesgo C. difficile", "Alta resistencia local"]
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
    uses: "Alternativa en alergia beta-lactámicos (según escenario)."
  },

  // --- UTI específicos ---
  {
    id: "nitrofurantoina",
    name: "Nitrofurantoína",
    family: "Nitrofuranos",
    mechanism: "Daño de macromoléculas bacterianas.",
    spectrum: "E. coli, S. saprophyticus, Enterococcus. No Proteus/Pseudomonas.",
    dose: "100 mg PO c/12h (macrocristales)",
    renal: "Evitar si ClCr < 30 mL/min.",
    contraindications: "IR avanzada; término del embarazo.",
    adverse: "Náuseas; fibrosis pulmonar (crónico); hemólisis (G6PD).",
    uses: "Cistitis no complicada.",
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
    family: "Derivado fosfónico",
    mechanism: "Inhibe síntesis de pared (MurA).",
    spectrum: "Enterobacterales en ITU (variable).",
    dose: "3 g PO dosis única",
    renal: "Usar con precaución en IR avanzada (según contexto).",
    contraindications: "Hipersensibilidad.",
    adverse: "GI, cefalea.",
    uses: "Cistitis no complicada.",
    clinical_metadata: {
      aware: "Watch",
      spectrum: "broad",
      route_hint: "vo",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true,
      stewardship_flags: ["Reserva para cistitis BLEE (VO)"]
    }
  },
  {
    id: "cefadroxilo",
    name: "Cefadroxilo",
    family: "Cefalosporina de primera generación",
    mechanism: "Inhibe síntesis de pared celular.",
    spectrum: "Gram+ y algunos Gram- urinarios.",
    dose: "500 mg PO c/12h",
    renal: "Ajustar en insuficiencia renal.",
    contraindications: "Alergia a cefalosporinas.",
    adverse: "GI, rash, hipersensibilidad.",
    uses: "Alternativa en cistitis no complicada.",
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "vo",
      anti_pseudomonas: false,
      anaerobic_activity: false,
      oral_option: true
    }
  },

  // --- Otros relevantes por tus síndromes ---
  {
    id: "clindamicina",
    name: "Clindamicina",
    family: "Lincosamida",
    mechanism: "Inhibe síntesis proteica (50S).",
    spectrum: "Gram+ (incl. algunos MRSA CA), anaerobios.",
    dose: "300-450 mg PO c/6-8h o 600-900 mg IV c/8h",
    renal: "Sin ajuste renal habitual.",
    contraindications: "Hipersensibilidad.",
    adverse: "C. difficile, GI.",
    uses: "SSTI, EPI (alternativa), alergia a beta-lactámicos.",
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "both",
      anti_pseudomonas: false,
      anaerobic_activity: true,
      oral_option: true,
      stewardship_flags: ["Riesgo C. difficile elevado"]
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
    contraindications: "Alergia sulfas, embarazo (según trimestre) (contexto), déficit G6PD (precaución).",
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
  {
    id: "gentamicina",
    name: "Gentamicina",
    family: "Aminoglucósido",
    mechanism: "Inhibe síntesis proteica (30S) bactericida.",
    spectrum: "Gram-; sinergia con beta-lactámicos en enterococo/estreptococo.",
    dose: "3-5 mg/kg/día IV (dosis diaria o fraccionada según esquema)",
    renal: "Ajuste obligatorio; monitorizar niveles.",
    contraindications: "Miastenia gravis (precaución), hipersensibilidad.",
    adverse: "Nefrotoxicidad, ototoxicidad.",
    uses: "Endocarditis (sinergia), sepsis seleccionada.",
    clinical_metadata: {
      aware: "Access",
      spectrum: "narrow",
      route_hint: "ev",
      anti_pseudomonas: true,
      anaerobic_activity: false,
      oral_option: false,
      stewardship_flags: ["Monitorizar función renal"]
    }
  },
  {
    id: "rifampicina",
    name: "Rifampicina",
    family: "Rifamicina",
    mechanism: "Inhibe ARN polimerasa.",
    spectrum: "Gram+ (en combinación), micobacterias.",
    dose: "300 mg PO/IV c/8h o 600 mg c/12h (total 900-1200 mg/día según guía)",
    renal: "Sin ajuste renal habitual.",
    contraindications: "Interacciones relevantes (inductor CYP), hepatopatía severa (precaución).",
    adverse: "Hepatotoxicidad, coloración naranja de fluidos, interacciones.",
    uses: "Endocarditis protésica (combinación, biofilm)."
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = antibiotics;
}
else if (typeof window !== "undefined") {
  window.abg_antibiotics = antibiotics;
}
