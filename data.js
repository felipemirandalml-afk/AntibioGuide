const clinicalData = {
  syndromes: [
    {
      id: "nac",
      name: "Neumonía Adquirida en la Comunidad (NAC)",
      synonyms: ["NAC", "Pneumonia", "Neumonía", "neumonia", "cap", "community acquired pneumonia"],
      description: "Infección del parénquima pulmonar adquirida fuera del hospital.",
      criteria: {
        outpatient: "CURB-65 score 0-1 o PSI clase I-II.",
        hospital: "CURB-65 score ≥ 2 o PSI clase III-V. Inestabilidad hemodinámica o respiratoria.",
      },
      regimens: [
        {
          name: "Ambulatorio (Sin comorbilidades)",
          type: "empiric",
          scenario: "outpatient",
          targets: ["S. pneumoniae", "H. influenzae"],
          drug: "Amoxicilina",
          drugIds: ["amoxicilina"],
          dose: "1 g",
          route: "PO",
          interval: "cada 8 horas",
          duration: "5-7 días",
          comments: "Primera línea en áreas con baja resistencia de S. pneumoniae.",
          reference: "IDSA/ATS 2019/2024",
        },
        {
          name: "Ambulatorio (Con comorbilidades)",
          type: "empiric",
          scenario: "outpatient_comorbid",
          targets: ["típicos + atípicos"],
          drug: "Amoxicilina-Clavulánico + Azitromicina",
          drugIds: ["amoxicilina_clavulanico", "azitromicina"],
          dose: "875/125 mg c/12h + 500 mg día 1, luego 250 mg/día",
          route: "PO",
          interval: "Ver dosis",
          duration: "5-7 días",
          comments: "Cubre patógenos típicos y atípicos. Alternativa: Doxiciclina 100 mg c/12h.",
          reference: "IDSA/ATS 2019/2024",
        },
        {
          name: "Hospitalario (No UCI)",
          type: "empiric",
          scenario: "inpatient_non_icu",
          targets: ["típicos + atípicos"],
          drug: "Ceftriaxona + Azitromicina",
          drugIds: ["ceftriaxona", "azitromicina"],
          dose: "1-2 g IV + 500 mg PO/IV",
          route: "IV/PO",
          interval: "Ceftriaxona diaria, Azitro diaria",
          duration: "5-7 días",
          comments: "Esquema estándar para pacientes hospitalizados.",
          reference: "IDSA/ATS 2019/2024",
        },
        {
          name: "Alergia a Beta-lactámicos (Ambulatorio)",
          type: "alternative",
          scenario: "outpatient",
          targets: ["típicos + atípicos"],
          drug: "Levofloxacino",
          drugIds: ["levofloxacino"],
          dose: "750 mg",
          route: "PO",
          interval: "cada 24 horas",
          duration: "5 días",
          comments: "Fluoroquinolona respiratoria. Evitar si hay sospecha de tuberculosis.",
          reference: "IDSA/ATS 2019/2024",
        }
      ],
      pathogens: ["S. pneumoniae", "H. influenzae", "Mycoplasma pneumoniae", "Chlamydia pneumoniae"],
    },

    {
      id: "itu",
      name: "Infección del Tracto Urinario (ITU) - Cistitis",
      synonyms: ["ITU", "Cistitis", "Infección urinaria", "uti", "cystitis"],
      description: "Infección de la vejiga en adultos.",
      criteria: {
        outpatient: "Cistitis no complicada en pacientes sanos.",
        hospital: "Signos de sepsis, pielonefritis con vómitos o inestabilidad.",
      },
      regimens: [
        {
          name: "Primera Línea (Cistitis)",
          type: "empiric",
          scenario: "outpatient_uncomplicated",
          targets: ["E. coli"],
          drug: "Nitrofurantoína (Macrocristales)",
          drugIds: ["nitrofurantoina"],
          dose: "100 mg",
          route: "PO",
          interval: "cada 12 horas",
          duration: "5 días",
          comments: "Evitar si ClCr < 30 mL/min.",
          reference: "IDSA 2011 / Update 2024",
        },
        {
          name: "Primera Línea (Alternativa)",
          type: "alternative",
          scenario: "outpatient_uncomplicated",
          targets: ["E. coli"],
          drug: "Fosfomicina Trometamol",
          drugIds: ["fosfomicina_trometamol"],
          dose: "3 g",
          route: "PO",
          interval: "Dosis única",
          duration: "1 día",
          comments: "Útil para adherencia. Menor eficacia que nitrofurantoína en algunas series.",
          reference: "IDSA 2011 / Update 2024",
        },
        {
          name: "Segunda Línea",
          type: "alternative",
          scenario: "outpatient_uncomplicated",
          drug: "Cefalexina",
          drugIds: ["cefalexina"],
          dose: "500 mg",
          route: "PO",
          interval: "cada 6-8 horas",
          duration: "5-7 días",
          comments: "Beta-lactámico oral común.",
          reference: "IDSA 2011 / Update 2024",
        },
        {
          name: "Alergia a Beta-lactámicos",
          type: "alternative",
          scenario: "outpatient_uncomplicated",
          drug: "Ciprofloxacino",
          drugIds: ["ciprofloxacino"],
          dose: "250-500 mg",
          route: "PO",
          interval: "cada 12 horas",
          duration: "3 días",
          comments: "Reservar para casos donde otras opciones no son viables debido a resistencias.",
          reference: "IDSA 2011 / Update 2024",
        }
      ],
      pathogens: ["E. coli", "Klebsiella spp.", "Proteus mirabilis", "S. saprophyticus"],
    },

    {
      id: "celulitis",
      name: "Celulitis",
      synonyms: ["Celulitis", "Infección de piel y partes blandas", "ssti", "skin and soft tissue infection"],
      description: "Infección difusa de la dermis y tejido subcutáneo.",
      criteria: {
        outpatient: "Sin signos de toxicidad sistémica, sin comorbilidades graves.",
        hospital: "Falla de tratamiento oral, SIRS, inmunosupresión, progresión rápida.",
      },
      regimens: [
        {
          name: "Ambulatorio (No purulenta)",
          type: "empiric",
          scenario: "outpatient_nonpurulent",
          targets: ["estreptococos", "MSSA"],
          drug: "Cefalexina",
          drugIds: ["cefalexina"],
          dose: "500 mg",
          route: "PO",
          interval: "cada 6 horas",
          duration: "5-10 días",
          comments: "Cubre estreptococos y S. aureus sensible (MSSA).",
          reference: "IDSA SSTI 2014 / 2024",
        },
        {
          name: "Ambulatorio (Sospecha MRSA)",
          type: "empiric",
          scenario: "outpatient_purulent_or_mrsa_risk",
          targets: ["MRSA"],
          drug: "Trimetoprima-Sulfametoxazol",
          drugIds: ["tmp_smx"],
          dose: "160/800 mg (DS)",
          route: "PO",
          interval: "cada 12 horas",
          duration: "5-10 días",
          comments: "Usar si hay sospecha de Staphylococcus aureus resistente a meticilina.",
          reference: "IDSA SSTI 2014 / 2024",
        },
        {
          name: "Hospitalario",
          type: "empiric",
          scenario: "inpatient_nonpurulent",
          targets: ["estreptococos", "MSSA"],
          drug: "Cefazolina",
          drugIds: ["cefazolina"],
          dose: "1-2 g",
          route: "IV",
          interval: "cada 8 horas",
          duration: "5-10 días",
          comments: "Estándar para celulitis grave no purulenta.",
          reference: "IDSA SSTI 2014 / 2024",
        },
        {
          name: "Alergia a Beta-lactámicos",
          type: "alternative",
          scenario: "outpatient_or_inpatient",
          targets: ["estreptococos", "MSSA (variable)"],
          drug: "Clindamicina",
          drugIds: ["clindamicina"],
          dose: "300-450 mg PO o 600-900 mg IV",
          route: "PO/IV",
          interval: "cada 6-8 horas",
          duration: "5-10 días",
          comments: "Riesgo de infección por C. difficile.",
          reference: "IDSA SSTI 2014 / 2024",
        }
      ],
      pathogens: ["Streptococcus pyogenes", "Staphylococcus aureus", "MRSA"],
    },

    {
      id: "epi",
      name: "Enfermedad Inflamatoria Pélvica (EPI)",
      synonyms: ["EPI", "PID", "Salpingitis"],
      description: "Infección del tracto genital superior femenino.",
      criteria: {
        outpatient: "Cuadros leves a moderados, tolera vía oral.",
        hospital: "Embarazo, falla de tto oral, náuseas/vómitos, absceso tubo-ovárico, sospecha de emergencia quirúrgica.",
      },
      regimens: [
        {
          name: "Tratamiento Ambulatorio",
          type: "empiric",
          scenario: "outpatient",
          targets: ["N. gonorrhoeae", "C. trachomatis", "anaerobios"],
          drug: "Ceftriaxona (500mg IM) + Doxiciclina (100mg PO c/12h) + Metronidazol (500mg PO c/12h)",
          drugIds: ["ceftriaxona", "doxiciclina", "metronidazol"],
          dose: "Dosis variable",
          route: "IM/PO",
          interval: "Ver comentarios",
          duration: "14 días (Doxi/Metro)",
          comments: "Ceftriaxona dosis única IM. Doxiciclina y Metronidazol por 14 días.",
          reference: "CDC 2021 / 2024",
        },
        {
          name: "Hospitalario (Esquema A)",
          type: "empiric",
          scenario: "inpatient",
          targets: ["N. gonorrhoeae", "C. trachomatis", "anaerobios"],
          drug: "Ceftriaxona (1g IV c/24h) + Doxiciclina (100mg PO/IV c/12h) + Metronidazol (500mg IV/PO c/12h)",
          drugIds: ["ceftriaxona", "doxiciclina", "metronidazol"],
          dose: "Ver dosis",
          route: "IV/PO",
          interval: "Ver dosis",
          duration: "14 días totales",
          comments: "Paso a vía oral tras 24-48h de mejora clínica.",
          reference: "CDC 2021 / 2024",
        },
        {
          name: "Hospitalario (Esquema B)",
          type: "alternative",
          scenario: "inpatient",
          targets: ["anaerobios", "polimicrobiano"],
          drug: "Clindamicina (900mg IV c/8h) + Gentamicina (2mg/kg carga, luego 1.5mg/kg c/8h)",
          drugIds: ["clindamicina", "gentamicina"],
          dose: "Ver dosis",
          route: "IV",
          interval: "cada 8 horas",
          duration: "14 días totales",
          comments: "Alternativa para alérgicos a penicilina o sospecha de anaerobios.",
          reference: "CDC 2021 / 2024",
        }
      ],
      pathogens: ["Neisseria gonorrhoeae", "Chlamydia trachomatis", "Anaerobios", "Mycoplasma genitalium"],
    },

    {
      id: "meningitis",
      name: "Meningitis bacteriana",
      synonyms: ["Meningitis", "Infección SNC", "bacterial meningitis"],
      description: "Inflamación de las meninges causada por bacterias.",
      criteria: {
        hospital: "Siempre requiere hospitalización urgente y tratamiento IV inmediato.",
      },
      regimens: [
        {
          name: "Empírico (Adulto < 50 años)",
          type: "empiric",
          scenario: "inpatient",
          targets: ["S. pneumoniae", "N. meningitidis"],
          drug: "Vancomicina + Ceftriaxona",
          drugIds: ["vancomicina", "ceftriaxona"],
          dose: "Vancomicina (guiada por niveles) + Ceftriaxona 2 g",
          route: "IV",
          interval: "Ceftriaxona cada 12 horas",
          duration: "10-14 días",
          comments: "Dexametasona 10mg IV c/6h iniciar con o antes de la primera dosis.",
          reference: "IDSA 2004 / 2024",
        },
        {
          name: "Empírico (Adulto > 50 años / Inmunocomprometido)",
          type: "empiric",
          scenario: "inpatient",
          targets: ["+ Listeria"],
          drug: "Vancomicina + Ceftriaxona + Ampicilina",
          drugIds: ["vancomicina", "ceftriaxona", "ampicilina"],
          dose: "Añadir Ampicilina 2 g",
          route: "IV",
          interval: "Ampicilina cada 4 horas",
          duration: "14-21 días",
          comments: "La ampicilina cubre Listeria monocytogenes.",
          reference: "IDSA 2004 / 2024",
        },
        {
          name: "Alergia a Beta-lactámicos",
          type: "alternative",
          scenario: "inpatient",
          targets: ["típicos ± Listeria"],
          drug: "Vancomicina + Moxifloxacino ± TMP-SMX",
          drugIds: ["vancomicina", "moxifloxacino", "tmp_smx"],
          dose: "Dosis variable",
          route: "IV",
          interval: "Ver guía",
          duration: "10-21 días",
          comments: "El uso de TMP-SMX es para cubrir Listeria si es necesario.",
          reference: "IDSA 2004 / 2024",
        }
      ],
      pathogens: ["S. pneumoniae", "N. meningitidis", "Listeria monocytogenes", "H. influenzae"],
    },

    {
      id: "pie_diabetico",
      name: "Infección de pie diabético",
      synonyms: ["Pie diabético", "Osteomielitis", "diabetic foot infection", "dfi"],
      description: "Infección en tejidos por debajo del maleolo en pacientes con diabetes.",
      criteria: {
        outpatient: "Infección leve, sin compromiso sistémico.",
        hospital: "Infección moderada a grave, sospecha de osteomielitis o isquemia.",
      },
      regimens: [
        {
          name: "Infección Leve (Ambulatorio)",
          type: "empiric",
          scenario: "outpatient_mild",
          targets: ["MSSA/estreptococos ± anaerobios"],
          drug: "Amoxicilina-Clavulánico",
          drugIds: ["amoxicilina_clavulanico"],
          dose: "875/125 mg",
          route: "PO",
          interval: "cada 12 horas",
          duration: "1-2 semanas",
          comments: "Cubre Gram+ y anaerobios comunes.",
          reference: "IWGDF/IDSA 2023",
        },
        {
          name: "Infección Moderada/Grave (Hospitalario)",
          type: "empiric",
          scenario: "inpatient_moderate_severe",
          targets: ["polimicrobiano ± Pseudomonas según riesgo"],
          drug: "Piperacilina-Tazobactam",
          drugIds: ["piperacilina_tazobactam"],
          dose: "4.5 g",
          route: "IV",
          interval: "cada 6-8 horas",
          duration: "2-3 semanas (tejido blando)",
          comments: "Cubre Pseudomonas y anaerobios. Prolongar si hay osteomielitis.",
          reference: "IWGDF/IDSA 2023",
        },
        {
          name: "Alergia a Beta-lactámicos",
          type: "alternative",
          scenario: "outpatient_or_inpatient",
          targets: ["polimicrobiano"],
          drug: "Clindamicina + Levofloxacino",
          drugIds: ["clindamicina", "levofloxacino"],
          dose: "450 mg PO c/8h + 750 mg PO c/24h",
          route: "PO",
          interval: "Ver dosis",
          duration: "1-2 semanas",
          comments: "Buena penetración ósea. Vigilancia de C. difficile.",
          reference: "IWGDF/IDSA 2023",
        }
      ],
      pathogens: ["S. aureus (MSSA/MRSA)", "Streptococcus spp.", "Enterobacteriaceae", "Anaerobios"],
    },

    {
      id: "intraabdominal",
      name: "Infección intraabdominal",
      synonyms: ["Apendicitis", "Colecistitis", "Peritonitis", "intraabdominal infection", "iai"],
      description: "Infecciones de órganos abdominales, usualmente polimicrobianas.",
      criteria: {
        hospital: "Casi siempre requiere manejo hospitalario e intervención quirúrgica.",
      },
      regimens: [
        {
          name: "Comunitaria Leve/Moderada",
          type: "empiric",
          scenario: "inpatient_or_ed",
          targets: ["Enterobacterales + anaerobios"],
          drug: "Ceftriaxona + Metronidazol",
          drugIds: ["ceftriaxona", "metronidazol"],
          dose: "2 g IV + 500 mg IV",
          route: "IV",
          interval: "Ceftriaxona diaria / Metro cada 8h",
          duration: "4-7 días (tras control de foco)",
          comments: "Esquema estándar para apendicitis/colecistitis.",
          reference: "IDSA 2010 / 2024",
        },
        {
          name: "Grave / Nosocomial",
          type: "empiric",
          scenario: "inpatient_severe_nosocomial",
          targets: ["+ Pseudomonas según riesgo + anaerobios"],
          drug: "Piperacilina-Tazobactam",
          drugIds: ["piperacilina_tazobactam"],
          dose: "4.5 g",
          route: "IV",
          interval: "cada 6 horas",
          duration: "4-7 días",
          comments: "Para peritonitis generalizada o sospecha de Pseudomonas.",
          reference: "IDSA 2010 / 2024",
        },
        {
          name: "Alergia a Beta-lactámicos",
          type: "alternative",
          scenario: "inpatient",
          targets: ["Enterobacterales + anaerobios"],
          drug: "Levofloxacino + Metronidazol",
          drugIds: ["levofloxacino", "metronidazol"],
          dose: "750 mg IV + 500 mg IV",
          route: "IV",
          interval: "Levofloxacino diario / Metro c/8h",
          duration: "4-7 días",
          comments: "Alternativa para alérgicos graves.",
          reference: "IDSA 2010 / 2024",
        }
      ],
      pathogens: ["E. coli", "Bacteroides fragilis", "Klebsiella spp.", "Enterococcus spp."],
    },

    {
      id: "faringitis",
      name: "Faringitis estreptocócica",
      synonyms: ["Faringitis", "Amigdalitis", "Anginas", "strep throat"],
      description: "Infección de la faringe por Streptoccocus pyogenes.",
      criteria: {
        outpatient: "Tratamiento ambulatorio estándar tras confirmación (Test rápido/Cultivo).",
      },
      regimens: [
        {
          name: "Tratamiento de Elección",
          type: "directed",
          scenario: "outpatient",
          targets: ["GAS"],
          drug: "Penicilina V o Amoxicilina",
          drugIds: ["penicilina_v", "amoxicilina"],
          dose: "500 mg c/12h (Pen V) o 500 mg c/12h (Amox)",
          route: "PO",
          interval: "cada 12 horas",
          duration: "10 días",
          comments: "Cumplir los 10 días para prevenir fiebre reumática.",
          reference: "IDSA 2012 / 2025",
        },
        {
          name: "Dosis Única (Alternativa)",
          type: "alternative",
          scenario: "outpatient",
          targets: ["GAS"],
          drug: "Penicilina G Benzatínica",
          drugIds: ["penicilina_g_benzatinica"],
          dose: "1.2 millones UI",
          route: "IM",
          interval: "Dosis única",
          duration: "1 día",
          comments: "Útil si se sospecha mala adherencia al tratamiento oral.",
          reference: "IDSA 2012 / 2025",
        },
        {
          name: "Alergia a Beta-lactámicos",
          type: "alternative",
          scenario: "outpatient",
          targets: ["GAS"],
          drug: "Clindamicina o Azitromicina",
          drugIds: ["clindamicina", "azitromicina"],
          dose: "300 mg c/8h (Clinda) / 500 mg día 1, luego 250 mg (Azitro)",
          route: "PO",
          interval: "Ver dosis",
          duration: "10 días (Clinda) / 5 días (Azitro)",
          comments: "Azitromicina solo si la resistencia local de S. pyogenes es baja.",
          reference: "IDSA 2012 / 2025",
        }
      ],
      pathogens: ["Streptococcus pyogenes (Grupo A)"],
    },

    {
      id: "sepsis_urinaria",
      name: "Sepsis de Foco Urinario (Urosepsis)",
      synonyms: ["Sepsis urinaria", "Pielonefritis grave", "Urosepsis", "urosepsis"],
      description: "Disfunción orgánica causada por una respuesta desregulada a una infección urinaria.",
      criteria: {
        hospital: "Siempre requiere hospitalización y manejo agresivo.",
      },
      regimens: [
        {
          name: "Empírico (Comunitario)",
          type: "empiric",
          scenario: "inpatient",
          targets: ["Enterobacterales"],
          drug: "Ceftriaxona",
          drugIds: ["ceftriaxona"],
          dose: "1-2 g",
          route: "IV",
          interval: "cada 24 horas",
          duration: "7-10 días",
          comments: "Si no hay sospecha de pseudomonas o ESBL.",
          reference: "Surviving Sepsis 2021 / IDSA 2024",
        },
        {
          name: "Empírico (Amplio Espectro)",
          type: "empiric",
          scenario: "inpatient_severe_or_risk_pseudomonas",
          targets: ["Enterobacterales + Pseudomonas según riesgo"],
          drug: "Piperacilina-Tazobactam",
          drugIds: ["piperacilina_tazobactam"],
          dose: "4.5 g",
          route: "IV",
          interval: "cada 6-8 horas",
          duration: "7-10 días",
          comments: "Cubre Pseudomonas aeruginosa y anaerobios.",
          reference: "Surviving Sepsis 2021 / IDSA 2024",
        },
        {
          name: "Sospecha de ESBL",
          type: "empiric",
          scenario: "inpatient_esbl_risk",
          targets: ["ESBL/ESBL-risk Enterobacterales"],
          drug: "Ertapenem o Meropenem",
          drugIds: ["ertapenem", "meropenem"],
          dose: "1 g",
          route: "IV",
          interval: "cada 24h (Ertapenem) / cada 8h (Mero)",
          duration: "7-10 días",
          comments: "Ertapenem es opción si no se sospecha Pseudomonas.",
          reference: "Surviving Sepsis 2021 / IDSA 2024",
        },
        {
          name: "Alergia a Beta-lactámicos",
          type: "alternative",
          scenario: "inpatient",
          targets: ["Enterobacterales ± Pseudomonas según contexto"],
          drug: "Levofloxacino o Gentamicina + Aztreonam",
          drugIds: ["levofloxacino", "gentamicina", "aztreonam"],
          dose: "750 mg IV / 5 mg/kg IV",
          route: "IV",
          interval: "cada 24 horas",
          duration: "7-10 días",
          comments: "Ajustar gentamicina según niveles y función renal.",
          reference: "Surviving Sepsis 2021",
        }
      ],
      pathogens: ["E. coli (MDR/ESBL)", "Klebsiella spp.", "Pseudomonas aeruginosa", "Enterococcus spp."],
    },

    // Endocarditis: mantenemos 1 entrada (compatibilidad), pero ya con escenarios + type
    {
      id: "endocarditis_infecciosa",
      name: "Endocarditis infecciosa (adultos)",
      synonyms: [
        "endocarditis",
        "endocarditis infecciosa",
        "ei",
        "infective endocarditis",
        "endocarditis bacteriana",
        "endocarditis valvula nativa",
        "endocarditis valvular",
        "pve",
        "nve"
      ],
      description:
        "Infección del endocardio valvular o mural con vegetaciones. Alta mortalidad; requiere hospitalización inicial, hemocultivos y ecocardiografía (ETT/ETE) y tratamiento IV según escenario (ESC 2023).",
      criteria: {
        outpatient:
          "En general NO ambulatorio al inicio: todos requieren hospitalización inicial para hemocultivos (≥3 sets), ETT/ETE e inicio de antibióticos IV según escenario.",
        hospital:
          "Hospitalización inicial en todos. UCI si shock séptico/cardiogénico, insuficiencia cardíaca aguda NYHA IV/edema pulmonar, arritmias malignas o BAV completo, complicación neurológica aguda, o falla respiratoria con VM."
      },
      regimens: [
        {
          name: "Empírico: válvula nativa o prótesis tardía (comunitaria, estable)",
          type: "empiric",
          scenario: "nve_or_pve_late",
          drug: "Ampicilina + Ceftriaxona + Gentamicina",
          drugIds: ["ampicilina", "ceftriaxona", "gentamicina"],
          dose: "Ampicilina 12 g/día + Ceftriaxona 2 g/día + Gentamicina 3 mg/kg/día (máx 240 mg/día)",
          route: "IV (gentamicina IV/IM)",
          interval: "Ampicilina en 4–6 dosis; Ceftriaxona 1–2 dosis; Gentamicina 1 dosis/día",
          duration: "Hasta identificación microbiológica y ajuste dirigido",
          comments:
            "Cubre enterococos, estreptococos y HACEK. Monitorizar niveles de gentamicina y función renal.",
          reference: "ESC 2023"
        },
        {
          name: "Empírico: prótesis temprana (<12 meses) o EI nosocomial",
          type: "empiric",
          scenario: "pve_early_or_nosocomial",
          drug: "Vancomicina + Gentamicina + Rifampicina",
          drugIds: ["vancomicina", "gentamicina", "rifampicina"],
          dose: "Vancomicina 30–60 mg/kg/día + Gentamicina 3 mg/kg/día (máx 240 mg/día) + Rifampicina 900–1200 mg/día",
          route: "IV (rifampicina IV/VO)",
          interval: "Vanco 2–3 dosis; Genta 1 dosis/día; Rifampicina 2–3 dosis",
          duration: "Hasta identificación microbiológica y ajuste dirigido",
          comments:
            "Rifampicina iniciar tras 3–5 días de terapia efectiva (ideal con hemocultivos en negativización). Objetivo vanco AUC/MIC 400–600.",
          reference: "ESC 2023"
        },

        {
          name: "Dirigido: Streptococcus viridans / S. gallolyticus sensible (NVE estándar)",
          type: "directed",
          scenario: "nve",
          targets: ["viridans", "S. gallolyticus"],
          drug: "Penicilina G (o Amoxicilina o Ceftriaxona)",
          drugIds: ["penicilina_g", "amoxicilina", "ceftriaxona"],
          dose: "Penicilina G 12–18 millones UI/día (o Amoxicilina 100–200 mg/kg/día; o Ceftriaxona 2 g/día)",
          route: "IV (ceftriaxona IV/IM)",
          interval: "Penicilina 4 dosis o infusión continua; Amoxicilina 4–6 dosis; Ceftriaxona 1 dosis/día",
          duration: "4 semanas",
          comments: "Alternativa útil para OPAT: ceftriaxona 1 vez/día (seleccionados).",
          reference: "ESC 2023"
        },
        {
          name: "Dirigido: Streptococcus viridans sensible (NVE corto, seleccionados)",
          type: "directed",
          scenario: "nve_selected_short_course",
          targets: ["viridans"],
          drug: "Penicilina G / Amoxicilina / Ceftriaxona + Gentamicina",
          drugIds: ["penicilina_g", "amoxicilina", "ceftriaxona", "gentamicina"],
          dose: "Penicilina G 12–18 millones UI/día (o Amoxicilina 100–200 mg/kg/día; o Ceftriaxona 2 g/día) + Gentamicina 3 mg/kg/día",
          route: "IV (ceftriaxona IV/IM; gentamicina IV/IM)",
          interval: "β-lactámico según esquema + Gentamicina 1 dosis/día",
          duration: "2 semanas",
          comments:
            "Solo en NVE NO complicada con función renal normal. NO usar en PVE, absceso, IC, vegetación grande o complicaciones.",
          reference: "ESC 2023"
        },
        {
          name: "Dirigido: Streptococcus viridans sensible (PVE)",
          type: "directed",
          scenario: "pve",
          targets: ["viridans"],
          drug: "Penicilina G (o Amoxicilina o Ceftriaxona)",
          drugIds: ["penicilina_g", "amoxicilina", "ceftriaxona"],
          dose: "Penicilina G 12–18 millones UI/día (o Amoxicilina 100–200 mg/kg/día; o Ceftriaxona 2 g/día)",
          route: "IV (ceftriaxona IV/IM)",
          interval: "Penicilina 4 dosis; Amoxicilina 4–6 dosis; Ceftriaxona 1 dosis/día",
          duration: "6 semanas",
          comments: "Duración prolongada por prótesis.",
          reference: "ESC 2023"
        },

        {
          name: "Dirigido: MSSA (válvula nativa)",
          type: "directed",
          scenario: "nve",
          targets: ["MSSA"],
          drug: "Cloxacilina (o Cefazolina)",
          drugIds: ["cloxacilina", "cefazolina"],
          dose: "Cloxacilina 12 g/día (o Cefazolina 6 g/día)",
          route: "IV",
          interval: "Cloxacilina 4–6 dosis; Cefazolina 3 dosis",
          duration: "4 semanas",
          comments:
            "En NVE estafilocócica NO se recomiendan aminoglucósidos (↑ nefrotoxicidad sin beneficio).",
          reference: "ESC 2023"
        },
        {
          name: "Dirigido: MSSA (prótesis valvular)",
          type: "directed",
          scenario: "pve",
          targets: ["MSSA"],
          drug: "Cloxacilina/Cefazolina + Rifampicina + Gentamicina",
          drugIds: ["cloxacilina", "cefazolina", "rifampicina", "gentamicina"],
          dose: "Cloxacilina 12 g/día (o Cefazolina 6 g/día) + Rifampicina 900–1200 mg/día + Gentamicina 3 mg/kg/día",
          route: "IV (rifampicina IV/VO; gentamicina IV/IM)",
          interval: "β-lactámico 4–6 dosis (cefazolina 3); Rifampicina 3 dosis; Gentamicina 1 dosis/día",
          duration: "β-lactámico + rifampicina ≥6 semanas; gentamicina 2 semanas",
          comments:
            "Rifampicina iniciar tras 3–5 días de antibiótico efectivo (ideal con hemocultivos negativizando).",
          reference: "ESC 2023"
        },

        {
          name: "Dirigido: MRSA (válvula nativa)",
          type: "directed",
          scenario: "nve",
          targets: ["MRSA"],
          drug: "Vancomicina (alternativa: Daptomicina)",
          drugIds: ["vancomicina", "daptomicina"],
          dose: "Vancomicina 30–60 mg/kg/día (o Daptomicina 10 mg/kg/día)",
          route: "IV",
          interval: "Vancomicina 2–3 dosis; Daptomicina 1 dosis/día",
          duration: "4–6 semanas",
          comments:
            "Objetivo AUC/MIC 400–600. Monitorizar función renal; CPK semanal si daptomicina.",
          reference: "ESC 2023"
        },
        {
          name: "Dirigido: MRSA (prótesis valvular)",
          type: "directed",
          scenario: "pve",
          targets: ["MRSA"],
          drug: "Vancomicina + Rifampicina + Gentamicina",
          drugIds: ["vancomicina", "rifampicina", "gentamicina"],
          dose: "Vancomicina 30–60 mg/kg/día + Rifampicina 900–1200 mg/día + Gentamicina 3 mg/kg/día",
          route: "IV (rifampicina IV/VO; gentamicina IV/IM)",
          interval: "Vanco 2–3 dosis; Rifampicina 2–3 dosis; Gentamicina 1 dosis/día",
          duration: "Vancomicina + rifampicina ≥6 semanas; gentamicina 2 semanas",
          comments:
            "Considerar omitir gentamicina si alto riesgo renal. Rifampicina iniciar tras 3–5 días de tratamiento efectivo.",
          reference: "ESC 2023"
        },

        {
          name: "Dirigido: Enterococcus faecalis (primera elección)",
          type: "directed",
          scenario: "nve_or_pve",
          targets: ["E. faecalis"],
          drug: "Ampicilina (o Amoxicilina) + Ceftriaxona",
          drugIds: ["ampicilina", "amoxicilina", "ceftriaxona"],
          dose: "Ampicilina 12 g/día (o Amoxicilina 200 mg/kg/día) + Ceftriaxona 4 g/día",
          route: "IV (ceftriaxona IV/IM)",
          interval: "Ampicilina/Amoxicilina 4–6 dosis; Ceftriaxona 2 dosis",
          duration: "6 semanas",
          comments:
            "Preferido por menor nefrotoxicidad y eficacia incluso con HLAR.",
          reference: "ESC 2023"
        },

        {
          name: "Dirigido: HACEK",
          type: "directed",
          scenario: "nve_or_pve",
          targets: ["HACEK"],
          drug: "Ceftriaxona",
          drugIds: ["ceftriaxona"],
          dose: "Ceftriaxona 2 g/día",
          route: "IV/IM",
          interval: "1 dosis/día",
          duration: "4 semanas (NVE) o 6 semanas (PVE)",
          comments:
            "Primera elección. Alternativa en alergia: ciprofloxacino según susceptibilidad.",
          reference: "ESC 2023"
        }
      ],
      pathogens: [
        "Staphylococcus aureus (MSSA/MRSA)",
        "Staphylococcus coagulasa-negativo (CoNS)",
        "Streptococcus viridans",
        "Streptococcus gallolyticus (bovis)",
        "Enterococcus faecalis",
        "HACEK",
        "Bacilos gramnegativos (nosocomial/no-HACEK)",
        "Candida spp. (seleccionados)",
        "Coxiella burnetii / Bartonella / Brucella (cultivos negativos, seleccionados)"
      ]
    }
  ],

  pathogens: [
    {
      name: "Escherichia coli",
      abbreviations: ["E. coli"],
      first_line: "Nitrofurantoína, Fosfomicina, Ceftriaxona (grave)",
      alternatives: "TMP-SMX, Ciprofloxacino, Amoxicilina-Clavulánico",
      resistance: "Alta resistencia a Ampicilina. Incremento de ESBL (BLEE).",
    },
    {
      name: "Streptococcus pneumoniae",
      abbreviations: ["Neumococo"],
      first_line: "Amoxicilina (dosis alta), Ceftriaxona",
      alternatives: "Levofloxacino, Azitromicina (si baja resistencia local)",
      resistance: "Resistencia a penicilina variable; resistencia a macrólidos en aumento.",
    },
    {
      name: "Streptococcus pyogenes",
      abbreviations: ["GAS", "Estreptococo grupo A"],
      first_line: "Penicilina V, Amoxicilina",
      alternatives: "Clindamicina, Azitromicina, Cefalexina",
      resistance: "Sigue siendo universalmente sensible a Penicilina.",
    },
    {
      name: "Staphylococcus aureus (MSSA)",
      abbreviations: ["S. aureus", "MSSA"],
      first_line: "Cefazolina, Cefalexina, Cloxacilina",
      alternatives: "Clindamicina, TMP-SMX",
      resistance: "Sensible a meticilina.",
    },
    {
      name: "Staphylococcus aureus (MRSA)",
      abbreviations: ["MRSA", "SAMR"],
      first_line: "Vancomicina, Linezolid",
      alternatives: "TMP-SMX, Clindamicina (si D-test negativo), Daptomicina",
      resistance: "Resistente a beta-lactámicos (excepto ceftarolina).",
    },
    {
      name: "Pseudomonas aeruginosa",
      abbreviations: ["Pseudomonas"],
      first_line: "Piperacilina-Tazobactam, Cefepime, Ceftazidima",
      alternatives: "Meropenem, Ciprofloxacino, Amikacina",
      resistance: "Intrínsecamente resistente a muchos antibióticos.",
    }
  ],

  antibiotics: [
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
      synonyms: ["amoxicillin"]
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
      synonyms: ["amoxi clav", "amoxiclav"]
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
      synonyms: ["rocephin"]
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
      uses: "Celulitis no purulenta, cistitis seleccionada."
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
      uses: "Sepsis, urosepsis, pie diabético moderado/grave, intraabdominal grave."
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
      uses: "Sepsis grave, ESBL con riesgo Pseudomonas."
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
      uses: "Intraabdominal, EPI, anaerobios."
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
      uses: "NAC (alergia beta-lactámicos), infecciones seleccionadas."
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
      uses: "ITU seleccionada, alternativas según susceptibilidad."
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
      uses: "Cistitis no complicada."
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
      uses: "Cistitis no complicada."
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
      uses: "SSTI, EPI (alternativa), alergia a beta-lactámicos."
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
      uses: "SSTI con riesgo MRSA, alternativas ITU, cobertura Listeria (según caso)."
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
      uses: "Endocarditis (sinergia), sepsis seleccionada."
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
  ],

  interpretation: [
    {
      category: "Fundamentos y Categorías",
      items: [
        {
          title: "CIM (Concentración Inhibitoria Mínima)",
          description: "La concentración más baja de un antibiótico que impide el crecimiento visible de una bacteria in vitro.",
          clues: "Reportada en mg/L. Un valor bajo no siempre significa 'mejor' fármaco; debe compararse con el breakpoint."
        },
        {
          title: "S (Sensible, dosis estándar)",
          description: "Alta probabilidad de éxito terapéutico usando un régimen de dosificación estándar del fármaco.",
          clues: "Categorización habitual para fármacos de primera línea."
        },
        {
          title: "I (Susceptible, exposición aumentada)",
          description: "EUCAST: éxito probable si se aumenta exposición (dosis altas, infusión prolongada o mayor frecuencia).",
          clues: "No es 'intermedio'. Significa: úselo, pero optimizando exposición."
        },
        {
          title: "R (Resistente)",
          description: "Alta probabilidad de fracaso terapéutico incluso con dosis máximas.",
          clues: "No usar para tratamiento dirigido."
        },
        {
          title: "ATU (Área de Incertidumbre Técnica)",
          description: "Rango donde la interpretación es dudosa por variabilidad metodológica.",
          clues: "El laboratorio puede repetir o usar método de referencia."
        }
      ]
    },
    {
      category: "Fenotipos de Resistencia",
      items: [
        {
          title: "BLEE / ESBL",
          description: "Betalactamasas de espectro extendido. Inactivan penicilinas, cefalosporinas y aztreonam.",
          clues: "Sospechar si resistencia a ceftriaxona/cefotaxima. Tratamiento típico: carbapenémicos."
        },
        {
          title: "SAMR / MRSA",
          description: "S. aureus resistente a meticilina. Resistente a beta-lactámicos convencionales.",
          clues: "Marcador: resistencia a cefoxitina/oxacilina. Usar vancomicina/linezolid/daptomicina/ceftarolina según caso."
        },
        {
          title: "Carbapenemasas",
          description: "Enzimas (KPC, NDM, OXA, VIM) que degradan carbapenémicos.",
          clues: "Resistencia a ertapenem/meropenem. Requieren estrategias específicas y/o nuevos fármacos según disponibilidad."
        },
        {
          title: "VRE",
          description: "Enterococos resistentes a vancomicina.",
          clues: "Frecuente en E. faecium. Opciones: linezolid o daptomicina (según caso)."
        }
      ]
    },
    {
      category: "Pruebas Especiales",
      items: [
        {
          title: "D-Test (Clindamicina Inducible)",
          description: "Detecta resistencia inducible a clindamicina en presencia de eritromicina.",
          clues: "Si halo se 'achata' (forma de D), se interpreta resistente."
        },
        {
          title: "Sinergia de Doble Disco",
          description: "Prueba fenotípica para confirmar BLEE.",
          clues: "Se observa expansión del halo entre cefalosporina e inhibidor."
        },
        {
          title: "mCIM / Carba NP",
          description: "Pruebas rápidas para confirmar carbapenemasas.",
          clues: "Distinguen mecanismo en resistencia a carbapenémicos."
        }
      ]
    },
    {
      category: "Resistencias Intrínsecas (Naturales)",
      items: [
        {
          title: "Klebsiella pneumoniae",
          description: "Resistente natural a ampicilina.",
          clues: "No usar ampicilina sola."
        },
        {
          title: "Pseudomonas aeruginosa",
          description: "Resistente natural a ceftriaxona, cefotaxima, ertapenem y otros.",
          clues: "Usar antipseudomónicos adecuados (piptazo, cefepime/ceftazidima, meropenem, etc.)."
        },
        {
          title: "Enterobacter cloacae / Citrobacter",
          description: "Resistencias intrínsecas y riesgo AmpC.",
          clues: "Pueden desarrollar resistencia a 3ª gen durante tratamiento."
        },
        {
          title: "Stenotrophomonas maltophilia",
          description: "Resistente natural a muchos beta-lactámicos, incluidos carbapenémicos.",
          clues: "Opción habitual: TMP-SMX."
        },
        {
          title: "Proteus / Morganella",
          description: "Resistentes naturales a nitrofurantoína.",
          clues: "No usar nitrofurantoína para ITU por Proteus."
        }
      ]
    },
    {
      category: "Definiciones de Multirresistencia",
      items: [
        {
          title: "MDR (Multidrug Resistant)",
          description: "Resistente a ≥1 agente en ≥3 categorías de antibióticos.",
          clues: "Definición epidemiológica estándar."
        },
        {
          title: "XDR (Extensively Drug Resistant)",
          description: "Resistente a casi todas las categorías salvo 2 o menos.",
          clues: "Opciones terapéuticas muy limitadas."
        },
        {
          title: "PDR (Pandrug Resistant)",
          description: "Resistente a todos los agentes probados.",
          clues: "Situación crítica sin opciones estándar."
        }
      ]
    }
  ],
    meta: {
    appName: "AntibioGuide",
    version: "0.1.0",
    lastUpdated: "2026-02-25",
    scope: "Adultos. No incluye pediatría, embarazo ni lactancia.",
    disclaimer:
      "Uso educativo basado en guías internacionales. No reemplaza el juicio clínico.",
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = clinicalData;
}