"use client"

import { useEffect, useState } from "react"
import { getMarketStatus } from "@/lib/market-hours"
import { cn } from "@/lib/utils"

export function MarketStatusBadge({ className }: { className?: string }) {
  // Compute on the client to reflect the viewer's real time against IST market hours.
  const [status, setStatus] = useState<ReturnType<typeof getMarketStatus> | null>(null)

  useEffect(() => {
    setStatus(getMarketStatus())
    const id = setInterval(() => setStatus(getMarketStatus()), 30_000)
    return () => clearInterval(id)
  }, [])

  if (!status) {
    return <span className="h-6 w-16 animate-pulse rounded-full bg-muted" aria-hidden />
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        status.isOpen ? "bg-success/10 text-success" : "bg-muted text-muted-foreground",
        className,
      )}
      title={status.label}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full", status.isOpen ? "bg-success" : "bg-muted-foreground")}
        aria-hidden
      />
      {status.isOpen ? "Market open" : "Market closed"}
    </span>
  )
}
