/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  async redirects() {
    return [
      {
        source: '/journal',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/journal/:slug',
        destination: '/insights/:slug',
        permanent: true,
      },
      {
        source: '/studio',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/services/interior-design',
        destination: '/services/interiors',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
