import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/lib/projects'
import { Reveal } from '@/components/reveal'

export function FeaturedProjects() {
  const featured = projects.slice(0, 4)

  return (
    <section className="bg-white/60 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 flex items-end justify-between">
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
                className="hidden text-xs uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-bronze md:inline-flex"
              >
                All projects &rarr;
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
                className="mt-8 inline-flex text-xs uppercase tracking-[0.2em] text-bronze"
              >
                Start a project &rarr;
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 2) * 0.1}>
                <Link href={`/projects/${project.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                    <Image
                      src={project.image || '/placeholder.svg'}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
                    <div>
                      <h3 className="font-serif text-2xl text-espresso">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {project.category} — {project.location}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
