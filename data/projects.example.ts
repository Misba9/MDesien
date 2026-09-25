/**
 * Live project list, imported by lib/projects.ts.
 * Contemporary Family Residence is real work: city and year stay unset
 * until M Desien confirms them.
 */

import type { Project } from '@/lib/projects'

const residence = '/projects/contemporary-family-residence'

export const exampleProjects: Project[] = [
  {
    slug: 'contemporary-family-residence',
    title: 'Contemporary Family Residence',
    category: 'Residential Interior',
    categories: ['Residential Interior', 'Architecture'],
    subtitle: 'Residential Architecture & Interior',
    image: `${residence}/exterior-night.jpg`,
    summary:
      'A contemporary family residence designed around natural light, warm materials and a strong connection between indoor and outdoor spaces.',
    description: [
      'This residence was designed around a contemporary architectural language while maintaining a warm and welcoming character. The exterior combines clean horizontal lines, large openings, wooden accents and glass balcony railings. Inside, the design continues with a carefully coordinated palette of wood, neutral surfaces, patterned screens and warm lighting.',
    ],
    gallery: [
      {
        src: `${residence}/exterior-day.jpg`,
        category: 'Exterior',
        aspect: 'portrait',
        alt: 'Contemporary family residence exterior in daylight',
      },
      {
        src: `${residence}/exterior-night.jpg`,
        category: 'Exterior',
        aspect: 'portrait',
        alt: 'Residence exterior at night with architectural lighting',
      },
      {
        src: `${residence}/living-kitchen.jpg`,
        category: 'Interior',
        aspect: 'landscape',
        alt: 'Contemporary living and kitchen interior',
      },
      {
        src: `${residence}/puja-space.jpg`,
        category: 'Interior',
        aspect: 'portrait',
        alt: 'Integrated prayer space with decorative screening',
      },
      {
        src: `${residence}/display-shelves.jpg`,
        category: 'Interior',
        aspect: 'portrait',
        alt: 'Decorative floating display shelves',
      },
      {
        src: `${residence}/wooden-ceiling.jpg`,
        category: 'Details',
        aspect: 'portrait',
        alt: 'Wooden ceiling treatment with statement lighting',
      },
      {
        src: `${residence}/wardrobe.jpg`,
        category: 'Details',
        aspect: 'landscape',
        alt: 'Contemporary wardrobe detailing',
      },
    ],
    facts: [
      { label: 'Location', value: 'To be confirmed', pending: true },
      {
        label: 'Project Type',
        value: 'Residential Architecture & Interior',
      },
      { label: 'Scope', value: 'Architecture and interiors' },
      { label: 'Style', value: 'Contemporary' },
      { label: 'Status', value: 'To be confirmed', pending: true },
      { label: 'Year', value: 'To be confirmed', pending: true },
      { label: 'Area', value: 'To be confirmed', pending: true },
    ],
    concept: {
      title: 'Design Concept',
      description: 'Light, warm material, and rooms planned for family life.',
      body: [
        'The architecture stays contemporary: clean horizontal lines, large openings, wooden accents, and glass balcony railings. Those openings are how daylight reaches the rooms, and the glass railings keep the upper floors visually open to the outside.',
        'Warmth comes from material rather than decoration. Wood runs through the soffits, the ceiling, the frames, and the geometric screens. Stone is visible at the entrance steps and the compound wall. Metal appears in the gate, the balcony rail, and the interior screens and hardware.',
        'The plan is organised around daily use. A working kitchen, floating display shelves, wardrobe storage, and a prayer space set into the circulation sit alongside screens that balance openness and privacy.',
      ],
      points: [
        'Natural light through large openings and tall windows',
        'Warm materials, led by wood, stone, and neutral finishes',
        'Indoor–outdoor connection through balconies and broad openings',
        'Contemporary form with horizontal lines and a quiet elevation',
        'Family use: kitchen, storage, display, and a prayer space',
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
    materialsNote:
      'Studies cropped from the published project photographs. Porcelain tiles and decorative laminates are also specified, without a separate sample image.',
    materialStudies: [
      {
        name: 'Wood',
        description:
          'Timber ceiling, wooden door and window frames, and soffits. The crop is from the published ceiling photograph.',
        src: `${residence}/wooden-ceiling.jpg`,
        alt: 'Timber ceiling in the contemporary family residence',
        objectPosition: 'center 20%',
      },
      {
        name: 'Stone',
        description:
          'Stone at the entrance steps and the compound wall, as seen on the daylight elevation.',
        src: `${residence}/exterior-day.jpg`,
        alt: 'Stone steps and compound wall at the residence entrance',
        objectPosition: 'center 92%',
      },
      {
        name: 'Glass',
        description:
          'Glass balcony railings on the elevation, with tall windows bringing light into the interior.',
        src: `${residence}/exterior-day.jpg`,
        alt: 'Glass balcony railings on the residence elevation',
        objectPosition: 'center 38%',
      },
      {
        name: 'Metal',
        description:
          'The entrance gate and balcony rail, with metal screens and hardware continuing inside.',
        src: `${residence}/exterior-night.jpg`,
        alt: 'Metal entrance gate at the residence',
        objectPosition: 'left 78%',
      },
    ],
    features: [
      {
        title: 'Contemporary form',
        description:
          'Horizontal exterior lines, wooden accents, and a quiet elevation define the architecture.',
      },
      {
        title: 'Natural materials',
        description:
          'Wood, stone at the entrance and compound wall, and neutral interior finishes carry the palette.',
      },
      {
        title: 'Large glazing',
        description:
          'Broad openings, wooden-framed windows, glass balcony railings, and tall interior windows.',
      },
      {
        title: 'Warm lighting',
        description:
          'Cove lighting, recessed spots, a ring chandelier under the timber ceiling, and façade lighting at night.',
      },
      {
        title: 'Indoor–outdoor connection',
        description:
          'Balconies with glass railings and large openings keep the upper floors open to the exterior.',
      },
      {
        title: 'Functional family spaces',
        description:
          'A practical kitchen, geometric screens, display shelves, wardrobe storage, and a prayer space in the circulation.',
      },
    ],
    editorial: {
      src: `${residence}/wooden-ceiling.jpg`,
      alt: 'Wooden ceiling treatment with statement lighting',
      text: 'A wooden ceiling treatment introduces warmth and texture to the interior.',
    },
    processNote:
      'A dated stage record for this project has not been published. The sequence below is the order visible in the work.',
    process: [
      {
        step: '01',
        title: 'Contemporary form',
        description:
          'The elevation is set out with clean horizontal lines, large openings, wooden accents, and glass balcony railings.',
      },
      {
        step: '02',
        title: 'Light',
        description:
          'Daylight enters through those openings and the tall windows. At night, façade spots, cove light, recessed lights, and the ceiling chandelier take over.',
      },
      {
        step: '03',
        title: 'Materials',
        description:
          'Wood, stone, glass, and metal move from the exterior into the rooms. Porcelain tile and decorative laminate are also part of the specified interior palette.',
      },
      {
        step: '04',
        title: 'Rooms for daily use',
        description:
          'The kitchen, screens, display shelves, wardrobe, and prayer space are planned into everyday family use, with privacy held where it is needed.',
      },
    ],
    outcome: {
      title: 'A house held together by light, wood, and daily use.',
      body: 'The published photographs show the residence as built: a contemporary elevation in wood, stone, glass, and metal, and interiors organised around a kitchen, a screened prayer space, display, storage, and a timber ceiling with layered lighting. Location, year, area, and formal status remain to be confirmed.',
      src: `${residence}/exterior-day.jpg`,
      alt: 'Daylight view of the contemporary family residence',
    },
    walkthrough: {
      poster: `${residence}/exterior-night.jpg`,
      posterAlt: 'Residence exterior at night with architectural lighting',
      video: '/herosection-video.mp4',
      title: 'Contemporary Family Residence',
      description:
        'A cinematic walkthrough of the residence — light, material, and spatial proportion before the build.',
    },
  },
]
