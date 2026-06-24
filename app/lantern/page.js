'use client'

import { useEffect, useRef } from 'react'

/* Layered parallax "Mughal palace" scene — visit /lantern.
   Pure atmosphere, no content yet. Leads into choose-your-side later. */

const SCENE = '/scene'

/* A single depth layer. `pos` positions the OUTER wrapper (incl. centering);
   `f` is the parallax strength (px) applied to the inner .scene-layer. */
function Layer({ src, z, f, pos, cover, float, alt = '' }) {
  return (
    <div style={{ position: 'absolute', zIndex: z, pointerEvents: 'none', ...pos }}>
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

export default function ParallaxScene() {
  const rootRef = useRef(null)

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
      // idle: gentle automatic drift when no recent pointer/tilt input
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
      style={{
        position: 'relative',
        height: '100dvh',
        overflow: 'hidden',
        backgroundColor: '#0e0a06',
      }}
    >
      {/* full-bleed sky backdrop */}
      <Layer src={`${SCENE}/sky.webp`} z={0} f={6} cover pos={{ inset: 0 }} />

      {/* framed scene column (arch aspect); covers portrait, portal on desktop */}
      <div className="scene-frame">
        <Layer src={`${SCENE}/palace-far.webp`} z={1} f={10} pos={{ left: '50%', bottom: '12%', width: '132%', transform: 'translateX(-50%)' }} />
        <Layer src={`${SCENE}/palace.webp`}     z={2} f={16} pos={{ left: '50%', bottom: '8%',  width: '78%',  transform: 'translateX(-50%)' }} />
        <Layer src={`${SCENE}/couple.webp`}     z={3} f={24} pos={{ left: '50%', bottom: '9%',  width: '20%',  transform: 'translateX(-50%)' }} alt="The couple before the palace" />
        <Layer src={`${SCENE}/lanterns-sky.webp`} z={4} f={14} float pos={{ left: '50%', top: '-3%', width: '100%', transform: 'translateX(-50%)' }} />

        {/* foreground arch frame */}
        <Layer src={`${SCENE}/arch.webp`} z={5} f={8} cover pos={{ inset: 0 }} />

        {/* hanging lanterns in front of the arch */}
        <Layer src={`${SCENE}/lantern-hang.webp`} z={6} f={30} float pos={{ left: '19%', top: '-2%', width: '15%', transform: 'translateX(-50%)' }} />
        <Layer src={`${SCENE}/lantern-hang.webp`} z={6} f={34} float pos={{ left: '81%', top: '-2%', width: '13%', transform: 'translateX(-50%)' }} />

        {/* foreground florals */}
        <Layer src={`${SCENE}/florals.webp`} z={7} f={40} pos={{ left: '50%', bottom: '-3%', width: '108%', transform: 'translateX(-50%)' }} />
      </div>
    </main>
  )
}
