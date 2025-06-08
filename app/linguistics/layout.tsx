// app/linguistics/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cours de Linguistique Française - FRSTUDIES",
  description: "Ressources PDF et modules de linguistique française : phonétique, morphologie, syntaxe, sémantique. Organisés par semestre.",
  keywords: ["linguistique française", "cours linguistique", "phonétique", "morphologie", "sémantique", "FRSTUDIES"],
  openGraph: {
    title: "Linguistique Française - FRSTUDIES",
    description: "Téléchargez des cours de linguistique française classés par semestre et module.",
    url: "https://frstudies.vercel.app/linguistics",
    type: "website",
  },
}

export default function LinguisticsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
