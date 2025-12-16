
import { UserTable } from "@/components/user-table";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export default function Users() {
  return (
    <main className="flex-1 lg:ml-64">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold neon-text mb-2">
              User Management
            </h1>
            <p className="text-muted-foreground">
              Manage and monitor all user accounts
            </p>
          </div>
          <Button className="neon-glow">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {/* User Table */}
        <UserTable />
      </div>
    </main>
  );
}
