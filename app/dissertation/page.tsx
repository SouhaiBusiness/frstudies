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

export default function DissertationPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchModules() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch dissertation modules for all semesters
        const response = await fetch('/api/courses?filiere=dissertation');
        if (!response.ok) {
          throw new Error('Failed to fetch dissertation modules');
        }
        const data = await response.json();

        setModules(data.courses || []);
      } catch (error) {
        console.error('Error fetching dissertation modules:', error);
        setError(
          "Une erreur s'est produite lors du chargement des ressources de dissertation."
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
      _id: 'diss-1',
      title: 'Introduction à la Dissertation',
      filiere: 'dissertation',
      semester: 1,
      moduleId: 'diss-1',
      files: [
        {
          id: 'file-1',
          name: 'introduction-dissertation.pdf',
          fileUrl: '/api/files/introduction-dissertation.pdf',
          fileSize: 10240 * 10240,
        },
      ],
    },
    {
      _id: 'diss-2',
      title: 'Structure et Plan de Dissertation',
      filiere: 'dissertation',
      semester: 2,
      moduleId: 'diss-2',
      files: [
        {
          id: 'file-2',
          name: 'structure-plan-dissertation.pdf',
          fileUrl: '/api/files/structure-plan-dissertation.pdf',
          fileSize: 10240 * 10240,
        },
      ],
    },
    {
      _id: 'diss-3',
      title: 'Exemples de Dissertations',
      filiere: 'dissertation',
      semester: 3,
      moduleId: 'diss-3',
      files: [
        {
          id: 'file-3',
          name: 'exemples-dissertations.pdf',
          fileUrl: '/api/files/exemples-dissertations.pdf',
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
        Dissertation
      </h1>
      <p className='text-center mb-8 max-w-2xl mx-auto'>
        Guide complet pour maîtriser la dissertation française. Méthodologie,
        exemples corrigés et conseils pratiques pour réussir vos dissertations.
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
                  Ressources de Dissertation
                </h2>
                <p className='text-gray-600 mb-6'>
                  Téléchargez des guides méthodologiques, des exemples de
                  dissertations corrigées et des modèles de plans pour exceller
                  dans l'exercice de la dissertation.
                </p>

                {/* Add the Method Guide Card here */}
                <MethodGuideCard
                  title="Excellez dans l'art de la dissertation"
                  description="Découvrez les secrets d'une dissertation réussie : problématisation, plan dialectique, argumentation solide et style académique irréprochable."
                  ctaText='Lire ce guide méthodologique de dissertation avant de consulter les ressources ci-dessous'
                  linkUrl='/articles/guide-dissertation' // You'll update this later with actual blog slug
                  imageSrc='/dissertation.jpg' // You need to add this image to /public/images/
                  imageAlt='Guide méthodologique de dissertation'
                  bgColor='bg-gradient-to-r from-purple-50 to-blue-50'
                  textColor='text-[#0e2d6d]'
                />

                <h3 className="text-xl font-bold mb-4 mt-12 text-[#0e2d6d]">Exemples de dissertation</h3>

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
                    Étapes clés pour une dissertation réussie:
                  </h3>
                  <ol className='list-decimal pl-5 space-y-2 text-gray-600'>
                    <li>
                      <strong>Analyse du sujet</strong> : Bien comprendre la
                      question posée
                    </li>
                    <li>
                      <strong>Mobilisation des connaissances</strong> :
                      Rassembler les idées et références pertinentes
                    </li>
                    <li>
                      <strong>Élaboration du plan</strong> : Construire une
                      progression logique
                    </li>
                    <li>
                      <strong>Rédaction</strong> : Développer les arguments avec
                      précision
                    </li>
                    <li>
                      <strong>Conclusion</strong> : Synthétiser et ouvrir la
                      réflexion
                    </li>
                  </ol>
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
                Ressources Connexes
              </h3>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/commentaire-compose'
                    className='text-[#0e2d6d] hover:underline'
                  >
                    Guide du commentaire composé
                  </Link>
                </li>
                <li>
                  <Link
                    href='/exams'
                    className='text-[#0e2d6d] hover:underline'
                  >
                    Sujets d'examens
                  </Link>
                </li>
                <li>
                  <Link
                    href='/essai'
                    className='text-[#0e2d6d] hover:underline'
                  >
                    Techniques de l'essai
                  </Link>
                </li>
                <li>
                  <Link
                    href='/literature'
                    className='text-[#0e2d6d] hover:underline'
                  >
                    Analyse littéraire approfondie
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
