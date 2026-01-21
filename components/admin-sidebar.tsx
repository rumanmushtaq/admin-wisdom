"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  ArrowDownCircle,
  ArrowUpCircle,
  ClipboardCheck,
  UserPlus,
  FileCheck,
  Settings,
  Menu,
  X,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import AdminSidebarFooter from "@/components/molecules/sidebar/footer"


const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/packages", icon: Settings, label: "Packages" },
  { href: "/admin/deposits", icon: ArrowDownCircle, label: "Deposits" },
  { href: "/admin/withdrawals", icon: ArrowUpCircle, label: "Withdrawals" },
  { href: "/admin/tasks", icon: ClipboardCheck, label: "Tasks" },
  { href: "/admin/referrals", icon: UserPlus, label: "Referrals" },
  { href: "/admin/requests", icon: FileCheck, label: "Requests" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  
  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden neon-glow"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r neon-border transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b neon-border px-6">
            <Zap className="h-6 w-6 text-primary neon-glow" />
            <span className="text-xl font-bold neon-text">Crypto Admin</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground neon-glow"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground hover:neon-glow",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
            <AdminSidebarFooter />
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
