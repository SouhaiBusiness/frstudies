// app/robots.txt/route.ts
import { NextResponse } from "next/server"

export async function GET() {
  const content = `
User-agent: *
Disallow: /d-frs654
Allow: /

Sitemap: https://frstudies.vercel.app/sitemap.xml
  `.trim()

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
