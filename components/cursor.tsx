'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Dual-tone custom cursor for desktop fine pointers only.
 * Hidden on touch devices and viewports below 1024px.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const hoveringRef = useRef(false)
  const reduceMotionRef = useRef(false)
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const desktop = window.matchMedia('(min-width: 1024px)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarse = window.matchMedia('(pointer: coarse)')

    let raf = 0
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: target.x, y: target.y }
    let active = false

    const teardown = () => {
      if (!active) return
      active = false
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      raf = 0
      document.documentElement.classList.remove('cursor-none-desktop')
      setEnabled(false)
      setHovering(false)
      hoveringRef.current = false
    }

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }

      if (reduceMotionRef.current && ringRef.current) {
        ring.x = e.clientX
        ring.y = e.clientY
        ringRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }

      const el = e.target as HTMLElement | null
      const next = Boolean(
        el?.closest?.('a, button, [data-cursor="hover"], [role="button"]'),
      )
      if (next !== hoveringRef.current) {
        hoveringRef.current = next
        setHovering(next)
      }
    }

    const tick = () => {
      if (!reduceMotionRef.current) {
        ring.x += (target.x - ring.x) * 0.22
        ring.y += (target.y - ring.y) * 0.22
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
        }
      }
      raf = requestAnimationFrame(tick)
    }

    const setup = () => {
      if (active) return
      active = true
      reduceMotionRef.current = reduce.matches
      window.addEventListener('mousemove', onMove, { passive: true })
      raf = requestAnimationFrame(tick)
      document.documentElement.classList.add('cursor-none-desktop')
      setEnabled(true)
    }

    const sync = () => {
      reduceMotionRef.current = reduce.matches
      // Touch / coarse pointer, or small screens → never show custom cursor.
      const allow =
        fine.matches && desktop.matches && !coarse.matches
      if (allow) setup()
      else teardown()
    }

    sync()
    fine.addEventListener('change', sync)
    desktop.addEventListener('change', sync)
    coarse.addEventListener('change', sync)
    reduce.addEventListener('change', sync)

    return () => {
      fine.removeEventListener('change', sync)
      desktop.removeEventListener('change', sync)
      coarse.removeEventListener('change', sync)
      reduce.removeEventListener('change', sync)
      teardown()
    }
  }, [])

  if (!enabled) return null

  const expand = hovering && !reduceMotionRef.current

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[120] max-lg:hidden"
    >
      <div
        ref={ringRef}
        className="absolute rounded-full transition-[width,height,margin,opacity] duration-200 ease-out will-change-transform"
        style={{
          width: expand ? 40 : 28,
          height: expand ? 40 : 28,
          marginLeft: expand ? -20 : -14,
          marginTop: expand ? -20 : -14,
          border: '1px solid rgba(242, 237, 228, 0.85)',
          boxShadow:
            '0 0 0 1px rgba(36, 28, 22, 0.55), 0 0 8px rgba(0, 0, 0, 0.14)',
          opacity: expand ? 1 : 0.92,
        }}
      />
      <div
        ref={dotRef}
        className="absolute rounded-full will-change-transform transition-[width,height,margin] duration-200 ease-out"
        style={{
          width: expand ? 8 : 5,
          height: expand ? 8 : 5,
          marginLeft: expand ? -4 : -2.5,
          marginTop: expand ? -4 : -2.5,
          backgroundColor: '#241c16',
          boxShadow:
            '0 0 0 1.5px rgba(242, 237, 228, 0.95), 0 0 6px rgba(0, 0, 0, 0.18)',
        }}
      />
    </div>
  )
}
