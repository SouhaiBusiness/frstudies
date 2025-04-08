"use client"

const semesters = [
  { id: 1, name: "Semester 1" },
  { id: 2, name: "Semester 2" },
  { id: 3, name: "Semester 3" },
  { id: 4, name: "Semester 4" },
  { id: 5, name: "Semester 5" },
  { id: 6, name: "Semester 6" },
]

interface SemesterFilterProps {
  activeSemester: number | null
  onSemesterChange: (semesterId: number | null) => void
}

export default function SemesterFilter({ activeSemester, onSemesterChange }: SemesterFilterProps) {
  const handleSemesterClick = (semesterId: number) => {
    if (activeSemester === semesterId) {
      onSemesterChange(null) // Toggle off if already active
    } else {
      onSemesterChange(semesterId)
    }
  }

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4">Filtrer par semestre</h2>
      <div className="flex flex-wrap gap-4">
        {semesters.map((semester) => (
          <button
            key={semester.id}
            onClick={() => handleSemesterClick(semester.id)}
            className={`px-4 py-2 rounded-md cursor-pointer ${
              activeSemester === semester.id
                ? "bg-[#0e2d6d] text-white"
                : "bg-white border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {semester.name}
          </button>
        ))}
      </div>
    </div>
  )
}

