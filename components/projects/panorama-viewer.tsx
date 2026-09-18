'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import * as THREE from 'three'
import type { Project } from '@/lib/projects'

export function PanoramaViewer({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasContainerRef = useRef<HTMLDivElement | null>(null)

  const [hasEntered, setHasEntered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [loadError, setLoadError] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [gyroAvailable, setGyroAvailable] = useState(false)
  const [gyroActive, setGyroActive] = useState(false)

  const panoSrc = project.panorama

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const textureRef = useRef<THREE.Texture | null>(null)
  const animFrameRef = useRef<number | null>(null)

  // Interaction coordinates (spherical)
  const lonRef = useRef(0)
  const latRef = useRef(0)
  const targetLonRef = useRef(0)
  const targetLatRef = useRef(0)
  const isPointerDownRef = useRef(false)
  const pointerXRef = useRef(0)
  const pointerYRef = useRef(0)
  const pinchDistRef = useRef<number | null>(null)

  // Check hint dismissal
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = sessionStorage.getItem('mdesien_pano_hint_dismissed')
      if (!dismissed) setShowHint(true)
    }
  }, [])

  // Check gyroscope capability
  useEffect(() => {
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      setGyroAvailable(true)
    }
  }, [])

  const dismissHint = useCallback(() => {
    if (showHint) {
      setShowHint(false)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('mdesien_pano_hint_dismissed', 'true')
      }
    }
  }, [showHint])

  const enableGyro = async () => {
    if (typeof window === 'undefined') return
    const DOE = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>
    }

    if (typeof DOE?.requestPermission === 'function') {
      try {
        const res = await DOE.requestPermission()
        if (res === 'granted') {
          setGyroActive(true)
        }
      } catch (err) {
        console.warn('DeviceOrientation permission error:', err)
      }
    } else {
      setGyroActive((prev) => !prev)
    }
  }

  // Device orientation listener
  useEffect(() => {
    if (!gyroActive) return

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null && e.beta !== null && e.gamma !== null) {
        // Map beta (pitch) and alpha/gamma (yaw)
        targetLatRef.current = Math.max(-85, Math.min(85, (e.beta - 90) * 0.8))
        targetLonRef.current = -e.alpha
        dismissHint()
      }
    }

    window.addEventListener('deviceorientation', handleOrientation)
    return () =>
      window.removeEventListener('deviceorientation', handleOrientation)
  }, [gyroActive, dismissHint])

  // Fullscreen change listener
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () =>
      document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const initThree = useCallback(() => {
    const mount = canvasContainerRef.current
    if (!mount || !panoSrc) return

    setIsLoading(true)
    setLoadProgress(15)

    const width = mount.clientWidth || 800
    const height = mount.clientHeight || 500

    // 1. Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // 2. Camera (Fov 75)
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(0, 0, 0)
    cameraRef.current = camera

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.innerHTML = ''
    mount.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // 4. Inverted Sphere geometry for 360 projection
    const geometry = new THREE.SphereGeometry(500, 64, 40)
    geometry.scale(-1, 1, 1) // invert normals inside

    // 5. Texture Loader with progress
    const manager = new THREE.LoadingManager()
    manager.onProgress = (_, loaded, total) => {
      setLoadProgress(Math.round((loaded / total) * 100))
    }

    const loader = new THREE.TextureLoader(manager)
    loader.load(
      panoSrc,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace
        texture.minFilter = THREE.LinearFilter
        textureRef.current = texture

        const material = new THREE.MeshBasicMaterial({ map: texture })
        const sphere = new THREE.Mesh(geometry, material)
        scene.add(sphere)

        setIsLoading(false)
        setLoadProgress(100)
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100))
        }
      },
      (err) => {
        console.error('Error loading panorama texture:', err)
        setLoadError(true)
        setIsLoading(false)
      },
    )

    // Render loop
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate)

      // Damped smooth interpolation
      lonRef.current += (targetLonRef.current - lonRef.current) * 0.1
      latRef.current += (targetLatRef.current - latRef.current) * 0.1

      latRef.current = Math.max(-85, Math.min(85, latRef.current))

      const phi = THREE.MathUtils.degToRad(90 - latRef.current)
      const theta = THREE.MathUtils.degToRad(lonRef.current)

      const target = new THREE.Vector3(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta),
      )

      camera.lookAt(target)
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!mount || !cameraRef.current || !rendererRef.current) return
      const w = mount.clientWidth
      const h = mount.clientHeight
      cameraRef.current.aspect = w / h
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [panoSrc])

  const handleEnter = () => {
    setHasEntered(true)
    setTimeout(() => {
      initThree()
    }, 50)
  }

  // Pointer event listeners
  const onPointerDown = (e: React.PointerEvent) => {
    isPointerDownRef.current = true
    pointerXRef.current = e.clientX
    pointerYRef.current = e.clientY
    dismissHint()
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return
    const dx = e.clientX - pointerXRef.current
    const dy = e.clientY - pointerYRef.current
    pointerXRef.current = e.clientX
    pointerYRef.current = e.clientY

    targetLonRef.current -= dx * 0.15
    targetLatRef.current += dy * 0.15
  }

  const onPointerUp = () => {
    isPointerDownRef.current = false
  }

  // Wheel zoom
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const camera = cameraRef.current
    if (!camera) return
    camera.fov = Math.max(35, Math.min(90, camera.fov + e.deltaY * 0.05))
    camera.updateProjectionMatrix()
    dismissHint()
  }

  // Touch pinch zoom
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)

      if (pinchDistRef.current !== null && cameraRef.current) {
        const diff = pinchDistRef.current - dist
        cameraRef.current.fov = Math.max(
          35,
          Math.min(90, cameraRef.current.fov + diff * 0.15),
        )
        cameraRef.current.updateProjectionMatrix()
      }
      pinchDistRef.current = dist
    }
  }

  const onTouchEnd = () => {
    pinchDistRef.current = null
  }

  const resetCamera = () => {
    targetLonRef.current = 0
    targetLatRef.current = 0
    if (cameraRef.current) {
      cameraRef.current.fov = 75
      cameraRef.current.updateProjectionMatrix()
    }
  }

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

  // Proper cleanup on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (rendererRef.current) {
        rendererRef.current.dispose()
        rendererRef.current.forceContextLoss()
      }
      if (textureRef.current) textureRef.current.dispose()
      if (sceneRef.current) sceneRef.current.clear()
    }
  }, [])

  if (!panoSrc) return null

  return (
    <div className="w-full">
      {/* Eyebrow Label matching site design system */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-bronze">
          360° IMMERSIVE PANORAMA
        </p>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Equirectangular View
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

            {/* Custom 360 Entry Button */}
            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center border border-ivory/40 bg-espresso/60 text-ivory backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-bronze group-hover:bg-espresso/80">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-9 w-9 text-ivory transition-colors group-hover:text-bronze"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-[0.28em] text-ivory">
                  ENTER 360° VIEW
                </span>
                <span className="mt-1 font-serif text-sm italic text-ivory/70">
                  {project.title}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Loading Screen with Progress */}
        {hasEntered && isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-espresso text-ivory">
            <div className="flex flex-col items-center gap-4">
              <div className="h-9 w-9 animate-spin border-2 border-ivory/20 border-t-bronze" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs uppercase tracking-[0.25em] text-ivory">
                  Loading 360° Panorama
                </span>
                <span className="font-mono text-xs text-bronze">
                  {loadProgress}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Error Fallback */}
        {loadError && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-espresso p-6 text-center text-ivory">
            <p className="font-serif text-xl text-ivory">
              Unable to load 360° view on this device.
            </p>
            <a
              href="#project-gallery"
              className="mt-4 inline-flex items-center gap-2 border border-ivory/30 bg-espresso/60 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:border-bronze hover:text-bronze"
            >
              View Project Gallery &rarr;
            </a>
          </div>
        )}

        {/* 3D WebGL Canvas Container */}
        <div
          ref={canvasContainerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onWheel={onWheel}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="h-full w-full cursor-grab active:cursor-grabbing"
        />

        {/* "Drag to explore" overlay banner */}
        {hasEntered && !isLoading && showHint && (
          <div className="pointer-events-none absolute inset-x-0 bottom-16 z-30 flex justify-center animate-fade-in">
            <div className="flex items-center gap-2.5 border border-ivory/20 bg-espresso/80 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-ivory/90 backdrop-blur-md">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                className="h-3.5 w-3.5 text-bronze"
              >
                <path d="M14 9l-6 6M8 9h6v6" />
              </svg>
              <span>Drag or swipe to explore</span>
            </div>
          </div>
        )}

        {/* Floating Custom HUD Controls */}
        {hasEntered && !isLoading && (
          <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between p-4 md:p-6 pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-2 border border-ivory/20 bg-espresso/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-ivory/90 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-bronze animate-pulse" />
              <span>360° Active</span>
            </div>

            <div className="pointer-events-auto flex items-center gap-2">
              {/* Gyroscope toggle (mobile) */}
              {gyroAvailable && (
                <button
                  type="button"
                  onClick={enableGyro}
                  className={`flex h-8 items-center gap-1.5 border px-3 text-[10px] uppercase tracking-[0.2em] backdrop-blur-md transition-colors ${
                    gyroActive
                      ? 'border-bronze bg-bronze text-ivory'
                      : 'border-ivory/30 bg-espresso/70 text-ivory hover:border-bronze'
                  }`}
                  aria-label="Toggle Gyroscope"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-3.5 w-3.5"
                  >
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" />
                  </svg>
                  <span>Gyro</span>
                </button>
              )}

              {/* Reset camera */}
              <button
                type="button"
                onClick={resetCamera}
                className="flex h-8 items-center gap-1.5 border border-ivory/30 bg-espresso/70 px-3 text-[10px] uppercase tracking-[0.2em] text-ivory backdrop-blur-md transition-colors hover:border-bronze hover:text-bronze"
                aria-label="Reset View"
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
