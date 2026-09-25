'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { WalkthroughConfig } from '@/lib/walkthrough'

type ThreeDWalkthroughProps = {
  walkthrough: WalkthroughConfig
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
  eyebrow,
  heading,
  description,
  id = 'walkthrough',
  className = '',
}: ThreeDWalkthroughProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hideTimer = useRef<number | null>(null)

  const videoSrc = walkthrough.video?.trim() || ''
  const [activated, setActivated] = useState(false)
  const [unavailable, setUnavailable] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [controlsVisible, setControlsVisible] = useState(true)

  const canPlay = Boolean(videoSrc) && !unavailable
  const headingText = heading ?? walkthrough.title
  const lede = description ?? walkthrough.description

  const markUnavailable = useCallback(() => {
    setUnavailable(true)
    setActivated(false)
    setPlaying(false)
  }, [])

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  useEffect(() => {
    if (!activated) return
    const video = videoRef.current
    if (!video) return
    const play = video.play()
    if (play) {
      play.then(() => setPlaying(true)).catch(() => markUnavailable())
    }
  }, [activated, markUnavailable])

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
    video.muted = !video.muted
    setMuted(video.muted)
  }

  const toggleFullscreen = async () => {
    const frame = frameRef.current
    if (!frame) return
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
        return
      }
      if (frame.requestFullscreen) {
        await frame.requestFullscreen()
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

  const progress = duration ? (currentTime / duration) * 100 : 0

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

        <div
          ref={frameRef}
          className="relative mt-10 aspect-video w-full overflow-hidden border border-border bg-espresso"
          onPointerMove={activated ? revealControls : undefined}
        >
          {(!activated || unavailable) && (
            <Image
              src={walkthrough.poster}
              alt={walkthrough.posterAlt || walkthrough.title}
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 1200px, 100vw"
            />
          )}

          {activated && canPlay && (
            <video
              ref={videoRef}
              src={videoSrc}
              className="absolute inset-0 h-full w-full bg-espresso object-contain"
              playsInline
              preload="none"
              onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
              onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => {
                setPlaying(false)
                setControlsVisible(true)
              }}
              onError={markUnavailable}
            />
          )}

          {!activated && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-espresso/70 via-espresso/20 to-espresso/25 px-6 text-center">
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                className="absolute right-3 top-3 flex h-11 items-center justify-center border border-ivory/50 bg-espresso/60 px-3 text-[11px] uppercase tracking-[0.16em] text-ivory backdrop-blur-sm hover:border-bronze hover:bg-bronze md:right-5 md:top-5"
              >
                {fullscreen ? 'Exit' : 'Fullscreen'}
              </button>
              <button
                type="button"
                onClick={togglePlay}
                disabled={!canPlay}
                aria-disabled={!canPlay}
                aria-label={canPlay ? `Play ${walkthrough.title}` : 'Walkthrough coming soon'}
                className="flex h-16 w-16 items-center justify-center border border-ivory/70 bg-espresso/75 text-ivory backdrop-blur-sm transition-colors hover:border-bronze hover:bg-bronze disabled:cursor-default disabled:opacity-80 disabled:hover:border-ivory/70 disabled:hover:bg-espresso/75 md:h-20 md:w-20"
              >
                <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-current" aria-hidden>
                  <polygon points="6 4 20 12 6 20" />
                </svg>
              </button>
              <p className="mt-5 text-xs uppercase tracking-[0.22em] text-ivory">
                {canPlay ? 'Play walkthrough' : 'Walkthrough coming soon'}
              </p>
              <p className="mt-3 max-w-md font-serif text-2xl font-light text-ivory md:text-3xl">
                {walkthrough.title}
              </p>
            </div>
          )}

          {activated && (
            <div
              className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/80 to-transparent px-3 pb-3 pt-10 transition-opacity duration-300 md:px-5 md:pb-4 ${
                controlsVisible || !playing ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                role="slider"
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={Math.round(duration)}
                aria-valuenow={Math.round(currentTime)}
                tabIndex={0}
                className="mb-3 h-1 cursor-pointer bg-ivory/30"
                onClick={(event) => seek(event.clientX, event.currentTarget)}
                onKeyDown={(event) => {
                  const video = videoRef.current
                  if (!video) return
                  if (event.key === 'ArrowRight') video.currentTime += 5
                  if (event.key === 'ArrowLeft') video.currentTime -= 5
                }}
              >
                <div className="h-full bg-bronze" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex items-center gap-2 text-ivory md:gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? 'Pause' : 'Play'}
                  className="flex h-11 w-11 items-center justify-center border border-ivory/40 text-xs uppercase tracking-[0.14em] hover:border-bronze hover:text-bronze"
                >
                  {playing ? 'Pause' : 'Play'}
                </button>
                <span className="min-w-[4.5rem] text-[11px] tracking-[0.12em] text-ivory/80">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <span className="ml-auto flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={muted ? 'Unmute' : 'Mute'}
                    aria-pressed={muted}
                    className="flex h-11 items-center justify-center border border-ivory/40 px-3 text-[11px] uppercase tracking-[0.14em] hover:border-bronze hover:text-bronze"
                  >
                    {muted ? 'Unmute' : 'Mute'}
                  </button>
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                    className="flex h-11 items-center justify-center border border-ivory/40 px-3 text-[11px] uppercase tracking-[0.14em] hover:border-bronze hover:text-bronze"
                  >
                    {fullscreen ? 'Exit' : 'Fullscreen'}
                  </button>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
