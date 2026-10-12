import { Outlet } from "react-router-dom"
import { FarmerAuthProvider } from "@/lib/farmer-auth-context"

export default function FarmerAuthLayout() {
  return (
    <FarmerAuthProvider>
      <div className="min-h-screen"><Outlet /></div>
    </FarmerAuthProvider>
  )
}
