// pages-legal.jsx — terms, privacy, imprint

function LegalDoc({ title, eyebrow, updated, sections }) {
  return (
    <div className="page-enter">
      <section className="section page-head-section" style={{ paddingBottom: 24 }}>
        <div className="mesh-bg" aria-hidden="true" />
        <div className="wrap section-head" style={{ marginBottom: 24 }}>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="h-display" style={{ fontSize: "clamp(38px,6vw,72px)" }}>{title}</h1>
          <p className="label" style={{ marginTop: 8 }}>{updated}</p>
        </div>
      </section>

      <section className="section section-sm" style={{ paddingTop: 0 }}>
        <div className="wrap doc-grid">
          <aside className="doc-toc">
            <div className="label">Inhalt</div>
            <ol className="doc-toc-list">
              {sections.map((s, i) => (
                <li key={i}>
                  <a href={`#sec-${i}`}>{s.t}</a>
                </li>
              ))}
            </ol>
          </aside>
          <div className="doc-body">
            {sections.map((s, i) => (
              <article key={i} id={`sec-${i}`} className="doc-section">
                <h2 className="doc-section-title">§ {String(i+1).padStart(2,"0")} · {s.t}</h2>
                {s.p.map((para, j) => <p key={j} className="doc-section-p">{para}</p>)}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function PageTerms({ t }) {
  const sections = [
    { t: "Geltungsbereich", p: [
      "Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für sämtliche Verträge zwischen der scale GmbH („Anbieter“) und gewerblichen Kunden („Auftraggeber“) über die Erbringung von eBay-bezogenen Dienstleistungen.",
      "Abweichende Bedingungen des Auftraggebers werden nicht anerkannt, sofern der Anbieter ihrer Geltung nicht ausdrücklich schriftlich zustimmt.",
    ]},
    { t: "Vertragsschluss", p: [
      "Der Vertrag kommt durch elektronische Unterzeichnung des Dienstleistungsvertrages im Onboarding-Portal des Anbieters zustande. Die elektronische Signatur erfolgt rechtsverbindlich nach §126a BGB.",
      "Der Auftraggeber erhält unverzüglich eine Kopie des unterzeichneten Vertrages per E-Mail an die angegebene Adresse.",
    ]},
    { t: "Leistungsumfang", p: [
      "Der konkrete Leistungsumfang ergibt sich aus dem Dienstleistungsvertrag und dessen Anhängen. Änderungen bedürfen der Textform.",
      "Der Anbieter erbringt seine Leistungen mit der Sorgfalt eines ordentlichen Kaufmanns; eine Garantie für bestimmte Umsätze oder Ergebnisse wird nicht übernommen.",
    ]},
    { t: "Vergütung und Zahlungsbedingungen", p: [
      "Es gelten die im Dienstleistungsvertrag vereinbarten Vergütungen zzgl. gesetzlicher Umsatzsteuer.",
      "Rechnungen sind ohne Abzug innerhalb von 14 Tagen ab Rechnungsdatum zur Zahlung fällig.",
    ]},
    { t: "Mitwirkungspflichten", p: [
      "Der Auftraggeber stellt dem Anbieter rechtzeitig und vollständig alle für die Leistungserbringung erforderlichen Informationen, Zugänge und Materialien zur Verfügung.",
      "Verzögerungen, die auf fehlender oder verspäteter Mitwirkung beruhen, gehen nicht zu Lasten des Anbieters.",
    ]},
    { t: "Haftung", p: [
      "Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie nach den Vorschriften des Produkthaftungsgesetzes.",
      "Für leichte Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten, beschränkt auf den vertragstypisch vorhersehbaren Schaden.",
    ]},
    { t: "Vertraulichkeit und Datenschutz", p: [
      "Beide Parteien verpflichten sich, alle im Rahmen der Zusammenarbeit erlangten vertraulichen Informationen geheim zu halten.",
      "Die Verarbeitung personenbezogener Daten erfolgt nach Maßgabe des separat geschlossenen Auftragsverarbeitungsvertrages (AVV) gemäß Art. 28 DSGVO.",
    ]},
    { t: "Schlussbestimmungen", p: [
      "Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.",
      "Ausschließlicher Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit diesem Vertrag ist Stuttgart, sofern der Auftraggeber Kaufmann im Sinne des HGB ist.",
    ]},
  ];
  return <LegalDoc title={t.terms.title} eyebrow={t.terms.eyebrow} updated={t.terms.updated} sections={sections} />;
}

function PagePrivacy({ t }) {
  const sections = [
    { t: "Verantwortlicher", p: [
      "Verantwortlicher im Sinne der DSGVO ist die scale GmbH, Königstraße 47, 70173 Stuttgart, Deutschland. E-Mail: privacy@scalewithfahad.de.",
    ]},
    { t: "Erhebung und Speicherung", p: [
      "Wir verarbeiten personenbezogene Daten, die uns im Rahmen unserer Geschäftstätigkeit, der Vertragsabwicklung sowie über Kontaktformulare und Onboarding bereitgestellt werden.",
      "Die Daten werden ausschließlich auf Servern innerhalb der Europäischen Union verarbeitet und gespeichert.",
    ]},
    { t: "Rechtsgrundlagen", p: [
      "Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung), lit. c (rechtliche Verpflichtung) sowie lit. f (berechtigte Interessen).",
    ]},
    { t: "Cookies und Tracking", p: [
      "Unsere Website verwendet ausschließlich technisch notwendige Cookies. Tracking- oder Marketing-Cookies werden nur nach ausdrücklicher Einwilligung gesetzt.",
    ]},
    { t: "Rechte der Betroffenen", p: [
      "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch und Datenübertragbarkeit.",
      "Anfragen richten Sie bitte an privacy@scalewithfahad.de. Wir antworten innerhalb von 30 Tagen.",
    ]},
    { t: "Beschwerderecht", p: [
      "Es besteht ein Beschwerderecht bei der zuständigen Aufsichtsbehörde, in unserem Fall der Landesbeauftragte für den Datenschutz Baden-Württemberg.",
    ]},
  ];
  return <LegalDoc title={t.privacy.title} eyebrow={t.privacy.eyebrow} updated={t.privacy.updated} sections={sections} />;
}

function PageImprint({ t }) {
  const sections = [
    { t: "Angaben gemäß § 5 TMG", p: [
      "ScalewithFahad — ein Service der Primashop",
      "Inhaber: Fahad bin Sultan",
      "Neuenhausplatz 55",
      "40699 Erkrath",
      "Deutschland",
    ]},
    { t: "Kontakt", p: [
      "WhatsApp: +49 155 1053 2359",
      "E-Mail: fahad786sultan@gmail.com",
    ]},
    { t: "Umsatzsteuer-ID", p: [
      "Umsatzsteuer-Identifikationsnummer gemäß §27a UStG:",
      "DE453914117",
    ]},
    { t: "Verantwortlich für den Inhalt", p: [
      "Verantwortlich nach § 18 Abs. 2 MStV: Fahad bin Sultan, Anschrift wie oben.",
    ]},
    { t: "EU-Streitschlichtung", p: [
      "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:",
      "https://ec.europa.eu/consumers/odr",
      "Wir sind weder bereit noch verpflichtet, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    ]},
    { t: "Haftung für Inhalte", p: [
      "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.",
      "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.",
    ]},
    { t: "Affiliate-Hinweis", p: [
      "Auf dieser Website werden Affiliate-Links zu Drittanbietern (z. B. VPS-Hosting) verwendet. Bei einem Kauf über diese Links erhalten wir eine Provision. Für dich entstehen keine zusätzlichen Kosten — der Preis bleibt identisch.",
    ]},
  ];
  return <LegalDoc title="Impressum" eyebrow={t.nav.imprint} updated={t.terms.updated} sections={sections} />;
}

Object.assign(window, { PageTerms, PagePrivacy, PageImprint });
