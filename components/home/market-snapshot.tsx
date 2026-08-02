"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useIndices } from "@/hooks/use-market-data"
import { formatNumber } from "@/lib/format"
import { Delta } from "@/components/shared/delta"
import { DataMeta } from "@/components/shared/data-meta"
import { ErrorState } from "@/components/shared/states"
import { Skeleton } from "@/components/ui/skeleton"
import { MarketStatusBadge } from "@/components/markets/market-status-badge"

export function MarketSnapshot() {
  const { indices, meta, error, isLoading, refresh } = useIndices()

  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Market snapshot</h2>
              <MarketStatusBadge />
            </div>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Key Indian indices at a glance. Connect a data provider for real-time quotes.
            </p>
          </div>
          <Link
            href="/markets"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Open markets
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8">
          {error ? (
            <ErrorState message={(error as Error).message} onRetry={() => refresh()} />
          ) : isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-28 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {indices?.map((index) => (
                <div key={index.symbol} className="rounded-xl border border-border bg-background p-5">
                  <p className="text-sm font-medium text-muted-foreground">{index.name}</p>
                  <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">
                    {formatNumber(index.value)}
                  </p>
                  <div className="mt-2 text-sm">
                    <Delta change={index.change} changePercent={index.changePercent} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DataMeta className="mt-4" meta={meta} />
      </div>
    </section>
  )
}
