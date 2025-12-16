"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users } from "lucide-react"

interface ReferralNodeProps {
  name: string
  email: string
  earnings: string
  referrals: number
  level?: number
}

function ReferralNode({ name, email, earnings, referrals, level = 0 }: ReferralNodeProps) {
  return (
    <div className={`flex items-start gap-3 ${level > 0 ? "ml-8 mt-2" : ""}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 neon-border bg-secondary">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{name}</p>
        <p className="text-xs text-muted-foreground truncate">{email}</p>
        <div className="flex gap-4 mt-1">
          <span className="text-xs text-primary font-semibold">{earnings}</span>
          <span className="text-xs text-muted-foreground">{referrals} referrals</span>
        </div>
      </div>
    </div>
  )
}

export function ReferralTree() {
  return (
    <Card className="neon-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Top Referrers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <ReferralNode name="Sarah Smith" email="sarah@example.com" earnings="$1,240" referrals={12} />
          <ReferralNode name="John Doe" email="john@example.com" earnings="$320" referrals={3} level={1} />
          <ReferralNode name="Mike Johnson" email="mike@example.com" earnings="$180" referrals={2} level={1} />
        </div>
        <div>
          <ReferralNode name="Emily Brown" email="emily@example.com" earnings="$980" referrals={8} />
          <ReferralNode name="David Lee" email="david@example.com" earnings="$125" referrals={1} level={1} />
        </div>
        <div>
          <ReferralNode name="Alex Johnson" email="alex@example.com" earnings="$540" referrals={5} />
        </div>
      </CardContent>
    </Card>
  )
}
