// User roles
export type UserRole = "patient" | "doctor" | "admin"

// Doctor verification status
export type VerificationStatus = "pending" | "verified" | "rejected"

// Payment status
export type PaymentStatus = "pending" | "success" | "failed" | "refunded"

// Notification type
export type NotificationType = 
  | "booking" 
  | "confirmation" 
  | "cancellation" 
  | "payment" 
  | "remedy_approval"
  | "appointment_reminder"
  | "general"

// Notification interface
export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  link?: string
  isRead: boolean
  createdAt: string
}

// Payment record
export interface Payment {
  id: string
  appointmentId: string
  patientId: string
  doctorId: string
  amount: number
  currency: string
  status: PaymentStatus
  paymentMethod: string
  transactionId?: string
  createdAt: string
  updatedAt: string
}

// Appointment status change history
export interface AppointmentStatusChange {
  status: AppointmentStatus
  changedAt: string
  changedBy: string
  reason?: string
}

// Family member type for mom-baby hub
export interface FamilyMember {
  id: string
  patientId: string
  type: "mom" | "baby"
  name: string
  dateOfBirth: string
  bloodGroup?: string
  allergies?: string[]
  medicalHistory?: string[]
  createdAt: string
}

// Base user interface
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
}

// Patient profile
export interface PatientProfile extends User {
  role: "patient"
  phone?: string
  dateOfBirth?: string
  bloodGroup?: string
  allergies?: string[]
  medicalHistory?: string[]
  familyMembers?: FamilyMember[]
}

// Doctor profile
export interface DoctorProfile extends User {
  role: "doctor"
  specialization: string
  clinicName: string
  yearsExperience: number
  location: string
  licenseNumber: string
  bio?: string
  consultationFee?: number
  availability?: string[]
  isVerified: boolean
  verificationStatus?: VerificationStatus
  phone?: string
  imageUrl?: string
}

// Appointment status
export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled" | "rescheduled" | "in-progress"

// Appointment type
export type AppointmentType = "video" | "in-person" | "chat"

// Appointment interface
export interface Appointment {
  id: string
  patientId: string
  patientName: string
  patientImage?: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  type: AppointmentType
  status: AppointmentStatus
  reason: string
  notes?: string
  createdAt: string
  // Payment fields
  paymentStatus?: PaymentStatus
  paymentAmount?: number
  paymentId?: string
  // Status history
  statusHistory?: AppointmentStatusChange[]
  // Rescheduling
  rescheduledFrom?: string
  rescheduledTo?: string
}

// Remedy status for moderation
export type RemedyStatus = "pending" | "approved" | "rejected" | "needs-revision"

// Extended remedy interface with moderation fields
export interface ModeratableRemedy {
  id: string
  title: string
  description: string
  category: string
  ingredients: string[]
  steps: string[]
  safetyNotes?: string
  benefit?: string
  imageUrl: string
  uploadedBy: string
  uploaderId: string
  uploadedAt: string
  status: RemedyStatus
  reviewedBy?: string
  reviewedAt?: string
  reviewNotes?: string
  isPublic: boolean
  likes: number
  comments: number
  shares: number
}

// Patient history / consultation record
export interface ConsultationRecord {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  diagnosis: string
  prescription?: string
  consultationNotes: string
  followUpDate?: string
  createdAt: string
}

// Dashboard stats
export interface DoctorDashboardStats {
  totalPatients: number
  todayAppointments: number
  upcomingAppointments: number
  pendingRemedyApprovals: number
  completedConsultations: number
}

// Form state for doctor signup
export interface DoctorSignupForm {
  name: string
  email: string
  password: string
  specialization: string
  clinicName: string
  yearsExperience: number
  location: string
  licenseNumber: string
  phone?: string
}

// Form state for patient signup
export interface PatientSignupForm {
  name: string
  email: string
  password: string
  phone?: string
}
