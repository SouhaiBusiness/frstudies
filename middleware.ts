// middleware.ts - Make EVERYTHING public except dashboard
import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  // Make ALL routes public - Googlebot can access everything
  publicRoutes: [
    "/",
    "/about",
    "/quiz(.*)",
    "/linguistics(.*)",
    "/literature(.*)",
    "/exams(.*)",
    "/commentaire-compose(.*)",
    "/dissertation(.*)",
    "/essai(.*)",
    "/api/(.*)",
    "/articles(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/sitemap.xml",
    "/robots.txt",
    "/(.*)"  // This makes EVERYTHING public by default
  ],
  
  // Only protect your admin dashboard
  ignoredRoutes: [
    "/_next/static(.*)",
    "/_next/image(.*)",
    "/favicon.ico",
    "/api/webhooks/clerk"
  ],
  
  afterAuth(auth, req) {
    // Just let everything through
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};