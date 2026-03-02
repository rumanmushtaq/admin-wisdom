"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/users";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [logedInUser, setLogedInUser] = useState<User | null>(null);
  const router = useRouter();


  console.log("logedInUser", logedInUser);

  useEffect(() => {
    const userString =  localStorage.getItem("user");
    if (userString) {
      setLogedInUser(JSON.parse(userString));
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    // Clear cookies (assuming the token is stored in a cookie named 'token')
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to login
    router.push("/login");
  };

  return (
    <div className="border-t neon-border p-4">
      <div className="flex items-center gap-3 rounded-lg bg-secondary px-3 py-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shrink-0">
          <span className="text-xs font-bold text-primary-foreground">
            {logedInUser?.name?.[0] ?? "A"}
          </span>
        </div>

        <div className="flex-1 text-sm overflow-hidden">
          <p className="font-medium truncate">{logedInUser?.name}</p>
          <p className="text-xs text-muted-foreground truncate">
            {logedInUser?.email}
          </p>
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 hover:text-red-500 hover:bg-red-500/10 shrink-0" 
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
