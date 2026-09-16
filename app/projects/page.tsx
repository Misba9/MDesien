import type { Metadata } from 'next'
import { PageIntro } from '@/components/page-intro'
import { ProjectsGrid } from '@/components/projects/projects-grid'
import { projects } from '@/lib/projects'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Architecture and interior design projects by M Desien, based in Madhapur, Hyderabad. Work will be published here as it is ready to share.',
  alternates: { canonical: '/projects' },
}

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Selected Work"
        title="Projects"
        description="A selection of M Desien work. Real project pages will be added here as photography and details are supplied."
      />
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-36">
        {projects.length === 0 ? (
          <div className="border border-border bg-white/60 px-8 py-20 md:px-12">
            <p className="text-xs uppercase tracking-[0.3em] text-bronze">
              Coming soon
            </p>
            <p className="mt-4 max-w-xl font-serif text-3xl font-light leading-snug text-espresso text-balance">
              Projects coming soon.
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              This page is ready for CMS entries — name, category, location,
              year and images — without changing the project template.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex text-xs uppercase tracking-[0.2em] text-bronze"
            >
              Start a project &rarr;
            </Link>
          </div>
        ) : (
          <ProjectsGrid />
        )}
      </section>
    </>
  )
}
