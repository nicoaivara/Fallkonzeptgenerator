// Schritte 1-4: Basisdaten, Symptome, Verlauf, Risiko/DD
const { useState: uS1, useMemo: uM1 } = React;

// ── 1. Basisdaten ─────────────────────────────────────
function StepBasics({ state, update, go }) {
  const m = state.meta, b = state.basics;
  return (
    <>
      <div className="page-head">
        <div className="crumb">Schritt 1</div>
        <h1>Basisdaten & Verfahren</h1>
        <p>Grundinformationen zum Fall und zum Verfahren. Steuert, welche Module geladen werden.</p>
      </div>

      {/* Verfahren Section */}
      <div className="card">
        <div className="card-head"><h3>Verfahren</h3></div>
        <div className="row-2">
          <label className="field">Antragstyp
            <div className="button-group">
              {["Erstantrag", "Umwandlungsantrag"].map(opt => (
                <button
                  key={opt}
                  className={`btn-toggle ${m.antrag === opt ? 'active' : ''}`}
                  onClick={() => update("meta", { antrag: opt })}
                >
                  {opt}
                </button>
              ))}
            </div>
          </label>
        </div>
      </div>

      {/* Patientendaten Section */}
      <div className="card">
        <div className="card-head">
          <h3>Patient:in — Kernangaben</h3>
          <span className="meta">erforderlich für Bericht</span>
        </div>
        <div className="row-4">
          <label className="field">Geschlecht
            <select className="input" value={b.gender || ""} onChange={e => update("basics", { gender: e.target.value })}>
              <option value="">— wählen —</option>
              <option value="m">Männlich</option>
              <option value="w">Weiblich</option>
              <option value="d">Divers</option>
            </select>
          </label>
          <label className="field">Aktenzeichen / Initialen
            <input className="input" value={m.patientInitials} onChange={e => update("meta", { patientInitials: e.target.value })} placeholder="z. B. E260795" />
          </label>
          <label className="field">Alter
            <input className="input" type="number" value={b.age} onChange={e => update("basics", { age: e.target.value })} placeholder="38" min="0" max="120" />
          </label>
          <label className="field">Datum der Bearbeitung
            <input className="input" type="date" value={m.datum} onChange={e => update("meta", { datum: e.target.value })} />
          </label>
        </div>
      </div>

      {/* Soziale Situation Section */}
      <div className="card">
        <div className="card-head"><h3>Soziale Situation</h3></div>
        <div className="row-2">
          <label className="field">Beruf / Tätigkeit
            <input className="input" value={b.occupation} onChange={e => update("basics", { occupation: e.target.value })} placeholder="z. B. Ingenieurin, Kaufmann, Lehrerin" />
          </label>
          <label className="field">Beschäftigungsstatus
            <select className="input" value={b.employmentStatus || ""} onChange={e => update("basics", { employmentStatus: e.target.value })}>
              <option value="">— wählen —</option>
              <option value="Vollzeit beschäftigt">Vollzeit beschäftigt</option>
              <option value="Teilzeit beschäftigt">Teilzeit beschäftigt</option>
              <option value="Selbstständig / freiberuflich">Selbstständig / freiberuflich</option>
              <option value="Arbeitslos / arbeitssuchend">Arbeitslos / arbeitssuchend</option>
              <option value="In Ausbildung / Studium">In Ausbildung / Studium</option>
              <option value="Haushaltsführung">Haushaltsführung</option>
              <option value="Frühberentet">Frühberentet</option>
              <option value="Regulär berentet">Regulär berentet</option>
            </select>
          </label>
          <label className="field">Familienstand
            <select className="input" value={b.familienstand || ""} onChange={e => update("basics", { familienstand: e.target.value })}>
              <option value="">— wählen —</option>
              <option value="ledig">Ledig</option>
              <option value="in fester Partnerschaft">In fester Partnerschaft</option>
              <option value="verheiratet">Verheiratet</option>
              <option value="in eingetragener Lebenspartnerschaft">Eingetragene Lebenspartnerschaft</option>
              <option value="getrennt lebend">Getrennt lebend</option>
              <option value="geschieden">Geschieden</option>
              <option value="verwitwet">Verwitwet</option>
            </select>
          </label>
          <label className="field">Wohnsituation
            <select className="input" value={b.wohnsituation || ""} onChange={e => update("basics", { wohnsituation: e.target.value })}>
              <option value="">— wählen —</option>
              <option value="allein lebend">Allein lebend</option>
              <option value="mit Partner/in">Mit Partner/in</option>
              <option value="mit Familie">Mit Familie</option>
              <option value="bei Eltern / Angehörigen">Bei Eltern / Angehörigen</option>
              <option value="in Wohngemeinschaft">In Wohngemeinschaft</option>
              <option value="in betreutem Wohnen">In betreutem Wohnen</option>
              <option value="im Wohnheim">Im Wohnheim</option>
              <option value="ohne festen Wohnsitz">Ohne festen Wohnsitz</option>
            </select>
          </label>
          <label className="field">Kinder
            <select className="input" value={b.kidsCount || ""} onChange={e => update("basics", { kidsCount: e.target.value })}>
              <option value="">— wählen —</option>
              <option value="keine Kinder">Keine Kinder</option>
              <option value="1 Kind">1 Kind</option>
              <option value="2 Kinder">2 Kinder</option>
              <option value="3 Kinder">3 Kinder</option>
              <option value="4 oder mehr Kinder">4 oder mehr Kinder</option>
            </select>
          </label>
          <label className="field">Kinder — Details (Alter, Sorgerecht o.ä.)
            <input className="input" value={b.kidsNotes || ""} onChange={e => update("basics", { kidsNotes: e.target.value })} placeholder="z. B. 8 und 11 Jahre, im Haushalt" />
          </label>
          <label className="field">Aktuelle Arbeitsfähigkeit
            <select className="input" value={b.workability || ""} onChange={e => update("basics", { workability: e.target.value })}>
              <option value="">— wählen —</option>
              <option value="vollständig arbeitsfähig">Vollständig arbeitsfähig</option>
              <option value="eingeschränkt arbeitsfähig">Eingeschränkt arbeitsfähig</option>
              <option value="aktuell krankgeschrieben">Aktuell krankgeschrieben</option>
              <option value="Langzeit-Arbeitsunfähigkeit">Langzeit-Arbeitsunfähigkeit</option>
              <option value="im Rentenverfahren">Im Rentenverfahren</option>
              <option value="Erwerbsminderungsrente">Erwerbsminderungsrente</option>
              <option value="nicht im Erwerbsleben">Nicht im Erwerbsleben</option>
            </select>
          </label>
        </div>
      </div>

      <NavRow go={go} />
    </>
  );
}

