'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/* Layered parallax "Mughal palace" scene — the site's front door.
   Pure atmosphere → choose-your-side → bride/groom. */

const SCENE = '/scene'

const SHARED = ['palace.webp', 'couple.webp', 'lanterns-sky.webp']
const MOBILE = ['sky.webp', 'palace-far.webp', 'arch.webp', 'florals.webp', 'lantern-hang.webp']
const DESKTOP = ['sky-wide.webp', 'arch-wide.webp', 'florals-wide.webp']

/* bilingual choose-overlay strings */
const CHOOSE = {
  en: {
    heading: 'Please choose your side',
    bride: { title: "Bride's Side", sub: 'Nikkah Ceremony', time: '11:30 AM' },
    groom: { title: "Groom's Side", sub: 'Wedding Reception', time: '07:00 PM' },
  },
  ml: {
    heading: 'നിങ്ങളുടെ ഭാഗം തിരഞ്ഞെടുക്കുക',
    bride: { title: 'വധൂ ഭാഗം', sub: 'നിക്കാഹ് ചടങ്ങ്', time: 'രാവിലെ 11:30' },
    groom: { title: 'വരൻ ഭാഗം', sub: 'വിവാഹ റിസപ്ഷൻ', time: 'വൈകിട്ട് 7:00' },
  },
}

/* A single depth layer. `objPos` defaults to bottom-anchored. */
function Layer({ src, z, f, order, pos, cover, float, objPos = 'center bottom', alt = '' }) {
  return (
    <div className="layer-fade" style={{ position: 'absolute', zIndex: z, pointerEvents: 'none', transitionDelay: `${order * 0.12}s`, ...pos }}>
      <div className="scene-layer" style={{ ['--f']: f, width: '100%', height: cover ? '100%' : 'auto' }}>
        <img
          src={src}
          alt={alt}
          aria-hidden={alt ? undefined : 'true'}
          className={float ? 'lantern-drift' : undefined}
          style={{
            width: '100%',
            height: cover ? '100%' : 'auto',
            objectFit: cover ? 'cover' : 'contain',
            objectPosition: objPos,
            display: 'block',
            animationDuration: float ? '6.5s' : undefined,
          }}
        />
      </div>
    </div>
  )
}

/* ── Choose-your-side card ── */
function SideCard({ href, title, arabic, sub, time, glyph, isMl, delay }) {
  return (
    <Link href={href} className="choose-card" style={{
      width: 'min(240px, 82vw)', padding: '32px 26px', textDecoration: 'none',
      border: '1px solid rgba(201,168,76,0.55)', background: 'rgba(18,12,7,0.86)',
      boxShadow: '0 10px 40px rgba(0,0,0,0.5)', position: 'relative', transitionDelay: `${delay}s`,
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#E8D5A3', fontSize: '1.5rem', marginBottom: '8px' }}>{glyph}</div>
        <div className="arabic" style={{ color: '#E8D5A3', fontSize: '1.05rem', marginBottom: '10px' }}>{arabic}</div>
        <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin: '0 0 12px' }} />
        <h3 style={{ fontFamily: isMl ? 'var(--font-noto-ml)' : 'var(--font-cormorant)', color: '#F8F1DF', fontSize: isMl ? '1.1rem' : '1.3rem', fontWeight: 500, marginBottom: '6px' }}>{title}</h3>
        <p style={{ color: '#D9BE7E', fontSize: '0.68rem', textTransform: isMl ? 'none' : 'uppercase', letterSpacing: isMl ? '0.04em' : '0.2em', marginBottom: '8px', fontFamily: isMl ? 'var(--font-noto-ml)' : undefined }}>{sub}</p>
        <p style={{ fontFamily: isMl ? 'var(--font-noto-ml)' : 'var(--font-cormorant)', color: '#E8D5A3', fontSize: '1rem', fontStyle: isMl ? 'normal' : 'italic' }}>{time}</p>
      </div>
    </Link>
  )
}

