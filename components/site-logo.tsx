import Image from 'next/image'

export type LogoVariant = 'dark' | 'light'

export type LogoProps = {
  variant?: LogoVariant
  className?: string
  priority?: boolean
}

/**
 * Authentic MD Monogram Mark
 * Dark: Rich embossed bronze/espresso for ivory & light surfaces
 * Light: Warm champagne gold for dark backgrounds
 */
export function LogoMark({
  variant = 'dark',
  className = 'h-8 w-auto',
  priority = false,
}: LogoProps) {
  const isLight = variant === 'light'
  return (
    <Image
      src={isLight ? '/logo-mark-light.png' : '/logo-mark.png'}
      alt="M Desien Monogram"
      width={657}
      height={isLight ? 454 : 482}
      className={`object-contain ${className}`}
      priority={priority}
    />
  )
}

/**
 * Full Horizontal Logo Lockup (MD Monogram + M DESIEN + Subtitle)
 * Perfectly proportioned for headers, footers and navigation bars.
 */
export function LogoLockup({
  variant = 'dark',
  className = 'h-9 w-auto',
  priority = false,
}: LogoProps) {
  const isLight = variant === 'light'
  return (
    <Image
      src={isLight ? '/logo-horizontal-light.png' : '/logo-horz.png'}
      alt="M Desien Architecture & Interior Design Studio"
      width={isLight ? 1113 : 1127}
      height={isLight ? 160 : 221}
      className={`object-contain ${className}`}
      priority={priority}
    />
  )
}

/**
 * Full Centered Brand Crest Lockup (MD Monogram + M DESIEN + Subtitle + Tagline)
 * For hero features, editorial sections, and showcase panels.
 */
export function LogoFull({
  variant = 'dark',
  className = 'h-32 w-auto',
  priority = false,
}: LogoProps) {
  const isLight = variant === 'light'
  return (
    <Image
      src={isLight ? '/logo-full-light.png' : '/logo-full.png'}
      alt="M Desien Architecture & Interior Design Studio"
      width={1112}
      height={718}
      className={`object-contain ${className}`}
      priority={priority}
    />
  )
}

/**
 * Smooth Crossfade Logo for SiteHeader
 * Seamlessly transitions between light (champagne gold) and dark (bronze)
 * on scroll without layout shift or network delay.
 */
export function HeaderLogoCrossfade({
  isLight,
  scrolled,
}: {
  isLight: boolean
  scrolled: boolean
}) {
  return (
    <div
      className={`relative flex items-center transition-transform duration-500 ease-out ${
        scrolled ? 'scale-[0.96]' : 'scale-100'
      }`}
    >
      {/* Desktop horizontal lockup — shown with full nav (lg+) */}
      <div className="relative hidden h-8 w-[220px] lg:block lg:h-10 lg:w-[260px]">
        <Image
          src="/logo-horizontal-light.png"
          alt=""
          fill
          sizes="260px"
          priority
          aria-hidden={!isLight}
          className={`object-contain object-left transition-opacity duration-500 ease-out ${
            isLight ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
        <Image
          src="/logo-horz.png"
          alt=""
          fill
          sizes="260px"
          priority
          aria-hidden={isLight}
          className={`object-contain object-left transition-opacity duration-500 ease-out ${
            isLight ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      </div>

      {/* Compact MD mark for mobile + tablet hamburger header (~48–52px) */}
      <div className="relative block h-12 w-[70px] sm:h-[3.25rem] sm:w-[76px] lg:hidden">
        <Image
          src="/logo-mark-light.png"
          alt=""
          fill
          sizes="76px"
          priority
          aria-hidden={!isLight}
          className={`object-contain object-left transition-opacity duration-500 ease-out ${
            isLight ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
        <Image
          src="/logo-mark.png"
          alt=""
          fill
          sizes="76px"
          priority
          aria-hidden={isLight}
          className={`object-contain object-left transition-opacity duration-500 ease-out ${
            isLight ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      </div>
    </div>
  )
}
