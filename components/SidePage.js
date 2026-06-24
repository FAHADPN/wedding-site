'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Countdown = dynamic(() => import('./Countdown'), { ssr: false })
const Rsvp = dynamic(() => import('./Rsvp'), { ssr: false })

const SCENE = '/scene'
const GOLD = '#E8D5A3'
const GOLD_DEEP = '#C9A84C'
const INK = '#F3E9D2'
const SUB = '#d8c79a'

const QURAN_AR =
  'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ'

/* scroll-reveal wrapper */
function Reveal({ children, style }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.classList.add('in'); return }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { el.classList.add('in'); io.unobserve(el) } })
    }, { threshold: 0.16 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className="reveal" style={style}>{children}</div>
}

/* dark glass card */
function Card({ children, style }) {
  return (
    <div style={{ position: 'relative', background: 'rgba(16,11,7,0.72)', border: '1px solid rgba(201,168,76,0.28)', padding: '32px 26px', ...style }}>
      {[
        { top: '8px', left: '8px', borderTop: '1px solid rgba(201,168,76,0.45)', borderLeft: '1px solid rgba(201,168,76,0.45)' },
        { top: '8px', right: '8px', borderTop: '1px solid rgba(201,168,76,0.45)', borderRight: '1px solid rgba(201,168,76,0.45)' },
        { bottom: '8px', left: '8px', borderBottom: '1px solid rgba(201,168,76,0.45)', borderLeft: '1px solid rgba(201,168,76,0.45)' },
        { bottom: '8px', right: '8px', borderBottom: '1px solid rgba(201,168,76,0.45)', borderRight: '1px solid rgba(201,168,76,0.45)' },
      ].map((s, i) => <div key={i} style={{ position: 'absolute', width: '14px', height: '14px', ...s }} />)}
      {children}
    </div>
  )
}

