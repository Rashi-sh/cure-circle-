"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  User, 
  Heart, 
  FileText, 
  Mail, 
  Phone, 
  Calendar, 
  Droplet,
  Edit2,
  Save,
  Upload
} from "lucide-react"

export default function ProfilePage() {
  const { patientProfile } = useAuth()
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") || "personal"
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [isEditing, setIsEditing] = useState(false)

  const initials = (patientProfile?.name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <section className="bg-secondary/30 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary text-xl font-bold text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{patientProfile.name}</h1>
                  <p className="text-muted-foreground">{patientProfile.email}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="outline">Patient ID: {patientProfile.id}</Badge>
                    <Badge className="bg-primary/10 text-primary">Active</Badge>
                  </div>
                </div>
              </div>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => setIsEditing(!isEditing)}
                className="rounded-full"
              >
                {isEditing ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card className="border-0 shadow-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-t-lg border-b bg-secondary/50 p-1">
              <TabsTrigger value="personal" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Personal Info</span>
                <span className="sm:hidden">Personal</span>
              </TabsTrigger>
              <TabsTrigger value="health" className="gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Health Profile</span>
                <span className="sm:hidden">Health</span>
              </TabsTrigger>
              <TabsTrigger value="vault" className="gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Health Vault</span>
                <span className="sm:hidden">Vault</span>
              </TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="personal" className="mt-0">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Personal Information</CardTitle>
                <CardDescription>Your basic account and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue={patientProfile.name}
                      disabled={!isEditing}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={patientProfile.email}
                      disabled={!isEditing}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      defaultValue={patientProfile.phone || ""}
                      placeholder="Enter phone number"
                      disabled={!isEditing}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      Date of Birth
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      defaultValue={patientProfile.dateOfBirth || ""}
                      disabled={!isEditing}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="rounded-xl bg-secondary/50 p-4">
                  <h3 className="font-medium text-foreground">Account Details</h3>
                  <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <span className="text-muted-foreground">Patient ID:</span>{" "}
                      <span className="font-medium">{patientProfile.id}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Member Since:</span>{" "}
                      <span className="font-medium">
                        {new Date(patientProfile.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>

            {/* Health Profile Tab */}
            <TabsContent value="health" className="mt-0">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Health Profile</CardTitle>
                <CardDescription>Your medical information and health data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Droplet className="h-4 w-4 text-muted-foreground" />
                      Blood Group
                    </Label>
                    <div className="rounded-xl bg-secondary/50 p-3">
                      <span className="text-lg font-semibold">
                        {patientProfile.bloodGroup || "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    Allergies
                  </Label>
                  <div className="rounded-xl border border-border bg-card p-4">
                    {patientProfile.allergies?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {patientProfile.allergies.map((allergy, idx) => (
                          <Badge key={idx} className="bg-red-100 text-red-700">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No allergies recorded</p>
                    )}
                    {isEditing && (
                      <Button variant="outline" size="sm" className="mt-3 rounded-full">
                        Add Allergy
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    Medical History
                  </Label>
                  <div className="rounded-xl border border-border bg-card p-4">
                    {patientProfile.medicalHistory?.length ? (
                      <ul className="space-y-2">
                        {patientProfile.medicalHistory.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No medical history recorded</p>
                    )}
                    {isEditing && (
                      <Button variant="outline" size="sm" className="mt-3 rounded-full">
                        Add Condition
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </TabsContent>

            {/* Health Vault Tab */}
            <TabsContent value="vault" className="mt-0">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Health Vault</CardTitle>
                <CardDescription>Store and manage your medical documents</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <h4 className="font-medium">Prescriptions</h4>
                      <p className="text-sm text-muted-foreground">0 documents</p>
                      <Button variant="outline" size="sm" className="mt-3 rounded-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <FileText className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="font-medium">Lab Reports</h4>
                      <p className="text-sm text-muted-foreground">0 documents</p>
                      <Button variant="outline" size="sm" className="mt-3 rounded-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                        <FileText className="h-6 w-6 text-purple-600" />
                      </div>
                      <h4 className="font-medium">Medical Records</h4>
                      <p className="text-sm text-muted-foreground">0 documents</p>
                      <Button variant="outline" size="sm" className="mt-3 rounded-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 rounded-xl bg-secondary/50 p-4">
                  <h4 className="font-medium text-foreground">About Health Vault</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your Health Vault is a secure place to store all your medical documents. 
                    Upload prescriptions, lab reports, and other medical records to keep them 
                    organized and easily accessible during consultations.
                  </p>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </section>
  )
}
