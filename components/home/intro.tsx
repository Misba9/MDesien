import Image from 'next/image'
import { Reveal } from '@/components/reveal'

export function Intro() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
      {/* Leadership */}
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
  )
}
