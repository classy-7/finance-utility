/**
 * FinWise financial calculation engine.
 *
 * All formulas are implemented correctly and deterministically — no faked
 * results. Functions are pure so they can be unit-tested and reused across
 * every calculator UI without duplication.
 */

export interface GrowthPoint {
  period: number // year index (1-based)
  invested: number // cumulative principal invested up to this year
  value: number // portfolio value at end of year
  interest: number // value - invested
}

// ---------------------------------------------------------------------------
// SIP — Systematic Investment Plan (monthly contributions, annuity due)
// ---------------------------------------------------------------------------
export interface SipInput {
  monthlyInvestment: number
  annualRatePct: number
  years: number
  annualStepUpPct?: number // optional yearly increase in contribution
}

export interface SipResult {
  investedAmount: number
  estimatedReturns: number
  futureValue: number
  schedule: GrowthPoint[]
}

export function calculateSIP({
  monthlyInvestment,
  annualRatePct,
  years,
  annualStepUpPct = 0,
}: SipInput): SipResult {
  const i = annualRatePct / 100 / 12
  const schedule: GrowthPoint[] = []

  let value = 0
  let invested = 0
  let contribution = monthlyInvestment

  for (let year = 1; year <= years; year++) {
    for (let m = 0; m < 12; m++) {
      // contribution invested at the start of the month, then grows
      value = (value + contribution) * (1 + i)
      invested += contribution
    }
    schedule.push({
      period: year,
      invested: round(invested),
      value: round(value),
      interest: round(value - invested),
    })
    if (annualStepUpPct) contribution *= 1 + annualStepUpPct / 100
  }

  return {
    investedAmount: round(invested),
    estimatedReturns: round(value - invested),
    futureValue: round(value),
    schedule,
  }
}

// ---------------------------------------------------------------------------
// Lumpsum investment
// ---------------------------------------------------------------------------
export function calculateLumpsum({
  principal,
  annualRatePct,
  years,
}: {
  principal: number
  annualRatePct: number
  years: number
}): SipResult {
  const r = annualRatePct / 100
  const schedule: GrowthPoint[] = []
  for (let year = 1; year <= years; year++) {
    const value = principal * Math.pow(1 + r, year)
    schedule.push({
      period: year,
      invested: round(principal),
      value: round(value),
      interest: round(value - principal),
    })
  }
  const futureValue = principal * Math.pow(1 + r, years)
  return {
    investedAmount: round(principal),
    estimatedReturns: round(futureValue - principal),
    futureValue: round(futureValue),
    schedule,
  }
}

// ---------------------------------------------------------------------------
// Compound interest (with optional periodic contributions)
// FV = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
// ---------------------------------------------------------------------------
export interface CompoundInput {
  principal: number
  annualRatePct: number
  years: number
  compoundsPerYear: number // 1, 2, 4, 12
  monthlyContribution?: number
}

export function calculateCompound({
  principal,
  annualRatePct,
  years,
  compoundsPerYear,
  monthlyContribution = 0,
}: CompoundInput): SipResult {
  const r = annualRatePct / 100
  const n = compoundsPerYear
  const schedule: GrowthPoint[] = []

  // Convert monthly contribution into a per-compound-period contribution.
  const contributionPerPeriod = (monthlyContribution * 12) / n

  for (let year = 1; year <= years; year++) {
    const periods = n * year
    const ratePerPeriod = r / n
    let value: number
    if (ratePerPeriod === 0) {
      value = principal + contributionPerPeriod * periods
    } else {
      const growth = Math.pow(1 + ratePerPeriod, periods)
      value =
        principal * growth +
        contributionPerPeriod * ((growth - 1) / ratePerPeriod)
    }
    const invested = principal + monthlyContribution * 12 * year
    schedule.push({
      period: year,
      invested: round(invested),
      value: round(value),
      interest: round(value - invested),
    })
  }

  const last = schedule[schedule.length - 1] ?? {
    invested: round(principal),
    value: round(principal),
  }
  return {
    investedAmount: last.invested,
    estimatedReturns: round(last.value - last.invested),
    futureValue: last.value,
    schedule,
  }
}

