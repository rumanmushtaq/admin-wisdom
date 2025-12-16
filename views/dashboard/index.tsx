import { AdminSidebar } from "@/components/admin-sidebar"
import { NeonCard } from "@/components/neon-card"
import { RecentActivity } from "@/components/recent-activity"
import { QuickStats } from "@/components/quick-stats"
import { DashboardCharts } from "@/components/dashboard-charts"
import { DashboardFilters } from "@/components/dashboard-filters"
import {
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowDownCircle,
  ArrowUpCircle,
  ClipboardCheck,
  UserCheck,
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold neon-text mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your platform overview.</p>
          </div>

          {/* Dashboard Filters */}
          <DashboardFilters />

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Link href="/admin/users">
              <NeonCard
                title="Total Users"
                value="2,847"
                description="+180 from last month"
                icon={Users}
                trend={{ value: "+6.8%", isPositive: true }}
              />
            </Link>
            <Link href="/admin/deposits">
              <NeonCard
                title="Total Deposits"
                value="$45,231"
                description="+20.1% from last month"
                icon={DollarSign}
                trend={{ value: "+$9,200", isPositive: true }}
              />
            </Link>
            <Link href="/admin/withdrawals">
              <NeonCard
                title="Total Withdrawals"
                value="$28,940"
                description="Last 30 days"
                icon={TrendingUp}
                trend={{ value: "+12.5%", isPositive: true }}
              />
            </Link>
            <Link href="/admin/requests">
              <NeonCard title="Pending Approvals" value="23" description="Requires attention" icon={Clock} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Link href="/admin/tasks">
              <NeonCard
                title="Active Tasks"
                value="156"
                description="Tasks in progress"
                icon={ClipboardCheck}
                trend={{ value: "+12", isPositive: true }}
              />
            </Link>
            <Link href="/admin/referrals">
              <NeonCard
                title="Referral Earnings"
                value="$12,450"
                description="Total commissions"
                icon={UserCheck}
                trend={{ value: "+18%", isPositive: true }}
              />
            </Link>
            <Link href="/admin/users">
              <NeonCard
                title="New Users Today"
                value="47"
                description="Last 24 hours"
                icon={Users}
                trend={{ value: "+8", isPositive: true }}
              />
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 neon-text">Analytics & Insights</h2>
            <DashboardCharts />
          </div>

          {/* Quick Stats */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Today's Overview</h2>
            <QuickStats />
          </div>

          {/* Quick Links Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/admin/users">
                <div className="neon-border rounded-lg p-6 hover:neon-glow transition-all cursor-pointer group">
                  <Users className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-lg mb-1">Manage Users</h3>
                  <p className="text-sm text-muted-foreground">View and edit user accounts</p>
                </div>
              </Link>
              <Link href="/admin/deposits">
                <div className="neon-border rounded-lg p-6 hover:neon-glow transition-all cursor-pointer group">
                  <ArrowDownCircle className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-lg mb-1">Deposits</h3>
                  <p className="text-sm text-muted-foreground">Review pending deposits</p>
                </div>
              </Link>
              <Link href="/admin/withdrawals">
                <div className="neon-border rounded-lg p-6 hover:neon-glow transition-all cursor-pointer group">
                  <ArrowUpCircle className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-lg mb-1">Withdrawals</h3>
                  <p className="text-sm text-muted-foreground">Process withdrawal requests</p>
                </div>
              </Link>
              <Link href="/admin/tasks">
                <div className="neon-border rounded-lg p-6 hover:neon-glow transition-all cursor-pointer group">
                  <ClipboardCheck className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-lg mb-1">Tasks</h3>
                  <p className="text-sm text-muted-foreground">Assign and track tasks</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  )
}
