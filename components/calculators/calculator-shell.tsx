'use client'

import { useCallback, useState, type ReactNode } from 'react'
import { CalculatorActions } from './calculator-actions'

export function CalculatorShell({
  title,
  children,
  results,
  chart,
  table,
  getShareText,
  getReportText,
}: {
  title: string
  children: ReactNode
  results: ReactNode
  chart?: ReactNode
  table?: ReactNode
  getShareText?: () => string
  getReportText?: () => string
}) {
  const [resetKey, setResetKey] = useState(0)

  const onReset = useCallback(() => setResetKey((k) => k + 1), [])

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div key={resetKey} className="space-y-6 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">Inputs</h2>
        {children}
        <CalculatorActions
          title={title}
          onReset={onReset}
          getShareText={getShareText}
          getReportText={getReportText}
        />
      </div>

      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">{results}</div>
        {chart && (
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Growth chart</h3>
            {chart}
          </div>
        )}
        {table && (
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Breakdown</h3>
            {table}
          </div>
        )}
      </div>
    </div>
  )
}
