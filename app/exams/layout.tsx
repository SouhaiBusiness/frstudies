// app/exams/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Examens & Épreuves de Littérature et Linguistique - FRSTUDIES",
  description: "Préparez vos examens avec des sujets corrigés et des PDF gratuits en littérature et linguistique française.",
  keywords: ["examens français", "examens littérature", "examens linguistique", "sujets corrigés", "examen en PDF", "FRSTUDIES"],
  openGraph: {
    title: "Examens de Littérature et Linguistique - FRSTUDIES",
    description: "Accédez à des sujets d'examens corrigés pour chaque semestre. Aide précieuse à la réussite universitaire.",
    url: "https://frstudies.vercel.app/exams",
    type: "website",
  },
}

export default function ExamsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
