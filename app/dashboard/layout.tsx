// app/(dashboard)/layout.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { NotificationProvider } from "@/components/notification"
import AuthPopup from "@/components/auth-popup"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthPopup, setShowAuthPopup] = useState(false)
  const { isLoaded, userId } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    if (!userId) {
      // Remove this line since you don't have a /signin page
      // router.push("/signin") 
      return
    }

    // Check custom authentication
    const authStatus = sessionStorage.getItem("isAuthenticated") === "true" || 
      process.env.NEXT_PUBLIC_BYPASS_AUTH === "true"
    
    if (!authStatus) {
      setShowAuthPopup(true)
    } else {
      setIsAuthenticated(true)
    }
  }, [isLoaded, userId, router])

  const handleAuthSuccess = () => {
    sessionStorage.setItem("isAuthenticated", "true")
    setIsAuthenticated(true)
    setShowAuthPopup(false)
  }

  if (!isLoaded || !userId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Checking authentication...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        {showAuthPopup && <AuthPopup onSuccess={handleAuthSuccess} />}
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <NotificationProvider>
      <div className="flex min-h-screen bg-gray-100">
        <DashboardSidebar />
        <div className="flex-1 p-8">{children}</div>
      </div>
    </NotificationProvider>
  )
}