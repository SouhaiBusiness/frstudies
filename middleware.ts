// middleware.ts
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of allowed bots (case insensitive)
const ALLOWED_BOTS = [
  'googlebot',
  'bingbot',
  'yandexbot',
  'duckduckbot',
  'slurp',
  'baiduspider',
  'facebot',
  'ia_archiver'
];

export default authMiddleware({
  // Public routes accessible without authentication
  publicRoutes: [
    "/",
    "/about",
    "/quiz",
    "/linguistics",
    "/literature",
    "/exams",
    "/commentaire-compose",
    "/dissertation",
    "/essai",
    "/api/blogs",
    "/api/blogs/(.*)",
    "/articles/(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/sitemap.xml",
    "/robots.txt",
    "/google60bebd4a973f0e4f.html",
    "/favicon.ico"
  ],

  // Routes that bypass Clerk entirely
  ignoredRoutes: [
    "/api/webhooks/clerk",
    "/_next/static/(.*)",
    "/_next/image(.*)",
    "/favicon.ico"
  ],

  afterAuth(auth, req: NextRequest) {
    const { pathname } = req.nextUrl;
    const userAgent = req.headers.get('user-agent')?.toLowerCase() || '';

    // 1. Allow all known search engine bots to access public routes
    const isBot = ALLOWED_BOTS.some(bot => userAgent.includes(bot));
    if (isBot) {
      return NextResponse.next();
    }

    // 2. Handle non-authenticated users
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // 3. Special case: Allow bot access to verification files
    if (userAgent.includes('googlebot') && pathname.includes('google60bebd4a973f0e4f.html')) {
      return NextResponse.next();
    }

    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, etc.
     * - files in public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};