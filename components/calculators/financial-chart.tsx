'use client'

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatINR, formatNumber } from '@/lib/format'

type ChartType = 'area' | 'line' | 'bar' | 'stacked-bar'

export function FinancialChart({
  data,
  xKey,
  series,
  type = 'area',
  height = 280,
}: {
  data: Record<string, string | number>[]
  xKey: string
  series: { key: string; label: string; color?: string }[]
  type?: ChartType
  height?: number
}) {
  const colors = ['var(--color-chart-1)', 'var(--color-chart-2)', 'var(--color-chart-3)']

  const tooltipFormatter = (value: number, name: string) => [
    formatINR(value, { decimals: 0 }),
    name,
  ]

  const tickFormatter = (v: number) => formatNumber(v, 0)

  if (type === 'bar' || type === 'stacked-bar') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey={xKey} tick={{ fontSize: 12 }} className="text-muted-foreground" />
          <YAxis tickFormatter={tickFormatter} tick={{ fontSize: 12 }} width={56} />
          <Tooltip formatter={tooltipFormatter} />
          <Legend />
          {series.map((s, i) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label}
              fill={s.color ?? colors[i % colors.length]}
              stackId={type === 'stacked-bar' ? 'stack' : undefined}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    )
  }

  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={tickFormatter} tick={{ fontSize: 12 }} width={56} />
          <Tooltip formatter={tooltipFormatter} />
          <Legend />
          {series.map((s, i) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color ?? colors[i % colors.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={tickFormatter} tick={{ fontSize: 12 }} width={56} />
        <Tooltip formatter={tooltipFormatter} />
        <Legend />
        {series.map((s, i) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color ?? colors[i % colors.length]}
            fill={s.color ?? colors[i % colors.length]}
            fillOpacity={0.15}
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}
