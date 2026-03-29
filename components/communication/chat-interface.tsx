"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface ChatInterfaceProps {
  appointmentId?: string
  doctorName?: string
  patientName?: string
  isDoctor?: boolean
  onClose?: () => void
}

interface Message {
  id: string
  sender: "doctor" | "patient"
  content: string
  timestamp: Date
}

export function ChatInterface({
  appointmentId,
  doctorName = "Dr. Healthcare",
  patientName = "You",
  isDoctor = false,
  onClose,
}: ChatInterfaceProps = {}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "doctor",
      content: "Hello! How can I help you today?",
      timestamp: new Date(Date.now() - 5 * 60000),
    },
    {
      id: "2",
      sender: "patient",
      content: "Hi doctor, I've been experiencing some symptoms lately",
      timestamp: new Date(Date.now() - 3 * 60000),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: isDoctor ? "doctor" : "patient",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setInputValue("")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <Card className="h-full flex flex-col rounded-lg">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Chat Consultation</CardTitle>
            <CardDescription>
              With {isDoctor ? patientName : doctorName}
            </CardDescription>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-lg"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                isDoctor && message.sender === "doctor"
                  ? "justify-end"
                  : !isDoctor && message.sender === "patient"
                    ? "justify-end"
                    : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-xs rounded-lg px-4 py-2",
                  isDoctor && message.sender === "doctor"
                    ? "bg-primary text-primary-foreground"
                    : !isDoctor && message.sender === "patient"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                )}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="rounded-lg"
          />
          <Button
            type="submit"
            disabled={!inputValue.trim()}
            size="icon"
            className="rounded-lg"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  )
}
