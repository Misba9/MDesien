import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Cursor } from '@/components/cursor'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mdesign.studio'),
  title: {
    default: 'M Design — Architecture & Interior Studio',
    template: '%s — M Design',
  },
  description:
    'M Design is an architecture and interior design studio crafting warm, considered spaces where light, material and proportion meet.',
  keywords: [
    'architecture studio',
    'interior design',
    'residential architecture',
    'hospitality design',
    'M Design',
  ],
  authors: [{ name: 'M Design' }],
  openGraph: {
    title: 'M Design — Architecture & Interior Studio',
    description:
      'Warm, considered spaces where light, material and proportion meet.',
    type: 'website',
    images: ['/images/hero-home.png'],
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f2ede4',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`bg-background ${inter.variable} ${cormorant.variable}`}
    >
      <body className="antialiased">
        <Cursor />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
