'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/* Immersive dark landing prototype — visit /lantern. Not linked from live site.
   Lantern depth-field fixed behind the page, parallaxing on scroll;
   sections reveal as they enter view; ends with side-choosing. */

const GOLD = '#E8D5A3'
const GOLD_DEEP = '#C9A84C'
const MUTED = '#C9A84C'
const INK = '#F3E9D2'

const S = '/lantern-small.png'
const B = '/lantern-single.png'

/* lanterns grouped by depth plane (each plane parallaxes at its own rate) */
const PLANES = {
  far: [
    { img: S, left: 16, bottom: 60, w: 42, op: 0.20, blur: 2.5, sat: 0.62, dur: 9.0,  delay: 0.0, flip: false },
    { img: S, left: 84, bottom: 66, w: 36, op: 0.16, blur: 3.0, sat: 0.60, dur: 10.5, delay: 1.2, flip: true  },
    { img: S, left: 50, bottom: 74, w: 32, op: 0.14, blur: 3.5, sat: 0.55, dur: 11.0, delay: 2.4, flip: false },
    { img: S, left: 31, bottom: 68, w: 38, op: 0.16, blur: 3.0, sat: 0.58, dur: 9.8,  delay: 3.0, flip: true  },
    { img: S, left: 68, bottom: 71, w: 34, op: 0.13, blur: 3.5, sat: 0.55, dur: 12.0, delay: 1.8, flip: false },
  ],
  mid: [
    { img: S, left: 9,  bottom: 26, w: 90, op: 0.34, blur: 1.0, sat: 0.78, dur: 7.5, delay: 0.6, flip: false },
    { img: S, left: 91, bottom: 32, w: 80, op: 0.30, blur: 1.3, sat: 0.74, dur: 8.5, delay: 1.8, flip: true  },
    { img: S, left: 22, bottom: 14, w: 72, op: 0.27, blur: 1.2, sat: 0.75, dur: 8.0, delay: 2.6, flip: true  },
  ],
  near: [
    { img: B, left: 34, bottom: -6,  w: 240, op: 0.50, blur: 0.0, sat: 0.92, dur: 6.5, delay: 0.3, flip: false },
    { img: B, left: 70, bottom: -9,  w: 210, op: 0.42, blur: 0.4, sat: 0.86, dur: 7.0, delay: 1.0, flip: true  },
    { img: B, left: 52, bottom: -13, w: 175, op: 0.36, blur: 0.6, sat: 0.80, dur: 7.8, delay: 2.0, flip: false },
  ],
}

function Lantern({ l, scale }) {
  return (
    <div style={{ position: 'absolute', left: `${l.left}%`, bottom: `${l.bottom}%`, width: l.w * scale, transform: `translateX(-50%)${l.flip ? ' scaleX(-1)' : ''}`, opacity: l.op, pointerEvents: 'none' }}>
      <img src={l.img} alt="" aria-hidden="true" className="lantern-drift" style={{ width: '100%', display: 'block', filter: `saturate(${l.sat}) blur(${l.blur * scale}px)`, animationDuration: `${l.dur}s`, animationDelay: `${l.delay}s` }} />
    </div>
  )
}

function Reveal({ children, style }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.classList.add('in'); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { el.classList.add('in'); io.unobserve(el) } })
    }, { threshold: 0.18 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className="reveal" style={style}>{children}</div>
}

function CornerDecor({ style }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" style={{ width: '54px', height: '54px', position: 'absolute', zIndex: 3, ...style }}>
      <path d="M4,4 L56,4 L56,56" stroke={GOLD_DEEP} strokeWidth="1.1" opacity="0.4" />
      <path d="M4,4 L28,28" stroke={GOLD_DEEP} strokeWidth="0.5" opacity="0.25" />
      <circle cx="4" cy="4" r="2.4" fill={GOLD_DEEP} opacity="0.45" />
    </svg>
  )
}

