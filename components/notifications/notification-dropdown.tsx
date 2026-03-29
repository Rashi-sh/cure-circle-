"use client"

import { useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import {
  Bell,
  Calendar,
  CheckCircle,
  XCircle,
  CreditCard,
  BadgeCheck,
  Info,
  Check,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useNotifications } from "@/lib/notification-context"
import type { NotificationType } from "@/lib/types"

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "booking":
      return <Calendar className="h-4 w-4 text-blue-600" />
    case "confirmation":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "cancellation":
      return <XCircle className="h-4 w-4 text-red-600" />
    case "payment":
      return <CreditCard className="h-4 w-4 text-emerald-600" />
    case "remedy_approval":
      return <BadgeCheck className="h-4 w-4 text-primary" />
    case "appointment_reminder":
      return <Bell className="h-4 w-4 text-amber-600" />
    case "general":
    default:
      return <Info className="h-4 w-4 text-muted-foreground" />
  }
}

export function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification } = useNotifications()
  const [open, setOpen] = useState(false)

  const handleNotificationClick = (notificationId: string) => {
    markAsRead(notificationId)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full"
          aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 sm:w-96">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1 text-xs text-primary hover:text-primary/80"
              onClick={() => markAllAsRead()}
            >
              <Check className="mr-1 h-3 w-3" />
              Mark all read
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Bell className="mb-2 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="flex flex-col">
              {notifications.map((notification) => (
                <div key={notification.id}>
                  <DropdownMenuItem
                    className={cn(
                      "flex cursor-pointer flex-col items-start gap-1 p-4 focus:bg-secondary/50",
                      !notification.isRead && "bg-primary/5"
                    )}
                    onClick={() => handleNotificationClick(notification.id)}
                    asChild={!!notification.link}
                  >
                    {notification.link ? (
                      <Link href={notification.link} onClick={() => setOpen(false)}>
                        <div className="flex w-full gap-3">
                          <div className="mt-0.5 shrink-0">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className={cn(
                                "text-sm leading-tight",
                                !notification.isRead && "font-medium"
                              )}>
                                {notification.title}
                              </p>
                              {!notification.isRead && (
                                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground/70">
                              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="flex w-full gap-3">
                        <div className="mt-0.5 shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className={cn(
                              "text-sm leading-tight",
                              !notification.isRead && "font-medium"
                            )}>
                              {notification.title}
                            </p>
                            {!notification.isRead && (
                              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground/70">
                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-0" />
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
