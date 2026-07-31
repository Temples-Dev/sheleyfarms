import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard - SheleyFarms",
  description: "Manage your agricultural investments with SheleyFarms",
}

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen">{children}</div>
}
