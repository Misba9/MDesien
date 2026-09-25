import type { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import { Intro } from '@/components/home/intro'
import { Capabilities } from '@/components/home/capabilities'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { ThreeDWalkthrough } from '@/components/shared/three-d-walkthrough'
import { studioWalkthroughSection } from '@/lib/walkthrough'
import { DesignApproach } from '@/components/home/design-approach'
import { WhyMDesien } from '@/components/home/why-m-desien'
import { TestimonialsSection } from '@/components/home/testimonials'
import { JournalPreview } from '@/components/home/journal-preview'
import { FinalCta } from '@/components/home/final-cta'

export const metadata: Metadata = {
  title: {
    absolute: 'M Desien | Architecture & Interior Design Studio in Hyderabad',
  },
  description:
    'M Desien is an architecture and interior design studio in Madhapur, Hyderabad. Spaces designed with purpose — shaped around functionality, character and the way people experience space.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Introduction / About M Desien */}
      <Intro />

      {/* 3. Services */}
      <Capabilities />

      {/* 4. Featured Projects */}
      <FeaturedProjects />

      {/* 5. 3D Visualization / Walkthrough (Shared Component) */}
      <ThreeDWalkthrough
        eyebrow={studioWalkthroughSection.eyebrow}
        heading={studioWalkthroughSection.heading}
        description={studioWalkthroughSection.description}
        walkthrough={studioWalkthroughSection.walkthrough}
      />

      {/* 6. Design Approach */}
      <DesignApproach />

      {/* 7. Why M Desien */}
      <WhyMDesien />

      {/* 8. Testimonials (Phase 3 Component) */}
      <TestimonialsSection />

      {/* 9. Blog */}
      <JournalPreview />

      {/* 10. Final CTA */}
      <FinalCta />

      {/* 11. Footer rendered globally by app/layout.tsx */}
    </>
  )
}

