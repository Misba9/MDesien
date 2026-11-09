'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { WalkthroughConfig } from '@/lib/walkthrough'

type ThreeDWalkthroughProps = {
  walkthrough?: WalkthroughConfig
  walkthroughs?: WalkthroughConfig[]
  eyebrow?: string
  heading?: string
  description?: string
  id?: string
  className?: string
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const minutes = Math.floor(seconds / 60)
  const remainder = Math.floor(seconds % 60)
  return `${minutes}:${remainder.toString().padStart(2, '0')}`
}

export function ThreeDWalkthrough({
  walkthrough,
  walkthroughs,
  eyebrow,
  heading,
  description,
  id = 'walkthrough',
  className = '',
}: ThreeDWalkthroughProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hideTimer = useRef<number | null>(null)

  const items =
    walkthroughs && walkthroughs.length > 0
      ? walkthroughs
      : walkthrough
        ? [walkthrough]
        : []

  const [currentIndex, setCurrentIndex] = useState(0)
  const current = items[currentIndex] || items[0]
  const videoSrc = current?.video?.trim() || ''

  const [activated, setActivated] = useState(false)
  const [unavailable, setUnavailable] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [controlsVisible, setControlsVisible] = useState(true)

  const canPlay = Boolean(videoSrc) && !unavailable
  const headingText = heading ?? current?.title ?? '3D Walkthrough'
  const lede = description ?? current?.description

  const markUnavailable = useCallback(() => {
    setUnavailable(true)
    setActivated(false)
    setPlaying(false)
  }, [])

  useEffect(() => {
    const onChange = () => {
      const isFs = Boolean(
        document.fullscreenElement ||
          // @ts-expect-error - webkit vendor prefix
          document.webkitFullscreenElement,
      )
      setFullscreen(isFs)
    }
    document.addEventListener('fullscreenchange', onChange)
    document.addEventListener('webkitfullscreenchange', onChange)
    return () => {
      document.removeEventListener('fullscreenchange', onChange)
      document.removeEventListener('webkitfullscreenchange', onChange)
    }
  }, [])

  // Sync muted state to video element DOM property
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = muted
      if (!muted && video.volume === 0) {
        video.volume = 1
      }
    }
  }, [videoSrc, muted])

  // Play newly selected video if already activated
  useEffect(() => {
    if (!activated) return
    const video = videoRef.current
    if (!video) return
    setCurrentTime(0)
    setPlaying(false)
    video.muted = muted
    const play = video.play()
    if (play) {
      play.then(() => setPlaying(true)).catch(() => markUnavailable())
    }
  }, [currentIndex, activated, muted, markUnavailable])

  const revealControls = useCallback(() => {
    setControlsVisible(true)
    if (hideTimer.current) window.clearTimeout(hideTimer.current)
    if (playing) {
      hideTimer.current = window.setTimeout(() => setControlsVisible(false), 2800)
    }
  }, [playing])

  useEffect(() => {
    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current)
    }
  }, [])

  const togglePlay = () => {
    if (!canPlay) return
    if (!activated) {
      setActivated(true)
      return
    }
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.muted = muted
      video.play().then(() => setPlaying(true)).catch(() => markUnavailable())
    } else {
      video.pause()
      setPlaying(false)
      setControlsVisible(true)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    const nextMuted = !muted
    video.muted = nextMuted
    if (!nextMuted && video.volume === 0) {
      video.volume = 1
    }
    setMuted(nextMuted)
  }

  const toggleFullscreen = async () => {
    const frame = frameRef.current
    if (!frame) return
    try {
      if (
        document.fullscreenElement ||
        // @ts-expect-error - webkit vendor prefix
        document.webkitFullscreenElement
      ) {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else {
          // @ts-expect-error - webkit vendor prefix
          document.webkitExitFullscreen?.()
        }
        return
      }
      if (frame.requestFullscreen) {
        await frame.requestFullscreen()
        return
      }
      // @ts-expect-error - webkit vendor prefix
      if (frame.webkitRequestFullscreen) {
        // @ts-expect-error - webkit vendor prefix
        frame.webkitRequestFullscreen()
        return
      }
      const video = videoRef.current as
        | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
        | null
      video?.webkitEnterFullscreen?.()
    } catch {
      setFullscreen(false)
    }
  }

  const seek = (clientX: number, target: HTMLElement) => {
    const video = videoRef.current
    if (!video || !duration) return
    const rect = target.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    video.currentTime = ratio * duration
    setCurrentTime(video.currentTime)
  }

  const selectWalkthrough = (index: number) => {
    if (index === currentIndex) return
    setCurrentIndex(index)
    setCurrentTime(0)
    setDuration(0)
    setUnavailable(false)
    setActivated(true)
  }

  const nextWalkthrough = () => {
    if (items.length <= 1) return
    selectWalkthrough((currentIndex + 1) % items.length)
  }

  const prevWalkthrough = () => {
    if (items.length <= 1) return
    selectWalkthrough((currentIndex - 1 + items.length) % items.length)
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  const hasMultiple = items.length > 1

  return (
    <section
      id={id}
      className={`border-t border-border bg-sand/30 py-20 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.3em] text-bronze">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-4 font-serif text-3xl font-light text-espresso text-balance md:text-5xl">
            {headingText}
          </h2>
          {lede && (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {lede}
            </p>
          )}
        </div>

        {/* Video Player + Right-Side Playlist */}
        <div className={`mt-10 ${hasMultiple ? 'grid gap-6 lg:grid-cols-12 lg:items-start' : ''}`}>
          {/* Main Video Screen */}
          <div className={hasMultiple ? 'lg:col-span-8' : 'w-full'}>
            <div
              ref={frameRef}
              className="relative aspect-video w-full overflow-hidden border border-border bg-espresso shadow-lg cursor-default select-none [&:fullscreen]:cursor-default [&:fullscreen_*]:cursor-default"
              onPointerMove={activated ? revealControls : undefined}
            >
              {(!activated || unavailable) && (
                <Image
                  src={current?.poster || '/images/hero-home.png'}
                  alt={current?.posterAlt || current?.title || 'Walkthrough'}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 1200px, 100vw"
                />
              )}

              {activated && canPlay && (
                <video
                  ref={videoRef}
                  key={videoSrc}
                  src={videoSrc}
                  muted={muted}
                  className="absolute inset-0 h-full w-full bg-espresso object-contain"
                  playsInline
                  preload="auto"
                  onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
                  onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={() => {
                    if (items.length > 1) {
                      nextWalkthrough()
                    } else {
                      setPlaying(false)
                      setControlsVisible(true)
                    }
                  }}
                  onError={markUnavailable}
                />
              )}

              {!activated && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-espresso/80 via-espresso/30 to-espresso/30 px-6 text-center">
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                    className="absolute right-3 top-3 flex h-11 items-center justify-center border border-ivory/50 bg-espresso/60 px-3 text-[11px] uppercase tracking-[0.16em] text-ivory backdrop-blur-sm cursor-pointer hover:border-bronze hover:bg-bronze md:right-5 md:top-5"
                  >
                    {fullscreen ? 'Exit' : 'Fullscreen'}
                  </button>
                  <button
                    type="button"
                    onClick={togglePlay}
                    disabled={!canPlay}
                    aria-disabled={!canPlay}
                    aria-label={canPlay ? `Play ${current?.title}` : 'Walkthrough coming soon'}
                    className="flex h-16 w-16 items-center justify-center border border-ivory/70 bg-espresso/75 text-ivory backdrop-blur-sm transition-all duration-300 cursor-pointer hover:scale-105 hover:border-bronze hover:bg-bronze disabled:cursor-default disabled:opacity-80 disabled:hover:border-ivory/70 disabled:hover:bg-espresso/75 md:h-20 md:w-20"
                  >
                    <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-current" aria-hidden>
                      <polygon points="6 4 20 12 6 20" />
                    </svg>
                  </button>
                  <p className="mt-5 text-xs uppercase tracking-[0.22em] text-ivory">
                    {canPlay ? 'Play walkthrough' : 'Walkthrough coming soon'}
                  </p>
                  <p className="mt-3 max-w-md font-serif text-2xl font-light text-ivory md:text-3xl">
                    {current?.title}
                  </p>
                </div>
              )}

              {activated && (
                <div
                  className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/90 via-espresso/60 to-transparent px-3 pb-3 pt-12 transition-opacity duration-300 md:px-5 md:pb-4 ${
                    controlsVisible || !playing ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  {/* Timeline scrubber */}
                  <div
                    role="slider"
                    aria-label="Seek"
                    aria-valuemin={0}
                    aria-valuemax={Math.round(duration)}
                    aria-valuenow={Math.round(currentTime)}
                    tabIndex={0}
                    className="mb-3.5 h-1.5 cursor-pointer bg-ivory/25 hover:h-2 transition-all"
                    onClick={(event) => seek(event.clientX, event.currentTarget)}
                    onKeyDown={(event) => {
                      const video = videoRef.current
                      if (!video) return
                      if (event.key === 'ArrowRight') video.currentTime += 5
                      if (event.key === 'ArrowLeft') video.currentTime -= 5
                    }}
                  >
                    <div className="h-full bg-bronze transition-all" style={{ width: `${progress}%` }} />
                  </div>

                  {/* Controls bar */}
                  <div className="flex items-center gap-2 text-ivory md:gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={playing ? 'Pause' : 'Play'}
                      className="flex h-10 w-10 items-center justify-center border border-ivory/40 text-xs uppercase tracking-[0.14em] cursor-pointer hover:border-bronze hover:text-bronze"
                    >
                      {playing ? (
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-current">
                          <polygon points="6 4 20 12 6 20" />
                        </svg>
                      )}
                    </button>

                    {items.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={prevWalkthrough}
                          aria-label="Previous walkthrough"
                          className="hidden sm:flex h-10 px-2.5 items-center justify-center border border-ivory/30 text-[11px] uppercase tracking-[0.14em] cursor-pointer hover:border-bronze hover:text-bronze"
                        >
                          Prev
                        </button>
                        <button
                          type="button"
                          onClick={nextWalkthrough}
                          aria-label="Next walkthrough"
                          className="hidden sm:flex h-10 px-2.5 items-center justify-center border border-ivory/30 text-[11px] uppercase tracking-[0.14em] cursor-pointer hover:border-bronze hover:text-bronze"
                        >
                          Next
                        </button>
                      </>
                    )}

                    <span className="min-w-[4.5rem] font-mono text-[11px] tracking-[0.12em] text-ivory/80">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>

                    <span className="ml-auto flex items-center gap-2">
                      {/* Fixed Mute / Unmute Button */}
                      <button
                        type="button"
                        onClick={toggleMute}
                        aria-label={muted ? 'Unmute video audio' : 'Mute video audio'}
                        aria-pressed={muted}
                        className="flex h-10 items-center gap-1.5 border border-ivory/40 px-3 text-[11px] uppercase tracking-[0.14em] cursor-pointer hover:border-bronze hover:text-bronze"
                      >
                        {muted ? (
                          <>
                            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                              <path d="M11 5L6 9H2v6h4l5 4V5z" />
                              <line x1="23" y1="9" x2="17" y2="15" />
                              <line x1="17" y1="9" x2="23" y2="15" />
                            </svg>
                            <span className="hidden sm:inline">Unmute</span>
                          </>
                        ) : (
                          <>
                            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                            </svg>
                            <span className="hidden sm:inline">Mute</span>
                          </>
                        )}
                      </button>

                      {/* Fullscreen Button */}
                      <button
                        type="button"
                        onClick={toggleFullscreen}
                        aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                        className="flex h-10 items-center justify-center border border-ivory/40 px-3 text-[11px] uppercase tracking-[0.14em] cursor-pointer hover:border-bronze hover:text-bronze"
                      >
                        {fullscreen ? 'Exit' : 'Fullscreen'}
                      </button>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Active Video Details */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border/60 pb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-bronze">
                  Walkthrough 0{currentIndex + 1}
                </span>
                <h3 className="mt-1 font-serif text-2xl font-light text-espresso">
                  {current?.title}
                </h3>
              </div>
              {current?.description && (
                <p className="text-xs text-muted-foreground sm:max-w-md sm:text-right">
                  {current.description}
                </p>
              )}
            </div>
          </div>

          {/* Right Side Video Playlist ("little small") */}
          {hasMultiple && (
            <div className="lg:col-span-4">
              <div className="border border-border/80 bg-warm-white/70 p-3 sm:p-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-border/70 pb-3 mb-3">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-bronze font-medium">
                    Walkthroughs ({String(currentIndex + 1).padStart(2, '0')}/{String(items.length).padStart(2, '0')})
                  </h4>
                  <span className="text-[11px] text-muted-foreground hidden sm:inline">
                    Select video
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
                  {items.map((item, idx) => {
                    const isCurrent = idx === currentIndex
                    return (
                      <button
                        key={item.id ?? item.video ?? idx}
                        type="button"
                        onClick={() => selectWalkthrough(idx)}
                        className={`group flex w-full items-center gap-3 border p-2 text-left transition-all cursor-pointer ${
                          isCurrent
                            ? 'border-bronze bg-espresso text-ivory shadow-md ring-1 ring-bronze'
                            : 'border-border/70 bg-warm-white/90 text-espresso hover:border-bronze/60 hover:bg-white'
                        }`}
                      >
                        {/* Small Thumbnail */}
                        <div className="relative aspect-video w-24 sm:w-28 shrink-0 overflow-hidden bg-espresso/20">
                          <Image
                            src={item.poster}
                            alt={item.posterAlt || item.title}
                            fill
                            sizes="120px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <span className="absolute bottom-1 right-1 bg-espresso/85 px-1 py-0.2 text-[9px] font-mono tracking-wider text-ivory">
                            {item.duration || `0${idx + 1}`}
                          </span>
                          {isCurrent && playing && (
                            <span className="absolute top-1 left-1 flex items-center gap-1 bg-bronze/90 px-1 py-0.5 text-[8px] uppercase tracking-wider text-ivory">
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-ivory animate-pulse" />
                              Live
                            </span>
                          )}
                        </div>

                        {/* Metadata */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`text-[10px] font-mono ${
                                isCurrent ? 'text-bronze' : 'text-muted-foreground'
                              }`}
                            >
                              0{idx + 1}
                            </span>
                            {item.duration && (
                              <span className="text-[10px] text-muted-foreground font-mono">
                                {item.duration}
                              </span>
                            )}
                          </div>
                          <h5 className="font-serif text-sm font-medium leading-snug truncate mt-0.5">
                            {item.title}
                          </h5>
                          {item.description && (
                            <p
                              className={`text-[11px] line-clamp-1 leading-relaxed mt-0.5 ${
                                isCurrent ? 'text-ivory/70' : 'text-muted-foreground'
                              }`}
                            >
                              {item.description}
                            </p>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
