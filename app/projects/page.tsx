import type { Metadata } from 'next'
import { PageIntro } from '@/components/page-intro'
import { ProjectsGrid } from '@/components/projects/projects-grid'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A selection of residential, hospitality and workplace projects by M Design.',
}

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Selected Work"
        title="Projects"
        description="A body of work united not by a style but by a discipline of restraint — buildings and interiors made to age gracefully."
      />
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-36">
        <ProjectsGrid />
      </section>
    </>
  )
}
