import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

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
  '/privacy-policy',
  '/api/courses(.*)'
];

const isBot = (req: NextRequest) => {
  const userAgent = req.headers.get('user-agent') || '';
  return /Googlebot|bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot/i.test(userAgent);
};

export default authMiddleware({
  publicRoutes,
  ignoredRoutes: [
    '/_next/static(.*)',
    '/_next/image(.*)',
    '/favicon.ico',
    '/api/webhooks/clerk'
  ],
  afterAuth: (auth, req) => {
    // Autoriser les bots à crawler toutes les pages
    if (isBot(req)) {
      return NextResponse.next();
    }

    // Logique d'authentification normale pour les utilisateurs humains
    if (!auth.userId && !publicRoutes.includes(req.nextUrl.pathname)) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)'
  ]
};