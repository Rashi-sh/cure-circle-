"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentList } from "@/components/appointments"
import { BookConsultationModal } from "@/components/consultation"
import { Plus } from "lucide-react"
import type { Appointment } from "@/lib/types"

// Mock data for appointments
const mockAppointments: Appointment[] = [
  {
    id: "apt-1",
    patientId: "patient-1",
    patientName: "Rahul Kumar",
    doctorId: "doctor-1",
    doctorName: "Dr. Priya Sharma",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    time: "10:00 AM",
    type: "video",
    status: "confirmed",
    reason: "General checkup",
    createdAt: new Date().toISOString(),
  },
  {
    id: "apt-2",
    patientId: "patient-1",
    patientName: "Rahul Kumar",
    doctorId: "doctor-2",
    doctorName: "Dr. Rajesh Kumar",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    time: "2:30 PM",
    type: "chat",
    status: "pending",
    reason: "Knee pain consultation",
    createdAt: new Date().toISOString(),
  },
  {
    id: "apt-3",
    patientId: "patient-1",
    patientName: "Rahul Kumar",
    doctorId: "doctor-3",
    doctorName: "Dr. Anita Desai",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    time: "3:00 PM",
    type: "in-person",
    status: "completed",
    reason: "Child vaccination",
    createdAt: new Date().toISOString(),
  },
]

export function AppointmentsTab() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const upcomingAppointments = mockAppointments.filter(
    (apt) => new Date(apt.date) > new Date()
  )
  const completedAppointments = mockAppointments.filter(
    (apt) => apt.status === "completed"
  )

  const handleChat = (appointmentId: string) => {
    console.log("Opening chat for appointment:", appointmentId)
  }

  const handleVideo = (appointmentId: string) => {
    console.log("Starting video call for appointment:", appointmentId)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <BookConsultationModal
          trigger={
            <button className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4" />
              Book Appointment
            </button>
          }
        />
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedAppointments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {upcomingAppointments.length > 0 ? (
            <AppointmentList
              appointments={upcomingAppointments}
              onChat={handleChat}
              onVideo={handleVideo}
            />
          ) : (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">
                No upcoming appointments. Book one to get started!
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {completedAppointments.length > 0 ? (
            <AppointmentList
              appointments={completedAppointments}
              onChat={handleChat}
            />
          ) : (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">
                No completed appointments yet.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
