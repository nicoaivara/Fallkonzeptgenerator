// Schritt 10: Bericht — generiert aus übernommenen Elementen

// Aktenzeichen → erstes Buchstaben-Initial mit Punkt (z. B. "E260795" → "E.")
function initialFromRef(ref) {
  if (!ref) return "";
  const s = String(ref).trim();
  // erstes Zeichen, das ein Buchstabe ist
  for (const ch of s) {
    if (/\p{L}/u.test(ch)) return ch.toUpperCase() + ".";
  }
  return "";
}
window.initialFromRef = initialFromRef;

// Pronomen / Anrede aus Geschlecht ableiten
function pronouns(gender) {
  if (gender === "m") return {
    addrShort: "der Patient",   // Subjekt, kleingeschrieben mitten im Satz
    AddrShort: "Der Patient",   // Satzanfang
    person: "Herr",
    er_sie: "er", Er_Sie: "Er",
    ihn_sie: "ihn",
    ihm_ihr: "ihm",
    sein_ihr: "sein",          // Possessiv (sein/seine je nach Genus des Bezugswortes)
    seine_ihre: "seine",
  };
  if (gender === "w") return {
    addrShort: "die Patientin",
    AddrShort: "Die Patientin",
    person: "Frau",
    er_sie: "sie", Er_Sie: "Sie",
    ihn_sie: "sie",
    ihm_ihr: "ihr",
    sein_ihr: "ihr",
    seine_ihre: "ihre",
  };
  // divers / unbestimmt
  return {
    addrShort: "die Person",
    AddrShort: "Die Person",
    person: "",
    er_sie: "die Person", Er_Sie: "Die Person",
    ihn_sie: "die Person",
    ihm_ihr: "der Person",
    sein_ihr: "deren",
    seine_ihre: "deren",
  };
}
window.pronouns = pronouns;

