'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { getMassing } from '@/lib/massing'

const WalkthroughScene = dynamic(() => import('./walkthrough-scene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-sand/40">
      <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Loading model
      </span>
    </div>
  ),
})

export function ProjectWalkthrough({
  slug,
  title,
}: {
  slug: string
  title: string
}) {
  const [playing, setPlaying] = useState(true)
  const massing = getMassing(slug)
  if (!massing) return null

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-border bg-sand/40 md:aspect-[2/1]">
      <WalkthroughScene slug={slug} playing={playing} />

      {/* top label */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-espresso/70">
            3D Walkthrough
          </p>
          <p className="mt-1 font-serif text-lg text-espresso">{title}</p>
        </div>
        <span className="rounded-full bg-espresso/85 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-ivory">
          {playing ? 'Flythrough' : 'Explore'}
        </span>
      </div>

      {/* controls */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5">
        <p className="max-w-md text-pretty text-xs leading-relaxed text-espresso/70">
          {playing
            ? 'Cinematic auto-flythrough of the massing model.'
            : 'Drag to orbit, scroll to zoom. Stylised massing, not a final render.'}
        </p>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="shrink-0 rounded-full border border-espresso/30 bg-ivory/80 px-5 py-2 text-xs uppercase tracking-[0.2em] text-espresso backdrop-blur transition-colors hover:bg-espresso hover:text-ivory"
        >
          {playing ? 'Explore in 3D' : 'Play flythrough'}
        </button>
      </div>
    </div>
  )
}
