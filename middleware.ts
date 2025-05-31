// middleware.ts - version corrigée
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs"
import { NextResponse } from "next/server"

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
    "/api/blogs",
    "/api/blogs/(.*)",
    "/articles/(.*)",
    "/sign-in",
    "/sign-up",
    "/signin",
    "/signup",
    "/sitemap.xml", 
    "/robots.txt",
    "/google60bebd4a973f0e4f.html", // Ajout de cette ligne
  ],
  ignoredRoutes: [
    "/sitemap.xml",
    "/robots.txt",
    "/google60bebd4a973f0e4f.html",
    "/favicon.ico",
    "/og-image.png",
    "/api/webhooks/clerk", // Si vous utilisez des webhooks Clerk
    "/_next/static/(.*)",
    "/_next/image(.*)"
  ],
  afterAuth(auth, req) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }

    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next()
    }

    // Allow users visiting public routes to access them
    return NextResponse.next()
  },
})

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|google60bebd4a973f0e4f.html).*)",
  ],
};