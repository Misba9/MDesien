import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { ContactForm } from '@/components/contact/contact-form'
import { email, phones, whatsapp, studioAddress } from '@/lib/site'

export function HomeContact() {
  return (
    <section className="bg-ivory py-24 md:py-36" id="contact">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section header */}
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-bronze">
            Contact
          </p>
          <h2 className="mb-16 max-w-2xl font-serif text-4xl font-light leading-[1.1] text-balance text-espresso md:text-5xl">
            Start a conversation.
          </h2>
        </Reveal>

        <div className="grid gap-16 md:grid-cols-12">
          {/* Form */}
          <div className="md:col-span-7">
            <ContactForm />
          </div>

          {/* Aside — contact details */}
          <aside className="md:col-span-4 md:col-start-9">
            <Reveal>
              <div className="border-t border-border pt-6">
                <Image
                  src="/logo.png"
                  alt="M Desien Architecture & Interior Design Studio"
                  width={1114}
                  height={721}
                  className="mb-6 h-auto w-[12rem] object-contain md:w-[14rem]"
                  sizes="(min-width: 768px) 224px, 192px"
                />
                <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Enquiries
                </h3>
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
                <div className="mt-6 flex flex-col gap-2.5">
                  <a
                    href={whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center bg-[#1FAF57] px-5 text-xs font-medium uppercase tracking-[0.2em] text-white transition-transform hover:-translate-y-px active:scale-[0.98] outline-none focus-visible:ring-1 focus-visible:ring-[#1FAF57] focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                  >
                    Chat on WhatsApp
                  </a>
                  <a
                    href={phones[0].href}
                    className="inline-flex min-h-11 items-center justify-center border border-espresso/30 px-5 text-xs font-medium uppercase tracking-[0.2em] text-espresso transition-colors hover:border-bronze hover:text-bronze active:scale-[0.98] outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                  >
                    Call now
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-10 border-t border-border pt-6">
                <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {studioAddress.heading}
                </h3>
                {studioAddress.lines.map((line) => (
                  <p
                    key={line}
                    className="mt-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  )
}

