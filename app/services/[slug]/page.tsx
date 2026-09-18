import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PageIntro } from '@/components/page-intro'
import { DualCta } from '@/components/dual-cta'
import { Reveal } from '@/components/reveal'
import { Walkthrough3DSection } from '@/components/shared/walkthrough-3d-section'
import { getService, services } from '@/lib/services'
import { brand, siteUrl } from '@/lib/site'

export function generateStaticParams() {
  // Support both canonical slugs and legacy aliases
  return [
    { slug: 'architecture' },
    { slug: 'interiors' },
    { slug: 'interior-design' },
    { slug: 'project-management' },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return { title: 'Service not found' }

  const canonicalUrl = `/services/${service.slug}`

  return {
    title: `${service.title} | M Desien`,
    description: service.subtitle,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${service.title} | M Desien`,
      description: service.subtitle,
      url: `${siteUrl}${canonicalUrl}`,
      siteName: brand.name,
      images: [service.image],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | M Desien`,
      description: service.subtitle,
      images: [service.image],
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const others = services.filter((s) => s.slug !== service.slug)
  const isArchitecture = service.slug === 'architecture'
  const isInteriors = service.slug === 'interiors'
  const isProjectManagement = service.slug === 'project-management'

  return (
    <>
      {/* 1. Hero / Header */}
      <PageIntro
        eyebrow={`Services — ${service.n}`}
        title={service.title}
        description={service.subtitle}
      />

      {/* 2. Introduction & Body Content (Verbatim) */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-bronze mb-3">
                Design Philosophy & Approach
              </p>
              <h2 className="font-serif text-3xl font-light text-espresso leading-snug md:text-4xl text-balance">
                {service.title === 'Architecture' &&
                  'Architecture that responds to context, purpose and character.'}
                {service.title === 'Interior Design' &&
                  'Spaces designed around the way people live, work and experience their environment.'}
                {service.title === 'Project Management' &&
                  'Coordinated planning and execution from concept to completion.'}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                {service.body}
              </p>
            </Reveal>

            {/* Project Types List / Scope */}
            {service.projectTypes && service.projectTypes.length > 0 && (
              <div className="mt-10 border-t border-border/80 pt-8">
                <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-espresso mb-4">
                  {isProjectManagement ? 'Scope & Capabilities' : 'Project Types & Focus Areas'}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {service.projectTypes.map((type) => (
                    <div
                      key={type}
                      className="flex items-center gap-2.5 text-sm text-foreground/90 py-1"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-bronze" />
                      <span>{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-sand shadow-lg">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Reusable 3D Visualization Walkthrough Component (Integrated on Interiors) */}
      {isInteriors && (
        <Walkthrough3DSection
          eyebrow="3D Visualization & Walkthroughs"
          heading="Visualize Your Space Before It Is Built"
          subheading="M Desien creates hyper-realistic spatial renderings and walkthrough studies so every texture, light angle, and proportion can be experienced and refined before execution."
        />
      )}

      {/* 4. Service CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <DualCta />
      </section>

      {/* 5. Other Services Navigation */}
      <section className="border-t border-border bg-white/60 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <h2 className="mb-10 font-serif text-3xl font-light text-espresso">
            Other Services
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group border-t border-border pt-6 transition-all"
              >
                <span className="font-serif text-lg text-bronze">{s.n}</span>
                <h3 className="mt-3 font-serif text-2xl text-espresso transition-colors group-hover:text-bronze">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-bronze group-hover:text-espresso transition-colors">
                  Explore {s.title} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

