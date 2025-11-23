// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Routes that don't require authentication (public routes)
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/articles(.*)",
    "/quiz(.*)",
    "/exams(.*)",
    "/literature(.*)",
    "/linguistics(.*)",
    "/commentaire-compose(.*)",
    "/dissertation(.*)",
    "/essai(.*)",
    "/didactique(.*)",
    "/psychologie(.*)",
    "/sociologie(.*)",
    "/philosophie(.*)",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-of-use",
    "/api/blogs(.*)",
    "/api/webhooks(.*)",
    "/debug-clerk",
  ],
  // Routes that require authentication
  // Everything else (like /d-frs654) will require login
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
};