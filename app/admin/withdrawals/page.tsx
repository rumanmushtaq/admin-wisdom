import { AdminSidebar } from "@/components/admin-sidebar"
import { TransactionCard } from "@/components/transaction-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NeonCard } from "@/components/neon-card"
import { ArrowUpCircle, Clock, CheckCircle, XCircle } from "lucide-react"

const withdrawals = [
  {
    id: 1,
    user: { name: "Sarah Smith", email: "sarah@example.com" },
    amount: "$250",
    transactionId: "WTH-2024-001",
    status: "pending" as const,
    time: "5 minutes ago",
    type: "withdrawal" as const,
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  },
  {
    id: 2,
    user: { name: "David Lee", email: "david@example.com" },
    amount: "$750",
    transactionId: "WTH-2024-002",
    status: "pending" as const,
    time: "30 minutes ago",
    type: "withdrawal" as const,
    walletAddress: "0x89Ab05E3c5Dd7c9c8d7F6e2935A43d3E4bCbf54",
  },
  {
    id: 3,
    user: { name: "John Doe", email: "john@example.com" },
    amount: "$500",
    transactionId: "WTH-2024-003",
    status: "approved" as const,
    time: "2 hours ago",
    type: "withdrawal" as const,
    walletAddress: "0xC4f8e9d2A3b1f5c7e4d8A2b9c6e3f1d5a7b8c9d",
  },
  {
    id: 4,
    user: { name: "Mike Johnson", email: "mike@example.com" },
    amount: "$1,200",
    transactionId: "WTH-2024-004",
    status: "rejected" as const,
    time: "3 hours ago",
    type: "withdrawal" as const,
    walletAddress: "0xD5a8b9c6e3f1d5a7b8c9d2A3b1f5c7e4d8A2b9c",
  },
]

export default function WithdrawalsPage() {
  const pendingWithdrawals = withdrawals.filter((w) => w.status === "pending")
  const approvedWithdrawals = withdrawals.filter((w) => w.status === "approved")
  const rejectedWithdrawals = withdrawals.filter((w) => w.status === "rejected")

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold neon-text mb-2">Withdrawals</h1>
            <p className="text-muted-foreground">Process and approve withdrawal requests</p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <NeonCard title="Total Withdrawals" value="$28,940" icon={ArrowUpCircle} />
            <NeonCard title="Pending" value={pendingWithdrawals.length} icon={Clock} />
            <NeonCard title="Approved" value={approvedWithdrawals.length} icon={CheckCircle} />
            <NeonCard title="Rejected" value={rejectedWithdrawals.length} icon={XCircle} />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="neon-border">
              <TabsTrigger value="pending">Pending ({pendingWithdrawals.length})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({approvedWithdrawals.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedWithdrawals.length})</TabsTrigger>
              <TabsTrigger value="all">All ({withdrawals.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {pendingWithdrawals.map((withdrawal) => (
                <TransactionCard key={withdrawal.id} {...withdrawal} />
              ))}
            </TabsContent>

            <TabsContent value="approved" className="space-y-4">
              {approvedWithdrawals.map((withdrawal) => (
                <TransactionCard key={withdrawal.id} {...withdrawal} />
              ))}
            </TabsContent>

            <TabsContent value="rejected" className="space-y-4">
              {rejectedWithdrawals.map((withdrawal) => (
                <TransactionCard key={withdrawal.id} {...withdrawal} />
              ))}
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              {withdrawals.map((withdrawal) => (
                <TransactionCard key={withdrawal.id} {...withdrawal} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
