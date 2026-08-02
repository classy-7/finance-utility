import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatSignedPercent, formatSigned } from "@/lib/format"

export function Delta({
  change,
  changePercent,
  className,
  showIcon = true,
}: {
  change?: number
  changePercent: number
  className?: string
  showIcon?: boolean
}) {
  const positive = changePercent >= 0
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 font-medium tabular-nums",
        positive ? "text-success" : "text-danger",
        className,
      )}
    >
      {showIcon &&
        (positive ? (
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        ) : (
          <ArrowDownRight className="h-3.5 w-3.5" aria-hidden />
        ))}
      {change !== undefined && <span>{formatSigned(change)}</span>}
      <span>({formatSignedPercent(changePercent)})</span>
    </span>
  )
}
