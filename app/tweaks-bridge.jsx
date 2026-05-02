// Tweaks-Bridge: liest Tweaks ein und propagiert sie auf <html>-Attribute
function TweaksBridge() {
  const defaults = /*EDITMODE-BEGIN*/{
    "density": "comfortable",
    "tone": "knapp",
    "thresholdShift": 0,
    "showWhyByDefault": true
  }/*EDITMODE-END*/;
  const [tweaks, setTweak] = useTweaks(defaults);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-density", tweaks.density);
    // Threshold-shift via globaler Helper (mechanisms.js liest direkte Werte; wir injizieren über window)
    window.__thresholdShift = tweaks.thresholdShift;
    window.__tone = tweaks.tone;
    window.__showWhy = tweaks.showWhyByDefault;
  }, [tweaks]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Darstellung">
        <TweakRadio label="Dichte" valueKey="density" value={tweaks.density}
                    options={[{value:"compact",label:"Kompakt"},{value:"comfortable",label:"Komfort"}]}
                    setTweak={setTweak} />
        <TweakRadio label="Berichtston" valueKey="tone" value={tweaks.tone}
                    options={[{value:"knapp",label:"knapp"},{value:"ausführlich",label:"ausführlich"}]}
                    setTweak={setTweak} />
      </TweakSection>
      <TweakSection title="Vorschlagslogik">
        <TweakSlider label="Schwelle verschieben" valueKey="thresholdShift"
                     value={tweaks.thresholdShift} min={-2} max={2} step={1}
                     setTweak={setTweak} />
        <p style={{ fontSize: 11, color: "var(--ink-3)", margin: "0 0 6px" }}>
          0 = Standard. Negativ = mehr Vorschläge, positiv = strenger.
        </p>
        <TweakToggle label={"\u201eWarum vorgeschlagen?\u201c standardmäßig offen"}
                     valueKey="showWhyByDefault" value={tweaks.showWhyByDefault}
                     setTweak={setTweak} />
      </TweakSection>
    </TweaksPanel>
  );
}

window.TweaksBridge = TweaksBridge;
