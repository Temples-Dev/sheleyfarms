"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useFarmerAuth } from "@/lib/farmer-auth-context"

export default function FarmerProtectedRoute({ children }: { children: React.ReactNode }) {
  const { farmer, isLoading } = useFarmerAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !farmer) {
      router.push("/farmer/auth/signin")
    }
  }, [farmer, isLoading, router])

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
