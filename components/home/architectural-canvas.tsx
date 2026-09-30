'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import type { MotionValue } from 'framer-motion'
import { ArchitecturalScene } from '@/components/home/architectural-scene'

type Props = {
  progress: MotionValue<number>
  reduceMotion: boolean
  simplified: boolean
  mouseParallax: boolean
}

/**
 * Isolated WebGL surface for the home architectural journey.
 * Parent must set pointer-events: none.
 */
export default function ArchitecturalCanvas({
  progress,
  reduceMotion,
  simplified,
  mouseParallax,
}: Props) {
  return (
    <Canvas
      className="h-full w-full"
      dpr={simplified ? [1, 1.25] : [1, 1.5]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
      }}
      camera={{ position: [-0.9, 1.45, 6.4], fov: 38, near: 0.1, far: 40 }}
      shadows={!simplified}
    >
      <Suspense fallback={null}>
        <ArchitecturalScene
          progress={progress}
          reduceMotion={reduceMotion}
          simplified={simplified}
          mouseParallax={mouseParallax}
        />
      </Suspense>
    </Canvas>
  )
}
