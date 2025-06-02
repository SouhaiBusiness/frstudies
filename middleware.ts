// middleware.ts - Updated Version
import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
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
    "/api/blogs(.*)",
    "/articles(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/sitemap.xml",
    "/robots.txt"
  ],
  ignoredRoutes: [
    "/_next/static(.*)",
    "/_next/image(.*)",
    "/favicon.ico",
    "/api/webhooks/clerk"
  ],
  afterAuth(auth, req) {
    const { pathname } = req.nextUrl;
    
    // Allow all public routes and static files
    if (
      auth.isPublicRoute ||
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/api/') ||
      pathname.endsWith('.ico') ||
      pathname.endsWith('.xml') ||
      pathname.endsWith('.txt')
    ) {
      return NextResponse.next();
    }

    if (!auth.userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    return NextResponse.next();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};