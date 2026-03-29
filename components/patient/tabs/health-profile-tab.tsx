"use client"

import type { PatientProfile } from "@/lib/types"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit2 } from "lucide-react"

interface HealthProfileTabProps {
  patient: PatientProfile
}

export function HealthProfileTab({ patient }: HealthProfileTabProps) {
  return (
    <>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Health Profile</CardTitle>
            <CardDescription>Your medical history and health information</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Edit2 className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Blood Group */}
        <div>
          <h3 className="mb-3 font-semibold text-foreground">Blood Group</h3>
          <p className="text-base text-muted-foreground">
            {patient.bloodGroup || "Not provided"}
          </p>
        </div>

        {/* Allergies */}
        <div>
          <h3 className="mb-3 font-semibold text-foreground">Allergies</h3>
          {patient.allergies && patient.allergies.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {patient.allergies.map((allergy, idx) => (
                <Badge key={idx} variant="secondary">
                  {allergy}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No allergies recorded</p>
          )}
        </div>

        {/* Medical History */}
        <div>
          <h3 className="mb-3 font-semibold text-foreground">Medical History</h3>
          {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
            <ul className="space-y-2">
              {patient.medicalHistory.map((condition, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                  <span className="text-sm text-muted-foreground">{condition}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No medical conditions recorded</p>
          )}
        </div>

        {/* Additional Fields */}
        <div className="rounded-lg border border-border/50 bg-secondary/20 p-4">
          <p className="text-sm text-muted-foreground">
            For complete health information management, including medications, supplements, and detailed medical history, please update your profile.
          </p>
        </div>
      </CardContent>
    </>
  )
}
