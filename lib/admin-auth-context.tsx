"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Admin {
  id: string
  name: string
  email: string
  role: "admin" | "super_admin"
  permissions: string[]
}

interface AdminAuthContextType {
  admin: Admin | null
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
  isLoading: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing admin session
    const storedAdmin = localStorage.getItem("admin")
    if (storedAdmin) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is client-only; the stored session must be read after mount
      setAdmin(JSON.parse(storedAdmin))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock admin data
    const mockAdmin: Admin = {
      id: "1",
      name: "Admin User",
      email,
      role: "admin",
      permissions: ["review_farms", "approve_farms", "reject_farms", "manage_users"],
    }

    setAdmin(mockAdmin)
    localStorage.setItem("admin", JSON.stringify(mockAdmin))
    setIsLoading(false)
    return true
  }

  const signOut = () => {
    setAdmin(null)
    localStorage.removeItem("admin")
  }

  return <AdminAuthContext.Provider value={{ admin, signIn, signOut, isLoading }}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}
