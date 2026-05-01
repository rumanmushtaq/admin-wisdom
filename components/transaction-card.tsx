"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, Clock, Eye, Coins } from "lucide-react";
import { Deposit } from "@/types/deposit.types";
import { ShareStatus } from "@/views/deposit/types";
import {
  useApproveDeposit,
  useRejectDeposit,
} from "@/views/deposit/useDeposit";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ShareCreditsModal } from "./share-credits-modal";

interface TransactionCardProps {
  deposit: Deposit;
}

export function TransactionCard({ deposit }: TransactionCardProps) {
  const { user, amount, transactionId, image, status, createdAt, _id } =
    deposit;

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const approveMutation = useApproveDeposit();
  const rejectMutation = useRejectDeposit();

  const handleApprove = () => {
    if (_id) {
      approveMutation.mutate({ id: _id });
    }
  };

  const handleReject = () => {
    if (_id) {
      rejectMutation.mutate({ id: _id });
    }
  };

  return (
    <>
      <Card className="relative bg-[#080808] border-white/[0.02] hover:border-primary/20 hover:bg-[#0A0A0A] transition-all duration-500 group overflow-hidden">
        {/* Decorative Gradient Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/10 transition-colors" />

        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row lg:items-center">
            {/* User Info Section */}
            <div className="p-6 lg:w-1/4 border-b lg:border-b-0 lg:border-r border-white/[0.03]">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-12 w-12 border border-white/[0.05] group-hover:border-primary/40 transition-colors duration-500">
                    <AvatarFallback className="bg-neutral-900 text-muted-foreground font-bold uppercase">
                      {user.firstName?.[0]}
                      {user.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  {status === "approved" && (
                    <div className="absolute -bottom-1 -right-1 bg-primary text-black rounded-full p-0.5 shadow-lg">
                      <Check className="h-3 w-3 bold" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-white truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Transaction Metadata */}
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-8 p-6 lg:px-10">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/40">
                  Amount
                </p>
                <p className="text-xl font-black text-primary">
                  ${(amount ?? 0).toLocaleString()}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/40">
                  Reference
                </p>
                <p className="text-sm font-mono text-muted-foreground group-hover:text-white transition-colors">
                  #{transactionId?.slice(-8) ?? "N/A"}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/40">
                  Status
                </p>
                <Badge
                  variant="outline"
                  className={cn(
                    "border-none bg-transparent p-0 text-xs font-black uppercase tracking-widest",
                    status === "approved"
                      ? "text-green-500"
                      : status === "pending"
                        ? "text-yellow-500"
                        : "text-red-500",
                  )}
                >
                  {status}
                </Badge>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/40">
                  Timestamp
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5 font-medium">
                  <Clock className="h-3 w-3" />
                  {createdAt
                    ? new Date(createdAt).toLocaleDateString()
                    : "Pending"}
                </p>
              </div>
            </div>

            {/* Action Area */}
            <div className="p-4 lg:p-6 bg-white/[0.01] border-t lg:border-t-0 lg:border-l border-white/[0.03] flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsShareModalOpen(true)}
                className="h-10 w-10 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all"
                title="Share Credits"
              >
                <Coins className="h-5 w-5" />
              </Button>

              {image && (
                <a href={image} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all"
                  >
                    <Eye className="h-5 w-5" />
                  </Button>
                </a>
              )}

              {status === ShareStatus.PENDING && (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all px-6 font-bold"
                    onClick={handleReject}
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-full bg-primary text-black font-black hover:scale-105 transition-all px-8"
                    onClick={handleApprove}
                  >
                    Approve
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <ShareCreditsModal
        deposit={deposit}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </>
  );
}
