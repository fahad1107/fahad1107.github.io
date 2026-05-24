// pages-onboarding.jsx — 4-step onboarding with embedded contract signing

function PageOnboarding({ t }) {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({
    slot: null,
    signed: false,
    signature: null,
    agree: false,
    name: "",
    email: "",
    company: "",
    ebay: "",
    revGoal: "5k-20k",
    kyc: false,
  });
  const upd = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const stepValid = [
    () => !!data.slot,
    () => !!data.signed && data.agree,
    () => data.name && data.email && data.kyc,
    () => true,
  ];

  return (
    <div className="page-enter onboarding-page">
      <section className="section page-head-section" style={{ paddingBottom: 32 }}>
        <div className="mesh-bg" aria-hidden="true" />
        <div className="wrap section-head" style={{ marginBottom: 32 }}>
          <span className="eyebrow">{t.onboarding.eyebrow}</span>
          <h1 className="h-display" style={{ fontSize: "clamp(40px,7vw,80px)" }}>
            {t.onboarding.title}
          </h1>
          <p className="kicker">{t.onboarding.kicker}</p>
        </div>

        <div className="wrap">
          <ol className="onb-stepper">
            {t.onboarding.steps.map((s, i) => (
              <li key={i} className={"onb-stepper-item" + (i === step ? " active" : "") + (i < step ? " done" : "")}>
                <span className="onb-stepper-dot">
                  {i < step ? <Icon.check /> : <span>{i + 1}</span>}
                </span>
                <span className="onb-stepper-label">{s}</span>
                {i < t.onboarding.steps.length - 1 && <span className="onb-stepper-line" />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-sm" style={{ paddingTop: 0 }}>
        <div className="wrap onb-wrap">
          {step === 0 && <OnbStep1 t={t} data={data} upd={upd} />}
          {step === 1 && <OnbStep2 t={t} data={data} upd={upd} />}
          {step === 2 && <OnbStep3 t={t} data={data} upd={upd} />}
          {step === 3 && <OnbStep4 t={t} data={data} />}

          <div className="onb-actions">
            {step > 0 && step < 3 && (
              <button className="btn btn-ghost" onClick={back}>← {t.onboarding.back}</button>
            )}
            <div className="onb-actions-spacer" />
            {step < 3 ? (
              <button
                className="btn btn-gold"
                disabled={!stepValid[step]()}
                onClick={next}
              >
                {step === 0 && t.onboarding.step1.cont}
                {step === 1 && t.onboarding.step2.cont}
                {step === 2 && t.onboarding.step3.cont}
                <span className="arrow"><Icon.arrow /></span>
              </button>
            ) : (
              <button
                className="btn btn-gold"
                onClick={() => window.navigate("/")}
              >
                {t.onboarding.step4.cont}
                <span className="arrow"><Icon.arrow /></span>
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---- Step 1: pick a slot ---- */
function OnbStep1({ t, data, upd }) {
  const days = [
    { d: "Mo", date: "27", month: "Mai" },
    { d: "Di", date: "28", month: "Mai" },
    { d: "Mi", date: "29", month: "Mai" },
    { d: "Do", date: "30", month: "Mai" },
    { d: "Fr", date: "31", month: "Mai" },
  ];
  const times = ["09:00", "10:30", "13:00", "14:30", "16:00"];
  return (
    <div className="onb-step">
      <div className="onb-step-head">
        <span className="label">Schritt 01</span>
        <h2 className="onb-step-title">{t.onboarding.step1.t}</h2>
        <p className="onb-step-desc">{t.onboarding.step1.d}</p>
      </div>

      <div className="onb-cal">
        <div className="onb-cal-head">
          <div className="label">Termin wählen · Mai 2026</div>
          <span className="chip gold">CET / Berlin</span>
        </div>
        <div className="onb-cal-days">
          {days.map((dy, i) => (
            <button
              key={i}
              className={"onb-day" + (data.slot?.dayIdx === i ? " active" : "")}
              onClick={() => upd("slot", { dayIdx: i, day: dy, time: null })}
            >
              <span className="onb-day-dow">{dy.d}</span>
              <span className="onb-day-num">{dy.date}</span>
              <span className="onb-day-mon">{dy.month}</span>
            </button>
          ))}
        </div>
        <div className="hairline" style={{ margin: "20px 0" }} />
        <div className="label" style={{ marginBottom: 12 }}>Uhrzeit</div>
        <div className="onb-times">
          {times.map((tm) => (
            <button
              key={tm}
              className={"onb-time" + (data.slot?.time === tm ? " active" : "")}
              disabled={!data.slot}
              onClick={() => upd("slot", { ...data.slot, time: tm })}
            >{tm}</button>
          ))}
        </div>

        {data.slot?.time && (
          <div className="onb-cal-confirm">
            <Icon.check /> Termin gewählt: {data.slot.day.d}, {data.slot.day.date}. {data.slot.day.month} · {data.slot.time} CET
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- Step 2: contract signing (PandaDoc-style) ---- */
function OnbStep2({ t, data, upd }) {
  const canvasRef = React.useRef(null);
  const [drawing, setDrawing] = React.useState(false);
  const [hasInk, setHasInk] = React.useState(false);

  const getPos = (e, canvas) => {
    const r = canvas.getBoundingClientRect();
    const ev = e.touches ? e.touches[0] : e;
    return { x: (ev.clientX - r.left) * (canvas.width / r.width), y: (ev.clientY - r.top) * (canvas.height / r.height) };
  };
  const start = (e) => { e.preventDefault(); setDrawing(true); const ctx = canvasRef.current.getContext("2d"); const p = getPos(e, canvasRef.current); ctx.beginPath(); ctx.moveTo(p.x, p.y); };
  const move  = (e) => { if (!drawing) return; e.preventDefault(); const ctx = canvasRef.current.getContext("2d"); const p = getPos(e, canvasRef.current); ctx.strokeStyle = getComputedStyle(canvasRef.current).color; ctx.lineWidth = 2.2; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineTo(p.x, p.y); ctx.stroke(); setHasInk(true); };
  const end   = () => {
    if (!drawing) return;
    setDrawing(false);
    upd("signed", true);
    upd("signature", canvasRef.current.toDataURL());
  };
  const clear = () => {
    const c = canvasRef.current; const ctx = c.getContext("2d"); ctx.clearRect(0, 0, c.width, c.height);
    setHasInk(false); upd("signed", false); upd("signature", null);
  };

  return (
    <div className="onb-step">
      <div className="onb-step-head">
        <span className="label">Schritt 02</span>
        <h2 className="onb-step-title">{t.onboarding.step2.t}</h2>
        <p className="onb-step-desc">{t.onboarding.step2.d}</p>
      </div>

      <div className="contract">
        <div className="contract-bar">
          <div className="contract-bar-left">
            <span className="contract-bar-logo">PD</span>
            <div>
              <div className="contract-bar-title">Dienstleistungsvertrag · scale GmbH</div>
              <div className="contract-bar-sub">Powered by PandaDoc · Encrypted end-to-end</div>
            </div>
          </div>
          <div className="contract-bar-right">
            <span className="chip up"><Icon.shield /> Verifiziert</span>
          </div>
        </div>

        <div className="contract-doc">
          <div className="contract-doc-head">
            <Logo />
            <div style={{ textAlign: "right" }}>
              <div className="label" style={{ marginBottom: 4 }}>Vertragsnummer</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>SC-2026-00472</div>
            </div>
          </div>

          <h3 className="contract-doc-title">Dienstleistungsvertrag</h3>
          <p className="contract-doc-meta">zwischen <strong>scale GmbH</strong>, Königstraße 47, 70173 Stuttgart („Auftragnehmer“) und <strong>{data.name || "[Auftraggeber:in]"}</strong> („Auftraggeber“).</p>

          <div className="contract-clause">
            <div className="contract-clause-num">§ 1</div>
            <div>
              <h4>Gegenstand</h4>
              <p>Der Auftragnehmer erbringt eBay-Automation-, Listing- und Account-Management-Leistungen im Umfang des gewählten Tarifs. Die genaue Leistungsbeschreibung ist im Leistungsverzeichnis (Anhang A) geregelt.</p>
            </div>
          </div>
          <div className="contract-clause">
            <div className="contract-clause-num">§ 2</div>
            <div>
              <h4>Vergütung</h4>
              <p>Setup-Fee von 1.490 € netto sowie eine erfolgsabhängige Beteiligung von 18 % auf den monatlichen Nettogewinn. Abrechnung monatlich, fällig 14 Tage nach Rechnungsstellung.</p>
            </div>
          </div>
          <div className="contract-clause">
            <div className="contract-clause-num">§ 3</div>
            <div>
              <h4>Laufzeit & Kündigung</h4>
              <p>Mindestlaufzeit drei Monate ab Setup-Abschluss. Danach monatlich kündbar mit 14 Tagen Frist zum Monatsende. Außerordentliche Kündigung bleibt unberührt.</p>
            </div>
          </div>
          <div className="contract-clause">
            <div className="contract-clause-num">§ 4</div>
            <div>
              <h4>Datenschutz & Compliance</h4>
              <p>Es gilt der separat geschlossene Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO. Alle Verarbeitungen erfolgen in EU-Rechenzentren.</p>
            </div>
          </div>
          <div className="contract-clause" style={{ borderBottom: "none", paddingBottom: 0 }}>
            <div className="contract-clause-num">§ 5</div>
            <div>
              <h4>Gerichtsstand</h4>
              <p>Es gilt deutsches Recht. Gerichtsstand ist Stuttgart, soweit gesetzlich zulässig.</p>
            </div>
          </div>

          <div className="contract-sign">
            <div className="contract-sign-row">
              <div className="contract-sign-side">
                <div className="label">Auftragnehmer</div>
                <div className="contract-sign-name italic-display">Fahad A.</div>
                <div className="contract-sign-meta">Geschäftsführer · scale GmbH<br/>Signiert: 24. Mai 2026, 09:12 CET</div>
              </div>
              <div className="contract-sign-side">
                <div className="label">Auftraggeber</div>
                <div className="contract-sign-pad" data-signed={data.signed ? "1" : "0"}>
                  <canvas
                    ref={canvasRef}
                    width="540"
                    height="160"
                    className="contract-sign-canvas"
                    onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
                    onTouchStart={start} onTouchMove={move} onTouchEnd={end}
                  />
                  {!hasInk && <div className="contract-sign-hint">{t.onboarding.step2.signLabel}</div>}
                </div>
                <div className="contract-sign-actions">
                  <button type="button" className="btn-link" onClick={clear}>{t.onboarding.step2.signClear}</button>
                  <span className="contract-sign-note">{t.onboarding.step2.signNote}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <label className="contract-agree">
          <input
            type="checkbox"
            checked={data.agree}
            onChange={(e) => upd("agree", e.target.checked)}
          />
          <span>
            {t.onboarding.step2.agreeLabel} <a href="#/terms" onClick={(e)=>{e.preventDefault();window.navigate("/terms");}}>{t.onboarding.step2.agreeLink}</a>.
          </span>
        </label>
      </div>
    </div>
  );
}

/* ---- Step 3: KYC / accounts ---- */
function OnbStep3({ t, data, upd }) {
  return (
    <div className="onb-step">
      <div className="onb-step-head">
        <span className="label">Schritt 03</span>
        <h2 className="onb-step-title">{t.onboarding.step3.t}</h2>
        <p className="onb-step-desc">{t.onboarding.step3.d}</p>
      </div>

      <div className="onb-form">
        <div className="onb-form-row">
          <label className="contact-field">
            <span className="label">Vor- & Nachname</span>
            <input required className="input" value={data.name} onChange={(e)=>upd("name", e.target.value)} placeholder="Max Mustermann" />
          </label>
          <label className="contact-field">
            <span className="label">E-Mail</span>
            <input required type="email" className="input" value={data.email} onChange={(e)=>upd("email", e.target.value)} placeholder="max@firma.de" />
          </label>
        </div>
        <div className="onb-form-row">
          <label className="contact-field">
            <span className="label">Firma / Gewerbe</span>
            <input className="input" value={data.company} onChange={(e)=>upd("company", e.target.value)} placeholder="Mustermann GmbH" />
          </label>
          <label className="contact-field">
            <span className="label">eBay Username</span>
            <input className="input" value={data.ebay} onChange={(e)=>upd("ebay", e.target.value)} placeholder="mustermann-de" />
          </label>
        </div>
        <label className="contact-field">
          <span className="label">Umsatzziel pro Monat</span>
          <div className="contact-topics">
            {["unter 5k", "5k–20k", "20k–50k", "50k+"].map((r) => (
              <button key={r} type="button"
                className={"contact-topic" + (data.revGoal === r ? " active" : "")}
                onClick={() => upd("revGoal", r)}>{r}</button>
            ))}
          </div>
        </label>

        <div className="onb-kyc">
          <div className="onb-kyc-head">
            <Icon.shield />
            <div>
              <div className="onb-kyc-title">KYC-Identitätsprüfung</div>
              <div className="onb-kyc-sub">Verifizierung via IDnow / Veriff · GwG-konform · dauert ca. 4 Minuten</div>
            </div>
            <span className="chip gold">Erforderlich</span>
          </div>
          <div className="onb-kyc-row">
            <div className="onb-kyc-step">
              <div className="onb-kyc-step-n">1</div>
              <div>
                <div className="onb-kyc-step-t">Ausweis / Reisepass</div>
                <div className="onb-kyc-step-d">Foto-Upload oder Video-Identifikation</div>
              </div>
              <span className="chip up"><Icon.check /> Bereit</span>
            </div>
            <div className="onb-kyc-step">
              <div className="onb-kyc-step-n">2</div>
              <div>
                <div className="onb-kyc-step-t">Selfie-Liveness-Check</div>
                <div className="onb-kyc-step-d">Bestätigt deine Identität in Echtzeit</div>
              </div>
              <span className="chip up"><Icon.check /> Bereit</span>
            </div>
            <div className="onb-kyc-step">
              <div className="onb-kyc-step-n">3</div>
              <div>
                <div className="onb-kyc-step-t">eBay Multi-User Einladung</div>
                <div className="onb-kyc-step-d">Wir senden Anleitung — du gibst Zugriff, nicht Passwort</div>
              </div>
              <span className="chip up"><Icon.check /> Bereit</span>
            </div>
          </div>
          <label className="onb-kyc-agree">
            <input type="checkbox" checked={data.kyc} onChange={(e)=>upd("kyc", e.target.checked)} />
            <span>Ich starte die KYC-Verifizierung nach Absenden dieses Formulars.</span>
          </label>
        </div>
      </div>
    </div>
  );
}

/* ---- Step 4: confirmation ---- */
function OnbStep4({ t, data }) {
  return (
    <div className="onb-step onb-step-done">
      <div className="onb-done-check">
        <Icon.check />
      </div>
      <div className="onb-step-head" style={{ alignItems: "center", textAlign: "center" }}>
        <span className="label">Geschafft</span>
        <h2 className="onb-step-title" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>{t.onboarding.step4.t}</h2>
        <p className="onb-step-desc" style={{ maxWidth: "44ch" }}>{t.onboarding.step4.d}</p>
      </div>

      <div className="onb-done-summary">
        <div className="onb-done-row">
          <div className="label">Strategiegespräch</div>
          <div>{data.slot ? `${data.slot.day.d}, ${data.slot.day.date}. ${data.slot.day.month} · ${data.slot.time} CET` : "—"}</div>
        </div>
        <div className="onb-done-row">
          <div className="label">Vertrag</div>
          <div>Unterzeichnet · SC-2026-00472</div>
        </div>
        <div className="onb-done-row">
          <div className="label">KYC</div>
          <div>Link wurde an {data.email || "deine E-Mail"} versendet</div>
        </div>
        <div className="onb-done-row">
          <div className="label">Nächster Schritt</div>
          <div>Bestätigung & Kalender-Invite innerhalb von 2 Stunden</div>
        </div>
      </div>
    </div>
  );
}

window.PageOnboarding = PageOnboarding;
