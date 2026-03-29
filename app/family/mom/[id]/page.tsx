"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState, use } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  FileText, 
  Leaf, 
  Calendar, 
  Droplet, 
  ArrowLeft,
  Activity,
  Stethoscope,
  Apple,
  Brain,
  Pill,
  ClipboardList,
  Upload
} from "lucide-react"
import Link from "next/link"
import type { FamilyMember } from "@/lib/types"

interface MomPageProps {
  params: Promise<{
    id: string
  }>
}

export default function MomPage({ params }: MomPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { isLoading, isPatient, patientProfile } = useAuth()
  const [familyMember, setFamilyMember] = useState<FamilyMember | null>(null)

  useEffect(() => {
    if (!isLoading && !isPatient) {
      router.push("/")
    }
  }, [isLoading, isPatient, router])

  useEffect(() => {
    if (patientProfile?.familyMembers) {
      const member = patientProfile.familyMembers.find((m) => m.id === id)
      setFamilyMember(member || null)
    }
  }, [patientProfile, id])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-maternal border-t-transparent"></div>
      </div>
    )
  }

  if (!isPatient || !familyMember) {
    return (
      <main className="min-h-screen bg-maternal/5 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Profile not found</p>
          <Button asChild className="mt-4 rounded-full">
            <Link href="/family">Back to Family</Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-maternal/5">
      {/* Header */}
      <section className="bg-gradient-to-r from-maternal to-maternal/80 py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            asChild
            className="mb-4 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <Link href="/family">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Family
            </Link>
          </Button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white lg:text-3xl">
                  {familyMember.name}
                </h1>
                <p className="text-white/90">Mom Health Profile</p>
              </div>
            </div>
            <Badge className="bg-white text-maternal">Mother</Badge>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-3 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-maternal/10">
                  <Calendar className="h-5 w-5 text-maternal" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date of Birth</p>
                  <p className="font-semibold text-foreground">{familyMember.dateOfBirth}</p>
                </div>
              </CardContent>
            </Card>

            {familyMember.bloodGroup && (
              <Card className="border-0 shadow-sm">
                <CardContent className="flex items-center gap-3 pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-maternal/10">
                    <Droplet className="h-5 w-5 text-maternal" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Blood Group</p>
                    <p className="font-semibold text-foreground">{familyMember.bloodGroup}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-3 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-maternal/10">
                  <Activity className="h-5 w-5 text-maternal" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="font-semibold text-foreground">Active</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Tabs */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <Card className="border-0 shadow-sm">
            <Tabs defaultValue="tracking" className="w-full">
              <TabsList className="grid w-full grid-cols-3 border-b bg-maternal/5 p-1">
                <TabsTrigger 
                  value="tracking" 
                  className="gap-2 data-[state=active]:bg-maternal/20 data-[state=active]:text-maternal"
                >
                  <Activity className="h-4 w-4" />
                  <span className="hidden sm:inline">Tracking</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="medical" 
                  className="gap-2 data-[state=active]:bg-maternal/20 data-[state=active]:text-maternal"
                >
                  <Stethoscope className="h-4 w-4" />
                  <span className="hidden sm:inline">Medical Care</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="traditional" 
                  className="gap-2 data-[state=active]:bg-maternal/20 data-[state=active]:text-maternal"
                >
                  <Leaf className="h-4 w-4" />
                  <span className="hidden sm:inline">Traditional Care</span>
                </TabsTrigger>
              </TabsList>

              {/* Tracking Tab */}
              <TabsContent value="tracking" className="mt-0">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg">Health Tracking</CardTitle>
                  <CardDescription>Track pregnancy, postpartum, and wellness progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-maternal/20 bg-maternal/5 p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="h-5 w-5 text-maternal" />
                        <h4 className="font-medium">Stage Tracker</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">Track pregnancy or postpartum stages</p>
                      <Button size="sm" className="mt-3 rounded-full bg-maternal text-white hover:bg-maternal/90">
                        Start Tracking
                      </Button>
                    </div>

                    <div className="rounded-xl border border-maternal/20 bg-maternal/5 p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <FileText className="h-5 w-5 text-maternal" />
                        <h4 className="font-medium">Reports & Prescriptions</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">Upload and manage medical documents</p>
                      <Button size="sm" variant="outline" className="mt-3 rounded-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    </div>

                    <div className="rounded-xl border border-maternal/20 bg-maternal/5 p-4 md:col-span-2">
                      <div className="flex items-center gap-3 mb-3">
                        <ClipboardList className="h-5 w-5 text-maternal" />
                        <h4 className="font-medium">Reminders</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">Set medication and appointment reminders</p>
                      <Button size="sm" variant="outline" className="mt-3 rounded-full">
                        Add Reminder
                      </Button>
                    </div>
                  </div>

                  {/* Allergies */}
                  <div>
                    <h4 className="mb-3 font-medium">Known Allergies</h4>
                    {familyMember.allergies?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {familyMember.allergies.map((allergy, idx) => (
                          <Badge key={idx} className="bg-red-100 text-red-700">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No allergies recorded</p>
                    )}
                  </div>
                </CardContent>
              </TabsContent>

              {/* Medical Care Tab */}
              <TabsContent value="medical" className="mt-0">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg">Medical Care</CardTitle>
                  <CardDescription>Manage medicines, consultations, and recovery plans</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-dashed">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-maternal/10">
                          <Pill className="h-6 w-6 text-maternal" />
                        </div>
                        <h4 className="font-medium">Medicines</h4>
                        <p className="text-sm text-muted-foreground">0 active</p>
                        <Button variant="outline" size="sm" className="mt-3 rounded-full">
                          Add Medicine
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-dashed">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-maternal/10">
                          <Stethoscope className="h-6 w-6 text-maternal" />
                        </div>
                        <h4 className="font-medium">Doctor Consults</h4>
                        <p className="text-sm text-muted-foreground">View history</p>
                        <Button variant="outline" size="sm" className="mt-3 rounded-full" asChild>
                          <Link href="/consult">Book Consult</Link>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-dashed">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-maternal/10">
                          <Heart className="h-6 w-6 text-maternal" />
                        </div>
                        <h4 className="font-medium">Recovery Plans</h4>
                        <p className="text-sm text-muted-foreground">Postpartum care</p>
                        <Button variant="outline" size="sm" className="mt-3 rounded-full">
                          View Plans
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Medical History */}
                  <div>
                    <h4 className="mb-3 font-medium">Medical History</h4>
                    {familyMember.medicalHistory?.length ? (
                      <ul className="space-y-2">
                        {familyMember.medicalHistory.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 rounded-lg bg-maternal/5 p-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-maternal flex-shrink-0"></span>
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No medical history recorded</p>
                    )}
                  </div>
                </CardContent>
              </TabsContent>

              {/* Traditional Care Tab */}
              <TabsContent value="traditional" className="mt-0">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg">Traditional Care</CardTitle>
                  <CardDescription>Diet, recovery practices, and mental wellness</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-dashed">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                          <Apple className="h-6 w-6 text-green-600" />
                        </div>
                        <h4 className="font-medium">Diet & Nutrition</h4>
                        <p className="text-sm text-muted-foreground">Meal plans & tips</p>
                        <Button variant="outline" size="sm" className="mt-3 rounded-full">
                          View Plans
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-dashed">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                          <Leaf className="h-6 w-6 text-amber-600" />
                        </div>
                        <h4 className="font-medium">Recovery Practices</h4>
                        <p className="text-sm text-muted-foreground">Traditional methods</p>
                        <Button variant="outline" size="sm" className="mt-3 rounded-full" asChild>
                          <Link href="/remedies">View Remedies</Link>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-dashed">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                          <Brain className="h-6 w-6 text-purple-600" />
                        </div>
                        <h4 className="font-medium">Mental Wellness</h4>
                        <p className="text-sm text-muted-foreground">Emotional support</p>
                        <Button variant="outline" size="sm" className="mt-3 rounded-full">
                          Resources
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="rounded-xl bg-maternal/10 p-4">
                    <h4 className="font-medium text-foreground">Traditional Maternal Care</h4>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      Explore traditional practices for maternal health including Ayurvedic 
                      postpartum care, nutritious recipes, and gentle recovery methods passed 
                      down through generations.
                    </p>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </section>
    </main>
  )
}
