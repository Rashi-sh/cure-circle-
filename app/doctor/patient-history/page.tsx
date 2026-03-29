"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, User, Calendar, FileText, ClipboardList, Pill } from "lucide-react"
import { mockConsultationRecords, mockPatients } from "@/lib/mock-data"

export default function PatientHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRecords = useMemo(() => {
    return mockConsultationRecords.filter(
      (record) =>
        record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  // Get patient name from ID
  const getPatientDetails = (patientId: string) => {
    return mockPatients.find((p) => p.id === patientId)
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
          Patient History
        </h1>
        <p className="mt-1 text-muted-foreground">
          View past consultations and treatment records
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by patient name or diagnosis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-full"
          />
        </div>
      </div>

      {/* Consultation Records */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Consultation Records</CardTitle>
            <Badge variant="outline" className="rounded-full">
              {filteredRecords.length} records
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {filteredRecords.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ClipboardList className="mb-2 h-12 w-12 text-muted-foreground/50" />
              <p className="text-lg font-medium text-foreground">
                No records found
              </p>
              <p className="text-muted-foreground">
                Try adjusting your search criteria
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRecords.map((record) => {
                const patient = getPatientDetails(record.patientId)
                return (
                  <div
                    key={record.id}
                    className="rounded-xl border border-border bg-card p-5 transition-colors hover:bg-secondary/30"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      {/* Patient Info */}
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {record.patientName}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(record.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                            {patient?.bloodGroup && (
                              <>
                                <span className="text-border">|</span>
                                <Badge
                                  variant="outline"
                                  className="rounded-full text-xs"
                                >
                                  {patient.bloodGroup}
                                </Badge>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Follow-up Badge */}
                      {record.followUpDate && (
                        <Badge
                          variant="secondary"
                          className="shrink-0 rounded-full"
                        >
                          Follow-up:{" "}
                          {new Date(record.followUpDate).toLocaleDateString()}
                        </Badge>
                      )}
                    </div>

                    {/* Details Grid */}
                    <div className="mt-4 grid gap-4 lg:grid-cols-3">
                      {/* Diagnosis */}
                      <div className="rounded-lg bg-secondary/50 p-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <FileText className="h-4 w-4 text-primary" />
                          Diagnosis
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {record.diagnosis}
                        </p>
                      </div>

                      {/* Prescription */}
                      <div className="rounded-lg bg-secondary/50 p-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <Pill className="h-4 w-4 text-green-600" />
                          Prescription
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {record.prescription || "No prescription"}
                        </p>
                      </div>

                      {/* Notes */}
                      <div className="rounded-lg bg-secondary/50 p-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <ClipboardList className="h-4 w-4 text-amber-600" />
                          Consultation Notes
                        </div>
                        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                          {record.consultationNotes}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
