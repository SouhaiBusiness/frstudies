"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import UserAuthButton from "./user-auth-button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCoursesOpen, setIsCoursesOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center ">
            <Link href="/" className=" flex-shrink-0 text-[#0e2d6d] font-bold mt-[10px]   ">
              <div className="relative w-40 h-10 ">
                <h2 className="hover:tracking-wider">ETUDESFRANÇAISES</h2>
              </div>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-white hover:bg-[#0e2d6d]"
            >
              Accueil
            </Link>
            <Link
              href="/quiz"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-[#0e2d6d]"
            >
              Quiz
            </Link>

            {/* Courses dropdown */}
            <div className="relative">
              <button
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-[#0e2d6d] flex items-center"
                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
              >
                Cours
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {isCoursesOpen && (
                <div className="absolute z-10 left-0 mt-2 w-56 rounded-md inset-shadow-sm inset-shadow-gray-500/50 bg-white grid grid-cols-2 gap-4 p-4">
                  <div className="flex flex-col gap-2 items-center w-full">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">Filières</h3>
                    <Link
                      onClick={() => setIsCoursesOpen(false)}
                      href="/linguistics"
                      className="flex items-center justify-center grow px-4 py-2 text-sm text-gray-700 hover:text-blue-600"
                    >
                      Linguistique
                    </Link>
                    <Link
                      onClick={() => setIsCoursesOpen(false)}
                      href="/literature"
                      className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 hover:text-blue-600"
                    >
                      Littérature
                    </Link>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">Rédaction</h3>
                    <Link
                      onClick={() => setIsCoursesOpen(false)}
                      href="/commentaire-compose"
                      className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 hover:text-blue-600"
                    >
                      Commentaire Composé
                    </Link>
                    <Link
                      onClick={() => setIsCoursesOpen(false)}
                      href="/dissertation"
                      className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 hover:text-blue-600"
                    >
                      Dissertation
                    </Link>
                    <Link
                      onClick={() => setIsCoursesOpen(false)}
                      href="/essai"
                      className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 hover:text-blue-600"
                    >
                      Essai
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/exams"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-[#0e2d6d]"
            >
              Examens
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-[#0e2d6d]"
            >
              À propos
            </Link>
          </div>

          {/* User Auth Button */}
          <div className="hidden md:block">
            <UserAuthButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col justify-center items-center px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              onClick={() => setIsOpen(false)}
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-[#0e2d6d]"
            >
              Accueil
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              href="/quiz"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-[#0e2d6d]"
            >
              Quiz
            </Link>

            {/* Mobile Courses dropdown */}
            <div>
              <button
                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                className="flex justify-center items-center w-full text-left px-3 py-2 cursor-pointer rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-[#0e2d6d]"
              >
                Cours
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isCoursesOpen ? "rotate-180" : ""}`} />
              </button>

              {isCoursesOpen && (
                <div className="pl-4 ml-40 space-y-1 border-l border-gray-300">
                  <div className="mt-2">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">Filières</h3>
                    <Link
                      onClick={() => setIsOpen(false)}
                      href="/linguistics"
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:text-blue-600"
                    >
                      Linguistique
                    </Link>
                    <Link
                      onClick={() => setIsOpen(false)}
                      href="/literature"
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600"
                    >
                      Littérature
                    </Link>
                  </div>
                  <div className="mt-2">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">Rédaction</h3>
                    <Link
                      onClick={() => setIsOpen(false)}
                      href="/commentaire-compose"
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600"
                    >
                      Commentaire Composé
                    </Link>
                    <Link
                      onClick={() => setIsOpen(false)}
                      href="/dissertation"
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600"
                    >
                      Dissertation
                    </Link>
                    <Link
                      onClick={() => setIsOpen(false)}
                      href="/essai"
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600"
                    >
                      Essai
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              onClick={() => setIsOpen(false)}
              href="/exams"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-[#0e2d6d]"
            >
              Examens
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-[#0e2d6d]"
            >
              À propos
            </Link>

            {/* Mobile Auth Button */}
            <div className="mt-4 px-3">
              <UserAuthButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

