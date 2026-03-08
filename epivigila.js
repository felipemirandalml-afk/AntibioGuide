/**
 * =========================================================================
 * EPIVIGILA MODULE (epivigila.js)
 * =========================================================================
 * 
 * Notice: This module handles the independent EPIVIGILA integration layer.
 * It remains in the root directory for structural independence as it operates
 * autonomously parsing the DB and checking for terms to render warnings.
 * =========================================================================
 */
(function () {
  const state = {
    ready: false,
    normalize: function (value) {
      return String(value || "");
    },
    termsIndex: Object.create(null),
    rows: []
  };

  function parseCSV(text) {
    const rows = [];
    const lines = String(text || "").replace(/\r\n?/g, "\n").split("\n");
    if (lines.length === 0) return rows;

    function parseLine(line) {
      const values = [];
      let current = "";
      let inQuotes = false;

      for (let i = 0; i < line.length; i += 1) {
        const ch = line[i];

        if (ch === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i += 1;
          } else {
            inQuotes = !inQuotes;
          }
          continue;
        }

        if (ch === "," && !inQuotes) {
          values.push(current);
          current = "";
          continue;
        }

        current += ch;
      }

      values.push(current);
      return values;
    }

    const headers = parseLine(lines[0]).map(function (h) {
      return String(h || "").trim();
    });

    for (let i = 1; i < lines.length; i += 1) {
      const line = lines[i];
      if (!line || !line.trim()) continue;

      const cols = parseLine(line);
      if (cols.length === 1 && !String(cols[0] || "").trim()) continue;

      const row = {};
      for (let c = 0; c < headers.length; c += 1) {
        row[headers[c]] = cols[c] !== undefined ? cols[c] : "";
      }
      rows.push(row);
    }

    return rows;
  }

  function clearBanner(bannerElement) {
    if (!bannerElement) return;
    bannerElement.innerHTML = "";
  }

  const EPIVIGILA_DB = [
    {
      id: "tuberculosis",
      type: "Notificacion inmediata",
      note: "Sospecha o confirmacion compatible con ENO de notificacion obligatoria.",
      reference: "MINSAL Chile - EPIVIGILA ENO",
      keywords: ["tuberculosis", "tb", "mycobacterium tuberculosis", "bacilo de koch", "koch"]
    },
    {
      id: "meningococo",
      type: "Notificacion inmediata",
      note: "Meningitis o enfermedad meningococica requiere aviso inmediato segun ENO.",
      reference: "MINSAL Chile - EPIVIGILA ENO",
      keywords: ["meningococo", "meningococcemia", "neisseria meningitidis", "meningitis meningococica"]
    },
    {
      id: "sarampion_rubeola",
      type: "Notificacion inmediata",
      note: "Cuadro sospechoso de sarampion o rubeola requiere notificacion y estudio.",
      reference: "MINSAL Chile - EPIVIGILA ENO",
      keywords: ["sarampion", "rubeola", "measles", "rubella"]
    },
    {
      id: "dengue",
      type: "Notificacion obligatoria",
      note: "Caso sospechoso o confirmado de dengue debe notificarse segun normativa vigente.",
      reference: "MINSAL Chile - EPIVIGILA ENO",
      keywords: ["dengue", "arbovirosis", "aedes"]
    },
    {
      id: "influenza_avian",
      type: "Notificacion inmediata",
      note: "Influenza aviar o zoonotica requiere notificacion inmediata.",
      reference: "MINSAL Chile - EPIVIGILA ENO",
      keywords: ["influenza aviar", "h5n1", "gripe aviar", "influenza zoonotica"]
    }
  ];

  function escapeHTML(str) {
    return String(str || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getNormalize(options) {
    return typeof options?.normalize === "function" ? options.normalize : state.normalize;
  }

  function getKeywords(entry) {
    const rawKeywords = Array.isArray(entry?.keywords) ? entry.keywords : [];
    const rawSynonyms = Array.isArray(entry?.synonyms) ? entry.synonyms : [];
    return rawKeywords.concat(rawSynonyms);
  }

  function matchEpivigila(options) {
    const opts = options || {};
    const normalize = getNormalize(opts);
    const query = normalize(opts.query || "");
    if (!query) return null;
    if (query.length < 3) return null;

    let bestMatch = null;

    for (let i = 0; i < EPIVIGILA_DB.length; i += 1) {
      const entry = EPIVIGILA_DB[i];
      const terms = getKeywords(entry);

      for (let j = 0; j < terms.length; j += 1) {
        const termRaw = terms[j];
        const term = normalize(termRaw);
        if (!term) continue;

        let score = 0;
        if (query === term) score = 300;
        else if (query.includes(term)) score = 200;
        else if (term.includes(query)) score = 100;

        if (!score) continue;

        if (!bestMatch || score > bestMatch.score || (score === bestMatch.score && term.length > bestMatch.term.length)) {
          bestMatch = {
            score: score,
            term: term,
            result: {
              id: entry.id || "",
              type: entry.type || "",
              note: entry.note || "",
              reference: entry.reference || "",
              matchedTerm: termRaw || ""
            }
          };
        }
      }
    }

    return bestMatch ? bestMatch.result : null;
  }

  function renderEpivigilaBanner(options) {
    const opts = options || {};
    const bannerElement = opts.bannerElement;
    const match = opts.match;
    if (!bannerElement) return;
    if (!match) {
      clearBanner(bannerElement);
      return;
    }

    const type = escapeHTML(match.type || "Notificacion EPIVIGILA");
    const note = escapeHTML(match.note || "");
    const reference = escapeHTML(match.reference || "");
    const matchedTerm = escapeHTML(match.matchedTerm || "");

    bannerElement.innerHTML =
      '<div class="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">' +
      '<div><strong>EPIVIGILA:</strong> ' + type + "</div>" +
      (note ? '<div class="mt-1">' + note + "</div>" : "") +
      (reference ? '<div class="mt-1 text-xs opacity-90">Referencia: ' + reference + "</div>" : "") +
      (matchedTerm ? '<div class="mt-1 text-xs opacity-90">Termino detectado: ' + matchedTerm + "</div>" : "") +
      "</div>";
  }

  function renderBanner(bannerElement, matches) {
    if (!bannerElement) return;

    const names = [];
    const seen = Object.create(null);

    for (let i = 0; i < matches.length; i += 1) {
      const legalName = String(matches[i].legal_name || "").trim();
      if (!legalName || seen[legalName]) continue;
      seen[legalName] = true;
      names.push(legalName);
      if (names.length >= 3) break;
    }

    const detail = names.join(" · ");
    bannerElement.innerHTML =
      '<div class="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">' +
      '<strong>EPIVIGILA:</strong> Término(s) con potencial notificación obligatoria detectado(s).' +
      (detail ? ' <span class="font-semibold">' + detail + "</span>" : "") +
      "</div>";
  }

  function buildIndex(rows, normalize) {
    const termsIndex = Object.create(null);

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i] || {};
      const raw = String(row.match_terms || "");
      if (!raw) continue;

      const terms = raw.split(";");
      for (let j = 0; j < terms.length; j += 1) {
        const term = normalize(terms[j]);
        if (!term) continue;
        if (!termsIndex[term]) termsIndex[term] = [];
        termsIndex[term].push(row);
      }
    }

    return termsIndex;
  }

  async function init(options) {
    const opts = options || {};
    const csvPath = opts.csvPath;
    const normalize = getNormalize(opts);

    state.ready = false;
    // Nivel 2: la base hardcoded (EPIVIGILA_DB) es la fuente primaria.
    // El CSV se mantiene como carga opcional y fail-silent para compatibilidad.
    state.normalize = normalize;
    state.termsIndex = Object.create(null);
    state.rows = [];

    if (!csvPath) return;

    try {
      const response = await fetch(csvPath);
      if (!response || !response.ok) return;

      const csvText = await response.text();
      const rows = parseCSV(csvText);

      state.rows = rows;
      state.termsIndex = buildIndex(rows, normalize);
      state.ready = true;
    } catch (_err) {
      // fail silently by design
    }
  }

  function evaluate(options) {
    const opts = options || {};
    const normalize = typeof opts.normalize === "function" ? opts.normalize : state.normalize;
    const contentElement = opts.contentElement;
    const bannerElement = opts.bannerElement;

    if (!bannerElement || !contentElement || !state.ready) {
      clearBanner(bannerElement);
      return;
    }

    const rawText = contentElement.innerText || "";
    const haystack = normalize(rawText);

    if (!haystack) {
      clearBanner(bannerElement);
      return;
    }

    const matchedRows = [];
    const seenNames = Object.create(null);
    const terms = Object.keys(state.termsIndex);

    for (let i = 0; i < terms.length; i += 1) {
      const term = terms[i];
      if (!term || !haystack.includes(term)) continue;

      const rows = state.termsIndex[term] || [];
      for (let j = 0; j < rows.length; j += 1) {
        const key = String(rows[j].legal_name || "") + "|" + String(rows[j].match_terms || "");
        if (seenNames[key]) continue;
        seenNames[key] = true;
        matchedRows.push(rows[j]);
      }
    }

    if (matchedRows.length > 0) {
      renderBanner(bannerElement, matchedRows);
      return;
    }

    clearBanner(bannerElement);
  }

  window.EPIVIGILA = {
    DB: EPIVIGILA_DB,
    init: init,
    evaluate: evaluate,
    matchEpivigila: matchEpivigila,
    renderEpivigilaBanner: renderEpivigilaBanner
  };
})();
