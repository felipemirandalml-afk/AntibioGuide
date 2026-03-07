const resistanceProfiles = {
    general: {
      id: "general",
      label: "General (sin datos locales)",
      scope: { country: "CL" },
      updated: null,
      data: {},
      modifiers: []
    },
    cl_rm_2026: {
      id: "cl_rm_2026",
      label: "Santiago/RM – Perfil regional (2026)",
      scope: { country: "CL", region: "RM" },
      updated: "2026-01-15",
      data: {
        escherichia_coli: { ciprofloxacino: { r_pct: 32 } },
        streptococcus_pneumoniae: { azitromicina: { r_pct: 28 } }
      },
      modifiers: [
        {
          id: "itu_cistitis_fq_warning",
          action: "show_warning",
          syndrome_id: "itu_cistitis",
          match: { pathogen_id: "escherichia_coli", antibiotic_id: "ciprofloxacino" },
          threshold_r_pct: 20,
          message: "Resistencia local elevada a fluoroquinolonas en E. coli: evitar uso empírico si es posible."
        },
        {
          id: "itu_pielonefritis_fq_warning_cipro",
          action: "show_warning",
          syndrome_id: "itu_pielonefritis",
          match: { pathogen_id: "escherichia_coli", antibiotic_id: "ciprofloxacino" },
          threshold_r_pct: 10,
          message: "Resistencia local elevada a fluoroquinolonas en E. coli: evitar uso empírico si es posible."
        },
        {
          id: "itu_pielonefritis_fq_warning_levo",
          action: "show_warning",
          syndrome_id: "itu_pielonefritis",
          match: { pathogen_id: "escherichia_coli", antibiotic_id: "levofloxacino" },
          threshold_r_pct: 10,
          message: "Resistencia local elevada a fluoroquinolonas en E. coli: evitar uso empírico si es posible."
        },
        {
          id: "nac_macrolide_warning",
          action: "show_warning",
          syndrome_id: "nac",
          match: { pathogen_id: "streptococcus_pneumoniae", antibiotic_id: "azitromicina" },
          threshold_r_pct: 25,
          message: "Resistencia local elevada a macrólidos en neumococo: evitar monoterapia con macrólidos."
        }
      ]
    },
    hra_hosp_adulto_2024: {
      id: "hra_hosp_adulto_2024",
      label: "Antofagasta – HRA – Hosp. adultos (2024)",
      region: "Antofagasta",
      hospital: "HRA",
      year: 2024,
      source: "PROA HRA – Cartilla susceptibilidad hospitalizados adulto 2024",
      data: {
        staphylococcus_aureus: {
          cloxacilina: { s_pct: 62 },
          vancomicina: { s_pct: 100 },
          tmp_smx: { s_pct: 99 },
          ciprofloxacino: { s_pct: 89 }
        },
        // ID nuevo pendiente de decidir para clinicalData.pathogens
        staphylococcus_sp: {
          cloxacilina: { s_pct: 36 },
          vancomicina: { s_pct: 100 },
          tmp_smx: { s_pct: 60 },
          ciprofloxacino: { s_pct: 48 }
        },
        enterococcus_faecalis: {
          ampicilina: { s_pct: 99 },
          vancomicina: { s_pct: 93 }
        },
        enterococcus_faecium: {
          ampicilina: { s_pct: 28 },
          vancomicina: { s_pct: 29 },
          linezolid: { s_pct: 100 }
        },
        pseudomonas_aeruginosa: {
          ceftazidima: { s_pct: 72 },
          cefepime: { s_pct: 71 },
          piperacilina_tazobactam: { s_pct: 75 },
          imipenem: { s_pct: 54 },
          meropenem: { s_pct: 70 },
          amikacina: { s_pct: 88 },
          ciprofloxacino: { s_pct: 72 },
          levofloxacino: { s_pct: 72 },
          tmp_smx: { ri: true }
        },
        // ID nuevo pendiente de decidir para clinicalData.pathogens
        stenotrophomonas_maltophilia: {
          ceftazidima: { s_pct: 27 },
          levofloxacino: { s_pct: 91 },
          tmp_smx: { s_pct: 91 }
        },
        escherichia_coli: {
          sterile: {
            ceftriaxona: { s_pct: 73 },
            piperacilina_tazobactam: { s_pct: 94 },
            ertapenem: { s_pct: 98 },
            imipenem: { s_pct: 98 },
            meropenem: { s_pct: 100 },
            amikacina: { s_pct: 98 },
            ciprofloxacino: { s_pct: 58 },
            tmp_smx: { s_pct: 67 },
            blee_pct: 25
          },
          urine: {
            ceftriaxona: { s_pct: 70 },
            amoxicilina_clavulanico: { s_pct: 88 },
            piperacilina_tazobactam: { s_pct: 97 },
            ertapenem: { s_pct: 94 },
            imipenem: { s_pct: 98 },
            meropenem: { s_pct: 98 },
            amikacina: { s_pct: 99 },
            ciprofloxacino: { s_pct: 49 },
            tmp_smx: { s_pct: 54 },
            blee_pct: 26
          },
          resp: {
            ceftriaxona: { s_pct: 70 },
            piperacilina_tazobactam: { s_pct: 96 },
            ertapenem: { s_pct: 98 },
            imipenem: { s_pct: 95 },
            meropenem: { s_pct: 100 },
            amikacina: { s_pct: 98 },
            ciprofloxacino: { s_pct: 60 },
            tmp_smx: { s_pct: 61 },
            blee_pct: 26
          }
        },
        klebsiella_pneumoniae: {
          piperacilina_tazobactam: { s_pct: 37 },
          ceftriaxona: { s_pct: 31 },
          ertapenem: { s_pct: 56 },
          imipenem: { s_pct: 69 },
          meropenem: { s_pct: 67 },
          amikacina: { s_pct: 66 },
          ciprofloxacino: { s_pct: 40 },
          blee_pct: 60
        },
        // ID nuevo pendiente de decidir para clinicalData.pathogens
        klebsiella_oxytoca: {
          piperacilina_tazobactam: { s_pct: 76 },
          ceftriaxona: { s_pct: 71 },
          ertapenem: { s_pct: 82 },
          imipenem: { s_pct: 82 },
          meropenem: { s_pct: 86 },
          amikacina: { s_pct: 89 },
          ciprofloxacino: { s_pct: 68 },
          blee_pct: 16
        },
        // ID nuevo pendiente de decidir para clinicalData.pathogens
        enterobacter_cloacae_complex: {
          piperacilina_tazobactam: { s_pct: 57 },
          ceftriaxona: { s_pct: 44 },
          ertapenem: { s_pct: 64 },
          imipenem: { s_pct: 92 },
          meropenem: { s_pct: 92 },
          amikacina: { s_pct: 95 },
          ciprofloxacino: { s_pct: 60 }
        },
        // ID nuevo pendiente de decidir para clinicalData.pathogens
        citrobacter_freundii: {
          piperacilina_tazobactam: { s_pct: 76 },
          ceftriaxona: { s_pct: 60 },
          ertapenem: { s_pct: 90 },
          imipenem: { s_pct: 86 },
          meropenem: { s_pct: 90 },
          amikacina: { s_pct: 95 },
          ciprofloxacino: { s_pct: 71 }
        },
        serratia_marcescens: {
          piperacilina_tazobactam: { s_pct: 71 },
          ceftriaxona: { s_pct: 43 },
          ertapenem: { s_pct: 100 },
          imipenem: { s_pct: 71 },
          meropenem: { s_pct: 100 },
          amikacina: { s_pct: 88 },
          ciprofloxacino: { s_pct: 63 }
        },
        proteus_mirabilis: {
          piperacilina_tazobactam: { s_pct: 97 },
          ceftriaxona: { s_pct: 66 },
          ertapenem: { s_pct: 91 },
          meropenem: { s_pct: 94 },
          amikacina: { s_pct: 75 },
          ciprofloxacino: { s_pct: 59 }
        },
        // ID nuevo pendiente de decidir para clinicalData.pathogens
        morganella_morganii: {
          piperacilina_tazobactam: { s_pct: 90 },
          ceftriaxona: { s_pct: 69 },
          ertapenem: { s_pct: 86 },
          imipenem: { s_pct: 7 },
          meropenem: { s_pct: 93 },
          amikacina: { s_pct: 96 },
          ciprofloxacino: { s_pct: 55 }
        }
      },
      modifiers: []
    },
    cl_ii_hra_upc_2024: {
      id: "cl_ii_hra_upc_2024",
      label: "Antofagasta – HRA – UPC adulto (2024)",
      year: 2024,
      unit: "UPC adulto",
      threshold_s_pct: 75,
      source: "PROA HRA – Cartilla susceptibilidad UPC adulto 2024",
      data: {
        escherichia_coli: {
          sterile: {
            ceftriaxona: { s_pct: 67 },
            piperacilina_tazobactam: { s_pct: 74 },
            ertapenem: { s_pct: 93 },
            imipenem: { s_pct: 88 },
            meropenem: { s_pct: 93 },
            amikacina: { s_pct: 88 },
            ciprofloxacino: { s_pct: 44 },
            tmp_smx: { s_pct: 30 },
            blee_pct: 30
          },
          urine: {
            ceftriaxona: { s_pct: 67 },
            amoxicilina_clavulanico: { s_pct: 83 },
            piperacilina_tazobactam: { s_pct: 95 },
            ertapenem: { s_pct: 94 },
            imipenem: { s_pct: 98 },
            meropenem: { s_pct: 98 },
            amikacina: { s_pct: 98 },
            ciprofloxacino: { s_pct: 50 },
            tmp_smx: { s_pct: 52 },
            blee_pct: 28
          },
          resp: {
            ceftriaxona: { s_pct: 50 },
            piperacilina_tazobactam: { s_pct: 78 },
            ertapenem: { s_pct: 87 },
            imipenem: { s_pct: 91 },
            meropenem: { s_pct: 91 },
            amikacina: { s_pct: 100 },
            ciprofloxacino: { s_pct: 43 },
            tmp_smx: { s_pct: 52 },
            blee_pct: 48
          }
        },
        pseudomonas_aeruginosa: {
          ceftazidima: { s_pct: 61 },
          cefepime: { s_pct: 70 },
          piperacilina_tazobactam: { s_pct: 66 },
          imipenem: { s_pct: 40 },
          meropenem: { s_pct: 65 },
          amikacina: { s_pct: 91 },
          ciprofloxacino: { s_pct: 83 },
          levofloxacino: { s_pct: 78 },
          tmp_smx: { ri: true }
        },
        // TODO: add to pathogens catalog if/when needed
        stenotrophomonas_maltophilia: {
          ceftazidima: { s_pct: 15 },
          levofloxacino: { s_pct: 38 },
          tmp_smx: { s_pct: 100 }
        },
        staphylococcus_aureus: {
          cloxacilina: { s_pct: 76 },
          vancomicina: { s_pct: 100 },
          tmp_smx: { s_pct: 92 },
          ciprofloxacino: { s_pct: 93 }
        },
        // TODO: add to pathogens catalog if/when needed
        staphylococcus_sp: {
          cloxacilina: { s_pct: 21 },
          vancomicina: { s_pct: 100 },
          tmp_smx: { s_pct: 48 },
          ciprofloxacino: { s_pct: 34 }
        },
        // TODO: add to pathogens catalog if/when needed
        enterococcus_faecalis: {
          ampicilina: { s_pct: 98 },
          vancomicina: { s_pct: 92 }
        },
        // TODO: add to pathogens catalog if/when needed
        enterococcus_faecium: {
          ampicilina: { s_pct: 18 },
          vancomicina: { s_pct: 13 },
          linezolid: { s_pct: 100 }
        },
        // TODO: add to pathogens catalog if/when needed
        klebsiella_pneumoniae: {
          piperacilina_tazobactam: { s_pct: 54 },
          ceftriaxona: { s_pct: 38 },
          ertapenem: { s_pct: 58 },
          imipenem: { s_pct: 84 },
          meropenem: { s_pct: 87 },
          amikacina: { s_pct: 89 },
          ciprofloxacino: { s_pct: 64 }
        },
        // TODO: add to pathogens catalog if/when needed
        klebsiella_oxytoca: {
          piperacilina_tazobactam: { s_pct: 70 },
          ceftriaxona: { s_pct: 60 },
          ertapenem: { s_pct: 67 },
          imipenem: { s_pct: 67 },
          meropenem: { s_pct: 67 },
          amikacina: { s_pct: 90 },
          ciprofloxacino: { s_pct: 80 }
        },
        // TODO: add to pathogens catalog if/when needed
        enterobacter_cloacae_complex: {
          piperacilina_tazobactam: { s_pct: 62 },
          ceftriaxona: { s_pct: 48 },
          ertapenem: { s_pct: 77 },
          imipenem: { s_pct: 50 },
          meropenem: { s_pct: 82 },
          amikacina: { s_pct: 81 },
          ciprofloxacino: { s_pct: 62 }
        },
        // TODO: add to pathogens catalog if/when needed
        citrobacter_freundii: {
          piperacilina_tazobactam: { s_pct: 96 },
          ceftriaxona: { s_pct: 77 },
          ertapenem: { s_pct: 100 },
          imipenem: null,
          meropenem: { s_pct: 96 },
          amikacina: { s_pct: 81 },
          ciprofloxacino: { s_pct: 78 }
        },
        // TODO: add to pathogens catalog if/when needed
        serratia_marcescens: {
          piperacilina_tazobactam: { s_pct: 90 },
          ceftriaxona: { s_pct: 69 },
          ertapenem: { s_pct: 86 },
          imipenem: { s_pct: 7 },
          meropenem: { s_pct: 93 },
          amikacina: { s_pct: 96 },
          ciprofloxacino: { s_pct: 55 }
        },
        // TODO: add to pathogens catalog if/when needed
        proteus_mirabilis: {
          piperacilina_tazobactam: { s_pct: 48 },
          ceftriaxona: { s_pct: 41 },
          ertapenem: { s_pct: 57 },
          imipenem: { s_pct: 77 },
          meropenem: { s_pct: 74 },
          amikacina: { s_pct: 78 },
          ciprofloxacino: { s_pct: 48 }
        },
        // TODO: add to pathogens catalog if/when needed
        morganella_morganii: {
          piperacilina_tazobactam: { s_pct: 73 },
          ceftriaxona: { s_pct: 70 },
          ertapenem: { s_pct: 73 },
          imipenem: { s_pct: 73 },
          meropenem: { s_pct: 82 },
          amikacina: { s_pct: 90 },
          ciprofloxacino: { s_pct: 73 }
        }
      },
      modifiers: []
    }
  };

if (typeof module !== "undefined" && module.exports) {
  module.exports = resistanceProfiles;
}
else if (typeof window !== "undefined") {
  window.abg_resistanceProfiles = resistanceProfiles;
}
