"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DoctorSidebar } from "@/components/doctor"
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  MessageSquare,
  Video,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react"

// Mock appointments for doctor
const mockDoctorAppointments = [
  {
    id: "apt-001",
    patientId: "pat-001",
    patientName: "John Doe",
    patientImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    date: "2026-03-22",
    time: "10:00 AM",
    type: "video" as const,
    status: "confirmed" as const,
    reason: "Consultation for chronic fatigue",
  },
  {
    id: "apt-002",
    patientId: "pat-002",
    patientName: "Jane Smith",
    patientImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    date: "2026-03-23",
    time: "2:30 PM",
    type: "chat" as const,
    status: "pending" as const,
    reason: "Follow-up for allergies",
  },
  {
    id: "apt-003",
    patientId: "pat-003",
    patientName: "Mike Johnson",
    patientImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    date: "2026-03-20",
    time: "11:00 AM",
    type: "in-person" as const,
    status: "completed" as const,
    reason: "Nutrition consultation",
  },
]

export default function DoctorAppointmentsPage() {
  const { isDoctor } = useAuth()
  const [activeTab, setActiveTab] = useState("pending")
  const [appointments, setAppointments] = useState(mockDoctorAppointments)

  if (!isDoctor) {
    return (
      <div className="flex h-screen">
        <DoctorSidebar />
        <main className="flex-1 overflow-auto">
          <section className="py-12">
            <div className="container mx-auto px-4 text-center">
              <p className="text-muted-foreground">You need to be a doctor to view this page.</p>
            </div>
          </section>
        </main>
      </div>
    )
  }

  const pendingAppointments = appointments.filter((apt) => apt.status === "pending")
  const confirmedAppointments = appointments.filter((apt) => apt.status === "confirmed")
  const completedAppointments = appointments.filter((apt) => apt.status === "completed")

  const handleConfirm = (id: string) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: "confirmed" as const } : apt
      )
    )
  }

  const handleReject = (id: string) => {
    setAppointments(appointments.filter((apt) => apt.id !== id))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-600">
            <AlertCircle className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "confirmed":
        return (
          <Badge variant="default" className="bg-blue-600">
            <CheckCircle className="mr-1 h-3 w-3" />
            Confirmed
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="secondary">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const AppointmentCard = ({ appointment }: { appointment: (typeof mockDoctorAppointments)[0] }) => (
    <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          {/* Left: Patient Info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{appointment.patientName}</h3>
                <p className="text-sm text-muted-foreground">Patient ID: {appointment.patientId}</p>
              </div>
              {getStatusBadge(appointment.status)}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 shrink-0" />
                <span>{new Date(appointment.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0" />
                <span>{appointment.time}</span>
              </div>
              <div className="col-span-2 flex items-center gap-2 text-muted-foreground">
                <span className="font-medium text-foreground">Type:</span>
                <span className="capitalize">{appointment.type}</span>
              </div>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Reason:</span> {appointment.reason}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
          {appointment.type === "chat" && (
            <Button size="sm" variant="outline" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Open Chat
            </Button>
          )}
          {appointment.type === "video" && (
            <Button size="sm" variant="outline" className="gap-2">
              <Video className="h-4 w-4" />
              Start Call
            </Button>
          )}
          {appointment.type === "in-person" && (
            <Button size="sm" variant="outline" className="gap-2">
              <Phone className="h-4 w-4" />
              Prepare
            </Button>
          )}

          {appointment.status === "pending" && (
            <>
              <Button
                size="sm"
                className="gap-2 bg-green-600 hover:bg-green-700"
                onClick={() => handleConfirm(appointment.id)}
              >
                <CheckCircle className="h-4 w-4" />
                Confirm
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="gap-2 text-destructive"
                onClick={() => handleReject(appointment.id)}
              >
                <X className="h-4 w-4" />
                Reject
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />
      <main className="flex-1 overflow-auto">
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Appointment Management</h1>
              <p className="mt-1 text-muted-foreground">
                Review and manage patient appointment requests and confirmations
              </p>
            </div>

            {/* Tabs */}
            <Card className="border-0 shadow-sm">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 rounded-t-lg border-b bg-secondary/50 p-1">
                  <TabsTrigger value="pending">
                    Pending ({pendingAppointments.length})
                  </TabsTrigger>
                  <TabsTrigger value="confirmed">
                    Confirmed ({confirmedAppointments.length})
                  </TabsTrigger>
                  <TabsTrigger value="completed">
                    Completed ({completedAppointments.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="mt-0 space-y-4 p-6">
                  {pendingAppointments.length > 0 ? (
                    pendingAppointments.map((appointment) => (
                      <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))
                  ) : (
                    <div className="py-12 text-center">
                      <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                      <p className="text-muted-foreground">No pending appointment requests</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="confirmed" className="mt-0 space-y-4 p-6">
                  {confirmedAppointments.length > 0 ? (
                    confirmedAppointments.map((appointment) => (
                      <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))
                  ) : (
                    <div className="py-12 text-center">
                      <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                      <p className="text-muted-foreground">No confirmed appointments</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="completed" className="mt-0 space-y-4 p-6">
                  {completedAppointments.length > 0 ? (
                    completedAppointments.map((appointment) => (
                      <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))
                  ) : (
                    <div className="py-12 text-center">
                      <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                      <p className="text-muted-foreground">No completed appointments yet</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