// Styles for button groups
if (!document.getElementById('basics-styles')) {
  const style = document.createElement('style');
  style.id = 'basics-styles';
  style.textContent = `
    .button-group {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 6px;
    }
    .btn-toggle {
      flex: 1;
      min-width: 120px;
      padding: 10px 14px;
      border: 2px solid var(--card-border);
      background: white;
      border-radius: 8px;
      color: var(--text-secondary);
      font-weight: 500;
      cursor: pointer;
      transition: all 120ms;
      font-family: inherit;
    }
    .btn-toggle:hover:not(:disabled) {
      border-color: var(--accent);
      background: var(--accent-soft);
      color: var(--accent);
    }
    .btn-toggle.active {
      background: var(--accent);
      border-color: var(--accent);
      color: white;
      box-shadow: 0 2px 8px rgba(44, 90, 160, 0.2);
    }
    .btn-toggle:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
  document.head.appendChild(style);
}

// Styles für vorgeschlagene Symptom-Chips
if (!document.getElementById('symptom-suggest-styles')) {
  const style = document.createElement('style');
  style.id = 'symptom-suggest-styles';
  style.textContent = `
    /* Statisches ★-Symbol auf Leitsymptom-Chips */
    .chip .lead-marker {
      font-size: 13px;
      line-height: 1;
      color: inherit;
      opacity: 0.95;
      margin-right: -2px;
    }

    .chip.suggested {
      border-color: var(--accent);
      border-style: dashed;
      background: var(--accent-soft);
      color: var(--accent-ink);
    }
    .chip.suggested:hover {
      background: var(--accent);
      color: white;
      border-style: solid;
    }
    .chip.suggested .suggest-badge {
      display: inline-flex;
      align-items: center;
      padding: 1px 6px;
      margin-left: 4px;
      background: white;
      color: var(--accent-ink);
      border: 1px solid var(--accent);
      border-radius: 4px;
      font-family: var(--font-mono);
      font-size: 10px;
      line-height: 1.6;
      max-width: 180px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .chip.suggested:hover .suggest-badge {
      background: var(--accent-soft);
      color: var(--accent-ink);
      border-color: white;
    }

    /* ── Leitsymptom-Picker ─────────────────────────────────── */
    .lead-picker-card {
      border-left: 3px solid var(--accent);
      background: linear-gradient(to right, var(--accent-soft), white 40%);
    }
    .lead-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .lead-pick {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 7px 12px;
      border: 1.5px solid var(--card-border);
      background: white;
      color: var(--text-secondary);
      border-radius: 7px;
      cursor: pointer;
      font-family: inherit;
      font-size: 13px;
      transition: all 120ms;
    }
    .lead-pick:hover {
      border-color: var(--accent);
      color: var(--text-primary);
    }
    .lead-pick.is-lead {
      background: var(--accent);
      border-color: var(--accent);
      color: white;
      box-shadow: 0 1px 3px rgba(44, 90, 160, 0.18);
    }
    .lead-pick .lead-pick-icon {
      font-size: 14px;
      line-height: 1;
      color: var(--text-tertiary);
    }
    .lead-pick.is-lead .lead-pick-icon {
      color: white;
    }

    .symptom-legend {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 18px;
      align-items: center;
      padding: 10px 14px;
      margin-bottom: 12px;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      background: var(--card-bg, #fafbfc);
      font-size: 12px;
      color: var(--text-secondary);
    }
    .symptom-legend .lg-item { display: inline-flex; align-items: center; gap: 6px; }
    .symptom-legend .lg-swatch {
      display: inline-block;
      width: 14px;
      height: 14px;
      border-radius: 4px;
      border: 1px solid var(--card-border);
    }
    .symptom-legend .lg-swatch.present { background: var(--text-primary); border-color: var(--text-primary); }
    .symptom-legend .lg-swatch.lead    { background: var(--accent); border-color: var(--accent); }
    .symptom-legend .lg-swatch.suggested {
      background: var(--accent-soft);
      border: 1px dashed var(--accent);
    }
    .symptom-legend .lg-star { color: var(--accent); font-size: 14px; line-height: 1; }
  `;
  document.head.appendChild(style);
}

function IcdPicker({ meta, update }) {
  const codes = meta.icdCodes || [];
  const grouped = window.icdGroupedFor(meta.domain);
  const specifiers = window.ICD_SPECIFIERS;

  const allConflicts = React.useMemo(
    () => window.getIcdConflicts(codes.map(c => c.code)),
    [JSON.stringify(codes)]
  );
  const blockings = allConflicts.filter(c => c.blocking);
  const warnings  = allConflicts.filter(c => !c.blocking);

  function setSpec(code, specifier) {
    update("meta", { icdCodes: codes.map(c => c.code === code ? { ...c, specifier } : c) });
  }
  function remove(code) {
    update("meta", { icdCodes: codes.filter(c => c.code !== code) });
  }
  function addCode(code) {
    if (codes.find(c => c.code === code)) return;
    const { ok, conflicts } = window.canAddIcdCode(codes, code);
    if (!ok) { alert(conflicts.map(c => c.message).join("\n")); return; }
    update("meta", { icdCodes: [...codes, { code, specifier: "G" }] });
  }

  if (!grouped.length) {
    return (
      <div className="card">
        <div className="card-head"><h3>ICD-10 Diagnosen</h3></div>
        <p className="hint">Für diesen Bereich liegt aktuell kein Katalog vor.</p>
      </div>
    );
  }

  return (
    <div className="card icd-card">
      <div className="card-head">
        <h3>ICD-10 Diagnosen</h3>
        <span className="meta">{codes.length} ausgewählt</span>
      </div>

      {/* Konflikte */}
      {blockings.length > 0 && (
        <div className="alert danger" style={{ marginBottom: 10 }}>
          <h4>Diagnostischer Widerspruch</h4>
          {blockings.map((c, i) => <p key={i} style={{ margin: "4px 0", fontSize: 12 }}>{c.message}</p>)}
        </div>
      )}
      {warnings.length > 0 && (
        <div className="alert" style={{ marginBottom: 10 }}>
          <h4>Hinweis</h4>
          {warnings.map((c, i) => <p key={i} style={{ margin: "4px 0", fontSize: 12 }}>{c.message}</p>)}
        </div>
      )}

      {/* Ausgewählte Diagnosen */}
      {codes.length > 0 && (
        <div className="icd-selected">
          <div className="icd-selected-label">Ausgewählte Diagnosen</div>
          <ul className="icd-selected-list">
            {codes.map(c => {
              const it = window.icdLookup(c.code);
              return (
                <li key={c.code} className="icd-selected-row">
                  <span className="icd-code">{c.code}</span>
                  <span className="icd-label">{it?.label || ""}</span>
                  <select value={c.specifier} onChange={e => setSpec(c.code, e.target.value)}
                          aria-label="Diagnosesicherheit"
                          style={{ padding: "5px 8px", borderRadius: 6, border: "1px solid var(--card-border)", fontFamily: "inherit", fontSize: 12, color: "var(--text-primary)", background: "white" }}>
                    {specifiers.map(s => (
                      <option key={s.value} value={s.value}>{s.value} – {s.label.replace(`${s.value} — `, "")}</option>
                    ))}
                  </select>
                  <button className="icd-remove" type="button" onClick={() => remove(c.code)} title="entfernen">×</button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Diagnose hinzufügen */}
      <label className="field" style={{ marginTop: codes.length > 0 ? 14 : 0 }}>
        <span style={{ display: "block", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", marginBottom: 6 }}>
          Diagnose hinzufügen
        </span>
        <select className="input" value="" onChange={e => { if (e.target.value) addCode(e.target.value); }}>
          <option value="">— wählen —</option>
          {grouped && grouped.map(([groupName, items]) => (
            <optgroup key={groupName} label={groupName}>
              {items && items.map(it => (
                <option key={it.code} value={it.code} disabled={!!codes.find(c => c.code === it.code)}>
                  {it.code} · {it.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>
    </div>
  );
}

function Seg({ value, options, disabled = [], onChange }) {
  return (
    <div className="seg">
      {options.map(o => (
        <button key={o}
                disabled={disabled.includes(o)}
                aria-pressed={value === o}
                style={disabled.includes(o) ? { opacity: 0.4, cursor: "not-allowed" } : {}}
                onClick={() => !disabled.includes(o) && onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

// ── 2. Symptomatik ───────────────────────────────────
const MARK = { present: "●", lead: "★" };

function StepSymptoms({ state, setState, update, go }) {
  const m = state.meta;
  const icdCodes = (m.icdCodes || []).map(c => c.code);
  const useTabs = icdCodes.length >= 2;

  // activeDx: "all" oder ein Code wie "F33.1"
  const [activeDx, setActiveDx] = uS1(() => useTabs ? icdCodes[0] : "all");

  // Sync activeDx wenn sich Diagnosen ändern
  React.useEffect(() => {
    if (useTabs && !icdCodes.includes(activeDx) && activeDx !== "all") {
      setActiveDx(icdCodes[0] || "all");
    }
    if (!useTabs) setActiveDx("all");
  }, [JSON.stringify(icdCodes)]);

  const globalSymptoms  = state.symptoms;
  const symptomsByDx    = state.symptomsByDx || {};

  // Welche Symptome sind im aktuellen Tab aktiv?
  const viewSymptoms = activeDx === "all"
    ? globalSymptoms
    : (symptomsByDx[activeDx] || {});

  // Überlappungs-Map: symptomId → Codes aus ANDEREN Diagnosen
  const overlapMap = React.useMemo(() => {
    if (!useTabs || activeDx === "all") return {};
    const m = {};
    for (const [code, syms] of Object.entries(symptomsByDx)) {
      if (code === activeDx) continue;
      for (const id of Object.keys(syms)) {
        if (!m[id]) m[id] = [];
        m[id].push(code);
      }
    }
    return m;
  }, [symptomsByDx, activeDx, useTabs]);

  // Vorschläge aus selektierten Kernsymptomen → verwandte Symptome (Blöcke B–I)
  const suggestedFromCore = React.useMemo(
    () => window.computeSuggestedSymptoms ? window.computeSuggestedSymptoms(globalSymptoms) : {},
    [JSON.stringify(globalSymptoms)]
  );

  // Cross-Diagnose Kernsymptom-Überschneidungen:
  // Für jedes Symptom: welche ANDEREN Diagnosen haben es als gewähltes Kernsymptom?
  const coreOverlapMap = React.useMemo(() => {
    if (icdCodes.length < 2) return {};
    const out = {};
    for (const dxCode of icdCodes) {
      const coreItems = window.getDiagnosisCoreItems(dxCode) || [];
      const dxSyms = symptomsByDx[dxCode] || {};
      for (const it of coreItems) {
        if (dxSyms[it.id]) {
          if (!out[it.id]) out[it.id] = [];
          out[it.id].push(dxCode);
        }
      }
    }
    return out;
  }, [JSON.stringify(symptomsByDx), JSON.stringify(icdCodes)]);

  const totalSelected = Object.keys(globalSymptoms).length;
  const leadCount     = Object.values(globalSymptoms).filter(v => v === "lead").length;

  // Symptom-Toggle gezielt für eine Diagnose (für per-Diagnose-Kernsymptom-Karten)
  function toggleForDx(code, id) {
    setState(prev => {
      const globalSyms = { ...prev.symptoms };
      const dxMap      = { ...(prev.symptomsByDx || {}) };
      const dxSyms     = { ...(dxMap[code] || {}) };
      if (dxSyms[id]) {
        delete dxSyms[id];
        const inOther = Object.entries(dxMap).some(([c, s]) => c !== code && s[id]);
        if (!inOther) delete globalSyms[id];
      } else {
        dxSyms[id] = "present";
        if (!globalSyms[id]) globalSyms[id] = "present";
      }
      dxMap[code] = dxSyms;
      return { ...prev, symptoms: globalSyms, symptomsByDx: dxMap };
    });
  }

  // Toggle: global oder per-Diagnose
  function toggle(id) {
    setState(prev => {
      const globalSyms = { ...prev.symptoms };
      if (activeDx === "all") {
        if (globalSyms[id]) delete globalSyms[id]; else globalSyms[id] = "present";
        return { ...prev, symptoms: globalSyms };
      }
      // Per-Diagnose
      const dxMap  = { ...(prev.symptomsByDx || {}) };
      const dxSyms = { ...(dxMap[activeDx] || {}) };
      if (dxSyms[id]) {
        delete dxSyms[id];
        const inOther = Object.entries(dxMap).some(([c, s]) => c !== activeDx && s[id]);
        if (!inOther) delete globalSyms[id];
      } else {
        dxSyms[id] = "present";
        if (!globalSyms[id]) globalSyms[id] = "present";
      }
      dxMap[activeDx] = dxSyms;
      return { ...prev, symptoms: globalSyms, symptomsByDx: dxMap };
    });
  }

  // Leitsymptom-Toggle (immer global + alle DX-Einträge)
  function setLead(id, e) {
    if (e && e.stopPropagation) e.stopPropagation();
    setState(prev => {
      const ns   = { ...prev.symptoms };
      if (!ns[id]) return prev;
      const val  = ns[id] === "lead" ? "present" : "lead";
      ns[id]     = val;
      const dxUpd = {};
      for (const [c, s] of Object.entries(prev.symptomsByDx || {})) {
        dxUpd[c] = s[id] ? { ...s, [id]: val } : s;
      }
      return { ...prev, symptoms: ns, symptomsByDx: { ...(prev.symptomsByDx || {}), ...dxUpd } };
    });
  }

  // Symptom von anderer Diagnose in aktuelle kopieren
  function copyFromDx(id, fromCode) {
    setState(prev => {
      const globalSyms = { ...prev.symptoms };
      const dxMap      = { ...(prev.symptomsByDx || {}) };
      const dxSyms     = { ...(dxMap[activeDx] || {}) };
      dxSyms[id]       = prev.symptomsByDx?.[fromCode]?.[id] || "present";
      if (!globalSyms[id]) globalSyms[id] = dxSyms[id];
      dxMap[activeDx]  = dxSyms;
      return { ...prev, symptoms: globalSyms, symptomsByDx: dxMap };
    });
  }

  function setDeepening(key, patch) {
    setState(prev => ({
      ...prev,
      deepenings: { ...prev.deepenings, [key]: { ...(prev.deepenings[key] || {}), ...patch } }
    }));
  }

  return (
    <>
      <div className="page-head">
        <div className="crumb">Schritt 2.1</div>
        <h1>Diagnose & Symptomatik</h1>
        <p>Wählen Sie zuerst den diagnostischen Bereich und die ICD-10 Diagnosen, dann die vorliegenden Symptome.</p>
      </div>

      {/* Diagnostischer Bereich */}
      <div className="card">
        <div className="card-head">
          <h3>Diagnostischer Bereich</h3>
          <span className="meta">{window.ICD_CHAPTERS.find(c => c.id === m.domain)?.desc || "—"}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
          {window.ICD_CHAPTERS.map(ch => (
            <button key={ch.id}
              onClick={() => ch.active && update("meta", { domain: ch.id, icdCodes: [] })}
              style={{
                padding: "10px 14px", borderRadius: 8, textAlign: "left", fontFamily: "inherit",
                border: m.domain === ch.id ? "2px solid var(--accent)" : "1px solid var(--card-border)",
                background: m.domain === ch.id ? "var(--accent-soft)" : "white",
                color: m.domain === ch.id ? "var(--accent)" : ch.active ? "var(--text-primary)" : "var(--text-tertiary)",
                cursor: ch.active ? "pointer" : "not-allowed", opacity: ch.active ? 1 : 0.5, transition: "all 120ms",
              }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, marginBottom: 3 }}>{ch.label}</div>
              <div style={{ fontSize: 11, lineHeight: 1.35, opacity: 0.85 }}>{ch.desc}</div>
            </button>
          ))}
        </div>
        <p className="hint" style={{ marginTop: 10 }}>Aktuell implementiert: F30–F39 (Affektive Störungen). Weitere Kapitel folgen.</p>
      </div>

      {/* ICD-10 Diagnosen */}
      <IcdPicker meta={m} update={update} />

      {/* Diagnose-Tabs (nur bei 2+ Diagnosen) */}
      {useTabs && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 0, borderBottom: "2px solid var(--card-border)", marginBottom: 0, overflowX: "auto" }}>
            {icdCodes.map(code => {
              const cnt = Object.keys(symptomsByDx[code] || {}).length;
              return (
                <button key={code} onClick={() => setActiveDx(code)}
                        style={{
                          padding: "10px 18px", border: "none", background: "transparent",
                          borderBottom: activeDx === code ? "2px solid var(--accent)" : "2px solid transparent",
                          color: activeDx === code ? "var(--accent)" : "var(--text-secondary)",
                          fontWeight: activeDx === code ? 700 : 400,
                          cursor: "pointer", fontFamily: "inherit", marginBottom: -2,
                          whiteSpace: "nowrap", fontSize: 13,
                        }}>
                  {code}
                  {cnt > 0 && <span style={{ marginLeft: 6, fontFamily: "var(--font-mono)", fontSize: 11, opacity: 0.7 }}>{cnt}</span>}
                </button>
              );
            })}
            <button onClick={() => setActiveDx("all")}
                    style={{
                      padding: "10px 18px", border: "none", background: "transparent",
                      borderBottom: activeDx === "all" ? "2px solid var(--accent)" : "2px solid transparent",
                      color: activeDx === "all" ? "var(--accent)" : "var(--text-secondary)",
                      fontWeight: activeDx === "all" ? 700 : 400,
                      cursor: "pointer", fontFamily: "inherit", marginBottom: -2, fontSize: 13,
                    }}>
              Alle ({totalSelected})
            </button>
          </div>
          {activeDx !== "all" && (
            <p className="hint" style={{ marginTop: 8 }}>
              Symptome für <b>{activeDx}</b> auswählen.
              {overlapMap && Object.values(overlapMap).some(v => v.length > 0) &&
                <> Chips mit <span style={{ display: "inline-flex", alignItems: "center", gap: 3, background: "var(--warn-soft)", color: "var(--warn)", padding: "1px 6px", borderRadius: 4, fontSize: 11, fontFamily: "var(--font-mono)" }}>↑ Code</span> kommen aus einer anderen Diagnose — klicken zum Übernehmen.</>}
            </p>
          )}
        </div>
      )}

      <div className="symptom-legend">
        <span className="lg-item">
          Gesamt ausgewählt: <b style={{ color: "var(--text-primary)" }}>{totalSelected}</b>
        </span>
        <span className="lg-item">
          Leitsymptome: <b style={{ color: "var(--accent)" }}>{leadCount}</b>
        </span>
        <span className="lg-item" title="Symptom ausgewählt">
          <span className="lg-swatch present"></span>ausgewählt
        </span>
        <span className="lg-item" title="Leitsymptom — in der Sektion «Leitsymptome festlegen» markiert">
          <span className="lg-swatch lead"></span>
          <span className="lg-star">★</span>Leitsymptom
        </span>
        <span className="lg-item" title="Vorgeschlagen wegen passender Kernsymptome bzw. anderer Diagnose">
          <span className="lg-swatch suggested"></span>vorgeschlagen
        </span>
      </div>

      {/* ── Per-Diagnose Kernsymptom-Karten ─────────────────── */}
      {icdCodes.length > 0 && icdCodes.map(code => {
        const coreItems = window.getDiagnosisCoreItems(code);
        if (!coreItems || coreItems.length === 0) return null;
        const dxInfo  = window.icdLookup(code);
        const dxSyms  = symptomsByDx[code] || {};
        const selCount = coreItems.filter(it => dxSyms[it.id]).length;
        return (
          <div className="card" key={`core-${code}`} style={{ borderLeft: "3px solid var(--accent)" }}>
            <div className="card-head">
              <h3 style={{ fontSize: 13, textTransform: "none", letterSpacing: 0, fontWeight: 600, color: "var(--text-primary)" }}>
                Kernsymptome · <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-ink)" }}>{code}</span> {dxInfo?.label || ""}
              </h3>
              <span className="meta">{selCount}/{coreItems.length}</span>
            </div>
            <div className="chips">
              {coreItems.map(it => {
                const inDx  = !!dxSyms[it.id];
                const isLead = globalSymptoms[it.id] === "lead";
                // Cross-Diagnose: ist dieses Kernsymptom auch in einer ANDEREN Diagnose gewählt?
                const fromOtherDx = (coreOverlapMap[it.id] || []).filter(c => c !== code);
                const suggestedFromOther = !inDx && fromOtherDx.length > 0;
                return (
                  <span key={it.id}
                        className={"chip core" + (suggestedFromOther ? " suggested" : "")}
                        data-state={inDx ? (isLead ? "lead" : "present") : ""}
                        onClick={() => toggleForDx(code, it.id)}
                        title={suggestedFromOther
                          ? `Auch Kernsymptom in ${fromOtherDx.join(", ")} — Klick zum Übernehmen`
                          : (inDx ? "Klick: entfernen" : "Klick: hinzufügen")}>
                    {inDx && isLead && (
                      <span className="lead-marker" title="Leitsymptom">★</span>
                    )}
                    {it.label}
                    {suggestedFromOther && (
                      <span className="suggest-badge"
                            title={`Auch Kernsymptom in: ${fromOtherDx.join(", ")}`}>
                        ↑{fromOtherDx[0]}{fromOtherDx.length > 1 ? `+${fromOtherDx.length - 1}` : ""}
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}

      {window.SYMPTOM_BLOCKS.map(block => {
        // Block A wird durch per-Diagnose-Karten oben ersetzt
        if (block.id === "A" && icdCodes.length > 0) return null;

        // Alte coreOverride-Logik entfernt — Tabs steuern nur noch Blöcke B–I
        const blockItems = block.items;
        const blockTitle = block.title;

        // Blöcke H und I nur anzeigen wenn passende Diagnose aktiv
        const isManic = activeDx !== "all" && /^F3[01]/.test(activeDx);
        const isDysthZyclo = activeDx !== "all" && /^F34/.test(activeDx);
        if (block.id === "H" && !isManic) return null;
        if (block.id === "I" && !isDysthZyclo) return null;

        const count = activeDx === "all"
          ? blockItems.filter(it => globalSymptoms[it.id]).length
          : blockItems.filter(it => viewSymptoms[it.id]).length;
        return (
          <div className="card" key={block.id}>
            <div className="block-head">
              <span className="badge">{block.id}</span>
              <h4>{blockTitle}</h4>
              <span className="count">{count}/{blockItems.length}</span>
            </div>
            <div className="chips">
              {blockItems.map(it => {
                const inView   = !!viewSymptoms[it.id];
                const isLead   = globalSymptoms[it.id] === "lead";
                const overlaps = useTabs && activeDx !== "all" ? (overlapMap[it.id] || []) : [];
                const suggestSources = suggestedFromCore[it.id] || [];
                const isSuggested = !inView && suggestSources.length > 0;
                const stateVal = inView ? (isLead ? "lead" : "present") : "";

                return (
                  <span key={it.id}
                        className={"chip" + (it.core ? " core" : "") + (isSuggested ? " suggested" : "")}
                        data-state={stateVal}
                        onClick={() => toggle(it.id)}
                        title={isSuggested
                          ? `Vorgeschlagen wegen: ${suggestSources.join(", ")} — Klick zum Übernehmen`
                          : (inView ? "Klick: entfernen" : "Klick: hinzufügen")}>
                    {inView && isLead && (
                      <span className="lead-marker" title="Leitsymptom">★</span>
                    )}
                    {it.label}
                    {/* Quellen-Badge: woher kommt der Vorschlag? */}
                    {isSuggested && (
                      <span className="suggest-badge"
                            title={`Vorgeschlagen wegen: ${suggestSources.join(", ")}`}>
                        ↑{suggestSources[0]}{suggestSources.length > 1 ? ` +${suggestSources.length - 1}` : ""}
                      </span>
                    )}
                    {/* Überlappungs-Badge: aus anderer Diagnose */}
                    {!inView && overlaps.map(fromCode => (
                      <button key={fromCode} type="button"
                              onClick={e => { e.stopPropagation(); copyFromDx(it.id, fromCode); }}
                              title={`Aus ${fromCode} übernehmen`}
                              style={{
                                marginLeft: 4, padding: "1px 5px", border: "none",
                                background: "var(--warn-soft)", color: "var(--warn)",
                                borderRadius: 4, fontSize: 10, fontFamily: "var(--font-mono)",
                                cursor: "pointer", lineHeight: 1.6,
                              }}>
                        ↑{fromCode}
                      </button>
                    ))}
                  </span>
                );
              })}
            </div>

            {/* Vertiefungen */}
            {blockItems.filter(it => it.deepen && globalSymptoms[it.id]).map(it => {
              const def  = window.DEEPENINGS[it.deepen];
              const data = state.deepenings[it.deepen] || {};
              return (
                <div className="deepening" key={it.deepen}>
                  <h5>{def.title}</h5>
                  {def.fields.map(f => (
                    <div className="field-row" key={f.id}>
                      <span className="lbl">{f.label}</span>
                      <div className="minichips">
                        {f.options.map(o => {
                          const arr    = data[f.id] || (f.multi ? [] : "");
                          const active = f.multi ? arr.includes(o) : arr === o;
                          return (
                            <button key={o} className="minichip" aria-pressed={active}
                                    onClick={() => {
                                      const newVal = f.multi
                                        ? (active ? arr.filter(x => x !== o) : [...arr, o])
                                        : (active ? "" : o);
                                      setDeepening(it.deepen, { [f.id]: newVal });
                                    }}>
                              {o}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        );
      })}

      <hr className="soft" />

      {/* Leitsymptome festlegen — ganz am Ende, nach Auswahl aller übrigen Symptome */}
      {totalSelected > 0 && (
        <div className="card lead-picker-card">
          <div className="card-head">
            <h3>Leitsymptome festlegen</h3>
            <span className="meta">
              {leadCount} von {totalSelected} markiert · Empfohlen: 5–8
            </span>
          </div>
          <p className="hint" style={{ marginTop: 0, marginBottom: 10 }}>
            Welche der ausgewählten Symptome stehen im Vordergrund? Sie erscheinen im Bericht
            als Leitsymptome („Im Vordergrund stehen …").
          </p>
          <div className="lead-chips">
            {Object.keys(globalSymptoms).map(id => {
              const sym = window.SYMPTOM_BY_ID[id];
              if (!sym) return null;
              const isLeadSym = globalSymptoms[id] === "lead";
              return (
                <button key={id} type="button"
                        className={"lead-pick" + (isLeadSym ? " is-lead" : "")}
                        onClick={() => setLead(id)}
                        title={isLeadSym ? "Leitsymptom entfernen" : "Als Leitsymptom markieren"}>
                  <span className="lead-pick-icon">{isLeadSym ? "★" : "☆"}</span>
                  <span>{sym.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <NavRow go={go} />
    </>
  );
}

// ── 3. Verlauf & Schwere ─────────────────────────────
function StepCourse({ state, update, go }) {
  const c = state.course;
  return (
    <>
      <div className="page-head">
        <div className="crumb">Schritt 2.2</div>
        <h1>Verlauf & Schwere</h1>
        <p>Kurzer Verlaufsblock. Aktueller Behandlungsanlass ist eines der wenigen Pflicht-Freitextfelder.</p>
      </div>

      <div className="card">
        <div className="card-head"><h3>Beginn & Dauer</h3></div>
        <label className="field" style={{ marginBottom: 10 }}>Beginn
          <Seg value={c.onset} options={["akut","schleichend","seit Wochen","seit Monaten","seit Jahren","rezidivierend","unklar"]} onChange={v => update("course",{onset:v})} />
        </label>
        <label className="field">Dauer
          <Seg value={c.duration} options={["unter 2 Wochen","2–4 Wochen","1–3 Monate","3–6 Monate","6–12 Monate","über 12 Monate"]} onChange={v => update("course",{duration:v})} />
        </label>
      </div>

      <div className="card">
        <div className="card-head"><h3>Verlauf & Beeinträchtigung</h3></div>
        <label className="field" style={{ marginBottom: 10 }}>Verlauf
          <Seg value={c.progression} options={["zunehmend","gleichbleibend","schwankend","teilweise gebessert","deutlich verschlechtert","rezidivierend"]} onChange={v => update("course",{progression:v})} />
        </label>
        <label className="field">Beeinträchtigung
          <Seg value={c.impairment} options={["leicht","mittel","schwer","sehr schwer"]} onChange={v => update("course",{impairment:v})} />
        </label>
      </div>

      <div className="card">
        <div className="card-head"><h3>Aktueller Behandlungsanlass</h3><span className="meta">Pflichtfeld · max. 250 Zeichen</span></div>
        <textarea className="textarea" maxLength={250}
                  value={c.reasonNow}
                  onChange={e => update("course",{reasonNow: e.target.value})}
                  placeholder="Warum jetzt Therapie?" />
        <p className="hint">{c.reasonNow.length}/250</p>
      </div>

      <NavRow go={go} />
    </>
  );
}

// ── 4. Risiko & DD ───────────────────────────────────
const SUI_LEVELS = [
  "verneint","passive Todeswünsche","Suizidgedanken ohne Plan","Suizidgedanken mit Methode",
  "konkrete Planung","Vorbereitungshandlungen","akute Handlungsabsicht","unklar / nicht beurteilbar"
];
const PROTECTIVE = ["Kinder/Familie","Partnerschaft","therapeutische Beziehung","Zukunftspläne","Verantwortungsgefühl","religiöse/ethische Gründe","Haustiere","Hilfesuchverhalten","Absprachefähigkeit","Krisenkontakte"];
const RISKS = ["Hoffnungslosigkeit","frühere Suizidversuche","Substanzkonsum","soziale Isolation","psychotische Symptome","starke Schuld/Wertlosigkeit","akute Trennung/Verlust","chronische Schmerzen","fehlende Absprachefähigkeit"];
const BIPOLAR_ITEMS = ["jemals Phasen mit deutlich gehobener Stimmung","jemals Phasen mit deutlich gesteigertem Antrieb","deutlich vermindertes Schlafbedürfnis ohne Müdigkeit","Rededrang / Ideenflucht","riskantes Verhalten","Größenideen","Fremdbeobachtung solcher Phasen","Klinikaufenthalt wegen Hochstimmung/Enthemmung","Antidepressiva-induzierte Hochphase"];
const PSYCHOSIS_ITEMS = ["Schuldwahn","Verarmungswahn","hypochondrischer Wahn","nihilistische Ideen","Stimmenhören","imperative Stimmen","optische Halluzinationen","Ich-Störungen","Realitätsprüfung eingeschränkt"];
const SOMATIC_ITEMS = ["Alkohol problematisch","Cannabis/andere Drogen","sedierende Medikamente/Benzodiazepine","Schilddrüse abgeklärt","chronische Schmerzen","neurologische Erkrankung","hormonelle/postpartale/perimenopausale Faktoren","Schlafapnoe/Verdacht","relevante somatische Diagnosen"];

function StepRisk({ state, setState, update, go }) {
  const r = state.risk;
  const needsCrisisPlan = r.suicidality && r.suicidality !== "verneint" && r.suicidality !== "passive Todeswünsche";

  function toggleMap(slice, sub, key) {
    setState(prev => {
      const cur = prev[slice][sub] || {};
      const next = { ...cur };
      if (next[key]) delete next[key]; else next[key] = true;
      return { ...prev, [slice]: { ...prev[slice], [sub]: next } };
    });
  }

  return (
    <>
      <div className="page-head">
        <div className="crumb">Schritt 2.3</div>
        <h1>Suizidalität & Risiko</h1>
        <p>Pflichtscreen zur Suizidalität — Distanzierung, Schutz- und Risikofaktoren, bei Bedarf Krisenplan. Steht am Ende der Symptomatik, vor dem psychischen Befund.</p>
      </div>

      {/* Suizidalität */}
      <div className="card">
        <div className="card-head"><h3>Suizidalität</h3></div>
        <div className="row-2">
          <div>
            <label className="field" style={{ marginBottom: 6 }}>Aktuelle Suizidalität</label>
            <div className="seg" style={{ flexDirection: "column", alignItems: "stretch" }}>
              {SUI_LEVELS.map(l => (
                <button key={l} aria-pressed={r.suicidality === l}
                        onClick={() => update("risk",{suicidality: l})}
                        style={{ textAlign: "left", padding: "7px 12px" }}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="field" style={{ marginBottom: 6 }}>Distanzierung</label>
            <div className="seg" style={{ flexDirection: "column", alignItems: "stretch" }}>
              {["glaubhaft distanziert","teilweise distanziert","ambivalent","nicht distanziert","nicht beurteilbar"].map(l => (
                <button key={l} aria-pressed={r.distancing === l}
                        onClick={() => update("risk",{distancing:l})}
                        style={{ textAlign: "left", padding: "7px 12px" }}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="row-2" style={{ marginTop: 14 }}>
          <div>
            <h4 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-3)", margin: "0 0 6px" }}>Schutzfaktoren</h4>
            <div className="check-grid">
              {PROTECTIVE.map(p => (
                <label className="check" key={p}>
                  <input type="checkbox" checked={!!r.protective?.[p]} onChange={() => toggleMap("risk","protective",p)} />
                  <span>{p}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-3)", margin: "0 0 6px" }}>Risikofaktoren</h4>
            <div className="check-grid">
              {RISKS.map(p => (
                <label className="check" key={p}>
                  <input type="checkbox" checked={!!r.risks?.[p]} onChange={() => toggleMap("risk","risks",p)} />
                  <span>{p}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {needsCrisisPlan && (
          <div className="alert danger" style={{ marginTop: 14 }}>
            <h4>Risikomanagement / Krisenplan / Mitbehandlung</h4>
            <textarea className="textarea" maxLength={500}
                      style={{ background: "white", borderColor: "var(--danger)" }}
                      value={r.crisisPlan}
                      onChange={e => update("risk",{crisisPlan: e.target.value})}
                      placeholder="Konkrete Maßnahmen, Mitbehandlung, Krisenkontakte (Pflichtfeld, max. 500 Zeichen)" />
          </div>
        )}
      </div>

      <NavRow go={go} />
    </>
  );
}

// ── 3. Somatischer Befund ──────────────────────
function StepSomatic({ state, setState, go }) {
  function setSomItem(k) {
    setState(prev => {
      const items = { ...(prev.somatic.items || {}) };
      if (items[k]) delete items[k]; else items[k] = true;
      return { ...prev, somatic: { ...prev.somatic, items } };
    });
  }
  return (
    <>
      <div className="page-head">
        <div className="crumb">Schritt 3</div>
        <h1>Somatischer Befund</h1>
        <p>Substanz- und somatische Abklärung. Relevante körperliche Faktoren werden vor der psychischen Diagnose differenziert.</p>
      </div>

      <div className="card">
        <div className="card-head"><h3>Substanz- / Somatikcheck</h3></div>
        <label className="field" style={{ marginBottom: 10 }}>Status
          <Seg value={state.somatic.status} options={["unauffällig geprüft","auffällig","noch nicht ausreichend geprüft"]} onChange={v => setState(prev => ({...prev, somatic: {...prev.somatic, status: v, flagged: v === "auffällig"}}))} />
        </label>
        <div className="check-grid">
          {SOMATIC_ITEMS.map(b => (
            <label className="check" key={b}>
              <input type="checkbox" checked={!!state.somatic.items?.[b]} onChange={() => setSomItem(b)} />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>

      <NavRow go={go} />
    </>
  );
}

Object.assign(window, { StepBasics, StepSymptoms, StepCourse, StepRisk, StepSomatic, Seg });
