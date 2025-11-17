/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.ctfassets.net']
  },
  i18n: {
    locales: ['en-US', 'es'],
    defaultLocale: 'en-US',
    localeDetection: true,
  }
}

module.exports = nextConfig
