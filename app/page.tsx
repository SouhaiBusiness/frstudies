// app/page.tsx - Pure Server Component
import type { Metadata } from "next"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import type { Blog } from "@/lib/models"
import HeroSection from "@/components/hero-section"
import ArticleGrid from "@/components/article-grid"
import CategoryButtons from "@/components/category-buttons"
import MainSearchBar from "@/components/main-search-bar"
import NewsletterSignup from "@/components/newsletter-signup"

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
      .limit(6)
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

const categories = [
  { name: "Linguistique", href: "/linguistics" },
  { name: "Littérature", href: "/literature" },
  { name: "Commentaire Composé", href: "/commentaire-compose" },
  { name: "Dissertation", href: "/dissertation" },
  { name: "Essai", href: "/essai" },
  { name: "Communication", href: "/didactique/theater" },
  { name: "Pédagogie", href: "/pédagogie" },
  { name: "Didactique", href: "/didactique" },
  { name: "Psychologie", href: "/psychologie" },
  { name: "Sociologie", href: "/sociologie" },
  { name: "Philosophie", href: "/philosophie" },
]

export default async function Page() {
  const articles = await getRecentArticles()

  return (
    <div>
      <HeroSection />

      <div className="bg-gray-50 py-8">
        <MainSearchBar />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0e2d6d]">Articles Récents</h2>
              <Link href="/articles" className="text-[#0e2d6d] hover:underline">
                Voir tous les articles
              </Link>
            </div>

            <Suspense
              fallback={
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <span className="ml-2">Chargement des articles...</span>
                </div>
              }
            >
              <ArticleGrid articles={articles} />
            </Suspense>
          </div>

          <div className="space-y-6">
            <CategoryButtons categories={categories} title="Les catégories disponibles" />

            <div className="bg-white rounded-lg shadow-sm p-4 border" data-aos="fade-left">
              <h3 className="text-lg font-semibold mb-3">Ressources Populaires</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/commentaire-compose" className="text-[#0e2d6d] hover:underline">
                    Guide du commentaire composé
                  </Link>
                </li>
                <li>
                  <Link href="/dissertation" className="text-[#0e2d6d] hover:underline">
                    Méthodologie de la dissertation
                  </Link>
                </li>
                <li>
                  <Link href="/linguistics" className="text-[#0e2d6d] hover:underline">
                    Cours de phonétique française
                  </Link>
                </li>
                <li>
                  <Link href="/literature" className="text-[#0e2d6d] hover:underline">
                    Analyse poétique
                  </Link>
                </li>
              </ul>
            </div>

            <NewsletterSignup />
          </div>
        </div>
      </div>
    </div>
  )
}
