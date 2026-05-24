// pages-extras.jsx — VPS, Calculator, Eligibility, Blog sections + floating WhatsApp

/* =========================================================
   FLOATING WHATSAPP BUTTON
   ========================================================= */
function FloatingWhatsApp({ route }) {
  if (route === "/onboarding") return null;
  return (
    <a
      href={window.WA}
      target="_blank"
      rel="noopener"
      className="wa-fab"
      aria-label="WhatsApp"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.1-3.6-.3-.5.3-.5.8-1.5.1-.2 0-.3 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.6.7.6-.1 1.8-.7 2-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.2zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3L2 22l4.8-1.5c1.5.9 3.3 1.4 5.2 1.4 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.7 0-3.3-.5-4.7-1.4l-.3-.2-3.3 1.1 1.1-3.2-.2-.3c-1-1.5-1.6-3.3-1.6-5.1 0-5 4.1-9 9-9s9 4.1 9 9-4.1 9-9 9z" />
      </svg>
      <span className="wa-fab-label">WhatsApp</span>
      <span className="wa-fab-pulse" aria-hidden="true" />
    </a>
  );
}

/* =========================================================
   STICKY MOBILE CTA BAR
   ========================================================= */
function MobileStickyBar({ t, route }) {
  if (route === "/onboarding") return null;
  return (
    <div className="mobile-sticky-bar mobile-only">
      <a href={window.WA} target="_blank" rel="noopener" className="msb-primary">
        <span className="msb-dot" />
        {t.nav.bookCall}
      </a>
      <a
        href="#/onboarding"
        onClick={(e) => { e.preventDefault(); window.navigate("/onboarding"); }}
        className="msb-secondary"
      >
        Start →
      </a>
    </div>
  );
}

/* =========================================================
   VPS SECTION (HOMEPAGE + STANDALONE PAGE)
   ========================================================= */
