'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  projects,
  projectCategories,
  projectMatchesCategory,
} from '@/lib/projects'

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
            className={`relative text-xs uppercase tracking-[0.2em] transition-colors outline-none focus-visible:text-bronze ${
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

      {filtered.length === 0 ? (
        <div className="border border-border/80 bg-ivory/40 px-8 py-16 text-center md:px-12 md:py-20">
          <p className="text-xs uppercase tracking-[0.28em] text-bronze">
            Selected Work
          </p>
          <p className="mt-4 font-serif text-2xl font-light text-espresso md:text-3xl">
            No projects in this category yet.
          </p>
          <button
            type="button"
            onClick={() => setActive('All')}
            className="mt-8 text-xs uppercase tracking-[0.2em] text-bronze transition-colors hover:text-espresso outline-none focus-visible:underline"
          >
            View all projects →
          </button>
        </div>
      ) : (
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
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-ivory"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand md:aspect-[4/3]">
                    <Image
                      src={project.image || '/placeholder.svg'}
                      alt={project.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/20" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-end bg-gradient-to-t from-espresso/55 to-transparent px-5 pb-5 pt-16 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ivory">
                        View Project
                        <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                          →
                        </span>
                      </span>
                    </div>
                    {project.status && (
                      <span className="absolute left-4 top-4 bg-ivory/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-espresso">
                        {project.status}
                      </span>
                    )}
                  </div>
                  <div className="mt-5 border-t border-border pt-4">
                    <h3 className="font-serif text-2xl text-espresso transition-colors duration-300 group-hover:text-bronze">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {[project.category, project.location, project.year]
                        .filter(Boolean)
                        .join(' — ')}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
