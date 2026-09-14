'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

export function ProjectGallery({
  images,
  title,
}: {
  images: string[]
  title: string
}) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            data-cursor="hover"
            className={`group relative overflow-hidden bg-sand ${
              i % 3 === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/5]'
            }`}
          >
            <Image
              src={src || '/placeholder.svg'}
              alt={`${title} — view ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-espresso/90 p-6"
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-6 top-6 text-xs uppercase tracking-[0.2em] text-ivory"
            >
              Close
            </button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[3/2] w-full max-w-5xl"
            >
              <Image
                src={images[active] || '/placeholder.svg'}
                alt={`${title} — enlarged view`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
