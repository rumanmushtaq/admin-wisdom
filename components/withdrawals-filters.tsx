"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Filter, Search, XCircle } from "lucide-react";

interface WithdrawalsFiltersProps {
  search: string;
  setSearch: (a: string) => void;
  userId: string;
  setUserId: (a: string) => void;
  fromDate: string;
  setFromDate: (a: string) => void;
  toDate: string;
  setToDate: (a: string) => void;
  minAmount: number;
  setMinAmount: (a: number) => void;
  maxAmount: number;
  setMaxAmount: (a: number) => void;
}

export function WithdrawalsFilters({
  search,
  setSearch,
  userId,
  setUserId,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  minAmount,
  setMinAmount,
  maxAmount,
  setMaxAmount,
}: WithdrawalsFiltersProps) {
  const handleResetFilters = () => {
    setSearch("");
    setUserId("");
    setFromDate("");
    setToDate("");
    setMinAmount(0);
    setMaxAmount(0);
  };

  const hasActiveFilters =
    search || userId || fromDate || toDate || minAmount > 0 || maxAmount > 0;

  return (
    <Card className="neon-border mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          Filter Withdrawals
        </CardTitle>
        {hasActiveFilters ? (
          <Button
            onClick={handleResetFilters}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Clear
          </Button>
        ) : null}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Search Term */}
          <div className="space-y-2">
            <Label htmlFor="search" className="text-sm font-medium">
              Search Text
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search globally..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 neon-border focus:neon-glow bg-black/30 w-full"
              />
            </div>
          </div>

          {/* User ID */}
          <div className="space-y-2">
            <Label htmlFor="userId" className="text-sm font-medium">
              Search by User ID
            </Label>
            <Input
              id="userId"
              placeholder="Enter User ID..."
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="neon-border focus:neon-glow bg-black/30 w-full"
            />
          </div>

          {/* Amount Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minAmount" className="text-sm font-medium">
                Min Amount ($)
              </Label>
              <Input
                id="minAmount"
                type="number"
                min={0}
                value={minAmount || ""}
                onChange={(e) => setMinAmount(Number(e.target.value))}
                placeholder="0"
                className="neon-border focus:neon-glow bg-black/30 w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxAmount" className="text-sm font-medium">
                Max Amount ($)
              </Label>
              <Input
                id="maxAmount"
                type="number"
                min={0}
                value={maxAmount || ""}
                onChange={(e) => setMaxAmount(Number(e.target.value))}
                placeholder="0"
                className="neon-border focus:neon-glow bg-black/30 w-full"
              />
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            <div className="space-y-2">
              <Label htmlFor="fromDate" className="text-sm font-medium">
                From Date
              </Label>
              <Input
                id="fromDate"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="neon-border focus:neon-glow bg-black/30 w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toDate" className="text-sm font-medium">
                To Date
              </Label>
              <Input
                id="toDate"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="neon-border focus:neon-glow bg-black/30 w-full"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
