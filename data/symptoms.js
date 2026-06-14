// Symptomkatalog Affektive Störungen (F30–F39) — gruppiert nach Blöcken A–G
// Kernsymptome orientieren sich exakt an den ICD-10 F32-Kriterien (PDF-Quelle)
window.SYMPTOM_BLOCKS = [
  {
    id: "A",
    title: "Kernsymptome",
    items: [
      { id: "mood_depressed",   label: "gedrückte Stimmung",                 core: true },
      { id: "drive_reduced",    label: "verminderter Antrieb und Aktivität",  core: true },
      { id: "anhedonia",        label: "vermindertes Interesse und Freude",   core: true },
      { id: "concentration",    label: "Konzentrationsstörungen",             core: true },
      { id: "low_self_worth",   label: "vermindertes Selbstwertgefühl",       core: true },
      { id: "guilt",            label: "Schuldgefühle",                       core: true },
      { id: "sleep_disturbance",label: "Schlafstörungen",                     core: true, deepen: "sleep" },
      { id: "appetite_decrease",label: "verminderter Appetit",                core: true },
    ],
  },
  {
    id: "B",
    title: "Kognitive Symptome",
    items: [
      { id: "indecision",       label: "Entscheidungsschwierigkeiten" },
      { id: "thinking_slowed",  label: "verlangsamtes Denken" },
      { id: "rumination",       label: "Grübeln", deepen: "rumination" },
      { id: "self_doubt",       label: "Selbstzweifel" },
      { id: "insufficiency",    label: "Insuffizienzgefühle" },
      { id: "worthlessness",    label: "Wertlosigkeitsgefühle" },
      { id: "hopelessness",     label: "Hoffnungslosigkeit" },
      { id: "future_anxiety",   label: "Zukunftsängste" },
      { id: "failure_anxiety",  label: "Versagensängste" },
      { id: "self_devaluation", label: "Selbstabwertung" },
      { id: "catastrophizing",  label: "Katastrophisieren" },
    ],
  },
  {
    id: "C",
    title: "Emotionale Symptome",
    items: [
      { id: "sadness", label: "Traurigkeit" },
      { id: "inner_emptiness", label: "innere Leere" },
      { id: "despair", label: "Verzweiflung" },
      { id: "helplessness", label: "Hilflosigkeit" },
      { id: "anxiety", label: "Angst" },
      { id: "shame", label: "Scham" },
      { id: "guilt_emo", label: "Schuld (emotional)" },
      { id: "irritability", label: "Reizbarkeit" },
      { id: "inner_restlessness", label: "innere Unruhe" },
      { id: "tension", label: "Anspannung" },
      { id: "emotional_numbness", label: "emotionale Taubheit" },
      { id: "feelinglessness", label: "Gefühl der Gefühllosigkeit" },
    ],
  },
  {
    id: "D",
    title: "Verhaltensebene",
    items: [
      { id: "social_withdrawal", label: "sozialer Rückzug", deepen: "withdrawal" },
      { id: "fewer_activities", label: "weniger Aktivitäten" },
      { id: "hobbies_dropped", label: "Hobbys aufgegeben" },
      { id: "avoidance_demands", label: "vermeidet Anforderungen" },
      { id: "avoidance_conflict", label: "vermeidet Konflikte" },
      { id: "bed_retreat", label: "bleibt liegen / zieht sich ins Bett zurück" },
      { id: "household_neglect", label: "Haushalt bleibt liegen" },
      { id: "self_care_reduced", label: "Körperpflege reduziert" },
      { id: "work_with_effort", label: "Arbeit nur unter großer Anstrengung" },
      { id: "presenteeism", label: "Präsentismus" },
      { id: "work_inability", label: "Arbeitsunfähigkeit" },
      { id: "overworking", label: "übermäßiges Arbeiten trotz Erschöpfung" },
      { id: "reassurance", label: "Rückversicherungsverhalten" },
      { id: "media_distraction", label: "Medienkonsum zur Ablenkung" },
      { id: "substance_regulation", label: "Alkohol/Essen/Medikamente zur Emotionsregulation" },
    ],
  },
  {
    id: "E",
    title: "Körperlich-vegetative Symptome",
    items: [
      { id: "sleep_onset",           label: "Einschlafstörungen" },
      { id: "sleep_maintenance",     label: "Durchschlafstörungen" },
      { id: "early_waking",          label: "Früherwachen" },
      { id: "non_restorative_sleep", label: "nicht erholsamer Schlaf" },
      { id: "hypersomnia",           label: "vermehrtes Schlafbedürfnis" },
      { id: "appetite_increase",     label: "Appetitsteigerung" },
      { id: "weight_loss",           label: "Gewichtsverlust" },
      { id: "weight_gain",           label: "Gewichtszunahme" },
      { id: "libido_loss",           label: "Libidoverlust" },
      { id: "tiredness",             label: "ausgeprägte Müdigkeit nach kleinen Anstrengungen" },
      { id: "exhaustion",            label: "Erschöpfung" },
      { id: "heaviness",             label: "Schweregefühl" },
      { id: "palpitations",          label: "Herzrasen" },
      { id: "sweating",              label: "Schwitzen" },
      { id: "pressure_feeling",      label: "Druckgefühl" },
      { id: "pain",                  label: "Schmerzen" },
      { id: "dizziness",             label: "Schwindel" },
      { id: "gi_complaints",         label: "Magen-/Darmbeschwerden" },
    ],
  },
  {
    id: "F",
    title: "Psychomotorik",
    items: [
      { id: "psychomotor_slowed", label: "psychomotorisch verlangsamt" },
      { id: "inhibited", label: "gehemmt" },
      { id: "mimic_reduced", label: "mimisch reduziert" },
      { id: "speech_slowed", label: "leise/verlangsamte Sprache" },
      { id: "motor_unrest", label: "motorisch unruhig" },
      { id: "agitated", label: "agitiert" },
      { id: "restless", label: "rastlos" },
      { id: "motor_tense", label: "motorisch angespannt" },
    ],
  },
  {
    id: "G",
    title: "Funktionsbeeinträchtigung",
    items: [
      { id: "impair_daily", label: "Alltag beeinträchtigt" },
      { id: "impair_work", label: "Arbeit/Ausbildung beeinträchtigt" },
      { id: "impair_household", label: "Haushalt beeinträchtigt" },
      { id: "impair_social", label: "soziale Kontakte beeinträchtigt" },
      { id: "impair_partner", label: "Partnerschaft/Familie beeinträchtigt" },
      { id: "impair_self_care", label: "Selbstfürsorge beeinträchtigt" },
      { id: "impair_leisure", label: "Freizeitgestaltung beeinträchtigt" },
      { id: "impair_caregiving", label: "Versorgung von Kindern/Angehörigen beeinträchtigt" },
    ],
  },
];

