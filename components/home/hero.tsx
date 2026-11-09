'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const HERO_POSTER = '/walkthrough-videos/walkthrough-2.jpg'
const HERO_VIDEO_SRC = '/walkthrough-videos/walkthrough-2.mp4'

function HeroMedia({ reduceMotion }: { reduceMotion: boolean | null }) {
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
  }, [reduceMotion])

  if (reduceMotion) {
    return (
      <Image
        src={HERO_POSTER}
        alt="Architectural space walkthrough"
        fill
        priority
        className="object-contain object-center"
        sizes="100vw"
      />
    )
  }

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-contain object-center bg-espresso"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={HERO_POSTER}
      aria-label="Architectural space walkthrough"
    >
      <source src={HERO_VIDEO_SRC} type="video/mp4" />
    </video>
  )
}

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative bg-espresso">
      <div className="relative flex h-[100svh] items-center overflow-hidden bg-espresso md:items-end">
        <div className="absolute inset-0 overflow-hidden">
          <HeroMedia reduceMotion={reduceMotion} />
          {/* Subtle top veil so the fixed header sits on the media */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-espresso/40 via-transparent to-transparent" />
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
      </div>
    </section>
  )
}
