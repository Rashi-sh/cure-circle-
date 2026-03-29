"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, LayoutDashboard, Calendar, Users, ClipboardList, FileCheck, UserCircle, LogOut, Menu, X, Stethoscope, BadgeCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navItems = [
  {
    href: "/doctor/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/doctor/appointments",
    label: "Appointments",
    icon: Calendar,
  },
  {
    href: "/doctor/patients",
    label: "Patients",
    icon: Users,
  },
  {
    href: "/doctor/patient-history",
    label: "Patient History",
    icon: ClipboardList,
  },
  {
    href: "/doctor/remedy-reviews",
    label: "Remedy Reviews",
    icon: FileCheck,
  },
  {
    href: "/doctor/profile",
    label: "My Profile",
    icon: UserCircle,
  },
]

export function DoctorSidebar() {
  const pathname = usePathname()
  const { doctorProfile, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = () => {
    signOut()
    window.location.href = "/"
  }

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-primary">CureCircle</span>
        </Link>
      </div>

      {/* Doctor Info */}
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Stethoscope className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <p className="truncate text-sm font-semibold text-foreground">
                {doctorProfile?.name || "Doctor"}
              </p>
              {doctorProfile?.isVerified && (
                <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />
              )}
            </div>
            <p className="truncate text-xs text-muted-foreground">
              {doctorProfile?.specialization || "Specialist"}
            </p>
          </div>
        </div>
        {!doctorProfile?.isVerified && (
          <div className="mt-3 rounded-lg bg-warning/10 px-3 py-2">
            <p className="text-xs text-warning-foreground">
              Verification pending
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Sign Out */}
      <div className="border-t border-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </Button>
        <Link href="/" onClick={() => setMobileMenuOpen(false)}>
          <Button
            variant="ghost"
            className="mt-2 w-full justify-start gap-3 text-muted-foreground"
          >
            <Heart className="h-5 w-5" />
            Back to Main Site
          </Button>
        </Link>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-border bg-card lg:flex">
        {sidebarContent}
      </aside>

      {/* Mobile Header */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-primary">CureCircle</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-border bg-card transition-transform lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
