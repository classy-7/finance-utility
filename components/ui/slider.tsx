'use client'

import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

interface SliderProps extends Omit<ComponentProps<'input'>, 'onChange'> {
  value: number
  min: number
  max: number
  step?: number
  onValueChange: (value: number) => void
}

/**
 * Accessible range slider built on the native input[type=range] so keyboard,
 * screen-reader and touch behaviour all work out of the box. The filled track
 * is driven by a CSS gradient computed from the current value.
 */
export function Slider({
  value,
  min,
  max,
  step = 1,
  onValueChange,
  className,
  ...props
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onValueChange(Number(e.target.value))}
      className={cn(
        'h-2 w-full cursor-pointer appearance-none rounded-full bg-muted outline-none',
        'focus-visible:ring-3 focus-visible:ring-ring/40',
        // WebKit thumb
        '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-110',
        // Firefox thumb
        '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-md',
        className,
      )}
      style={{
        background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${pct}%, var(--muted) ${pct}%, var(--muted) 100%)`,
      }}
      {...props}
    />
  )
}
