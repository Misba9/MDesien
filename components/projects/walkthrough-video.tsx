'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import type { Project } from '@/lib/projects'

export function WalkthroughVideo({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const scrubRef = useRef<HTMLDivElement | null>(null)

  const [hasStarted, setHasStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isNearViewport, setIsNearViewport] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const hideControlsTimer = useRef<NodeJS.Timeout | null>(null)

  const videoSrc = project.walkthroughVideo

  // IntersectionObserver to lazy load video near viewport
  useEffect(() => {
    if (!videoSrc) return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [videoSrc])

  // Fullscreen change listener
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () =>
      document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  // Auto-hide controls when playing
  const handleUserActivity = useCallback(() => {
    setShowControls(true)
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current)
    if (isPlaying) {
      hideControlsTimer.current = setTimeout(() => {
        setShowControls(false)
      }, 2500)
    }
  }, [isPlaying])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (!hasStarted) {
      setHasStarted(true)
    }

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
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

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video) return
    setCurrentTime(video.currentTime)
    if (video.duration) {
      setProgress((video.currentTime / video.duration) * 100)
    }
  }

  const handleLoadedMetadata = () => {
    const video = videoRef.current
    if (video) {
      setDuration(video.duration)
    }
  }

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const scrub = scrubRef.current
    const video = videoRef.current
    if (!scrub || !video || !video.duration) return

    const rect = scrub.getBoundingClientRect()
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    video.currentTime = pos * video.duration
    setProgress(pos * 100)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00'
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (!videoSrc) return null

  return (
    <div className="w-full">
      {/* Eyebrow Label matching site design system */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-bronze">
          EXPERIENCE THE SPACE
        </p>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Walkthrough Video
        </span>
      </div>

      {/* Video Container */}
      <div
        ref={containerRef}
        onMouseMove={handleUserActivity}
        onTouchStart={handleUserActivity}
        className="group relative aspect-[16/9] w-full overflow-hidden bg-espresso shadow-xl select-none"
      >
        {/* Lazy video element */}
        {(isNearViewport || hasStarted) && (
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onWaiting={() => setIsBuffering(true)}
            onPlaying={() => {
              setIsBuffering(false)
              setIsPlaying(true)
            }}
            onPause={() => setIsPlaying(false)}
            onEnded={() => {
              setIsPlaying(false)
              setShowControls(true)
            }}
            onClick={togglePlay}
            className="h-full w-full object-cover cursor-pointer"
          />
        )}

        {/* Initial Poster & Play Button before user interaction */}
        {!hasStarted && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center bg-espresso/35 transition-colors duration-500 hover:bg-espresso/25"
          >
            <Image
              src={project.image || '/placeholder.svg'}
              alt={project.title}
              fill
              priority={false}
              className="object-cover"
              sizes="(min-width: 1200px) 1100px, 100vw"
            />
            <div className="absolute inset-0 bg-espresso/45 backdrop-blur-[2px] transition-opacity hover:bg-espresso/35" />

            {/* Custom Architectural Play Button */}
            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center border border-ivory/40 bg-espresso/60 text-ivory backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-bronze group-hover:bg-espresso/80">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1 h-8 w-8 text-ivory transition-colors group-hover:text-bronze"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-[0.28em] text-ivory">
                  Play Walkthrough
                </span>
                <span className="mt-1 font-serif text-sm italic text-ivory/70">
                  {project.title}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Buffering Indicator */}
        {isBuffering && hasStarted && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-espresso/30">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin border-2 border-ivory/20 border-t-bronze" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-ivory/80">
                Buffering
              </span>
            </div>
          </div>
        )}

        {/* Custom Control Bar */}
        {hasStarted && (
          <div
            className={`absolute inset-x-0 bottom-0 z-30 flex flex-col justify-end bg-gradient-to-t from-espresso/90 via-espresso/50 to-transparent p-4 transition-opacity duration-300 md:p-6 ${
              showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Custom Scrub bar */}
            <div
              ref={scrubRef}
              onClick={handleScrub}
              className="group/scrub relative mb-3.5 flex h-3 w-full cursor-pointer items-center"
            >
              <div className="relative h-[2px] w-full bg-ivory/25 transition-all group-hover/scrub:h-[4px]">
                <div
                  className="absolute left-0 top-0 h-full bg-bronze"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div
                className="absolute h-3 w-3 -translate-x-1/2 border border-bronze bg-ivory shadow-sm transition-transform group-hover/scrub:scale-125"
                style={{ left: `${progress}%` }}
              />
            </div>

            {/* Bottom Row Controls */}
            <div className="flex items-center justify-between text-xs text-ivory">
              {/* Left: Play/Pause & Time */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex h-8 w-8 items-center justify-center border border-ivory/30 bg-espresso/50 text-ivory transition-colors hover:border-bronze hover:text-bronze"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-3.5 w-3.5"
                    >
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-0.5 h-3.5 w-3.5"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </button>

                <div className="font-mono text-[11px] tracking-wider text-ivory/80">
                  <span>{formatTime(currentTime)}</span>
                  <span className="mx-1.5 opacity-40">/</span>
                  <span className="opacity-60">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Right: Mute & Fullscreen */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="flex h-8 w-8 items-center justify-center border border-ivory/30 bg-espresso/50 text-ivory transition-colors hover:border-bronze hover:text-bronze"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-3.5 w-3.5"
                    >
                      <line x1="1" y1="1" x2="23" y2="23" />
                      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-3.5 w-3.5"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="flex h-8 w-8 items-center justify-center border border-ivory/30 bg-espresso/50 text-ivory transition-colors hover:border-bronze hover:text-bronze"
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
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
          </div>
        )}
      </div>
    </div>
  )
}
