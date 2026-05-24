// pages-secondary.jsx — services, how-it-works, about, contact, faq, dropshipping, legal

/* ============ SERVICES PAGE ============ */
function PageServices({ t }) {
  return (
    <div className="page-enter">
      <section className="section page-head-section">
        <div className="mesh-bg" aria-hidden="true" />
        <div className="wrap section-head" style={{ marginBottom: 32 }}>
          <span className="eyebrow">{t.services.eyebrow}</span>
          <h1 className="h-display" style={{ fontSize: "clamp(40px,7vw,80px)" }}>
            {t.services.title1} <span className="italic">{t.services.title2}</span> {t.services.title3}
          </h1>
          <p className="kicker">{t.services.kicker}</p>
        </div>
      </section>
      <Services t={t} />
      <FinalCTA t={t} />
    </div>
  );
}

/* ============ HOW-IT-WORKS PAGE ============ */
function PageHow({ t }) {
  return (
    <div className="page-enter">
      <section className="section page-head-section">
        <div className="mesh-bg" aria-hidden="true" />
        <div className="wrap section-head" style={{ marginBottom: 32 }}>
          <span className="eyebrow">{t.how.eyebrow}</span>
          <h1 className="h-display" style={{ fontSize: "clamp(40px,7vw,80px)" }}>
            {t.how.title1} <span className="italic">{t.how.title2}</span> {t.how.title3}
          </h1>
          <p className="kicker">{t.how.kicker}</p>
        </div>
      </section>
      <HowItWorks t={t} />
      <FinalCTA t={t} />
    </div>
  );
}

