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

export const studioWalkthroughVideos: WalkthroughConfig[] = [
  {
    id: 'walkthrough-1',
    poster: '/walkthrough-videos/walkthrough-1.jpg',
    posterAlt: 'Walkthrough 01 spatial light and architectural flow',
    video: '/walkthrough-videos/walkthrough-1.mp4',
    title: 'Walkthrough 1',
    description:
      'Spatial light study, material definition, and architectural transition.',
    duration: '0:20',
  },
  {
    id: 'walkthrough-2',
    poster: '/walkthrough-videos/walkthrough-2.jpg',
    posterAlt: 'Walkthrough 02 living pavilion and interior flow',
    video: '/walkthrough-videos/walkthrough-2.mp4',
    title: 'Walkthrough 2',
    description:
      'Cinematic study of interior proportions, natural lighting, and circulation.',
    duration: '1:36',
  },
  {
    id: 'walkthrough-3',
    poster: '/walkthrough-videos/walkthrough-3.jpg',
    posterAlt: 'Walkthrough 03 contemporary residence walkthrough',
    video: '/walkthrough-videos/walkthrough-3.mp4',
    title: 'Walkthrough 3',
    description:
      'Full architectural walkthrough exploring volume, material texture, and evening lighting.',
    duration: '1:58',
  },
  {
    id: 'walkthrough-4',
    poster: '/walkthrough-videos/walkthrough-4.jpg',
    posterAlt: 'Walkthrough 04 living room composition',
    video: '/walkthrough-videos/walkthrough-4.mp4',
    title: 'Walkthrough 4',
    description:
      'Timber composition, slatted partition screen, and integrated shelving sequence.',
    duration: '0:08',
  },
  {
    id: 'walkthrough-5',
    poster: '/walkthrough-videos/walkthrough-5.jpg',
    posterAlt: 'Walkthrough 05 feature wall and finishes',
    video: '/walkthrough-videos/walkthrough-5.mp4',
    title: 'Walkthrough 5',
    description:
      'Detailed study of diamond wall panels, brass inlay, and illuminated niche accents.',
    duration: '0:08',
  },
]

/** Homepage presentation. Point `video` at the file you want to publish. */
export const studioWalkthroughSection = {
  eyebrow: '3D Visualization & Walkthroughs',
  heading: 'Experience the Space Before It Is Built',
  description:
    'Explore the proposed spaces through cinematic 3D walkthroughs and understand the relationship between materials, lighting, furniture and spatial proportions.',
  walkthrough: studioWalkthroughVideos[0],
  walkthroughs: studioWalkthroughVideos,
}
