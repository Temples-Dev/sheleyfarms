import { Outlet } from "react-router-dom"
import { AdminAuthProvider } from "@/lib/admin-auth-context"

export default function AdminLayout() {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen"><Outlet /></div>
    </AdminAuthProvider>
  )
}
