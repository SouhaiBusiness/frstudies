// app/page.tsx - Server Component with Metadata

import type { Metadata } from "next"
import Home from "./home-client"
import clientPromise from "@/lib/mongodb"
import type { Blog } from "@/lib/models"

export const metadata: Metadata = {
  title: "ETUDESFRANÇAISES - Ressources pour les étudiants de français",
  description: "Plateforme complète pour les étudiants en français avec cours, quiz et examens",
  alternates: {
    canonical: "https://frstudies.vercel.app",
  },
  openGraph: {
    title: "ETUDESFRANÇAISES",
    description: "Ressources pour les étudiants de français",
    url: "https://frstudies.vercel.app",
    siteName: "ETUDESFRANÇAISES",
    images: [
      {
        url: "https://frstudies.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "ETUDESFRANÇAISES",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ETUDESFRANÇAISES",
    description: "Ressources pour les étudiants de français",
    images: ["https://frstudies.vercel.app/og-image.png"],
  },
}

async function getRecentArticles() {
  try {
    const client = await clientPromise
    const db = client.db()

    const blogs = await db
      .collection<Blog>("blogs")
      .find({ status: "published" })
      .sort({ createdAt: -1 })
      .limit(6) // Get only 6 most recent articles for homepage
      .toArray()

    return blogs.map((blog) => ({
      _id: blog._id?.toString() || "",
      title: blog.title,
      description: blog.description,
      category: blog.category,
      author: blog.author,
      createdAt: blog.createdAt.toISOString(),
      slug: blog.slug,
    }))
  } catch (error) {
    console.error("Error fetching recent articles:", error)
    return []
  }
}

// This is a Server Component - it fetches articles and passes to client
export default async function Page() {
  const articles = await getRecentArticles()
  return <Home articles={articles} />
}
