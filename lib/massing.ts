export type Vec3 = [number, number, number]

export type MassingTone =
  | 'ivory'
  | 'sand'
  | 'stone'
  | 'concrete'
  | 'espresso'
  | 'bronze'
  | 'glass'
  | 'water'
  | 'greenery'

export type MassingElement =
  | {
      shape: 'box'
      /** center position */
      pos: Vec3
      /** width, height, depth */
      size: Vec3
      tone: MassingTone
    }
  | {
      shape: 'cylinder'
      pos: Vec3
      /** radius, height */
      size: [number, number]
      tone: MassingTone
    }

export type Tree = {
  pos: Vec3
  scale: number
}

export type Massing = {
  /** short line describing what the model shows */
  caption: string
  ground: MassingTone
  /** overall radius used to scale the camera orbit */
  radius: number
  /** point the camera looks toward */
  target: Vec3
  elements: MassingElement[]
  trees: Tree[]
  /** slat pergola definition (optional) */
  slats?: {
    origin: Vec3
    count: number
    spacing: number
    length: number
    axis: 'x' | 'z'
    tone: MassingTone
  }
}

// Hex values used directly in three.js materials (tokens can't reach the GPU).
export const massingTones: Record<MassingTone, string> = {
  ivory: '#efe7d8',
  sand: '#d9c9af',
  stone: '#c6b8a3',
  concrete: '#b7ab98',
  espresso: '#4a3b30',
  bronze: '#a07c47',
  glass: '#8ea6a4',
  water: '#7c9691',
  greenery: '#6f7a53',
}

