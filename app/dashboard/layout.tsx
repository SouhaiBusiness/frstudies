import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { NotificationProvider } from "@/components/notification"

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const { userId } = auth()

  if (!userId) {
    redirect("/signin")
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

