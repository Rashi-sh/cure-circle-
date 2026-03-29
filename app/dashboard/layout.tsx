"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import type { ReactNode } from "react"

// Simple layout for redirect page
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="patient">
      {children}
    </ProtectedRoute>
  )
}
