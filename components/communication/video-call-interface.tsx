"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  MessageSquare,
  Settings,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoCallInterfaceProps {
  appointmentId?: string
  doctorName?: string
  patientName?: string
  isDoctor?: boolean
  onClose?: () => void
  onOpenChat?: () => void
}

export function VideoCallInterface({
  appointmentId,
  doctorName = "Dr. Healthcare",
  patientName = "You",
  isDoctor = false,
  onClose,
  onOpenChat,
}: VideoCallInterfaceProps = {}) {
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [callDuration, setCallDuration] = useState(0)

  // Simulate call duration
  const handleEndCall = () => {
    if (onClose) {
      onClose()
    }
  }

  // Format duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="h-full flex flex-col rounded-lg overflow-hidden bg-black">
      <CardHeader className="border-b border-white/10 bg-black/50 backdrop-blur">
        <div className="flex items-center justify-between text-white">
          <div>
            <CardTitle className="text-white">Video Consultation</CardTitle>
            <CardDescription className="text-gray-300">
              With {isDoctor ? patientName : doctorName}
            </CardDescription>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-lg text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0 flex flex-col items-center justify-center relative bg-gradient-to-b from-gray-900 to-black">
        {/* Video placeholder */}
        <div className="w-full h-full flex items-center justify-center relative">
          {/* Remote video area */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center",
              "text-gray-400 text-center"
            )}
          >
            <div>
              <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4 flex items-center justify-center">
                <Video className="h-10 w-10" />
              </div>
              <p className="font-medium">{isDoctor ? patientName : doctorName}</p>
              <p className="text-sm text-gray-500 mt-2">
                {isVideoOn ? "Camera is on" : "Camera is off"}
              </p>
            </div>
          </div>

          {/* Local video preview */}
          <div className="absolute bottom-4 right-4 w-40 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border border-white/20 flex items-center justify-center shadow-lg">
            <div className="text-center text-gray-400">
              <div className="w-16 h-16 rounded-full bg-gray-600 mx-auto mb-2 flex items-center justify-center">
                <Video className="h-8 w-8" />
              </div>
              <p className="text-xs font-medium">You</p>
            </div>
          </div>

          {/* Call timer */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-4 py-2 rounded-full text-white font-mono text-lg">
            {formatDuration(callDuration)}
          </div>
        </div>
      </CardContent>

      {/* Controls */}
      <div className="border-t border-white/10 bg-black/50 backdrop-blur p-4">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsAudioOn(!isAudioOn)}
            className={cn(
              "rounded-full w-12 h-12",
              isAudioOn
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-red-500/20 text-red-500 hover:bg-red-500/30"
            )}
            title={isAudioOn ? "Turn off microphone" : "Turn on microphone"}
          >
            {isAudioOn ? (
              <Mic className="h-5 w-5" />
            ) : (
              <MicOff className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={cn(
              "rounded-full w-12 h-12",
              isVideoOn
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-red-500/20 text-red-500 hover:bg-red-500/30"
            )}
            title={isVideoOn ? "Turn off camera" : "Turn on camera"}
          >
            {isVideoOn ? (
              <Video className="h-5 w-5" />
            ) : (
              <VideoOff className="h-5 w-5" />
            )}
          </Button>

          {onOpenChat && (
            <Button
              variant="outline"
              size="icon"
              onClick={onOpenChat}
              className="rounded-full w-12 h-12 bg-white/10 text-white hover:bg-white/20"
              title="Open chat"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          )}

          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 bg-white/10 text-white hover:bg-white/20"
            title="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>

          <Button
            onClick={handleEndCall}
            className="rounded-full w-12 h-12 bg-red-500 hover:bg-red-600 text-white"
            size="icon"
            title="End call"
          >
            <Phone className="h-5 w-5" />
          </Button>
        </div>

        <Badge className="mt-4 w-full justify-center bg-white/10 text-white border-white/20">
          Connected - {formatDuration(callDuration)}
        </Badge>
      </div>
    </Card>
  )
}
