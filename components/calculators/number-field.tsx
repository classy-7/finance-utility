'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { formatINR, formatNumber } from '@/lib/format'

export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  formatValue,
  showSlider = true,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
  prefix?: string
  suffix?: string
  formatValue?: (v: number) => string
  showSlider?: boolean
}) {
  const display = formatValue ? formatValue(value) : formatNumber(value)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Label>{label}</Label>
        <span className="text-sm font-medium tabular-nums text-foreground">
          {prefix}
          {display}
          {suffix}
        </span>
      </div>
      {showSlider && (
        <Slider
          value={value}
          min={min}
          max={max}
          step={step}
          onValueChange={onChange}
          aria-label={label}
        />
      )}
      <Input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />
    </div>
  )
}

export function CurrencyField(props: Omit<Parameters<typeof NumberField>[0], 'formatValue' | 'prefix'>) {
  return <NumberField {...props} prefix="₹" formatValue={(v) => formatINR(v, { decimals: 0 }).replace('₹', '')} />
}
