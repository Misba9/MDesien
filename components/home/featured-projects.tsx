'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/lib/projects'
import { projects } from '@/lib/projects'
import { Reveal, RevealImage } from '@/components/reveal'

const ease = [0.22, 1, 0.36, 1] as const

function metaLine(project: Project) {
  const parts = [project.category, project.location, project.year, project.area].filter(
    Boolean,
  ) as string[]
  return parts
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-ivory"
    >
      <RevealImage className="relative aspect-[16/10] overflow-hidden bg-sand md:aspect-[4/3]">
        <Image
          src={project.image || '/placeholder.svg'}
          alt={project.title}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between bg-gradient-to-t from-espresso/55 to-transparent px-5 pb-5 pt-16 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ivory">
            View Project
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </span>
        </div>
      </RevealImage>
      <div className="mt-5 border-t border-border pt-4">
        <h3 className="font-serif text-2xl text-espresso transition-colors duration-300 group-hover:text-bronze">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {metaLine(project).join(' — ')}
        </p>
      </div>
    </Link>
  )
}

function FeaturedProject({ project }: { project: Project }) {
  const meta = metaLine(project)

  return (
    <Reveal>
      <Link
        href={`/projects/${project.slug}`}
        className="group grid items-stretch outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-ivory lg:grid-cols-12 lg:gap-10 xl:gap-14"
      >
        <RevealImage className="relative aspect-[4/3] overflow-hidden bg-sand sm:aspect-[16/10] lg:col-span-8 lg:aspect-auto lg:min-h-[28rem] xl:min-h-[32rem]">
          <Image
            src={project.image || '/placeholder.svg'}
            alt={project.title}
            fill
            priority
            className="object-cover object-[center_45%] transition-transform duration-[650ms] ease-out group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 65vw, 100vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/25" />
          <div className="pointer-events-none absolute inset-0 flex items-end justify-start bg-gradient-to-t from-espresso/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="m-6 inline-flex translate-y-2 items-center text-[11px] font-medium uppercase tracking-[0.22em] text-ivory transition-transform duration-500 ease-out group-hover:translate-y-0 md:m-8">
              View Project
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </span>
          </div>
        </RevealImage>

        <div className="flex flex-col justify-center border-t border-border pt-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:border-border lg:pl-10 lg:pt-0 xl:pl-12">
          <p className="text-xs uppercase tracking-[0.28em] text-bronze">
            Selected Project
          </p>
          <h3 className="mt-4 max-w-[12ch] font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.15] text-espresso text-balance transition-colors duration-300 group-hover:text-bronze">
            {project.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {project.category}
          </p>
          {(project.location || project.year || project.area) && (
            <dl className="mt-6 space-y-2 border-t border-border/70 pt-5 text-sm text-muted-foreground">
              {project.location && (
                <div className="flex gap-3">
                  <dt className="w-16 shrink-0 uppercase tracking-[0.14em] text-[10px] text-bronze">
                    Place
                  </dt>
                  <dd>{project.location}</dd>
                </div>
              )}
              {project.year && (
                <div className="flex gap-3">
                  <dt className="w-16 shrink-0 uppercase tracking-[0.14em] text-[10px] text-bronze">
                    Year
                  </dt>
                  <dd>{project.year}</dd>
                </div>
              )}
              {project.area && (
                <div className="flex gap-3">
                  <dt className="w-16 shrink-0 uppercase tracking-[0.14em] text-[10px] text-bronze">
                    Area
                  </dt>
                  <dd>{project.area}</dd>
                </div>
              )}
            </dl>
          )}
          {project.summary && (
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground line-clamp-4">
              {project.summary}
            </p>
          )}
          <span className="mt-8 inline-flex items-center text-xs font-medium uppercase tracking-[0.2em] text-espresso transition-colors duration-300 group-hover:text-bronze">
            View Project
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </span>
          {/* Keep meta available to screen readers without duplicating visible category */}
          <span className="sr-only">{meta.join(', ')}</span>
        </div>
      </Link>
    </Reveal>
  )
}

export function FeaturedProjects() {
  const featured = projects.slice(0, 4)
  const single = featured.length === 1

  return (
    <section className="bg-white/60 py-[clamp(5rem,10vw,9rem)]">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 flex items-end justify-between gap-6 md:mb-16">
          <Reveal>
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-bronze">
                Selected Work
              </p>
              <h2 className="font-serif text-4xl font-light text-espresso md:text-5xl">
                Projects
              </h2>
            </div>
          </Reveal>
          {featured.length > 0 && (
            <Reveal>
              <Link
                href="/projects"
                className="group/all hidden items-center text-xs uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-bronze md:inline-flex outline-none focus-visible:text-bronze"
              >
                All Projects
                <span className="ml-2 inline-block transition-transform duration-300 group-hover/all:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          )}
        </div>

        {featured.length === 0 ? (
          <Reveal>
            <div className="border border-border bg-ivory/50 px-8 py-16 md:px-12">
              <p className="text-xs uppercase tracking-[0.3em] text-bronze">
                Coming soon
              </p>
              <p className="mt-4 max-w-lg font-serif text-3xl font-light text-espresso text-balance">
                Project work will appear here once it is published.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex text-xs uppercase tracking-[0.2em] text-bronze outline-none focus-visible:underline"
              >
                Start a project →
              </Link>
            </div>
          </Reveal>
        ) : single ? (
          <FeaturedProject project={featured[0]} />
        ) : (
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 2) * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}

        {featured.length > 0 && (
          <div className="mt-10 md:hidden">
            <Link
              href="/projects"
              className="inline-flex text-xs uppercase tracking-[0.2em] text-bronze outline-none focus-visible:underline"
            >
              All Projects →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