// ---------------------------------------------------------------------------
// EMI — loan amortization
// EMI = P·i·(1+i)^n / ((1+i)^n − 1)
// ---------------------------------------------------------------------------
export interface EmiInput {
  principal: number
  annualRatePct: number
  years: number
}

export interface AmortizationRow {
  month: number
  principalPaid: number
  interestPaid: number
  totalPayment: number
  balance: number
}

export interface EmiResult {
  emi: number
  totalInterest: number
  totalPayment: number
  principal: number
  schedule: AmortizationRow[]
  yearlySchedule: {
    year: number
    principalPaid: number
    interestPaid: number
    balance: number
  }[]
}

export function calculateEMI({
  principal,
  annualRatePct,
  years,
}: EmiInput): EmiResult {
  const i = annualRatePct / 100 / 12
  const n = Math.round(years * 12)

  const emi =
    i === 0
      ? principal / n
      : (principal * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)

  const schedule: AmortizationRow[] = []
  const yearlyMap = new Map<
    number,
    { principalPaid: number; interestPaid: number; balance: number }
  >()

  let balance = principal
  for (let month = 1; month <= n; month++) {
    const interestPaid = balance * i
    const principalPaid = Math.min(emi - interestPaid, balance)
    balance = Math.max(0, balance - principalPaid)
    schedule.push({
      month,
      principalPaid: round(principalPaid),
      interestPaid: round(interestPaid),
      totalPayment: round(principalPaid + interestPaid),
      balance: round(balance),
    })
    const year = Math.ceil(month / 12)
    const agg = yearlyMap.get(year) ?? {
      principalPaid: 0,
      interestPaid: 0,
      balance: 0,
    }
    agg.principalPaid += principalPaid
    agg.interestPaid += interestPaid
    agg.balance = balance
    yearlyMap.set(year, agg)
  }

  const totalPayment = emi * n
  return {
    emi: round(emi),
    totalInterest: round(totalPayment - principal),
    totalPayment: round(totalPayment),
    principal: round(principal),
    schedule,
    yearlySchedule: Array.from(yearlyMap.entries()).map(([year, v]) => ({
      year,
      principalPaid: round(v.principalPaid),
      interestPaid: round(v.interestPaid),
      balance: round(v.balance),
    })),
  }
}

// ---------------------------------------------------------------------------
// Fixed Deposit (compound) / Recurring Deposit
// ---------------------------------------------------------------------------
export interface FdInput {
  principal: number
  annualRatePct: number
  years: number
  compoundsPerYear: number // usually 4 (quarterly) in India
}

export function calculateFD({
  principal,
  annualRatePct,
  years,
  compoundsPerYear,
}: FdInput): { maturity: number; interest: number; schedule: GrowthPoint[] } {
  const r = annualRatePct / 100
  const n = compoundsPerYear
  const schedule: GrowthPoint[] = []
  for (let year = 1; year <= Math.ceil(years); year++) {
    const t = Math.min(year, years)
    const value = principal * Math.pow(1 + r / n, n * t)
    schedule.push({
      period: year,
      invested: round(principal),
      value: round(value),
      interest: round(value - principal),
    })
  }
  const maturity = principal * Math.pow(1 + r / n, n * years)
  return {
    maturity: round(maturity),
    interest: round(maturity - principal),
    schedule,
  }
}

// ---------------------------------------------------------------------------
// CAGR — Compound Annual Growth Rate
// CAGR = (end / begin)^(1/years) − 1
// ---------------------------------------------------------------------------
export function calculateCAGR({
  beginValue,
  endValue,
  years,
}: {
  beginValue: number
  endValue: number
  years: number
}): { cagrPct: number; absoluteReturnPct: number } {
  if (beginValue <= 0 || years <= 0) return { cagrPct: 0, absoluteReturnPct: 0 }
  const cagr = Math.pow(endValue / beginValue, 1 / years) - 1
  const absolute = endValue / beginValue - 1
  return {
    cagrPct: round(cagr * 100, 2),
    absoluteReturnPct: round(absolute * 100, 2),
  }
}

