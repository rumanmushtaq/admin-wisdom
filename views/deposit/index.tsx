import { AdminSidebar } from "@/components/admin-sidebar";
import { TransactionCard } from "@/components/transaction-card";
import { DepositFilters } from "@/components/deposit-filters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NeonCard } from "@/components/neon-card";
import { ArrowDownCircle, Clock, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useDeposit } from "./useDeposit";
import { ShareStatus } from "./types";
import { Deposit } from "@/types/deposit.types";

export default function DepositsPage() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [status, setStatus] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { deposits, depositIsPending } = useDeposit({
    page,
    limit,
    search: search || undefined,
    sortBy,
    sortOrder,
  });

  console.log("deposits", deposits?.data);
  const pendingDeposits = deposits?.data?.data?.filter(
    (d: Deposit) => d.status === ShareStatus.PENDING
  );
  const approvedDeposits = deposits?.data?.data?.filter(
    (d: Deposit) => d.status === ShareStatus.APPROVED
  );
  const rejectedDeposits = deposits?.data?.data?.filter(
    (d: Deposit) => d.status === ShareStatus.REJECTED
  );

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold neon-text mb-2">Deposits</h1>
            <p className="text-muted-foreground">
              Review and approve deposit transactions
            </p>
          </div>

          {/* Deposit Filters */}
          <DepositFilters
            status={status}
            setStatus={setStatus}
            setSearchUser={setSearch}
            searchUser={search}
          />

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <NeonCard
              title="Total Deposits"
              value="$45,231"
              icon={ArrowDownCircle}
            />
            <NeonCard
              title="Pending"
              value={pendingDeposits?.length ?? 0}
              icon={Clock}
            />
            <NeonCard
              title="Approved"
              value={approvedDeposits?.length ?? 0}
              icon={CheckCircle}
            />
            <NeonCard
              title="Rejected"
              value={rejectedDeposits?.length ?? 0}
              icon={XCircle}
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue={ShareStatus.PENDING} className="space-y-6">
            <TabsList className="neon-border">
              <TabsTrigger value={ShareStatus.PENDING}>
                Pending ({pendingDeposits?.length ?? 0})
              </TabsTrigger>
              <TabsTrigger value={ShareStatus.APPROVED}>
                Approved ({approvedDeposits?.length ?? 0})
              </TabsTrigger>
              <TabsTrigger value={ShareStatus.REJECTED}>
                Rejected ({rejectedDeposits?.length ?? 0})
              </TabsTrigger>
              <TabsTrigger value="all">
                All ({deposits?.data?.data?.length ?? 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={ShareStatus.PENDING} className="space-y-4">
              {pendingDeposits?.map((deposit: Deposit) => (
                <TransactionCard key={deposit?._id} deposit={deposit} />
              ))}
            </TabsContent>

            <TabsContent value={ShareStatus.APPROVED} className="space-y-4">
              {approvedDeposits?.map((deposit: Deposit) => (
                <TransactionCard key={deposit._id} deposit={deposit} />
              ))}
            </TabsContent>

            <TabsContent value={ShareStatus.REJECTED} className="space-y-4">
              {rejectedDeposits?.map((deposit: Deposit) => (
                <TransactionCard key={deposit?._id} deposit={deposit} />
              ))}
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              {deposits?.data?.data?.map((deposit: Deposit) => (
                <TransactionCard key={deposit?._id} deposit={deposit} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
