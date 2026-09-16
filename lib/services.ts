export type Service = {
  n: string
  slug: string
  title: string
  summary: string
}

export const services: Service[] = [
  {
    n: '01',
    slug: 'architecture',
    title: 'Architecture',
    summary:
      'M Desien approaches buildings as part of a larger context, blending modern and vernacular elements and making thoughtful use of locally available materials.',
  },
  {
    n: '02',
    slug: 'interior-design',
    title: 'Interior Design',
    summary:
      'Spaces where colour, materials, finishes and functionality come together to reflect the way people live.',
  },
  {
    n: '03',
    slug: 'project-management',
    title: 'Project Management',
    summary:
      'Coordinating design, materials, regulations, vendors, contractors and execution to deliver projects effectively.',
  },
]

export function getService(slug: string) {
  return services.find((s) => s.slug === slug)
}
