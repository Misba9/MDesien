import type { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'
import { posts } from '@/lib/journal'

const BASE = 'https://mdesign.studio'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/projects', '/about', '/journal', '/contact'].map(
    (route) => ({
      url: `${BASE}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }),
  )

  const projectRoutes = projects.map((p) => ({
    url: `${BASE}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  const journalRoutes = posts.map((p) => ({
    url: `${BASE}/journal/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }))

  return [...staticRoutes, ...projectRoutes, ...journalRoutes]
}
