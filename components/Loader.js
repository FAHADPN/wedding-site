export default function Loader({ label = 'Loading' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <div className="arabic anim-shimmer" lang="ar" aria-hidden="true" style={{ color: '#E8D5A3', fontSize: 'clamp(1.6rem, 8vw, 2.4rem)', lineHeight: 1.2, maxWidth: '92vw' }}>﷽</div>
      <div className="gold-spinner" />
      <p style={{ color: '#C9A84C', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.34em', margin: 0, fontFamily: 'var(--font-cormorant)' }}>{label}</p>
    </div>
  )
}
