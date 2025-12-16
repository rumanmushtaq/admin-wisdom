"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar, Filter, Search } from "lucide-react"

export function DepositFilters() {
  const [dateRange, setDateRange] = useState("all")
  const [status, setStatus] = useState("all")
  const [minAmount, setMinAmount] = useState("")
  const [maxAmount, setMaxAmount] = useState("")
  const [searchUser, setSearchUser] = useState("")

  const handleApplyFilters = () => {
    console.log("[v0] Applying filters:", { dateRange, status, minAmount, maxAmount, searchUser })
  }

  const handleResetFilters = () => {
    setDateRange("all")
    setStatus("all")
    setMinAmount("")
    setMaxAmount("")
    setSearchUser("")
  }

  return (
    <Card className="neon-border mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          Filter Deposits
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-5">
          {/* Date Range */}
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
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium">
              Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status" className="neon-border focus:neon-glow">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-primary/30">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount Range */}
          <div className="space-y-2">
            <Label htmlFor="minAmount" className="text-sm font-medium">
              Min Amount
            </Label>
            <Input
              id="minAmount"
              type="number"
              placeholder="$0"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              className="neon-border focus:neon-glow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxAmount" className="text-sm font-medium">
              Max Amount
            </Label>
            <Input
              id="maxAmount"
              type="number"
              placeholder="Any"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              className="neon-border focus:neon-glow"
            />
          </div>

          {/* Search User */}
          <div className="space-y-2">
            <Label htmlFor="searchUser" className="text-sm font-medium">
              Search User
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="searchUser"
                placeholder="User name..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="pl-9 neon-border focus:neon-glow"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Button onClick={handleApplyFilters} className="neon-glow">
            Apply Filters
          </Button>
          <Button onClick={handleResetFilters} variant="outline" className="neon-border bg-transparent">
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
