'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { LogoLockup, LogoMark } from '@/components/site-logo'
import { brand, navLinks, serviceSubLinks } from '@/lib/site'

const easeOut = [0.22, 1, 0.36, 1] as const

/** Dead-zone to prevent flicker from tiny scroll deltas. */
const SCROLL_THRESHOLD = 12
/** Always show when this close to the top. */
const TOP_VISIBLE = 20
/** Require past this scrollY before allowing hide on downward scroll. */
const HIDE_AFTER_Y = 36

const hideTransition = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 34,
  mass: 0.72,
}

const showTransition = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 36,
  mass: 0.62,
}

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -6, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.98,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
}

const panelVariants: Variants = {
  hidden: { opacity: 0, x: '6%' },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease: easeOut },
  },
  exit: {
    opacity: 0,
    x: '4%',
    transition: { duration: 0.26, ease: 'easeOut' },
  },
}

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.06 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: easeOut },
  },
}

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname.startsWith(href)
}

export function SiteHeader() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastYRef = useRef(0)
  const tickingRef = useRef(false)
  const openRef = useRef(false)
  const hiddenRef = useRef(false)

  useEffect(() => {
    openRef.current = open
  }, [open])

  useEffect(() => {
    hiddenRef.current = navHidden
  }, [navHidden])

  // Keep the bar visible while the mobile menu is open.
  useEffect(() => {
    if (open) setNavHidden(false)
  }, [open])

  // Efficient scroll-direction hide / reveal (rAF + hysteresis).
  useEffect(() => {
    lastYRef.current = window.scrollY

    const update = () => {
      tickingRef.current = false
      const y = Math.max(0, window.scrollY)
      const prev = lastYRef.current
      const delta = y - prev

      // Mobile menu open → never hide.
      if (openRef.current) {
        if (hiddenRef.current) setNavHidden(false)
        lastYRef.current = y
        return
      }

      // Near top → always visible.
      if (y <= TOP_VISIBLE) {
        if (hiddenRef.current) setNavHidden(false)
        lastYRef.current = y
        return
      }

      if (delta > SCROLL_THRESHOLD && y > HIDE_AFTER_Y) {
        if (!hiddenRef.current) {
          setServicesDropdownOpen(false)
          setNavHidden(true)
        }
      } else if (delta < -SCROLL_THRESHOLD) {
        if (hiddenRef.current) setNavHidden(false)
      }

      lastYRef.current = y
    }

    const onScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true
      requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setServicesDropdownOpen(false)
    setMobileServicesOpen(false)
    setNavHidden(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const html = document.documentElement
    const previousBody = document.body.style.overflow
    const previousHtml = html.style.overflow
    document.body.style.overflow = 'hidden'
    html.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousBody
      html.style.overflow = previousHtml
    }
  }, [open])

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setServicesDropdownOpen(false)
      setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current)
    }
  }, [])

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current)
    setServicesDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false)
    }, 160)
  }

  const shouldHide = navHidden && !open
  const pillVisible = !shouldHide

  return (
    <>
      {/*
        Floating pill — fixed overlay, no document flow impact.
        Mobile panel stays a sibling (not inside backdrop-filter).
      */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-5 pt-5 sm:px-6 sm:pt-6">
        <motion.div
          className={`flex h-[3.75rem] w-full max-w-[calc(100vw-2.5rem)] items-center gap-3 rounded-full border border-[rgba(140,90,50,0.2)] bg-[rgba(242,237,228,0.94)] px-3 shadow-[0_8px_28px_rgba(36,28,22,0.08)] backdrop-blur-[16px] sm:h-16 sm:gap-4 sm:px-4 md:w-fit md:max-w-[calc(100vw-2.5rem)] md:gap-5 md:px-5 lg:h-[4.25rem] lg:gap-6 lg:px-6 ${
            pillVisible ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          style={{ WebkitBackdropFilter: 'blur(16px)' }}
          initial={false}
          animate={
            reduceMotion
              ? {
                  y: pillVisible ? 0 : '-40%',
                  opacity: pillVisible ? 1 : 0,
                  scale: 1,
                }
              : {
                  y: pillVisible ? 0 : '-120%',
                  opacity: pillVisible ? 1 : 0,
                  scale: pillVisible ? 1 : 0.96,
                }
          }
          transition={
            reduceMotion
              ? { duration: 0.18, ease: 'easeOut' }
              : pillVisible
                ? showTransition
                : hideTransition
          }
          aria-hidden={shouldHide}
        >
          <Link
            href="/"
            aria-label={`${brand.name} home`}
            className="flex shrink-0 items-center outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
            onClick={() => setOpen(false)}
          >
            <LogoLockup
              variant="dark"
              priority
              className="hidden h-auto w-[10.5rem] object-contain sm:block md:w-[11.25rem] lg:w-[12rem]"
            />
            {/* Compact mark on the smallest phones */}
            <LogoMark
              variant="dark"
              priority
              className="h-10 w-auto object-contain sm:hidden"
            />
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex lg:gap-0.5 xl:gap-1"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isServices = link.href === '/services'
              const active = isActivePath(pathname, link.href)

              if (isServices) {
                return (
                  <div
                    key={link.href}
                    ref={dropdownRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="relative"
                  >
                    <div className="flex items-center">
                      <Link
                        href="/services"
                        className={`group relative px-3 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-espresso/80 transition-colors duration-300 outline-none hover:text-bronze focus-visible:text-bronze xl:px-3.5 ${
                          active ? 'text-espresso' : ''
                        }`}
                      >
                        {link.label}
                        {active && !reduceMotion && (
                          <motion.span
                            layoutId="nav-pill-indicator"
                            className="absolute inset-x-3 -bottom-0.5 h-px bg-bronze xl:inset-x-3.5"
                            transition={{
                              type: 'spring',
                              stiffness: 380,
                              damping: 32,
                            }}
                          />
                        )}
                        {active && reduceMotion && (
                          <span
                            className="absolute inset-x-3 -bottom-0.5 h-px bg-bronze"
                            aria-hidden
                          />
                        )}
                        {!active && (
                          <span
                            className="absolute inset-x-3 -bottom-0.5 h-px origin-center scale-x-0 bg-bronze transition-transform duration-300 ease-out group-hover:scale-x-100 xl:inset-x-3.5"
                            aria-hidden
                          />
                        )}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={servicesDropdownOpen}
                        aria-haspopup="menu"
                        aria-controls="services-menu"
                        aria-label="Toggle services menu"
                        onClick={() =>
                          setServicesDropdownOpen((prev) => !prev)
                        }
                        onFocus={handleMouseEnter}
                        className={`-ml-1 rounded-full p-1.5 text-espresso/70 transition-colors outline-none hover:text-bronze focus-visible:ring-1 focus-visible:ring-bronze ${
                          servicesDropdownOpen ? 'text-bronze' : ''
                        }`}
                      >
                        <motion.svg
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden
                          animate={{ rotate: servicesDropdownOpen ? 180 : 0 }}
                          transition={{ duration: reduceMotion ? 0 : 0.25 }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </motion.svg>
                      </button>
                    </div>

                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          id="services-menu"
                          role="menu"
                          aria-label="Services"
                          className="absolute left-0 top-full z-50 w-64 origin-top-left pt-3"
                          variants={
                            reduceMotion
                              ? {
                                  hidden: { opacity: 0 },
                                  visible: { opacity: 1 },
                                  exit: { opacity: 0 },
                                }
                              : dropdownVariants
                          }
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <div className="flex flex-col gap-0.5 rounded-xl border border-[rgba(140,90,50,0.18)] bg-[rgba(242,237,228,0.98)] p-2 shadow-[0_12px_28px_rgba(36,28,22,0.1)] backdrop-blur-md">
                            {serviceSubLinks.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                role="menuitem"
                                onClick={() => setServicesDropdownOpen(false)}
                                className="group/item flex flex-col rounded-lg px-3 py-2.5 text-left transition-colors duration-200 hover:bg-sand/80 outline-none focus-visible:bg-sand/80"
                              >
                                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-espresso transition-colors group-hover/item:text-bronze">
                                  {sub.label}
                                </span>
                                <span className="mt-1 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
                                  {sub.description}
                                </span>
                              </Link>
                            ))}
                            <div className="my-1 border-t border-border/60" />
                            <Link
                              href="/services"
                              role="menuitem"
                              onClick={() => setServicesDropdownOpen(false)}
                              className="rounded-lg px-3 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-bronze transition-colors hover:text-espresso outline-none focus-visible:text-espresso"
                            >
                              View All Services →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative px-3 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-espresso/80 transition-colors duration-300 outline-none hover:text-bronze focus-visible:text-bronze xl:px-3.5 ${
                    active ? 'text-espresso' : ''
                  }`}
                >
                  {link.label}
                  {active && !reduceMotion && (
                    <motion.span
                      layoutId="nav-pill-indicator"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-bronze xl:inset-x-3.5"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  {active && reduceMotion && (
                    <span
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-bronze"
                      aria-hidden
                    />
                  )}
                  {!active && (
                    <span
                      className="absolute inset-x-3 -bottom-0.5 h-px origin-center scale-x-0 bg-bronze transition-transform duration-300 ease-out group-hover:scale-x-100 xl:inset-x-3.5"
                      aria-hidden
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="ml-auto hidden items-center lg:flex lg:ml-1">
            <Link
              href="/contact"
              className="rounded-full border border-espresso/70 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-espresso transition-colors duration-300 hover:border-bronze hover:bg-espresso hover:text-ivory outline-none focus-visible:ring-1 focus-visible:ring-bronze xl:px-5"
            >
              Get in Touch
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-espresso outline-none focus-visible:ring-1 focus-visible:ring-bronze lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <span className="relative block h-[14px] w-5" aria-hidden>
              <motion.span
                className="absolute left-0 top-0 block h-px w-full bg-espresso"
                animate={
                  open ? { y: 6.5, rotate: 45 } : { y: 0, rotate: 0 }
                }
                transition={{ duration: reduceMotion ? 0 : 0.28, ease: easeOut }}
              />
              <motion.span
                className="absolute top-[6.5px] block h-px bg-espresso"
                style={{ right: 0 }}
                animate={
                  open
                    ? { left: 0, width: '100%', rotate: -45 }
                    : { left: '30%', width: '70%', rotate: 0 }
                }
                transition={{ duration: reduceMotion ? 0 : 0.28, ease: easeOut }}
              />
            </span>
          </button>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="fixed inset-0 z-40 flex flex-col overflow-x-hidden overflow-y-auto bg-ivory px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[calc(5.5rem+env(safe-area-inset-top))] sm:px-6 lg:hidden"
            aria-hidden={false}
            variants={reduceMotion ? undefined : panelVariants}
            initial={reduceMotion ? { opacity: 0 } : 'hidden'}
            animate={reduceMotion ? { opacity: 1 } : 'visible'}
            exit={reduceMotion ? { opacity: 0 } : 'exit'}
          >
            <motion.nav
              className="mt-2 flex flex-col gap-1"
              aria-label="Mobile Navigation"
              variants={reduceMotion ? undefined : listVariants}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link) => {
                const isServices = link.href === '/services'
                if (isServices) {
                  return (
                    <motion.div
                      key={link.href}
                      className="border-b border-border/80 py-1"
                      variants={reduceMotion ? undefined : itemVariants}
                    >
                      <div className="flex min-h-12 items-center justify-between gap-3">
                        <Link
                          href="/services"
                          onClick={() => setOpen(false)}
                          className="flex min-h-12 flex-1 items-center font-serif text-2xl text-espresso transition-colors hover:text-bronze outline-none focus-visible:text-bronze"
                        >
                          {link.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            setMobileServicesOpen((prev) => !prev)
                          }
                          aria-expanded={mobileServicesOpen}
                          aria-controls="mobile-services-submenu"
                          aria-label="Toggle Services sub-menu"
                          className="flex h-11 w-11 shrink-0 items-center justify-center text-espresso/70 transition-colors hover:text-bronze outline-none focus-visible:ring-1 focus-visible:ring-bronze"
                        >
                          <motion.svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden
                            animate={{
                              rotate: mobileServicesOpen ? 180 : 0,
                            }}
                            transition={{
                              duration: reduceMotion ? 0 : 0.28,
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </motion.svg>
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {mobileServicesOpen && (
                          <motion.div
                            id="mobile-services-submenu"
                            initial={
                              reduceMotion
                                ? { opacity: 0 }
                                : { height: 0, opacity: 0 }
                            }
                            animate={
                              reduceMotion
                                ? { opacity: 1 }
                                : { height: 'auto', opacity: 1 }
                            }
                            exit={
                              reduceMotion
                                ? { opacity: 0 }
                                : { height: 0, opacity: 0 }
                            }
                            transition={{ duration: 0.28, ease: easeOut }}
                            className="overflow-hidden"
                          >
                            <div className="my-1 flex flex-col gap-1 border-l border-bronze/30 pb-2 pl-4 pt-1">
                              {serviceSubLinks.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setOpen(false)}
                                  className="flex min-h-11 items-center justify-between py-2 text-sm text-espresso/80 transition-colors hover:text-bronze outline-none focus-visible:text-bronze"
                                >
                                  <span>{sub.label}</span>
                                  <span
                                    className="text-xs text-bronze"
                                    aria-hidden
                                  >
                                    →
                                  </span>
                                </Link>
                              ))}
                              <Link
                                href="/services"
                                onClick={() => setOpen(false)}
                                className="py-2 text-xs font-medium uppercase tracking-[0.16em] text-bronze hover:underline outline-none focus-visible:underline"
                              >
                                View All Services
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                }

                return (
                  <motion.div
                    key={link.href}
                    variants={reduceMotion ? undefined : itemVariants}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center border-b border-border/80 py-3 font-serif text-2xl text-espresso transition-colors hover:text-bronze outline-none focus-visible:text-bronze"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
            </motion.nav>

            <motion.div
              className="mt-8"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reduceMotion ? 0 : 0.24,
                duration: 0.32,
                ease: easeOut,
              }}
            >
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block w-full rounded-full py-3.5 text-center text-xs font-medium uppercase tracking-[0.2em] bg-espresso text-ivory transition-colors hover:bg-bronze outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-2"
              >
                Get in Touch
              </Link>
            </motion.div>

            <motion.div
              className="mt-auto flex items-center justify-between gap-4 border-t border-border/80 pt-6"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : 0.32, duration: 0.3 }}
            >
              <LogoLockup variant="dark" className="h-6 w-auto" />
              <p className="text-right text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {brand.locationBadge}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
