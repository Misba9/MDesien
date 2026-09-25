export type WalkthroughConfig = {
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
}

/** Homepage presentation. Point `video` at the file you want to publish. */
export const studioWalkthroughSection = {
  eyebrow: '3D Visualization & Walkthroughs',
  heading: 'Experience the Space Before It Is Built',
  description:
    'Explore the proposed space through a cinematic 3D walkthrough and understand the relationship between materials, lighting, furniture and spatial proportions.',
  walkthrough: {
    poster: '/images/hero-home.png',
    posterAlt: 'Interior study prepared for a cinematic walkthrough',
    video: '/herosection-video.mp4',
    title: 'Cinematic walkthrough',
    description:
      'A studio walkthrough of materials, light and proportion.',
  } satisfies WalkthroughConfig,
}
