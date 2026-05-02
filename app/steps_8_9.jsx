// Schritte 8-10 + Conversion + Report

// ── 8. Ziele & Behandlungsplan ───────────────────────
function StepGoals({ state, setState, go }) {
  const sel = new Set(Object.keys(state.symptoms));

  // Sammle Ziele aus übernommenen Mechanismen
  const mechGoals = React.useMemo(() => {
    const out = [];
    for (const m of window.MECHANISMS) {
      const stat = state.mechanisms[m.id];
      if (stat?.status !== "accepted") continue;
      const acc = stat.acceptedItems?.goals || [];
      const goals = acc.length ? acc : m.goals;
      for (const g of goals) out.push({ id: `${m.id}__${g}`, label: g, source: m.short });
    }
    return out;
  }, [state.mechanisms]);

  // Symptomziele
  const symptomGoals = React.useMemo(() => {
    const map = {
      sleep_disturbance: "Schlaf stabilisieren",
      rumination: "Grübeln reduzieren",
      social_withdrawal: "soziale Kontakte wieder aufnehmen",
      drive_reduced: "Tagesstruktur und Aktivität aufbauen",
      self_devaluation: "Reduktion selbstabwertender Kognitionen",
      avoidance_conflict: "konstruktive Konfliktbewältigung",
      hopelessness: "Hoffnung und Perspektive aufbauen",
      exhaustion: "Belastung steuern, Erholung aufbauen",
      anhedonia: "Aufbau positiver Verstärker",
    };
    const out = [];
    for (const [sid, g] of Object.entries(map)) {
      if (sel.has(sid)) out.push({ id: `sym__${sid}`, label: g, source: window.SYMPTOM_BY_ID[sid].label });
    }
    return out;
  }, [state.symptoms]);

  // Merge to suggestion list (dedupe by label)
  const merged = React.useMemo(() => {
    const seen = new Map();
    for (const g of [...mechGoals, ...symptomGoals]) {
      if (!seen.has(g.label)) seen.set(g.label, { ...g, sources: [g.source] });
      else seen.get(g.label).sources.push(g.source);
    }
    return [...seen.values()];
  }, [mechGoals, symptomGoals]);

  function setGoalStatus(label, status) {
    setState(prev => {
      const ng = { ...prev.goals };
      ng[label] = { label, source: "mixed", status };
      return { ...prev, goals: ng };
    });
  }

  // Methoden aus übernommenen Zielen + akzeptierten Mechanismus-Methoden
  const methodSuggestions = React.useMemo(() => {
    const acceptedGoalLabels = Object.values(state.goals).filter(g => g.status === "accepted").map(g => g.label);
    const out = new Map();
    for (const lbl of acceptedGoalLabels) {
      for (const m of window.GOAL_TO_METHODS) {
        if (m.match.test(lbl)) {
          for (const meth of m.methods) {
            if (!out.has(meth)) out.set(meth, { method: meth, reasons: new Set() });
            out.get(meth).reasons.add(lbl);
          }
        }
      }
    }
    // Plus: aus übernommenen Mechanismus-Methoden direkt
    for (const m of window.MECHANISMS) {
      const stat = state.mechanisms[m.id];
      if (stat?.status !== "accepted") continue;
      const acc = stat.acceptedItems?.methods || [];
      for (const meth of acc) {
        if (!out.has(meth)) out.set(meth, { method: meth, reasons: new Set() });
        out.get(meth).reasons.add(m.short);
      }
    }
    return [...out.values()].map(x => ({ ...x, reasons: [...x.reasons] }));
  }, [state.goals, state.mechanisms]);

  function setPlanStatus(method, status, reason) {
    setState(prev => ({ ...prev, plan: { ...prev.plan, [method]: { status, reason } } }));
  }

  return (
    <>
      <div className="page-head">
        <div className="crumb">Schritt 08</div>
        <h1>Ziele & Behandlungsplan</h1>
        <p>Ziele entstehen aus ausgewählten Symptomen und übernommenen Fallmodell-Hypothesen. Methoden werden aus übernommenen Zielen abgeleitet.</p>
      </div>

      <div className="card">
        <div className="card-head"><h3>Vorgeschlagene Therapieziele</h3><span className="meta">{merged.length} Vorschläge</span></div>
        {merged.length === 0 && <div className="empty">Keine Ziel-Vorschläge — Symptome und Fallmodell vervollständigen.</div>}
        {merged.map(g => {
          const cur = state.goals[g.label];
          const status = cur?.status || "suggested";
          return (
            <div className="prop" key={g.label} data-status={status} style={{ padding: "12px 16px" }}>
              <div className="prop-head">
                <div>
                  <h4 className="prop-title" style={{ fontSize: 14 }}>{g.label}</h4>
                  <div className="prop-sub">aus: {g.sources.join(" · ")}</div>
                </div>
                <div className="prop-actions">
                  {status === "accepted"
                    ? <><span className="tag accepted">übernommen</span><button className="btn sm ghost" onClick={() => setGoalStatus(g.label, "suggested")}>Zurücknehmen</button></>
                    : <>
                        <button className="btn sm primary" onClick={() => setGoalStatus(g.label, "accepted")}>Übernehmen</button>
                        <button className="btn sm ghost" onClick={() => setGoalStatus(g.label, "rejected")}>Verwerfen</button>
                      </>
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <div className="card-head"><h3>Vorgeschlagene Methoden</h3><span className="meta">{methodSuggestions.length} Vorschläge</span></div>
        {methodSuggestions.length === 0 && <div className="empty">Erst Ziele übernehmen, damit Methoden vorgeschlagen werden können.</div>}
        {methodSuggestions.map(m => {
          const cur = state.plan[m.method];
          const status = cur?.status || "suggested";
          return (
            <div className="prop" key={m.method} data-status={status} style={{ padding: "12px 16px" }}>
              <div className="prop-head">
                <div>
                  <h4 className="prop-title" style={{ fontSize: 14 }}>{m.method}</h4>
                  <div className="prop-sub">vorgeschlagen wegen: {m.reasons.join(" · ")}</div>
                </div>
                <div className="prop-actions">
                  {status === "accepted"
                    ? <><span className="tag accepted">in Plan</span><button className="btn sm ghost" onClick={() => setPlanStatus(m.method, "suggested", m.reasons.join(", "))}>Entfernen</button></>
                    : <>
                        <button className="btn sm primary" onClick={() => setPlanStatus(m.method, "accepted", m.reasons.join(", "))}>In Plan</button>
                        <button className="btn sm ghost" onClick={() => setPlanStatus(m.method, "rejected", m.reasons.join(", "))}>Verwerfen</button>
                      </>
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <NavRow go={go} />
    </>
  );
}

// ── 9. Prognose ───────────────────────────────────────
const FAVORABLE = ["hoher Leidensdruck","Veränderungsmotivation","gute Introspektionsfähigkeit","tragfähige therapeutische Beziehung","Übungen werden gemacht","soziale Unterstützung","Ressourcen vorhanden","frühere Therapie hilfreich","klare Ziele"];
const UNFAVORABLE = ["lange Chronifizierung","schwere Symptomatik","aktuelle Suizidalität","psychotische Symptome","Substanzkonsum","wenig soziale Unterstützung","hohe äußere Belastung","viele erfolglose Vorbehandlungen","geringe Umstellungsfähigkeit","komorbide Störung"];

function StepPrognosis({ state, setState, update, go }) {
  function toggle(slice, key) {
    setState(prev => {
      const cur = { ...prev.prognosis[slice] };
      if (cur[key]) delete cur[key]; else cur[key] = true;
      return { ...prev, prognosis: { ...prev.prognosis, [slice]: cur } };
    });
  }
  const fav = Object.keys(state.prognosis.favorable);
  const unf = Object.keys(state.prognosis.unfavorable);

  function generateFormulation() {
    let txt = "";
    if (unf.length === 0 && fav.length > 0) {
      txt = `Die Prognose wird vor dem Hintergrund von ${listJoin(fav)} als günstig eingeschätzt.`;
    } else if (fav.length === 0 && unf.length > 0) {
      txt = `Die Prognose ist aufgrund von ${listJoin(unf)} als ambivalent zu beurteilen; eine therapeutische Bearbeitung erscheint dennoch indiziert.`;
    } else if (fav.length > 0 && unf.length > 0) {
      txt = `Die Prognose wird trotz ${listJoin(unf)} als ausreichend günstig eingeschätzt, da ${listJoin(fav)}. Die genannten Belastungsfaktoren werden im Behandlungsplan gezielt berücksichtigt.`;
    } else {
      txt = "Bitte günstige und/oder erschwerende Faktoren auswählen.";
    }
    update("prognosis", { formulation: txt });
  }

  return (
    <>
      <div className="page-head">
        <div className="crumb">Schritt 09</div>
        <h1>Prognose</h1>
        <p>Aus den tatsächlich angegebenen Faktoren ableiten — Motivation allein reicht nicht.</p>
      </div>

      <div className="row-2">
        <div className="card">
          <div className="card-head"><h3>Günstige Faktoren</h3><span className="meta">{fav.length}</span></div>
          <div className="check-grid">
            {FAVORABLE.map(f => (
              <label className="check" key={f}>
                <input type="checkbox" checked={!!state.prognosis.favorable[f]} onChange={() => toggle("favorable", f)} />
                <span>{f}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Erschwerende Faktoren</h3><span className="meta">{unf.length}</span></div>
          <div className="check-grid">
            {UNFAVORABLE.map(f => (
              <label className="check" key={f}>
                <input type="checkbox" checked={!!state.prognosis.unfavorable[f]} onChange={() => toggle("unfavorable", f)} />
                <span>{f}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-head"><h3>Prognose-Formulierung</h3>
          <button className="btn sm" onClick={generateFormulation}>Aus Faktoren generieren</button>
        </div>
        <textarea className="textarea" rows={5}
                  value={state.prognosis.formulation}
                  onChange={e => update("prognosis", { formulation: e.target.value })} />
      </div>

      <NavRow go={go} />
    </>
  );
}
function listJoin(arr) {
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return `${arr[0]} und ${arr[1]}`;
  return arr.slice(0, -1).join(", ") + " sowie " + arr[arr.length - 1];
}

// ── 9b. Umwandlung ────────────────────────────────────
const CHANGE_OPTIONS = ["gebessert","teilweise gebessert","unverändert","verschlechtert","nicht mehr relevant","neu hinzugekommen"];
const ACHIEV_OPTIONS = ["erreicht","teilweise erreicht","begonnen","nicht erreicht","noch nicht bearbeitet","nicht mehr relevant"];

function StepConversion({ state, setState, update, go }) {
  const symIds = Object.keys(state.symptoms);
  const goals = Object.values(state.goals).filter(g => g.status === "accepted");

  function setSym(sid, v) {
    setState(prev => ({ ...prev, conversion: { ...prev.conversion, symptomChange: { ...prev.conversion.symptomChange, [sid]: v } } }));
  }
  function setGoal(label, v) {
    setState(prev => ({ ...prev, conversion: { ...prev.conversion, goalAchievement: { ...prev.conversion.goalAchievement, [label]: v } } }));
  }

  return (
    <>
      <div className="page-head">
        <div className="crumb">Schritt 9b</div>
        <h1>Umwandlung — Verlauf seit Beginn der KZT</h1>
        <p>Pro Symptom und pro Ziel den aktuellen Stand markieren. Daraus wird die Umwandlungsbegründung gebaut.</p>
      </div>

      <div className="card">
        <div className="card-head"><h3>Symptomverlauf</h3><span className="meta">{symIds.length} Symptome</span></div>
        {symIds.length === 0 && <div className="empty">Keine Symptome ausgewählt.</div>}
        {symIds.map(sid => (
          <div key={sid} style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 14, alignItems: "center", padding: "6px 0", borderBottom: "1px solid var(--line)" }}>
            <span style={{ fontSize: 13 }}>{window.SYMPTOM_BY_ID[sid]?.label}</span>
            <Seg value={state.conversion.symptomChange[sid] || ""} options={CHANGE_OPTIONS} onChange={v => setSym(sid, v)} />
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head"><h3>Zielerreichung</h3><span className="meta">{goals.length} Ziele</span></div>
        {goals.length === 0 && <div className="empty">Keine übernommenen Ziele.</div>}
        {goals.map(g => (
          <div key={g.label} style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 14, alignItems: "center", padding: "6px 0", borderBottom: "1px solid var(--line)" }}>
            <span style={{ fontSize: 13 }}>{g.label}</span>
            <Seg value={state.conversion.goalAchievement[g.label] || ""} options={ACHIEV_OPTIONS} onChange={v => setGoal(g.label, v)} />
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head"><h3>Begründung der Umwandlung</h3></div>
        <textarea className="textarea" rows={5}
                  value={state.conversion.reasoning}
                  onChange={e => update("conversion", { reasoning: e.target.value })}
                  placeholder="Welche Restprobleme rechtfertigen die Fortsetzung? Wird beim Bericht aus den obigen Angaben automatisch ergänzt." />
      </div>

      <NavRow go={go} />
    </>
  );
}

Object.assign(window, { StepGoals, StepPrognosis, StepConversion, listJoin });
