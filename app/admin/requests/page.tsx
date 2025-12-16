import { AdminSidebar } from "@/components/admin-sidebar"
import { RequestCard } from "@/components/request-card"
import { NeonCard } from "@/components/neon-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileCheck, Clock, CheckCircle, XCircle } from "lucide-react"

const requests = [
  {
    id: 1,
    user: { name: "John Doe", email: "john@example.com" },
    type: "Deposit Issue",
    subject: "Deposit not reflecting in account",
    message:
      "I made a deposit of $500 two hours ago, but it's still not showing in my account balance. I've attached the transaction receipt for your reference.",
    attachments: ["/transaction-screenshot.jpg"],
    status: "pending" as const,
    priority: "high" as const,
    time: "10 minutes ago",
  },
  {
    id: 2,
    user: { name: "Sarah Smith", email: "sarah@example.com" },
    type: "Account Verification",
    subject: "Unable to verify email address",
    message:
      "I've tried multiple times to verify my email address but I'm not receiving the verification emails. Can you please help?",
    status: "pending" as const,
    priority: "medium" as const,
    time: "30 minutes ago",
  },
  {
    id: 3,
    user: { name: "Mike Johnson", email: "mike@example.com" },
    type: "Withdrawal Request",
    subject: "Urgent withdrawal needed",
    message:
      "I need to withdraw $750 urgently. My wallet address is verified and I have sufficient balance. Please expedite this request.",
    status: "approved" as const,
    priority: "high" as const,
    time: "1 hour ago",
  },
  {
    id: 4,
    user: { name: "Emily Brown", email: "emily@example.com" },
    type: "Technical Support",
    subject: "Tasks not loading properly",
    message: "The tasks page is not loading correctly on my account. I see a blank screen when I try to access it.",
    status: "pending" as const,
    priority: "medium" as const,
    time: "2 hours ago",
  },
  {
    id: 5,
    user: { name: "David Lee", email: "david@example.com" },
    type: "Referral Issue",
    subject: "Referral commission not credited",
    message:
      "My friend signed up using my referral link and completed tasks, but I haven't received the referral commission yet.",
    status: "rejected" as const,
    priority: "low" as const,
    time: "3 hours ago",
  },
  {
    id: 6,
    user: { name: "Alex Johnson", email: "alex@example.com" },
    type: "Account Update",
    subject: "Change registered email address",
    message: "I would like to update my registered email address. Please guide me through the process.",
    attachments: ["/bank-transfer-receipt.png"],
    status: "approved" as const,
    priority: "low" as const,
    time: "4 hours ago",
  },
]

export default function RequestsPage() {
  const pendingRequests = requests.filter((r) => r.status === "pending")
  const approvedRequests = requests.filter((r) => r.status === "approved")
  const rejectedRequests = requests.filter((r) => r.status === "rejected")

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold neon-text mb-2">Requests & Approvals</h1>
            <p className="text-muted-foreground">Manage user requests and support tickets</p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <NeonCard title="Total Requests" value={requests.length} icon={FileCheck} />
            <NeonCard title="Pending" value={pendingRequests.length} icon={Clock} />
            <NeonCard title="Approved" value={approvedRequests.length} icon={CheckCircle} />
            <NeonCard title="Rejected" value={rejectedRequests.length} icon={XCircle} />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="neon-border">
              <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({approvedRequests.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedRequests.length})</TabsTrigger>
              <TabsTrigger value="all">All ({requests.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="grid gap-4 md:grid-cols-2">
              {pendingRequests.map((request) => (
                <RequestCard key={request.id} {...request} />
              ))}
            </TabsContent>

            <TabsContent value="approved" className="grid gap-4 md:grid-cols-2">
              {approvedRequests.map((request) => (
                <RequestCard key={request.id} {...request} />
              ))}
            </TabsContent>

            <TabsContent value="rejected" className="grid gap-4 md:grid-cols-2">
              {rejectedRequests.map((request) => (
                <RequestCard key={request.id} {...request} />
              ))}
            </TabsContent>

            <TabsContent value="all" className="grid gap-4 md:grid-cols-2">
              {requests.map((request) => (
                <RequestCard key={request.id} {...request} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
