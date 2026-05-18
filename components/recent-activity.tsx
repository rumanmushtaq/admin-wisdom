"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  ArrowDownCircle,
  ArrowUpCircle,
  ClipboardCheck,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ActivityItem {
  type: "transaction" | "withdrawal" | "task";
  data: any;
  createdAt: string;
}

interface RecentActivityProps {
  activities?: ActivityItem[];
  isLoading?: boolean;
}

const statusColors: Record<string, string> = {
  APPROVED: "bg-primary/20 text-primary border-primary/30",
  COMPLETED: "bg-primary/20 text-primary border-primary/30",
  PENDING: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  REJECTED: "bg-red-500/20 text-red-400 border-red-500/30",
};

const typeIcons: Record<string, any> = {
  transaction: ArrowDownCircle,
  withdrawal: ArrowUpCircle,
  task: ClipboardCheck,
};

const typeLabels: Record<string, string> = {
  transaction: "Deposit",
  withdrawal: "Withdrawal",
  task: "Task",
};

export function RecentActivity({
  activities = [],
  isLoading = false,
}: RecentActivityProps) {
  return (
    <Card className="bg-black/40 border border-white/5 backdrop-blur-3xl rounded-2xl overflow-hidden">
      <CardHeader className="px-6 pt-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold text-white">
              Recent Activity
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live platform events
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : activities.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
            No recent activity
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {activities.slice(0, 12).map((item, i) => {
              const user = item.data?.userId;
              const userName = user?.firstName
                ? `${user?.firstName} ${user?.lastName || ""}`.trim()
                : user?.email || "Unknown User";
              const initials = userName
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
              const status =
                item.data?.status || item.data?.userStatus || "PENDING";
              const amount = item.data?.amount;
              const Icon = typeIcons[item.type];
              const badgeClass =
                statusColors[status.toUpperCase()] ||
                "bg-white/10 text-white/60 border-white/10";
              const timeAgo = item.createdAt
                ? formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                  })
                : "—";

              return (
                <div
                  key={i}
                  className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-white/10">
                      <AvatarFallback className="bg-white/5 text-xs font-bold text-white/70">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-white/90 leading-none">
                        {userName}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Icon className="h-3 w-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">
                          {typeLabels[item.type]}
                        </p>
                        <span className="text-muted-foreground/40 text-xs">
                          ·
                        </span>
                        <p className="text-xs text-muted-foreground/60">
                          {timeAgo}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {amount !== undefined && (
                      <p className="text-sm font-bold text-primary">
                        ${amount.toLocaleString()}
                      </p>
                    )}
                    <Badge
                      className={`text-[10px] px-2 py-0.5 border font-semibold ${badgeClass}`}
                    >
                      {status}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
