"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, FileText, Loader2 } from "lucide-react"
import CategoryButtons from "@/components/category-buttons"
import NewsletterSignup from "@/components/newsletter-signup"

interface ModuleFile {
  id: string
  name: string
  fileUrl: string
  fileSize?: number
  uploadedAt?: string
}

interface Module {
  _id: string
  title: string
  filiere: string
  semester: number
  moduleId: string
  files: ModuleFile[]
}

export default function ExamsPage() {
  const [linguisticsModules, setLinguisticsModules] = useState<Module[]>([])
  const [literatureModules, setLiteratureModules] = useState<Module[]>([])
  const [expandedLinguisticsModules, setExpandedLinguisticsModules] = useState<string[]>([])
  const [expandedLiteratureModules, setExpandedLiteratureModules] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchModules() {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch linguistics exam modules
        const linguisticsResponse = await fetch("/api/courses?filiere=exams&semester=1")
        if (!linguisticsResponse.ok) {
          throw new Error("Failed to fetch linguistics exam modules")
        }
        const linguisticsData = await linguisticsResponse.json()

        // Fetch literature exam modules
        const literatureResponse = await fetch("/api/courses?filiere=exams&semester=1,2,3,4,5,6")
        if (!literatureResponse.ok) {
          throw new Error("Failed to fetch literature exam modules")
        }
        const literatureData = await literatureResponse.json()

        // Set the modules
        setLinguisticsModules(linguisticsData.courses || [])
        setLiteratureModules(literatureData.courses || [])
      } catch (error) {
        console.error("Error fetching exam modules:", error)
        setError("Une erreur s'est produite lors du chargement des examens.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchModules()
  }, [])

  const toggleLinguisticsModule = (moduleId: string) => {
    setExpandedLinguisticsModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId],
    )
  }

  const toggleLiteratureModule = (moduleId: string) => {
    setExpandedLiteratureModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId],
    )
  }

  // Fallback data for linguistics modules
  const fallbackLinguisticsModules = [
    {
      _id: "ling-1",
      title: "Lexicographie",
      files: [
        {
          id: "file-1",
          name: "examens de lexicographie semestre 2.pdf",
          fileUrl: "/api/files/examens-de-lexicographie-semestre-2.pdf",
        },
      ],
    },
    {
      _id: "ling-2",
      title: "Grammaire",
      files: [
        {
          id: "file-2",
          name: "examens de grammaire s2.pdf",
          fileUrl: "/api/files/examens-de-grammaire-s2.pdf",
        },
      ],
    },
    // Add more fallback modules as needed
  ]

  // Fallback data for literature modules
  const fallbackLiteratureModules = [
    {
      _id: "lit-1",
      title: "Catégories du récit",
      files: [
        {
          id: "file-3",
          name: "examens du module catégories du semestre 2.pdf",
          fileUrl: "/api/files/examens-du-module-categories-du-semestre-2.pdf",
        },
      ],
    },
    {
      _id: "lit-2",
      title: "Histoire des idées",
      files: [
        {
          id: "file-4",
          name: "examen de l'histoire des idées S2.pdf",
          fileUrl: "/api/files/examen-de-lhistoire-des-idees-S2.pdf",
        },
      ],
    },
    // Add more fallback modules as needed
  ]

  // Use fallback data if no modules are found
  const displayLinguisticsModules = linguisticsModules.length > 0 ? linguisticsModules : fallbackLinguisticsModules
  const displayLiteratureModules = literatureModules.length > 0 ? literatureModules : fallbackLiteratureModules

  // Sample categories for the buttons