// Zusatzblock H — Manisch-Hypomane Symptome (erscheint bei F30/F31/F34.0)
window.SYMPTOM_BLOCKS.push({
  id: "H",
  title: "Manisch-Hypomane Symptome",
  items: [
    { id: "elated_mood",        label: "gehobene Stimmung (von leicht bis situationsinadäquat)" },
    { id: "drive_increased",    label: "gesteigerter Antrieb und Aktivität" },
    { id: "sleep_need_reduced", label: "vermindertes Schlafbedürfnis (ohne Müdigkeit)" },
    { id: "sociability",        label: "gesteigerte Geselligkeit und Gesprächigkeit" },
    { id: "overfamiliarity",    label: "übermäßige Vertraulichkeit" },
    { id: "libido_increased",   label: "gesteigerte Libido" },
    { id: "enhanced_capacity",  label: "Gefühl erhöhter körperlicher und seelischer Leistungsfähigkeit" },
    { id: "irritability_mania", label: "Reizbarkeit und Selbstüberschätzung (hypoman)" },
    { id: "pressure_of_speech", label: "Rededrang" },
    { id: "distractibility",    label: "starke Ablenkbarkeit und Aufmerksamkeitsstörung" },
    { id: "grandiosity",        label: "Größenideen und übertriebener Optimismus" },
    { id: "loss_inhibitions",   label: "Verlust sozialer Hemmungen" },
    { id: "reckless_behavior",  label: "leichtsinniges, rücksichtsloses Verhalten" },
    { id: "grandiose_delusion", label: "Größenwahn" },
    { id: "hallucinations_m",   label: "Halluzinationen (meist Stimmen)" },
    { id: "extreme_agitation",  label: "extreme Erregung und körperliche Aktivität" },
    { id: "flight_of_ideas",    label: "Ideenflucht bis zur Kommunikationsunfähigkeit" },
  ],
});

