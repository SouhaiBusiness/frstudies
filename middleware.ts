// middleware.ts - Making authentication optional
import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  // Make ALL routes public - users can access everything without signing in
  publicRoutes: [
    "/",
    "/about",
    "/quiz",
    "/linguistics(.*)",  // Allow all linguistics pages
    "/literature(.*)",   // Allow all literature pages
    "/exams(.*)",
    "/commentaire-compose",
    "/dissertation",
    "/essai",
    "/api/blogs(.*)",
    "/api/courses(.*)",  // Make courses API public too
    "/articles(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/sitemap.xml",
    "/robots.txt",
  ],
  
  // Only protect the admin dashboard
  ignoredRoutes: [
    "/_next/static(.*)",
    "/_next/image(.*)",
    "/favicon.ico",
  ],
  
  afterAuth(auth, req) {
    // Allow all requests to proceed
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};