/**
 * Indian Income Tax calculator — FY 2024-25 (AY 2025-26).
 * Implements both the New Regime (default) and the Old Regime with the
 * standard 4% health & education cess and Section 87A rebate.
 *
 * This is an educational estimate and does not cover every surcharge,
 * marginal relief edge case, or special-rate income. Always verify with a
 * qualified tax professional.
 */

export type TaxRegime = 'new' | 'old'

interface Slab {
  upTo: number | null // null = no upper bound
  ratePct: number
}

const NEW_REGIME_SLABS: Slab[] = [
  { upTo: 300000, ratePct: 0 },
  { upTo: 700000, ratePct: 5 },
  { upTo: 1000000, ratePct: 10 },
  { upTo: 1200000, ratePct: 15 },
  { upTo: 1500000, ratePct: 20 },
  { upTo: null, ratePct: 30 },
]

const OLD_REGIME_SLABS: Slab[] = [
  { upTo: 250000, ratePct: 0 },
  { upTo: 500000, ratePct: 5 },
  { upTo: 1000000, ratePct: 20 },
  { upTo: null, ratePct: 30 },
]

const STANDARD_DEDUCTION = { new: 75000, old: 50000 }
// Section 87A rebate: taxable income threshold and max rebate
const REBATE_87A = {
  new: { threshold: 700000, maxRebate: 25000 },
  old: { threshold: 500000, maxRebate: 12500 },
}
const CESS_PCT = 4

export interface TaxInput {
  grossIncome: number
  regime: TaxRegime
  isSalaried: boolean
  // Old-regime deductions
  deduction80C?: number // capped at 1,50,000
  deduction80D?: number // health insurance
  hraExemption?: number
  homeLoanInterest?: number // 24(b), capped at 2,00,000
  otherDeductions?: number
}

export interface TaxSlabBreakdown {
  from: number
  to: number | null
  ratePct: number
  taxableInSlab: number
  tax: number
}

export interface TaxResult {
  regime: TaxRegime
  grossIncome: number
  totalDeductions: number
  taxableIncome: number
  slabBreakdown: TaxSlabBreakdown[]
  taxBeforeRebate: number
  rebate: number
  taxAfterRebate: number
  cess: number
  totalTax: number
  effectiveRatePct: number
  takeHome: number
}

export function calculateIncomeTax(input: TaxInput): TaxResult {
  const {
    grossIncome,
    regime,
    isSalaried,
    deduction80C = 0,
    deduction80D = 0,
    hraExemption = 0,
    homeLoanInterest = 0,
    otherDeductions = 0,
  } = input

  const standardDeduction = isSalaried ? STANDARD_DEDUCTION[regime] : 0

  let totalDeductions = standardDeduction
  if (regime === 'old') {
    totalDeductions +=
      Math.min(deduction80C, 150000) +
      deduction80D +
      hraExemption +
      Math.min(homeLoanInterest, 200000) +
      otherDeductions
  }

  const taxableIncome = Math.max(0, grossIncome - totalDeductions)
  const slabs = regime === 'new' ? NEW_REGIME_SLABS : OLD_REGIME_SLABS

  const slabBreakdown: TaxSlabBreakdown[] = []
  let taxBeforeRebate = 0
  let lower = 0

  for (const slab of slabs) {
    const upper = slab.upTo ?? Infinity
    if (taxableIncome > lower) {
      const taxableInSlab = Math.min(taxableIncome, upper) - lower
      const tax = (taxableInSlab * slab.ratePct) / 100
      taxBeforeRebate += tax
      slabBreakdown.push({
        from: lower,
        to: slab.upTo,
        ratePct: slab.ratePct,
        taxableInSlab: Math.round(taxableInSlab),
        tax: Math.round(tax),
      })
    }
    lower = upper
    if (taxableIncome <= upper) break
  }

  // Section 87A rebate
  const rebateCfg = REBATE_87A[regime]
  let rebate = 0
  if (taxableIncome <= rebateCfg.threshold) {
    rebate = Math.min(taxBeforeRebate, rebateCfg.maxRebate)
  }

  const taxAfterRebate = Math.max(0, taxBeforeRebate - rebate)
  const cess = (taxAfterRebate * CESS_PCT) / 100
  const totalTax = Math.round(taxAfterRebate + cess)

  return {
    regime,
    grossIncome: Math.round(grossIncome),
    totalDeductions: Math.round(totalDeductions),
    taxableIncome: Math.round(taxableIncome),
    slabBreakdown,
    taxBeforeRebate: Math.round(taxBeforeRebate),
    rebate: Math.round(rebate),
    taxAfterRebate: Math.round(taxAfterRebate),
    cess: Math.round(cess),
    totalTax,
    effectiveRatePct:
      grossIncome > 0 ? Math.round((totalTax / grossIncome) * 10000) / 100 : 0,
    takeHome: Math.round(grossIncome - totalTax),
  }
}

/** Convenience: compute both regimes and indicate which saves more tax. */
export function compareRegimes(
  base: Omit<TaxInput, 'regime'>,
): { new: TaxResult; old: TaxResult; recommended: TaxRegime } {
  const newRes = calculateIncomeTax({ ...base, regime: 'new' })
  const oldRes = calculateIncomeTax({ ...base, regime: 'old' })
  return {
    new: newRes,
    old: oldRes,
    recommended: newRes.totalTax <= oldRes.totalTax ? 'new' : 'old',
  }
}
