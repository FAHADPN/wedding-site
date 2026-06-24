'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Countdown = dynamic(() => import('../../components/Countdown'), { ssr: false })
const Rsvp = dynamic(() => import('../../components/Rsvp'), { ssr: false })

/* ─── Translations ─────────────────────────────────────────────── */
const TRANSLATIONS = {
  en: {
    back: '← Back',
    lang: 'ML',
    bismillah_sub: 'In the name of Allah, the Most Gracious, the Most Merciful',
    invitation_prefix: 'With the blessings of Allah ﷻ',
    invitation_body: 'We joyfully invite you to celebrate the',
    event_name: 'Nikkah Ceremony',
    groom_name: 'Fahad P N',
    bride_name: 'Nadha Shirin K N',
    quran_en:
      'And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought.',
    quran_ref: 'Surah Ar-Rum · 30:21',
    date_label: 'Date',
    date_val: '26th July 2026',
    time_label: 'Time',
    time_val: '11:30 AM',
    venue_label: 'Venue',
    venue_val: 'Cosmopolitan Convention Center',
    map_btn: 'View on Google Maps',
    side_label: "Bride's Side · نكاح",
    countdown_label: 'Until the Nikkah',
    days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds',
    dua_arabic: 'بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    dua_en:
      'May Allah bless you and shower His blessings upon you, and may He unite you both in goodness.',
    footer: 'May Allah bless this union with love, harmony, and endless barakah.',
  },
  ml: {
    back: '← മടങ്ങുക',
    lang: 'EN',
    bismillah_sub: 'പരമകാരുണികനും കരുണാനിധിയുമായ അല്ലാഹുവിന്റെ നാമത്തിൽ',
    invitation_prefix: 'അല്ലാഹുവിന്റെ ﷻ അനുഗ്രഹത്തോടെ',
    invitation_body: 'ഞങ്ങൾ സന്തോഷത്തോടെ നിങ്ങളെ ക്ഷണിക്കുന്നു',
    event_name: 'നിക്കാഹ് ചടങ്ങ്',
    groom_name: 'Fahad P N',
    bride_name: 'Nadha Shirin K N',
    quran_en:
      'അവന്റെ ദൃഷ്ടാന്തങ്ങളിൽ പെട്ടതത്രേ, നിങ്ങൾ അവരോടൊത്ത് ശാന്തി കണ്ടെത്തുന്നതിന് നിങ്ങളിൽ നിന്ന് തന്നെ ഇണകളെ അവൻ സൃഷ്ടിച്ചതും, നിങ്ങൾക്കിടയിൽ സ്നേഹവും കരുണയും ഉണ്ടാക്കിയതും. ചിന്തിക്കുന്ന ജനങ്ങൾക്ക് ഇതിൽ ദൃഷ്ടാന്തങ്ങൾ ഉണ്ട്.',
    quran_ref: 'സൂറഃ അർ-റൂം · 30:21',
    date_label: 'തീയതി',
    date_val: '2026 ജൂലൈ 26',
    time_label: 'സമയം',
    time_val: 'രാവിലെ 11:30',
    venue_label: 'വേദി',
    venue_val: 'കോസ്‌മോപൊളിറ്റൻ കൺവൻഷൻ സെന്റർ',
    map_btn: 'ഗൂഗിൾ മാപ്പിൽ കാണുക',
    side_label: "വധൂ ഭാഗം · نكاح",
    countdown_label: 'നിക്കാഹ് വരെ',
    days: 'ദിവസം', hours: 'മണിക്കൂർ', minutes: 'മിനിറ്റ്', seconds: 'സെക്കൻഡ്',
    dua_arabic: 'بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    dua_en:
      'അല്ലാഹു നിങ്ങളെ അനുഗ്രഹിക്കട്ടെ, നിങ്ങൾക്ക് അനുഗ്രഹം ചൊരിയട്ടെ, ഇരുവരെയും നന്മയിൽ ഒന്നിപ്പിക്കട്ടെ.',
    footer: 'ഈ ബന്ധം അല്ലാഹു സ്നേഹം, ഐകാര്യം, ബറകത്ത് കൊണ്ട് അനുഗ്രഹിക്കട്ടെ.',
  },
}

