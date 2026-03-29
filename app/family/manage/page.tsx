"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, Edit2, Trash2, Heart } from "lucide-react"
import Link from "next/link"
import type { FamilyMember } from "@/lib/types"

export default function FamilyManagePage() {
  const router = useRouter()
  const { isLoading, isPatient, patientProfile } = useAuth()
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])

  useEffect(() => {
    if (!isLoading && !isPatient) {
      router.push("/")
    }
  }, [isLoading, isPatient, router])

  useEffect(() => {
    if (patientProfile?.familyMembers) {
      setFamilyMembers(patientProfile.familyMembers)
    }
  }, [patientProfile])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!isPatient) {
    return null
  }

  return (
    <main className="bg-maternal/10">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-maternal to-maternal/80 py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white lg:text-3xl">
                  Manage Family
                </h1>
                <p className="text-white/90">
                  Add and manage family member profiles
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4">
            {/* Add Member Button */}
            <div className="mb-8 flex justify-end">
              <Button className="gap-2 rounded-full bg-maternal text-white hover:bg-maternal/90">
                <Plus className="h-4 w-4" />
                Add Family Member
              </Button>
            </div>

            {/* Family Members Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {familyMembers.length > 0 ? (
                familyMembers.map((member) => (
                  <Card key={member.id} className="border-0 shadow-sm transition-all hover:shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-maternal text-white">
                            <Heart className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{member.name}</CardTitle>
                            <Badge className="mt-2 bg-maternal/20 text-maternal-foreground">
                              {member.type === "mom" ? "Mother" : "Baby"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="rounded-lg bg-secondary/50 p-3">
                        <p className="text-xs text-muted-foreground">Date of Birth</p>
                        <p className="font-medium">{member.dateOfBirth}</p>
                      </div>
                      {member.bloodGroup && (
                        <div className="rounded-lg bg-secondary/50 p-3">
                          <p className="text-xs text-muted-foreground">Blood Group</p>
                          <p className="font-medium">{member.bloodGroup}</p>
                        </div>
                      )}
                      <Button asChild className="mt-4 w-full rounded-lg bg-maternal text-white hover:bg-maternal/90">
                        <Link href={`/family/${member.type}-profile/${member.id}`}>
                          View Profile
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="col-span-full border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-maternal/10">
                      <Users className="h-8 w-8 text-maternal" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">No Family Members Yet</h3>
                    <p className="mb-6 max-w-sm text-sm text-muted-foreground">
                      Start by adding your first family member to track their health information and get personalized insights.
                    </p>
                    <Button className="gap-2 rounded-full bg-maternal text-white hover:bg-maternal/90">
                      <Plus className="h-4 w-4" />
                      Add Family Member
                    </Button>
                  </CardContent>
                </Card>
              )}
        </div>

            {/* Info Box */}
            <Card className="mt-8 border-0 bg-maternal/10 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <Heart className="h-5 w-5 shrink-0 text-maternal" />
                  <div>
                    <h3 className="font-semibold text-foreground">About Family Profiles</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Create separate profiles for family members like your mother, spouse, or children. Each profile has its own health records, medical history, and can be tracked independently for better family health management.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    )
  }
}
