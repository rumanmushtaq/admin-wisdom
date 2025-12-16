import { AdminSidebar } from "@/components/admin-sidebar"
import { NeonCard } from "@/components/neon-card"
import { ReferralTree } from "@/components/referral-tree"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserPlus, DollarSign, TrendingUp, Users, Edit } from "lucide-react"

const referralData = [
  {
    id: 1,
    user: { name: "Sarah Smith", email: "sarah@example.com" },
    totalReferrals: 12,
    activeReferrals: 10,
    earnings: "$1,240",
    commission: "10%",
    joined: "Nov 2024",
  },
  {
    id: 2,
    user: { name: "Emily Brown", email: "emily@example.com" },
    totalReferrals: 8,
    activeReferrals: 7,
    earnings: "$980",
    commission: "10%",
    joined: "Oct 2024",
  },
  {
    id: 3,
    user: { name: "John Doe", email: "john@example.com" },
    totalReferrals: 5,
    activeReferrals: 5,
    earnings: "$625",
    commission: "10%",
    joined: "Nov 2024",
  },
  {
    id: 4,
    user: { name: "Alex Johnson", email: "alex@example.com" },
    totalReferrals: 5,
    activeReferrals: 4,
    earnings: "$540",
    commission: "10%",
    joined: "Dec 2024",
  },
  {
    id: 5,
    user: { name: "Mike Johnson", email: "mike@example.com" },
    totalReferrals: 2,
    activeReferrals: 2,
    earnings: "$180",
    commission: "10%",
    joined: "Dec 2024",
  },
]

export default function ReferralsPage() {
  const totalReferrals = referralData.reduce((sum, item) => sum + item.totalReferrals, 0)
  const totalEarnings = referralData.reduce(
    (sum, item) => sum + Number.parseFloat(item.earnings.replace("$", "").replace(",", "")),
    0,
  )

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold neon-text mb-2">Referrals Management</h1>
            <p className="text-muted-foreground">Track and manage user referral networks</p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <NeonCard title="Total Referrals" value={totalReferrals} icon={UserPlus} />
            <NeonCard title="Total Earnings" value={`$${totalEarnings.toLocaleString()}`} icon={DollarSign} />
            <NeonCard title="Active Referrers" value={referralData.length} icon={Users} />
            <NeonCard
              title="Avg. Per Referrer"
              value={`$${(totalEarnings / referralData.length).toFixed(0)}`}
              icon={TrendingUp}
            />
          </div>

          {/* Content Grid */}
          <div className="grid gap-8 lg:grid-cols-3 mb-8">
            <div className="lg:col-span-2">
              {/* Referral Table */}
              <div className="rounded-lg border neon-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-secondary/50">
                      <TableHead className="font-semibold">User</TableHead>
                      <TableHead className="font-semibold">Total Referrals</TableHead>
                      <TableHead className="font-semibold">Active</TableHead>
                      <TableHead className="font-semibold">Earnings</TableHead>
                      <TableHead className="font-semibold">Commission</TableHead>
                      <TableHead className="font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referralData.map((item) => (
                      <TableRow key={item.id} className="hover:bg-secondary/30">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border neon-border">
                              <AvatarFallback className="bg-secondary text-xs">
                                {item.user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{item.user.name}</p>
                              <p className="text-xs text-muted-foreground">{item.user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{item.totalReferrals}</TableCell>
                        <TableCell>{item.activeReferrals}</TableCell>
                        <TableCell className="font-semibold text-primary">{item.earnings}</TableCell>
                        <TableCell>{item.commission}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Referral Tree */}
            <div className="lg:col-span-1">
              <ReferralTree />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
