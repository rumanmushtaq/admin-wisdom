"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentActivities = [
  {
    id: 1,
    user: "John Doe",
    action: "Deposit",
    amount: "$500",
    status: "pending",
    time: "2 minutes ago",
  },
  {
    id: 2,
    user: "Sarah Smith",
    action: "Withdrawal",
    amount: "$250",
    status: "approved",
    time: "15 minutes ago",
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "Task Completed",
    amount: "+50 points",
    status: "completed",
    time: "1 hour ago",
  },
  {
    id: 4,
    user: "Emily Brown",
    action: "Deposit",
    amount: "$1,000",
    status: "approved",
    time: "2 hours ago",
  },
  {
    id: 5,
    user: "David Lee",
    action: "Withdrawal",
    amount: "$750",
    status: "pending",
    time: "3 hours ago",
  },
]

export function RecentActivity() {
  return (
    <Card className="neon-border">
      <CardHeader>
        <CardTitle className="neon-text">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border neon-border">
                  <AvatarFallback className="bg-secondary text-foreground">
                    {activity.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{activity.user}</p>
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-primary">{activity.amount}</p>
                <Badge
                  variant={
                    activity.status === "approved" ? "default" : activity.status === "pending" ? "secondary" : "outline"
                  }
                  className="text-xs"
                >
                  {activity.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
