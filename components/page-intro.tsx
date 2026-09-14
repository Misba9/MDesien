import { Reveal } from '@/components/reveal'

type PageIntroProps = {
  eyebrow: string
  title: string
  description?: string
}

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
      <Reveal>
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-bronze">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="max-w-4xl font-serif text-5xl font-light leading-[1] text-espresso text-balance md:text-7xl">
          {title}
        </h1>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </Reveal>
      )}
    </section>
  )
}
