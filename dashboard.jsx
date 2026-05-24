// dashboard.jsx — mocked eBay automation SaaS dashboard for hero

const dashSpark = [12, 18, 14, 22, 19, 28, 24, 32, 30, 38, 41, 39, 46, 52];
const ordersSpark = [4, 5, 3, 7, 6, 9, 8, 11, 10, 13, 12, 15, 16, 14];

function Dashboard({ floating = true }) {
  const [tick, setTick] = React.useState(0);

  // small pulsing badge ticker
  React.useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3500);
    return () => clearInterval(id);
  }, []);

  const liveRows = [
    { sku: "DE-AUDIO-2241", name: "Bluetooth Kopfhörer Pro", price: "€84.90", qty: 1, status: "shipped" },
    { sku: "DE-HOME-1107", name: "LED Stehlampe Modern", price: "€129.00", qty: 1, status: "processing" },
    { sku: "DE-KITC-0883", name: "Espresso Tamper 58mm", price: "€34.50", qty: 2, status: "new" },
    { sku: "DE-PETS-2010", name: "Katzen Spielzeug Set", price: "€19.99", qty: 1, status: "shipped" },
  ];

  const statusChip = {
    shipped:    { label: "Versendet", cls: "up" },
    processing: { label: "In Bearbeitung", cls: "gold" },
    new:        { label: "Neu", cls: "" },
  };

  return (
    <div className={"dash" + (floating ? " dash-floating" : "")}>
      {/* Top bar */}
      <div className="dash-topbar">
        <div className="dash-window-dots">
          <span /><span /><span />
        </div>
        <div className="dash-url">app.scalewithfahad.de / overview</div>
        <div className="dash-topactions">
          <span className="badge live"><span className="dot" />Live</span>
        </div>
      </div>

      {/* Sidebar + main */}
      <div className="dash-body">
        <aside className="dash-side">
          <div className="dash-side-brand">
            <span className="dash-side-mark">S</span>
            <span className="dash-side-name">SwF</span>
          </div>
          <nav className="dash-nav">
            {[
              { i: "▢", t: "Overview", active: true },
              { i: "◇", t: "Listings" },
              { i: "△", t: "Orders" },
              { i: "○", t: "Repricer" },
              { i: "□", t: "Suppliers" },
              { i: "✕", t: "VAT / OSS" },
              { i: "◐", t: "Reports" },
            ].map((it) => (
              <div key={it.t} className={"dash-nav-item" + (it.active ? " active" : "")}>
                <span className="dash-nav-glyph">{it.i}</span>
                <span>{it.t}</span>
              </div>
            ))}
          </nav>
          <div className="dash-side-foot">
            <div className="dash-side-account">
              <div className="dash-avatar">FA</div>
              <div>
                <div className="dash-side-name-sm">Fahad A.</div>
                <div className="dash-side-tier">Top-Rated · DE</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="dash-main">
          <div className="dash-main-head">
            <div>
              <div className="label">Overview · Letzte 30 Tage</div>
              <h3 className="dash-title">Guten Morgen, Fahad.</h3>
            </div>
            <div className="dash-range">
              {["7T","30T","90T","12M"].map((r,i) => (
                <button key={r} className={"dash-range-btn" + (i === 1 ? " active" : "")}>{r}</button>
              ))}
            </div>
          </div>

          {/* KPI tiles */}
          <div className="dash-kpis">
            <KpiTile label="Umsatz" value="€84.231" delta="+18,4%" up icon={Icon.euro} />
            <KpiTile label="Bestellungen" value="612" delta="+9,2%" up icon={Icon.box} />
            <KpiTile label="Marge" value="27,4%" delta="+2,1pp" up icon={Icon.chart} />
            <KpiTile label="Defect Rate" value="0,18%" delta="-0,04pp" up icon={Icon.shield} />
          </div>

          {/* main chart + side stats */}
          <div className="dash-chart-row">
            <div className="dash-card dash-chart-card">
              <div className="dash-card-head">
                <div>
                  <div className="label">Umsatz · 14 Tage</div>
                  <div className="dash-chart-value">€84.231,40</div>
                </div>
                <div className="dash-legend">
                  <span><span className="lg-dot lg-gold" /> Umsatz</span>
                  <span><span className="lg-dot lg-mute" /> Vorperiode</span>
                </div>
              </div>
              <BigChart key={tick} />
            </div>

            <div className="dash-card dash-side-stats">
              <div className="label">Top Listings</div>
              <div className="dash-side-stats-list">
                {[
                  { n: "Audio Pro Hülle", v: "€14.220", w: 92 },
                  { n: "Espresso Tamper", v: "€9.840", w: 64 },
                  { n: "LED Stehlampe", v: "€7.115", w: 46 },
                  { n: "Pet Toy Set",    v: "€5.420", w: 35 },
                ].map((r, i) => (
                  <div key={i} className="dash-bar-row">
                    <div className="dash-bar-row-name">{r.n}</div>
                    <div className="dash-bar-track"><div className="dash-bar-fill" style={{ width: r.w + "%" }} /></div>
                    <div className="dash-bar-row-val">{r.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* live orders */}
          <div className="dash-card">
            <div className="dash-card-head">
              <div className="label">Live Bestellungen</div>
              <span className="badge live"><span className="dot" />Echtzeit</span>
            </div>
            <table className="tbl dash-tbl">
              <thead>
                <tr><th>SKU</th><th>Produkt</th><th>Preis</th><th>Anz.</th><th>Status</th></tr>
              </thead>
              <tbody>
                {liveRows.map((r) => (
                  <tr key={r.sku}>
                    <td className="mono">{r.sku}</td>
                    <td>{r.name}</td>
                    <td>{r.price}</td>
                    <td>{r.qty}</td>
                    <td><span className={"chip " + statusChip[r.status].cls}>{statusChip[r.status].label}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

function KpiTile({ label, value, delta, up, icon }) {
  const I = icon;
  return (
    <div className="dash-kpi">
      <div className="dash-kpi-head">
        <span className="dash-kpi-label">{label}</span>
        <span className="dash-kpi-ic"><I /></span>
      </div>
      <div className="dash-kpi-val">{value}</div>
      <div className="dash-kpi-foot">
        <span className={"chip " + (up ? "up" : "down")}>{up ? "▲" : "▼"} {delta}</span>
        <Sparkline values={ordersSpark} w={70} h={22} />
      </div>
    </div>
  );
}

function BigChart() {
  // Animated gradient bar+line chart
  const data = dashSpark;
  const w = 540, h = 200, pad = 24;
  const max = Math.max(...data) * 1.15;
  const stepX = (w - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => [pad + i * stepX, h - pad - (v / max) * (h - pad * 2)]);
  const linePath = pts.map(([x,y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${pad + (data.length-1)*stepX},${h-pad} L${pad},${h-pad} Z`;
  const prev = data.map((v) => v * 0.78);
  const prevPts = prev.map((v, i) => [pad + i * stepX, h - pad - (v / max) * (h - pad * 2)]);
  const prevPath = prevPts.map(([x,y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="dash-bigchart" preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaG" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(212,178,122,0.55)" />
          <stop offset="100%" stopColor="rgba(212,178,122,0)" />
        </linearGradient>
        <linearGradient id="lineG" x1="0" x2="1">
          <stop offset="0%" stopColor="#d4b27a" />
          <stop offset="100%" stopColor="#e9cf9d" />
        </linearGradient>
      </defs>
      {/* gridlines */}
      {[0,1,2,3].map(i => (
        <line key={i}
          x1={pad} x2={w-pad}
          y1={pad + (i*(h-pad*2)/3)} y2={pad + (i*(h-pad*2)/3)}
          stroke="rgba(255,255,255,0.05)" strokeDasharray="2 4" />
      ))}
      {/* previous period (dim) */}
      <path d={prevPath} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeDasharray="3 4" />
      {/* area */}
      <path d={areaPath} fill="url(#areaG)" className="bigchart-area" />
      {/* line */}
      <path d={linePath} fill="none" stroke="url(#lineG)" strokeWidth="2" className="bigchart-line" />
      {/* end point */}
      {pts.length > 0 && (
        <g>
          <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="8" fill="rgba(212,178,122,0.15)" />
          <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="4" fill="#e9cf9d" />
        </g>
      )}
    </svg>
  );
}

window.Dashboard = Dashboard;
