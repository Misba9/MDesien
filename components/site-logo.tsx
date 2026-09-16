type LogoProps = {
  className?: string
}

/** Interlocking M+D monogram. Replace this SVG when the final artwork is supplied. */
export function LogoMark({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 72 72"
      className={className}
      aria-hidden
      fill="none"
    >
      <rect x="1.5" y="1.5" width="69" height="69" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16 52V20h7.4L36 42.6 48.6 20H56v32h-7.2V32.2L37.6 52h-3.2L23.2 32.2V52H16Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function LogoLockup({ className }: LogoProps) {
  return (
    <span className={className}>
      <span className="inline-flex items-center gap-3">
        <LogoMark className="h-8 w-8 shrink-0" />
        <span className="font-sans text-[13px] font-light uppercase tracking-[0.28em]">
          M Desien
        </span>
      </span>
    </span>
  )
}
