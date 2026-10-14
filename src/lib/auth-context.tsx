"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"

import { apiFetch, clearStoredToken, storeToken } from "./api-client"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (userData: { firstName: string; lastName: string; email: string; password: string }) => Promise<boolean>
  signOut: () => void
  isAuthenticated: boolean
}

interface StoredSession {
  token: string
  user: User
}

interface AuthResponse {
  token: string
  user: { id: number; name: string; email: string }
}

const STORAGE_KEY = "shelley-farms-user"

function toUser(response: AuthResponse["user"]): User {
  return { id: String(response.id), name: response.name, email: response.email }
}

function readSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const session = JSON.parse(raw) as Partial<StoredSession>
    if (!session.token || !session.user) return null
    return session as StoredSession
  } catch {
    return null
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const session = readSession()
    if (session) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is client-only; the stored session must be read after mount
      setUser(session.user)
      storeToken(session.token)
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const response = await apiFetch<AuthResponse>("/auth/token/", {
        method: "POST",
        body: { email, password },
        token: null,
      })
      const nextUser = toUser(response.user)
      setUser(nextUser)
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: response.token, user: nextUser }))
      storeToken(response.token)
      return true
    } catch {
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }): Promise<boolean> => {
    setIsLoading(true)
    try {
      const response = await apiFetch<AuthResponse>("/auth/register/", {
        method: "POST",
        body: userData,
        token: null,
      })
      const nextUser = toUser(response.user)
      setUser(nextUser)
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: response.token, user: nextUser }))
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
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
    clearStoredToken()
  }

  const value: AuthContextType = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
