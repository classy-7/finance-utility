import { cn } from "@/lib/utils"
import { formatRelativeTime } from "@/lib/format"
import type { DataMeta as DataMetaType } from "@/services/types"

/**
 * Displays data provenance: source, demo/live status, delay notice, and last-updated time.
 * Used under every API-driven component so users always know where numbers came from.
 */
export function DataMeta({ meta, className }: { meta?: DataMetaType; className?: string }) {
  if (!meta) return null
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground", className)}>
      {meta.isDemo ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-2 py-0.5 font-medium text-warning">
          <span className="h-1.5 w-1.5 rounded-full bg-warning" aria-hidden />
          Demo data
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 font-medium text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
          Live
        </span>
      )}
      {meta.source && <span>Source: {meta.source}</span>}
      {meta.lastUpdated && <span>Updated {formatRelativeTime(meta.lastUpdated)}</span>}
      {meta.notice && <span className="w-full text-muted-foreground/80">{meta.notice}</span>}
    </div>
  )
}
