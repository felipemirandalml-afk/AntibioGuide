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
        "vancomicina"
      ],
      "typicalAcquired": [
        "ampicilina",
        "tmp_smx",
        "ciprofloxacino"
      ],
      "stewardshipNote": "Evitar FQ empíricas si R% local >20%."
    },
    "appMeta": {
      "relevance": "extrema",
      "status": "active"
    }
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
        "azitromicina",
        "bencilpenicilina_sodica"
      ],
      "stewardshipNote": "Evitar macrólido en monoterapia si R% alto."
    },
    "appMeta": {
      "relevance": "crítica",
      "status": "active"
    }
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
        "gentamicina"
      ],
      "typicalAcquired": [
        "azitromicina"
      ],
      "stewardshipNote": "Sensible universal a penicilina."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
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
        "bencilpenicilina_sodica"
      ],
      "stewardshipNote": "Evaluar riesgo MRSA."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
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
        "tmp_smx",
        "ampicilina",
        "amoxicilina_clavulanico",
        "ceftriaxona",
        "ertapenem"
      ],
      "typicalAcquired": [
        "Carbapenémicos",
        "ciprofloxacino"
      ],
      "stewardshipNote": "Evitar subdosificación."
    },
    "appMeta": {
      "relevance": "extrema",
      "status": "active"
    }
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
        "vancomicina"
      ],
      "typicalAcquired": [
        "Beta-lactamasa (algunas cepas)"
      ],
      "stewardshipNote": "Preferir amoxicilina-clavulánico si productor."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
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
        "azitromicina"
      ],
      "stewardshipNote": "Usar macrólido o doxiciclina."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
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
    }
  },
  {
    "id": "klebsiella_pneumoniae",
    "name": "Klebsiella pneumoniae",
    "shortName": "K. pneumoniae",
    "aliases": [
      "Klebsiella spp.",
      "K. oxytoca (similar)"
    ],
    "taxonomy": {
      "gram": "negative",
      "morphology": "bacilos encapsulados",
      "group": "enterobacterales"
    },
    "clinical": {
      "summary": "Bacilo entérico asociado a ITU, neumonía hospitalaria e infecciones intraabdominales.",
      "usualSyndromes": [
        "nac",
        "itu_complicada",
        "intraabdominal",
        "nih"
      ],
      "context": "Comunitario y Hospitalario",
      "pearls": [
        "Alta asociación con brotes en UCI por carbapenemasas (KPC)",
        "Las cepas hipervirulentas pueden causar abscesos hepáticos y endoftalmitis"
      ]
    },
    "resistance": {
      "intrinsic": [
        "ampicilina"
      ],
      "typicalAcquired": [
        "BLEE",
        "Carbapenemasas (KPC, NDM, OXA-48)"
      ],
      "stewardshipNote": "Sospechar BLEE/KPC en infecciones nosocomiales. Revisar epidemiología local."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
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
        "nitrofurantoina"
      ],
      "typicalAcquired": [
        "ampicilina",
        "tmp_smx"
      ],
      "stewardshipNote": "Evitar nitrofurantoína."
    },
    "appMeta": {
      "relevance": "high",
      "status": "active"
    }
  },
  {
    "id": "staphylococcus_saprophyticus",
    "name": "Staphylococcus saprophyticus",
    "shortName": "S. saprophyticus",
    "aliases": [
      "CoNS urinario"
    ],
    "taxonomy": {
      "gram": "positive",
      "morphology": "coco en racimos (coagulasa negativo)",
      "group": "Staphylococcaceae"
    },
    "clinical": {
      "summary": "Segunda causa más común de cistitis no complicada en mujeres jóvenes sexualmente activas (después de E. coli).",
      "usualSyndromes": [
        "itu_baja",
        "cistitis_aguda"
      ],
      "context": "Comunitario",
      "pearls": [
        "Clásico agente de la 'cistitis de la luna de miel'.",
        "A diferencia de E. coli, no reduce los nitratos a nitritos, por lo que el test de nitritos en la tira reactiva de orina será característicamente negativo.",
        "Excepcionalmente causa pielonefritis o infecciones sistémicas/nosocomiales, a diferencia de otros estafilococos coagulasa negativos (como S. epidermidis)."
      ]
    },
    "resistance": {
      "intrinsic": [
        "novobiocina (clave para su identificación en laboratorio)",
        "fosfomicina (resistencia in vitro, pero el MINSAL/IDSA igual la avala por altísima concentración urinaria)"
      ],
      "typicalAcquired": [
        "ampicilina"
      ],
      "stewardshipNote": "Altamente sensible en la práctica a Nitrofurantoína y Cotrimoxazol. Aunque in vitro muestra resistencia natural a Fosfomicina y Ácido Nalidíxico, la cistitis a menudo responde a esquemas estándar de primera línea."
    },
    "appMeta": {
      "relevance": "moderada",
      "status": "active"
    }
  },
  {
    "id": "enterobacter_spp",
    "name": "Enterobacter spp.",
    "shortName": "Enterobacter",
    "aliases": [
      "Enterobacter"
    ],
    "taxonomy": {
      "gram": "negative",
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
        "amoxicilina_clavulanico",
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
    }
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
      "gram": "positive",
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
        "clindamicina"
      ],
      "typicalAcquired": [
        "Resistencia a Vanco (VRE) predominantemente en faecium."
      ],
      "stewardshipNote": "Tratamiento de elección generalmente Amoxicilina (faecalis). Cefalosporinas NO poseen actividad."
    },
    "appMeta": {
      "relevance": "high",
      "status": "active"
    }
  },
  {
    "id": "methicillin_resistant_staphylococcus_aureus",
    "name": "Methicillin-resistant Staphylococcus aureus",
    "shortName": "MRSA",
    "aliases": [
      "SAMR"
    ],
    "taxonomy": {
      "gram": "positive",
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
        "azitromicina",
        "clindamicina",
        "Quinolonas (frecuente)"
      ],
      "stewardshipNote": "Requiere vancomicina, linezolid o daptomicina (sepsis grave); clinda/TMP-SMX (piel leve)."
    },
    "appMeta": {
      "relevance": "high",
      "status": "active"
    }
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
      "morphology": "diplococo (en grano de café)",
      "group": "Neisseriaceae"
    },
    "clinical": {
      "summary": "Agente etiológico de la gonorrea, causante de uretritis/cervicitis, enfermedad pélvica inflamatoria (EPI) e infección gonocócica diseminada.",
      "usualSyndromes": [
        "uretritis",
        "cervicitis",
        "enfermedad_pelvica_inflamatoria",
        "artritis_septica",
        "conjuntivitis_neonatal"
      ],
      "context": "Comunitario (ITS)",
      "pearls": [
        "Clásicamente se observa como diplococos intracelulares dentro de polimorfonucleares en el Gram de secreción uretral.",
        "Alta tasa de coinfección con Chlamydia trachomatis; tratar empíricamente para ambas si no se dispone de panel molecular (NAAT).",
        "La infección gonocócica diseminada cursa clásicamente con la tríada: tenosinovitis, dermatitis (lesiones pustulosas) y poliartralgias asimétricas."
      ]
    },
    "resistance": {
      "intrinsic": [
        "lincosamidas",
        "vancomicina"
      ],
      "typicalAcquired": [
        "penicilina_g (producción de penicilinasa)",
        "ciprofloxacino (mutaciones gyrA)",
        "tetraciclinas",
        "azitromicina (resistencia en aumento global)"
      ],
      "stewardshipNote": "Las guías actuales (CDC) recomiendan monoterapia con altas dosis de Ceftriaxona (500 mg IM dosis única) para infecciones no complicadas, abandonando la adición rutinaria de Azitromicina empírica para el gonococo (por aumento de resistencia a macrólidos), salvo que no se haya descartado Chlamydia."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
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
    }
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
        "gentamicina"
      ],
      "typicalAcquired": [
        "Resistencia variable de B. fragilis a clindamicina."
      ],
      "stewardshipNote": "Metronidazol es pilar sub-diafragmático; Clinda sobre-diafragmático."
    },
    "appMeta": {
      "relevance": "medium",
      "status": "active"
    }
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
    }
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
        "vancomicina"
      ],
      "typicalAcquired": [
        "bencilpenicilina_sodica"
      ],
      "stewardshipNote": "Ceftriaxona empírica."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
  },
  {
    "id": "listeria_monocytogenes",
    "name": "Listeria monocytogenes",
    "shortName": "L. monocytogenes",
    "aliases": [
      "Bacilo de Lister"
    ],
    "taxonomy": {
      "gram": "positive",
      "morphology": "bacilo corto (pleomórfico)",
      "group": "Listeriaceae"
    },
    "clinical": {
      "summary": "Patógeno transmitido por alimentos que causa meningoencefalitis y sepsis severa en recién nacidos, embarazadas, ancianos e inmunocomprometidos.",
      "usualSyndromes": [
        "meningitis_bacteriana",
        "romboencefalitis",
        "sepsis_neonatal",
        "infeccion_asociada_embarazo"
      ],
      "context": "Comunitario / Zoonosis",
      "pearls": [
        "Capaz de crecer a temperaturas de refrigeración (4°C), lo que explica su asociación con fiambres, patés, salmón ahumado y quesos no pasteurizados.",
        "Posee motilidad característica en 'voltereta' (tumbling motility) a temperatura ambiente.",
        "Tiene especial tropismo por el tronco encefálico (romboencefalitis), pudiendo presentar clínica de pares craneales y ataxia."
      ]
    },
    "resistance": {
      "intrinsic": [
        "todas_las_cefalosporinas (incluyendo cefotaxima, ceftriaxona y cefepime)",
        "fosfomicina"
      ],
      "typicalAcquired": [
        "macrolidos",
        "fluoroquinolonas (raro)"
      ],
      "stewardshipNote": "REGLA DE ORO: Ninguna cefalosporina cubre Listeria. Es el motivo por el cual se añade Ampicilina empírica al esquema de meningitis en >50 años, embarazadas o inmunocomprometidos. En alergia severa a penicilina, el Cotrimoxazol es la alternativa de elección."
    },
    "appMeta": {
      "relevance": "critica",
      "status": "active"
    }
  },
  {
    "id": "streptococcus_spp",
    "name": "Streptococcus spp.",
    "shortName": "Streptococcus spp.",
    "aliases": [
      "Estreptococos"
    ],
    "taxonomy": {
      "gram": "positive",
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
    }
  },
  {
    "id": "enterobacterales",
    "name": "Enterobacterales",
    "shortName": "Enterobacterias",
    "aliases": [
      "Enterobacterias"
    ],
    "taxonomy": {
      "gram": "negative",
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
    }
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
        "gentamicina"
      ],
      "typicalAcquired": [
        "Resistencia creciente a clindamicina"
      ],
      "stewardshipNote": "Metronidazol eficaz."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
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
      "gram": "positive",
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
    }
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
      "gram": "positive",
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
    }
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
      "gram": "positive",
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
    }
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
        "vancomicina"
      ],
      "stewardshipNote": "Evaluar susceptibilidad específica."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
  },
  {
    "id": "hacek_group",
    "name": "Grupo HACEK",
    "shortName": "HACEK",
    "aliases": [
      "HACEK"
    ],
    "taxonomy": {
      "gram": "negative",
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
    }
  },
  {
    "id": "gram_negative_bacilli_non_hacek",
    "name": "Bacilos gramnegativos (nosocomial no-HACEK)",
    "shortName": "BGN no-HACEK",
    "aliases": [],
    "taxonomy": {
      "gram": "negative",
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
    }
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
    }
  },
  {
    "id": "acinetobacter_baumannii",
    "name": "Acinetobacter baumannii",
    "shortName": "A. baumannii",
    "aliases": [
      "Acinetobacter baumannii-calcoaceticus complex"
    ],
    "taxonomy": {
      "gram": "negative",
      "morphology": "cocobacilo pleomórfico",
      "group": "Moraxellaceae"
    },
    "clinical": {
      "summary": "Patógeno oportunista intrahospitalario clásico, causante de brotes en UCI debido a su extrema persistencia en superficies secas e instrumental.",
      "usualSyndromes": [
        "neumonia_asociada_ventilacion",
        "bacteriemia_asociada_cateter",
        "infeccion_herida_operatoria"
      ],
      "context": "Hospitalario",
      "pearls": [
        "Tiene baja virulencia intrínseca pero una extraordinaria capacidad para adquirir mecanismos de resistencia (fenotipo XDR/PDR).",
        "En tinciones de Gram puede retener cristal violeta y confundirse erróneamente con cocos Gram positivos.",
        "Múltiples brotes en Chile asociados a cepas productoras de carbapenemasas tipo OXA (OXA-23, OXA-58)."
      ]
    },
    "resistance": {
      "intrinsic": [
        "ampicilina",
        "amoxicilina_clavulanico",
        "cefalosporinas_primera_segunda_generacion",
        "ertapenem",
        "cloranfenicol"
      ],
      "typicalAcquired": [
        "carbapenemicos (meropenem/imipenem)",
        "aminoglucosidos",
        "fluoroquinolonas",
        "colistin"
      ],
      "stewardshipNote": "El componente Sulbactam (en Ampicilina-Sulbactam) tiene actividad bactericida intrínseca contra A. baumannii y es de primera línea. En cepas XDR, se recurre a esquemas combinados con Cefiderocol, Tigeciclina o Polimixinas."
    },
    "appMeta": {
      "relevance": "critica",
      "status": "active"
    }
  },
  {
    "id": "staphylococcus_sp",
    "name": "Staphylococcus spp.",
    "shortName": "Staph spp (no tipificado)",
    "aliases": [],
    "taxonomy": {
      "gram": "positive",
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
    }
  },
  {
    "id": "enterococcus_faecium",
    "name": "Enterococcus faecium",
    "shortName": "E. faecium",
    "aliases": [
      "ERV (cuando es resistente a vancomicina)"
    ],
    "taxonomy": {
      "gram": "positive",
      "morphology": "coco en cadenas cortas o pares",
      "group": "Enterococcaceae"
    },
    "clinical": {
      "summary": "Enterococo menos prevalente pero altamente resistente, causante de infecciones nosocomiales, frecuentemente portador de genes de resistencia a vancomicina (vanA/vanB).",
      "usualSyndromes": [
        "infeccion_intraabdominal",
        "itu_asociada_cateter",
        "bacteriemia",
        "endocarditis_infecciosa"
      ],
      "context": "Hospitalario",
      "pearls": [
        "Regla del 80/20: E. faecalis causa el 80% de las infecciones (y suele ser sensible a ampicilina), mientras que E. faecium causa el 20% pero concentra casi toda la multirresistencia.",
        "Su aparición suele estar precedida por el uso empírico de cefalosporinas de 3ª generación (que barren la flora pero no lo cubren).",
        "En hemocultivos positivos para 'cocos gram positivos en cadenas', si el paciente tiene exposición previa a ATB o está en UCI, asumir E. faecium empíricamente hasta tener especie."
      ]
    },
    "resistance": {
      "intrinsic": [
        "todas_las_cefalosporinas",
        "clindamicina",
        "cloxacilina",
        "aminoglucosidos_bajo_nivel",
        "cotrimoxazol (in vivo)"
      ],
      "typicalAcquired": [
        "ampicilina (casi 100% en cepas nosocomiales chilenas)",
        "vancomicina (VRE/ERV)",
        "gentamicina_alto_nivel"
      ],
      "stewardshipNote": "Si se aísla E. faecium en un hospital chileno, se asume resistencia a Ampicilina. Si es sensible a Vancomicina, es de elección; si es ERV, Linezolid o Daptomicina son los estándares de cuidado. Las cefalosporinas NUNCA cubren enterococos."
    },
    "appMeta": {
      "relevance": "critica",
      "status": "active"
    }
  },
  {
    "id": "klebsiella_oxytoca",
    "name": "Klebsiella oxytoca",
    "shortName": "K. oxytoca",
    "aliases": [],
    "taxonomy": {
      "gram": "negative",
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
    }
  },
  {
    "id": "enterobacter_cloacae_complex",
    "name": "Enterobacter cloacae complex",
    "shortName": "E. cloacae complex",
    "aliases": [],
    "taxonomy": {
      "gram": "negative",
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
    }
  },
  {
    "id": "citrobacter_freundii",
    "name": "Citrobacter freundii",
    "shortName": "C. freundii",
    "aliases": [],
    "taxonomy": {
      "gram": "negative",
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
    }
  },
  {
    "id": "serratia_marcescens",
    "name": "Serratia marcescens",
    "shortName": "S. marcescens",
    "aliases": [],
    "taxonomy": {
      "gram": "negative",
      "morphology": "bacilo",
      "group": "Yersiniaceae (orden Enterobacterales)"
    },
    "clinical": {
      "summary": "Enterobacteria nosocomial productora de AmpC inducible, frecuentemente asociada a infecciones del tracto urinario, bacteriemias y contaminación de soluciones/dispositivos médicos.",
      "usualSyndromes": [
        "itu_asociada_cateter",
        "neumonia_asociada_cuidados_salud",
        "bacteriemia"
      ],
      "context": "Hospitalario",
      "pearls": [
        "Algunas cepas (especialmente las no clínicas/ambientales) producen un pigmento rojo característico llamado prodigiosina.",
        "Pertenece al grupo 'SPACE' (Serratia, Pseudomonas, Acinetobacter, Citrobacter, Enterobacter), clásicos productores de betalactamasas tipo AmpC cromosómicas inducibles.",
        "Históricamente asociada a brotes nosocomiales por contaminación de jabones líquidos, antisépticos y propofol."
      ]
    },
    "resistance": {
      "intrinsic": [
        "colistin",
        "polimixina_b",
        "ampicilina",
        "amoxicilina_clavulanico",
        "cefuroxima",
        "nitrofurantoina"
      ],
      "typicalAcquired": [
        "cefalosporinas_tercera_generacion (por desrepresión AmpC o BLEE)",
        "carbapenemicos"
      ],
      "stewardshipNote": "Evitar Cefotaxima/Ceftriaxona incluso si el antibiograma reporta sensibilidad inicial, por alto riesgo de falla terapéutica (inducción de AmpC). Preferir Cefepime o Carbapenémicos para infecciones moderadas a severas. Su resistencia intrínseca a Colistín es clave para diferenciarla de otras enterobacterias en fenotipos MDR."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
  },
  {
    "id": "morganella_morganii",
    "name": "Morganella morganii",
    "shortName": "M. morganii",
    "aliases": [],
    "taxonomy": {
      "gram": "negative",
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
    }
  },
  {
    "id": "stenotrophomonas_maltophilia",
    "name": "Stenotrophomonas maltophilia",
    "shortName": "S. maltophilia",
    "aliases": [
      "Pseudomonas maltophilia",
      "Xanthomonas maltophilia"
    ],
    "taxonomy": {
      "gram": "negative",
      "morphology": "bacilo no fermentador",
      "group": "Xanthomonadaceae"
    },
    "clinical": {
      "summary": "Patógeno oportunista intrahospitalario clásico que emerge tras esquemas prolongados con carbapenémicos en pacientes de UCI o inmunocomprometidos.",
      "usualSyndromes": [
        "neumonia_asociada_ventilacion",
        "bacteriemia_asociada_cateter",
        "infeccion_tracto_respiratorio_fq"
      ],
      "context": "Hospitalario",
      "pearls": [
        "Clásicamente coloniza e infecta la vía aérea de pacientes con fibrosis quística o en ventilación mecánica invasiva prolongada.",
        "Tiene alta afinidad por superficies sintéticas (catéteres venosos centrales, tubos endotraqueales).",
        "Diferenciar colonización de infección es el mayor desafío clínico; aislamientos en secreción bronquial sin infiltrados nuevos o deterioro gasométrico a menudo no requieren tratamiento."
      ]
    },
    "resistance": {
      "intrinsic": [
        "todos_los_carbapenemicos",
        "aminoglucosidos (frecuente, por bombas de eflujo)"
      ],
      "typicalAcquired": [
        "fluoroquinolonas",
        "cotrimoxazol (emergente)"
      ],
      "stewardshipNote": "Es intrínsecamente resistente a los carbapenémicos debido a la producción de una metalo-beta-lactamasa (L1). Cotrimoxazol (TMP-SMX) a dosis altas es el gold standard absoluto. Minociclina, Levofloxacino o Cefiderocol son terapias de rescate."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
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
        "gentamicina"
      ],
      "typicalAcquired": [
        "azitromicina"
      ],
      "stewardshipNote": "Penicilina es tratamiento de elección."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
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
        "gentamicina",
        "Cefalosporinas"
      ],
      "typicalAcquired": [
        "ciprofloxacino"
      ],
      "stewardshipNote": "Evitar antibióticos innecesarios."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
  },
  {
    "id": "corynebacterium_diphtheriae",
    "name": "Corynebacterium diphtheriae",
    "shortName": "C. diphtheriae",
    "aliases": [
      "Bacilo de Klebs-Löffler"
    ],
    "taxonomy": {
      "gram": "positive",
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
    }
  },
  {
    "id": "moraxella_catarrhalis",
    "name": "Moraxella catarrhalis",
    "shortName": "M. catarrhalis",
    "aliases": [
      "Branhamella catarrhalis"
    ],
    "taxonomy": {
      "gram": "negative",
      "morphology": "diplococo",
      "group": "Moraxellaceae"
    },
    "clinical": {
      "summary": "Patógeno respiratorio estrictamente humano, fundamental en exacerbaciones de EPOC, otitis media aguda y sinusitis en pediatría.",
      "usualSyndromes": [
        "exacerbacion_epoc",
        "otitis_media_aguda",
        "sinusitis_aguda",
        "neumonia_adquirida_comunidad"
      ],
      "context": "Comunitario",
      "pearls": [
        "En microbiología, sus colonias tienen el 'signo del disco de hockey' (se pueden empujar enteras sobre el agar sin romperse).",
        "Suele conformar la tríada clásica de patógenos respiratorios altos junto al S. pneumoniae y H. influenzae.",
        "Afecta primariamente a fumadores o pacientes con daño estructural de la vía aérea (EPOC, bronquiectasias)."
      ]
    },
    "resistance": {
      "intrinsic": [
        "ampicilina",
        "amoxicilina",
        "trimetoprima (como monoterapia)",
        "clindamicina"
      ],
      "typicalAcquired": [
        "macrolidos (raro pero descrito)"
      ],
      "stewardshipNote": "La perla clínica crítica: cerca del 100% de las cepas producen betalactamasas (tipo BRO). Por lo tanto, a diferencia del neumococo, NUNCA se debe tratar con Amoxicilina sola; siempre requiere un inhibidor (Amoxicilina-Clavulánico), Cefalosporinas de 2ª/3ª generación o Macrólidos."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
  },
  {
    "id": "salmonella_enterica_typhi",
    "name": "Salmonella enterica serovar Typhi",
    "shortName": "S. Typhi",
    "aliases": [
      "Bacilo de Eberth"
    ],
    "taxonomy": {
      "gram": "negative",
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
    }
  },
  {
    "id": "bordetella_pertussis",
    "name": "Bordetella pertussis",
    "shortName": "B. pertussis",
    "aliases": [],
    "taxonomy": {
      "gram": "negative",
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
    }
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
        "vancomicina"
      ],
      "typicalAcquired": [
        "Tetraciclinas (variable)"
      ],
      "stewardshipNote": "Rehidratación es clave."
    },
    "appMeta": {
      "relevance": "moderada",
      "status": "active"
    }
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
        "vancomicina"
      ],
      "typicalAcquired": [
        "ciprofloxacino",
        "ciprofloxacino"
      ],
      "stewardshipNote": "Macrólido preferido."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
  },
  {
    "id": "helicobacter_pylori",
    "name": "Helicobacter pylori",
    "shortName": "H. pylori",
    "aliases": [],
    "taxonomy": {
      "gram": "negative",
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
    }
  },
  {
    "id": "legionella_pneumophila",
    "name": "Legionella pneumophila",
    "shortName": "L. pneumophila",
    "aliases": [
      "Enfermedad del legionario",
      "Fiebre de Pontiac"
    ],
    "taxonomy": {
      "gram": "atypical",
      "morphology": "bacilo pleomórfico (no tiñe bien con Gram)",
      "group": "Legionellaceae"
    },
    "clinical": {
      "summary": "Agente etiológico de neumonía atípica severa, a menudo asociada a brotes epidémicos por sistemas de agua contaminados o aires acondicionados.",
      "usualSyndromes": [
        "neumonia_adquirida_comunidad_grave",
        "neumonia_intrahospitalaria"
      ],
      "context": "Comunitario / Brotes intrahospitalarios",
      "pearls": [
        "Sospechar clásicamente ante una neumonía severa acompañada de síntomas gastrointestinales (diarrea acuosa), hiponatremia (<130 mEq/L), elevación de transaminasas y bradicardia relativa.",
        "El antígeno urinario para Legionella es muy específico, pero solo detecta el serogrupo 1 (responsable del 70-80% de los casos clínicos).",
        "No se transmite de persona a persona; la exposición es siempre ambiental (aerosoles de duchas, torres de refrigeración)."
      ]
    },
    "resistance": {
      "intrinsic": [
        "todos_los_betalactamicos",
        "aminoglucosidos"
      ],
      "typicalAcquired": [],
      "stewardshipNote": "Al ser intracelular, requiere antibióticos con alta penetración tisular y macrófaga. Azitromicina (o Claritromicina) y Fluoroquinolonas respiratorias (Levofloxacino) son las terapias de primera línea exclusivas."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
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
    }
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
    }
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
    }
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
    }
  },
  {
    "id": "candida_auris",
    "name": "Candida auris",
    "shortName": "C. auris",
    "aliases": [
      "C. auris"
    ],
    "taxonomy": {
      "gram": "positive",
      "morphology": "levadura",
      "group": "Saccharomycetaceae"
    },
    "clinical": {
      "summary": "Hongo emergente de notificación obligatoria, altamente transmisible en entornos de salud y con elevadas tasas de multirresistencia.",
      "usualSyndromes": [
        "candidemia",
        "infeccion_invasora",
        "colonizacion_cutanea_persistente"
      ],
      "context": "Hospitalario",
      "pearls": [
        "A diferencia de otras Candidas, coloniza persistentemente la piel (axilas, ingles) y sobrevive semanas en superficies hospitalarias, comportándose como una bacteria tipo MRSA/VRE.",
        "Los métodos fenotípicos tradicionales (ej. Vitek 2 antiguo) suelen identificarla erróneamente como C. haemulonii o C. famata; requiere MALDI-TOF o PCR para confirmación.",
        "Alerta permanente de vigilancia epidemiológica (ISP/MINSAL) ante cualquier aislamiento."
      ]
    },
    "resistance": {
      "intrinsic": [
        "fluconazol (alta prevalencia de resistencia natural o rápida adquisición)"
      ],
      "typicalAcquired": [
        "anfotericina_b",
        "equinocandinas (emergente, cepas panresistentes descritas)"
      ],
      "stewardshipNote": "Las equinocandinas (Caspofungina, Anidulafungina, Micafungina) son la terapia empírica de elección, pero la prueba de susceptibilidad es obligatoria. Medidas de aislamiento de contacto estricto son prioritarias."
    },
    "appMeta": {
      "relevance": "critica",
      "status": "active"
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  },
  {
    "id": "burkholderia_cepacia",
    "name": "Burkholderia cepacia",
    "shortName": "B. cepacia",
    "aliases": [
      "Complejo B. cepacia"
    ],
    "taxonomy": {
      "gram": "negative",
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
        "gentamicina",
        "colistin"
      ],
      "typicalAcquired": [],
      "stewardshipNote": "Manejo requiere aislamiento de contacto estricto en FQ"
    },
    "appMeta": {
      "relevance": "moderada",
      "status": "active"
    }
  },
  {
    "id": "haemophilus_ducreyi",
    "name": "Haemophilus ducreyi",
    "shortName": "H. ducreyi",
    "aliases": [
      "Agente del chancroide"
    ],
    "taxonomy": {
      "gram": "negative",
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
    }
  },
  {
    "id": "salmonella_no_tifoidea",
    "name": "Salmonella enterica (no tifoidea)",
    "shortName": "Salmonella spp.",
    "aliases": [
      "Salmonella enteritidis",
      "Salmonella typhimurium"
    ],
    "taxonomy": {
      "gram": "negative",
      "morphology": "bacilo",
      "group": "Enterobacteriaceae"
    },
    "clinical": {
      "summary": "Causa frecuente de gastroenteritis aguda transmitida por alimentos; riesgo de bacteriemia en extremos de edad e inmunocomprometidos.",
      "usualSyndromes": [
        "gastroenteritis_aguda",
        "bacteriemia",
        "infeccion_endovascular"
      ],
      "context": "Comunitario",
      "pearls": [
        "En adultos inmunocompetentes con gastroenteritis, el tratamiento antibiótico no acorta el cuadro y prolonga la excreción fecal (estado de portador).",
        "Alta sospecha de aortitis o siembra endovascular en pacientes mayores de 50 años con bacteriemia.",
        "Se asocia clásicamente al consumo de huevos crudos, mayonesa casera y carnes de ave mal cocidas."
      ]
    },
    "resistance": {
      "intrinsic": [
        "penicilina_g",
        "macrolidos_clasicos"
      ],
      "typicalAcquired": [
        "ampicilina",
        "cotrimoxazol",
        "ciprofloxacino (resistencia creciente en Chile)"
      ],
      "stewardshipNote": "Solo tratar formas severas, bacteriemias o pacientes de alto riesgo. Ceftriaxona es de elección empírica en cuadros sistémicos."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
  },
  {
    "id": "shigella_spp",
    "name": "Shigella spp.",
    "shortName": "Shigella spp.",
    "aliases": [
      "Shigella sonnei",
      "Shigella flexneri"
    ],
    "taxonomy": {
      "gram": "negative",
      "morphology": "bacilo",
      "group": "Enterobacteriaceae"
    },
    "clinical": {
      "summary": "Agente clásico de la disentería bacilar, altamente contagioso debido a su bajísimo inóculo infectante (10-100 bacterias).",
      "usualSyndromes": [
        "diarrea_disenterica",
        "gastroenteritis_aguda"
      ],
      "context": "Comunitario",
      "pearls": [
        "Causa diarrea inflamatoria con fiebre alta, pujo, tenesmo y deposiciones con sangre/mucus.",
        "Puede desencadenar Síndrome Hemolítico Urémico (SHU), especialmente S. dysenteriae tipo 1 (productora de toxina Shiga).",
        "Brote constante en guarderías y transmisión fecal-oral estrecha."
      ]
    },
    "resistance": {
      "intrinsic": [
        "penicilina_g"
      ],
      "typicalAcquired": [
        "ampicilina",
        "cotrimoxazol",
        "ciprofloxacino"
      ],
      "stewardshipNote": "A diferencia de Salmonella, Shigella siempre debe tratarse para acortar la clínica y reducir la transmisibilidad. Azitromicina o Ceftriaxona son de elección en Chile dada la resistencia a fluoroquinolonas."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
  },
  {
    "id": "clostridium_perfringens",
    "name": "Clostridium perfringens",
    "shortName": "C. perfringens",
    "aliases": [
      "Bacilo de Welch"
    ],
    "taxonomy": {
      "gram": "positive",
      "morphology": "bacilo esporulado grueso",
      "group": "Clostridiaceae"
    },
    "clinical": {
      "summary": "Agente causal de la gangrena gaseosa (mionecrosis) y toxiinfecciones alimentarias autolimitadas.",
      "usualSyndromes": [
        "infeccion_necrotizante_tejidos_blandos",
        "mionecrosis",
        "intoxicacion_alimentaria"
      ],
      "context": "Comunitario / Trauma",
      "pearls": [
        "En mionecrosis, el dolor desproporcionado al examen físico es el signo clínico cardinal.",
        "Produce la toxina alfa (lecitinasa), responsable de la necrosis tisular profunda, hemólisis intravascular severa y shock.",
        "El diagnóstico de la gangrena es inminentemente clínico; no retrasar la cirugía por esperar imágenes o cultivos."
      ]
    },
    "resistance": {
      "intrinsic": [
        "aminoglucosidos",
        "aztreonam"
      ],
      "typicalAcquired": [
        "clindamicina (infrecuente pero descrita)"
      ],
      "stewardshipNote": "Emergencia infectológica y quirúrgica. El pilar es Penicilina G en altas dosis asociada a Clindamicina (por su efecto de inhibición en la síntesis de toxinas bacterianas)."
    },
    "appMeta": {
      "relevance": "critica",
      "status": "active"
    }
  },
  {
    "id": "actinomyces_spp",
    "name": "Actinomyces spp.",
    "shortName": "Actinomyces spp.",
    "aliases": [
      "Actinomyces israelii"
    ],
    "taxonomy": {
      "gram": "positive",
      "morphology": "bacilo filamentoso ramificado",
      "group": "Actinomycetaceae"
    },
    "clinical": {
      "summary": "Bacteria anaerobia/microaerófila de la flora oral y gastrointestinal normal, causante de infecciones granulomatosas crónicas.",
      "usualSyndromes": [
        "infeccion_cervicofacial",
        "enfermedad_pelvica_inflamatoria",
        "absceso_pulmonar"
      ],
      "context": "Comunitario",
      "pearls": [
        "Típicamente ignora los planos tisulares y forma trayectos fistulosos crónicos que drenan material purulento con 'gránulos de azufre'.",
        "La presentación cervicofacial (lumpy jaw) suele seguir a una extracción dental o trauma maxilofacial.",
        "Fuerte asociación con enfermedad pélvica inflamatoria en usuarias de DIU (Dispositivo Intrauterino) de larga data."
      ]
    },
    "resistance": {
      "intrinsic": [
        "metronidazol",
        "aminoglucosidos"
      ],
      "typicalAcquired": [],
      "stewardshipNote": "Requiere tratamientos muy prolongados (meses). Amoxicilina o Penicilina G EV inicial son de elección. Curiosamente, a pesar de ser anaerobio, es intrínsecamente resistente al Metronidazol."
    },
    "appMeta": {
      "relevance": "moderada",
      "status": "active"
    }
  },
  {
    "id": "nocardia_spp",
    "name": "Nocardia spp.",
    "shortName": "Nocardia spp.",
    "aliases": [
      "Nocardia asteroides",
      "Nocardia farcinica"
    ],
    "taxonomy": {
      "gram": "positive",
      "morphology": "bacilo filamentoso ramificado (BAAR débil)",
      "group": "Nocardiaceae"
    },
    "clinical": {
      "summary": "Patógeno oportunista ambiental que afecta primariamente a pacientes con inmunidad celular comprometida (trasplantados, uso crónico de corticoides).",
      "usualSyndromes": [
        "neumonia_cavitada",
        "absceso_cerebral",
        "infeccion_cutanea_primaria"
      ],
      "context": "Comunitario / Oportunista",
      "pearls": [
        "Sospechar ante todo paciente inmunocomprometido con nódulos pulmonares cavitados que desarrolla clínica neurológica focal (tropismo por el SNC).",
        "A diferencia de Actinomyces, Nocardia es estrictamente aerobia y ácido-alcohol resistente (BAAR) parcial/débil (se tiñe con Ziehl-Neelsen modificado o Kinyoun).",
        "En inmunocompetentes puede causar enfermedad cutánea primaria (micetoma) tras inoculación traumática."
      ]
    },
    "resistance": {
      "intrinsic": [
        "penicilina_g",
        "macrolidos (depende de la especie)"
      ],
      "typicalAcquired": [
        "ceftriaxona",
        "imipenem (especie-dependiente)"
      ],
      "stewardshipNote": "Cotrimoxazol (TMP-SMX) es la piedra angular del tratamiento. En enfermedad grave o compromiso del SNC, se inicia terapia combinada (ej. TMP-SMX + Imipenem o Amikacina) hasta tener el antibiograma."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
  },
  {
    "id": "coxiella_burnetii",
    "name": "Coxiella burnetii",
    "shortName": "C. burnetii",
    "aliases": [
      "Fiebre Q"
    ],
    "taxonomy": {
      "gram": "atypical",
      "morphology": "pleomórfico intracelular obligado",
      "group": "Coxiellaceae"
    },
    "clinical": {
      "summary": "Agente de la Fiebre Q, zoonosis altamente infectante transmitida principalmente por aerosoles de ganado ovino/caprino/bovino.",
      "usualSyndromes": [
        "sindrome_febril_agudo",
        "neumonia_atipica",
        "hepatitis_granulomatosa",
        "endocarditis_cultivo_negativo"
      ],
      "context": "Zoonosis",
      "pearls": [
        "Clásica tríada aguda: fiebre alta, neumonía atípica y hepatitis granulomatosa con elevación de transaminasas.",
        "Forma crónica principal: endocarditis con hemocultivos negativos, a menudo en pacientes con valvulopatía previa, meses o años tras la primoinfección.",
        "No causa exantema cutáneo, lo que la diferencia de las rickettsiosis clásicas."
      ]
    },
    "resistance": {
      "intrinsic": [
        "betalactamicos",
        "aminoglucosidos"
      ],
      "typicalAcquired": [],
      "stewardshipNote": "Doxiciclina es el tratamiento de primera línea para cuadros agudos. La endocarditis (crónica) requiere terapia prolongada (18-24 meses) con Doxiciclina + Hidroxicloroquina (para alcalinizar el fagolisosoma)."
    },
    "appMeta": {
      "relevance": "moderada",
      "status": "active"
    }
  },
  {
    "id": "brucella_spp",
    "name": "Brucella spp.",
    "shortName": "Brucella spp.",
    "aliases": [
      "Brucella melitensis",
      "Brucella abortus",
      "Fiebre de Malta"
    ],
    "taxonomy": {
      "gram": "negative",
      "morphology": "cocobacilo intracelular facultativo",
      "group": "Brucellaceae"
    },
    "clinical": {
      "summary": "Zoonosis que causa enfermedad febril sistémica (fiebre ondulante) con fuerte tropismo osteoarticular y hepatoesplénico.",
      "usualSyndromes": [
        "sindrome_febril_prolongado",
        "osteoartritis",
        "espondilodiscitis"
      ],
      "context": "Zoonosis",
      "pearls": [
        "El antecedente epidemiológico clásico es el consumo de quesos frescos o leche no pasteurizada, o riesgo ocupacional (veterinarios, mataderos).",
        "La complicación focal más frecuente es la osteoarticular (sacroiliitis y espondilodiscitis lumbar).",
        "Los hemocultivos pueden requerir incubación prolongada (hasta 21 días) si no se usan sistemas automatizados modernos, y el laboratorio debe ser avisado por riesgo de infección del personal."
      ]
    },
    "resistance": {
      "intrinsic": [
        "cefalosporinas_primera_generacion",
        "penicilina_g"
      ],
      "typicalAcquired": [],
      "stewardshipNote": "La monoterapia está proscrita por altas tasas de recaída. Esquemas estándar: Doxiciclina + Rifampicina (OMS) por 6 semanas, o Doxiciclina + Gentamicina/Estreptomicina. En neurobrucelosis o endocarditis se prefiere terapia triple."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
  },
  {
    "id": "bartonella_henselae",
    "name": "Bartonella henselae",
    "shortName": "B. henselae",
    "aliases": [
      "Enfermedad por arañazo de gato"
    ],
    "taxonomy": {
      "gram": "negative",
      "morphology": "bacilo pequeño fastidioso",
      "group": "Bartonellaceae"
    },
    "clinical": {
      "summary": "Causa principal de la linfadenitis regional tras contacto con gatos.",
      "usualSyndromes": [
        "linfadenitis_regional",
        "endocarditis_cultivo_negativo"
      ],
      "context": "Zoonosis",
      "pearls": [
        "Antecedente de arañazo o mordedura de gato (especialmente cachorros) en las 1-3 semanas previas.",
        "En inmunocomprometidos (VIH) puede causar angiomatosis bacilar y peliosis hepática.",
        "Diagnóstico suele ser serológico o por PCR de tejido ganglionar."
      ]
    },
    "resistance": {
      "intrinsic": [],
      "typicalAcquired": [],
      "stewardshipNote": "Tratamiento de elección en Chile: Azitromicina (reduce el volumen ganglionar). Alternativa: Doxiciclina."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = pathogens;
} else if (typeof window !== "undefined") {
  window.abg_pathogens = pathogens;
}
