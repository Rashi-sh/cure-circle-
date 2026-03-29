"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Heart, Menu, X, Stethoscope, User, LogOut, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { NotificationDropdown } from "@/components/notifications"

const publicNavLinks = [
  { href: "/", label: "Home" },
  { href: "/explore-pathy", label: "Explore-Pathy" },
  { href: "/remedies", label: "Remedies" },
  { href: "/consult", label: "Consult" },
  { href: "/mom-baby-hub", label: "Mom & Baby Hub" },
  { href: "/about", label: "About" },
]

const patientNavLinks = [
  { href: "/home", label: "Home" },
  { href: "/explore-pathy", label: "Explore Pathies" },
  { href: "/remedies", label: "Remedies" },
  { href: "/family", label: "Family" },
  { href: "/consult", label: "Consult" },
  { href: "/appointments", label: "Appointments" },
  { href: "/profile", label: "Profile" },
]

const doctorNavLinks = [
  { href: "/doctor/dashboard", label: "Dashboard" },
  { href: "/doctor/patients", label: "Patients" },
  { href: "/doctor/appointments-list", label: "Appointments" },
  { href: "/doctor/remedy-reviews", label: "Reviews" },
]

export function Navbar() {
  const pathname = usePathname()
  const { user, isDoctor, isPatient, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Determine which nav links to show based on user role
  const navLinks = isDoctor ? doctorNavLinks : isPatient ? patientNavLinks : publicNavLinks

  const handleSignOut = () => {
    signOut()
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-primary">CureCircle</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Auth Section */}
        <div className="hidden items-center gap-3 lg:flex">
          {user && <NotificationDropdown />}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 rounded-full">
                  {isDoctor ? (
                    <Stethoscope className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="max-w-[120px] truncate">{user.name.split(" ")[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  {isDoctor && (
                    <p className="mt-1 text-xs font-medium text-primary">Doctor</p>
                  )}
                  {isPatient && (
                    <p className="mt-1 text-xs font-medium text-primary">Patient</p>
                  )}
                </div>
                <DropdownMenuSeparator />
                {isPatient && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/home" className="cursor-pointer">
                        <Heart className="mr-2 h-4 w-4" />
                        Home
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                {isDoctor && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/doctor/dashboard" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Doctor Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/doctor/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/sign-in">
              <Button className="rounded-full bg-primary px-6 hover:bg-primary/90">
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
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
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="mt-4 border-t border-border pt-4">
              {user ? (
                <>
                  <div className="mb-3 px-4">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    {isDoctor && (
                      <p className="mt-1 text-xs font-medium text-primary">Doctor</p>
                    )}
                    {isPatient && (
                      <p className="mt-1 text-xs font-medium text-primary">Patient</p>
                    )}
                  </div>
                  {isPatient && (
                    <Link
                      href="/home"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="mb-2 w-full justify-start rounded-xl"
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        Home
                      </Button>
                    </Link>
                  )}
                  {isDoctor && (
                    <Link
                      href="/doctor/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="mb-2 w-full justify-start rounded-xl"
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Doctor Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleSignOut()
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full rounded-full bg-primary hover:bg-primary/90">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="mt-2 w-full rounded-full">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
