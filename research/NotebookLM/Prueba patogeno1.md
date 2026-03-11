[
  {
    "id": "salmonella_no_tifoidea",
    "name": "Salmonella enterica (no tifoidea)",
    "shortName": "Salmonella spp.",
    "aliases": ["Salmonella enteritidis", "Salmonella typhimurium"],
    "taxonomy": {
      "gram": "negative",
      "morphology": "bacilo",
      "group": "Enterobacteriaceae"
    },
    "clinical": {
      "summary": "Causa frecuente de gastroenteritis aguda transmitida por alimentos; riesgo de bacteriemia en extremos de edad e inmunocomprometidos.",
      "usualSyndromes": ["gastroenteritis_aguda", "bacteriemia", "infeccion_endovascular"],
      "context": "Comunitario",
      "pearls": [
        "En adultos inmunocompetentes con gastroenteritis, el tratamiento antibiótico no acorta el cuadro y prolonga la excreción fecal (estado de portador).",
        "Alta sospecha de aortitis o siembra endovascular en pacientes mayores de 50 años con bacteriemia.",
        "Se asocia clásicamente al consumo de huevos crudos, mayonesa casera y carnes de ave mal cocidas."
      ]
    },
    "resistance": {
      "intrinsic": ["penicilina_g", "macrolidos_clasicos"],
      "typicalAcquired": ["ampicilina", "cotrimoxazol", "ciprofloxacino (resistencia creciente en Chile)"],
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
    "aliases": ["Shigella sonnei", "Shigella flexneri"],
    "taxonomy": {
      "gram": "negative",
      "morphology": "bacilo",
      "group": "Enterobacteriaceae"
    },
    "clinical": {
      "summary": "Agente clásico de la disentería bacilar, altamente contagioso debido a su bajísimo inóculo infectante (10-100 bacterias).",
      "usualSyndromes": ["diarrea_disenterica", "gastroenteritis_aguda"],
      "context": "Comunitario",
      "pearls": [
        "Causa diarrea inflamatoria con fiebre alta, pujo, tenesmo y deposiciones con sangre/mucus.",
        "Puede desencadenar Síndrome Hemolítico Urémico (SHU), especialmente S. dysenteriae tipo 1 (productora de toxina Shiga).",
        "Brote constante en guarderías y transmisión fecal-oral estrecha."
      ]
    },
    "resistance": {
      "intrinsic": ["penicilina_g"],
      "typicalAcquired": ["ampicilina", "cotrimoxazol", "ciprofloxacino"],
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
    "aliases": ["Bacilo de Welch"],
    "taxonomy": {
      "gram": "positive",
      "morphology": "bacilo esporulado grueso",
      "group": "Clostridiaceae"
    },
    "clinical": {
      "summary": "Agente causal de la gangrena gaseosa (mionecrosis) y toxiinfecciones alimentarias autolimitadas.",
      "usualSyndromes": ["infeccion_necrotizante_tejidos_blandos", "mionecrosis", "intoxicacion_alimentaria"],
      "context": "Comunitario / Trauma",
      "pearls": [
        "En mionecrosis, el dolor desproporcionado al examen físico es el signo clínico cardinal.",
        "Produce la toxina alfa (lecitinasa), responsable de la necrosis tisular profunda, hemólisis intravascular severa y shock.",
        "El diagnóstico de la gangrena es inminentemente clínico; no retrasar la cirugía por esperar imágenes o cultivos."
      ]
    },
    "resistance": {
      "intrinsic": ["aminoglucosidos", "aztreonam"],
      "typicalAcquired": ["clindamicina (infrecuente pero descrita)"],
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
    "aliases": ["Actinomyces israelii"],
    "taxonomy": {
      "gram": "positive",
      "morphology": "bacilo filamentoso ramificado",
      "group": "Actinomycetaceae"
    },
    "clinical": {
      "summary": "Bacteria anaerobia/microaerófila de la flora oral y gastrointestinal normal, causante de infecciones granulomatosas crónicas.",
      "usualSyndromes": ["infeccion_cervicofacial", "enfermedad_pelvica_inflamatoria", "absceso_pulmonar"],
      "context": "Comunitario",
      "pearls": [
        "Típicamente ignora los planos tisulares y forma trayectos fistulosos crónicos que drenan material purulento con 'gránulos de azufre'.",
        "La presentación cervicofacial (lumpy jaw) suele seguir a una extracción dental o trauma maxilofacial.",
        "Fuerte asociación con enfermedad pélvica inflamatoria en usuarias de DIU (Dispositivo Intrauterino) de larga data."
      ]
    },
    "resistance": {
      "intrinsic": ["metronidazol", "aminoglucosidos"],
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
    "aliases": ["Nocardia asteroides", "Nocardia farcinica"],
    "taxonomy": {
      "gram": "positive",
      "morphology": "bacilo filamentoso ramificado (BAAR débil)",
      "group": "Nocardiaceae"
    },
    "clinical": {
      "summary": "Patógeno oportunista ambiental que afecta primariamente a pacientes con inmunidad celular comprometida (trasplantados, uso crónico de corticoides).",
      "usualSyndromes": ["neumonia_cavitada", "absceso_cerebral", "infeccion_cutanea_primaria"],
      "context": "Comunitario / Oportunista",
      "pearls": [
        "Sospechar ante todo paciente inmunocomprometido con nódulos pulmonares cavitados que desarrolla clínica neurológica focal (tropismo por el SNC).",
        "A diferencia de Actinomyces, Nocardia es estrictamente aerobia y ácido-alcohol resistente (BAAR) parcial/débil (se tiñe con Ziehl-Neelsen modificado o Kinyoun).",
        "En inmunocompetentes puede causar enfermedad cutánea primaria (micetoma) tras inoculación traumática."
      ]
    },
    "resistance": {
      "intrinsic": ["penicilina_g", "macrolidos (depende de la especie)"],
      "typicalAcquired": ["ceftriaxona", "imipenem (especie-dependiente)"],
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
    "aliases": ["Fiebre Q"],
    "taxonomy": {
      "gram": "atypical",
      "morphology": "pleomórfico intracelular obligado",
      "group": "Coxiellaceae"
    },
    "clinical": {
      "summary": "Agente de la Fiebre Q, zoonosis altamente infectante transmitida principalmente por aerosoles de ganado ovino/caprino/bovino.",
      "usualSyndromes": ["sindrome_febril_agudo", "neumonia_atipica", "hepatitis_granulomatosa", "endocarditis_cultivo_negativo"],
      "context": "Zoonosis",
      "pearls": [
        "Clásica tríada aguda: fiebre alta, neumonía atípica y hepatitis granulomatosa con elevación de transaminasas.",
        "Forma crónica principal: endocarditis con hemocultivos negativos, a menudo en pacientes con valvulopatía previa, meses o años tras la primoinfección.",
        "No causa exantema cutáneo, lo que la diferencia de las rickettsiosis clásicas."
      ]
    },
    "resistance": {
      "intrinsic": ["betalactamicos", "aminoglucosidos"],
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
    "aliases": ["Brucella melitensis", "Brucella abortus", "Fiebre de Malta"],
    "taxonomy": {
      "gram": "negative",
      "morphology": "cocobacilo intracelular facultativo",
      "group": "Brucellaceae"
    },
    "clinical": {
      "summary": "Zoonosis que causa enfermedad febril sistémica (fiebre ondulante) con fuerte tropismo osteoarticular y hepatoesplénico.",
      "usualSyndromes": ["sindrome_febril_prolongado", "osteoartritis", "espondilodiscitis"],
      "context": "Zoonosis",
      "pearls": [
        "El antecedente epidemiológico clásico es el consumo de quesos frescos o leche no pasteurizada, o riesgo ocupacional (veterinarios, mataderos).",
        "La complicación focal más frecuente es la osteoarticular (sacroiliitis y espondilodiscitis lumbar).",
        "Los hemocultivos pueden requerir incubación prolongada (hasta 21 días) si no se usan sistemas automatizados modernos, y el laboratorio debe ser avisado por riesgo de infección del personal."
      ]
    },
    "resistance": {
      "intrinsic": ["cefalosporinas_primera_generacion", "penicilina_g"],
      "typicalAcquired": [],
      "stewardshipNote": "La monoterapia está proscrita por altas tasas de recaída. Esquemas estándar: Doxiciclina + Rifampicina (OMS) por 6 semanas, o Doxiciclina + Gentamicina/Estreptomicina. En neurobrucelosis o endocarditis se prefiere terapia triple."
    },
    "appMeta": {
      "relevance": "alta",
      "status": "active"
    }
  }
]