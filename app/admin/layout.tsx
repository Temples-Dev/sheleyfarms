import type React from "react"
import { AdminAuthProvider } from "@/lib/admin-auth-context"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen">{children}</div>
    </AdminAuthProvider>
  )
}
