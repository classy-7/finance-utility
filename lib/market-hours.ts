/**
 * Indian equity market (NSE/BSE) hours: 09:15–15:30 IST, Monday–Friday.
 * Computed from the viewer's clock converted to IST so it stays correct across timezones.
 * Note: this does not account for NSE trading holidays; a real data provider should
 * supply authoritative session status.
 */
export type MarketStatus = {
  isOpen: boolean
  label: string
}

export function getMarketStatus(now: Date = new Date()): MarketStatus {
  // Convert current instant to IST (UTC+5:30).
  const istMs = now.getTime() + (now.getTimezoneOffset() + 330) * 60_000
  const ist = new Date(istMs)

  const day = ist.getDay() // 0 = Sunday, 6 = Saturday
  const minutes = ist.getHours() * 60 + ist.getMinutes()

  const open = 9 * 60 + 15
  const close = 15 * 60 + 30
  const isWeekday = day >= 1 && day <= 5
  const isOpen = isWeekday && minutes >= open && minutes < close

  let label: string
  if (!isWeekday) {
    label = "Closed for the weekend. Opens Monday 09:15 IST."
  } else if (minutes < open) {
    label = "Pre-open. Regular session begins 09:15 IST."
  } else if (minutes >= close) {
    label = "Closed for the day. Opens next trading day 09:15 IST."
  } else {
    label = "Regular session in progress (closes 15:30 IST)."
  }

  return { isOpen, label }
}
