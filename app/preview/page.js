import Link from 'next/link'

/* Index of parked design prototypes. Not linked from the live site — visit /preview. */

const ITEMS = [
  { href: '/preview/living-palace', title: 'Inside the Living Palace', desc: 'Vivid palace scene stays alive behind; content floats on frosted-glass panels.' },
  { href: '/preview/cream', title: 'Cream Invitation Card', desc: 'Light ivory, deep-green + gold, content-first elegant card (hero + verse).' },
]

export default function PreviewIndex() {
  return (
    <main style={{ minHeight: '100dvh', background: '#0e0a06', color: '#F3E9D2', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 20px', fontFamily: 'var(--font-cormorant)' }}>
      <p style={{ color: '#C9A84C', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.34em', marginBottom: '6px' }}>Design Prototypes</p>
      <h1 style={{ fontFamily: 'var(--font-script)', color: '#F8F1DF', fontSize: 'clamp(2.2rem, 8vw, 3.4rem)', fontWeight: 400, margin: '0 0 32px' }}>Bride &amp; Groom — Previews</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '460px' }}>
        {ITEMS.map((it) => (
          <Link key={it.href} href={it.href} style={{ display: 'block', textDecoration: 'none', border: '1px solid rgba(201,168,76,0.4)', background: 'rgba(18,12,7,0.6)', padding: '22px 24px' }}>
            <h2 style={{ color: '#E8D5A3', fontSize: '1.4rem', fontWeight: 500, margin: '0 0 6px' }}>{it.title}</h2>
            <p style={{ color: '#d8c79a', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>{it.desc}</p>
            <span style={{ color: '#C9A84C', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'inline-block', marginTop: '12px' }}>View →</span>
          </Link>
        ))}
      </div>

      <Link href="/" style={{ marginTop: '36px', color: '#C9A84C', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.22em', textDecoration: 'none' }}>← Back to site</Link>
    </main>
  )
}
