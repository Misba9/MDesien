import type { Metadata } from 'next'
import Image from 'next/image'
import { PageIntro } from '@/components/page-intro'
import { Reveal } from '@/components/reveal'
import { DualCta } from '@/components/dual-cta'
import { brand, siteUrl } from '@/lib/site'
import { siteImages } from '@/lib/site-images'

export const metadata: Metadata = {
  title: 'About',
  description:
    'M Desien is an Architecture and Interior Design Studio in Madhapur, Hyderabad, led by Manisha with 15+ years of experience across residential, corporate and hospitality projects.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About | M Desien',
    description:
      'M Desien is an Architecture and Interior Design Studio in Madhapur, Hyderabad, led by Manisha with 15+ years of experience across residential, corporate and hospitality projects.',
    url: `${siteUrl}/about`,
    siteName: brand.name,
    images: [siteImages.about],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | M Desien',
    description:
      'M Desien is an Architecture and Interior Design Studio in Madhapur, led by Manisha with 15+ years of experience across residential, corporate and hospitality projects.',
    images: [siteImages.about],
  },
}

const philosophyValues = [
  {
    n: '01',
    title: 'Functional & Safe',
    body: 'Spaces planned so they work well for the people who use them, with safety treated as a non-negotiable foundation.',
  },
  {
    n: '02',
    title: 'Sustainable',
    body: 'Choices that prioritize longevity, locally available materials, and environmental balance without overstating claims.',
  },
  {
    n: '03',
    title: 'Aesthetically Pleasing',
    body: 'Colour palettes, materials and textures composed in harmony so a space feels considered, calm, and enduring.',
  },
  {
    n: '04',
    title: 'Well Budgeted',
    body: 'Disciplined design coordination and material sourcing that keeps intent and client expenditure strictly aligned.',
  },
]

const experienceAreas = [
  {
    title: 'Residential Architecture & Interiors',
    desc: 'Thoughtfully designed homes, bespoke villas and luxury residences that reflect the people who inhabit them. We bring together aesthetics, functionality and a keen understanding of lifestyle to create spaces that feel personal, comfortable and timeless.',
  },
  {
    title: 'Corporate Workplaces',
    desc: 'Workspaces designed to inspire ideas, encourage collaboration and enhance productivity. From contemporary offices to distinctive corporate environments, we create spaces that balance functionality, comfort and brand identity.',
  },
  {
    title: 'Hospitality Environments',
    desc: 'Distinctive hospitality spaces that leave a lasting impression. From boutique hotels and intimate dining spaces to inviting retreats, we create immersive environments where thoughtful design, ambience and attention to detail come together to enrich every experience.',
  },
  {
    title: 'Construction & Project Management',
    desc: 'Turning design vision into built reality through thoughtful planning and hands-on execution. With a strong foundation in construction and project coordination, we bring together design intent, technical expertise, quality craftsmanship and efficient project management to ensure every detail is delivered with care.',
  },
]

