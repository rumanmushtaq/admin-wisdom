"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, BarChart2, DollarSign } from "lucide-react";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface TrendEntry {
  _id: { year: number; month: number; type: string };
  total: number;
}

interface DashboardChartsProps {
  trends?: TrendEntry[];
  completionRate?: number;
}

function buildTrendData(trends: TrendEntry[]) {
  const map: Record<
    string,
    { month: string; deposits: number; referrals: number }
  > = {};

  trends.forEach((t) => {
    const key = `${t._id.year}-${String(t._id.month).padStart(2, "0")}`;
    if (!map[key]) {
      map[key] = {
        month: MONTH_NAMES[t._id.month - 1],
        deposits: 0,
        referrals: 0,
      };
    }
    if (t._id.type === "PURCHASE") map[key].deposits += t.total;
    if (t._id.type === "REFERRAL_BONUS") map[key].referrals += t.total;
  });

  return Object.values(map);
}

const tooltipStyle = {
  contentStyle: {
    backgroundColor: "#0d0d0d",
    border: "1px solid rgba(191,255,0,0.3)",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(191,255,0,0.1)",
  },
  labelStyle: { color: "#fff", fontWeight: 700 },
  itemStyle: { color: "#ccc" },
};

export function DashboardCharts({
  trends = [],
  completionRate = 0,
}: DashboardChartsProps) {
  const trendData = buildTrendData(trends);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Deposit & Referral Trend */}
      <Card className="bg-black/40 border border-white/5 backdrop-blur-3xl rounded-2xl overflow-hidden">
        <CardHeader className="pb-0 pt-6 px-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-primary/10">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-sm font-semibold text-white/80">
              Deposit &amp; Referral Trend
            </CardTitle>
          </div>
          <p className="text-xs text-muted-foreground">Last 6 months</p>
        </CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="depGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#BFFF00" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#BFFF00" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="refGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis dataKey="month" stroke="#555" tick={{ fontSize: 11 }} />
              <YAxis
                stroke="#555"
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Area
                type="monotone"
                dataKey="deposits"
                stroke="#BFFF00"
                strokeWidth={2}
                fill="url(#depGrad)"
                name="Deposits"
              />
              <Area
                type="monotone"
                dataKey="referrals"
                stroke="#60a5fa"
                strokeWidth={2}
                fill="url(#refGrad)"
                name="Referrals"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Task Completion Rate */}
      <Card className="bg-black/40 border border-white/5 backdrop-blur-3xl rounded-2xl overflow-hidden">
        <CardHeader className="pb-0 pt-6 px-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-primary/10">
              <BarChart2 className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-sm font-semibold text-white/80">
              Task Completion Rate
            </CardTitle>
          </div>
          <p className="text-xs text-muted-foreground">
            Overall platform performance
          </p>
        </CardHeader>
        <CardContent className="pt-8 flex flex-col items-center justify-center gap-4">
          {/* Radial progress */}
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="12"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#BFFF00"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${2 * Math.PI * 52 * (1 - completionRate / 100)}`}
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-primary">
                {completionRate.toFixed(0)}%
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                Complete
              </span>
            </div>
          </div>
          <div className="flex gap-6 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Completed</p>
              <p className="text-sm font-bold text-primary">
                {completionRate.toFixed(0)}%
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Remaining</p>
              <p className="text-sm font-bold text-white/60">
                {(100 - completionRate).toFixed(0)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
