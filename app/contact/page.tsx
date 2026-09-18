import type { Metadata } from 'next'
import { LogoMark } from '@/components/site-logo'
import { PageIntro } from '@/components/page-intro'
import { Reveal } from '@/components/reveal'
import { ContactForm } from '@/components/contact/contact-form'
import { brand, email, phones, siteUrl, studioAddress } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a project with M Desien in Madhapur, Hyderabad. Email info@mdesien.com or call +91 9811769424 / +91 9810199913.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | M Desien',
    description:
      'Start a project with M Desien in Madhapur, Hyderabad. Email info@mdesien.com or call +91 9811769424 / +91 9810199913.',
    url: `${siteUrl}/contact`,
    siteName: brand.name,
    images: ['/images/hero-home.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | M Desien',
    description:
      'Start a project with M Desien in Madhapur, Hyderabad. Email info@mdesien.com or call +91 9811769424 / +91 9810199913.',
    images: ['/images/hero-home.png'],
  },
}

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Start a conversation."
        description="Tell us about your site, your brief and how you hope to live or work."
      />

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-36">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <ContactForm />
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <Reveal>
              <div className="border-t border-border pt-6">
                <LogoMark variant="dark" className="h-10 w-auto mb-6" />
                <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Enquiries
                </h2>
                <a
                  href={email.href}
                  className="mt-3 block font-serif text-2xl text-espresso transition-colors hover:text-bronze"
                >
                  {email.display}
                </a>
                <a
                  href={phones[0].href}
                  className="mt-3 block text-sm text-espresso"
                >
                  {phones[0].display}
                </a>
                <a
                  href={phones[1].href}
                  className="mt-1 block text-sm text-muted-foreground"
                >
                  {phones[1].display}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-10 border-t border-border pt-6">
                <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {studioAddress.heading}
                </h2>
                {studioAddress.lines.map((line) => (
                  <p key={line} className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {line}
                  </p>
                ))}
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  )
}
