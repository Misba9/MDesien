import type { Metadata } from 'next'
import Image from 'next/image'
import { PageIntro } from '@/components/page-intro'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'M Design is an architecture and interior studio built on restraint, honest materials and long-life thinking.',
}

const values = [
  {
    n: '01',
    title: 'Restraint',
    body: 'We add nothing that does not earn its place. The most memorable move is often the quietest one.',
  },
  {
    n: '02',
    title: 'Material honesty',
    body: 'Stone, timber, plaster and bronze, left to age and speak for themselves rather than imitate.',
  },
  {
    n: '03',
    title: 'Longevity',
    body: 'We design for the decades ahead — buildings people love enough to keep and repair.',
  },
]

const timeline = [
  { year: '2012', text: 'Studio founded around a single residential commission.' },
  { year: '2016', text: 'First hospitality project completed; team grows to eight.' },
  { year: '2020', text: 'Workplace and master-planning added to the practice.' },
  { year: '2024', text: 'Twelve years, three cities, a body of considered work.' },
]

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="The Studio"
        title="A small studio with a simple conviction."
        description="That architecture should feel inevitable. We are a team of architects and interior designers working across residential, hospitality and workplace."
      />

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden bg-sand">
            <Image
              src="/images/about-studio.png"
              alt="The M Design studio interior"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 1200px, 100vw"
            />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-bronze">
                Approach
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal>
              <p className="font-serif text-3xl font-light leading-[1.25] text-espresso text-balance md:text-4xl">
                Every project begins with the specific — a site, a light, a way
                of living — and ends with the precise.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
                We keep the studio deliberately small so that the same hands
                that draw the first sketch are there for the final walk-through.
                It is slower. It is also the only way we know to make work that
                holds together.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white/60 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.n} delay={i * 0.1}>
                <div className="border-t border-border pt-6">
                  <span className="font-serif text-lg text-bronze">{v.n}</span>
                  <h3 className="mt-3 font-serif text-2xl text-espresso">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <h2 className="mb-12 font-serif text-4xl font-light text-espresso md:text-5xl">
            A short history
          </h2>
        </Reveal>
        <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.08}>
              <div className="h-full bg-ivory p-8">
                <p className="font-serif text-4xl text-bronze">{t.year}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {t.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
