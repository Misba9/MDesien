'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-espresso md:items-end">
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover object-[center_38%] md:object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-home.png"
          aria-label="Contemporary villa at dusk with illuminated interiors and a reflecting pool"
        >
          <source src="/herosection-video.mp4" type="video/mp4" />
        </video>
        {/* Light top veil so the fixed header sits on the media */}
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/25 via-transparent to-transparent md:from-espresso/30" />
        {/* Stronger bottom wash for type readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/92 via-espresso/35 to-transparent md:from-espresso/85 md:via-espresso/20" />
        {/* Desktop left wash for editorial type */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-espresso/50 via-espresso/15 to-transparent md:block" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-10 pt-[5rem] sm:px-6 sm:pb-12 md:px-10 md:pb-24 md:pt-32 lg:pb-28 lg:pt-36">
        <div className="w-full max-w-[22rem] md:max-w-none">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, ease }}
            className="mb-3 max-w-[18rem] text-[0.6875rem] uppercase leading-[1.6] tracking-[0.2em] text-ivory/85 sm:mb-4 sm:max-w-md sm:text-xs sm:tracking-[0.28em] md:mb-5 md:max-w-none md:tracking-[0.3em]"
          >
            Architecture &amp; Interior Design Studio · Hyderabad
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: reduceMotion ? 0 : 0.08,
              ease,
            }}
            className="max-w-[14ch] font-serif text-[clamp(2.5rem,10vw,3.4rem)] font-light leading-[1] tracking-[-0.02em] text-ivory sm:max-w-xl md:max-w-3xl md:text-7xl md:leading-[1.06] md:tracking-normal lg:max-w-4xl lg:text-8xl"
          >
            Spaces Designed
            <br /> With Purpose.
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.75,
              delay: reduceMotion ? 0 : 0.18,
            }}
            className="mt-4 max-w-[21.25rem] text-base leading-[1.55] text-ivory/90 sm:mt-5 sm:text-[1.0625rem] md:mt-6 md:max-w-xl md:text-lg md:leading-relaxed"
          >
            Architecture and interior design shaped around functionality, character
            and the way people experience space.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.75,
              delay: reduceMotion ? 0 : 0.28,
            }}
            className="mt-7 flex w-full flex-col gap-3.5 sm:mt-8 md:mt-12 md:flex-row md:flex-wrap md:items-center md:gap-4"
          >
            <Link
              href="/projects"
              data-cursor="hover"
              className="hero-cta hero-cta-primary focus-visible:ring-1 focus-visible:ring-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
            >
              Explore Our Work
            </Link>
            <Link
              href="/contact"
              data-cursor="hover"
              className="hero-cta hero-cta-secondary focus-visible:ring-1 focus-visible:ring-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
            >
              Start a Conversation
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: reduceMotion ? 0 : 1,
          duration: reduceMotion ? 0 : 0.9,
        }}
        className="absolute bottom-8 right-6 hidden items-center gap-3 md:flex md:right-10"
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
