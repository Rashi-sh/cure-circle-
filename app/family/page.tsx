"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, Baby, ArrowRight, Plus } from "lucide-react"
import Link from "next/link"

export default function FamilyPage() {
  const { patientProfile } = useAuth()

  // Get mom and baby members from family
  const momMembers = patientProfile.familyMembers?.filter(m => m.type === "mom") || []
  const babyMembers = patientProfile.familyMembers?.filter(m => m.type === "baby") || []

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-maternal to-maternal/80 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20">
              <Users className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white lg:text-3xl">
                Family Health Hub
              </h1>
              <p className="text-white/90">
                Manage health profiles for mom and baby
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Selection */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-semibold text-foreground">Select a Profile to View</h2>
            <p className="mt-2 text-muted-foreground">
              Track health information separately for mom and baby
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {/* Mom Profile Card */}
            <Card className="group border-0 shadow-md transition-all hover:shadow-lg hover:ring-2 hover:ring-maternal/30">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-maternal/10">
                    <Heart className="h-7 w-7 text-maternal" />
                  </div>
                  <Badge className="bg-maternal/20 text-maternal">
                    {momMembers.length} profile{momMembers.length !== 1 ? "s" : ""}
                  </Badge>
                </div>
                <CardTitle className="mt-4 text-xl">Mom Profiles</CardTitle>
                <CardDescription>
                  Track pregnancy, postpartum recovery, maternal health, and wellness
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {momMembers.length > 0 ? (
                  <div className="space-y-2">
                    {momMembers.map((member) => (
                      <Link
                        key={member.id}
                        href={`/family/mom/${member.id}`}
                        className="flex items-center justify-between rounded-xl bg-maternal/5 p-3 transition-colors hover:bg-maternal/10"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-maternal/20">
                            <Heart className="h-5 w-5 text-maternal" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{member.name}</p>
                            <p className="text-xs text-muted-foreground">
                              DOB: {member.dateOfBirth}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-maternal" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-maternal/30 bg-maternal/5 p-6 text-center">
                    <p className="text-sm text-muted-foreground">No mom profiles yet</p>
                  </div>
                )}
                <Button
                  className="w-full gap-2 rounded-full bg-maternal text-white hover:bg-maternal/90"
                  variant="default"
                >
                  <Plus className="h-4 w-4" />
                  Add Mom Profile
                </Button>
              </CardContent>
            </Card>

            {/* Baby Profile Card */}
            <Card className="group border-0 shadow-md transition-all hover:shadow-lg hover:ring-2 hover:ring-blue-400/30">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10">
                    <Baby className="h-7 w-7 text-blue-500" />
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-600">
                    {babyMembers.length} profile{babyMembers.length !== 1 ? "s" : ""}
                  </Badge>
                </div>
                <CardTitle className="mt-4 text-xl">Baby Profiles</CardTitle>
                <CardDescription>
                  Track growth, milestones, vaccinations, feeding, and development
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {babyMembers.length > 0 ? (
                  <div className="space-y-2">
                    {babyMembers.map((member) => (
                      <Link
                        key={member.id}
                        href={`/family/baby/${member.id}`}
                        className="flex items-center justify-between rounded-xl bg-blue-50 p-3 transition-colors hover:bg-blue-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                            <Baby className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{member.name}</p>
                            <p className="text-xs text-muted-foreground">
                              DOB: {member.dateOfBirth}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-blue-500" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-blue-300 bg-blue-50 p-6 text-center">
                    <p className="text-sm text-muted-foreground">No baby profiles yet</p>
                  </div>
                )}
                <Button
                  className="w-full gap-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                  variant="default"
                >
                  <Plus className="h-4 w-4" />
                  Add Baby Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <div className="mx-auto mt-8 max-w-4xl">
            <Card className="border-0 bg-gradient-to-br from-maternal/10 to-blue-500/10">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white">
                    <Users className="h-6 w-6 text-maternal" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">About Family Profiles</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      Create separate health profiles for family members. Each profile tracks 
                      health information independently - from pregnancy tracking and maternal 
                      wellness for moms to growth milestones and vaccinations for babies. 
                      Share profiles with doctors during consultations for better care.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
