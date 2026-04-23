"use client";

import { useState, useMemo } from "react";
import {
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowDownCircle,
  ArrowUpCircle,
  ClipboardCheck,
  UserCheck,
  RefreshCw,
  TrendingDown,
} from "lucide-react";
import Link from "next/link";
import { useAdminDashboard, AdminDashboardParams } from "./useDashboard";
import { DashboardFilters } from "@/components/dashboard-filters";
import { DashboardCharts } from "@/components/dashboard-charts";
import { RecentActivity } from "@/components/recent-activity";

// ─────────────────────────────────────────────
//  DATE RANGE HELPER
// ─────────────────────────────────────────────
function getDateRange(range: string): { fromDate?: string; toDate?: string } {
  const now = new Date();
  const fmt = (d: Date) => d.toISOString().split("T")[0];
  const sub = (days: number) => {
    const d = new Date(now);
    d.setDate(d.getDate() - days);
    return d;
  };
  if (range === "today") return { fromDate: fmt(now), toDate: fmt(now) };
  if (range === "last7days") return { fromDate: fmt(sub(7)), toDate: fmt(now) };
  if (range === "last30days")
    return { fromDate: fmt(sub(30)), toDate: fmt(now) };
  if (range === "last90days")
    return { fromDate: fmt(sub(90)), toDate: fmt(now) };
  if (range === "thisyear")
    return { fromDate: `${now.getFullYear()}-01-01`, toDate: fmt(now) };
  return {};
}

// ─────────────────────────────────────────────
//  STAT CARD
// ─────────────────────────────────────────────
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  growth?: number;
  icon: React.ElementType;
  href?: string;
  accentClass?: string;
}

function StatCard({
  title,
  value,
  subtitle,
  growth,
  icon: Icon,
  href,
  accentClass = "bg-primary/10",
}: StatCardProps) {
  const isUp = growth !== undefined && growth >= 0;
  const card = (
    <div className="group relative rounded-2xl bg-black/40 border border-white/5 backdrop-blur-3xl p-6 hover:border-primary/20 hover:bg-white/[0.03] transition-all duration-300 cursor-pointer overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${accentClass}`}>
          <Icon className="h-5 w-5 text-primary" />
        </div>
        {growth !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${isUp ? "bg-primary/10 text-primary" : "bg-red-500/10 text-red-400"}`}
          >
            {isUp ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {Math.abs(growth).toFixed(1)}%
          </div>
        )}
      </div>

      <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground mb-1">
        {title}
      </p>
      <p className="text-3xl font-black text-white leading-none">{value}</p>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>
      )}
    </div>
  );
  return href ? <Link href={href}>{card}</Link> : card;
}

// ─────────────────────────────────────────────
//  MAIN DASHBOARD VIEW
// ─────────────────────────────────────────────
export default function Dashboard() {
  const [dateRange, setDateRange] = useState("last30days");
  const [userStatus, setUserStatus] = useState("all");
  const [transactionStatus, setTransactionStatus] = useState("all");

  const params: AdminDashboardParams = useMemo(
    () => ({
      ...getDateRange(dateRange),
      userStatus: userStatus === "all" ? undefined : userStatus,
      transactionStatus:
        transactionStatus === "all" ? undefined : transactionStatus,
    }),
    [dateRange, userStatus, transactionStatus],
  );

  const { data, isLoading, error, refetch } = useAdminDashboard(params);
  const metrics = data?.metrics;

  const fmt = (n?: number) => (n ?? 0).toLocaleString();
  const fmtUsd = (n?: number) => `$${(n ?? 0).toLocaleString()}`;

  return (
    <main className="flex-1 lg:ml-64">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-1">
              Admin Panel
            </p>
            <h1 className="text-4xl font-black text-white leading-none">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Real-time platform analytics &amp; insights
            </p>
          </div>
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="flex items-center gap-2 text-xs px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <DashboardFilters
          dateRange={dateRange}
          setDateRange={setDateRange}
          userStatus={userStatus}
          setUserStatus={setUserStatus}
          transactionStatus={transactionStatus}
          setTransactionStatus={setTransactionStatus}
        />

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            Failed to load dashboard data. Please try refreshing.
          </div>
        )}

        {/* Primary Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatCard
            title="Total Users"
            value={fmt(metrics?.users.total)}
            subtitle={`+${fmt(metrics?.users.today)} today`}
            growth={metrics?.users.growth}
            icon={Users}
            href="/admin/users"
          />
          <StatCard
            title="Total Deposits"
            value={fmtUsd(metrics?.deposits.total)}
            subtitle={`${fmtUsd(metrics?.deposits.today)} today`}
            growth={metrics?.deposits.growth}
            icon={DollarSign}
            href="/admin/deposits"
          />
          <StatCard
            title="Total Withdrawals"
            value={fmtUsd(metrics?.withdrawals.total)}
            subtitle={`${fmtUsd(metrics?.withdrawals.today)} today`}
            icon={ArrowUpCircle}
            href="/admin/withdrawals"
          />
          <StatCard
            title="Pending Withdrawals"
            value={fmt(metrics?.withdrawals.pending)}
            subtitle="Requires attention"
            icon={Clock}
            href="/admin/withdrawals"
            accentClass="bg-yellow-500/10"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <StatCard
            title="Active Tasks"
            value={fmt(metrics?.tasks.active)}
            subtitle="Awaiting completion"
            icon={ClipboardCheck}
            href="/admin/tasks"
          />
          <StatCard
            title="Referral Earnings"
            value={fmtUsd(metrics?.referrals.total)}
            subtitle="Total commissions paid"
            icon={UserCheck}
            href="/admin/referrals"
          />
          <StatCard
            title="Task Completion"
            value={`${(metrics?.tasks.completionRate ?? 0).toFixed(1)}%`}
            subtitle="Platform-wide"
            icon={TrendingUp}
          />
        </div>

        {/* Charts */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">
              Analytics &amp; Trends
            </h2>
          </div>
          <DashboardCharts
            trends={data?.trends}
            completionRate={metrics?.tasks.completionRate ?? 0}
          />
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <RecentActivity
            activities={data?.recentActivity}
            isLoading={isLoading}
          />
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/admin/users",
                icon: Users,
                title: "Manage Users",
                desc: "View and edit accounts",
              },
              {
                href: "/admin/deposits",
                icon: ArrowDownCircle,
                title: "Deposits",
                desc: "Review pending deposits",
              },
              {
                href: "/admin/withdrawals",
                icon: ArrowUpCircle,
                title: "Withdrawals",
                desc: "Process requests",
              },
              {
                href: "/admin/tasks",
                icon: ClipboardCheck,
                title: "Tasks",
                desc: "Assign and track tasks",
              },
            ].map(({ href, icon: Icon, title, desc }) => (
              <Link key={href} href={href}>
                <div className="group rounded-2xl bg-black/40 border border-white/5 backdrop-blur-3xl p-6 hover:border-primary/20 hover:bg-white/[0.03] transition-all cursor-pointer">
                  <Icon className="h-7 w-7 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-white mb-1">{title}</h3>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
