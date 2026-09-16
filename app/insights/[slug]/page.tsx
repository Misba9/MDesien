import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, posts } from '@/lib/journal'
import { Reveal } from '@/components/reveal'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Not found' }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: { title: post.title, images: [post.image], type: 'article' },
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const more = posts.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <article>
      <section className="mx-auto max-w-3xl px-6 pb-12 pt-32 text-center md:pt-44">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-bronze">
            {post.category} — {formatDate(post.date)} — {post.readingTime}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 font-serif text-4xl font-light leading-tight text-espresso text-balance md:text-6xl">
            {post.title}
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-6 md:px-10">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden bg-sand">
            <Image
              src={post.image || '/placeholder.svg'}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 1000px, 100vw"
            />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <p className="mb-8 font-serif text-2xl font-light leading-snug text-espresso text-balance">
          {post.excerpt}
        </p>
        {post.body.map((para, i) => (
          <p
            key={i}
            className="mb-6 text-lg leading-[1.8] text-foreground/85"
          >
            {para}
          </p>
        ))}

        <div className="mt-12 border-t border-border pt-8">
          <Link
            href="/insights"
            className="text-xs uppercase tracking-[0.2em] text-bronze"
          >
            &larr; Back to insights
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-white/60 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <h2 className="mb-12 font-serif text-3xl font-light text-espresso md:text-4xl">
            Keep reading
          </h2>
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
            {more.map((p) => (
              <Link key={p.slug} href={`/insights/${p.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                  <Image
                    src={p.image || '/placeholder.svg'}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.2em] text-bronze">
                  {p.category}
                </p>
                <h3 className="mt-3 font-serif text-2xl leading-snug text-espresso">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
