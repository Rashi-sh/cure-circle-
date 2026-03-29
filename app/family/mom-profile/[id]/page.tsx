"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Heart, FileText, Leaf, Calendar, Droplet } from "lucide-react"
import Link from "next/link"
import type { FamilyMember } from "@/lib/types"

interface MomProfilePageProps {
  params: {
    id: string
  }
}

export default function MomProfilePage({ params }: MomProfilePageProps) {
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
      const member = patientProfile.familyMembers.find((m) => m.id === params.id)
      setFamilyMember(member || null)
    }
  }, [patientProfile, params.id])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!isPatient || !familyMember) {
    return null
  }

  return (
    <main className="bg-maternal/10">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-maternal to-maternal/80 py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white lg:text-3xl">
                    {familyMember.name}&apos;s Profile
                  </h1>
                  <p className="text-white/90">Mother Health Tracking</p>
                </div>
              </div>
              <Badge className="bg-white text-maternal">Mother</Badge>
            </div>
          </div>
        </section>

        {/* Basic Info Cards */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-maternal/10">
                      <Calendar className="h-5 w-5 text-maternal" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Date of Birth</p>
                      <p className="font-semibold text-foreground">{familyMember.dateOfBirth}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {familyMember.bloodGroup && (
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-maternal/10">
                        <Droplet className="h-5 w-5 text-maternal" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Blood Group</p>
                        <p className="font-semibold text-foreground">{familyMember.bloodGroup}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-maternal/10">
                      <Heart className="h-5 w-5 text-maternal" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Profile Created</p>
                      <p className="font-semibold text-foreground">
                        {new Date(familyMember.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Card className="mt-8 border-0 shadow-sm">
              <Tabs defaultValue="medical" className="w-full">
                <TabsList className="grid w-full grid-cols-3 border-b bg-maternal/5 p-1 lg:grid-cols-3">
                  <TabsTrigger value="medical" className="gap-2 data-[state=active]:bg-maternal/20 data-[state=active]:text-maternal">
                    <Heart className="h-4 w-4" />
                    <span className="hidden sm:inline">Medical</span>
                  </TabsTrigger>
                  <TabsTrigger value="vault" className="gap-2 data-[state=active]:bg-maternal/20 data-[state=active]:text-maternal">
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Documents</span>
                  </TabsTrigger>
                  <TabsTrigger value="remedies" className="gap-2 data-[state=active]:bg-maternal/20 data-[state=active]:text-maternal">
                    <Leaf className="h-4 w-4" />
                    <span className="hidden sm:inline">Remedies</span>
                  </TabsTrigger>
                </TabsList>

                {/* Medical Tab */}
                <TabsContent value="medical" className="mt-0">
                  <CardHeader className="border-b">
                    <CardTitle className="text-lg">Medical Information</CardTitle>
                    <CardDescription>Health conditions and allergies</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    <div>
                      <h3 className="mb-3 font-semibold">Allergies</h3>
                      {familyMember.allergies && familyMember.allergies.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {familyMember.allergies.map((allergy, idx) => (
                            <Badge key={idx} className="bg-maternal/20 text-maternal-foreground">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No allergies recorded</p>
                      )}
                    </div>

                    <div>
                      <h3 className="mb-3 font-semibold">Medical Conditions</h3>
                      {familyMember.medicalHistory && familyMember.medicalHistory.length > 0 ? (
                        <ul className="space-y-2">
                          {familyMember.medicalHistory.map((condition, idx) => (
                            <li key={idx} className="flex items-start gap-2 rounded-lg bg-maternal/5 p-3">
                              <span className="mt-1 h-2 w-2 rounded-full bg-maternal flex-shrink-0"></span>
                              <span className="text-sm text-muted-foreground">{condition}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">No conditions recorded</p>
                      )}
                    </div>
                  </CardContent>
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="vault" className="mt-0">
                  <CardHeader className="border-b">
                    <CardTitle className="text-lg">Medical Documents</CardTitle>
                    <CardDescription>Uploaded reports, prescriptions, and test results</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="rounded-lg border border-maternal/20 bg-maternal/5 p-8 text-center">
                      <FileText className="mx-auto mb-3 h-12 w-12 text-maternal/50" />
                      <p className="text-sm text-muted-foreground">No documents uploaded yet</p>
                      <Button className="mt-4 rounded-full bg-maternal text-white hover:bg-maternal/90">
                        Upload Document
                      </Button>
                    </div>
                  </CardContent>
                </TabsContent>

                {/* Remedies Tab */}
                <TabsContent value="remedies" className="mt-0">
                  <CardHeader className="border-b">
                    <CardTitle className="text-lg">Recommended Remedies</CardTitle>
                    <CardDescription>Traditional and doctor-approved remedies for mother's health</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="rounded-lg border border-maternal/20 bg-maternal/5 p-8 text-center">
                      <Leaf className="mx-auto mb-3 h-12 w-12 text-maternal/50" />
                      <p className="text-sm text-muted-foreground">No remedies recommended yet</p>
                      <Button className="mt-4 rounded-full bg-maternal text-white hover:bg-maternal/90" asChild>
                        <Link href="/remedies">Explore Remedies</Link>
                      </Button>
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
}