export const massingBySlug: Record<string, Massing> = {
  'hillside-villa': {
    caption: 'Low horizontal massing stepping down the slope, with a cantilevered living volume reaching toward the valley.',
    ground: 'greenery',
    radius: 15,
    target: [0, 1.6, 0],
    elements: [
      // stepped base terraces
      { shape: 'box', pos: [0, 0.4, 0], size: [12, 0.8, 7], tone: 'stone' },
      { shape: 'box', pos: [3.5, 1.1, 0], size: [5, 0.6, 6], tone: 'sand' },
      // main living volume
      { shape: 'box', pos: [-2, 1.9, 0], size: [7, 2.4, 5.5], tone: 'ivory' },
      // cantilever reaching out
      { shape: 'box', pos: [-6.5, 2.4, 1], size: [4, 1.6, 3.2], tone: 'ivory' },
      { shape: 'box', pos: [-6.5, 2.4, 1], size: [4.1, 1.5, 2.4], tone: 'glass' },
      // upper study
      { shape: 'box', pos: [1, 3.4, -1], size: [3.5, 1.4, 3], tone: 'sand' },
      // roof plane
      { shape: 'box', pos: [-1.5, 3.3, 0], size: [8, 0.25, 6], tone: 'espresso' },
      // support columns for cantilever
      { shape: 'box', pos: [-8, 1, 0], size: [0.3, 2.6, 0.3], tone: 'bronze' },
      { shape: 'box', pos: [-8, 1, 2], size: [0.3, 2.6, 0.3], tone: 'bronze' },
    ],
    trees: [
      { pos: [7, 0, 3], scale: 1.2 },
      { pos: [8, 0, -3], scale: 0.9 },
      { pos: [-9, 0, -4], scale: 1 },
    ],
  },

  'riverside-house': {
    caption: 'A heavy roof plane floating above a fully glazed living level, mirrored by a reflecting pool.',
    ground: 'sand',
    radius: 15,
    target: [0, 1.4, 0],
    elements: [
      // podium
      { shape: 'box', pos: [0, 0.3, 0], size: [13, 0.6, 8], tone: 'concrete' },
      // reflecting pool
      { shape: 'box', pos: [0, 0.62, 5.2], size: [11, 0.1, 3], tone: 'water' },
      // glazed living level
      { shape: 'box', pos: [0, 1.6, 0], size: [10, 2, 6], tone: 'glass' },
      // service core
      { shape: 'box', pos: [-3.5, 1.6, -0.5], size: [3, 2.1, 4], tone: 'ivory' },
      // heavy floating roof
      { shape: 'box', pos: [0, 3, 0], size: [13, 0.7, 8], tone: 'espresso' },
      // thin columns
      { shape: 'box', pos: [4.6, 1.6, 2.6], size: [0.25, 2, 0.25], tone: 'bronze' },
      { shape: 'box', pos: [4.6, 1.6, -2.6], size: [0.25, 2, 0.25], tone: 'bronze' },
      { shape: 'box', pos: [-4.6, 1.6, 2.6], size: [0.25, 2, 0.25], tone: 'bronze' },
    ],
    trees: [
      { pos: [8, 0, -3], scale: 1.1 },
      { pos: [-8, 0, 4], scale: 1 },
    ],
  },

  'atelier-offices': {
    caption: 'A broad workplace floorplate opened around a planted courtyard, shaded by a timber slat canopy.',
    ground: 'concrete',
    radius: 17,
    target: [0, 1.4, 0],
    elements: [
      // floorplate
      { shape: 'box', pos: [0, 0.4, 0], size: [15, 0.8, 11], tone: 'stone' },
      // two office wings around a court
      { shape: 'box', pos: [0, 1.8, -4], size: [14, 2.6, 3], tone: 'ivory' },
      { shape: 'box', pos: [0, 1.8, -4], size: [14, 1.6, 3.1], tone: 'glass' },
      { shape: 'box', pos: [-6, 1.8, 1.5], size: [3, 2.6, 8], tone: 'ivory' },
      { shape: 'box', pos: [6, 1.8, 1.5], size: [3, 2.6, 8], tone: 'sand' },
      // roof over wings
      { shape: 'box', pos: [0, 3.2, -4], size: [14.4, 0.25, 3.4], tone: 'espresso' },
    ],
    slats: {
      origin: [0, 3.1, 3],
      count: 10,
      spacing: 0.9,
      length: 8,
      axis: 'z',
      tone: 'bronze',
    },
    trees: [
      { pos: [0, 0, 3], scale: 1.3 },
      { pos: [-2.5, 0, 4], scale: 0.9 },
      { pos: [2.5, 0, 4.5], scale: 1 },
    ],
  },

  'terra-hotel': {
    caption: 'A double-height fluted lobby drum anchoring linear guest wings, wrapped in curved terraces.',
    ground: 'sand',
    radius: 18,
    target: [0, 2, 0],
    elements: [
      // base plinth
      { shape: 'box', pos: [0, 0.35, 0], size: [16, 0.7, 10], tone: 'stone' },
      // curved lobby drum
      { shape: 'cylinder', pos: [0, 2.4, 0], size: [3.2, 4.4], tone: 'ivory' },
      { shape: 'cylinder', pos: [0, 4.9, 0], size: [3.5, 0.3], tone: 'espresso' },
      // guest wings
      { shape: 'box', pos: [-6.5, 1.9, 0], size: [4, 3.4, 8], tone: 'sand' },
      { shape: 'box', pos: [6.5, 1.9, 0], size: [4, 3.4, 8], tone: 'sand' },
      // wing glazing bands
      { shape: 'box', pos: [-6.5, 2.4, 4.05], size: [4.05, 1.2, 0.2], tone: 'glass' },
      { shape: 'box', pos: [6.5, 2.4, 4.05], size: [4.05, 1.2, 0.2], tone: 'glass' },
      // curved terrace element
      { shape: 'cylinder', pos: [0, 0.8, 6], size: [4.5, 0.4], tone: 'bronze' },
    ],
    trees: [
      { pos: [0, 0, 8.5], scale: 1.2 },
      { pos: [-9.5, 0, 4], scale: 1 },
      { pos: [9.5, 0, -4], scale: 1 },
    ],
  },

  'courtyard-house': {
    caption: 'Four brick volumes turned inward around a single tree and a square of shifting shadow.',
    ground: 'stone',
    radius: 14,
    target: [0, 1.4, 0],
    elements: [
      // plinth
      { shape: 'box', pos: [0, 0.3, 0], size: [11, 0.6, 11], tone: 'concrete' },
      // four wings enclosing a court
      { shape: 'box', pos: [0, 1.6, -4], size: [10, 2.4, 2.4], tone: 'sand' },
      { shape: 'box', pos: [0, 1.6, 4], size: [10, 2.4, 2.4], tone: 'sand' },
      { shape: 'box', pos: [-4, 1.6, 0], size: [2.4, 2.4, 6], tone: 'ivory' },
      { shape: 'box', pos: [4, 1.6, 0], size: [2.4, 2.4, 6], tone: 'ivory' },
      // timber screens
      { shape: 'box', pos: [0, 1.6, -2.7], size: [9, 2.2, 0.15], tone: 'bronze' },
      // thin roof edges
      { shape: 'box', pos: [0, 2.95, -4], size: [10.3, 0.2, 2.7], tone: 'espresso' },
      { shape: 'box', pos: [0, 2.95, 4], size: [10.3, 0.2, 2.7], tone: 'espresso' },
    ],
    trees: [{ pos: [0, 0, 0], scale: 1.6 }],
  },

  'skyline-penthouse': {
    caption: 'A crowning residence set back on a high-rise shell, opening to a wrap-around terrace at dusk.',
    ground: 'concrete',
    radius: 16,
    target: [0, 3.2, 0],
    elements: [
      // tower shell
      { shape: 'box', pos: [0, 2.4, 0], size: [7, 4.8, 7], tone: 'concrete' },
      { shape: 'box', pos: [0, 2.4, 3.55], size: [7, 4.8, 0.15], tone: 'glass' },
      // terrace slab
      { shape: 'box', pos: [0, 4.9, 0.6], size: [9, 0.3, 8], tone: 'stone' },
      // penthouse volume, set back
      { shape: 'box', pos: [-0.5, 5.9, -0.6], size: [5.5, 2, 4.5], tone: 'ivory' },
      { shape: 'box', pos: [-0.5, 5.9, 1.7], size: [5.5, 1.6, 0.2], tone: 'glass' },
      // roof plane
      { shape: 'box', pos: [-0.5, 7, -0.6], size: [6, 0.25, 5], tone: 'espresso' },
      // bronze frame accent
      { shape: 'box', pos: [2.6, 5.9, 1.9], size: [0.2, 2, 0.2], tone: 'bronze' },
      // pool on terrace
      { shape: 'box', pos: [2.6, 5.08, 2.4], size: [3, 0.1, 2.4], tone: 'water' },
    ],
    trees: [
      { pos: [-3.5, 4.9, 3], scale: 0.7 },
      { pos: [3.5, 4.9, -2.5], scale: 0.6 },
    ],
  },
}

export function getMassing(slug: string) {
  return massingBySlug[slug]
}
