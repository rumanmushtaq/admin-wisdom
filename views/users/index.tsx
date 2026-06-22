import { UserTable } from "@/components/user-table";
import { Button } from "@/components/ui/button";
import { UserPlus, Users as UsersIcon } from "lucide-react";

export default function Users() {
  return (
    <main className="flex-1 w-full lg:ml-64 bg-[#020202] min-h-screen selection:bg-primary/30 selection:text-white">
      <div className="p-8 lg:p-12 max-w-[1400px] mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <UsersIcon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-primary/60">
                User Management
              </span>
            </div>
            <h1 className="text-6xl font-black tracking-tight text-white leading-tight">
              Accounts <span className="text-primary">.</span> Users
            </h1>
            <p className="text-muted-foreground/60 max-w-xl text-lg font-medium leading-relaxed">
              Manage and monitor all user accounts with precision.
            </p>
          </div>
        </div>

        {/* User Table */}
        <div className="transition-all duration-700 animate-in fade-in slide-in-from-bottom-8">
          <UserTable />
        </div>
      </div>
    </main>
  );
}
