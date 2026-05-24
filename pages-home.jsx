// pages-home.jsx — homepage composition

function PageHome({ t, lang }) {
  return (
    <div className="page-enter">
      <Hero t={t} />
      <TrustBar t={t} />
      <Services t={t} />
      <VpsSection t={t} />
      <HowItWorks t={t} />
      <CalcSection t={t} />
      <TrustpilotSection t={t} />
      <EligibilitySection t={t} />
      <TrustSection t={t} />
      <BlogSection t={t} />
      <FaqSection t={t} />
      <FinalCTA t={t} />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero({ t }) {
  return (
    <section className="hero">
      <div className="mesh-bg" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />
      <Particles count={28} />

      <div className="wrap hero-inner">
        <div className="hero-content">
          <span className="eyebrow">{t.hero.eyebrow}</span>
          <h1 className="h-display hero-title">
            {t.hero.title1}<br />
            <span className="italic">{t.hero.title2}</span><br />
            {t.hero.title3}
          </h1>
          <p className="kicker hero-kicker">{t.hero.kicker}</p>

          <div className="hero-ctas">
            <a href={window.WA}
               target="_blank" rel="noopener"
               className="btn btn-gold">
              💬 {t.hero.cta1}
              <span className="arrow"><Icon.arrow /></span>
            </a>
            <a href="#/services"
               onClick={(e) => { e.preventDefault(); window.navigate("/services"); }}
               className="btn btn-ghost">
              {t.hero.cta2}
            </a>
          </div>

          <div className="hero-trust">
            <div className="hero-trust-stars">
              {[0,1,2,3].map(i => <Icon.star key={i} style={{ color: "var(--gold)" }} />)}
              <Icon.star style={{ color: "var(--gold)", opacity: 0.35 }} />
              <span style={{ marginLeft: 8, fontSize: 13, color: "var(--text-dim)" }}>{t.hero.trust}</span>
            </div>
            <div className="hero-trust-badges">
              <span className="badge"><span className="dot" /> 0€ Vorab</span>
              <span className="badge"><span className="dot" /> MwSt.-konform</span>
              <span className="badge"><span className="dot" /> §126a BGB</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <DashboardFloater />
        </div>
      </div>

      <div className="hero-stats wrap">
        <Stat n={0} prefix="" suffix="€" label={t.hero.yearsLabel} />
        <Divider />
        <Stat n={50} suffix="%" label={t.hero.storesLabel} />
        <Divider />
        <Stat n={800} prefix="€" label={t.hero.gmvLabel} />
        <Divider />
        <Stat n={4.0} decimals={1} suffix="★" label={t.hero.uptimeLabel} format={false} />
      </div>
    </section>
  );
}

function Stat({ n, prefix, suffix, decimals = 0, label, format = true }) {
  return (
    <div className="hero-stat">
      <div className="hero-stat-val">
        <Counter to={n} prefix={prefix} suffix={suffix} decimals={decimals} format={format} />
      </div>
      <div className="label">{label}</div>
    </div>
  );
}

function Divider() {
  return <div className="hero-stat-divider" aria-hidden="true" />;
}

function DashboardFloater() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onMove = (e) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      ref.current.style.transform =
        `perspective(1400px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateZ(0)`;
    };
    const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
    const el = ref.current;
    el?.addEventListener("mousemove", onMove);
    el?.addEventListener("mouseleave", onLeave);
    return () => {
      el?.removeEventListener("mousemove", onMove);
      el?.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return (
    <div className="dash-tilt" ref={ref}>
      <Dashboard />
    </div>
  );
}

/* ---------- TRUST BAR ---------- */
function TrustBar({ t }) {
  const items = [
    "◆ Bewusst limitierte Mandate",
    "◆ Business-Accounts only",
    "◆ MwSt.-konform",
    "◆ 50% Profit Share",
    "◆ Kein Coaching-Hochglanz",
    "◆ Owner-operated",
    "◆ Direkt auf WhatsApp",
    "◆ Erkrath, NRW 🇩🇪",
    "◆ Trustpilot 4.0★",
  ];
  return (
    <section className="trust-bar">
      <div className="wrap">
        <div className="label" style={{ textAlign: "center", marginBottom: 28 }}>{t.hero.trust}</div>
        <div className="trust-bar-row">
          {[...items, ...items].map((it, i) => (
            <span key={i} className="trust-bar-item">{it}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SERVICES ---------- */
function Services({ t }) {
  const icons = [Icon.bolt, Icon.truck, Icon.shield, Icon.search, Icon.scale, Icon.clock, Icon.box, Icon.euro];
  return (
    <section className="section services-section" id="services">
      <div className="mesh-bg" aria-hidden="true" style={{ opacity: 0.4 }} />
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{t.services.eyebrow}</span>
          <h2 className="h-section">
            {t.services.title1} <span className="italic">{t.services.title2}</span> {t.services.title3}
          </h2>
          <p className="kicker">{t.services.kicker}</p>
        </div>

        <div className="services-grid">
          {t.services.items.map((s, i) => {
            const I = icons[i];
            return (
              <article key={i} className={"service-card" + (i === 0 ? " service-card-feature" : "")}>
                <div className="service-card-top">
                  <div className="service-icon"><I /></div>
                  <span className="chip gold">{s.tag}</span>
                </div>
                <h3 className="service-title">{s.t}</h3>
                <p className="service-desc">{s.d}</p>
                <div className="service-foot">
                  <span className="service-num">0{i+1}</span>
                  <span className="service-learn">{t.services.learnMore} <Icon.arrow /></span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS ---------- */
function HowItWorks({ t }) {
  return (
    <section className="section how-section" id="how">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{t.how.eyebrow}</span>
          <h2 className="h-section">
            {t.how.title1} <span className="italic">{t.how.title2}</span> {t.how.title3}
          </h2>
          <p className="kicker">{t.how.kicker}</p>
        </div>

        <ol className="how-list">
          {t.how.steps.map((s, i) => (
            <li key={i} className="how-step">
              <div className="how-step-num">
                <span className="how-step-num-text">{s.n}</span>
                <span className="how-step-num-bg" aria-hidden="true">{s.n}</span>
              </div>
              <div className="how-step-body">
                <h3 className="how-step-title">{s.t}</h3>
                <p className="how-step-desc">{s.d}</p>
              </div>
              {i < t.how.steps.length - 1 && <span className="how-step-line" aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- TRUST PILLARS ---------- */
function TrustSection({ t }) {
  return (
    <section className="section trust-section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{t.trust.eyebrow}</span>
          <h2 className="h-section">
            {t.trust.title1}<br /><span className="italic">{t.trust.title2}</span>
          </h2>
          <p className="kicker">{t.trust.kicker}</p>
        </div>

        <div className="trust-grid">
          {t.trust.pillars.map((p, i) => (
            <div key={i} className="trust-pillar">
              <div className="trust-pillar-icon"><Icon.check /></div>
              <h3 className="trust-pillar-title">{p.t}</h3>
              <p className="trust-pillar-desc">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS (placeholder) ---------- */
function Testimonials({ t }) {
  const placeholders = [
    { name: "M. Schneider", co: "Hamburg, DE", q: "[Placeholder] Detaillierte Aussage über ROI, Vertrauen und Service-Qualität — wird nach Kundenfreigabe ergänzt." },
    { name: "A. Yilmaz",    co: "Berlin, DE",  q: "[Placeholder] Quote zur sauberen Compliance-Arbeit und schnellem Onboarding — Freigabe ausstehend." },
    { name: "L. Hofmann",   co: "München, DE", q: "[Placeholder] Aussage über Skalierung, Reporting-Transparenz und langfristige Partnerschaft." },
  ];
  return (
    <section className="section testimonials-section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{t.testimonials.eyebrow}</span>
          <h2 className="h-section">
            {t.testimonials.title1} <span className="italic">{t.testimonials.title2}</span>
          </h2>
          <p className="kicker">{t.testimonials.pH}</p>
        </div>

        <div className="testimonials-grid">
          {placeholders.map((p, i) => (
            <figure key={i} className="testimonial">
              <div className="testimonial-stars">
                {[0,1,2,3,4].map(j => <Icon.star key={j} style={{ color: "var(--gold)" }} />)}
              </div>
              <blockquote className="testimonial-quote">"{p.q}"</blockquote>
              <figcaption className="testimonial-foot">
                <div className="testimonial-avatar">{p.name.split(" ").map(n=>n[0]).join("")}</div>
                <div>
                  <div className="testimonial-name">{p.name}</div>
                  <div className="testimonial-co">{p.co}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FaqSection({ t }) {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section faq-section" id="faq">
      <div className="wrap faq-wrap">
        <div className="faq-head">
          <span className="eyebrow">{t.faq.eyebrow}</span>
          <h2 className="h-section">
            {t.faq.title1}<br /><span className="italic">{t.faq.title2}</span>
          </h2>
        </div>

        <ul className="faq-list">
          {t.faq.items.map((f, i) => (
            <li key={i} className={"faq-item" + (open === i ? " open" : "")}>
              <button
                className="faq-q"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span>{f.q}</span>
                <span className="faq-toggle"><Icon.plus /></span>
              </button>
              <div className="faq-a-wrap">
                <p className="faq-a">{f.a}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCTA({ t }) {
  return (
    <section className="section final-cta-section">
      <div className="mesh-bg" aria-hidden="true" style={{ opacity: 0.7 }} />
      <Particles count={20} />
      <div className="wrap final-cta-inner">
        <h2 className="h-display final-cta-title">
          {t.cta.title1}<br />
          <span className="italic">{t.cta.title2}</span>
          {t.cta.title3 ? <><br />{t.cta.title3}</> : null}
        </h2>
        <p className="kicker" style={{ maxWidth: "48ch", margin: "0 auto" }}>{t.cta.kicker}</p>
        <div className="final-cta-row">
          <a href={window.WA} target="_blank" rel="noopener" className="btn btn-gold final-cta-btn">
            💬 {t.cta.btn}
            <span className="arrow"><Icon.arrow /></span>
          </a>
          <a href="#/services"
             onClick={(e) => { e.preventDefault(); window.navigate("/services"); }}
             className="btn btn-ghost final-cta-btn">
            {t.cta.btnSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}

window.PageHome = PageHome;
window.FaqSection = FaqSection;
window.FinalCTA = FinalCTA;
