// layout.jsx — header, footer, logo, sticky CTA

const { useState: useS, useEffect: useE } = React;

function Logo({ size = 22 }) {
  return (
    <a
      href="#/"
      onClick={(e) => { e.preventDefault(); window.navigate("/"); }}
      className="brand-logo"
      aria-label="scale"
    >
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="logoG" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--gold-2)" />
            <stop offset="100%" stopColor="var(--gold-3)" />
          </linearGradient>
        </defs>
        <path d="M4 16c0-6.6 5.4-12 12-12s12 5.4 12 12-5.4 12-12 12" stroke="url(#logoG)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M16 4v24M4 16h12" stroke="url(#logoG)" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="16" cy="16" r="2" fill="url(#logoG)" />
      </svg>
      <span className="brand-wordmark">ScaleWith<i>Fahad</i></span>
    </a>
  );
}

function LangToggle({ lang, setLang }) {
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <Icon.globe style={{ marginRight: 4, opacity: 0.5 }} />
      <button
        className={"lang-opt" + (lang === "de" ? " active" : "")}
        onClick={() => setLang("de")}
        aria-pressed={lang === "de"}
      >DE</button>
      <span className="lang-divider">·</span>
      <button
        className={"lang-opt" + (lang === "en" ? " active" : "")}
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
      >EN</button>
    </div>
  );
}

function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === "dark" ? <Icon.sun /> : <Icon.moon />}
    </button>
  );
}

function Header({ t, lang, setLang, theme, setTheme, route }) {
  // lang used in label override
  const [scrolled, setScrolled] = useS(false);
  const [open, setOpen] = useS(false);

  useE(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useE(() => { setOpen(false); }, [route]);

  const links = [
    { path: "/services", label: t.nav.services },
    { path: "/vps", label: t.nav.vps },
    { path: "/calculator", label: t.nav.calculator },
    { path: "/blog", label: t.nav.blog },
    { path: "/faq", label: t.nav.faq },
    { path: "/contact", label: t.nav.contact },
  ];

  const go = (p) => (e) => { e.preventDefault(); window.navigate(p); };

  return (
    <header className={"site-header" + (scrolled ? " scrolled" : "")}>
      <div className="wrap site-header-inner">
        <Logo />
        <nav className="site-nav desktop-only">
          {links.map((l) => (
            <a
              key={l.path}
              href={"#" + l.path}
              onClick={go(l.path)}
              className={"nav-link" + (route === l.path ? " active" : "")}
            >{l.label}</a>
          ))}
        </nav>

        <div className="site-header-actions">
          <LangToggle lang={lang} setLang={setLang} />
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <a
            href={window.WA}
            target="_blank"
            rel="noopener"
            className="btn btn-gold desktop-only header-cta-wa"
          >
            💬 {t.nav.bookCall}
            <span className="arrow"><Icon.arrow /></span>
          </a>
          <button className="hamburger mobile-only" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <Icon.x /> : <Icon.menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu mobile-only">
          {links.map((l) => (
            <a key={l.path} href={"#" + l.path} onClick={go(l.path)} className="mobile-link">
              {l.label}
              <Icon.arrow />
            </a>
          ))}
          <a href="#/about" onClick={go("/about")} className="mobile-link">
            {t.nav.about}<Icon.arrow />
          </a>
          <a href="#/ebay-dropshipping-germany" onClick={go("/ebay-dropshipping-germany")} className="mobile-link">
            {t.nav.dropshipping}<Icon.arrow />
          </a>
          <a href="#/eligibility" onClick={go("/eligibility")} className="mobile-link">
            {t.nav.eligibility}<Icon.arrow />
          </a>
          <a href={window.WA} target="_blank" rel="noopener" className="btn btn-gold" style={{ marginTop: 12 }}>
            💬 {t.nav.bookCall}
            <span className="arrow"><Icon.arrow /></span>
          </a>
        </div>
      )}
    </header>
  );
}

