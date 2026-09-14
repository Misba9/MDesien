import type { Metadata } from 'next'
import { PageIntro } from '@/components/page-intro'
import { Reveal } from '@/components/reveal'
import { ContactForm } from '@/components/contact/contact-form'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a conversation with M Design about your architecture or interior project.',
}

const studios = [
  { city: 'Mumbai', lines: ['Design House, Kala Ghoda', 'Mumbai 400001'] },
  { city: 'Pune', lines: ['Lane 5, Koregaon Park', 'Pune 411001'] },
  { city: 'Goa', lines: ['Fontainhas, Panaji', 'Goa 403001'] },
]

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Start a conversation."
        description="Tell us about your site, your brief and how you hope to live or work. We take on a small number of projects each year."
      />

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-36">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <ContactForm />
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <Reveal>
              <div className="border-t border-border pt-6">
                <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Enquiries
                </h2>
                <a
                  href="mailto:studio@mdesign.studio"
                  className="mt-3 block font-serif text-2xl text-espresso transition-colors hover:text-bronze"
                >
                  studio@mdesign.studio
                </a>
                <a
                  href="tel:+912200000000"
                  className="mt-1 block text-sm text-muted-foreground"
                >
                  +91 22 0000 0000
                </a>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-8">
              {studios.map((s, i) => (
                <Reveal key={s.city} delay={i * 0.08}>
                  <div className="border-t border-border pt-6">
                    <h3 className="font-serif text-xl text-espresso">
                      {s.city}
                    </h3>
                    {s.lines.map((line) => (
                      <p key={line} className="mt-1 text-sm text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
