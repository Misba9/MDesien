'use client'

import { useSpring, useScroll } from 'framer-motion'
import { useEffect, useState, type RefObject } from 'react'

/**
 * Normalized 0→1 scroll progress across a home-page stage element.
 * Spring-smoothed for cinematic camera mapping without setState every frame.
 */
export function useHomeScrollProgress(containerRef: RefObject<HTMLElement | null>) {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smooth = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 1000 : 90,
    damping: reduceMotion ? 100 : 28,
    mass: reduceMotion ? 0.2 : 0.35,
    restDelta: 0.001,
  })

  return {
    progress: reduceMotion ? scrollYProgress : smooth,
    reduceMotion,
  }
}
