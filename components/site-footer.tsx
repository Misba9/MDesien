import Link from 'next/link'
import { LogoLockup, LogoMark } from '@/components/site-logo'
import { brand, email, navLinks, phones, serviceSubLinks, studioAddress } from '@/lib/site'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand & Address block */}
          <div className="md:col-span-6">
            <Link
              href="/"
              aria-label={`${brand.name} home`}
              className="inline-block transition-opacity hover:opacity-85"
            >
              <LogoLockup variant="dark" className="h-10 md:h-12 w-auto" />
            </Link>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-bronze">
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

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h3 className="mb-5 text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Navigation
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

          {/* Services Links */}
          <div className="md:col-span-3">
            <h3 className="mb-5 text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {serviceSubLinks.map((sub) => (
                <li key={sub.href}>
                  <Link
                    href={sub.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-bronze"
                  >
                    {sub.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-xs uppercase tracking-[0.16em] text-bronze hover:underline pt-1 inline-block"
                >
                  All Services &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs uppercase tracking-[0.16em] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2.5">
            <LogoMark variant="dark" className="h-4 w-auto opacity-75" />
            <span>
              &copy; {year} {brand.name}. All Rights Reserved.
            </span>
          </div>
          <span>{brand.locationBadge}</span>
        </div>
      </div>
    </footer>
  )
}

