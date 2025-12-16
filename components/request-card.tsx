"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Check, X, Eye, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface RequestCardProps {
  id: number
  user: {
    name: string
    email: string
  }
  type: string
  subject: string
  message: string
  attachments?: string[]
  status: "pending" | "approved" | "rejected"
  priority: "high" | "medium" | "low"
  time: string
}

export function RequestCard({
  id,
  user,
  type,
  subject,
  message,
  attachments,
  status,
  priority,
  time,
}: RequestCardProps) {
  return (
    <Card className="neon-border hover:neon-glow transition-all">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Avatar className="h-10 w-10 border neon-border">
                <AvatarFallback className="bg-secondary">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{user.name}</p>
                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge
                variant={priority === "high" ? "destructive" : priority === "medium" ? "secondary" : "outline"}
                className="text-xs"
              >
                {priority}
              </Badge>
              <Badge
                variant={status === "approved" ? "default" : status === "pending" ? "secondary" : "destructive"}
                className={status === "approved" ? "bg-primary text-primary-foreground" : ""}
              >
                {status}
              </Badge>
            </div>
          </div>

          {/* Type & Subject */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">{type}</span>
            </div>
            <h3 className="font-semibold text-lg">{subject}</h3>
          </div>

          {/* Message */}
          <p className="text-sm text-muted-foreground line-clamp-2">{message}</p>

          {/* Details */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{time}</span>
            {attachments && attachments.length > 0 && (
              <span className="text-xs text-muted-foreground">{attachments.length} attachment(s)</span>
            )}
          </div>

          {/* Attachments */}
          {attachments && attachments.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full neon-border bg-transparent">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details & Attachments
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl neon-border">
                <DialogHeader>
                  <DialogTitle>{subject}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Message</h4>
                    <p className="text-sm text-muted-foreground">{message}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Attachments</h4>
                    <div className="grid gap-2">
                      {attachments.map((attachment, index) => (
                        <img
                          key={index}
                          src={attachment || "/placeholder.svg"}
                          alt={`Attachment ${index + 1}`}
                          className="w-full rounded-lg border neon-border"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Actions */}
          {status === "pending" && (
            <div className="flex gap-2">
              <Button className="flex-1 neon-glow" size="sm">
                <Check className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button variant="destructive" className="flex-1" size="sm">
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
