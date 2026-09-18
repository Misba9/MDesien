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

export const serviceSubLinks = [
  {
    href: '/services/architecture',
    label: 'Architecture',
    description: 'Architecture that responds to context, purpose and character.',
  },
  {
    href: '/services/interiors',
    label: 'Interiors',
    description: 'Thoughtful interiors balancing aesthetics, comfort and functionality.',
  },
  {
    href: '/services/project-management',
    label: 'Project Management',
    description: 'Coordinated planning and execution from concept to completion.',
  },
] as const

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  {
    href: '/services',
    label: 'Services',
    subLinks: serviceSubLinks,
  },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
] as const

