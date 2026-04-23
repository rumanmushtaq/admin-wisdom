"use client";

import { AdminSidebar } from "@/components/admin-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NeonCard } from "@/components/neon-card";
import {
  ArrowDownCircle,
  Clock,
  CheckCircle,
  XCircle,
  Loader,
  RefreshCw,
  Database,
  ArrowUpCircle,
  CheckCircle2,
} from "lucide-react";
import { useState, useMemo } from "react";
import {
  useWithdraws,
  useWithdrawStats,
  useSeedWithdrawals,
} from "./useWithdraws";
import { WithdrawalStatus } from "@/types/withdraws.types";
import { TransactionCard } from "@/components/withdraw-transaction-card";
import { WithdrawFilters } from "@/components/withdraw-filters";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function WithdrawalsPage() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [status, setStatus] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [minAmount, setMinAmount] = useState<number>(0);
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [userId, setUserId] = useState<string>("");

  const { withdraws, withdrawsRefetch, withdrawsIsPending } = useWithdraws({
    page,
    limit,
    search: search || undefined,
    sortBy,
    sortOrder,
    status: status !== "all" ? (status as WithdrawalStatus) : undefined,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
    minAmount: minAmount || undefined,
    maxAmount: maxAmount || undefined,
    userId: userId || undefined,
  });

  const { data: statsData, refetch: refetchStats } = useWithdrawStats();
  const seedMutation = useSeedWithdrawals();

  const stats = statsData?.data;
  const allWithdraws = withdraws?.data?.data;

  const tabItems = [
    {
      label: "View All",
      value: "all",
      count: stats?.total,
      color: "text-primary",
    },
    {
      label: "Awaiting",
      value: WithdrawalStatus.PENDING,
      count: stats?.pending,
      color: "text-yellow-500",
    },
    {
      label: "Processing",
      value: WithdrawalStatus.APPROVED,
      count: stats?.approved,
      color: "text-blue-500",
    },
    {
      label: "Completed",
      value: WithdrawalStatus.COMPLETED,
      count: stats?.completed,
      color: "text-green-500",
    },
    {
      label: "Rejected",
      value: WithdrawalStatus.REJECTED,
      count: stats?.rejected,
      color: "text-red-500",
    },
  ];

  const handleRefresh = () => {
    withdrawsRefetch();
    refetchStats();
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-white selection:bg-primary/30">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64 relative">
        {/* Ambient Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10" />

        <div className="p-6 lg:p-12 max-w-[1600px] mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-[2px] bg-primary" />
                <h1 className="text-5xl font-black tracking-tighter uppercase italic">
                  Withdrawal <span className="text-primary">Vault</span>
                </h1>
              </div>
              <p className="text-muted-foreground font-medium tracking-wide">
                High-precision financial asset management & processing terminal
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleRefresh}
                variant="outline"
                className="h-12 border-white/5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Data
              </Button>
              <Button
                onClick={() => seedMutation.mutate()}
                disabled={seedMutation.isPending}
                className="h-12 bg-primary hover:bg-primary/80 text-black font-black rounded-xl shadow-[0_0_20px_rgba(209,255,77,0.2)]"
              >
                {seedMutation.isPending ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Database className="h-4 w-4 mr-2" />
                    Generate Dummy Data
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Premium Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <NeonCard
              title="Global Volume"
              value={`$${stats?.totalAmount?.toLocaleString() || "0"}`}
              icon={ArrowUpCircle}
              className="bg-primary/5 border-primary/20"
            />
            <NeonCard
              title="Pending Requests"
              value={stats?.pending?.toString() || "0"}
              icon={Clock}
              className="bg-yellow-500/5 border-yellow-500/20"
            />
            <NeonCard
              title="Total Approved"
              value={stats?.approved?.toString() || "0"}
              icon={CheckCircle2}
              className="bg-green-500/5 border-green-500/20"
            />
            <NeonCard
              title="Total Rejected"
              value={stats?.rejected?.toString() || "0"}
              icon={XCircle}
              className="bg-red-500/5 border-red-500/20"
            />
          </div>

          {/* Advanced Filtering Suite */}
          <WithdrawFilters
            status={status}
            setStatus={setStatus}
            search={search}
            setSearch={setSearch}
            userId={userId}
            setUserId={setUserId}
            minAmount={minAmount}
            setMinAmount={setMinAmount}
            maxAmount={maxAmount}
            setMaxAmount={setMaxAmount}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />

          {/* Main Data View */}
          <Tabs value={status} onValueChange={setStatus} className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <TabsList className="bg-white/5 border border-white/5 p-1 rounded-2xl h-14">
                {tabItems.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-black font-black text-sm transition-all"
                  >
                    <div className="flex items-center gap-3">
                      {tab.label}
                      <Badge
                        variant="outline"
                        className="border-white/10 bg-black/20 text-[10px] h-5 min-w-[20px] flex items-center justify-center p-0 px-1 font-bold"
                      >
                        {tab.count || 0}
                      </Badge>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={status} className="mt-0 outline-none">
              <div className="grid gap-4">
                {withdrawsIsPending ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader className="h-10 w-10 text-primary animate-spin" />
                    <p className="text-muted-foreground font-bold animate-pulse tracking-widest uppercase text-xs">
                      Decrypting Financial Records...
                    </p>
                  </div>
                ) : allWithdraws && allWithdraws.length > 0 ? (
                  allWithdraws.map((withdrawal: any) => (
                    <TransactionCard
                      key={withdrawal._id}
                      withdrawal={withdrawal}
                    />
                  ))
                ) : (
                  <div className="h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[2rem] bg-white/[0.01]">
                    <div className="p-6 rounded-full bg-white/5 mb-6">
                      <RefreshCw className="h-12 w-12 text-muted-foreground/20" />
                    </div>
                    <h3 className="text-xl font-bold text-white/40 mb-2">
                      Null Vault State
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-[300px] text-center">
                      No withdrawal records match your current security
                      parameters.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
