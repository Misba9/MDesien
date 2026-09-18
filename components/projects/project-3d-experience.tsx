'use client'

import { useState, useMemo } from 'react'
import type { Project } from '@/lib/projects'
import { WalkthroughVideo } from '@/components/projects/walkthrough-video'
import { PanoramaViewer } from '@/components/projects/panorama-viewer'
import { Model3DViewer } from '@/components/projects/model-3d-viewer'
import { Reveal } from '@/components/reveal'

type TabType = 'walkthrough' | 'panorama' | 'model'

type TabDef = {
  id: TabType
  label: string
  sublabel: string
}

export function Project3DExperience({ project }: { project: Project }) {
  const hasVideo = !!project.walkthroughVideo
  const hasPano = !!project.panorama
  const hasModel = !!project.model3d

  // Available tabs calculation
  const availableTabs = useMemo<TabDef[]>(() => {
    const list: TabDef[] = []
    if (hasVideo) {
      list.push({
        id: 'walkthrough',
        label: 'Walkthrough',
        sublabel: 'Cinematic Video',
      })
    }
    if (hasPano) {
      list.push({
        id: 'panorama',
        label: '360° View',
        sublabel: 'Spherical Interior',
      })
    }
    if (hasModel) {
      list.push({
        id: 'model',
        label: '3D Model',
        sublabel: 'Interactive Spatial',
      })
    }
    return list
  }, [hasVideo, hasPano, hasModel])

  const [activeTab, setActiveTab] = useState<TabType>(() => {
    if (hasVideo) return 'walkthrough'
    if (hasPano) return 'panorama'
    if (hasModel) return 'model'
    return 'walkthrough'
  })

  // If no 3D or walkthrough assets are set, render nothing (zero layout footprint)
  if (availableTabs.length === 0) {
    return null
  }

  const showTabs = availableTabs.length > 1

  return (
    <section
      id="project-3d-experience"
      className="border-t border-border bg-white/40 py-20 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-bronze">
                IMMERSIVE
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-serif text-3xl font-light text-espresso text-balance md:text-5xl">
                Step inside the space
              </h2>
            </Reveal>
          </div>

          {/* Segmented Control Tabs (if more than 1 asset present) */}
          {showTabs && (
            <div className="flex flex-wrap border border-border bg-ivory/60 p-1">
              {availableTabs.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition-all ${
                      isActive
                        ? 'border border-bronze bg-espresso text-ivory shadow-sm'
                        : 'text-foreground/70 hover:text-espresso'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Active View Container */}
        <div className="transition-opacity duration-300">
          {activeTab === 'walkthrough' && hasVideo && (
            <WalkthroughVideo project={project} />
          )}

          {activeTab === 'panorama' && hasPano && (
            <PanoramaViewer project={project} />
          )}

          {activeTab === 'model' && hasModel && (
            <Model3DViewer project={project} />
          )}
        </div>
      </div>
    </section>
  )
}
