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

export const massingBySlug: Record<string, Massing> = {}

export function getMassing(slug: string) {
  return massingBySlug[slug]
}
