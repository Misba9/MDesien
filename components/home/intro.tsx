import { Reveal } from '@/components/reveal'

export function Intro() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-bronze">
              The Studio
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <Reveal>
            <p className="font-serif text-3xl font-light leading-[1.25] text-espresso text-balance md:text-4xl lg:text-5xl">
              M Desien is an architecture and interior design studio based in
              Madhapur, Hyderabad.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              Led by Manisha, an architect and interior designer with 15+ years
              of experience across residential, corporate and hospitality
              projects.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
