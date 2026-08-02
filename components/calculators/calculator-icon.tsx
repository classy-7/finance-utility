import {
  TrendingUp,
  Landmark,
  PiggyBank,
  ReceiptIndianRupee,
  Percent,
  LineChart,
  Target,
  Coins,
  Flame,
  Calculator,
  type LucideIcon,
} from "lucide-react"

const ICONS: Record<string, LucideIcon> = {
  TrendingUp,
  Landmark,
  PiggyBank,
  ReceiptIndianRupee,
  Percent,
  LineChart,
  Target,
  Coins,
  Flame,
}

export function CalculatorIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Calculator
  return <Icon className={className} aria-hidden />
}
