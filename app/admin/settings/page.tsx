import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold neon-text mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage platform configuration and preferences</p>
          </div>

          {/* Settings Cards */}
          <div className="space-y-6">
            {/* Platform Settings */}
            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure basic platform information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" placeholder="Crypto Earning Platform" className="neon-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" type="email" placeholder="support@platform.com" className="neon-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-deposit">Minimum Deposit Amount</Label>
                  <Input id="min-deposit" type="number" placeholder="10" className="neon-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-withdrawal">Minimum Withdrawal Amount</Label>
                  <Input id="min-withdrawal" type="number" placeholder="25" className="neon-border" />
                </div>
                <Button className="neon-glow">Save Changes</Button>
              </CardContent>
            </Card>

            {/* Referral Settings */}
            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Referral Settings</CardTitle>
                <CardDescription>Configure referral program parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="referral-commission">Referral Commission (%)</Label>
                  <Input id="referral-commission" type="number" placeholder="10" className="neon-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referral-bonus">Sign-up Bonus ($)</Label>
                  <Input id="referral-bonus" type="number" placeholder="5" className="neon-border" />
                </div>
                <Button className="neon-glow">Save Changes</Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Deposit Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts for new deposits</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Withdrawal Request Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified of withdrawal requests</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New User Registration</Label>
                    <p className="text-sm text-muted-foreground">Alert when new users register</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Support Request Alerts</Label>
                    <p className="text-sm text-muted-foreground">Notify about new support requests</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage admin security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" className="neon-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" className="neon-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" className="neon-border" />
                </div>
                <Button className="neon-glow">Update Password</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
