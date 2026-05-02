// Schritte 5-7: Befund, Diagnose, Fallmodell

// ── 5. Befund ────────────────────────────────────────
function StepFindings({ state, setState, update, go }) {
  const sel = new Set(Object.keys(state.symptoms));

  // Vorschläge ableiten
  const proposals = React.useMemo(() => {
    const list = [];
    for (const [sid, mapping] of Object.entries(window.SYMPTOM_TO_FINDING)) {
      if (sel.has(sid)) {
        const id = `f_${sid}`;
        const existing = state.findings.proposed[id];
        list.push({
          id,
          area: mapping.area,
          text: existing?.edited || mapping.text,
          status: existing?.status || "suggested",
          source: window.SYMPTOM_BY_ID[sid]?.label || sid,
        });
      }
    }
    return list;
  }, [state.symptoms, state.findings.proposed]);

  // Gruppiert
  const grouped = {};
  for (const p of proposals) {
    (grouped[p.area] = grouped[p.area] || []).push(p);
  }

  function setFindingStatus(id, status) {
    setState(prev => ({
      ...prev,
      findings: { ...prev.findings,
        proposed: { ...prev.findings.proposed, [id]: { ...(prev.findings.proposed[id] || {}), status } }
      }
    }));
  }
  function editFinding(id, text) {
    setState(prev => ({
      ...prev,
      findings: { ...prev.findings,
        proposed: { ...prev.findings.proposed, [id]: { ...(prev.findings.proposed[id] || {}), edited: text } }
      }
    }));
  }
  function toggleUnauf(t) {
    setState(prev => {
      const u = { ...prev.findings.unauffaellig };
      if (u[t]) delete u[t]; else u[t] = true;
      return { ...prev, findings: { ...prev.findings, unauffaellig: u } };
    });
  }
  function acceptAll() {
    setState(prev => {
      const np = { ...prev.findings.proposed };
      for (const p of proposals) np[p.id] = { ...(np[p.id]||{}), status: "accepted" };
      return { ...prev, findings: { ...prev.findings, proposed: np } };
    });
  }

  return (
    <>
      <div className="page-head">
        <div className="crumb">Schritt 05</div>
        <h1>Psychischer Befund</h1>
        <p>AMDP-orientiert. Vorschläge entstehen aus den ausgewählten Symptomen — bitte prüfen, übernehmen, ändern oder verwerfen. Standard-unauffällige Bereiche werden separat als geprüft markiert.</p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button className="btn sm" onClick={acceptAll}>Alle Auffälligkeiten übernehmen</button>
        <span style={{ fontSize: 12, color: "var(--ink-3)", alignSelf: "center" }}>
          {proposals.length} Vorschläge aus {Object.keys(state.symptoms).length} Symptomen
        </span>
      </div>

      {proposals.length === 0 && (
        <div className="empty">Keine Befundvorschläge — bitte zuerst Symptome auswählen.</div>
      )}

      {Object.entries(grouped).map(([area, items]) => (
        <div className="card" key={area}>
          <div className="card-head"><h3>{area}</h3><span className="meta">{items.length} Vorschlag/Vorschläge</span></div>
          {items.map(p => (
            <div className="prop" key={p.id} data-status={p.status}>
              <div className="prop-head">
                <div style={{ flex: 1 }}>
                  <input className="input" value={p.text}
                         style={{ fontWeight: 500, fontSize: 14, padding: "6px 10px", background: p.status === "accepted" ? "white" : undefined }}
                         onChange={e => editFinding(p.id, e.target.value)} />
                  <div className="prop-sub" style={{ marginTop: 4 }}>aus: {p.source}</div>
                </div>
                <div className="prop-actions">
                  {p.status !== "accepted" && <button className="btn sm primary" onClick={() => setFindingStatus(p.id,"accepted")}>Übernehmen</button>}
                  {p.status === "accepted" && <span className="tag accepted">übernommen</span>}
                  <button className="btn sm ghost" onClick={() => setFindingStatus(p.id, p.status === "rejected" ? "suggested" : "rejected")}>{p.status === "rejected" ? "Wiederherstellen" : "Verwerfen"}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="card">
        <div className="card-head"><h3>Als geprüft unauffällig übernehmen</h3></div>
        <p className="hint" style={{ marginTop: 0, marginBottom: 8 }}>Nur Bereiche markieren, die tatsächlich exploriert wurden — kein Standardbefund.</p>
        <div className="chips">
          {window.UNAUFFAELLIG_CHIPS.map(c => {
            const on = !!state.findings.unauffaellig[c];
            return (
              <span key={c} className="chip" data-state={on ? "present" : ""} onClick={() => toggleUnauf(c)}>
                {on && <span className="marker">✓</span>}{c}
              </span>
            );
          })}
        </div>
      </div>

      <div className="card">
        <div className="card-head"><h3>Freitext / Ergänzungen</h3></div>
        <textarea className="textarea" value={state.findings.freeNotes}
                  onChange={e => update("findings", { freeNotes: e.target.value })}
                  placeholder="Optionale freie Befundnotizen, z. B. zu Erscheinungsbild, Kontaktverhalten." />
      </div>

      <NavRow go={go} />
    </>
  );
}

// ── 6. Diagnose ───────────────────────────────────────
function StepDiagnosis({ state, setState, update, go }) {
  const proposals = React.useMemo(() => window.computeDiagnosisProposal(state), [state]);

  function setDxStatus(key, label, reasoning, status) {
    setState(prev => ({
      ...prev,
      diagnoses: { ...prev.diagnoses,
        proposed: { ...prev.diagnoses.proposed, [key]: { label, reasoning, status, certainty: prev.diagnoses.proposed[key]?.certainty || "V" } }
      }
    }));
  }
  function setCertainty(key, c) {
    setState(prev => ({
      ...prev,
      diagnoses: { ...prev.diagnoses,
        proposed: { ...prev.diagnoses.proposed, [key]: { ...(prev.diagnoses.proposed[key] || {}), certainty: c } }
      }
    }));
  }

  return (
    <>
      <div className="page-head">
        <div className="crumb">Schritt 06</div>
        <h1>Diagnose</h1>
        <p>Auf Basis der ausgewählten Symptome plausibel zu prüfende Diagnosen. Kein Automatismus — bitte als gesichert oder Verdacht übernehmen.</p>
      </div>

      {proposals.length === 0 && (
        <div className="empty">Noch keine Diagnose-Vorschläge — Symptomatik und Verlauf vervollständigen.</div>
      )}

      {proposals.map(p => {
        const cur = state.diagnoses.proposed[p.key];
        const status = cur?.status || "suggested";
        const cert = cur?.certainty || "V";
        const isWarn = p.key === "bipolar_dd" || p.key === "psychotic" || p.key === "somatic_dd";
        return (
          <div className="prop" key={p.key} data-status={status} data-strong={!isWarn && p.key === "depressive_episode"}>
            <div className="prop-head">
              <div>
                <h4 className="prop-title">{p.label}</h4>
                <div className="prop-sub">{p.reasoning}</div>
              </div>
              <div className="prop-actions">
                {status === "accepted" ? (
                  <>
                    <div className="seg" style={{ marginRight: 6 }}>
                      {["G","V","Z","A"].map(c => (
                        <button key={c} aria-pressed={cert === c} onClick={() => setCertainty(p.key, c)} title={{G:"gesichert",V:"Verdacht",Z:"Zustand nach",A:"Ausschluss"}[c]}>{c}</button>
                      ))}
                    </div>
                    <button className="btn sm ghost" onClick={() => setDxStatus(p.key, p.label, p.reasoning, "suggested")}>Zurücknehmen</button>
                  </>
                ) : (
                  <>
                    <button className="btn sm primary" onClick={() => setDxStatus(p.key, p.label, p.reasoning, "accepted")}>Übernehmen</button>
                    <button className="btn sm ghost" onClick={() => setDxStatus(p.key, p.label, p.reasoning, "rejected")}>Verwerfen</button>
                  </>
                )}
                {isWarn && status !== "accepted" && <span className="tag warn">DD-Hinweis</span>}
              </div>
            </div>
          </div>
        );
      })}

      <div className="card">
        <div className="card-head"><h3>ICD-10 Diagnosen aus Schritt 1</h3></div>
        {(state.meta.icdCodes || []).length === 0 ? (
          <p className="hint">In Schritt 1 wurden keine ICD-Codes ausgewählt.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {(state.meta.icdCodes || []).map(c => {
              const it = window.icdLookup(c.code);
              return <li key={c.code}><strong>{c.code} {c.specifier}</strong> — {it?.label || ""}</li>;
            })}
          </ul>
        )}
        <p className="hint">Diese Auswahl erscheint im Bericht als Diagnoseliste. In den Feldern unten können bei Bedarf zusätzliche/manuelle Codes ergänzt werden.</p>
      </div>

      <div className="card">
        <div className="card-head"><h3>Manuelle ICD-10/11 Codes & DD-Notizen</h3></div>
        <label className="field" style={{ marginBottom: 10 }}>ICD-Codes (Freitext, optional)
          <input className="input" value={state.diagnoses.icd}
                 onChange={e => update("diagnoses", { icd: e.target.value })}
                 placeholder="z. B. F41.1 V — Verdacht auf generalisierte Angststörung (zusätzlich)" />
        </label>
        <label className="field">DD-/Komorbiditäts-Notizen
          <textarea className="textarea" value={state.diagnoses.ddNotes}
                    onChange={e => update("diagnoses", { ddNotes: e.target.value })} />
        </label>
      </div>

      <NavRow go={go} />
    </>
  );
}

// ── 7. Fallmodell / Mechanismen ──────────────────────
function StepMechanisms({ state, setState, go }) {
  const sel = new Set(Object.keys(state.symptoms));

  // Score & rank
  const scored = React.useMemo(() => {
    return window.MECHANISMS.map(m => {
      const { score, matched } = window.scoreMechanism(m, sel);
      const sugg = state.mechanisms[m.id] || {};
      const status = sugg.status || (score >= m.suggestThreshold ? "suggested" : "below");
      const strong = score >= m.strongThreshold;
      return { mech: m, score, matched, status, strong, accepted: sugg.acceptedItems || {} };
    }).sort((a, b) => b.score - a.score);
  }, [state.symptoms, state.mechanisms]);

  const visible = scored.filter(s => s.score >= s.mech.suggestThreshold || s.status === "accepted");
  const below = scored.filter(s => s.score < s.mech.suggestThreshold && s.status !== "accepted");

  function setMechStatus(id, status) {
    setState(prev => ({ ...prev, mechanisms: { ...prev.mechanisms,
      [id]: { ...(prev.mechanisms[id] || {}), status, acceptedItems: prev.mechanisms[id]?.acceptedItems || {} }
    }}));
  }

  function toggleItem(mechId, kind, item) {
    setState(prev => {
      const cur = prev.mechanisms[mechId] || { status: "accepted", acceptedItems: {} };
      const arr = cur.acceptedItems[kind] || [];
      const has = arr.includes(item);
      const newArr = has ? arr.filter(x => x !== item) : [...arr, item];
      return { ...prev, mechanisms: { ...prev.mechanisms,
        [mechId]: { ...cur, acceptedItems: { ...cur.acceptedItems, [kind]: newArr } }
      }};
    });
  }

  return (
    <>
      <div className="page-head">
        <div className="crumb">Schritt 07</div>
        <h1>Fallmodell — aufrechterhaltende Muster</h1>
        <p>Welche Erklärungen passen zu den ausgewählten Symptomen? Vorschläge basieren auf einem transparenten Punktesystem. Erst nach Übernehmen werden Prädispositionen, Grundannahmen, Ziele und Methoden vorgeschlagen.</p>
      </div>

      {visible.length === 0 && (
        <div className="empty">Noch keine Hypothesen — bitte zuerst Symptome auswählen.</div>
      )}

      {visible.map(({ mech, score, matched, status, strong, accepted }) => (
        <div className="prop" key={mech.id} data-status={status === "below" ? "suggested" : status} data-strong={strong}>
          <div className="prop-head">
            <div>
              <h4 className="prop-title">{mech.label} {strong && <span className="tag strong" style={{ marginLeft: 8 }}>starke Hypothese</span>}</h4>
              <div className="prop-sub">{matched.length} passende Symptome · Punkte {score} (Schwelle {mech.suggestThreshold})</div>
            </div>
            <div className="prop-actions">
              {status === "accepted" ? (
                <>
                  <span className="tag accepted">übernommen</span>
                  <button className="btn sm ghost" onClick={() => setMechStatus(mech.id, "suggested")}>Zurücknehmen</button>
                </>
              ) : (
                <>
                  <button className="btn sm primary" onClick={() => setMechStatus(mech.id, "accepted")}>Übernehmen</button>
                  <button className="btn sm ghost" onClick={() => setMechStatus(mech.id, "rejected")}>Verwerfen</button>
                </>
              )}
            </div>
          </div>

          <details className="why" open={!status || status === "suggested"}>
            <summary>Warum vorgeschlagen?<span className="score">Score {score}</span></summary>
            <div className="why-body">
              <div className="why-points">
                {matched.map(m => (
                  <span className="pt" key={m.id}><b>+{m.pts}</b> {window.SYMPTOM_BY_ID[m.id]?.label || m.id}</span>
                ))}
              </div>
            </div>
          </details>

          {status === "accepted" && (
            <div className="prop-body">
              <div className="prop-grid">
                <ItemList title="Aufrechterhaltende Bedingungen"
                          items={mech.maintainers}
                          accepted={accepted.maintainers || []}
                          onToggle={i => toggleItem(mech.id, "maintainers", i)} />
                <ItemList title="Prädispositionen / Lerngeschichte"
                          items={mech.predispositions}
                          accepted={accepted.predispositions || []}
                          onToggle={i => toggleItem(mech.id, "predispositions", i)} />
                <ItemList title="Mögliche Grundannahmen"
                          items={mech.beliefs}
                          accepted={accepted.beliefs || []}
                          onToggle={i => toggleItem(mech.id, "beliefs", i)} />
                <ItemList title="Therapieziele"
                          items={mech.goals}
                          accepted={accepted.goals || []}
                          onToggle={i => toggleItem(mech.id, "goals", i)} />
              </div>
              <div style={{ marginTop: 14 }}>
                <ItemList title="Methodenvorschläge"
                          items={mech.methods}
                          accepted={accepted.methods || []}
                          onToggle={i => toggleItem(mech.id, "methods", i)} />
              </div>
            </div>
          )}
        </div>
      ))}

      {below.length > 0 && (
        <details className="card flat" style={{ marginTop: 20 }}>
          <summary style={{ cursor: "pointer", color: "var(--ink-3)", fontSize: 12, fontFamily: "var(--font-mono)" }}>
            Schwächere Muster ({below.length}) anzeigen
          </summary>
          <div style={{ marginTop: 12 }}>
            {below.map(({ mech, score }) => (
              <div key={mech.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 4px", borderBottom: "1px solid var(--line)", fontSize: 13 }}>
                <span>{mech.label}</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>{score}/{mech.suggestThreshold}</span>
              </div>
            ))}
          </div>
        </details>
      )}

      <NavRow go={go} />
    </>
  );
}

function ItemList({ title, items, accepted, onToggle }) {
  return (
    <div>
      <div className="prop-section-title">{title}</div>
      <ul className="prop-list">
        {items.map(it => {
          const on = accepted.includes(it);
          return (
            <li key={it} className={on ? "checked" : ""} data-pickable="true" onClick={() => onToggle(it)}>
              {it}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Object.assign(window, { StepFindings, StepDiagnosis, StepMechanisms });
