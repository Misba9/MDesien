'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import type { NormalizedGalleryImage } from '@/lib/projects'

function groupImages(images: NormalizedGalleryImage[]) {
  const hasCategory = images.some((image) => image.category)
  if (!hasCategory) {
    return [{ category: undefined as string | undefined, images }]
  }

  const order: string[] = []
  const groups = new Map<string, NormalizedGalleryImage[]>()
  for (const image of images) {
    const key = image.category || 'Gallery'
    if (!groups.has(key)) {
      groups.set(key, [])
      order.push(key)
    }
    groups.get(key)?.push(image)
  }

  return order.map((category) => ({
    category,
    images: groups.get(category) ?? [],
  }))
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
  const groups = groupImages(images)

  const go = (direction: -1 | 1) => {
    setActive((current) => {
      if (current === null || images.length === 0) return current
      return (current + direction + images.length) % images.length
    })
  }

  useEffect(() => {
    if (active === null) return

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
    }
  }, [active, images.length])

  return (
    <>
      <div id={sectionId} className="space-y-14">
        {heading && (
          <h2 className="font-serif text-3xl font-light text-espresso md:text-4xl">
            {heading}
          </h2>
        )}
        {groups.map((group) => (
          <div key={group.category ?? 'gallery'}>
            {!heading && group.category && (
              <h2 className="mb-6 font-serif text-3xl font-light text-espresso md:text-4xl">
                {group.category}
              </h2>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {group.images.map((image, groupIndex) => {
                const index = images.indexOf(image)
                const landscape = image.aspect === 'landscape'
                const lead =
                  landscape && groupIndex === 0 && group.images.length > 2
                const offset = group.images.length === 2 && groupIndex === 1
                return (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={image.alt}
                    data-cursor="hover"
                    className={`group relative block overflow-hidden bg-sand ${
                      lead ? 'sm:col-span-2' : ''
                    } ${offset ? 'sm:mt-10 lg:mt-16' : ''}`}
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
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && images[active] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-espresso p-4 md:p-10"
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
            aria-label={`${title} gallery`}
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                setActive(null)
              }}
              className="absolute right-6 top-6 z-10 text-xs uppercase tracking-[0.2em] text-ivory"
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
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 px-2 py-3 text-xs uppercase tracking-[0.2em] text-ivory"
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
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 px-2 py-3 text-xs uppercase tracking-[0.2em] text-ivory"
                >
                  Next
                </button>
              </>
            )}
            <motion.div
              key={images[active].src}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[80svh] w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={images[active].src || '/placeholder.svg'}
                alt={images[active].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>
            <p className="absolute bottom-6 left-0 right-0 text-center text-[10px] uppercase tracking-[0.2em] text-ivory/70">
              {active + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
