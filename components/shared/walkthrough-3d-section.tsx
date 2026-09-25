'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

export type RenderAsset = {
  id: string
  title: string
  subtitle?: string
  src: string
  videoSrc?: string
}

export const defaultWalkthroughRenders: RenderAsset[] = [
  {
    id: 'primary',
    title: 'Living Pavilion & Courtyard',
    subtitle: 'High-fidelity spatial lighting & material study',
    src: '/images/hero-home.png',
    videoSrc: '/herosection-video.mp4',
  },
  {
    id: 'detail-materials',
    title: 'Natural Material Palette',
    subtitle: 'Travertine, brushed bronze and honed oak',
    src: '/images/detail-materials.png',
  },
  {
    id: 'detail-kitchen',
    title: 'Culinary Architecture',
    subtitle: 'Integrated fluted timber and stone island',
    src: '/images/detail-kitchen.png',
  },
  {
    id: 'detail-bedroom',
    title: 'Master Suite Retreat',
    subtitle: 'Filtered morning daylight and textured linen',
    src: '/images/detail-bedroom.png',
  },
  {
    id: 'detail-stair',
    title: 'Cantilevered Staircase',
    subtitle: 'Monolithic stone treads and bronze reveals',
    src: '/images/detail-stair.png',
  },
]

export type Walkthrough3DSectionProps = {
  eyebrow?: string
  heading?: string
  subheading?: string
  renders?: RenderAsset[]
  className?: string
}

export function Walkthrough3DSection({
  eyebrow = '3D Visualization',
  heading = 'Experience The Space Before It Exists',
  subheading = 'Detailed digital twins and material walkthroughs allow our clients to inhabit their architecture and interior layouts well before ground is broken.',
  renders = defaultWalkthroughRenders,
  className = '',
}: Walkthrough3DSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)

  const activeRender = renders[selectedIndex] || renders[0]
  const currentLightbox = renders[lightboxIndex] || renders[0]

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % renders.length)
  }, [renders.length])

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + renders.length) % renders.length)
  }, [renders.length])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextLightbox()
      if (e.key === 'ArrowLeft') prevLightbox()
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, nextLightbox, prevLightbox])

  return (
    <section
      className={`border-t border-border bg-sand/30 py-20 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section Heading */}
        <div className="mb-12 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-bronze">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-light text-espresso text-balance md:text-5xl">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {subheading}
            </p>
          )}
        </div>

        {/* Primary Stage */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-9">
            <div className="group relative aspect-[16/10] w-full overflow-hidden border border-border bg-espresso/5 shadow-md">
              {activeRender.videoSrc && isPlayingVideo ? (
                <div className="relative h-full w-full bg-espresso">
                  <video
                    src={activeRender.videoSrc}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-cover"
                    onEnded={() => setIsPlayingVideo(false)}
                  />
                  <button
                    type="button"
                    onClick={() => setIsPlayingVideo(false)}
                    className="absolute right-4 top-4 z-20 bg-espresso/80 px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-ivory backdrop-blur-sm hover:bg-espresso"
                  >
                    Close Video
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => openLightbox(selectedIndex)}
                  className="relative h-full w-full cursor-zoom-in"
                >
                  <Image
                    src={activeRender.src}
                    alt={activeRender.title}
                    fill
                    sizes="(min-width: 1024px) 75vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-95" />

                  {/* Stage overlay captions */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-ivory">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-ivory/80">
                        Render {selectedIndex + 1} of {renders.length}
                      </span>
                      <h3 className="mt-1 font-serif text-2xl text-ivory md:text-3xl">
                        {activeRender.title}
                      </h3>
                      {activeRender.subtitle && (
                        <p className="text-xs text-ivory/80 mt-1 font-sans">
                          {activeRender.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {activeRender.videoSrc && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsPlayingVideo(true)
                          }}
                          className="flex items-center gap-2 border border-ivory/40 bg-espresso/60 px-4 py-2 text-xs uppercase tracking-[0.18em] text-ivory backdrop-blur-sm transition-all hover:bg-bronze hover:border-bronze"
                        >
                          <svg
                            className="h-3 w-3 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                          <span>Play Video</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          openLightbox(selectedIndex)
                        }}
                        className="hidden sm:flex items-center gap-1.5 border border-ivory/30 bg-espresso/40 px-3.5 py-2 text-xs uppercase tracking-[0.18em] text-ivory backdrop-blur-sm transition-colors hover:bg-espresso/80"
                        aria-label="View Fullscreen"
                      >
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                          />
                        </svg>
                        <span>Fullscreen</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail supporting renders list */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-espresso/70">
              Supporting Studies
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-1">
              {renders.map((item, idx) => {
                const isSelected = selectedIndex === idx
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedIndex(idx)
                      setIsPlayingVideo(false)
                    }}
                    className={`group relative flex items-center gap-3 border p-2 text-left transition-all ${
                      isSelected
                        ? 'border-bronze bg-ivory shadow-sm'
                        : 'border-border/80 bg-ivory/50 hover:bg-ivory hover:border-border'
                    }`}
                  >
                    <div className="relative aspect-video w-16 shrink-0 overflow-hidden bg-sand">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-xs font-medium ${
                          isSelected
                            ? 'text-bronze'
                            : 'text-espresso group-hover:text-bronze'
                        }`}
                      >
                        {item.title}
                      </p>
                      <p className="truncate text-[10px] text-muted-foreground uppercase tracking-wider">
                        {item.videoSrc ? 'Video & Render' : 'Spatial Render'}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-espresso/95 p-6 backdrop-blur-md"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-ivory">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-bronze">
                {currentLightbox.title}
              </p>
              <p className="text-[11px] text-ivory/70">
                {lightboxIndex + 1} / {renders.length}
              </p>
            </div>
            <button
              type="button"
              onClick={closeLightbox}
              className="px-4 py-2 text-xs uppercase tracking-[0.2em] border border-ivory/30 text-ivory hover:bg-ivory hover:text-espresso transition-colors"
            >
              Close (Esc)
            </button>
          </div>

          {/* Center Enlarged Image */}
          <div
            className="relative mx-auto my-auto aspect-[16/10] w-full max-w-6xl max-h-[75vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentLightbox.src}
              alt={currentLightbox.title}
              fill
              sizes="95vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Bottom Controls */}
          <div
            className="flex items-center justify-between text-ivory"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={prevLightbox}
              className="px-4 py-2 text-xs uppercase tracking-[0.2em] border border-ivory/30 hover:bg-ivory hover:text-espresso transition-colors"
            >
              ← Previous
            </button>
            <span className="hidden sm:inline-block text-xs uppercase tracking-[0.2em] text-ivory/60">
              Use Left / Right arrow keys to navigate
            </span>
            <button
              type="button"
              onClick={nextLightbox}
              className="px-4 py-2 text-xs uppercase tracking-[0.2em] border border-ivory/30 hover:bg-ivory hover:text-espresso transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
