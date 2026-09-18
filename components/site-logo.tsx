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
      src={isLight ? '/logo-horizontal-light.png' : '/logo-horizontal.png'}
      alt="M Desien Architecture & Interior Design Studio"
      width={1113}
      height={160}
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
      className={`relative flex items-center transition-transform duration-500 ${
        scrolled ? 'scale-95' : 'scale-100'
      }`}
    >
      {/* Desktop Horizontal Logo */}
      <div className="relative hidden md:block h-8 lg:h-9 w-[220px] lg:w-[250px]">
        <Image
          src="/logo-horizontal-light.png"
          alt="M Desien"
          fill
          sizes="250px"
          priority
          className={`object-contain object-left transition-opacity duration-500 ${
            isLight ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
        <Image
          src="/logo-horizontal.png"
          alt="M Desien"
          fill
          sizes="250px"
          priority
          className={`object-contain object-left transition-opacity duration-500 ${
            isLight ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      </div>

      {/* Mobile Monogram Mark */}
      <div className="relative block md:hidden h-8 w-11">
        <Image
          src="/logo-mark-light.png"
          alt="M Desien"
          fill
          sizes="48px"
          priority
          className={`object-contain object-left transition-opacity duration-500 ${
            isLight ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
        <Image
          src="/logo-mark.png"
          alt="M Desien"
          fill
          sizes="48px"
          priority
          className={`object-contain object-left transition-opacity duration-500 ${
            isLight ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      </div>
    </div>
  )
}
