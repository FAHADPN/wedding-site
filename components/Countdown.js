'use client'

import { useState, useEffect } from 'react'

export default function Countdown({ targetDate, labels, isMl }) {
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date()
      if (diff <= 0) return { done: true }
      return {
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000),
      }
    }
    setTimeLeft(calc())
    const t = setInterval(() => setTimeLeft(calc()), 1000)
    return () => clearInterval(t)
  }, [targetDate])

  if (!timeLeft) return <div style={{ height: '72px' }} />

  if (timeLeft.done) {
    return (
      <div
        className="anim-shimmer"
        style={{
          fontFamily: isMl ? 'var(--font-noto-ml)' : 'var(--font-cormorant)',
          color: '#C9A84C',
          fontSize: isMl ? '1.4rem' : '1.9rem',
          fontStyle: isMl ? 'normal' : 'italic',
          fontWeight: 400,
          textAlign: 'center',
          lineHeight: 1.4,
        }}
      >
        {labels?.today || (isMl ? 'അൽഹംദുലില്ലാഹ് — ഇന്നാണ് ആ ദിനം!' : 'Alhamdulillah — the day is here!')}
      </div>
    )
  }

  const units = [
    { key: 'days',    label: labels?.days    || 'Days'    },
    { key: 'hours',   label: labels?.hours   || 'Hours'   },
    { key: 'minutes', label: labels?.minutes || 'Minutes' },
    { key: 'seconds', label: labels?.seconds || 'Seconds' },
  ]

  return (
    <div style={{ display: 'flex', gap: '0', justifyContent: 'center', alignItems: 'flex-end' }}>
      {units.map(({ key, label }, i) => (
        <div key={key} style={{ display: 'flex', alignItems: 'flex-end' }}>
          {i > 0 && (
            <span style={{
              color: 'rgba(201,168,76,0.3)',
              fontSize: '2rem',
              fontFamily: 'var(--font-cormorant)',
              lineHeight: 1,
              paddingBottom: '20px',
              margin: '0 4px',
            }}>
              :
            </span>
          )}
          <div style={{ textAlign: 'center', minWidth: '52px' }}>
            <div style={{
              fontFamily: 'var(--font-cormorant)',
              color: '#C9A84C',
              fontSize: '2.6rem',
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}>
              {String(timeLeft[key]).padStart(2, '0')}
            </div>
            <div style={{
              color: '#9B7B3A',
              fontSize: isMl ? '0.68rem' : '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginTop: '6px',
              fontFamily: isMl ? 'var(--font-noto-ml)' : undefined,
            }}>
              {label}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
