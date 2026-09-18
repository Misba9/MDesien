import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageIntro } from '@/components/page-intro'
import { Reveal } from '@/components/reveal'
import { DualCta } from '@/components/dual-cta'
import { services } from '@/lib/services'
import { brand, siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'M Desien provides architecture, interior design and project management solutions with a focus on functionality, sustainability, aesthetics and practical execution.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Our Services | M Desien',
    description:
      'M Desien provides architecture, interior design and project management solutions with a focus on functionality, sustainability, aesthetics and practical execution.',
    url: `${siteUrl}/services`,
    siteName: brand.name,
    images: ['/images/hero-home.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | M Desien',
    description:
      'M Desien provides architecture, interior design and project management solutions with a focus on functionality, sustainability, aesthetics and practical execution.',
    images: ['/images/hero-home.png'],
  },
}

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Capabilities"
        title="Our Services"
        description="M Desien provides architecture, interior design and project management solutions with a focus on functionality, sustainability, aesthetics and practical execution."
      />

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-36">
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.1}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden border border-border bg-ivory transition-all duration-500 hover:border-bronze hover:shadow-[0_12px_32px_rgba(36,28,22,0.08)]"
              >
                {/* Visual Image Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-espresso/20 transition-opacity group-hover:opacity-10" />
                  <span className="absolute top-4 left-4 border border-ivory/40 bg-espresso/75 px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-ivory backdrop-blur-sm">
                    {s.n}
                  </span>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-8 md:p-9">
                  <h2 className="font-serif text-3xl font-light text-espresso transition-colors group-hover:text-bronze">
                    {s.title}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {s.summary}
                  </p>

                  <div className="mt-8 flex items-center justify-between border-t border-border/80 pt-6">
                    <span className="text-xs uppercase tracking-[0.2em] font-medium text-espresso group-hover:text-bronze transition-colors">
                      Explore Service
                    </span>
                    <span className="text-bronze transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <DualCta />
        </div>
      </section>
    </>
  )
}

