"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useNotification } from "@/components/notification"
import HeroSection from "@/components/hero-section"
import ArticleGrid from "@/components/article-grid"
import CategoryButtons from "@/components/category-buttons"
import MainSearchBar from "@/components/main-search-bar"
import NewsletterSignup from "@/components/newsletter-signup"
import Link from "next/link"

interface Article {
  _id: string
  title: string
  description: string
  category: string
  author: string
  createdAt: string
  slug: string
}

interface HomeProps {
  articles: Article[]
}

// OAuth Handler Component (inside Suspense boundary)
function OAuthHandler() {
  const searchParams = useSearchParams()
  const { showNotification } = useNotification()

  useEffect(() => {
    const token = searchParams.get("token")
    const user = searchParams.get("user")
    const error = searchParams.get("error")

    if (error) {
      console.error("Auth error:", error)
      showNotification("error", "Authentication failed. Please try again.")
      // Clear URL
      window.history.replaceState({}, document.title, window.location.pathname)
      return
    }

    if (token && user) {
      try {
        const userData = JSON.parse(decodeURIComponent(user))
        localStorage.setItem("authToken", token)
        localStorage.setItem("user", JSON.stringify(userData))
        showNotification("success", "Signed in with Google successfully!")

        // Clean URL by removing query params
        window.history.replaceState({}, document.title, window.location.pathname)

        // Reload to update UI
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } catch (err) {
        console.error("OAuth callback error:", err)
        showNotification("error", "Failed to process sign-in")
      }
    }
  }, [searchParams, showNotification])

  return null
}

export default function Home({ articles }: HomeProps) {
  return (
    <>
      <Suspense fallback={null}>
        <OAuthHandler />
      </Suspense>

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

              <ArticleGrid articles={articles} />
            </div>

            <div className="space-y-6">
              <CategoryButtons
                categories={[
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
                ]}
                title="Les catégories disponibles"
              />

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
    </>
  )
}
