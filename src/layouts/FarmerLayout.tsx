import { Outlet } from "react-router-dom"
import { FarmerAuthProvider } from "@/lib/farmer-auth-context"

export default function FarmerLayout() {
  return (
    <FarmerAuthProvider>
      <div className="min-h-screen bg-white"><Outlet /></div>
    </FarmerAuthProvider>
  )
}
