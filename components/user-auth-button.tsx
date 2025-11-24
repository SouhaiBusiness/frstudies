"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogIn, LogOut, User } from "lucide-react";
import Link from "next/link";

interface UserData {
  id: string;
  name: string;
  email: string;
}

export default function UserAuthButton() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsMenuOpen(false);
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (isLoading) {
    return <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />;
  }

  return (
    <div className="relative">
      {user ? (
        <>
          <button
            onClick={toggleMenu}
            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            <div className="w-8 h-8 rounded-full bg-[#0e2d6d] text-white flex items-center justify-center text-sm font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:inline text-sm font-medium">
              {user.name.split(" ")[0]}
            </span>
          </button>

          {isMenuOpen && (
            <div
              className="fixed inset-0 z-10 bg-transparent"
              onClick={() => closeMenu()}
            />
          )}

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border">
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>

              <Link
                href="/d-frs654"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={closeMenu}
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
        </>
      ) : (
        <button
          onClick={() => {
            // Open auth modal (you need to implement this in your navbar)
            const event = new CustomEvent("openAuthModal");
            window.dispatchEvent(event);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#0e2d6d] text-white rounded-md hover:bg-blue-700 font-medium"
        >
          <LogIn className="h-4 w-4" />
          <span>Sign In</span>
        </button>
      )}
    </div>
  );
}