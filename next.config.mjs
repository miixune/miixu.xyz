/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.com'],
    unoptimized: true,
  },
  // Add special handling for the 404 page
  async redirects() {
    return [
      {
        source: '/404',
        destination: '/_not-found',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
