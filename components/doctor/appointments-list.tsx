"use client"

import { Video, MapPin, MessageCircle, Clock, MoreHorizontal, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Appointment } from "@/lib/types"
import { cn } from "@/lib/utils"

interface AppointmentsListProps {
  appointments: Appointment[]
  title: string
  showDate?: boolean
  emptyMessage?: string
}

export function AppointmentsList({ 
  appointments, 
  title, 
  showDate = false,
  emptyMessage = "No appointments found"
}: AppointmentsListProps) {
  const getTypeIcon = (type: Appointment["type"]) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "in-person":
        return <MapPin className="h-4 w-4" />
      case "chat":
        return <MessageCircle className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: Appointment["type"]) => {
    switch (type) {
      case "video":
        return "Video Call"
      case "in-person":
        return "In-Person"
      case "chat":
        return "Chat"
    }
  }

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-700"
      case "in-progress":
        return "bg-amber-100 text-amber-700"
      case "completed":
        return "bg-green-100 text-green-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
    }
  }

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Clock className="mb-2 h-10 w-10 text-muted-foreground/50" />
            <p className="text-muted-foreground">{emptyMessage}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary/50"
              >
                <div className="flex items-center gap-4">
                  {/* Patient Avatar */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>

                  {/* Patient Info */}
                  <div>
                    <p className="font-medium text-foreground">
                      {appointment.patientName}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      {showDate && (
                        <>
                          <span>{appointment.date}</span>
                          <span className="text-border">|</span>
                        </>
                      )}
                      <span>{appointment.time}</span>
                      <span className="text-border">|</span>
                      <span className="flex items-center gap-1">
                        {getTypeIcon(appointment.type)}
                        {getTypeLabel(appointment.type)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {appointment.reason}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Badge
                    className={cn(
                      "rounded-full capitalize",
                      getStatusColor(appointment.status)
                    )}
                  >
                    {appointment.status}
                  </Badge>

                  {appointment.status === "scheduled" && (
                    <div className="hidden items-center gap-2 sm:flex">
                      {appointment.type === "video" && (
                        <Button size="sm" className="rounded-full">
                          Start Call
                        </Button>
                      )}
                      {appointment.type === "chat" && (
                        <Button size="sm" className="rounded-full">
                          Start Chat
                        </Button>
                      )}
                      {appointment.type === "in-person" && (
                        <Button size="sm" variant="outline" className="rounded-full">
                          Check In
                        </Button>
                      )}
                    </div>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      <DropdownMenuItem>Add Notes</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Cancel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
