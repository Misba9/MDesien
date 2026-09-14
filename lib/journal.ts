export type Post = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readingTime: string
  image: string
  body: string[]
}

export const posts: Post[] = [
  {
    slug: 'ai-in-the-design-studio',
    title: 'AI in the Design Studio',
    excerpt:
      'How generative tools are reshaping the earliest, most speculative moments of an architectural project — and where the architect still leads.',
    category: 'Practice',
    date: '2024-11-12',
    readingTime: '6 min',
    image: '/images/blog-ai-design.png',
    body: [
      'The blank page has always been the hardest part of design. For decades the studio answered it with trace paper, quick perspectives and long conversations. Today a new collaborator sits at the table: generative tools that can produce a hundred variations of a massing study before the coffee is cold.',
      'We treat these tools as instruments of divergence, not decision. They widen the field of possibility in the opening hours of a project, surfacing forms and adjacencies we might not have drawn by hand. But convergence — the difficult act of choosing, editing and committing — remains stubbornly, valuably human.',
      'The risk is not that machines will design our buildings. It is that we stop asking why. A studio that treats AI as an answer machine will produce competent, forgettable work. One that treats it as a provocation will keep its judgment sharp.',
    ],
  },
  {
    slug: 'the-value-of-originality',
    title: 'The Value of Originality',
    excerpt:
      'In an age of infinite reference, what does it mean to make something that is genuinely, defensibly new?',
    category: 'Essay',
    date: '2024-09-28',
    readingTime: '5 min',
    image: '/images/blog-originality.png',
    body: [
      'Originality is often mistaken for novelty. But a genuinely original space rarely announces itself with spectacle. More often it arrives as a quiet correctness — a proportion, a fall of light, a threshold that feels inevitable once experienced.',
      'We pursue originality not as a style but as a discipline: returning to the specific conditions of each site, brief and client rather than reaching for a signature. The result is a body of work that is recognisably ours precisely because no two projects look alike.',
      'The most original move is often the most restrained one — the single skylight, the one curved wall, the material left honestly exposed.',
    ],
  },
  {
    slug: 'building-for-a-warmer-climate',
    title: 'Building for a Warmer Climate',
    excerpt:
      'Passive strategies, honest materials and long-life thinking are no longer optional. A note on how we design for the decades ahead.',
    category: 'Sustainability',
    date: '2024-07-04',
    readingTime: '7 min',
    image: '/images/blog-sustainability.png',
    body: [
      'Sustainability in architecture begins long before the specification of a solar panel. It begins with orientation, mass, shade and cross-ventilation — the passive strategies that determine how a building behaves for the next fifty years.',
      'We favour materials that age well and can be repaired rather than replaced: rammed earth, timber, stone, lime plaster. These are not nostalgic choices. They are a hedge against a future in which embodied carbon and maintenance are counted honestly.',
      'The most sustainable building is the one people love enough to keep. Longevity is a design problem as much as a technical one.',
    ],
  },
]

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}
