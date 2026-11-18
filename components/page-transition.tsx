'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Subtle page enter fade. Remounts on route change via app/template.tsx.
 * Always renders the same motion.div tree so hydration stays stable and
 * the first click can navigate (avoid opacity stuck at 0 after a mismatch).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()
  const instant = Boolean(reduceMotion)

  return (
    <motion.div
      initial={instant ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: instant ? 0 : 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
