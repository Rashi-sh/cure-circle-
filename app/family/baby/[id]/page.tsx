"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState, use } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Baby, 
  FileText, 
  Leaf, 
  Calendar, 
  Droplet, 
  ArrowLeft,
  Activity,
  Stethoscope,
  Moon,
  Utensils,
  Milestone,
  Syringe,
  Heart,
  Hand,
  Upload
} from "lucide-react"
import Link from "next/link"
import type { FamilyMember } from "@/lib/types"

interface BabyPageProps {
  params: Promise<{
    id: string
  }>
}

export default function BabyPage({ params }: BabyPageProps) {
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

  // Calculate baby age
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let years = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      years--
    }
    
    const months = monthDiff < 0 ? 12 + monthDiff : monthDiff
    return { years, months }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )
  }

  if (!isPatient || !familyMember) {
    return (
      <main className="min-h-screen bg-blue-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Profile not found</p>
          <Button asChild className="mt-4 rounded-full">
            <Link href="/family">Back to Family</Link>
          </Button>
        </div>
      </main>
    )
  }

  const age = calculateAge(familyMember.dateOfBirth)

  return (
    <main className="min-h-screen bg-blue-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-400 py-8 lg:py-12">
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
                <Baby className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white lg:text-3xl">
                  {familyMember.name}
                </h1>
                <p className="text-white/90">Baby Development Profile</p>
              </div>
            </div>
            <Badge className="bg-white text-blue-500">Baby</Badge>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-3 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date of Birth</p>
                  <p className="font-semibold text-foreground">{familyMember.dateOfBirth}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-3 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Baby className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Age</p>
                  <p className="font-semibold text-foreground">
                    {age.years > 0 ? `${age.years}y ${age.months}m` : `${age.months} months`}
                  </p>
                </div>
              </CardContent>
            </Card>

            {familyMember.bloodGroup && (
              <Card className="border-0 shadow-sm">
                <CardContent className="flex items-center gap-3 pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <Droplet className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Blood Group</p>
                    <p className="font-semibold text-foreground">{familyMember.bloodGroup}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Main Tabs */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <Card className="border-0 shadow-sm">
            <Tabs defaultValue="tracking" className="w-full">
              <TabsList className="grid w-full grid-cols-3 border-b bg-blue-50 p-1">
                <TabsTrigger 
                  value="tracking" 
                  className="gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
                >
                  <Activity className="h-4 w-4" />
                  <span className="hidden sm:inline">Tracking</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="medical" 
                  className="gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
                >
                  <Stethoscope className="h-4 w-4" />
                  <span className="hidden sm:inline">Medical Care</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="traditional" 
                  className="gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
                >
                  <Leaf className="h-4 w-4" />
                  <span className="hidden sm:inline">Traditional Care</span>
                </TabsTrigger>
              </TabsList>

              {/* Tracking Tab */}
              <TabsContent value="tracking" className="mt-0">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg">Development Tracking</CardTitle>
                  <CardDescription>Track growth, feeding, sleep, and milestones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-dashed">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-100">
                          <Activity className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Growth Tracker</h4>
                          <p className="text-sm text-muted-foreground">Height, weight, head circumference</p>
                        </div>
                        <Button size="sm" variant="outline" className="rounded-full">
                          Track
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-dashed">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100">
                          <Utensils className="h-6 w-6 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Feeding Log</h4>
                          <p className="text-sm text-muted-foreground">Breastfeeding, formula, solids</p>
                        </div>
                        <Button size="sm" variant="outline" className="rounded-full">
                          Log
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-dashed">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-purple-100">
                          <Moon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Sleep Tracker</h4>
                          <p className="text-sm text-muted-foreground">Naps and nighttime sleep</p>
                        </div>
                        <Button size="sm" variant="outline" className="rounded-full">
                          Track
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-dashed">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100">
                          <Milestone className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Milestones</h4>
                          <p className="text-sm text-muted-foreground">Developmental achievements</p>
                        </div>
                        <Button size="sm" variant="outline" className="rounded-full">
                          View
                        </Button>
                      </CardContent>
                    </Card>
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
                  <CardDescription>Vaccinations, pediatric consults, and health records</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-dashed">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                          <Syringe className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-medium">Vaccinations</h4>
                        <p className="text-sm text-muted-foreground">Track immunizations</p>
                        <Button variant="outline" size="sm" className="mt-3 rounded-full">
                          View Schedule
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-dashed">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                          <Stethoscope className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-medium">Pediatric Consults</h4>
                        <p className="text-sm text-muted-foreground">Doctor visits</p>
                        <Button variant="outline" size="sm" className="mt-3 rounded-full" asChild>
                          <Link href="/consult">Book Consult</Link>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-dashed">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                          <Heart className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-medium">Illness History</h4>
                        <p className="text-sm text-muted-foreground">Past health issues</p>
                        <Button variant="outline" size="sm" className="mt-3 rounded-full">
                          View History
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Documents */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Medical Documents</h4>
                      <Button size="sm" variant="outline" className="rounded-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    </div>
                    <div className="rounded-xl border border-dashed border-blue-200 bg-blue-50 p-6 text-center">
                      <FileText className="mx-auto mb-2 h-8 w-8 text-blue-400" />
                      <p className="text-sm text-muted-foreground">No documents uploaded yet</p>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>

              {/* Traditional Care Tab */}
              <TabsContent value="traditional" className="mt-0">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg">Traditional Baby Care</CardTitle>
                  <CardDescription>Oil massage, safe remedies, and feeding guidance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-dashed">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                          <Hand className="h-6 w-6 text-amber-600" />
                        </div>
                        <h4 className="font-medium">Oil Massage</h4>
                        <p className="text-sm text-muted-foreground">Traditional malish</p>
                        <Button variant="outline" size="sm" className="mt-3 rounded-full">
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-dashed">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                          <Leaf className="h-6 w-6 text-green-600" />
                        </div>
                        <h4 className="font-medium">Safe Remedies</h4>
                        <p className="text-sm text-muted-foreground">Age-appropriate care</p>
                        <Button variant="outline" size="sm" className="mt-3 rounded-full" asChild>
                          <Link href="/remedies">View Remedies</Link>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-dashed">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                          <Utensils className="h-6 w-6 text-orange-600" />
                        </div>
                        <h4 className="font-medium">Feeding Guidance</h4>
                        <p className="text-sm text-muted-foreground">Nutrition tips</p>
                        <Button variant="outline" size="sm" className="mt-3 rounded-full">
                          View Guide
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="rounded-xl bg-blue-100 p-4">
                    <h4 className="font-medium text-foreground">Traditional Baby Care</h4>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      Explore time-tested traditional practices for baby care including 
                      oil massage techniques, safe home remedies for common baby ailments, 
                      and traditional feeding guidance passed down through generations.
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
