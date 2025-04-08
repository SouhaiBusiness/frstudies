"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FileText, File, FileCheck, Plus, Loader2, Edit, Trash2, Search, X, AlertTriangle } from "lucide-react"
import { useNotification } from "@/components/notification"
import { Notification } from "@/components/notification"

type Blog = {
  _id: string
  title: string
  description: string
  category: string
  author: string
  slug: string
  updatedAt: string
  createdAt: string
  status: string
}

type BlogStats = {
  totalBlogs: number
  publishedBlogs: number
  draftBlogs: number
}

export default function DashboardPage() {
  const router = useRouter()
  const { notification, showNotification, hideNotification } = useNotification()
  const [stats, setStats] = useState<BlogStats>({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
  })
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const deleteModalRef = useRef<HTMLDivElement>(null)

  // Handle clicks outside the delete confirmation modal
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (deleteModalRef.current && !deleteModalRef.current.contains(event.target as Node)) {
        setDeleteConfirmId(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Fetch blogs and stats
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        setError(null)
        setErrorDetails(null)

        // Fetch stats
        const statsResponse = await fetch("/api/blogs/stats")
        if (!statsResponse.ok) {
          const statsError = await statsResponse.json()
          throw new Error(statsError.error || "Failed to fetch blog statistics")
        }
        const statsData = await statsResponse.json()

        // Fetch blogs
        const blogsResponse = await fetch("/api/blogs")
        if (!blogsResponse.ok) {
          const blogsError = await blogsResponse.json()
          throw new Error(blogsError.error || "Failed to fetch blogs")
        }
        const blogsData = await blogsResponse.json()

        setStats({
          totalBlogs: statsData.totalBlogs || 0,
          publishedBlogs: statsData.publishedBlogs || 0,
          draftBlogs: statsData.draftBlogs || 0,
        })

        setBlogs(blogsData.blogs || [])
        setFilteredBlogs(blogsData.blogs || [])
      } catch (err) {
        console.error("Error fetching data:", err)
        const errorMessage = err instanceof Error ? err.message : "Failed to load dashboard data"
        setError(errorMessage)
        setErrorDetails(JSON.stringify(err, null, 2))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter blogs based on search term and status
  useEffect(() => {
    if (!blogs.length) return

    let filtered = [...blogs]

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((blog) => blog.status === statusFilter)
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(term) ||
          blog.description.toLowerCase().includes(term) ||
          blog.category.toLowerCase().includes(term) ||
          (blog.author && blog.author.toLowerCase().includes(term)),
      )
    }

    setFilteredBlogs(filtered)
  }, [blogs, searchTerm, statusFilter])

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete blog")
      }

      // Remove the deleted blog from the state
      const updatedBlogs = blogs.filter((blog) => blog._id !== id)
      setBlogs(updatedBlogs)

      // Update stats
      setStats((prev) => ({
        ...prev,
        totalBlogs: prev.totalBlogs - 1,
        publishedBlogs:
          blogs.find((b) => b._id === id)?.status === "published" ? prev.publishedBlogs - 1 : prev.publishedBlogs,
        draftBlogs: blogs.find((b) => b._id === id)?.status === "draft" ? prev.draftBlogs - 1 : prev.draftBlogs,
      }))

      showNotification("success", "Blog deleted successfully")
    } catch (error) {
      console.error("Error deleting blog:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to delete blog"
      showNotification("error", errorMessage)
    } finally {
      setDeleteConfirmId(null)
    }
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  const retryFetchData = () => {
    setIsLoading(true)
    setError(null)
    setErrorDetails(null)

    // Re-fetch data
    async function fetchData() {
      try {
        // Fetch stats
        const statsResponse = await fetch("/api/blogs/stats")
        if (!statsResponse.ok) {
          const statsError = await statsResponse.json()
          throw new Error(statsError.error || "Failed to fetch blog statistics")
        }
        const statsData = await statsResponse.json()

        // Fetch blogs
        const blogsResponse = await fetch("/api/blogs")
        if (!blogsResponse.ok) {
          const blogsError = await blogsResponse.json()
          throw new Error(blogsError.error || "Failed to fetch blogs")
        }
        const blogsData = await blogsResponse.json()

        setStats({
          totalBlogs: statsData.totalBlogs || 0,
          publishedBlogs: statsData.publishedBlogs || 0,
          draftBlogs: statsData.draftBlogs || 0,
        })

        setBlogs(blogsData.blogs || [])
        setFilteredBlogs(blogsData.blogs || [])
      } catch (err) {
        console.error("Error fetching data:", err)
        const errorMessage = err instanceof Error ? err.message : "Failed to load dashboard data"
        setError(errorMessage)
        setErrorDetails(JSON.stringify(err, null, 2))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2">Loading dashboard data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-md">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 mr-2" />
            <h2 className="text-lg font-bold">Error Loading Dashboard</h2>
          </div>
          <p className="mb-4">{error}</p>
          {errorDetails && (
            <div className="mt-4">
              <h3 className="font-bold mb-2">Error Details:</h3>
              <pre className="bg-red-100 p-3 rounded overflow-auto text-sm">{errorDetails}</pre>
            </div>
          )}
          <button onClick={retryFetchData} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Retry
          </button>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <Link
            href="/dashboard/blogs/new"
            className="bg-[#0e2d6d] hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Create New Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {notification && (
        <Notification type={notification.type} message={notification.message} onClose={hideNotification} />
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <Link
          href="/dashboard/blogs/new"
          className="bg-[#0e2d6d] hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Create New Blog
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Blogs</h3>
            <FileText className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{stats.totalBlogs}</div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Draft Blogs</h3>
            <File className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{stats.draftBlogs}</div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Published Blogs</h3>
            <FileCheck className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{stats.publishedBlogs}</div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Manage Blogs</h2>
          <div className="flex gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search blogs..."
                className="pl-10 pr-10 py-2 border rounded-md w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <select
              className="px-3 py-2 border rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-50 px-4 py-3 font-medium">
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1">Actions</div>
          </div>

          {filteredBlogs.length > 0 ? (
            <div className="divide-y">
              {filteredBlogs.map((blog) => (
                <div key={blog._id} className="grid grid-cols-12 px-4 py-3 items-center">
                  <div className="col-span-5">
                    <h3 className="font-medium">{blog.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{blog.description}</p>
                    <p className="text-xs text-gray-400">By: {blog.author || "Anonymous"}</p>
                  </div>
                  <div className="col-span-2">{blog.category}</div>
                  <div className="col-span-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        blog.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {blog.status === "published" ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="col-span-2">{new Date(blog.updatedAt || blog.createdAt).toLocaleDateString()}</div>
                  <div className="col-span-1 flex gap-1">
                    <button
                      onClick={() => router.push(`/dashboard/blogs/${blog._id}/edit`)}
                      className="p-1 rounded-md hover:bg-gray-100 text-blue-600"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(blog._id)}
                      className="p-1 rounded-md hover:bg-gray-100 text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              {searchTerm ? (
                <>No blogs found matching your search criteria.</>
              ) : (
                <>No blogs found. Create your first blog to get started!</>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={deleteModalRef} className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this blog? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 border rounded-md hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
