import ArticleCard from "./article-card"

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
}

export default function ArticleGrid({ articles, emptyMessage = "Aucun article trouvé" }: ArticleGridProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
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
  )
}
