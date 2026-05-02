// Mapping Symptomatik → Befundvorschläge (AMDP-orientiert)
window.SYMPTOM_TO_FINDING = {
  mood_depressed:        { area: "Affektivität",          text: "affektiv deprimiert/gedrückt" },
  inner_emptiness:       { area: "Affektivität",          text: "Gefühl der inneren Leere; Gefühl der Gefühllosigkeit zu prüfen" },
  feelinglessness:       { area: "Affektivität",          text: "Gefühl der Gefühllosigkeit" },
  anhedonia:             { area: "Affektivität",          text: "Schwingungsfähigkeit eingeschränkt" },
  joylessness:           { area: "Affektivität",          text: "freudlos" },
  insufficiency:         { area: "Affektivität",          text: "Insuffizienzgefühle" },
  guilt:                 { area: "Affektivität",          text: "Schuldgefühle (bei Realitätsverlust Schuldwahn prüfen)" },
  hopelessness:          { area: "Affektivität",          text: "hoffnungslos" },
  inner_restlessness:    { area: "Affektivität",          text: "innerlich unruhig" },
  tension:               { area: "Affektivität",          text: "angespannt" },
  irritability:          { area: "Affektivität",          text: "reizbar" },
  drive_reduced:         { area: "Antrieb/Psychomotorik", text: "antriebsarm/antriebsgehemmt" },
  psychomotor_slowed:    { area: "Antrieb/Psychomotorik", text: "psychomotorisch verlangsamt" },
  inhibited:             { area: "Antrieb/Psychomotorik", text: "gehemmt" },
  mimic_reduced:         { area: "Antrieb/Psychomotorik", text: "mimisch reduziert" },
  speech_slowed:         { area: "Antrieb/Psychomotorik", text: "leise/verlangsamte Sprache" },
  motor_unrest:          { area: "Antrieb/Psychomotorik", text: "motorisch unruhig" },
  agitated:              { area: "Antrieb/Psychomotorik", text: "agitiert" },
  concentration:         { area: "Aufmerksamkeit/Gedächtnis", text: "Konzentration und Aufmerksamkeit eingeschränkt" },
  thinking_slowed:       { area: "Denken (formal)",       text: "verlangsamtes Denken" },
  rumination:            { area: "Denken (formal)",       text: "grübelnd, Gedankenkreisen, eingeengt" },
  catastrophizing:       { area: "Denken (inhaltlich)",   text: "katastrophisierende Inhalte" },
  worthlessness:         { area: "Denken (inhaltlich)",   text: "Wertlosigkeitsgefühle" },
  self_devaluation:      { area: "Denken (inhaltlich)",   text: "Selbstabwertung" },
  sleep_disturbance:     { area: "Vegetativ/Zirkadian",   text: "Schlafstörungen" },
  early_waking:          { area: "Vegetativ/Zirkadian",   text: "Früherwachen" },
  appetite_decrease:     { area: "Vegetativ/Zirkadian",   text: "Appetitminderung" },
  appetite_increase:     { area: "Vegetativ/Zirkadian",   text: "Appetitsteigerung" },
  weight_loss:           { area: "Vegetativ/Zirkadian",   text: "Gewichtsverlust" },
  libido_loss:           { area: "Vegetativ/Zirkadian",   text: "Libidoverlust" },
  social_withdrawal:     { area: "Andere Auffälligkeiten", text: "sozialer Rückzug" },
};

// AMDP-Bereiche, die als „geprüft unauffällig" angeboten werden
window.UNAUFFAELLIG_CHIPS = [
  "bewusstseinsklar",
  "zu allen Qualitäten orientiert",
  "keine Wahrnehmungsstörungen",
  "keine Ich-Störungen",
  "kein Wahn",
  "keine Fremdgefährdung",
  "Gedächtnisleistungen klinisch unauffällig",
  "formal-logisches Denken erhalten",
];

// Symptom → direkte Aufrechterhaltung
window.SYMPTOM_TO_MAINTAINER = {
  social_withdrawal:    "weniger positive Verstärker, weniger soziale Unterstützung",
  rumination:           "Stimmungsverschlechterung und Handlungsblockade",
  sleep_disturbance:    "Erschöpfung, Konzentrationsminderung, weniger Aktivität",
  self_devaluation:     "Hoffnungslosigkeit, Vermeidung, Selbstwertsenkung",
  drive_reduced:        "weniger Aktivität, weniger Erfolgserlebnisse",
  avoidance_conflict:   "ungelöste Belastungen, Überlastung",
  overworking:          "Erschöpfung, fehlende Erholung",
  substance_regulation: "kurzfristige Entlastung, langfristige Problemerhaltung",
  hobbies_dropped:      "Verlust positiver Verstärker, mehr Leerlauf",
  anhedonia:            "kein Belohnungserleben, Aktivitätsabfall",
};

