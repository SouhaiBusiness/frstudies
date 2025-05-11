"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import SemesterFilter from "@/components/semester-filter"
import ModuleList from "@/components/module-list"
import Link from "next/link"

// Define the modules for linguistics by semester (fallback data)
const linguisticsModules = {
  1: [
    {
      _id: "ling-s1-m1",
      title: "Introduction à la Linguistique",
      semester: 1,
      files: [],
    },
    {
      _id: "ling-s1-m2",
      title: "Phonétique",
      semester: 1,
      files: [],
    },
    {
      _id: "ling-s1-m3",
      title: "Phonologie",
      semester: 1,
      files: [],
    },
    {
      _id: "ling-s1-m4",
      title: "Morphologie de Base",
      semester: 1,
      files: [],
    },
    {
      _id: "ling-s1-m5",
      title: "Syntaxe de Base",
      semester: 1,
      files: [],
    },
    {
      _id: "ling-s1-m6",
      title: "Sémantique de Base",
      semester: 1,
      files: [],
    },
  ],
  // Other semesters defined in previous code...
}

export default function LinguisticsPage() {
  const [activeSemester, setActiveSemester] = useState<number | null>(null)
  const [modules, setModules] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchModules() {
      try {
        setIsLoading(true)
        setError(null)

        // First try to fetch from the API
        const response = await fetch(
          `/api/courses?filiere=linguistics${activeSemester ? `&semester=${activeSemester}` : ""}`,
        )

        if (!response.ok) {
          throw new Error("Failed to fetch modules")
        }

        const data = await response.json()

        // If we have data from the API, use it
        if (data.courses && data.courses.length > 0) {
          setModules(data.courses)
        } else {
          // Otherwise, use our predefined modules
          if (activeSemester) {
            setModules(linguisticsModules[activeSemester as keyof typeof linguisticsModules] || [])
          } else {
            // If no semester is selected, show all modules
            const allModules = Object.values(linguisticsModules).flat()
            setModules(allModules)
          }
        }
      } catch (error) {
        console.error("Error fetching modules:", error)

        // Fall back to predefined modules
        if (activeSemester) {
          setModules(linguisticsModules[activeSemester as keyof typeof linguisticsModules] || [])
        } else {
          const allModules = Object.values(linguisticsModules).flat()
          setModules(allModules)
        }

        setError("Une erreur s'est produite lors du chargement des modules. Affichage des modules par défaut.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchModules()
  }, [activeSemester])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Linguistique</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explorez nos ressources en linguistique française, organisées par semestre et par module
        </p>
        <p className="text-red-400">N.B: Vous allez trouver les modules des semestres 1, 2, 3, 4 sur la page  
          <Link href="/literature" className="underline"> "Littérature".</Link> <br></br> Seuls les modules des semestres 5 et 6 
          de la branche linguistique qui existent sur cette page </p>
        <p className="text-red-400">Vous devez vous inscrire ou vous connecter en cliquant sur <Link href="/sign-in" className="underline">signIn</Link>, pour avoir acces aux cours.</p>
      </div>

      <SemesterFilter activeSemester={activeSemester} onSemesterChange={setActiveSemester} />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2">Chargement des modules...</span>
        </div>
      ) : error ? (
        <div className="text-center p-8 border rounded-md bg-yellow-50 text-yellow-800 mb-8">{error}</div>
      ) : null}

      <ModuleList modules={modules} activeSemester={activeSemester} />
    </div>
  )
}
