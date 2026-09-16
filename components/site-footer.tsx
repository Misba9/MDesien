import Link from 'next/link'
import { brand, email, navLinks, phones, studioAddress } from '@/lib/site'

const social = [
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: 'https://linkedin.com', label: 'LinkedIn' },
  { href: 'https://pinterest.com', label: 'Pinterest' },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-serif text-2xl tracking-tight text-espresso md:text-3xl">
              {brand.name}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {brand.tagline}
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {studioAddress.singleLine}
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm">
              <a
                href={email.href}
                className="text-foreground/80 transition-colors hover:text-bronze"
              >
                {email.display}
              </a>
              <a
                href={phones[0].href}
                className="text-foreground/80 transition-colors hover:text-bronze"
              >
                {phones[0].display}
              </a>
              <a
                href={phones[1].href}
                className="text-sm text-muted-foreground transition-colors hover:text-bronze"
              >
                {phones[1].display}
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="mb-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Studio
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-bronze"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="mb-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Connect
            </h3>
            <ul className="flex flex-col gap-3">
              {social.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-bronze"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs uppercase tracking-[0.16em] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>
            &copy; {year} {brand.name}. All Rights Reserved.
          </span>
          <span>{brand.locationBadge}</span>
        </div>
      </div>
    </footer>
  )
}
