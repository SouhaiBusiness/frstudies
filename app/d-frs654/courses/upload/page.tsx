'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Upload, X, AlertTriangle, Info } from 'lucide-react';
import { useNotification, Notification } from '@/components/notification';

// Define the available filières
const filieres = [
  { value: 'literature', label: 'Littérature' },
  { value: 'linguistics', label: 'Linguistique' },
  { value: 'exams', label: 'Examens' },
  { value: 'commentaire-compose', label: 'Commentaire Composé' },
  { value: 'dissertation', label: 'Dissertation' },
  { value: 'essai', label: 'Essai' },
];

// Define the available semesters
const semesters = [
  { value: '1', label: 'Semestre 1' },
  { value: '2', label: 'Semestre 2' },
  { value: '3', label: 'Semestre 3' },
  { value: '4', label: 'Semestre 4' },
  { value: '5', label: 'Semestre 5' },
  { value: '6', label: 'Semestre 6' },
];

// Define modules for each filière and semester
const modulesByFiliereAndSemester = {
  literature: {
    '1': [
      {
        value: 'Initiation-aux-genres-dramatiques',
        label: 'Initiation aux genres dramatiques',
      },
      { value: 'Grammaire', label: 'Grammaire' },
      { value: 'Les grands-mythes', label: 'Les grands mythes' },
      { value: 'Histoire-des-idées', label: 'Histoire des idées' },
      { value: 'Phonétique', label: 'Phonétique' },
      {
        value: 'Typologie-des-textes-narratifs',
        label: 'Typologie des textes narratifs',
      },
    ],
    '2': [
      { value: 'Poésie-et-Versification', label: 'Poésie et Versification' },
      { value: 'Morphosyntaxe', label: 'Morphosyntaxe' },
      { value: 'Lexicographie', label: 'Lexicographie' },
      { value: 'Histoire-des-idées', label: 'Histoire des idées' },
      { value: 'Catégories-du-récit', label: 'Catégories du récit' },
      {
        value: "Introduction-à-l'interculturel",
        label: "Introduction à l'interculturel",
      },
    ],
    '3': [
      { value: 'Théâtre-classique', label: 'Théâtre classique' },
      { value: 'Morphosyntaxe', label: 'Morphosyntaxe' },
      { value: 'Analyse-du-roman', label: 'Analyse du roman' },
      { value: 'Histoire-des-idées', label: 'Histoire des idées' },
      { value: 'Lexicologie', label: 'Lexicologie' },
      { value: 'Traduction', label: 'Traduction' },
    ],
    '4': [
      {
        value: 'initiation-à-la-linguistique',
        label: 'initiation à la linguistique',
      },
      { value: 'Morphosyntaxe', label: 'Morphosyntaxe' },
      {
        value: 'initiation-à-la-recherche',
        label: 'initiation à la recherche',
      },
      { value: 'Histoire-des-idées', label: 'Histoire des idées' },
      { value: 'Poésie', label: 'Poésie' },
      { value: 'Théâtre-classique', label: 'Théâtre classique' },
    ],
    '5': [
      {
        value: 'Théories-du-texte-littéraire1',
        label: 'Théories du texte littéraire 1',
      },
      { value: 'Études-postcoloniales', label: 'Études postcoloniales' },
      { value: 'Littérature-comparée', label: 'Littérature comparée' },
      { value: 'Analyse-littéraire 1', label: 'Analyse littéraire 1' },
      { value: 'Littérature-marocaine', label: 'Littérature marocaine' },
      { value: 'Rhétorique-des images', label: 'Rhétorique des images' },
    ],
    '6': [
      {
        value: 'Théories du texte littéraire',
        label: 'Théories du texte littéraire',
      },
      { value: 'Etude des médias', label: 'Etude des médias' },
      { value: 'Les écritures de soi', label: 'Les écritures de soi' },
      {
        value: 'Analyse des textes littéraires 2',
        label: 'Analyse des textes littéraires 2',
      },
      { value: "Téchniques d'élaboration", label: "Téchniques d'élaboration" },
    ],
  },
  linguistics: {
    '1': [
      {
        value: 'Initiation-aux-genres-dramatiques',
        label: 'Initiation aux genres dramatiques',
      },
      { value: 'Grammaire', label: 'Grammaire' },
      { value: 'Les grands-mythes', label: 'Les grands mythes' },
      { value: 'Histoire-des-idées', label: 'Histoire des idées' },
      { value: 'Phonétique', label: 'Phonétique' },
      {
        value: 'Typologie des textes narratifs',
        label: 'Typologie des textes narratifs',
      },
    ],
    '2': [
      { value: 'Poésie-et-Versification', label: 'Poésie et Versification' },
      { value: 'Morphosyntaxe', label: 'Morphosyntaxe' },
      { value: 'Lexicographie', label: 'Lexicographie' },
      { value: 'Histoire-des-idées', label: 'Histoire des idées' },
      { value: 'Catégories-du-récit', label: 'Catégories du récit' },
      {
        value: "Introduction-à-l'interculturel",
        label: "Introduction à l'interculturel",
      },
    ],
    '3': [
      { value: 'Théâtre-classique', label: 'Théâtre classique' },
      { value: 'Morphosyntaxe', label: 'Morphosyntaxe' },
      { value: 'Analyse-du-roman', label: 'Analyse du roman' },
      { value: 'Histoire-des-idées', label: 'Histoire des idées' },
      { value: 'Lexicologie', label: 'Lexicologie' },
      { value: 'Traduction', label: 'Traduction' },
    ],
    '4': [
      {
        value: 'initiation-à-la-linguistique',
        label: 'initiation à la linguistique',
      },
      { value: 'Morphosyntaxe', label: 'Morphosyntaxe' },
      {
        value: 'initiation-à-la-recherche',
        label: 'initiation à la recherche',
      },
      { value: 'Histoire-des-idées', label: 'Histoire des idées' },
      { value: 'Poésie', label: 'Poésie' },
      { value: 'Théâtre-classique', label: 'Théâtre classique' },
    ],
    '5': [
      { value: 'Phonologie', label: 'Phonologie' },
      { value: 'Sémantique', label: 'Sémantique' },
      { value: 'Semiologie-générale', label: 'Semiologie générale' },
      { value: 'Sociolinguistique', label: 'Sociolinguistique' },
      { value: 'Grammaire-textuelle', label: 'Grammaire textuelle' },
      { value: 'Linguistique-générale', label: 'Linguistique générale' },
    ],
    '6': [
      { value: 'Analyse-du-discours', label: 'Analyse du discours' },
      { value: 'La-pragmatique', label: 'La pragmatique' },
      { value: 'La-Sémiotique-narrative', label: 'La Sémiotique narrative' },
      { value: 'Théories-linguistiques', label: 'Théories linguistiques' },
      { value: "Techniques-d'élaborations", label: "Techniques d'élaboration" },
      {
        value: 'methodologie-recherche',
        label: 'Méthodologie de la Recherche',
      },
    ],
  },
  'commentaire-compose': {
    '1': [
      {
        value: 'introduction-commentaire',
        label: 'Introduction au Commentaire',
      },
      {
        value: 'methodologie-commentaire',
        label: 'Méthodologie du Commentaire',
      },
      { value: 'analyse-texte', label: 'Analyse de Texte' },
      { value: 'commentaire-poesie', label: 'Commentaire de Poésie' },
      { value: 'commentaire-prose', label: 'Commentaire de Prose' },
      { value: 'commentaire-theatre', label: 'Commentaire de Théâtre' },
    ],
    // Add more semesters as needed
  },
  dissertation: {
    '1': [
      {
        value: 'introduction-dissertation',
        label: 'Introduction à la Dissertation',
      },
      {
        value: 'methodologie-dissertation',
        label: 'Méthodologie de la Dissertation',
      },
      { value: 'problematisation', label: 'Problématisation' },
      { value: 'argumentation', label: 'Argumentation' },
      { value: 'dissertation-litteraire', label: 'Dissertation Littéraire' },
      {
        value: 'dissertation-philosophique',
        label: 'Dissertation Philosophique',
      },
    ],
    // Add more semesters as needed
  },
  exams: {
    '1': [
      {
        value: 'initiation-aux-genres-dramatiques',
        label: 'Initiation aux genres dramatiques',
      },
      { value: 'grammaire', label: 'Grammaire' },
      { value: 'phonétique', label: 'Phonétique' },
      { value: 'les-grands-mythes', label: 'Les grands mythes' },
      {
        value: 'Typologie-des-textes-narratifs',
        label: 'typologie des textes narratifs',
      },
      { value: 'histoire-des-idées', label: 'Histoire des idées' },
    ],
    '2': [
      { value: 'categories-recit', label: 'Catégories du récit' },
      { value: 'histoire-des-idées', label: 'Histoire des idées' },
      { value: 'lexicographie', label: 'Lexicographie' },
      { value: 'poésie-et-versification', label: 'Poésie et versification' },
      { value: 'Morphosyntaxe', label: 'morphosyntaxe' },
      {
        value: 'introduction-à-linterculturelle',
        label: 'Introduction à linterculturelle',
      },
    ],
    '3': [
      { value: 'théâtre-classique', label: 'Théâtre classique' },
      { value: 'morphosyntaxe', label: 'Morphosyntaxe' },
      { value: 'analyse-du-roman', label: 'Analyse du roman' },
      { value: 'histoire-des-idées', label: 'Histoire des idées' },
      { value: 'lexicographie', label: 'Lexicographie' },
      { value: 'traduction', label: 'Traduction' },
    ],
    '4': [
      {
        value: 'Initiation-à-la-linguistique',
        label: 'initiation à la linguistique',
      },
      { value: 'morphosyntaxe', label: 'Morphosyntaxe' },
      {
        value: 'initiation-à-la-recherche',
        label: 'Initiation à la recherche',
      },
      { value: 'histoire-des-idées', label: 'Histoire des idées' },
      { value: 'poésie', label: 'Poésie' },
      { value: 'théâtre-classique', label: 'Théâtre classique' },
    ],
    '5': [
      {
        value: 'théories-du-text-littéraire',
        label: 'Théories-du-text-littéraire',
      },
      { value: 'etudes-postcoloniales', label: 'Etudes postcoloniales' },
      { value: 'Littérature-comparée', label: 'Littérature comparée' },
      { value: 'Littérature-marocaine', label: 'Littérature marocaine' },
      { value: 'Analyse-littéraire-1', label: 'Analyse littéraire 1' },
      { value: 'rhétorique-des-images', label: 'Rhétorique des images' },
      { value: 'Phonologie', label: 'Phonologie' },
      { value: 'Sémantique', label: 'Sémantique' },
      { value: 'Semiologie-générale', label: 'Semiologie générale' },
      { value: 'Sociolinguistique', label: 'Sociolinguistique' },
      { value: 'Grammaire-textuelle', label: 'Grammaire textuelle' },
      { value: 'Linguistique-générale', label: 'Linguistique générale' },
    ],
    '6': [
      {
        value: 'Théories-du-texte-littéraire',
        label: 'Théories du texte littéraire',
      },
      { value: 'analyse-du-roman', label: 'Analyse du roman' },
      { value: 'les écritures-de-soi', label: 'Les écritures de soi' },
      { value: 'analyse-littéraire-1', label: 'Analyse-littéraire-1' },
      { value: 'théchniques-délaboration', label: 'Théchniques d élaboration' },
      { value: 'Analyse-du-discours', label: 'Analyse du discours' },
      { value: 'La-pragmatique', label: 'La pragmatique' },
      { value: 'La-Sémiotique-narrative', label: 'La Sémiotique narrative' },
      { value: 'Théories-linguistiques', label: 'Théories linguistiques' },
      { value: "Techniques-d'élaborations", label: "Techniques d'élaboration" },
      {
        value: 'methodologie-recherche',
        label: 'Méthodologie de la Recherche',
      },
    ],
  },
  // Add other filières as needed
};

