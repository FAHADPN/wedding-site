import Lantern from '../../components/Lantern'

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
      <p style={{ position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)', color: muted, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.28em' }}>
        {dark ? 'Dark' : 'Light'}
      </p>

      {/* Bismillah flanked by a pair of lanterns */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '32px' }}>
        <Lantern size={92} theme={theme} />
        <div style={{ alignSelf: 'center', textAlign: 'center', padding: '0 4px' }}>
          <div className="arabic anim-shimmer" lang="ar" aria-label="Bismillāh ir-Raḥmān ir-Raḥīm" style={{ color: gold, fontSize: '3rem', lineHeight: 1.3 }}>
            ﷽
          </div>
        </div>
        <Lantern size={92} theme={theme} />
      </div>

      {/* Names */}
      <div style={{ textAlign: 'center' }}>
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

      {/* Single large lantern below, to judge detail */}
      <div style={{ marginTop: '40px' }}>
        <Lantern size={130} theme={theme} />
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
