'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

/* Cream "Mughal palace" themed invitation — visit /lantern.
   Drop your palace+couple artwork at public/hero.png (tall portrait, no text)
   and it fills the lower scene area. Not linked from the live site. */

const GREEN = '#33483a'      // deep green — primary text / names
const GREEN_SOFT = '#5d6b55' // muted green — labels
const GOLD = '#b18a45'       // warm gold — accents / rules
const GOLD_SOFT = '#c9a84c'
const CREAM = '#fbf6ea'
const INK = '#4a4638'

/* ── small inline ornaments ── */
function Rule({ w = 64 }) {
  return <div style={{ width: w, height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
}

function RingsIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke={GOLD} strokeWidth="1.3">
      <circle cx="12" cy="20" r="8" /><circle cx="20" cy="20" r="8" />
      <path d="M16 5l3 4h-6l3-4z" fill={GOLD} stroke="none" />
    </svg>
  )
}
function CameraIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke={GOLD} strokeWidth="1.3">
      <rect x="3" y="9" width="26" height="18" rx="2" /><circle cx="16" cy="18" r="5" />
      <path d="M11 9l2-3h6l2 3" />
    </svg>
  )
}

/* ── hanging lantern (uses cropped PNG on a thin cord) ── */
function HangingLantern({ side, w = 64, top = 70 }) {
  return (
    <div style={{ position: 'absolute', top: 0, [side]: '4%', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none', zIndex: 1 }}>
      <div style={{ width: '1px', height: top, background: `linear-gradient(${GOLD}, rgba(177,138,69,0.2))` }} />
      <img src="/lantern-single.png" alt="" aria-hidden="true" className="lantern-drift" style={{ width: w, display: 'block', filter: 'saturate(0.9)', animationDuration: '6.5s' }} />
    </div>
  )
}

/* ── Mughal cusped arch frame (decorative, behind content) ── */
function ArchFrame() {
  return (
    <svg viewBox="0 0 300 420" preserveAspectRatio="none" aria-hidden="true"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <defs>
        <linearGradient id="archg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={GOLD_SOFT} stopOpacity="0.55" />
          <stop offset="1" stopColor={GOLD_SOFT} stopOpacity="0.12" />
        </linearGradient>
      </defs>
      {/* outer cusped arch */}
      <path fill="none" stroke="url(#archg)" strokeWidth="1.4"
        d="M14,418 L14,150
           Q14,96 40,70 Q60,50 70,78 Q86,40 110,66 Q130,28 150,58
           Q170,28 190,66 Q214,40 230,78 Q240,50 260,70 Q286,96 286,150
           L286,418" />
      {/* inner line */}
      <path fill="none" stroke={GOLD_SOFT} strokeOpacity="0.3" strokeWidth="0.8"
        d="M24,418 L24,152 Q24,104 52,80 Q150,18 248,80 Q276,104 276,152 L276,418" />
      {/* apex finial */}
      <circle cx="150" cy="46" r="3" fill={GOLD_SOFT} opacity="0.7" />
      <path d="M150,40 L150,30" stroke={GOLD_SOFT} strokeWidth="1" opacity="0.6" />
    </svg>
  )
}

/* ── Detail icon block ── */
function EventBlock({ icon, label, time }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '120px' }}>
      {icon}
      <p style={{ color: GREEN_SOFT, fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.22em' }}>{label}</p>
      <p style={{ fontFamily: 'var(--font-cormorant)', color: GREEN, fontSize: '1rem', fontWeight: 500 }}>{time}</p>
    </div>
  )
}

export default function LanternLanding() {
  // default to the placeholder; swap to the artwork only once it actually loads
  const [heroOk, setHeroOk] = useState(false)
  useEffect(() => {
    const img = new window.Image()
    img.onload = () => setHeroOk(true)
    img.src = '/hero.png'
  }, [])

  return (
    <main style={{ minHeight: '100dvh', background: `linear-gradient(180deg, #fcf8ef 0%, #f4ead6 100%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 14px 56px' }}>
      <article style={{ position: 'relative', width: '100%', maxWidth: '600px', background: CREAM, border: `1px solid rgba(177,138,69,0.3)`, boxShadow: '0 18px 60px rgba(120,90,40,0.14)', overflow: 'hidden' }}>
        <ArchFrame />
        <HangingLantern side="left" w={58} top={64} />
        <HangingLantern side="right" w={58} top={86} />

        {/* ── content ── */}
        <div style={{ position: 'relative', zIndex: 2, padding: '46px 28px 0', textAlign: 'center' }}>
          {/* Bismillah */}
          <div className="arabic anim-shimmer" lang="ar" aria-label="Bismillāh ir-Raḥmān ir-Raḥīm"
            style={{ color: GOLD, fontSize: 'clamp(1.4rem, 6.5vw, 2.4rem)', lineHeight: 1.3, marginBottom: '8px', maxWidth: '100%' }}>﷽</div>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', color: GREEN_SOFT, fontSize: '0.84rem', marginBottom: '30px' }}>
            In the Name of Allah, the Most Gracious, the Most Merciful
          </p>

          {/* Together with families */}
          <p style={{ color: GREEN_SOFT, fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '6px' }}>
            Together with their families
          </p>
          <p style={{ fontFamily: 'var(--font-cormorant)', color: GREEN_SOFT, fontSize: '0.9rem', letterSpacing: '0.2em', marginBottom: '10px' }}>we</p>

          {/* Names */}
          <h1 style={{ fontFamily: 'var(--font-script)', color: GREEN, fontSize: 'clamp(3rem, 14vw, 4.6rem)', fontWeight: 400, lineHeight: 1, margin: '0' }}>Nadha</h1>
          <p style={{ fontFamily: 'var(--font-script)', color: GOLD, fontSize: 'clamp(1.4rem, 6vw, 2rem)', margin: '2px 0' }}>and</p>
          <h1 style={{ fontFamily: 'var(--font-script)', color: GREEN, fontSize: 'clamp(3rem, 14vw, 4.6rem)', fontWeight: 400, lineHeight: 1, margin: '0 0 22px' }}>Fahad</h1>

          {/* Invite line */}
          <p style={{ fontFamily: 'var(--font-cormorant)', color: INK, fontSize: '0.96rem', lineHeight: 1.7, maxWidth: '360px', margin: '0 auto 22px' }}>
            invite you to join us as we celebrate the beginning of our new life together
          </p>

          <p style={{ color: GOLD, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.34em', marginBottom: '22px' }}>In Sha&apos; Allah</p>

          {/* Date block */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', marginBottom: '8px' }}>
            <Rule w={48} />
            <p style={{ fontFamily: 'var(--font-cormorant)', color: GREEN, fontSize: '0.7rem', letterSpacing: '0.18em' }}>26<sup>TH</sup></p>
            <Rule w={48} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '6px' }}>
            <p style={{ fontFamily: 'var(--font-cormorant)', color: GREEN, fontSize: '1.05rem', letterSpacing: '0.16em' }}>SUNDAY</p>
            <span style={{ color: GOLD }}>·</span>
            <p style={{ fontFamily: 'var(--font-cormorant)', color: GREEN, fontSize: '1.05rem', letterSpacing: '0.16em' }}>JULY</p>
            <span style={{ color: GOLD }}>·</span>
            <p style={{ fontFamily: 'var(--font-cormorant)', color: GREEN, fontSize: '1.05rem', letterSpacing: '0.16em' }}>2026</p>
          </div>
          <p style={{ color: GREEN_SOFT, fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '20px' }}>( 11 Safar, 1448 AH )</p>

          {/* Venue */}
          <p style={{ fontFamily: 'var(--font-cormorant)', color: GREEN, fontSize: '0.95rem', letterSpacing: '0.08em', lineHeight: 1.5, marginBottom: '26px' }}>
            COSMOPOLITAN CONVENTION CENTER,<br />ERIYAD, KODUNGALLUR
          </p>

          {/* Events */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '26px' }}>
            <EventBlock icon={<RingsIcon />} label="Nikah" time="11:30 AM" />
            <div style={{ width: '1px', background: 'rgba(177,138,69,0.3)' }} />
            <EventBlock icon={<CameraIcon />} label="Reception" time="07:00 PM" />
          </div>

          <p style={{ color: GREEN_SOFT, fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.24em', marginBottom: '8px' }}>RSVP by 10th July 2026</p>
        </div>

        {/* ── hero scene (your artwork) ── */}
        <div style={{ position: 'relative', zIndex: 2, marginTop: '20px', height: 'clamp(220px, 52vw, 320px)' }}>
          {heroOk ? (
            <img src="/hero.png" alt="The couple before the palace" onError={() => setHeroOk(false)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center bottom', display: 'block' }} />
          ) : (
            /* placeholder until your art arrives */
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', background: 'linear-gradient(180deg, transparent, rgba(177,138,69,0.08))', paddingBottom: '22px' }}>
              <svg width="220" height="90" viewBox="0 0 220 90" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.5" aria-hidden="true">
                <path d="M10,90 L10,55 Q10,40 22,40 Q22,28 34,40 Q34,55 34,90" />
                <path d="M60,90 L60,40 Q60,18 78,18 Q78,2 86,18 Q96,18 96,40 L96,90" />
                <path d="M120,90 L120,40 Q120,18 138,18 Q138,2 146,18 Q156,18 156,40 L156,90" />
                <path d="M186,90 L186,55 Q186,40 198,40 Q198,28 210,40 Q210,55 210,90" />
              </svg>
              <p style={{ color: GREEN_SOFT, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Palace artwork → public/hero.png</p>
            </div>
          )}
        </div>
      </article>

      {/* ── Choose your side (themed) ── */}
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <p style={{ color: GREEN_SOFT, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '18px' }}>Please choose your side</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
          <Link href="/bride" className="map-btn" style={{ minWidth: '160px', padding: '14px 26px', border: `1px solid ${GOLD}`, color: GREEN, fontFamily: 'var(--font-cormorant)', fontSize: '0.95rem', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', background: CREAM }}>
            Bride&apos;s Side
          </Link>
          <Link href="/groom" className="map-btn" style={{ minWidth: '160px', padding: '14px 26px', border: `1px solid ${GOLD}`, color: GREEN, fontFamily: 'var(--font-cormorant)', fontSize: '0.95rem', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', background: CREAM }}>
            Groom&apos;s Side
          </Link>
        </div>
      </div>
    </main>
  )
}