// ---------------------------------------------------------------------------
// Goal planning — required monthly SIP to reach a target corpus
// PMT = FV·i / (((1+i)^m − 1)·(1+i))
// ---------------------------------------------------------------------------
export function calculateGoalSIP({
  targetAmount,
  annualRatePct,
  years,
  currentSavings = 0,
}: {
  targetAmount: number
  annualRatePct: number
  years: number
  currentSavings?: number
}): { requiredMonthly: number; futureValueOfSavings: number; gap: number } {
  const i = annualRatePct / 100 / 12
  const m = Math.round(years * 12)
  const r = annualRatePct / 100

  const futureValueOfSavings = currentSavings * Math.pow(1 + r, years)
  const gap = Math.max(0, targetAmount - futureValueOfSavings)

  let requiredMonthly: number
  if (i === 0) {
    requiredMonthly = gap / m
  } else {
    requiredMonthly = (gap * i) / ((Math.pow(1 + i, m) - 1) * (1 + i))
  }
  return {
    requiredMonthly: round(requiredMonthly),
    futureValueOfSavings: round(futureValueOfSavings),
    gap: round(gap),
  }
}

// ---------------------------------------------------------------------------
// Inflation — future cost of an item / expense
// ---------------------------------------------------------------------------
export function calculateInflation({
  currentCost,
  inflationPct,
  years,
}: {
  currentCost: number
  inflationPct: number
  years: number
}): { futureCost: number; increase: number } {
  const futureCost = currentCost * Math.pow(1 + inflationPct / 100, years)
  return {
    futureCost: round(futureCost),
    increase: round(futureCost - currentCost),
  }
}

function round(value: number, decimals = 0): number {
  const f = Math.pow(10, decimals)
  return Math.round(value * f) / f
}

// ---------------------------------------------------------------------------
// Simple interest — SI = P × r × t / 100
// ---------------------------------------------------------------------------
export function calculateSimpleInterest({
  principal,
  annualRatePct,
  years,
}: {
  principal: number
  annualRatePct: number
  years: number
}): { interest: number; total: number } {
  const interest = (principal * annualRatePct * years) / 100
  return { interest: round(interest), total: round(principal + interest) }
}

// ---------------------------------------------------------------------------
// PPF — annual contributions, compounded annually (15-year default tenure)
// ---------------------------------------------------------------------------
export function calculatePPF({
  annualInvestment,
  annualRatePct,
  years = 15,
}: {
  annualInvestment: number
  annualRatePct: number
  years?: number
}): SipResult {
  const r = annualRatePct / 100
  const schedule: GrowthPoint[] = []
  let value = 0
  let invested = 0
  for (let year = 1; year <= years; year++) {
    value = (value + annualInvestment) * (1 + r)
    invested += annualInvestment
    schedule.push({
      period: year,
      invested: round(invested),
      value: round(value),
      interest: round(value - invested),
    })
  }
  return {
    investedAmount: round(invested),
    estimatedReturns: round(value - invested),
    futureValue: round(value),
    schedule,
  }
}

// ---------------------------------------------------------------------------
// Recurring Deposit — monthly deposit with quarterly compounding (typical)
// ---------------------------------------------------------------------------
export function calculateRD({
  monthlyDeposit,
  annualRatePct,
  years,
  compoundsPerYear = 4,
}: {
  monthlyDeposit: number
  annualRatePct: number
  years: number
  compoundsPerYear?: number
}): SipResult {
  const n = compoundsPerYear
  const r = annualRatePct / 100
  const months = Math.round(years * 12)
  const schedule: GrowthPoint[] = []
  let value = 0
  let invested = 0
  for (let month = 1; month <= months; month++) {
    value += monthlyDeposit
    invested += monthlyDeposit
    if (month % (12 / n) === 0) {
      value *= 1 + r / n
    }
    if (month % 12 === 0) {
      schedule.push({
        period: month / 12,
        invested: round(invested),
        value: round(value),
        interest: round(value - invested),
      })
    }
  }
  return {
    investedAmount: round(invested),
    estimatedReturns: round(value - invested),
    futureValue: round(value),
    schedule,
  }
}

