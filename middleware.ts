// middleware.ts - Updated Version
import { authMiddleware, redirectToSignIn  } from "@clerk/nextjs";
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
    "/robots.txt",
  ],
 // ignoredRoutes: [
 //   "/_next/static(.*)",
  //  "/_next/image(.*)",
   // "/favicon.ico",
  //  "/api/webhooks/clerk"
  //],
 afterAuth(auth, req) {

    if (!auth.userId && !auth.isPublicRoute) {


      return redirectToSignIn({ returnBackUrl: req.url })
    }
      if (auth.userId && !auth.isPublicRoute) {

      return NextResponse.next()
      }
      return NextResponse.next()
  },


});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};