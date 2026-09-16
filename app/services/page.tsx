import type { Metadata } from 'next'
import Link from 'next/link'
import { PageIntro } from '@/components/page-intro'
import { Reveal } from '@/components/reveal'
import { services } from '@/lib/services'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'M Desien services: architecture, interior design and project management from our studio in Madhapur, Hyderabad.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Services"
        title="What we do."
        description="Architecture, interior design and project management from a studio in Madhapur, Hyderabad."
      />

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-36">
        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col bg-ivory p-8 transition-colors hover:bg-white md:p-10"
              >
                <span className="font-serif text-lg text-bronze">{s.n}</span>
                <h2 className="mt-4 font-serif text-3xl font-light text-espresso">
                  {s.title}
                </h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.summary}
                </p>
                <span className="mt-8 text-xs uppercase tracking-[0.2em] text-foreground/70 transition-colors group-hover:text-bronze">
                  Learn more &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