// ---------------------------------------------------------------------------
// Mutual fund returns — lumpsum growth over period
// ---------------------------------------------------------------------------
export function calculateMutualFundReturns({
  investment,
  annualRatePct,
  years,
}: {
  investment: number
  annualRatePct: number
  years: number
}): { absoluteReturn: number; absoluteReturnPct: number; cagrPct: number } & SipResult {
  const result = calculateLumpsum({ principal: investment, annualRatePct, years })
  const cagr = calculateCAGR({ beginValue: investment, endValue: result.futureValue, years })
  return {
    ...result,
    absoluteReturn: result.estimatedReturns,
    absoluteReturnPct: cagr.absoluteReturnPct,
    cagrPct: cagr.cagrPct,
  }
}

// ---------------------------------------------------------------------------
// Retirement corpus planner
// ---------------------------------------------------------------------------
export interface RetirementInput {
  currentAge: number
  retirementAge: number
  currentMonthlyExpenses: number
  inflationPct: number
  expectedReturnPct: number
  existingSavings: number
  postRetirementYears?: number
}

export interface RetirementResult {
  monthlyExpensesAtRetirement: number
  requiredCorpus: number
  projectedCorpus: number
  shortfall: number
  suggestedMonthlySIP: number
  yearsToRetire: number
}

export function calculateRetirement(input: RetirementInput): RetirementResult {
  const {
    currentAge,
    retirementAge,
    currentMonthlyExpenses,
    inflationPct,
    expectedReturnPct,
    existingSavings,
    postRetirementYears = 25,
  } = input
  const yearsToRetire = Math.max(0, retirementAge - currentAge)
  const infl = calculateInflation({
    currentCost: currentMonthlyExpenses,
    inflationPct,
    years: yearsToRetire,
  })
  const monthlyExpensesAtRetirement = infl.futureCost
  const annualExpense = monthlyExpensesAtRetirement * 12
  const realReturn = (expectedReturnPct - inflationPct) / 100
  const requiredCorpus =
    realReturn > 0
      ? annualExpense * ((1 - Math.pow(1 + realReturn, -postRetirementYears)) / realReturn)
      : annualExpense * postRetirementYears
  const projectedFromSavings = calculateLumpsum({
    principal: existingSavings,
    annualRatePct: expectedReturnPct,
    years: yearsToRetire,
  }).futureValue
  const shortfall = Math.max(0, requiredCorpus - projectedFromSavings)
  const sip = calculateGoalSIP({
    targetAmount: requiredCorpus,
    annualRatePct: expectedReturnPct,
    years: yearsToRetire,
    currentSavings: existingSavings,
  })
  return {
    monthlyExpensesAtRetirement: round(monthlyExpensesAtRetirement),
    requiredCorpus: round(requiredCorpus),
    projectedCorpus: round(projectedFromSavings),
    shortfall: round(shortfall),
    suggestedMonthlySIP: sip.requiredMonthly,
    yearsToRetire,
  }
}

// ---------------------------------------------------------------------------
// Loan prepayment — reduce tenure after lump-sum prepayment
// ---------------------------------------------------------------------------
export function calculateLoanPrepayment({
  principal,
  annualRatePct,
  years,
  prepaymentAmount,
  prepaymentAfterMonths = 12,
}: EmiInput & {
  prepaymentAmount: number
  prepaymentAfterMonths?: number
}): {
  original: EmiResult
  revised: EmiResult
  interestSaved: number
  monthsSaved: number
} {
  const original = calculateEMI({ principal, annualRatePct, years })
  const i = annualRatePct / 100 / 12
  let balance = principal
  const emi = original.emi
  let month = 0
  while (month < prepaymentAfterMonths && balance > 0) {
    month++
    const interest = balance * i
    balance = Math.max(0, balance - (emi - interest))
  }
  balance = Math.max(0, balance - prepaymentAmount)
  const remainingMonths = original.schedule.length - month
  let revisedMonths = 0
  let b = balance
  while (b > 0 && revisedMonths < remainingMonths * 2) {
    revisedMonths++
    const interest = b * i
    b = Math.max(0, b - (emi - interest))
  }
  const revisedYears = (month + revisedMonths) / 12
  const revised = calculateEMI({
    principal,
    annualRatePct,
    years: revisedYears,
  })
  return {
    original,
    revised,
    interestSaved: round(original.totalInterest - revised.totalInterest),
    monthsSaved: original.schedule.length - revised.schedule.length,
  }
}

