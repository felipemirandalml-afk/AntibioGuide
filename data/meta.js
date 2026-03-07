const meta = {
    appName: "AntibioGuide",
    version: "0.3.0",
    lastUpdated: "2026-03-02",
    scope: "Adultos. No incluye pediatría, embarazo ni lactancia.",
    disclaimer:
      "Uso educativo basado en guías internacionales. No reemplaza el juicio clínico.",
  }

if (typeof module !== "undefined" && module.exports) {
  module.exports = meta;
}
else if (typeof window !== "undefined") {
  window.abg_meta = meta;
}
