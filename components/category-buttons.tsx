"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Category {
  name: string
  href: string
}

interface CategoryButtonsProps {
  categories: Category[]
  title?: string
}

export default function CategoryButtons({ categories, title = "Catégories" }: CategoryButtonsProps) {
  const pathname = usePathname()
  const [showAll, setShowAll] = useState(false)

  // Show only 6 categories initially, unless showAll is true
  const displayedCategories = showAll ? categories : categories.slice(0, 6)

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>

      <div className="flex flex-wrap gap-2">
        {displayedCategories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              pathname === category.href ? "bg-[#0e2d6d] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {categories.length > 6 && (
        <button onClick={() => setShowAll(!showAll)} className="mt-3 text-sm text-[#0e2d6d] hover:underline">
          {showAll ? "Voir moins" : "Voir toutes les catégories"}
        </button>
      )}
    </div>
  )
}

