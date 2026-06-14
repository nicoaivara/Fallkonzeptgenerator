// Hauptkomponente: Shell mit Horizontal Tabs Navigation
const { useState, useEffect, useMemo, useCallback } = React;

const STEPS = [
  { id: "basics",     num: "1",   label: "Soziodemografie" },
  { id: "symptoms",   num: "2.1", label: "Symptomatik" },
  { id: "course",     num: "2.2", label: "Verlauf & Schwere" },
  { id: "risk",       num: "2.3", label: "Suizidalität & Risiko" },
  { id: "findings",   num: "2.4", label: "Psychischer Befund" },
  { id: "somatic",    num: "3",   label: "Somatischer Befund" },
  { id: "mechanisms", num: "4",   label: "Lebensgeschichte & Fallmodell" },
  { id: "diagnosis",  num: "5",   label: "Diagnose & DD" },
  { id: "goals",      num: "6.1", label: "Ziele & Behandlungsplan" },
  { id: "prognosis",  num: "6.2", label: "Prognose" },
  { id: "report",     num: "",    label: "Bericht" },
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
      base.splice(10, 0, { id: "conversion", num: "6.3", label: "Umwandlung" });
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
    case "somatic":    Page = <StepSomatic {...stepProps} />; break;
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
      {/* Horizontal Navigation Bar */}
      <div className="top-nav">
        <div className="nav-brand">Fallkonzeptgenerator</div>
        <div className="nav-steps">
          {visibleSteps.map((s, i) => (
            <button
              key={s.id}
              className="step-btn"
              aria-current={i === stepIdx ? "true" : "false"}
              onClick={() => setStepIdx(i)}
              title={s.label}
            >
              {s.num ? `${s.num} ` : ""}{s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="main">
        {Page}
        
        {/* Footer with Action Buttons */}
        {currentStep.id !== "report" && (
          <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
            <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
              <div>
                <button className="btn ghost sm" onClick={loadSample} style={{ marginRight: 8 }}>
                  Beispielfall laden
                </button>
                <button className="btn ghost sm" onClick={resetAll}>
                  Zurücksetzen
                </button>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", textAlign: "right", alignSelf: "center" }}>
                Fall: {state.meta.patientInitials || "Neu"}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Reusable nav-row at bottom of each step
function NavRow({ go, primaryLabel, onPrimary }) {
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
