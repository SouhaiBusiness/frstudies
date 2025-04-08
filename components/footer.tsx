import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg text-blue-500 font-semibold mb-4">ETUDESFRANÇAISES</h3>
            <p className="text-gray-300">
            Une plateforme pour les étudiants des études françaises leur permettant d'accéder à des cours, des quiz, des examens et plein d'autres contenus exclusifs.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                Accueil
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="text-gray-300 hover:text-white">
                  Quiz
                </Link>
              </li>
              <li>
                <Link href="/linguistics" className="text-gray-300 hover:text-white">
                  Linguistique
                </Link>
              </li>
              <li>
                <Link href="/literature" className="text-gray-300 hover:text-white">
                  Littérature
                </Link>
              </li>
              <li>
                <Link href="/exams" className="text-gray-300 hover:text-white">
                  Examens
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300">Si vous avez des questions ou des retours, n'hésitez pas à nous contacter.</p>
            <Link
              href="/contact"
              target='_blank'
                rel='noopener noreferrer'
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; {currentYear} ETUDESFRANÇAISES. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