// Zusatzblock I — Anhaltende / Dysthyme Symptome (F34.x)
window.SYMPTOM_BLOCKS.push({
  id: "I",
  title: "Dysthyme / Anhaltende Symptome",
  items: [
    { id: "chronic_depressed",  label: "chronisch gedrückte Stimmung (mind. 2 Jahre)" },
    { id: "mood_instability",   label: "andauernde Stimmungsinstabilität (Jahre)" },
    { id: "drive_chronic_low",  label: "Antriebsarmut, chronische Müdigkeit" },
    { id: "hopelessness_chr",   label: "Hoffnungslosigkeit (chronisch)" },
  ],
});

// SYMPTOM_BY_ID neu aufbauen (enthält jetzt alle Blöcke inkl. H und I)
window.ALL_SYMPTOMS = window.SYMPTOM_BLOCKS.flatMap(b =>
  b.items.map(i => ({ ...i, blockId: b.id, blockTitle: b.title }))
);
window.SYMPTOM_BY_ID = Object.fromEntries(
  window.ALL_SYMPTOMS.map(s => [s.id, s])
);

// ── Diagnose-spezifische Kernsymptome ──────────────────────────────────
// Orientiert an ICD-10 F30–F39 (DIMDI-Quelle)
window.getDiagnosisCoreItems = function(code) {
  const S = window.SYMPTOM_BY_ID;
  if (!code || !S) return null;

  // Depression leicht (F32.0)
  const depLight = [
    S.mood_depressed, S.drive_reduced, S.anhedonia,
    S.concentration, S.low_self_worth, S.guilt,
    S.sleep_disturbance, S.appetite_decrease,
  ].filter(Boolean);

  // Depression mittelgradig (F32.1: + Müdigkeit, Libido, Früherwachen, Gewicht)
  const depMod = [
    ...depLight, S.tiredness, S.libido_loss, S.early_waking, S.weight_loss,
  ].filter(Boolean);

  // Depression schwer ohne Psychose (F32.2)
  const depSev = [
    S.mood_depressed, S.drive_reduced, S.anhedonia,
    S.low_self_worth, S.worthlessness, S.guilt,
    S.sleep_disturbance, S.weight_loss,
  ].filter(Boolean);

  // Depression schwer mit Psychose (F32.3)
  const depPsych = [
    ...depSev, S.psychomotor_slowed, S.hallucinations_m, S.inhibited,
  ].filter(Boolean);

  // Hypomanie (F30.0)
  const hypo = [
    S.elated_mood, S.drive_increased, S.sleep_need_reduced,
    S.sociability, S.overfamiliarity, S.libido_increased,
    S.enhanced_capacity, S.irritability_mania,
  ].filter(Boolean);

  // Manie ohne Psychose (F30.1)
  const mania = [
    S.elated_mood, S.drive_increased, S.pressure_of_speech,
    S.sleep_need_reduced, S.distractibility, S.grandiosity,
    S.loss_inhibitions, S.reckless_behavior,
  ].filter(Boolean);

  // Manie mit Psychose (F30.2)
  const maniaPsych = [
    S.elated_mood, S.drive_increased, S.grandiose_delusion,
    S.hallucinations_m, S.extreme_agitation, S.flight_of_ideas,
  ].filter(Boolean);

  // Gemischt (F31.6): je 3 Kern aus Manie und Depression
  const mixed = [
    S.elated_mood, S.drive_increased, S.sleep_need_reduced,
    S.mood_depressed, S.drive_reduced, S.hopelessness,
  ].filter(Boolean);

  // Zyklothymia (F34.0)
  const cyclo = [
    S.mood_instability, S.elated_mood, S.mood_depressed,
    S.sleep_need_reduced, S.drive_increased, S.drive_reduced,
  ].filter(Boolean);

  // Dysthymia (F34.1)
  const dysth = [
    S.chronic_depressed, S.drive_chronic_low, S.low_self_worth,
    S.sleep_disturbance, S.concentration, S.hopelessness_chr,
  ].filter(Boolean);

  const MAP = {
    "F30.0": hypo,     "F30.1": mania,     "F30.2": maniaPsych,
    "F31.0": hypo,     "F31.1": mania,     "F31.2": maniaPsych,
    "F31.3": depLight, "F31.4": depMod,    "F31.5": depPsych,
    "F31.6": mixed,    "F31.7": depLight,  "F31.8": hypo,
    "F32.0": depLight, "F32.1": depMod,    "F32.2": depSev,    "F32.3": depPsych,
    "F33.0": depLight, "F33.1": depMod,    "F33.2": depSev,    "F33.3": depPsych,
    "F33.4": depLight, "F34.0": cyclo,     "F34.1": dysth,
  };

  return MAP[code] || null;
};

