"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { StatsCards } from "@/components/doctor/stats-cards"
import { AppointmentsList } from "@/components/doctor/appointments-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, FileCheck, AlertTriangle, BadgeCheck, Clock, XCircle } from "lucide-react"
import { mockAppointments, mockPatients, mockConsultationRecords, mockModeratableRemedies } from "@/lib/mock-data"
import type { DoctorDashboardStats, VerificationStatus } from "@/lib/types"

export default function DoctorDashboardPage() {
  const { doctorProfile } = useAuth()

  // Calculate stats
  const stats: DoctorDashboardStats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0]
    const doctorAppointments = mockAppointments.filter(
      (apt) => apt.doctorId === doctorProfile?.id || apt.doctorId === "doctor-1"
    )
    const todayAppointments = doctorAppointments.filter(
      (apt) => apt.date === today && apt.status === "scheduled"
    )
    const upcomingAppointments = doctorAppointments.filter(
      (apt) => apt.date > today && apt.status === "scheduled"
    )
    const pendingRemedies = mockModeratableRemedies.filter(
      (r) => r.status === "pending"
    )
    const completedConsultations = mockConsultationRecords.filter(
      (r) => r.doctorId === doctorProfile?.id || r.doctorId === "doctor-1"
    )

    return {
      totalPatients: mockPatients.length,
      todayAppointments: todayAppointments.length,
      upcomingAppointments: upcomingAppointments.length,
      pendingRemedyApprovals: pendingRemedies.length,
      completedConsultations: completedConsultations.length,
    }
  }, [doctorProfile])

  // Get today's appointments
  const todayAppointments = useMemo(() => {
    const today = new Date().toISOString().split("T")[0]
    return mockAppointments.filter(
      (apt) =>
        (apt.doctorId === doctorProfile?.id || apt.doctorId === "doctor-1") &&
        apt.date === today &&
        apt.status === "scheduled"
    )
  }, [doctorProfile])

  // Get pending remedies for quick view
  const pendingRemedies = useMemo(() => {
    return mockModeratableRemedies.filter((r) => r.status === "pending").slice(0, 3)
  }, [])

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
          Welcome back, {doctorProfile?.name?.split(" ").slice(0, 2).join(" ")}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {"Here's an overview of your practice today."}
        </p>
      </div>

      {/* Verification Banner */}
      {doctorProfile && (
        <>
          {doctorProfile.verificationStatus === "pending" && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-50 p-4 dark:bg-amber-950/20">
              <Clock className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="font-medium text-amber-900 dark:text-amber-100">Verification Pending</p>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Your profile is under review. You can still use limited features. We'll notify you when verification is complete.
                </p>
              </div>
            </div>
          )}
          {doctorProfile.verificationStatus === "rejected" && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-50 p-4 dark:bg-red-950/20">
              <XCircle className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
              <div>
                <p className="font-medium text-red-900 dark:text-red-100">Verification Rejected</p>
                <p className="text-sm text-red-800 dark:text-red-200">
                  Your verification was rejected. Please review the requirements and reapply or contact support for more information.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Reapply for Verification
                </Button>
              </div>
            </div>
          )}
          {doctorProfile.verificationStatus === "verified" && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-50 p-4 dark:bg-green-950/20">
              <BadgeCheck className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-medium text-green-900 dark:text-green-100">Profile Verified</p>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Your profile has been verified. You have full access to all features.
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Main Content Grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Today's Appointments */}
        <AppointmentsList
          appointments={todayAppointments}
          title="Today's Appointments"
          emptyMessage="No appointments scheduled for today"
        />

        {/* Pending Remedy Reviews */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg">Pending Remedy Reviews</CardTitle>
            <Link href="/doctor/remedy-reviews">
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {pendingRemedies.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileCheck className="mb-2 h-10 w-10 text-muted-foreground/50" />
                <p className="text-muted-foreground">
                  No remedies pending review
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRemedies.map((remedy) => (
                  <div
                    key={remedy.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary/50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-medium text-foreground">
                          {remedy.title}
                        </p>
                        <Badge variant="outline" className="shrink-0 rounded-full text-xs">
                          {remedy.category}
                        </Badge>
                      </div>
                      <p className="mt-1 truncate text-sm text-muted-foreground">
                        By {remedy.uploadedBy}
                      </p>
                    </div>
                    <Link href="/doctor/remedy-reviews">
                      <Button size="sm" variant="outline" className="ml-4 shrink-0 rounded-full">
                        Review
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6 border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/doctor/appointments">
              <div className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary hover:bg-primary/5">
                <div className="rounded-lg bg-blue-50 p-2">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    View All Appointments
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Manage your schedule
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/doctor/patients">
              <div className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary hover:bg-primary/5">
                <div className="rounded-lg bg-green-50 p-2">
                  <svg
                    className="h-5 w-5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">View Patients</p>
                  <p className="text-sm text-muted-foreground">
                    Patient directory
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/doctor/remedy-reviews">
              <div className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary hover:bg-primary/5">
                <div className="rounded-lg bg-primary/10 p-2">
                  <FileCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Review Remedies</p>
                  <p className="text-sm text-muted-foreground">
                    {stats.pendingRemedyApprovals} pending
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/doctor/profile">
              <div className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary hover:bg-primary/5">
                <div className="rounded-lg bg-amber-50 p-2">
                  <BadgeCheck className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Edit Profile</p>
                  <p className="text-sm text-muted-foreground">
                    Update your info
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
