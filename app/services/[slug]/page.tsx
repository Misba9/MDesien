import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageIntro } from '@/components/page-intro'
import { DualCta } from '@/components/dual-cta'
import { getService, services } from '@/lib/services'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return { title: 'Service not found' }
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
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

  const others = services.filter((s) => s.slug !== slug)

  return (
    <>
      <PageIntro
        eyebrow={`Services — ${service.n}`}
        title={service.title}
        description={service.summary}
      />

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        {/* Extended service process copy: add only when confirmed. */}
        <div className="mt-4">
          <DualCta />
        </div>
      </section>

      <section className="border-t border-border bg-white/60 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <h2 className="mb-10 font-serif text-3xl font-light text-espresso">
            Other services
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group border-t border-border pt-6"
              >
                <span className="font-serif text-lg text-bronze">{s.n}</span>
                <h3 className="mt-3 font-serif text-2xl text-espresso transition-colors group-hover:text-bronze">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
