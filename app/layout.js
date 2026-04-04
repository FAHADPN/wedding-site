import { Amiri, Cormorant_Garamond, Noto_Sans_Malayalam, Lavishly_Yours } from 'next/font/google'
import './globals.css'

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const lavishlyYours = Lavishly_Yours({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-lavishly',
  display: 'swap',
})

const notoMalayalam = Noto_Sans_Malayalam({
  subsets: ['malayalam'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-noto-ml',
  display: 'swap',
})

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : process.env.VERCEL_URL
  ? new URL(`https://${process.env.VERCEL_URL}`)
  : new URL('http://localhost:3000')

export const metadata = {
  metadataBase: baseUrl,
  title: 'Fahad & Nadha — Wedding Invitation',
  description:
    'Join us to celebrate the blessed union of Fahad P N and Nadha Shirin K N on 26th July 2026.',
  openGraph: {
    title: 'Fahad & Nadha — Wedding Invitation',
    description:
      'Join us to celebrate the blessed union of Fahad P N and Nadha Shirin K N on 26th July 2026.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fahad & Nadha — Wedding Invitation',
    description:
      'Join us to celebrate the blessed union of Fahad P N and Nadha Shirin K N on 26th July 2026.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${amiri.variable} ${cormorant.variable} ${notoMalayalam.variable} ${lavishlyYours.variable}`}>
        {children}
      </body>
    </html>
  )
}
