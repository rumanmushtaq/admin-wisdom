import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 neon-border neon-glow">
            <Zap className="h-10 w-10 text-primary" />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-bold neon-text">Crypto Admin Panel</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive admin dashboard for managing your crypto earning platform
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/admin">
            <Button size="lg" className="neon-glow text-lg px-8 py-6">
              Access Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
          <div className="neon-border rounded-lg p-4 hover:neon-glow transition-all">
            <p className="text-3xl font-bold text-primary">2,847</p>
            <p className="text-sm text-muted-foreground">Users</p>
          </div>
          <div className="neon-border rounded-lg p-4 hover:neon-glow transition-all">
            <p className="text-3xl font-bold text-primary">$45K</p>
            <p className="text-sm text-muted-foreground">Deposits</p>
          </div>
          <div className="neon-border rounded-lg p-4 hover:neon-glow transition-all">
            <p className="text-3xl font-bold text-primary">$29K</p>
            <p className="text-sm text-muted-foreground">Withdrawals</p>
          </div>
          <div className="neon-border rounded-lg p-4 hover:neon-glow transition-all">
            <p className="text-3xl font-bold text-primary">23</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
        </div>
      </div>
    </div>
  )
}
