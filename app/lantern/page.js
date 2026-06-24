/* Demo / judging page — visit /lantern. Not linked from the live site.
   Immersive dark hero: one lantern multiplied across 3 depth planes. */

const GOLD = '#E8D5A3'
const GOLD_DEEP = '#C9A84C'
const MUTED = '#C9A84C'
const INK = '#F3E9D2'

/* depth field: far (small, faint, high, blurred) -> near (big, bottom, crisp).
   img S = tapered small lantern, B = big barrel lantern. */
const S = '/lantern-small.png'
const B = '/lantern-single.png'
const FIELD = [
  // far plane — small tapered lanterns, drifting high and faint
  { img: S, left: 16, bottom: 60, w: 42, op: 0.20, blur: 2.5, sat: 0.62, dur: 9.0,  delay: 0.0, flip: false },
  { img: S, left: 84, bottom: 66, w: 36, op: 0.16, blur: 3.0, sat: 0.60, dur: 10.5, delay: 1.2, flip: true  },
  { img: S, left: 50, bottom: 74, w: 32, op: 0.14, blur: 3.5, sat: 0.55, dur: 11.0, delay: 2.4, flip: false },
  { img: S, left: 31, bottom: 68, w: 38, op: 0.16, blur: 3.0, sat: 0.58, dur: 9.8,  delay: 3.0, flip: true  },
  { img: S, left: 68, bottom: 71, w: 34, op: 0.13, blur: 3.5, sat: 0.55, dur: 12.0, delay: 1.8, flip: false },
  // mid plane — small lanterns, larger and clearer
  { img: S, left: 9,  bottom: 26, w: 90, op: 0.34, blur: 1.0, sat: 0.78, dur: 7.5,  delay: 0.6, flip: false },
  { img: S, left: 91, bottom: 32, w: 80, op: 0.30, blur: 1.3, sat: 0.74, dur: 8.5,  delay: 1.8, flip: true  },
  { img: S, left: 22, bottom: 14, w: 72, op: 0.27, blur: 1.2, sat: 0.75, dur: 8.0,  delay: 2.6, flip: true  },
  // near plane — big barrel lanterns rising from the bottom
  { img: B, left: 34, bottom: -6,  w: 240, op: 0.50, blur: 0.0, sat: 0.92, dur: 6.5, delay: 0.3, flip: false },
  { img: B, left: 70, bottom: -9,  w: 210, op: 0.42, blur: 0.4, sat: 0.86, dur: 7.0, delay: 1.0, flip: true  },
  { img: B, left: 52, bottom: -13, w: 175, op: 0.36, blur: 0.6, sat: 0.80, dur: 7.8, delay: 2.0, flip: false },
]

function Lantern({ l }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${l.left}%`,
        bottom: `${l.bottom}%`,
        width: l.w,
        transform: `translateX(-50%)${l.flip ? ' scaleX(-1)' : ''}`,
        opacity: l.op,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <img
        src={l.img}
        alt=""
        aria-hidden="true"
        className="lantern-drift"
        style={{
          width: '100%',
          display: 'block',
          filter: `saturate(${l.sat}) blur(${l.blur}px)`,
          animationDuration: `${l.dur}s`,
          animationDelay: `${l.delay}s`,
        }}
      />
    </div>
  )
}

function CornerDecor({ style }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" style={{ width: '54px', height: '54px', position: 'absolute', zIndex: 2, ...style }}>
      <path d="M4,4 L56,4 L56,56" stroke={GOLD_DEEP} strokeWidth="1.1" opacity="0.4" />
      <path d="M4,4 L28,28" stroke={GOLD_DEEP} strokeWidth="0.5" opacity="0.25" />
      <circle cx="4" cy="4" r="2.4" fill={GOLD_DEEP} opacity="0.45" />
    </svg>
  )
}

export default function LanternDemo() {
  return (
    <main
      style={{
        minHeight: '100dvh',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#100b06',
        backgroundImage:
          'radial-gradient(ellipse 95% 60% at 50% 112%, rgba(214,138,46,0.18), transparent 60%),' +
          'repeating-linear-gradient(45deg,transparent 0px,transparent 39px,rgba(232,213,163,0.035) 39px,rgba(232,213,163,0.035) 40px),' +
          'repeating-linear-gradient(-45deg,transparent 0px,transparent 39px,rgba(232,213,163,0.035) 39px,rgba(232,213,163,0.035) 40px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 16px',
      }}
    >
      {/* depth field */}
      {FIELD.map((l, i) => <Lantern key={i} l={l} />)}

      {/* scrim — calms the centre so text stays legible over the glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'radial-gradient(ellipse 56% 42% at 50% 45%, rgba(16,11,6,0.82) 0%, rgba(16,11,6,0.45) 46%, transparent 72%)',
        }}
      />

      {/* corner ornaments */}
      <CornerDecor style={{ top: '16px', left: '16px' }} />
      <CornerDecor style={{ top: '16px', right: '16px', transform: 'rotate(90deg)' }} />
      <CornerDecor style={{ bottom: '16px', left: '16px', transform: 'rotate(-90deg)' }} />
      <CornerDecor style={{ bottom: '16px', right: '16px', transform: 'rotate(180deg)' }} />

      {/* content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div className="arabic anim-shimmer" lang="ar" aria-label="Bismillāh ir-Raḥmān ir-Raḥīm" style={{ color: GOLD, fontSize: '3rem', lineHeight: 1.3, marginBottom: '30px' }}>
          ﷽
        </div>

        <p style={{ color: MUTED, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.34em', marginBottom: '16px' }}>
          The Wedding of
        </p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', color: INK, fontSize: 'clamp(2.2rem, 7vw, 3.1rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '14px' }}>
          Fahad P N
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', justifyContent: 'center', marginBottom: '14px' }}>
          <div style={{ width: '60px', height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD_DEEP}, transparent)` }} />
          <span style={{ color: GOLD, fontSize: '1.1rem' }}>✦</span>
          <div style={{ width: '60px', height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD_DEEP}, transparent)` }} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', color: INK, fontSize: 'clamp(2.2rem, 7vw, 3.1rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '22px' }}>
          Nadha Shirin K N
        </h1>
        <p style={{ color: MUTED, fontSize: '0.8rem', letterSpacing: '0.3em' }}>
          26 · July · 2026
        </p>
      </div>
    </main>
  )
}
