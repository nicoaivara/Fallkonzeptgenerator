// Initialer State + Selektoren + Persistenz
(function () {
  const KEY = "fkg_state_v1";

  window.INITIAL_STATE = {
    meta: {
      antrag: "Erstantrag",            // Erstantrag | Umwandlungsantrag
      ageGroup: "Erwachsene",
      verfahren: "Verhaltenstherapie",
      domain: "F30-F39",
      patientInitials: "",
      datum: new Date().toISOString().slice(0, 10),
      icdCodes: [],   // [{ code: "F33.1", specifier: "G" }, ...] — wird auf Schritt 1 gesetzt
    },
    basics: {
      gender: "",
      age: "",
      occupation: "",
      employmentStatus: "",   // Vollzeit | Teilzeit | Selbstständig | ...
      familienstand: "",       // Ledig | Verheiratet | ...
      wohnsituation: "",       // allein lebend | mit Familie | ...
      kidsCount: "",           // keine Kinder | 1 Kind | 2 Kinder | ...
      kidsNotes: "",           // Freitext: Alter, Sorgerecht o.ä.
      workability: "",         // vollständig arbeitsfähig | krankgeschrieben | ...
      family: "",              // Legacy-Feld (Altdaten)
      kids: "",                // Legacy-Feld (Altdaten)
      sociodemographic: "",
    },
    // Symptom map: id -> "present" | "lead" | "unclear"
    symptoms: {},
    symptomsByDx: {},    // { "F32.1": { "mood_depressed": "lead", ... }, "F34.1": { ... } }
    deepenings: {},        // { sleep: {...}, rumination: {...}, withdrawal: {...} }
    leadSymptoms: {},      // id -> true (für Bericht)
    course: {
      onset: "",           // akut | schleichend | rezidivierend | unklar
      duration: "",
      progression: "",
      impairment: "",
      reasonNow: "",
    },
    risk: {
      suicidality: "verneint",
      distancing: "",
      protective: {},
      risks: {},
      crisisPlan: "",
    },
    bipolarity: { items: {}, result: "kein Hinweis" },  // kein Hinweis | unclear | hint
    psychosis: { items: {}, any: false },
    somatic:   { items: {}, flagged: false, status: "unauffällig geprüft" },
    // Befund
    findings: {
      // id -> { area, text, status: 'suggested'|'accepted'|'rejected', edited? }
      proposed: {},
      unauffaellig: {},   // chip text -> true
      freeNotes: "",
    },
    // Diagnose
    diagnoses: {
      proposed: {},        // key -> { label, reasoning, status, certainty }
      icd: "",
      certainty: "V",      // G | V | Z | A
      ddNotes: "",
    },
    // Mechanismen / Fallmodell
    mechanisms: {
      // id -> { status: 'suggested'|'accepted'|'rejected', acceptedItems: { maintainers: [], predispositions: [], beliefs: [], goals: [], methods: [] } }
    },
    // Ziele aggregiert
    goals: {
      // id -> { label, source: 'symptom'|'mechanism'|'custom', status }
    },
    plan: {
      // method -> { status, reason }
    },
    prognosis: {
      favorable: {},   // text -> true
      unfavorable: {},
      formulation: "",
    },
    conversion: {
      symptomChange: {},  // symptomId -> "verbessert" | ...
      goalAchievement: {},
      reasoning: "",
    },
  };

  window.loadState = function () {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return structuredClone(window.INITIAL_STATE);
      const parsed = JSON.parse(raw);
      const merged = Object.assign(structuredClone(window.INITIAL_STATE), parsed);
      // Migrate legacy domain names → chapter IDs
      const legacyMap = { "Depression": "F30-F39", "Angst": "F40-F48", "Zwang": "F40-F48", "Trauma": "F40-F48" };
      if (merged.meta && legacyMap[merged.meta.domain]) {
        merged.meta.domain = legacyMap[merged.meta.domain];
      }
      return merged;
    } catch (e) {
      return structuredClone(window.INITIAL_STATE);
    }
  };

  window.saveState = function (s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
  };

  window.clearState = function () { localStorage.removeItem(KEY); };

  // Beispielfall — typische mittelgradige Depression mit Leistungs-/Rückzugsmuster
  window.SAMPLE_CASE = {
    meta: { antrag: "Erstantrag", ageGroup: "Erwachsene", verfahren: "Verhaltenstherapie", domain: "F30-F39", patientInitials: "M.B.", datum: new Date().toISOString().slice(0,10) },
    basics: { gender: "w", age: "38", occupation: "Projektleiterin, Vollzeit", family: "verheiratet, 2 Kinder", kids: "ja (8, 11)", workability: "aktuell krankgeschrieben" },
    symptoms: {
      mood_depressed: "lead", anhedonia: "lead", joylessness: "present",
      drive_reduced: "lead", concentration: "present", rumination: "lead",
      self_doubt: "present", insufficiency: "present", low_self_worth: "present",
      guilt: "present", hopelessness: "present", failure_anxiety: "present",
      self_devaluation: "present", sadness: "present", inner_emptiness: "present",
      irritability: "present", inner_restlessness: "present",
      social_withdrawal: "lead", fewer_activities: "present", hobbies_dropped: "present",
      avoidance_conflict: "present", overworking: "present", presenteeism: "present",
      sleep_disturbance: "lead", early_waking: "present", non_restorative_sleep: "present",
      libido_loss: "present", exhaustion: "lead",
      psychomotor_slowed: "present", mimic_reduced: "present",
      impair_daily: "present", impair_work: "lead", impair_household: "present",
      impair_partner: "present", impair_leisure: "present",
    },
    course: {
      onset: "schleichend", duration: "3–6 Monate", progression: "zunehmend",
      impairment: "mittel",
      reasonNow: "Krankschreibung seit 3 Wochen, kann Aufgaben in Familie und Beruf nicht mehr bewältigen, hat sich auf Drängen der Hausärztin zur Therapie entschlossen.",
    },
    risk: {
      suicidality: "passive Todeswünsche", distancing: "glaubhaft distanziert",
      protective: { "Kinder/Familie": true, "Partnerschaft": true, "Verantwortungsgefühl": true, "Hilfesuchverhalten": true },
      risks: { "Hoffnungslosigkeit": true },
      crisisPlan: "Krisenkontakt vereinbart, hausärztliche Mitbehandlung, Notfallnummern besprochen.",
    },
    bipolarity: { items: {}, result: "kein Hinweis" },
    psychosis: { items: {}, any: false },
    somatic: { items: { "Schilddrüse abgeklärt": true }, flagged: false, status: "unauffällig geprüft" },
  };
})();
