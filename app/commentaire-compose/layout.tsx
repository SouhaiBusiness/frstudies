import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Commentaire Composé - Guide Complet et Méthodologie | ETUDESFRANÇAISES",
  description: "Maîtrisez l'art du commentaire composé avec nos guides méthodologiques, exemples détaillés et exercices pratiques. Ressources complètes pour étudiants en français.",
  keywords: ["commentaire composé", "méthodologie commentaire", "français", "littérature", "analyse de texte", "guide commentaire", "exercices commentaire"],
  openGraph: {
    title: "Commentaire Composé - Guide Complet | ETUDESFRANÇAISES",
    description: "Apprenez à rédiger un commentaire composé parfait avec nos ressources méthodologiques et exemples pratiques.",
    url: "https://frstudies.vercel.app/commentaire-compose",
    type: "website",
  },
}

export default function CommentaireComposeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}