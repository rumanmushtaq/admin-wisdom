import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import useReferral from "./useReferral";

const Index = ({ settings }: { settings: any }) => {
  const { control, handleSubmit, errors, watch, onSubmit } = useReferral({
    settings,
  });

  return (
    <Card className="neon-border">
      <CardHeader>
        <CardTitle>Referral Settings</CardTitle>
        <CardDescription>Configure referral program parameters</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="referral-commission">Referral Commission (%)</Label>
            <Controller
              name="referralCommission"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="referral-commission"
                  type="number"
                  placeholder="10"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="neon-border"
                />
              )}
              rules={{
                required: "Referral commission is required",
                min: {
                  value: 1,
                  message: "Referral commission must be at least 1%",
                },
              }}
            />
            {errors.referralCommission && (
              <p className="text-red-500">
                {errors.referralCommission.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="referral-bonus">Sign-up Bonus ($)</Label>
            <Controller
              name="referralBonus"
              control={control}
              rules={{
                required: "Sign-up bonus is required",
                min: {
                  value: 1,
                  message: "Sign-up bonus must be at least $1",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="referral-bonus"
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="5"
                  className="neon-border"
                />
              )}
            />
            {errors.referralBonus && (
              <p className="text-red-500">{errors.referralBonus.message}</p>
            )}
          </div>
          <Button type="submit" className="neon-glow">
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Index;
