'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import type { Project } from '@/lib/projects'

// Dynamically import the Canvas scene to prevent SSR issues
const Model3DScene = dynamic(() => import('./model-3d-scene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full flex-col items-center justify-center bg-espresso text-ivory">
      <div className="h-8 w-8 animate-spin border-2 border-ivory/20 border-t-bronze" />
      <span className="mt-3 text-xs uppercase tracking-[0.25em] text-ivory/80">
        Initializing 3D Canvas…
      </span>
    </div>
  ),
})

export function Model3DViewer({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [hasEntered, setHasEntered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [autoRotate, setAutoRotate] = useState(false)
  const [resetTrigger, setResetTrigger] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showHint, setShowHint] = useState(true)

  const modelUrl = project.model3d
  const label = project.enter3dLabel || 'ENTER THE SPACE'

  // Respect prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mediaQuery.matches) {
        setAutoRotate(false)
      }
    }
  }, [])

  // WebGL availability check
  const checkWebGLSupport = useCallback(() => {
    try {
      const canvas = document.createElement('canvas')
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      )
    } catch {
      return false
    }
  }, [])

  // Fullscreen change listener
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () =>
      document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const handleEnter = () => {
    if (!checkWebGLSupport()) {
      setLoadError(true)
      return
    }
    setIsLoading(true)
    setHasEntered(true)
  }

  const handleModelLoaded = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleModelError = useCallback((_err: unknown) => {
    setIsLoading(false)
    setLoadError(true)
  }, [])

  const toggleFullscreen = async () => {
    const container = containerRef.current
    if (!container) return
    if (!document.fullscreenElement) {
      try {
        await container.requestFullscreen()
      } catch (err) {
        console.error('Fullscreen request error:', err)
      }
    } else {
      try {
        await document.exitFullscreen()
      } catch (err) {
        console.error('Exit fullscreen error:', err)
      }
    }
  }

  if (!modelUrl) return null

  return (
    <div className="w-full">
      {/* Eyebrow Label matching site design system */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-bronze">
          INTERACTIVE 3D MODEL
        </p>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          GLB Spatial Viewer
        </span>
      </div>

      <div
        ref={containerRef}
        className="group relative aspect-[16/9] w-full overflow-hidden bg-espresso shadow-xl select-none"
      >
        {/* Placeholder Before User Opts In */}
        {!hasEntered && (
          <div
            onClick={handleEnter}
            className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center bg-espresso/40 transition-colors duration-500 hover:bg-espresso/30"
          >
            <Image
              src={project.image || '/placeholder.svg'}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(min-width: 1200px) 1100px, 100vw"
            />
            <div className="absolute inset-0 bg-espresso/50 backdrop-blur-[2px] transition-opacity hover:bg-espresso/40" />

            {/* Premium Architectural 3D Entry Badge */}
            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center border border-ivory/40 bg-espresso/60 text-ivory backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-bronze group-hover:bg-espresso/80">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-9 w-9 text-ivory transition-colors group-hover:text-bronze"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-[0.28em] text-ivory">
                  {label}
                </span>
                <span className="mt-1 font-serif text-sm italic text-ivory/70">
                  {project.title}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {hasEntered && isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-espresso text-ivory">
            <div className="flex flex-col items-center gap-4">
              <div className="h-9 w-9 animate-spin border-2 border-ivory/20 border-t-bronze" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs uppercase tracking-[0.25em] text-ivory">
                  Loading 3D Spatial Geometry
                </span>
                <span className="font-mono text-xs text-bronze">
                  Preparing textures &amp; lighting
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Fallback Error State */}
        {loadError && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-espresso p-8 text-center text-ivory">
            <div className="max-w-md">
              <p className="font-serif text-2xl font-light text-ivory">
                3D experience unavailable on this device.
              </p>
              <p className="mt-3 text-sm text-ivory/70">
                WebGL is either disabled or your hardware does not support this
                model. You can explore high-resolution photographs instead.
              </p>
              <a
                href="#project-gallery"
                className="mt-6 inline-flex items-center gap-2 border border-ivory/30 bg-espresso/60 px-6 py-3 text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:border-bronze hover:text-bronze"
              >
                View Project Gallery &rarr;
              </a>
            </div>
          </div>
        )}

        {/* 3D Scene */}
        {hasEntered && !loadError && (
          <div
            onPointerDown={() => setShowHint(false)}
            className="h-full w-full cursor-grab active:cursor-grabbing"
          >
            <Model3DScene
              url={modelUrl}
              autoRotate={autoRotate}
              resetTrigger={resetTrigger}
              onLoaded={handleModelLoaded}
              onError={handleModelError}
            />
          </div>
        )}

        {/* "Drag to orbit" hint overlay */}
        {hasEntered && !isLoading && !loadError && showHint && (
          <div className="pointer-events-none absolute inset-x-0 bottom-16 z-20 flex justify-center animate-fade-in">
            <div className="flex items-center gap-2.5 border border-ivory/20 bg-espresso/80 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-ivory/90 backdrop-blur-md">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                className="h-3.5 w-3.5 text-bronze"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <span>Drag to rotate • Pinch to zoom</span>
            </div>
          </div>
        )}

        {/* Floating Custom HUD Controls */}
        {hasEntered && !isLoading && !loadError && (
          <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between p-4 md:p-6 pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-2 border border-ivory/20 bg-espresso/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-ivory/90 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-bronze animate-pulse" />
              <span>3D Model</span>
            </div>

            <div className="pointer-events-auto flex items-center gap-2">
              {/* Auto-rotate toggle */}
              <button
                type="button"
                onClick={() => setAutoRotate((v) => !v)}
                className={`flex h-8 items-center gap-1.5 border px-3 text-[10px] uppercase tracking-[0.2em] backdrop-blur-md transition-colors ${
                  autoRotate
                    ? 'border-bronze bg-bronze text-ivory'
                    : 'border-ivory/30 bg-espresso/70 text-ivory hover:border-bronze'
                }`}
                aria-label="Toggle Auto-rotate"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={`h-3.5 w-3.5 ${autoRotate ? 'animate-spin' : ''}`}
                >
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
                <span>Rotate</span>
              </button>

              {/* Reset Camera Button */}
              <button
                type="button"
                onClick={() => setResetTrigger((n) => n + 1)}
                className="flex h-8 items-center gap-1.5 border border-ivory/30 bg-espresso/70 px-3 text-[10px] uppercase tracking-[0.2em] text-ivory backdrop-blur-md transition-colors hover:border-bronze hover:text-bronze"
                aria-label="Reset Camera"
              >
                <span>Reset View</span>
              </button>

              {/* Fullscreen */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="flex h-8 w-8 items-center justify-center border border-ivory/30 bg-espresso/70 text-ivory backdrop-blur-md transition-colors hover:border-bronze hover:text-bronze"
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-3.5 w-3.5"
                  >
                    <polyline points="4 14 10 14 10 20" />
                    <polyline points="20 10 14 10 14 4" />
                    <line x1="14" y1="10" x2="21" y2="3" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-3.5 w-3.5"
                  >
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
