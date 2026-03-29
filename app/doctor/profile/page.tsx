"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BadgeCheck,
  MapPin,
  Stethoscope,
  Building,
  Award,
  Phone,
  Mail,
  FileText,
  Save,
  AlertTriangle,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

const specializations = [
  "Ayurveda",
  "Homeopathy",
  "Allopathy",
  "Naturopathy",
  "Unani",
  "Siddha",
  "General Medicine",
  "Pediatrics",
  "Gynecology",
  "Dermatology",
  "Cardiology",
  "Orthopedics",
  "Neurology",
  "Psychiatry",
]

export default function DoctorProfilePage() {
  const { doctorProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: doctorProfile?.name || "",
    specialization: doctorProfile?.specialization || "",
    clinicName: doctorProfile?.clinicName || "",
    yearsExperience: doctorProfile?.yearsExperience || 0,
    location: doctorProfile?.location || "",
    phone: doctorProfile?.phone || "",
    bio: doctorProfile?.bio || "",
    consultationFee: doctorProfile?.consultationFee || 0,
  })

  const handleSave = () => {
    // In a real app, this would update the profile in the database
    toast.success("Profile updated successfully")
    setIsEditing(false)
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
            My Profile
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your professional profile
          </p>
        </div>
        <Button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="rounded-full"
        >
          {isEditing ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          ) : (
            "Edit Profile"
          )}
        </Button>
      </div>

      {/* Verification Status */}
      {!doctorProfile?.isVerified && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-warning bg-warning/10 p-4">
          <AlertTriangle className="h-5 w-5 shrink-0 text-warning-foreground" />
          <div>
            <p className="font-medium text-foreground">Verification Pending</p>
            <p className="text-sm text-muted-foreground">
              Your profile is being reviewed by our team. Complete your profile to speed up verification.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Summary Card */}
        <Card className="border-border lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                <Stethoscope className="h-12 w-12 text-primary" />
              </div>

              {/* Name and Badge */}
              <div className="mt-4 flex items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">
                  {doctorProfile?.name}
                </h2>
                {doctorProfile?.isVerified && (
                  <BadgeCheck className="h-5 w-5 text-primary" />
                )}
              </div>

              {/* Specialization */}
              <Badge className="mt-2 rounded-full bg-primary/10 text-primary">
                {doctorProfile?.specialization}
              </Badge>

              {/* Status */}
              <Badge
                variant="outline"
                className={`mt-3 rounded-full ${
                  doctorProfile?.isVerified
                    ? "border-green-300 bg-green-50 text-green-700"
                    : "border-amber-300 bg-amber-50 text-amber-700"
                }`}
              >
                {doctorProfile?.isVerified ? "Verified Doctor" : "Pending Verification"}
              </Badge>

              {/* Quick Info */}
              <div className="mt-6 w-full space-y-3 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {doctorProfile?.clinicName}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {doctorProfile?.location}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {doctorProfile?.yearsExperience} years experience
                  </span>
                </div>
                {doctorProfile?.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {doctorProfile.phone}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {doctorProfile?.email}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    License: {doctorProfile?.licenseNumber}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card className="border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Select
                  value={formData.specialization}
                  onValueChange={(value) =>
                    setFormData({ ...formData, specialization: value })
                  }
                  disabled={!isEditing}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clinic">Clinic/Hospital Name</Label>
                <Input
                  id="clinic"
                  value={formData.clinicName}
                  onChange={(e) =>
                    setFormData({ ...formData, clinicName: e.target.value })
                  }
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.yearsExperience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      yearsExperience: parseInt(e.target.value) || 0,
                    })
                  }
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fee">Consultation Fee (INR)</Label>
                <Input
                  id="fee"
                  type="number"
                  value={formData.consultationFee}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      consultationFee: parseInt(e.target.value) || 0,
                    })
                  }
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio / About</Label>
              <Textarea
                id="bio"
                placeholder="Tell patients about your expertise, approach, and experience..."
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                disabled={!isEditing}
                className="min-h-[120px] rounded-xl"
              />
            </div>

            {isEditing && (
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    setIsEditing(false)
                    // Reset form data
                    setFormData({
                      name: doctorProfile?.name || "",
                      specialization: doctorProfile?.specialization || "",
                      clinicName: doctorProfile?.clinicName || "",
                      yearsExperience: doctorProfile?.yearsExperience || 0,
                      location: doctorProfile?.location || "",
                      phone: doctorProfile?.phone || "",
                      bio: doctorProfile?.bio || "",
                      consultationFee: doctorProfile?.consultationFee || 0,
                    })
                  }}
                >
                  Cancel
                </Button>
                <Button className="rounded-full" onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Public Profile Preview */}
      <Card className="mt-6 border-border">
        <CardHeader>
          <CardTitle className="text-lg">Public Profile Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-dashed border-border bg-secondary/30 p-6">
            <p className="text-center text-sm text-muted-foreground">
              This is how your profile appears to patients on the consultation page.
              {!doctorProfile?.isVerified && (
                <span className="mt-1 block text-amber-600">
                  Note: Your profile will only be visible after verification.
                </span>
              )}
            </p>
            {doctorProfile?.isVerified && (
              <div className="mt-4 flex items-center justify-center">
                <Badge className="gap-1 rounded-full bg-green-100 text-green-700">
                  <BadgeCheck className="h-3 w-3" />
                  Verified Doctor
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
