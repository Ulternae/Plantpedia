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
  },
  webpack: (config, { isServer }) => {
    // Exclude Node.js modules from client-side bundles
    if (!isServer) {
      config.node = {
        fs: 'empty',
        net: 'empty',
        dns: 'empty',
        child_process: 'empty',
        tls: 'empty',
      }
    }
    return config
  }
}

module.exports = nextConfig
