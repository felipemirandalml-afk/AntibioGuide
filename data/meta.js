const meta = {
  appName: "AntibioGuide",
  version: "0.4.1",
  lastUpdated: "2026-07-16",
  scope: "Adultos. No incluye pediatria, embarazo ni lactancia.",
  disclaimer:
    "Uso educativo basado en guias internacionales. No reemplaza el juicio clinico.",
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = meta;
}
else if (typeof window !== "undefined") {
  window.abg_meta = meta;
}
