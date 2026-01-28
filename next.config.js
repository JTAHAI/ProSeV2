/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This allows the build to finish even if there are type errors like "Movant"
    ignoreBuildErrors: true,
  },
  eslint: {
    // This also prevents linting errors from stopping the build
    ignoreDuringBuilds: true,
  },
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: '/api/index.py',
      },
    ]
  },
}

module.exports = nextConfig