const MAPS_URL   = 'https://maps.google.com/?q=10.224285129343906,76.16810837753256'
const NIKKAH_DATE = '2026-07-26T11:30:00+05:30'

/* ─── Sub-components ───────────────────────────────────────────── */
function IslamicOrnament() {
  return (
    <svg viewBox="0 0 80 40" fill="none" style={{ width: '80px', height: '40px' }}>
      <polygon
        points="40,4 50,18 66,14 58,28 66,42 50,38 40,52 30,38 14,42 22,28 14,14 30,18"
        stroke="#C9A84C" strokeWidth="0.9" fill="none" opacity="0.65"
      />
      <circle cx="40" cy="22" r="3.5" fill="#C9A84C" opacity="0.5" />
    </svg>
  )
}

function DetailRow({ icon, label, value, isMl }) {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <span style={{ color: '#C9A84C', fontSize: '1.1rem', marginTop: '2px', flexShrink: 0 }}>{icon}</span>
      <div>
        <p style={{
          color: '#9B7B3A',
          fontSize: '0.72rem',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          marginBottom: '4px',
          fontFamily: isMl ? 'var(--font-noto-ml)' : undefined,
        }}>
          {label}
        </p>
        <p style={{
          fontFamily: isMl ? 'var(--font-noto-ml)' : 'var(--font-cormorant)',
          color: '#2C1810',
          fontSize: isMl ? '1rem' : '1.25rem',
          fontWeight: 300,
          lineHeight: 1.3,
        }}>
          {value}
        </p>
      </div>
    </div>
  )
}

