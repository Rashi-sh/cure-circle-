"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react"
import type { Notification, NotificationType } from "./types"
import { mockNotifications } from "./mock-data"
import { useAuth } from "./auth-context"

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "isRead">) => void
  markAsRead: (notificationId: string) => void
  markAllAsRead: () => void
  clearNotification: (notificationId: string) => void
  clearAllNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

const NOTIFICATION_STORAGE_KEY = "curecircle_notifications"

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Load notifications when user changes
  useEffect(() => {
    if (user) {
      // Load from localStorage or use mock data
      const stored = localStorage.getItem(`${NOTIFICATION_STORAGE_KEY}_${user.id}`)
      if (stored) {
        try {
          setNotifications(JSON.parse(stored))
        } catch {
          // Fallback to mock data filtered by user
          const userNotifications = mockNotifications.filter(n => n.userId === user.id)
          setNotifications(userNotifications)
        }
      } else {
        // Use mock data for user
        const userNotifications = mockNotifications.filter(n => n.userId === user.id)
        setNotifications(userNotifications)
      }
    } else {
      setNotifications([])
    }
  }, [user])

  // Persist notifications
  const persistNotifications = useCallback((notifs: Notification[]) => {
    if (user) {
      localStorage.setItem(`${NOTIFICATION_STORAGE_KEY}_${user.id}`, JSON.stringify(notifs))
    }
  }, [user])

  const unreadCount = notifications.filter(n => !n.isRead).length

  const addNotification = useCallback((notification: Omit<Notification, "id" | "createdAt" | "isRead">) => {
    if (!user) return

    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isRead: false,
    }

    setNotifications(prev => {
      const updated = [newNotification, ...prev]
      persistNotifications(updated)
      return updated
    })
  }, [user, persistNotifications])

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
      persistNotifications(updated)
      return updated
    })
  }, [persistNotifications])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, isRead: true }))
      persistNotifications(updated)
      return updated
    })
  }, [persistNotifications])

  const clearNotification = useCallback((notificationId: string) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== notificationId)
      persistNotifications(updated)
      return updated
    })
  }, [persistNotifications])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
    if (user) {
      localStorage.removeItem(`${NOTIFICATION_STORAGE_KEY}_${user.id}`)
    }
  }, [user])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

// Helper to get notification icon and color based on type
export function getNotificationStyle(type: NotificationType): { icon: string; color: string } {
  switch (type) {
    case "booking":
      return { icon: "calendar", color: "text-blue-600" }
    case "confirmation":
      return { icon: "check-circle", color: "text-green-600" }
    case "cancellation":
      return { icon: "x-circle", color: "text-red-600" }
    case "payment":
      return { icon: "credit-card", color: "text-emerald-600" }
    case "remedy_approval":
      return { icon: "badge-check", color: "text-primary" }
    case "appointment_reminder":
      return { icon: "bell", color: "text-amber-600" }
    case "general":
    default:
      return { icon: "info", color: "text-muted-foreground" }
  }
}
