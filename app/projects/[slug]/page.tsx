import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject, projects } from '@/lib/projects'
import { Reveal } from '@/components/reveal'
import { ProjectGallery } from '@/components/projects/project-gallery'
import { ProjectWalkthrough } from '@/components/projects/project-walkthrough'
import { getMassing } from '@/lib/massing'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: 'Project not found' }
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, images: [project.image] },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const index = projects.findIndex((p) => p.slug === slug)
  const next = projects[(index + 1) % projects.length]
  const massing = getMassing(slug)

  const meta = [
    { label: 'Location', value: project.location },
    { label: 'Year', value: project.year },
    { label: 'Area', value: project.area },
    { label: 'Category', value: project.category },
  ]

  return (
    <article>
      <section className="relative h-[70svh] min-h-[420px] w-full overflow-hidden">
        <Image
          src={project.image || '/placeholder.svg'}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 to-espresso/10" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-12 md:px-10 md:pb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ivory/80">
            {project.category}
          </p>
          <h1 className="font-serif text-5xl font-light text-ivory text-balance md:text-7xl">
            {project.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-4 border-b border-border pb-12 sm:grid-cols-2 md:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label}>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {m.label}
              </p>
              <p className="mt-2 font-serif text-xl text-espresso">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="font-serif text-2xl font-light leading-snug text-espresso text-balance">
                {project.summary}
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {project.description.map((para, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                  {para}
                </p>
              </Reveal>
            ))}
            <div className="mt-8 grid gap-4 border-t border-border pt-8 sm:grid-cols-3">
              {project.facts.map((f) => (
                <div key={f.label}>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {f.label}
                  </p>
                  <p className="mt-2 text-sm text-espresso">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {massing && (
        <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10 md:pb-24">
          <Reveal>
            <div className="mb-6 flex flex-col gap-2 border-t border-border pt-10 md:flex-row md:items-end md:justify-between">
              <h2 className="font-serif text-3xl font-light text-espresso md:text-4xl">
                Explore the massing
              </h2>
              <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
                {massing.caption}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <ProjectWalkthrough slug={slug} title={project.title} />
          </Reveal>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-36">
        <ProjectGallery images={project.gallery} title={project.title} />
      </section>

      <section className="border-t border-border">
        <Link
          href={`/projects/${next.slug}`}
          className="group relative block h-[50svh] min-h-[360px] overflow-hidden"
        >
          <Image
            src={next.image || '/placeholder.svg'}
            alt={next.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-espresso/50 transition-colors group-hover:bg-espresso/40" />
          <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col items-start justify-center px-6 md:px-10">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-ivory/80">
              Next project
            </p>
            <span className="font-serif text-4xl font-light text-ivory md:text-6xl">
              {next.title}
            </span>
          </div>
        </Link>
      </section>
    </article>
  )
}
