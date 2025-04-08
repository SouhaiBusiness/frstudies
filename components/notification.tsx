"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { X } from "lucide-react"

type NotificationType = "success" | "error" | "info" | "warning"

interface NotificationContextType {
  notification: { type: NotificationType; message: string } | null
  showNotification: (type: NotificationType, message: string) => void
  hideNotification: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<{ type: NotificationType; message: string } | null>(null)

  const showNotification = (type: NotificationType, message: string) => {
    setNotification({ type, message })

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const hideNotification = () => {
    setNotification(null)
  }

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}

export function Notification({
  type,
  message,
  onClose,
}: {
  type: NotificationType
  message: string
  onClose: () => void
}) {
  const bgColors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  }

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md border rounded-md shadow-sm ${bgColors[type]}`}>
      <div className="flex items-start justify-between p-4">
        <div className="flex-1">{message}</div>
        <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
