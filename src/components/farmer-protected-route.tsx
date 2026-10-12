"use client"


import { useEffect } from "react"
import type { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { useFarmerAuth } from "@/lib/farmer-auth-context"

export default function FarmerProtectedRoute({ children }: { children: ReactNode }) {
  const { farmer, isLoading } = useFarmerAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !farmer) {
      navigate("/farmer/auth/signin")
    }
  }, [farmer, isLoading, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!farmer) {
    return null
  }

  return <>{children}</>
}
