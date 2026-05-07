"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Check,
  X,
  Eye,
  Clock,
  Wallet,
  Hash,
  Calendar,
  ArrowRight,
  User as UserIcon,
  MessageSquare,
  AlertTriangle,
  DollarSign,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { WithdrawalStatus, Withdraws } from "@/types/withdraws.types";
import { useUpdateWithdrawStatus } from "@/views/withdraws/useWithdraws";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TransactionCardProps {
  withdrawal: Withdraws;
}

export function TransactionCard({ withdrawal }: TransactionCardProps) {
  const {
    walletId,
    userId,
    amount,
    status,
    binancePayId,
    _id,
    createdAt,
    processedBy,
    processedAt,
    adminNotes,
    rejectionReason,
  } = withdrawal;

  const [notes, setNotes] = useState("");
  const updateStatusMutation = useUpdateWithdrawStatus();

  const getStatusConfig = (status: WithdrawalStatus) => {
    switch (status) {
      case WithdrawalStatus.APPROVED:
        return {
          color: "text-primary border-primary/20 bg-primary/5",
          icon: Check,
          label: "Approved",
        };
      case WithdrawalStatus.PENDING:
        return {
          color: "text-yellow-500 border-yellow-500/20 bg-yellow-500/5",
          icon: Clock,
          label: "Pending",
        };
      case WithdrawalStatus.REJECTED:
        return {
          color: "text-red-500 border-red-500/20 bg-red-500/5",
          icon: X,
          label: "Rejected",
        };
      case WithdrawalStatus.COMPLETED:
        return {
          color: "text-green-500 border-green-500/20 bg-green-500/5",
          icon: Check,
          label: "Completed",
        };
      default:
        return {
          color: "text-muted-foreground",
          icon: AlertTriangle,
          label: status,
        };
    }
  };

  const config = getStatusConfig(status);

  console.log("withdrawal", withdrawal);

  return (
    <Card className="relative group/card bg-black/40 backdrop-blur-3xl border-white/[0.03] hover:border-primary/20 transition-all duration-500 overflow-hidden">
      {/* Status Accent Line */}
      <div
        className={`absolute top-0 left-0 w-[2px] h-full ${config.color.split(" ")[0]} opacity-30 group-hover/card:opacity-100 transition-opacity`}
      />

      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
          {/* User Profile Info */}
          <div className="flex items-center gap-4 min-w-[240px]">
            <div className="relative">
              <Avatar className="h-14 w-14 border-2 border-white/[0.05] group-hover/card:border-primary/20 transition-colors">
                <AvatarFallback className="bg-white/5 text-primary text-xl font-bold">
                  {(userId?.name
                    ? userId.name
                    : `${userId?.firstName || ""} ${userId?.lastName || ""}`
                  )
                    .trim()
                    .split(" ")
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div
                className={`absolute -bottom-1 -right-1 p-1 bg-black rounded-full border border-white/5 ${config.color.split(" ")[0]}`}
              >
                <config.icon className="h-3 w-3" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">{userId?.name}</h3>
                <Badge
                  variant="outline"
                  className={`text-[10px] uppercase tracking-tighter ${config.color} border-none font-black`}
                >
                  {status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                {userId?.email}
              </p>
            </div>
          </div>

          {/* Financial Metadata */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-3 w-3" />
                <span className="text-[10px] uppercase font-bold tracking-widest">
                  Amount
                </span>
              </div>
              <p className="text-xl font-black text-primary">
                ${amount?.toLocaleString()}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Hash className="h-3 w-3" />
                <span className="text-[10px] uppercase font-bold tracking-widest">
                  Pay ID
                </span>
              </div>
              <p className="text-sm font-mono text-white/80 truncate max-w-[120px]">
                {binancePayId ||
                  (typeof walletId === "object"
                    ? (walletId as any)?.address || (walletId as any)?._id
                    : walletId) ||
                  "N/A"}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span className="text-[10px] uppercase font-bold tracking-widest">
                  Requested
                </span>
              </div>
              <p className="text-xs font-medium text-white/60">
                {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <UserIcon className="h-3 w-3" />
                <span className="text-[10px] uppercase font-bold tracking-widest">
                  Processor
                </span>
              </div>
              <p className="text-xs font-medium text-white/60">
                {processedBy?.firstName || "Pending"}
              </p>
            </div>
          </div>

          {/* Detailed View / Actions */}
          <div className="flex items-center gap-3 w-full lg:w-auto mt-4 lg:mt-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-12 w-12 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 hover:bg-primary/5 group/eye"
                >
                  <Eye className="h-5 w-5 text-muted-foreground group-hover/eye:text-primary transition-colors" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black/90 backdrop-blur-2xl border-white/5 text-white max-w-lg hover:border-primary/20">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black neon-text">
                    Transaction Details
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <Label className="text-[10px] uppercase text-muted-foreground tracking-widest mb-2 block">
                        User ID
                      </Label>
                      <p className="font-mono text-sm">{userId?._id}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <Label className="text-[10px] uppercase text-muted-foreground tracking-widest mb-2 block">
                        Request Date
                      </Label>
                      <p className="text-sm">
                        {createdAt
                          ? new Date(createdAt).toLocaleString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  {adminNotes && (
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <Label className="flex items-center gap-2 text-[10px] uppercase text-primary tracking-widest mb-2">
                        <MessageSquare className="h-3 w-3" /> Admin Notes
                      </Label>
                      <p className="text-sm italic">"{adminNotes}"</p>
                    </div>
                  )}

                  {rejectionReason && (
                    <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                      <Label className="flex items-center gap-2 text-[10px] uppercase text-red-500 tracking-widest mb-2">
                        <AlertTriangle className="h-3 w-3" /> Rejection Reason
                      </Label>
                      <p className="text-sm italic">"{rejectionReason}"</p>
                    </div>
                  )}

                  {status === WithdrawalStatus.PENDING && (
                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-muted-foreground">
                          Internal Notes (Optional)
                        </Label>
                        <Input
                          placeholder="Add reason for approval or rejection..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="bg-white/5 border-white/10 h-10 text-sm"
                        />
                      </div>
                      <div className="flex gap-4">
                        <Button
                          variant="destructive"
                          onClick={() =>
                            updateStatusMutation.mutate({
                              id: _id || "",
                              status: WithdrawalStatus.REJECTED,
                              rejectionReason: notes,
                            })
                          }
                          disabled={updateStatusMutation.isPending}
                          className="flex-1 h-12"
                        >
                          Reject Request
                        </Button>
                        <Button
                          onClick={() =>
                            updateStatusMutation.mutate({
                              id: _id || "",
                              status: WithdrawalStatus.APPROVED,
                              adminNotes: notes,
                            })
                          }
                          disabled={updateStatusMutation.isPending}
                          className="flex-1 h-12 bg-primary text-black font-black"
                        >
                          Approve Request
                        </Button>
                      </div>
                    </div>
                  )}

                  {status === WithdrawalStatus.APPROVED && (
                    <Button
                      onClick={() =>
                        updateStatusMutation.mutate({
                          id: _id || "",
                          status: WithdrawalStatus.COMPLETED,
                        })
                      }
                      disabled={updateStatusMutation.isPending}
                      className="w-full h-12 bg-green-500 hover:bg-green-600 text-black font-black"
                    >
                      Mark as Completed
                    </Button>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <div
              className={`p-1 rounded-full ${config.color} opacity-20 hidden lg:block`}
            >
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
