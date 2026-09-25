'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-espresso">
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

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-12 pt-[5rem] sm:px-6 sm:pb-16 md:px-10 md:pb-24 md:pt-32 lg:pb-28 lg:pt-36">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 max-w-[18rem] text-[0.6875rem] uppercase leading-relaxed tracking-[0.22em] text-ivory/85 sm:mb-5 sm:max-w-md sm:text-xs sm:tracking-[0.28em] md:max-w-none md:tracking-[0.3em]"
        >
          Architecture &amp; Interior Design Studio · Hyderabad
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[14ch] font-serif text-[clamp(2.25rem,9vw,3.5rem)] font-light leading-[1.06] text-balance text-ivory sm:max-w-xl md:max-w-3xl md:text-7xl lg:max-w-4xl lg:text-8xl"
        >
          Spaces Designed
          <br className="hidden sm:inline" /> With Purpose.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18 }}
          className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-ivory/90 sm:mt-6 sm:max-w-lg sm:text-base md:max-w-xl md:text-lg"
        >
          Architecture and interior design shaped around functionality, character
          and the way people experience space.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.28 }}
          className="mt-8 flex w-full flex-col gap-3 sm:mt-10 md:mt-12 md:flex-row md:flex-wrap md:items-center md:gap-4"
        >
          <Link
            href="/projects"
            className="inline-flex min-h-12 w-full items-center justify-center border border-ivory bg-ivory px-7 py-3 text-xs font-medium uppercase tracking-[0.2em] text-espresso transition-colors duration-300 hover:bg-transparent hover:text-ivory md:w-auto outline-none focus-visible:ring-1 focus-visible:ring-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
          >
            Explore Our Work
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-12 w-full items-center justify-center border border-ivory/65 bg-transparent px-7 py-3 text-xs font-medium uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:border-ivory hover:bg-ivory hover:text-espresso md:w-auto outline-none focus-visible:ring-1 focus-visible:ring-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
          >
            Start a Conversation
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.9 }}
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
