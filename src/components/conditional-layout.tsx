"use client"

import type React from "react"

import { useLocation } from "react-router-dom"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = useLocation().pathname

  const hideHeaderFooter =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/farmer") ||
    pathname.startsWith("/admin")

  if (hideHeaderFooter) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
