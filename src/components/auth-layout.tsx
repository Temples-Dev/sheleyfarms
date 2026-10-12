import type React from "react"
import { Link } from "react-router-dom"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex items-center justify-center p-4 min-h-screen">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
              SheleyFarms
            </h1>
          </Link>
          <p className="text-gray-600 mt-2">{subtitle}</p>
        </div>

        {children}

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-800">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  )
}
