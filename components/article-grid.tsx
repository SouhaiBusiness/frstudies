// components/article-grid.tsx
'use client'

import { useState } from "react"
import ArticleCard from "./article-card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Article {
  _id: string
  title: string
  description: string
  category: string
  author: string
  createdAt: string
  slug: string
}

interface ArticleGridProps {
  articles: Article[]
  emptyMessage?: string
  itemsPerPage?: number
}

export default function ArticleGrid({ 
  articles, 
  emptyMessage = "Aucun article trouvé",
  itemsPerPage = 6 
}: ArticleGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(articles.length / itemsPerPage)

  // Get current articles
  const indexOfLastArticle = currentPage * itemsPerPage
  const indexOfFirstArticle = indexOfLastArticle - itemsPerPage
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle)

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentArticles.map((article) => (
          <ArticleCard
            key={article._id}
            id={article._id}
            title={article.title}
            description={article.description}
            category={article.category}
            author={article.author || "Anonyme"}
            date={article.createdAt}
            slug={article.slug}
          />
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${currentPage === 1 ? 'text-[#0e2d6d] cursor-not-allowed' : 'text-[#0e2d6d]   hover:bg-[#0e2d6d] hover:text-white'}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <span className="text-sm text-gray-600">
              Page <span className="font-bold text-[#0e2d6d]">{currentPage}</span> sur {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md ${currentPage === totalPages ? 'text-[#0e2d6d] cursor-not-allowed' : 'text-[#0e2d6d]   hover:bg-[#0e2d6d] hover:text-white'}`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}