"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Deposit } from "@/types/deposit.types";
import { useShareCredits } from "@/views/deposit/useDeposit";
import { toast } from "sonner";
import { Coins, Loader2 } from "lucide-react";

interface ShareCreditsModalProps {
  deposit: Deposit;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareCreditsModal({
  deposit,
  isOpen,
  onClose,
}: ShareCreditsModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const shareMutation = useShareCredits();

  const handleShare = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount greater than 0");
      return;
    }

    shareMutation.mutate(
      {
        userId: deposit.user._id,
        amount: numAmount,
        note: note || undefined,
        transactionId: deposit._id,
      },
      {
        onSuccess: () => {
          toast.success(
            `Successfully shared ${numAmount} credits with ${deposit.user.firstName}`,
          );
          onClose();
          setAmount("");
          setNote("");
        },
        onError: (error: any) => {
          toast.error(error?.data?.message || "Failed to share credits");
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-[#0A0A0A] border-white/[0.05] text-white">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Coins className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle className="text-xl font-black tracking-tight">
              Share Credits
            </DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground">
            Award manual credits to{" "}
            <span className="text-primary font-bold">
              {deposit.user.firstName} {deposit.user.lastName}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label
              htmlFor="amount"
              className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/60"
            >
              Amount (Credits)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-white/[0.02] border-white/[0.05] focus:border-primary/40 focus:ring-primary/10 h-12 text-lg font-bold"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="note"
              className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/60"
            >
              Note (Optional)
            </Label>
            <Textarea
              id="note"
              placeholder="Reason for sharing credits..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-white/[0.02] border-white/[0.05] focus:border-primary/40 focus:ring-primary/10 min-h-[100px] resize-none"
            />
          </div>
        </div>

        <DialogFooter className="gap-3 mt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white/[0.05] hover:bg-white/[0.02] text-white font-bold h-11 px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={handleShare}
            disabled={shareMutation.isPending}
            className="bg-primary hover:bg-primary/80 text-black font-black h-11 px-8 shadow-[0_0_20px_rgba(209,255,77,0.1)]"
          >
            {shareMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              "Share Credits"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
