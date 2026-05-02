// ICD-10 Katalog — Depressive Störungen (F3x).
// Struktur: { code, label, group, severity?, requiresSpecifier? }
// "specifier" = G/V/Z/A nach ICD-Konvention (Diagnosesicherheit).
//
// Vorerst nur Depressive Störungen.

(function () {
  const DEPRESSIVE = [
    // F32 — Depressive Episode
    { group: "F32 — Depressive Episode", code: "F32.0", label: "Leichte depressive Episode" },
    { group: "F32 — Depressive Episode", code: "F32.1", label: "Mittelgradige depressive Episode" },
    { group: "F32 — Depressive Episode", code: "F32.2", label: "Schwere depressive Episode ohne psychotische Symptome" },
    { group: "F32 — Depressive Episode", code: "F32.3", label: "Schwere depressive Episode mit psychotischen Symptomen" },
    { group: "F32 — Depressive Episode", code: "F32.8", label: "Sonstige depressive Episoden" },
    { group: "F32 — Depressive Episode", code: "F32.9", label: "Depressive Episode, nicht näher bezeichnet" },

    // F33 — Rezidivierende depressive Störung
    { group: "F33 — Rezidivierende depressive Störung", code: "F33.0", label: "Rezidivierende depressive Störung, gegenwärtig leichte Episode" },
    { group: "F33 — Rezidivierende depressive Störung", code: "F33.1", label: "Rezidivierende depressive Störung, gegenwärtig mittelgradige Episode" },
    { group: "F33 — Rezidivierende depressive Störung", code: "F33.2", label: "Rezidivierende depressive Störung, gegenwärtig schwere Episode ohne psychotische Symptome" },
    { group: "F33 — Rezidivierende depressive Störung", code: "F33.3", label: "Rezidivierende depressive Störung, gegenwärtig schwere Episode mit psychotischen Symptomen" },
    { group: "F33 — Rezidivierende depressive Störung", code: "F33.4", label: "Rezidivierende depressive Störung, gegenwärtig remittiert" },
    { group: "F33 — Rezidivierende depressive Störung", code: "F33.8", label: "Sonstige rezidivierende depressive Störungen" },
    { group: "F33 — Rezidivierende depressive Störung", code: "F33.9", label: "Rezidivierende depressive Störung, nicht näher bezeichnet" },

    // F34 — Anhaltende affektive Störungen (Auswahl: Dysthymia)
    { group: "F34 — Anhaltende affektive Störung", code: "F34.1", label: "Dysthymia" },
    { group: "F34 — Anhaltende affektive Störung", code: "F34.8", label: "Sonstige anhaltende affektive Störungen" },
    { group: "F34 — Anhaltende affektive Störung", code: "F34.9", label: "Anhaltende affektive Störung, nicht näher bezeichnet" },

    // F38 / F39 — Sonstige / nicht näher bezeichnet
    { group: "F38/F39 — Sonstige affektive Störungen", code: "F38.10", label: "Rezidivierende kurze depressive Störung" },
    { group: "F38/F39 — Sonstige affektive Störungen", code: "F38.8", label: "Sonstige näher bezeichnete affektive Störungen" },
    { group: "F38/F39 — Sonstige affektive Störungen", code: "F39", label: "Nicht näher bezeichnete affektive Störung" },
  ];

  // Diagnosesicherheit (deutsche ICD-Konvention)
  const SPECIFIERS = [
    { value: "G", label: "G — gesicherte Diagnose" },
    { value: "V", label: "V — Verdachtsdiagnose" },
    { value: "Z", label: "Z — Zustand nach" },
    { value: "A", label: "A — Ausschluss" },
  ];

  // Pro Domain
  window.ICD_CATALOG = {
    Depression: DEPRESSIVE,
    // Angst, Zwang, Trauma … folgen
  };
  window.ICD_SPECIFIERS = SPECIFIERS;

  // Hilfsfunktion: nach Gruppe sortiert
  window.icdGroupedFor = function (domain) {
    const list = window.ICD_CATALOG[domain] || [];
    const groups = {};
    for (const it of list) {
      if (!groups[it.group]) groups[it.group] = [];
      groups[it.group].push(it);
    }
    return Object.entries(groups); // [ [group, items[]], ... ]
  };

  // Hilfsfunktion: Eintrag per Code finden
  window.icdLookup = function (code) {
    for (const dom in window.ICD_CATALOG) {
      const hit = window.ICD_CATALOG[dom].find(x => x.code === code);
      if (hit) return hit;
    }
    return null;
  };
})();