// Ziel → Methodenvorschläge
window.GOAL_TO_METHODS = [
  { match: /Tagesstruktur|Tagesablauf/i,     methods: ["Aktivitätsmonitoring", "Wochenplanung", "Verhaltensaktivierung"] },
  { match: /positive Aktivit/i,              methods: ["Verstärkeraufbau", "angenehme Aktivitäten", "Genusstraining"] },
  { match: /Grübeln/i,                       methods: ["Grübelzeit", "Aufmerksamkeitslenkung", "Problemlösetraining", "metakognitive Distanzierung"] },
  { match: /Selbstabwertung|Selbstwert/i,    methods: ["kognitive Umstrukturierung", "sokratischer Dialog", "Arbeit an Grundannahmen"] },
  { match: /Perfektion|Leistungsansprüche/i, methods: ["Anspruchsprüfung", "Verhaltensexperimente", "Übungen zu \u201eausreichend gut\u201c" ] },
  { match: /Abgrenzung|Bedürfnisse/i,        methods: ["soziales Kompetenztraining", "Rollenspiele", "Nein-Sagen-Übungen"] },
  { match: /Schuld/i,                        methods: ["Verantwortlichkeitsprüfung", "Perspektivwechsel", "kognitive Schuldarbeit"] },
  { match: /Schlaf/i,                        methods: ["Schlafprotokoll", "Schlafhygiene", "Tagesrhythmus", "Grübelmanagement"] },
  { match: /Stress|Belastung|Erholung/i,     methods: ["Stressmodell", "Belastungs-Erholungs-Bilanz", "Entspannungsverfahren"] },
  { match: /Rückfall/i,                      methods: ["Frühwarnzeichen", "Krisenplan", "Rückfallprophylaxe"] },
  { match: /Trauer|Verlust/i,                methods: ["emotionsfokussierte Bearbeitung", "Werte- und Lebenszielklärung"] },
  { match: /soziale Kontakte|sozialer Aufbau/i, methods: ["soziale Aktivierung", "Verhaltensaktivierung"] },
];

// Diagnose-Plausibilisierung
window.computeDiagnosisProposal = function(state) {
  const sel = new Set(state.selectedSymptoms || []);
  const coreCount = ["mood_depressed","anhedonia","joylessness","drive_reduced","fatigue_easy"].filter(id => sel.has(id)).length;
  const additional = ["concentration","insufficiency","guilt","hopelessness","sleep_disturbance","appetite_decrease","weight_loss","self_devaluation","low_self_worth"].filter(id => sel.has(id)).length;
  const dur = state.course?.duration || "";
  const longEnough = ["2–4 Wochen","1–3 Monate","3–6 Monate","6–12 Monate","über 12 Monate"].includes(dur);
  const impair = state.course?.impairment || "leicht";
  const proposals = [];

  if (coreCount >= 2 && longEnough) {
    let severity = "leicht";
    if (additional >= 4 || impair === "schwer" || impair === "sehr schwer") severity = "schwer";
    else if (additional >= 2 || impair === "mittel") severity = "mittel";
    proposals.push({
      key: "depressive_episode",
      label: `Depressive Episode, ${severity}gradig`,
      reasoning: `${coreCount} Hauptsymptom(e), ${additional} Zusatzsymptom(e), Dauer ${dur || "n.a."}, Beeinträchtigung ${impair}.`,
    });
  }
  if (state.course?.onset === "rezidivierend") {
    proposals.push({ key: "recurrent", label: "Rezidivierende depressive Störung prüfen", reasoning: "Verlauf wurde als rezidivierend angegeben." });
  }
  if (state.psychosis?.any) {
    proposals.push({ key: "psychotic", label: "Psychotisch-depressive Episode prüfen", reasoning: "Psychosecheck positiv – Schweregrad und DD anpassen." });
  }
  if (state.bipolarity?.result === "hint" || state.bipolarity?.result === "unclear") {
    proposals.push({ key: "bipolar_dd", label: "Bipolare Störung differentialdiagnostisch prüfen", reasoning: "Hinweise im Bipolaritätscheck – DD nicht geschlossen." });
  }
  if (!longEnough && coreCount >= 1) {
    proposals.push({ key: "adjustment", label: "Anpassungsstörung prüfen", reasoning: "Symptomatik vorhanden, Dauer/Schweregrad noch nicht eindeutig depressiv." });
  }
  if (state.somatic?.flagged) {
    proposals.push({ key: "somatic_dd", label: "Somatische/substanzinduzierte Ursache prüfen", reasoning: "Im Substanz-/Somatikcheck wurden Auffälligkeiten markiert." });
  }
  return proposals;
};
