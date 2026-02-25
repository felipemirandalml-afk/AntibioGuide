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
    const normalize = typeof opts.normalize === "function" ? opts.normalize : state.normalize;

    state.ready = false;
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
    init: init,
    evaluate: evaluate
  };
})();
