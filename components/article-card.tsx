import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

interface ArticleCardProps {
  id: string
  title: string
  description: string
  category: string
  author: string
  date: string
  slug: string
}

export default function ArticleCard({ id, title, description, category, author, date, slug }: ArticleCardProps) {
  // Format the date to "il y a X jours/heures/etc."
  const formattedDate = formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: fr,
  })

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-4px]">
      <Link href={`/articles/${slug}`} className="block h-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-[#0e2d6d] rounded-full">{category}</span>
            <span className="text-xs text-gray-500">{formattedDate}</span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{title}</h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Par {author || "Anonyme"}</span>
            <span className="text-sm font-medium text-[#0e2d6d]">Lire plus</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

