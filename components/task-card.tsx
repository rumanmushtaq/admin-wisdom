"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle, XCircle, Edit } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface TaskCardProps {
  id: number
  title: string
  description: string
  assignedTo: {
    name: string
    email: string
  }
  status: "pending" | "completed" | "rejected"
  progress: number
  reward: string
  deadline: string
}

export function TaskCard({ id, title, description, assignedTo, status, progress, reward, deadline }: TaskCardProps) {
  return (
    <Card className="neon-border hover:neon-glow transition-all">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Badge
              variant={status === "completed" ? "default" : status === "pending" ? "secondary" : "destructive"}
              className={status === "completed" ? "bg-primary text-primary-foreground" : ""}
            >
              {status}
            </Badge>
          </div>

          {/* Assigned User */}
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border neon-border">
              <AvatarFallback className="bg-secondary text-xs">
                {assignedTo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{assignedTo.name}</p>
              <p className="text-xs text-muted-foreground">{assignedTo.email}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Reward</span>
              <p className="font-semibold text-primary">{reward}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Deadline</span>
              <p className="font-medium">{deadline}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 neon-border bg-transparent">
              <Edit className="mr-2 h-3 w-3" />
              Edit
            </Button>
            <Button className="flex-1 neon-glow" size="sm">
              <CheckCircle className="mr-2 h-3 w-3" />
              Complete
            </Button>
            <Button variant="destructive" size="sm">
              <XCircle className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
