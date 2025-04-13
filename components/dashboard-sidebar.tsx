"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Upload,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  BookOpen,
} from "lucide-react"

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen)
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/d-frs654",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Create Blog",
      href: "/d-frs654/blogs/new",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Upload Course",
      href: "/d-frs654/courses/upload",
      icon: <Upload className="h-5 w-5" />,
    },
   {
      name: "Manage Courses",
      href: "/d-frs654/ManageCoursesPage",
      icon: <BookOpen className="h-5 w-5" />,
    },
    //{
      //name: "Manage Users",
      //href: "/d-frs654/users",
      //icon: <Users className="h-5 w-5" />,
    //},
    //{
      //name: "Settings",
      //href: "/d-frs654/settings",
      //icon: <Settings className="h-5 w-5" />,
    //},  
  ]

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-40 md:hidden bg-white p-2 rounded-md shadow-md"
        onClick={toggleMobileSidebar}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={toggleMobileSidebar} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          bg-white border-r shadow-sm
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            {!collapsed && (
              <Link href="/d-frs654" className="text-xl font-bold text-[#0e2d6d]">
                Admin Panel
              </Link>
            )}
            <button
              onClick={toggleSidebar}
              className={`p-1 rounded-md hover:bg-gray-100 ${collapsed ? "mx-auto" : ""}`}
            >
              {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center px-4 py-3 rounded-md
                      ${pathname === item.href ? "bg-[#0e2d6d] text-white" : "text-gray-700 hover:bg-gray-100"}
                      ${collapsed ? "justify-center" : ""}
                    `}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!collapsed && <span className="ml-3">{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t">
            <Link
              href="/"
              className={`
                flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100
                ${collapsed ? "justify-center" : ""}
              `}
            >
              {!collapsed && <span>Back to Site</span>}
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
