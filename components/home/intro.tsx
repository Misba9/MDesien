import Image from 'next/image'
import { Reveal } from '@/components/reveal'

export function Intro() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
      <div className="grid items-start gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
        <div className="md:col-span-4">
          <Reveal>
            <div className="flex flex-col items-center gap-4 md:items-start md:gap-5">
              <Image
                src="/logo.png"
                alt="M Desien Architecture & Interior Design Studio"
                width={1114}
                height={721}
                className="h-auto w-[min(100%,14.5rem)] object-contain sm:w-[16.5rem] md:w-[18.75rem] lg:w-[21rem]"
                sizes="(min-width: 1024px) 336px, (min-width: 768px) 300px, (min-width: 640px) 264px, 232px"
              />
              <p className="text-xs uppercase tracking-[0.3em] text-bronze">
                The Studio
              </p>
            </div>
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
