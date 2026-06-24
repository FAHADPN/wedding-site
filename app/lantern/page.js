'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/* Layered parallax "Mughal palace" scene — visit /lantern.
   Pure atmosphere, no content yet. Leads into choose-your-side later. */

const SCENE = '/scene'

const SRCS = [
  'sky.webp', 'palace-far.webp', 'palace.webp', 'lanterns-sky.webp',
  'couple.webp', 'arch.webp', 'lantern-hang.webp', 'florals.webp',
]

/* A single depth layer. `pos` positions the OUTER wrapper (incl. centering);
   `f` is the parallax strength (px); `order` staggers the entrance fade. */
function Layer({ src, z, f, order, pos, cover, float, alt = '' }) {
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
            objectPosition: 'center bottom',
            display: 'block',
            animationDuration: float ? '6.5s' : undefined,
          }}
        />
      </div>
    </div>
  )
}

/* ── Choose-your-side card ── */
function SideCard({ href, title, arabic, sub, time, glyph, delay }) {
  return (
    <Link href={href} className="choose-card" style={{
      width: 'min(230px, 80vw)', padding: '30px 26px', textDecoration: 'none',
      border: '1px solid rgba(201,168,76,0.45)', background: 'rgba(24,17,10,0.66)',
      backdropFilter: 'blur(3px)', position: 'relative', transitionDelay: `${delay}s`,
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#E8D5A3', fontSize: '1.4rem', marginBottom: '8px' }}>{glyph}</div>
        <div className="arabic" style={{ color: '#E8D5A3', fontSize: '1rem', marginBottom: '10px' }}>{arabic}</div>
        <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin: '0 0 12px' }} />
        <h3 style={{ fontFamily: 'var(--font-cormorant)', color: '#F3E9D2', fontSize: '1.25rem', fontWeight: 500, marginBottom: '6px' }}>{title}</h3>
        <p style={{ color: '#C9A84C', fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>{sub}</p>
        <p style={{ fontFamily: 'var(--font-cormorant)', color: '#E8D5A3', fontSize: '1rem', fontStyle: 'italic' }}>{time}</p>
      </div>
    </Link>
  )
}

export default function ParallaxScene() {
  const rootRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [choosing, setChoosing] = useState(false)

  /* preload every layer, then trigger the staggered entrance */
  useEffect(() => {
    let done = false
    const finish = () => { if (!done) { done = true; setReady(true) } }
    let left = SRCS.length
    SRCS.forEach((s) => {
      const img = new window.Image()
      const tick = () => { if (--left <= 0) finish() }
      img.onload = tick
      img.onerror = tick
      img.src = `${SCENE}/${s}`
    })
    const fallback = setTimeout(finish, 4000) // never hang
    return () => clearTimeout(fallback)
  }, [])

  /* parallax: pointer + device-tilt + idle drift */
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let px = 0, py = 0, tx = 0, ty = 0, lastPointer = -9999, raf = 0
    const onMove = (cx, cy, t) => {
      tx = (cx / window.innerWidth - 0.5) * 2
      ty = (cy / window.innerHeight - 0.5) * 2
      lastPointer = t
    }
    const onMouse = (e) => onMove(e.clientX, e.clientY, performance.now())
    const onTouch = (e) => { if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY, performance.now()) }
    const onOrient = (e) => {
      if (e.gamma == null) return
      tx = Math.max(-1, Math.min(1, e.gamma / 28))
      ty = Math.max(-1, Math.min(1, ((e.beta || 45) - 45) / 28))
      lastPointer = performance.now()
    }
    const loop = (t) => {
      if (t - lastPointer > 1800) {
        tx = Math.sin(t / 4200) * 0.55
        ty = Math.cos(t / 5600) * 0.32
      }
      px += (tx - px) * 0.05
      py += (ty - py) * 0.05
      root.style.setProperty('--mx', px.toFixed(4))
      root.style.setProperty('--my', py.toFixed(4))
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('deviceorientation', onOrient)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('deviceorientation', onOrient)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <main
      ref={rootRef}
      className={`scene-root${ready ? ' ready' : ''}${choosing ? ' choosing' : ''}`}
      style={{ position: 'relative', height: '100dvh', overflow: 'hidden', backgroundColor: '#0e0a06' }}
    >
      {/* full-bleed sky backdrop */}
      <Layer src={`${SCENE}/sky.webp`} z={0} f={6} order={0} cover pos={{ inset: 0 }} />

      {/* framed scene column (arch aspect); covers portrait, portal on desktop */}
      <div className="scene-frame">
        <Layer src={`${SCENE}/palace-far.webp`}   z={1} f={10} order={1} pos={{ left: '50%', bottom: '12%', width: '132%', transform: 'translateX(-50%)' }} />
        <Layer src={`${SCENE}/palace.webp`}        z={2} f={16} order={2} pos={{ left: '50%', bottom: '8%',  width: '78%',  transform: 'translateX(-50%)' }} />
        {/* floating lanterns sit BEHIND the couple now */}
        <Layer src={`${SCENE}/lanterns-sky.webp`}  z={3} f={14} order={3} float pos={{ left: '50%', top: '-3%', width: '100%', transform: 'translateX(-50%)' }} />
        <Layer src={`${SCENE}/couple.webp`}        z={4} f={24} order={4} pos={{ left: '50%', bottom: '8%', width: '24%', transform: 'translateX(-50%)' }} alt="The couple before the palace" />

        {/* foreground arch frame */}
        <Layer src={`${SCENE}/arch.webp`} z={5} f={8} order={5} cover pos={{ inset: 0 }} />

        {/* hanging lanterns in front of the arch */}
        <Layer src={`${SCENE}/lantern-hang.webp`} z={6} f={30} order={6} float pos={{ left: '19%', top: '-2%', width: '15%', transform: 'translateX(-50%)' }} />
        <Layer src={`${SCENE}/lantern-hang.webp`} z={6} f={34} order={6} float pos={{ left: '81%', top: '-2%', width: '13%', transform: 'translateX(-50%)' }} />

        {/* foreground florals */}
        <Layer src={`${SCENE}/florals.webp`} z={7} f={40} order={7} pos={{ left: '50%', bottom: '-3%', width: '108%', transform: 'translateX(-50%)' }} />
      </div>

      {/* cinematic curtain that lifts once everything is loaded */}
      <div className="scene-curtain" aria-hidden="true" />

      {/* entry cue */}
      <button
        type="button"
        onClick={() => setChoosing(true)}
        className="scene-cue"
        style={{
          position: 'absolute', zIndex: 30, left: '50%', bottom: 'calc(env(safe-area-inset-bottom, 0px) + 26px)',
          transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          background: 'none', border: 'none', cursor: 'pointer', color: '#E8D5A3',
        }}
      >
        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.34em', textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>Enter</span>
        <svg className="cue-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8D5A3" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 1px 6px rgba(0,0,0,0.6))' }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* choose-your-side overlay */}
      <div
        className={`choose-overlay${choosing ? ' open' : ''}`}
        style={{
          position: 'absolute', inset: 0, zIndex: 40,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '64px 18px', textAlign: 'center',
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(14,10,6,0.74), rgba(14,10,6,0.9))',
        }}
        aria-hidden={!choosing}
      >
        <button
          type="button"
          onClick={() => setChoosing(false)}
          style={{ position: 'absolute', top: '20px', left: '20px', background: 'none', border: 'none', color: '#C9A84C', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer' }}
        >
          ← Back
        </button>

        <div className="arabic anim-shimmer" lang="ar" aria-label="Bismillāh ir-Raḥmān ir-Raḥīm" style={{ color: '#E8D5A3', fontSize: 'clamp(1.3rem, 6vw, 2rem)', lineHeight: 1.3, marginBottom: '18px', maxWidth: '100%' }}>﷽</div>
        <p style={{ color: '#C9A84C', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.32em', marginBottom: '28px' }}>Please choose your side</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', justifyContent: 'center' }}>
          <SideCard href="/bride" title="Bride's Side" arabic="جانب العروس" sub="Nikkah Ceremony" time="11:30 AM" glyph="◯" delay={0.15} />
          <SideCard href="/groom" title="Groom's Side" arabic="جانب العريس" sub="Wedding Reception" time="07:00 PM" glyph="◈" delay={0.28} />
        </div>
      </div>
    </main>
  )
}
