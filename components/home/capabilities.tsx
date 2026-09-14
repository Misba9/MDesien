import Image from 'next/image'
import { Reveal } from '@/components/reveal'

const services = [
  {
    n: '01',
    title: 'Architecture',
    body: 'From concept to completion — residential, hospitality and workplace buildings shaped by site and light.',
  },
  {
    n: '02',
    title: 'Interior Design',
    body: 'Considered interiors with a residential ease, built on honest materials and precise detailing.',
  },
  {
    n: '03',
    title: 'Master Planning',
    body: 'Long-life thinking for larger sites — orientation, landscape and the movement between spaces.',
  },
  {
    n: '04',
    title: 'Furniture & Detail',
    body: 'Bespoke joinery, lighting and objects designed to complete a space, down to the door handle.',
  },
]

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
              What we do
            </p>
            <h2 className="mb-14 font-serif text-4xl font-light text-espresso text-balance md:text-5xl">
              A single studio, from first sketch to final detail.
            </h2>
          </Reveal>

          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.n} delay={(i % 2) * 0.1}>
                <div className="border-t border-border pt-5">
                  <span className="font-serif text-lg text-bronze">{s.n}</span>
                  <h3 className="mt-3 text-lg text-espresso">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
