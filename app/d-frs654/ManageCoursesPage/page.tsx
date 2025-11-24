// app/(dashboard)/manage-courses/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Loader2, Trash2, FileIcon, AlertCircle } from "lucide-react"

export const dynamic = 'force-dynamic'
interface FileItem {
  id: string
  name: string
  fileUrl: string
  fileSize?: number
  uploadedAt?: string
  uploadedById?: string
}

interface Module {
  _id: string
  title: string
  filiere: "literature" | "linguistics" | "exams"
  semester?: number
  files?: FileItem[]
}

export default function ManageCoursesPage() {
  const [modules, setModules] = useState<Module[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fileToDelete, setFileToDelete] = useState<{ fileId: string; moduleId: string } | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    async function fetchAllModules() {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch all modules including exams
        const [coursesRes, examsRes] = await Promise.all([
          fetch("/api/courses"),
          fetch("/api/courses?filiere=exams")
        ])

        if (!coursesRes.ok || !examsRes.ok) {
          throw new Error("Failed to fetch modules")
        }

        const [coursesData, examsData] = await Promise.all([
          coursesRes.json(),
          examsRes.json()
        ])

        // Combine regular courses and exams
        setModules([...(coursesData.courses || []), ...(examsData.courses || [])])
      } catch (error) {
        console.error("Error fetching modules:", error)
        setError("Failed to load modules. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllModules()
  }, [])

  const handleDeleteFile = async () => {
    if (!fileToDelete) return

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/modules/${fileToDelete.moduleId}/files/${fileToDelete.fileId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete file")

      // Update local state
      setModules(prevModules =>
        prevModules.map(module => {
          if (module._id === fileToDelete.moduleId) {
            return {
              ...module,
              files: module.files?.filter(file => file.id !== fileToDelete.fileId),
            }
          }
          return module
        })
      )
      setFileToDelete(null)
      alert("File deleted successfully")
    } catch (error) {
      console.error("Error deleting file:", error)
      alert("Failed to delete file")
    } finally {
      setIsDeleting(false)
    }
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown size"
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Courses & Exams</h1>

      {isLoading ? (
        <div className="flex items-center">
          <Loader2 className="animate-spin mr-2" />
          Loading modules...
        </div>
      ) : error ? (
        <div className="text-red-500 flex items-center">
          <AlertCircle className="mr-2" />
          {error}
        </div>
      ) : (
        <div className="space-y-8">
          {["literature", "linguistics", "exams"].map(filiere => (
            <div key={filiere} className="mb-8">
              <h2 className="text-xl font-semibold mb-4 capitalize border-b pb-2">
                {filiere === "exams" ? "Exams" : filiere}
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Title</th>
                      {filiere !== "exams" && <th className="border p-2 text-left">Semester</th>}
                      <th className="border p-2 text-left">Files</th>
                      <th className="border p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules
                      .filter(module => module.filiere === filiere)
                      .sort((a, b) => (a.semester || 0) - (b.semester || 0))
                      .map(module => (
                        <tr key={module._id} className="border">
                          <td className="border p-2">{module.title}</td>
                          {filiere !== "exams" && (
                            <td className="border p-2">Semester {module.semester}</td>
                          )}
                          <td className="border p-2">
                            {module.files && module.files.length > 0 ? (
                              <ul className="space-y-1">
                                {module.files.map(file => (
                                  <li key={file.id} className="flex items-center">
                                    <FileIcon className="h-4 w-4 mr-2" />
                                    <a
                                      href={file.fileUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      {file.name}
                                    </a>
                                    <span className="text-xs text-gray-500 ml-2">
                                      ({formatFileSize(file.fileSize)})
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span className="text-gray-500">No files</span>
                            )}
                          </td>
                          <td className="border p-2">
                            {module.files?.map(file => (
                              <button
                                key={file.id}
                                onClick={() => setFileToDelete({
                                  fileId: file.id,
                                  moduleId: module._id,
                                })}
                                className="text-red-600 hover:text-red-800 flex items-center"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </button>
                            ))}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation modal */}
      {fileToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this file? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setFileToDelete(null)}
                className="px-4 py-2 border rounded"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteFile}
                className="px-4 py-2 bg-red-600 text-white rounded flex items-center"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}