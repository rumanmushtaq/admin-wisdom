"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Users, Activity, ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react"
import { useUserProfile } from "./useUserProfile"
import { Skeleton } from "@/components/ui/skeleton"

interface UserProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: string | null,
}

export function UserProfileModal({ open, onOpenChange, user: userId }: UserProfileModalProps) {
  const { user, deposits, withdrawals, tasks, transactionSummary, isLoading } = useUserProfile(userId)

  const getInitials = (username?: string) => {
    if (!username) return "?"
    return username.slice(0, 2).toUpperCase()
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return "0.00"
    return Number(amount).toFixed(2)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[90vw] !max-w-6xl max-h-[90vh] p-0 neon-border">
        <div className="max-h-[90vh] overflow-y-auto custom-scrollbar">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl neon-text">User Profile</DialogTitle>
            </DialogHeader>

            {isLoading ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          </div>
        ) : user ? (
          <div className="space-y-6">
            {/* User Header */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 neon-border">
                <AvatarFallback className="bg-secondary text-foreground text-xl">
                  {getInitials(user.username)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-bold">{user.username}</h3>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <div className="flex gap-2">
                <Badge
                  variant={user.isActive ? "default" : "destructive"}
                  className={user.isActive ? "bg-primary text-primary-foreground" : ""}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </Badge>
                <Badge variant={user.isVerified ? "default" : "outline"}>
                  {user.isVerified ? "Verified" : "Not Verified"}
                </Badge>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="neon-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    Credits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(user.credits)}
                  </p>
                </CardContent>
              </Card>
              <Card className="neon-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Total Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {formatCurrency(user.totalEarnings)}
                  </p>
                </CardContent>
              </Card>
              <Card className="neon-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                    Deposits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {deposits?.summary?.count || 0}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({formatCurrency(deposits?.summary?.totalAmount)})
                    </span>
                  </p>
                </CardContent>
              </Card>
              <Card className="neon-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <ArrowDownRight className="h-4 w-4 text-primary" />
                    Withdrawals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {withdrawals?.summary?.count || 0}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({formatCurrency(withdrawals?.summary?.totalAmount)})
                    </span>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Transaction Summary */}
            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="text-base">Transaction Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Deposits</p>
                    <p className="font-bold text-green-500">{formatCurrency(transactionSummary?.totalDeposits)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Withdrawals</p>
                    <p className="font-bold text-red-500">{formatCurrency(transactionSummary?.totalWithdrawals)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Earnings</p>
                    <p className="font-bold text-primary">{formatCurrency(transactionSummary?.totalEarnings)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Refunds</p>
                    <p className="font-bold">{formatCurrency(transactionSummary?.totalRefunds)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tasks Summary */}
            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="text-base">Tasks Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Completed</p>
                    <p className="font-bold text-green-500">{tasks?.summary?.completed || 0}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pending</p>
                    <p className="font-bold text-yellow-500">{tasks?.summary?.pending || 0}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">In Progress</p>
                    <p className="font-bold text-blue-500">{tasks?.summary?.inProgress || 0}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Failed</p>
                    <p className="font-bold text-red-500">{tasks?.summary?.failed || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Details */}
            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">User ID</p>
                    <p className="font-mono text-xs">{user._id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Referral Code</p>
                    <p className="font-mono">{user.referralCode || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Role</p>
                    <p className="capitalize">{user.role}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Created At</p>
                    <p>{formatDate(user.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Updated At</p>
                    <p>{formatDate(user.updatedAt)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Referred By</p>
                    <p>{user.referredBy || "None"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for History */}
            <Tabs defaultValue="deposits" className="w-full">
              <TabsList className="w-full neon-border">
                <TabsTrigger value="deposits" className="flex-1">
                  Deposits ({deposits?.list?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="withdrawals" className="flex-1">
                  Withdrawals ({withdrawals?.list?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="tasks" className="flex-1">
                  Tasks
                </TabsTrigger>
              </TabsList>

              <TabsContent value="deposits" className="mt-4">
                <div className="rounded-lg border neon-border overflow-hidden">
                  {deposits?.list && deposits.list.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {deposits.list.map((deposit: any, idx: number) => (
                          <TableRow key={deposit?._id || idx}>
                            <TableCell className="font-medium text-primary">
                              ${formatCurrency(deposit?.amount)}
                            </TableCell>
                            <TableCell>{formatDate(deposit?.createdAt)}</TableCell>
                            <TableCell>
                              <Badge variant="default" className="bg-primary text-primary-foreground">
                                {deposit?.status || "Completed"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      No deposits found
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="withdrawals" className="mt-4">
                <div className="rounded-lg border neon-border overflow-hidden">
                  {withdrawals?.list && withdrawals.list.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {withdrawals.list.map((withdrawal: any, idx: number) => (
                          <TableRow key={withdrawal?._id || idx}>
                            <TableCell className="font-medium text-primary">
                              ${formatCurrency(withdrawal?.amount)}
                            </TableCell>
                            <TableCell>{formatDate(withdrawal?.createdAt)}</TableCell>
                            <TableCell>
                              <Badge variant="default" className="bg-primary text-primary-foreground">
                                {withdrawal?.status || "Completed"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      No withdrawals found
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="tasks" className="mt-4">
                <div className="rounded-lg border neon-border overflow-hidden">
                  {tasks?.completed && tasks.completed.length > 0 ? (
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
                        {tasks.completed.map((task: any, idx: number) => (
                          <TableRow key={task?._id || idx}>
                            <TableCell className="font-medium">{task?.title || "Task"}</TableCell>
                            <TableCell className="text-primary">+{task?.points || 0}</TableCell>
                            <TableCell>{formatDate(task?.completedAt)}</TableCell>
                            <TableCell>
                              <Badge variant="default" className="bg-primary text-primary-foreground">
                                Completed
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      No tasks completed yet
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            User not found
          </div>
        )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