const whyChooseReasons = [
  {
    n: '01',
    title: '15+ Years Industry Experience',
    desc: 'Deep domain expertise navigating complex design briefs, statutory requirements, and challenging site conditions across India.',
  },
  {
    n: '02',
    title: 'Collaborative Team of Professionals',
    desc: 'Manisha leads a multidisciplinary team of architects, interior designers, 3D visualizers, and project managers committed to precision.',
  },
  {
    n: '03',
    title: 'End-to-End Project Discipline',
    desc: 'Comprehensive oversight from initial concept and hyper-realistic 3D walkthroughs to vendor sourcing, contractor coordination, and handover.',
  },
  {
    n: '04',
    title: 'Focus on Function & Sustainability',
    desc: 'A commitment to timeless spaces that balance practicality, climate-responsive principles, and refined material honesty.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <PageIntro
        eyebrow="About M Desien"
        title="Who We Are"
        description="An architecture and interior design studio based in Madhapur, Hyderabad, dedicated to spaces designed with purpose, functionality and timeless character."
      />

      {/* Hero Visual Asset */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden bg-sand border border-border">
            <Image
              src={siteImages.about}
              alt="Living room with a blue sofa, plants and a dark wall"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 1200px, 100vw"
              priority
            />
          </div>
        </Reveal>
      </section>

      {/* 2. About M Desien & 3. Founder / Leadership */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div>
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
            <Reveal>
              <div className="flex flex-col items-start gap-5">
                <Image
                  src="/logo.png"
                  alt="M Desien Architecture & Interior Design Studio"
                  width={1114}
                  height={721}
                  className="h-auto w-[14rem] object-contain md:w-[18rem]"
                  sizes="(min-width: 768px) 288px, 224px"
                />
                <p className="text-xs uppercase tracking-[0.3em] text-bronze">
                  Leadership
                </p>
              </div>
            </Reveal>
            </div>
            <div className="md:col-span-8">
            <Reveal>
              <h2 className="text-balance">
                <span className="block font-sans text-xl font-medium text-espresso md:text-2xl">
                  M Desien
                </span>
                <span className="mt-3 block font-serif text-3xl font-light leading-[1.25] text-espresso md:text-4xl">
                  Designing spaces that feel personal,
                  <br className="hidden sm:block" /> meaningful and timeless.
                </span>
                <span className="mt-5 block font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
                  Architecture &amp; Interior Design Studio - Madhapur,
                  <br className="hidden sm:block" /> Hyderabad
                </span>
              </h2>
            </Reveal>
            </div>
          </div>
          <div className="mt-10 md:mt-12">
            <Reveal delay={0.08}>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
                At M Desien, we believe every space has a story to tell, and every design begins with understanding the people who will live, work and create memories in it.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Founded and led by Manisha, an architect and interior designer with over 15 years of experience, M Desien is a design studio based in Madhapur, Hyderabad. What drives the studio is a genuine passion for creating spaces that are not just beautiful, but also thoughtful, functional and deeply personal.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              With a strong understanding of architecture, construction and project coordination, Manisha brings together creative vision and practical experience. She believes that good design is not just about how a space looks, but also about how effortlessly it works and how it makes people feel.
              </p>
            </Reveal>
             <Reveal delay={0.12}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Supported by a dedicated team of design professionals and engineers, M Desien takes every project from the first conversation and initial idea through design development and on-site execution, ensuring that every detail comes together as envisioned.

              </p>
            </Reveal>
             <Reveal delay={0.12}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                For us, every project is a collaboration, every space is an opportunity, and every detail matters. Our aim is simple - to create spaces that feel right, reflect the people they belong to and stand the test of time.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. Experience */}
      <section className="border-t border-border bg-white/60 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-14 max-w-2xl">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-bronze">
                Portfolio Scope
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-serif text-3xl font-light text-espresso md:text-4xl">
                Experience Across Sectors
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {experienceAreas.map((area, idx) => (
              <Reveal key={area.title} delay={idx * 0.08}>
                <div className="flex h-full flex-col border-t border-border pt-6">
                  <h3 className="font-serif text-2xl text-espresso">
                    {area.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {area.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Design Philosophy */}
      <section className="border-t border-border bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-14 max-w-2xl">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-bronze">
                Foundations
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-serif text-3xl font-light text-espresso md:text-4xl">
                Our Design Philosophy
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {philosophyValues.map((v, i) => (
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

      {/* 6. Approach */}
      <section className="border-t border-border bg-sand/20 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.3em] text-bronze">
                  Methodology
                </p>
                <h2 className="mt-3 font-serif text-3xl font-light text-espresso md:text-4xl">
                  Our Approach
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <Reveal>
                <p className="font-serif text-2xl font-light leading-relaxed text-espresso md:text-3xl text-balance">
                  Architecture and interior environments shaped around human experience, practical utility, and material restraint.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                  Every commission begins with careful listening — understanding the client’s lifestyle, functional requirements, site orientation, and financial framework. We then advance through iterative spatial massing, detailed 3D visualization, material selection, and rigorous execution management.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why Choose M Desien */}
      <section className="border-t border-border bg-white/60 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-14 max-w-2xl">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-bronze">
                Studio Standards
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-serif text-3xl font-light text-espresso md:text-4xl">
                Why Choose M Desien
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseReasons.map((item, idx) => (
              <Reveal key={item.n} delay={idx * 0.08}>
                <div className="border-t border-border pt-6">
                  <span className="font-serif text-lg text-bronze">{item.n}</span>
                  <h3 className="mt-3 font-serif text-2xl text-espresso">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="border-t border-border bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <DualCta />
        </div>
      </section>
    </>
  )
}