function Footer({ t }) {
  const go = (p) => (e) => { e.preventDefault(); window.navigate(p); };

  const seoLinks = [
    { href: "https://scalewithfahad.de/ebay-dropshipping-deutschland", label: "eBay Dropshipping Deutschland" },
    { href: "https://scalewithfahad.de/ebay-dropshipping-germany", label: "eBay Dropshipping Germany" },
    { href: "https://scalewithfahad.de/ebay-automation-germany", label: "eBay Automation Germany" },
    { href: "https://scalewithfahad.de/ebay-dropshipping-deutschland-kosten.html", label: "eBay Dropshipping Kosten" },
    { href: "https://scalewithfahad.de/dropshipping-deutschland.html", label: "Dropshipping Deutschland" },
    { href: "https://scalewithfahad.de/dropshipping-produkte-deutschland.html", label: "Beste Dropshipping Produkte" },
    { href: "https://scalewithfahad.de/ist-ebay-dropshipping-legal-deutschland.html", label: "Ist Dropshipping legal?" },
    { href: "https://scalewithfahad.de/ebay-business-starten-deutschland.html", label: "eBay Business starten" },
    { href: "https://scalewithfahad.de/ebay-vat-guide-germany", label: "eBay VAT Guide" },
    { href: "https://scalewithfahad.de/blog.html", label: "Blog · Alle Guides" },
  ];

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p className="footer-tagline">{t.footer.tagline}</p>
            <div className="footer-badges">
              <span className="badge"><span className="dot" />{t.footer.madeIn}</span>
              <span className="badge"><span className="dot" />USt-Id DE453914117</span>
            </div>
            <div className="footer-socials-row">
              <a href="https://www.instagram.com/scalewith.fahad/" target="_blank" rel="noopener" className="footer-social">📸 Instagram</a>
              <a href="https://www.tiktok.com/@scalewithfahad" target="_blank" rel="noopener" className="footer-social">🎵 TikTok</a>
              <a href="https://www.facebook.com/groups/onlinemoneyingermany" target="_blank" rel="noopener" className="footer-social">👥 Facebook</a>
              <a href="https://de.trustpilot.com/review/scalewithfahad.de" target="_blank" rel="noopener" className="footer-social">⭐ Trustpilot</a>
              <a href={window.WA} target="_blank" rel="noopener" className="footer-social">💬 WhatsApp</a>
            </div>
          </div>

          <div className="footer-col">
            <div className="label">{t.footer.company}</div>
            <a href="#/about" onClick={go("/about")}>{t.nav.about}</a>
            <a href="#/services" onClick={go("/services")}>{t.nav.services}</a>
            <a href="#/vps" onClick={go("/vps")}>{t.nav.vps}</a>
            <a href="#/calculator" onClick={go("/calculator")}>{t.nav.calculator}</a>
            <a href="#/eligibility" onClick={go("/eligibility")}>{t.nav.eligibility}</a>
            <a href="#/blog" onClick={go("/blog")}>{t.nav.blog}</a>
          </div>

          <div className="footer-col">
            <div className="label">{t.footer.contact}</div>
            <a href={window.WA} target="_blank" rel="noopener">💬 WhatsApp · +49 155 1053 2359</a>
            <a href="mailto:fahad786sultan@gmail.com">✉ fahad786sultan@gmail.com</a>
            <a href="#/contact" onClick={go("/contact")}>{t.nav.contact}</a>
            <a href="#/faq" onClick={go("/faq")}>{t.nav.faq}</a>
            <a href="#/reviews" onClick={go("/reviews")}>{t.nav.reviews}</a>
          </div>

          <div className="footer-col">
            <div className="label">{t.footer.legal}</div>
            <a href="#/legal" onClick={go("/legal")}>{t.nav.legal}</a>
            <a href="#/terms" onClick={go("/terms")}>{t.nav.terms}</a>
            <a href="#/privacy" onClick={go("/privacy")}>{t.nav.privacy}</a>
            <a href="#/imprint" onClick={go("/imprint")}>{t.nav.imprint}</a>
            <a href="#/ebay-dropshipping-germany" onClick={go("/ebay-dropshipping-germany")}>{t.nav.dropshipping}</a>
          </div>
        </div>

        <div className="hairline" />

        <div className="footer-seo">
          <div className="label" style={{ marginBottom: 12 }}>{t.footer.seoLinks}</div>
          <div className="footer-seo-links">
            {seoLinks.map((l, i) => (
              <a key={i} href={l.href} target="_blank" rel="noopener">{l.label}</a>
            ))}
          </div>
        </div>

        <div className="hairline" />

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ScalewithFahad · Ein Service der Primashop · Inhaber Fahad bin Sultan · Neuenhausplatz 55, 40699 Erkrath · USt-IdNr. DE453914117</span>
        </div>
      </div>
    </footer>
  );
}

function StickyCTA({ t, route }) {
  if (route === "/onboarding") return null;
  return null; // Replaced by FloatingWhatsApp + MobileStickyBar
}

Object.assign(window, { Logo, Header, Footer, StickyCTA });
