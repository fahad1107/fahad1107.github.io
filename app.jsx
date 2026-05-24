// app.jsx — main router + state + page renderer

const { useState: uS, useEffect: uE } = React;

function App() {
  const [lang, setLang] = uS(() => localStorage.getItem("scale.lang") || "de");
  const [theme, setTheme] = uS(() => localStorage.getItem("scale.theme") || "dark");
  const [route, setRoute] = uS(() => window.location.hash.replace(/^#/, "") || "/");

  // theme + lang persistence
  uE(() => { localStorage.setItem("scale.lang", lang); }, [lang]);
  uE(() => {
    localStorage.setItem("scale.theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // hash routing
  uE(() => {
    const onHash = () => {
      const r = window.location.hash.replace(/^#/, "") || "/";
      setRoute(r);
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // navigate helper
  uE(() => {
    window.navigate = (path) => {
      window.location.hash = path;
    };
  }, []);

  const t = window.I18N[lang];

  // ---- tweaks panel (light/dark) ----
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "theme": "dark"
  }/*EDITMODE-END*/;

  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  uE(() => { setTheme(tweaks.theme); }, [tweaks.theme]);

  // route -> page
  let Page;
  switch (route) {
    case "/services":                       Page = <PageServices t={t} />; break;
    case "/how-it-works":                   Page = <PageHow t={t} />; break;
    case "/about":                          Page = <PageAbout t={t} />; break;
    case "/contact":                        Page = <PageContact t={t} />; break;
    case "/faq":                            Page = <PageFaq t={t} />; break;
    case "/ebay-dropshipping-germany":      Page = <PageDropshipping t={t} />; break;
    case "/legal":                          Page = <PageLegal t={t} />; break;
    case "/terms":                          Page = <PageTerms t={t} />; break;
    case "/privacy":                        Page = <PagePrivacy t={t} />; break;
    case "/imprint":                        Page = <PageImprint t={t} />; break;
    case "/onboarding":                     Page = <PageOnboarding t={t} />; break;
    case "/vps":                            Page = <PageVps t={t} />; break;
    case "/calculator":                     Page = <PageCalculator t={t} />; break;
    case "/eligibility":                    Page = <PageEligibility t={t} />; break;
    case "/blog":                           Page = <PageBlog t={t} />; break;
    case "/reviews":                        Page = <PageReviews t={t} />; break;
    case "/":
    default:                                Page = <PageHome t={t} lang={lang} />; break;
  }

  return (
    <>
      <Header
        t={t} lang={lang} setLang={setLang}
        theme={theme} setTheme={setTheme}
        route={route}
      />
      <main className="site-main" key={route}>{Page}</main>
      <Footer t={t} />
      <FloatingWhatsApp route={route} />
      <MobileStickyBar t={t} route={route} />
      <div className="noise" aria-hidden="true" />

      {/* Tweaks panel */}
      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="Appearance">
          <window.TweakRadio
            label="Theme"
            value={tweaks.theme}
            onChange={(v) => setTweak({ theme: v })}
            options={[
              { value: "dark", label: "Dark" },
              { value: "light", label: "Light" },
            ]}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
