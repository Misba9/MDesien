'use client'

import { useState, useRef, useEffect } from 'react'
import { Reveal } from '@/components/reveal'

import Image from 'next/image'

export type Testimonial = {
  name: string
  initials: string
  image?: string
  quote: string
  role?: string
}

export const testimonialsData: Testimonial[] = [
  {
    name: 'Durga Prasad Mishra',
    initials: 'DM',
    image: '/testimonial/durga.jpeg',
    quote:
      "M Desien's exceptional design blends form and function, consistently exceeding expectations. Highly recommended for innovative projects.",
  },
  {
    name: 'Deepak',
    initials: 'D',
    image: '/testimonial/deepak.jpeg',
    quote:
      "M Desien's professionalism and attention to detail shine through. From concept to completion, they ensure client satisfaction. Outstanding work!",
  },
  {
    name: 'Sumit',
    initials: 'S',
    image: '/testimonial/sumit.jpeg',
    quote:
      'Exceptional design flair, M Desien seamlessly blends creativity and functionality, delivering projects that surpass expectations. Highly recommended!',
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const distance = touchStartX.current - touchEndX.current
    if (distance > 50) {
      // Swiped left -> next
      setActiveIndex((prev) => (prev + 1) % testimonialsData.length)
    } else if (distance < -50) {
      // Swiped right -> prev
      setActiveIndex((prev) =>
        prev === 0 ? testimonialsData.length - 1 : prev - 1,
      )
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <section className="border-t border-border bg-ivory py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 max-w-2xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-bronze">
              Client Perspectives
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-serif text-3xl font-light text-espresso text-balance md:text-5xl">
              Enduring trust, measured by delivered spaces.
            </h2>
          </Reveal>
        </div>

        {/* Desktop: 3-Up Restrained Cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonialsData.map((item, idx) => (
            <Reveal key={item.name} delay={idx * 0.1}>
              <div className="flex h-full flex-col justify-between border border-border/80 bg-warm-white/70 p-8 lg:p-10 shadow-[0_4px_20px_rgba(36,28,22,0.03)] transition-all duration-300 hover:border-bronze/60 hover:shadow-[0_8px_28px_rgba(36,28,22,0.06)]">
                <div>
                  {/* Subtle Quotation Motif */}
                  <span className="font-serif text-4xl text-bronze/40 leading-none select-none">
                    “
                  </span>
                  <p className="mt-2 text-base font-serif italic leading-relaxed text-espresso/90">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 border-t border-border/60 pt-6">
                  {/* Real Photo or Clean Monogram Circle Avatar */}
                  {item.image ? (
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-bronze/40 shadow-sm bg-sand">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bronze/30 bg-espresso text-ivory font-serif text-sm tracking-wider shadow-inner">
                      {item.initials}
                    </div>
                  )}
                  <div>
                    <h3 className="font-serif text-lg font-normal text-espresso">
                      {item.name}
                    </h3>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Client
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mobile: Swipeable Carousel with pagination dots */}
        <div
          className="block md:hidden overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonialsData.map((item) => (
              <div key={item.name} className="w-full shrink-0 px-1">
                <div className="flex flex-col justify-between border border-border bg-warm-white/90 p-7 shadow-sm min-h-[260px]">
                  <div>
                    <span className="font-serif text-3xl text-bronze/40 leading-none select-none">
                      “
                    </span>
                    <p className="mt-2 text-base font-serif italic leading-relaxed text-espresso/90">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-3.5 border-t border-border/60 pt-5">
                    {item.image ? (
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-bronze/40 shadow-sm bg-sand">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bronze/30 bg-espresso text-ivory font-serif text-xs tracking-wider">
                        {item.initials}
                      </div>
                    )}
                    <div>
                      <h3 className="font-serif text-base font-normal text-espresso">
                        {item.name}
                      </h3>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        Client
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Indicators */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonialsData.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setActiveIndex(i)}
                className={`h-2 transition-all duration-300 rounded-full ${
                  activeIndex === i ? 'w-6 bg-bronze' : 'w-2 bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
