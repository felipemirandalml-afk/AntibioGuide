[
  {
    "id": "acinetobacter_baumannii",
    "name": "Acinetobacter baumannii",
    "shortName": "A. baumannii",
    "aliases": ["Acinetobacter baumannii-calcoaceticus complex"],
    "taxonomy": {
      "gram": "negative",
      "morphology": "cocobacilo pleomórfico",
      "group": "Moraxellaceae"
    },
    "clinical": {
      "summary": "Patógeno oportunista intrahospitalario clásico, causante de brotes en UCI debido a su extrema persistencia en superficies secas e instrumental.",
      "usualSyndromes": ["neumonia_asociada_ventilacion", "bacteriemia_asociada_cateter", "infeccion_herida_operatoria"],
      "context": "Hospitalario",
      "pearls": [
        "Tiene baja virulencia intrínseca pero una extraordinaria capacidad para adquirir mecanismos de resistencia (fenotipo XDR/PDR).",
        "En tinciones de Gram puede retener cristal violeta y confundirse erróneamente con cocos Gram positivos.",
        "Múltiples brotes en Chile asociados a cepas productoras de carbapenemasas tipo OXA (OXA-23, OXA-58)."
      ]
    },
    "resistance": {
      "intrinsic": ["ampicilina", "amoxicilina_clavulanico", "cefalosporinas_primera_segunda_generacion", "ertapenem", "cloranfenicol"],
      "typicalAcquired": ["carbapenemicos (meropenem/imipenem)", "aminoglucosidos", "fluoroquinolonas", "colistin"],
      "stewardshipNote": "El componente Sulbactam (en Ampicilina-Sulbactam) tiene actividad bactericida intrínseca contra A. baumannii y es de primera línea. En cepas XDR, se recurre a esquemas combinados con Cefiderocol, Tigeciclina o Polimixinas."
    },
    "appMeta": {
      "relevance": "critica",
      "status": "active"
    }
  },
  {
    "id": "candida_auris",
    "name": "Candida auris",
    "shortName": "C. auris",
    "aliases": ["C. auris"],
    "taxonomy": {
      "gram": "positive", 
      "morphology": "levadura",
      "group": "Saccharomycetaceae"
    },
    "clinical": {
      "summary": "Hongo emergente de notificación obligatoria, altamente transmisible en entornos de salud y con elevadas tasas de multirresistencia.",
      "usualSyndromes": ["candidemia", "infeccion_invasora", "colonizacion_cutanea_persistente"],
      "context": "Hospitalario",
      "pearls": [
        "A diferencia de otras Candidas, coloniza persistentemente la piel (axilas, ingles) y sobrevive semanas en superficies hospitalarias, comportándose como una bacteria tipo MRSA/VRE.",
        "Los métodos fenotípicos tradicionales (ej. Vitek 2 antiguo) suelen identificarla erróneamente como C. haemulonii o C. famata; requiere MALDI-TOF o PCR para confirmación.",
        "Alerta permanente de vigilancia epidemiológica (ISP/MINSAL) ante cualquier aislamiento."
      ]
    },
    "resistance": {
      "intrinsic": ["fluconazol (alta prevalencia de resistencia natural o rápida adquisición)"],
      "typicalAcquired": ["anfotericina_b", "equinocandinas (emergente, cepas panresistentes descritas)"],
      "stewardshipNote": "Las equinocandinas (Caspofungina, Anidulafungina, Micafungina) son la terapia empírica de elección, pero la prueba de susceptibilidad es obligatoria. Medidas de aislamiento de contacto estricto son prioritarias."
    },
    "appMeta": {
      "relevance": "critica",
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
      "usualSyndromes": ["itu_asociada_cateter", "neumonia_asociada_cuidados_salud", "bacteriemia"],
      "context": "Hospitalario",
      "pearls": [
        "Algunas cepas (especialmente las no clínicas/ambientales) producen un pigmento rojo característico llamado prodigiosina.",
        "Pertenece al grupo 'SPACE' (Serratia, Pseudomonas, Acinetobacter, Citrobacter, Enterobacter), clásicos productores de betalactamasas tipo AmpC cromosómicas inducibles.",
        "Históricamente asociada a brotes nosocomiales por contaminación de jabones líquidos, antisépticos y propofol."
      ]
    },
    "resistance": {
      "intrinsic": ["colistin", "polimixina_b", "ampicilina", "amoxicilina_clavulanico", "cefuroxima", "nitrofurantoina"],
      "typicalAcquired": ["cefalosporinas_tercera_generacion (por desrepresión AmpC o BLEE)", "carbapenemicos"],
      "stewardshipNote": "Evitar Cefotaxima/Ceftriaxona incluso si el antibiograma reporta sensibilidad inicial, por alto riesgo de falla terapéutica (inducción de AmpC). Preferir Cefepime o Carbapenémicos para infecciones moderadas a severas. Su resistencia intrínseca a Colistín es clave para diferenciarla de otras enterobacterias en fenotipos MDR."
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
    "aliases": ["Bacilo de Lister"],
    "taxonomy": {
      "gram": "positive",
      "morphology": "bacilo corto (pleomórfico)",
      "group": "Listeriaceae"
    },
    "clinical": {
      "summary": "Patógeno transmitido por alimentos que causa meningoencefalitis y sepsis severa en recién nacidos, embarazadas, ancianos e inmunocomprometidos.",
      "usualSyndromes": ["meningitis_bacteriana", "romboencefalitis", "sepsis_neonatal", "infeccion_asociada_embarazo"],
      "context": "Comunitario / Zoonosis",
      "pearls": [
        "Capaz de crecer a temperaturas de refrigeración (4°C), lo que explica su asociación con fiambres, patés, salmón ahumado y quesos no pasteurizados.",
        "Posee motilidad característica en 'voltereta' (tumbling motility) a temperatura ambiente.",
        "Tiene especial tropismo por el tronco encefálico (romboencefalitis), pudiendo presentar clínica de pares craneales y ataxia."
      ]
    },
    "resistance": {
      "intrinsic": ["todas_las_cefalosporinas (incluyendo cefotaxima, ceftriaxona y cefepime)", "fosfomicina"],
      "typicalAcquired": ["macrolidos", "fluoroquinolonas (raro)"],
      "stewardshipNote": "REGLA DE ORO: Ninguna cefalosporina cubre Listeria. Es el motivo por el cual se añade Ampicilina empírica al esquema de meningitis en >50 años, embarazadas o inmunocomprometidos. En alergia severa a penicilina, el Cotrimoxazol es la alternativa de elección."
    },
    "appMeta": {
      "relevance": "critica",
      "status": "active"
    }
  },
  {
    "id": "neisseria_gonorrhoeae",
    "name": "Neisseria gonorrhoeae",
    "shortName": "N. gonorrhoeae",
    "aliases": ["Gonococo"],
    "taxonomy": {
      "gram": "negative",
      "morphology": "diplococo (en grano de café)",
      "group": "Neisseriaceae"
    },
    "clinical": {
      "summary": "Agente etiológico de la gonorrea, causante de uretritis/cervicitis, enfermedad pélvica inflamatoria (EPI) e infección gonocócica diseminada.",
      "usualSyndromes": ["uretritis", "cervicitis", "enfermedad_pelvica_inflamatoria", "artritis_septica", "conjuntivitis_neonatal"],
      "context": "Comunitario (ITS)",
      "pearls": [
        "Clásicamente se observa como diplococos intracelulares dentro de polimorfonucleares en el Gram de secreción uretral.",
        "Alta tasa de coinfección con Chlamydia trachomatis; tratar empíricamente para ambas si no se dispone de panel molecular (NAAT).",
        "La infección gonocócica diseminada cursa clásicamente con la tríada: tenosinovitis, dermatitis (lesiones pustulosas) y poliartralgias asimétricas."
      ]
    },
    "resistance": {
      "intrinsic": ["lincosamidas", "vancomicina"],
      "typicalAcquired": ["penicilina_g (producción de penicilinasa)", "ciprofloxacino (mutaciones gyrA)", "tetraciclinas", "azitromicina (resistencia en aumento global)"],
      "stewardshipNote": "Las guías actuales (CDC) recomiendan monoterapia con altas dosis de Ceftriaxona (500 mg IM dosis única) para infecciones no complicadas, abandonando la adición rutinaria de Azitromicina empírica para el gonococo (por aumento de resistencia a macrólidos), salvo que no se haya descartado Chlamydia."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
  },
{
    "id": "stenotrophomonas_maltophilia",
    "name": "Stenotrophomonas maltophilia",
    "shortName": "S. maltophilia",
    "aliases": ["Pseudomonas maltophilia", "Xanthomonas maltophilia"],
    "taxonomy": {
      "gram": "negative",
      "morphology": "bacilo no fermentador",
      "group": "Xanthomonadaceae"
    },
    "clinical": {
      "summary": "Patógeno oportunista intrahospitalario clásico que emerge tras esquemas prolongados con carbapenémicos en pacientes de UCI o inmunocomprometidos.",
      "usualSyndromes": ["neumonia_asociada_ventilacion", "bacteriemia_asociada_cateter", "infeccion_tracto_respiratorio_fq"],
      "context": "Hospitalario",
      "pearls": [
        "Clásicamente coloniza e infecta la vía aérea de pacientes con fibrosis quística o en ventilación mecánica invasiva prolongada.",
        "Tiene alta afinidad por superficies sintéticas (catéteres venosos centrales, tubos endotraqueales).",
        "Diferenciar colonización de infección es el mayor desafío clínico; aislamientos en secreción bronquial sin infiltrados nuevos o deterioro gasométrico a menudo no requieren tratamiento."
      ]
    },
    "resistance": {
      "intrinsic": ["todos_los_carbapenemicos", "aminoglucosidos (frecuente, por bombas de eflujo)"],
      "typicalAcquired": ["fluoroquinolonas", "cotrimoxazol (emergente)"],
      "stewardshipNote": "Es intrínsecamente resistente a los carbapenémicos debido a la producción de una metalo-beta-lactamasa (L1). Cotrimoxazol (TMP-SMX) a dosis altas es el gold standard absoluto. Minociclina, Levofloxacino o Cefiderocol son terapias de rescate."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
  },
  {
    "id": "enterococcus_faecium",
    "name": "Enterococcus faecium",
    "shortName": "E. faecium",
    "aliases": ["ERV (cuando es resistente a vancomicina)"],
    "taxonomy": {
      "gram": "positive",
      "morphology": "coco en cadenas cortas o pares",
      "group": "Enterococcaceae"
    },
    "clinical": {
      "summary": "Enterococo menos prevalente pero altamente resistente, causante de infecciones nosocomiales, frecuentemente portador de genes de resistencia a vancomicina (vanA/vanB).",
      "usualSyndromes": ["infeccion_intraabdominal", "itu_asociada_cateter", "bacteriemia", "endocarditis_infecciosa"],
      "context": "Hospitalario",
      "pearls": [
        "Regla del 80/20: E. faecalis causa el 80% de las infecciones (y suele ser sensible a ampicilina), mientras que E. faecium causa el 20% pero concentra casi toda la multirresistencia.",
        "Su aparición suele estar precedida por el uso empírico de cefalosporinas de 3ª generación (que barren la flora pero no lo cubren).",
        "En hemocultivos positivos para 'cocos gram positivos en cadenas', si el paciente tiene exposición previa a ATB o está en UCI, asumir E. faecium empíricamente hasta tener especie."
      ]
    },
    "resistance": {
      "intrinsic": ["todas_las_cefalosporinas", "clindamicina", "cloxacilina", "aminoglucosidos_bajo_nivel", "cotrimoxazol (in vivo)"],
      "typicalAcquired": ["ampicilina (casi 100% en cepas nosocomiales chilenas)", "vancomicina (VRE/ERV)", "gentamicina_alto_nivel"],
      "stewardshipNote": "Si se aísla E. faecium en un hospital chileno, se asume resistencia a Ampicilina. Si es sensible a Vancomicina, es de elección; si es ERV, Linezolid o Daptomicina son los estándares de cuidado. Las cefalosporinas NUNCA cubren enterococos."
    },
    "appMeta": {
      "relevance": "critica",
      "status": "active"
    }
  },
  {
    "id": "legionella_pneumophila",
    "name": "Legionella pneumophila",
    "shortName": "L. pneumophila",
    "aliases": ["Enfermedad del legionario", "Fiebre de Pontiac"],
    "taxonomy": {
      "gram": "atypical",
      "morphology": "bacilo pleomórfico (no tiñe bien con Gram)",
      "group": "Legionellaceae"
    },
    "clinical": {
      "summary": "Agente etiológico de neumonía atípica severa, a menudo asociada a brotes epidémicos por sistemas de agua contaminados o aires acondicionados.",
      "usualSyndromes": ["neumonia_adquirida_comunidad_grave", "neumonia_intrahospitalaria"],
      "context": "Comunitario / Brotes intrahospitalarios",
      "pearls": [
        "Sospechar clásicamente ante una neumonía severa acompañada de síntomas gastrointestinales (diarrea acuosa), hiponatremia (<130 mEq/L), elevación de transaminasas y bradicardia relativa.",
        "El antígeno urinario para Legionella es muy específico, pero solo detecta el serogrupo 1 (responsable del 70-80% de los casos clínicos).",
        "No se transmite de persona a persona; la exposición es siempre ambiental (aerosoles de duchas, torres de refrigeración)."
      ]
    },
    "resistance": {
      "intrinsic": ["todos_los_betalactamicos", "aminoglucosidos"],
      "typicalAcquired": [],
      "stewardshipNote": "Al ser intracelular, requiere antibióticos con alta penetración tisular y macrófaga. Azitromicina (o Claritromicina) y Fluoroquinolonas respiratorias (Levofloxacino) son las terapias de primera línea exclusivas."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
  },
  {
    "id": "staphylococcus_saprophyticus",
    "name": "Staphylococcus saprophyticus",
    "shortName": "S. saprophyticus",
    "aliases": ["CoNS urinario"],
    "taxonomy": {
      "gram": "positive",
      "morphology": "coco en racimos (coagulasa negativo)",
      "group": "Staphylococcaceae"
    },
    "clinical": {
      "summary": "Segunda causa más común de cistitis no complicada en mujeres jóvenes sexualmente activas (después de E. coli).",
      "usualSyndromes": ["itu_baja", "cistitis_aguda"],
      "context": "Comunitario",
      "pearls": [
        "Clásico agente de la 'cistitis de la luna de miel'.",
        "A diferencia de E. coli, no reduce los nitratos a nitritos, por lo que el test de nitritos en la tira reactiva de orina será característicamente negativo.",
        "Excepcionalmente causa pielonefritis o infecciones sistémicas/nosocomiales, a diferencia de otros estafilococos coagulasa negativos (como S. epidermidis)."
      ]
    },
    "resistance": {
      "intrinsic": ["novobiocina (clave para su identificación en laboratorio)", "fosfomicina (resistencia in vitro, pero el MINSAL/IDSA igual la avala por altísima concentración urinaria)"],
      "typicalAcquired": ["ampicilina"],
      "stewardshipNote": "Altamente sensible en la práctica a Nitrofurantoína y Cotrimoxazol. Aunque in vitro muestra resistencia natural a Fosfomicina y Ácido Nalidíxico, la cistitis a menudo responde a esquemas estándar de primera línea."
    },
    "appMeta": {
      "relevance": "moderada",
      "status": "active"
    }
  },
  {
    "id": "moraxella_catarrhalis",
    "name": "Moraxella catarrhalis",
    "shortName": "M. catarrhalis",
    "aliases": ["Branhamella catarrhalis"],
    "taxonomy": {
      "gram": "negative",
      "morphology": "diplococo",
      "group": "Moraxellaceae"
    },
    "clinical": {
      "summary": "Patógeno respiratorio estrictamente humano, fundamental en exacerbaciones de EPOC, otitis media aguda y sinusitis en pediatría.",
      "usualSyndromes": ["exacerbacion_epoc", "otitis_media_aguda", "sinusitis_aguda", "neumonia_adquirida_comunidad"],
      "context": "Comunitario",
      "pearls": [
        "En microbiología, sus colonias tienen el 'signo del disco de hockey' (se pueden empujar enteras sobre el agar sin romperse).",
        "Suele conformar la tríada clásica de patógenos respiratorios altos junto al S. pneumoniae y H. influenzae.",
        "Afecta primariamente a fumadores o pacientes con daño estructural de la vía aérea (EPOC, bronquiectasias)."
      ]
    },
    "resistance": {
      "intrinsic": ["ampicilina", "amoxicilina", "trimetoprima (como monoterapia)", "clindamicina"],
      "typicalAcquired": ["macrolidos (raro pero descrito)"],
      "stewardshipNote": "La perla clínica crítica: cerca del 100% de las cepas producen betalactamasas (tipo BRO). Por lo tanto, a diferencia del neumococo, NUNCA se debe tratar con Amoxicilina sola; siempre requiere un inhibidor (Amoxicilina-Clavulánico), Cefalosporinas de 2ª/3ª generación o Macrólidos."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
  }
]