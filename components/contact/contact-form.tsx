'use client'

import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

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

const fieldClass =
  'border-b border-border bg-transparent py-3 text-base text-espresso outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-bronze aria-invalid:border-red-500'

export function ContactForm() {
  const reduceMotion = useReducedMotion()
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
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Please provide your name.'
      case 'email':
        if (!value.trim()) return 'Please provide your email address.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please provide a valid email address.'
        }
        return ''
      case 'phone':
        if (!value.trim()) return 'Please provide your phone number.'
        if (!/^[0-9+\s\-()]{7,18}$/.test(value.trim())) {
          return 'Please provide a valid phone number.'
        }
        return ''
      case 'projectType':
        return value ? '' : 'Please select a project type.'
      case 'message':
        return value.trim()
          ? ''
          : 'Please share brief details about your project.'
      default:
        return ''
    }
  }

  const validate = () => {
    const fields = ['name', 'email', 'phone', 'projectType', 'message'] as const
    const newErrors: Record<string, string> = {}
    for (const field of fields) {
      const message = validateField(field, formData[field])
      if (message) newErrors[field] = message
    }
    setErrors(newErrors)
    setTouched(
      Object.fromEntries(fields.map((field) => [field, true])) as Record<
        string,
        boolean
      >,
    )
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const message = validateField(name, value)
      setErrors((prev) => {
        const copy = { ...prev }
        if (message) copy[name] = message
        else delete copy[name]
        return copy
      })
    }
  }

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const message = validateField(name, value)
    setErrors((prev) => {
      const copy = { ...prev }
      if (message) copy[name] = message
      else delete copy[name]
      return copy
    })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  const resetForm = () => {
    setSubmitted(false)
    setErrors({})
    setTouched({})
    setFormData({
      name: '',
      phone: '',
      email: '',
      projectType: '',
      location: '',
      budget: '',
      message: '',
    })
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          role="status"
          aria-live="polite"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex min-h-[360px] flex-col items-start justify-center border border-border bg-white/70 p-8 shadow-sm md:p-12"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-bronze">
            Enquiry Received
          </span>
          <h3 className="mt-4 max-w-md font-serif text-3xl font-light leading-snug text-espresso">
            Thank you, {formData.name}.
          </h3>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Your project inquiry has been received by the M Desien team in
            Madhapur, Hyderabad. We will review your brief and reach out to
            discuss next steps.
          </p>
          <button
            type="button"
            onClick={resetForm}
            className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-bronze underline-offset-4 transition-colors hover:text-espresso hover:underline"
          >
            Send Another Inquiry &rarr;
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-8"
        >
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-name"
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                Name <span className="text-bronze">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your full name"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                className={fieldClass}
              />
              {errors.name && (
                <span
                  id="contact-name-error"
                  role="alert"
                  className="text-xs text-red-600"
                >
                  {errors.name}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-phone"
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                Phone <span className="text-bronze">*</span>
              </label>
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+91 98..."
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={
                  errors.phone ? 'contact-phone-error' : undefined
                }
                className={fieldClass}
              />
              {errors.phone && (
                <span
                  id="contact-phone-error"
                  role="alert"
                  className="text-xs text-red-600"
                >
                  {errors.phone}
                </span>
              )}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-email"
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                Email <span className="text-bronze">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="name@example.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? 'contact-email-error' : undefined
                }
                className={fieldClass}
              />
              {errors.email && (
                <span
                  id="contact-email-error"
                  role="alert"
                  className="text-xs text-red-600"
                >
                  {errors.email}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-project-type"
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                Project Type <span className="text-bronze">*</span>
              </label>
              <select
                id="contact-project-type"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.projectType)}
                aria-describedby={
                  errors.projectType ? 'contact-project-type-error' : undefined
                }
                className={`${fieldClass} cursor-pointer`}
              >
                <option
                  value=""
                  disabled
                  className="bg-ivory text-muted-foreground"
                >
                  Select project type…
                </option>
                {projectTypes.map((t) => (
                  <option key={t} value={t} className="bg-ivory text-espresso">
                    {t}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <span
                  id="contact-project-type-error"
                  role="alert"
                  className="text-xs text-red-600"
                >
                  {errors.projectType}
                </span>
              )}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-location"
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                Project Location
              </label>
              <input
                id="contact-location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Jubilee Hills, Hyderabad / Goa / Bengaluru"
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-budget"
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                Approximate Budget{' '}
                <span className="normal-case text-[11px]">(optional)</span>
              </label>
              <select
                id="contact-budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`${fieldClass} cursor-pointer`}
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
            <label
              htmlFor="contact-message"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              Message / Brief <span className="text-bronze">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tell us about the site, scale, timeline, and spatial intentions…"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? 'contact-message-error' : undefined
              }
              className={`${fieldClass} resize-none`}
            />
            {errors.message && (
              <span
                id="contact-message-error"
                role="alert"
                className="text-xs text-red-600"
              >
                {errors.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            data-cursor="hover"
            className="group mt-2 inline-flex w-fit items-center gap-3 bg-espresso px-9 py-4 text-xs font-medium uppercase tracking-[0.2em] text-ivory outline-none transition-all duration-300 hover:bg-bronze focus-visible:ring-1 focus-visible:ring-espresso focus-visible:ring-offset-2 focus-visible:ring-offset-ivory active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Submitting...' : 'Send Enquiry'}</span>
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              &rarr;
            </span>
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
