"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Heart, FileText, Users, Calendar } from "lucide-react"
import { PatientSidebar } from "./patient-sidebar"
import { PersonalInfoTab } from "./tabs/personal-info-tab"
import { HealthProfileTab } from "./tabs/health-profile-tab"
import { HealthVaultTab } from "./tabs/health-vault-tab"
import { FamilyTab } from "./tabs/family-tab"
import { AppointmentsTab } from "./tabs/appointments-tab"

export function PatientDashboard() {
  const { patientProfile } = useAuth()
  const [activeTab, setActiveTab] = useState("personal")

  if (!patientProfile) {
    return null
  }

  const initials = patientProfile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <main className="container mx-auto flex gap-6 py-8 px-4">
      {/* Left Sidebar */}
      <PatientSidebar patient={patientProfile} />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header Card */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-lg font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{patientProfile.name}</h1>
                  <p className="text-sm text-muted-foreground">{patientProfile.email}</p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline">Patient ID: {patientProfile.id}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card className="border-0 shadow-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 rounded-t-lg border-b bg-secondary/50 p-1">
              <TabsTrigger value="personal" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Personal</span>
              </TabsTrigger>
              <TabsTrigger value="appointments" className="gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Appointments</span>
              </TabsTrigger>
              <TabsTrigger value="health" className="gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Health</span>
              </TabsTrigger>
              <TabsTrigger value="vault" className="gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Vault</span>
              </TabsTrigger>
              <TabsTrigger value="family" className="gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Family</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-0">
              <PersonalInfoTab patient={patientProfile} />
            </TabsContent>

            <TabsContent value="appointments" className="mt-0">
              <div className="p-6">
                <AppointmentsTab />
              </div>
            </TabsContent>

            <TabsContent value="health" className="mt-0">
              <HealthProfileTab patient={patientProfile} />
            </TabsContent>

            <TabsContent value="vault" className="mt-0">
              <HealthVaultTab patient={patientProfile} />
            </TabsContent>

            <TabsContent value="family" className="mt-0">
              <FamilyTab patient={patientProfile} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </main>
  )
}
