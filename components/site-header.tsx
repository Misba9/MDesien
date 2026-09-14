'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const links = [
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'Studio' },
  { href: '/journal', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const darkHero =
    pathname === '/' ||
    (pathname.startsWith('/projects/') && pathname !== '/projects')
  // Light text only while the header floats transparently over a dark hero image
  const lightText = darkHero && !scrolled && !open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? 'bg-ivory/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-10">
        <Link
          href="/"
          className="flex items-baseline gap-2 font-serif text-2xl leading-none tracking-tight"
        >
          <span className={lightText ? 'text-ivory' : 'text-espresso'}>M</span>
          <span
            className={`text-sm font-sans font-light uppercase tracking-[0.3em] ${
              lightText ? 'text-ivory/80' : 'text-muted-foreground'
            }`}
          >
            Design
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => {
            const active = pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-xs uppercase tracking-[0.2em] transition-colors ${
                  lightText
                    ? 'text-ivory/80 hover:text-ivory'
                    : 'text-foreground/80 hover:text-foreground'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-bronze transition-all duration-300 ${
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-8 w-8 flex-col items-end justify-center gap-1.5 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span
            className={`h-px transition-all duration-300 ${
              lightText ? 'bg-ivory' : 'bg-foreground'
            } ${open ? 'w-6 translate-y-[3.5px] rotate-45' : 'w-6'}`}
          />
          <span
            className={`h-px transition-all duration-300 ${
              lightText ? 'bg-ivory' : 'bg-foreground'
            } ${open ? 'w-6 -translate-y-[3.5px] -rotate-45' : 'w-4'}`}
          />
        </button>
      </div>

      <div
        className={`fixed inset-0 top-0 z-40 flex flex-col bg-ivory px-6 pt-24 transition-all duration-500 md:hidden ${
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-2">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b border-border py-5 font-serif text-3xl text-espresso"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="mt-auto pb-10 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Studio — Mumbai, IN
        </p>
      </div>
    </header>
  )
}
