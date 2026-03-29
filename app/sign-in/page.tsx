"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Stethoscope, Check, Loader2, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import { demoCredentials } from "@/lib/mock-data"

export default function SignInPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [userType, setUserType] = useState<"patient" | "doctor">("patient")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const benefits = {
    patient: [
      "Book consultations with verified doctors",
      "Explore traditional home remedies",
      "Access pregnancy & baby care resources",
    ],
    doctor: [
      "Reach thousands of patients",
      "Review and approve home remedies",
      "Build your online presence",
    ],
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error("Please fill in all fields")
      return
    }

    setIsLoading(true)
    
    const result = await signIn(email, password, userType)
    
    setIsLoading(false)

    if (result.success) {
      toast.success("Welcome back!")
      if (userType === "doctor") {
        router.push("/doctor/dashboard")
      } else {
        router.push("/home")
      }
    } else {
      toast.error(result.error || "Sign in failed")
    }
  }

  const fillDemoCredentials = () => {
    if (userType === "doctor") {
      setEmail(demoCredentials.doctor.email)
      setPassword(demoCredentials.doctor.password)
    } else {
      setEmail(demoCredentials.patient.email)
      setPassword(demoCredentials.patient.password)
    }
    toast.info("Demo credentials filled")
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-secondary via-background to-secondary/50">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="flex w-full max-w-4xl gap-8">
          {/* Form Card */}
          <div className="flex-1 rounded-3xl border border-border bg-card p-8 shadow-lg">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
              <p className="mt-2 text-muted-foreground">
                Sign in to your CureCircle account
              </p>
            </div>

            {/* User Type Toggle */}
            <div className="mt-8 flex gap-4">
              <button
                type="button"
                onClick={() => setUserType("patient")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all",
                  userType === "patient"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-muted-foreground hover:bg-secondary"
                )}
              >
                <User className="h-4 w-4" />
                Patient
              </button>
              <button
                type="button"
                onClick={() => setUserType("doctor")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all",
                  userType === "doctor"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-muted-foreground hover:bg-secondary"
                )}
              >
                <Stethoscope className="h-4 w-4" />
                Doctor
              </button>
            </div>

            {/* Demo Credentials Helper */}
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary/30 bg-primary/5 py-2 text-sm text-primary hover:bg-primary/10 transition-colors"
            >
              <Info className="h-4 w-4" />
              Use demo {userType} credentials
            </button>

            {/* Form */}
            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl bg-primary py-6 hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {"Don't have an account? "}
              <Link href="/sign-up" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* Benefits Panel */}
          <div className="hidden w-80 rounded-3xl bg-primary p-8 text-white lg:block">
            <h2 className="text-xl font-bold">
              For {userType === "patient" ? "Patients" : "Doctors"}
            </h2>
            <p className="mt-2 text-white/90">
              {userType === "patient"
                ? "Access consultations, track health records and explore doctor-approved remedies."
                : "Connect with patients, review remedies, and manage your practice online."}
            </p>

            <ul className="mt-6 space-y-4">
              {benefits[userType].map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="text-sm text-white/90">{benefit}</span>
                </li>
              ))}
            </ul>

            {userType === "doctor" && (
              <div className="mt-8 rounded-xl bg-white/10 p-4">
                <p className="text-xs text-white/80">
                  Demo Doctor Login:
                </p>
                <p className="mt-1 text-sm font-medium">
                  {demoCredentials.doctor.email}
                </p>
                <p className="text-sm">
                  Password: {demoCredentials.doctor.password}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
