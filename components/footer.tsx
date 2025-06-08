import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-800 text-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-lg text-blue-500 font-semibold mb-4'>
              ETUDESFRANÇAISES
            </h3>
            <p className='text-gray-300'>
              Une plateforme pour les étudiants des études françaises leur
              permettant d'accéder à des cours, des quiz, des examens et plein
              d'autres contenus exclusifs.
            </p>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Liens rapides</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/' className='text-gray-300 hover:text-white'>
                  Accueil
                </Link>
              </li>
              <li>
                <Link href='/quiz' className='text-gray-300 hover:text-white'>
                  Quiz
                </Link>
              </li>
              <li>
                <Link
                  href='/linguistics'
                  className='text-gray-300 hover:text-white'
                >
                  Linguistique
                </Link>
              </li>
              <li>
                <Link
                  href='/literature'
                  className='text-gray-300 hover:text-white'
                >
                  Littérature
                </Link>
              </li>
              <li>
                <Link href='/exams' className='text-gray-300 hover:text-white'>
                  Examens
                </Link>
              </li>
              <li>
                <Link href='/about' className='text-gray-300 hover:text-white'>
                  À propos
                </Link>
              </li>
              <li>
                <Link href='/terms-of-use' className='text-gray-300 hover:text-white'>
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href='/privacy&policy' className='text-gray-300 hover:text-white'>
                  Politique et confidentialité
                </Link>
              </li>
            </ul>
          </div>

          <div className='flex flex-col gap-6'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Contact</h3>
              <p className='text-gray-300'>
                Si vous avez des questions ou des retours, n'hésitez pas à nous
                contacter.
              </p>
              <Link
                href='/contact'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
              >
                Contact
              </Link>
            </div>
            <p className='text-gray-300'>
                Vous allez nous retrouver aussi sur : 
              </p>
            <div className='flex flex-wrap opacity-80'>
              <Link
                href=''
                target='_blank'
                rel='noopener noreferrer'
                className='h-8 w-20 relative'
              >
                <Linkedin />
              </Link>
              <Link
                href=''
                target='_blank'
                rel='noopener noreferrer'
                className='h-8 w-20 relative'
              >
                <Twitter />
              </Link>
              <Link
                href=''
                target='_blank'
                rel='noopener noreferrer'
                className='h-8 w-20 relative'
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

        <div className='border-t border-gray-700 mt-8 pt-6 text-center text-gray-300'>
          <p>&copy; {currentYear} ETUDESFRANÇAISES. Tous les droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
