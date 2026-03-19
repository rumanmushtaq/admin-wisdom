"use client";
import { AdminSidebar } from "@/components/admin-sidebar";
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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import PasswordChangeSecurity from "@/components/molecules/setting/security";
import useSettings from "./useSettings";
import ReferralSetting from "@/components/molecules/setting/referral";
import { useMemo, useState, useEffect } from "react";
import TierSetting from "@/components/molecules/setting/tier";
import TierSettingTable from "@/components/organisms/settings/tier";
import BinanceAddressSetting from "@/components/molecules/setting/binance-address";
import { Loader2 } from "lucide-react";
import PlateformSetting from "@/components/molecules/setting/plateform";

export default function SettingsPage() {
  const [form, setForm] = useState<boolean>(false);
  const { settings } = useSettings();

  const memoizedSettings = useMemo(() => settings, [settings]);
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold neon-text mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Manage platform configuration and preferences
            </p>
          </div>

          {/* Settings Cards */}
          <div className="space-y-6">
            {/* Platform Settings */}
            <PlateformSetting settings={memoizedSettings} />

            {/* Binance Wallet Addresses */}
            <BinanceAddressSetting />

            {/* Referral Settings */}
            {/* {memoizedSettings && (
              <ReferralSetting settings={memoizedSettings} />
            )} */}

            <div className="flex justify-between w-full items-center">
              <p className="text-muted-foreground">Commission Tier</p>
              <Button
                type="button"
                onClick={() => setForm(true)}
                className="cursor-pointer"
              >
                Create Tier
              </Button>
            </div>
            <TierSettingTable form={form} setForm={setForm} />

            {/* Notification Settings */}
            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Manage notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Deposit Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts for new deposits
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Withdrawal Request Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified of withdrawal requests
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New User Registration</Label>
                    <p className="text-sm text-muted-foreground">
                      Alert when new users register
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Support Request Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify about new support requests
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <PasswordChangeSecurity />
          </div>
        </div>
      </main>
    </div>
  );
}
