// app/literature/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cours de Littérature Française - FRSTUDIES",
  description: "Accédez à des cours et ressources universitaires en littérature française. Modules par semestre : poésie, théâtre, roman, analyse littéraire.",
  keywords: ["littérature française", "cours de littérature", "poésie", "roman", "théâtre", "études françaises", "FRSTUDIES"],
  openGraph: {
    title: "Littérature Française - FRSTUDIES",
    description: "Explorez les modules de littérature française pour chaque semestre avec des PDF gratuits.",
    url: "https://frstudies.vercel.app/literature",
    type: "website",
  },
}

export default function LiteratureLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
