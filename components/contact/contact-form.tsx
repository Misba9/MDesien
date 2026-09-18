'use client'

import { useState, type FormEvent } from 'react'

const projectTypes = [
  'Architecture',
  'Residential Interior',
  'Corporate Interior',
  'Hospitality',
  'Project Management',
  'Other',
]

const budgetRanges = [
  '₹25 Lakhs – ₹50 Lakhs',
  '₹50 Lakhs – ₹1 Crore',
  '₹1 Crore – ₹3 Crores',
  '₹3 Crores – ₹5 Crores',
  '₹5 Crores +',
]

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    location: '',
    budget: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Please provide your name.'
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your phone number.'
    } else if (!/^[0-9+\s\-()]{7,18}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please provide a valid phone number.'
    }
    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type.'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please share brief details about your project.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[name]
        return copy
      })
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    // Simulate real client submission state readiness
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  if (submitted) {
    return (
      <div className="flex min-h-[360px] flex-col items-start justify-center border border-border bg-white/70 p-8 md:p-12 shadow-sm">
        <span className="text-xs uppercase tracking-[0.3em] text-bronze">
          Enquiry Received
        </span>
        <h3 className="mt-4 max-w-md font-serif text-3xl font-light leading-snug text-espresso">
          Thank you, {formData.name}.
        </h3>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Your project inquiry has been received by the M Desien team in Madhapur,
          Hyderabad. We will review your brief and reach out to discuss next steps.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false)
            setFormData({
              name: '',
              phone: '',
              email: '',
              projectType: '',
              location: '',
              budget: '',
              message: '',
            })
          }}
          className="mt-8 text-xs uppercase tracking-[0.2em] font-medium text-bronze underline-offset-4 hover:underline"
        >
          Send Another Inquiry &rarr;
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Name <span className="text-bronze">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="border-b border-border bg-transparent py-3 text-base text-espresso outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-bronze"
          />
          {errors.name && (
            <span className="text-xs text-red-600">{errors.name}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Phone <span className="text-bronze">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98..."
            className="border-b border-border bg-transparent py-3 text-base text-espresso outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-bronze"
          />
          {errors.phone && (
            <span className="text-xs text-red-600">{errors.phone}</span>
          )}
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Email <span className="text-bronze">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className="border-b border-border bg-transparent py-3 text-base text-espresso outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-bronze"
          />
          {errors.email && (
            <span className="text-xs text-red-600">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Project Type <span className="text-bronze">*</span>
          </label>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="border-b border-border bg-transparent py-3 text-base text-espresso outline-none transition-colors focus:border-bronze cursor-pointer"
          >
            <option value="" disabled className="bg-ivory text-muted-foreground">
              Select project type…
            </option>
            {projectTypes.map((t) => (
              <option key={t} value={t} className="bg-ivory text-espresso">
                {t}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <span className="text-xs text-red-600">{errors.projectType}</span>
          )}
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Project Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Jubilee Hills, Hyderabad / Goa / Bengaluru"
            className="border-b border-border bg-transparent py-3 text-base text-espresso outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-bronze"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Approximate Budget <span className="normal-case text-[11px]">(optional)</span>
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="border-b border-border bg-transparent py-3 text-base text-espresso outline-none transition-colors focus:border-bronze cursor-pointer"
          >
            <option value="" className="bg-ivory text-muted-foreground">
              Select approximate range (optional)…
            </option>
            {budgetRanges.map((b) => (
              <option key={b} value={b} className="bg-ivory text-espresso">
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Message / Brief <span className="text-bronze">*</span>
        </label>
        <textarea
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about the site, scale, timeline, and spatial intentions…"
          className="resize-none border-b border-border bg-transparent py-3 text-base text-espresso outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-bronze"
        />
        {errors.message && (
          <span className="text-xs text-red-600">{errors.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group mt-2 inline-flex w-fit items-center gap-3 bg-espresso px-9 py-4 text-xs uppercase tracking-[0.2em] font-medium text-ivory transition-all hover:bg-bronze disabled:opacity-50"
      >
        <span>{isSubmitting ? 'Submitting...' : 'Send Enquiry'}</span>
        <span className="transition-transform group-hover:translate-x-1" aria-hidden>
          &rarr;
        </span>
      </button>
    </form>
  )
}

