"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Filter, Download } from "lucide-react";

interface DashboardFiltersProps {
  dateRange: string;
  setDateRange: (val: string) => void;
  userStatus: string;
  setUserStatus: (val: string) => void;
  transactionStatus: string;
  setTransactionStatus: (val: string) => void;
}

export function DashboardFilters({
  dateRange,
  setDateRange,
  userStatus,
  setUserStatus,
  transactionStatus,
  setTransactionStatus,
}: DashboardFiltersProps) {
  const handleExport = () => {
    console.log("Exporting data with filters:", {
      dateRange,
      userStatus,
      transactionStatus,
    });
    alert("Exporting data to CSV...");
  };

  return (
    <Card className="neon-border mb-8 bg-black/40 backdrop-blur-3xl">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-4 items-end">
          {/* Date Range Filter */}
          <div className="space-y-2">
            <Label
              htmlFor="dateRange"
              className="text-[10px] uppercase font-black tracking-widest text-muted-foreground"
            >
              Date Range
            </Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger
                id="dateRange"
                className="h-12 bg-white/5 border-white/5 focus:ring-primary/20 hover:border-primary/20 transition-all rounded-xl"
              >
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-white/10 backdrop-blur-2xl">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="last90days">Last 90 Days</SelectItem>
                <SelectItem value="thisyear">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User Status Filter */}
          <div className="space-y-2">
            <Label
              htmlFor="userStatus"
              className="text-[10px] uppercase font-black tracking-widest text-muted-foreground"
            >
              User Status
            </Label>
            <Select value={userStatus} onValueChange={setUserStatus}>
              <SelectTrigger
                id="userStatus"
                className="h-12 bg-white/5 border-white/5 focus:ring-primary/20 hover:border-primary/20 transition-all rounded-xl"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-white/10 backdrop-blur-2xl">
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transaction Status Filter */}
          <div className="space-y-2">
            <Label
              htmlFor="transactionStatus"
              className="text-[10px] uppercase font-black tracking-widest text-muted-foreground"
            >
              Transaction Status
            </Label>
            <Select
              value={transactionStatus}
              onValueChange={setTransactionStatus}
            >
              <SelectTrigger
                id="transactionStatus"
                className="h-12 bg-white/5 border-white/5 focus:ring-primary/20 hover:border-primary/20 transition-all rounded-xl"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-white/10 backdrop-blur-2xl">
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Export Button */}
          <Button
            onClick={handleExport}
            className="h-12 neon-border hover:neon-glow bg-transparent rounded-xl border border-white/5 group"
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2 group-hover:translate-y-[1px] transition-transform" />
            Export CSV
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
