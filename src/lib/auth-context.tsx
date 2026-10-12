"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (userData: { firstName: string; lastName: string; email: string; password: string }) => Promise<boolean>
  signOut: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing auth on mount
    const savedUser = localStorage.getItem("shelley-farms-user")
    if (savedUser) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is client-only; the stored session must be read after mount
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem("shelley-farms-user")
      }
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in real app, this would call your auth API
    if (email && password) {
      const mockUser: User = {
        id: "1",
        name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
        email: email,
        avatar: "/placeholder.svg?height=32&width=32",
      }

      setUser(mockUser)
      localStorage.setItem("shelley-farms-user", JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const signUp = async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user creation
    const mockUser: User = {
      id: "1",
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      avatar: "/placeholder.svg?height=32&width=32",
    }

    setUser(mockUser)
    localStorage.setItem("shelley-farms-user", JSON.stringify(mockUser))
    setIsLoading(false)
    return true
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("shelley-farms-user")
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
