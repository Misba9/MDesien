import Image from 'next/image'
import Link from 'next/link'
import { posts } from '@/lib/journal'
import { Reveal } from '@/components/reveal'

export function JournalPreview() {
  return (
    <section className="bg-white/60 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 flex items-end justify-between">
          <Reveal>
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-bronze">
                Blog
              </p>
              <h2 className="font-serif text-4xl font-light text-espresso md:text-5xl">
                Notes from the studio
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <Link
              href="/blog"
              className="hidden text-xs uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-bronze md:inline-flex"
            >
              All articles &rarr;
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image
                    src={post.image || '/placeholder.svg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.2em] text-bronze">
                  {post.category}
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
      </div>
    </section>
  )
}

