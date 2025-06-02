// next.config.js
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
              script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://decent-spaniel-16.clerk.accounts.dev;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https://frstudies.vercel.app;
              font-src 'self';
              connect-src 'self' https://frstudies.vercel.app https://decent-spaniel-16.clerk.accounts.dev;
              frame-src 'self' https://clerk.vercel.app https://decent-spaniel-16.clerk.accounts.dev;
            `.replace(/\s+/g, ' ').trim()
          },
          // ... rest of your headers
        ]
      }
    ];
  },
  // ... rest of your config
};