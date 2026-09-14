import Link from 'next/link'

const columns = [
  {
    heading: 'Studio',
    links: [
      { href: '/projects', label: 'Projects' },
      { href: '/about', label: 'About' },
      { href: '/journal', label: 'Journal' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { href: 'https://instagram.com', label: 'Instagram' },
      { href: 'https://linkedin.com', label: 'LinkedIn' },
      { href: 'https://pinterest.com', label: 'Pinterest' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-serif text-3xl leading-tight text-espresso md:text-4xl text-balance">
              Let&apos;s make something considered.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-bronze"
            >
              Start a conversation
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>

          {columns.map((col) => (
            <div key={col.heading} className="md:col-span-3">
              <h3 className="mb-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
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
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs uppercase tracking-[0.16em] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>&copy; {new Date().getFullYear()} M Design</span>
          <span>Architecture &amp; Interior Studio</span>
          <span>Mumbai — Pune — Goa</span>
        </div>
      </div>
    </footer>
  )
}
