'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { siteImages } from '@/lib/site-images'

const slides = siteImages.carousel

export function HomeCarousel() {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, 5500)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  const go = (next: number) => {
    setIndex((next + slides.length) % slides.length)
  }

  return (
    <section className="bg-ivory pb-6 md:pb-10" aria-roledescription="carousel" aria-label="Gallery">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-bronze">Gallery</p>
        <div className="relative aspect-[16/10] overflow-hidden bg-sand md:aspect-[16/8]">
          {slides.map((slide, i) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              aria-hidden={i !== index}
              className={`object-cover transition-opacity duration-700 ${
                i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
              sizes="(min-width: 1280px) 1120px, 100vw"
            />
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`Show image ${i + 1} of ${slides.length}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => go(i)}
                className={`h-px transition-all ${
                  i === index ? 'w-10 bg-espresso' : 'w-6 bg-espresso/30'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-5 text-xs uppercase tracking-[0.2em] text-espresso">
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(index - 1)}
              className="transition-colors hover:text-bronze"
            >
              Prev
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(index + 1)}
              className="transition-colors hover:text-bronze"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
