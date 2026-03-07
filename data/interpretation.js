const interpretation = [
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
  ];

if (typeof module !== "undefined" && module.exports) {
  module.exports = interpretation;
}
else if (typeof window !== "undefined") {
  window.abg_interpretation = interpretation;
}
