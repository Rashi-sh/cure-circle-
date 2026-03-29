"use client"

import type { PatientProfile } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, LayoutGrid } from "lucide-react"
import Link from "next/link"

interface PatientSidebarProps {
  patient: PatientProfile
}

export function PatientSidebar({ patient }: PatientSidebarProps) {
  const initials = patient.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <aside className="hidden w-64 flex-col gap-4 lg:flex">
      {/* Profile Card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="text-center">
            <Avatar className="mx-auto mb-4 h-20 w-20">
              <AvatarFallback className="bg-primary/10 text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-foreground">{patient.name}</h3>
            <p className="text-xs text-muted-foreground">{patient.email}</p>
            {patient.phone && (
              <p className="mt-2 text-sm text-muted-foreground">{patient.phone}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="border-0 shadow-sm">
        <CardContent className="space-y-2 pt-6">
          <Button variant="ghost" className="w-full justify-start gap-2" asChild>
            <Link href="/dashboard">
              <LayoutGrid className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2" asChild>
            <Link href="/consult">
              <Calendar className="h-4 w-4" />
              Book Consultation
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-0 bg-primary/5 shadow-sm">
        <CardContent className="pt-6">
          <h4 className="mb-3 font-semibold text-sm">Account Info</h4>
          <div className="space-y-2 text-sm">
            {patient.bloodGroup && (
              <div>
                <p className="text-muted-foreground">Blood Group</p>
                <p className="font-medium">{patient.bloodGroup}</p>
              </div>
            )}
            {patient.dateOfBirth && (
              <div>
                <p className="text-muted-foreground">Date of Birth</p>
                <p className="font-medium">{patient.dateOfBirth}</p>
              </div>
            )}
            <div>
              <p className="text-muted-foreground">Member Since</p>
              <p className="font-medium">
                {new Date(patient.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
