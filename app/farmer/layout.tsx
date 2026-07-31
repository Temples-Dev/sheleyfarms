import type React from "react"
import { FarmerAuthProvider } from "@/lib/farmer-auth-context"

export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FarmerAuthProvider>
      <div className="min-h-screen bg-white">{children}</div>
    </FarmerAuthProvider>
  )
}
