// Hauptkomponente: Shell + Sidebar + Step-Routing
const { useState, useEffect, useMemo, useCallback } = React;

const STEPS = [
  { id: "basics",     num: "01", label: "Basisdaten" },
  { id: "symptoms",   num: "02", label: "Symptomatik" },
  { id: "course",     num: "03", label: "Verlauf & Schwere" },
  { id: "risk",       num: "04", label: "Risiko & DD" },
  { id: "findings",   num: "05", label: "Psychischer Befund" },
  { id: "diagnosis",  num: "06", label: "Diagnose" },
  { id: "mechanisms", num: "07", label: "Fallmodell" },
  { id: "goals",      num: "08", label: "Ziele & Plan" },
  { id: "prognosis",  num: "09", label: "Prognose" },
  { id: "report",     num: "10", label: "Bericht" },
];

function App() {
  const [state, setState] = useState(() => window.loadState());
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => { window.saveState(state); }, [state]);

  // Helper: setter that merges a partial into a top-level slice
  const update = useCallback((slice, patch) => {
    setState(prev => ({ ...prev, [slice]: { ...prev[slice], ...patch } }));
  }, []);

  const setSlice = useCallback((slice, value) => {
    setState(prev => ({ ...prev, [slice]: typeof value === "function" ? value(prev[slice]) : value }));
  }, []);

  // Conversion module is conditional
  const visibleSteps = useMemo(() => {
    const base = [...STEPS];
    if (state.meta.antrag === "Umwandlungsantrag") {
      base.splice(9, 0, { id: "conversion", num: "9b", label: "Umwandlung" });
    }
    return base;
  }, [state.meta.antrag]);

  const currentStep = visibleSteps[stepIdx] || visibleSteps[0];

  // Completion heuristic
  const completion = useMemo(() => {
    const flags = {};
    flags.basics    = state.basics.age && state.basics.occupation;
    flags.symptoms  = Object.keys(state.symptoms).length >= 5;
    flags.course    = state.course.duration && state.course.impairment && state.course.reasonNow;
    flags.risk      = state.risk.suicidality !== "" && (state.risk.suicidality === "verneint" || state.risk.crisisPlan);
    flags.findings  = Object.values(state.findings.proposed).some(p => p?.status === "accepted")
                      || Object.keys(state.findings.unauffaellig).length > 0;
    flags.diagnosis = state.diagnoses.icd || (state.meta.icdCodes || []).length > 0 || Object.values(state.diagnoses.proposed).some(p => p?.status === "accepted");
    flags.mechanisms= Object.values(state.mechanisms).some(m => m?.status === "accepted");
    flags.goals     = Object.values(state.goals).some(g => g?.status === "accepted");
    flags.prognosis = Object.keys(state.prognosis.favorable).length || Object.keys(state.prognosis.unfavorable).length;
    return flags;
  }, [state]);

  const completedCount = Object.values(completion).filter(Boolean).length;
  const totalCount = visibleSteps.length - 1; // ohne report

  function loadSample() {
    if (!confirm("Beispielfall laden? Aktuelle Eingaben werden überschrieben.")) return;
    const fresh = structuredClone(window.INITIAL_STATE);
    Object.assign(fresh, structuredClone(window.SAMPLE_CASE));
    setState(fresh);
    setStepIdx(1);
  }

  function resetAll() {
    if (!confirm("Alle Eingaben zurücksetzen?")) return;
    window.clearState();
    setState(structuredClone(window.INITIAL_STATE));
    setStepIdx(0);
  }

  function go(delta) {
    setStepIdx(i => Math.min(visibleSteps.length - 1, Math.max(0, i + delta)));
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  // Render the current step
  const stepProps = { state, setState, update, setSlice, go };
  let Page = null;
  switch (currentStep.id) {
    case "basics":     Page = <StepBasics {...stepProps} />; break;
    case "symptoms":   Page = <StepSymptoms {...stepProps} />; break;
    case "course":     Page = <StepCourse {...stepProps} />; break;
    case "risk":       Page = <StepRisk {...stepProps} />; break;
    case "findings":   Page = <StepFindings {...stepProps} />; break;
    case "diagnosis":  Page = <StepDiagnosis {...stepProps} />; break;
    case "mechanisms": Page = <StepMechanisms {...stepProps} />; break;
    case "goals":      Page = <StepGoals {...stepProps} />; break;
    case "prognosis":  Page = <StepPrognosis {...stepProps} />; break;
    case "conversion": Page = <StepConversion {...stepProps} />; break;
    case "report":     Page = <StepReport {...stepProps} />; break;
    default:           Page = <div>Unbekannter Schritt.</div>;
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-head">
          <div className="brand">Fallkonzeptgenerator</div>
          <div className="title">{state.meta.patientInitials || "Neuer Fall"}</div>
          <div className="sidebar-progress">
            <span>{completedCount}/{totalCount}</span>
            <div className="bar"><div style={{ width: `${(completedCount/totalCount)*100}%` }} /></div>
          </div>
        </div>
        <nav className="steps">
          {visibleSteps.map((s, i) => {
            const done = completion[s.id];
            const cls = done ? "step-btn complete" : "step-btn";
            return (
              <button
                key={s.id}
                className={cls}
                aria-current={i === stepIdx}
                onClick={() => setStepIdx(i)}
              >
                <span className="num">{s.num}</span>
                <span>{s.label}</span>
                <span className="dot" />
              </button>
            );
          })}
        </nav>
        <div className="sidebar-foot">
          <button className="btn ghost sm" onClick={loadSample}>Beispielfall laden</button>
          <button className="btn ghost sm" onClick={resetAll}>Alles zurücksetzen</button>
          <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 6 }}>
            Eingaben werden lokal im Browser gespeichert.
          </div>
        </div>
      </aside>

      <main className="main">
        {Page}
      </main>
    </div>
  );
}

// Reusable nav-row at bottom of each step
function NavRow({ go, stepIdx, total, primaryLabel, onPrimary }) {
  return (
    <div className="nav-row">
      <button className="btn ghost" onClick={() => go(-1)}>← Zurück</button>
      <button className="btn primary" onClick={onPrimary || (() => go(+1))}>
        {primaryLabel || "Weiter →"}
      </button>
    </div>
  );
}

window.App = App;
window.NavRow = NavRow;
window.STEPS = STEPS;
