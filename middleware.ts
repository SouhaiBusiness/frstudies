import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
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
    "/terms-of-use",
    "/privacy-policy", // Correction: remplacé & par -
    "/api/courses(.*)",
    "/sitemap.xml", // Ajouté
    "/robots.txt" // Ajouté
  ],
  ignoredRoutes: [
    "/_next/static(.*)",
    "/_next/image(.*)",
    "/favicon.ico",
    "/api/webhooks/clerk"
  ],
  afterAuth(auth, req) {
    // Gestion des routes non publiques
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // Redirection des utilisateurs connectés depuis les pages d'authentification
    if (auth.userId && 
        (req.nextUrl.pathname === "/sign-in" || 
         req.nextUrl.pathname === "/sign-up")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/sitemap.xml", // Inclus explicitement
    "/robots.txt" // Inclus explicitement
  ]
};