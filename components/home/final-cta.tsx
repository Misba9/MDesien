import Image from 'next/image'
import { LogoMark } from '@/components/site-logo'
import { DualCta } from '@/components/dual-cta'
import { Reveal } from '@/components/reveal'

export function FinalCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[70svh]">
        <Image
          src="/images/about-studio.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-espresso/55" />
        <div className="relative mx-auto flex min-h-[70svh] max-w-7xl flex-col items-start justify-center px-6 py-24 md:px-10">
          <Reveal>
            <LogoMark variant="light" className="mb-6 h-12 w-auto opacity-90 md:h-14" />
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
        </div>
      </div>
    </section>
  )
}
