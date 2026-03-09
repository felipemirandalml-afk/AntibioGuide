/**
 * @fileoverview PATHOGENS DATA
 * 
 * ARCHITECTURAL CONTRACT (Clinical vs Presentation):
 * This file contains the root entities for clinical pathogens. 
 * 
 * DATA SOURCE OF TRUTH:
 * - data/pathogens.js: Runtime source of truth for the application.
 * - data/pathogens.json: Source asset for intermediate refinement.
 * - data-files/pathogens_base.json: Taxonomic extraction artifact.
 * - data-files/microorganisms.csv: Raw source dataset.
 * - tools/csv_to_pathogens.js: Extraction utility.
 * 
 * [CLINICAL CORE] (Used for algorithmic rules/validation - do not change meaning arbitrarily)
 * - id: string
 * - taxonomy.gram: string
 * - resistance: object (canonical resistance patterns)
 * - clinical.usualSyndromes: string[] 
 * 
 * [PRESENTATION & CONTEXT] (Used primarily for UI display - safe to rephrase)
 * - name, synonyms, clinical.summary
 * - appMeta.order
 */

const pathogens = [
  {
    "id": "escherichia_coli",
    "name": "Escherichia coli",
    "shortName": "E. coli",
    "aliases": [],
    "taxonomy": {
      "gram": "negative",
      "morphology": "bacilos",
      "group": "enterobacterales"
    },
    "clinical": {
      "summary": "Bacilo entérico frecuente en ITU y bacteriemia.",
      "usualSyndromes": [
        "itu_complicada",
        "intraabdominal",
        "meningitis"
      ],
      "context": "Comunitario y hospitalario",
      "pearls": [
        "Principal reservorio de BLEE en la comunidad"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Vancomicina"
      ],
      "typicalAcquired": [
        "Ampicilina",
        "TMP-SMX",
        "Fluoroquinolonas (variable)"
      ],
      "stewardshipNote": "Evitar FQ empíricas si R% local >20%."
    },
    "appMeta": {
      "relevance": "extrema",
      "status": "active"
    },
    "tags": [
      "gram_negative"
    ],
    "summary": "Bacilo entérico frecuente en ITU y bacteriemia.",
    "common_syndromes": [
      "itu_complicada",
      "intraabdominal",
      "meningitis"
    ],
    "intrinsic_resistance": [
      "Vancomicina"
    ],
    "typical_resistance": [
      "Ampicilina",
      "TMP-SMX",
      "Fluoroquinolonas (variable)"
    ],
    "stewardship_note": "Evitar FQ empíricas si R% local >20%."
  },
  {
    "id": "streptococcus_pneumoniae",
    "name": "Streptococcus pneumoniae",
    "shortName": "S. pneumoniae",
    "aliases": [
      "Neumococo"
    ],
    "taxonomy": {
      "gram": "positive",
      "morphology": "diplococos lanceolados",
      "group": "diplococci"
    },
    "clinical": {
      "summary": "Coco Gram positivo frecuente en NAC y meningitis.",
      "usualSyndromes": [
        "nac",
        "meningitis",
        "sepsis_urinaria"
      ],
      "context": "Comunitario",
      "pearls": [
        "CURB-65 para estratificar riesgo en NAC",
        "antígeno urinario útil"
      ]
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [
        "Macrólidos",
        "Penicilina (variable)"
      ],
      "stewardshipNote": "Evitar macrólido en monoterapia si R% alto."
    },
    "appMeta": {
      "relevance": "crítica",
      "status": "active"
    },
    "tags": [
      "gram_positive"
    ],
    "summary": "Coco Gram positivo frecuente en NAC y meningitis.",
    "common_syndromes": [
      "nac",
      "meningitis",
      "sepsis_urinaria"
    ],
    "intrinsic_resistance": [],
    "typical_resistance": [
      "Macrólidos",
      "Penicilina (variable)"
    ],
    "stewardship_note": "Evitar macrólido en monoterapia si R% alto."
  },
  {
    "id": "streptococcus_pyogenes",
    "name": "Streptococcus pyogenes",
    "shortName": "S. pyogenes",
    "aliases": [
      "EBHGA",
      "Estreptococo grupo A"
    ],
    "taxonomy": {
      "gram": "positive",
      "morphology": "cocos en cadenas",
      "group": "cocci"
    },
    "clinical": {
      "summary": "Coco causante de faringitis y celulitis.",
      "usualSyndromes": [
        "faringitis",
        "celulitis"
      ],
      "context": "Comunitario",
      "pearls": [
        "Sensibilidad universal a penicilina mantenida",
        "riesgo de secuelas no supurativas"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Aminoglucósidos"
      ],
      "typicalAcquired": [
        "Macrólidos (variable)"
      ],
      "stewardshipNote": "Sensible universal a penicilina."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "tags": [
      "gram_positive"
    ],
    "summary": "Coco causante de faringitis y celulitis.",
    "common_syndromes": [
      "faringitis",
      "celulitis"
    ],
    "intrinsic_resistance": [
      "Aminoglucósidos"
    ],
    "typical_resistance": [
      "Macrólidos (variable)"
    ],
    "stewardship_note": "Sensible universal a penicilina."
  },
  {
    "id": "staphylococcus_aureus",
    "name": "Staphylococcus aureus",
    "shortName": "S. aureus",
    "aliases": [
      "Estafilococo dorado",
      "SARM",
      "SASM"
    ],
    "taxonomy": {
      "gram": "positive",
      "morphology": "cocos en racimos",
      "group": "cocci"
    },
    "clinical": {
      "summary": "Coco frecuente en infecciones cutáneas y bacteriemia.",
      "usualSyndromes": [
        "celulitis",
        "nac",
        "endocarditis_infecciosa",
        "pie_diabetico",
        "sepsis_urinaria"
      ],
      "context": "Comunitario y hospitalario",
      "pearls": [
        "Causa principal de endocarditis sobre válvula nativa",
        "requiere descartar siembra hematógena"
      ]
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [
        "Meticilina (MRSA)",
        "Penicilina"
      ],
      "stewardshipNote": "Evaluar riesgo MRSA."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "tags": [
      "gram_positive"
    ],
    "summary": "Coco frecuente en infecciones cutáneas y bacteriemia.",
    "common_syndromes": [
      "celulitis",
      "nac",
      "endocarditis_infecciosa",
      "pie_diabetico",
      "sepsis_urinaria"
    ],
    "intrinsic_resistance": [],
    "typical_resistance": [
      "Meticilina (MRSA)",
      "Penicilina"
    ],
    "stewardship_note": "Evaluar riesgo MRSA."
  },
  {
    "id": "pseudomonas_aeruginosa",
    "name": "Pseudomonas aeruginosa",
    "shortName": "P. aeruginosa",
    "aliases": [],
    "taxonomy": {
      "gram": "negative",
      "morphology": "bacilos",
      "group": "non_fermenter"
    },
    "clinical": {
      "summary": "Bacilo no fermentador asociado a infecciones graves.",
      "usualSyndromes": [
        "nih",
        "itu_complicada",
        "sepsis_urinaria"
      ],
      "context": "Hospitalario",
      "pearls": [
        "Importante en pacientes con Fibrosis Quística"
      ]
    },
    "resistance": {
      "intrinsic": [
        "TMP-SMX",
        "Ampicilina",
        "Amoxicilina-clavulánico",
        "Ceftriaxona",
        "Ertapenem"
      ],
      "typicalAcquired": [
        "Carbapenémicos",
        "Fluoroquinolonas",
        "Carbapenémicos",
        "Fluoroquinolonas"
      ],
      "stewardshipNote": "Evitar subdosificación."
    },
    "appMeta": {
      "relevance": "extrema",
      "status": "active"
    },
    "tags": [
      "gram_negative"
    ],
    "summary": "Bacilo no fermentador asociado a infecciones graves.",
    "common_syndromes": [
      "nih",
      "itu_complicada",
      "sepsis_urinaria"
    ],
    "intrinsic_resistance": [
      "TMP-SMX",
      "Ampicilina",
      "Amoxicilina-clavulánico",
      "Ceftriaxona",
      "Ertapenem"
    ],
    "typical_resistance": [
      "Carbapenémicos",
      "Fluoroquinolonas",
      "Carbapenémicos",
      "Fluoroquinolonas"
    ],
    "stewardship_note": "Evitar subdosificación."
  },
  {
    "id": "haemophilus_influenzae",
    "name": "Haemophilus influenzae",
    "shortName": "H. influenzae",
    "aliases": [
      "Bacilo de Pfeiffer"
    ],
    "taxonomy": {
      "gram": "negative",
      "morphology": "cocobacilos",
      "group": "coccobacilli"
    },
    "clinical": {
      "summary": "Coccobacilo respiratorio frecuente en NAC.",
      "usualSyndromes": [
        "faringitis",
        "meningitis"
      ],
      "context": "Comunitario",
      "pearls": [
        "Incidencia de Hib reducida drásticamente por vacunas"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Vancomicina"
      ],
      "typicalAcquired": [
        "Beta-lactamasa (algunas cepas)"
      ],
      "stewardshipNote": "Preferir amoxicilina-clavulánico si productor."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "tags": [
      "gram_negative"
    ],
    "summary": "Coccobacilo respiratorio frecuente en NAC.",
    "common_syndromes": [
      "faringitis",
      "meningitis"
    ],
    "intrinsic_resistance": [
      "Vancomicina"
    ],
    "typical_resistance": [
      "Beta-lactamasa (algunas cepas)"
    ],
    "stewardship_note": "Preferir amoxicilina-clavulánico si productor."
  },
  {
    "id": "mycoplasma_pneumoniae",
    "name": "Mycoplasma pneumoniae",
    "shortName": "M. pneumoniae",
    "aliases": [],
    "taxonomy": {
      "gram": "atypical",
      "morphology": "sin pared celular",
      "group": "atypical"
    },
    "clinical": {
      "summary": "Agente atípico en neumonía.",
      "usualSyndromes": [
        "nac"
      ],
      "context": "Comunitario",
      "pearls": [
        "No visible en tinción de Gram"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Beta-lactámicos"
      ],
      "typicalAcquired": [
        "Macrólidos (algunas regiones)"
      ],
      "stewardshipNote": "Usar macrólido o doxiciclina."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "tags": [
      "atypical"
    ],
    "summary": "Agente atípico en neumonía.",
    "common_syndromes": [
      "nac"
    ],
    "intrinsic_resistance": [
      "Beta-lactámicos"
    ],
    "typical_resistance": [
      "Macrólidos (algunas regiones)"
    ],
    "stewardship_note": "Usar macrólido o doxiciclina."
  },
  {
    "id": "chlamydia_pneumoniae",
    "name": "Chlamydia pneumoniae",
    "shortName": "C. pneumoniae",
    "aliases": [],
    "taxonomy": {
      "gram": "atypical",
      "morphology": "intracelular",
      "group": "atypical"
    },
    "clinical": {
      "summary": "Agente atípico respiratorio.",
      "usualSyndromes": [
        "nac"
      ],
      "context": "Comunitario",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Beta-lactámicos"
      ],
      "typicalAcquired": [],
      "stewardshipNote": "Doxiciclina alternativa."
    },
    "appMeta": {
      "relevance": "low",
      "status": "active"
    },
    "tags": [
      "atypical"
    ],
    "summary": "Agente atípico respiratorio.",
    "common_syndromes": [
      "nac"
    ],
    "intrinsic_resistance": [
      "Beta-lactámicos"
    ],
    "typical_resistance": [],
    "stewardship_note": "Doxiciclina alternativa."
  },
  {
    "id": "klebsiella_spp",
    "name": "Klebsiella spp.",
    "shortName": "Klebsiella spp.",
    "aliases": [],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "bacilo",
      "group": "Enterobacterales"
    },
    "clinical": {
      "summary": "Grupo de bacilos entéricos implicados en infecciones urinarias e intraabdominales comunitarias y nosocomiales.",
      "usualSyndromes": [
        "itu_complicada",
        "intraabdominal",
        "nih"
      ],
      "context": "Mixto",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Amoxicilina/Ampicilina (K. pneumoniae)."
      ],
      "typicalAcquired": [
        "Productores frecuentes de BLEE/KPC."
      ],
      "stewardshipNote": "Importante revisar epidemiología local si K. pneumoniae domina."
    },
    "appMeta": {
      "relevance": "high",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative",
      "bacilli",
      "enterobacterales"
    ],
    "summary": "Grupo de bacilos entéricos implicados en infecciones urinarias e intraabdominales comunitarias y nosocomiales.",
    "common_syndromes": [
      "itu_complicada",
      "intraabdominal",
      "nih"
    ],
    "intrinsic_resistance": [
      "Amoxicilina/Ampicilina (K. pneumoniae)."
    ],
    "typical_resistance": [
      "Productores frecuentes de BLEE/KPC."
    ],
    "stewardship_note": "Importante revisar epidemiología local si K. pneumoniae domina."
  },
  {
    "id": "klebsiella_pneumoniae",
    "name": "Klebsiella pneumoniae",
    "shortName": "K. pneumoniae",
    "aliases": [],
    "taxonomy": {
      "gram": "negative",
      "morphology": "bacilos encapsulados",
      "group": "enterobacterales"
    },
    "clinical": {
      "summary": "Bacilo entérico asociado a ITU y neumonía hospitalaria.",
      "usualSyndromes": [
        "nac",
        "itu_complicada"
      ],
      "context": "Hospitalario",
      "pearls": [
        "Alta asociación con brotes en UCI por carbapenemasas"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Ampicilina"
      ],
      "typicalAcquired": [
        "BLEE",
        "Carbapenemasas (algunas cepas)"
      ],
      "stewardshipNote": "Sospechar BLEE en infecciones nosocomiales."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "tags": [
      "gram_negative"
    ],
    "summary": "Bacilo entérico asociado a ITU y neumonía hospitalaria.",
    "common_syndromes": [
      "nac",
      "itu_complicada"
    ],
    "intrinsic_resistance": [
      "Ampicilina"
    ],
    "typical_resistance": [
      "BLEE",
      "Carbapenemasas (algunas cepas)"
    ],
    "stewardship_note": "Sospechar BLEE en infecciones nosocomiales."
  },
  {
    "id": "proteus_mirabilis",
    "name": "Proteus mirabilis",
    "shortName": "P. mirabilis",
    "aliases": [
      "Proteus"
    ],
    "taxonomy": {
      "gram": "negative",
      "morphology": "bacilo",
      "group": "enterobacterales"
    },
    "clinical": {
      "summary": "Bacilo entérico asociado a ITU complicada.",
      "usualSyndromes": [
        "itu_cistitis",
        "itu_pielonefritis"
      ],
      "context": "Comunitario",
      "pearls": [
        "Aumenta el pH de la orina promoviendo cálculos de estruvita."
      ]
    },
    "resistance": {
      "intrinsic": [
        "Nitrofurantoína"
      ],
      "typicalAcquired": [
        "Ampicilina",
        "TMP-SMX"
      ],
      "stewardshipNote": "Evitar nitrofurantoína."
    },
    "appMeta": {
      "relevance": "high",
      "status": "active"
    },
    "tags": [
      "gram_negative",
      "bacilli",
      "enterobacterales"
    ],
    "summary": "Bacilo entérico asociado a ITU complicada.",
    "common_syndromes": [
      "itu_cistitis",
      "itu_pielonefritis"
    ],
    "intrinsic_resistance": [
      "Nitrofurantoína"
    ],
    "typical_resistance": [
      "Ampicilina",
      "TMP-SMX"
    ],
    "stewardship_note": "Evitar nitrofurantoína."
  },
  {
    "id": "staphylococcus_saprophyticus",
    "name": "Staphylococcus saprophyticus",
    "shortName": "S. saprophyticus",
    "aliases": [],
    "taxonomy": {
      "gram": "positivo",
      "morphology": "coco",
      "group": "Staphylococcus (CoNS)"
    },
    "clinical": {
      "summary": "Segunda causa más común de cistitis no complicada en mujeres jóvenes.",
      "usualSyndromes": [
        "itu_cistitis"
      ],
      "context": "Comunitario",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Fosfomicina (algunas cepas presentan susceptibilidad clínica reducida in vivo frente a in vitro, debatido)."
      ],
      "typicalAcquired": [],
      "stewardshipNote": "Tratamiento estándar de cistitis no complicada funciona bien (excepto precaución local sugerida con fosfomicina en este agente particular)."
    },
    "appMeta": {
      "relevance": "medium",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_positive",
      "cocci"
    ],
    "summary": "Segunda causa más común de cistitis no complicada en mujeres jóvenes.",
    "common_syndromes": [
      "itu_cistitis"
    ],
    "intrinsic_resistance": [
      "Fosfomicina (algunas cepas presentan susceptibilidad clínica reducida in vivo frente a in vitro, debatido)."
    ],
    "typical_resistance": [],
    "stewardship_note": "Tratamiento estándar de cistitis no complicada funciona bien (excepto precaución local sugerida con fosfomicina en este agente particular)."
  },
  {
    "id": "enterobacter_spp",
    "name": "Enterobacter spp.",
    "shortName": "Enterobacter",
    "aliases": [
      "Enterobacter"
    ],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "bacilo",
      "group": "Enterobacterales"
    },
    "clinical": {
      "summary": "Bacilos del grupo SPACE/ESPM (productores induccibles AmpC).",
      "usualSyndromes": [
        "itu_pielonefritis",
        "nih"
      ],
      "context": "Nosocomial y comunitario atípico",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Amoxicilina-Clavulánico (AmpC cromosómico inducible)",
        "Cefalosporinas de primera generación."
      ],
      "typicalAcquired": [
        "Des-represión de AmpC durante tratamiento con cefalosporinas 3ra gen."
      ],
      "stewardshipNote": "Evitar Ceftriaxona aunque indique sensible in vitro por riesgo de des-represión de AmpC in vivo."
    },
    "appMeta": {
      "relevance": "high",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative",
      "bacilli",
      "enterobacterales"
    ],
    "summary": "Bacilos del grupo SPACE/ESPM (productores induccibles AmpC).",
    "common_syndromes": [
      "itu_pielonefritis",
      "nih"
    ],
    "intrinsic_resistance": [
      "Amoxicilina-Clavulánico (AmpC cromosómico inducible)",
      "Cefalosporinas de primera generación."
    ],
    "typical_resistance": [
      "Des-represión de AmpC durante tratamiento con cefalosporinas 3ra gen."
    ],
    "stewardship_note": "Evitar Ceftriaxona aunque indique sensible in vitro por riesgo de des-represión de AmpC in vivo."
  },
  {
    "id": "enterococcus_spp",
    "name": "Enterococcus spp.",
    "shortName": "Enterococcus",
    "aliases": [
      "Enterococo",
      "E. spp"
    ],
    "taxonomy": {
      "gram": "positivo",
      "morphology": "coco",
      "group": "Enterococcus"
    },
    "clinical": {
      "summary": "Cocos grampositivos asociados a ITU nosocomial y endocarditis.",
      "usualSyndromes": [
        "itu_complicada",
        "sepsis_urinaria",
        "intraabdominal"
      ],
      "context": "Generalmente nosocomial / post-antibioticoterapia",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Cefalosporinas todas",
        "Clindamicina"
      ],
      "typicalAcquired": [
        "Resistencia a Vanco (VRE) predominantemente en faecium."
      ],
      "stewardshipNote": "Tratamiento de elección generalmente Amoxicilina (faecalis). Cefalosporinas NO poseen actividad."
    },
    "appMeta": {
      "relevance": "high",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_positive",
      "cocci"
    ],
    "summary": "Cocos grampositivos asociados a ITU nosocomial y endocarditis.",
    "common_syndromes": [
      "itu_complicada",
      "sepsis_urinaria",
      "intraabdominal"
    ],
    "intrinsic_resistance": [
      "Cefalosporinas todas",
      "Clindamicina"
    ],
    "typical_resistance": [
      "Resistencia a Vanco (VRE) predominantemente en faecium."
    ],
    "stewardship_note": "Tratamiento de elección generalmente Amoxicilina (faecalis). Cefalosporinas NO poseen actividad."
  },
  {
    "id": "methicillin_resistant_staphylococcus_aureus",
    "name": "Methicillin-resistant Staphylococcus aureus",
    "shortName": "MRSA",
    "aliases": [
      "SAMR"
    ],
    "taxonomy": {
      "gram": "positivo",
      "morphology": "coco",
      "group": "Staphylococcus"
    },
    "clinical": {
      "summary": "Cepa de S. aureus con gen mecA (PBP2a), prevalente en abscesos cutáneos o foco invasivo nosocomial.",
      "usualSyndromes": [
        "celulitis",
        "pie_diabetico",
        "nih"
      ],
      "context": "Comunidad / Nosocomial",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Todos los betalactámicos, excepto ceftarolina (5ta gen)."
      ],
      "typicalAcquired": [
        "Macrólidos",
        "Clindamicina",
        "Quinolonas (frecuente)"
      ],
      "stewardshipNote": "Requiere vancomicina, linezolid o daptomicina (sepsis grave); clinda/TMP-SMX (piel leve)."
    },
    "appMeta": {
      "relevance": "high",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_positive",
      "cocci"
    ],
    "summary": "Cepa de S. aureus con gen mecA (PBP2a), prevalente en abscesos cutáneos o foco invasivo nosocomial.",
    "common_syndromes": [
      "celulitis",
      "pie_diabetico",
      "nih"
    ],
    "intrinsic_resistance": [
      "Todos los betalactámicos, excepto ceftarolina (5ta gen)."
    ],
    "typical_resistance": [
      "Macrólidos",
      "Clindamicina",
      "Quinolonas (frecuente)"
    ],
    "stewardship_note": "Requiere vancomicina, linezolid o daptomicina (sepsis grave); clinda/TMP-SMX (piel leve)."
  },
  {
    "id": "neisseria_gonorrhoeae",
    "name": "Neisseria gonorrhoeae",
    "shortName": "N. gonorrhoeae",
    "aliases": [
      "Gonococo"
    ],
    "taxonomy": {
      "gram": "negative",
      "morphology": "diplococos",
      "group": "diplococci"
    },
    "clinical": {
      "summary": "Diplococo causante de ITS.",
      "usualSyndromes": [
        "epi"
      ],
      "context": "Comunitario",
      "pearls": [
        "Tratamiento dual frecuente (Ceftriaxona + Azitromicina)"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Vancomicina"
      ],
      "typicalAcquired": [
        "Fluoroquinolonas",
        "Penicilina",
        "Fluoroquinolonas",
        "Penicilina"
      ],
      "stewardshipNote": "Ceftriaxona es estándar."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "tags": [
      "gram_negative"
    ],
    "summary": "Diplococo causante de ITS.",
    "common_syndromes": [
      "epi"
    ],
    "intrinsic_resistance": [
      "Vancomicina"
    ],
    "typical_resistance": [
      "Fluoroquinolonas",
      "Penicilina",
      "Fluoroquinolonas",
      "Penicilina"
    ],
    "stewardship_note": "Ceftriaxona es estándar."
  },
  {
    "id": "chlamydia_trachomatis",
    "name": "Chlamydia trachomatis",
    "shortName": "C. trachomatis",
    "aliases": [],
    "taxonomy": {
      "gram": "atípico",
      "morphology": "intracelular obligado",
      "group": "Chlamydiaceae"
    },
    "clinical": {
      "summary": "ITS bacteriana más frecuente en el mundo",
      "usualSyndromes": [],
      "context": "Comunitario",
      "pearls": [
        "Frecuente coinfección con Neisseria gonorrhoeae"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Betalactámicos"
      ],
      "typicalAcquired": [],
      "stewardshipNote": "Tratamiento de elección: Doxiciclina o Azitromicina"
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "atypical"
    ],
    "summary": "ITS bacteriana más frecuente en el mundo",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "Betalactámicos"
    ],
    "typical_resistance": [],
    "stewardship_note": "Tratamiento de elección: Doxiciclina o Azitromicina"
  },
  {
    "id": "anaerobes",
    "name": "Anaerobios",
    "shortName": "Anaerobios",
    "aliases": [],
    "taxonomy": {
      "gram": "variable",
      "morphology": "variable",
      "group": "Anaerobes"
    },
    "clinical": {
      "summary": "Flora mixta sinérgica en abscesos, infecciones abdominales y pie diabético.",
      "usualSyndromes": [
        "intraabdominal",
        "pie_diabetico",
        "epi"
      ],
      "context": "Polimicrobiano",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Aminoglucósidos (requieren oxígeno para entrar)."
      ],
      "typicalAcquired": [
        "Resistencia variable de B. fragilis a clindamicina."
      ],
      "stewardshipNote": "Metronidazol es pilar sub-diafragmático; Clinda sobre-diafragmático."
    },
    "appMeta": {
      "relevance": "medium",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "anaerobic"
    ],
    "summary": "Flora mixta sinérgica en abscesos, infecciones abdominales y pie diabético.",
    "common_syndromes": [
      "intraabdominal",
      "pie_diabetico",
      "epi"
    ],
    "intrinsic_resistance": [
      "Aminoglucósidos (requieren oxígeno para entrar)."
    ],
    "typical_resistance": [
      "Resistencia variable de B. fragilis a clindamicina."
    ],
    "stewardship_note": "Metronidazol es pilar sub-diafragmático; Clinda sobre-diafragmático."
  },
  {
    "id": "mycoplasma_genitalium",
    "name": "Mycoplasma genitalium",
    "shortName": "M. genitalium",
    "aliases": [],
    "taxonomy": {
      "gram": "atípico",
      "morphology": "pleomórfico",
      "group": "Mycoplasma"
    },
    "clinical": {
      "summary": "Agente emergente de ETS, similar a uretritis clamidial y parte del espectro EPI.",
      "usualSyndromes": [
        "epi"
      ],
      "context": "ETS",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Beta-lactámicos"
      ],
      "typicalAcquired": [
        "Resistencia a macrólidos en muy rápido ascenso (>50%)."
      ],
      "stewardshipNote": "Requiere pruebas de resistencia a macrólidos de ser posible o uso de fluoroquinolonas apropiadas."
    },
    "appMeta": {
      "relevance": "low",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "atypical"
    ],
    "summary": "Agente emergente de ETS, similar a uretritis clamidial y parte del espectro EPI.",
    "common_syndromes": [
      "epi"
    ],
    "intrinsic_resistance": [
      "Beta-lactámicos"
    ],
    "typical_resistance": [
      "Resistencia a macrólidos en muy rápido ascenso (>50%)."
    ],
    "stewardship_note": "Requiere pruebas de resistencia a macrólidos de ser posible o uso de fluoroquinolonas apropiadas."
  },
  {
    "id": "neisseria_meningitidis",
    "name": "Neisseria meningitidis",
    "shortName": "N. meningitidis",
    "aliases": [
      "Meningococo"
    ],
    "taxonomy": {
      "gram": "negative",
      "morphology": "diplococos",
      "group": "diplococci"
    },
    "clinical": {
      "summary": "Diplococo causante de meningitis.",
      "usualSyndromes": [
        "meningitis",
        "sepsis_urinaria"
      ],
      "context": "Comunitario (brotes epidémicos)",
      "pearls": [
        "Requiere quimioprofilaxis inmediata a contactos estrechos"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Vancomicina"
      ],
      "typicalAcquired": [
        "Penicilina (algunas cepas)"
      ],
      "stewardshipNote": "Ceftriaxona empírica."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "tags": [
      "gram_negative"
    ],
    "summary": "Diplococo causante de meningitis.",
    "common_syndromes": [
      "meningitis",
      "sepsis_urinaria"
    ],
    "intrinsic_resistance": [
      "Vancomicina"
    ],
    "typical_resistance": [
      "Penicilina (algunas cepas)"
    ],
    "stewardship_note": "Ceftriaxona empírica."
  },
  {
    "id": "listeria_monocytogenes",
    "name": "Listeria monocytogenes",
    "shortName": "L. monocytogenes",
    "aliases": [],
    "taxonomy": {
      "gram": "positive",
      "morphology": "bacilos cortos",
      "group": "bacilli"
    },
    "clinical": {
      "summary": "Bacilo causante de meningitis en inmunosuprimidos.",
      "usualSyndromes": [
        "meningitis"
      ],
      "context": "Embarazo;inmunocompromiso;ancianos",
      "pearls": [
        "Cefalosporinas son ineficaces (resistencia intrínseca)"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Cefalosporinas"
      ],
      "typicalAcquired": [],
      "stewardshipNote": "Usar ampicilina."
    },
    "appMeta": {
      "relevance": "moderada",
      "status": "active"
    },
    "tags": [
      "gram_positive"
    ],
    "summary": "Bacilo causante de meningitis en inmunosuprimidos.",
    "common_syndromes": [
      "meningitis"
    ],
    "intrinsic_resistance": [
      "Cefalosporinas"
    ],
    "typical_resistance": [],
    "stewardship_note": "Usar ampicilina."
  },
  {
    "id": "streptococcus_spp",
    "name": "Streptococcus spp.",
    "shortName": "Streptococcus spp.",
    "aliases": [
      "Estreptococos"
    ],
    "taxonomy": {
      "gram": "positivo",
      "morphology": "coco",
      "group": "Streptococcus"
    },
    "clinical": {
      "summary": "Cocos en cadenas asociados predominantemente a piel/tejidos blandos, y oro-faringe.",
      "usualSyndromes": [
        "celulitis",
        "pie_diabetico"
      ],
      "context": "Variable",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [],
      "stewardshipNote": "Generalmente muy sensibles a b-lactámicos puros."
    },
    "appMeta": {
      "relevance": "medium",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_positive",
      "cocci"
    ],
    "summary": "Cocos en cadenas asociados predominantemente a piel/tejidos blandos, y oro-faringe.",
    "common_syndromes": [
      "celulitis",
      "pie_diabetico"
    ],
    "intrinsic_resistance": [],
    "typical_resistance": [],
    "stewardship_note": "Generalmente muy sensibles a b-lactámicos puros."
  },
  {
    "id": "enterobacterales",
    "name": "Enterobacterales",
    "shortName": "Enterobacterias",
    "aliases": [
      "Enterobacterias"
    ],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "bacilo",
      "group": "Enterobacterales"
    },
    "clinical": {
      "summary": "Familia principal de bacilos gram negativos intestinales causantes de ITU y patología abdominal.",
      "usualSyndromes": [
        "intraabdominal",
        "pie_diabetico"
      ],
      "context": "Mixto",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [
        "BLEE",
        "Carbapenemasas"
      ],
      "stewardshipNote": "Base empírica suele depender de ceftriaxona comunitaria vs P/T nosocomial."
    },
    "appMeta": {
      "relevance": "high",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative",
      "bacilli",
      "enterobacterales"
    ],
    "summary": "Familia principal de bacilos gram negativos intestinales causantes de ITU y patología abdominal.",
    "common_syndromes": [
      "intraabdominal",
      "pie_diabetico"
    ],
    "intrinsic_resistance": [],
    "typical_resistance": [
      "BLEE",
      "Carbapenemasas"
    ],
    "stewardship_note": "Base empírica suele depender de ceftriaxona comunitaria vs P/T nosocomial."
  },
  {
    "id": "bacteroides_fragilis",
    "name": "Bacteroides fragilis",
    "shortName": "B. fragilis",
    "aliases": [],
    "taxonomy": {
      "gram": "negative",
      "morphology": "bacilos pleomórficos",
      "group": "obligate_anaerobe"
    },
    "clinical": {
      "summary": "Anaerobio frecuente en infecciones intraabdominales.",
      "usualSyndromes": [
        "intraabdominal"
      ],
      "context": "Comunitario y hospitalario",
      "pearls": [
        "Productor de betalactamasa"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Aminoglucósidos"
      ],
      "typicalAcquired": [
        "Resistencia creciente a clindamicina"
      ],
      "stewardshipNote": "Metronidazol eficaz."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "tags": [
      "gram_negative"
    ],
    "summary": "Anaerobio frecuente en infecciones intraabdominales.",
    "common_syndromes": [
      "intraabdominal"
    ],
    "intrinsic_resistance": [
      "Aminoglucósidos"
    ],
    "typical_resistance": [
      "Resistencia creciente a clindamicina"
    ],
    "stewardship_note": "Metronidazol eficaz."
  },
  {
    "id": "staphylococcus_cons",
    "name": "Staphylococcus coagulasa-negativo (CoNS)",
    "shortName": "CoNS",
    "aliases": [
      "SCN",
      "Coag-neg staph"
    ],
    "taxonomy": {
      "gram": "positivo",
      "morphology": "coco",
      "group": "Staphylococcus"
    },
    "clinical": {
      "summary": "Comensales de piel, frecuentemente causan bacteriemia transitoria o infección en cuerpos extraños/prótesis.",
      "usualSyndromes": [
        "endocarditis_infecciosa"
      ],
      "context": "Nosocomial / Prótesis",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [
        "Altas tasas de resistencia a meticilina (>70% en hospitales)."
      ],
      "stewardshipNote": "Si causa infección protésica verdadera, asume resistencia a oxacilina."
    },
    "appMeta": {
      "relevance": "medium",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_positive",
      "cocci"
    ],
    "summary": "Comensales de piel, frecuentemente causan bacteriemia transitoria o infección en cuerpos extraños/prótesis.",
    "common_syndromes": [
      "endocarditis_infecciosa"
    ],
    "intrinsic_resistance": [],
    "typical_resistance": [
      "Altas tasas de resistencia a meticilina (>70% en hospitales)."
    ],
    "stewardship_note": "Si causa infección protésica verdadera, asume resistencia a oxacilina."
  },
  {
    "id": "streptococcus_viridans_group",
    "name": "Streptococcus grupo viridans",
    "shortName": "Viridans",
    "aliases": [
      "Grupo viridans",
      "Streptococcus viridans"
    ],
    "taxonomy": {
      "gram": "positivo",
      "morphology": "coco",
      "group": "Streptococcus"
    },
    "clinical": {
      "summary": "Comensales orales implicados fuertemente en Endocarditis Infecciosa nativa subaguda.",
      "usualSyndromes": [
        "endocarditis_infecciosa"
      ],
      "context": "Subagudo odontogénico",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [
        "Tasa de resistencia a penicilina baja pero ascendente."
      ],
      "stewardshipNote": "Generalmente basta Penicilina/Ceftriaxona dirigida."
    },
    "appMeta": {
      "relevance": "medium",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_positive",
      "cocci"
    ],
    "summary": "Comensales orales implicados fuertemente en Endocarditis Infecciosa nativa subaguda.",
    "common_syndromes": [
      "endocarditis_infecciosa"
    ],
    "intrinsic_resistance": [],
    "typical_resistance": [
      "Tasa de resistencia a penicilina baja pero ascendente."
    ],
    "stewardship_note": "Generalmente basta Penicilina/Ceftriaxona dirigida."
  },
  {
    "id": "streptococcus_gallolyticus",
    "name": "Streptococcus gallolyticus",
    "shortName": "S. gallolyticus",
    "aliases": [
      "S. bovis",
      "Estreptococo bovis"
    ],
    "taxonomy": {
      "gram": "positivo",
      "morphology": "coco",
      "group": "Streptococcus"
    },
    "clinical": {
      "summary": "Causa endocarditis clásicamente asociada a cáncer de colon concomitante.",
      "usualSyndromes": [
        "endocarditis_infecciosa"
      ],
      "context": "Clásico Endocarditis-Cáncer",
      "pearls": [
        "Pacientes con S. gallolyticus requieren colonoscopia ineludiblemente."
      ]
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [],
      "stewardshipNote": "El tratamiento recae en Penicilina o Ceftriaxona similar a los Viridans."
    },
    "appMeta": {
      "relevance": "low",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_positive",
      "cocci"
    ],
    "summary": "Causa endocarditis clásicamente asociada a cáncer de colon concomitante.",
    "common_syndromes": [
      "endocarditis_infecciosa"
    ],
    "intrinsic_resistance": [],
    "typical_resistance": [],
    "stewardship_note": "El tratamiento recae en Penicilina o Ceftriaxona similar a los Viridans."
  },
  {
    "id": "enterococcus_faecalis",
    "name": "Enterococcus faecalis",
    "shortName": "E. faecalis",
    "aliases": [],
    "taxonomy": {
      "gram": "positive",
      "morphology": "cocos en cadenas/pares",
      "group": "cocci"
    },
    "clinical": {
      "summary": "Coco entérico asociado a ITU y bacteriemia.",
      "usualSyndromes": [
        "itu_complicada",
        "endocarditis_infecciosa",
        "intraabdominal"
      ],
      "context": "Hospitalario y comunitario",
      "pearls": [
        "Asociado a procedimientos urológicos y manipulación biliar"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Cefalosporinas"
      ],
      "typicalAcquired": [
        "Vancomicina (algunas cepas)"
      ],
      "stewardshipNote": "Evaluar susceptibilidad específica."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "tags": [
      "gram_positive"
    ],
    "summary": "Coco entérico asociado a ITU y bacteriemia.",
    "common_syndromes": [
      "itu_complicada",
      "endocarditis_infecciosa",
      "intraabdominal"
    ],
    "intrinsic_resistance": [
      "Cefalosporinas"
    ],
    "typical_resistance": [
      "Vancomicina (algunas cepas)"
    ],
    "stewardship_note": "Evaluar susceptibilidad específica."
  },
  {
    "id": "hacek_group",
    "name": "Grupo HACEK",
    "shortName": "HACEK",
    "aliases": [
      "HACEK"
    ],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "fastidioso",
      "group": "HACEK"
    },
    "clinical": {
      "summary": "Haemophilus, Aggregatibacter, Cardiobacterium, Eikenella, Kingella. Flora orofaríngea de lento crecimiento, causa de endocarditis indoloria.",
      "usualSyndromes": [
        "endocarditis_infecciosa"
      ],
      "context": "Endocarditis con cultivos inicialmente negativos",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [
        "Eventual producción de beta-lactamasas contra Ampicilina."
      ],
      "stewardshipNote": "Ceftriaxona empírica cubre rutinariamente al grupo HACEK de forma eficaz."
    },
    "appMeta": {
      "relevance": "medium",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative"
    ],
    "summary": "Haemophilus, Aggregatibacter, Cardiobacterium, Eikenella, Kingella. Flora orofaríngea de lento crecimiento, causa de endocarditis indoloria.",
    "common_syndromes": [
      "endocarditis_infecciosa"
    ],
    "intrinsic_resistance": [],
    "typical_resistance": [
      "Eventual producción de beta-lactamasas contra Ampicilina."
    ],
    "stewardship_note": "Ceftriaxona empírica cubre rutinariamente al grupo HACEK de forma eficaz."
  },
  {
    "id": "gram_negative_bacilli_non_hacek",
    "name": "Bacilos gramnegativos (nosocomial no-HACEK)",
    "shortName": "BGN no-HACEK",
    "aliases": [],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "bacilo",
      "group": "Mixto BGN"
    },
    "clinical": {
      "summary": "Casos más raros de endocarditis por enterobacterias asociadas a focos a distancia (urinario, abdominal, catéteres).",
      "usualSyndromes": [
        "endocarditis_infecciosa"
      ],
      "context": "Bacteriemia secundaria complicada",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [
        "Perfil de resistencia dependiente de la especie individual en hemocultivos."
      ],
      "stewardshipNote": "Requiere terapia con antibióticos bactericidas de amplio espectro guiada in-vitro estrictamente."
    },
    "appMeta": {
      "relevance": "low",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative",
      "bacilli"
    ],
    "summary": "Casos más raros de endocarditis por enterobacterias asociadas a focos a distancia (urinario, abdominal, catéteres).",
    "common_syndromes": [
      "endocarditis_infecciosa"
    ],
    "intrinsic_resistance": [],
    "typical_resistance": [
      "Perfil de resistencia dependiente de la especie individual en hemocultivos."
    ],
    "stewardship_note": "Requiere terapia con antibióticos bactericidas de amplio espectro guiada in-vitro estrictamente."
  },
  {
    "id": "candida_spp",
    "name": "Candida spp.",
    "shortName": "Candida spp.",
    "aliases": [
      "Hongos",
      "Levaduras"
    ],
    "taxonomy": {
      "gram": "fúngico",
      "morphology": "levadura",
      "group": "Fungi"
    },
    "clinical": {
      "summary": "Infección fúngica invasora asentuada en nutrición parenteral, UDIV, y prótesis graves.",
      "usualSyndromes": [
        "endocarditis_infecciosa"
      ],
      "context": "Inmunosuprimidos o PVE graves",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Antibacterianos en general."
      ],
      "typicalAcquired": [
        "Fluconazol para cepas C. glabrata o C. krusei."
      ],
      "stewardshipNote": "Generalmente implica reemplazo valvular y terapia equinocandina inicial."
    },
    "appMeta": {
      "relevance": "low",
      "status": "active"
    },
    "category": "fungi",
    "tags": [],
    "summary": "Infección fúngica invasora asentuada en nutrición parenteral, UDIV, y prótesis graves.",
    "common_syndromes": [
      "endocarditis_infecciosa"
    ],
    "intrinsic_resistance": [
      "Antibacterianos en general."
    ],
    "typical_resistance": [
      "Fluconazol para cepas C. glabrata o C. krusei."
    ],
    "stewardship_note": "Generalmente implica reemplazo valvular y terapia equinocandina inicial."
  },
  {
    "id": "culture_negative_endocarditis_zoonotic",
    "name": "Coxiella burnetii / Bartonella / Brucella",
    "shortName": "Cultivos Negativos / Zoonóticas",
    "aliases": [
      "Fiebre Q",
      "Zoonosis"
    ],
    "taxonomy": {
      "gram": "variable",
      "morphology": "intracelular",
      "group": "Zoonoses"
    },
    "clinical": {
      "summary": "Causas etiológicas clave en Endocarditis con hemocultivos negativos repetidos (CNE).",
      "usualSyndromes": [
        "endocarditis_infecciosa"
      ],
      "context": "Exposición zoonótica / Exudados estériles",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Patógenos difíciles de testear in-vitro."
      ],
      "typicalAcquired": [],
      "stewardshipNote": "El empirismo frente a CNE sin otra explicación suele requerir Doxiciclina asociada en discusión en comité de endocarditis."
    },
    "appMeta": {
      "relevance": "low",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [],
    "summary": "Causas etiológicas clave en Endocarditis con hemocultivos negativos repetidos (CNE).",
    "common_syndromes": [
      "endocarditis_infecciosa"
    ],
    "intrinsic_resistance": [
      "Patógenos difíciles de testear in-vitro."
    ],
    "typical_resistance": [],
    "stewardship_note": "El empirismo frente a CNE sin otra explicación suele requerir Doxiciclina asociada en discusión en comité de endocarditis."
  },
  {
    "id": "acinetobacter_baumannii",
    "name": "Acinetobacter baumannii",
    "shortName": "A. baumannii",
    "aliases": [],
    "taxonomy": {
      "gram": "negative",
      "morphology": "cocobacilos/bacilos",
      "group": "non_fermenter"
    },
    "clinical": {
      "summary": "Bacilo hospitalario multirresistente.",
      "usualSyndromes": [
        "nih",
        "sepsis_urinaria",
        "pie_diabetico"
      ],
      "context": "Hospitalario",
      "pearls": [
        "Capacidad extrema de sobrevivir en superficies secas"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Ampicilina",
        "Amoxicilina-clavulánico",
        "Cefalosporinas 1ª/2ª",
        "Ertapenem"
      ],
      "typicalAcquired": [
        "Carbapenémicos",
        "Carbapenémicos"
      ],
      "stewardshipNote": "Alta vigilancia PROA."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "tags": [
      "gram_negative"
    ],
    "summary": "Bacilo hospitalario multirresistente.",
    "common_syndromes": [
      "nih",
      "sepsis_urinaria",
      "pie_diabetico"
    ],
    "intrinsic_resistance": [
      "Ampicilina",
      "Amoxicilina-clavulánico",
      "Cefalosporinas 1ª/2ª",
      "Ertapenem"
    ],
    "typical_resistance": [
      "Carbapenémicos",
      "Carbapenémicos"
    ],
    "stewardship_note": "Alta vigilancia PROA."
  },
  {
    "id": "staphylococcus_sp",
    "name": "Staphylococcus spp.",
    "shortName": "Staph spp (no tipificado)",
    "aliases": [],
    "taxonomy": {
      "gram": "positivo",
      "morphology": "coco",
      "group": "Staphylococcus"
    },
    "clinical": {
      "summary": "Dato crudo que engloba especies sin diferenciación exacta en tablas de susceptibilidad.",
      "usualSyndromes": [],
      "context": "Reporte microbiológico general",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [],
      "stewardshipNote": "Se debe precisar si es Aureus o CoNS de ser posible."
    },
    "appMeta": {
      "relevance": "low",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_positive",
      "cocci"
    ],
    "summary": "Dato crudo que engloba especies sin diferenciación exacta en tablas de susceptibilidad.",
    "common_syndromes": [],
    "intrinsic_resistance": [],
    "typical_resistance": [],
    "stewardship_note": "Se debe precisar si es Aureus o CoNS de ser posible."
  },
  {
    "id": "enterococcus_faecium",
    "name": "Enterococcus faecium",
    "shortName": "E. faecium",
    "aliases": [],
    "taxonomy": {
      "gram": "positive",
      "morphology": "cocos en cadenas/pares",
      "group": "cocci"
    },
    "clinical": {
      "summary": "Coco entérico frecuentemente resistente.",
      "usualSyndromes": [
        "nih",
        "endocarditis_infecciosa",
        "itu_complicada"
      ],
      "context": "Hospitalario (UCI)",
      "pearls": [
        "Frecuente colonizador tras uso de cefalosporinas de amplio espectro"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Cefalosporinas"
      ],
      "typicalAcquired": [
        "Vancomicina (VRE frecuente)"
      ],
      "stewardshipNote": "Considerar linezolid o daptomicina."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "tags": [
      "gram_positive"
    ],
    "summary": "Coco entérico frecuentemente resistente.",
    "common_syndromes": [
      "nih",
      "endocarditis_infecciosa",
      "itu_complicada"
    ],
    "intrinsic_resistance": [
      "Cefalosporinas"
    ],
    "typical_resistance": [
      "Vancomicina (VRE frecuente)"
    ],
    "stewardship_note": "Considerar linezolid o daptomicina."
  },
  {
    "id": "klebsiella_oxytoca",
    "name": "Klebsiella oxytoca",
    "shortName": "K. oxytoca",
    "aliases": [],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "bacilo",
      "group": "Enterobacterales"
    },
    "clinical": {
      "summary": "Segunda especie de Klebsiella de importancia clínica.",
      "usualSyndromes": [],
      "context": "Nosocomial y ambiental",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Suele tener resistencia intrínseca o de muy bajo umbral a b-lactamicos básicos."
      ],
      "typicalAcquired": [
        "Alta producción natural de beta-lactamasas del tipo OXY y BLEE adquirido."
      ],
      "stewardshipNote": "El tratamiento con amoxicilina-clavulanico suele presentar barreras."
    },
    "appMeta": {
      "relevance": "medium",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative",
      "bacilli",
      "enterobacterales"
    ],
    "summary": "Segunda especie de Klebsiella de importancia clínica.",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "Suele tener resistencia intrínseca o de muy bajo umbral a b-lactamicos básicos."
    ],
    "typical_resistance": [
      "Alta producción natural de beta-lactamasas del tipo OXY y BLEE adquirido."
    ],
    "stewardship_note": "El tratamiento con amoxicilina-clavulanico suele presentar barreras."
  },
  {
    "id": "enterobacter_cloacae_complex",
    "name": "Enterobacter cloacae complex",
    "shortName": "E. cloacae complex",
    "aliases": [],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "bacilo",
      "group": "Enterobacterales"
    },
    "clinical": {
      "summary": "Complejo bacteriano oportunista prototipo del grupo AmpC.",
      "usualSyndromes": [],
      "context": "Nosocomial",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "AmpC inducible de genotipo agresivo."
      ],
      "typicalAcquired": [
        "Altamente propenso a des-represión in-vivo durante terapia con Ceftriaxona o Ceftazidima."
      ],
      "stewardshipNote": "Evitar cefalosporinas de espectro expandido para infecciones graves confirmadas; usar Cefepime o carbapenémicos."
    },
    "appMeta": {
      "relevance": "high",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative",
      "bacilli",
      "enterobacterales"
    ],
    "summary": "Complejo bacteriano oportunista prototipo del grupo AmpC.",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "AmpC inducible de genotipo agresivo."
    ],
    "typical_resistance": [
      "Altamente propenso a des-represión in-vivo durante terapia con Ceftriaxona o Ceftazidima."
    ],
    "stewardship_note": "Evitar cefalosporinas de espectro expandido para infecciones graves confirmadas; usar Cefepime o carbapenémicos."
  },
  {
    "id": "citrobacter_freundii",
    "name": "Citrobacter freundii",
    "shortName": "C. freundii",
    "aliases": [],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "bacilo",
      "group": "Enterobacterales"
    },
    "clinical": {
      "summary": "Agente bacteriano entérico que puede portar el gen de AmpC intra-cromosomal.",
      "usualSyndromes": [],
      "context": "Tractos respiratorio/urinario hospitalizados",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Como parte del grupo ESPM, producción inducible de AmpC."
      ],
      "typicalAcquired": [],
      "stewardshipNote": "Se recomiendan Cefepime o Ertapenem si la infección es grave, en evitación a desrepresiones de la cefalosporinasa."
    },
    "appMeta": {
      "relevance": "medium",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative",
      "bacilli",
      "enterobacterales"
    ],
    "summary": "Agente bacteriano entérico que puede portar el gen de AmpC intra-cromosomal.",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "Como parte del grupo ESPM, producción inducible de AmpC."
    ],
    "typical_resistance": [],
    "stewardship_note": "Se recomiendan Cefepime o Ertapenem si la infección es grave, en evitación a desrepresiones de la cefalosporinasa."
  },
  {
    "id": "serratia_marcescens",
    "name": "Serratia marcescens",
    "shortName": "S. marcescens",
    "aliases": [
      "Serratia"
    ],
    "taxonomy": {
      "gram": "negative",
      "morphology": "bacilo",
      "group": "enterobacterales"
    },
    "clinical": {
      "summary": "Bacilo hospitalario oportunista.",
      "usualSyndromes": [],
      "context": "Nosocomial/Insumos contaminados",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Ampicilina",
        "Cefalosporinas 1ª"
      ],
      "typicalAcquired": [
        "Cefalosporinas 3ª (por AmpC)"
      ],
      "stewardshipNote": "Considerar perfil local."
    },
    "appMeta": {
      "relevance": "high",
      "status": "active"
    },
    "tags": [
      "gram_negative",
      "bacilli",
      "enterobacterales"
    ],
    "summary": "Bacilo hospitalario oportunista.",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "Ampicilina",
      "Cefalosporinas 1ª"
    ],
    "typical_resistance": [
      "Cefalosporinas 3ª (por AmpC)"
    ],
    "stewardship_note": "Considerar perfil local."
  },
  {
    "id": "morganella_morganii",
    "name": "Morganella morganii",
    "shortName": "M. morganii",
    "aliases": [],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "bacilo",
      "group": "Enterobacterales"
    },
    "clinical": {
      "summary": "Pertenece al antiguo grupo Proteeae y con comportamiento de productor AmpC natural.",
      "usualSyndromes": [],
      "context": "Secundario urinario e infecciones debidas a hospitalización.",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Colistín/Polimixina, Nitrofurantoína, Ampicilina, Cefazolina."
      ],
      "typicalAcquired": [
        "AmpC inducible y desrepresión."
      ],
      "stewardshipNote": "Posee gran cantidad de resistencias intrínsecas a antibióticos de 'rescate' (polimixinas) o de rutina ambulatoria (nitrofurantoína)."
    },
    "appMeta": {
      "relevance": "medium",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative",
      "bacilli",
      "enterobacterales"
    ],
    "summary": "Pertenece al antiguo grupo Proteeae y con comportamiento de productor AmpC natural.",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "Colistín/Polimixina, Nitrofurantoína, Ampicilina, Cefazolina."
    ],
    "typical_resistance": [
      "AmpC inducible y desrepresión."
    ],
    "stewardship_note": "Posee gran cantidad de resistencias intrínsecas a antibióticos de 'rescate' (polimixinas) o de rutina ambulatoria (nitrofurantoína)."
  },
  {
    "id": "stenotrophomonas_maltophilia",
    "name": "Stenotrophomonas maltophilia",
    "shortName": "S. maltophilia",
    "aliases": [],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "bacilos",
      "group": "Xanthomonadaceae"
    },
    "clinical": {
      "summary": "Bacilo no fermentador asociado a uso previo de carbapenémicos",
      "usualSyndromes": [
        "nih"
      ],
      "context": "Hospitalario",
      "pearls": [
        "Baja virulencia pero alta resistencia antibiótica"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Carbapenémicos (L1 metalo-betalactamasa)"
      ],
      "typicalAcquired": [],
      "stewardshipNote": "Tratamiento de elección: TMP-SMX"
    },
    "appMeta": {
      "relevance": "moderada",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative"
    ],
    "summary": "Bacilo no fermentador asociado a uso previo de carbapenémicos",
    "common_syndromes": [
      "nih"
    ],
    "intrinsic_resistance": [
      "Carbapenémicos (L1 metalo-betalactamasa)"
    ],
    "typical_resistance": [],
    "stewardship_note": "Tratamiento de elección: TMP-SMX"
  },
  {
    "id": "streptococcus_agalactiae",
    "name": "Streptococcus agalactiae",
    "shortName": "S. agalactiae",
    "aliases": [
      "EGB",
      "Estreptococo grupo B"
    ],
    "taxonomy": {
      "gram": "positive",
      "morphology": "cocos en cadenas",
      "group": "cocci"
    },
    "clinical": {
      "summary": "Coco asociado a bacteriemia en adultos vulnerables.",
      "usualSyndromes": [
        "meningitis",
        "itu_cistitis"
      ],
      "context": "Materno-fetal;embarazo",
      "pearls": [
        "Profilaxis intraparto reduce incidencia de sepsis temprana"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Aminoglucósidos"
      ],
      "typicalAcquired": [
        "Macrólidos (variable)"
      ],
      "stewardshipNote": "Penicilina es tratamiento de elección."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "tags": [
      "gram_positive"
    ],
    "summary": "Coco asociado a bacteriemia en adultos vulnerables.",
    "common_syndromes": [
      "meningitis",
      "itu_cistitis"
    ],
    "intrinsic_resistance": [
      "Aminoglucósidos"
    ],
    "typical_resistance": [
      "Macrólidos (variable)"
    ],
    "stewardship_note": "Penicilina es tratamiento de elección."
  },
  {
    "id": "clostridioides_difficile",
    "name": "Clostridioides difficile",
    "shortName": "C. difficile",
    "aliases": [
      "C. diff"
    ],
    "taxonomy": {
      "gram": "positive",
      "morphology": "bacilos esporulados",
      "group": "obligate_anaerobe"
    },
    "clinical": {
      "summary": "Anaerobio productor de toxina en diarrea asociada a antibióticos.",
      "usualSyndromes": [
        "intraabdominal"
      ],
      "context": "Hospitalario",
      "pearls": [
        "Riesgo aumentado tras uso de clindamicina o quinolonas"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Aminoglucósidos",
        "Cefalosporinas"
      ],
      "typicalAcquired": [
        "Fluoroquinolonas"
      ],
      "stewardshipNote": "Evitar antibióticos innecesarios."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "tags": [
      "gram_positive"
    ],
    "summary": "Anaerobio productor de toxina en diarrea asociada a antibióticos.",
    "common_syndromes": [
      "intraabdominal"
    ],
    "intrinsic_resistance": [
      "Aminoglucósidos",
      "Cefalosporinas"
    ],
    "typical_resistance": [
      "Fluoroquinolonas"
    ],
    "stewardship_note": "Evitar antibióticos innecesarios."
  },
  {
    "id": "corynebacterium_diphtheriae",
    "name": "Corynebacterium diphtheriae",
    "shortName": "C. diphtheriae",
    "aliases": [
      "Bacilo de Klebs-Löffler"
    ],
    "taxonomy": {
      "gram": "positivo",
      "morphology": "bacilos pleomórficos (letras chinas)",
      "group": "Corynebacteriaceae"
    },
    "clinical": {
      "summary": "Productor de exotoxina causante de membranas faríngeas",
      "usualSyndromes": [],
      "context": "Comunitario (zonas con baja vacunación)",
      "pearls": [
        "Requiere notificación inmediata y uso de antitoxina"
      ]
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [],
      "stewardshipNote": "Vacunación sistemática (DTaP/Td)"
    },
    "appMeta": {
      "relevance": "baja/moderada",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_positive"
    ],
    "summary": "Productor de exotoxina causante de membranas faríngeas",
    "common_syndromes": [],
    "intrinsic_resistance": [],
    "typical_resistance": [],
    "stewardship_note": "Vacunación sistemática (DTaP/Td)"
  },
  {
    "id": "moraxella_catarrhalis",
    "name": "Moraxella catarrhalis",
    "shortName": "M. catarrhalis",
    "aliases": [],
    "taxonomy": {
      "gram": "negative",
      "morphology": "diplococos",
      "group": "diplococci"
    },
    "clinical": {
      "summary": "Diplococo respiratorio en EPOC.",
      "usualSyndromes": [],
      "context": "Exacerbación de EPOC;otitis media;sinusitis",
      "pearls": [
        "Comunitario"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Vancomicina"
      ],
      "typicalAcquired": [
        "Penicilina (por beta-lactamasa)",
        "Penicilina (por beta-lactamasa)"
      ],
      "stewardshipNote": "Amoxicilina-clavulánico alternativa."
    },
    "appMeta": {
      "relevance": "aware: acceso (amoxicilina/clavulánico)",
      "status": "active"
    },
    "tags": [
      "gram_negative"
    ],
    "summary": "Diplococo respiratorio en EPOC.",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "Vancomicina"
    ],
    "typical_resistance": [
      "Penicilina (por beta-lactamasa)",
      "Penicilina (por beta-lactamasa)"
    ],
    "stewardship_note": "Amoxicilina-clavulánico alternativa."
  },
  {
    "id": "salmonella_enterica_typhi",
    "name": "Salmonella enterica serovar Typhi",
    "shortName": "S. Typhi",
    "aliases": [
      "Bacilo de Eberth"
    ],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "bacilos",
      "group": "Enterobacteriaceae"
    },
    "clinical": {
      "summary": "Agente de la fiebre tifoidea transmitido por vía fecal-oral",
      "usualSyndromes": [
        "sepsis_urinaria"
      ],
      "context": "Comunitario (áreas con saneamiento deficiente)",
      "pearls": [
        "Estado de portador crónico en vesícula biliar"
      ]
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [
        "Resistencia a quinolonas (NAL-R)"
      ],
      "stewardshipNote": "AWaRe: Vigilancia (Ceftriaxona)"
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative"
    ],
    "summary": "Agente de la fiebre tifoidea transmitido por vía fecal-oral",
    "common_syndromes": [
      "sepsis_urinaria"
    ],
    "intrinsic_resistance": [],
    "typical_resistance": [
      "Resistencia a quinolonas (NAL-R)"
    ],
    "stewardship_note": "AWaRe: Vigilancia (Ceftriaxona)"
  },
  {
    "id": "bordetella_pertussis",
    "name": "Bordetella pertussis",
    "shortName": "B. pertussis",
    "aliases": [],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "cocobacilos",
      "group": "Alcaligenaceae"
    },
    "clinical": {
      "summary": "Causa la tos ferina o coqueluche",
      "usualSyndromes": [],
      "context": "Comunitario (especialmente lactantes)",
      "pearls": [
        "Transmisibilidad muy alta",
        "requiere profilaxis en contactos"
      ]
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [],
      "stewardshipNote": "Vacunación (Penta/Hexavalente)"
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative"
    ],
    "summary": "Causa la tos ferina o coqueluche",
    "common_syndromes": [],
    "intrinsic_resistance": [],
    "typical_resistance": [],
    "stewardship_note": "Vacunación (Penta/Hexavalente)"
  },
  {
    "id": "vibrio_cholerae",
    "name": "Vibrio cholerae",
    "shortName": "V. cholerae",
    "aliases": [],
    "taxonomy": {
      "gram": "negative",
      "morphology": "bacilos curvos (comas)",
      "group": "bacilli"
    },
    "clinical": {
      "summary": "Bacilo acuático causante de cólera.",
      "usualSyndromes": [],
      "context": "Epidémico/Brotes",
      "pearls": [
        "Manejo principal es la rehidratación agresiva"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Vancomicina"
      ],
      "typicalAcquired": [
        "Tetraciclinas (variable)"
      ],
      "stewardshipNote": "Rehidratación es clave."
    },
    "appMeta": {
      "relevance": "moderada",
      "status": "active"
    },
    "tags": [
      "gram_negative"
    ],
    "summary": "Bacilo acuático causante de cólera.",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "Vancomicina"
    ],
    "typical_resistance": [
      "Tetraciclinas (variable)"
    ],
    "stewardship_note": "Rehidratación es clave."
  },
  {
    "id": "campylobacter_jejuni",
    "name": "Campylobacter jejuni",
    "shortName": "C. jejuni",
    "aliases": [],
    "taxonomy": {
      "gram": "negative",
      "morphology": "bacilos curvos/espirales",
      "group": "bacilli"
    },
    "clinical": {
      "summary": "Bacilo curvo causante de diarrea.",
      "usualSyndromes": [],
      "context": "Comunitario (pollo mal cocido)",
      "pearls": [
        "Asociado a riesgo de síndrome de Guillain-Barré"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Vancomicina"
      ],
      "typicalAcquired": [
        "Fluoroquinolonas",
        "Fluoroquinolonas"
      ],
      "stewardshipNote": "Macrólido preferido."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "tags": [
      "gram_negative"
    ],
    "summary": "Bacilo curvo causante de diarrea.",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "Vancomicina"
    ],
    "typical_resistance": [
      "Fluoroquinolonas",
      "Fluoroquinolonas"
    ],
    "stewardship_note": "Macrólido preferido."
  },
  {
    "id": "helicobacter_pylori",
    "name": "Helicobacter pylori",
    "shortName": "H. pylori",
    "aliases": [],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "bacilos curvos",
      "group": "Helicobacteraceae"
    },
    "clinical": {
      "summary": "Colonizador gástrico asociado a úlceras y cáncer",
      "usualSyndromes": [],
      "context": "Comunitario",
      "pearls": [
        "Tratamiento suele ser triple o cuádruple terapia"
      ]
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [],
      "stewardshipNote": "Requiere prueba de erradicación tras tratamiento"
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative"
    ],
    "summary": "Colonizador gástrico asociado a úlceras y cáncer",
    "common_syndromes": [],
    "intrinsic_resistance": [],
    "typical_resistance": [],
    "stewardship_note": "Requiere prueba de erradicación tras tratamiento"
  },
  {
    "id": "legionella_pneumophila",
    "name": "Legionella pneumophila",
    "shortName": "L. pneumophila",
    "aliases": [],
    "taxonomy": {
      "gram": "atypical",
      "morphology": "bacilos (tinción difícil)",
      "group": "atypical"
    },
    "clinical": {
      "summary": "Bacilo asociado a neumonía grave.",
      "usualSyndromes": [],
      "context": "Comunitario/Institucional (Hoteles/Hospitales)",
      "pearls": [
        "Antígeno urinario es la prueba diagnóstica de elección"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Beta-lactámicos"
      ],
      "typicalAcquired": [],
      "stewardshipNote": "Usar macrólido o fluoroquinolona."
    },
    "appMeta": {
      "relevance": "moderada",
      "status": "active"
    },
    "tags": [
      "gram_negative"
    ],
    "summary": "Bacilo asociado a neumonía grave.",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "Beta-lactámicos"
    ],
    "typical_resistance": [],
    "stewardship_note": "Usar macrólido o fluoroquinolona."
  },
  {
    "id": "treponema_pallidum",
    "name": "Treponema pallidum",
    "shortName": "T. pallidum",
    "aliases": [
      "Espiroqueta de la sífilis"
    ],
    "taxonomy": {
      "gram": "atípico",
      "morphology": "espiroqueta",
      "group": "Spirochaetaceae"
    },
    "clinical": {
      "summary": "Agente de la sífilis",
      "usualSyndromes": [],
      "context": "Sífilis (primaria",
      "pearls": [
        "secundaria"
      ]
    },
    "resistance": {
      "intrinsic": [
        "latente"
      ],
      "typicalAcquired": [
        "terciaria)",
        "neurosífilis"
      ],
      "stewardshipNote": "Comunitario"
    },
    "appMeta": {
      "relevance": "diagnóstico mediante pruebas no treponémicas (rpr/vdrl) y treponémicas",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "atypical"
    ],
    "summary": "Agente de la sífilis",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "latente"
    ],
    "typical_resistance": [
      "terciaria)",
      "neurosífilis"
    ],
    "stewardship_note": "Comunitario"
  },
  {
    "id": "mycobacterium_tuberculosis",
    "name": "Mycobacterium tuberculosis",
    "shortName": "M. tuberculosis",
    "aliases": [
      "Bacilo de Koch"
    ],
    "taxonomy": {
      "gram": "atípico",
      "morphology": "bacilo ácido-alcohol resistente (AAR)",
      "group": "Mycobacteriaceae"
    },
    "clinical": {
      "summary": "Causa la tuberculosis",
      "usualSyndromes": [],
      "context": "Tuberculosis pulmonar y extrapulmonar",
      "pearls": [
        "Comunitario/Institucional"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Requiere tratamiento prolongado y multiasociado (TDO)"
      ],
      "typicalAcquired": [],
      "stewardshipNote": "MDR;XDR (multirresistencia)"
    },
    "appMeta": {
      "relevance": "uso restringido de rifampicina en programas nacionales",
      "status": "active"
    },
    "category": "Extrema",
    "tags": [
      "atypical"
    ],
    "summary": "Causa la tuberculosis",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "Requiere tratamiento prolongado y multiasociado (TDO)"
    ],
    "typical_resistance": [],
    "stewardship_note": "MDR;XDR (multirresistencia)"
  },
  {
    "id": "mycobacterium_leprae",
    "name": "Mycobacterium leprae",
    "shortName": "M. leprae",
    "aliases": [
      "Bacilo de Hansen"
    ],
    "taxonomy": {
      "gram": "atípico",
      "morphology": "bacilo AAR",
      "group": "Mycobacteriaceae"
    },
    "clinical": {
      "summary": "Agente de la lepra",
      "usualSyndromes": [],
      "context": "Lepra paucibacilar y multibacilar",
      "pearls": [
        "Comunitario"
      ]
    },
    "resistance": {
      "intrinsic": [
        "No cultivable en medios artificiales"
      ],
      "typicalAcquired": [],
      "stewardshipNote": ""
    },
    "appMeta": {
      "relevance": "tratamiento multidroga (rifampicina+dapsona+clofazimina)",
      "status": "active"
    },
    "category": "Moderada",
    "tags": [
      "atypical"
    ],
    "summary": "Agente de la lepra",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "No cultivable en medios artificiales"
    ],
    "typical_resistance": [],
    "stewardship_note": ""
  },
  {
    "id": "candida_albicans",
    "name": "Candida albicans",
    "shortName": "C. albicans",
    "aliases": [],
    "taxonomy": {
      "gram": "hongo",
      "morphology": "levadura",
      "group": "Saccharomycetaceae"
    },
    "clinical": {
      "summary": "Comensal humano",
      "usualSyndromes": [],
      "context": "Candidiasis oral;vulvovaginitis;candidemia",
      "pearls": [
        "Comunitario y hospitalario"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Especie más sensible a fluconazol en general"
      ],
      "typicalAcquired": [],
      "stewardshipNote": ""
    },
    "appMeta": {
      "relevance": "uso de equinocandinas en paciente inestable",
      "status": "active"
    },
    "category": "Alta",
    "tags": [
      "fungus"
    ],
    "summary": "Comensal humano",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "Especie más sensible a fluconazol en general"
    ],
    "typical_resistance": [],
    "stewardship_note": ""
  },
  {
    "id": "candida_auris",
    "name": "Candida auris",
    "shortName": "C. auris",
    "aliases": [],
    "taxonomy": {
      "gram": "hongo",
      "morphology": "levadura",
      "group": "Saccharomycetaceae"
    },
    "clinical": {
      "summary": "Hongo emergente multirresistente con alto potencial de brotes",
      "usualSyndromes": [],
      "context": "Hospitalario",
      "pearls": [
        "Persiste en el ambiente y coloniza piel de pacientes y personal"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Fluconazol (frecuente)"
      ],
      "typicalAcquired": [
        "Multirresistente a azoles y anfotericina"
      ],
      "stewardshipNote": "Notificación obligatoria ante hallazgo"
    },
    "appMeta": {
      "relevance": "crítica",
      "status": "active"
    },
    "category": "hongo",
    "tags": [
      "fungus"
    ],
    "summary": "Hongo emergente multirresistente con alto potencial de brotes",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "Fluconazol (frecuente)"
    ],
    "typical_resistance": [
      "Multirresistente a azoles y anfotericina"
    ],
    "stewardship_note": "Notificación obligatoria ante hallazgo"
  },
  {
    "id": "cryptococcus_neoformans",
    "name": "Cryptococcus neoformans",
    "shortName": "C. neoformans",
    "aliases": [],
    "taxonomy": {
      "gram": "hongo",
      "morphology": "levadura encapsulada",
      "group": "Tremellaceae"
    },
    "clinical": {
      "summary": "Micosis sistémica oportunista definitoria de SIDA",
      "usualSyndromes": [
        "nac"
      ],
      "context": "Comunitario (heces de aves)",
      "pearls": [
        "Detección de antígeno en LCR o suero es muy sensible"
      ]
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [],
      "stewardshipNote": "Inducción con Anfotericina B + Flucitosina"
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "category": "hongo",
    "tags": [
      "fungus"
    ],
    "summary": "Micosis sistémica oportunista definitoria de SIDA",
    "common_syndromes": [
      "nac"
    ],
    "intrinsic_resistance": [],
    "typical_resistance": [],
    "stewardship_note": "Inducción con Anfotericina B + Flucitosina"
  },
  {
    "id": "aspergillus_fumigatus",
    "name": "Aspergillus fumigatus",
    "shortName": "A. fumigatus",
    "aliases": [],
    "taxonomy": {
      "gram": "hongo",
      "morphology": "filamentoso (hifas)",
      "group": "Aspergillaceae"
    },
    "clinical": {
      "summary": "Principal causa de aspergillosis invasiva en inmunocomprometidos",
      "usualSyndromes": [],
      "context": "Hospitalario/Comunitario",
      "pearls": [
        "Galactomanano sérico útil para diagnóstico precoz"
      ]
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [],
      "stewardshipNote": "Tratamiento de elección: Voriconazol"
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "category": "hongo",
    "tags": [
      "fungus"
    ],
    "summary": "Principal causa de aspergillosis invasiva en inmunocomprometidos",
    "common_syndromes": [],
    "intrinsic_resistance": [],
    "typical_resistance": [],
    "stewardship_note": "Tratamiento de elección: Voriconazol"
  },
  {
    "id": "histoplasma_capsulatum",
    "name": "Histoplasma capsulatum",
    "shortName": "H. capsulatum",
    "aliases": [],
    "taxonomy": {
      "gram": "hongo",
      "morphology": "dimórfico",
      "group": "Ajellomycetaceae"
    },
    "clinical": {
      "summary": "Micosis endémica adquirida por inhalación de guano",
      "usualSyndromes": [],
      "context": "Comunitario (cuevas/construcciones)",
      "pearls": [
        "Importante coinfección en pacientes con VIH avanzado"
      ]
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [],
      "stewardshipNote": "Itriaconazol para formas leves/moderadas"
    },
    "appMeta": {
      "relevance": "moderada",
      "status": "active"
    },
    "category": "hongo",
    "tags": [
      "fungus"
    ],
    "summary": "Micosis endémica adquirida por inhalación de guano",
    "common_syndromes": [],
    "intrinsic_resistance": [],
    "typical_resistance": [],
    "stewardship_note": "Itriaconazol para formas leves/moderadas"
  },
  {
    "id": "pneumocystis_jirovecii",
    "name": "Pneumocystis jirovecii",
    "shortName": "P. jirovecii",
    "aliases": [
      "Pneumocystis carinii (antiguo)"
    ],
    "taxonomy": {
      "gram": "hongo",
      "morphology": "quistes/trofozoítos",
      "group": "Pneumocystidaceae"
    },
    "clinical": {
      "summary": "Hongo atípico causa de neumonía grave en SIDA",
      "usualSyndromes": [],
      "context": "Oportunista (inmunocompromiso)",
      "pearls": [
        "No responde a antifúngicos convencionales (ergosterol ausente)"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Fluconazol",
        "Anfotericina B"
      ],
      "typicalAcquired": [],
      "stewardshipNote": "Profilaxis con TMP-SMX si CD4 < 200"
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    },
    "category": "hongo",
    "tags": [
      "fungus"
    ],
    "summary": "Hongo atípico causa de neumonía grave en SIDA",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "Fluconazol",
      "Anfotericina B"
    ],
    "typical_resistance": [],
    "stewardship_note": "Profilaxis con TMP-SMX si CD4 < 200"
  },
  {
    "id": "leishmania_spp",
    "name": "Leishmania spp.",
    "shortName": "Leishmania",
    "aliases": [],
    "taxonomy": {
      "gram": "atípico",
      "morphology": "protozoo intracelular",
      "group": "Trypanosomatidae"
    },
    "clinical": {
      "summary": "Parásito transmitido por flebótomos causante de úlceras o daño visceral",
      "usualSyndromes": [],
      "context": "Comunitario (zonas endémicas)",
      "pearls": [
        "Uso de antimoniales pentavalentes como primera opción"
      ]
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [],
      "stewardshipNote": "Notificación epidemiológica obligatoria"
    },
    "appMeta": {
      "relevance": "moderada",
      "status": "active"
    },
    "category": "parásito",
    "tags": [
      "atypical"
    ],
    "summary": "Parásito transmitido por flebótomos causante de úlceras o daño visceral",
    "common_syndromes": [],
    "intrinsic_resistance": [],
    "typical_resistance": [],
    "stewardship_note": "Notificación epidemiológica obligatoria"
  },
  {
    "id": "borrelia_burgdorferi",
    "name": "Borrelia burgdorferi",
    "shortName": "B. burgdorferi",
    "aliases": [
      "Agente enfermedad de Lyme"
    ],
    "taxonomy": {
      "gram": "atípico",
      "morphology": "espiroqueta",
      "group": ""
    },
    "clinical": {
      "summary": "Spirochaetaceae",
      "usualSyndromes": [],
      "context": "Eritema migrans;artritis de Lyme;neuroborreliosis",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Rash en ojo de buey patognomónico"
      ],
      "typicalAcquired": [],
      "stewardshipNote": ""
    },
    "appMeta": {
      "relevance": "medium",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "atypical"
    ],
    "summary": "Spirochaetaceae",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "Rash en ojo de buey patognomónico"
    ],
    "typical_resistance": [],
    "stewardship_note": ""
  },
  {
    "id": "burkholderia_cepacia",
    "name": "Burkholderia cepacia",
    "shortName": "B. cepacia",
    "aliases": [
      "Complejo B. cepacia"
    ],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "bacilos",
      "group": "Burkholderiaceae"
    },
    "clinical": {
      "summary": "Grupo de especies con alta resistencia intrínseca y riesgo en fibrosis quística",
      "usualSyndromes": [
        "nih"
      ],
      "context": "Hospitalario",
      "pearls": [
        "Contaminante común de soluciones y dispositivos médicos"
      ]
    },
    "resistance": {
      "intrinsic": [
        "Aminoglucósidos",
        "Polimixinas"
      ],
      "typicalAcquired": [],
      "stewardshipNote": "Manejo requiere aislamiento de contacto estricto en FQ"
    },
    "appMeta": {
      "relevance": "moderada",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative"
    ],
    "summary": "Grupo de especies con alta resistencia intrínseca y riesgo en fibrosis quística",
    "common_syndromes": [
      "nih"
    ],
    "intrinsic_resistance": [
      "Aminoglucósidos",
      "Polimixinas"
    ],
    "typical_resistance": [],
    "stewardship_note": "Manejo requiere aislamiento de contacto estricto en FQ"
  },
  {
    "id": "haemophilus_ducreyi",
    "name": "Haemophilus ducreyi",
    "shortName": "H. ducreyi",
    "aliases": [
      "Agente del chancroide"
    ],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "cocobacilos",
      "group": "Pasteurellaceae"
    },
    "clinical": {
      "summary": "Causa úlceras genitales dolorosas (chancroide)",
      "usualSyndromes": [],
      "context": "Comunitario",
      "pearls": [
        "Úlcera dolorosa a diferencia de la sífilis"
      ]
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [],
      "stewardshipNote": "Tratamiento: Azitromicina o Ceftriaxona"
    },
    "appMeta": {
      "relevance": "moderada",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative"
    ],
    "summary": "Causa úlceras genitales dolorosas (chancroide)",
    "common_syndromes": [],
    "intrinsic_resistance": [],
    "typical_resistance": [],
    "stewardship_note": "Tratamiento: Azitromicina o Ceftriaxona"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = pathogens;
} else if (typeof window !== "undefined") {
  window.abg_pathogens = pathogens;
}
