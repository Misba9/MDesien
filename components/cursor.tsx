'use client'

import { useEffect, useRef, useState } from 'react'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduce.matches) return
    setEnabled(true)

    let raf = 0
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: target.x, y: target.y }

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
      const el = e.target as HTMLElement
      setHovering(Boolean(el.closest('a, button, [data-cursor="hover"]')))
    }

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.15
      ring.y += (target.y - ring.y) * 0.15
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    document.documentElement.classList.add('cursor-none-desktop')

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('cursor-none-desktop')
    }
  }, [])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={dotRef}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-bronze"
      />
      <div
        ref={ringRef}
        className={`absolute rounded-full border border-bronze/60 transition-[width,height,margin,opacity] duration-300 ${
          hovering
            ? '-ml-6 -mt-6 h-12 w-12 opacity-100'
            : '-ml-4 -mt-4 h-8 w-8 opacity-70'
        }`}
      />
    </div>
  )
}
