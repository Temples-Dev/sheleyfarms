"use client"

import { createContext, useContext, useState, useEffect } from "react"

import { apiFetch, clearStoredToken, storeToken } from "./api-client"

interface Farmer {
  id: string
  name: string
  email: string
  phone: string
  farmName: string
  location: string
  verified: boolean
}

interface FarmerAuthContextType {
  farmer: Farmer | null
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (data: {
    name: string
    email: string
    password: string
    phone: string
    farmName: string
    location: string
  }) => Promise<boolean>
  signOut: () => void
  isLoading: boolean
}

interface StoredSession {
  token: string
  farmer: Farmer
}

const STORAGE_KEY = "farmer"

function readSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const session = JSON.parse(raw) as Partial<StoredSession>
    if (!session.token || !session.farmer) return null
    return session as StoredSession
  } catch {
    return null
  }
}

const FarmerAuthContext = createContext<FarmerAuthContextType | undefined>(undefined)

export function FarmerAuthProvider({ children }: { children: React.ReactNode }) {
  const [farmer, setFarmer] = useState<Farmer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const session = readSession()
    if (session) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is client-only; the stored session must be read after mount
      setFarmer(session.farmer)
      storeToken(session.token)
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const response = await apiFetch<{
        token: string
        user: { id: number; name: string; email: string; role: string }
      }>("/auth/token/", { method: "POST", body: { email, password }, token: null })
      if (response.user.role !== "farmer") {
        return false
      }
      const nextFarmer: Farmer = {
        id: String(response.user.id),
        name: response.user.name,
        email: response.user.email,
        phone: "",
        farmName: "",
        location: "",
        verified: true,
      }
      setFarmer(nextFarmer)
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: response.token, farmer: nextFarmer }))
      storeToken(response.token)
      return true
    } catch {
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (data: {
    name: string
    email: string
    password: string
    phone: string
    farmName: string
    location: string
  }): Promise<boolean> => {
    setIsLoading(true)
    try {
      const [firstName, ...rest] = data.name.split(" ")
      const response = await apiFetch<{
        token: string
        user: { id: number; name: string; email: string }
      }>("/auth/register/", {
        method: "POST",
        body: { firstName, lastName: rest.join(" "), email: data.email, password: data.password },
        token: null,
      })
      // The API registers patrons; farmer approval happens separately.
      // Profile extras stay local until the account is promoted.
      const newFarmer: Farmer = {
        id: String(response.user.id),
        name: data.name,
        email: data.email,
        phone: data.phone,
        farmName: data.farmName,
        location: data.location,
        verified: false,
      }
      setFarmer(newFarmer)
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: response.token, farmer: newFarmer }))
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
    setFarmer(null)
    localStorage.removeItem("farmer")
    clearStoredToken()
  }

  return (
    <FarmerAuthContext.Provider value={{ farmer, signIn, signUp, signOut, isLoading }}>
      {children}
    </FarmerAuthContext.Provider>
  )
}

export function useFarmerAuth() {
  const context = useContext(FarmerAuthContext)
  if (context === undefined) {
    throw new Error("useFarmerAuth must be used within a FarmerAuthProvider")
  }
  return context
}
