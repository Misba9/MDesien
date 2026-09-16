import type { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import { Intro } from '@/components/home/intro'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { Capabilities } from '@/components/home/capabilities'
import { JournalPreview } from '@/components/home/journal-preview'
import { FinalCta } from '@/components/home/final-cta'

export const metadata: Metadata = {
  title: {
    absolute: 'M Desien | Architecture & Interior Design Studio in Hyderabad',
  },
  description:
    'M Desien is an architecture and interior design studio in Madhapur, Hyderabad. Creating spaces that feel like you — shaped around people, purpose and possibility.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedProjects />
      <Capabilities />
      <JournalPreview />
      <FinalCta />
    </>
  )
}
