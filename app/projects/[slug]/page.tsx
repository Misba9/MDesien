import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject, normalizeGallery, projects } from '@/lib/projects'
import type { NormalizedGalleryImage, Project } from '@/lib/projects'
import { Reveal } from '@/components/reveal'
import { ProjectGallery } from '@/components/projects/project-gallery'
import { ProjectWalkthrough } from '@/components/projects/project-walkthrough'
import { Project3DExperience } from '@/components/projects/project-3d-experience'
import { ThreeDWalkthrough } from '@/components/shared/three-d-walkthrough'
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
      title: `${project.title} | M Desien`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      type: 'article',
      images: [project.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | M Desien`,
      description: project.summary,
      images: [project.image],
    },
  }
}

function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string
  title: string
  lede?: string
}) {
  return (
    <Reveal>
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.3em] text-bronze">
            {eyebrow}
          </p>
        )}
        <h2
          className={`font-serif text-3xl font-light text-espresso md:text-4xl ${
            eyebrow ? 'mt-3' : ''
          }`}
        >
          {title}
        </h2>
        {lede && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {lede}
          </p>
        )}
      </div>
    </Reveal>
  )
}

function galleryByCategory(
  images: NormalizedGalleryImage[],
  category: string,
) {
  return images.filter((image) => image.category === category)
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const related = projects.filter((p) => p.slug !== slug)
  const massing = getMassing(slug)
  const gallery = normalizeGallery(project.gallery, project.title)
  const exterior = galleryByCategory(gallery, 'Exterior')
  const interior = galleryByCategory(gallery, 'Interior')
  const details = galleryByCategory(gallery, 'Details')
  const splitGallery =
    exterior.length + interior.length + details.length === gallery.length &&
    gallery.length > 0
  const hasImmersive = Boolean(
    project.walkthroughVideo || project.panorama || project.model3d,
  )

  return (
    <article>
      <Hero project={project} />

      <section
        id="overview"
        className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24"
      >
        <SectionHeading eyebrow="Overview" title="Project Overview" />
        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="font-serif text-2xl font-light leading-snug text-espresso text-balance md:text-3xl">
                {project.summary}
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            {project.description.map((para, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {project.facts.length > 0 && (
        <section
          id="facts"
          className="border-t border-border bg-white/40"
        >
          <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
            <SectionHeading eyebrow="At a glance" title="Project Facts" />
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-10 md:grid-cols-3 lg:grid-cols-4">
              {project.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd
                    className={`mt-2 font-serif text-xl md:text-2xl ${
                      fact.pending ? 'text-muted-foreground' : 'text-espresso'
                    }`}
                  >
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {project.concept && (
        <section
          id="concept"
          className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24"
        >
          <SectionHeading
            eyebrow="Intent"
            title={project.concept.title}
            lede={project.concept.description}
          />
          {project.concept.body && project.concept.body.length > 0 && (
            <div className="mt-10 max-w-3xl space-y-6">
              {project.concept.body.map((para, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          )}
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {project.concept.points.map((point, i) => (
              <Reveal key={point} delay={(i % 2) * 0.05}>
                <li className="border-t border-border pt-5">
                  <span className="font-serif text-lg text-bronze">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-espresso">
                    {point}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      {project.features && project.features.length > 0 && (
        <section
          id="features"
          className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24"
        >
          <SectionHeading eyebrow="Character" title="Design Features" />
          <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {project.features.map((feature, i) => (
              <Reveal key={feature.title} delay={(i % 3) * 0.05}>
                <li className="border-t border-border pt-5">
                  <h3 className="font-serif text-2xl font-light text-espresso">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      {splitGallery ? (
        <>
          {exterior.length > 0 && (
            <GalleryBand
              id="exterior-gallery"
              eyebrow="Photography"
              heading="Exterior Gallery"
              images={exterior}
              title={project.title}
            />
          )}
          {interior.length > 0 && (
            <GalleryBand
              id="interior-gallery"
              heading="Interior Gallery"
              images={interior}
              title={project.title}
              muted
            />
          )}
          {details.length > 0 && (
            <GalleryBand
              id="details-gallery"
              heading="Architectural Details"
              images={details}
              title={project.title}
            />
          )}
        </>
      ) : (
        gallery.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
            <ProjectGallery images={gallery} title={project.title} />
          </section>
        )
      )}

      {massing && (
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <SectionHeading
            eyebrow="Model"
            title="Explore the massing"
            lede={massing.caption}
          />
          <div className="mt-10">
            <ProjectWalkthrough slug={slug} title={project.title} />
          </div>
        </section>
      )}

      {project.walkthrough && (
        <ThreeDWalkthrough
          id="walkthrough"
          eyebrow="3D Visualization & Walkthroughs"
          heading="3D Walkthrough"
          description={project.walkthrough.description}
          walkthrough={{
            ...project.walkthrough,
            video:
              project.walkthrough.video?.trim() || '/herosection-video.mp4',
          }}
        />
      )}

      {hasImmersive && !project.walkthrough && (
        <Project3DExperience project={project} />
      )}

      {project.process && project.process.length > 0 && (
        <section
          id="process"
          className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24"
        >
          <SectionHeading
            eyebrow="Sequence"
            title="Project Process"
            lede={project.processNote}
          />
          <ol className="mt-12 grid gap-10 md:grid-cols-2">
            {project.process.map((step, i) => (
              <Reveal key={step.step} delay={(i % 2) * 0.05}>
                <li className="border-t border-border pt-6">
                  <p className="font-serif text-lg text-bronze">{step.step}</p>
                  <h3 className="mt-3 font-serif text-2xl font-light text-espresso">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>
      )}

      {project.outcome && (
        <section id="outcome" className="border-t border-border bg-white/40">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-12 md:px-10 md:py-24">
            {project.outcome.src && (
              <Reveal className="md:col-span-7">
                <div className="relative aspect-[3/4] overflow-hidden bg-sand sm:aspect-[4/5]">
                  <Image
                    src={project.outcome.src}
                    alt={project.outcome.alt || project.outcome.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 55vw, 100vw"
                  />
                </div>
              </Reveal>
            )}
            <div
              className={
                project.outcome.src
                  ? 'md:col-span-4 md:col-start-9'
                  : 'md:col-span-8'
              }
            >
              <SectionHeading eyebrow="Outcome" title="Final Outcome" />
              <Reveal delay={0.05}>
                <p className="mt-6 font-serif text-2xl font-light leading-snug text-espresso text-balance md:text-3xl">
                  {project.outcome.title}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  {project.outcome.body}
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      <section id="related" className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <SectionHeading eyebrow="Continue" title="Related Projects" />
          {related.length > 0 ? (
            <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
              {related.slice(0, 2).map((item) => (
                <Reveal key={item.slug}>
                  <Link href={`/projects/${item.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                    <div className="mt-5 border-t border-border pt-4">
                      <h3 className="font-serif text-2xl text-espresso">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.subtitle || item.category}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="mt-10 border border-border bg-ivory/70 px-8 py-12">
                <p className="max-w-lg font-serif text-2xl font-light leading-snug text-espresso text-balance md:text-3xl">
                  Further projects will appear here as they are published.
                </p>
                <Link
                  href="/projects"
                  className="mt-6 inline-flex text-xs uppercase tracking-[0.2em] text-bronze transition-colors hover:text-espresso"
                >
                  All projects &rarr;
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section id="start" className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start px-6 py-20 md:px-10 md:py-28">
          <p className="text-xs uppercase tracking-[0.3em] text-bronze">
            Start your project
          </p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl font-light text-espresso text-balance md:text-5xl">
            Let&apos;s create a space worth experiencing.
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center bg-espresso px-8 py-4 text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-bronze"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </article>
  )
}

function Hero({ project }: { project: Project }) {
  return (
    <section className="relative h-[70svh] min-h-[420px] w-full overflow-hidden">
      <Image
        src={project.image || '/placeholder.svg'}
        alt={project.title}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/25 to-espresso/10" />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-12 md:px-10 md:pb-16">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ivory/80">
          {project.subtitle || project.category}
        </p>
        <h1 className="max-w-4xl font-serif text-5xl font-light text-ivory text-balance md:text-7xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory/85 md:text-base">
          {project.summary}
        </p>
      </div>
    </section>
  )
}

function GalleryBand({
  id,
  eyebrow,
  heading,
  images,
  title,
  muted = false,
}: {
  id: string
  eyebrow?: string
  heading: string
  images: NormalizedGalleryImage[]
  title: string
  muted?: boolean
}) {
  return (
    <section
      id={id}
      className={`border-t border-border ${muted ? 'bg-white/40' : ''}`}
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        {eyebrow && (
          <Reveal>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-bronze">
              {eyebrow}
            </p>
          </Reveal>
        )}
        <ProjectGallery
          images={images}
          title={title}
          heading={heading}
          sectionId={`${id}-grid`}
        />
      </div>
    </section>
  )
}
