'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-home.png"
          alt="M Desien architecture and interior design"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/30 to-espresso/35" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-xs uppercase tracking-[0.3em] text-ivory/80"
        >
          Architecture &amp; Interior Design Studio · Hyderabad
        </motion.h1>

        {/* Phase 4 Headline: Spaces Designed With Purpose. */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-serif text-5xl font-light leading-[0.98] text-ivory text-balance md:text-7xl lg:text-8xl"
        >
          Spaces Designed With Purpose.
        </motion.p>

        {/* Phase 4 Supporting Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/90 md:text-lg"
        >
          Architecture and interior design shaped around functionality, character
          and the way people experience space.
        </motion.p>

        {/* Primary CTA: Explore Our Work -> /projects | Secondary CTA: Start a Conversation -> /contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/projects"
            className="inline-flex items-center justify-center border border-ivory bg-ivory px-7 py-3 text-xs uppercase tracking-[0.2em] font-medium text-espresso transition-all duration-300 hover:bg-transparent hover:text-ivory"
          >
            Explore Our Work
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-ivory/60 bg-transparent px-7 py-3 text-xs uppercase tracking-[0.2em] font-medium text-ivory backdrop-blur-sm transition-all duration-300 hover:border-ivory hover:bg-ivory hover:text-espresso"
          >
            Start a Conversation
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 right-6 hidden items-center gap-3 md:flex md:right-10"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-ivory/70">
          Scroll
        </span>
        <span className="h-10 w-px bg-ivory/40" />
      </motion.div>
    </section>
  )
}

