'use client'

/* Prototype — "inside the living palace": the landing's vivid scene stays alive behind,
   content floats on frosted-glass panels. Visit /preview. Not linked from the live site. */

import { useEffect, useState } from 'react'

const SCENE = '/scene'
const GOLD = '#E8D5A3'
const GOLD_DEEP = '#C9A84C'
const INK = '#F3E9D2'
const SUB = '#d8c79a'

function GlassCard({ children }) {
  return (
    <div style={{
      position: 'relative', background: 'rgba(12,8,4,0.46)', border: '1px solid rgba(201,168,76,0.42)',
      backdropFilter: 'blur(7px)', WebkitBackdropFilter: 'blur(7px)', padding: '34px 28px',
      boxShadow: '0 12px 44px rgba(0,0,0,0.45)',
    }}>
      {[
        { top: '8px', left: '8px', borderTop: `1px solid ${GOLD_DEEP}`, borderLeft: `1px solid ${GOLD_DEEP}` },
        { top: '8px', right: '8px', borderTop: `1px solid ${GOLD_DEEP}`, borderRight: `1px solid ${GOLD_DEEP}` },
        { bottom: '8px', left: '8px', borderBottom: `1px solid ${GOLD_DEEP}`, borderLeft: `1px solid ${GOLD_DEEP}` },
        { bottom: '8px', right: '8px', borderBottom: `1px solid ${GOLD_DEEP}`, borderRight: `1px solid ${GOLD_DEEP}` },
      ].map((s, i) => <div key={i} style={{ position: 'absolute', width: '14px', height: '14px', ...s }} />)}
      {children}
    </div>
  )
}

