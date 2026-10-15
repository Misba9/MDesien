'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { phones, whatsapp } from '@/lib/site'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

export function ContactFloat() {
  const [phoneOpen, setPhoneOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  useEffect(() => {
    if (!phoneOpen) return

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setPhoneOpen(false)
      }
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPhoneOpen(false)
    }

    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [phoneOpen])

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed bottom-5 right-4 z-[70] flex flex-col items-end gap-3 sm:bottom-8 sm:right-6"
    >
      {phoneOpen && (
        <div
          id={listId}
          role="dialog"
          aria-label="Call the studio"
          className="pointer-events-auto w-[min(18.5rem,calc(100vw-2rem))] border border-border bg-ivory shadow-[0_18px_50px_-28px_rgba(36,28,22,0.55)]"
        >
          <div className="border-b border-border px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-bronze">
              Call the studio
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick a number — we answer during studio hours.
            </p>
          </div>
          <ul className="divide-y divide-border">
            {phones.map((phone, index) => (
              <li key={phone.href}>
                <a
                  href={phone.href}
                  className="flex items-center justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-sand/60 focus-visible:bg-sand/60 outline-none"
                  onClick={() => setPhoneOpen(false)}
                >
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {index === 0 ? 'Primary' : 'Alternate'}
                    </span>
                    <span className="mt-1 block font-serif text-xl text-espresso">
                      {phone.display}
                    </span>
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center bg-espresso text-ivory">
                    <PhoneIcon className="h-4 w-4" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pointer-events-auto flex flex-col items-stretch gap-2.5">
        <a
          href={whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          aria-label="Chat on WhatsApp"
          className="group relative inline-flex min-h-12 items-center gap-3 bg-[#1FAF57] px-4 py-3 text-white shadow-[0_14px_36px_-18px_rgba(31,175,87,0.9)] transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#1FAF57] focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-1 -z-10 animate-[contact-float-pulse_2.8s_ease-out_infinite] border border-[#1FAF57]/40 motion-reduce:animate-none"
          />
          <WhatsAppIcon className="relative h-5 w-5 shrink-0" />
          <span className="relative flex min-w-0 flex-col leading-tight">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/85">
              WhatsApp
            </span>
            <span className="text-sm font-medium tracking-wide">
              Chat with us
            </span>
          </span>
        </a>

        <button
          type="button"
          data-cursor="hover"
          aria-label="Call the studio"
          aria-expanded={phoneOpen}
          aria-controls={listId}
          onClick={() => setPhoneOpen((open) => !open)}
          className="group inline-flex min-h-12 items-center gap-3 bg-espresso px-4 py-3 text-ivory transition-colors duration-300 hover:bg-bronze active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        >
          <PhoneIcon className="h-5 w-5 shrink-0" />
          <span className="flex min-w-0 flex-col leading-tight text-left">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ivory/70">
              Phone
            </span>
            <span className="text-sm font-medium tracking-wide">
              {phoneOpen ? 'Close numbers' : 'Call now'}
            </span>
          </span>
        </button>
      </div>
    </div>
  )
}
