"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Eye, EyeOff, Loader, Lock, Mail } from "lucide-react"
import { Controller } from "react-hook-form"
import useLogin from "./useLogin"


export default function LoginPage() {
  const {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    showPassword,
    setShowPassword,
  } = useLogin()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0A0A0A]">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#BFFF00]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#BFFF00]/5 rounded-full blur-[100px]" />
      </div>

      <Card className="w-full max-w-md relative z-10 neon-border bg-black/50 backdrop-blur-sm">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#BFFF00]/10 flex items-center justify-center neon-glow-sm">
            <Lock className="w-8 h-8 text-[#BFFF00]" />
          </div>
          <CardTitle className="text-3xl font-bold neon-text">
            Admin Login
          </CardTitle>
          <CardDescription>
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Email is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="admin@example.com"
                      className="pl-10 neon-border bg-black/30"
                    />
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 neon-border bg-black/30"
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-sm">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="w-4 h-4 rounded border-[#BFFF00]/30"
                    />
                    <span className="text-muted-foreground">
                      Remember me
                    </span>
                  </label>
                )}
              />
              <a href="#" className="text-[#BFFF00] hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full neon-glow cursor-pointer"
              disabled={isLoading}
            >
               <Loader />{isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
