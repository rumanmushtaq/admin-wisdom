"use client";
import { AdminSidebar } from "@/components/admin-sidebar";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NeonCard } from "@/components/neon-card";
import {
  ArrowUpCircle,
  Clock,
  CheckCircle,
  XCircle,
  Loader,
} from "lucide-react";
import { useState } from "react";
import useWithdraws from "./useWithdraws";
import { WithdrawalStatus } from "@/types/withdraws.types";
import { TransactionCard } from "@/components/withdraw-transaction-card";
import { WithdrawalsFilters } from "@/components/withdrawals-filters";

export default function WithdrawalsPage() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [status, setStatus] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [minAmount, setMinAmount] = useState<number>(0);
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [userId, setUserId] = useState<string>("");

  const { withdraws, withdrawsStatus, withdrawsRefetch, withdrawsIsPending } =
    useWithdraws({
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

  const allWithdraws = withdraws?.data?.data;

  console.log("allWithdraws", allWithdraws);

  const pendingWithdrawals = allWithdraws?.filter(
    (w) => w.status === WithdrawalStatus.PENDING,
  );
  const approvedWithdrawals = allWithdraws?.filter(
    (w) => w.status === WithdrawalStatus.APPROVED,
  );
  const rejectedWithdrawals = allWithdraws?.filter(
    (w) => w.status === WithdrawalStatus.REJECTED,
  );

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      {withdrawsIsPending ? (
        <div className="flex-1 justify-center items-center">
          <Loader />
        </div>
      ) : (
        <main className="flex-1 lg:ml-64">
          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold neon-text mb-2">Withdrawals</h1>
              <p className="text-muted-foreground">
                Process and approve withdrawal requests
              </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4 mb-8">
              <NeonCard
                title="Total Withdrawals"
                value="$28,940"
                icon={ArrowUpCircle}
              />
              <NeonCard
                title="Pending"
                value={pendingWithdrawals?.length ?? 0}
                icon={Clock}
              />
              <NeonCard
                title="Approved"
                value={approvedWithdrawals?.length ?? 0}
                icon={CheckCircle}
              />
              <NeonCard
                title="Rejected"
                value={rejectedWithdrawals?.length ?? 0}
                icon={XCircle}
              />
            </div>

            {/* Filters */}
            <WithdrawalsFilters
              search={search}
              setSearch={setSearch}
              userId={userId}
              setUserId={setUserId}
              fromDate={fromDate}
              setFromDate={setFromDate}
              toDate={toDate}
              setToDate={setToDate}
              minAmount={minAmount}
              setMinAmount={setMinAmount}
              maxAmount={maxAmount}
              setMaxAmount={setMaxAmount}
            />

            {/* Tabs */}
            <Tabs
              value={status}
              onValueChange={setStatus}
              className="space-y-6"
            >
              <TabsList className="neon-border">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value={WithdrawalStatus.PENDING}>
                  Pending
                </TabsTrigger>
                <TabsTrigger value={WithdrawalStatus.APPROVED}>
                  Approved
                </TabsTrigger>
                <TabsTrigger value={WithdrawalStatus.REJECTED}>
                  Rejected
                </TabsTrigger>
              </TabsList>

              <TabsContent value={status} className="space-y-4">
                {allWithdraws?.map((withdrawal: any) => (
                  <TransactionCard
                    key={withdrawal._id}
                    withdrawal={withdrawal}
                  />
                ))}
                {allWithdraws?.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No withdrawals found matching the current filters.
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      )}
    </div>
  );
}
