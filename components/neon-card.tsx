import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface NeonCardProps {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  trend?: {
    value: string
    isPositive: boolean
  }
  className?: string
}

export function NeonCard({ title, value, description, icon: Icon, trend, className }: NeonCardProps) {
  return (
    <Card className={cn("neon-border hover:neon-glow transition-all duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {Icon && <Icon className="h-5 w-5 text-primary" />}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold neon-text">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <p className={cn("text-xs mt-2", trend.isPositive ? "text-green-500" : "text-red-500")}>{trend.value}</p>
        )}
      </CardContent>
    </Card>
  )
}
