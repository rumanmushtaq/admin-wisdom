"use client";

import { AdminSidebar } from "@/components/admin-sidebar";
import { NeonCard } from "@/components/neon-card";
import { ReferralTree } from "@/components/referral-tree";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  DollarSign,
  TrendingUp,
  Users,
  Edit,
  Eye,
} from "lucide-react";
import { useGetReferralChains } from "@/views/referrals/useReferrals";
import { useMemo, useState } from "react";

export default function ReferralsPage() {
  const { data: res, isLoading } = useGetReferralChains();
  const referralData = useMemo(() => res?.data || [], [res]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  // Flatten the tree to get all referrers for the table
  const allReferrers = useMemo(() => {
    const list: any[] = [];
    const process = (users: any[]) => {
      users.forEach((u) => {
        if (u.referrals && u.referrals.length > 0) {
          list.push(u);
        }
        if (u.referrals) process(u.referrals);
      });
    };
    process(referralData);
    return list.sort((a, b) => (b.referralCount || 0) - (a.referralCount || 0));
  }, [referralData]);

  // Get selected user's referral chain for the tree
  const selectedUserData = useMemo(() => {
    if (!selectedUser) return [];
    // Find the selected user in the tree and return their data
    let found: any | null = null;
    const findUser = (users: any[]) => {
      for (const u of users) {
        if (u.id === selectedUser.id) {
          found = u;
          break;
        }
        if (u.referrals) findUser(u.referrals);
      }
    };
    findUser(referralData);
    return found ? [found] : [];
  }, [referralData, selectedUser]);

  const stats = useMemo(() => {
    let totalRef = 0;
    let totalEarn = 0;

    const count = (users: any[]) => {
      users.forEach((u) => {
        totalRef += u.referrals?.length || 0;
        totalEarn += u.referralEarnings || 0;
        if (u.referrals) count(u.referrals);
      });
    };
    count(referralData);

    return {
      totalReferrals: totalRef,
      totalEarnings: totalEarn,
      activeReferrers: allReferrers.length,
      avgPerReferrer:
        allReferrers.length > 0 ? totalEarn / allReferrers.length : 0,
    };
  }, [referralData, allReferrers]);

  console.log("allReferrers", allReferrers);

  return (
      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold neon-text mb-2">
              Referrals Management
            </h1>
            <p className="text-muted-foreground">
              {selectedUser
                ? `Viewing referral chain for ${selectedUser?.firstName} ${selectedUser?.lastName}`
                : "Track and manage user referral networks"}
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <p className="neon-text animate-pulse">
                Loading referral data...
              </p>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid gap-4 md:grid-cols-4 mb-8">
                <NeonCard
                  title="Total Referrals"
                  value={stats.totalReferrals}
                  icon={UserPlus}
                />
                <NeonCard
                  title="Total Earnings"
                  value={`$${stats.totalEarnings.toFixed(2)}`}
                  icon={DollarSign}
                />
                <NeonCard
                  title="Active Referrers"
                  value={stats.activeReferrers}
                  icon={Users}
                />
                <NeonCard
                  title="Avg. Per Referrer"
                  value={`$${stats.avgPerReferrer.toFixed(2)}`}
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
                          <TableHead className="font-semibold">
                            Total Referrals
                          </TableHead>
                          <TableHead className="font-semibold">
                            Active
                          </TableHead>
                          <TableHead className="font-semibold">
                            Earnings
                          </TableHead>
                          <TableHead className="font-semibold text-right">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allReferrers.length > 0 ? (
                          allReferrers.map((item) => (
                            <TableRow
                              key={item.id}
                              className="hover:bg-secondary/30"
                            >
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8 border neon-border">
                                    <AvatarFallback className="bg-secondary text-xs">
                                      {(item?.firstName?.[0] || "") +
                                        (item?.lastName?.[0] || "") ||
                                        item?.username?.[0] ||
                                        "?"}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium text-sm">
                                      {item?.firstName} {item?.lastName}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {item?.email}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                {item.referrals.length || 0}
                              </TableCell>
                              <TableCell>{item.activeReferrals || 0}</TableCell>
                              <TableCell className="font-semibold text-primary">
                                $
                                {item.referralEarnings?.toFixed(2) ||
                                  "0.00"}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex gap-2 justify-end">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => setSelectedUser(item)}
                                    title="View referral chain"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              className="text-center py-8 text-muted-foreground"
                            >
                              No active referrers found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Referral Tree */}
                <div className="lg:col-span-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">
                      {selectedUser
                        ? "Selected User Chain"
                        : "Referral Tree View"}
                    </h3>
                    {selectedUser && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedUser(null)}
                      >
                        Clear Selection
                      </Button>
                    )}
                  </div>
                  {selectedUser ? (
                    <ReferralTree data={selectedUserData} />
                  ) : (
                    <div className="h-[400px] flex items-center justify-center border neon-border rounded-lg bg-black/20 p-8 text-center text-muted-foreground">
                      <div className="space-y-2">
                        <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>
                          Select a user from the table to view their complete
                          referral chain.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
  );
}
