import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createRouteMatcher } from "next/dist/server/future/helpers"

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

export function middleware(request: NextRequest) {
  // Allow all requests to pass through
  // Route protection is handled at the component level
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