function SideCard({ title, arabic, sub, time, glyph }) {
  return (
    <div className="side-card" style={{ width: 'min(230px, 82vw)', padding: '36px 28px', border: '1px solid rgba(201,168,76,0.4)', background: 'rgba(28,20,12,0.62)', position: 'relative', cursor: 'pointer' }}>
      {[
        { top: '8px', left: '8px', borderTop: '1px solid rgba(201,168,76,0.5)', borderLeft: '1px solid rgba(201,168,76,0.5)' },
        { top: '8px', right: '8px', borderTop: '1px solid rgba(201,168,76,0.5)', borderRight: '1px solid rgba(201,168,76,0.5)' },
        { bottom: '8px', left: '8px', borderBottom: '1px solid rgba(201,168,76,0.5)', borderLeft: '1px solid rgba(201,168,76,0.5)' },
        { bottom: '8px', right: '8px', borderBottom: '1px solid rgba(201,168,76,0.5)', borderRight: '1px solid rgba(201,168,76,0.5)' },
      ].map((s, i) => <div key={i} style={{ position: 'absolute', width: '16px', height: '16px', ...s }} />)}
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: GOLD, fontSize: '1.5rem', marginBottom: '10px' }}>{glyph}</div>
        <div className="arabic" style={{ color: GOLD, fontSize: '1rem', marginBottom: '12px' }}>{arabic}</div>
        <div style={{ width: '100%', height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD_DEEP}, transparent)`, margin: '0 0 12px' }} />
        <h3 style={{ fontFamily: 'var(--font-cormorant)', color: INK, fontSize: '1.3rem', fontWeight: 500, marginBottom: '6px' }}>{title}</h3>
        <p style={{ color: MUTED, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '8px' }}>{sub}</p>
        <p style={{ fontFamily: 'var(--font-cormorant)', color: GOLD, fontSize: '1rem', fontStyle: 'italic' }}>{time}</p>
      </div>
    </div>
  )
}

export default function LanternLanding() {
  const farRef = useRef(null)
  const midRef = useRef(null)
  const nearRef = useRef(null)
  const [scale, setScale] = useState(1)

  // Scale the lantern field to the viewport so it never overwhelms small screens
  useEffect(() => {
    const calc = () => setScale(Math.min(1, Math.max(0.5, window.innerWidth / 1200)))
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // lighter parallax on phones to keep scrolling smooth
    const k = window.innerWidth < 640 ? 0.5 : 1
    const planes = [[farRef, 0.06 * k], [midRef, 0.12 * k], [nearRef, 0.20 * k]]
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        planes.forEach(([ref, f]) => { if (ref.current) ref.current.style.transform = `translateY(${-y * f}px)` })
        raf = 0
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  return (
    <main
      style={{
        position: 'relative',
        color: INK,
        backgroundColor: '#100b06',
        backgroundImage:
          'radial-gradient(ellipse 95% 50% at 50% 100%, rgba(214,138,46,0.16), transparent 60%),' +
          'repeating-linear-gradient(45deg,transparent 0px,transparent 39px,rgba(232,213,163,0.03) 39px,rgba(232,213,163,0.03) 40px),' +
          'repeating-linear-gradient(-45deg,transparent 0px,transparent 39px,rgba(232,213,163,0.03) 39px,rgba(232,213,163,0.03) 40px)',
      }}
    >
      {/* Fixed lantern stage (parallax planes) */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <div ref={farRef} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>{PLANES.far.map((l, i) => <Lantern key={i} l={l} scale={scale} />)}</div>
        <div ref={midRef} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>{PLANES.mid.map((l, i) => <Lantern key={i} l={l} scale={scale} />)}</div>
        <div ref={nearRef} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>{PLANES.near.map((l, i) => <Lantern key={i} l={l} scale={scale} />)}</div>
      </div>

      {/* Fixed scrim for legibility */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 45% at 50% 42%, rgba(16,11,6,0.82) 0%, rgba(16,11,6,0.42) 48%, transparent 74%)' }} />

      <CornerDecor style={{ top: '16px', left: '16px' }} />
      <CornerDecor style={{ top: '16px', right: '16px', transform: 'rotate(90deg)' }} />

      {/* ── Hero ── */}
      <section style={{ position: 'relative', zIndex: 2, minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '64px 16px' }}>
        <div className="arabic anim-shimmer" lang="ar" aria-label="Bismillāh ir-Raḥmān ir-Raḥīm" style={{ color: GOLD, fontSize: '3rem', lineHeight: 1.3, marginBottom: '30px' }}>﷽</div>
        <p style={{ color: MUTED, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.34em', marginBottom: '16px' }}>The Wedding of</p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', color: INK, fontSize: 'clamp(2.2rem, 7vw, 3.1rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '14px' }}>Fahad P N</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', justifyContent: 'center', marginBottom: '14px' }}>
          <div style={{ width: '60px', height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD_DEEP}, transparent)` }} />
          <span style={{ color: GOLD, fontSize: '1.1rem' }}>✦</span>
          <div style={{ width: '60px', height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD_DEEP}, transparent)` }} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', color: INK, fontSize: 'clamp(2.2rem, 7vw, 3.1rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '22px' }}>Nadha Shirin K N</h1>
        <p style={{ color: MUTED, fontSize: '0.8rem', letterSpacing: '0.3em' }}>26 · July · 2026</p>

        {/* scroll hint */}
        <div className="chev" style={{ position: 'absolute', bottom: '26px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: MUTED, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.3em' }}>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD_DEEP} strokeWidth="1.5"><path d="M6 9l6 6 6-6" /></svg>
        </div>
      </section>

      {/* ── Blessing / verse ── */}
      <section style={{ position: 'relative', zIndex: 2, padding: '14vh 20px', display: 'flex', justifyContent: 'center' }}>
        <Reveal style={{ maxWidth: '560px', textAlign: 'center' }}>
          <span className="arabic" style={{ color: GOLD_DEEP, fontSize: '1.4rem', opacity: 0.8 }}>۞</span>
          <p style={{ fontFamily: 'var(--font-cormorant)', color: INK, fontSize: 'clamp(1.05rem, 3.5vw, 1.35rem)', fontStyle: 'italic', lineHeight: 1.85, margin: '20px 0 18px' }}>
            “And of His signs is that He created for you mates from among yourselves, that you may find tranquility in them; and He placed between you affection and mercy.”
          </p>
          <div style={{ width: '60px', height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD_DEEP}, transparent)`, margin: '0 auto 14px' }} />
          <p style={{ color: MUTED, fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.24em' }}>Surah Ar-Rum · 30:21</p>
        </Reveal>
      </section>

      {/* ── Choose your side ── */}
      <section style={{ position: 'relative', zIndex: 2, minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '14vh 16px', textAlign: 'center' }}>
        <Reveal>
          <p style={{ color: MUTED, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.34em', marginBottom: '28px' }}>Please choose your side</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '22px', justifyContent: 'center' }}>
            <Link href="/bride" style={{ textDecoration: 'none' }}>
              <SideCard title="Bride's Side" arabic="جانب العروس" sub="Nikkah Ceremony" time="11:30 AM" glyph="◯" />
            </Link>
            <Link href="/groom" style={{ textDecoration: 'none' }}>
              <SideCard title="Groom's Side" arabic="جانب العريس" sub="Wedding Reception" time="7:00 PM" glyph="◈" />
            </Link>
          </div>
        </Reveal>

        {/* footer */}
        <div style={{ marginTop: '12vh' }}>
          <div className="arabic" style={{ color: GOLD_DEEP, fontSize: '1.6rem', opacity: 0.4, marginBottom: '8px' }}>۞</div>
          <p className="arabic" style={{ color: GOLD_DEEP, fontSize: '0.8rem', opacity: 0.5 }}>٢٦ يوليو ٢٠٢٦</p>
        </div>
      </section>
    </main>
  )
}
