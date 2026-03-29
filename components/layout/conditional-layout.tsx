"use client"

import { useAuth } from "@/lib/auth-context"
import { PatientLayout } from "@/components/patient"
import { Navbar, Footer } from "@/components/layout"
import type { ReactNode } from "react"

interface ConditionalLayoutProps {
  children: ReactNode
  showFooter?: boolean
}

/**
 * A layout wrapper that conditionally renders either PatientLayout (for logged-in patients)
 * or the public Navbar/Footer (for guests and doctors viewing public pages).
 */
export function ConditionalLayout({ children, showFooter = true }: ConditionalLayoutProps) {
  const { isPatient, isLoading } = useAuth()

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  // If user is a logged-in patient, use PatientLayout
  if (isPatient) {
    return <PatientLayout>{children}</PatientLayout>
  }

  // Otherwise, use public layout with Navbar and optional Footer
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}
