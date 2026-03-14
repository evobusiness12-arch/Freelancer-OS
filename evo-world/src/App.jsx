import React, { useEffect, useRef, useState } from 'react';

// ─── STREAK BACKGROUND ───────────────────────────────────────────────────────
const StreakBg = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);
      const angle = -0.22;
      const streaks = [
        [0.05, 120, 0.10, 200], [0.18, 90, 0.30, 220],
        [0.24, 40, 0.58, 240], [0.30, 80, 0.25, 200],
        [0.38, 60, 0.10, 180], [0.52, 100, 0.24, 210],
        [0.59, 45, 0.50, 235], [0.65, 90, 0.22, 195],
        [0.73, 60, 0.10, 170], [0.85, 50, 0.08, 160],
      ];
      streaks.forEach(([cx, w, op, b]) => {
        const centerX = cx * W;
        const bx0 = centerX - w;
        const bx1 = centerX + w;
        const rgb = `${b},${b},${b}`;
        ctx.save();
        ctx.translate(centerX, H / 2);
        ctx.rotate(angle);
        ctx.translate(-centerX, -H / 2);
        const g = ctx.createLinearGradient(bx0 - 200, 0, bx1 + 200, 0);
        g.addColorStop(0, `rgba(${rgb},0)`);
        g.addColorStop(0.3, `rgba(${rgb},${op * 0.3})`);
        g.addColorStop(0.5, `rgba(${rgb},${op})`);
        g.addColorStop(0.7, `rgba(${rgb},${op * 0.3})`);
        g.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(bx0 - 200, -200, bx1 - bx0 + 400, H + 400);
        ctx.restore();
      });
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.9);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.6)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);
    };
    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  );
};

