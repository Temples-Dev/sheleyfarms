import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication - SheleyFarms",
  description: "Sign in or create your SheleyFarms investment account",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">{children}</div>
}
