'use client'

import { useState } from 'react'
import Link from 'next/link'

/* ─── Landing translations ──────────────────────────────────────── */
const T = {
  en: {
    weddingOf: 'The Wedding of',
    date: '26 · July · 2026',
    chooseSide: 'Please choose your side',
    bride: { title: "Bride's Side", subtitle: 'Nikkah Ceremony', time: '11:30 AM', arabic: 'جانب العروس' },
    groom: { title: "Groom's Side", subtitle: 'Wedding Reception', time: '7:00 PM', arabic: 'جانب العريس' },
  },
  ml: {
    weddingOf: 'വിവാഹ ക്ഷണം',
    date: '2026 ജൂലൈ 26',
    chooseSide: 'നിങ്ങളുടെ ഭാഗം തിരഞ്ഞെടുക്കുക',
    bride: { title: 'വധൂ ഭാഗം', subtitle: 'നിക്കാഹ് ചടങ്ങ്', time: 'രാവിലെ 11:30', arabic: 'جانب العروس' },
    groom: { title: 'വരൻ ഭാഗം', subtitle: 'വിവാഹ റിസപ്ഷൻ', time: 'വൈകിട്ട് 7:00', arabic: 'جانب العريس' },
  },
}

/* ─── Double-Ring Monogram ──────────────────────────────────────── */
function MonogramSVG() {
  return (
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Outer dashed ring */}
      <circle cx="150" cy="150" r="138" fill="none" stroke="#C9A84C" strokeWidth="0.7" strokeDasharray="4 9" opacity="0.45" />
      {/* Outer solid ring */}
      <circle cx="150" cy="150" r="124" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.6" />
      {/* Inner ring — close to outer, creating a double-band border */}
      <circle cx="150" cy="150" r="112" fill="rgba(253,250,242,0.92)" stroke="#C9A84C" strokeWidth="0.8" opacity="0.55" />
    </svg>
  )
}

/* ─── F & N diagonal monogram (shared by picker + landing) ──────── */
function Monogram({ size = 220, spin = true }) {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* Slowly rotating outermost ring */}
      <div className={spin ? 'anim-slow-spin' : undefined} style={{ position: 'absolute', inset: 0 }}>
        <svg viewBox="0 0 300 300" style={{ width: '100%', height: '100%' }}>
          <circle cx="150" cy="150" r="146" fill="none" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.3" />
        </svg>
      </div>
      {/* Static star frame */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <MonogramSVG />
      </div>
      {/* F & N — diagonal monogram */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: size * 0.46, height: size * 0.46, userSelect: 'none' }}>
          <span style={{ position: 'absolute', top: 0, left: 0, fontFamily: 'var(--font-lavishly)', color: '#C9A84C', fontSize: size * 0.016 + 'rem', fontWeight: 400, lineHeight: 1 }}>F</span>
          <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -42%)', fontFamily: 'var(--font-lavishly)', color: '#C9A84C', fontSize: size * 0.0095 + 'rem', fontWeight: 400, lineHeight: 1, opacity: 0.88 }}>&amp;</span>
          <span style={{ position: 'absolute', bottom: 0, right: 0, fontFamily: 'var(--font-lavishly)', color: '#C9A84C', fontSize: size * 0.016 + 'rem', fontWeight: 400, lineHeight: 1 }}>N</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Corner Ornament ──────────────────────────────────────────── */
function CornerDecor({ style }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" style={{ width: '56px', height: '56px', ...style }}>
      <path d="M4,4 L56,4 L56,56" stroke="#C9A84C" strokeWidth="1.2" opacity="0.45" />
      <path d="M4,4 L30,30" stroke="#C9A84C" strokeWidth="0.5" opacity="0.28" />
      <path d="M18,4 L4,18" stroke="#C9A84C" strokeWidth="0.5" opacity="0.2" />
      <path d="M36,4 L4,36" stroke="#C9A84C" strokeWidth="0.5" opacity="0.15" />
      <circle cx="4" cy="4" r="2.5" fill="#C9A84C" opacity="0.5" />
      <circle cx="30" cy="30" r="1.5" fill="#C9A84C" opacity="0.32" />
    </svg>
  )
}

