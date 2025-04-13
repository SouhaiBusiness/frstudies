"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useClerk, useUser } from "@clerk/nextjs"
import { LogIn, LogOut, User, Settings } from "lucide-react"
import Link from "next/link"

export default function UserAuthButton() {
  const { user, isSignedIn } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Handle clicks outside the menu
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeMenu()
    }
  }

  return (
    <div className="relative">
      {isSignedIn ? (
        <>
          <button onClick={toggleMenu} className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl || "/placeholder.svg"}
                  alt={user.fullName || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-5 w-5 text-gray-500" />
              )}
            </div>
            <span className="hidden md:inline text-sm font-medium">{user?.fullName?.split(" ")[0] || "User"}</span>
          </button>

          {isMenuOpen && (
            <div className="fixed inset-0 z-10 bg-transparent" onClick={handleOutsideClick}>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium">{user?.fullName}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.emailAddresses[0].emailAddress}</p>
                </div>

                <Link
                  href="/d-frs654"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>

                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={closeMenu}
                >
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </div>
                </Link>

                <button
                  onClick={handleSignOut}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <div className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Link
          href="/sign-in"
          className="flex items-center gap-2 px-4 py-2 bg-[#0e2d6d] text-white rounded-md hover:bg-blue-700"
        >
          <LogIn className="h-4 w-4" />
          <span>Sign In</span>
        </Link>
      )}
    </div>
  )
}

