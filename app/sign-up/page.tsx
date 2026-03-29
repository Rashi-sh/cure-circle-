"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { User, Stethoscope, Check, Loader2, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import type { DoctorSignupForm, PatientSignupForm } from "@/lib/types"

const specializations = [
  "Ayurveda",
  "Homeopathy",
  "Allopathy",
  "Naturopathy",
  "Unani",
  "Siddha",
  "General Medicine",
  "Pediatrics",
  "Gynecology",
  "Dermatology",
  "Cardiology",
  "Orthopedics",
  "Neurology",
  "Psychiatry",
]

export default function SignUpPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [userType, setUserType] = useState<"patient" | "doctor">("patient")
  const [isLoading, setIsLoading] = useState(false)

  // Patient form state
  const [patientForm, setPatientForm] = useState<PatientSignupForm>({
    name: "",
    email: "",
    password: "",
    phone: "",
  })

  // Doctor form state
  const [doctorForm, setDoctorForm] = useState<DoctorSignupForm>({
    name: "",
    email: "",
    password: "",
    specialization: "",
    clinicName: "",
    yearsExperience: 0,
    location: "",
    licenseNumber: "",
    phone: "",
  })

  const benefits = {
    patient: [
      "Connect with verified doctors",
      "Access thousands of home remedies",
      "Get personalized health guidance",
    ],
    doctor: [
      "Expand your patient reach",
      "Review and approve home remedies",
      "Build your online reputation",
    ],
  }

  const handlePatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!patientForm.name || !patientForm.email || !patientForm.password) {
      toast.error("Please fill in all required fields")
      return
    }

    if (patientForm.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)
    
    const result = await signUp(patientForm, "patient")
    
    setIsLoading(false)

    if (result.success) {
      toast.success("Account created successfully!")
      router.push("/home")
    } else {
      toast.error(result.error || "Sign up failed")
    }
  }

  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!doctorForm.name || !doctorForm.email || !doctorForm.password || 
        !doctorForm.specialization || !doctorForm.clinicName || 
        !doctorForm.location || !doctorForm.licenseNumber) {
      toast.error("Please fill in all required fields")
      return
    }

    if (doctorForm.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)
    
    const result = await signUp(doctorForm, "doctor")
    
    setIsLoading(false)

    if (result.success) {
      toast.success("Account created! Your profile is pending verification.")
      router.push("/doctor/dashboard")
    } else {
      toast.error(result.error || "Sign up failed")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-secondary via-background to-secondary/50">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="flex w-full max-w-5xl gap-8">
          {/* Form Card */}
          <div className="flex-1 rounded-3xl border border-border bg-card p-8 shadow-lg">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">Join CureCircle</h1>
              <p className="mt-2 text-muted-foreground">
                Create your account to get started
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

            {/* Patient Form */}
            {userType === "patient" && (
              <form className="mt-8 space-y-5" onSubmit={handlePatientSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="patient-name">Full Name *</Label>
                  <Input
                    id="patient-name"
                    type="text"
                    placeholder="Your full name"
                    className="rounded-xl"
                    value={patientForm.name}
                    onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patient-email">Email Address *</Label>
                  <Input
                    id="patient-email"
                    type="email"
                    placeholder="your@email.com"
                    className="rounded-xl"
                    value={patientForm.email}
                    onChange={(e) => setPatientForm({ ...patientForm, email: e.target.value })}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patient-phone">Phone Number</Label>
                  <Input
                    id="patient-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="rounded-xl"
                    value={patientForm.phone}
                    onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patient-password">Password *</Label>
                  <Input
                    id="patient-password"
                    type="password"
                    placeholder="At least 6 characters"
                    className="rounded-xl"
                    value={patientForm.password}
                    onChange={(e) => setPatientForm({ ...patientForm, password: e.target.value })}
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
                      Creating account...
                    </>
                  ) : (
                    "Create Patient Account"
                  )}
                </Button>
              </form>
            )}

            {/* Doctor Form */}
            {userType === "doctor" && (
              <form className="mt-8 space-y-5" onSubmit={handleDoctorSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="doctor-name">Full Name *</Label>
                    <Input
                      id="doctor-name"
                      type="text"
                      placeholder="Dr. Your Name"
                      className="rounded-xl"
                      value={doctorForm.name}
                      onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor-email">Email Address *</Label>
                    <Input
                      id="doctor-email"
                      type="email"
                      placeholder="doctor@email.com"
                      className="rounded-xl"
                      value={doctorForm.email}
                      onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="doctor-specialization">Specialization *</Label>
                    <Select
                      value={doctorForm.specialization}
                      onValueChange={(value) => setDoctorForm({ ...doctorForm, specialization: value })}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        {specializations.map((spec) => (
                          <SelectItem key={spec} value={spec}>
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor-clinic">Clinic/Hospital Name *</Label>
                    <Input
                      id="doctor-clinic"
                      type="text"
                      placeholder="Your clinic name"
                      className="rounded-xl"
                      value={doctorForm.clinicName}
                      onChange={(e) => setDoctorForm({ ...doctorForm, clinicName: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="doctor-experience">Years of Experience *</Label>
                    <Input
                      id="doctor-experience"
                      type="number"
                      placeholder="e.g., 10"
                      className="rounded-xl"
                      min={0}
                      max={60}
                      value={doctorForm.yearsExperience || ""}
                      onChange={(e) => setDoctorForm({ ...doctorForm, yearsExperience: parseInt(e.target.value) || 0 })}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor-location">Location *</Label>
                    <Input
                      id="doctor-location"
                      type="text"
                      placeholder="City, State"
                      className="rounded-xl"
                      value={doctorForm.location}
                      onChange={(e) => setDoctorForm({ ...doctorForm, location: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="doctor-license">License/Registration Number *</Label>
                    <Input
                      id="doctor-license"
                      type="text"
                      placeholder="e.g., MBBS-MH-2010-1234"
                      className="rounded-xl"
                      value={doctorForm.licenseNumber}
                      onChange={(e) => setDoctorForm({ ...doctorForm, licenseNumber: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor-phone">Phone Number</Label>
                    <Input
                      id="doctor-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="rounded-xl"
                      value={doctorForm.phone}
                      onChange={(e) => setDoctorForm({ ...doctorForm, phone: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doctor-password">Password *</Label>
                  <Input
                    id="doctor-password"
                    type="password"
                    placeholder="At least 6 characters"
                    className="rounded-xl"
                    value={doctorForm.password}
                    onChange={(e) => setDoctorForm({ ...doctorForm, password: e.target.value })}
                    disabled={isLoading}
                  />
                </div>

                {/* Verification Notice */}
                <div className="flex items-start gap-3 rounded-xl bg-primary/5 p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Verification Required</p>
                    <p className="text-sm text-muted-foreground">
                      Your account will be reviewed by our team. Full access to doctor features will be granted after verification of your credentials.
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-xl bg-primary py-6 hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Doctor Account"
                  )}
                </Button>
              </form>
            )}

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/sign-in" className="font-medium text-primary hover:underline">
                Sign in
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
                ? "Start your journey to holistic wellness with CureCircle."
                : "Join our network of verified healthcare professionals."}
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
              <div className="mt-8 space-y-4">
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-sm font-medium">What you can do:</p>
                  <ul className="mt-2 space-y-1 text-sm text-white/80">
                    <li>- Review home remedy submissions</li>
                    <li>- Manage patient appointments</li>
                    <li>- Access patient history</li>
                    <li>- Post verified remedies</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
