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

export default function WithdrawalsPage() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [status, setStatus] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { withdraws, withdrawsStatus, withdrawsRefetch, withdrawsIsPending } =
    useWithdraws({
      page,
      limit,
      search: search || undefined,
      sortBy,
      sortOrder,
    });

  const allWithdraws = withdraws?.data?.data;

  const pendingWithdrawals = allWithdraws?.filter(
    (w) => w.status === WithdrawalStatus.PENDING
  );
  const approvedWithdrawals = allWithdraws?.filter(
    (w) => w.status === WithdrawalStatus.APPROVED
  );
  const rejectedWithdrawals = allWithdraws?.filter(
    (w) => w.status === WithdrawalStatus.REJECTED
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

            {/* Tabs */}
            <Tabs defaultValue={WithdrawalStatus.PENDING} className="space-y-6">
              <TabsList className="neon-border">
                <TabsTrigger value={WithdrawalStatus.PENDING}>
                  Pending ({pendingWithdrawals?.length ?? 0})
                </TabsTrigger>
                <TabsTrigger value={WithdrawalStatus.APPROVED}>
                  Approved ({approvedWithdrawals?.length ?? 0})
                </TabsTrigger>
                <TabsTrigger value={WithdrawalStatus.REJECTED}>
                  Rejected ({rejectedWithdrawals?.length ?? 0})
                </TabsTrigger>
                <TabsTrigger value="all">
                  All ({allWithdraws?.length ?? 0})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={WithdrawalStatus.PENDING} className="space-y-4">
                {pendingWithdrawals?.map((withdrawal) => (
                  <TransactionCard
                    key={withdrawal._id}
                    withdrawal={withdrawal}
                  />
                ))}
              </TabsContent>

              <TabsContent value={WithdrawalStatus.APPROVED} className="space-y-4">
                {approvedWithdrawals?.map((withdrawal) => (
                  <TransactionCard
                    key={withdrawal._id}
                    withdrawal={withdrawal}
                  />
                ))}
              </TabsContent>

              <TabsContent value={WithdrawalStatus.REJECTED} className="space-y-4">
                {rejectedWithdrawals?.map((withdrawal) => (
                  <TransactionCard
                    key={withdrawal._id}
                    withdrawal={withdrawal}
                  />
                ))}
              </TabsContent>

              <TabsContent value="all" className="space-y-4">
                {allWithdraws?.map((withdrawal) => (
                  <TransactionCard
                    key={withdrawal._id}
                    withdrawal={withdrawal}
                  />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      )}
    </div>
  );
}
