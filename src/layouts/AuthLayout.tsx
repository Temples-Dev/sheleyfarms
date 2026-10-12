import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50"><Outlet /></div>
}