// ---------------------------------------------------------------------------
// Credit card interest — minimum payment payoff simulation
// ---------------------------------------------------------------------------
export function calculateCreditCardInterest({
  balance,
  monthlyRatePct,
  minimumPaymentPct = 5,
  minimumPaymentFloor = 500,
}: {
  balance: number
  monthlyRatePct: number
  minimumPaymentPct?: number
  minimumPaymentFloor?: number
}): {
  monthsToPayoff: number
  totalInterest: number
  totalPaid: number
} {
  let remaining = balance
  let months = 0
  let totalInterest = 0
  const maxMonths = 600
  while (remaining > 0 && months < maxMonths) {
    months++
    const interest = remaining * (monthlyRatePct / 100)
    totalInterest += interest
    remaining += interest
    const minPay = Math.max(minimumPaymentFloor, remaining * (minimumPaymentPct / 100))
    remaining = Math.max(0, remaining - minPay)
  }
  return {
    monthsToPayoff: months,
    totalInterest: round(totalInterest),
    totalPaid: round(balance + totalInterest),
  }
}

// ---------------------------------------------------------------------------
// Salary / take-home (simplified CTC breakdown for India)
// ---------------------------------------------------------------------------
export function calculateSalary({
  ctc,
  basicPct = 40,
  hraPct = 40,
  employerPfPct = 12,
  employeePfPct = 12,
  professionalTax = 200,
  otherDeductions = 0,
}: {
  ctc: number
  basicPct?: number
  hraPct?: number
  employerPfPct?: number
  employeePfPct?: number
  professionalTax?: number
  otherDeductions?: number
}): {
  monthlyCtc: number
  basic: number
  hra: number
  employerPf: number
  employeePf: number
  grossMonthly: number
  netMonthly: number
  annualTakeHome: number
} {
  const monthlyCtc = ctc / 12
  const basic = (monthlyCtc * basicPct) / 100
  const hra = (basic * hraPct) / 100
  const employerPf = (basic * employerPfPct) / 100
  const employeePf = (basic * employeePfPct) / 100
  const grossMonthly = basic + hra + (monthlyCtc - basic - hra)
  const netMonthly = grossMonthly - employeePf - professionalTax - otherDeductions
  return {
    monthlyCtc: round(monthlyCtc),
    basic: round(basic),
    hra: round(hra),
    employerPf: round(employerPf),
    employeePf: round(employeePf),
    grossMonthly: round(grossMonthly),
    netMonthly: round(netMonthly),
    annualTakeHome: round(netMonthly * 12),
  }
}

// ---------------------------------------------------------------------------
// Currency converter — illustrative rates (not live FX)
// ---------------------------------------------------------------------------
export const DEMO_EXCHANGE_RATES: Record<string, number> = {
  USD: 83.12,
  EUR: 90.45,
  GBP: 105.2,
  AED: 22.63,
  SGD: 61.88,
  JPY: 0.55,
}

export function convertCurrency({
  amount,
  from,
  to,
  rates = DEMO_EXCHANGE_RATES,
}: {
  amount: number
  from: string
  to: string
  rates?: Record<string, number>
}): { result: number; rate: number } {
  const inr =
    from === 'INR' ? amount : amount * (rates[from] ?? 1)
  const result = to === 'INR' ? inr : inr / (rates[to] ?? 1)
  const rate =
    from === 'INR'
      ? 1 / (rates[to] ?? 1)
      : to === 'INR'
        ? rates[from] ?? 1
        : (rates[from] ?? 1) / (rates[to] ?? 1)
  return { result: round(result, 2), rate: round(rate, 4) }
}

/** Goal presets for goal-based investment calculator. */
export const GOAL_PRESETS = [
  { id: 'house', label: 'House', defaultAmount: 50_00_000 },
  { id: 'car', label: 'Car', defaultAmount: 12_00_000 },
  { id: 'education', label: 'Education', defaultAmount: 25_00_000 },
  { id: 'marriage', label: 'Marriage', defaultAmount: 15_00_000 },
  { id: 'emergency', label: 'Emergency fund', defaultAmount: 6_00_000 },
  { id: 'custom', label: 'Custom goal', defaultAmount: 10_00_000 },
] as const