// Default modules for filières that don't have specific modules defined
const defaultModules = [
  { value: 'module-1', label: 'Module 1' },
  { value: 'module-2', label: 'Module 2' },
  { value: 'module-3', label: 'Module 3' },
  { value: 'module-4', label: 'Module 4' },
  { value: 'module-5', label: 'Module 5' },
  { value: 'module-6', label: 'Module 6' },
];

export default function UploadCoursePage() {
  const router = useRouter();
  const { notification, showNotification, hideNotification } =
    useNotification();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    filiere: '',
    semester: '',
    module: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [isExistingModule, setIsExistingModule] = useState<boolean | null>(
    null
  );

  // Get available modules based on selected filière and semester
  const getAvailableModules = () => {
    if (!formData.filiere || !formData.semester) return [];

    const filiereSemesterModules =
      modulesByFiliereAndSemester[
        formData.filiere as keyof typeof modulesByFiliereAndSemester
      ];

    if (!filiereSemesterModules) return defaultModules;

    const semesterModules =
      filiereSemesterModules[
        formData.semester as keyof typeof filiereSemesterModules
      ];

    return semesterModules || defaultModules;
  };

  // Check if module exists when module is selected
  const checkModuleExists = async () => {
    if (!formData.filiere || !formData.semester || !formData.module) {
      setIsExistingModule(null);
      return;
    }

    try {
      const response = await fetch(
        `/api/courses?filiere=${formData.filiere}&semester=${formData.semester}&module=${formData.module}`
      );

      if (!response.ok) {
        throw new Error('Failed to check module');
      }

      const data = await response.json();
      setIsExistingModule(data.courses && data.courses.length > 0);
    } catch (error) {
      console.error('Error checking module:', error);
      setIsExistingModule(null);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Reset module when filière or semester changes
    if (name === 'filiere' || name === 'semester') {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        module: name === 'filiere' ? '' : prev.module,
      }));
      setIsExistingModule(null);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));

      // If module is selected, check if it exists
      if (name === 'module' && value) {
        await checkModuleExists();
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorDetails(null);
    setApiResponse(null);

    // Validate form
    if (
      !formData.filiere ||
      !formData.semester ||
      !formData.module ||
      !selectedFile
    ) {
      showNotification(
        'error',
        'Veuillez remplir tous les champs obligatoires et sélectionner un fichier'
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const data = new FormData();
      data.append('filiere', formData.filiere);
      data.append('semester', formData.semester);
      data.append('module', formData.module);
      data.append('file', selectedFile);

      console.log('Submitting course data:', {
        filiere: formData.filiere,
        semester: formData.semester,
        module: formData.module,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
      });

      const response = await fetch('/api/courses', {
        method: 'POST',
        body: data,
      });

      const responseData = await response.json();
      setApiResponse(responseData);

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to upload course');
      }

      const successMessage = isExistingModule
        ? 'Fichier ajouté au module existant avec succès'
        : 'Nouveau module créé avec succès';

      showNotification('success', successMessage);

      // Reset form
      setFormData({
        filiere: '',
        semester: '',
        module: '',
      });
      setSelectedFile(null);
      setIsExistingModule(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/d-frs654');
      }, 1500);
    } catch (error) {
      console.error('Error uploading course:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Échec du téléchargement du cours. Veuillez réessayer.';
      showNotification('error', errorMessage);
      setErrorDetails(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='space-y-6'>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={hideNotification}
        />
      )}

      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Télécharger un Cours</h1>
      </div>

      <div className='bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-md'>
        <div className='flex items-start'>
          <Info className='h-5 w-5 mr-2 mt-0.5 flex-shrink-0' />
          <div>
            <h3 className='font-bold'>Information</h3>
            <p className='mt-1'>
              Vous pouvez télécharger plusieurs fichiers PDF pour un même
              module. Si le module existe déjà, le fichier sera ajouté à ce
              module. Sinon, un nouveau module sera créé.
            </p>
          </div>
        </div>
      </div>

      {errorDetails && (
        <div className='bg-red-50 border border-red-200 text-red-800 p-4 rounded-md'>
          <div className='flex items-start'>
            <AlertTriangle className='h-5 w-5 mr-2 mt-0.5 flex-shrink-0' />
            <div>
              <h3 className='font-bold'>Détails de l'erreur:</h3>
              <p className='mt-1'>{errorDetails}</p>

              {apiResponse && (
                <div className='mt-3'>
                  <h4 className='font-semibold'>Réponse API:</h4>
                  <pre className='mt-1 bg-red-100 p-2 rounded text-xs overflow-auto max-h-40'>
                    {JSON.stringify(apiResponse, null, 2)}
                  </pre>
                </div>
              )}

              <div className='mt-3'>
                <h4 className='font-semibold'>Dépannage:</h4>
                <ul className='list-disc list-inside mt-1 text-sm'>
                  <li>Vérifiez que le fichier est au format PDF</li>
                  <li>
                    Vérifiez que le fichier n'est pas trop volumineux (max 2MB)
                  </li>
                  <li>
                    Essayez de rafraîchir la page et de soumettre à nouveau
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <div className='grid gap-6 md:grid-cols-3'>
            <div className='space-y-2'>
              <label
                htmlFor='filiere'
                className='block text-sm font-medium text-gray-700'
              >
                Filière <span className='text-red-500'>*</span>
              </label>
              <select
                id='filiere'
                name='filiere'
                value={formData.filiere}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border rounded-md'
                required
              >
                <option value=''>Sélectionner une filière</option>
                {filieres.map((filiere) => (
                  <option key={filiere.value} value={filiere.value}>
                    {filiere.label}
                  </option>
                ))}
              </select>
            </div>

            <div className='space-y-2'>
              <label
                htmlFor='semester'
                className='block text-sm font-medium text-gray-700'
              >
                Semestre <span className='text-red-500'>*</span>
              </label>
              <select
                id='semester'
                name='semester'
                value={formData.semester}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border rounded-md'
                required
                disabled={!formData.filiere}
              >
                <option value=''>Sélectionner un semestre</option>
                {semesters.map((semester) => (
                  <option key={semester.value} value={semester.value}>
                    {semester.label}
                  </option>
                ))}
              </select>
            </div>

            <div className='space-y-2'>
              <label
                htmlFor='module'
                className='block text-sm font-medium text-gray-700'
              >
                Module <span className='text-red-500'>*</span>
              </label>
              <select
                id='module'
                name='module'
                value={formData.module}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border rounded-md'
                required
                disabled={!formData.filiere || !formData.semester}
              >
                <option value=''>Sélectionner un module</option>
                {getAvailableModules().map((module) => (
                  <option key={module.value} value={module.value}>
                    {module.label}
                  </option>
                ))}
              </select>
              {isExistingModule !== null && (
                <p
                  className={`text-xs mt-1 ${
                    isExistingModule ? 'text-amber-600' : 'text-green-600'
                  }`}
                >
                  {isExistingModule
                    ? 'Ce module existe déjà. Le fichier sera ajouté au module existant.'
                    : "Ce module n'existe pas encore. Un nouveau module sera créé."}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Fichier PDF</h3>
            <div className='border-2 border-dashed border-gray-300 rounded-md p-6 text-center'>
              <input
                type='file'
                id='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                accept='.pdf'
                className='hidden'
              />

              {selectedFile ? (
                <div className='flex items-center justify-between bg-gray-50 p-3 rounded-md'>
                  <div className='flex items-center'>
                    <div className='bg-[#0e2d6d] text-white p-2 rounded-md mr-3'>
                      <Upload className='h-5 w-5' />
                    </div>
                    <div className='text-left'>
                      <p className='font-medium'>{selectedFile.name}</p>
                      <p className='text-sm text-gray-500'>
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type='button'
                    onClick={clearSelectedFile}
                    className='text-gray-500 hover:text-red-600'
                  >
                    <X className='h-5 w-5' />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                  <p className='text-gray-600 mb-2'>
                    Cliquez pour sélectionner un fichier PDF
                  </p>
                  <p className='text-sm text-gray-500'>PDF jusqu'à 2MB</p>
                  <button
                    type='button'
                    onClick={() => fileInputRef.current?.click()}
                    className='mt-4 px-4 py-2 bg-[#0e2d6d] text-white rounded-md hover:bg-blue-700'
                  >
                    Sélectionner un fichier
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='flex justify-end gap-2'>
          <button
            type='button'
            onClick={() => router.push('/d-frs654')}
            className='px-4 py-2 border rounded-md hover:bg-gray-50'
          >
            Annuler
          </button>
          <button
            type='submit'
            disabled={isSubmitting}
            className='px-4 py-2 bg-[#0e2d6d] text-white rounded-md hover:bg-blue-700 flex items-center gap-2'
          >
            {isSubmitting && <Loader2 className='h-4 w-4 animate-spin' />}
            {isSubmitting ? 'Téléchargement...' : 'Télécharger le cours'}
          </button>
        </div>
      </form>
    </div>
  );
}
