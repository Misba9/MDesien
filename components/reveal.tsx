'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'span' | 'li'
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function RevealLine({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className} />
  }

  return (
    <motion.div
      className={className}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease }}
      style={{ originX: 0 }}
    />
  )
}

type RevealImageProps = {
  children: ReactNode
  className?: string
  delay?: number
}

/** Soft opacity fade for media as it enters view. */
export function RevealImage({
  children,
  className,
  delay = 0,
}: RevealImageProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 1.02 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </motion.div>
  )
}
