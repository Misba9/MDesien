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

export function DualCta({ variant = 'dark', lead = 'projects' }: DualCtaProps) {
  const light = variant === 'light'

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {byLead[lead].map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            i === 0
              ? light
                ? 'inline-flex items-center justify-center bg-ivory px-8 py-4 text-xs uppercase tracking-[0.2em] text-espresso transition-colors hover:bg-white'
                : 'inline-flex items-center justify-center bg-espresso px-8 py-4 text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-bronze'
              : light
                ? 'inline-flex items-center justify-center border border-ivory/40 px-8 py-4 text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-ivory hover:text-espresso'
                : 'inline-flex items-center justify-center border border-espresso/30 px-8 py-4 text-xs uppercase tracking-[0.2em] text-espresso transition-colors hover:border-bronze hover:text-bronze'
          }
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}
