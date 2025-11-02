// app/(dashboard)/layout.tsx
"use client"

import { useEffect, useState } from "react"
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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check custom authentication (your secure popup)
    const authStatus = sessionStorage.getItem("isAuthenticated") === "true" || 
      process.env.NEXT_PUBLIC_BYPASS_AUTH === "true"
    
    if (!authStatus) {
      setShowAuthPopup(true)
      setIsLoading(false)
    } else {
      setIsAuthenticated(true)
      setIsLoading(false)
    }
  }, [])

  const handleAuthSuccess = () => {
    sessionStorage.setItem("isAuthenticated", "true")
    setIsAuthenticated(true)
    setShowAuthPopup(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        {showAuthPopup && <AuthPopup onSuccess={handleAuthSuccess} />}
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