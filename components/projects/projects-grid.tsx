'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { projects, projectCategories, projectMatchesCategory } from '@/lib/projects'

export function ProjectsGrid() {
  const [active, setActive] = useState<(typeof projectCategories)[number]>('All')

  const filtered =
    active === 'All'
      ? projects
      : projects.filter((p) => projectMatchesCategory(p, active))

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-border pb-6">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`relative text-xs uppercase tracking-[0.2em] transition-colors ${
              active === cat
                ? 'text-bronze'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {cat}
            {active === cat && (
              <motion.span
                layoutId="filter-underline"
                className="absolute -bottom-[25px] left-0 h-px w-full bg-bronze"
              />
            )}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-x-8 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image
                    src={project.image || '/placeholder.svg'}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  {project.status && (
                    <span className="absolute left-4 top-4 bg-ivory/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-espresso">
                      {project.status}
                    </span>
                  )}
                </div>
                <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
                  <div>
                    <h3 className="font-serif text-2xl text-espresso">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.location
                        ? `${project.category} — ${project.location}`
                        : project.category}
                    </p>
                  </div>
                  {project.year && (
                    <span className="text-sm text-muted-foreground">
                      {project.year}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
