import Link from 'next/link'

type DualCtaProps = {
  variant?: 'light' | 'dark'
  lead?: 'projects' | 'contact'
}

const byLead = {
  projects: [
    { href: '/projects', label: 'Explore Projects' },
    { href: '/contact', label: 'Start a Project' },
  ],
  contact: [
    { href: '/contact', label: 'Start a Project' },
    { href: '/projects', label: 'Explore Projects' },
  ],
} as const

const base =
  'inline-flex items-center justify-center px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] outline-none transition-all duration-300 active:scale-[0.98]'

export function DualCta({ variant = 'dark', lead = 'projects' }: DualCtaProps) {
  const light = variant === 'light'

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {byLead[lead].map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          data-cursor="hover"
          className={
            i === 0
              ? light
                ? `${base} bg-ivory text-espresso hover:bg-white focus-visible:ring-1 focus-visible:ring-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-espresso`
                : `${base} bg-espresso text-ivory hover:bg-bronze focus-visible:ring-1 focus-visible:ring-espresso focus-visible:ring-offset-2 focus-visible:ring-offset-ivory`
              : light
                ? `${base} border border-ivory/40 text-ivory hover:bg-ivory hover:text-espresso focus-visible:ring-1 focus-visible:ring-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-espresso`
                : `${base} border border-espresso/30 text-espresso hover:border-bronze hover:text-bronze focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-ivory`
          }
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}
