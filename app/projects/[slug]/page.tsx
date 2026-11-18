import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject, normalizeGallery, projects } from '@/lib/projects'
import type { NormalizedGalleryImage, Project } from '@/lib/projects'
import { Reveal } from '@/components/reveal'
import { ProjectGallery } from '@/components/projects/project-gallery'
import { ProjectWalkthrough } from '@/components/projects/project-walkthrough'
import { ThreeDWalkthrough } from '@/components/shared/three-d-walkthrough'
import { getMassing } from '@/lib/massing'
import { email, phones, whatsapp } from '@/lib/site'

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

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="mb-3 text-xs uppercase tracking-[0.3em] text-bronze">{text}</p>
  )
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

function galleryByCategory(images: NormalizedGalleryImage[], category: string) {
  return images.filter((img) => img.category === category)
}

function galleryExcludingCategory(
  images: NormalizedGalleryImage[],
  category: string,
) {
  return images.filter((img) => img.category !== category)
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

  // Split site/on-site working images from main gallery images
  const siteImages = galleryByCategory(gallery, 'On site')
  const mainGallery = galleryExcludingCategory(gallery, 'On site')

  // Further split main gallery by category if tagged
  const exterior = galleryByCategory(mainGallery, 'Exterior')
  const interior = galleryByCategory(mainGallery, 'Interior')
  const details = galleryByCategory(mainGallery, 'Details')
  const otherImages = mainGallery.filter(
    (img) =>
      !['Exterior', 'Interior', 'Details'].includes(img.category ?? ''),
  )

  // Resolve the best video source for the hero loop
  const heroVideo =
    project.walkthroughs?.[0]?.video ||
    project.walkthrough?.video ||
    project.walkthroughVideo ||
    null

  // Poster image for the video (shown before video loads / as fallback)
  const heroPoster =
    project.walkthroughs?.[0]?.poster ||
    project.walkthrough?.poster ||
    project.image

  return (
    <article>
      {/* ─── HERO — full-screen looping video ──────────────────────── */}
      <Hero
        title={project.title}
        category={project.subtitle ?? project.category}
        videoSrc={heroVideo}
        posterSrc={heroPoster}
        fallbackImage={project.image}
      />

      {/* ─── PROJECT OVERVIEW ───────────────────────────────────────── */}
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

        {/* Facts inline under overview */}
        {project.facts.length > 0 && (
          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-10 md:grid-cols-3 lg:grid-cols-4">
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
        )}
      </section>

      {/* ─── PROJECT IMAGES (continuous, no empty spaces) ───────────── */}
      {mainGallery.length > 0 && (
        <section id="gallery" className="border-t border-border">
          {exterior.length > 0 && (
            <div className="mx-auto max-w-7xl px-6 pt-12 pb-0 md:px-10 md:pt-16">
              <Reveal>
                <SectionLabel text="Photography · Exterior" />
              </Reveal>
              <ProjectGallery
                images={exterior}
                title={project.title}
                sectionId="exterior-gallery"
              />
            </div>
          )}

          {interior.length > 0 && (
            <div className="mx-auto max-w-7xl px-6 pt-10 pb-0 md:px-10 md:pt-14">
              {exterior.length > 0 && (
                <Reveal>
                  <SectionLabel text="Photography · Interior" />
                </Reveal>
              )}
              <ProjectGallery
                images={interior}
                title={project.title}
                sectionId="interior-gallery"
              />
            </div>
          )}

          {details.length > 0 && (
            <div className="mx-auto max-w-7xl px-6 pt-10 pb-0 md:px-10 md:pt-14">
              <Reveal>
                <SectionLabel text="Architectural Details" />
              </Reveal>
              <ProjectGallery
                images={details}
                title={project.title}
                sectionId="details-gallery"
              />
            </div>
          )}

          {otherImages.length > 0 && (
            <div className="mx-auto max-w-7xl px-6 pt-10 pb-0 md:px-10 md:pt-14">
              <ProjectGallery
                images={otherImages}
                title={project.title}
                sectionId="gallery-grid"
              />
            </div>
          )}

          <div className="pb-12 md:pb-16" />
        </section>
      )}

      {/* ─── SITE WORKING IMAGES (small grid) ───────────────────────── */}
      {siteImages.length > 0 && (
        <section id="on-site" className="border-t border-border bg-white/40">
          <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
            <Reveal>
              <SectionLabel text="On Site" />
              <h2 className="font-serif text-2xl font-light text-espresso md:text-3xl">
                Construction Progress
              </h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-3">
              {siteImages.map((img, i) => (
                <Reveal key={img.src} delay={(i % 5) * 0.04}>
                  <div className="relative aspect-square overflow-hidden bg-sand">
                    <Image
                      src={img.src || '/placeholder.svg'}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                    />
                  </div>
                  {img.alt && (
                    <p className="mt-1.5 text-[10px] leading-tight text-muted-foreground line-clamp-2">
                      {img.alt}
                    </p>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── REMAINING PROJECT INFO ─────────────────────────────────── */}

      {project.concept && (
        <section id="concept" className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
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
          {project.concept.points && project.concept.points.length > 0 && (
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
          )}
        </section>
      )}

      {project.features && project.features.length > 0 && (
        <section id="features" className="border-t border-border mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
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

      {project.process && project.process.length > 0 && (
        <section id="process" className="border-t border-border bg-white/40 mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
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
            <div className={project.outcome.src ? 'md:col-span-4 md:col-start-9' : 'md:col-span-8'}>
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

      {massing && (
        <section className="border-t border-border mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <SectionHeading eyebrow="Model" title="Explore the massing" lede={massing.caption} />
          <div className="mt-10">
            <ProjectWalkthrough slug={slug} title={project.title} />
          </div>
        </section>
      )}

      {/* ─── REMAINING VIDEOS ───────────────────────────────────────── */}
      {(project.walkthroughs?.length || project.walkthrough) && (
        <ThreeDWalkthrough
          id="walkthrough"
          eyebrow="3D Visualization & Walkthroughs"
          heading={
            project.walkthroughs && project.walkthroughs.length > 1
              ? `${project.title} — Walkthroughs`
              : '3D Walkthrough'
          }
          description={project.walkthrough?.description}
          walkthrough={project.walkthrough}
          walkthroughs={project.walkthroughs}
        />
      )}

      {!project.walkthroughs &&
        project.films?.map((film, index) => (
          <ThreeDWalkthrough
            key={film.video ?? film.title}
            id={index === 0 ? 'study' : `study-${index + 1}`}
            eyebrow="Visualization"
            heading={film.title}
            description={film.description}
            walkthrough={film}
          />
        ))}

      {/* ─── RELATED PROJECTS ───────────────────────────────────────── */}
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
                      <h3 className="font-serif text-2xl text-espresso">{item.title}</h3>
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

      {/* ─── CONTACT BUTTONS ────────────────────────────────────────── */}
      <section id="start" className="border-t border-border bg-ivory">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-bronze">
              Start your project
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl font-light text-espresso text-balance md:text-5xl">
              Let&apos;s create a space worth experiencing.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center bg-espresso px-8 py-3 text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-bronze"
              >
                Start Your Project
              </Link>
              <a
                href={whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center bg-[#1FAF57] px-8 py-3 text-xs uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90"
              >
                Chat on WhatsApp
              </a>
              <a
                href={email.href}
                className="inline-flex min-h-12 items-center justify-center border border-espresso/30 px-8 py-3 text-xs uppercase tracking-[0.2em] text-espresso transition-colors hover:border-bronze hover:text-bronze"
              >
                {email.display}
              </a>
              <a
                href={phones[0].href}
                className="inline-flex min-h-12 items-center justify-center border border-espresso/30 px-8 py-3 text-xs uppercase tracking-[0.2em] text-espresso transition-colors hover:border-bronze hover:text-bronze"
              >
                {phones[0].display}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  )
}

/* ─── HERO COMPONENT ──────────────────────────────────────────────── */
function Hero({
  title,
  category,
  videoSrc,
  posterSrc,
  fallbackImage,
}: {
  title: string
  category: string
  videoSrc: string | null
  posterSrc: string
  fallbackImage: string
}) {
  return (
    <section className="relative w-full overflow-hidden bg-espresso pt-[calc(env(safe-area-inset-top,0px)+4.75rem)] sm:pt-[calc(env(safe-area-inset-top,0px)+5.25rem)] md:h-[100svh] md:min-h-[500px] md:pt-0">
      {/* ── Video loop — full width below navbar on mobile ── */}
      {videoSrc ? (
        <video
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          className="block h-auto w-full md:absolute md:inset-0 md:h-full md:w-full md:object-cover md:object-top"
          aria-hidden="true"
        />
      ) : (
        <div className="relative aspect-video w-full md:absolute md:inset-0 md:aspect-auto">
          <Image
            src={fallbackImage || '/placeholder.svg'}
            alt={title}
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
        </div>
      )}

      {/* ── Gradient overlay — heavier at the top for the title ── */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/25 to-black/35" />

      {/* ── Project title — top center, below the navbar ── */}
      <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center px-6 pt-[calc(env(safe-area-inset-top,0px)+5.5rem)] text-center sm:pt-[calc(env(safe-area-inset-top,0px)+6rem)] md:pt-[calc(env(safe-area-inset-top,0px)+6.5rem)]">
        <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-ivory/80">
          {category}
        </p>
        <h1 className="font-serif text-3xl font-light text-ivory text-balance drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)] sm:text-4xl md:text-6xl lg:text-7xl">
          {title}
        </h1>
      </div>
    </section>
  )
}
