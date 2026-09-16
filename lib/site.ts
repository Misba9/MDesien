export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mdesien.com'

export const brand = {
  name: 'M Desien',
  legal: 'M Desien',
  tagline: 'Architecture & Interior Design Studio',
  locationBadge: 'Studio — Hyderabad, IN',
}

export const studioAddress = {
  heading: 'Studio',
  lines: [
    '3rd Floor, Sai Sudha Sadan',
    'Plot No. 15/1, Sector 3',
    'HUDA Techno Enclave',
    'Opp. Mindspace Raheja IT Park',
    'Madhapur, Hyderabad – 500081',
  ],
  singleLine:
    '3rd Floor, Sai Sudha Sadan, Plot No. 15/1, Sector 3, HUDA Techno Enclave, Opp. Mindspace Raheja IT Park, Madhapur, Hyderabad – 500081',
}

export const phones = [
  { display: '+91 9811769424', href: 'tel:+919811769424' },
  { display: '+91 9810199913', href: 'tel:+919810199913' },
] as const

export const email = {
  display: 'info@mdesien.com',
  href: 'mailto:info@mdesien.com',
}

export const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
] as const
