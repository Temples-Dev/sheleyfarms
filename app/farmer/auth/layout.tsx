import type React from "react"
import { FarmerAuthProvider } from "@/lib/farmer-auth-context"

export default function FarmerAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FarmerAuthProvider>
      <div className="min-h-screen">{children}</div>
    </FarmerAuthProvider>
  )
}
