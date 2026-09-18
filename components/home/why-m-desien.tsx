import Link from 'next/link'
import { Reveal } from '@/components/reveal'

const reasons = [
  {
    n: '01',
    title: '15+ Years Leadership',
    body: 'Led by Manisha, bringing over a decade and a half of verified architectural and interior design mastery across residential, commercial, and hospitality spaces.',
  },
  {
    n: '02',
    title: 'End-to-End Coherence',
    body: 'From conceptual massing and hyper-realistic 3D walkthroughs to material procurement, statutory coordination, and final on-site handover.',
  },
  {
    n: '03',
    title: 'Functional & Safe',
    body: 'Rigorous adherence to building codes, functional spatial planning, and life safety, ensuring spaces that protect and serve their occupants.',
  },
  {
    n: '04',
    title: 'Disciplined Budgeting',
    body: 'Transparent estimation and timeline discipline that aligns client investment with impeccable material execution and craft.',
  },
]

export function WhyMDesien() {
  return (
    <section className="border-t border-border bg-sand/20 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 max-w-2xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-bronze">
              The Studio Standard
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-serif text-3xl font-light text-espresso text-balance md:text-5xl">
              Why M Desien
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              A studio philosophy anchored in restraint, contextual awareness, and
              uncompromising execution standards.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item, idx) => (
            <Reveal key={item.n} delay={idx * 0.08}>
              <div className="flex h-full flex-col border-t border-border bg-ivory/60 p-7 shadow-sm transition-all duration-300 hover:border-bronze hover:bg-ivory">
                <span className="font-serif text-lg text-bronze">{item.n}</span>
                <h3 className="mt-4 font-serif text-2xl text-espresso">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
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
