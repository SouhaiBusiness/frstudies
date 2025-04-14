import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6 text-center text-[#0e2d6d]'>
        QUI SOMMES-NOUS ?
      </h1>

      <section className='bg-[#1a2630] text-white py-16 relative overflow-hidden shadow-2xl rounded-2xl'>
        {/* Background pattern */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute inset-0 bg-gradient-to-br from-[#0e2d6d] to-[#0e2d6d] transform rotate-[-10deg] scale-130'></div>
          <Image
            src='/images.jpg?height=300&width=1200'
            alt='Linguistics'
            fill
            className='object-cover'
          />
        </div>

        <div className='container mx-auto px-4 max-w-4xl relative z-10'>
          <div className='space-y-12'>
            <p className='pl-4 text-lg mb-12 mt-4 md:pl-14 text-center '>
              <span className='font-bold'>ETUDESFRANÇAISES</span> est une
              plateforme complète conçue spécialement pour les étudiants en
              études françaises. Notre mission est de fournir un accès facile à
              des ressources éducatives de haute qualité pour aider les
              étudiants à exceller dans leurs cours de langue française, de
              linguistique, de littérature et surtout de développer leurs
              capacités culturelles.
            </p>

            {/* Feature 1 */}
            <div className='flex items-start gap-6'>
              <div className='bg-blue-600 rounded-full p-3 shrink-0'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-white'
                >
                  <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'></path>
                  <path d='M14 2v6h6'></path>
                  <path d='M16 13H8'></path>
                  <path d='M16 17H8'></path>
                  <path d='M10 9H8'></path>
                </svg>
              </div>
              <div>
                <h3 className='text-xl font-bold mb-2'>Cours</h3>
                <p className='text-gray-300'>
                  Cours conçus d'une manière accessible et rapides par semestre
                  et par modules
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className='flex items-start gap-6'>
              <div className='bg-blue-600 rounded-full p-3 shrink-0'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-white'
                >
                  <path d='m2 12 5 5 5-5'></path>
                  <path d='m2 5 5 5 5-5'></path>
                  <path d='M12 19h6a2 2 0 0 0 2-2v-4'></path>
                  <path d='M18 5V3a2 2 0 0 0-2-2h-4'></path>
                  <path d='M22 12h-4'></path>
                </svg>
              </div>

              <div>
                <h3 className='text-xl font-bold mb-2'>Examens</h3>
                <p className='text-gray-300'>
                  Sujets d'examens passés et réponses modèles.
                </p>
              </div>
            </div>
 

            {/* Feature 3*/}
            <div className='flex items-start gap-6'>
              <div className='bg-blue-600 rounded-full p-3 shrink-0'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-white'
                >
                  <path d='m2 12 5 5 5-5'></path>
                  <path d='m2 5 5 5 5-5'></path>
                  <path d='M12 19h6a2 2 0 0 0 2-2v-4'></path>
                  <path d='M18 5V3a2 2 0 0 0-2-2h-4'></path>
                  <path d='M22 12h-4'></path>
                </svg>
              </div>

              <div>
                <h3 className='text-xl font-bold mb-2'>
                  Rédaction et production littéraire
                </h3>
                <p className='text-gray-300'>
                  Ressources pour des sujets spécialisés comme le Commentaire
                  Composé et la Dissertation
                </p>
              </div>
            </div>

            {/* Feature 4*/}
            <div className='flex items-start gap-6'>
              <div className='bg-blue-600 rounded-full p-3 shrink-0'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-white'
                >
                  <path d='m2 12 5 5 5-5'></path>
                  <path d='m2 5 5 5 5-5'></path>
                  <path d='M12 19h6a2 2 0 0 0 2-2v-4'></path>
                  <path d='M18 5V3a2 2 0 0 0-2-2h-4'></path>
                  <path d='M22 12h-4'></path>
                </svg>
              </div>

              <div>
                <h3 className='text-xl font-bold mb-2'>Blogs</h3>
                <p className='text-gray-300'>
                  Une interface conviviale qui permet de trouver rapidement des
                  ressources et des réflexions sur des sujets divers
                </p>
              </div>
            </div>

            {/* Feature 5*/}
            <div className='flex items-start gap-6'>
              <div className='bg-blue-600 rounded-full p-3 shrink-0'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-white'
                >
                  <path d='m2 12 5 5 5-5'></path>
                  <path d='m2 5 5 5 5-5'></path>
                  <path d='M12 19h6a2 2 0 0 0 2-2v-4'></path>
                  <path d='M18 5V3a2 2 0 0 0-2-2h-4'></path>
                  <path d='M22 12h-4'></path>
                </svg>
              </div>

              <div>
                <h3 className='text-xl font-bold mb-2'>Quiz</h3>
                <p className='text-gray-300'>
                  Nous préparons régulièrement des quiz pour rendre votre chemin d'apprentissage ludique, amusant et renforcer chez
                  vous la compétence de l'auto-évaluation.
                </p>
              </div>
            </div>
          </div>

          <div className='max-w-3xl mx-auto'>
            <h2 className='text-2xl font-bold mt-8 mb-4'>Notre mission</h2>
            <p className='mb-4'>
              Nous visons à rendre les études de français plus accessibles et
              captivantes pour les étudiants de tous niveaux. En fournissant un
              dépôt centralisé de matériel de cours, de quiz pratiques et de
              ressources pour les examens, nous aidons les étudiants à se
              préparer efficacement pour leur parcours académique.
            </p>

            <h2 className='text-2xl font-bold mt-8 mb-4'>Nous offrons</h2>
            <ul className='list-disc pl-6 space-y-2 mb-4'>
              <li>
                Matériel de cours complet organisé par semestre et par sujet
              </li>
              <li>
                Quiz interactifs pour tester et renforcer vos connaissances
              </li>
              <li>Sujets d'examen passés et réponses modèles</li>
              <li>
                Ressources pour des sujets spécialisés comme le Commentaire
                Composé et la Dissertation
              </li>
              <li>
                Une interface conviviale qui permet de trouver rapidement les
                ressources
              </li>
            </ul>

            <h2 className='text-2xl font-bold mt-8 mb-4'>Contactez-nous</h2>
            <p className='mb-4'>
              Si vous avez des questions, des suggestions ou des retours,
              n'hésitez pas de nous contacter. Nous travaillons constamment à
              améliorer notre plateforme et serions ravis d'avoir de vos
              retours.
            </p>
            <div className='mt-4'>
              <Link
                href='/contact'
                target='_blank'
                rel='noopener noreferrer'
                className='px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer'
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Trusted by section */}
          <div className='mt-16 text-center'>
            <p className='text-sm text-gray-400 mb-6'>
              Vous êtes professeur, lauréat d'un master, doctorant ou un
              étudiant en doctorat, ayant la volonté d'enrichir notre contenu.
              notre platforme vous est ouverte. Envoyez votre CV et/ou portfolio
              sur l'adresse email{' '}
              <Link
                href='mailto:support@frstudies.fr '
                className='text-blue-500 hover:underline'
              >
                support@frstudies.fr{' '}
              </Link>
            </p>
            <h1 className='font-bold mb-8 mt-8'>Disciplines </h1>
            <p>Littérature - Linguistique - Communication - Art - Traduction - Sociologie - Psychologie - Philosophie - Didactique - Pédagogie </p>
            <h1 className='font-bold mb-8 mt-8'>Réseaux sociaux</h1>
            <div className='flex flex-wrap justify-center items-center gap-6 opacity-70'>
              <Link
                href=''
                target='_blank'
                rel='noopener noreferrer'
                className='h-8 w-24 relative'
              >
                <Linkedin />
              </Link>
              <Link
                href=''
                target='_blank'
                rel='noopener noreferrer'
                className='h-8 w-24 relative'
              >
                <Twitter />
              </Link>
              <Link
                href='mailto:support@frstudies.fr '
                target='_blank'
                rel='noopener noreferrer'
                className='h-8 w-24 relative'
              >
                <Mail />
              </Link>
              <Link
                href=''
                target='_blank'
                rel='noopener noreferrer'
                className='h-8 w-24 relative'
              >
                <Instagram />
              </Link>
              <Link
                href=''
                target='_blank'
                rel='noopener noreferrer'
                className='h-8 w-16 relative'
              >
                <Facebook />
              </Link>
            </div> 
          </div>
        </div>
      </section>
    </main>
  );
}
