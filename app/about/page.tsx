import type { Metadata } from 'next'
import Image from 'next/image'
import { PageIntro } from '@/components/page-intro'
import { Reveal } from '@/components/reveal'
import { brand } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'M Desien is led by Manisha, an architect and interior designer with 15+ years of experience. Studio based in Madhapur, Hyderabad.',
  alternates: { canonical: '/about' },
}

const values = [
  {
    n: '01',
    title: 'Functional & Safe',
    body: 'Spaces planned so they work well for the people who use them, with safety treated as a given.',
  },
  {
    n: '02',
    title: 'Sustainable',
    body: 'Choices that consider how a project is built and how it will last, without overstating what we can claim.',
  },
  {
    n: '03',
    title: 'Aesthetically Pleasing',
    body: 'Colour, materials and finishes composed so a space feels considered and good to be in.',
  },
  {
    n: '04',
    title: 'Well Budgeted',
    body: 'Design that respects the budget agreed for the project, so intent and cost stay aligned.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        title="Who we are."
        description="M Desien is an architecture and interior design studio based in Madhapur, Hyderabad."
      />

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden bg-sand">
            <Image
              src="/images/about-studio.png"
              alt={`${brand.name} studio interior`}
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
                Who We Are
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal>
              <p className="font-serif text-3xl font-light leading-[1.25] text-espresso text-balance md:text-4xl">
                M Desien is led by Manisha, an architect and interior designer.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
                She brings 15+ years of experience across residential, corporate
                and hospitality projects. The studio is based in Madhapur,
                Hyderabad.
              </p>
            </Reveal>
            {/* Leadership bio, team list, and project history: not yet supplied — leave empty rather than invent. */}
          </div>
        </div>
      </section>

      <section className="bg-white/60 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <p className="mb-12 text-xs uppercase tracking-[0.3em] text-bronze">
              Philosophy
            </p>
          </Reveal>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.n} delay={i * 0.08}>
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
                Residential, corporate and hospitality work, from a studio in
                Madhapur.
              </p>
            </Reveal>
            {/* Process/timeline copy: omit until confirmed. Do not invent dates or history. */}
          </div>
        </div>
      </section>
    </>
  )
}
