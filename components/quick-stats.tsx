"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  {
    title: "Today's Deposits",
    value: "$4,320",
    change: "+18%",
    isPositive: true,
  },
  {
    title: "Today's Withdrawals",
    value: "$2,890",
    change: "+12%",
    isPositive: true,
  },
  {
    title: "Active Users",
    value: "1,284",
    change: "-2%",
    isPositive: false,
  },
  {
    title: "Task Completion",
    value: "87%",
    change: "+5%",
    isPositive: true,
  },
]

export function QuickStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="neon-border hover:neon-glow transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <div className={`flex items-center gap-1 text-xs ${stat.isPositive ? "text-green-500" : "text-red-500"}`}>
                {stat.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {stat.change}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
