"use client"

import { AlertTriangle, RefreshCw, Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ErrorState({
  message = "We couldn't load this data right now.",
  onRetry,
  className,
}: {
  message?: string
  onRetry?: () => void
  className?: string
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-border bg-card p-8 text-center",
        className,
      )}
    >
      <AlertTriangle className="h-8 w-8 text-warning" aria-hidden />
      <div>
        <p className="font-medium text-foreground">Something went wrong</p>
        <p className="mt-1 text-sm text-muted-foreground text-balance">{message}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          We never show fabricated prices — please retry to fetch real data.
        </p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      )}
    </div>
  )
}

export function EmptyState({
  title = "Nothing here yet",
  message,
  className,
}: {
  title?: string
  message?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-card/50 p-8 text-center",
        className,
      )}
    >
      <Inbox className="h-8 w-8 text-muted-foreground" aria-hidden />
      <div>
        <p className="font-medium text-foreground">{title}</p>
        {message && <p className="mt-1 text-sm text-muted-foreground text-balance">{message}</p>}
      </div>
    </div>
  )
}
