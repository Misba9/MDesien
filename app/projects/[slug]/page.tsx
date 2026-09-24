import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject, normalizeGallery, projects } from '@/lib/projects'
import { Reveal } from '@/components/reveal'
import { ProjectGallery } from '@/components/projects/project-gallery'
import { ProjectWalkthrough } from '@/components/projects/project-walkthrough'
import { Project3DExperience } from '@/components/projects/project-3d-experience'
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
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.image],
    },
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
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : null
  const massing = getMassing(slug)
  const gallery = normalizeGallery(project.gallery, project.title)

  const meta = [
    { label: 'Type', value: project.subtitle || project.category },
    { label: 'Location', value: project.location },
    { label: 'Year', value: project.year },
    { label: 'Area', value: project.area },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value))

  return (
    <article>
      <section className="relative h-[70svh] min-h-[420px] w-full overflow-hidden">
        <Image
          src={project.image || '/placeholder.svg'}
          alt={project.title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 to-espresso/10" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-12 md:px-10 md:pb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ivory/80">
            {project.subtitle || project.category}
          </p>
          <h1 className="font-serif text-5xl font-light text-ivory text-balance md:text-7xl">
            {project.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        {meta.length > 0 && (
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
        )}

        <div className="mt-12">
          <Reveal>
            <h2 className="font-serif text-3xl font-light text-espresso md:text-4xl">
              Project Overview
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-12 md:grid-cols-12">
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
              {project.facts.length > 0 && (
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
              )}
            </div>
          </div>
        </div>

        {project.concept && (
          <div className="mt-16 border-t border-border pt-12 md:mt-20">
            <Reveal>
              <h2 className="font-serif text-3xl font-light text-espresso md:text-4xl">
                {project.concept.title}
              </h2>
              <p className="mt-4 max-w-xl font-serif text-2xl font-light leading-snug text-espresso text-balance">
                {project.concept.description}
              </p>
            </Reveal>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {project.concept.points.map((point) => (
                <li
                  key={point}
                  className="border-t border-border pt-4 text-sm leading-relaxed text-espresso"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.materials && project.materials.length > 0 && (
          <div className="mt-16 border-t border-border pt-12 md:mt-20">
            <Reveal>
              <h2 className="font-serif text-3xl font-light text-espresso md:text-4xl">
                Material Palette
              </h2>
            </Reveal>
            <ul className="mt-8 flex flex-wrap gap-3">
              {project.materials.map((material) => (
                <li
                  key={material}
                  className="border border-border px-4 py-3 text-xs uppercase tracking-[0.18em] text-espresso"
                >
                  {material}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.features && project.features.length > 0 && (
          <div className="mt-16 border-t border-border pt-12 md:mt-20">
            <Reveal>
              <h2 className="font-serif text-3xl font-light text-espresso md:text-4xl">
                Key Features
              </h2>
            </Reveal>
            <ul className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature.title} className="border-t border-border pt-5">
                  <h3 className="font-serif text-2xl font-light text-espresso">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {project.editorial && (
        <section className="border-t border-border bg-sand/40">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-12 md:px-10 md:py-24">
            <div className="relative aspect-[3/4] bg-sand md:col-span-7">
              <Image
                src={project.editorial.src}
                alt={project.editorial.alt}
                fill
                className="object-contain"
                sizes="(min-width: 768px) 55vw, 100vw"
              />
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <p className="text-xs uppercase tracking-[0.3em] text-bronze">Details</p>
              <p className="mt-4 font-serif text-3xl font-light leading-snug text-espresso text-balance md:text-4xl">
                {project.editorial.text}
              </p>
            </div>
          </div>
        </section>
      )}

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

      <section id="project-gallery" className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <ProjectGallery images={gallery} title={project.title} />
      </section>

      <Project3DExperience project={project} />

      {next && (
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
      )}

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start px-6 py-20 md:px-10 md:py-28">
          <p className="text-xs uppercase tracking-[0.3em] text-bronze">Work with us</p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl font-light text-espresso text-balance md:text-5xl">
            Let&apos;s create a space worth experiencing.
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center bg-espresso px-8 py-4 text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-bronze"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </article>
  )
}
