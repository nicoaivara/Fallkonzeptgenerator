// ICD-10 Katalog — Affektive Störungen F30–F39 (vollständig)
// Weitere Kapitel folgen.
(function () {

  const AFFEKTIV = [
    // F30 — Manische Episode
    { group: "F30 — Manische Episode",           code: "F30.0", label: "Hypomanie" },
    { group: "F30 — Manische Episode",           code: "F30.1", label: "Manie ohne psychotische Symptome" },
    { group: "F30 — Manische Episode",           code: "F30.2", label: "Manie mit psychotischen Symptomen" },
    { group: "F30 — Manische Episode",           code: "F30.8", label: "Sonstige manische Episoden" },
    { group: "F30 — Manische Episode",           code: "F30.9", label: "Manische Episode, nicht näher bezeichnet" },

    // F31 — Bipolare affektive Störung
    { group: "F31 — Bipolare affektive Störung", code: "F31.0", label: "Bipolar, gegenwärtig hypomanisch" },
    { group: "F31 — Bipolare affektive Störung", code: "F31.1", label: "Bipolar, gegenwärtig manisch ohne Psychose" },
    { group: "F31 — Bipolare affektive Störung", code: "F31.2", label: "Bipolar, gegenwärtig manisch mit Psychose" },
    { group: "F31 — Bipolare affektive Störung", code: "F31.3", label: "Bipolar, gegenwärtig leicht/mittelgradig depressiv" },
    { group: "F31 — Bipolare affektive Störung", code: "F31.4", label: "Bipolar, gegenwärtig schwer depressiv ohne Psychose" },
    { group: "F31 — Bipolare affektive Störung", code: "F31.5", label: "Bipolar, gegenwärtig schwer depressiv mit Psychose" },
    { group: "F31 — Bipolare affektive Störung", code: "F31.6", label: "Bipolar, gegenwärtig gemischte Episode" },
    { group: "F31 — Bipolare affektive Störung", code: "F31.7", label: "Bipolar, gegenwärtig remittiert" },
    { group: "F31 — Bipolare affektive Störung", code: "F31.8", label: "Sonstige bipolare affektive Störungen (inkl. Bipolar-II)" },
    { group: "F31 — Bipolare affektive Störung", code: "F31.9", label: "Bipolare affektive Störung, nicht näher bezeichnet" },

    // F32 — Depressive Episode
    { group: "F32 — Depressive Episode",         code: "F32.0", label: "Leichte depressive Episode" },
    { group: "F32 — Depressive Episode",         code: "F32.1", label: "Mittelgradige depressive Episode" },
    { group: "F32 — Depressive Episode",         code: "F32.2", label: "Schwere depressive Episode ohne psychotische Symptome" },
    { group: "F32 — Depressive Episode",         code: "F32.3", label: "Schwere depressive Episode mit psychotischen Symptomen" },
    { group: "F32 — Depressive Episode",         code: "F32.8", label: "Sonstige depressive Episoden" },
    { group: "F32 — Depressive Episode",         code: "F32.9", label: "Depressive Episode, nicht näher bezeichnet" },

    // F33 — Rezidivierende depressive Störung
    { group: "F33 — Rezidivierende depressive Störung", code: "F33.0", label: "Rezidivierende depressive Störung, gegenwärtig leichte Episode" },
    { group: "F33 — Rezidivierende depressive Störung", code: "F33.1", label: "Rezidivierende depressive Störung, gegenwärtig mittelgradige Episode" },
    { group: "F33 — Rezidivierende depressive Störung", code: "F33.2", label: "Rezidivierende depressive Störung, gegenwärtig schwere Episode ohne psychotische Symptome" },
    { group: "F33 — Rezidivierende depressive Störung", code: "F33.3", label: "Rezidivierende depressive Störung, gegenwärtig schwere Episode mit psychotischen Symptomen" },
    { group: "F33 — Rezidivierende depressive Störung", code: "F33.4", label: "Rezidivierende depressive Störung, gegenwärtig remittiert" },
    { group: "F33 — Rezidivierende depressive Störung", code: "F33.8", label: "Sonstige rezidivierende depressive Störungen" },
    { group: "F33 — Rezidivierende depressive Störung", code: "F33.9", label: "Rezidivierende depressive Störung, nicht näher bezeichnet" },

    // F34 — Anhaltende affektive Störungen
    { group: "F34 — Anhaltende affektive Störung", code: "F34.0", label: "Zyklothymia" },
    { group: "F34 — Anhaltende affektive Störung", code: "F34.1", label: "Dysthymia" },
    { group: "F34 — Anhaltende affektive Störung", code: "F34.8", label: "Sonstige anhaltende affektive Störungen" },
    { group: "F34 — Anhaltende affektive Störung", code: "F34.9", label: "Anhaltende affektive Störung, nicht näher bezeichnet" },

    // F38/F39 — Sonstige / nicht näher bezeichnet
    { group: "F38/F39 — Sonstige affektive Störungen", code: "F38.0",  label: "Gemischte affektive Episode" },
    { group: "F38/F39 — Sonstige affektive Störungen", code: "F38.1",  label: "Rezidivierende kurze depressive Episoden" },
    { group: "F38/F39 — Sonstige affektive Störungen", code: "F38.8",  label: "Sonstige näher bezeichnete affektive Störungen" },
    { group: "F38/F39 — Sonstige affektive Störungen", code: "F39",    label: "Nicht näher bezeichnete affektive Störung" },
  ];

  // Diagnosesicherheit (deutsche ICD-Konvention)
  const SPECIFIERS = [
    { value: "G", label: "G — gesicherte Diagnose" },
    { value: "V", label: "V — Verdachtsdiagnose" },
    { value: "Z", label: "Z — Zustand nach" },
    { value: "A", label: "A — Ausschluss" },
  ];

  // Alle F-Kapitel mit Beschriftung
  window.ICD_CHAPTERS = [
    { id: "F00-F09", label: "F00–F09", desc: "Organische, einschl. symptomatischer psychischer Störungen", active: false },
    { id: "F10-F19", label: "F10–F19", desc: "Psychische und Verhaltensstörungen durch psychotrope Substanzen", active: false },
    { id: "F20-F29", label: "F20–F29", desc: "Schizophrenie, schizotype und wahnhafte Störungen", active: false },
    { id: "F30-F39", label: "F30–F39", desc: "Affektive Störungen", active: true },
    { id: "F40-F48", label: "F40–F48", desc: "Neurotische, Belastungs- und somatoforme Störungen", active: false },
    { id: "F50-F59", label: "F50–F59", desc: "Verhaltensauffälligkeiten mit körperlichen Störungen und Faktoren", active: false },
    { id: "F60-F69", label: "F60–F69", desc: "Persönlichkeits- und Verhaltensstörungen", active: false },
    { id: "F70-F79", label: "F70–F79", desc: "Intelligenzstörung", active: false },
    { id: "F80-F89", label: "F80–F89", desc: "Entwicklungsstörungen", active: false },
    { id: "F90-F98", label: "F90–F98", desc: "Verhaltens- und emotionale Störungen mit Beginn in Kindheit/Jugend", active: false },
    { id: "F99",     label: "F99",     desc: "Nicht näher bezeichnete psychische Störungen", active: false },
  ];

  // Mapping: chapter id → Katalog
  window.ICD_CATALOG = {
    "F30-F39": AFFEKTIV,
    // Weitere Kapitel folgen
  };
  window.ICD_SPECIFIERS = SPECIFIERS;

  // Legacy-Mapping muss VOR icdGroupedFor definiert sein
  window.ICD_DOMAIN_MAP = {
    "Depression": "F30-F39",
    "Angst":      "F40-F48",
    "Zwang":      "F40-F48",
    "Trauma":     "F40-F48",
  };

  // icdGroupedFor: gibt Gruppen für ein Kapitel zurück
  // Unterstützt sowohl neue Chapter-IDs ("F30-F39") als auch Legacy-Domainnames ("Depression")
  window.icdGroupedFor = function (domainOrChapter) {
    // Legacy-Mapping
    const mapped = window.ICD_DOMAIN_MAP[domainOrChapter] || domainOrChapter;
    const list = window.ICD_CATALOG[mapped] || [];
    const groups = {};
    for (const it of list) {
      if (!groups[it.group]) groups[it.group] = [];
      groups[it.group].push(it);
    }
    return Object.entries(groups);
  };

  // icdLookup: Code → Eintrag
  window.icdLookup = function (code) {
    for (const dom in window.ICD_CATALOG) {
      const hit = window.ICD_CATALOG[dom].find(x => x.code === code);
      if (hit) return hit;
    }
    return null;
  };

  // ── Gegenseitige Ausschlüsse (vollständig nach ICD-10-GM F30–F39) ─────
  // Typen: E = nie gleichzeitig · R = Ersetzung im Verlauf · H = Hierarchie (spezifischeres löst ab)
  // blocking: true  → Hinzufügen wird blockiert / roter Alert
  // blocking: false → Warnung (gelber Alert), keine Sperre (z. B. Double Depression)
  window.ICD_EXCLUSION_RULES = [

    // ── F30 interne Schweregradabstufungen (E) ──────────────────────────
    {
      type: "severity", blocking: true,
      codes: ["F30.0","F30.1","F30.2"],
      label: "F30 — Manische Episode: Schweregrad",
      message: "F30.0, F30.1 und F30.2 schließen sich gegenseitig aus — nur der höchste Schweregrad wird kodiert.",
    },

    // ── F31 aktuelle Episode (E) ─────────────────────────────────────────
    {
      type: "severity", blocking: true,
      codes: ["F31.0","F31.1","F31.2","F31.3","F31.4","F31.5","F31.6"],
      label: "F31 — Bipolare Störung: aktuelle Episode",
      message: "Nur eine aktuelle Episodenkategorie bei bipolarer Störung kodieren.",
    },

    // ── F32 Schweregradabstufungen (E) ──────────────────────────────────
    {
      type: "severity", blocking: true,
      codes: ["F32.0","F32.1","F32.2","F32.3"],
      label: "F32 — Depressive Episode: Schweregrad",
      message: "Pro Behandlungszeitraum nur ein Schweregrad der depressiven Episode kodieren.",
    },

    // ── F33 Schweregradabstufungen (E) ──────────────────────────────────
    {
      type: "severity", blocking: true,
      codes: ["F33.0","F33.1","F33.2","F33.3"],
      label: "F33 — Rezidivierende Depression: Schweregrad",
      message: "Pro Behandlungszeitraum nur ein Schweregrad der rezidivierenden depressiven Störung kodieren.",
    },

    // ── F30 vs. F31 (R) ──────────────────────────────────────────────────
    // F30 gilt nur für die allererste manische Episode; bei 2. Episode → F31
    {
      type: "conflict", blocking: true,
      group_a: ["F30.0","F30.1","F30.2","F30.8","F30.9"],
      group_b: ["F31.0","F31.1","F31.2","F31.3","F31.4","F31.5","F31.6","F31.7","F31.8","F31.9"],
      message: "F30 (erste manische Episode) und F31 (bipolarer Verlauf) schließen sich aus. Sobald eine zweite affektive Episode auftritt, wird F30 durch F31 ersetzt.",
    },

    // ── F31 vs. F32 (R) ──────────────────────────────────────────────────
    // Bipolare Vorgeschichte schließt unipolare Einzelepisode aus
    {
      type: "conflict", blocking: true,
      group_a: ["F31.0","F31.1","F31.2","F31.3","F31.4","F31.5","F31.6","F31.7","F31.8","F31.9"],
      group_b: ["F32.0","F32.1","F32.2","F32.3","F32.8","F32.9"],
      message: "F31 (bipolare Störung) und F32 (einzelne depressive Episode) schließen sich aus. Bei bipolarer Vorgeschichte wird F32 durch die entsprechende F31-Untergruppe ersetzt.",
    },

    // ── F31 vs. F33 (R) ──────────────────────────────────────────────────
    // Bipolare Vorgeschichte schließt rezidivierende unipolare Depression aus
    {
      type: "conflict", blocking: true,
      group_a: ["F31.0","F31.1","F31.2","F31.3","F31.4","F31.5","F31.6","F31.7","F31.8","F31.9"],
      group_b: ["F33.0","F33.1","F33.2","F33.3","F33.4","F33.8","F33.9"],
      message: "F31 (bipolare Störung) und F33 (rezidivierende depressive Störung) schließen sich aus. F33 setzt das Fehlen jeglicher manischer/hypomanischer Episoden voraus.",
    },

    // ── F32 vs. F33 (E) ──────────────────────────────────────────────────
    // Einzelepisode vs. rezidivierend — nie gleichzeitig
    {
      type: "conflict", blocking: true,
      group_a: ["F32.0","F32.1","F32.2","F32.3","F32.8","F32.9"],
      group_b: ["F33.0","F33.1","F33.2","F33.3","F33.4","F33.8","F33.9"],
      message: "F32 (einzelne depressive Episode) und F33 (rezidivierende Störung) schließen sich aus. Mit Auftreten einer zweiten Episode wird F32 durch F33 ersetzt.",
    },

    // ── F34.0 Zyklothymia vs. F30 (H) ────────────────────────────────────
    {
      type: "conflict", blocking: true,
      group_a: ["F34.0"],
      group_b: ["F30.0","F30.1","F30.2","F30.8","F30.9"],
      message: "Zyklothymia (F34.0) schließt vollwertige manische Episoden aus. Bei erfüllten Manie-Kriterien wird F34.0 durch F30 (bzw. F31) abgelöst.",
    },

    // ── F34.0 Zyklothymia vs. F31 (H) ────────────────────────────────────
    {
      type: "conflict", blocking: true,
      group_a: ["F34.0"],
      group_b: ["F31.0","F31.1","F31.2","F31.3","F31.4","F31.5","F31.6","F31.7","F31.8","F31.9"],
      message: "Zyklothymia (F34.0) und Bipolare Störung (F31) schließen sich aus. F34.0 entfällt, sobald die F31-Kriterien erfüllt sind.",
    },

    // ── F34.1 Dysthymia vs. F32 (H — Ausnahme: Double Depression) ────────
    // Gleichzeitige Kodierung nur in Ausnahmefällen zulässig → Warnung, kein Block
    {
      type: "conflict", blocking: false,
      group_a: ["F34.1"],
      group_b: ["F32.0","F32.1","F32.2","F32.3","F32.8","F32.9"],
      message: "Dysthymia (F34.1) + depressive Episode (F32): Gleichzeitige Kodierung nur als sog. »Double Depression« zulässig — klinisch klar begründen.",
    },

    // ── F34.1 Dysthymia vs. F33 (H) ──────────────────────────────────────
    {
      type: "conflict", blocking: true,
      group_a: ["F34.1"],
      group_b: ["F33.0","F33.1","F33.2","F33.3","F33.4","F33.8","F33.9"],
      message: "Dysthymia (F34.1) und rezidivierende depressive Störung (F33) schließen sich als Hauptdiagnose aus. Sobald F33-Kriterien erfüllt sind, entfällt F34.1.",
    },

    // ── F34.1 Dysthymia vs. F30/F31 (E) ──────────────────────────────────
    {
      type: "conflict", blocking: true,
      group_a: ["F34.1"],
      group_b: ["F30.0","F30.1","F30.2","F30.8","F30.9","F31.0","F31.1","F31.2","F31.3","F31.4","F31.5","F31.6","F31.7","F31.8","F31.9"],
      message: "Dysthymia (F34.1) setzt das vollständige Fehlen manischer/hypomanischer Episoden voraus. Bei F30 oder F31 ist F34.1 nicht kodierbar.",
    },

    // ── F38.0 Gemischte Episode vs. F31.6 (E) ────────────────────────────
    {
      type: "conflict", blocking: true,
      group_a: ["F38.0"],
      group_b: ["F31.6"],
      message: "Gemischte affektive Episode (F38.0) und F31.6 schließen sich aus. Bei bekannter bipolarer Vorgeschichte wird F31.6 kodiert.",
    },

    // ── F38.1 vs. F33 (H) ────────────────────────────────────────────────
    {
      type: "conflict", blocking: true,
      group_a: ["F38.1"],
      group_b: ["F33.0","F33.1","F33.2","F33.3","F33.4","F33.8","F33.9"],
      message: "Rezidivierende kurze depressive Episoden (F38.1) und F33 schließen sich aus. Sobald die F33-Mindestdauer erfüllt ist, entfällt F38.1.",
    },

    // ── F39 vs. alle spezifischeren F3-Diagnosen (H) ─────────────────────
    {
      type: "conflict", blocking: true,
      group_a: ["F39"],
      group_b: [
        "F30.0","F30.1","F30.2","F30.8","F30.9",
        "F31.0","F31.1","F31.2","F31.3","F31.4","F31.5","F31.6","F31.7","F31.8","F31.9",
        "F32.0","F32.1","F32.2","F32.3","F32.8","F32.9",
        "F33.0","F33.1","F33.2","F33.3","F33.4","F33.8","F33.9",
        "F34.0","F34.1","F34.8","F34.9",
        "F38.0","F38.1","F38.8",
      ],
      message: "F39 (nicht näher bezeichnet) ist eine Auffangdiagnose. Sie darf nicht verwendet werden, sobald eine spezifischere Diagnose aus F30–F38 kodierbar ist.",
    },
  ];

  // Konflikte berechnen für eine Codeliste
  window.getIcdConflicts = function(codes) {
    const codeSet = new Set(codes);
    const out = [];
    for (const rule of window.ICD_EXCLUSION_RULES) {
      if (rule.type === "severity") {
        const hits = rule.codes.filter(c => codeSet.has(c));
        if (hits.length > 1) out.push({ ...rule, hits });
      } else {
        const hitsA = rule.group_a.filter(c => codeSet.has(c));
        const hitsB = rule.group_b.filter(c => codeSet.has(c));
        if (hitsA.length && hitsB.length) out.push({ ...rule, hits: [...hitsA, ...hitsB] });
      }
    }
    return out;
  };

  // Kann ein neuer Code hinzugefügt werden?
  window.canAddIcdCode = function(existing, newCode) {
    const test = [...existing.map(c => c.code), newCode];
    const conflicts = window.getIcdConflicts(test).filter(c => c.blocking);
    return { ok: conflicts.length === 0, conflicts };
  };
})();
