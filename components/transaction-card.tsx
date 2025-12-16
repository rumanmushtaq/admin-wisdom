"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Check, X, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface TransactionCardProps {
  id: number
  user: {
    name: string
    email: string
  }
  amount: string
  transactionId: string
  screenshot?: string
  status: "pending" | "approved" | "rejected"
  time: string
  type: "deposit" | "withdrawal"
  walletAddress?: string
}

export function TransactionCard({
  id,
  user,
  amount,
  transactionId,
  screenshot,
  status,
  time,
  type,
  walletAddress,
}: TransactionCardProps) {
  return (
    <Card className="neon-border hover:neon-glow transition-all">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border neon-border">
                <AvatarFallback className="bg-secondary">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Badge
              variant={status === "approved" ? "default" : status === "pending" ? "secondary" : "destructive"}
              className={status === "approved" ? "bg-primary text-primary-foreground" : ""}
            >
              {status}
            </Badge>
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="font-bold text-primary text-lg">{amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Transaction ID</span>
              <span className="text-sm font-mono">{transactionId}</span>
            </div>
            {walletAddress && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Wallet Address</span>
                <span className="text-sm font-mono truncate max-w-[200px]">{walletAddress}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Time</span>
              <span className="text-sm">{time}</span>
            </div>
          </div>

          {/* Screenshot */}
          {screenshot && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full neon-border bg-transparent">
                  <Eye className="mr-2 h-4 w-4" />
                  View Screenshot
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl neon-border">
                <DialogHeader>
                  <DialogTitle>Transaction Screenshot</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <img
                    src={screenshot || "/placeholder.svg"}
                    alt="Transaction screenshot"
                    className="w-full rounded-lg border neon-border"
                  />
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
