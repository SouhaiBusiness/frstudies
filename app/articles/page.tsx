// app/articles/page.tsx
import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import ArticleGrid from "@/components/article-grid"
import clientPromise from "@/lib/mongodb"
import { Blog } from "@/lib/models"
import MainSearchBar from "@/components/main-search-bar"

export const metadata = {
  title: 'Articles récents - ETUDESFRANÇAISES',
  description:
    'Plusieurs articles, différents sujets. Chercher et trouver des articles dans les thèmes qui vous interssent.',
  openGraph: {
    title: 'Articles récents - ETUDESFRANÇAISES',
    description: 'Plusieurs articles, différents sujets. Chercher et trouver des articles dans les thèmes qui vous interssent.',
    url: 'https://frstudies.vercel.app/articles',
    // Keep other OG properties from root metadata
  },
  // Other page-specific metadata
};

interface Article {
  _id: string
  title: string
  description: string
  category: string
  author: string
  createdAt: string
  slug: string
}

async function getBlogs(search = "") {
  try {
    const client = await clientPromise
    const db = client.db()

    // Build search query
    const query: any = { status: "published" }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } }
      ]
    }

    // Get all matching blogs (no pagination)
    const blogs = await db
      .collection<Blog>("blogs")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray()

    // Transform blogs to match Article interface
    return blogs.map(blog => ({
      _id: blog._id?.toString() || "",
      title: blog.title,
      description: blog.description,
      category: blog.category,
      author: blog.author,
      createdAt: blog.createdAt.toISOString(),
      slug: blog.slug
    }))
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return []
  }
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { search?: string }
}) {
  const search = searchParams.search || ""
  const blogs = await getBlogs(search)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {search ? `Résultats pour "${search}"` : 'Articles'}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {search 
            ? `${blogs.length} article${blogs.length !== 1 ? 's' : ''} trouvé${blogs.length !== 1 ? 's' : ''}`
            : 'Découvrez nos articles sur la linguistique, la littérature, les méthodes d\'examen en français et plein d\'autres sujets'}
        </p>
      </div>

      <div className="mb-8">
        <MainSearchBar initialSearch={search} />
      </div>

      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2">Chargement des articles...</span>
        </div>
      }>
        <ArticleGrid articles={blogs} />
      </Suspense>
    </div>
  )
}