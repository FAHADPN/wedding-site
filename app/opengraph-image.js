import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt    = 'Fahad & Nadha — Wedding Invitation · 26 July 2026'
export const size   = { width: 1200, height: 630 }
export const contentType = 'image/png'

/* Load Cormorant Garamond Light from Google Fonts (old UA → returns woff for Satori) */
async function loadFont() {
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300',
      { headers: { 'User-Agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)' } }
    ).then(r => r.text())

    const url = css.match(/url\((.+?)\)/)?.[1]
    if (!url) return null
    return fetch(url).then(r => r.arrayBuffer())
  } catch {
    return null
  }
}

export default async function Image() {
  const fontData = await loadFont()

  const fonts = fontData
    ? [
        { name: 'Cormorant', data: fontData, weight: 300, style: 'normal'  },
        { name: 'Cormorant', data: fontData, weight: 300, style: 'italic'  },
      ]
    : []

  const serif = fontData ? 'Cormorant' : 'Georgia, serif'

  /* ── Reusable styles ──────────────────────────────────────────── */
  const gold        = '#C9A84C'
  const goldMuted   = '#9B7B3A'
  const ivory       = '#FDFAF2'
  const textDark    = '#2C1810'

  const corner = (pos) => ({
    position: 'absolute',
    width: '56px',
    height: '56px',
    ...pos,
    borderColor: 'rgba(201,168,76,0.5)',
  })

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          backgroundColor: ivory,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontFamily: serif,
        }}
      >
        {/* Outer frame */}
        <div style={{
          position: 'absolute',
          inset: '16px',
          border: '0.75px solid rgba(201,168,76,0.28)',
          display: 'flex',
        }} />

        {/* Corner brackets */}
        <div style={{ ...corner({ top: '28px', left: '28px' }), borderTop: '1.5px solid rgba(201,168,76,0.55)', borderLeft: '1.5px solid rgba(201,168,76,0.55)' }} />
        <div style={{ ...corner({ top: '28px', right: '28px' }), borderTop: '1.5px solid rgba(201,168,76,0.55)', borderRight: '1.5px solid rgba(201,168,76,0.55)' }} />
        <div style={{ ...corner({ bottom: '28px', left: '28px' }), borderBottom: '1.5px solid rgba(201,168,76,0.55)', borderLeft: '1.5px solid rgba(201,168,76,0.55)' }} />
        <div style={{ ...corner({ bottom: '28px', right: '28px' }), borderBottom: '1.5px solid rgba(201,168,76,0.55)', borderRight: '1.5px solid rgba(201,168,76,0.55)' }} />

        {/* Main content column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>

          {/* Islamic star ornament (unicode) */}
          <div style={{ fontSize: '22px', color: gold, marginBottom: '18px', letterSpacing: '12px' }}>
            ✦ ✦ ✦
          </div>

          {/* Top divider */}
          <div style={{ width: '280px', height: '1px', background: `linear-gradient(90deg, transparent, ${gold}, transparent)`, marginBottom: '28px' }} />

          {/* F & N monogram */}
          <div style={{
            fontFamily: serif,
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '108px',
            color: gold,
            lineHeight: 1,
            letterSpacing: '6px',
            marginBottom: '28px',
          }}>
            F &amp; N
          </div>

          {/* Mid divider */}
          <div style={{ width: '400px', height: '1px', background: `linear-gradient(90deg, transparent, ${gold}, transparent)`, marginBottom: '28px' }} />

          {/* Names */}
          <div style={{
            fontFamily: serif,
            fontStyle: 'normal',
            fontWeight: 300,
            fontSize: '30px',
            color: textDark,
            letterSpacing: '3px',
            marginBottom: '6px',
          }}>
            Fahad P N
          </div>
          <div style={{ fontSize: '18px', color: gold, marginBottom: '6px' }}>✦</div>
          <div style={{
            fontFamily: serif,
            fontStyle: 'normal',
            fontWeight: 300,
            fontSize: '30px',
            color: textDark,
            letterSpacing: '3px',
            marginBottom: '28px',
          }}>
            Nadha Shirin K N
          </div>

          {/* Bottom divider */}
          <div style={{ width: '280px', height: '1px', background: `linear-gradient(90deg, transparent, ${gold}, transparent)`, marginBottom: '22px' }} />

          {/* Date */}
          <div style={{
            fontSize: '16px',
            color: goldMuted,
            letterSpacing: '7px',
            textTransform: 'uppercase',
          }}>
            26 · JULY · 2026
          </div>
        </div>

        {/* Bottom tagline */}
        <div style={{
          position: 'absolute',
          bottom: '36px',
          fontSize: '11px',
          color: goldMuted,
          letterSpacing: '5px',
          textTransform: 'uppercase',
        }}>
          YOU ARE CORDIALLY INVITED
        </div>
      </div>
    ),
    { ...size, fonts }
  )
}
