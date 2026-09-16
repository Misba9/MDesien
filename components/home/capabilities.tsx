import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { services } from '@/lib/services'

export function Capabilities() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
      <div className="grid gap-16 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <Reveal>
            <div className="relative aspect-[3/4] overflow-hidden bg-sand">
              <Image
                src="/images/detail-materials.png"
                alt="A material palette of oak, travertine, bronze and linen"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 40vw, 100vw"
              />
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7 md:pl-8">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-bronze">
              Services
            </p>
            <h2 className="mb-14 font-serif text-4xl font-light text-espresso text-balance md:text-5xl">
              Architecture, interiors and project management.
            </h2>
          </Reveal>

          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.n} delay={(i % 2) * 0.1}>
                <Link href={`/services/${s.slug}`} className="group block">
                  <div className="border-t border-border pt-5">
                    <span className="font-serif text-lg text-bronze">{s.n}</span>
                    <h3 className="mt-3 text-lg text-espresso transition-colors group-hover:text-bronze">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {s.summary}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
