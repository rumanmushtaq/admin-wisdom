"use client";
import { TransactionCard } from "@/components/transaction-card";
import { DepositFilters } from "@/components/deposit-filters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NeonCard } from "@/components/neon-card";
import {
  ArrowDownCircle,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Layers,
} from "lucide-react";
import { useState } from "react";
import { useDeposit, useDepositStats, useSeedTransactions } from "./useDeposit";
import { ShareStatus } from "./types";
import { Deposit } from "@/types/deposit.types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function DepositsPage() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [status, setStatus] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { deposits, depositIsPending, depositRefetch } = useDeposit({
    page,
    limit,
    search: search || undefined,
    sortBy,
    sortOrder,
    status: status !== "all" ? status : undefined,
  });

  const {
    data: statsData,
    isLoading: statsLoading,
    refetch: statsRefetch,
  } = useDepositStats();
  const seedMutation = useSeedTransactions();

  const stats = statsData?.data || {
    totalAmount: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    totalDeposits: 0,
  };

  const handleSeed = () => {
    seedMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Dummy data seeded successfully!");
        depositRefetch();
        statsRefetch();
      },
      onError: () => toast.error("Failed to seed dummy data."),
    });
  };

  return (
    <main className="flex-1 w-full lg:ml-64 bg-[#020202] min-h-screen selection:bg-primary/30 selection:text-white">
      <div className="p-8 lg:p-12 max-w-[1400px] mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-primary/60">
                Accounting System
              </span>
            </div>
            <h1 className="text-6xl font-black tracking-tight text-white leading-tight">
              Finances <span className="text-primary">.</span> Deposits
            </h1>
            <p className="text-muted-foreground/60 max-w-xl text-lg font-medium leading-relaxed">
              Verify and manage user deposits with precision. High-security
              transaction oversight.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              disabled={seedMutation.isPending}
              onClick={handleSeed}
              className="h-14 px-8 border-white/[0.05] hover:bg-white/[0.02] text-white font-bold rounded-2xl transition-all"
            >
              {seedMutation.isPending ? "Generating..." : "Generate Test Data"}
            </Button>
            <Button
              onClick={() => {
                depositRefetch();
                statsRefetch();
              }}
              className="h-14 w-14 p-0 bg-primary hover:bg-primary/80 text-black rounded-2xl shadow-[0_0_30px_rgba(209,255,77,0.1)] transition-all"
            >
              <RefreshCw className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative">
          {statsLoading && (
            <div className="absolute inset-0 z-10 bg-black/20 backdrop-blur-[2px] flex items-center justify-center rounded-xl">
              <RefreshCw className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
          <NeonCard
            title="Total Volume"
            value={`$${(stats?.totalAmount ?? 0).toLocaleString()}`}
            icon={ArrowDownCircle}
            className="bg-primary/5 border-primary/20"
          />
          <NeonCard
            title="Pending Requests"
            value={stats?.pending ?? 0}
            icon={Clock}
            className="bg-yellow-500/5 border-yellow-500/20"
          />
          <NeonCard
            title="Approved"
            value={stats?.approved ?? 0}
            icon={CheckCircle}
            className="bg-green-500/5 border-green-500/20"
          />
          <NeonCard
            title="Rejected"
            value={stats?.rejected ?? 0}
            icon={XCircle}
            className="bg-red-500/5 border-red-500/20"
          />
        </div>

        {/* Filter Section */}
        <div className="mt-8 transition-all duration-700 animate-in fade-in slide-in-from-top-4">
          <DepositFilters
            status={status}
            setStatus={setStatus}
            setSearchUser={setSearch}
            searchUser={search}
          />
        </div>

        {/* Content Tabs Section */}
        <Tabs value={status} onValueChange={setStatus} className="w-full">
          <div className="flex items-center justify-between mb-8">
            <TabsList className="bg-transparent border-b border-white/[0.05] rounded-none p-0 h-auto gap-12 w-full">
              {[
                {
                  label: "Overview",
                  value: "all",
                  count: stats?.totalDeposits,
                },
                {
                  label: "Awaiting",
                  value: ShareStatus.PENDING,
                  count: stats?.pending,
                  color: "text-yellow-500",
                },
                {
                  label: "Verified",
                  value: ShareStatus.APPROVED,
                  count: stats?.approved,
                  color: "text-green-500",
                },
                {
                  label: "Declined",
                  value: ShareStatus.REJECTED,
                  count: stats?.rejected,
                  color: "text-red-500",
                },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary border-transparent rounded-none px-0 py-4 text-sm font-black uppercase tracking-widest text-muted-foreground/40 transition-all hover:text-primary/60 h-auto"
                >
                  <span className="mr-3">{tab.label}</span>
                  <span
                    className={cn(
                      "text-[10px] bg-white/5 px-2 py-0.5 rounded-full font-mono",
                      tab.color,
                    )}
                  >
                    {tab.count ?? 0}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="relative min-h-[500px]">
            {depositIsPending ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <RefreshCw className="h-10 w-10 animate-spin text-primary/20" />
              </div>
            ) : (
              <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {deposits?.data?.data && deposits.data.data.length > 0 ? (
                  deposits.data.data.map((deposit: Deposit) => (
                    <TransactionCard key={deposit._id} deposit={deposit} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-32 text-muted-foreground/20 border-2 border-dashed border-white/[0.02] rounded-[3rem]">
                    <Layers className="h-20 w-20 mb-8 stroke-[1px]" />
                    <p className="text-2xl font-black uppercase tracking-[0.2em]">
                      Void
                    </p>
                    <p className="text-sm font-medium mt-2">
                      Database entries matching criteria not found.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </main>
  );
}