export default function Preview() {
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const apply = () => setDesktop(mq.matches); apply()
    mq.addEventListener('change', apply); return () => mq.removeEventListener('change', apply)
  }, [])

  const labelCaps = { color: GOLD_DEEP, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.26em' }

  return (
    <main style={{ position: 'relative', minHeight: '100dvh', backgroundColor: '#0e0a06', color: INK, overflowX: 'hidden' }}>
      {/* ── living scene (fixed, VIVID — only a light scrim) ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        {desktop ? (
          <>
            <img src={`${SCENE}/sky-wide.webp`} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <img src={`${SCENE}/palace.webp`} alt="" style={{ position: 'absolute', left: '50%', bottom: '6%', width: 'min(76%, 120dvh)', transform: 'translateX(-50%)', filter: 'blur(0.6px) saturate(0.97)', maskImage: 'linear-gradient(180deg,#000 0%,#000 84%,transparent 100%)', WebkitMaskImage: 'linear-gradient(180deg,#000 0%,#000 84%,transparent 100%)' }} />
            <img src={`${SCENE}/lanterns-sky.webp`} alt="" className="lantern-drift" style={{ position: 'absolute', left: '24%', top: '6%', width: '30%', transform: 'translateX(-50%)', animationDuration: '7s', opacity: 0.75 }} />
            <img src={`${SCENE}/lanterns-sky.webp`} alt="" className="lantern-drift" style={{ position: 'absolute', left: '50%', top: '2%', width: '40%', transform: 'translateX(-50%)', animationDuration: '6s', opacity: 0.8 }} />
            <img src={`${SCENE}/lanterns-sky.webp`} alt="" className="lantern-drift" style={{ position: 'absolute', left: '76%', top: '7%', width: '28%', transform: 'translateX(-50%)', animationDuration: '8s', opacity: 0.7 }} />
            <img src={`${SCENE}/arch-wide.webp`} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <img src={`${SCENE}/florals-wide.webp`} alt="" style={{ position: 'absolute', left: '50%', bottom: 0, width: '100%', transform: 'translateX(-50%)' }} />
          </>
        ) : (
          <>
            <img src={`${SCENE}/sky.webp`} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
            <img src={`${SCENE}/palace.webp`} alt="" style={{ position: 'absolute', left: '50%', bottom: '34%', width: '86%', transform: 'translateX(-50%)' }} />
            <img src={`${SCENE}/lanterns-sky.webp`} alt="" className="lantern-drift" style={{ position: 'absolute', left: '50%', top: '4%', width: '100%', transform: 'translateX(-50%)', animationDuration: '7s', opacity: 0.8 }} />
            <img src={`${SCENE}/arch.webp`} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <img src={`${SCENE}/florals-bride.webp`} alt="" style={{ position: 'absolute', left: '50%', bottom: 0, width: '108%', transform: 'translateX(-50%)' }} />
          </>
        )}
        {/* LIGHT scrim so the scene stays vivid */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,7,4,0.18) 0%, rgba(10,7,4,0.32) 55%, rgba(10,7,4,0.5) 100%)' }} />
      </div>

      {/* ── content over the living scene ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* hero */}
        <section style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', textAlign: 'center', padding: 'clamp(80px, 12vh, 150px) 18px 40px' }}>
          <p style={{ ...labelCaps, color: GOLD, marginBottom: '10px', textShadow: '0 1px 10px rgba(0,0,0,0.8)' }}>Bride&apos;s Side · نكاح</p>
          <h1 style={{ fontFamily: 'var(--font-script)', color: INK, fontWeight: 400, lineHeight: 1.05, margin: '0 0 8px', whiteSpace: 'nowrap', fontSize: desktop ? 'clamp(3rem, 6vw, 5rem)' : 'clamp(2rem, 11vw, 3rem)', textShadow: '0 2px 22px rgba(0,0,0,0.8)' }}>
            Fahad <span style={{ fontSize: '0.62em', color: GOLD }}>&amp;</span> Nadha
          </h1>
          <p style={{ color: SUB, fontSize: '0.82rem', letterSpacing: '0.24em', textShadow: '0 1px 10px rgba(0,0,0,0.85)' }}>NIKKAH · 26 JULY 2026</p>
        </section>

        {/* glass content panels */}
        <section style={{ maxWidth: '600px', margin: '0 auto', padding: '4vh 20px' }}>
          <GlassCard>
            <div className="arabic" style={{ color: INK, fontSize: '1.18rem', textAlign: 'center', marginBottom: '16px', lineHeight: 2 }}>
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
            </div>
            <div style={{ width: '60px', height: '1px', background: `linear-gradient(90deg,transparent,${GOLD_DEEP},transparent)`, margin: '0 auto 16px' }} />
            <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', color: SUB, fontSize: '0.98rem', lineHeight: 1.85, textAlign: 'center', marginBottom: '12px' }}>
              “And of His signs is that He created for you mates from among yourselves, that you may find tranquillity in them; and He placed between you affection and mercy.”
            </p>
            <p style={{ color: GOLD, fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.22em', textAlign: 'center' }}>— Surah Ar-Rum · 30:21</p>
          </GlassCard>
        </section>

        <section style={{ maxWidth: '600px', margin: '0 auto', padding: '4vh 20px 10vh' }}>
          <GlassCard>
            <p style={{ ...labelCaps, color: GOLD, textAlign: 'center', marginBottom: '22px' }}>Bride&apos;s Side · نكاح</p>
            {[['Date', '26th July 2026'], ['Time', '11:30 AM'], ['Venue', 'Cosmopolitan Convention Center']].map(([l, v], i) => (
              <div key={i}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ color: GOLD, fontSize: '1.1rem', marginTop: '2px' }}>◈</span>
                  <div>
                    <p style={{ ...labelCaps, fontSize: '0.6rem', letterSpacing: '0.2em', marginBottom: '4px' }}>{l}</p>
                    <p style={{ fontFamily: 'var(--font-cormorant)', color: INK, fontSize: '1.25rem', fontWeight: 300 }}>{v}</p>
                  </div>
                </div>
                {i < 2 && <div style={{ height: '1px', background: 'rgba(201,168,76,0.25)', margin: '18px 0' }} />}
              </div>
            ))}
          </GlassCard>
        </section>
      </div>
    </main>
  )
}
