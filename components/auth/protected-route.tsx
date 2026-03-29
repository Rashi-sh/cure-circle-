"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import type { ReactNode } from "react"
import { LoadingState } from "@/components/states"
import { EmptyState } from "@/components/states"
import { AlertTriangle, Lock } from "lucide-react"

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: "patient" | "doctor"
  fallback?: "redirect" | "message"
  redirectTo?: string
}

export function ProtectedRoute({
  children,
  requiredRole,
  fallback = "redirect",
  redirectTo,
}: ProtectedRouteProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { isLoading, user, isPatient, isDoctor } = useAuth()

  useEffect(() => {
    if (isLoading) return

    if (!user && fallback === "redirect") {
      // Store the intended destination for redirect after login
      const returnUrl = encodeURIComponent(pathname)
      router.push(`/sign-in?returnUrl=${returnUrl}`)
      return
    }

    // Check role requirements
    if (requiredRole === "patient" && !isPatient && fallback === "redirect") {
      router.push(redirectTo || "/")
      return
    }

    if (requiredRole === "doctor" && !isDoctor && fallback === "redirect") {
      router.push(redirectTo || "/")
      return
    }
  }, [isLoading, user, isPatient, isDoctor, requiredRole, router, pathname, fallback, redirectTo])

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingState message="Checking authentication..." />
      </div>
    )
  }

  // Not authenticated
  if (!user) {
    if (fallback === "message") {
      return (
        <div className="flex min-h-[50vh] items-center justify-center p-4">
          <EmptyState
            icon={Lock}
            title="Authentication Required"
            description="Please sign in to access this content."
            action={{
              label: "Sign In",
              onClick: () => router.push(`/sign-in?returnUrl=${encodeURIComponent(pathname)}`),
            }}
          />
        </div>
      )
    }
    return null
  }

  // Wrong role - patient trying to access doctor route
  if (requiredRole === "doctor" && !isDoctor) {
    if (fallback === "message") {
      return (
        <div className="flex min-h-[50vh] items-center justify-center p-4">
          <EmptyState
            icon={AlertTriangle}
            title="Access Restricted"
            description="This area is only accessible to verified doctors."
            action={{
              label: "Go Home",
              onClick: () => router.push("/"),
            }}
          />
        </div>
      )
    }
    return null
  }

  // Wrong role - doctor trying to access patient route
  if (requiredRole === "patient" && !isPatient) {
    if (fallback === "message") {
      return (
        <div className="flex min-h-[50vh] items-center justify-center p-4">
          <EmptyState
            icon={AlertTriangle}
            title="Access Restricted"
            description="This area is only accessible to patients."
            action={{
              label: "Go to Dashboard",
              onClick: () => router.push("/doctor/dashboard"),
            }}
          />
        </div>
      )
    }
    return null
  }

  return <>{children}</>
}

// Hook for checking if user can access specific features
export function useAccessControl() {
  const { user, isDoctor, isPatient, doctorProfile } = useAuth()

  return {
    // Check if user can approve remedies (only verified doctors)
    canApproveRemedies: isDoctor && doctorProfile?.isVerified === true,
    
    // Check if user can book appointments (only patients)
    canBookAppointments: isPatient,
    
    // Check if user can access chat/video (must be authenticated and have active appointment)
    canAccessCommunication: !!user,
    
    // Check if user can view patient history (only doctors)
    canViewPatientHistory: isDoctor,
    
    // Check if user can upload remedies (any authenticated user)
    canUploadRemedies: !!user,
    
    // Check if doctor is verified
    isDoctorVerified: isDoctor && doctorProfile?.isVerified === true,
    
    // Get user role
    role: user?.role || null,
  }
}
