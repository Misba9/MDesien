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
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
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
  '@graph': [
    {
      '@type': ['ArchitecturalOffice', 'LocalBusiness', 'ProfessionalService'],
      '@id': `${siteUrl}/#organization`,
      name: brand.name,
      alternateName: 'M Desien Architecture & Interior Design',
      url: siteUrl,
      email: email.display,
      telephone: phones.map((p) => p.display),
      image: `${siteUrl}${ogImage}`,
      description:
        'Architecture, interior design, and project management studio based in Madhapur, Hyderabad, led by Manisha.',
      priceRange: '₹₹₹₹',
      address: {
        '@type': 'PostalAddress',
        streetAddress:
          '3rd Floor, Sai Sudha Sadan, Plot No. 15/1, Sector 3, HUDA Techno Enclave, Opp. Mindspace Raheja IT Park',
        addressLocality: 'Madhapur, Hyderabad',
        addressRegion: 'Telangana',
        postalCode: '500081',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '17.4399',
        longitude: '78.3807',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          opens: '09:30',
          closes: '18:30',
        },
      ],
      areaServed: [
        'Hyderabad',
        'Telangana',
        'Andhra Pradesh',
        'India',
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`bg-background ${inter.variable} ${cormorant.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Cursor />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

