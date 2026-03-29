"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { PatientLayout } from "@/components/patient"
import type { ReactNode } from "react"

export default function MomProfileLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="patient">
      <PatientLayout>{children}</PatientLayout>
    </ProtectedRoute>
  )
}