// ─── STYLES ──────────────────────────────────────────────────────────────────
const S = {
  app: { display: 'flex', height: '100vh', background: '#000', fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,255,255,0.8)', overflow: 'hidden', position: 'relative' },
  sb: { width: 200, background: 'rgba(40,40,40,0.75)', borderRight: '1px solid rgba(255,255,255,0.13)', display: 'flex', flexDirection: 'column', padding: '22px 12px', flexShrink: 0, zIndex: 2, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' },
  logoWrap: { display: 'flex', alignItems: 'center', gap: 10, padding: '0 4px', marginBottom: 36 },
  logoSq: { width: 30, height: 30, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  logoName: { fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: -0.4 },
  logoSub: { fontSize: 9.5, color: 'rgba(255,255,255,0.5)', marginTop: 1 },
  navGrp: { fontSize: 9, fontWeight: 500, color: 'rgba(255,255,255,0.4)', letterSpacing: 1.3, textTransform: 'uppercase', padding: '0 8px', margin: '6px 0 5px' },
  sbFoot: { marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.14)' },
  goalCard: { padding: '12px 13px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 12 },
  goalTop: { display: 'flex', justifyContent: 'space-between', marginBottom: 7 },
  goalLbl: { fontSize: 9.5, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 },
  goalPct: { fontSize: 11, fontWeight: 600, color: '#e5e5e5' },
  goalTrack: { height: 2, background: 'rgba(255,255,255,0.12)', borderRadius: 99, overflow: 'hidden', marginBottom: 5 },
  goalFill: (pct) => ({ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#555,#e5e5e5)', borderRadius: 99 }),
  goalSub: { fontSize: 9.5, color: 'rgba(255,255,255,0.45)' },
  main: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 1 },
  topbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px 0', flexShrink: 0 },
  pills: { display: 'flex', alignItems: 'center', gap: 2, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: 3 },
  pill: (on) => ({ padding: '5px 12px', borderRadius: 7, fontSize: 11, cursor: 'pointer', color: on ? '#fff' : 'rgba(255,255,255,0.35)', background: on ? 'rgba(255,255,255,0.09)' : 'transparent', fontWeight: 500, transition: 'all 0.15s' }),
  tbRight: { display: 'flex', alignItems: 'center', gap: 8 },
  tbIc: { width: 28, height: 28, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  tbName: { fontSize: 12, color: 'rgba(255,255,255,0.45)' },
  tbAv: { width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#e5e5e5' },
  ticker: { margin: '10px 24px 0', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 },
  tickTxt: { fontSize: 11, color: 'rgba(255,255,255,0.45)' },
  tickChips: { display: 'flex', gap: 5 },
  chip: (on) => ({ background: on ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)', border: `1px solid ${on ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 6, padding: '4px 10px', fontSize: 10.5, color: on ? '#fff' : 'rgba(255,255,255,0.35)', cursor: 'pointer' }),
  scroll: { flex: 1, padding: '14px 24px 22px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 },
  card: { background: 'rgba(15,15,15,0.55)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' },
  cardPad: { padding: '17px 20px', display: 'flex', flexDirection: 'column', height: '100%' },
  cardTitle: { fontSize: 9.5, fontWeight: 500, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: 1.1, marginBottom: 13 },
  hero: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 26px', position: 'relative', overflow: 'hidden' },
  heroEye: { fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: 0.5, marginBottom: 4 },
  heroName: { fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: -0.7, marginBottom: 16 },
  progRow: { display: 'flex', alignItems: 'center', gap: 9, marginBottom: 5 },
  progTrack: { width: 160, height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' },
  progFill: (pct) => ({ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#555,#e5e5e5)', borderRadius: 99 }),
  progPct: { fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,0.5)' },
  heroSub: { fontSize: 10.5, color: 'rgba(255,255,255,0.28)' },
  hstats: { display: 'flex' },
  hs: { padding: '0 20px', borderRight: '1px solid rgba(255,255,255,0.07)', textAlign: 'right' },
  hsN: { fontSize: 19, fontWeight: 700, color: '#fff', letterSpacing: -0.5 },
  hsL: { fontSize: 8.5, color: 'rgba(255,255,255,0.28)', marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.6 },
  widgets: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10 },
  wc: { background: 'rgba(15,15,15,0.55)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, padding: '14px 16px', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' },
  wcLbl: { fontSize: 9, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 7, fontWeight: 500 },
  wcNum: { fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: -0.6, lineHeight: 1 },
  wcSub: { fontSize: 9.5, color: 'rgba(255,255,255,0.28)', marginTop: 5, display: 'flex', alignItems: 'center', gap: 4 },
  wcDot: { width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.28)' },
  spark: { height: 26, marginTop: 10, display: 'flex', alignItems: 'flex-end', gap: 2 },
  grid3: { display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.7fr', gap: 11, flex: 1, minHeight: 0 },
  emptyS: { display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, fontSize: 11.5, color: 'rgba(255,255,255,0.1)' },
  act: { display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 9, cursor: 'pointer', border: '1px solid transparent', marginBottom: 5, transition: 'all 0.15s' },
  actIc: { width: 26, height: 26, borderRadius: 7, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  actMain: { fontSize: 12.5, fontWeight: 500, color: 'rgba(255,255,255,0.8)' },
  actSub: { fontSize: 10, color: 'rgba(255,255,255,0.28)', marginTop: 1 },
  actArr: { marginLeft: 'auto', fontSize: 15, color: 'rgba(255,255,255,0.15)' },
  ringWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 7 },
  ringLbl: { fontSize: 9, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: 0.9 },
  ringVal: { fontSize: 11, color: 'rgba(255,255,255,0.35)' },
  pgTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 },
  ph: { fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: -0.5 },
  phSub: { fontSize: 11, color: 'rgba(255,255,255,0.28)', marginTop: 2 },
  btn: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)', padding: '8px 15px', borderRadius: 9, fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, cursor: 'pointer' },
  tbl: { background: 'rgba(15,15,15,0.55)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, overflow: 'hidden', flex: 1, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' },
  tblH: { display: 'flex', gap: 10, padding: '10px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 9.5, fontWeight: 500, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: 0.9, background: 'rgba(0,0,0,0.2)' },
  tblR: { display: 'flex', gap: 10, padding: '11px 18px', borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: 12.5, color: 'rgba(255,255,255,0.75)', alignItems: 'center' },
  emptyT: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '55px', fontSize: 12, color: 'rgba(255,255,255,0.12)' },
  incG: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 },
  sc: { background: 'rgba(15,15,15,0.55)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 13, padding: '15px 17px', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' },
  scLbl: { fontSize: 9.5, fontWeight: 500, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 7 },
  input: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px', color: 'rgba(255,255,255,0.8)', fontFamily: "'DM Sans', sans-serif", fontSize: 13, outline: 'none', width: '100%' },
  select: { background: 'rgba(15,15,15,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px', color: 'rgba(255,255,255,0.8)', fontFamily: "'DM Sans', sans-serif", fontSize: 13, outline: 'none', width: '100%' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
  badge: (status) => {
    const map = {
      Lead: ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.15)'],
      'In Progress': ['rgba(255,200,80,0.1)', '#c8a055', 'rgba(200,160,85,0.2)'],
      Revision: ['rgba(150,120,255,0.1)', '#9980dd', 'rgba(150,120,255,0.2)'],
      Completed: ['rgba(100,200,140,0.1)', '#7ecf90', 'rgba(100,200,140,0.2)'],
      Paid: ['rgba(150,220,180,0.1)', '#a0e0b8', 'rgba(150,220,180,0.2)'],
    };
    const [bg, color, border] = map[status] || map.Lead;
    return { fontSize: 10, padding: '2px 9px', borderRadius: 20, fontWeight: 500, background: bg, color, border: `1px solid ${border}` };
  },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const NavItem = ({ icon, label, active, onClick }) => (
  <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', borderRadius: 9, cursor: 'pointer', fontSize: 12.5, fontWeight: 400, color: active ? '#fff' : 'rgba(255,255,255,0.55)', background: active ? 'rgba(255,255,255,0.1)' : 'transparent', border: `1px solid ${active ? 'rgba(255,255,255,0.16)' : 'transparent'}`, marginBottom: 1, transition: 'all 0.15s' }}>
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: icon }} />
    {label}
  </div>
);

const SparkBar = ({ heights }) => (
  <div style={S.spark}>
    {heights.map((h, i) => (
      <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: i === heights.length - 1 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.1)' }} />
    ))}
  </div>
);

const GoalRing = ({ pct, earned, goal }) => {
  const r = 30; const circ = 2 * Math.PI * r;
  return (
    <div style={S.ringWrap}>
      <svg width="82" height="82" viewBox="0 0 82 82">
        <defs>
          <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#555" /><stop offset="100%" stopColor="#e5e5e5" />
          </linearGradient>
        </defs>
        <circle cx="41" cy="41" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
        <circle cx="41" cy="41" r={r} fill="none" stroke="url(#rg)" strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
          strokeLinecap="round" transform="rotate(-90 41 41)" style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
        <text x="41" y="45" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="11" fontWeight="700" fill="#e5e5e5">{pct.toFixed(0)}%</text>
      </svg>
      <div style={S.ringLbl}>Monthly progress</div>
      <div style={S.ringVal}>${earned.toFixed(0)} / ${goal.toLocaleString()}</div>
    </div>
  );
};

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
const Dashboard = ({ clients, payments, revisions, setPage }) => {
  const total = payments.reduce((s, p) => s + parseFloat(p.amount || 0), 0);
  const goal = 5000;
  const pct = Math.min((total / goal) * 100, 100);
  const active = clients.filter(c => c.status === 'In Progress').length;
  const pending = revisions.filter(r => r.status === 'Pending').length;
  const recent = [...clients].slice(-3).reverse();

  return (
    <>
      <div style={S.card}>
        <div style={S.hero}>
          <div style={{ position: 'absolute', top: -60, left: 0, width: 250, height: 200, background: 'radial-gradient(ellipse,rgba(255,255,255,0.04) 0%,transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ zIndex: 1 }}>
            <div style={S.heroEye}>Good morning</div>
            <div style={S.heroName}>Hey, <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>Eyad</span> 👋</div>
            <div style={S.progRow}>
              <div style={S.progTrack}><div style={S.progFill(pct)} /></div>
              <span style={S.progPct}>{pct.toFixed(1)}%</span>
            </div>
            <div style={S.heroSub}>${total.toFixed(0)} of $5,000 monthly goal</div>
          </div>
          <div style={S.hstats}>
            {[['Clients', clients.length], ['Active', active], ['Revisions', pending], ['Earned', `$${total.toFixed(0)}`]].map(([l, n], i) => (
              <div key={l} style={{ ...S.hs, ...(i === 3 ? { borderRight: 'none', paddingRight: 0 } : {}) }}>
                <div style={S.hsN}>{n}</div><div style={S.hsL}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={S.widgets}>
        {[
          { label: 'Total Clients', val: clients.length, sub: 'All time', h: [40,55,35,70,45,60] },
          { label: 'Active Projects', val: active, sub: 'In progress', h: [30,60,45,80,55,40] },
          { label: 'Revisions', val: pending, sub: 'Pending', h: [50,35,75,40,65,50] },
          { label: 'Total Earned', val: `$${total.toFixed(0)}`, sub: 'This month', h: [20,40,30,55,45,70] },
        ].map(w => (
          <div key={w.label} style={S.wc}>
            <div style={S.wcLbl}>{w.label}</div>
            <div style={S.wcNum}>{w.val}</div>
            <div style={S.wcSub}><div style={S.wcDot} />{w.sub}</div>
            <SparkBar heights={w.h} />
          </div>
        ))}
      </div>

      <div style={{ ...S.grid3, flex: 1 }}>
        <div style={S.card}>
          <div style={S.cardPad}>
            <div style={S.cardTitle}>Recent clients</div>
            {recent.length === 0
              ? <div style={S.emptyS}>No clients yet</div>
              : recent.map(c => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 500, color: '#e5e5e5' }}>{c.name}</div>
                    {c.instagram && <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', marginTop: 1 }}>@{c.instagram}</div>}
                  </div>
                  <span style={S.badge(c.status)}>{c.status}</span>
                </div>
              ))}
          </div>
        </div>

        <div style={S.card}>
          <div style={S.cardPad}>
            <div style={S.cardTitle}>Quick actions</div>
            {[
              { label: 'Add new client', sub: 'Start a project', page: 'clients', icon: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>' },
              { label: 'Log a revision', sub: 'Client feedback', page: 'revisions', icon: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z"/>' },
              { label: 'Log payment', sub: 'Record income', page: 'income', icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' },
              { label: 'Generate ideas', sub: 'AI Reel content', page: 'content', icon: '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>' },
            ].map(a => (
              <div key={a.label} onClick={() => setPage(a.page)} style={S.act}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}>
                <div style={S.actIc}>
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: a.icon }} />
                </div>
                <div><div style={S.actMain}>{a.label}</div><div style={S.actSub}>{a.sub}</div></div>
                <div style={S.actArr}>›</div>
              </div>
            ))}
          </div>
        </div>

        <div style={S.card}>
          <div style={S.cardPad}>
            <div style={S.cardTitle}>Goal tracker</div>
            <GoalRing pct={pct} earned={total} goal={goal} />
          </div>
        </div>
      </div>
    </>
  );
};

// ─── CLIENTS ─────────────────────────────────────────────────────────────────
const Clients = ({ clients, setClients, payments, setPayments }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', instagram: '', status: 'Lead', price: '', notes: '' });
  const statuses = ['Lead', 'In Progress', 'Revision', 'Completed', 'Paid'];

  const add = () => {
    if (!form.name) return;
    setClients([...clients, { ...form, id: Date.now() }]);
    setForm({ name: '', instagram: '', status: 'Lead', price: '', notes: '' });
    setShowForm(false);
  };

  const updateStatus = (id, status) => {
    const c = clients.find(c => c.id === id);
    if (status === 'Paid' && c?.price && !payments.some(p => p.clientId === id && p.autoLogged)) {
      setPayments([...payments, { id: Date.now(), clientId: id, amount: c.price, description: 'Auto-logged', date: new Date().toISOString().split('T')[0], autoLogged: true }]);
    }
    setClients(clients.map(c => c.id === id ? { ...c, status } : c));
  };

  const statusColor = { Lead: '#7d7d7d', 'In Progress': '#c8a055', Revision: '#9980dd', Completed: '#7ecf90', Paid: '#a0e0b8' };

  return (
    <>
      <div style={S.pgTop}>
        <div><div style={S.ph}>Clients</div><div style={S.phSub}>Manage your pipeline — {clients.length} total</div></div>
        <button style={S.btn} onClick={() => setShowForm(!showForm)}>+ Add Client</button>
      </div>
      {showForm && (
        <div style={S.card}>
          <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#e5e5e5', marginBottom: 4 }}>New Client</div>
            <div style={S.formGrid}>
              <input style={S.input} placeholder="Client Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input style={S.input} placeholder="Instagram Handle" value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })} />
              <input style={S.input} placeholder="Project Price ($)" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
              <select style={S.select} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                {statuses.map(s => <option key={s}>{s}</option>)}
              </select>
              <input style={{ ...S.input, gridColumn: 'span 2' }} placeholder="Notes (optional)" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ ...S.btn, background: 'rgba(255,255,255,0.1)' }} onClick={add}>Save</button>
              <button style={{ ...S.btn, color: 'rgba(255,255,255,0.35)' }} onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div style={{ ...S.tbl, flex: 1 }}>
        <div style={S.tblH}><span style={{ flex: 2 }}>Name</span><span style={{ flex: 2 }}>Instagram</span><span style={{ flex: 1 }}>Price</span><span style={{ flex: 1.5 }}>Status</span><span style={{ flex: 0.5 }}></span></div>
        {clients.length === 0
          ? <div style={S.emptyT}>No clients yet — add your first one</div>
          : clients.map(c => (
            <div key={c.id} style={S.tblR}>
              <div style={{ flex: 2 }}>
                <div style={{ fontWeight: 500, color: '#e5e5e5' }}>{c.name}</div>
                {c.notes && <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', marginTop: 1 }}>{c.notes}</div>}
              </div>
              <span style={{ flex: 2, color: 'rgba(255,255,255,0.4)' }}>{c.instagram ? `@${c.instagram}` : '—'}</span>
              <span style={{ flex: 1, color: '#7ecf90', fontWeight: 600 }}>{c.price ? `$${c.price}` : '—'}</span>
              <div style={{ flex: 1.5 }}>
                <select value={c.status} onChange={e => updateStatus(c.id, e.target.value)}
                  style={{ background: 'transparent', border: 'none', outline: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 500, color: statusColor[c.status] }}>
                  {statuses.map(s => <option key={s} style={{ background: '#1a1a1a', color: '#e5e5e5' }}>{s}</option>)}
                </select>
              </div>
              <div style={{ flex: 0.5, display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setClients(clients.filter(x => x.id !== c.id))} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: 15 }}>✕</button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

// ─── PROJECTS ────────────────────────────────────────────────────────────────
const Projects = ({ clients }) => {
  const active = clients.filter(c => c.status === 'In Progress');
  return (
    <>
      <div><div style={S.ph}>Projects</div><div style={S.phSub}>Active client work — {active.length} in progress</div></div>
      <div style={{ ...S.tbl, flex: 1 }}>
        <div style={S.tblH}><span style={{ flex: 2 }}>Client</span><span style={{ flex: 2 }}>Notes</span><span style={{ flex: 1 }}>Price</span></div>
        {active.length === 0
          ? <div style={S.emptyT}>No active projects — mark a client as "In Progress"</div>
          : active.map(c => (
            <div key={c.id} style={S.tblR}>
              <div style={{ flex: 2 }}>
                <div style={{ fontWeight: 500, color: '#e5e5e5' }}>{c.name}</div>
                {c.instagram && <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)' }}>@{c.instagram}</div>}
              </div>
              <span style={{ flex: 2, color: 'rgba(255,255,255,0.4)' }}>{c.notes || '—'}</span>
              <span style={{ flex: 1, color: '#7ecf90', fontWeight: 600 }}>{c.price ? `$${c.price}` : '—'}</span>
            </div>
          ))}
      </div>
    </>
  );
};

// ─── REVISIONS ───────────────────────────────────────────────────────────────
const Revisions = ({ clients, revisions, setRevisions }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ clientId: '', description: '', status: 'Pending' });
  const pending = revisions.filter(r => r.status === 'Pending').length;

  const add = () => {
    if (!form.description) return;
    setRevisions([...revisions, { ...form, id: Date.now() }]);
    setForm({ clientId: '', description: '', status: 'Pending' });
    setShowForm(false);
  };

  const getClient = (id) => clients.find(c => c.id === parseInt(id))?.name || '—';

  return (
    <>
      <div style={S.pgTop}>
        <div><div style={S.ph}>Revisions</div><div style={S.phSub}>{pending} pending · {revisions.length} total</div></div>
        <button style={S.btn} onClick={() => setShowForm(!showForm)}>+ Add Revision</button>
      </div>
      {showForm && (
        <div style={S.card}>
          <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#e5e5e5', marginBottom: 4 }}>New Revision</div>
            <select style={S.select} value={form.clientId} onChange={e => setForm({ ...form, clientId: e.target.value })}>
              <option value="">Select Client</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input style={S.input} placeholder="Revision description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ ...S.btn, background: 'rgba(255,255,255,0.1)' }} onClick={add}>Save</button>
              <button style={{ ...S.btn, color: 'rgba(255,255,255,0.35)' }} onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div style={{ ...S.tbl, flex: 1 }}>
        <div style={S.tblH}><span style={{ flex: 3 }}>Description</span><span style={{ flex: 2 }}>Client</span><span style={{ flex: 1 }}>Status</span><span style={{ flex: 0.5 }}></span></div>
        {revisions.length === 0
          ? <div style={S.emptyT}>No revisions logged yet</div>
          : revisions.map(r => (
            <div key={r.id} style={{ ...S.tblR, opacity: r.status === 'Done' ? 0.45 : 1 }}>
              <span style={{ flex: 3, color: '#e5e5e5' }}>{r.description}</span>
              <span style={{ flex: 2, color: 'rgba(255,255,255,0.4)' }}>{getClient(r.clientId)}</span>
              <div style={{ flex: 1 }}>
                <button onClick={() => setRevisions(revisions.map(x => x.id === r.id ? { ...x, status: x.status === 'Pending' ? 'Done' : 'Pending' } : x))}
                  style={{ background: r.status === 'Done' ? 'rgba(126,207,144,0.1)' : 'rgba(255,255,255,0.05)', color: r.status === 'Done' ? '#7ecf90' : 'rgba(255,255,255,0.4)', border: `1px solid ${r.status === 'Done' ? 'rgba(126,207,144,0.2)' : 'rgba(255,255,255,0.08)'}`, padding: '3px 10px', borderRadius: 20, fontSize: 10.5, cursor: 'pointer', fontWeight: 500 }}>
                  {r.status === 'Done' ? '✓ Done' : 'Mark Done'}
                </button>
              </div>
              <div style={{ flex: 0.5, display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setRevisions(revisions.filter(x => x.id !== r.id))} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: 15 }}>✕</button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

// ─── INCOME ──────────────────────────────────────────────────────────────────
const Income = ({ clients, payments, setPayments }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ clientId: '', amount: '', description: '', date: '' });
  const total = payments.reduce((s, p) => s + parseFloat(p.amount || 0), 0);
  const goal = 5000;
  const pct = Math.min((total / goal) * 100, 100);
  const getClient = (id) => clients.find(c => c.id === parseInt(id))?.name || 'Unknown';

  const add = () => {
    if (!form.amount) return;
    setPayments([...payments, { ...form, id: Date.now() }]);
    setForm({ clientId: '', amount: '', description: '', date: '' });
    setShowForm(false);
  };

  return (
    <>
      <div style={S.pgTop}>
        <div><div style={S.ph}>Income</div><div style={S.phSub}>{payments.length} payments logged</div></div>
        <button style={S.btn} onClick={() => setShowForm(!showForm)}>+ Log Payment</button>
      </div>
      <div style={S.incG}>
        {[
          { label: 'Total Earned', val: `$${total.toFixed(2)}`, color: '#7ecf90' },
          { label: 'Payments', val: payments.length, color: '#e5e5e5' },
          { label: 'Avg / Payment', val: payments.length ? `$${(total / payments.length).toFixed(2)}` : '$0', color: '#c8a055' },
        ].map(s => (
          <div key={s.label} style={S.sc}>
            <div style={S.scLbl}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: s.color, letterSpacing: -0.5 }}>{s.val}</div>
          </div>
        ))}
      </div>
      <div style={S.card}>
        <div style={{ padding: '14px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Monthly goal progress</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>{pct.toFixed(1)}% · ${(goal - total).toFixed(0)} remaining</span>
          </div>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#555,#e5e5e5)', borderRadius: 99, transition: 'width 0.5s ease' }} />
          </div>
        </div>
      </div>
      {showForm && (
        <div style={S.card}>
          <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#e5e5e5', marginBottom: 4 }}>Log Payment</div>
            <div style={S.formGrid}>
              <select style={S.select} value={form.clientId} onChange={e => setForm({ ...form, clientId: e.target.value })}>
                <option value="">Select Client</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input style={S.input} placeholder="Amount ($)" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
              <input style={S.input} placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              <input type="date" style={S.input} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ ...S.btn, background: 'rgba(255,255,255,0.1)' }} onClick={add}>Save</button>
              <button style={{ ...S.btn, color: 'rgba(255,255,255,0.35)' }} onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div style={{ ...S.tbl, flex: 1 }}>
        <div style={S.tblH}><span style={{ flex: 2 }}>Client</span><span style={{ flex: 2 }}>Description</span><span style={{ flex: 1 }}>Date</span><span style={{ flex: 1 }}>Amount</span><span style={{ flex: 0.5 }}></span></div>
        {payments.length === 0
          ? <div style={S.emptyT}>No payments logged yet</div>
          : payments.map(p => (
            <div key={p.id} style={S.tblR}>
              <span style={{ flex: 2, color: '#e5e5e5', fontWeight: 500 }}>{getClient(p.clientId)}</span>
              <span style={{ flex: 2, color: 'rgba(255,255,255,0.4)' }}>{p.description || '—'}</span>
              <span style={{ flex: 1, color: 'rgba(255,255,255,0.35)' }}>{p.date || '—'}</span>
              <span style={{ flex: 1, color: '#7ecf90', fontWeight: 700 }}>${parseFloat(p.amount).toFixed(2)}</span>
              <div style={{ flex: 0.5, display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setPayments(payments.filter(x => x.id !== p.id))} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: 15 }}>✕</button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

// ─── CONTENT ─────────────────────────────────────────────────────────────────
const Content = () => {
  const [niche, setNiche] = useState('');
  const [style, setStyle] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generate = async () => {
    if (!niche) return;
    setLoading(true); setError(''); setIdeas([]);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are an Instagram Reels content strategist for freelance video editors. Generate exactly 5 creative, specific, viral Instagram Reel ideas for a freelance video editor in the "${niche}" niche${style ? ` with a "${style}" style` : ''}. Format as a numbered list 1-5. Each idea: catchy title, one-sentence description, one hook line. Be concise and actionable.`
          }]
        })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const text = data.content?.map(b => b.text || '').join('') || '';
      setIdeas(text.split('\n').filter(l => l.trim()));
    } catch (e) { setError(`Error: ${e.message}`); }
    setLoading(false);
  };

  return (
    <>
      <div><div style={S.ph}>Content</div><div style={S.phSub}>AI-powered Instagram Reel ideas for your niche</div></div>
      <div style={S.card}>
        <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 11 }}>
          <div style={S.formGrid}>
            <input style={S.input} placeholder="Your niche — fitness, real estate, fashion…" value={niche} onChange={e => setNiche(e.target.value)} />
            <input style={S.input} placeholder="Video style — cinematic, fast cuts, vlog…" value={style} onChange={e => setStyle(e.target.value)} />
          </div>
          <button onClick={generate} disabled={loading || !niche}
            style={{ ...S.btn, alignSelf: 'flex-start', background: loading || !niche ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)', color: loading || !niche ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.9)', cursor: loading || !niche ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Generating…' : '✦ Generate Ideas'}
          </button>
        </div>
      </div>
      {error && <div style={{ background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.15)', borderRadius: 10, padding: '12px 16px', color: '#ff8080', fontSize: 12 }}>{error}</div>}
      {ideas.map((idea, i) => idea.trim() && (
        <div key={i} style={S.card}>
          <div style={{ padding: '14px 18px', fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>{idea}</div>
        </div>
      ))}
    </>
  );
};

// ─── NAV CONFIG ──────────────────────────────────────────────────────────────
const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>' },
  { id: 'clients',   label: 'Clients',   icon: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>' },
  { id: 'projects',  label: 'Projects',  icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>' },
  { id: 'revisions', label: 'Revisions', icon: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>' },
  { id: 'income',    label: 'Income',    icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' },
  { id: 'content',   label: 'Content',   icon: '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>' },
];

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('dashboard');
  const [clients, setClients]   = useState(() => { try { return JSON.parse(localStorage.getItem('fos_clients'))   || []; } catch { return []; } });
  const [payments, setPayments] = useState(() => { try { return JSON.parse(localStorage.getItem('fos_payments'))  || []; } catch { return []; } });
  const [revisions, setRevisions] = useState(() => { try { return JSON.parse(localStorage.getItem('fos_revisions')) || []; } catch { return []; } });

  useEffect(() => { localStorage.setItem('fos_clients',   JSON.stringify(clients));   }, [clients]);
  useEffect(() => { localStorage.setItem('fos_payments',  JSON.stringify(payments));  }, [payments]);
  useEffect(() => { localStorage.setItem('fos_revisions', JSON.stringify(revisions)); }, [revisions]);

  const total = payments.reduce((s, p) => s + parseFloat(p.amount || 0), 0);
  const pct   = Math.min((total / 5000) * 100, 100);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; background: #000; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25) !important; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); }
        option { background: #1a1a1a !important; color: #e5e5e5 !important; }
      `}</style>

      <div style={S.app}>
        <StreakBg />

        {/* ── SIDEBAR ── */}
        <div style={S.sb}>
          <div style={S.logoWrap}>
            <div style={S.logoSq}>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#e5e5e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <div style={S.logoName}>FreelancerOS</div>
              <div style={S.logoSub}>Eyad's workspace</div>
            </div>
          </div>

          <div style={S.navGrp}>Menu</div>
          {NAV.map(n => (
            <NavItem key={n.id} icon={n.icon} label={n.label} active={page === n.id} onClick={() => setPage(n.id)} />
          ))}

          <div style={S.sbFoot}>
            <div style={S.goalCard}>
              <div style={S.goalTop}>
                <span style={S.goalLbl}>Monthly goal</span>
                <span style={S.goalPct}>{pct.toFixed(0)}%</span>
              </div>
              <div style={S.goalTrack}><div style={S.goalFill(pct)} /></div>
              <div style={S.goalSub}>${total.toFixed(0)} of $5,000</div>
            </div>
          </div>
        </div>

        {/* ── MAIN ── */}
        <div style={S.main}>
          {/* Top bar */}
          <div style={S.topbar}>
            <div style={S.pills}>
              {['Overview', 'Reports', 'Files'].map(p => (
                <div key={p} style={S.pill(p === 'Overview')}>{p}</div>
              ))}
            </div>
            <div style={S.tbRight}>
              <div style={S.tbIc}>
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <span style={S.tbName}>Eyad</span>
              <div style={S.tbAv}>E</div>
            </div>
          </div>

          {/* Ticker */}
          <div style={S.ticker}>
            <span style={S.tickTxt}>Since last month, <b style={{ color: '#fff', fontWeight: 500 }}>your freelance revenue is growing</b> — keep pushing 🔥</span>
            <div style={S.tickChips}>
              {['Overview', 'Reports', 'Clients'].map((c, i) => (
                <div key={c} style={S.chip(i === 0)}>{c}</div>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div style={S.scroll}>
            {page === 'dashboard' && <Dashboard clients={clients} payments={payments} revisions={revisions} setPage={setPage} />}
            {page === 'clients'   && <Clients   clients={clients} setClients={setClients} payments={payments} setPayments={setPayments} />}
            {page === 'projects'  && <Projects  clients={clients} />}
            {page === 'revisions' && <Revisions clients={clients} revisions={revisions} setRevisions={setRevisions} />}
            {page === 'income'    && <Income    clients={clients} payments={payments} setPayments={setPayments} />}
            {page === 'content'   && <Content />}
          </div>
        </div>
      </div>
    </>
  );
}