export default function PalaceScene() {
  const rootRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [choosing, setChoosing] = useState(false)
  const [lang, setLang] = useState('en')
  const [desktop, setDesktop] = useState(false)
  const isMl = lang === 'ml'
  const c = CHOOSE[lang]

  /* track viewport: wide screens get the full-bleed landscape layout */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const apply = () => setDesktop(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  /* preload the layers for this viewport, then trigger the staggered entrance */
  useEffect(() => {
    const desk = window.matchMedia('(min-width: 1024px)').matches
    const srcs = [...SHARED, ...(desk ? DESKTOP : MOBILE)]
    let done = false
    const finish = () => { if (!done) { done = true; setReady(true) } }
    let left = srcs.length
    srcs.forEach((s) => {
      const img = new window.Image()
      const tick = () => { if (--left <= 0) finish() }
      img.onload = tick
      img.onerror = tick
      img.src = `${SCENE}/${s}`
    })
    const fallback = setTimeout(finish, 4000)
    return () => clearTimeout(fallback)
  }, [])

  /* parallax: pointer + device-tilt + idle drift */
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let px = 0, py = 0, tx = 0, ty = 0, lastPointer = -9999, raf = 0
    const onMove = (cx, cy, t) => { tx = (cx / window.innerWidth - 0.5) * 2; ty = (cy / window.innerHeight - 0.5) * 2; lastPointer = t }
    const onMouse = (e) => onMove(e.clientX, e.clientY, performance.now())
    const onTouch = (e) => { if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY, performance.now()) }
    const onOrient = (e) => { if (e.gamma == null) return; tx = Math.max(-1, Math.min(1, e.gamma / 28)); ty = Math.max(-1, Math.min(1, ((e.beta || 45) - 45) / 28)); lastPointer = performance.now() }
    const loop = (t) => {
      if (t - lastPointer > 1800) { tx = Math.sin(t / 4200) * 0.55; ty = Math.cos(t / 5600) * 0.32 }
      px += (tx - px) * 0.05; py += (ty - py) * 0.05
      root.style.setProperty('--mx', px.toFixed(4)); root.style.setProperty('--my', py.toFixed(4))
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('deviceorientation', onOrient)
    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', onMouse); window.removeEventListener('touchmove', onTouch); window.removeEventListener('deviceorientation', onOrient); cancelAnimationFrame(raf) }
  }, [])

  return (
    <main
      ref={rootRef}
      className={`scene-root${ready ? ' ready' : ''}${choosing ? ' choosing' : ''}`}
      style={{ position: 'relative', height: '100dvh', overflow: 'hidden', backgroundColor: '#0b0805' }}
    >
      {desktop ? (
        /* ── full-bleed widescreen scene ── */
        <>
          <Layer src={`${SCENE}/sky-wide.webp`} z={0} f={3} order={0} cover objPos="center" pos={{ inset: 0 }} />
          <Layer src={`${SCENE}/palace.webp`} z={1} f={10} order={1} pos={{ left: '50%', bottom: '12%', width: '42%', transform: 'translateX(-50%)' }} />
          <Layer src={`${SCENE}/lanterns-sky.webp`} z={2} f={20} order={2} float pos={{ left: '23%', top: '9%', width: '34%', transform: 'translateX(-50%)' }} />
          <Layer src={`${SCENE}/lanterns-sky.webp`} z={2} f={16} order={2} float pos={{ left: '50%', top: '3%', width: '42%', transform: 'translateX(-50%)' }} />
          <Layer src={`${SCENE}/lanterns-sky.webp`} z={2} f={13} order={2} float pos={{ left: '78%', top: '7%', width: '32%', transform: 'translateX(-50%)' }} />
          <Layer src={`${SCENE}/couple.webp`} z={3} f={24} order={3} pos={{ left: '50%', bottom: '8%', width: '20%', transform: 'translateX(-50%)' }} alt="The couple before the palace" />
          <Layer src={`${SCENE}/arch-wide.webp`} z={5} f={6} order={4} cover pos={{ inset: 0 }} />
          <Layer src={`${SCENE}/florals-wide.webp`} z={6} f={30} order={5} pos={{ left: '50%', bottom: '0', width: '100%', transform: 'translateX(-50%)' }} />
        </>
      ) : (
        /* ── portrait phone scene ── */
        <>
          <Layer src={`${SCENE}/sky.webp`} z={0} f={6} order={0} cover objPos="center top" pos={{ inset: 0 }} />
          <div className="scene-frame" style={{ zIndex: 2 }}>
            <Layer src={`${SCENE}/palace-far.webp`}   z={1} f={10} order={1} pos={{ left: '50%', bottom: '12%', width: '132%', transform: 'translateX(-50%)' }} />
            <Layer src={`${SCENE}/palace.webp`}        z={2} f={16} order={2} pos={{ left: '50%', bottom: '8%',  width: '78%',  transform: 'translateX(-50%)' }} />
            <Layer src={`${SCENE}/lanterns-sky.webp`}  z={3} f={14} order={3} float pos={{ left: '50%', top: '-3%', width: '100%', transform: 'translateX(-50%)' }} />
            <Layer src={`${SCENE}/couple.webp`}        z={4} f={24} order={4} pos={{ left: '50%', bottom: '7%', width: '34%', transform: 'translateX(-50%)' }} alt="The couple before the palace" />
            <Layer src={`${SCENE}/arch.webp`} z={5} f={8} order={5} cover pos={{ inset: 0 }} />
            <Layer src={`${SCENE}/lantern-hang.webp`} z={6} f={30} order={6} float pos={{ left: '19%', top: '-2%', width: '15%', transform: 'translateX(-50%)' }} />
            <Layer src={`${SCENE}/lantern-hang.webp`} z={6} f={34} order={6} float pos={{ left: '81%', top: '-2%', width: '13%', transform: 'translateX(-50%)' }} />
            <Layer src={`${SCENE}/florals.webp`} z={7} f={40} order={7} pos={{ left: '50%', bottom: '-3%', width: '108%', transform: 'translateX(-50%)' }} />
          </div>
        </>
      )}

      {/* ── couple's names (stylised) ── */}
      <div className="layer-fade" style={{ position: 'absolute', zIndex: 8, left: '50%', top: desktop ? '8%' : '14.5%', transform: 'translateX(-50%)', width: '92%', maxWidth: '660px', textAlign: 'center', pointerEvents: 'none' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: '-45% -18%', zIndex: -1, background: 'radial-gradient(ellipse at center, rgba(8,5,2,0.6) 0%, rgba(8,5,2,0.28) 46%, transparent 72%)' }} />
        <p style={{ color: '#E8D5A3', fontSize: desktop ? '0.8rem' : '0.6rem', textTransform: 'uppercase', letterSpacing: desktop ? '0.34em' : '0.26em', marginBottom: '4px', textShadow: '0 1px 10px rgba(0,0,0,0.85)' }}>The Wedding of</p>
        <h1 style={{ fontFamily: 'var(--font-script)', color: '#F8F1DF', fontWeight: 400, lineHeight: 1.05, margin: 0, whiteSpace: 'nowrap', fontSize: desktop ? 'clamp(3.2rem, 6vw, 5.5rem)' : 'clamp(2rem, 10vw, 2.9rem)', textShadow: '0 2px 22px rgba(0,0,0,0.9), 0 0 34px rgba(201,168,76,0.3)' }}>
          Fahad <span style={{ fontSize: '0.62em', color: '#E8D5A3', verticalAlign: 'middle' }}>&amp;</span> Nadha
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginTop: '6px' }}>
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
          <p style={{ color: '#E8D5A3', fontSize: desktop ? '0.82rem' : '0.7rem', letterSpacing: '0.26em', textShadow: '0 1px 10px rgba(0,0,0,0.85)' }}>26 · 07 · 2026</p>
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
        </div>
      </div>

      {/* cinematic curtain that lifts once everything is loaded */}
      <div className="scene-curtain" aria-hidden="true" />

      {/* entry cue */}
      <button
        type="button"
        onClick={() => setChoosing(true)}
        className="scene-cue"
        style={{
          position: 'absolute', zIndex: 30, left: '50%', bottom: 'calc(env(safe-area-inset-bottom, 0px) + 30px)',
          transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
          padding: '14px 30px', borderRadius: '999px', cursor: 'pointer',
          background: 'rgba(14,10,6,0.62)', border: '1px solid rgba(232,213,163,0.7)',
          color: '#F3E9D2', boxShadow: '0 6px 26px rgba(0,0,0,0.45), 0 0 22px rgba(201,168,76,0.25)',
          backdropFilter: 'blur(3px)',
        }}
      >
        <span style={{ fontSize: '0.84rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.34em' }}>Enter</span>
        <svg className="cue-chev" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F3E9D2" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
      </button>

      {/* choose-your-side overlay */}
      <div
        className={`choose-overlay${choosing ? ' open' : ''}`}
        style={{
          position: 'absolute', inset: 0, zIndex: 40,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '64px 18px', textAlign: 'center',
          background: 'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(9,6,3,0.88), rgba(9,6,3,0.97))',
        }}
        aria-hidden={!choosing}
      >
        <button type="button" onClick={() => setChoosing(false)}
          style={{ position: 'absolute', top: '18px', left: '18px', minHeight: '44px', background: 'none', border: 'none', color: '#C9A84C', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer' }}>
          ← Back
        </button>
        <button type="button" onClick={() => setLang((l) => (l === 'en' ? 'ml' : 'en'))}
          style={{ position: 'absolute', top: '18px', right: '18px', minHeight: '44px', background: 'none', border: '1px solid rgba(201,168,76,0.45)', color: '#C9A84C', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', padding: '8px 14px', cursor: 'pointer' }}>
          {isMl ? 'EN' : 'ML'}
        </button>

        <div className="arabic anim-shimmer" lang="ar" aria-label="Bismillāh ir-Raḥmān ir-Raḥīm" style={{ color: '#E8D5A3', fontSize: 'clamp(1.3rem, 6vw, 2rem)', lineHeight: 1.3, marginBottom: '18px', maxWidth: '100%' }}>﷽</div>
        <p style={{ color: '#E8D5A3', fontSize: isMl ? '0.95rem' : '0.78rem', textTransform: isMl ? 'none' : 'uppercase', letterSpacing: isMl ? '0.04em' : '0.32em', marginBottom: '28px', fontFamily: isMl ? 'var(--font-noto-ml)' : undefined }}>{c.heading}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', justifyContent: 'center' }}>
          <SideCard href={`/bride?lang=${lang}`} title={c.bride.title} arabic="جانب العروس" sub={c.bride.sub} time={c.bride.time} glyph="◯" isMl={isMl} delay={0.15} />
          <SideCard href={`/groom?lang=${lang}`} title={c.groom.title} arabic="جانب العريس" sub={c.groom.sub} time={c.groom.time} glyph="◈" isMl={isMl} delay={0.28} />
        </div>
      </div>
    </main>
  )
}
