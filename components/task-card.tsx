"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle, XCircle, Edit } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Task } from "@/types/task.types";
import { TaskStatus } from "@/views/task/types";

interface TaskCardProps {
  taskDetail: Task;
}

export function TaskCard({ taskDetail }: TaskCardProps) {
  const { task, user, expiresAt } = taskDetail;
  return (
    <Card className="neon-border hover:neon-glow transition-all">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{task?.title}</h3>
              <p className="text-sm text-muted-foreground">
                {task?.description}
              </p>
            </div>
            <Badge
              variant={
                task?.status === TaskStatus.COMPLETED
                  ? "default"
                  : task?.status === TaskStatus.PENDING
                  ? "secondary"
                  : "destructive"
              }
              className={
                task?.status === TaskStatus.COMPLETED
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              {task.status}
            </Badge>
          </div>

          {/* Assigned User */}
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border neon-border">
              <AvatarFallback className="bg-secondary text-xs">
                {user?.firstName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user?.firstName}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          {/* Progress */}
          {/* <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div> */}

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Reward</span>
              <p className="font-semibold text-primary">0.0025</p>
            </div>
            <div>
              <span className="text-muted-foreground">Deadline</span>
              <p className="font-medium">{expiresAt}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 neon-border bg-transparent"
            >
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
  );
}
