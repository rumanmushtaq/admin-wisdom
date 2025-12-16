"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Users, Activity } from "lucide-react"

interface UserProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: {
    name: string
    email: string
    balance: string
    deposits: string
    withdrawals: string
    tasks: { assigned: number; completed: number }
    referrals: number
    earnings: string
    status: string
  }
}

export function UserProfileModal({ open, onOpenChange, user }: UserProfileModalProps) {
  const transactionHistory = [
    { id: 1, type: "Deposit", amount: "$500", date: "2024-01-15", status: "Approved" },
    { id: 2, type: "Withdrawal", amount: "$250", date: "2024-01-14", status: "Approved" },
    { id: 3, type: "Deposit", amount: "$1000", date: "2024-01-10", status: "Approved" },
  ]

  const taskHistory = [
    { id: 1, title: "Complete social media task", points: 50, status: "Completed", date: "2024-01-15" },
    { id: 2, title: "Watch promotional video", points: 25, status: "Completed", date: "2024-01-14" },
    { id: 3, title: "Share referral link", points: 100, status: "Pending", date: "2024-01-13" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto neon-border">
        <DialogHeader>
          <DialogTitle className="text-2xl neon-text">User Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Header */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 neon-border">
              <AvatarFallback className="bg-secondary text-foreground text-xl">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{user.name}</h3>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <Badge
              variant={user.status === "Active" ? "default" : user.status === "Pending" ? "secondary" : "destructive"}
              className={user.status === "Active" ? "bg-primary text-primary-foreground" : ""}
            >
              {user.status}
            </Badge>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="neon-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">{user.balance}</p>
              </CardContent>
            </Card>
            <Card className="neon-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Deposits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{user.deposits}</p>
              </CardContent>
            </Card>
            <Card className="neon-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {user.tasks.completed}/{user.tasks.assigned}
                </p>
              </CardContent>
            </Card>
            <Card className="neon-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Referrals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{user.referrals}</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for History */}
          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="w-full neon-border">
              <TabsTrigger value="transactions" className="flex-1">
                Transaction History
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex-1">
                Task History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="mt-4">
              <div className="rounded-lg border neon-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionHistory.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.type}</TableCell>
                        <TableCell className="text-primary">{transaction.amount}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Badge variant="default" className="bg-primary text-primary-foreground">
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="mt-4">
              <div className="rounded-lg border neon-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taskHistory.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell className="text-primary">+{task.points}</TableCell>
                        <TableCell>{task.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={task.status === "Completed" ? "default" : "secondary"}
                            className={task.status === "Completed" ? "bg-primary text-primary-foreground" : ""}
                          >
                            {task.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
