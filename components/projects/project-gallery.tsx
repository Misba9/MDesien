'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { NormalizedGalleryImage } from '@/lib/projects'

/** One continuous stream so the next room fills any open column. */
function withCategoryLabels(images: NormalizedGalleryImage[]) {
  const hasCategory = images.some((image) => image.category)
  if (!hasCategory) {
    return images.map((image) => ({ image, showCategory: false as boolean }))
  }

  let previous: string | undefined
  return images.map((image) => {
    const key = image.category || 'Gallery'
    const showCategory = key !== previous
    previous = key
    return { image, showCategory }
  })
}

export function ProjectGallery({
  images,
  title,
  heading,
  sectionId,
}: {
  images: NormalizedGalleryImage[]
  title: string
  heading?: string
  sectionId?: string
}) {
  const [active, setActive] = useState<number | null>(null)
  const touchX = useRef<number | null>(null)
  const swiped = useRef(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()
  const labelId = useId()
  const items = withCategoryLabels(images)
  // Full-bleed first image only when the rest still pack into even columns
  const leadFirst =
    images.length > 2 &&
    images[0]?.aspect === 'landscape' &&
    (images.length - 1) % 2 === 0

  const go = (direction: -1 | 1) => {
    setActive((current) => {
      if (current === null || images.length === 0) return current
      return (current + direction + images.length) % images.length
    })
  }

  useEffect(() => {
    if (active === null) return

    lastFocus.current = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null)
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault()
        const direction = event.key === 'ArrowRight' ? 1 : -1
        setActive((current) => {
          if (current === null || images.length === 0) return current
          return (current + direction + images.length) % images.length
        })
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
      lastFocus.current?.focus?.()
    }
  }, [active, images.length])

  const current = active !== null ? images[active] : null

  return (
    <>
      <div id={sectionId}>
        {heading && (
          <h2 className="mb-8 font-serif text-3xl font-light text-espresso md:mb-10 md:text-4xl">
            {heading}
          </h2>
        )}
        <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 sm:gap-6">
          {items.map(({ image, showCategory }, index) => {
            const landscape = image.aspect === 'landscape'
            const lead = index === 0 && leadFirst
            return (
              <div
                key={image.src}
                className={lead ? 'sm:col-span-2' : undefined}
              >
                {!heading && showCategory && image.category && (
                  <h2 className="mb-3 font-serif text-2xl font-light text-espresso md:mb-4 md:text-3xl">
                    {image.category}
                  </h2>
                )}
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Open gallery: ${image.alt}`}
                  data-cursor="hover"
                  className="group relative block w-full overflow-hidden bg-sand outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-ivory"
                >
                  <div
                    className={`relative overflow-hidden ${
                      lead
                        ? 'aspect-[16/10]'
                        : landscape
                          ? 'aspect-[4/3]'
                          : 'aspect-[3/4]'
                    }`}
                  >
                    <Image
                      src={image.src || '/placeholder.svg'}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes={
                        lead
                          ? '(min-width: 640px) 90vw, 100vw'
                          : '(min-width: 640px) 45vw, 100vw'
                      }
                    />
                    <div className="pointer-events-none absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/10" />
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {current && active !== null && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35 }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-espresso/95 p-4 backdrop-blur-sm md:p-10"
            onClick={() => {
              if (swiped.current) {
                swiped.current = false
                return
              }
              setActive(null)
            }}
            onTouchStart={(event) => {
              touchX.current = event.changedTouches[0]?.clientX ?? null
            }}
            onTouchEnd={(event) => {
              if (touchX.current === null) return
              const endX = event.changedTouches[0]?.clientX
              if (endX === undefined) return
              const delta = endX - touchX.current
              touchX.current = null
              if (Math.abs(delta) < 40) return
              swiped.current = true
              go(delta > 0 ? -1 : 1)
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                setActive(null)
              }}
              className="absolute right-5 top-5 z-10 text-xs uppercase tracking-[0.2em] text-ivory/90 transition-colors hover:text-ivory md:right-8 md:top-8"
            >
              Close
            </button>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(event) => {
                    event.stopPropagation()
                    go(-1)
                  }}
                  className="absolute left-2 top-1/2 z-10 -translate-y-1/2 px-3 py-4 text-xs uppercase tracking-[0.2em] text-ivory/80 transition-colors hover:text-ivory md:left-6"
                >
                  Prev
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(event) => {
                    event.stopPropagation()
                    go(1)
                  }}
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 px-3 py-4 text-xs uppercase tracking-[0.2em] text-ivory/80 transition-colors hover:text-ivory md:right-6"
                >
                  Next
                </button>
              </>
            )}
            <motion.div
              key={current.src}
              initial={
                reduceMotion ? false : { scale: 0.97, opacity: 0 }
              }
              animate={{ scale: 1, opacity: 1 }}
              exit={reduceMotion ? undefined : { scale: 0.97, opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative h-[72svh] w-full max-w-5xl md:h-[80svh]"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={current.src || '/placeholder.svg'}
                alt={current.alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>
            <div
              id={labelId}
              className="mt-5 max-w-xl px-4 text-center"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-ivory/55">
                {active + 1} / {images.length}
                {current.category ? ` · ${current.category}` : ''}
              </p>
              {current.alt && (
                <p className="mt-2 text-sm leading-relaxed text-ivory/85">
                  {current.alt}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
