// Schritte 1-4: Basisdaten, Symptome, Verlauf, Risiko/DD
const { useState: uS1, useMemo: uM1 } = React;

// ── 1. Basisdaten ─────────────────────────────────────
function StepBasics({ state, update, go }) {
  const m = state.meta, b = state.basics;
  return (
    <>
      <div className="page-head">
        <div className="crumb">Schritt 01</div>
        <h1>Basisdaten</h1>
        <p>Steuert nur, welche Module geladen werden. Es werden keine Symptome oder Profile vorausgewählt.</p>
      </div>

      <div className="card">
        <div className="card-head"><h3>Antrag & Verfahren</h3></div>
        <div className="row">
          <div>
            <label className="field">Antragstyp</label>
            <Seg value={m.antrag} options={["Erstantrag","Umwandlungsantrag"]} onChange={v => update("meta",{antrag:v})} />
          </div>
          <div>
            <label className="field">Altersgruppe</label>
            <Seg value={m.ageGroup} options={["Erwachsene","Kinder/Jugendliche"]} disabled={["Kinder/Jugendliche"]} onChange={v => update("meta",{ageGroup:v})} />
          </div>
          <div>
            <label className="field">Verfahren</label>
            <Seg value={m.verfahren} options={["Verhaltenstherapie"]} onChange={v => update("meta",{verfahren:v})} />
          </div>
          <div>
            <label className="field">Diagnostischer Bereich</label>
            <Seg value={m.domain}
                 options={["Depression","Angst","Zwang","Trauma","Essstörung","Somatisierung","Persönlichkeit"]}
                 disabled={["Angst","Zwang","Trauma","Essstörung","Somatisierung","Persönlichkeit"]}
                 onChange={v => update("meta",{domain:v, icdCodes: []})} />
            <p className="hint">Aktuell ist das Depressionsmodul implementiert. Weitere folgen.</p>
          </div>
        </div>
      </div>

      <IcdPicker meta={m} update={update} />

      <div className="card">
        <div className="card-head"><h3>Patient:in — Basisangaben</h3><span className="meta">erforderlich</span></div>
        <div className="row-3">
          <label className="field">Geschlecht
            <select className="input" value={b.gender || ""} onChange={e => update("basics",{gender:e.target.value})}>
              <option value="">— wählen —</option>
              <option value="m">männlich (er / Herr / der Patient)</option>
              <option value="w">weiblich (sie / Frau / die Patientin)</option>
              <option value="d">divers (die Person / they)</option>
            </select>
          </label>
          <label className="field">Initialen / Aktenzeichen
            <input className="input" value={m.patientInitials} onChange={e => update("meta",{patientInitials:e.target.value})} placeholder="z. B. M.B." />
          </label>
          <label className="field">Alter
            <input className="input" value={b.age} onChange={e => update("basics",{age:e.target.value})} placeholder="38" />
          </label>
          <label className="field">Datum
            <input className="input" type="date" value={m.datum} onChange={e => update("meta",{datum:e.target.value})} />
          </label>
          <label className="field">Beruf / Status
            <input className="input" value={b.occupation} onChange={e => update("basics",{occupation:e.target.value})} />
          </label>
          <label className="field">Familienstand / Wohnsituation
            <input className="input" value={b.family} onChange={e => update("basics",{family:e.target.value})} />
          </label>
          <label className="field">Kinder
            <input className="input" value={b.kids} onChange={e => update("basics",{kids:e.target.value})} placeholder="ja / nein / Anzahl, Alter" />
          </label>
        </div>
        <div style={{ marginTop: 12 }}>
          <label className="field">Aktuelle Arbeitsfähigkeit
            <input className="input" value={b.workability} onChange={e => update("basics",{workability:e.target.value})} placeholder="z. B. arbeitsfähig unter Anstrengung" />
          </label>
        </div>
      </div>

      <NavRow go={go} />
    </>
  );
}

