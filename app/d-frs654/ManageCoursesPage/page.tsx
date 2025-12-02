// app/(dashboard)/manage-courses/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Loader2, Trash2, FileIcon, AlertCircle } from "lucide-react"

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
  filiere: "literature" | "linguistics" | "exams" | "commentaire-compose" | "dissertation" | "essai"
  semester?: number
  files?: FileItem[]
}

// All possible filieres
const ALL_FILIERES = ["literature", "linguistics", "exams", "commentaire-compose", "dissertation", "essai"]

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

        // Fetch ALL modules by fetching each filiere
        const fetchPromises = ALL_FILIERES.map(async (filiere) => {
          try {
            const response = await fetch(`/api/courses?filiere=${filiere}`)
            if (!response.ok) {
              console.warn(`Failed to fetch ${filiere} modules`)
              return []
            }
            const data = await response.json()
            return data.courses || []
          } catch (error) {
            console.error(`Error fetching ${filiere} modules:`, error)
            return []
          }
        })

        const results = await Promise.all(fetchPromises)
        
        // Flatten all results into a single array
        const allModules = results.flat()
        setModules(allModules)
        
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

  // Group modules by filiere
  const groupedModules = modules.reduce((acc, module) => {
    const filiere = module.filiere
    if (!acc[filiere]) {
      acc[filiere] = []
    }
    acc[filiere].push(module)
    return acc
  }, {} as Record<string, Module[]>)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage All Courses & Resources</h1>

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
          {ALL_FILIERES.map(filiere => {
            const filiereModules = groupedModules[filiere] || []
            if (filiereModules.length === 0) return null

            return (
              <div key={filiere} className="mb-8">
                <h2 className="text-xl font-semibold mb-4 capitalize border-b pb-2">
                  {filiere === "exams" ? "Examens" : 
                   filiere === "commentaire-compose" ? "Commentaire Composé" : 
                   filiere === "dissertation" ? "Dissertation" : 
                   filiere === "essai" ? "Essai" : 
                   filiere}
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Titre</th>
                        {filiere !== "exams" && <th className="border p-2 text-left">Semestre</th>}
                        <th className="border p-2 text-left">Fichiers</th>
                        <th className="border p-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filiereModules
                        .sort((a, b) => (a.semester || 0) - (b.semester || 0))
                        .map(module => (
                          <tr key={module._id} className="border">
                            <td className="border p-2">{module.title}</td>
                            {filiere !== "exams" && (
                              <td className="border p-2">Semestre {module.semester}</td>
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
                                <span className="text-gray-500">Aucun fichier</span>
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
                                  Supprimer
                                </button>
                              ))}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Delete confirmation modal */}
      {fileToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirmer la suppression</h3>
            <p className="mb-6">Êtes-vous sûr de vouloir supprimer ce fichier ? Cette action est irréversible.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setFileToDelete(null)}
                className="px-4 py-2 border rounded"
                disabled={isDeleting}
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteFile}
                className="px-4 py-2 bg-red-600 text-white rounded flex items-center"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Suppression...
                  </>
                ) : (
                  "Supprimer"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}