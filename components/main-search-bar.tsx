// components/main-search-bar.tsx
"use client"

import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { useState, useEffect } from "react"

interface MainSearchBarProps {
  initialSearch?: string
}

export default function MainSearchBar({ initialSearch = "" }: MainSearchBarProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [isFocused, setIsFocused] = useState(false)

  // Sync with initialSearch prop
  useEffect(() => {
    setSearchTerm(initialSearch)
  }, [initialSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/articles?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  const clearSearch = () => {
    setSearchTerm("")
    router.push("/articles")
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className={`relative flex items-center border rounded-full overflow-hidden transition-all ${isFocused ? "ring-2 ring-blue-500 border-blue-500" : "border-gray-300"}`}>
        <input
          type="text"
          placeholder="Rechercher des articles..."
          className="w-full py-3 px-5 pr-10 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-10 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        <button
          type="submit"
          className="bg-[#0e2d6d] text-white p-2 rounded-tl-full rounded-bl-full hover:bg-blue-700 transition-colors"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>
  )
}