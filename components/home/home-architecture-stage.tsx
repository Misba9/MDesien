'use client'

import dynamic from 'next/dynamic'
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useReducedMotion } from 'framer-motion'
import { useHomeScrollProgress } from '@/components/home/use-home-scroll-progress'

const ArchitecturalCanvas = dynamic(
  () => import('@/components/home/architectural-canvas'),
  { ssr: false, loading: () => null },
)

type Props = {
  children: ReactNode
}

/**
 * Sticky scroll stage: cinematic architectural model stays in view while
 * Intro → Why sections scroll over a lightly translucent ivory veil.
 * Pointer-events stay off so DOM interactions remain fully clickable.
 */
export function HomeArchitectureStage({ children }: Props) {
  const stageRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { progress, reduceMotion: reduce } = useHomeScrollProgress(stageRef)
  const [mounted, setMounted] = useState(false)
  const [simplified, setSimplified] = useState(true)
  const [mouseParallax, setMouseParallax] = useState(false)
  const [webglOk, setWebglOk] = useState(true)

  useEffect(() => {
    setMounted(true)

    const mq = window.matchMedia('(max-width: 1023px)')
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => {
      setSimplified(mq.matches)
      setMouseParallax(fine.matches && !mq.matches)
    }
    sync()
    mq.addEventListener('change', sync)
    fine.addEventListener('change', sync)

    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setWebglOk(false)
    } catch {
      setWebglOk(false)
    }

    return () => {
      mq.removeEventListener('change', sync)
      fine.removeEventListener('change', sync)
    }
  }, [])

  const showCanvas = mounted && webglOk && !reduceMotion

  return (
    <section ref={stageRef} className="relative">
      {/* Sticky 3D layer — visual only */}
      <div
        className="pointer-events-none sticky top-0 z-0 h-[100svh] w-full overflow-hidden"
        aria-hidden
      >
        {showCanvas ? (
          <ArchitecturalCanvas
            progress={progress}
            reduceMotion={reduce}
            simplified={simplified}
            mouseParallax={mouseParallax}
          />
        ) : (
          <div className="h-full w-full bg-sand/40" />
        )}
        {/* Soft vignette so content remains readable */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ivory/20 via-transparent to-ivory/35" />
      </div>

      {/* Content scrolls over the sticky scene */}
      <div className="relative z-10 -mt-[100svh]">
        <div className="bg-ivory/88 backdrop-blur-[1.5px]">{children}</div>
      </div>
    </section>
  )
}
