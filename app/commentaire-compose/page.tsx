'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, FileText, Loader2 } from 'lucide-react';
import CategoryButtons from '@/components/category-buttons';
import NewsletterSignup from '@/components/newsletter-signup';
import MethodGuideCard from '@/components/method-guide-card';

interface ModuleFile {
  id: string;
  name: string;
  fileUrl: string;
  fileSize?: number;
  uploadedAt?: string;
}

interface Module {
  _id: string;
  title: string;
  filiere: string;
  semester: number;
  moduleId: string;
  files: ModuleFile[];
}

export default function CommentaireComposePage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchModules() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch commentaire-compose modules for all semesters
        const response = await fetch(
          '/api/courses?filiere=commentaire-compose'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch commentaire composé modules');
        }
        const data = await response.json();

        setModules(data.courses || []);
      } catch (error) {
        console.error('Error fetching commentaire composé modules:', error);
        setError(
          "Une erreur s'est produite lors du chargement des ressources de commentaire composé."
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchModules();
  }, []);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  // Fallback data
  const fallbackModules = [
    {
      _id: 'cc-1',
      title: 'Introduction au Commentaire Composé',
      filiere: 'commentaire-compose',
      semester: 1,
      moduleId: 'cc-1',
      files: [
        {
          id: 'file-1',
          name: 'introduction-commentaire-compose.pdf',
          fileUrl: '/api/files/introduction-commentaire-compose.pdf',
          fileSize: 10240 * 10240,
        },
      ],
    },
    {
      _id: 'cc-2',
      title: 'Méthodologie Complète',
      filiere: 'commentaire-compose',
      semester: 2,
      moduleId: 'cc-2',
      files: [
        {
          id: 'file-2',
          name: 'methodologie-commentaire-compose.pdf',
          fileUrl: '/api/files/methodologie-commentaire-compose.pdf',
          fileSize: 10240 * 10240,
        },
      ],
    },
    {
      _id: 'cc-3',
      title: 'Exemples et Exercices',
      filiere: 'commentaire-compose',
      semester: 3,
      moduleId: 'cc-3',
      files: [
        {
          id: 'file-3',
          name: 'exemples-exercices-commentaire.pdf',
          fileUrl: '/api/files/exemples-exercices-commentaire.pdf',
          fileSize: 10240 * 10240,
        },
      ],
    },
  ];

  // Use fallback data if no modules are found
  const displayModules = modules.length > 0 ? modules : fallbackModules;

  const categories = [
    { name: 'Linguistique', href: '/linguistics' },
    { name: 'Littérature', href: '/literature' },
    { name: 'Commentaire Composé', href: '/commentaire-compose' },
    { name: 'Dissertation', href: '/dissertation' },
    { name: 'Essai', href: '/essai' },
    { name: 'Communication', href: '/didactique/theater' },
    { name: 'Pédagogie', href: '/pédagogie' },
    { name: 'Didactique', href: '/didactique' },
    { name: 'Psychologie', href: '/psychologie' },
    { name: 'Sociologie', href: '/sociologie' },
    { name: 'Philosophie', href: '/philosophie' },
    { name: "Histoire des idées et de l'art", href: '/literature' },
    { name: 'Roman', href: '/literature' },
    { name: 'Théâtre', href: '/literature' },
    { name: 'Phonétique', href: '/linguistics' },
    { name: 'Morphosyntaxe', href: '/linguistics' },
    { name: 'Sémantique', href: '/linguistics/' },
    { name: 'Poésie', href: '/literature' },
  ];

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6 text-center text-[#0e2d6d]'>
        Commentaire Composé
      </h1>
      <p className='text-center mb-8 max-w-2xl mx-auto'>
        Ressources complètes pour maîtriser l'art du commentaire composé. Guides
        méthodologiques, exemples détaillés et exercices pratiques.
      </p>

      {isLoading ? (
        <div className='flex justify-center items-center h-64'>
          <Loader2 className='h-8 w-8 animate-spin text-blue-600' />
          <span className='ml-2'>Chargement des ressources...</span>
        </div>
      ) : error ? (
        <div className='text-center p-8 border rounded-md bg-yellow-50 text-yellow-800 mb-8'>
          {error}
        </div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          <div className='lg:col-span-3'>
            <div className='bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200'>
              <div className='p-6'>
                <h2 className='text-xl font-bold mb-4 text-[#0e2d6d]'>
                  Ressources de Commentaire Composé
                </h2>
                <p className='text-gray-600 mb-6'>
                  Accédez à des guides méthodologiques, des exemples commentés
                  et des exercices pratiques pour perfectionner votre technique
                  de commentaire composé.
                </p>

                {/* Add the Method Guide Card here */}
                <MethodGuideCard
                  title="Maîtrisez l'art du commentaire composé"
                  description='Un guide complet étape par étape pour analyser, structurer et rédiger un commentaire composé parfait. Apprenez les techniques des grands critiques littéraires.'
                  ctaText="Lire ce guide méthodologique de commentaire composé avant de passer aux exercices d'application ci-dessous"
                  linkUrl='/articles/mthodologie-du-commentaire-compos' // You'll update this later with actual blog slug
                  imageSrc='/commentairecomposé.png' // You need to add this image to /public/images/
                  imageAlt='Guide méthodologique de commentaire composé'
                  bgColor='bg-gradient-to-r from-blue-50 to-indigo-50'
                  textColor='text-[#0e2d6d]'
                />

                <h3 className='text-xl font-bold mb-4 mt-12 text-[#0e2d6d]'>
                  Exemples de Commentaire composé
                </h3>

                <div className='space-y-4'>
                  {displayModules.map((module) => (
                    <div
                      key={module._id}
                      className='border rounded-lg overflow-hidden'
                    >
                      <button
                        onClick={() => toggleModule(module._id)}
                        className='w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 text-left'
                      >
                        <div>
                          <span className='font-medium text-lg'>
                            {module.title}
                          </span>
                          <div className='flex items-center gap-4 mt-1'>
                            <span className='text-sm text-gray-500'>
                              Semestre {module.semester}
                            </span>
                            <span className='text-sm text-gray-500'>
                              {module.files?.length || 0} fichier(s)
                            </span>
                          </div>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            expandedModules.includes(module._id)
                              ? 'rotate-180'
                              : ''
                          }`}
                        />
                      </button>

                      {expandedModules.includes(module._id) && (
                        <div className='p-4 bg-white border-t'>
                          <h4 className='font-medium mb-3 text-gray-700'>
                            Fichiers disponibles:
                          </h4>
                          <ul className='space-y-3'>
                            {module.files.map((file) => (
                              <li
                                key={file.id}
                                className='flex items-center justify-between p-3 bg-gray-50 rounded'
                              >
                                <Link
                                  href={file.fileUrl}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  className='flex items-center text-blue-600 hover:underline flex-1'
                                >
                                  <FileText className='h-4 w-4 mr-3' />
                                  <span className='truncate'>{file.name}</span>
                                </Link>
                                {file.fileSize && (
                                  <span className='text-sm text-gray-500 ml-4'>
                                    {(file.fileSize / 1024 / 1024).toFixed(2)}{' '}
                                    MB
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className='mt-8 pt-6 border-t'>
                  <h3 className='text-lg font-semibold mb-3'>
                    Conseils pour réussir votre commentaire composé:
                  </h3>
                  <ul className='list-disc pl-5 space-y-2 text-gray-600'>
                    <li>
                      Lisez attentivement le texte plusieurs fois avant de
                      commencer
                    </li>
                    <li>
                      Identifiez le mouvement du texte et la progression des
                      idées
                    </li>
                    <li>Analysez les procédés stylistiques et leurs effets</li>
                    <li>
                      Structurez votre commentaire en trois parties :
                      introduction, développement, conclusion
                    </li>
                    <li>
                      Citez le texte avec précision pour étayer vos analyses
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-6'>
            <CategoryButtons
              categories={categories}
              title='Les catégories disponibles'
            />

            <div className='bg-white rounded-lg shadow-sm p-4 border'>
              <h3 className='text-lg font-semibold mb-3'>
                Ressources Populaires
              </h3>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/dissertation'
                    className='text-[#0e2d6d] hover:underline'
                  >
                    Guide de la dissertation
                  </Link>
                </li>
                <li>
                  <Link
                    href='/exams'
                    className='text-[#0e2d6d] hover:underline'
                  >
                    Sujets d'examens corrigés
                  </Link>
                </li>
                <li>
                  <Link
                    href='/linguistics'
                    className='text-[#0e2d6d] hover:underline'
                  >
                    Cours de linguistique
                  </Link>
                </li>
                <li>
                  <Link
                    href='/literature'
                    className='text-[#0e2d6d] hover:underline'
                  >
                    Analyse littéraire
                  </Link>
                </li>
              </ul>
            </div>

            <NewsletterSignup />
          </div>
        </div>
      )}
    </main>
  );
}
