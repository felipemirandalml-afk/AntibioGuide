/**
 * @fileoverview SYNDROMES DATA
 * 
 * ARCHITECTURAL CONTRACT (Clinical vs Presentation):
 * This file contains the root entities for clinical syndromes. To prevent structural drift 
 * and cleanly separate medical logic from UI rendering:
 * 
 * [CLINICAL CORE] (Used for algorithmic rules/validation - do not change meaning arbitrarily)
 * - id: string
 * - pathogenIds: string[]
 * - regimens.drugIds: string[]
 * - regimens.type: string (e.g. empiric)
 * - regimens.scenario: string 
 * 
 * [PRESENTATION & CONTEXT] (Used primarily for UI display - safe to rephrase)
 * - name, synonyms, description, criteria
 * - regimens.name, regimens.drug, regimens.dose, regimens.duration, regimens.durationInfo, regimens.comments
 */

const syndromes = [
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
        durationInfo: "Cursos cortos (≈3–5 días) no son inferiores en NAC estable con buena respuesta clínica; individualizar según evolución.",
        durationRefsShort: ["Uranga 2016 JAMA Intern Med", "PTC trial Lancet"],
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
        durationInfo: "Cursos cortos (≈3–5 días) no son inferiores en NAC estable con buena respuesta clínica; individualizar según evolución.",
        durationRefsShort: ["Uranga 2016 JAMA Intern Med", "PTC trial Lancet"],
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
        durationInfo: "Cursos cortos (≈3–5 días) no son inferiores en NAC estable con buena respuesta clínica; individualizar según evolución.",
        durationRefsShort: ["Uranga 2016 JAMA Intern Med", "PTC trial Lancet"],
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
        durationInfo: "Cursos cortos (≈3–5 días) no son inferiores en NAC estable con buena respuesta clínica; individualizar según evolución.",
        durationRefsShort: ["Uranga 2016 JAMA Intern Med", "PTC trial Lancet"],
        comments: "Fluoroquinolona respiratoria. Evitar si hay sospecha de tuberculosis.",
        reference: "IDSA/ATS 2019/2024",
      }
    ],
    pathogens: ["S. pneumoniae", "H. influenzae", "Mycoplasma pneumoniae", "Chlamydia pneumoniae"],
    pathogenIds: ["streptococcus_pneumoniae", "haemophilus_influenzae", "mycoplasma_pneumoniae", "chlamydia_pneumoniae"],
  },
  {
    id: "itu_cistitis",
    name: "ITU – Cistitis No Complicada",
    synonyms: ["ITU", "Cistitis", "Infección urinaria baja", "UTI"],
    description: "Infección urinaria baja en adulto no embarazado, sin factores de complicación.",
    criteria: {
      outpatient: "Paciente estable con síntomas urinarios bajos (disuria, urgencia, polaquiuria) sin fiebre ni compromiso sistémico.",
      hospital: "No indicado salvo deterioro clínico o sospecha de pielonefritis."
    },
    regimens: [
      {
        name: "Primera Línea",
        type: "empiric",
        scenario: "outpatient_uncomplicated",
        targets: ["E. coli"],
        drug: "Nitrofurantoína (macrocristales o monohidrato)",
        drugIds: ["nitrofurantoina"],
        dose: "100 mg",
        route: "PO",
        interval: "cada 12 horas",
        duration: "5 días",
        comments: "Evitar si ClCr <30 mL/min. No usar si sospecha de pielonefritis.",
        reference: "IDSA UTI guideline (2011) + updates; PROA/Chile (local)"
      },
      {
        name: "Primera Línea Alternativa",
        type: "empiric",
        scenario: "outpatient_uncomplicated",
        targets: ["E. coli"],
        drug: "Fosfomicina trometamol",
        drugIds: ["fosfomicina_trometamol"],
        dose: "3 g",
        route: "PO",
        interval: "dosis única",
        duration: "1 día",
        comments: "Útil en adherencia o alergia a otras opciones.",
        reference: "IDSA UTI guideline (2011) + updates; PROA/Chile (local)"
      },
      {
        name: "Primera Línea Condicional",
        type: "empiric",
        scenario: "outpatient_uncomplicated",
        targets: ["E. coli"],
        drug: "Trimetoprim-Sulfametoxazol",
        drugIds: ["tmp_smx"],
        dose: "160/800 mg",
        route: "PO",
        interval: "cada 12 horas",
        duration: "3 días",
        comments: "Usar solo si resistencia local de E. coli <20%.",
        reference: "IDSA UTI guideline (2011) + updates"
      },
      {
        name: "Alternativa",
        type: "alternative",
        scenario: "outpatient_uncomplicated",
        drug: "Cefadroxilo",
        drugIds: ["cefadroxilo"],
        dose: "500 mg",
        route: "PO",
        interval: "cada 12 horas",
        duration: "5 días",
        comments: "Alternativa si intolerancia a primera línea.",
        reference: "PROA ITU (deck infectología, local)"
      },
      {
        name: "Reserva",
        type: "alternative",
        scenario: "outpatient_uncomplicated",
        drug: "Ciprofloxacino",
        drugIds: ["ciprofloxacino"],
        dose: "250 mg",
        route: "PO",
        interval: "cada 12 horas",
        duration: "3 días",
        comments: "Evitar uso rutinario por impacto en resistencia antimicrobiana (PROA).",
        reference: "IDSA UTI guideline (2011) + updates"
      }
    ],
    pathogens: [
      "Escherichia coli",
      "Klebsiella spp.",
      "Proteus mirabilis",
      "Staphylococcus saprophyticus"
    ],
    pathogenIds: ["escherichia_coli", "klebsiella_pneumoniae", "proteus_mirabilis", "staphylococcus_saprophyticus"]
  },
  {
    id: "itu_pielonefritis",
    name: "ITU – Pielonefritis Aguda",
    synonyms: ["Pielonefritis", "ITU alta"],
    description: "Infección bacteriana del parénquima renal asociada a síntomas sistémicos.",
    criteria: {
      outpatient: "Paciente estable sin sepsis, tolera VO, sin comorbilidad grave.",
      hospital: "Sepsis, vómitos persistentes, embarazo, inmunosupresión o imposibilidad de VO."
    },
    regimens: [
      {
        name: "Ambulatorio Primera Línea",
        type: "empiric",
        scenario: "outpatient",
        drug: "Ciprofloxacino",
        drugIds: ["ciprofloxacino"],
        dose: "500 mg",
        route: "PO",
        interval: "cada 12 horas",
        duration: "7 días",
        comments: "Evitar si resistencia local >10%.",
        reference: "IDSA UTI guideline (2011) + updates"
      },
      {
        name: "Ambulatorio Alternativa",
        type: "empiric",
        scenario: "outpatient",
        drug: "Levofloxacino",
        drugIds: ["levofloxacino"],
        dose: "750 mg",
        route: "PO",
        interval: "cada 24 horas",
        duration: "5 días",
        durationInfo: "Esquema corto (5 días) aceptado en pacientes estables con buena evolución.",
        durationRefsShort: ["IDSA/EAU (UTI/Pyelo)"],
        comments: "Fluoroquinolona de alta penetración renal.",
        reference: "IDSA UTI guideline (2011) + updates"
      },
      {
        name: "Hospitalario Empírico",
        type: "empiric",
        scenario: "inpatient",
        drug: "Ceftriaxona",
        drugIds: ["ceftriaxona"],
        dose: "1-2 g",
        route: "EV",
        interval: "cada 24 horas",
        duration: "7 días si buena respuesta; extender si respuesta lenta o bacteriemia",
        durationInfo: "Duración total usual 7 días si buena respuesta; extender si respuesta lenta o bacteriemia. Considerar switch a VO si estable.",
        durationRefsShort: ["IDSA/EAU (UTI/Pyelo)", "PROA ITU (deck)"],
        comments: "Desescalar según cultivo. Considerar switch a VO si estable.",
        reference: "IDSA UTI guideline (2011) + updates; PROA ITU (deck infectología, local)"
      },
      {
        name: "Hospitalario Alternativa",
        type: "empiric",
        scenario: "inpatient",
        drug: "Piperacilina-Tazobactam",
        drugIds: ["piperacilina_tazobactam"],
        dose: "4.5 g",
        route: "EV",
        interval: "cada 6-8 horas",
        duration: "7-10 días",
        comments: "Considerar si riesgo de Pseudomonas.",
        reference: "IDSA UTI guideline (2011) + updates"
      }
    ],
    pathogens: [
      "Escherichia coli",
      "Klebsiella spp.",
      "Proteus mirabilis",
      "Enterobacter spp."
    ],
    pathogenIds: ["escherichia_coli", "klebsiella_pneumoniae", "proteus_mirabilis", "enterobacter_spp"]
  },
  {
    id: "itu_complicada",
    name: "ITU – Complicada",
    synonyms: ["ITU complicada"],
    description: "ITU en presencia de factores predisponentes como obstrucción urinaria, diabetes, inmunosupresión o anomalías anatómicas.",
    criteria: {
      outpatient: "Solo si estabilidad clínica y sin sepsis.",
      hospital: "Sepsis, riesgo de patógeno resistente o imposibilidad de manejo ambulatorio."
    },
    regimens: [
      {
        name: "Empírico Hospitalario",
        type: "empiric",
        scenario: "inpatient",
        drug: "Ceftriaxona",
        drugIds: ["ceftriaxona"],
        dose: "1-2 g",
        route: "EV",
        interval: "cada 24 horas",
        duration: "7 días en la mayoría; extender si respuesta lenta o foco no controlado",
        durationInfo: "En la mayoría: 7 días con buena respuesta y foco controlado; prolongar si mala respuesta o foco no resuelto.",
        durationRefsShort: ["IDSA cUTI", "PROA ITU (deck)"],
        comments: "Desescalar según antibiograma.",
        reference: "IDSA UTI guideline (2011) + updates"
      },
      {
        name: "Alternativa Amplio Espectro",
        type: "empiric",
        scenario: "inpatient",
        drug: "Piperacilina-Tazobactam",
        drugIds: ["piperacilina_tazobactam"],
        dose: "4.5 g",
        route: "EV",
        interval: "cada 6-8 horas",
        duration: "7 días en la mayoría; extender si respuesta lenta o foco no controlado",
        durationInfo: "En la mayoría: 7 días con buena respuesta y foco controlado; prolongar si mala respuesta o foco no resuelto.",
        durationRefsShort: ["IDSA cUTI", "PROA ITU (deck)"],
        comments: "Considerar en sospecha de patógenos resistentes o Pseudomonas.",
        reference: "IDSA UTI guideline (2011) + updates"
      }
    ],
    pathogens: [
      "Escherichia coli",
      "Klebsiella spp.",
      "Proteus mirabilis",
      "Enterobacter spp.",
      "Pseudomonas aeruginosa",
      "Enterococcus spp."
    ],
    pathogenIds: ["escherichia_coli", "klebsiella_pneumoniae", "proteus_mirabilis", "enterobacter_spp", "pseudomonas_aeruginosa", "enterococcus_spp"]
  },
  {
    id: "itu_cauti",
    name: "ITU – Asociada a Catéter (CAUTI)",
    synonyms: ["CAUTI", "ITU catéter"],
    description: "Infección urinaria en paciente portador de catéter urinario actual o reciente.",
    criteria: {
      outpatient: "Paciente estable sin sepsis.",
      hospital: "Sepsis, deterioro clínico o comorbilidad significativa."
    },
    regimens: [
      {
        name: "Empírico Hospitalario",
        type: "empiric",
        scenario: "inpatient",
        drug: "Ceftriaxona",
        drugIds: ["ceftriaxona"],
        dose: "1-2 g",
        route: "EV",
        interval: "cada 24 horas",
        duration: "7 días (10-14 si respuesta lenta)",
        durationInfo: "CAUTI/CUP: 5–7 días si buena respuesta; considerar más si respuesta lenta. Cambiar/retirar catéter siempre que sea posible. No tratar bacteriuria asintomática.",
        durationRefsShort: ["IDSA CAUTI", "PROA ITU (deck)"],
        comments: "No tratar bacteriuria asintomática. Cambiar o retirar catéter antes de iniciar antibióticos si es posible.",
        reference: "IDSA UTI guideline (2011) + updates"
      },
      {
        name: "Riesgo de Pseudomonas",
        type: "empiric",
        scenario: "inpatient",
        drug: "Piperacilina-Tazobactam",
        drugIds: ["piperacilina_tazobactam"],
        dose: "4.5 g",
        route: "EV",
        interval: "cada 6-8 horas",
        duration: "7-14 días",
        comments: "Considerar en hospitalización prolongada o antibióticos previos.",
        reference: "IDSA UTI guideline (2011) + updates"
      }
    ],
    pathogens: [
      "Escherichia coli",
      "Klebsiella spp.",
      "Proteus mirabilis",
      "Pseudomonas aeruginosa",
      "Enterococcus spp."
    ],
    pathogenIds: ["escherichia_coli", "klebsiella_pneumoniae", "proteus_mirabilis", "pseudomonas_aeruginosa", "enterococcus_spp"]
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
        durationInfo: "En infecciones cutáneas no complicadas con buena evolución, 5–7 días puede ser suficiente.",
        durationRefsShort: ["Cranendonk 2020 CMI"],
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
        durationInfo: "En infecciones cutáneas no complicadas con buena evolución, 5–7 días puede ser suficiente.",
        durationRefsShort: ["Cranendonk 2020 CMI"],
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
        durationInfo: "En infecciones cutáneas no complicadas con buena evolución, 5–7 días puede ser suficiente.",
        durationRefsShort: ["Cranendonk 2020 CMI"],
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
        durationInfo: "En infecciones cutáneas no complicadas con buena evolución, 5–7 días puede ser suficiente.",
        durationRefsShort: ["Cranendonk 2020 CMI"],
        comments: "Riesgo de infección por C. difficile.",
        reference: "IDSA SSTI 2014 / 2024",
      }
    ],
    pathogens: ["Streptococcus pyogenes", "Staphylococcus aureus", "MRSA"],
    pathogenIds: ["streptococcus_pyogenes", "staphylococcus_aureus", "methicillin_resistant_staphylococcus_aureus"],
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
    pathogenIds: ["neisseria_gonorrhoeae", "chlamydia_trachomatis", "anaerobes", "mycoplasma_genitalium"],
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
    pathogenIds: ["streptococcus_pneumoniae", "neisseria_meningitidis", "listeria_monocytogenes", "haemophilus_influenzae"],
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
    pathogenIds: ["staphylococcus_aureus", "streptococcus_spp", "enterobacterales", "anaerobes"],
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
        durationInfo: "Tras adecuado control de foco, cursos cortos son efectivos en infecciones intraabdominales.",
        durationRefsShort: ["STOP-IT 2015 NEJM"],
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
        durationInfo: "Tras adecuado control de foco, cursos cortos son efectivos en infecciones intraabdominales.",
        durationRefsShort: ["STOP-IT 2015 NEJM"],
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
        durationInfo: "Tras adecuado control de foco, cursos cortos son efectivos en infecciones intraabdominales.",
        durationRefsShort: ["STOP-IT 2015 NEJM"],
        comments: "Alternativa para alérgicos graves.",
        reference: "IDSA 2010 / 2024",
      }
    ],
    pathogens: ["E. coli", "Bacteroides fragilis", "Klebsiella spp.", "Enterococcus spp."],
    pathogenIds: ["escherichia_coli", "bacteroides_fragilis", "klebsiella_pneumoniae", "enterococcus_spp"],
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
        drugIds: ["bencilpenicilina_benzatina"],
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
    pathogenIds: ["streptococcus_pyogenes"],
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
    pathogenIds: ["escherichia_coli", "klebsiella_pneumoniae", "pseudomonas_aeruginosa", "enterococcus_spp"],
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
        durationInfo: "En casos seleccionados y estables, transición parcial a VO ha mostrado no inferioridad.",
        durationRefsShort: ["POET 2019 NEJM"],
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
        durationInfo: "En casos seleccionados y estables, transición parcial a VO ha mostrado no inferioridad.",
        durationRefsShort: ["POET 2019 NEJM"],
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
        drugIds: ["bencilpenicilina_sodica", "amoxicilina", "ceftriaxona"],
        dose: "Penicilina G 12–18 millones UI/día (o Amoxicilina 100–200 mg/kg/día; o Ceftriaxona 2 g/día)",
        route: "IV (ceftriaxona IV/IM)",
        interval: "Penicilina 4 dosis o infusión continua; Amoxicilina 4–6 dosis; Ceftriaxona 1 dosis/día",
        duration: "4 semanas",
        durationInfo: "En casos seleccionados y estables, transición parcial a VO ha mostrado no inferioridad.",
        durationRefsShort: ["POET 2019 NEJM"],
        comments: "Alternativa útil para OPAT: ceftriaxona 1 vez/día (seleccionados).",
        reference: "ESC 2023"
      },
      {
        name: "Dirigido: Streptococcus viridans sensible (NVE corto, seleccionados)",
        type: "directed",
        scenario: "nve_selected_short_course",
        targets: ["viridans"],
        drug: "Penicilina G / Amoxicilina / Ceftriaxona + Gentamicina",
        drugIds: ["bencilpenicilina_sodica", "amoxicilina", "ceftriaxona", "gentamicina"],
        dose: "Penicilina G 12–18 millones UI/día (o Amoxicilina 100–200 mg/kg/día; o Ceftriaxona 2 g/día) + Gentamicina 3 mg/kg/día",
        route: "IV (ceftriaxona IV/IM; gentamicina IV/IM)",
        interval: "β-lactámico según esquema + Gentamicina 1 dosis/día",
        duration: "2 semanas",
        durationInfo: "En casos seleccionados y estables, transición parcial a VO ha mostrado no inferioridad.",
        durationRefsShort: ["POET 2019 NEJM"],
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
        drugIds: ["bencilpenicilina_sodica", "amoxicilina", "ceftriaxona"],
        dose: "Penicilina G 12–18 millones UI/día (o Amoxicilina 100–200 mg/kg/día; o Ceftriaxona 2 g/día)",
        route: "IV (ceftriaxona IV/IM)",
        interval: "Penicilina 4 dosis; Amoxicilina 4–6 dosis; Ceftriaxona 1 dosis/día",
        duration: "6 semanas",
        durationInfo: "En casos seleccionados y estables, transición parcial a VO ha mostrado no inferioridad.",
        durationRefsShort: ["POET 2019 NEJM"],
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
        durationInfo: "En casos seleccionados y estables, transición parcial a VO ha mostrado no inferioridad.",
        durationRefsShort: ["POET 2019 NEJM"],
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
        durationInfo: "En casos seleccionados y estables, transición parcial a VO ha mostrado no inferioridad.",
        durationRefsShort: ["POET 2019 NEJM"],
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
        durationInfo: "En casos seleccionados y estables, transición parcial a VO ha mostrado no inferioridad.",
        durationRefsShort: ["POET 2019 NEJM"],
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
        durationInfo: "En casos seleccionados y estables, transición parcial a VO ha mostrado no inferioridad.",
        durationRefsShort: ["POET 2019 NEJM"],
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
        durationInfo: "En casos seleccionados y estables, transición parcial a VO ha mostrado no inferioridad.",
        durationRefsShort: ["POET 2019 NEJM"],
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
        durationInfo: "En casos seleccionados y estables, transición parcial a VO ha mostrado no inferioridad.",
        durationRefsShort: ["POET 2019 NEJM"],
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
    ],
    pathogenIds: [
      "staphylococcus_aureus",
      "staphylococcus_cons",
      "streptococcus_viridans_group",
      "streptococcus_gallolyticus",
      "enterococcus_faecalis",
      "hacek_group",
      "gram_negative_bacilli_non_hacek",
      "candida_spp",
      "coxiella_burnetii", "bartonella_henselae", "brucella_spp"
    ]
  },
  {
    id: "nih",
    name: "Neumonía Intrahospitalaria (NIH)",
    synonyms: ["Hospital-Acquired Pneumonia", "HAP", "Nosocomial Pneumonia"],
    description: "Neumonía que ocurre ≥48 horas después del ingreso hospitalario, no estando incubada al momento de la admisión. Incluye neumonía asociada a ventilación mecánica (NAV) cuando aparece ≥48-72 horas tras intubación endotraqueal.",
    criteria: {
      outpatient: "No aplicable.",
      hospital: "Infiltrado pulmonar nuevo o progresivo en imagen torácica + ≥2 de los siguientes: fiebre >38°C o hipotermia <36°C; leucocitosis >10.000/mm³ o leucopenia <4.000/mm³; secreciones purulentas; deterioro del intercambio gaseoso."
    },
    regimens: [
      {
        name: "NIH bajo riesgo MDR",
        type: "empiric",
        scenario: "inpatient_non_icu_low_risk",
        targets: ["SASM", "Enterobacterales sensibles", "H. influenzae"],
        drug: "Piperacilina-Tazobactam",
        drugIds: ["piperacilina_tazobactam"],
        dose: "4.5 g",
        route: "IV",
        interval: "cada 6h (o infusión extendida)",
        duration: "7 días",
        comments: "Desescalar según cultivos. Optimizar T>MIC con infusión extendida.",
        reference: "IDSA/ATS HAP/VAP 2016"
      },
      {
        name: "NIH alto riesgo MDR",
        type: "empiric",
        scenario: "inpatient_non_icu_high_risk",
        targets: ["Pseudomonas aeruginosa", "Enterobacterales BLEE"],
        drug: "Cefepime",
        drugIds: ["cefepime"],
        dose: "2 g",
        route: "IV",
        interval: "cada 8h",
        duration: "7 días",
        comments: "Considerar agregar cobertura MRSA según prevalencia local.",
        reference: "IDSA/ATS HAP/VAP 2016"
      },
      {
        name: "Cobertura MRSA",
        type: "empiric",
        scenario: "inpatient_non_icu_high_risk",
        targets: ["MRSA"],
        drug: "Vancomicina o Linezolid",
        drugIds: ["vancomicina", "linezolid"],
        dose: "Vanco 15-20 mg/kg / Linezolid 600 mg",
        route: "IV",
        interval: "cada 8-12h (Vanco) / cada 12h (Linezolid)",
        duration: "7 días",
        comments: "Preferir linezolid en NAV confirmada por mejor penetración pulmonar.",
        reference: "IDSA/ATS HAP/VAP 2016"
      }
    ],
    pathogens: [
      "Staphylococcus aureus",
      "MRSA",
      "Pseudomonas aeruginosa",
      "Klebsiella pneumoniae",
      "Escherichia coli",
      "Acinetobacter baumannii"
    ],
    pathogenIds: [
      "staphylococcus_aureus",
      "methicillin_resistant_staphylococcus_aureus",
      "pseudomonas_aeruginosa",
      "klebsiella_pneumoniae",
      "escherichia_coli",
      "acinetobacter_baumannii"
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = syndromes;
}
else if (typeof window !== "undefined") {
  window.abg_syndromes = syndromes;
}
