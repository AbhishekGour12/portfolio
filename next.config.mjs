// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'], // Serve modern formats
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',

      }
      // Add any other external image hostnames
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console logs in prod
  },
  swcMinify: true, // Use SWC for faster minification (default in Next.js 15)
  // Enable experimental features for performance
  experimental: {
    optimizeCss: true, // Inline critical CSS (experimental)
    scrollRestoration: true,
  },
  // Add headers for static asset caching
  async headers() {
    return [
      {
        source: '/(.*).(jpg|jpeg|png|webp|avif|ico|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;