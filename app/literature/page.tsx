"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import SemesterFilter from "@/components/semester-filter"
import ModuleList from "@/components/module-list"
import Link from "next/link"

// Define the modules for literature by semester
const literatureModules = {
  1: [
    {
      _id: "lit-s1-m1",
      title: "Introduction à la Littérature",
      semester: 1,
      files: [],
    },
    {
      _id: "lit-s1-m2",
      title: "Littérature du Moyen Âge",
      semester: 1,
      files: [],
    },
    {
      _id: "lit-s1-m3",
      title: "Poésie Classique",
      semester: 1,
      files: [],
    },
    {
      _id: "lit-s1-m4",
      title: "Théâtre Classique",
      semester: 1,
      files: [],
    },
    {
      _id: "lit-s1-m5",
      title: "Roman Classique",
      semester: 1,
      files: [],
    },
    {
      _id: "lit-s1-m6",
      title: "Analyse Littéraire",
      semester: 1,
      files: [],
    },
  ],
  2: [
    {
      _id: "lit-s2-m1",
      title: "Littérature de la Renaissance",
      semester: 2,
      files: [],
    },
    {
      _id: "lit-s2-m2",
      title: "Poésie de la Renaissance",
      semester: 2,
      files: [],
    },
    {
      _id: "lit-s2-m3",
      title: "Théâtre de la Renaissance",
      semester: 2,
      files: [],
    },
    {
      _id: "lit-s2-m4",
      title: "Roman de la Renaissance",
      semester: 2,
      files: [],
    },
    {
      _id: "lit-s2-m5",
      title: "Critique Littéraire",
      semester: 2,
      files: [],
    },
    {
      _id: "lit-s2-m6",
      title: "Méthodologie Littéraire",
      semester: 2,
      files: [],
    },
  ],
  3: [
    {
      _id: "lit-s3-m1",
      title: "Littérature du 17e siècle",
      semester: 3,
      files: [],
    },
    {
      _id: "lit-s3-m2",
      title: "Poésie du 17e siècle",
      semester: 3,
      files: [],
    },
    {
      _id: "lit-s3-m3",
      title: "Théâtre du 17e siècle",
      semester: 3,
      files: [],
    },
    {
      _id: "lit-s3-m4",
      title: "Roman du 17e siècle",
      semester: 3,
      files: [],
    },
    {
      _id: "lit-s3-m5",
      title: "Analyse Poétique",
      semester: 3,
      files: [],
    },
    {
      _id: "lit-s3-m6",
      title: "Analyse Dramatique",
      semester: 3,
      files: [],
    },
  ],
  4: [
    {
      _id: "lit-s4-m1",
      title: "Littérature du 18e siècle",
      semester: 4,
      files: [],
    },
    {
      _id: "lit-s4-m2",
      title: "Poésie du 18e siècle",
      semester: 4,
      files: [],
    },
    {
      _id: "lit-s4-m3",
      title: "Théâtre du 18e siècle",
      semester: 4,
      files: [],
    },
    {
      _id: "lit-s4-m4",
      title: "Roman du 18e siècle",
      semester: 4,
      files: [],
    },
    {
      _id: "lit-s4-m5",
      title: "Littérature des Lumières",
      semester: 4,
      files: [],
    },
    {
      _id: "lit-s4-m6",
      title: "Critique du 18e siècle",
      semester: 4,
      files: [],
    },
  ],
  5: [
    {
      _id: "lit-s5-m1",
      title: "Littérature du 19e siècle",
      semester: 5,
      files: [],
    },
    {
      _id: "lit-s5-m2",
      title: "Poésie du 19e siècle",
      semester: 5,
      files: [],
    },
    {
      _id: "lit-s5-m3",
      title: "Théâtre du 19e siècle",
      semester: 5,
      files: [],
    },
    {
      _id: "lit-s5-m4",
      title: "Roman du 19e siècle",
      semester: 5,
      files: [],
    },
    {
      _id: "lit-s5-m5",
      title: "Réalisme et Naturalisme",
      semester: 5,
      files: [],
    },
    {
      _id: "lit-s5-m6",
      title: "Symbolisme",
      semester: 5,
      files: [],
    },
  ],
  6: [
    {
      _id: "lit-s6-m1",
      title: "Littérature du 20e siècle",
      semester: 6,
      files: [],
    },
    {
      _id: "lit-s6-m2",
      title: "Poésie du 20e siècle",
      semester: 6,
      files: [],
    },
    {
      _id: "lit-s6-m3",
      title: "Théâtre du 20e siècle",
      semester: 6,
      files: [],
    },
    {
      _id: "lit-s6-m4",
      title: "Roman du 20e siècle",
      semester: 6,
      files: [],
    },
    {
      _id: "lit-s6-m5",
      title: "Littérature Contemporaine",
      semester: 6,
      files: [],
    },
    {
      _id: "lit-s6-m6",
      title: "Littérature Francophone",
      semester: 6,
      files: [],
    },
  ],
}

export default function LiteraturePage() {
  const [activeSemester, setActiveSemester] = useState<number | null>(null)
  const [modules, setModules] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchModules() {
      try {
        setIsLoading(true)

        // First try to fetch from the API
        const response = await fetch(
          `/api/courses?filiere=literature${activeSemester ? `&semester=${activeSemester}` : ""}`,
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
            setModules(literatureModules[activeSemester as keyof typeof literatureModules] || [])
          } else {
            // If no semester is selected, show all modules
            const allModules = Object.values(literatureModules).flat()
            setModules(allModules)
          }
        }
      } catch (error) {
        console.error("Error fetching modules:", error)

        // Fall back to predefined modules
        if (activeSemester) {
          setModules(literatureModules[activeSemester as keyof typeof literatureModules] || [])
        } else {
          const allModules = Object.values(literatureModules).flat()
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
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Littérature</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explorez nos ressources en littérature française, organisées par semestre et par module
        </p>
        <p className="text-red-400">Vous devez vous inscrire ou vous connecter en cliquant sur <Link href="/signIn" className="underline">signIn</Link>, 
        pour avoir acces aux cours.</p>
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
