"use client"

import { useMemo, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { AppointmentsList } from "@/components/doctor/appointments-list"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { mockAppointments } from "@/lib/mock-data"

type FilterType = "all" | "today" | "upcoming" | "completed"

export default function AppointmentsPage() {
  const { doctorProfile } = useAuth()
  const [filter, setFilter] = useState<FilterType>("all")

  const today = new Date().toISOString().split("T")[0]

  const doctorAppointments = useMemo(() => {
    return mockAppointments.filter(
      (apt) => apt.doctorId === doctorProfile?.id || apt.doctorId === "doctor-1"
    )
  }, [doctorProfile])

  const filteredAppointments = useMemo(() => {
    switch (filter) {
      case "today":
        return doctorAppointments.filter(
          (apt) => apt.date === today && apt.status === "scheduled"
        )
      case "upcoming":
        return doctorAppointments.filter(
          (apt) => apt.date > today && apt.status === "scheduled"
        )
      case "completed":
        return doctorAppointments.filter((apt) => apt.status === "completed")
      default:
        return doctorAppointments
    }
  }, [doctorAppointments, filter, today])

  const counts = useMemo(() => ({
    all: doctorAppointments.length,
    today: doctorAppointments.filter(
      (apt) => apt.date === today && apt.status === "scheduled"
    ).length,
    upcoming: doctorAppointments.filter(
      (apt) => apt.date > today && apt.status === "scheduled"
    ).length,
    completed: doctorAppointments.filter((apt) => apt.status === "completed")
      .length,
  }), [doctorAppointments, today])

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "today", label: "Today" },
    { key: "upcoming", label: "Upcoming" },
    { key: "completed", label: "Completed" },
  ]

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
          Appointments
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage all your patient appointments
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f.key}
            variant={filter === f.key ? "default" : "outline"}
            size="sm"
            className={cn(
              "rounded-full gap-2",
              filter === f.key && "bg-primary text-primary-foreground"
            )}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            <Badge
              variant="secondary"
              className={cn(
                "rounded-full",
                filter === f.key
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted"
              )}
            >
              {counts[f.key]}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Appointments List */}
      <AppointmentsList
        appointments={filteredAppointments}
        title={`${filters.find((f) => f.key === filter)?.label} Appointments`}
        showDate={filter !== "today"}
        emptyMessage={`No ${filter === "all" ? "" : filter} appointments found`}
      />
    </div>
  )
}
