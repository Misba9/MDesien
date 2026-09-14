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
              We are a small studio with a simple conviction — that architecture
              should feel inevitable. Every project begins with the specific: a
              site, a light, a way of living.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              From private residences to hospitality and workplace, our work is
              united not by a style but by a discipline of restraint. We design
              with materials that age gracefully and details that reward a second
              look.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
