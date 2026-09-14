'use client'

import { useState, type FormEvent } from 'react'

const budgets = ['Under ₹1 Cr', '₹1–3 Cr', '₹3–8 Cr', '₹8 Cr +']
const services = ['Architecture', 'Interior Design', 'Master Planning', 'Other']

export function ContactForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex min-h-[320px] flex-col items-start justify-center border border-border bg-white/60 p-10">
        <p className="text-xs uppercase tracking-[0.3em] text-bronze">
          Thank you
        </p>
        <p className="mt-4 max-w-md font-serif text-3xl font-light leading-snug text-espresso text-balance">
          Your enquiry has been noted. We&apos;ll be in touch within a few days.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground underline-offset-4 hover:underline"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" />
        <Field label="Location" name="location" />
      </div>

      <fieldset>
        <legend className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Service
        </legend>
        <div className="flex flex-wrap gap-3">
          {services.map((s) => (
            <label
              key={s}
              className="cursor-pointer border border-border px-4 py-2 text-sm text-foreground/80 transition-colors has-[:checked]:border-bronze has-[:checked]:bg-bronze has-[:checked]:text-ivory"
            >
              <input type="radio" name="service" value={s} className="sr-only" />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Budget
        </legend>
        <div className="flex flex-wrap gap-3">
          {budgets.map((b) => (
            <label
              key={b}
              className="cursor-pointer border border-border px-4 py-2 text-sm text-foreground/80 transition-colors has-[:checked]:border-bronze has-[:checked]:bg-bronze has-[:checked]:text-ivory"
            >
              <input type="radio" name="budget" value={b} className="sr-only" />
              {b}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Tell us about your project
        </span>
        <textarea
          name="message"
          rows={5}
          required
          className="resize-none border-b border-border bg-transparent py-3 text-lg text-espresso outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-bronze"
          placeholder="A few lines about the site, brief and timeline…"
        />
      </label>

      <button
        type="submit"
        className="group mt-2 inline-flex w-fit items-center gap-3 bg-espresso px-8 py-4 text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-bronze"
      >
        Send enquiry
        <span className="transition-transform group-hover:translate-x-1" aria-hidden>
          &rarr;
        </span>
      </button>
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <label className="flex flex-col gap-3">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
        {required && <span className="text-bronze"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="border-b border-border bg-transparent py-3 text-lg text-espresso outline-none transition-colors focus:border-bronze"
      />
    </label>
  )
}
