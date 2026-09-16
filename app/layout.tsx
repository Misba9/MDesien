import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Cursor } from '@/components/cursor'
import {
  brand,
  email,
  phones,
  siteUrl,
  studioAddress,
} from '@/lib/site'
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

const ogImage = '/images/hero-home.png'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'M Desien | Architecture & Interior Design Studio in Hyderabad',
    template: '%s | M Desien',
  },
  description:
    'M Desien is an architecture and interior design studio in Madhapur, Hyderabad, led by Manisha. Residential, corporate and hospitality projects.',
  keywords: [
    'M Desien',
    'Architecture Firms in Hyderabad',
    'Interior Designers in Hyderabad',
    'interior design studio Hyderabad',
    'architecture studio Madhapur',
    'residential architecture Hyderabad',
  ],
  authors: [{ name: brand.name }],
  openGraph: {
    title: 'M Desien | Architecture & Interior Design Studio in Hyderabad',
    description:
      'Architecture and interior design shaped around people, purpose and possibility. Studio in Madhapur, Hyderabad.',
    type: 'website',
    url: siteUrl,
    siteName: brand.name,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M Desien | Architecture & Interior Design Studio in Hyderabad',
    description:
      'Architecture and interior design shaped around people, purpose and possibility. Studio in Madhapur, Hyderabad.',
    images: [ogImage],
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f2ede4',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ArchitecturalOffice',
  name: brand.name,
  url: siteUrl,
  email: email.display,
  telephone: phones.map((p) => p.display),
  image: `${siteUrl}${ogImage}`,
  description:
    'Architecture and interior design studio in Madhapur, Hyderabad.',
  address: {
    '@type': 'PostalAddress',
    streetAddress:
      '3rd Floor, Sai Sudha Sadan, Plot No. 15/1, Sector 3, HUDA Techno Enclave',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500081',
    addressCountry: 'IN',
  },
  areaServed: studioAddress.lines[4],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Cursor />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
