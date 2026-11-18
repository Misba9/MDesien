function webImage(file: string) {
  return `/curerct%20web%20images/${encodeURIComponent(file)}`
}

export const siteImages = {
  // Service card images — high-quality Unsplash photos
  architecture:
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&auto=format&fit=crop',
  interiors:
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80&auto=format&fit=crop',
  projectManagement:
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format&fit=crop',
  about:
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85&auto=format&fit=crop',
  feature: webImage('feature.jpg'),
  living: webImage('2.png'),
  carousel: [
    {
      src: webImage('carousel-1.jpg'),
      alt: 'Living room opening onto a kitchen and staircase',
    },
    {
      src: webImage('carousel-2.jpg'),
      alt: 'Courtyard with white walls, coloured shutters and flowering plants',
    },
    {
      src: webImage('carousel-3.jpg'),
      alt: 'Living room with a yellow sofa and a wall of framed pictures',
    },
  ],
  blog: {
    practice: webImage('blog22.png'),
    originality: webImage('blog331.jpg'),
    climate: webImage('blog33.jpg'),
  },
}
