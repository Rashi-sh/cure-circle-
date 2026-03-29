"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

// Redirect from old /dashboard to new /home
export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/home")
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  )
}
