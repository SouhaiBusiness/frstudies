import { authMiddleware, redirectToSignIn } from "@clerk/nextjs"
import { NextResponse } from "next/server"

const isSearchEngineCrawler = (userAgent: string) => {
  const crawlerPatterns = [
    /googlebot/i,
    /bingbot/i,
    /slurp/i,
    /duckduckbot/i,
    /baiduspider/i,
    /yandexbot/i,
    /facebookexternalhit/i,
    /twitterbot/i,
    /linkedinbot/i,
    /whatsapp/i,
    /slotovod/i,
  ]

  return crawlerPatterns.some((pattern) => pattern.test(userAgent))
}

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
  afterAuth(auth, req) {
    const userAgent = req.headers.get("user-agent") || ""
    const isCrawler = isSearchEngineCrawler(userAgent)

    if (isCrawler) {
      return NextResponse.next()
    }

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }

    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next()
    }

    return NextResponse.next()
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
