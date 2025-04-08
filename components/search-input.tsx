"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

export default function SearchInput({ className = "" }: { className?: string }) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher des articles, cours..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-md placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-white/70" />
        </div>
      </div>
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 text-white px-4 py-1.5 rounded-md hover:bg-white/30 transition-colors"
      >
        Rechercher
      </button>
    </form>
  )
}

