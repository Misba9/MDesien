/**
 * Live project list, imported by lib/projects.ts.
 * Contemporary Family Residence is real work: city and year stay unset
 * until M Desien confirms them.
 */

import type { Project } from '@/lib/projects'

export const exampleProjects: Project[] = [
  {
    slug: 'contemporary-family-residence',
    title: 'Contemporary Family Residence',
    category: 'Residential Interior',
    categories: ['Residential Interior', 'Architecture'],
    subtitle: 'Residential Interior & Architecture',
    image: '/projects/contemporary-family-residence/exterior-night.jpg',
    summary:
      'A contemporary family residence combining warm wooden detailing, refined neutral finishes, handcrafted screens and functional interiors.',
    description: [
      'This residence was designed around a contemporary architectural language while maintaining a warm and welcoming character. The exterior combines clean horizontal lines, large openings, wooden accents and glass balcony railings. Inside, the design continues with a carefully coordinated palette of wood, neutral surfaces, patterned screens and warm lighting.',
    ],
    gallery: [
      {
        src: '/projects/contemporary-family-residence/exterior-day.jpg',
        category: 'Exterior',
        alt: 'Contemporary family residence exterior in daylight',
      },
      {
        src: '/projects/contemporary-family-residence/exterior-night.jpg',
        category: 'Exterior',
        alt: 'Residence exterior at night with architectural lighting',
      },
      {
        src: '/projects/contemporary-family-residence/living-kitchen.jpg',
        category: 'Interior',
        alt: 'Contemporary living and kitchen interior',
      },
      {
        src: '/projects/contemporary-family-residence/puja-space.jpg',
        category: 'Interior',
        alt: 'Integrated prayer space with decorative screening',
      },
      {
        src: '/projects/contemporary-family-residence/display-shelves.jpg',
        category: 'Interior',
        alt: 'Decorative floating display shelves',
      },
      {
        src: '/projects/contemporary-family-residence/wooden-ceiling.jpg',
        category: 'Details',
        alt: 'Wooden ceiling treatment with statement lighting',
      },
      {
        src: '/projects/contemporary-family-residence/wardrobe.jpg',
        category: 'Details',
        alt: 'Contemporary wardrobe detailing',
      },
    ],
    facts: [],
    concept: {
      title: 'Design Concept',
      description: 'Modern structure. Warm interiors. Thoughtful details.',
      points: [
        'Clean contemporary forms',
        'Warm wooden elements',
        'Neutral colour palette',
        'Decorative geometric screens',
        'Functional storage',
        'Layered lighting',
        'Balance between openness and privacy',
      ],
    },
    materials: [
      'Natural wood',
      'Stone',
      'Porcelain tiles',
      'Glass',
      'Metal',
      'Decorative laminates',
    ],
    features: [
      {
        title: 'Contemporary Façade',
        description:
          'Horizontal exterior detailing, wooden accents and glass railings create a clean modern elevation.',
      },
      {
        title: 'Decorative Screens',
        description:
          'Geometric screens provide privacy while adding an architectural identity to the interiors.',
      },
      {
        title: 'Warm Wooden Ceiling',
        description:
          'A wooden ceiling treatment introduces warmth and texture to the interior.',
      },
      {
        title: 'Custom Display Shelves',
        description:
          'Minimal floating shelves combine display, storage and personalization.',
      },
      {
        title: 'Functional Kitchen',
        description:
          'Neutral cabinetry and clean lines create a practical contemporary kitchen.',
      },
      {
        title: 'Statement Lighting',
        description:
          'A sculptural lighting fixture becomes a focal point while concealed lighting adds ambience.',
      },
      {
        title: 'Puja Space',
        description:
          'A dedicated prayer area is integrated into the circulation space using decorative screening and warm finishes.',
      },
      {
        title: 'Night Façade',
        description:
          "Architectural lighting highlights the home's textures, openings and material palette after dark.",
      },
    ],
    editorial: {
      src: '/projects/contemporary-family-residence/wooden-ceiling.jpg',
      alt: 'Wooden ceiling treatment with statement lighting',
      text: 'A wooden ceiling treatment introduces warmth and texture to the interior.',
    },
  },
]