// ── Kern → verwandte Symptome (für Auto-Vorschläge aus Blöcken B–I) ────
// Wenn ein Kernsymptom selektiert wird, werden die hier gelisteten verwandten
// Symptome aus späteren Blöcken automatisch als Vorschlag markiert.
window.CORE_TO_RELATED = {
  // Depressive Kernsymptome
  mood_depressed:    ["sadness", "inner_emptiness", "despair", "hopelessness", "feelinglessness", "emotional_numbness"],
  drive_reduced:     ["exhaustion", "tiredness", "fewer_activities", "hobbies_dropped", "psychomotor_slowed", "inhibited", "speech_slowed", "bed_retreat", "self_care_reduced", "household_neglect"],
  anhedonia:         ["fewer_activities", "hobbies_dropped", "social_withdrawal", "libido_loss", "emotional_numbness"],
  concentration:     ["thinking_slowed", "indecision", "rumination"],
  low_self_worth:    ["self_doubt", "insufficiency", "worthlessness", "self_devaluation", "shame"],
  guilt:             ["shame", "guilt_emo", "self_devaluation", "catastrophizing"],
  sleep_disturbance: ["sleep_onset", "sleep_maintenance", "early_waking", "non_restorative_sleep"],
  appetite_decrease: ["weight_loss"],

  // Zusatz-Kernsymptome aus F32.1/2/3, F33.x
  tiredness:         ["exhaustion", "non_restorative_sleep", "heaviness"],
  libido_loss:       ["anhedonia"],
  early_waking:      ["non_restorative_sleep", "sleep_maintenance"],
  weight_loss:       ["appetite_decrease"],
  worthlessness:     ["self_devaluation", "insufficiency", "low_self_worth", "hopelessness", "despair"],
  psychomotor_slowed: ["inhibited", "mimic_reduced", "speech_slowed"],
  hopelessness:      ["despair", "future_anxiety", "hopelessness_chr"],
  inhibited:         ["psychomotor_slowed", "speech_slowed", "mimic_reduced"],

  // Manisch-hypomane Kernsymptome (F30/F31, Manie-Tab)
  elated_mood:        ["sociability", "overfamiliarity", "enhanced_capacity", "irritability_mania"],
  drive_increased:    ["pressure_of_speech", "motor_unrest", "restless", "extreme_agitation"],
  sleep_need_reduced: ["motor_unrest", "restless"],
  sociability:        ["pressure_of_speech", "overfamiliarity"],
  pressure_of_speech: ["flight_of_ideas", "distractibility"],
  distractibility:    ["flight_of_ideas"],
  grandiosity:        ["loss_inhibitions", "reckless_behavior", "grandiose_delusion"],
  loss_inhibitions:   ["reckless_behavior", "overfamiliarity"],
  irritability_mania: ["irritability", "tension", "motor_tense"],
  overfamiliarity:    ["loss_inhibitions", "sociability"],

  // Dysthyme / anhaltende Kernsymptome (F34.x)
  chronic_depressed:  ["sadness", "inner_emptiness", "hopelessness_chr", "feelinglessness", "mood_depressed"],
  drive_chronic_low:  ["exhaustion", "tiredness", "fewer_activities", "hobbies_dropped", "drive_reduced"],
  hopelessness_chr:   ["future_anxiety", "despair", "hopelessness"],
  mood_instability:   ["irritability", "inner_restlessness", "tension"],
};

