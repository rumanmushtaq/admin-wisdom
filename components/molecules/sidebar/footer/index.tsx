"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/users";

const Index = () => {
  const [logedInUser, setLogedInUser] = useState<User | null>(null);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      setLogedInUser(JSON.parse(userString));
    }
  }, []);

  return (
    <div className="border-t neon-border p-4">
      <div className="flex items-center gap-3 rounded-lg bg-secondary px-3 py-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
          <span className="text-xs font-bold text-primary-foreground">
            {logedInUser?.name?.[0] ?? "A"}
          </span>
        </div>

        <div className="flex-1 text-sm">
          <p className="font-medium">{logedInUser?.name}</p>
          <p className="text-xs text-muted-foreground">
            {logedInUser?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
