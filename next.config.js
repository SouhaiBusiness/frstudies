// next.config.js - Updated Version
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https://frstudies.vercel.app;
              font-src 'self';
              connect-src 'self' https://frstudies.vercel.app;
              frame-src 'self' https://clerk.vercel.app;
            `.replace(/\s+/g, ' ').trim()
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ];
  },
  images: {
    domains: ['frstudies.vercel.app'],
  },
  experimental: {
    serverActions: true, // If using Clerk auth
  }
};

module.exports = nextConfig;