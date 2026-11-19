'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type HeroProps = {
  videoSrc: string
  poster: string
  posterAlt?: string
}

function HeroMedia({
  reduceMotion,
  videoSrc,
  poster,
  posterAlt = 'Architectural space walkthrough',
}: {
  reduceMotion: boolean | null
} & HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (reduceMotion) return

    const video = videoRef.current
    if (!video) return

    video.muted = true
    const play = () => {
      void video.play().catch(() => {})
    }

    if (video.readyState >= 2) play()
    video.addEventListener('canplay', play)

    return () => video.removeEventListener('canplay', play)
  }, [reduceMotion, videoSrc])

  if (reduceMotion) {
    return (
      <Image
        src={poster}
        alt={posterAlt}
        width={1920}
        height={1080}
        priority
        className="block h-auto w-full md:absolute md:inset-0 md:h-full md:w-full md:object-cover md:object-top"
        sizes="100vw"
      />
    )
  }

  return (
    <video
      ref={videoRef}
      className="block h-auto w-full md:absolute md:inset-0 md:h-full md:w-full md:object-cover md:object-top"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      aria-label={posterAlt}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  )
}

export function Hero({ videoSrc, poster, posterAlt }: HeroProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="relative w-full overflow-hidden bg-espresso pt-[calc(env(safe-area-inset-top,0px)+4.75rem)] sm:pt-[calc(env(safe-area-inset-top,0px)+5.25rem)] md:h-[100svh] md:min-h-[500px] md:pt-0"
    >
      <div className="relative w-full md:absolute md:inset-0">
        <HeroMedia
          reduceMotion={reduceMotion}
          videoSrc={videoSrc}
          poster={poster}
          posterAlt={posterAlt}
        />
        {/* Desktop only: veil under the floating header */}
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-b from-espresso/40 via-transparent to-transparent md:block" />
      </div>

      {/* Minimal scroll cue */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: reduceMotion ? 0 : 0.8,
          duration: reduceMotion ? 0 : 0.9,
        }}
        className="pointer-events-none absolute bottom-8 right-6 hidden items-center gap-3 md:flex md:right-10"
        aria-hidden
      >
        <span className="text-xs uppercase tracking-[0.2em] text-ivory/70">
          Scroll
        </span>
        <span className="h-10 w-px bg-ivory/40" />
      </motion.div>
    </section>
  )
}