/* ============ ABOUT PAGE ============ */
function PageAbout({ t }) {
  return (
    <div className="page-enter">
      <section className="section page-head-section">
        <div className="mesh-bg" aria-hidden="true" />
        <div className="wrap section-head" style={{ marginBottom: 48 }}>
          <span className="eyebrow">{t.about.eyebrow}</span>
          <h1 className="h-display" style={{ fontSize: "clamp(40px,7vw,80px)" }}>
            {t.about.title}
          </h1>
          <p className="kicker">{t.about.kicker}</p>
        </div>

        <div className="wrap about-meta">
          <div className="about-meta-item">
            <div className="label">{t.about.foundedLabel}</div>
            <div className="about-meta-val">Fahad bin Sultan</div>
          </div>
          <div className="about-meta-item">
            <div className="label">{t.about.basedLabel}</div>
            <div className="about-meta-val">Erkrath, NRW 🇩🇪</div>
          </div>
          <div className="about-meta-item">
            <div className="label">{t.about.teamLabel}</div>
            <div className="about-meta-val">Owner-operated</div>
          </div>
        </div>
      </section>

      <section className="section section-sm">
        <div className="wrap about-mission">
          <div className="about-mission-left">
            <span className="eyebrow">{t.about.missionTitle}</span>
          </div>
          <div className="about-mission-right">
            <p className="about-mission-body">{t.about.missionBody}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{t.about.valuesTitle}</span>
            <h2 className="h-section">
              <span className="italic">Wie</span> wir arbeiten.
            </h2>
          </div>
          <div className="values-grid">
            {t.about.values.map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-num">0{i+1}</div>
                <h3 className="value-title">{v.t}</h3>
                <p className="value-desc">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <FounderCard t={t} />
        </div>
      </section>

      <FinalCTA t={t} />
    </div>
  );
}

function FounderCard({ t }) {
  return (
    <div className="founder-card">
      <div className="founder-photo">
        {/* photo placeholder using initials + gradient */}
        <div className="founder-photo-inner">
          <span className="founder-photo-init">F</span>
          <span className="founder-photo-tag">PHOTO</span>
        </div>
      </div>
      <div className="founder-body">
        <span className="label">Gründer</span>
        <h3 className="founder-name">{t.founder.name}</h3>
        <div className="founder-role">{t.founder.role}</div>
        <p className="founder-bio">{t.founder.bio}</p>
        <div className="founder-socials">
          <a href="#" className="badge">LinkedIn</a>
          <a href="#" className="badge">Email</a>
        </div>
      </div>
    </div>
  );
}

/* ============ CONTACT PAGE ============ */
function PageContact({ t }) {
  const [form, setForm] = React.useState({ name: "", email: "", company: "", topic: t.contact.topics[0], message: "" });
  const [sent, setSent] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4500);
    setForm({ name: "", email: "", company: "", topic: t.contact.topics[0], message: "" });
  };
  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="page-enter">
      <section className="section page-head-section">
        <div className="mesh-bg" aria-hidden="true" />
        <div className="wrap section-head" style={{ marginBottom: 56 }}>
          <span className="eyebrow">{t.contact.eyebrow}</span>
          <h1 className="h-display" style={{ fontSize: "clamp(44px,8vw,96px)" }}>
            {t.contact.title1} <span className="italic">{t.contact.title2}</span>
          </h1>
          <p className="kicker">{t.contact.kicker}</p>
        </div>
      </section>

      <section className="section section-sm" style={{ paddingTop: 0 }}>
        <div className="wrap contact-grid">
          <div className="contact-side">
            <div className="contact-side-block">
              <div className="label">{t.contact.address}</div>
              <div className="contact-side-val">
                ScalewithFahad / Primashop<br />
                Inhaber Fahad bin Sultan<br />
                Neuenhausplatz 55<br />
                40699 Erkrath, Deutschland
              </div>
            </div>
            <div className="contact-side-block">
              <div className="label">{t.contact.hours}</div>
              <div className="contact-side-val">{t.contact.hoursValue}</div>
            </div>
            <div className="contact-side-block">
              <div className="label">{t.contact.response}</div>
              <div className="contact-side-val">{t.contact.responseValue}</div>
            </div>
            <div className="contact-side-block">
              <div className="label">{t.nav.contact}</div>
              <div className="contact-side-val">
                <a href="mailto:fahad786sultan@gmail.com">fahad786sultan@gmail.com</a><br />
                <a href={window.WA} target="_blank" rel="noopener">💬 WhatsApp · +49 155 1053 2359</a>
              </div>
            </div>

            <a href={window.WA}
               target="_blank" rel="noopener"
               className="btn btn-gold contact-book"
            >
              <Icon.clock />
              💬 {t.contact.bookCall}
              <span className="arrow"><Icon.arrow /></span>
            </a>
          </div>

          <form className="contact-form" onSubmit={submit}>
            <div className="contact-form-row">
              <label className="contact-field">
                <span className="label">{t.contact.name}</span>
                <input required className="input" value={form.name} onChange={upd("name")} placeholder="Max Mustermann" />
              </label>
              <label className="contact-field">
                <span className="label">{t.contact.email}</span>
                <input required type="email" className="input" value={form.email} onChange={upd("email")} placeholder="max@firma.de" />
              </label>
            </div>
            <label className="contact-field">
              <span className="label">{t.contact.company}</span>
              <input className="input" value={form.company} onChange={upd("company")} placeholder="Mustermann GmbH" />
            </label>
            <label className="contact-field">
              <span className="label">{t.contact.topic}</span>
              <div className="contact-topics">
                {t.contact.topics.map((tp) => (
                  <button
                    type="button"
                    key={tp}
                    className={"contact-topic" + (form.topic === tp ? " active" : "")}
                    onClick={() => setForm({ ...form, topic: tp })}
                  >{tp}</button>
                ))}
              </div>
            </label>
            <label className="contact-field">
              <span className="label">{t.contact.message}</span>
              <textarea required className="input" rows="5" value={form.message} onChange={upd("message")} placeholder="..." />
            </label>
            <button type="submit" className="btn btn-gold contact-submit">
              {t.contact.send}
              <span className="arrow"><Icon.arrow /></span>
            </button>
            {sent && <div className="contact-sent"><Icon.check /> {t.contact.sent}</div>}
          </form>
        </div>
      </section>
    </div>
  );
}

