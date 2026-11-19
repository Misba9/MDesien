import Image from 'next/image'
import { Reveal } from '@/components/reveal'

export function Intro() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
      {/* Leadership */}
      <div className="grid gap-12 md:grid-cols-12">
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
            <h2 className="font-serif text-3xl font-light leading-[1.25] text-espresso text-balance md:text-4xl">
            M Desien is an Architecture and Interior Design Studio in Madhapur.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
            M Desien is led by Manisha, an architect and interior designer with over 15 years of industry experience and based in Madhapur,
              Hyderabad, the studio works with a dedicated team of design
              professionals and engineers to deliver comprehensive architecture,
              interior design, and project management solutions.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              With a strong background in construction and project coordination,
              Manisha bridges creative vision with rigorous on-site execution,
              ensuring that architectural concepts translate cleanly into built
              reality.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
