"use client"

import type { PatientProfile } from "@/lib/types"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Upload, Trash2 } from "lucide-react"

interface HealthVaultTabProps {
  patient: PatientProfile
}

export function HealthVaultTab({ patient }: HealthVaultTabProps) {
  return (
    <>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Health Vault</CardTitle>
            <CardDescription>Securely store and manage your medical documents</CardDescription>
          </div>
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Upload Area */}
        <div className="mb-8">
          <div className="rounded-lg border-2 border-dashed border-border/50 bg-secondary/20 p-8 text-center">
            <Upload className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
            <h3 className="mb-1 font-semibold text-foreground">Upload Medical Documents</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Drag and drop your files here, or click to select files
            </p>
            <Button variant="outline">Select Files</Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Supported formats: PDF, JPG, PNG, DOCX (Max 10MB each)
            </p>
          </div>
        </div>

        {/* Document Categories */}
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 font-semibold text-foreground">Medical Reports</h3>
            <div className="rounded-lg border border-border/50 bg-secondary/5 p-4 text-center text-muted-foreground">
              <FileText className="mx-auto mb-2 h-8 w-8" />
              <p className="text-sm">No reports uploaded yet</p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-foreground">Prescriptions</h3>
            <div className="rounded-lg border border-border/50 bg-secondary/5 p-4 text-center text-muted-foreground">
              <FileText className="mx-auto mb-2 h-8 w-8" />
              <p className="text-sm">No prescriptions uploaded yet</p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-foreground">Test Results</h3>
            <div className="rounded-lg border border-border/50 bg-secondary/5 p-4 text-center text-muted-foreground">
              <FileText className="mx-auto mb-2 h-8 w-8" />
              <p className="text-sm">No test results uploaded yet</p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm text-muted-foreground">
            Your documents are encrypted and securely stored. You can share them with doctors during consultations for better care.
          </p>
        </div>
      </CardContent>
    </>
  )
}
