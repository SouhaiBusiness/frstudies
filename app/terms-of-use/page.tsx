import Link from 'next/link';

export const metadata = {
  title: 'Conditions d\'utilisation - ETUDESFRANÇAISES',
  description: 'Conditions générales d\'utilisation de la plateforme ETUDESFRANÇAISES',
  openGraph: {
    title: 'Conditions d\'utilisation - ETUDESFRANÇAISES',
    description: 'Lisez nos conditions générales d\'utilisation',
    url: 'https://frstudies.vercel.app/conditions-utilisation',
  },
};

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#0e2d6d]">
        Conditions Générales d'Utilisation
      </h1>
      
      <div className="prose prose-lg mx-auto">
        <p className="text-center mb-8">
          Dernière mise à jour : 8 juin 2024
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Acceptation des conditions</h2>
          <p>
            En accédant et en utilisant la plateforme ETUDESFRANÇAISES (frstudies.vercel.app), 
            vous acceptez d'être lié par les présentes Conditions d'Utilisation. Si vous n'acceptez 
            pas ces conditions, veuillez ne pas utiliser notre site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Description du service</h2>
          <p>
            ETUDESFRANÇAISES est une plateforme éducative fournissant :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ressources pédagogiques en linguistique et littérature françaises</li>
            <li>Sujets d'examens et corrigés modèles</li>
            <li>Articles et blogs sur les études françaises</li>
            <li>Quiz interactifs pour l'auto-évaluation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. Compte utilisateur</h2>
          <p>
            Certaines fonctionnalités nécessitent la création d'un compte. Vous êtes responsable :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>De la confidentialité de vos identifiants</li>
            <li>De l'exactitude des informations fournies</li>
            <li>De toutes les activités sur votre compte</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Propriété intellectuelle</h2>
          <p>
            Tout le contenu (cours, examens, articles) est la propriété d'ETUDESFRANÇAISES ou de 
            ses contributeurs. Vous pouvez :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Consulter le contenu pour usage personnel</li>
            <li>Partager des liens vers nos pages</li>
          </ul>
          <p className="mt-4">
            Vous ne pouvez pas :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Reproduire ou redistribuer le contenu sans autorisation</li>
            <li>Utiliser le contenu à des fins commerciales</li>
            <li>Modifier ou créer des œuvres dérivées</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Responsabilités</h2>
          <p>
            ETUDESFRANÇAISES s'efforce de fournir des informations exactes mais ne peut garantir 
            l'exhaustivité ou l'actualité du contenu. L'utilisation des ressources se fait sous 
            votre propre responsabilité.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. Modifications</h2>
          <p>
            Nous pouvons modifier ces conditions à tout moment. Les utilisateurs seront informés 
            des changements majeurs. La poursuite de l'utilisation vaut acceptation des nouvelles 
            conditions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7. Contact</h2>
          <p>
            Pour toute question concernant ces conditions, veuillez nous contacter à 
            <Link href="mailto:support.frstudies@gmail.com" className="text-blue-600 hover:underline ml-1">
              support.frstudies@gmail.com
            </Link>.
          </p>
        </section>
      </div>
    </main>
  );
}