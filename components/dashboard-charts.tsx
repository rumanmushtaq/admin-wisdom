"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Sample data for charts
const depositTrendData = [
  { month: "Jan", deposits: 4000, withdrawals: 2400 },
  { month: "Feb", deposits: 3000, withdrawals: 1398 },
  { month: "Mar", deposits: 2000, withdrawals: 9800 },
  { month: "Apr", deposits: 2780, withdrawals: 3908 },
  { month: "May", deposits: 1890, withdrawals: 4800 },
  { month: "Jun", deposits: 2390, withdrawals: 3800 },
  { month: "Jul", deposits: 3490, withdrawals: 4300 },
]

const userActivityData = [
  { name: "Active", value: 2123, color: "#BFFF00" },
  { name: "Inactive", value: 724, color: "#404040" },
]

const taskCompletionData = [
  { user: "John D.", completed: 85, pending: 15 },
  { user: "Sarah S.", completed: 92, pending: 8 },
  { user: "Mike J.", completed: 78, pending: 22 },
  { user: "Emily B.", completed: 88, pending: 12 },
  { user: "David L.", completed: 95, pending: 5 },
]

const referralData = [
  { month: "Jan", earnings: 1200 },
  { month: "Feb", earnings: 1900 },
  { month: "Mar", earnings: 1500 },
  { month: "Apr", earnings: 2400 },
  { month: "May", earnings: 2100 },
  { month: "Jun", earnings: 2800 },
]

export function DashboardCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2 mb-8">
      {/* Deposit & Withdrawal Trends */}
      <Card className="neon-border hover:neon-glow transition-all">
        <CardHeader>
          <CardTitle className="neon-text">Deposit & Withdrawal Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={depositTrendData}>
              <defs>
                <linearGradient id="depositGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#BFFF00" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#BFFF00" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="withdrawalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#666666" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#666666" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #BFFF00", borderRadius: "8px" }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="deposits"
                stroke="#BFFF00"
                strokeWidth={2}
                fill="url(#depositGradient)"
                name="Deposits"
              />
              <Area
                type="monotone"
                dataKey="withdrawals"
                stroke="#666"
                strokeWidth={2}
                fill="url(#withdrawalGradient)"
                name="Withdrawals"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* User Activity Pie Chart */}
      <Card className="neon-border hover:neon-glow transition-all">
        <CardHeader>
          <CardTitle className="neon-text">User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userActivityData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={(entry) => `${entry.name}: ${entry.value}`}
                // labelStyle={{ fill: "#fff", fontSize: "12px" }}
              >
                {userActivityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #BFFF00", borderRadius: "8px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Task Completion Overview */}
      <Card className="neon-border hover:neon-glow transition-all">
        <CardHeader>
          <CardTitle className="neon-text">Task Completion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskCompletionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#999" />
              <YAxis dataKey="user" type="category" stroke="#999" width={80} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #BFFF00", borderRadius: "8px" }}
              />
              <Legend />
              <Bar dataKey="completed" stackId="a" fill="#BFFF00" name="Completed" />
              <Bar dataKey="pending" stackId="a" fill="#404040" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Referral Network Stats */}
      <Card className="neon-border hover:neon-glow transition-all">
        <CardHeader>
          <CardTitle className="neon-text">Referral Earnings Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={referralData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #BFFF00", borderRadius: "8px" }}
              />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#BFFF00"
                strokeWidth={3}
                dot={{ fill: "#BFFF00", r: 5 }}
                activeDot={{ r: 8, fill: "#BFFF00", stroke: "#0A0A0A", strokeWidth: 2 }}
                name="Earnings ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
