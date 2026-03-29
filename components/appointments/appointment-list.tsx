"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, User, MessageSquare, Video, MapPin } from "lucide-react"
import type { Appointment } from "@/lib/types"
import { cn } from "@/lib/utils"

interface AppointmentListProps {
  appointments: Appointment[]
  isDoctor?: boolean
  onConfirm?: (appointmentId: string) => void
  onChat?: (appointmentId: string) => void
  onVideo?: (appointmentId: string) => void
}

export function AppointmentList({
  appointments,
  isDoctor = false,
  onConfirm,
  onChat,
  onVideo,
}: AppointmentListProps) {
  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: Appointment["type"]) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "chat":
        return <MessageSquare className="h-4 w-4" />
      case "in-person":
        return <MapPin className="h-4 w-4" />
    }
  }

  if (appointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No appointments yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <Card key={appointment.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Badge className={cn("rounded-full", getStatusColor(appointment.status))}>
                    {appointment.status.charAt(0).toUpperCase() +
                      appointment.status.slice(1)}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    {getTypeIcon(appointment.type)}
                    <span className="capitalize">{appointment.type}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-foreground">
                  {isDoctor ? appointment.patientName : appointment.doctorName}
                </h3>

                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(appointment.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {appointment.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Reason: {appointment.reason}
                  </div>
                </div>

                {appointment.notes && (
                  <div className="mt-3 rounded-lg bg-secondary/50 p-2 text-sm text-muted-foreground">
                    <p className="font-medium">Notes:</p>
                    <p>{appointment.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 sm:w-auto">
                {isDoctor && appointment.status === "pending" && onConfirm && (
                  <Button
                    size="sm"
                    onClick={() => onConfirm(appointment.id)}
                    className="rounded-lg"
                  >
                    Confirm
                  </Button>
                )}

                {appointment.status === "confirmed" ||
                appointment.status === "in-progress" ? (
                  <>
                    {onChat && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onChat(appointment.id)}
                        className="rounded-lg"
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat
                      </Button>
                    )}
                    {appointment.type === "video" && onVideo && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onVideo(appointment.id)}
                        className="rounded-lg"
                      >
                        <Video className="mr-2 h-4 w-4" />
                        Video Call
                      </Button>
                    )}
                  </>
                ) : null}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
