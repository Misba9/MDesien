import { exampleProjects } from '@/data/projects.example'

export type ProjectGalleryImage = {
  src: string
  alt?: string
  category?: string
}

export type NormalizedGalleryImage = {
  src: string
  alt: string
  category?: string
}

export type Project = {
  slug: string
  title: string
  /** Primary label shown on project cards. */
  category: string
  /**
   * Listing filters this project belongs to.
   * When omitted, the grid matches `category` only.
   */
  categories?: string[]
  /** Hero eyebrow. Falls back to `category`. */
  subtitle?: string
  location?: string
  year?: string
  area?: string
  status?: string
  image: string
  summary: string
  description: string[]
  gallery: Array<string | ProjectGalleryImage>
  facts: { label: string; value: string }[]
  concept?: {
    title: string
    description: string
    points: string[]
  }
  materials?: string[]
  features?: { title: string; description: string }[]
  editorial?: {
    src: string
    alt: string
    text: string
  }
  // 3D / Walkthrough assets (§7 of spec)
  walkthroughVideo?: string // path to .mp4/.webm
  panorama?: string // path to a 360 equirectangular image
  model3d?: string // path to .glb/.gltf
  enter3dLabel?: string // defaults to "ENTER THE SPACE" if not set
}

export function projectMatchesCategory(project: Project, category: string) {
  if (category === 'All') return true
  const tags = project.categories?.length ? project.categories : [project.category]
  return tags.includes(category)
}

export function normalizeGallery(
  gallery: Project['gallery'],
  title: string,
): NormalizedGalleryImage[] {
  return gallery.map((item, i) => {
    if (typeof item === 'string') {
      return { src: item, alt: `${title} — view ${i + 1}` }
    }
    return {
      src: item.src,
      alt: item.alt ?? `${title} — view ${i + 1}`,
      category: item.category,
    }
  })
}

/** Live project list. Seed entries live alongside confirmed studio work. */
export const projects: Project[] = exampleProjects

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export const projectCategories = [
  'All',
  'Architecture',
  'Residential Interior',
  'Corporate Interior',
  'Hospitality',
] as const

