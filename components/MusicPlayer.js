'use client'

import { useEffect, useRef, useState } from 'react'

/* Subtle background music, persistent across the whole site (mounted in root layout).
   Browsers block autoplay-with-sound until a user gesture, so we attempt to play and,
   if blocked, start on the first tap/click/keypress. A floating toggle mutes it. */
export default function MusicPlayer() {
  const ref = useRef(null)
  const mutedRef = useRef(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const a = ref.current
    if (!a) return
    a.volume = 0.4
    const savedMuted = (() => { try { return localStorage.getItem('music-muted') === '1' } catch { return false } })()
    mutedRef.current = savedMuted
    setMuted(savedMuted)
    a.muted = savedMuted

    const events = ['pointerdown', 'touchstart', 'keydown', 'click']
    let removed = false
    const removeGestures = () => {
      if (removed) return
      removed = true
      events.forEach((e) => window.removeEventListener(e, onGesture))
    }
    // retry on EVERY gesture until playback actually starts; only then stop listening
    const onGesture = () => {
      if (mutedRef.current) return
      a.play().then(removeGestures).catch(() => {})
    }
    events.forEach((e) => window.addEventListener(e, onGesture, { passive: true }))
    // try immediately — succeeds on return visits / where the browser already allows it
    a.play().then(removeGestures).catch(() => {})
    const play = () => a.play().catch(() => {})

    // pause when the guest leaves the tab/app, resume on return (unless they muted)
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') a.pause()
      else if (!mutedRef.current) play()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => { removeGestures(); document.removeEventListener('visibilitychange', onVisibility) }
  }, [])

  const toggle = () => {
    const a = ref.current
    const next = !muted
    mutedRef.current = next
    setMuted(next)
    if (a) {
      a.muted = next
      if (!next) a.play().catch(() => {})
    }
    try { localStorage.setItem('music-muted', next ? '1' : '0') } catch {}
  }

  return (
    <>
      <audio ref={ref} src="/music.mp3" loop autoPlay preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={muted ? 'Unmute music' : 'Mute music'}
        className="music-toggle"
        style={{
          position: 'fixed', left: '16px', bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)',
          zIndex: 60, width: '44px', height: '44px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(14,10,6,0.6)', border: '1px solid rgba(201,168,76,0.55)',
          color: '#E8D5A3', cursor: 'pointer', backdropFilter: 'blur(4px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        }}
      >
        {muted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        )}
      </button>
    </>
  )
}
