const pathogens = [
  {
    "id": "escherichia_coli",
    "name": "Escherichia coli",
    "shortName": "E. coli",
    "aliases": [
      "Colibacilo"
    ],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "bacilo",
      "group": "Enterobacterales"
    },
    "clinical": {
      "summary": "Bacilo Gram negativo entérico; causa frecuente de ITU y sepsis de origen urinario.",
      "usualSyndromes": [
        "itu_cistitis",
        "itu_pielonefritis",
        "sepsis_urinaria",
        "intraabdominal"
      ],
      "context": "Comunitario y nosocomial",
      "pearls": [
        "Principal agente de ITU comunitaria."
      ]
    },
    "resistance": {
      "intrinsic": [
        "No susceptible a macrólidos (no útiles clínicamente)."
      ],
      "typicalAcquired": [
        "Alta resistencia a ampicilina.",
        "BLEE (ESBL) en aumento (variable según ámbito)."
      ],
      "stewardshipNote": "Si riesgo de BLEE o resistencia local alta, evitar cefalosporinas 3ª/FQ empíricas sin criterio."
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
    "summary": "Bacilo Gram negativo entérico; causa frecuente de ITU y sepsis de origen urinario.",
    "common_syndromes": [
      "itu_cistitis",
      "itu_pielonefritis",
      "sepsis_urinaria",
      "intraabdominal"
    ],
    "intrinsic_resistance": [
      "No susceptible a macrólidos (no útiles clínicamente)."
    ],
    "typical_resistance": [
      "Alta resistencia a ampicilina.",
      "BLEE (ESBL) en aumento (variable según ámbito)."
    ],
    "stewardship_note": "Si riesgo de BLEE o resistencia local alta, evitar cefalosporinas 3ª/FQ empíricas sin criterio."
  },
  {
    "id": "streptococcus_pneumoniae",
    "name": "Streptococcus pneumoniae",
    "shortName": "S. pneumoniae",
    "aliases": [
      "Neumococo"
    ],
    "taxonomy": {
      "gram": "positivo",
      "morphology": "diplococo",
      "group": "Streptococcus"
    },
    "clinical": {
      "summary": "Diplococo Gram positivo; patógeno clave en neumonía adquirida en la comunidad y otitis/sinusitis.",
      "usualSyndromes": [
        "nac",
        "meningitis"
      ],
      "context": "Principalmente comunitario",
      "pearls": [
        "Agente principal en NAC."
      ]
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [
        "Susceptibilidad a penicilina variable según punto de corte y foco (mayor preocupación en meningitis).",
        "Resistencia a macrólidos puede ser significativa y depende del contexto local."
      ],
      "stewardshipNote": "Evitar monoterapia con macrólidos en CAP si resistencia local es alta."
    },
    "appMeta": {
      "relevance": "high",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_positive",
      "diplococci"
    ],
    "summary": "Diplococo Gram positivo; patógeno clave en neumonía adquirida en la comunidad y otitis/sinusitis.",
    "common_syndromes": [
      "nac",
      "meningitis"
    ],
    "intrinsic_resistance": [],
    "typical_resistance": [
      "Susceptibilidad a penicilina variable según punto de corte y foco (mayor preocupación en meningitis).",
      "Resistencia a macrólidos puede ser significativa y depende del contexto local."
    ],
    "stewardship_note": "Evitar monoterapia con macrólidos en CAP si resistencia local es alta."
  },
  {
    "id": "streptococcus_pyogenes",
    "name": "Streptococcus pyogenes",
    "shortName": "S. pyogenes",
    "aliases": [
      "GAS",
      "Estreptococo grupo A"
    ],
    "taxonomy": {
      "gram": "positivo",
      "morphology": "coco",
      "group": "Streptococcus"
    },
    "clinical": {
      "summary": "Coco Gram positivo; causa faringitis, escarlatina y celulitis/erisipela no purulenta.",
      "usualSyndromes": [
        "faringitis",
        "celulitis"
      ],
      "context": "Comunitario",
      "pearls": [
        "Aún uniformemente sensible a penicilina."
      ]
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [
        "Resistencia a macrólidos puede existir (variable por contexto)."
      ],
      "stewardshipNote": "Penicilina sigue siendo fármaco de elección cuando corresponde; evitar espectro innecesario."
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
    "summary": "Coco Gram positivo; causa faringitis, escarlatina y celulitis/erisipela no purulenta.",
    "common_syndromes": [
      "faringitis",
      "celulitis"
    ],
    "intrinsic_resistance": [],
    "typical_resistance": [
      "Resistencia a macrólidos puede existir (variable por contexto)."
    ],
    "stewardship_note": "Penicilina sigue siendo fármaco de elección cuando corresponde; evitar espectro innecesario."
  },
  {
    "id": "staphylococcus_aureus",
    "name": "Staphylococcus aureus",
    "shortName": "S. aureus",
    "aliases": [
      "MSSA",
      "SAMR"
    ],
    "taxonomy": {
      "gram": "positivo",
      "morphology": "coco",
      "group": "Staphylococcus"
    },
    "clinical": {
      "summary": "Coco Gram positivo; coloniza piel/narinas y causa SSTI purulenta, bacteriemia y foco osteoarticular.",
      "usualSyndromes": [
        "celulitis",
        "pie_diabetico",
        "endocarditis_infecciosa",
        "nih"
      ],
      "context": "Comunitario y nosocomial",
      "pearls": [
        "Importante diferenciador es la susceptibilidad a meticilina (MSSA vs MRSA)."
      ]
    },
    "resistance": {
      "intrinsic": [
        "Frecuente resistencia a penicilina G por penicilinasa."
      ],
      "typicalAcquired": [
        "MRSA puede ser relevante según epidemiología (comunidad/hospital).",
        "Resistencia a clindamicina variable; considerar D-test cuando aplique."
      ],
      "stewardshipNote": "Si hay riesgo de MRSA, evitar beta-lactámicos anti-MSSA como única cobertura empírica."
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
    "summary": "Coco Gram positivo; coloniza piel/narinas y causa SSTI purulenta, bacteriemia y foco osteoarticular.",
    "common_syndromes": [
      "celulitis",
      "pie_diabetico",
      "endocarditis_infecciosa",
      "nih"
    ],
    "intrinsic_resistance": [
      "Frecuente resistencia a penicilina G por penicilinasa."
    ],
    "typical_resistance": [
      "MRSA puede ser relevante según epidemiología (comunidad/hospital).",
      "Resistencia a clindamicina variable; considerar D-test cuando aplique."
    ],
    "stewardship_note": "Si hay riesgo de MRSA, evitar beta-lactámicos anti-MSSA como única cobertura empírica."
  },
  {
    "id": "pseudomonas_aeruginosa",
    "name": "Pseudomonas aeruginosa",
    "shortName": "P. aeruginosa",
    "aliases": [
      "Pseudomonas"
    ],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "bacilo",
      "group": "Non-fermenters"
    },
    "clinical": {
      "summary": "Bacilo Gram negativo no fermentador; asociado a infecciones nosocomiales y pacientes con factores de riesgo.",
      "usualSyndromes": [
        "nih",
        "itu_complicada",
        "sepsis_urinaria"
      ],
      "context": "Principalmente nosocomial",
      "pearls": [
        "Patógeno oportunista oportunista de alta letalidad latente."
      ]
    },
    "resistance": {
      "intrinsic": [
        "Intrínsecamente resistente a múltiples antibióticos (barrera de permeabilidad/eflujo)."
      ],
      "typicalAcquired": [
        "Resistencia adquirida frecuente en exposición previa a antibióticos o estadías prolongadas."
      ],
      "stewardshipNote": "Evitar cobertura anti-Pseudomonas si no hay factores de riesgo; de-escalar con cultivos."
    },
    "appMeta": {
      "relevance": "high",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative",
      "bacilli"
    ],
    "summary": "Bacilo Gram negativo no fermentador; asociado a infecciones nosocomiales y pacientes con factores de riesgo.",
    "common_syndromes": [
      "nih",
      "itu_complicada",
      "sepsis_urinaria"
    ],
    "intrinsic_resistance": [
      "Intrínsecamente resistente a múltiples antibióticos (barrera de permeabilidad/eflujo)."
    ],
    "typical_resistance": [
      "Resistencia adquirida frecuente en exposición previa a antibióticos o estadías prolongadas."
    ],
    "stewardship_note": "Evitar cobertura anti-Pseudomonas si no hay factores de riesgo; de-escalar con cultivos."
  },
  {
    "id": "haemophilus_influenzae",
    "name": "Haemophilus influenzae",
    "shortName": "H. influenzae",
    "aliases": [],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "cocobacilo",
      "group": "Pasteurellaceae"
    },
    "clinical": {
      "summary": "Cocobacilo fastidioso asociado a infecciones respiratorias.",
      "usualSyndromes": [
        "nac",
        "meningitis"
      ],
      "context": "Comunitario",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [
        "Producción de beta-lactamasas (resistencia a ampicilina)."
      ],
      "stewardshipNote": "Amoxicilina-clavulánico cubre cepas productoras de beta-lactamasa."
    },
    "appMeta": {
      "relevance": "medium",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative",
      "cocobacilli"
    ],
    "summary": "Cocobacilo fastidioso asociado a infecciones respiratorias.",
    "common_syndromes": [
      "nac",
      "meningitis"
    ],
    "intrinsic_resistance": [],
    "typical_resistance": [
      "Producción de beta-lactamasas (resistencia a ampicilina)."
    ],
    "stewardship_note": "Amoxicilina-clavulánico cubre cepas productoras de beta-lactamasa."
  },
  {
    "id": "mycoplasma_pneumoniae",
    "name": "Mycoplasma pneumoniae",
    "shortName": "M. pneumoniae",
    "aliases": [],
    "taxonomy": {
      "gram": "atípico",
      "morphology": "pleomórfico",
      "group": "Mycoplasma"
    },
    "clinical": {
      "summary": "Bacteria atípica sin pared celular, causa común de NAC atípica.",
      "usualSyndromes": [
        "nac"
      ],
      "context": "Comunitario",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Resistencia intrínseca a todos los beta-lactámicos."
      ],
      "typicalAcquired": [
        "Resistencia a macrólidos emergente en algunas zonas."
      ],
      "stewardshipNote": "Beta-lactámicos no son útiles; usar macrólidos, doxiciclina o fluoroquinolonas respiratorias."
    },
    "appMeta": {
      "relevance": "medium",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "atypical"
    ],
    "summary": "Bacteria atípica sin pared celular, causa común de NAC atípica.",
    "common_syndromes": [
      "nac"
    ],
    "intrinsic_resistance": [
      "Resistencia intrínseca a todos los beta-lactámicos."
    ],
    "typical_resistance": [
      "Resistencia a macrólidos emergente en algunas zonas."
    ],
    "stewardship_note": "Beta-lactámicos no son útiles; usar macrólidos, doxiciclina o fluoroquinolonas respiratorias."
  },
  {
    "id": "chlamydia_pneumoniae",
    "name": "Chlamydia pneumoniae",
    "shortName": "C. pneumoniae",
    "aliases": [],
    "taxonomy": {
      "gram": "atípico",
      "morphology": "intracelular",
      "group": "Chlamydia"
    },
    "clinical": {
      "summary": "Patógeno atípico intracelular asociado a neumonías leves a moderadas.",
      "usualSyndromes": [
        "nac"
      ],
      "context": "Comunitario",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Resistencia intrínseca a beta-lactámicos."
      ],
      "typicalAcquired": [],
      "stewardshipNote": "Sensitivos a macrólidos o tetraciclinas."
    },
    "appMeta": {
      "relevance": "low",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "atypical"
    ],
    "summary": "Patógeno atípico intracelular asociado a neumonías leves a moderadas.",
    "common_syndromes": [
      "nac"
    ],
    "intrinsic_resistance": [
      "Resistencia intrínseca a beta-lactámicos."
    ],
    "typical_resistance": [],
    "stewardship_note": "Sensitivos a macrólidos o tetraciclinas."
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
      "gram": "negativo",
      "morphology": "bacilo",
      "group": "Enterobacterales"
    },
    "clinical": {
      "summary": "Principal especie de Klebsiella de importancia clínica; causa frecuente de NAV, bacteriemia, e ITU.",
      "usualSyndromes": [
        "nih",
        "sepsis_urinaria",
        "itu_pielonefritis"
      ],
      "context": "Altamente nosocomial",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Resistente intrínseco a Ampicilina y Amoxicilina."
      ],
      "typicalAcquired": [
        "BLEE",
        "Carbapenemasas (KPC/NDM)."
      ],
      "stewardshipNote": "Las cepas productoras de carbapenemasa requieren tratamientos dirigidos."
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
    "summary": "Principal especie de Klebsiella de importancia clínica; causa frecuente de NAV, bacteriemia, e ITU.",
    "common_syndromes": [
      "nih",
      "sepsis_urinaria",
      "itu_pielonefritis"
    ],
    "intrinsic_resistance": [
      "Resistente intrínseco a Ampicilina y Amoxicilina."
    ],
    "typical_resistance": [
      "BLEE",
      "Carbapenemasas (KPC/NDM)."
    ],
    "stewardship_note": "Las cepas productoras de carbapenemasa requieren tratamientos dirigidos."
  },
  {
    "id": "proteus_mirabilis",
    "name": "Proteus mirabilis",
    "shortName": "P. mirabilis",
    "aliases": [
      "Proteus"
    ],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "bacilo",
      "group": "Enterobacterales"
    },
    "clinical": {
      "summary": "Bacilo entérico, clásico en infecciones del tracto urinario complicadas y litiasis.",
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
        "Nitrofurantoína",
        "Tigeciclina",
        "Colistina"
      ],
      "typicalAcquired": [
        "Puede producir BLEE en pacientes instrumentalizados."
      ],
      "stewardshipNote": "Si se aísla Proteus urinario, la nitrofurantoína no es activa."
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
    "summary": "Bacilo entérico, clásico en infecciones del tracto urinario complicadas y litiasis.",
    "common_syndromes": [
      "itu_cistitis",
      "itu_pielonefritis"
    ],
    "intrinsic_resistance": [
      "Nitrofurantoína",
      "Tigeciclina",
      "Colistina"
    ],
    "typical_resistance": [
      "Puede producir BLEE en pacientes instrumentalizados."
    ],
    "stewardship_note": "Si se aísla Proteus urinario, la nitrofurantoína no es activa."
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
      "gram": "negativo",
      "morphology": "diplococo",
      "group": "Neisseria"
    },
    "clinical": {
      "summary": "Agente etiológico principal de la gonorrea y un porcentaje alto de EPI.",
      "usualSyndromes": [
        "epi"
      ],
      "context": "Enfermedad de transmisión sexual",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [
        "Resistencia dispersa generalizada a Ciprofloxacino",
        "Disminución de sensibilidad a cefalosporinas 3ra"
      ],
      "stewardshipNote": "Manejo suele requerir Ceftriaxona IM a altas dosis como pilar."
    },
    "appMeta": {
      "relevance": "medium",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative",
      "diplococci"
    ],
    "summary": "Agente etiológico principal de la gonorrea y un porcentaje alto de EPI.",
    "common_syndromes": [
      "epi"
    ],
    "intrinsic_resistance": [],
    "typical_resistance": [
      "Resistencia dispersa generalizada a Ciprofloxacino",
      "Disminución de sensibilidad a cefalosporinas 3ra"
    ],
    "stewardship_note": "Manejo suele requerir Ceftriaxona IM a altas dosis como pilar."
  },
  {
    "id": "chlamydia_trachomatis",
    "name": "Chlamydia trachomatis",
    "shortName": "C. trachomatis",
    "aliases": [
      "Clamidia"
    ],
    "taxonomy": {
      "gram": "atípico",
      "morphology": "intracelular",
      "group": "Chlamydia"
    },
    "clinical": {
      "summary": "Infección bacteriana intracelular, causa principal de EPI y uretritis no gonocócica.",
      "usualSyndromes": [
        "epi"
      ],
      "context": "ETS",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Total resistencia a betalactámicos por metabolismo intracelular anómalo."
      ],
      "typicalAcquired": [],
      "stewardshipNote": "Doxiciclina suele ser el pilar de tratamiento."
    },
    "appMeta": {
      "relevance": "medium",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "atypical"
    ],
    "summary": "Infección bacteriana intracelular, causa principal de EPI y uretritis no gonocócica.",
    "common_syndromes": [
      "epi"
    ],
    "intrinsic_resistance": [
      "Total resistencia a betalactámicos por metabolismo intracelular anómalo."
    ],
    "typical_resistance": [],
    "stewardship_note": "Doxiciclina suele ser el pilar de tratamiento."
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
      "gram": "negativo",
      "morphology": "diplococo",
      "group": "Neisseria"
    },
    "clinical": {
      "summary": "Diplococo Gram negativo, causa de meningitis epidémica y fulminante.",
      "usualSyndromes": [
        "meningitis"
      ],
      "context": "Comunitario severo",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [
        "Sensibilidad reducida a penicilina aislada."
      ],
      "stewardshipNote": "Ceftriaxona empírica cubre adecuadamente este agente; quimioprofilaxis de contactos requiere Rifampicina o Cipro."
    },
    "appMeta": {
      "relevance": "high",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative",
      "diplococci"
    ],
    "summary": "Diplococo Gram negativo, causa de meningitis epidémica y fulminante.",
    "common_syndromes": [
      "meningitis"
    ],
    "intrinsic_resistance": [],
    "typical_resistance": [
      "Sensibilidad reducida a penicilina aislada."
    ],
    "stewardship_note": "Ceftriaxona empírica cubre adecuadamente este agente; quimioprofilaxis de contactos requiere Rifampicina o Cipro."
  },
  {
    "id": "listeria_monocytogenes",
    "name": "Listeria monocytogenes",
    "shortName": "L. monocytogenes",
    "aliases": [
      "Listeria"
    ],
    "taxonomy": {
      "gram": "positivo",
      "morphology": "bacilo",
      "group": "Listeria"
    },
    "clinical": {
      "summary": "Bacilo gram positivo asociado a meningitis en extremos etarios o inmunosuprimidos.",
      "usualSyndromes": [
        "meningitis"
      ],
      "context": "Comunitario alimentario / inmunosupresión",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Cefalosporinas (¡incluso de espectro amplio!)"
      ],
      "typicalAcquired": [],
      "stewardshipNote": "A diferencia del resto de flora meníngea, Ceftriaxona NO tiene actividad contra Listeria. Requiere Ampicilina empírica."
    },
    "appMeta": {
      "relevance": "high",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_positive",
      "bacilli"
    ],
    "summary": "Bacilo gram positivo asociado a meningitis en extremos etarios o inmunosuprimidos.",
    "common_syndromes": [
      "meningitis"
    ],
    "intrinsic_resistance": [
      "Cefalosporinas (¡incluso de espectro amplio!)"
    ],
    "typical_resistance": [],
    "stewardship_note": "A diferencia del resto de flora meníngea, Ceftriaxona NO tiene actividad contra Listeria. Requiere Ampicilina empírica."
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
    "aliases": [
      "Grupo B. fragilis"
    ],
    "taxonomy": {
      "gram": "negativo",
      "morphology": "bacilo",
      "group": "Anaerobes"
    },
    "clinical": {
      "summary": "Anaerobio principal en focos intraabdominales.",
      "usualSyndromes": [
        "intraabdominal"
      ],
      "context": "Polimicrobiano abdominal",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Aminoglucósidos"
      ],
      "typicalAcquired": [
        "Alta resistencia histórica a Clindamicina."
      ],
      "stewardshipNote": "Metronidazol retiene casi el 100% de susceptibilidad activa in vivo."
    },
    "appMeta": {
      "relevance": "medium",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative",
      "bacilli",
      "anaerobic"
    ],
    "summary": "Anaerobio principal en focos intraabdominales.",
    "common_syndromes": [
      "intraabdominal"
    ],
    "intrinsic_resistance": [
      "Aminoglucósidos"
    ],
    "typical_resistance": [
      "Alta resistencia histórica a Clindamicina."
    ],
    "stewardship_note": "Metronidazol retiene casi el 100% de susceptibilidad activa in vivo."
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
    "aliases": [
      "Enterococo faecalis"
    ],
    "taxonomy": {
      "gram": "positivo",
      "morphology": "coco",
      "group": "Enterococcus"
    },
    "clinical": {
      "summary": "El enterococo más frecuente, predominante en tracto urinario y endocarditis.",
      "usualSyndromes": [
        "endocarditis_infecciosa"
      ],
      "context": "Comunitario o nosocomial",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Cefalosporinas",
        "Clindamicina",
        "TMP-SMX (in-vivo)"
      ],
      "typicalAcquired": [
        "Generalmente retiene sensibilidad a Ampicilina y Vancomicina."
      ],
      "stewardshipNote": "Ampicilina suele ser la primera elección terapéutica."
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
    "summary": "El enterococo más frecuente, predominante en tracto urinario y endocarditis.",
    "common_syndromes": [
      "endocarditis_infecciosa"
    ],
    "intrinsic_resistance": [
      "Cefalosporinas",
      "Clindamicina",
      "TMP-SMX (in-vivo)"
    ],
    "typical_resistance": [
      "Generalmente retiene sensibilidad a Ampicilina y Vancomicina."
    ],
    "stewardship_note": "Ampicilina suele ser la primera elección terapéutica."
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
      "gram": "negativo",
      "morphology": "cocobacilo",
      "group": "Non-fermenters"
    },
    "clinical": {
      "summary": "Agente altamente asociado a unidades de cuidado intensivo, persistencia institucional y ventiladores.",
      "usualSyndromes": [
        "nih"
      ],
      "context": "Altamente intensivo/nosocomial",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Ampicilina",
        "Muchos B-lactámicos"
      ],
      "typicalAcquired": [
        "Resistencia cruzada a carbapenémicos con alta frecuencia (XDR/PDR)."
      ],
      "stewardshipNote": "Exige abordaje clínico en equipo, el Sulbactam suele aislarse terapéuticamente, o Colistín como rescate."
    },
    "appMeta": {
      "relevance": "high",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative",
      "cocobacilli"
    ],
    "summary": "Agente altamente asociado a unidades de cuidado intensivo, persistencia institucional y ventiladores.",
    "common_syndromes": [
      "nih"
    ],
    "intrinsic_resistance": [
      "Ampicilina",
      "Muchos B-lactámicos"
    ],
    "typical_resistance": [
      "Resistencia cruzada a carbapenémicos con alta frecuencia (XDR/PDR)."
    ],
    "stewardship_note": "Exige abordaje clínico en equipo, el Sulbactam suele aislarse terapéuticamente, o Colistín como rescate."
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
      "gram": "positivo",
      "morphology": "coco",
      "group": "Enterococcus"
    },
    "clinical": {
      "summary": "Una especie del género Enterococcus con perfiles de resistencia altamente dificultosos, frecuente en bilis/abdomen y hemocultivos UCI.",
      "usualSyndromes": [],
      "context": "Nosocomial post-amplio espectro",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Cefalosporinas",
        "Clindamicina",
        "TMP-SMX in-vivo."
      ],
      "typicalAcquired": [
        "Altamente resistente a Ampicilina (>80%). Causa fundamental de ERV/VRE (Vancomicina Resistencia)."
      ],
      "stewardshipNote": "A diferencia del faecalis, el faecium se asume resiste a ampicilina."
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
    "summary": "Una especie del género Enterococcus con perfiles de resistencia altamente dificultosos, frecuente en bilis/abdomen y hemocultivos UCI.",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "Cefalosporinas",
      "Clindamicina",
      "TMP-SMX in-vivo."
    ],
    "typical_resistance": [
      "Altamente resistente a Ampicilina (>80%). Causa fundamental de ERV/VRE (Vancomicina Resistencia)."
    ],
    "stewardship_note": "A diferencia del faecalis, el faecium se asume resiste a ampicilina."
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
      "gram": "negativo",
      "morphology": "bacilo",
      "group": "Enterobacterales"
    },
    "clinical": {
      "summary": "Microorganismo ubicuo con cromosomas AmpC muy robustos. Causa aversiones en vías urinarias o pulmonares institucionalizadas.",
      "usualSyndromes": [],
      "context": "Nosocomial/Insumos contaminados",
      "pearls": []
    },
    "resistance": {
      "intrinsic": [
        "Polimixinas/Colistín, Ampicilina, Cefazolina, Nitrofurantoina."
      ],
      "typicalAcquired": [
        "AmpC fuertemente regulado."
      ],
      "stewardshipNote": "Siempre vigilar por aislamientos nosocomiales atenuados o brotes."
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
    "summary": "Microorganismo ubicuo con cromosomas AmpC muy robustos. Causa aversiones en vías urinarias o pulmonares institucionalizadas.",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "Polimixinas/Colistín, Ampicilina, Cefazolina, Nitrofurantoina."
    ],
    "typical_resistance": [
      "AmpC fuertemente regulado."
    ],
    "stewardship_note": "Siempre vigilar por aislamientos nosocomiales atenuados o brotes."
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
      "morphology": "bacilo",
      "group": "Non-fermenters"
    },
    "clinical": {
      "summary": "Agente no fermentador latamente implicado en estancias UCI y post tratamiento carbapenémico, muy oportunista en NAVM.",
      "usualSyndromes": [],
      "context": "Intensivo post-carbapenem",
      "pearls": [
        "No afecta típicamente a inmunocompetentes u órganos sanos."
      ]
    },
    "resistance": {
      "intrinsic": [
        "Absolutamente resistente a todos los Carbapenémicos (por metalo-B-lactamasas L1 intrínsecas)."
      ],
      "typicalAcquired": [
        "Sensibilidades frecuentemente fluctuantes in-vitro que son inconsistentes con el éxito in-vivo."
      ],
      "stewardshipNote": "Cotrimoxazol (TMP-SMX) o Levofloxacino componen los brazos principales de terapia actual."
    },
    "appMeta": {
      "relevance": "high",
      "status": "active"
    },
    "category": "bacteria",
    "tags": [
      "gram_negative",
      "bacilli"
    ],
    "summary": "Agente no fermentador latamente implicado en estancias UCI y post tratamiento carbapenémico, muy oportunista en NAVM.",
    "common_syndromes": [],
    "intrinsic_resistance": [
      "Absolutamente resistente a todos los Carbapenémicos (por metalo-B-lactamasas L1 intrínsecas)."
    ],
    "typical_resistance": [
      "Sensibilidades frecuentemente fluctuantes in-vitro que son inconsistentes con el éxito in-vivo."
    ],
    "stewardship_note": "Cotrimoxazol (TMP-SMX) o Levofloxacino componen los brazos principales de terapia actual."
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = pathogens;
}
else if (typeof window !== "undefined") {
  window.abg_pathogens = pathogens;
}
