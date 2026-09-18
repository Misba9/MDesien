import Link from 'next/link'
import { Reveal } from '@/components/reveal'

const principles = [
  {
    n: '01',
    title: 'Context & Climate',
    body: 'Responding to the micro-climate of Hyderabad and site context, utilizing daylight, cross-ventilation, and locally sourced materials.',
  },
  {
    n: '02',
    title: 'Function Before Form',
    body: 'Every plan and layout begins with how the space is lived and worked in, ensuring intuitive circulation, comfort, and purpose.',
  },
  {
    n: '03',
    title: 'Material Integrity',
    body: 'Honest expression of stone, wood, metal and textiles that age gracefully over decades rather than fading with transient trends.',
  },
]

export function DesignApproach() {
  return (
    <section className="border-t border-border bg-ivory py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-bronze">
                Methodology
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-serif text-3xl font-light text-espresso text-balance md:text-5xl">
                Our Design Approach
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/about"
              className="mt-4 inline-flex text-xs uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-bronze md:mt-0"
            >
              Our Philosophy &rarr;
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {principles.map((item, idx) => (
            <Reveal key={item.n} delay={idx * 0.1}>
              <div className="border-t border-border pt-8">
                <span className="font-serif text-lg text-bronze">{item.n}</span>
                <h3 className="mt-3 font-serif text-2xl text-espresso">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
