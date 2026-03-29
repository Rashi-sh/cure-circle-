"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, DoctorProfile, PatientProfile, DoctorSignupForm, PatientSignupForm } from "./types"
import { mockDoctors, mockPatients, demoCredentials } from "./mock-data"

interface AuthContextType {
  user: User | null
  doctorProfile: DoctorProfile | null
  patientProfile: PatientProfile | null
  isLoading: boolean
  signIn: (email: string, password: string, role: "patient" | "doctor") => Promise<{ success: boolean; error?: string }>
  signUp: (data: DoctorSignupForm | PatientSignupForm, role: "patient" | "doctor") => Promise<{ success: boolean; error?: string }>
  signOut: () => void
  isDoctor: boolean
  isPatient: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Storage key for persisting auth state
const AUTH_STORAGE_KEY = "curecircle_auth"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | null>(null)
  const [patientProfile, setPatientProfile] = useState<PatientProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load auth state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setUser(parsed.user)
        if (parsed.user?.role === "doctor") {
          setDoctorProfile(parsed.doctorProfile)
        } else if (parsed.user?.role === "patient") {
          setPatientProfile(parsed.patientProfile)
        }
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  // Persist auth state to localStorage
  const persistAuth = (user: User | null, profile: DoctorProfile | PatientProfile | null) => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
        user,
        doctorProfile: user.role === "doctor" ? profile : null,
        patientProfile: user.role === "patient" ? profile : null,
      }))
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }

  const signIn = async (email: string, password: string, role: "patient" | "doctor"): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    if (role === "doctor") {
      // Check demo credentials
      if (email === demoCredentials.doctor.email && password === demoCredentials.doctor.password) {
        const doctor = mockDoctors.find(d => d.email === email)
        if (doctor) {
          setUser(doctor)
          setDoctorProfile(doctor)
          persistAuth(doctor, doctor)
          return { success: true }
        }
      }
      // Check other mock doctors (any password works for demo)
      const doctor = mockDoctors.find(d => d.email === email)
      if (doctor) {
        setUser(doctor)
        setDoctorProfile(doctor)
        persistAuth(doctor, doctor)
        return { success: true }
      }
      return { success: false, error: "Invalid email or password" }
    } else {
      // Patient login
      if (email === demoCredentials.patient.email && password === demoCredentials.patient.password) {
        const patient = mockPatients.find(p => p.email === email)
        if (patient) {
          setUser(patient)
          setPatientProfile(patient)
          persistAuth(patient, patient)
          return { success: true }
        }
      }
      const patient = mockPatients.find(p => p.email === email)
      if (patient) {
        setUser(patient)
        setPatientProfile(patient)
        persistAuth(patient, patient)
        return { success: true }
      }
      return { success: false, error: "Invalid email or password" }
    }
  }

  const signUp = async (data: DoctorSignupForm | PatientSignupForm, role: "patient" | "doctor"): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Check if email already exists
    const existingDoctor = mockDoctors.find(d => d.email === data.email)
    const existingPatient = mockPatients.find(p => p.email === data.email)
    
    if (existingDoctor || existingPatient) {
      return { success: false, error: "An account with this email already exists" }
    }

    if (role === "doctor") {
      const doctorData = data as DoctorSignupForm
      const newDoctor: DoctorProfile = {
        id: `doctor-${Date.now()}`,
        email: doctorData.email,
        name: doctorData.name,
        role: "doctor",
        specialization: doctorData.specialization,
        clinicName: doctorData.clinicName,
        yearsExperience: doctorData.yearsExperience,
        location: doctorData.location,
        licenseNumber: doctorData.licenseNumber,
        phone: doctorData.phone,
        isVerified: false, // New doctors start unverified
        createdAt: new Date().toISOString(),
      }
      setUser(newDoctor)
      setDoctorProfile(newDoctor)
      persistAuth(newDoctor, newDoctor)
      return { success: true }
    } else {
      const patientData = data as PatientSignupForm
      const newPatient: PatientProfile = {
        id: `patient-${Date.now()}`,
        email: patientData.email,
        name: patientData.name,
        role: "patient",
        phone: patientData.phone,
        createdAt: new Date().toISOString(),
      }
      setUser(newPatient)
      setPatientProfile(newPatient)
      persistAuth(newPatient, newPatient)
      return { success: true }
    }
  }

  const signOut = () => {
    setUser(null)
    setDoctorProfile(null)
    setPatientProfile(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const value: AuthContextType = {
    user,
    doctorProfile,
    patientProfile,
    isLoading,
    signIn,
    signUp,
    signOut,
    isDoctor: user?.role === "doctor",
    isPatient: user?.role === "patient",
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
