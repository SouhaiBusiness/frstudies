import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { NotificationProvider } from "@/components/notification"


export const metadata = {
  title: "ETUDESFRANÇAISES - Ressources pour les étudiants de français",
  description: "Une plateforme destinée aux étudiants en études de français pour accéder aux cours, quiz et examens.",
  icons: {
    icon: "/favicon.png", // or favicon.png if you want to use PNG
    shortcut: "/favicon.png",
  },
}


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

