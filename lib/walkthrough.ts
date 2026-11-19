export type WalkthroughConfig = {
  id?: string
  poster: string
  posterAlt?: string
  /**
   * Public path to an mp4 or webm, for example "/videos/walkthrough.mp4".
   * Leave unset until the file is in `public`. The player then shows the poster
   * with a disabled play control instead of a broken video.
   */
  video?: string
  title: string
  description: string
  duration?: string
}

/** Homepage section copy. Videos are resolved from project folders via getHomeWalkthroughs(). */
export const studioWalkthroughSection = {
  eyebrow: '3D Visualization & Walkthroughs',
  heading: 'Experience the Space Before It Is Built',
  description:
    'Explore the proposed spaces through cinematic 3D walkthroughs and understand the relationship between materials, lighting, furniture and spatial proportions.',
}
