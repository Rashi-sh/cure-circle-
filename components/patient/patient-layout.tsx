"use client"

import { useAuth } from "@/lib/auth-context"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { 
  Heart, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Compass,
  Pill,
  Users,
  Stethoscope,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/layout/footer"
import { cn } from "@/lib/utils"

const patientNavLinks = [
  { href: "/home", label: "Home", icon: Heart },
  { href: "/explore-pathy", label: "Explore Pathies", icon: Compass },
  { href: "/remedies", label: "Remedies", icon: Pill },
  { href: "/family", label: "Family", icon: Users },
  { href: "/consult", label: "Consult", icon: Stethoscope },
  { href: "/appointments", label: "Appointments", icon: Calendar },
  { href: "/profile", label: "Profile", icon: User },
]

interface PatientLayoutProps {
  children: React.ReactNode
}

export function PatientLayout({ children }: PatientLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = () => {
    signOut()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          {/* Logo */}
          <Link href="/home" className="flex shrink-0 items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-primary">CureCircle</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden flex-1 items-center gap-1 lg:flex">
            {patientNavLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* User Menu */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button
              variant="outline"
              className="gap-2 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border/40 bg-card lg:hidden">
            <nav className="container mx-auto flex flex-col gap-1 p-4">
              {patientNavLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                )
              })}
              <div className="mt-4 border-t border-border pt-4">
                <div className="mb-3 px-4">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    handleSignOut()
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      {children}

      {/* Footer */}
      <Footer />
    </div>
  )
}
