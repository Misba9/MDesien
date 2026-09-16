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
}

/** Live project list. Populate from CMS or replace with real M Desien work. */
export const projects: Project[] = []

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export const projectCategories = [
  'All',
  'Residential',
  'Hospitality',
  'Workplace',
] as const
