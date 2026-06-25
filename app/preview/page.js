/* Prototype of the "cream invitation card" direction — visit /preview.
   Not linked from the live site. Hero + verse section only, for judging the look. */

const GREEN = '#33483a'
const GREEN_SOFT = '#5d6b55'
const GOLD = '#b08a45'
const GOLD_SOFT = '#c9a84c'
const INK = '#4a4638'

/* gold cusped-arch line over the Bismillah */
function ArchLine() {
  return (
    <svg viewBox="0 0 300 90" fill="none" style={{ width: 'min(300px, 80%)', height: 'auto', margin: '0 auto', display: 'block' }} aria-hidden="true">
      <path d="M10 88 L10 46 Q10 30 26 30 Q26 16 40 30 Q56 6 80 26 Q110 -6 150 14 Q190 -6 220 26 Q244 6 260 30 Q274 16 274 30 Q290 30 290 46 L290 88"
        stroke={GOLD_SOFT} strokeWidth="1" opacity="0.7" />
      <circle cx="150" cy="10" r="2.4" fill={GOLD} />
    </svg>
  )
}

/* small shimmering ornament divider */
function Divider({ w = 60 }) {
  return <div style={{ width: w, height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
}

function CorneredCard({ children }) {
  return (
    <div style={{ position: 'relative', background: 'rgba(255,255,255,0.5)', border: `1px solid rgba(176,138,69,0.32)`, padding: '34px 28px' }}>
      {[
        { top: '8px', left: '8px', borderTop: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}` },
        { top: '8px', right: '8px', borderTop: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}` },
        { bottom: '8px', left: '8px', borderBottom: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}` },
        { bottom: '8px', right: '8px', borderBottom: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}` },
      ].map((s, i) => <div key={i} style={{ position: 'absolute', width: '14px', height: '14px', opacity: 0.6, ...s }} />)}
      {children}
    </div>
  )
}

export default function PreviewCard() {
  return (
    <main className="islamic-bg" style={{ minHeight: '100dvh', color: GREEN }}>
      {/* ── hero ── */}
      <section style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px 36px', textAlign: 'center' }}>
        <ArchLine />
        <div className="arabic" lang="ar" aria-label="Bismillāh ir-Raḥmān ir-Raḥīm" style={{ color: GOLD, fontSize: 'clamp(1.5rem, 7vw, 2.6rem)', lineHeight: 1.3, marginTop: '-6px', marginBottom: '8px', maxWidth: '100%' }}>﷽</div>
        <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', color: GREEN_SOFT, fontSize: '0.86rem', marginBottom: '34px' }}>
          In the Name of Allah, the Most Gracious, the Most Merciful
        </p>

        <p style={{ color: GREEN_SOFT, fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.32em', marginBottom: '2px' }}>Together with their families</p>
        <p style={{ fontFamily: 'var(--font-script)', color: GOLD, fontSize: '1.5rem', marginBottom: '4px' }}>we joyfully invite you</p>

        <h1 style={{ fontFamily: 'var(--font-script)', color: GREEN, fontSize: 'clamp(3rem, 13vw, 5rem)', fontWeight: 400, lineHeight: 1.02, margin: '10px 0 6px' }}>
          Fahad <span style={{ fontSize: '0.6em', color: GOLD, verticalAlign: 'middle' }}>&amp;</span> Nadha
        </h1>

        <p style={{ color: GOLD, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.3em', margin: '14px 0 6px' }}>Bride&apos;s Side · Nikkah Ceremony</p>

        <p style={{ fontFamily: 'var(--font-cormorant)', color: INK, fontSize: '1.02rem', lineHeight: 1.7, maxWidth: '380px', margin: '14px auto 26px' }}>
          to share in the blessing of our union, in shā Allah.
        </p>

        {/* date block */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', marginBottom: '6px' }}>
          <Divider w={44} />
          <p style={{ fontFamily: 'var(--font-cormorant)', color: GREEN, fontSize: '0.72rem', letterSpacing: '0.18em' }}>26<sup>TH</sup></p>
          <Divider w={44} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '4px' }}>
          {['SUNDAY', 'JULY', '2026'].map((x, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '16px' }}>
              {i > 0 && <span style={{ color: GOLD }}>·</span>}
              <span style={{ fontFamily: 'var(--font-cormorant)', color: GREEN, fontSize: '1.05rem', letterSpacing: '0.16em' }}>{x}</span>
            </span>
          ))}
        </div>
        <p style={{ color: GREEN_SOFT, fontSize: '0.7rem', letterSpacing: '0.1em', marginTop: '8px' }}>( 11 Safar, 1448 AH ) · 11:30 AM</p>
      </section>

      {/* ── verse section ── */}
      <section style={{ maxWidth: '640px', margin: '0 auto', padding: '6px 24px 64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '28px' }}>
          <Divider w={70} />
          <span className="arabic" style={{ color: GOLD, fontSize: '1.2rem', opacity: 0.8 }}>۞</span>
          <Divider w={70} />
        </div>
        <CorneredCard>
          <div className="arabic" style={{ color: GREEN, fontSize: '1.2rem', textAlign: 'center', marginBottom: '18px', lineHeight: 2 }}>
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </div>
          <div style={{ margin: '0 auto 18px', width: '60px' }}><Divider w={60} /></div>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', color: INK, fontSize: '0.98rem', lineHeight: 1.85, textAlign: 'center', marginBottom: '14px' }}>
            “And of His signs is that He created for you mates from among yourselves, that you may find tranquillity in them; and He placed between you affection and mercy.”
          </p>
          <p style={{ color: GOLD, fontSize: '0.64rem', textTransform: 'uppercase', letterSpacing: '0.22em', textAlign: 'center' }}>— Surah Ar-Rum · 30:21</p>
        </CorneredCard>
      </section>
    </main>
  )
}
