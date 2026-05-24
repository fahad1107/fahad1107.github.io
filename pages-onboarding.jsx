// pages-onboarding.jsx — clean 3-step onboarding: WhatsApp → Eligibility → Launch
// NO contract signing, NO setup fee block. Just a clean conversion-focused flow.

function PageOnboarding({ t }) {
  return (
    <div className="page-enter onboarding-page">
      <section className="section page-head-section" style={{ paddingBottom: 24 }}>
        <div className="mesh-bg" aria-hidden="true" />
        <div className="wrap section-head" style={{ marginBottom: 32 }}>
          <span className="eyebrow">{t.onboarding.eyebrow}</span>
          <h1 className="h-display" style={{ fontSize: "clamp(38px,7vw,72px)" }}>
            {t.onboarding.title}
          </h1>
          <p className="kicker">{t.onboarding.kicker}</p>
        </div>

        <div className="wrap">
          <ol className="onb-stepper">
            {t.onboarding.steps.map((s, i) => (
              <li key={i} className="onb-stepper-item active">
                <span className="onb-stepper-dot"><span>{i + 1}</span></span>
                <span className="onb-stepper-label">{s}</span>
                {i < t.onboarding.steps.length - 1 && <span className="onb-stepper-line" />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-sm" style={{ paddingTop: 0 }}>
        <div className="wrap onb-wrap">
          <article className="onb-clean">
            <div className="onb-clean-num">01</div>
            <h2 className="onb-clean-title">{t.onboarding.step1.t}</h2>
            <p className="onb-clean-desc">{t.onboarding.step1.d}</p>
            <a href={window.WA}
               target="_blank" rel="noopener"
               className="btn btn-gold">
              💬 {t.onboarding.step1.cont}
              <span className="arrow"><Icon.arrow /></span>
            </a>
          </article>

          <article className="onb-clean">
            <div className="onb-clean-num">02</div>
            <h2 className="onb-clean-title">{t.onboarding.step2.t}</h2>
            <p className="onb-clean-desc">{t.onboarding.step2.d}</p>
            <a href="https://scalewithfahad.de/germany-ecommerce-eligibility-checker.html"
               target="_blank" rel="noopener"
               className="btn btn-ghost">
              🇩🇪 {t.onboarding.step2.cont}
              <span className="arrow"><Icon.arrow /></span>
            </a>
          </article>

          <article className="onb-clean">
            <div className="onb-clean-num">03</div>
            <h2 className="onb-clean-title">{t.onboarding.step3.t}</h2>
            <p className="onb-clean-desc">{t.onboarding.step3.d}</p>
            <div className="onb-clean-ctas">
              <a href={window.WA} target="_blank" rel="noopener" className="btn btn-gold">
                💬 Book a Free Consultation
                <span className="arrow"><Icon.arrow /></span>
              </a>
              <a href="mailto:fahad786sultan@gmail.com" className="btn btn-ghost">
                ✉ Email Fahad
              </a>
            </div>
          </article>

          <div className="onb-trust-strip">
            <div className="onb-trust-item">
              <span className="onb-trust-dot" />
              Owner-operated · Direkt erreichbar
            </div>
            <div className="onb-trust-item">
              <span className="onb-trust-dot" />
              Keine Vorabgebühr
            </div>
            <div className="onb-trust-item">
              <span className="onb-trust-dot" />
              Bewusst limitierte Mandate
            </div>
            <div className="onb-trust-item">
              <span className="onb-trust-dot" />
              MwSt.-konform
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.PageOnboarding = PageOnboarding;
