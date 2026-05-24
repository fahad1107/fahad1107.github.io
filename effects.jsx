// effects.jsx — visual effects: mesh, particles, counters, sparklines, icons

const { useState, useEffect, useRef, useMemo } = React;

/* =========================
   Animated counter
   ========================= */
function Counter({ to, duration = 1800, prefix = "", suffix = "", decimals = 0, format = true }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(to * eased);
            if (t < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      });
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  const fmt = (n) => {
    const fixed = n.toFixed(decimals);
    if (!format) return fixed;
    const [int, dec] = fixed.split(".");
    const withSep = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return dec ? `${withSep},${dec}` : withSep;
  };

  return <span ref={ref}>{prefix}{fmt(val)}{suffix}</span>;
}

/* =========================
   Particle field
   ========================= */
function Particles({ count = 30 }) {
  const particles = useMemo(() =>
    Array.from({ length: count }).map((_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 10 + Math.random() * 14,
      size: 1 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.5,
    })), [count]);

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* =========================
   Mesh / aurora background
   ========================= */
function Aurora({ intensity = 1, anchor = "top" }) {
  return (
    <div className="mesh-bg" aria-hidden="true" style={{ opacity: intensity }}>
      <svg className="mesh-svg" width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="sparkGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(212,178,122,0.45)" />
            <stop offset="100%" stopColor="rgba(212,178,122,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* =========================
   Sparkline
   ========================= */
function Sparkline({ values, w = 220, h = 56, color = "var(--gold-2)" }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = w / (values.length - 1);
  const pts = values.map((v, i) => [i * stepX, h - ((v - min) / range) * (h - 6) - 3]);
  const linePath = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${w},${h} L0,${h} Z`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="spark-area">
      <path className="area" d={areaPath} />
      <path className="line" d={linePath} style={{ stroke: color }} />
      {pts.length > 0 && (
        <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r={3} fill={color} />
      )}
    </svg>
  );
}

/* =========================
   Icons (minimal stroked)
   ========================= */
const Icon = {
  arrow: (props) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  check: (props) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path d="m3 8 3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  x: (props) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  bolt: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
  truck: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
  shield: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3 4 6v6c0 4.5 3.5 8 8 9 4.5-1 8-4.5 8-9V6l-8-3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  search: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.4"/>
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  scale: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 4v16M5 8h14M4 13l3-7 3 7M14 13l3-7 3 7M4 13a3 3 0 0 0 6 0M14 13a3 3 0 0 0 6 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  euro: (props) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M18 6.5A7 7 0 1 0 18 17.5M4 10h10M4 14h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  chart: (props) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 19V5m0 14h16M8 16V11m4 5V7m4 9v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  box: (props) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="m3 7 9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7M12 11v10" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  clock: (props) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  plus: (props) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  sun: (props) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  moon: (props) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  menu: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  globe: (props) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  star: (props) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="m12 2 2.9 6.6 7.1.7-5.4 4.9 1.6 7-6.2-3.7L5.8 21l1.6-7L2 9.3l7.1-.7L12 2Z"/>
    </svg>
  ),
};

Object.assign(window, { Counter, Particles, Aurora, Sparkline, Icon });
