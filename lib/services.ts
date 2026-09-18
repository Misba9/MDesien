export type Service = {
  n: string
  slug: string
  title: string
  subtitle: string
  summary: string
  body: string
  projectTypes?: string[]
  processStages?: { title: string; desc: string }[]
  image: string
}

export const services: Service[] = [
  {
    n: '01',
    slug: 'architecture',
    title: 'Architecture',
    subtitle:
      'Thoughtful architecture that connects form, function, context and character.',
    summary:
      'Architecture that responds to context, purpose and character.',
    body: 'M Desien perceives buildings as integral components of a broader context, blending modern and vernacular elements. The approach emphasizes locally available materials and creating a balanced relationship between architecture, environment and people.',
    projectTypes: [
      'Residential Architecture',
      'Corporate Architecture',
      'Hospitality Architecture',
      'Architectural Planning',
      'Design Development',
    ],
    image: '/images/hero-home.png',
  },
  {
    n: '02',
    slug: 'interiors',
    title: 'Interior Design',
    subtitle:
      'Spaces designed around the way people live, work and experience their environment.',
    summary:
      'Thoughtful interiors balancing aesthetics, comfort and functionality.',
    body: 'M Desien creates spaces where colour palettes, materials, finishes and layouts work together in harmony. Each space is designed around its purpose while remaining functional, comfortable and reflective of the client’s lifestyle and preferences.',
    projectTypes: [
      'Residential Interiors',
      'Corporate Interiors',
      'Hospitality Interiors',
    ],
    image: '/images/detail-materials.png',
  },
  {
    n: '03',
    slug: 'project-management',
    title: 'Project Management',
    subtitle:
      'From design coordination to execution, keeping every stage organized and aligned.',
    summary:
      'Coordinated planning and execution from concept to completion.',
    body: 'Coordinated planning and execution from concept to completion. We manage design coordination, local statutory codes, material sourcing, vendor collaboration, and timeline execution so every detail is delivered as intended.',
    projectTypes: [
      'Understanding Client Requirements',
      'Planning, Regulations & Building Codes',
      'Materials & Products Specification',
      'Contractor, Vendor & Subcontractor Coordination',
      'Design Coordination & Execution Support',
      'Timeline Management & Budget Awareness',
      'Final Handover',
    ],
    image: '/images/project-office-hero.png',
  },
]

export function getService(slug: string) {
  // Alias interior-design to interiors for backward compatibility
  const normalized = slug === 'interior-design' ? 'interiors' : slug
  return services.find((s) => s.slug === normalized)
}