function VpsSection({ t, full = false }) {
  const v = t.vps;
  return (
    <section className={"section vps-section" + (full ? " vps-full" : "")} id="vps">
      <div className="mesh-bg" aria-hidden="true" style={{ opacity: 0.5 }} />
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{v.eyebrow}</span>
          <h2 className="h-section">
            {v.title1}<br /><span className="italic">{v.title2}</span>
          </h2>
          <p className="kicker">{v.kicker}</p>
        </div>

        <div className="vps-grid">
          <div className="vps-card">
            <div className="vps-card-head">
              <span className="chip gold">{v.planTag}</span>
              <div className="vps-card-price">
                <span className="vps-card-price-val">{v.price}</span>
                <span className="vps-card-price-per">{v.pricePer}</span>
              </div>
            </div>
            <h3 className="vps-card-title">{v.planTitle}</h3>
            <div className="vps-location">📍 {v.planLocation}</div>

            <div className="vps-specs">
              {v.specs.map((s, i) => (
                <div key={i} className="vps-spec">
                  <div className="vps-spec-t">{s.t}</div>
                  <div className="vps-spec-d">{s.d}</div>
                </div>
              ))}
            </div>

            <ul className="vps-features">
              {v.features.map((f, i) => (
                <li key={i}><Icon.check /> {f}</li>
              ))}
            </ul>

            <a
              href="https://scalewithfahad.de/vps/"
              target="_blank"
              rel="noopener"
              className="btn btn-gold vps-cta"
            >
              🚀 {v.cta}
              <span className="arrow"><Icon.arrow /></span>
            </a>
            <div className="vps-affiliate">* {v.affiliate}</div>
          </div>

          <div className="vps-reasons">
            {v.reasons.map((r, i) => (
              <div key={i} className="vps-reason">
                <span className="vps-reason-emoji">{r.emoji}</span>
                <div>
                  <h4 className="vps-reason-t">{r.t}</h4>
                  <p className="vps-reason-d">{r.d}</p>
                </div>
              </div>
            ))}

            <div className="vps-setup">
              <div className="vps-setup-icon">🛠️</div>
              <div>
                <h4 className="vps-setup-title">{v.setupTitle}</h4>
                <p className="vps-setup-body">{v.setupBody}</p>
                <a
                  href={window.WA_TXT("Hallo Fahad, ich möchte den VPS Setup-Service anfragen.")}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-ghost vps-setup-cta"
                >
                  💬 {v.ctaSetup}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   eBay CALCULATOR SECTION + INTERACTIVE PREVIEW
   ========================================================= */
function CalcSection({ t }) {
  const c = t.calc;
  return (
    <section className="section calc-section" id="calculator">
      <div className="wrap">
        <div className="calc-wrap">
          <div className="calc-left">
            <span className="eyebrow">{c.eyebrow}</span>
            <h2 className="h-section" style={{ marginTop: 16 }}>
              {c.title1}<br /><span className="italic">{c.title2}</span>
            </h2>
            <p className="kicker">{c.kicker}</p>

            <ul className="calc-features">
              {c.features.map((f, i) => (
                <li key={i} className="calc-feature">
                  <span className="calc-feature-emoji">{f.e}</span>
                  <div>
                    <div className="calc-feature-t">{f.t}</div>
                    <div className="calc-feature-d">{f.d}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="calc-ctas">
              <a
                href="https://scalewithfahad.de/blog/ebay-calculator.html"
                target="_blank"
                rel="noopener"
                className="btn btn-gold"
              >
                🧮 {c.cta}
                <span className="arrow"><Icon.arrow /></span>
              </a>
              <a
                href="https://scalewithfahad.de/blog/best-products-ebay-germany.html"
                target="_blank"
                rel="noopener"
                className="btn btn-ghost"
              >
                {c.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="calc-right">
            <CalcPreview t={t} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CalcPreview({ t }) {
  const c = t.calc.preview;
  const [country, setCountry] = React.useState("DE");
  const [salePrice, setSalePrice] = React.useState(49.99);
  const [itemCost, setItemCost] = React.useState(18.0);
  const [shipping, setShipping] = React.useState(4.5);
  const FVF = 0.12;
  const VAT = 0.19;
  const ebayFee = salePrice * FVF;
  const vatOnFee = ebayFee * VAT;
  const profit = salePrice - itemCost - shipping - ebayFee - vatOnFee;
  const margin = (profit / salePrice) * 100;
  const breakeven = itemCost + shipping + (itemCost + shipping) * FVF * (1 + VAT) + 1;

  const countries = [
    { c: "DE", flag: "🇩🇪" },
    { c: "UK", flag: "🇬🇧" },
    { c: "US", flag: "🇺🇸" },
    { c: "IT", flag: "🇮🇹" },
    { c: "AU", flag: "🇦🇺" },
  ];
  return (
    <div className="calc-card">
      <div className="calc-card-head">
        <div>
          <span className="chip gold">2026 Rates</span>
          <div className="calc-card-title">🧮 eBay Profit Calculator</div>
        </div>
        <div className="calc-countries">
          {countries.map((co) => (
            <button
              key={co.c}
              className={"calc-country" + (country === co.c ? " active" : "")}
              onClick={() => setCountry(co.c)}
            >{co.flag} {co.c}</button>
          ))}
        </div>
      </div>

      <div className="calc-inputs">
        <CalcField label={c.salePrice} value={salePrice} onChange={setSalePrice} />
        <CalcField label={c.itemCost} value={itemCost} onChange={setItemCost} />
        <CalcField label={c.shipping} value={shipping} onChange={setShipping} />
        <div className="calc-field">
          <div className="label">{c.category}</div>
          <div className="calc-select-mock">Garden & Tools ▾</div>
        </div>
      </div>

      <div className="calc-result">
        <div className="calc-result-main">
          <div className="label">💰 {c.netProfit}</div>
          <div className="calc-profit">€ {profit.toFixed(2).replace(".", ",")}</div>
        </div>
        <div className="calc-result-rows">
          <div className="calc-row"><span>{c.feeLabel}</span><span className="calc-row-v down">−€ {ebayFee.toFixed(2).replace(".", ",")}</span></div>
          <div className="calc-row"><span>{c.vatLabel}</span><span className="calc-row-v down">−€ {vatOnFee.toFixed(2).replace(".", ",")}</span></div>
          <div className="calc-row"><span>{c.marginLabel}</span><span className="calc-row-v up">{margin.toFixed(1).replace(".", ",")}%</span></div>
          <div className="calc-row"><span>{c.breakevenLabel}</span><span className="calc-row-v">€ {breakeven.toFixed(2).replace(".", ",")}</span></div>
        </div>
      </div>
    </div>
  );
}

function CalcField({ label, value, onChange }) {
  return (
    <label className="calc-field">
      <div className="label">{label}</div>
      <div className="calc-input-wrap">
        <span className="calc-input-prefix">€</span>
        <input
          type="number"
          step="0.01"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="calc-input"
        />
      </div>
    </label>
  );
}

/* =========================================================
   ELIGIBILITY CHECKER SECTION
   ========================================================= */
function EligibilitySection({ t }) {
  const e = t.eligibility;
  return (
    <section className="section eligibility-section" id="eligibility">
      <div className="wrap">
        <div className="elig-wrap">
          <div className="elig-left">
            <span className="eyebrow">{e.eyebrow}</span>
            <h2 className="h-section" style={{ marginTop: 16 }}>
              {e.title1} <span className="italic">{e.title2}</span>
            </h2>
            <p className="kicker">{e.kicker}</p>

            <div className="elig-badges">
              {e.badges.map((b, i) => (
                <span key={i} className="elig-badge"><Icon.check /> {b}</span>
              ))}
            </div>

            <div className="elig-permits">
              {e.permits.map((p, i) => (
                <span key={i} className="elig-permit">
                  <span className="elig-permit-emoji">{p.e}</span>
                  {p.t}
                </span>
              ))}
            </div>
          </div>

          <div className="elig-right">
            <div className="elig-card">
              <div className="elig-card-head">
                <span className="chip gold">🇩🇪 3-Step Process</span>
              </div>
              <ol className="elig-steps">
                {e.steps.map((s, i) => (
                  <li key={i} className="elig-step">
                    <div className="elig-step-n">{s.n}</div>
                    <div>
                      <div className="elig-step-t">{s.t}</div>
                      <div className="elig-step-d">{s.d}</div>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="elig-ctas">
                <a
                  href="https://scalewithfahad.de/germany-ecommerce-eligibility-checker.html"
                  target="_blank"
                  rel="noopener"
                  className="btn btn-gold"
                >
                  🇩🇪 {e.cta}
                  <span className="arrow"><Icon.arrow /></span>
                </a>
                <a
                  href={window.WA_TXT("Hi Fahad, I want to check my eligibility to start an online business in Germany.")}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-ghost"
                >
                  💬 {e.ctaWA}
                </a>
              </div>

              <div className="elig-disclaimer">{e.disclaimer}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   BLOG PREVIEW SECTION
   ========================================================= */
function BlogSection({ t }) {
  const b = t.blog;
  return (
    <section className="section blog-section" id="blog">
      <div className="wrap">
        <div className="blog-head">
          <div>
            <span className="eyebrow">{b.eyebrow}</span>
            <h2 className="h-section" style={{ marginTop: 12 }}>
              {b.title1} <span className="italic">{b.title2}</span>
            </h2>
            <p className="kicker">{b.kicker}</p>
          </div>
          <a
            href="https://scalewithfahad.de/blog.html"
            target="_blank"
            rel="noopener"
            className="btn btn-ghost blog-head-cta desktop-only"
          >
            {b.viewAll} <Icon.arrow />
          </a>
        </div>

        <div className="blog-grid">
          {b.items.map((it, i) => (
            <article key={i} className="blog-card">
              <div className="blog-cat">{it.cat}</div>
              <div className="blog-meta">
                <span>{it.date}</span>
                <span className="blog-meta-dot">·</span>
                <span>{it.read}</span>
              </div>
              <h3 className="blog-title">{it.t}</h3>
              <p className="blog-desc">{it.d}</p>
              <div className="blog-foot">
                <span>{b.readArticle}</span>
                <Icon.arrow />
              </div>
            </article>
          ))}
        </div>

        <div className="blog-foot-row mobile-only">
          <a
            href="https://scalewithfahad.de/blog.html"
            target="_blank"
            rel="noopener"
            className="btn btn-ghost"
          >
            {b.viewAll} <Icon.arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   REAL TESTIMONIALS (Trustpilot)
   ========================================================= */
function TrustpilotSection({ t }) {
  return (
    <section className="section testimonials-section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{t.testimonials.eyebrow}</span>
          <h2 className="h-section">
            {t.testimonials.title1} <span className="italic">{t.testimonials.title2}</span>
          </h2>
          <div className="tp-headstats">
            <span className="tp-rating">4.0</span>
            <span className="tp-stars">★★★★<span style={{ opacity: 0.4 }}>★</span></span>
            <span className="tp-meta">{t.testimonials.pH}</span>
          </div>
        </div>

        <div className="testimonials-grid testimonials-grid-2">
          {t.testimonials.items.map((p, i) => (
            <figure key={i} className="testimonial testimonial-verified">
              <div className="testimonial-top">
                <div className="testimonial-avatar">{p.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                <div>
                  <div className="testimonial-name">{p.name}</div>
                  <div className="testimonial-co">{p.co}</div>
                </div>
                <span className="testimonial-verified-badge"><Icon.check /> Verifiziert</span>
              </div>
              <div className="testimonial-stars">
                {[0,1,2,3,4].map(j => <Icon.star key={j} style={{ color: "var(--gold)" }} />)}
              </div>
              <h4 className="testimonial-title">{p.title}</h4>
              <blockquote className="testimonial-quote-2">"{p.q}"</blockquote>
            </figure>
          ))}
        </div>

        <div className="tp-ctas">
          <a
            href="https://de.trustpilot.com/review/scalewithfahad.de"
            target="_blank"
            rel="noopener"
            className="btn btn-ghost"
          >
            ⭐ {t.testimonials.cta}
            <span className="arrow"><Icon.arrow /></span>
          </a>
          <a
            href="https://de.trustpilot.com/evaluate/scalewithfahad.de"
            target="_blank"
            rel="noopener"
            className="btn btn-link"
            style={{ padding: "14px 22px" }}
          >
            {t.testimonials.leaveReview} →
          </a>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   STANDALONE PAGES (wrap sections with a head)
   ========================================================= */
function PageVps({ t }) {
  return (
    <div className="page-enter">
      <VpsSection t={t} full />
      <FinalCTA t={t} />
    </div>
  );
}
function PageCalculator({ t }) {
  return (
    <div className="page-enter">
      <CalcSection t={t} />
      <FinalCTA t={t} />
    </div>
  );
}
function PageEligibility({ t }) {
  return (
    <div className="page-enter">
      <EligibilitySection t={t} />
      <FinalCTA t={t} />
    </div>
  );
}
function PageBlog({ t }) {
  return (
    <div className="page-enter">
      <BlogSection t={t} />
      <FinalCTA t={t} />
    </div>
  );
}
function PageReviews({ t }) {
  return (
    <div className="page-enter">
      <TrustpilotSection t={t} />
      <FinalCTA t={t} />
    </div>
  );
}

Object.assign(window, {
  FloatingWhatsApp, MobileStickyBar,
  VpsSection, CalcSection, EligibilitySection, BlogSection, TrustpilotSection,
  PageVps, PageCalculator, PageEligibility, PageBlog, PageReviews,
});
