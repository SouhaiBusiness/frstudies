import Link from 'next/link';

export const metadata = {
  title: 'Politique de confidentialité - ETUDESFRANÇAISES',
  description: 'Comment nous collectons et utilisons vos données personnelles',
  openGraph: {
    title: 'Politique de confidentialité - ETUDESFRANÇAISES',
    description: 'Notre engagement en matière de protection des données',
    url: 'https://frstudies.vercel.app/politique-confidentialite',
  },
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#0e2d6d]">
        Politique de Confidentialité
      </h1>
      
      <div className="prose prose-lg mx-auto">
        <p className="text-center mb-8">
          Dernière mise à jour : 8 juin 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p>
            Cette politique explique comment ETUDESFRANÇAISES collecte, utilise et protège vos 
            informations personnelles conformément au RGPD et aux lois applicables.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Données collectées</h2>
          <p>
            Nous pouvons collecter :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Informations de compte (nom, email et mot de passe)</li>
            <li>Données d'usage (pages visitées, durée de visite)</li>
            <li>Cookies pour le fonctionnement du site</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. Utilisation des données</h2>
          <p>
            Vos données sont utilisées pour :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fournir et améliorer nos services</li>
            <li>Personnaliser votre expérience</li>
            <li>Vous communiquer des (newsletters, événements, notifications)</li>
            <li>Analyser l'usage de la plateforme</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Partage des données</h2>
          <p>
            Nous ne vendons ni ne louons vos données personnelles. Nous pouvons partager des 
            informations avec :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Prestataires techniques (hébergement, analytics)</li>
            <li>Autorités légales si requis par la loi</li>
          </ul>
          <p className="mt-4">
            Nous utilisons notre propre système sécurisé d'authentification.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
          <p>
            Nous utilisons des cookies pour :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fonctionnement du site (session, authentification)</li>
            <li>Analyse d'audience </li>
          </ul>
          <p className="mt-4">
            Vous pouvez configurer votre navigateur pour refuser les cookies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos 
            données contre tout accès non autorisé.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7. Vos droits</h2>
          <p>
            Conformément au RGPD, vous avez le droit de :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Accéder à vos données</li>
            <li>Demander leur rectification</li>
            <li>Demander leur suppression</li>
            <li>Limiter leur traitement</li>
            <li>Vous opposer à leur utilisation</li>
          </ul>
          <p className="mt-4">
            Pour exercer ces droits, contactez-nous à l'adresse ci-dessous.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">8. Modifications</h2>
          <p>
            Nous pouvons mettre à jour cette politique. Les changements significatifs seront 
            notifiés aux utilisateurs.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">9. Contact</h2>
          <p>
            Pour toute question concernant cette politique ou vos données, contactez-nous à 
            <Link href="mailto:support.frstudies@gmail.com" className="text-blue-600 hover:underline ml-1">
              support.frstudies@gmail.com
            </Link>.
          </p>
        </section>
      </div>
    </main>
  );
}