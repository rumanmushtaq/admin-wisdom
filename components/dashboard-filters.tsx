"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Filter, Download } from "lucide-react"

export function DashboardFilters() {
  const [dateRange, setDateRange] = useState("last30days")
  const [userStatus, setUserStatus] = useState("all")
  const [transactionStatus, setTransactionStatus] = useState("all")

  const handleExport = () => {
    console.log("[v0] Exporting data with filters:", { dateRange, userStatus, transactionStatus })
    // Export functionality would be implemented here
    alert("Exporting data to CSV...")
  }

  return (
    <Card className="neon-border mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          Dashboard Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-4">
          {/* Date Range Filter */}
          <div className="space-y-2">
            <Label htmlFor="dateRange" className="text-sm font-medium">
              Date Range
            </Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger id="dateRange" className="neon-border focus:neon-glow">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-primary/30">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="last90days">Last 90 Days</SelectItem>
                <SelectItem value="thisyear">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User Status Filter */}
          <div className="space-y-2">
            <Label htmlFor="userStatus" className="text-sm font-medium">
              User Status
            </Label>
            <Select value={userStatus} onValueChange={setUserStatus}>
              <SelectTrigger id="userStatus" className="neon-border focus:neon-glow">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-primary/30">
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transaction Status Filter */}
          <div className="space-y-2">
            <Label htmlFor="transactionStatus" className="text-sm font-medium">
              Transaction Status
            </Label>
            <Select value={transactionStatus} onValueChange={setTransactionStatus}>
              <SelectTrigger id="transactionStatus" className="neon-border focus:neon-glow">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-primary/30">
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Export Button */}
          <div className="space-y-2">
            <Label className="text-sm font-medium opacity-0">Actions</Label>
            <Button
              onClick={handleExport}
              className="w-full neon-border hover:neon-glow bg-transparent"
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
