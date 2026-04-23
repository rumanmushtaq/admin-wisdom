"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Search,
  RotateCcw,
  CheckCircle2,
  DollarSign,
  Calendar,
} from "lucide-react";

interface WithdrawFiltersProps {
  status: string;
  setStatus: (a: string) => void;
  search: string;
  setSearch: (a: string) => void;
  userId: string;
  setUserId: (a: string) => void;
  minAmount: number;
  setMinAmount: (a: number) => void;
  maxAmount: number;
  setMaxAmount: (a: number) => void;
  fromDate: string;
  setFromDate: (a: string) => void;
  toDate: string;
  setToDate: (a: string) => void;
}

export function WithdrawFilters({
  status,
  setStatus,
  search,
  setSearch,
  userId,
  setUserId,
  minAmount,
  setMinAmount,
  maxAmount,
  setMaxAmount,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}: WithdrawFiltersProps) {
  const [localSearch, setLocalSearch] = useState(search);
  const [localStatus, setLocalStatus] = useState(status);
  const [localUserId, setLocalUserId] = useState(userId);
  const [localMin, setLocalMin] = useState(minAmount);
  const [localMax, setLocalMax] = useState(maxAmount);
  const [localFrom, setLocalFrom] = useState(fromDate);
  const [localTo, setLocalTo] = useState(toDate);

  const handleApply = () => {
    setSearch(localSearch);
    setStatus(localStatus);
    setUserId(localUserId);
    setMinAmount(localMin);
    setMaxAmount(localMax);
    setFromDate(localFrom);
    setToDate(localTo);
  };

  const handleReset = () => {
    setLocalSearch("");
    setLocalStatus("all");
    setLocalUserId("");
    setLocalMin(0);
    setLocalMax(0);
    setLocalFrom("");
    setLocalTo("");

    setSearch("");
    setStatus("all");
    setUserId("");
    setMinAmount(0);
    setMaxAmount(0);
    setFromDate("");
    setToDate("");
  };

  return (
    <div className="relative group/filters mb-10">
      {/* Decorative Glow Background */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 rounded-[2rem] blur-2xl opacity-50 group-hover/filters:opacity-100 transition-opacity duration-1000" />

      <div className="relative bg-black/40 backdrop-blur-3xl rounded-[1.5rem] border border-white/[0.03] shadow-2xl overflow-hidden">
        <div className="flex flex-col">
          {/* Top Row: Search */}
          <div className="flex flex-col lg:flex-row items-stretch border-b border-white/[0.03]">
            <div className="flex-1 flex items-center px-8 py-6 relative group/search">
              <Search className="h-5 w-5 text-muted-foreground/50 group-focus-within/search:text-primary transition-colors duration-300" />
              <Input
                placeholder="Search email, name or transaction..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="flex-1 bg-transparent border-none focus-visible:ring-0 text-lg placeholder:text-muted-foreground/20 font-medium tracking-tight ml-4 h-10 py-0"
                onKeyDown={(e) => e.key === "Enter" && handleApply()}
              />
              <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent scale-x-0 group-focus-within/search:scale-x-100 transition-transform duration-700 ease-out" />
            </div>

            <div className="flex-1 flex items-center px-8 py-6 relative group/userid border-l border-white/[0.03]">
              <span className="text-muted-foreground/50 font-bold text-xs uppercase mr-4">
                User ID:
              </span>
              <Input
                placeholder="Enter exact User ID..."
                value={localUserId}
                onChange={(e) => setLocalUserId(e.target.value)}
                className="flex-1 bg-transparent border-none focus-visible:ring-0 text-lg placeholder:text-muted-foreground/20 font-medium tracking-tight h-10 py-0"
                onKeyDown={(e) => e.key === "Enter" && handleApply()}
              />
              <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent scale-x-0 group-focus-within/userid:scale-x-100 transition-transform duration-700 ease-out" />
            </div>
          </div>

          {/* Bottom Row: Controls & Filters */}
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Range & Dates Cluster */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-0 px-4">
              {/* Status */}
              <div className="flex items-center px-4 py-4 border-r border-white/[0.03]">
                <Select value={localStatus} onValueChange={setLocalStatus}>
                  <SelectTrigger className="h-10 bg-black/40 border-white/[0.05] hover:border-primary/20 transition-all rounded-lg focus:ring-primary/20 w-full">
                    <span className="text-muted-foreground/60 mr-2 text-[10px] uppercase tracking-widest font-bold">
                      Status:
                    </span>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-white/[0.05] backdrop-blur-2xl rounded-xl">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Amount Range */}
              <div className="flex items-center px-4 py-4 border-r border-white/[0.03] gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <Input
                  type="number"
                  placeholder="Min"
                  value={localMin || ""}
                  onChange={(e) => setLocalMin(Number(e.target.value))}
                  className="bg-transparent border-none focus-visible:ring-0 text-sm h-8 w-full placeholder:text-muted-foreground/20"
                />
                <span className="text-muted-foreground/20">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={localMax || ""}
                  onChange={(e) => setLocalMax(Number(e.target.value))}
                  className="bg-transparent border-none focus-visible:ring-0 text-sm h-8 w-full placeholder:text-muted-foreground/20"
                />
              </div>

              {/* Date Filters */}
              <div className="flex items-center px-4 py-4 gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <Input
                  type="date"
                  value={localFrom}
                  onChange={(e) => setLocalFrom(e.target.value)}
                  className="bg-transparent border-none focus-visible:ring-0 text-xs h-8 w-full text-muted-foreground"
                />
                <span className="text-muted-foreground/20">to</span>
                <Input
                  type="date"
                  value={localTo}
                  onChange={(e) => setLocalTo(e.target.value)}
                  className="bg-transparent text-primary border-none focus-visible:ring-0 text-xs h-8 w-full text-muted-foreground"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 px-8 py-4 bg-white/[0.02] border-l border-white/[0.03]">
              <Button
                variant="ghost"
                onClick={handleReset}
                className="h-10 px-4 text-muted-foreground hover:text-white hover:bg-white/[0.03] rounded-lg transition-all group/reset"
              >
                <RotateCcw className="h-4 w-4 mr-2 group-hover:rotate-[-60deg] transition-transform duration-500" />
                Reset
              </Button>
              <Button
                onClick={handleApply}
                className="h-10 px-6 bg-primary/90 hover:bg-primary text-black font-extrabold rounded-lg shadow-[0_0_20px_rgba(209,255,77,0.2)] hover:shadow-[0_0_30px_rgba(209,255,77,0.4)] transition-all hover:-translate-y-[1px] active:translate-y-0"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
