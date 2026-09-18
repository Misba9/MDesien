import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { posts } from '@/lib/journal'
import { PageIntro } from '@/components/page-intro'
import { Reveal } from '@/components/reveal'
import { brand, siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Essays and notes from M Desien on practice, AI & design, originality, and sustainability in architecture and interiors.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | M Desien',
    description:
      'Essays and notes from M Desien on practice, AI & design, originality, and sustainability in architecture and interiors.',
    url: `${siteUrl}/blog`,
    siteName: brand.name,
    images: ['/images/hero-home.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | M Desien',
    description:
      'Essays and notes from M Desien on practice, AI & design, originality, and sustainability in architecture and interiors.',
    images: ['/images/hero-home.png'],
  },
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPage() {
  const [lead, ...rest] = posts

  return (
    <>
      <PageIntro
        eyebrow="Journal &amp; Perspectives"
        title="Studio Blog"
        description="Essays and reflections from M Desien on design practice, artificial intelligence, originality, and climate-conscious architecture."
      />

      {lead && (
        <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
          <Reveal>
            <Link href={`/blog/${lead.slug}`} className="group block">
              <div className="grid gap-8 md:grid-cols-2 md:items-center border border-border bg-ivory p-6 md:p-10 transition-all hover:border-bronze hover:shadow-[0_8px_32px_rgba(36,28,22,0.06)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image
                    src={lead.image || '/placeholder.svg'}
                    alt={lead.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-bronze">
                    {lead.category} — {formatDate(lead.date)}
                  </p>
                  <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-espresso text-balance md:text-5xl">
                    {lead.title}
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                    {lead.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-espresso transition-colors group-hover:text-bronze">
                    Read article &rarr;
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-36">
        <div className="grid gap-8 md:grid-cols-2">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col border border-border bg-ivory p-6 transition-all hover:border-bronze hover:shadow-md md:p-8"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                  <Image
                    src={post.image || '/placeholder.svg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.2em] text-bronze">
                  {post.category} — {formatDate(post.date)}
                </p>
                <h3 className="mt-3 font-serif text-2xl leading-snug text-espresso group-hover:text-bronze transition-colors">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-6 pt-4 border-t border-border/80 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.18em] text-foreground/80 group-hover:text-bronze transition-colors">
                    Read More
                  </span>
                  <span className="text-bronze text-sm">&rarr;</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
