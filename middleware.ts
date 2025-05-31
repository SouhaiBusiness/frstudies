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
    "/api/webhooks/clerk", // Si vous utilisez des webhooks Clerk
    "/_next/static/(.*)"
  ],
   afterAuth(auth, req) {
    const { pathname } = req.nextUrl;
    
    // Autoriser les crawlers à accéder aux routes publiques
    const isCrawler = req.headers.get('user-agent')?.match(/bot|crawl|spider|googlebot/i);
    if (isCrawler && pathname.match(/^\/(sitemap\.xml|robots\.txt|google.*\.html)$/i)) {
      return NextResponse.next();
    }

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    return NextResponse.next();
  },
})

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|google60bebd4a973f0e4f.html).*)",
  ],
};