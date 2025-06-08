import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  const baseUrl = "https://frstudies.vercel.app"

  // Pages statiques (pas besoin de lastmod ici)
  const staticPages = [
    "",
    "about",
    "contact",
    "literature",
    "linguistics",
    "exams",
    "quiz",
    "commentaire-compose",
    "dissertation",
    "essai",
    "terms-of-use",
    "privacy&policy",
    "articles",
  ]

  const staticUrls = staticPages.map((slug) => {
    return `
      <url>
        <loc>${baseUrl}/${slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `
  })

  let articleUrls: string[] = []
  try {
    const client = await clientPromise
    const db = client.db()
    const articles = await db
      .collection("blogs")
      .find({ status: "published" })
      .project({ slug: 1, createdAt: 1 }) // On récupère aussi la date
      .toArray()

    articleUrls = articles.map((article) => {
      const date = new Date(article.createdAt).toISOString()
      return `
        <url>
          <loc>${baseUrl}/articles/${article.slug}</loc>
          <lastmod>${date}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
      `
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error)
  }

  const allUrls = [...staticUrls, ...articleUrls].join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allUrls}
    </urlset>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
