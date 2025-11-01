import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// Define public routes that don't need authentication
const isPublicRoute = createRouteMatcher([
  "/articles",
  "/quiz",
  "/exams",
  "/literature",
  "/linguistics",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-of-use",
  "/sign-in",
  "/sign-up",
  "/",
  "/robots.txt",
  "/sitemap.xml",
])

export default clerkMiddleware((auth, req) => {
  // Allow all public routes without authentication
  if (!isPublicRoute(req)) {
    auth().protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
