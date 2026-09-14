import { Hero } from '@/components/home/hero'
import { Intro } from '@/components/home/intro'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { Capabilities } from '@/components/home/capabilities'
import { JournalPreview } from '@/components/home/journal-preview'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedProjects />
      <Capabilities />
      <JournalPreview />
    </>
  )
}
