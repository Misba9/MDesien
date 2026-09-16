/**
 * EXAMPLE / SEED DATA ONLY — not loaded by the live site.
 *
 * These entries are fictional placeholders from the original template.
 * Do not import this file from app routes or production components.
 * Confirm with the team before deleting; the structure can be reused
 * for real M Desien projects (name, category, location, year, images).
 */

import type { Project } from '@/lib/projects'

export const exampleProjects: Project[] = [
  {
    slug: 'hillside-villa',
    title: 'Hillside Villa',
    category: 'Residential',
    location: 'Lonavala, IN',
    year: '2024',
    area: '620 m²',
    status: 'Completed',
    image: '/images/project-villa-hero.png',
    summary:
      'A single-family residence organised around light, cross-ventilation and a continuous dialogue with the landscape.',
    description: [
      'Hillside Villa sits low into its slope, its horizontal massing broken only by a cantilevered living volume that reaches toward the valley. The plan is arranged as a sequence of thresholds — from shaded entry court to open living hall — each calibrated to the movement of the sun.',
      'Warm travertine, honed oak and bronze detailing were chosen for their ability to age gracefully. The result is a home that feels quiet and inevitable, as though it had always belonged to the hillside.',
    ],
    gallery: [
      '/images/project-villa-hero.png',
      '/images/detail-kitchen.png',
      '/images/detail-bedroom.png',
      '/images/detail-stair.png',
    ],
    facts: [
      { label: 'Scope', value: 'Architecture & Interiors' },
      { label: 'Client', value: 'Private' },
      { label: 'Photography', value: 'Studio archive' },
    ],
  },
  {
    slug: 'riverside-house',
    title: 'Riverside House',
    category: 'Residential',
    location: 'Alibaug, IN',
    year: '2023',
    area: '480 m²',
    status: 'Completed',
    image: '/images/project-riverside-hero.png',
    summary:
      'A low, cantilevered weekend home that frames water and sky through a deep concrete portal.',
    description: [
      'Riverside House is conceived as a single horizontal gesture — a heavy roof plane floating above a glazed living level. The architecture recedes so that the water, the light and the changing weather become the primary experience.',
      'A restrained palette of board-marked concrete, stone and timber grounds the house, while a reflecting pool blurs the edge between built and natural.',
    ],
    gallery: [
      '/images/project-riverside-hero.png',
      '/images/detail-materials.png',
      '/images/detail-stair.png',
      '/images/detail-bedroom.png',
    ],
    facts: [
      { label: 'Scope', value: 'Architecture' },
      { label: 'Client', value: 'Private' },
      { label: 'Photography', value: 'Studio archive' },
    ],
  },
  {
    slug: 'atelier-offices',
    title: 'Atelier Offices',
    category: 'Workplace',
    location: 'Pune, IN',
    year: '2024',
    area: '1,150 m²',
    status: 'Completed',
    image: '/images/project-office-hero.png',
    summary:
      'A workplace interior that trades corporate gloss for warmth, daylight and biophilic calm.',
    description: [
      'For Atelier Offices we reimagined the workday as a series of comfortable rooms rather than a grid of desks. Timber slat ceilings soften acoustics and light, while planted thresholds mark the shift between focus and collaboration.',
      'The material language — ivory plaster, warm oak and bronze — brings a residential ease to a commercial brief.',
    ],
    gallery: [
      '/images/project-office-hero.png',
      '/images/detail-materials.png',
      '/images/detail-kitchen.png',
      '/images/detail-stair.png',
    ],
    facts: [
      { label: 'Scope', value: 'Interior Architecture' },
      { label: 'Client', value: 'Confidential' },
      { label: 'Photography', value: 'Studio archive' },
    ],
  },
  {
    slug: 'terra-hotel',
    title: 'Terra Boutique Hotel',
    category: 'Hospitality',
    location: 'Goa, IN',
    year: '2023',
    area: '2,400 m²',
    status: 'Completed',
    image: '/images/project-hotel-hero.png',
    summary:
      'A 24-key boutique hotel where fluted timber, layered light and curved forms shape a sense of arrival.',
    description: [
      'Terra was designed as a retreat that unfolds slowly. The lobby is a double-height room of fluted timber and bronze, its lighting layered to move guests from bright arrival to intimate lounge.',
      'Curved lounge seating in warm terracotta and ivory establishes a palette that carries into every guest room.',
    ],
    gallery: [
      '/images/project-hotel-hero.png',
      '/images/detail-bedroom.png',
      '/images/detail-materials.png',
      '/images/detail-kitchen.png',
    ],
    facts: [
      { label: 'Scope', value: 'Architecture & Interiors' },
      { label: 'Client', value: 'Terra Hospitality' },
      { label: 'Photography', value: 'Studio archive' },
    ],
  },
  {
    slug: 'courtyard-house',
    title: 'Courtyard House',
    category: 'Residential',
    location: 'Ahmedabad, IN',
    year: '2022',
    area: '390 m²',
    status: 'Completed',
    image: '/images/project-courtyard-hero.png',
    summary:
      'An inward-looking home built around a single tree, brick and the play of shadow.',
    description: [
      'Courtyard House turns away from a dense urban street to focus entirely on a central open court. A single tree anchors the plan, with every room borrowing its light and greenery.',
      'Exposed brick and concrete, tempered by timber screens, create a tactile envelope that filters harsh light into soft, shifting shadow.',
    ],
    gallery: [
      '/images/project-courtyard-hero.png',
      '/images/detail-stair.png',
      '/images/detail-materials.png',
      '/images/detail-bedroom.png',
    ],
    facts: [
      { label: 'Scope', value: 'Architecture & Interiors' },
      { label: 'Client', value: 'Private' },
      { label: 'Photography', value: 'Studio archive' },
    ],
  },
  {
    slug: 'skyline-penthouse',
    title: 'Skyline Penthouse',
    category: 'Residential',
    location: 'Mumbai, IN',
    year: '2024',
    area: '540 m²',
    status: 'In progress',
    image: '/images/project-penthouse-hero.png',
    summary:
      'A high-rise residence where marble, oak and bronze frame the city at dusk.',
    description: [
      'Skyline Penthouse reworks a standard developer shell into a sequence of generous, light-filled rooms. Floor-to-ceiling glazing is balanced by warm oak paneling and honed marble, keeping the interior grounded against the vast city view.',
      'A sculptural bronze chandelier marks the dining room as the social heart of the home.',
    ],
    gallery: [
      '/images/project-penthouse-hero.png',
      '/images/detail-kitchen.png',
      '/images/detail-bedroom.png',
      '/images/detail-materials.png',
    ],
    facts: [
      { label: 'Scope', value: 'Interior Architecture' },
      { label: 'Client', value: 'Private' },
      { label: 'Photography', value: 'Render' },
    ],
  },
]
