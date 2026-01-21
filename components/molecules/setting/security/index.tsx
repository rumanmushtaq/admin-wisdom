"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import useSecurity from "./useSecurity";
import { Eye, EyeOff, Loader, Lock, Mail } from "lucide-react";

const Index = () => {
  const {
    control,
    handleSubmit,
    errors,
    showPassword,
    setShowPassword,
    onSubmit,
    isPending,
  } = useSecurity();
  return (
    <Card className="neon-border">
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>Manage admin security settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Controller
                name="current-password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type={showPassword?.current ? "text" : "password"}
                    placeholder="Enter your current password"
                    className="pl-10 pr-10 neon-border bg-black/30"
                  />
                )}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((p) => ({
                    ...p,
                    change: !showPassword?.current,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
              >
                {showPassword?.current ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors["current-password"] && (
              <p className="text-red-500 text-xs">
                {errors["current-password"].message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Controller
                name="new-password"
                control={control}
                rules={{ required: "New Password is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type={showPassword?.new ? "text" : "password"}
                    placeholder="Enter your new password"
                    className="pl-10 pr-10 neon-border bg-black/30"
                  />
                )}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((p) => ({ ...p, new: !showPassword?.new }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
              >
                {showPassword?.new ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors["new-password"] && (
              <p className="text-red-500 text-xs">
                {errors["new-password"].message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Controller
                name="confirm-password"
                control={control}
                rules={{ required: "Confirm Password is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type={showPassword?.new ? "text" : "password"}
                    placeholder="Enter your confirm password"
                    className="pl-10 pr-10 neon-border bg-black/30"
                  />
                )}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((p) => ({
                    ...p,
                    confirm: !showPassword?.confirm,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
              >
                {showPassword?.confirm ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors["confirm-password"] && (
              <p className="text-red-500 text-xs">
                {errors["confirm-password"].message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="neon-glow cursor-pointer"
            disabled={isPending}
          >
            {isPending && <Loader />}Update Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Index;
