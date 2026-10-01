function webImage(file: string) {
  return `/curerct%20web%20images/${encodeURIComponent(file)}`
}

export const siteImages = {
  architecture: webImage('Architecture.png'),
  interiors: webImage('Interiors.png'),
  projectManagement: webImage('Project Management.png'),
  about: webImage('about01.jpg'),
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
