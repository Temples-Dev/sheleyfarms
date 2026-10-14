"use client"

import { createContext, useContext, useState, useEffect } from "react"

import { apiFetch, clearStoredToken, storeToken } from "./api-client"

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

interface StoredSession {
  token: string
  admin: Admin
}

const STORAGE_KEY = "admin"

function readSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const session = JSON.parse(raw) as Partial<StoredSession>
    if (!session.token || !session.admin) return null
    return session as StoredSession
  } catch {
    return null
  }
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const session = readSession()
    if (session) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is client-only; the stored session must be read after mount
      setAdmin(session.admin)
      storeToken(session.token)
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const response = await apiFetch<{
        token: string
        user: { id: number; name: string; email: string; is_staff: boolean }
      }>("/auth/token/", { method: "POST", body: { email, password }, token: null })
      if (!response.user.is_staff) {
        return false
      }
      const nextAdmin: Admin = {
        id: String(response.user.id),
        name: response.user.name,
        email: response.user.email,
        role: "admin",
        permissions: [],
      }
      setAdmin(nextAdmin)
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: response.token, admin: nextAdmin }))
      storeToken(response.token)
      return true
    } catch {
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = () => {
    apiFetch("/auth/logout/", { method: "POST" }).catch(() => {
      // Best effort: local session clears regardless.
    })
    setAdmin(null)
    localStorage.removeItem("admin")
    clearStoredToken()
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
