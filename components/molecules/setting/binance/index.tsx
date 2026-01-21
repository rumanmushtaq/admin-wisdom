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
import useBinance from "./useBinance";
import { Landmark, Loader } from "lucide-react";

const Index = () => {
  const {
    onSubmit,
    control,
    handleSubmit,
    errors,
    isPending,
  } = useBinance();
  return (
    <Card className="neon-border">
      <CardHeader>
        <CardTitle>Binance Settings</CardTitle>
        <CardDescription>Configure binance program parameters</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Binance</Label>
            <div className="relative">
              <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Controller
                name="binance"
                control={control}
                rules={{ required: "Binance is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="23425225232ad34243"
                    className="pl-10 neon-border bg-black/30"
                  />
                )}
              />
            </div>
            {errors.binance && (
              <p className="text-red-500 text-xs">{errors.binance.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="neon-glow cursor-pointer"
            disabled={isPending}
          >
            {isPending && <Loader />}Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Index;
