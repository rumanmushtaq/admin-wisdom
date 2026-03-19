"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import useSettings from "@/views/settings/useSettings";

const formSchema = z.object({
  handlingFee: z.string().or(z.number()).transform((val) => {
    const num = Number(val);
    if (isNaN(num) || num < 0) {
      throw new Error("Handling fee must be at least 0");
    }
    return num;
  }),
  minDeposit: z.string().or(z.number()).transform((val) => {
    const num = Number(val);
    if (isNaN(num) || num < 0) {
      throw new Error("Minimum deposit must be at least 0");
    }
    return num;
  }),
  maxDeposit: z.string().or(z.number()).transform((val) => {
    const num = Number(val);
    if (isNaN(num) || num < 0) {
      throw new Error("Maximum deposit must be at least 0");
    }
    return num;
  }),
});


const PlateformSetting = ({ settings }: { settings: any }) => {
  const { updateSettings, isUpdating } = useSettings();

  // Use fake data if no settings provided (for testing)
  const testData = settings?.data;

  console.log("settings", settings);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      handlingFee: testData?.handlingFee || 0,
      minDeposit: testData?.minDeposit || 0,
      maxDeposit: testData?.maxDeposit || 0,
    },
  });

  useEffect(() => {
    if (testData) {
      form.reset({
        handlingFee: testData.handlingFee || 0,
        minDeposit: testData.minDeposit || 0,
        maxDeposit: testData.maxDeposit || 0,
      });
    }
  }, [testData, form]);

  const onSubmit = (values: any) => {
    updateSettings(values);
  };

  return (
    <Card className="neon-border">
      <CardHeader>
        <CardTitle>Platform Settings</CardTitle>
        <CardDescription>Configure basic platform information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="handlingFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Handling Fee (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 5"
                        className="neon-border"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="minDeposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Deposit</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 10"
                        className="neon-border"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxDeposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Deposit</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 1000"
                        className="neon-border"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="neon-glow cursor-pointer" disabled={isUpdating}>
              {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PlateformSetting;
