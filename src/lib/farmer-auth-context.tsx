"use client"

import { createContext, useContext, useState, useEffect } from "react"

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

const FarmerAuthContext = createContext<FarmerAuthContextType | undefined>(undefined)

export function FarmerAuthProvider({ children }: { children: React.ReactNode }) {
  const [farmer, setFarmer] = useState<Farmer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing farmer session
    const storedFarmer = localStorage.getItem("farmer")
    if (storedFarmer) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is client-only; the stored session must be read after mount
      setFarmer(JSON.parse(storedFarmer))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock farmer data
    const mockFarmer: Farmer = {
      id: "1",
      name: "John Farmer",
      email,
      phone: "+1 (555) 123-4567",
      farmName: "Green Valley Farm",
      location: "California, USA",
      verified: true,
    }

    setFarmer(mockFarmer)
    localStorage.setItem("farmer", JSON.stringify(mockFarmer))
    setIsLoading(false)
    return true
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newFarmer: Farmer = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      farmName: data.farmName,
      location: data.location,
      verified: false,
    }

    setFarmer(newFarmer)
    localStorage.setItem("farmer", JSON.stringify(newFarmer))
    setIsLoading(false)
    return true
  }

  const signOut = () => {
    setFarmer(null)
    localStorage.removeItem("farmer")
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
