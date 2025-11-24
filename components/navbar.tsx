"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, LogOut } from "lucide-react";
import AuthModal from "./AuthModal";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  // Listen for auth changes
  useEffect(() => {
    const handleAuthChange = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    };

    window.addEventListener("authChanged", handleAuthChange);
    return () => window.removeEventListener("authChanged", handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsMenuOpen(false);
    window.location.href = "/";
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
    setIsOpen(false);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthSuccess = () => {
    // Refresh user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 text-[#0e2d6d] font-bold mt-[10px]">
                <div className="relative w-40 h-10">
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
              <div
                className="relative"
                onMouseEnter={() => setIsCoursesOpen(true)}
                onMouseLeave={() => setIsCoursesOpen(false)}
              >
                <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-[#0e2d6d] flex items-center">
                  Cours
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {isCoursesOpen && (
                  <div
                    className="absolute z-10 left-0 mt-2 w-56 rounded-md shadow-lg bg-white grid grid-cols-2 gap-4 p-4"
                    onMouseEnter={() => setIsCoursesOpen(true)}
                    onMouseLeave={() => setIsCoursesOpen(false)}
                  >
                    <div className="flex flex-col gap-2 items-center w-full">
                      <h3 className="text-sm font-bold text-gray-900 mb-2">Filières</h3>
                      <Link
                        href="/linguistics"
                        className="flex items-center justify-center grow px-4 py-2 text-sm text-gray-700 hover:text-blue-600"
                      >
                        Linguistique
                      </Link>
                      <Link
                        href="/literature"
                        className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 hover:text-blue-600"
                      >
                        Littérature
                      </Link>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                      <h3 className="text-sm font-bold text-gray-900 mb-2">Rédaction</h3>
                      <Link
                        href="/commentaire-compose"
                        className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 hover:text-blue-600"
                      >
                        Commentaire Composé
                      </Link>
                      <Link
                        href="/dissertation"
                        className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 hover:text-blue-600"
                      >
                        Dissertation
                      </Link>
                      <Link
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

            {/* User Auth Section */}
            <div className="hidden md:flex items-center gap-3">
              {!isLoading && user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0e2d6d] text-white flex items-center justify-center text-sm font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">{user.name.split(" ")[0]}</span>
                  </button>

                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>

                      <Link
                        href="/d-frs654"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <div className="flex items-center gap-2">
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              ) : !isLoading ? (
                <button
                  onClick={openAuthModal}
                  className="px-4 py-2 bg-[#0e2d6d] text-white rounded-md hover:bg-blue-700 font-medium"
                >
                  Sign In
                </button>
              ) : null}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
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
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-[#0e2d6d]"
                onClick={() => setIsOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/quiz"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-[#0e2d6d]"
                onClick={() => setIsOpen(false)}
              >
                Quiz
              </Link>

              <Link
                href="/exams"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-[#0e2d6d]"
                onClick={() => setIsOpen(false)}
              >
                Examens
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-[#0e2d6d]"
                onClick={() => setIsOpen(false)}
              >
                À propos
              </Link>

              {/* Mobile Auth */}
              <div className="mt-4 px-3 w-full">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={openAuthModal}
                    className="w-full px-4 py-2 bg-[#0e2d6d] text-white rounded-md hover:bg-blue-700 font-medium"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}