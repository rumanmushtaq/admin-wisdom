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
import { Input } from "@/components/ui/input";
import { Calendar, Filter, Search } from "lucide-react";

interface DepositFiltersProps {
  status: string;
  setStatus: (a: string) => void;
  searchUser: string;
  setSearchUser: (a: string) => void;
}

export function DepositFilters({
  status,
  setStatus,
  searchUser,
  setSearchUser,
}: DepositFiltersProps) {
  return (
    <Card className="neon-border mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          Filter Deposits
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search User */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
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
            {/* Status Filter */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger
                  id="status"
                  className="w-[180px] neon-border bg-black/30"
                >
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

            {/* Action Buttons */}
            {/* <div className="flex gap-4 mt-6">
              <Button onClick={handleApplyFilters} className="neon-glow">
                Apply Filters
              </Button>
              <Button
                onClick={handleResetFilters}
                variant="outline"
                className="neon-border bg-transparent"
              >
                Reset
              </Button>
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
