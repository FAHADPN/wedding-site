/* Demo / judging page — visit /lantern. Not linked from the live site. */

function Panel({ theme }) {
  const dark = theme === 'dark'
  const bg = dark ? '#15110c' : '#fdfaf2'
  const lineCol = dark ? 'rgba(232,213,163,0.07)' : 'rgba(201,168,76,0.055)'
  const gold = dark ? '#E8D5A3' : '#C9A84C'
  const muted = dark ? '#C9A84C' : '#9B7B3A'
  const ink = dark ? '#F3E9D2' : '#2C1810'

  return (
    <section
      style={{
        minHeight: '100dvh',
        backgroundColor: bg,
        backgroundImage:
          `repeating-linear-gradient(45deg,transparent 0px,transparent 39px,${lineCol} 39px,${lineCol} 40px),` +
          `repeating-linear-gradient(-45deg,transparent 0px,transparent 39px,${lineCol} 39px,${lineCol} 40px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '64px 16px',
      }}
    >
      {/* theme tag */}
      <p style={{ position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)', color: muted, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.28em', zIndex: 2 }}>
        {dark ? 'Dark' : 'Light'}
      </p>

      {/* Rising sky lanterns — decorative layer behind the content */}
      <img
        src="/lanterns.png"
        alt=""
        aria-hidden="true"
        className="lantern-float"
        style={{
          position: 'absolute',
          bottom: '-3%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(820px, 100%)',
          opacity: dark ? 0.95 : 0.78,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div className="arabic anim-shimmer" lang="ar" aria-label="Bismillāh ir-Raḥmān ir-Raḥīm" style={{ color: gold, fontSize: '3rem', lineHeight: 1.3, marginBottom: '28px' }}>
          ﷽
        </div>

        <p style={{ color: muted, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.32em', marginBottom: '12px' }}>
          The Wedding of
        </p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', color: ink, fontSize: '2.4rem', fontWeight: 300, lineHeight: 1.1, marginBottom: '12px' }}>
          Fahad P N
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', justifyContent: 'center', marginBottom: '12px' }}>
          <div style={{ width: '56px', height: '1px', background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
          <span style={{ color: gold, fontSize: '1.1rem' }}>✦</span>
          <div style={{ width: '56px', height: '1px', background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', color: ink, fontSize: '2.4rem', fontWeight: 300, lineHeight: 1.1 }}>
          Nadha Shirin K N
        </h1>
      </div>
    </section>
  )
}

export default function LanternDemo() {
  return (
    <main>
      <Panel theme="light" />
      <Panel theme="dark" />
    </main>
  )
}
