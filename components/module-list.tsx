"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, AlertCircle, Calendar, FileIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

interface ModuleFile {
  id: string
  name: string
  fileUrl: string
  fileSize?: number
  uploadedAt?: string
  uploadedBy?: string
}

interface Module {
  _id: string
  title: string
  semester: number
  moduleId?: string
  files?: ModuleFile[]
  fileName?: string
  fileUrl?: string
  createdAt?: string
  updatedAt?: string
}

interface ModuleListProps {
  modules: Module[]
  activeSemester: number | null
}

export default function ModuleList({ modules, activeSemester }: ModuleListProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>([])

  // Filter by semester if provided
  const filteredModules = activeSemester ? modules.filter((module) => module.semester === activeSemester) : modules

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  // Process modules to ensure they have a files array
  const processedModules = filteredModules.map((module) => {
    // If the module has a fileUrl but no files array, create a files array with that file
    if (module.fileUrl && (!module.files || module.files.length === 0)) {
      return {
        ...module,
        files: [
          {
            id: `file-${module._id}`,
            name: module.fileName || "Document",
            fileUrl: module.fileUrl,
          },
        ],
      }
    }
    // If the module has no files array, create an empty one
    if (!module.files) {
      return {
        ...module,
        files: [],
      }
    }
    return module
  })

  // Format file size to human-readable format
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Taille inconnue"

    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  // Format date to "il y a X jours/heures/etc."
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Date inconnue"

    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: fr,
      })
    } catch (error) {
      return "Date invalide"
    }
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6">Modules</h2>

      {processedModules.length > 0 ? (
        <div className="space-y-4">
          {processedModules.map((module) => (
            <div key={module._id} className="border rounded-md overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 text-left"
                onClick={() => toggleModule(module._id)}
              >
                <div>
                  <h3 className="font-medium">{module.title}</h3>
                  <p className="text-sm text-gray-500">Semestre {module.semester}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-3">
                    {module.files?.length || 0} fichier{(module.files?.length || 0) > 1 ? "s" : ""}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${expandedModules.includes(module._id) ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {expandedModules.includes(module._id) && (
                <div className="p-4 bg-white">
                  <h4 className="font-medium mb-2">Documents disponibles</h4>
                  {module.files && module.files.length > 0 ? (
                    <div className="space-y-3">
                      {module.files.map((file) => (
                        <div
                          key={file.id}
                          className="border rounded-md p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-start">
                            <div className="bg-[#0e2d6d] text-white p-2 rounded-md mr-3">
                              <FileIcon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <Link
                                href={file.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-blue-600 hover:underline block mb-1"
                              >
                                {file.name}
                              </Link>
                              <div className="flex flex-wrap text-xs text-gray-500 gap-x-4">
                                <span className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {formatDate(file.uploadedAt)}
                                </span>
                                <span>{formatFileSize(file.fileSize)}</span>
                                {file.uploadedBy && <span>Par: {file.uploadedBy}</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-500 p-3 bg-gray-50 rounded-md">
                      <AlertCircle className="h-5 w-5 mr-2 text-yellow-500" />
                      <p>Aucun fichier disponible pour ce module. Les documents seront ajoutés prochainement.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 border rounded-md bg-gray-50">
          <p className="text-gray-500">Aucun module trouvé pour le semestre sélectionné.</p>
        </div>
      )}
    </div>
  )
}
