import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { posts } from '@/lib/journal'
import { PageIntro } from '@/components/page-intro'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Essays and notes from M Design on practice, originality, technology and building for a warmer climate.',
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function JournalPage() {
  const [lead, ...rest] = posts

  return (
    <>
      <PageIntro
        eyebrow="Journal"
        title="Notes from the studio"
        description="Occasional writing on how we think, what we are reading, and the ideas shaping the work."
      />

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <Reveal>
          <Link href={`/journal/${lead.slug}`} className="group block">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                <Image
                  src={lead.image || '/placeholder.svg'}
                  alt={lead.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-bronze">
                  {lead.category} — {formatDate(lead.date)}
                </p>
                <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-espresso text-balance md:text-5xl">
                  {lead.title}
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                  {lead.excerpt}
                </p>
                <span className="mt-6 inline-flex text-xs uppercase tracking-[0.2em] text-foreground/70 transition-colors group-hover:text-bronze">
                  Read essay &rarr;
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-36">
        <div className="grid gap-x-8 gap-y-12 border-t border-border pt-16 md:grid-cols-2">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.1}>
              <Link href={`/journal/${post.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                  <Image
                    src={post.image || '/placeholder.svg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.2em] text-bronze">
                  {post.category} — {formatDate(post.date)}
                </p>
                <h3 className="mt-3 font-serif text-2xl leading-snug text-espresso">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
