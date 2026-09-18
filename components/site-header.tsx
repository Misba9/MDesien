'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { HeaderLogoCrossfade, LogoLockup } from '@/components/site-logo'
import { brand, navLinks, serviceSubLinks } from '@/lib/site'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Scroll detection for sticky header state & elevation
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus when route changes
  useEffect(() => {
    setOpen(false)
    setServicesDropdownOpen(false)
    setMobileServicesOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Handle outside clicks to close desktop dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Escape key handler for accessible dropdown closure
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setServicesDropdownOpen(false)
    }
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setServicesDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false)
    }, 150)
  }

  const darkHero =
    pathname === '/' ||
    (pathname.startsWith('/projects/') && pathname !== '/projects')
  const lightText = darkHero && !scrolled && !open

  return (
    <header
      onKeyDown={handleKeyDown}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'bg-ivory/95 backdrop-blur-md shadow-[0_4px_24px_rgba(36,28,22,0.06)] border-b border-border/80'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-10">
        {/* Logo */}
        <Link
          href="/"
          aria-label={`${brand.name} home`}
          className="flex items-center shrink-0"
        >
          <HeaderLogoCrossfade isLight={lightText} scrolled={scrolled} />
        </Link>

        {/* Desktop Navigation: [Logo] Home About Services ▾ Projects Blog Contact [Get in Touch] */}
        <nav
          className="hidden items-center gap-7 lg:gap-9 md:flex"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isServices = link.href === '/services'
            const active =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href)

            if (isServices) {
              return (
                <div
                  key={link.href}
                  ref={dropdownRef}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative group"
                >
                  <div className="flex items-center gap-1">
                    <Link
                      href="/services"
                      className={`relative text-xs uppercase tracking-[0.2em] transition-colors py-2 ${
                        lightText
                          ? 'text-ivory/80 hover:text-ivory'
                          : 'text-foreground/80 hover:text-foreground'
                      } ${active ? (lightText ? 'text-ivory' : 'text-espresso font-medium') : ''}`}
                    >
                      {link.label}
                      <span
                        className={`absolute bottom-0 left-0 h-px bg-bronze transition-all duration-300 ${
                          active ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>
                    <button
                      type="button"
                      aria-expanded={servicesDropdownOpen}
                      aria-haspopup="true"
                      aria-label="Toggle services menu"
                      onClick={() => setServicesDropdownOpen((prev) => !prev)}
                      className={`p-1 transition-transform duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze rounded ${
                        lightText ? 'text-ivory/80' : 'text-foreground/80'
                      } ${servicesDropdownOpen ? 'rotate-180 text-bronze' : ''}`}
                    >
                      <svg
                        className="w-3 h-3 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Desktop Dropdown Panel */}
                  <div
                    className={`absolute left-0 top-full pt-2 w-72 transition-all duration-200 origin-top-left ${
                      servicesDropdownOpen
                        ? 'opacity-100 scale-100 pointer-events-auto visible translate-y-0'
                        : 'opacity-0 scale-95 pointer-events-none invisible -translate-y-1'
                    }`}
                  >
                    <div className="bg-ivory border border-border/80 shadow-[0_12px_32px_rgba(36,28,22,0.12)] rounded-sm p-2 flex flex-col gap-1 backdrop-blur-sm">
                      {serviceSubLinks.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="group/item flex flex-col p-2.5 rounded-sm hover:bg-cream transition-colors text-left"
                        >
                          <span className="text-xs uppercase tracking-[0.16em] font-medium text-espresso group-hover/item:text-bronze transition-colors flex items-center justify-between">
                            {sub.label}
                            <span className="opacity-0 group-hover/item:opacity-100 transition-opacity text-bronze text-sm">
                              →
                            </span>
                          </span>
                          <span className="text-[11px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">
                            {sub.description}
                          </span>
                        </Link>
                      ))}
                      <div className="border-t border-border/60 my-1" />
                      <Link
                        href="/services"
                        className="px-2.5 py-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-bronze hover:text-espresso transition-colors"
                      >
                        View All Services →
                      </Link>
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-xs uppercase tracking-[0.2em] transition-colors py-2 ${
                  lightText
                    ? 'text-ivory/80 hover:text-ivory'
                    : 'text-foreground/80 hover:text-foreground'
                } ${active ? (lightText ? 'text-ivory' : 'text-espresso font-medium') : ''}`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-bronze transition-all duration-300 ${
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA: [Get in Touch] */}
        <div className="hidden md:flex items-center">
          <Link
            href="/contact"
            className={`px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-medium border transition-all duration-300 rounded-none ${
              lightText
                ? 'border-ivory/60 text-ivory hover:bg-ivory hover:text-espresso'
                : 'border-espresso/80 text-espresso hover:bg-espresso hover:text-ivory'
            }`}
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-9 w-9 flex-col items-end justify-center gap-1.5 md:hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span
            className={`h-px transition-all duration-300 ${
              lightText ? 'bg-ivory' : 'bg-foreground'
            } ${open ? 'w-6 translate-y-[3.5px] rotate-45 !bg-espresso' : 'w-6'}`}
          />
          <span
            className={`h-px transition-all duration-300 ${
              lightText ? 'bg-ivory' : 'bg-foreground'
            } ${open ? 'w-6 -translate-y-[3.5px] -rotate-45 !bg-espresso' : 'w-4'}`}
          />
        </button>
      </div>

      {/* Mobile Slide-out Menu */}
      <div
        className={`fixed inset-0 top-0 z-40 flex flex-col bg-ivory px-6 pt-20 pb-8 transition-all duration-500 md:hidden overflow-y-auto ${
          open
            ? 'pointer-events-auto opacity-100 translate-x-0'
            : 'pointer-events-none opacity-0 translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-1 mt-4" aria-label="Mobile Navigation">
          {navLinks.map((link) => {
            const isServices = link.href === '/services'
            if (isServices) {
              return (
                <div key={link.href} className="border-b border-border/80 py-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href="/services"
                      onClick={() => setOpen(false)}
                      className="font-serif text-2xl text-espresso hover:text-bronze transition-colors"
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((prev) => !prev)}
                      aria-expanded={mobileServicesOpen}
                      aria-label="Toggle Services sub-menu"
                      className="p-2 text-espresso/70 hover:text-bronze focus:outline-none"
                    >
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${
                          mobileServicesOpen ? 'rotate-180 text-bronze' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Mobile Collapsible Submenu */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileServicesOpen
                        ? 'max-h-64 opacity-100 pt-2 pb-1'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="flex flex-col gap-2 pl-4 border-l border-bronze/30 my-1">
                      {serviceSubLinks.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setOpen(false)}
                          className="py-1 text-sm text-foreground/80 hover:text-bronze transition-colors flex items-center justify-between"
                        >
                          <span>{sub.label}</span>
                          <span className="text-bronze text-xs">→</span>
                        </Link>
                      ))}
                      <Link
                        href="/services"
                        onClick={() => setOpen(false)}
                        className="pt-1 text-xs uppercase tracking-[0.16em] font-medium text-bronze hover:underline"
                      >
                        View All Services
                      </Link>
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/80 py-3.5 font-serif text-2xl text-espresso hover:text-bronze transition-colors"
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile CTA */}
        <div className="mt-8">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block w-full py-3.5 text-center text-xs uppercase tracking-[0.2em] font-medium bg-espresso text-ivory hover:bg-bronze transition-colors"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Footer Meta */}
        <div className="mt-auto pt-6 flex items-center justify-between border-t border-border/80">
          <LogoLockup variant="dark" className="h-6 w-auto" />
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {brand.locationBadge}
          </p>
        </div>
      </div>
    </header>
  )
}