function IcdPicker({ meta, update }) {
  const codes = meta.icdCodes || [];
  const grouped = window.icdGroupedFor(meta.domain);
  const specifiers = window.ICD_SPECIFIERS;
  const [query, setQuery] = uS1("");

  function isPicked(code) { return codes.find(c => c.code === code); }
  function toggle(code) {
    const next = isPicked(code)
      ? codes.filter(c => c.code !== code)
      : [...codes, { code, specifier: "G" }];
    update("meta", { icdCodes: next });
  }
  function setSpec(code, specifier) {
    update("meta", { icdCodes: codes.map(c => c.code === code ? { ...c, specifier } : c) });
  }
  function remove(code) {
    update("meta", { icdCodes: codes.filter(c => c.code !== code) });
  }

  if (!grouped.length) {
    return (
      <div className="card">
        <div className="card-head"><h3>ICD-10 Diagnosen</h3></div>
        <p className="hint">Für diesen Bereich liegt aktuell kein Katalog vor.</p>
      </div>
    );
  }

  const q = query.trim().toLowerCase();
  const filtered = q
    ? grouped.map(([g, items]) => [g, items.filter(it =>
        it.code.toLowerCase().includes(q) || it.label.toLowerCase().includes(q))])
        .filter(([_, items]) => items.length > 0)
    : grouped;

  return (
    <div className="card icd-card">
      <div className="card-head">
        <h3>ICD-10 Diagnosen</h3>
        <span className="meta">{codes.length} ausgewählt</span>
      </div>

      {codes.length > 0 ? (
        <div className="icd-selected">
          <div className="icd-selected-label">Übernommene Diagnosen</div>
          <ul className="icd-selected-list">
            {codes.map(c => {
              const it = window.icdLookup(c.code);
              return (
                <li key={c.code} className="icd-selected-row">
                  <span className="icd-code">{c.code}</span>
                  <span className="icd-label">{it?.label || ""}</span>
                  <div className="icd-spec-seg" role="group" aria-label="Diagnosesicherheit">
                    {specifiers.map(s => (
                      <button key={s.value}
                              type="button"
                              aria-pressed={c.specifier === s.value}
                              onClick={() => setSpec(c.code, s.value)}
                              title={s.label}>
                        {s.value}
                      </button>
                    ))}
                  </div>
                  <button className="icd-remove" type="button" onClick={() => remove(c.code)} aria-label={`Entfernen: ${c.code}`} title="entfernen">×</button>
                </li>
              );
            })}
          </ul>
          <div className="icd-spec-legend">
            <strong>G</strong> gesichert · <strong>V</strong> Verdacht · <strong>Z</strong> Zustand nach · <strong>A</strong> Ausschluss
          </div>
        </div>
      ) : (
        <p className="hint">Wählen Sie unten die Diagnosen aus, die Sie nachher vergeben — Mehrfachauswahl möglich. Sicherheit (G/V/Z/A) lässt sich nach Auswahl pro Code festlegen.</p>
      )}

      <div className="icd-search">
        <input className="input"
               type="search"
               value={query}
               onChange={e => setQuery(e.target.value)}
               placeholder="Suche: Code oder Klartext, z. B. F33.1, mittelgradig, Dysthymia …" />
      </div>

      <div className="icd-catalog">
        {filtered.length === 0 && (
          <div className="empty" style={{ padding: 14 }}>Keine Treffer für „{query}".</div>
        )}
        {filtered.map(([groupName, items]) => (
          <section key={groupName} className="icd-group">
            <header className="icd-group-head">{groupName}</header>
            <ul className="icd-rows">
              {items.map(it => {
                const picked = isPicked(it.code);
                return (
                  <li key={it.code}
                      className={"icd-row" + (picked ? " is-picked" : "")}
                      onClick={() => toggle(it.code)}
                      role="button"
                      aria-pressed={!!picked}
                      tabIndex={0}
                      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(it.code); } }}>
                    <span className="icd-row-check" aria-hidden="true">
                      {picked ? "✓" : ""}
                    </span>
                    <span className="icd-row-code">{it.code}</span>
                    <span className="icd-row-label">{it.label}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
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
const CYCLE = ["", "present", "lead", "unclear"];
const MARK = { present: "●", lead: "★", unclear: "?" };

function StepSymptoms({ state, setState, update, go }) {
  const symptoms = state.symptoms;
  const totalSelected = Object.keys(symptoms).length;
  const leadCount = Object.values(symptoms).filter(v => v === "lead").length;

  function toggle(id) {
    setState(prev => {
      const ns = { ...prev.symptoms };
      if (ns[id]) delete ns[id]; else ns[id] = "present";
      return { ...prev, symptoms: ns };
    });
  }
  function setLead(id, e) {
    e.stopPropagation();
    setState(prev => {
      const ns = { ...prev.symptoms };
      if (!ns[id]) return prev;
      ns[id] = ns[id] === "lead" ? "present" : "lead";
      return { ...prev, symptoms: ns };
    });
  }

  function setDeepening(key, patch) {
    setState(prev => ({
      ...prev,
      deepenings: { ...prev.deepenings, [key]: { ...(prev.deepenings[key] || {}), ...patch } }
    }));
  }

  // Symptom blocks — show vertical list of blocks
  return (
    <>
      <div className="page-head">
        <div className="crumb">Schritt 02 · Depression</div>
        <h1>Symptomatik</h1>
        <p>Klicken Sie ein Symptom an, um es als <span className="kbd">●</span> vorhanden zu markieren. Mit dem kleinen Stern rechts wird es zum <span className="kbd">★</span> Leitsymptom. Vertiefungen erscheinen nur für gewählte Symptome.</p>
      </div>

      <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 10, fontSize: 12, color: "var(--ink-3)" }}>
        <span>Ausgewählt: <b style={{ color: "var(--ink)" }}>{totalSelected}</b></span>
        <span>Davon Leitsymptome: <b style={{ color: "var(--accent-ink)" }}>{leadCount}</b></span>
        <span style={{ marginLeft: "auto" }}>Empfohlen: 5–8 Leitsymptome</span>
      </div>

      {window.SYMPTOM_BLOCKS.map(block => {
        const count = block.items.filter(it => symptoms[it.id]).length;
        return (
          <div className="card" key={block.id}>
            <div className="block-head">
              <span className="badge">{block.id}</span>
              <h4>{block.title}</h4>
              <span className="count">{count}/{block.items.length}</span>
            </div>
            <div className="chips">
              {block.items.map(it => {
                const st = symptoms[it.id] || "";
                return (
                  <span key={it.id}
                        className={"chip" + (it.core ? " core" : "")}
                        data-state={st}
                        onClick={() => toggle(it.id)}
                        title={st ? "Klick: entfernen" : "Klick: vorhanden markieren"}>
                    {st && <span className="marker">{MARK[st]}</span>}
                    {it.label}
                    {st && (
                      <button
                        type="button"
                        className="lead-toggle"
                        onClick={(e) => setLead(it.id, e)}
                        title={st === "lead" ? "Leitsymptom entfernen" : "Als Leitsymptom markieren"}
                        aria-label="Leitsymptom umschalten">
                        {st === "lead" ? "★" : "☆"}
                      </button>
                    )}
                  </span>
                );
              })}
            </div>

            {/* Vertiefungen für ausgewählte Symptome dieses Blocks */}
            {block.items.filter(it => it.deepen && symptoms[it.id]).map(it => {
              const def = window.DEEPENINGS[it.deepen];
              const data = state.deepenings[it.deepen] || {};
              return (
                <div className="deepening" key={it.deepen}>
                  <h5>{def.title}</h5>
                  {def.fields.map(f => (
                    <div className="field-row" key={f.id}>
                      <span className="lbl">{f.label}</span>
                      <div className="minichips">
                        {f.options.map(o => {
                          const arr = data[f.id] || (f.multi ? [] : "");
                          const active = f.multi ? arr.includes(o) : arr === o;
                          return (
                            <button key={o}
                                    className="minichip"
                                    aria-pressed={active}
                                    onClick={() => {
                                      if (f.multi) {
                                        const newArr = active ? arr.filter(x => x !== o) : [...arr, o];
                                        setDeepening(it.deepen, { [f.id]: newArr });
                                      } else {
                                        setDeepening(it.deepen, { [f.id]: active ? "" : o });
                                      }
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
        <div className="crumb">Schritt 03</div>
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

  function setBipoItem(k) {
    setState(prev => {
      const items = { ...(prev.bipolarity.items || {}) };
      if (items[k]) delete items[k]; else items[k] = true;
      const n = Object.keys(items).length;
      const result = n === 0 ? "kein Hinweis" : n <= 1 ? "unclear" : "hint";
      return { ...prev, bipolarity: { items, result } };
    });
  }
  function setPsyItem(k) {
    setState(prev => {
      const items = { ...(prev.psychosis.items || {}) };
      if (items[k]) delete items[k]; else items[k] = true;
      return { ...prev, psychosis: { items, any: Object.keys(items).length > 0 } };
    });
  }
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
        <div className="crumb">Schritt 04</div>
        <h1>Risiko & Differentialdiagnostik</h1>
        <p>Pflichtscreen — Suizidalität, Bipolarität, Psychose, Substanz/Somatik. Ergebnisse modulieren spätere Vorschläge.</p>
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

      {/* Bipolarität */}
      <div className="card">
        <div className="card-head">
          <h3>Bipolaritätscheck</h3>
          <span className={"tag" + (state.bipolarity.result === "hint" ? " warn" : "")}>{state.bipolarity.result === "kein Hinweis" ? "kein Hinweis" : state.bipolarity.result === "unclear" ? "unklar, weiter prüfen" : "Hinweis auf Hypomanie/Manie"}</span>
        </div>
        <div className="check-grid">
          {BIPOLAR_ITEMS.map(b => (
            <label className="check" key={b}>
              <input type="checkbox" checked={!!state.bipolarity.items?.[b]} onChange={() => setBipoItem(b)} />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Psychose */}
      <div className="card">
        <div className="card-head">
          <h3>Psychosecheck</h3>
          {state.psychosis.any && <span className="tag warn">DD/Schweregrad prüfen</span>}
        </div>
        <div className="check-grid">
          {PSYCHOSIS_ITEMS.map(b => (
            <label className="check" key={b}>
              <input type="checkbox" checked={!!state.psychosis.items?.[b]} onChange={() => setPsyItem(b)} />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Somatik */}
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

Object.assign(window, { StepBasics, StepSymptoms, StepCourse, StepRisk, Seg });