const categories = [
  { name: "Linguistique", href: "/linguistics" },
  { name: "Littérature", href: "/literature" },
  { name: "Commentaire Composé", href: "/commentaire-compose" },
  { name: "Dissertation", href: "/dissertation" },
  { name: "Essai", href: "/essai" },
  { name: "Communication", href: "/didactique/theater" },
  { name: "Pédagogie", href: "/pédagogie" },
  { name: "Didactique", href: "/didactique" },
  { name: "Psychologie", href: "/psychologie" },
  { name: "Sociologie", href: "/sociologie" },
  { name: "Philosophie", href: "/philosophie" },
  { name: "Histoire des idées et de l'art", href: "/literature" },
  { name: "Roman", href: "/literature" },
  { name: "Théâtre", href: "/literature" },
  { name: "Phonétique", href: "/linguistics" },
  { name: "Morphosyntaxe", href: "/linguistics" },
  { name: "Sémantique", href: "/linguistics/" },
  { name: "Poésie", href: "/literature" },
]

  return (
    <main className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#0e2d6d]">Session Exams</h1>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        Accédez à des sujets d'examens passés et à des supports d'étude pour vous aider à préparer vos examens de
        français.
      </p>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2">Chargement des examens...</span>
        </div>
      ) : error ? (
        <div className="text-center p-8 border rounded-md bg-yellow-50 text-yellow-800 mb-8">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Linguistics Card */}
       {/*<div className="bg-white shadow-2xl rounded-lg overflow-hidden border-b-[1px] border-t-[1px] border-gray-600" data-aos='fade-right'>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-[#0e2d6d]">Examens de linguistique</h2>
              <p className="text-gray-600 mb-4">
                Sujets d'examens passés et réponses modèles pour les examens de linguistique.
              </p>

              <div className="space-y-3 mb-6">
                {displayLinguisticsModules.map((module) => (
                  <div key={module._id} className="border rounded-md overflow-hidden">
                    <button
                      onClick={() => toggleLinguisticsModule(module._id)}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 text-left"
                    >
                      <span className="font-medium">{module.title}</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          expandedLinguisticsModules.includes(module._id) ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedLinguisticsModules.includes(module._id) && (
                      <div className="p-3 bg-white">
                        <ul className="space-y-2">
                          {module.files.map((file) => (
                            <li key={file.id}>
                              <Link
                                href={file.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 hover:underline"
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                {file.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Link
                href="/quiz"
                className="rounded-btn px-4 py-2 bg-[#0e2d6d] text-white hover:opacity-90 inline-block"
              >
                Commencer un quiz
              </Link>
            </div>
          </div>*/}

          {/* Literature Card */}
          <div className=" bg-white shadow-2xl rounded-lg overflow-hidden border-b-[1px] border-t-[1px] border-gray-600" data-aos='fade-right'>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-[#0e2d6d]">Examens et épreuves écrites</h2>
              <p className="text-gray-600 mb-4">
                Sujets d'examen passés et réponses modèles pour les examens de littérature et linguistique.
              </p>

              <div className="space-y-3 mb-6">
                {displayLiteratureModules.map((module) => (
                  <div key={module._id} className="border rounded-md overflow-hidden">
                    <button
                      onClick={() => toggleLiteratureModule(module._id)}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 text-left"
                    >
                      <span className="font-medium">{module.title}</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          expandedLiteratureModules.includes(module._id) ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedLiteratureModules.includes(module._id) && (
                      <div className="p-3 bg-white">
                        <ul className="space-y-2">
                          {module.files.map((file) => (
                            <li key={file.id}>
                              <Link
                                href={file.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 hover:underline"
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                {file.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Link
                href="/quiz"
                className="rounded-btn px-4 py-2 bg-[#0e2d6d] text-white hover:opacity-90 inline-block"
              >
                Commencer un quiz
              </Link>
            </div>
          </div>

          <div className="space-y-6" >
                      <CategoryButtons categories={categories} title="Les catégories disponibles" />
          
                      <div className="bg-white rounded-lg shadow-sm p-4 border" data-aos='fade-left'>
                        <h3 className="text-lg font-semibold mb-3">Ressources Populaires.</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link href="/commentaire-compose" className="text-[#0e2d6d] hover:underline">
                              Guide du commentaire composé
                            </Link>
                          </li>
                          <li>
                            <Link href="/dissertation" className="text-[#0e2d6d] hover:underline">
                              Méthodologie de la dissertation
                            </Link>
                          </li>
                          <li>
                            <Link href="/linguistics/phonetics" className="text-[#0e2d6d] hover:underline">
                              Cours de phonétique française
                            </Link>
                          </li>
                          <li>
                            <Link href="/literature/poetry" className="text-[#0e2d6d] hover:underline">
                              Analyse poétique
                            </Link>
                          </li>
                        </ul>
                      </div>
          
                       <NewsletterSignup />
                    </div>

        </div>
      )}
    </main>
  )
}
