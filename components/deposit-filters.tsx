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
import { Filter, Search, RotateCcw, CheckCircle2 } from "lucide-react";

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
  const [localSearch, setLocalSearch] = useState(searchUser);
  const [localStatus, setLocalStatus] = useState(status);

  const handleApply = () => {
    setSearchUser(localSearch);
    setStatus(localStatus);
  };

  const handleReset = () => {
    setLocalSearch("");
    setLocalStatus("all");
    setSearchUser("");
    setStatus("all");
  };

  return (
    <div className="relative group/filters">
      {/* Decorative Glow Background */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 rounded-[2rem] blur-2xl opacity-50 group-hover/filters:opacity-100 transition-opacity duration-1000" />

      <div className="relative bg-black/40 backdrop-blur-3xl rounded-[1.5rem] border border-white/[0.03] shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row items-stretch">
          {/* Enhanced Search Input */}
          <div className="flex-1 flex items-center px-8 py-6 relative group/search">
            <Search className="h-5 w-5 text-muted-foreground/50 group-focus-within/search:text-primary transition-colors duration-300" />
            <Input
              placeholder="Search users, email, or transactions..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="flex-1 bg-transparent border-none focus-visible:ring-0 text-lg placeholder:text-muted-foreground/20 font-medium tracking-tight ml-4 h-10 py-0"
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
            />
            {/* Animated Bottom Line */}
            <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent scale-x-0 group-focus-within/search:scale-x-100 transition-transform duration-700 ease-out" />
          </div>

          {/* Controls Cluster */}
          <div className="flex flex-col sm:flex-row items-center gap-4 px-8 py-6 bg-white/[0.02] border-l border-white/[0.03]">
            <div className="w-full sm:w-[220px]">
              <Select value={localStatus} onValueChange={setLocalStatus}>
                <SelectTrigger className="h-12 bg-black/60 border-white/[0.05] hover:border-primary/20 transition-all rounded-xl focus:ring-primary/20">
                  <span className="text-muted-foreground/60 mr-2 text-xs uppercase tracking-widest font-bold">
                    Status:
                  </span>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-white/[0.05] backdrop-blur-2xl rounded-xl">
                  <SelectItem value="all" className="focus:bg-primary/10">
                    All Transactions
                  </SelectItem>
                  <SelectItem
                    value="PENDING"
                    className="focus:bg-yellow-500/10"
                  >
                    Pending Approval
                  </SelectItem>
                  <SelectItem
                    value="APPROVED"
                    className="focus:bg-green-500/10"
                  >
                    Approved
                  </SelectItem>
                  <SelectItem value="REJECTED" className="focus:bg-red-500/10">
                    Rejected
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                variant="ghost"
                onClick={handleReset}
                className="h-12 px-6 text-muted-foreground hover:text-white hover:bg-white/[0.03] rounded-xl transition-all group/reset"
              >
                <RotateCcw className="h-4 w-4 mr-2 group-hover:rotate-[-60deg] transition-transform duration-500" />
                Reset
              </Button>
              <Button
                onClick={handleApply}
                className="h-12 px-8 bg-primary/90 hover:bg-primary text-black font-extrabold rounded-xl shadow-[0_0_20px_rgba(209,255,77,0.2)] hover:shadow-[0_0_30px_rgba(209,255,77,0.4)] transition-all hover:-translate-y-[1px] active:translate-y-0"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