/* ─── Bride Page ───────────────────────────────────────────────── */
export default function BridePage() {
  const [lang, setLang] = useState('en')
  const t    = TRANSLATIONS[lang]
  const isMl = lang === 'ml'

  // Inherit the language chosen on the landing screen (?lang=ml|en)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('lang')
    if (p === 'ml' || p === 'en') setLang(p)
  }, [])

  const toggleLang = () => setLang(l => (l === 'en' ? 'ml' : 'en'))

  const bodyFont = isMl ? 'var(--font-noto-ml)' : 'var(--font-cormorant)'

  return (
    <div className="islamic-bg" style={{ minHeight: '100dvh' }}>

      {/* ── Top Nav ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 24px',
        background: 'rgba(253,250,242,0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
      }}>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          minHeight: '44px',
          padding: '4px 8px',
          margin: '0 -8px',
          color: '#9B7B3A',
          fontSize: '0.72rem',
          textTransform: 'uppercase',
          letterSpacing: '0.22em',
          textDecoration: 'none',
          fontFamily: isMl ? 'var(--font-noto-ml)' : undefined,
          transition: 'color 0.2s',
        }}>
          {t.back}
        </Link>
        <button
          onClick={toggleLang}
          style={{
            minHeight: '44px',
            color: '#9B7B3A',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            background: 'none',
            border: '1px solid rgba(201,168,76,0.45)',
            padding: '8px 18px',
            cursor: 'pointer',
            fontFamily: isMl ? 'var(--font-noto-ml)' : undefined,
            transition: 'border-color 0.2s, color 0.2s',
          }}
        >
          {t.lang}
        </button>
      </nav>

      {/* ── Content ── */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '100px 20px 64px' }}>

        {/* Bismillah */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            className="arabic anim-shimmer"
            lang="ar"
            aria-label="Bismillāh ir-Raḥmān ir-Raḥīm"
            style={{ color: '#C9A84C', fontSize: 'clamp(1.7rem, 8vw, 3.6rem)', lineHeight: 1.3, marginBottom: '14px', maxWidth: '100%' }}
          >
            ﷽
          </div>
          <p style={{
            color: '#9B7B3A',
            fontSize: isMl ? '0.72rem' : '0.72rem',
            letterSpacing: isMl ? '0.05em' : '0.18em',
            textTransform: isMl ? 'none' : 'uppercase',
            fontFamily: bodyFont,
          }}>
            {t.bismillah_sub}
          </p>
        </div>

        {/* Divider with ornament */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
          <div className="divider" style={{ flex: 1 }} />
          <IslamicOrnament />
          <div className="divider" style={{ flex: 1 }} />
        </div>

        {/* Invitation text */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p style={{
            color: '#9B7B3A',
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.28em',
            marginBottom: '10px',
            fontFamily: isMl ? 'var(--font-noto-ml)' : undefined,
          }}>
            {t.invitation_prefix}
          </p>
          <p style={{
            color: '#5C4033',
            fontSize: isMl ? '0.95rem' : '1.1rem',
            fontFamily: bodyFont,
            fontStyle: isMl ? 'normal' : 'italic',
            marginBottom: '20px',
            lineHeight: 1.7,
          }}>
            {t.invitation_body}
          </p>

          {/* Event badge */}
          <p style={{
            color: '#9B7B3A',
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.28em',
            marginBottom: '24px',
            fontFamily: isMl ? 'var(--font-noto-ml)' : undefined,
          }}>
            {t.event_name}
          </p>

          {/* Names */}
          <h2 style={{
            fontFamily: 'var(--font-cormorant)',
            color: '#2C1810',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            marginBottom: '16px',
          }}>
            {t.groom_name}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', margin: '0 0 16px' }}>
            <div className="divider" style={{ width: '56px' }} />
            <span className="arabic" style={{ color: '#C9A84C', fontSize: '1.4rem' }}>✦</span>
            <div className="divider" style={{ width: '56px' }} />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-cormorant)',
            color: '#2C1810',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 300,
            lineHeight: 1.1,
          }}>
            {t.bride_name}
          </h2>
        </div>

        {/* Section divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '0 0 36px' }}>
          <div className="divider" style={{ flex: 1 }} />
          <span className="arabic" style={{ color: '#C9A84C', fontSize: '1.3rem', opacity: 0.7 }}>۞</span>
          <div className="divider" style={{ flex: 1 }} />
        </div>

        {/* Quranic verse */}
        <div style={{
          border: '1px solid rgba(201,168,76,0.22)',
          padding: '32px 28px',
          marginBottom: '36px',
          position: 'relative',
          background: 'rgba(201,168,76,0.03)',
        }}>
          {[
            { top: '8px', left: '8px',  borderTop: '1px solid rgba(201,168,76,0.4)', borderLeft: '1px solid rgba(201,168,76,0.4)' },
            { top: '8px', right: '8px', borderTop: '1px solid rgba(201,168,76,0.4)', borderRight: '1px solid rgba(201,168,76,0.4)' },
            { bottom: '8px', left: '8px',  borderBottom: '1px solid rgba(201,168,76,0.4)', borderLeft: '1px solid rgba(201,168,76,0.4)' },
            { bottom: '8px', right: '8px', borderBottom: '1px solid rgba(201,168,76,0.4)', borderRight: '1px solid rgba(201,168,76,0.4)' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: '16px', height: '16px', ...s }} />
          ))}

          {/* Arabic verse */}
          <div
            className="arabic"
            style={{ color: '#2C1810', fontSize: '1.25rem', textAlign: 'center', marginBottom: '20px', lineHeight: 2 }}
          >
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
          </div>

          <div className="divider" style={{ width: '60px', margin: '0 auto 20px' }} />

          {/* Translation */}
          <p style={{
            color: '#5C4033',
            fontSize: isMl ? '0.88rem' : '0.95rem',
            fontFamily: bodyFont,
            fontStyle: isMl ? 'normal' : 'italic',
            lineHeight: 1.85,
            textAlign: 'center',
            marginBottom: '16px',
          }}>
            "{t.quran_en}"
          </p>

          <p style={{
            color: '#C9A84C',
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            textAlign: 'center',
            fontFamily: isMl ? 'var(--font-noto-ml)' : undefined,
          }}>
            — {t.quran_ref}
          </p>
        </div>

        {/* Event Details */}
        <div style={{
          background: '#fff',
          border: '1px solid rgba(201,168,76,0.22)',
          boxShadow: '0 4px 32px rgba(201,168,76,0.07)',
          padding: '32px 28px',
          marginBottom: '36px',
        }}>
          <p style={{
            color: '#C9A84C',
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.28em',
            textAlign: 'center',
            marginBottom: '24px',
            fontFamily: isMl ? 'var(--font-noto-ml)' : undefined,
          }}>
            {t.side_label}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <DetailRow icon="◈" label={t.date_label}  value={t.date_val}  isMl={isMl} />
            <div className="divider" style={{ margin: '18px 0' }} />
            <DetailRow icon="◈" label={t.time_label}  value={t.time_val}  isMl={isMl} />
            <div className="divider" style={{ margin: '18px 0' }} />

            {/* Venue with map button */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{ color: '#C9A84C', fontSize: '1.1rem', marginTop: '2px', flexShrink: 0 }}>◈</span>
              <div>
                <p style={{
                  color: '#9B7B3A',
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  marginBottom: '4px',
                  fontFamily: isMl ? 'var(--font-noto-ml)' : undefined,
                }}>
                  {t.venue_label}
                </p>
                <p style={{
                  fontFamily: isMl ? 'var(--font-noto-ml)' : 'var(--font-cormorant)',
                  color: '#2C1810',
                  fontSize: isMl ? '1rem' : '1.25rem',
                  fontWeight: 300,
                  marginBottom: '14px',
                }}>
                  {t.venue_val}
                </p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid #C9A84C',
                    color: '#C9A84C',
                    padding: '8px 18px',
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    textDecoration: 'none',
                    fontFamily: isMl ? 'var(--font-noto-ml)' : undefined,
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {t.map_btn}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{
            color: '#9B7B3A',
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.28em',
            marginBottom: '20px',
            fontFamily: isMl ? 'var(--font-noto-ml)' : undefined,
          }}>
            {t.countdown_label}
          </p>
          <Countdown
            targetDate={NIKKAH_DATE}
            labels={{ days: t.days, hours: t.hours, minutes: t.minutes, seconds: t.seconds }}
            isMl={isMl}
          />
        </div>

        {/* RSVP */}
        <Rsvp side="bride" isMl={isMl} lang={lang} />

        {/* Dua / Blessing */}
        <div style={{
          border: '1px solid rgba(201,168,76,0.18)',
          padding: '28px 24px',
          textAlign: 'center',
          marginBottom: '48px',
        }}>
          <div
            className="arabic anim-shimmer"
            style={{ color: '#C9A84C', fontSize: '1.2rem', marginBottom: '16px' }}
          >
            {t.dua_arabic}
          </div>
          <div className="divider" style={{ width: '48px', margin: '0 auto 16px' }} />
          <p style={{
            color: '#5C4033',
            fontSize: isMl ? '0.88rem' : '0.95rem',
            fontFamily: bodyFont,
            fontStyle: isMl ? 'normal' : 'italic',
            lineHeight: 1.8,
            marginBottom: '20px',
          }}>
            {t.dua_en}
          </p>
          <p style={{
            color: '#9B7B3A',
            fontSize: isMl ? '0.82rem' : '0.75rem',
            fontFamily: bodyFont,
            lineHeight: 1.7,
          }}>
            {t.footer}
          </p>
        </div>

        {/* Footer ornament */}
        <div style={{ textAlign: 'center' }}>
          <span className="arabic" style={{ color: '#C9A84C', fontSize: '1.8rem', opacity: 0.4 }}>۞</span>
        </div>
      </div>
    </div>
  )
}
