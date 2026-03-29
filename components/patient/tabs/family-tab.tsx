"use client"

import type { PatientProfile } from "@/lib/types"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, ArrowRight } from "lucide-react"
import Link from "next/link"

interface FamilyTabProps {
  patient: PatientProfile
}

export function FamilyTab({ patient }: FamilyTabProps) {
  const familyMembers = patient.familyMembers || []

  return (
    <>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Family & Mom-Baby Care</CardTitle>
            <CardDescription>Manage family member profiles and health information</CardDescription>
          </div>
          <Button className="gap-2" asChild>
            <Link href="/family/manage">
              <Plus className="h-4 w-4" />
              Manage Family
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {familyMembers.length > 0 ? (
          <div className="grid gap-4">
            {familyMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/5 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    {member.type === "mom" ? (
                      <Users className="h-6 w-6 text-primary" />
                    ) : (
                      <Users className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{member.name}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {member.type === "mom" ? "Mother" : "Baby"}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        DOB: {member.dateOfBirth}
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="gap-2"
                >
                  <Link href={`/family/${member.type}-profile/${member.id}`}>
                    View
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border/50 bg-secondary/5 p-8 text-center">
            <Users className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
            <h3 className="mb-1 font-semibold text-foreground">No Family Members Added</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Create profiles for family members to track their health information
            </p>
            <Button asChild>
              <Link href="/family/manage" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Family Member
              </Link>
            </Button>
          </div>
        )}

        {/* Mom & Baby Hub CTA */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
          <h4 className="mb-2 font-semibold text-foreground">Pregnancy & Baby Care</h4>
          <p className="mb-4 text-sm text-muted-foreground">
            Access specialized resources for pregnancy care, baby development, and traditional remedies for Mom and Baby.
          </p>
          <Button variant="outline" asChild className="gap-2">
            <Link href="/mom-baby-hub">
              Explore Mom & Baby Hub
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </>
  )
}
