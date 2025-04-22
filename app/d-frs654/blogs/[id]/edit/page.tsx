"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"
import { useNotification, Notification } from "@/components/notification"

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => (
    <div className="h-64 border rounded-md flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  ),
})

const categories = [
  "Linguistique",
  "Littérarture",
  "Examens",
  "Quiz",
  "Commentaire Composé",
  "Histoire de l'art et de littérature",
  "Dissertation",
  "Essai",
  "Communication",
  "Traduction",
  "Philosophie",
  "Didactique & Pédagogie",
  "Psychologie",
  "Sociologie",
  "Roman",
  "Théâtre",
  "Poésie",
  "Sémantique",
  "Morphosyntaxe",
]

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { notification, showNotification, hideNotification } = useNotification()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    slug: "",
    category: "",
    content: "",
    status: "draft",
  })

  useEffect(() => {
    async function fetchBlog() {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/blogs/${params.id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch blog")
        }

        const data = await response.json()

        setFormData({
          title: data.blog.title,
          description: data.blog.description,
          author: data.blog.author || "",
          slug: data.blog.slug,
          category: data.blog.category,
          content: data.blog.content,
          status: data.blog.status,
        })
      } catch (error) {
        console.error("Error fetching blog:", error)
        showNotification("error", "Failed to fetch blog. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlog()
  }, [params.id, showNotification])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  const handleContentChange = (value?: string) => {
    setFormData((prev) => ({ ...prev, content: value || "" }))
  }

  const handleStatusChange = (status: string) => {
    setFormData((prev) => ({ ...prev, status }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.title || !formData.description || !formData.category || !formData.content) {
      showNotification("error", "Please fill in all required fields")
      return
    }

    try {
      setIsSubmitting(true)

      const response = await fetch(`/api/blogs/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to update blog")
      }

      showNotification("success", "Blog updated successfully")

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/d-frs654")
      }, 1500)
    } catch (error) {
      console.error("Error updating blog:", error)
      showNotification("error", "Failed to update blog. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2">Loading blog data...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {notification && (
        <Notification type={notification.type} message={notification.message} onClose={hideNotification} />
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Blog</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
              <p className="text-xs text-gray-500">URL-friendly version of the title</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Content <span className="text-red-500">*</span>
            </label>
            <MDEditor value={formData.content} onChange={handleContentChange} height={400} preview="edit" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Publication Status</h3>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleStatusChange("draft")}
                className={`px-4 py-2 rounded-md ${
                  formData.status === "draft"
                    ? "bg-yellow-100 text-yellow-800 border-2 border-yellow-300"
                    : "bg-gray-100 text-gray-800 border border-gray-300"
                }`}
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange("published")}
                className={`px-4 py-2 rounded-md ${
                  formData.status === "published"
                    ? "bg-green-100 text-green-800 border-2 border-green-300"
                    : "bg-gray-100 text-gray-800 border border-gray-300"
                }`}
              >
                Publish
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.push("/d-frs654")}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-[#0e2d6d] text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? "Saving..." : "Save Blog"}
          </button>
        </div>
      </form>
    </div>
  )
}

