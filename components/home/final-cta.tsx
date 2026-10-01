import Image from 'next/image'
import { DualCta } from '@/components/dual-cta'
import { Reveal } from '@/components/reveal'
import { siteImages } from '@/lib/site-images'

export function FinalCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[70svh]">
        <Image
          src={siteImages.feature}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-espresso/55" />
        <div className="relative mx-auto grid min-h-[70svh] max-w-7xl items-center gap-10 px-6 py-24 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16 md:px-10">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-ivory/80">
              Work with us
            </p>
            <h2 className="max-w-4xl font-serif text-4xl font-light leading-[1.05] text-balance text-ivory md:text-6xl lg:text-7xl">
              Let&apos;s create a space worth experiencing.
            </h2>
            <div className="mt-10">
              <DualCta variant="light" lead="contact" />
            </div>
          </Reveal>
          <Image
            src="/logo-mark.png"
            alt="M Desien"
            width={657}
            height={482}
            className="order-first h-24 w-auto object-contain md:order-last md:h-44 lg:h-56"
          />
        </div>
      </div>
    </section>
  )
}
