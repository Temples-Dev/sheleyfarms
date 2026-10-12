"use client"


import { useEffect } from "react"
import type { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { useAdminAuth } from "@/lib/admin-auth-context"

export default function AdminProtectedRoute({ children }: { children: ReactNode }) {
  const { admin, isLoading } = useAdminAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !admin) {
      navigate("/admin/auth/signin")
    }
  }, [admin, isLoading, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!admin) {
    return null
  }

  return <>{children}</>
}
