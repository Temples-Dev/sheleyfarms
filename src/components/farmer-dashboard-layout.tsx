"use client"

import type React from "react"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useFarmerAuth } from "@/lib/farmer-auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Leaf,
  LayoutDashboard,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Plus,
  Bell,
} from "lucide-react"

interface FarmerDashboardLayoutProps {
  children: React.ReactNode
}

export default function FarmerDashboardLayout({ children }: FarmerDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const { farmer, signOut } = useFarmerAuth()

  const navigation = [
    { name: "Overview", href: "/farmer/dashboard", icon: LayoutDashboard },
    { name: "My Submissions", href: "/farmer/dashboard/submissions", icon: FileText },
    { name: "Investor Inquiries", href: "/farmer/dashboard/inquiries", icon: MessageSquare },
    { name: "Analytics", href: "/farmer/dashboard/analytics", icon: BarChart3 },
    { name: "Profile", href: "/farmer/dashboard/profile", icon: User },
    { name: "Settings", href: "/farmer/dashboard/settings", icon: Settings },
  ]

  const handleSignOut = () => {
    signOut()
    navigate("/farmer/auth/signin")
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-lg">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">SheleyFarms</h1>
              <p className="text-xs text-gray-500">Farmer Portal</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-orange-100 text-orange-700 border-l-4 border-orange-500"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <Link to="/farmer/submit">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Submit New Farm
            </Button>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center min-w-0">
              <Button variant="ghost" size="sm" className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <h2 className="text-xl font-semibold text-gray-900 truncate">
                {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
              </h2>
            </div>

            <div className="flex items-center space-x-4 flex-shrink-0">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-3 hover:bg-gray-100">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-orange-500 text-white text-sm">
                        {farmer?.name?.charAt(0) || "F"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{farmer?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{farmer?.farmName}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900 truncate">{farmer?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{farmer?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/farmer/dashboard/profile" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/farmer/dashboard/settings" className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto min-w-0">{children}</main>
      </div>
    </div>
  )
}
