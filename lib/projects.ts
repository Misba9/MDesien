import { exampleProjects } from '@/data/projects.example'
import type { WalkthroughConfig } from '@/lib/walkthrough'

export type ProjectGalleryImage = {
  src: string
  alt?: string
  category?: string
  aspect?: 'portrait' | 'landscape'
}

export type NormalizedGalleryImage = {
  src: string
  alt: string
  category?: string
  aspect?: 'portrait' | 'landscape'
}

export type ProjectFact = {
  label: string
  value: string
  /** Studio has not confirmed this value. */
  pending?: boolean
}

export type MaterialStudy = {
  name: string
  description: string
  src: string
  alt: string
  objectPosition?: string
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
  facts: ProjectFact[]
  concept?: {
    title: string
    description: string
    points?: string[]
    body?: string[]
  }
  materials?: string[]
  materialsNote?: string
  materialStudies?: MaterialStudy[]
  features?: { title: string; description: string }[]
  process?: { step: string; title: string; description: string }[]
  processNote?: string
  outcome?: {
    title: string
    body: string
    src?: string
    alt?: string
  }
  /** Shown when no walkthrough, panorama, or model is published. */
  walkthroughNote?: string
  /** Cinematic walkthrough. Omit `video` until the file is ready. */
  walkthrough?: WalkthroughConfig
  /** Multiple walkthrough videos in sequence. */
  walkthroughs?: WalkthroughConfig[]
  /** Further films, shown after the primary walkthrough. */
  films?: WalkthroughConfig[]
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
      aspect: item.aspect,
    }
  })
}

/** Live project list. Seed entries live alongside confirmed studio work. */
export const projects: Project[] = exampleProjects

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

/**
 * Every walkthrough / film video across all projects.
 * Used on the homepage so the player streams every file from public/projects.
 */
export function getHomeWalkthroughs(): WalkthroughConfig[] {
  const items: WalkthroughConfig[] = []
  const seen = new Set<string>()

  const push = (project: Project, film: WalkthroughConfig, index: number) => {
    const video = film.video?.trim()
    if (!video || seen.has(video)) return
    seen.add(video)

    const clipTitle = film.title?.trim()
    const title =
      clipTitle && clipTitle !== project.title
        ? `${project.title} — ${clipTitle}`
        : project.title

    items.push({
      ...film,
      id: film.id
        ? `${project.slug}-${film.id}`
        : `${project.slug}-${index}`,
      title,
      poster: film.poster || project.image,
      posterAlt:
        film.posterAlt ?? `${project.title} walkthrough`,
    })
  }

  for (const project of projects) {
    let index = 0

    if (project.walkthroughs?.length) {
      for (const film of project.walkthroughs) {
        push(project, film, index++)
      }
    } else if (project.walkthrough) {
      push(project, project.walkthrough, index++)
    }

    if (project.films?.length) {
      for (const film of project.films) {
        push(project, film, index++)
      }
    }

    if (project.walkthroughVideo?.trim()) {
      push(
        project,
        {
          poster: project.image,
          posterAlt: `${project.title} walkthrough`,
          video: project.walkthroughVideo,
          title: 'Walkthrough',
          description: project.summary,
        },
        index++,
      )
    }
  }

  return items
}

export const projectCategories = [
  'All',
  'Architecture',
  'Residential Interior',
  'Corporate Interior',
  'Hospitality',
] as const

