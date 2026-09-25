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

/** Pill ↔ expanded island morph. */
const islandSpring = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 32,
  mass: 0.85,
}

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -5, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.97,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
}

const menuListVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
  exit: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
}

const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
}

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname.startsWith(href)
}

function NavUnderline({
  active,
  reduceMotion,
}: {
  active: boolean
  reduceMotion: boolean | null
}) {
  if (active && !reduceMotion) {
    return (
      <motion.span
        layoutId="nav-pill-indicator"
        className="absolute inset-x-3 -bottom-0.5 h-px bg-bronze xl:inset-x-3.5"
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      />
    )
  }
  if (active && reduceMotion) {
    return (
      <span
        className="absolute inset-x-3 -bottom-0.5 h-px bg-bronze"
        aria-hidden
      />
    )
  }
  return (
    <span
      className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-bronze transition-transform duration-300 ease-out group-hover:scale-x-100 xl:inset-x-3.5"
      aria-hidden
    />
  )
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

      if (openRef.current) {
        if (hiddenRef.current) setNavHidden(false)
        lastYRef.current = y
        return
      }

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
  const iconDuration = reduceMotion ? 0 : 0.3

  return (
    <>
      {/* Soft scrim while the island is expanded — sibling so blur stays on the pill */}
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-espresso/25 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.35, ease: easeOut }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <header
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 sm:px-6"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)',
        }}
      >
        <motion.div
          layout
          className={`flex w-full max-w-[calc(100vw-2rem)] flex-col border border-[rgba(140,90,50,0.2)] bg-[rgba(242,237,228,0.94)] shadow-[0_8px_28px_rgba(36,28,22,0.08)] backdrop-blur-[16px] sm:max-w-[calc(100vw-3rem)] md:w-fit md:max-w-[calc(100vw-3rem)] ${
            open
              ? 'overflow-hidden rounded-[1.75rem] lg:overflow-visible lg:rounded-full'
              : 'overflow-visible rounded-full'
          } ${pillVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
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
              : {
                  layout: islandSpring,
                  y: pillVisible ? showTransition : hideTransition,
                  opacity: pillVisible ? showTransition : hideTransition,
                  scale: pillVisible ? showTransition : hideTransition,
                  borderRadius: islandSpring,
                }
          }
          aria-hidden={shouldHide}
        >
          {/* Closed row — logo + desktop nav + CTA + mobile toggle */}
          <div className="flex h-14 shrink-0 items-center gap-3 px-3 sm:h-16 sm:gap-4 sm:px-4 md:gap-5 md:px-5 lg:h-[4.25rem] lg:gap-6 lg:px-6">
            <Link
              href="/"
              aria-label={`${brand.name} home`}
              className="flex shrink-0 items-center outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              onClick={() => setOpen(false)}
            >
              <LogoLockup
                variant="dark"
                priority
                className="hidden h-9 w-auto object-contain object-left sm:block md:h-10 lg:h-11"
              />
              <LogoMark
                variant="dark"
                priority
                className="h-9 w-auto object-contain sm:hidden"
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
                          className={`group relative px-3 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-espresso/80 transition-[color,transform] duration-200 outline-none hover:-translate-y-px hover:text-bronze focus-visible:text-bronze xl:px-3.5 ${
                            active ? 'text-espresso' : ''
                          }`}
                        >
                          {link.label}
                          <NavUnderline
                            active={active}
                            reduceMotion={reduceMotion}
                          />
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
                            animate={{
                              rotate: servicesDropdownOpen ? 180 : 0,
                            }}
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
                    className={`group relative px-3 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-espresso/80 transition-[color,transform] duration-200 outline-none hover:-translate-y-px hover:text-bronze focus-visible:text-bronze xl:px-3.5 ${
                      active ? 'text-espresso' : ''
                    }`}
                  >
                    {link.label}
                    <NavUnderline
                      active={active}
                      reduceMotion={reduceMotion}
                    />
                  </Link>
                )
              })}
            </nav>

            <div className="ml-auto hidden items-center lg:flex lg:ml-1">
              <Link
                href="/contact"
                className="rounded-full border border-espresso/70 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-espresso transition-all duration-200 hover:-translate-y-px hover:scale-[1.012] hover:border-bronze hover:bg-espresso hover:text-ivory active:scale-[0.98] outline-none focus-visible:ring-1 focus-visible:ring-bronze xl:px-5"
              >
                Get in Touch
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="relative ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-espresso outline-none focus-visible:ring-1 focus-visible:ring-bronze lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <span className="relative block h-[14px] w-5" aria-hidden>
                <motion.span
                  className="absolute left-0 top-0 block h-px w-full origin-center bg-espresso"
                  animate={
                    open ? { y: 6.5, rotate: 45 } : { y: 0, rotate: 0 }
                  }
                  transition={{ duration: iconDuration, ease: easeOut }}
                />
                <motion.span
                  className="absolute top-[6.5px] block h-px origin-center bg-espresso"
                  style={{ right: 0 }}
                  animate={
                    open
                      ? { left: 0, width: '100%', rotate: -45 }
                      : { left: '30%', width: '70%', rotate: 0 }
                  }
                  transition={{ duration: iconDuration, ease: easeOut }}
                />
              </span>
            </button>
          </div>

          {/* Mobile island expansion — morphs from the same pill */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id="mobile-navigation"
                key="mobile-island"
                className="lg:hidden"
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, height: 0 }
                }
                animate={
                  reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, height: 'auto' }
                }
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, height: 0 }
                }
                transition={
                  reduceMotion
                    ? { duration: 0.2 }
                    : islandSpring
                }
              >
                <motion.nav
                  className="flex flex-col gap-0.5 border-t border-[rgba(140,90,50,0.12)] px-4 pb-4 pt-2"
                  aria-label="Mobile Navigation"
                  variants={reduceMotion ? undefined : menuListVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {navLinks.map((link) => {
                    const isServices = link.href === '/services'
                    if (isServices) {
                      return (
                        <motion.div
                          key={link.href}
                          className="py-0.5"
                          variants={
                            reduceMotion ? undefined : menuItemVariants
                          }
                        >
                          <div className="flex min-h-11 items-center justify-between gap-3">
                            <Link
                              href="/services"
                              onClick={() => setOpen(false)}
                              className="flex min-h-11 flex-1 items-center font-serif text-xl text-espresso transition-colors hover:text-bronze outline-none focus-visible:text-bronze"
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
                                transition={{
                                  duration: 0.28,
                                  ease: easeOut,
                                }}
                                className="overflow-hidden"
                              >
                                <div className="mb-1 flex flex-col gap-0.5 border-l border-bronze/30 pb-1 pl-4 pt-1">
                                  {serviceSubLinks.map((sub) => (
                                    <Link
                                      key={sub.href}
                                      href={sub.href}
                                      onClick={() => setOpen(false)}
                                      className="flex min-h-10 items-center justify-between py-1.5 text-sm text-espresso/80 transition-colors hover:text-bronze outline-none focus-visible:text-bronze"
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
                                    className="py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-bronze hover:underline outline-none focus-visible:underline"
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
                        variants={
                          reduceMotion ? undefined : menuItemVariants
                        }
                      >
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="flex min-h-11 items-center py-2.5 font-serif text-xl text-espresso transition-colors hover:text-bronze outline-none focus-visible:text-bronze"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    )
                  })}

                  <motion.div
                    className="pt-3"
                    variants={reduceMotion ? undefined : menuItemVariants}
                  >
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="block w-full rounded-full bg-espresso py-3.5 text-center text-xs font-medium uppercase tracking-[0.2em] text-ivory transition-all duration-200 hover:bg-bronze active:scale-[0.98] outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-2"
                    >
                      Get in Touch
                    </Link>
                  </motion.div>
                </motion.nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>
    </>
  )
}
