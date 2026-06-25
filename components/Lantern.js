'use client'

/**
 * Original gold line-art hanging lantern (fanoos), drawn to match the site's
 * geometric ornament vocabulary (thin #C9A84C strokes, 8-point star window).
 * Not derived from any third-party asset.
 *
 * Props:
 *   size  - width in px (height is ~1.9x). Default 110.
 *   theme - 'light' | 'dark'. Adjusts stroke + glow for the background.
 *   glow  - show the soft pulsing warm glow behind the body. Default true.
 *   style - extra wrapper styles (e.g. positioning).
 */
export default function Lantern({ size = 110, theme = 'light', glow = true, style }) {
  const stroke = theme === 'dark' ? '#E8D5A3' : '#C9A84C'
  const glowColor = theme === 'dark' ? 'rgba(245,201,110,0.60)' : 'rgba(201,168,76,0.38)'
  const w = size
  const h = size * 1.9

  return (
    <div style={{ position: 'relative', width: w, height: h, ...style }}>
      {glow && (
        <div
          className="lantern-glow"
          style={{
            position: 'absolute',
            left: '50%',
            top: '52%',
            width: w * 0.72,
            height: w * 0.72,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            filter: 'blur(7px)',
          }}
        />
      )}
      <svg
        viewBox="0 0 100 190"
        width={w}
        height={h}
        fill="none"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ position: 'relative', opacity: 0.9 }}
      >
        {/* hanger ring + cord */}
        <circle cx="50" cy="7" r="4" />
        <path d="M50 11 L50 22" />
        {/* top finial knob */}
        <circle cx="50" cy="24" r="2.2" fill={stroke} stroke="none" />
        {/* cap dome */}
        <path d="M34 42 Q50 22 66 42" />
        {/* body outline (elongated hexagon) */}
        <path d="M35 42 L65 42 L71 62 L71 132 L65 150 L35 150 L29 132 L29 62 Z" />
        {/* top & bottom bands */}
        <path d="M29 70 L71 70" />
        <path d="M29 124 L71 124" />
        {/* vertical panel lines */}
        <path d="M44 70 L44 124" opacity="0.55" />
        <path d="M56 70 L56 124" opacity="0.55" />
        {/* center 8-point star window (square + diamond) */}
        <path d="M50 82 L65 97 L50 112 L35 97 Z" />
        <path d="M39 86 L61 86 L61 108 L39 108 Z" />
        {/* bottom cap */}
        <path d="M40 150 L60 150 L56 159 L44 159 Z" />
        {/* bottom knob + drop finial */}
        <circle cx="50" cy="164" r="3" />
        <path d="M50 167 L50 174" />
        <circle cx="50" cy="177" r="2.4" fill={stroke} stroke="none" />
      </svg>
    </div>
  )
}
