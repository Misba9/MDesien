import type { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'
import { posts } from '@/lib/journal'
import { services } from '@/lib/services'
import { siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/insights',
    '/contact',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const serviceRoutes = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const projectRoutes = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  const insightRoutes = posts.map((p) => ({
    url: `${siteUrl}/insights/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }))

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...insightRoutes]
}
