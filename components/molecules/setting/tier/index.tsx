"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { Controller } from "react-hook-form";
import { useCreateTier, useDeleteTier } from "./useTier";
import { Tier } from "@/types/tiers.types";
import { Trash2 } from "lucide-react";

interface PropsTypes {
  form: boolean;
  setForm: (form: boolean) => void;
  isEdit: Tier | null;
  setIsEdit: (isEdit: Tier | null) => void;
}

const Index = ({ form, setForm, isEdit, setIsEdit }: PropsTypes) => {
  const deleteMutation = useDeleteTier();
  const { control, handleSubmit, errors, onSubmit } = useCreateTier({
    tier: isEdit,
  });

  const handleClose = () => {
    setForm(false);
    setIsEdit(null);
  };

  return (
    <Dialog open={form} onOpenChange={setForm}>
      <DialogContent className="sm:max-w-[500px] neon-border">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Tier" : "Create Tier"}</DialogTitle>
          <DialogDescription>
            Configure tier program parameters
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            handleClose();
          })}
          className="space-y-4"
        >
          {/* Tier Name */}
          <div className="space-y-2">
            <Label>Tier Name</Label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Tier name is required" }}
              render={({ field }) => (
                <Input className="neon-border" {...field} />
              )}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Tier Level */}
          <div className="space-y-2">
            <Label>Tier Level</Label>
            <Controller
              name="level"
              control={control}
              rules={{ required: "Level is required", min: 0 }}
              render={({ field }) => (
                <Input
                  {...field}
                  className="neon-border"
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            {errors.level && (
              <p className="text-red-500">{errors.level.message}</p>
            )}
          </div>

          {/* Invite Percentage */}
          <div className="space-y-2">
            <Label>Referral Commission (%)</Label>
            <Controller
              name="invitePercentage"
              control={control}
              rules={{
                required: "Referral commission is required",
                min: { value: 1, message: "Minimum 1%" },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  className="neon-border"
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            {errors.invitePercentage && (
              <p className="text-red-500">{errors.invitePercentage.message}</p>
            )}
          </div>

          {/* Referral Task Percentage */}
          <div className="space-y-2">
            <Label>Referral Task Percentage (%)</Label>
            <Controller
              name="referralTaskPercentage"
              control={control}
              rules={{
                required: "Referral task percentage is required",
                min: { value: 1, message: "Minimum 1%" },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  className="neon-border"
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            {errors.referralTaskPercentage && (
              <p className="text-red-500">
                {errors.referralTaskPercentage.message}
              </p>
            )}
          </div>

          {/* Second Referral Task Percentage */}
          <div className="space-y-2">
            <Label>Second Referral Task Percentage (%)</Label>
            <Controller
              name="secondReferralTaskPercentage"
              control={control}
              rules={{
                required: "Second referral task percentage is required",
                min: { value: 0, message: "Minimum 0%" },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  className="neon-border"
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            {errors.secondReferralTaskPercentage && (
              <p className="text-red-500">
                {errors.secondReferralTaskPercentage.message}
              </p>
            )}
          </div>

          {/* Min Tasks */}
          <div className="space-y-2">
            <Label>Minimum Tasks Completed</Label>
            <Controller
              name="minTasksCompleted"
              control={control}
              rules={{ required: "Minimum tasks required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  className="neon-border"
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            {errors.minTasksCompleted && (
              <p className="text-red-500">{errors.minTasksCompleted.message}</p>
            )}
          </div>

          {/* Min Referral */}
          <div className="space-y-2">
            <Label>Minimum Referral Count</Label>
            <Controller
              name="minReferralCount"
              control={control}
              rules={{ required: "Minimum referral count required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  className="neon-border"
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            {errors.minReferralCount && (
              <p className="text-red-500">{errors.minReferralCount.message}</p>
            )}
          </div>

          {/* Active Switch */}
          <div className="flex items-center justify-between">
            <Label>Active Tier</Label>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="flex gap-2 justify-end">
            {isEdit?._id && (
              <Button
                type="button"
                className="gap-2 cursor-pointer"
                onClick={() =>
                  isEdit?._id && deleteMutation.mutate(isEdit?._id)
                }
              >
                <Trash2 /> Delete
              </Button>
            )}

            <Button type="submit" className="cursor-pointer">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Index;
