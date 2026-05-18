"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users } from "lucide-react";

interface ReferralNodeProps {
  user: any;
  level?: number;
}

function ReferralNode({ user, level = 0 }: ReferralNodeProps) {
  return (
    <div
      className={`mt-2 ${level > 0 ? "ml-6 pl-4" : ""}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 neon-border bg-secondary flex-shrink-0">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {(user?.firstName?.[0] || "") + (user?.lastName?.[0] || "") ||
                user?.username?.[0] ||
                "?"}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">
            {user?.firstName} {user?.lastName}{" "}
            {user?.username && `(${user?.username})`}
          </p>
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          <div className="flex gap-4 mt-1">
            <span className="text-xs text-primary font-semibold">
              Earnings: ${user?.totalReferralEarnings?.toFixed(2) || "0.00"}
            </span>
            <span className="text-xs text-muted-foreground">
              {user?.referrals?.length || 0} referrals
            </span>
          </div>
        </div>
      </div>
      {user?.referrals && user?.referrals.length > 0 && (
        <div className="space-y-2">
          {user?.referrals?.map((child: any) => (
            <ReferralNode key={child.id} user={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ReferralTree({ data }: { data: any[] }) {
  const topLevelReferrers =
    data?.filter((u) => u.referrals && u.referrals.length > 0) || [];

  return (
    <Card className="neon-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Referral Chains
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 max-h-[600px] overflow-y-auto">
        {topLevelReferrers.length > 0 ? (
          topLevelReferrers.map((user) => (
            <div
              key={user.id}
              className="pb-4 border-b border-secondary last:border-0"
            >
              <ReferralNode user={user} />
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">
            No referral chains found.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
