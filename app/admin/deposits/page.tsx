import { AdminSidebar } from "@/components/admin-sidebar"
import { TransactionCard } from "@/components/transaction-card"
import { DepositFilters } from "@/components/deposit-filters"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NeonCard } from "@/components/neon-card"
import { ArrowDownCircle, Clock, CheckCircle, XCircle } from "lucide-react"

const deposits = [
  {
    id: 1,
    user: { name: "John Doe", email: "john@example.com" },
    amount: "$500",
    transactionId: "TXN-2024-001",
    screenshot: "/transaction-screenshot.jpg",
    status: "pending" as const,
    time: "2 minutes ago",
    type: "deposit" as const,
  },
  {
    id: 2,
    user: { name: "Emily Brown", email: "emily@example.com" },
    amount: "$1,000",
    transactionId: "TXN-2024-002",
    screenshot: "/bank-transfer-receipt.jpg",
    status: "pending" as const,
    time: "15 minutes ago",
    type: "deposit" as const,
  },
  {
    id: 3,
    user: { name: "Sarah Smith", email: "sarah@example.com" },
    amount: "$750",
    transactionId: "TXN-2024-003",
    status: "approved" as const,
    time: "1 hour ago",
    type: "deposit" as const,
  },
  {
    id: 4,
    user: { name: "Mike Johnson", email: "mike@example.com" },
    amount: "$250",
    transactionId: "TXN-2024-004",
    status: "rejected" as const,
    time: "2 hours ago",
    type: "deposit" as const,
  },
]

export default function DepositsPage() {
  const pendingDeposits = deposits.filter((d) => d.status === "pending")
  const approvedDeposits = deposits.filter((d) => d.status === "approved")
  const rejectedDeposits = deposits.filter((d) => d.status === "rejected")

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold neon-text mb-2">Deposits</h1>
            <p className="text-muted-foreground">Review and approve deposit transactions</p>
          </div>

          {/* Deposit Filters */}
          <DepositFilters />

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <NeonCard title="Total Deposits" value="$45,231" icon={ArrowDownCircle} />
            <NeonCard title="Pending" value={pendingDeposits.length} icon={Clock} />
            <NeonCard title="Approved" value={approvedDeposits.length} icon={CheckCircle} />
            <NeonCard title="Rejected" value={rejectedDeposits.length} icon={XCircle} />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="neon-border">
              <TabsTrigger value="pending">Pending ({pendingDeposits.length})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({approvedDeposits.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedDeposits.length})</TabsTrigger>
              <TabsTrigger value="all">All ({deposits.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {pendingDeposits.map((deposit) => (
                <TransactionCard key={deposit.id} {...deposit} />
              ))}
            </TabsContent>

            <TabsContent value="approved" className="space-y-4">
              {approvedDeposits.map((deposit) => (
                <TransactionCard key={deposit.id} {...deposit} />
              ))}
            </TabsContent>

            <TabsContent value="rejected" className="space-y-4">
              {rejectedDeposits.map((deposit) => (
                <TransactionCard key={deposit.id} {...deposit} />
              ))}
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              {deposits.map((deposit) => (
                <TransactionCard key={deposit.id} {...deposit} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
