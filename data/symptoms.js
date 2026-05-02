// Symptomkatalog Depression — gruppiert nach Blöcken A–G
// Jedes Symptom hat eine id, ein Label, einen Block, optional eine Vertiefung
window.SYMPTOM_BLOCKS = [
  {
    id: "A",
    title: "Depressive Kernsymptome",
    items: [
      { id: "mood_depressed", label: "gedrückte Stimmung", core: true },
      { id: "anhedonia", label: "Interessenverlust", core: true },
      { id: "joylessness", label: "Freudlosigkeit", core: true },
      { id: "drive_reduced", label: "Antriebsminderung", core: true },
      { id: "fatigue_easy", label: "erhöhte Ermüdbarkeit" },
      { id: "activity_reduced", label: "verminderte Aktivität" },
    ],
  },
  {
    id: "B",
    title: "Kognitive Symptome",
    items: [
      { id: "concentration", label: "Konzentrationsstörungen" },
      { id: "indecision", label: "Entscheidungsschwierigkeiten" },
      { id: "thinking_slowed", label: "verlangsamtes Denken" },
      { id: "rumination", label: "Grübeln", deepen: "rumination" },
      { id: "self_doubt", label: "Selbstzweifel" },
      { id: "insufficiency", label: "Insuffizienzgefühle" },
      { id: "low_self_worth", label: "vermindertes Selbstwertgefühl" },
      { id: "guilt", label: "Schuldgefühle" },
      { id: "worthlessness", label: "Wertlosigkeitsgefühle" },
      { id: "hopelessness", label: "Hoffnungslosigkeit" },
      { id: "future_anxiety", label: "Zukunftsängste" },
      { id: "failure_anxiety", label: "Versagensängste" },
      { id: "self_devaluation", label: "Selbstabwertung" },
      { id: "catastrophizing", label: "Katastrophisieren" },
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
      { id: "sleep_disturbance", label: "Schlafstörungen", deepen: "sleep" },
      { id: "sleep_onset", label: "Einschlafstörungen" },
      { id: "sleep_maintenance", label: "Durchschlafstörungen" },
      { id: "early_waking", label: "Früherwachen" },
      { id: "non_restorative_sleep", label: "nicht erholsamer Schlaf" },
      { id: "hypersomnia", label: "vermehrtes Schlafbedürfnis" },
      { id: "appetite_decrease", label: "Appetitminderung" },
      { id: "appetite_increase", label: "Appetitsteigerung" },
      { id: "weight_loss", label: "Gewichtsverlust" },
      { id: "weight_gain", label: "Gewichtszunahme" },
      { id: "libido_loss", label: "Libidoverlust" },
      { id: "tiredness", label: "Müdigkeit" },
      { id: "exhaustion", label: "Erschöpfung" },
      { id: "heaviness", label: "Schweregefühl" },
      { id: "palpitations", label: "Herzrasen" },
      { id: "sweating", label: "Schwitzen" },
      { id: "pressure_feeling", label: "Druckgefühl" },
      { id: "pain", label: "Schmerzen" },
      { id: "dizziness", label: "Schwindel" },
      { id: "gi_complaints", label: "Magen-/Darmbeschwerden" },
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

// Schnellzugriff: alle Symptome flach
window.ALL_SYMPTOMS = window.SYMPTOM_BLOCKS.flatMap(b =>
  b.items.map(i => ({ ...i, blockId: b.id, blockTitle: b.title }))
);

window.SYMPTOM_BY_ID = Object.fromEntries(
  window.ALL_SYMPTOMS.map(s => [s.id, s])
);

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