function StepReport({ state, go }) {
  const tone = state._tweaks?.tone || "knapp";
  const sel = Object.keys(state.symptoms);
  const lead = sel.filter(id => state.symptoms[id] === "lead");
  const present = sel.filter(id => state.symptoms[id] === "present");

  const labelsLead = lead.map(id => window.SYMPTOM_BY_ID[id]?.label).filter(Boolean);
  const labelsPresent = present.map(id => window.SYMPTOM_BY_ID[id]?.label).filter(Boolean);

  const acceptedFindings = Object.values(state.findings.proposed).filter(f => f?.status === "accepted");
  const findingsByArea = {};
  for (const f of acceptedFindings) {
    const txt = f.edited || (Object.entries(window.SYMPTOM_TO_FINDING).find(([k]) => f.id === `f_${k}`)?.[1].text);
    const area = Object.entries(window.SYMPTOM_TO_FINDING).find(([k]) => f.id === `f_${k}`)?.[1].area || "Sonstiges";
    if (!findingsByArea[area]) findingsByArea[area] = [];
    if (txt) findingsByArea[area].push(txt);
  }
  const unauf = Object.keys(state.findings.unauffaellig);

  const acceptedDx = Object.entries(state.diagnoses.proposed).filter(([_, v]) => v?.status === "accepted");

  const acceptedMechs = window.MECHANISMS.filter(m => state.mechanisms[m.id]?.status === "accepted");
  const acceptedGoals = Object.values(state.goals).filter(g => g.status === "accepted");
  const acceptedMethods = Object.entries(state.plan).filter(([_, v]) => v?.status === "accepted");

  function copyToClipboard() {
    const txt = document.querySelector(".report")?.innerText || "";
    navigator.clipboard?.writeText(txt);
    alert("Bericht in Zwischenablage kopiert.");
  }

  return (
    <>
      <div className="page-head">
        <div className="crumb">Schritt 10</div>
        <h1>Bericht</h1>
        <p>Generiert aus den geprüften Elementen. Druck/PDF über den Browser-Druckdialog (A4 optimiert).</p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button className="btn primary" onClick={() => window.print()}>Drucken / als PDF speichern</button>
        <button className="btn" onClick={copyToClipboard}>Text kopieren</button>
      </div>

      <div className="report-wrap">
        <article className="report">
          <h1>{state.meta.antrag}: Bericht zur Begründung</h1>
          {(() => {
            const p = pronouns(state.basics.gender);
            const ini = state.meta.patientInitials;
            const label = ini
              ? (p.person ? `${p.person} ${ini}` : ini)
              : (state.basics.gender ? p.AddrShort : "Pat. (anonym)");
            return (
              <div className="report-meta">
                {label} · {state.basics.age ? `${state.basics.age} J.` : ""}
                {state.basics.occupation ? ` · ${state.basics.occupation}` : ""}
                {state.basics.family ? ` · ${state.basics.family}` : ""}
                {" · "}{state.meta.verfahren} · {state.meta.domain} · Datum: {state.meta.datum}
              </div>
            );
          })()}

          <h2>1 Soziodemografische Daten</h2>
          {(() => {
            const b = state.basics;
            const m = state.meta;
            const p = pronouns(b.gender);
            if (b.sociodemographic && b.sociodemographic.trim()) {
              return <p>{b.sociodemographic}</p>;
            }
            // Aus Strukturfeldern automatisch zusammensetzen (Konjunktiv I)
            const parts = [];
            const addr = m.patientInitials
              ? (p.person ? `${p.person} ${m.patientInitials}` : m.patientInitials)
              : p.AddrShort;
            const opener = [];
            if (b.age) opener.push(`sei ${b.age} Jahre alt`);
            if (b.family) opener.push(b.family);
            if (opener.length) parts.push(`${addr} ${opener.join(", ")}.`);
            if (b.occupation) parts.push(`${p.Er_Sie} arbeite als ${b.occupation}.`);
            if (b.kids && b.kids.toLowerCase() !== "nein" && b.kids !== "") parts.push(`Kinder: ${b.kids}.`);
            if (b.workability) parts.push(`Aktuelle Arbeitsfähigkeit: ${b.workability}.`);
            return parts.length
              ? <p>{parts.join(" ")}</p>
              : <p><em>— keine soziodemografischen Angaben —</em></p>;
          })()}

          <h2>2 Symptomatik</h2>
          {labelsLead.length === 0 && labelsPresent.length === 0 ? (
            <p><em>— keine Symptomatik dokumentiert —</em></p>
          ) : (
            <>
              <p>
                Im Vordergrund stehen{" "}
                {labelsLead.length > 0 ? <>{listJoin(labelsLead)}</> : <em>keine markierten Leitsymptome</em>}.
                {labelsPresent.length > 0 && <> Daneben bestehen {listJoin(labelsPresent.slice(0, 12))}{labelsPresent.length > 12 ? " u.a." : ""}.</>}
              </p>
              {state.course.duration && (
                <p>
                  Die Beschwerden bestehen <strong>{state.course.duration}</strong>
                  {state.course.onset ? <>, der Beginn wurde als <strong>{state.course.onset}</strong> beschrieben</> : null}
                  {state.course.progression ? <>, der Verlauf ist <strong>{state.course.progression}</strong></> : null}.
                  {state.course.impairment && <> Die Beeinträchtigung wird als <strong>{state.course.impairment}</strong> eingeschätzt.</>}
                </p>
              )}
              {state.course.reasonNow && (
                <p><em>Aktueller Behandlungsanlass:</em> {state.course.reasonNow}</p>
              )}
            </>
          )}

          <h2>3 Psychischer Befund</h2>
          {Object.keys(findingsByArea).length === 0 && unauf.length === 0 ? (
            <p><em>— Befund noch nicht übernommen —</em></p>
          ) : (
            <>
              {Object.entries(findingsByArea).map(([area, items]) => (
                <p key={area}><strong>{area}:</strong> {items.join("; ")}.</p>
              ))}
              {unauf.length > 0 && <p><strong>Geprüft unauffällig:</strong> {unauf.join("; ")}.</p>}
              {state.findings.freeNotes && <p>{state.findings.freeNotes}</p>}
            </>
          )}

          <h2>4 Suizidalität & Risiko</h2>
          <p>
            Suizidalität: <strong>{state.risk.suicidality || "—"}</strong>
            {state.risk.distancing ? <>, {state.risk.distancing}</> : null}.
            {Object.keys(state.risk.protective).length > 0 && <> Schutzfaktoren: {Object.keys(state.risk.protective).join(", ")}.</>}
            {Object.keys(state.risk.risks).length > 0 && <> Risikofaktoren: {Object.keys(state.risk.risks).join(", ")}.</>}
          </p>
          {state.risk.crisisPlan && <p><strong>Risikomanagement:</strong> {state.risk.crisisPlan}</p>}

          <h2>5 Differentialdiagnostik</h2>
          <p>
            Bipolaritätscheck: {state.bipolarity.result === "kein Hinweis" ? "kein Hinweis" : state.bipolarity.result === "unclear" ? "unklar, weiter zu prüfen" : "Hinweis auf Hypomanie/Manie"}.
            {" "}Psychosecheck: {state.psychosis.any ? "auffällig — DD/Schweregrad zu prüfen" : "unauffällig"}.
            {" "}Substanz/Somatik: {state.somatic.status}.
          </p>
          {state.diagnoses.ddNotes && <p>{state.diagnoses.ddNotes}</p>}

          <h2>6 Diagnose</h2>
          {(state.meta.icdCodes || []).length > 0 && (
            <ul>
              {state.meta.icdCodes.map(c => {
                const it = window.icdLookup(c.code);
                return <li key={c.code}><strong>{c.code} {c.specifier}</strong> — {it?.label || ""}</li>;
              })}
            </ul>
          )}
          {state.diagnoses.icd && <p><strong>Weitere ICD:</strong> {state.diagnoses.icd}</p>}
          {acceptedDx.length === 0 ? (
            (!state.diagnoses.icd && (state.meta.icdCodes || []).length === 0) && <p><em>— noch keine Diagnose übernommen —</em></p>
          ) : (
            <ul>{acceptedDx.map(([k, v]) => <li key={k}><strong>{v.label}</strong> ({v.certainty}) — {v.reasoning}</li>)}</ul>
          )}

          <h2>7 Fallmodell</h2>
          {acceptedMechs.length === 0 ? <p><em>— noch keine Hypothesen übernommen —</em></p> : (
            acceptedMechs.map(m => {
              const acc = state.mechanisms[m.id].acceptedItems || {};
              const matched = window.scoreMechanism(m, new Set(sel)).matched;
              const symLabels = matched.map(x => window.SYMPTOM_BY_ID[x.id]?.label).filter(Boolean);
              return (
                <div key={m.id} style={{ marginBottom: "10pt" }}>
                  <p><strong>{m.label}.</strong> Hergeleitet aus: {symLabels.join(", ")}.</p>
                  {(acc.maintainers?.length > 0) && <p><em>Aufrechterhaltend:</em> {acc.maintainers.join("; ")}.</p>}
                  {(acc.predispositions?.length > 0) && <p><em>Prädispositionen:</em> {acc.predispositions.join("; ")}.</p>}
                  {(acc.beliefs?.length > 0) && <p><em>Grundannahmen:</em> {acc.beliefs.map(b => `\u201e${b}\u201c`).join("; ")}.</p>}
                </div>
              );
            })
          )}

          <h2>8 Therapieziele</h2>
          {acceptedGoals.length === 0 ? <p><em>— keine Ziele übernommen —</em></p> : (
            <ul>{acceptedGoals.map(g => <li key={g.label}>{g.label}</li>)}</ul>
          )}

          <h2>9 Behandlungsplan</h2>
          {acceptedMethods.length === 0 ? <p><em>— noch kein Plan zusammengestellt —</em></p> : (
            <ul>{acceptedMethods.map(([m, v]) => (
              <li key={m}>
                <strong>{m}</strong>
                {tone === "ausführlich" && v.reason ? <> — vorgesehen wegen: {v.reason}</> : null}
              </li>
            ))}</ul>
          )}

          <h2>10 Prognose</h2>
          <p>{state.prognosis.formulation || "— Prognose-Formulierung noch nicht erstellt —"}</p>

          {state.meta.antrag === "Umwandlungsantrag" && (
            <>
              <h2>11 Umwandlungsbegründung</h2>
              {(() => {
                const sc = state.conversion.symptomChange || {};
                const verbessert = Object.entries(sc).filter(([_, v]) => v === "gebessert" || v === "teilweise gebessert").map(([sid]) => window.SYMPTOM_BY_ID[sid]?.label).filter(Boolean);
                const fortbestehend = Object.entries(sc).filter(([_, v]) => v === "unverändert" || v === "verschlechtert").map(([sid]) => window.SYMPTOM_BY_ID[sid]?.label).filter(Boolean);
                return (
                  <p>
                    Im bisherigen Verlauf habe sich {verbessert.length ? <>{listJoin(verbessert)} (zumindest teilweise) gebessert</> : "noch keine deutliche Besserung gezeigt"}
                    , während {fortbestehend.length ? <>{listJoin(fortbestehend)}</> : "weitere Symptome"} weiterhin behandlungsbedürftig fortbestehen.
                    {state.conversion.reasoning && <> {state.conversion.reasoning}</>}
                  </p>
                );
              })()}
            </>
          )}
        </article>
      </div>

      <NavRow go={go} primaryLabel="Fertig" onPrimary={() => window.print()} />
    </>
  );
}

window.StepReport = StepReport;
