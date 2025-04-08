import { Suspense } from "react"
import Link from "next/link"
import HeroSection from "@/components/hero-section"
import ArticleGrid from "@/components/article-grid"
import CategoryButtons from "@/components/category-buttons"
import Pagination from "@/components/pagination"
import { Loader2 } from "lucide-react"
import clientPromise from "@/lib/mongodb"

// Sample categories for the buttons
const categories = [
  { name: "Linguistique", href: "/linguistics" },
  { name: "Littérature", href: "/literature" },
  { name: "Commentaire Composé", href: "/commentaire-compose" },
  { name: "Dissertation", href: "/dissertation" },
  { name: "Essai", href: "/essai" },
  { name: "Phonétique", href: "/linguistics/phonetics" },
  { name: "Morphologie", href: "/linguistics/morphology" },
  { name: "Syntaxe", href: "/linguistics/syntax" },
  { name: "Sémantique", href: "/linguistics/semantics" },
  { name: "Poésie", href: "/literature/poetry" },
  { name: "Roman", href: "/literature/novel" },
  { name: "Théâtre", href: "/literature/theater" },
]

async function getLatestArticles() {
  try {
    // Fetch from the database
    const client = await clientPromise
    const db = client.db()

    // Get published blogs with pagination
    const page = 1
    const limit = 6
    const skip = (page - 1) * limit

    // Get total count for pagination
    const total = await db.collection("blogs").countDocuments({ status: "published" })

    // Get blogs with pagination
    const blogs = await db
      .collection("blogs")
      .find({ status: "published" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    // Calculate pagination info
    const pages = Math.ceil(total / limit)

    return {
      blogs:
        blogs.length > 0
          ? blogs
          : [
              // Fallback data if no blogs are found
              {
                _id: "1",
                title: "Introduction à la phonétique française",
                description: "Découvrez les bases de la phonétique française et comment maîtriser la prononciation.",
                category: "Linguistique",
                author: "Dr. Marie Dupont",
                createdAt: new Date().toISOString(),
                slug: "introduction-phonetique-francaise",
              },
              {
                _id: "2",
                title: "L'art de la dissertation littéraire",
                description: "Méthodologie et conseils pour réussir votre dissertation littéraire en français.",
                category: "Dissertation",
                author: "Prof. Jean Martin",
                createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                slug: "art-dissertation-litteraire",
              },
              {
                _id: "3",
                title: "Les figures de style dans la poésie française",
                description:
                  "Analyse des principales figures de style et leur utilisation dans la poésie française classique et moderne.",
                category: "Littérature",
                author: "Sophie Leclerc",
                createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                slug: "figures-style-poesie-francaise",
              },
              {
                _id: "4",
                title: "La structure du commentaire composé",
                description:
                  "Guide complet sur la structure et la méthodologie du commentaire composé en littérature française.",
                category: "Commentaire Composé",
                author: "Dr. Philippe Rousseau",
                createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                slug: "structure-commentaire-compose",
              },
              {
                _id: "5",
                title: "L'évolution du roman français au XXe siècle",
                description:
                  "Panorama des courants littéraires et des auteurs majeurs qui ont marqué le roman français au XXe siècle.",
                category: "Littérature",
                author: "Prof. Claire Dubois",
                createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
                slug: "evolution-roman-francais-xxe-siecle",
              },
              {
                _id: "6",
                title: "Les temps verbaux en français",
                description:
                  "Explication détaillée des temps verbaux en français et leur utilisation dans différents contextes.",
                category: "Linguistique",
                author: "Marc Leblanc",
                createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
                slug: "temps-verbaux-francais",
              },
            ],
      pagination: {
        total,
        page,
        limit,
        pages,
      },
    }
  } catch (error) {
    console.error("Error fetching articles:", error)
    // Return fallback data in case of error
    return {
      blogs: [
        {
          _id: "1",
          title: "Introduction à la phonétique française",
          description: "Découvrez les bases de la phonétique française et comment maîtriser la prononciation.",
          category: "Linguistique",
          author: "Dr. Marie Dupont",
          createdAt: new Date().toISOString(),
          slug: "introduction-phonetique-francaise",
        },
        // Add more fallback articles as needed
      ],
      pagination: { total: 1, page: 1, limit: 6, pages: 1 },
    }
  }
}

export default async function Home() {
  const { blogs, pagination } = await getLatestArticles()

  return (
    <div>
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Articles Récents</h2>
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
              <ArticleGrid articles={blogs} />
            </Suspense>

            <Pagination totalPages={pagination.pages} currentPage={pagination.page} />
          </div>

          <div className="space-y-6">
            <CategoryButtons categories={categories} title="Parcourir par catégorie" />

            <div className="bg-white rounded-lg shadow-sm p-4 border">
              <h3 className="text-lg font-semibold mb-3">Ressources Populaires.</h3>
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
                  <Link href="/linguistics/phonetics" className="text-[#0e2d6d] hover:underline">
                    Cours de phonétique française
                  </Link>
                </li>
                <li>
                  <Link href="/literature/poetry" className="text-[#0e2d6d] hover:underline">
                    Analyse poétique
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-[#0e2d6d] text-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-3">Rejoignez-nous</h3>
              <p className="text-sm mb-4">
                Soyez le premier à recevoir nos contenus et ressources exclusives !
              </p>
              <Link
                href="/signup"
                className="block w-full text-center bg-white text-[#0e2d6d] font-medium py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                S'inscrire gratuitement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
