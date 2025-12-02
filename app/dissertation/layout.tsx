import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dissertation Française - Guide Méthodologique Complet | ETUDESFRANÇAISES",
  description: "Maîtrisez l'art de la dissertation française avec nos guides méthodologiques, exemples corrigés et conseils pratiques. Ressources pour étudiants en littérature et philosophie.",
  keywords: ["dissertation", "méthodologie dissertation", "français", "littérature", "philosophie", "guide dissertation", "exemples corrigés"],
  openGraph: {
    title: "Dissertation Française - Guide Complet | ETUDESFRANÇAISES",
    description: "Apprenez à rédiger une dissertation parfaite avec nos ressources méthodologiques et exemples pratiques.",
    url: "https://frstudies.vercel.app/dissertation",
    type: "website",
  },
}

export default function DissertationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}