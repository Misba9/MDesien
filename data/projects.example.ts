/**
 * Live project list, imported by lib/projects.ts.
 * Contemporary Family Residence is real work: city and year stay unset
 * until M Desien confirms them.
 * Aparna Serene Park is an interior for Mr. Partha, in carpentry as of 2026.
 */

import type { Project } from '@/lib/projects'

const residence = '/projects/contemporary-family-residence'
const aparna = '/projects/aparna-serene-park-residence'

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
  {
    slug: 'aparna-serene-park-residence',
    title: 'Aparna Serene Park Residence',
    category: 'Residential Interior',
    categories: ['Residential Interior'],
    subtitle: 'Residence for Mr. Partha',
    location: 'Aparna Serene Park, Hyderabad',
    year: '2026',
    status: 'In progress',
    image: `${aparna}/living-day.jpg`,
    summary:
      'An apartment interior for Mr. Partha, planned as a timber living room with a slatted screen, built-in storage, and a lit feature wall. Carpentry is underway on site.',
    description: [
      'The living room is one timber composition. A full-height wall holds the television, open display, and lit shelves. A slatted screen with a display shelf divides that wall from the seating without closing the room, and the kitchen sits beyond a timber-framed opening.',
      'The same screen, television unit, wardrobes, and kitchen carcasses are in carpentry in the apartment. A diamond-panel wall is already fixed on site; the visualization shows it finished in timber, with brass inlay, a lit niche, and a jaali. Laminate faces and lighting are still to come.',
    ],
    gallery: [
      {
        src: `${aparna}/living-day.jpg`,
        category: 'Living room',
        aspect: 'landscape',
        alt: 'Daylight view of the living room, with the timber wall, slatted screen, and kitchen beyond',
      },
      {
        src: `${aparna}/living-evening.jpg`,
        category: 'Living room',
        aspect: 'landscape',
        alt: 'The same living room with shelf lighting on and the screen display lit',
      },
      {
        src: `${aparna}/feature-wall.jpg`,
        category: 'Living room',
        aspect: 'landscape',
        alt: 'Visualization of the feature wall in timber, with brass inlay, a lit niche, and a jaali',
      },
      {
        src: `${aparna}/site-partition.jpg`,
        category: 'On site',
        aspect: 'landscape',
        alt: 'Living-room screen and television unit during carpentry',
      },
      {
        src: `${aparna}/site-slat-screen.jpg`,
        category: 'On site',
        aspect: 'portrait',
        alt: 'Slatted screen being fixed inside a timber frame',
      },
      {
        src: `${aparna}/site-door-screens.jpg`,
        category: 'On site',
        aspect: 'portrait',
        alt: 'Doorways, one open and one filled with a timber slat screen',
      },
      {
        src: `${aparna}/site-feature-wall.jpg`,
        category: 'On site',
        aspect: 'landscape',
        alt: 'Diamond-pattern panels fixed for the feature wall',
      },
      {
        src: `${aparna}/site-wardrobe.jpg`,
        category: 'On site',
        aspect: 'portrait',
        alt: 'Open wardrobe with hanging rails, drawers, and shelves',
      },
      {
        src: `${aparna}/site-wardrobe-study.jpg`,
        category: 'On site',
        aspect: 'portrait',
        alt: 'Wardrobe carcass beside a built-in study ledge',
      },
      {
        src: `${aparna}/site-sliding-wardrobe.jpg`,
        category: 'On site',
        aspect: 'portrait',
        alt: 'Sliding-door wardrobe with the high-gloss faces still protected',
      },
      {
        src: `${aparna}/site-kitchen-shelves.jpg`,
        category: 'On site',
        aspect: 'landscape',
        alt: 'Kitchen wall storage, open shelves, and a window',
      },
      {
        src: `${aparna}/site-kitchen-cabinets.jpg`,
        category: 'On site',
        aspect: 'portrait',
        alt: 'Kitchen base and wall cabinets during fitting',
      },
      {
        src: `${aparna}/site-shoe-unit.jpg`,
        category: 'On site',
        aspect: 'portrait',
        alt: 'Shoe unit with three doors, faces still under protection film',
      },
    ],
    facts: [
      { label: 'Location', value: 'Aparna Serene Park, Hyderabad' },
      { label: 'Client', value: 'Mr. Partha' },
      { label: 'Project Type', value: 'Residential Interior' },
      { label: 'Scope', value: 'Interior design and execution' },
      { label: 'Style', value: 'Contemporary' },
      { label: 'Status', value: 'In progress' },
      { label: 'Year', value: '2026' },
      { label: 'Area', value: 'To be confirmed', pending: true },
    ],
    concept: {
      title: 'Design Concept',
      description:
        'One timber living room, storage built into the walls, and light held in the shelves.',
      body: [
        'The apartment is organised around the living room. Timber runs from the television wall across a slatted screen and into the door frames, so the seating, display, and kitchen read as one sequence rather than separate rooms.',
        'The screen does the work of a wall without shutting the light off. Vertical slats keep a view through to the window, and a box shelf in the middle of the screen is for objects that stay in view from both sides.',
        'Storage is built in: wardrobes with hanging, drawers, and a study ledge, a sliding-door wardrobe, a shoe unit, and a kitchen of wall cabinets and open shelves. The second living view is a feature wall of diamond timber panels, already set out on site.',
      ],
      points: [
        'Timber television wall with open display and lit shelves',
        'Slatted screen and a display shelf between living and seating',
        'Kitchen in a light finish, seen through a timber frame',
        'Wardrobes, a study ledge, and a shoe unit built into the rooms',
        'Feature wall of diamond panels, brass inlay, and a jaali',
      ],
    },
    materials: [
      'Timber veneer',
      'High-gloss laminate',
      'Brass inlay',
      'Large-format floor tile',
    ],
    materialsNote:
      'Read from the living-room visualization and the carpentry on site. Faces on the kitchen, wardrobes, and shoe unit are still under protection film.',
    materialStudies: [
      {
        name: 'Timber',
        description:
          'Walnut-tone timber on the television wall, the slatted screen, and the door frames.',
        src: `${aparna}/living-day.jpg`,
        alt: 'Timber television wall and slatted screen in the living room',
        objectPosition: 'left center',
      },
      {
        name: 'Light',
        description:
          'Shelf lighting and a lit display in the screen, shown in the evening view of the same room.',
        src: `${aparna}/living-evening.jpg`,
        alt: 'Lit shelves and screen display in the living room',
        objectPosition: 'center 40%',
      },
      {
        name: 'Brass and jaali',
        description:
          'Brass lines across the diamond feature wall, with a backlit jaali at the upper right.',
        src: `${aparna}/feature-wall.jpg`,
        alt: 'Brass inlay and jaali on the timber feature wall',
        objectPosition: 'right center',
      },
      {
        name: 'Laminate',
        description:
          'High-gloss wardrobe and kitchen faces, still protected while the carcasses are fitted.',
        src: `${aparna}/site-sliding-wardrobe.jpg`,
        alt: 'Sliding wardrobe with protected high-gloss faces',
        objectPosition: 'center',
      },
    ],
    features: [
      {
        title: 'Timber living wall',
        description:
          'A full-height wall for the television, books, and objects, with light inside the niches and along the shelves.',
      },
      {
        title: 'Slatted screen',
        description:
          'Vertical timber slats and a box shelf divide the room and keep the window in view from the entrance.',
      },
      {
        title: 'Built-in storage',
        description:
          'Open wardrobes, a study ledge, a sliding-door wardrobe, and a shoe unit are being made in the rooms.',
      },
      {
        title: 'Kitchen alongside',
        description:
          'Light wall and base cabinets, with a short run of open shelves beside the window.',
      },
      {
        title: 'Feature wall',
        description:
          'Diamond timber panels, brass inlay, a lit niche, and a jaali. The panel layout is already fixed on site.',
      },
      {
        title: 'Work in progress',
        description:
          'October photographs show carcasses, screens, and panels in place. Finished faces and lighting are still to be completed.',
      },
    ],
    editorial: {
      src: `${aparna}/living-evening.jpg`,
      alt: 'Living room with the screen shelf and wall niches lit',
      text: 'The screen shelf and the wall niches carry the evening light in the living room.',
    },
    processNote:
      'The sequence follows the work visible in October 2026: carpentry on site, then the two rooms as drawn.',
    process: [
      {
        step: '01',
        title: 'Carpentry',
        description:
          'The slatted screen, television unit, wardrobes, shoe unit, and kitchen carcasses are built in the apartment.',
      },
      {
        step: '02',
        title: 'Living room',
        description:
          'The timber wall, screen, seating, and kitchen are shown together in daylight, and again with the shelves lit.',
      },
      {
        step: '03',
        title: 'Feature wall',
        description:
          'Diamond panels on site become a timber wall with brass inlay, a lit niche, floating shelves, and a jaali.',
      },
      {
        step: '04',
        title: 'Faces and light',
        description:
          'Laminate faces are still under film, and the lighting and styling in the visualizations are not yet installed.',
      },
    ],
    outcome: {
      title: 'A timber living room, with the carpentry still open.',
      body: 'The films show the living room and the feature wall as proposed, including a pass from the site photograph to the finished room. On site, the screen, storage, and kitchen carcasses are in place. Area is still to be confirmed, and the finished faces are not yet on.',
      src: `${aparna}/living-day.jpg`,
      alt: 'Daylight visualization of the Aparna Serene Park living room',
    },
    walkthrough: {
      poster: `${aparna}/living-day.jpg`,
      posterAlt:
        'Daylight view of the living room with the timber wall and slatted screen',
      video: `${aparna}/living-walkthrough.mp4`,
      title: 'Living room',
      description:
        'A short film of the living room, moving from the carpentry on site to the timber wall, slatted screen, and seating as proposed.',
    },
    films: [
      {
        poster: `${aparna}/feature-wall.jpg`,
        posterAlt:
          'Feature wall in timber with brass inlay, a lit niche, and a jaali',
        video: `${aparna}/feature-wall.mp4`,
        title: 'Feature wall',
        description:
          'The second living view: diamond timber panels, brass inlay, a lit niche, floating shelves, and a backlit jaali.',
      },
    ],
  },
]