/* ============ FAQ PAGE ============ */
function PageFaq({ t }) {
  return (
    <div className="page-enter">
      <section className="section page-head-section">
        <div className="mesh-bg" aria-hidden="true" />
        <div className="wrap section-head" style={{ marginBottom: 32 }}>
          <span className="eyebrow">{t.faq.eyebrow}</span>
          <h1 className="h-display" style={{ fontSize: "clamp(44px,8vw,96px)" }}>
            {t.faq.title1}<br /><span className="italic">{t.faq.title2}</span>
          </h1>
        </div>
      </section>
      <FaqSection t={t} />
      <FinalCTA t={t} />
    </div>
  );
}

/* ============ DROPSHIPPING PAGE ============ */
function PageDropshipping({ t }) {
  return (
    <div className="page-enter">
      <section className="section page-head-section">
        <div className="mesh-bg" aria-hidden="true" />
        <Particles count={20} />
        <div className="wrap section-head" style={{ marginBottom: 48 }}>
          <span className="eyebrow">{t.drop.eyebrow}</span>
          <h1 className="h-display" style={{ fontSize: "clamp(44px,8vw,90px)" }}>
            {t.drop.title}
          </h1>
          <p className="kicker">{t.drop.kicker}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap drop-what">
          <div>
            <span className="eyebrow">{t.drop.whatTitle}</span>
            <h2 className="h-section" style={{ marginTop: 12 }}>
              <span className="italic">Mit System.</span> Mit Compliance.
            </h2>
          </div>
          <p className="kicker drop-what-body">{t.drop.whatBody}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap drop-prosCons">
          <div className="drop-col drop-col-pros">
            <div className="drop-col-head">
              <Icon.check />
              <span>Vorteile</span>
            </div>
            {t.drop.pros.map((p, i) => (
              <div key={i} className="drop-row">
                <div className="drop-row-t">{p.t}</div>
                <div className="drop-row-d">{p.d}</div>
              </div>
            ))}
          </div>
          <div className="drop-col drop-col-cons">
            <div className="drop-col-head">
              <Icon.x />
              <span>Risiken (die wir lösen)</span>
            </div>
            {t.drop.cons.map((p, i) => (
              <div key={i} className="drop-row">
                <div className="drop-row-t">{p.t}</div>
                <div className="drop-row-d">{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{t.drop.rulesTitle}</span>
            <h2 className="h-section">Saubere Praxis,<br/><span className="italic">non-negotiable.</span></h2>
          </div>
          <ul className="drop-rules">
            {t.drop.rules.map((r, i) => (
              <li key={i} className="drop-rule">
                <span className="drop-rule-num">{String(i+1).padStart(2, "0")}</span>
                <span className="drop-rule-text">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA t={t} />
    </div>
  );
}

/* ============ LEGAL / VAT GUIDE ============ */
function PageLegal({ t }) {
  return (
    <div className="page-enter">
      <section className="section page-head-section">
        <div className="mesh-bg" aria-hidden="true" />
        <div className="wrap section-head" style={{ marginBottom: 32 }}>
          <span className="eyebrow">{t.legal.eyebrow}</span>
          <h1 className="h-display" style={{ fontSize: "clamp(40px,7vw,80px)" }}>
            {t.legal.title}
          </h1>
          <p className="kicker">{t.legal.kicker}</p>
        </div>
      </section>

      <section className="section section-sm" style={{ paddingTop: 0 }}>
        <div className="wrap legal-grid">
          {t.legal.sections.map((s, i) => (
            <article key={i} className="legal-card">
              <div className="legal-card-num">§{String(i+1).padStart(2,"0")}</div>
              <h3 className="legal-card-title">{s.t}</h3>
              <p className="legal-card-body">{s.b}</p>
            </article>
          ))}
        </div>

        <div className="wrap" style={{ marginTop: 48 }}>
          <div className="legal-disclaimer">
            <Icon.shield />
            <span>{t.legal.disclaimer}</span>
          </div>
        </div>
      </section>

      <FinalCTA t={t} />
    </div>
  );
}

Object.assign(window, {
  PageServices, PageHow, PageAbout, PageContact, PageFaq, PageDropshipping, PageLegal,
});