/* ─── Side Selection Card ──────────────────────────────────────── */
function SideCard({ title, arabicText, subtitle, time, side, isMl }) {
  const isBride = side === 'bride'
  return (
    <div
      className="side-card"
      style={{
        width: '224px',
        padding: '36px 28px',
        border: '1px solid rgba(201,168,76,0.32)',
        backgroundColor: isBride ? 'rgba(255,251,247,0.96)' : 'rgba(254,249,238,0.96)',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {/* Corner marks */}
      {[
        { top: '8px', left: '8px', borderTop: '1px solid rgba(201,168,76,0.42)', borderLeft: '1px solid rgba(201,168,76,0.42)' },
        { top: '8px', right: '8px', borderTop: '1px solid rgba(201,168,76,0.42)', borderRight: '1px solid rgba(201,168,76,0.42)' },
        { bottom: '8px', left: '8px', borderBottom: '1px solid rgba(201,168,76,0.42)', borderLeft: '1px solid rgba(201,168,76,0.42)' },
        { bottom: '8px', right: '8px', borderBottom: '1px solid rgba(201,168,76,0.42)', borderRight: '1px solid rgba(201,168,76,0.42)' },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', width: '16px', height: '16px', ...s }} />
      ))}

      <div style={{ textAlign: 'center' }}>
        {/* Arabic icon glyph */}
        <div style={{ fontFamily: 'var(--font-amiri)', color: '#C9A84C', fontSize: '1.6rem', marginBottom: '8px', direction: 'rtl' }}>
          {isBride ? '◯' : '◈'}
        </div>
        {/* Arabic label */}
        <div className="arabic" style={{ color: '#9B7B3A', fontSize: '1rem', marginBottom: '12px' }}>
          {arabicText}
        </div>
        {/* Divider */}
        <div className="divider" style={{ margin: '0 0 12px' }} />
        {/* Title */}
        <h2 style={{ fontFamily: isMl ? 'var(--font-noto-ml)' : 'var(--font-cormorant)', color: '#2C1810', fontSize: isMl ? '1.1rem' : '1.25rem', fontWeight: 500, marginBottom: '6px' }}>
          {title}
        </h2>
        <p style={{ color: '#9B7B3A', fontSize: '0.72rem', textTransform: isMl ? 'none' : 'uppercase', letterSpacing: isMl ? '0.04em' : '0.18em', marginBottom: '8px', fontFamily: isMl ? 'var(--font-noto-ml)' : undefined }}>
          {subtitle}
        </p>
        <p style={{ fontFamily: isMl ? 'var(--font-noto-ml)' : 'var(--font-cormorant)', color: '#C9A84C', fontSize: '1rem', fontStyle: isMl ? 'normal' : 'italic' }}>
          {time}
        </p>
      </div>
    </div>
  )
}

/* ─── Language Picker — first screen ───────────────────────────── */
function LanguagePicker({ onSelect }) {
  return (
    <div
      className="islamic-bg"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '64px 16px',
      }}
    >
      <CornerDecor style={{ position: 'absolute', top: '16px', left: '16px' }} />
      <CornerDecor style={{ position: 'absolute', top: '16px', right: '16px', transform: 'rotate(90deg)' }} />
      <CornerDecor style={{ position: 'absolute', bottom: '16px', left: '16px', transform: 'rotate(-90deg)' }} />
      <CornerDecor style={{ position: 'absolute', bottom: '16px', right: '16px', transform: 'rotate(180deg)' }} />

      {/* Bismillah */}
      <div
        className="arabic anim-fade-in anim-shimmer"
        lang="ar"
        aria-label="Bismillāh ir-Raḥmān ir-Raḥīm"
        style={{ animationDelay: '0.1s', color: '#C9A84C', fontSize: 'clamp(1.5rem, 7vw, 3rem)', lineHeight: 1.3, marginBottom: '24px', textAlign: 'center', maxWidth: '100%' }}
      >
        ﷽
      </div>

      {/* Monogram */}
      <div className="anim-scale-in" style={{ marginBottom: '32px', animationDelay: '0.3s' }}>
        <Monogram size={200} />
      </div>

      {/* Prompt */}
      <div className="anim-fade-in-up" style={{ animationDelay: '0.6s', textAlign: 'center', width: '100%', maxWidth: '300px' }}>
        <p style={{ color: '#9B7B3A', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.28em', marginBottom: '4px' }}>
          Select Language
        </p>
        <p style={{ color: '#9B7B3A', fontSize: '0.85rem', fontFamily: 'var(--font-noto-ml)', marginBottom: '24px' }}>
          ഭാഷ തിരഞ്ഞെടുക്കുക
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <button
            onClick={() => onSelect('en')}
            className="map-btn"
            style={{
              minHeight: '52px',
              border: '1px solid #C9A84C',
              background: 'rgba(255,255,255,0.5)',
              color: '#9B7B3A',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-cormorant)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            English
          </button>
          <button
            onClick={() => onSelect('ml')}
            className="map-btn"
            style={{
              minHeight: '52px',
              border: '1px solid #C9A84C',
              background: 'rgba(255,255,255,0.5)',
              color: '#9B7B3A',
              fontSize: '1.1rem',
              fontFamily: 'var(--font-noto-ml)',
              cursor: 'pointer',
            }}
          >
            മലയാളം
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Localized Landing ────────────────────────────────────────── */
function Landing({ lang }) {
  const t = T[lang]
  const isMl = lang === 'ml'
  return (
    <div
      className="islamic-bg"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '64px 16px',
      }}
    >
      {/* Corner ornaments */}
      <CornerDecor style={{ position: 'absolute', top: '16px', left: '16px' }} />
      <CornerDecor style={{ position: 'absolute', top: '16px', right: '16px', transform: 'rotate(90deg)' }} />
      <CornerDecor style={{ position: 'absolute', bottom: '16px', left: '16px', transform: 'rotate(-90deg)' }} />
      <CornerDecor style={{ position: 'absolute', bottom: '16px', right: '16px', transform: 'rotate(180deg)' }} />

      {/* Bismillah */}
      <div
        className="arabic anim-fade-in anim-shimmer"
        lang="ar"
        aria-label="Bismillāh ir-Raḥmān ir-Raḥīm"
        style={{ animationDelay: '0.1s', color: '#C9A84C', fontSize: 'clamp(1.6rem, 7.5vw, 3.2rem)', lineHeight: 1.3, marginBottom: '28px', textAlign: 'center', maxWidth: '100%' }}
      >
        ﷽
      </div>

      {/* Monogram Frame */}
      <div className="anim-scale-in" style={{ marginBottom: '28px', animationDelay: '0.3s' }}>
        <Monogram size={260} />
      </div>

      {/* Names + Date */}
      <div className="anim-fade-in-up" style={{ textAlign: 'center', animationDelay: '0.7s', marginBottom: '40px' }}>
        <p style={{ color: '#9B7B3A', fontSize: isMl ? '0.82rem' : '0.72rem', textTransform: isMl ? 'none' : 'uppercase', letterSpacing: isMl ? '0.04em' : '0.32em', marginBottom: '10px', fontFamily: isMl ? 'var(--font-noto-ml)' : undefined }}>
          {t.weddingOf}
        </p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', color: '#2C1810', fontSize: '2.4rem', fontWeight: 300, lineHeight: 1.1, marginBottom: '14px' }}>
          Fahad P N
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', justifyContent: 'center', marginBottom: '14px' }}>
          <div className="divider" style={{ width: '64px' }} />
          <span style={{ color: '#C9A84C', fontSize: '1.1rem' }}>✦</span>
          <div className="divider" style={{ width: '64px' }} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', color: '#2C1810', fontSize: '2.4rem', fontWeight: 300, lineHeight: 1.1, marginBottom: '14px' }}>
          Nadha Shirin K N
        </h1>
        <p style={{ color: '#9B7B3A', fontSize: isMl ? '0.85rem' : '0.72rem', letterSpacing: isMl ? '0.04em' : '0.28em', fontFamily: isMl ? 'var(--font-noto-ml)' : undefined }}>
          {t.date}
        </p>
      </div>

      {/* Choose Your Side */}
      <div className="anim-fade-in-up" style={{ animationDelay: '1.1s', textAlign: 'center' }}>
        <p style={{ color: '#9B7B3A', fontSize: isMl ? '0.82rem' : '0.72rem', textTransform: isMl ? 'none' : 'uppercase', letterSpacing: isMl ? '0.04em' : '0.32em', marginBottom: '24px', fontFamily: isMl ? 'var(--font-noto-ml)' : undefined }}>
          {t.chooseSide}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          <Link href={`/bride?lang=${lang}`} style={{ textDecoration: 'none' }}>
            <SideCard title={t.bride.title} arabicText={t.bride.arabic} subtitle={t.bride.subtitle} time={t.bride.time} side="bride" isMl={isMl} />
          </Link>
          <Link href={`/groom?lang=${lang}`} style={{ textDecoration: 'none' }}>
            <SideCard title={t.groom.title} arabicText={t.groom.arabic} subtitle={t.groom.subtitle} time={t.groom.time} side="groom" isMl={isMl} />
          </Link>
        </div>
      </div>

      {/* Footer date in Arabic */}
      <div className="anim-fade-in" style={{ position: 'absolute', bottom: '20px', textAlign: 'center', animationDelay: '1.5s' }}>
        <div className="divider" style={{ width: '72px', margin: '0 auto 8px' }} />
        <p className="arabic" style={{ color: '#C9A84C', fontSize: '0.75rem', opacity: 0.55 }}>
          ٢٦ يوليو ٢٠٢٦
        </p>
      </div>
    </div>
  )
}

/* ─── Page ─────────────────────────────────────────────────────── */
export default function LandingPage() {
  const [lang, setLang] = useState(null)

  if (!lang) return <LanguagePicker onSelect={setLang} />
  return <Landing lang={lang} />
}