// Helper: aus allen aktuell selektierten Symptomen die Vorschlagsliste ableiten
// Rückgabe: { symId: [coreLabel, ...] } — Symptome, die selbst NICHT gewählt sind,
// aber zu einem gewählten Kernsymptom passen.
window.computeSuggestedSymptoms = function(selectedMap) {
  const out = {};
  const map = window.CORE_TO_RELATED || {};
  for (const sid of Object.keys(selectedMap || {})) {
    const related = map[sid];
    if (!related) continue;
    const coreLabel = window.SYMPTOM_BY_ID[sid]?.label || sid;
    for (const rid of related) {
      if (selectedMap[rid]) continue; // schon gewählt → kein Vorschlag mehr
      if (!out[rid]) out[rid] = [];
      if (!out[rid].includes(coreLabel)) out[rid].push(coreLabel);
    }
  }
  return out;
};

// Vertiefungen für ausgewählte Symptome
window.DEEPENINGS = {
  sleep: {
    title: "Vertiefung Schlafstörungen",
    fields: [
      { id: "art", label: "Art", multi: true, options: ["Einschlafen", "Durchschlafen", "Früherwachen", "nicht erholsam", "Tag-Nacht-Umkehr"] },
      { id: "freq", label: "Häufigkeit", options: ["gelegentlich", "mehrmals wöchentlich", "fast täglich"] },
    ],
  },
  rumination: {
    title: "Vertiefung Grübeln",
    fields: [
      { id: "topic", label: "Thema", multi: true, options: ["Versagen", "Schuld", "Zukunft", "Gesundheit", "Beziehung/Familie", "Arbeit", "Ursachen der Erkrankung"] },
      { id: "time", label: "Zeitpunkt", multi: true, options: ["morgens", "tagsüber", "abends", "nachts"] },
      { id: "function", label: "Funktion", multi: true, options: ["Problemlöseversuch", "Selbstanklage", "Vermeidung von Handlung", "Beruhigungsversuch"] },
    ],
  },
  withdrawal: {
    title: "Vertiefung sozialer Rückzug",
    fields: [
      { id: "area", label: "Bereich", multi: true, options: ["Freund:innen", "Familie", "Partnerschaft", "Kolleg:innen", "Freizeit"] },
      { id: "reason", label: "Grund", multi: true, options: ["keine Energie", "keine Freude", "Scham", "Überforderung", "Angst vor Bewertung", "Konfliktvermeidung"] },
      { id: "consequence", label: "Folge", multi: true, options: ["Einsamkeit", "weniger Unterstützung", "weniger positive Verstärker", "mehr Grübeln"] },
    ],
  },
};
