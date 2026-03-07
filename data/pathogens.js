const pathogens = [
  {
    id: "escherichia_coli",
    name: "Escherichia coli",
    aliases: ["E. coli", "Colibacilo"],
    category: "bacteria",
    tags: ["gram_negative", "enterobacterales"],
    summary: "Bacilo Gram negativo entérico; causa frecuente de ITU y sepsis de origen urinario.",
    common_syndromes: ["uti", "pyelonephritis", "bacteremia", "intraabdominal"],
    intrinsic_resistance: ["No susceptible a macrólidos (no útiles clínicamente)."],
    typical_resistance: ["Alta resistencia a ampicilina.", "BLEE (ESBL) en aumento (variable según ámbito)."],
    stewardship_note: "Si riesgo de BLEE o resistencia local alta, evitar cefalosporinas 3ª/FQ empíricas sin criterio.",
    refs: [{ source: "Pendiente", year: 2025, note: "—" }]
  },
  {
    id: "streptococcus_pneumoniae",
    name: "Streptococcus pneumoniae",
    aliases: ["Neumococo", "S. pneumoniae"],
    category: "bacteria",
    tags: ["gram_positive", "diplococci", "respiratory"],
    summary: "Diplococo Gram positivo; patógeno clave en neumonía adquirida en la comunidad y otitis/sinusitis.",
    common_syndromes: ["cap", "sinusitis", "otitis", "meningitis"],
    intrinsic_resistance: [],
    typical_resistance: [
      "Susceptibilidad a penicilina variable según punto de corte y foco (mayor preocupación en meningitis).",
      "Resistencia a macrólidos puede ser significativa y depende del contexto local."
    ],
    stewardship_note: "Evitar monoterapia con macrólidos en CAP si resistencia local es alta.",
    refs: [{ source: "Pendiente", year: 2025, note: "—" }]
  },
  {
    id: "streptococcus_pyogenes",
    name: "Streptococcus pyogenes",
    aliases: ["GAS", "Estreptococo grupo A", "S. pyogenes"],
    category: "bacteria",
    tags: ["gram_positive", "cocci", "streptococcus"],
    summary: "Coco Gram positivo; causa faringitis, escarlatina y celulitis/erisipela no purulenta.",
    common_syndromes: ["pharyngitis", "ssti_nonpurulent", "necrotizing_soft_tissue"],
    intrinsic_resistance: [],
    typical_resistance: ["Mantiene alta sensibilidad a penicilinas.", "Resistencia a macrólidos puede existir (variable por contexto)."],
    stewardship_note: "Penicilina sigue siendo fármaco de elección cuando corresponde; evitar espectro innecesario.",
    refs: [{ source: "Pendiente", year: 2025, note: "—" }]
  },
  {
    id: "staphylococcus_aureus",
    name: "Staphylococcus aureus",
    aliases: ["S. aureus", "MSSA", "MRSA", "SAMR"],
    category: "bacteria",
    tags: ["gram_positive", "cocci", "staph"],
    summary: "Coco Gram positivo; coloniza piel/narinas y causa SSTI purulenta, bacteriemia y foco osteoarticular.",
    common_syndromes: ["ssti_purulent", "bacteremia", "ostearticular", "pneumonia"],
    intrinsic_resistance: ["Frecuente resistencia a penicilina G por penicilinasa."],
    typical_resistance: [
      "MRSA puede ser relevante según epidemiología (comunidad/hospital).",
      "Resistencia a clindamicina variable; considerar D-test cuando aplique."
    ],
    stewardship_note: "Si hay riesgo de MRSA, evitar beta-lactámicos anti-MSSA como única cobertura empírica.",
    refs: [{ source: "Pendiente", year: 2025, note: "—" }]
  },
  {
    id: "pseudomonas_aeruginosa",
    name: "Pseudomonas aeruginosa",
    aliases: ["Pseudomonas", "P. aeruginosa"],
    category: "bacteria",
    tags: ["gram_negative", "nonfermenter", "nosocomial"],
    summary: "Bacilo Gram negativo no fermentador; asociado a infecciones nosocomiales y pacientes con factores de riesgo.",
    common_syndromes: ["hap_vap", "complicated_uti", "bacteremia", "ssti_complicated"],
    intrinsic_resistance: ["Intrínsecamente resistente a múltiples antibióticos (barrera de permeabilidad/eflujo)."],
    typical_resistance: ["Resistencia adquirida frecuente en exposición previa a antibióticos o estadías prolongadas."],
    stewardship_note: "Evitar cobertura anti-Pseudomonas si no hay factores de riesgo; de-escalar con cultivos.",
    refs: [{ source: "Pendiente", year: 2025, note: "—" }]
  },
  { id: "haemophilus_influenzae", name: "Haemophilus influenzae", category: "bacteria", tags: ["gram_negative", "respiratory"] },
  { id: "mycoplasma_pneumoniae", name: "Mycoplasma pneumoniae", category: "bacteria", tags: ["atypical", "respiratory"] },
  { id: "chlamydia_pneumoniae", name: "Chlamydia pneumoniae", category: "bacteria", tags: ["atypical", "respiratory"] },
  { id: "klebsiella_spp", name: "Klebsiella spp.", category: "group", tags: ["gram_negative", "enterobacterales"] },
  { id: "klebsiella_pneumoniae", name: "Klebsiella pneumoniae", category: "bacteria", tags: ["gram_negative", "enterobacterales"] },
  { id: "proteus_mirabilis", name: "Proteus mirabilis", category: "bacteria", tags: ["gram_negative", "enterobacterales"] },
  { id: "staphylococcus_saprophyticus", name: "Staphylococcus saprophyticus", category: "bacteria", tags: ["gram_positive", "cocci"] },
  { id: "enterobacter_spp", name: "Enterobacter spp.", category: "group", tags: ["gram_negative", "enterobacterales"] },
  { id: "enterococcus_spp", name: "Enterococcus spp.", category: "group", tags: ["gram_positive", "cocci"] },
  { id: "methicillin_resistant_staphylococcus_aureus", name: "MRSA", category: "group", tags: ["gram_positive", "cocci", "resistant"] },
  { id: "neisseria_gonorrhoeae", name: "Neisseria gonorrhoeae", category: "bacteria", tags: ["gram_negative", "diplococci"] },
  { id: "chlamydia_trachomatis", name: "Chlamydia trachomatis", category: "bacteria", tags: ["atypical"] },
  { id: "anaerobes", name: "Anaerobios", category: "group", tags: ["anaerobic"] },
  { id: "mycoplasma_genitalium", name: "Mycoplasma genitalium", category: "bacteria", tags: ["atypical"] },
  { id: "neisseria_meningitidis", name: "Neisseria meningitidis", category: "bacteria", tags: ["gram_negative", "diplococci"] },
  { id: "listeria_monocytogenes", name: "Listeria monocytogenes", category: "bacteria", tags: ["gram_positive", "bacilli"] },
  { id: "streptococcus_spp", name: "Streptococcus spp.", category: "group", tags: ["gram_positive", "cocci"] },
  { id: "enterobacterales", name: "Enterobacterales", category: "group", tags: ["gram_negative"] },
  { id: "bacteroides_fragilis", name: "Bacteroides fragilis", category: "bacteria", tags: ["gram_negative", "anaerobic"] },
  { id: "staphylococcus_cons", name: "Staphylococcus coagulasa-negativo (CoNS)", category: "group", tags: ["gram_positive", "cocci"] },
  { id: "streptococcus_viridans_group", name: "Streptococcus viridans", category: "group", tags: ["gram_positive", "cocci"] },
  { id: "streptococcus_gallolyticus", name: "Streptococcus gallolyticus", category: "bacteria", tags: ["gram_positive", "cocci"] },
  { id: "enterococcus_faecalis", name: "Enterococcus faecalis", category: "bacteria", tags: ["gram_positive", "cocci"] },
  { id: "hacek_group", name: "HACEK", category: "group", tags: ["gram_negative", "fastidious"] },
  { id: "gram_negative_bacilli_non_hacek", name: "Bacilos gramnegativos (nosocomial/no-HACEK)", category: "group", tags: ["gram_negative", "bacilli"] },
  { id: "candida_spp", name: "Candida spp.", category: "group", tags: ["fungi", "yeast"] },
  { id: "culture_negative_endocarditis_zoonotic", name: "Coxiella burnetii / Bartonella / Brucella (cultivos negativos, seleccionados)", category: "group", tags: ["zoonotic", "endocarditis"] },
  { id: "acinetobacter_baumannii", name: "Acinetobacter baumannii", category: "bacteria", tags: ["gram_negative", "nosocomial"] },
  { id: "staphylococcus_sp", name: "Staphylococcus spp.", category: "group", tags: ["gram_positive", "cocci"] },
  { id: "enterococcus_faecium", name: "Enterococcus faecium", category: "bacteria", tags: ["gram_positive", "cocci"] },
  { id: "klebsiella_oxytoca", name: "Klebsiella oxytoca", category: "bacteria", tags: ["gram_negative", "enterobacterales"] },
  { id: "enterobacter_cloacae_complex", name: "Enterobacter cloacae complex", category: "group", tags: ["gram_negative", "enterobacterales"] },
  { id: "citrobacter_freundii", name: "Citrobacter freundii", category: "bacteria", tags: ["gram_negative", "enterobacterales"] },
  { id: "serratia_marcescens", name: "Serratia marcescens", category: "bacteria", tags: ["gram_negative", "enterobacterales"] },
  { id: "morganella_morganii", name: "Morganella morganii", category: "bacteria", tags: ["gram_negative", "enterobacterales"] },
  { id: "stenotrophomonas_maltophilia", name: "Stenotrophomonas maltophilia", category: "bacteria", tags: ["gram_negative", "nonfermenter", "nosocomial"] }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = pathogens;
}
else if (typeof window !== "undefined") {
  window.abg_pathogens = pathogens;
}
