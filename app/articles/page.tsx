import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import ArticleGrid from "@/components/article-grid"
import Pagination from "@/components/pagination"
import clientPromise from "@/lib/mongodb"

async function getBlogs(page = 1, limit = 9) {
  try {
    const client = await clientPromise
    const db = client.db()

    // Get total count for pagination
    const total = await db.collection("blogs").countDocuments({ status: "published" })

    // Calculate pagination info
    const pages = Math.ceil(total / limit)
    const skip = (page - 1) * limit

    // Get blogs with pagination
    const blogs = await db
      .collection("blogs")
      .find({ status: "published" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    return {
      blogs,
      pagination: {
        total,
        page,
        limit,
        pages,
      },
    }
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return { blogs: [], pagination: { total: 0, page: 1, limit, pages: 0 } }
  }
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1
  const { blogs, pagination } = await getBlogs(page)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Articles</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez nos articles sur la linguistique, la littérature et les méthodes d'examen en français
        </p>
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
  )
}

