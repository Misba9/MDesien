export type Project = {
  slug: string
  title: string
  category: string
  location: string
  year: string
  area: string
  status: string
  image: string
  summary: string
  description: string[]
  gallery: string[]
  facts: { label: string; value: string }[]
  // 3D / Walkthrough assets (§7 of spec)
  walkthroughVideo?: string // path to .mp4/.webm
  panorama?: string // path to a 360 equirectangular image
  model3d?: string // path to .glb/.gltf
  enter3dLabel?: string // defaults to "ENTER THE SPACE" if not set
}

import { exampleProjects } from '@/data/projects.example'

/** Live project list populated with showcase projects for live testing */
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

