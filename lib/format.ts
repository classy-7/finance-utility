/**
 * Formatting helpers for Indian financial figures.
 * All currency defaults to INR with the Indian numbering system (lakh/crore).
 */

export function formatINR(
  value: number,
  opts: { decimals?: number; compact?: boolean } = {},
): string {
  const { decimals = 0, compact = false } = opts
  if (!Number.isFinite(value)) return '₹0'

  if (compact) {
    return '₹' + formatIndianCompact(value, decimals)
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value)
}

/** Formats large numbers into the Indian short scale: K / L (lakh) / Cr (crore). */
export function formatIndianCompact(value: number, decimals = 2): string {
  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''
  if (abs >= 1_00_00_000) return `${sign}${(abs / 1_00_00_000).toFixed(decimals)} Cr`
  if (abs >= 1_00_000) return `${sign}${(abs / 1_00_000).toFixed(decimals)} L`
  if (abs >= 1_000) return `${sign}${(abs / 1_000).toFixed(decimals)} K`
  return `${sign}${abs.toFixed(0)}`
}

export function formatNumber(value: number, decimals = 0): string {
  if (!Number.isFinite(value)) return '0'
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value)
}

export function formatPercent(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return '0%'
  return `${value.toFixed(decimals)}%`
}

export function formatCompactNumber(value: number): string {
  return formatIndianCompact(value, 2)
}

/** Formats a raw number with an explicit +/- sign, e.g. +124.30 or -88.10. */
export function formatSigned(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return '0'
  const sign = value > 0 ? '+' : ''
  return `${sign}${formatNumber(value, decimals)}`
}

/** Formats a percentage with an explicit +/- sign, e.g. +1.24% or -0.88%. */
export function formatSignedPercent(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return '0%'
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(decimals)}%`
}

export function formatDate(input: string | number | Date): string {
  const d = new Date(input)
  if (Number.isNaN(d.getTime())) return ''
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(d)
}

export function formatRelativeTime(input: string | number | Date): string {
  const d = new Date(input)
  const diffMs = Date.now() - d.getTime()
  const mins = Math.round(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days < 30) return `${days}d ago`
  return formatDate(d)
}