export default function SidePage({ side, T, mapsUrl, targetDate }) {
  const [lang, setLang] = useState('en')
  const t = T[lang]
  const isMl = lang === 'ml'
  const bodyFont = isMl ? 'var(--font-noto-ml)' : 'var(--font-cormorant)'

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('lang')
    if (p === 'ml' || p === 'en') setLang(p)
  }, [])

  const labelCaps = (extra = {}) => ({
    color: GOLD_DEEP, fontSize: '0.72rem', textTransform: isMl ? 'none' : 'uppercase',
    letterSpacing: isMl ? '0.04em' : '0.26em', fontFamily: isMl ? 'var(--font-noto-ml)' : undefined, ...extra,
  })

  return (
    <main style={{ position: 'relative', minHeight: '100dvh', backgroundColor: '#0e0a06', color: INK, overflowX: 'hidden' }}>
      {/* ── fixed parallax backdrop ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <img src={`${SCENE}/sky.webp`} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <img src={`${SCENE}/palace-far.webp`} alt="" aria-hidden="true" style={{ position: 'absolute', left: '50%', bottom: 0, width: 'max(140%, 760px)', transform: 'translateX(-50%)', opacity: 0.7 }} />
        <img src={`${SCENE}/lanterns-sky.webp`} alt="" aria-hidden="true" className="lantern-drift" style={{ position: 'absolute', left: '50%', top: '4%', width: '100%', transform: 'translateX(-50%)', opacity: 0.5, animationDuration: '7s' }} />
        {/* legibility scrim */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,10,6,0.55) 0%, rgba(14,10,6,0.78) 45%, rgba(14,10,6,0.92) 100%)' }} />
      </div>

      {/* ── nav ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 18px', background: 'rgba(14,10,6,0.6)', borderBottom: '1px solid rgba(201,168,76,0.18)',
      }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', padding: '4px 8px', margin: '0 -8px', color: GOLD_DEEP, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none', fontFamily: isMl ? 'var(--font-noto-ml)' : undefined }}>
          {t.back}
        </Link>
        <button onClick={() => setLang((l) => (l === 'en' ? 'ml' : 'en'))} style={{ minHeight: '44px', color: GOLD_DEEP, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', background: 'none', border: '1px solid rgba(201,168,76,0.45)', padding: '8px 16px', cursor: 'pointer', fontFamily: isMl ? 'var(--font-noto-ml)' : undefined }}>
          {t.lang}
        </button>
      </nav>

      {/* ── content ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* hero */}
        <section style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '90px 18px 40px' }}>
          <div className="arabic anim-shimmer" lang="ar" aria-label="Bismillāh ir-Raḥmān ir-Raḥīm" style={{ color: GOLD, fontSize: 'clamp(1.5rem, 7vw, 2.6rem)', lineHeight: 1.3, marginBottom: '22px', maxWidth: '100%' }}>﷽</div>
          <p style={labelCaps({ marginBottom: '18px' })}>{t.side_label}</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', color: INK, fontSize: 'clamp(2rem, 6.5vw, 3rem)', fontWeight: 300, lineHeight: 1.12, marginBottom: '12px' }}>{t.groom_name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', justifyContent: 'center', marginBottom: '12px' }}>
            <div style={{ width: '52px', height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD_DEEP}, transparent)` }} />
            <span style={{ color: GOLD, fontSize: '1.2rem' }}>✦</span>
            <div style={{ width: '52px', height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD_DEEP}, transparent)` }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', color: INK, fontSize: 'clamp(2rem, 6.5vw, 3rem)', fontWeight: 300, lineHeight: 1.12, marginBottom: '20px' }}>{t.bride_name}</h1>
          <p style={{ color: SUB, fontSize: isMl ? '0.95rem' : '0.85rem', letterSpacing: isMl ? '0.04em' : '0.22em', fontFamily: bodyFont }}>{t.date_val}</p>

          <div className="chev" style={{ position: 'absolute', bottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: GOLD_DEEP, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.3em' }}>Scroll</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD_DEEP} strokeWidth="1.5"><path d="M6 9l6 6 6-6" /></svg>
          </div>
        </section>

        {/* invitation */}
        <section style={{ maxWidth: '620px', margin: '0 auto', padding: '8vh 20px' }}>
          <Reveal style={{ textAlign: 'center' }}>
            <p style={labelCaps({ marginBottom: '12px' })}>{t.invitation_prefix}</p>
            <p style={{ color: SUB, fontSize: isMl ? '0.98rem' : '1.15rem', fontFamily: bodyFont, fontStyle: isMl ? 'normal' : 'italic', lineHeight: 1.7, marginBottom: '14px' }}>{t.invitation_body}</p>
            <p style={labelCaps()}>{t.event_name}</p>
          </Reveal>
        </section>

        {/* verse */}
        <section style={{ maxWidth: '620px', margin: '0 auto', padding: '4vh 20px' }}>
          <Reveal>
            <Card style={{ background: 'rgba(16,11,7,0.6)' }}>
              <div className="arabic" style={{ color: INK, fontSize: '1.2rem', textAlign: 'center', marginBottom: '18px', lineHeight: 2 }}>{QURAN_AR}</div>
              <div className="divider" style={{ width: '60px', margin: '0 auto 18px' }} />
              <p style={{ color: SUB, fontSize: isMl ? '0.9rem' : '0.98rem', fontFamily: bodyFont, fontStyle: isMl ? 'normal' : 'italic', lineHeight: 1.85, textAlign: 'center', marginBottom: '14px' }}>“{t.quran_en}”</p>
              <p style={labelCaps({ textAlign: 'center', color: GOLD })}>— {t.quran_ref}</p>
            </Card>
          </Reveal>
        </section>

        {/* details */}
        <section style={{ maxWidth: '620px', margin: '0 auto', padding: '4vh 20px' }}>
          <Reveal>
            <Card>
              <p style={labelCaps({ textAlign: 'center', color: GOLD, marginBottom: '22px' })}>{t.side_label}</p>
              {[
                { label: t.date_label, value: t.date_val },
                { label: t.time_label, value: t.time_val },
              ].map((row, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <span style={{ color: GOLD, fontSize: '1.1rem', marginTop: '2px' }}>◈</span>
                    <div>
                      <p style={labelCaps({ fontSize: '0.62rem', letterSpacing: isMl ? '0.04em' : '0.2em', marginBottom: '4px' })}>{row.label}</p>
                      <p style={{ fontFamily: isMl ? 'var(--font-noto-ml)' : 'var(--font-cormorant)', color: INK, fontSize: isMl ? '1rem' : '1.25rem', fontWeight: 300 }}>{row.value}</p>
                    </div>
                  </div>
                  <div className="divider" style={{ margin: '18px 0' }} />
                </div>
              ))}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ color: GOLD, fontSize: '1.1rem', marginTop: '2px' }}>◈</span>
                <div>
                  <p style={labelCaps({ fontSize: '0.62rem', letterSpacing: isMl ? '0.04em' : '0.2em', marginBottom: '4px' })}>{t.venue_label}</p>
                  <p style={{ fontFamily: isMl ? 'var(--font-noto-ml)' : 'var(--font-cormorant)', color: INK, fontSize: isMl ? '1rem' : '1.25rem', fontWeight: 300, marginBottom: '14px' }}>{t.venue_val}</p>
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="map-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: `1px solid ${GOLD_DEEP}`, color: GOLD, padding: '9px 18px', fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.16em', textDecoration: 'none', fontFamily: isMl ? 'var(--font-noto-ml)' : undefined }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    {t.map_btn}
                  </a>
                </div>
              </div>
            </Card>
          </Reveal>
        </section>

        {/* countdown */}
        <section style={{ maxWidth: '620px', margin: '0 auto', padding: '6vh 20px', textAlign: 'center' }}>
          <Reveal>
            <p style={labelCaps({ marginBottom: '20px' })}>{t.countdown_label}</p>
            <Countdown targetDate={targetDate} labels={{ days: t.days, hours: t.hours, minutes: t.minutes, seconds: t.seconds }} isMl={isMl} />
          </Reveal>
        </section>

        {/* rsvp */}
        <section style={{ maxWidth: '560px', margin: '0 auto', padding: '4vh 20px' }}>
          <Reveal>
            <Rsvp side={side} isMl={isMl} lang={lang} dark />
          </Reveal>
        </section>

        {/* dua + footer */}
        <section style={{ maxWidth: '560px', margin: '0 auto', padding: '2vh 20px 8vh' }}>
          <Reveal>
            <div style={{ border: '1px solid rgba(201,168,76,0.2)', padding: '28px 24px', textAlign: 'center', marginBottom: '36px' }}>
              <div className="arabic anim-shimmer" style={{ color: GOLD, fontSize: '1.2rem', marginBottom: '16px' }}>{t.dua_arabic}</div>
              <div className="divider" style={{ width: '48px', margin: '0 auto 16px' }} />
              <p style={{ color: SUB, fontSize: isMl ? '0.9rem' : '0.98rem', fontFamily: bodyFont, fontStyle: isMl ? 'normal' : 'italic', lineHeight: 1.8, marginBottom: '18px' }}>{t.dua_en}</p>
              <p style={{ color: GOLD_DEEP, fontSize: isMl ? '0.85rem' : '0.78rem', fontFamily: bodyFont, lineHeight: 1.7 }}>{t.footer}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span className="arabic" style={{ color: GOLD_DEEP, fontSize: '1.8rem', opacity: 0.5 }}>۞</span>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  )
}
