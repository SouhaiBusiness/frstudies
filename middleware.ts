import { authMiddleware } from '@clerk/nextjs';
import { NextRequest } from 'next/server';

const publicRoutes = [
  '/',
  '/about',
  '/articles(.*)',
  '/linguistics',
  '/literature',
  '/exams',
  '/quiz',
  '/sitemap.xml',
  '/robots.txt',
  '/terms-of-use',
  '/privacy-policy'
];

export default authMiddleware({
  publicRoutes,
  ignoredRoutes: [
    '/_next/static(.*)',
    '/_next/image(.*)',
    '/favicon.ico',
    (req: NextRequest) => {
      // Autoriser Googlebot et autres crawlers
      const userAgent = req.headers.get('user-agent') || '';
      const isBot = /Googlebot|bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot/i.test(userAgent);
      return isBot;
    }
  ]
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)']
};