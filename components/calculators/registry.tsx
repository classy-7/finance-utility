'use client'

import { useMemo, useState } from 'react'
import { CalculatorShell } from './calculator-shell'
import { CurrencyField, NumberField } from './number-field'
import { ResultCard } from './result-card'
import { FinancialChart } from './financial-chart'
import { ScheduleTable } from './schedule-table'
import { Label } from '@/components/ui/label'
import {
  calculateSIP,
  calculateLumpsum,
  calculateCompound,
  calculateEMI,
  calculateFD,
  calculateCAGR,
  calculateGoalSIP,
  calculateInflation,
  calculateSimpleInterest,
  calculatePPF,
  calculateRD,
  calculateMutualFundReturns,
  calculateRetirement,
  calculateLoanPrepayment,
  calculateCreditCardInterest,
  calculateSalary,
  convertCurrency,
  DEMO_EXCHANGE_RATES,
  GOAL_PRESETS,
} from '@/lib/finance/calculators'
import { compareRegimes, calculateIncomeTax } from '@/lib/finance/income-tax'
import { formatINR, formatPercent } from '@/lib/format'

function SipCalculator() {
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)
  const result = useMemo(() => calculateSIP({ monthlyInvestment: monthly, annualRatePct: rate, years }), [monthly, rate, years])
  const chartData = result.schedule.map((r) => ({ year: `Y${r.period}`, invested: r.invested, value: r.value }))
  return (
    <CalculatorShell
      title="SIP Calculator"
      getShareText={() => `SIP: ${formatINR(monthly)}/mo for ${years}y @ ${rate}% → ${formatINR(result.futureValue)}`}
      getReportText={() => `SIP Calculator Report\nMonthly: ${monthly}\nRate: ${rate}%\nYears: ${years}\nInvested: ${result.investedAmount}\nReturns: ${result.estimatedReturns}\nTotal: ${result.futureValue}`}
      results={
        <>
          <ResultCard label="Invested amount" value={formatINR(result.investedAmount)} />
          <ResultCard label="Estimated returns" value={formatINR(result.estimatedReturns)} />
          <ResultCard label="Total value" value={formatINR(result.futureValue)} highlight />
        </>
      }
      chart={<FinancialChart data={chartData} xKey="year" series={[{ key: 'invested', label: 'Invested' }, { key: 'value', label: 'Total value' }]} />}
      table={<ScheduleTable columns={['Year', 'Invested', 'Value', 'Returns']} rows={result.schedule.map((r) => [r.period, r.invested, r.value, r.interest])} />}
    >
      <CurrencyField label="Monthly investment" value={monthly} onChange={setMonthly} min={500} max={500000} step={500} />
      <NumberField label="Expected annual return (%)" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
      <NumberField label="Investment duration (years)" value={years} onChange={setYears} min={1} max={40} step={1} suffix=" yrs" />
    </CalculatorShell>
  )
}

function LumpsumCalculator() {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)
  const result = useMemo(() => calculateLumpsum({ principal, annualRatePct: rate, years }), [principal, rate, years])
  return (
    <CalculatorShell
      title="Lumpsum Calculator"
      results={
        <>
          <ResultCard label="Invested amount" value={formatINR(result.investedAmount)} />
          <ResultCard label="Estimated returns" value={formatINR(result.estimatedReturns)} />
          <ResultCard label="Maturity value" value={formatINR(result.futureValue)} highlight />
        </>
      }
      chart={<FinancialChart data={result.schedule.map((r) => ({ year: `Y${r.period}`, value: r.value }))} xKey="year" series={[{ key: 'value', label: 'Value' }]} />}
      table={<ScheduleTable columns={['Year', 'Value', 'Returns']} rows={result.schedule.map((r) => [r.period, r.value, r.interest])} />}
    >
      <CurrencyField label="Investment amount" value={principal} onChange={setPrincipal} min={1000} max={10000000} step={1000} />
      <NumberField label="Expected annual return (%)" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
      <NumberField label="Duration (years)" value={years} onChange={setYears} min={1} max={40} step={1} suffix=" yrs" />
    </CalculatorShell>
  )
}

function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(10)
  const [compounds, setCompounds] = useState(4)
  const result = useMemo(() => calculateCompound({ principal, annualRatePct: rate, years, compoundsPerYear: compounds }), [principal, rate, years, compounds])
  const chartData = result.schedule.map((r) => ({ year: `Y${r.period}`, principal: r.invested, interest: r.interest }))
  return (
    <CalculatorShell
      title="Compound Interest Calculator"
      results={
        <>
          <ResultCard label="Principal" value={formatINR(result.investedAmount)} />
          <ResultCard label="Interest earned" value={formatINR(result.estimatedReturns)} />
          <ResultCard label="Final amount" value={formatINR(result.futureValue)} highlight />
        </>
      }
      chart={<FinancialChart data={chartData} xKey="year" series={[{ key: 'principal', label: 'Principal' }, { key: 'interest', label: 'Interest' }]} type="stacked-bar" />}
      table={<ScheduleTable columns={['Year', 'Invested', 'Value', 'Interest']} rows={result.schedule.map((r) => [r.period, r.invested, r.value, r.interest])} />}
    >
      <CurrencyField label="Principal" value={principal} onChange={setPrincipal} min={1000} max={10000000} step={1000} />
      <NumberField label="Annual interest rate (%)" value={rate} onChange={setRate} min={1} max={25} step={0.25} suffix="%" />
      <NumberField label="Time period (years)" value={years} onChange={setYears} min={1} max={40} step={1} suffix=" yrs" />
      <div className="space-y-2">
        <Label>Compounding frequency</Label>
        <select value={compounds} onChange={(e) => setCompounds(Number(e.target.value))} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
          <option value={1}>Annually</option>
          <option value={2}>Half-yearly</option>
          <option value={4}>Quarterly</option>
          <option value={12}>Monthly</option>
        </select>
      </div>
    </CalculatorShell>
  )
}

function EmiCalculator({ loanLabel = 'Loan' }: { loanLabel?: string }) {
  const [principal, setPrincipal] = useState(5000000)
  const [rate, setRate] = useState(8.5)
  const [years, setYears] = useState(20)
  const result = useMemo(() => calculateEMI({ principal, annualRatePct: rate, years }), [principal, rate, years])
  return (
    <CalculatorShell
      title={`${loanLabel} EMI Calculator`}
      results={
        <>
          <ResultCard label="Monthly EMI" value={formatINR(result.emi)} highlight />
          <ResultCard label="Total interest" value={formatINR(result.totalInterest)} />
          <ResultCard label="Total payment" value={formatINR(result.totalPayment)} />
        </>
      }
      table={<ScheduleTable columns={['Year', 'Principal paid', 'Interest paid', 'Balance']} rows={result.yearlySchedule.map((r) => [r.year, r.principalPaid, r.interestPaid, r.balance])} />}
    >
      <CurrencyField label="Loan amount" value={principal} onChange={setPrincipal} min={50000} max={50000000} step={50000} />
      <NumberField label="Interest rate (% p.a.)" value={rate} onChange={setRate} min={1} max={20} step={0.1} suffix="%" />
      <NumberField label="Loan tenure (years)" value={years} onChange={setYears} min={1} max={30} step={1} suffix=" yrs" />
    </CalculatorShell>
  )
}

function FdCalculator() {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(5)
  const [compounds, setCompounds] = useState(4)
  const result = useMemo(() => calculateFD({ principal, annualRatePct: rate, years, compoundsPerYear: compounds }), [principal, rate, years, compounds])
  return (
    <CalculatorShell
      title="FD Calculator"
      results={
        <>
          <ResultCard label="Deposit amount" value={formatINR(principal)} />
          <ResultCard label="Interest earned" value={formatINR(result.interest)} />
          <ResultCard label="Maturity amount" value={formatINR(result.maturity)} highlight />
        </>
      }
      chart={<FinancialChart data={result.schedule.map((r) => ({ year: `Y${r.period}`, value: r.value }))} xKey="year" series={[{ key: 'value', label: 'Maturity value' }]} />}
    >
      <CurrencyField label="Deposit amount" value={principal} onChange={setPrincipal} min={1000} max={10000000} step={1000} />
      <NumberField label="Interest rate (% p.a.)" value={rate} onChange={setRate} min={1} max={12} step={0.1} suffix="%" />
      <NumberField label="Tenure (years)" value={years} onChange={setYears} min={1} max={10} step={1} suffix=" yrs" />
      <div className="space-y-2">
        <Label>Compounding</Label>
        <select value={compounds} onChange={(e) => setCompounds(Number(e.target.value))} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
          <option value={1}>Annual</option>
          <option value={4}>Quarterly</option>
          <option value={12}>Monthly</option>
        </select>
      </div>
    </CalculatorShell>
  )
}

function CagrCalculator() {
  const [begin, setBegin] = useState(100000)
  const [end, setEnd] = useState(250000)
  const [years, setYears] = useState(5)
  const result = useMemo(() => calculateCAGR({ beginValue: begin, endValue: end, years }), [begin, end, years])
  return (
    <CalculatorShell
      title="CAGR Calculator"
      results={
        <>
          <ResultCard label="CAGR" value={formatPercent(result.cagrPct)} highlight />
          <ResultCard label="Absolute return" value={formatPercent(result.absoluteReturnPct)} />
          <ResultCard label="Growth multiple" value={`${(end / begin).toFixed(2)}x`} />
        </>
      }
    >
      <CurrencyField label="Initial investment" value={begin} onChange={setBegin} min={1000} max={10000000} step={1000} />
      <CurrencyField label="Final investment value" value={end} onChange={setEnd} min={1000} max={50000000} step={1000} />
      <NumberField label="Investment duration (years)" value={years} onChange={setYears} min={1} max={30} step={1} suffix=" yrs" />
    </CalculatorShell>
  )
}

function IncomeTaxCalculator() {
  const [income, setIncome] = useState(1200000)
  const [ded80C, setDed80C] = useState(150000)
  const [ded80D, setDed80D] = useState(25000)
  const [hra, setHra] = useState(120000)
  const comparison = useMemo(() => compareRegimes({ grossIncome: income, isSalaried: true, deduction80C: ded80C, deduction80D: ded80D, hraExemption: hra }), [income, ded80C, ded80D, hra])
  return (
    <CalculatorShell
      title="Income Tax Calculator"
      results={
        <>
          <ResultCard label="New regime tax" value={formatINR(comparison.new.totalTax)} highlight={comparison.recommended === 'new'} />
          <ResultCard label="Old regime tax" value={formatINR(comparison.old.totalTax)} highlight={comparison.recommended === 'old'} />
          <ResultCard label="Recommended" value={comparison.recommended === 'new' ? 'New regime' : 'Old regime'} />
          <ResultCard label="Tax saved" value={formatINR(Math.abs(comparison.new.totalTax - comparison.old.totalTax))} />
        </>
      }
      table={<ScheduleTable columns={['Regime', 'Taxable income', 'Total tax', 'Take-home']} rows={[['New', comparison.new.taxableIncome, comparison.new.totalTax, comparison.new.takeHome], ['Old', comparison.old.taxableIncome, comparison.old.totalTax, comparison.old.takeHome]]} />}
    >
      <CurrencyField label="Gross annual income" value={income} onChange={setIncome} min={250000} max={50000000} step={10000} />
      <CurrencyField label="80C deductions" value={ded80C} onChange={setDed80C} min={0} max={150000} step={5000} />
      <CurrencyField label="80D (health insurance)" value={ded80D} onChange={setDed80D} min={0} max={100000} step={5000} />
      <CurrencyField label="HRA exemption" value={hra} onChange={setHra} min={0} max={500000} step={5000} />
      <p className="text-xs text-muted-foreground">FY 2024-25 estimate. Consult a tax professional for filing.</p>
    </CalculatorShell>
  )
}

function GoalPlannerCalculator() {
  const [goal, setGoal] = useState(GOAL_PRESETS[0].id)
  const [target, setTarget] = useState(GOAL_PRESETS[0].defaultAmount)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)
  const [savings, setSavings] = useState(0)
  const result = useMemo(() => calculateGoalSIP({ targetAmount: target, annualRatePct: rate, years, currentSavings: savings }), [target, rate, years, savings])
  return (
    <CalculatorShell
      title="Goal Planner"
      results={
        <>
          <ResultCard label="Required monthly SIP" value={formatINR(result.requiredMonthly)} highlight />
          <ResultCard label="Gap to target" value={formatINR(result.gap)} />
          <ResultCard label="Future value of savings" value={formatINR(result.futureValueOfSavings)} />
        </>
      }
    >
      <div className="space-y-2">
        <Label>Goal type</Label>
        <select value={goal} onChange={(e) => { const g = GOAL_PRESETS.find((p) => p.id === e.target.value)!; setGoal(g.id); setTarget(g.defaultAmount) }} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
          {GOAL_PRESETS.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
        </select>
      </div>
      <CurrencyField label="Target amount" value={target} onChange={setTarget} min={100000} max={50000000} step={50000} />
      <NumberField label="Expected return (%)" value={rate} onChange={setRate} min={1} max={20} step={0.5} suffix="%" />
      <NumberField label="Years to goal" value={years} onChange={setYears} min={1} max={40} step={1} suffix=" yrs" />
      <CurrencyField label="Current savings" value={savings} onChange={setSavings} min={0} max={10000000} step={10000} />
    </CalculatorShell>
  )
}

function InflationCalculator() {
  const [cost, setCost] = useState(100000)
  const [inflation, setInflation] = useState(6)
  const [years, setYears] = useState(10)
  const result = useMemo(() => calculateInflation({ currentCost: cost, inflationPct: inflation, years }), [cost, inflation, years])
  return (
    <CalculatorShell title="Inflation Calculator" results={<><ResultCard label="Future cost" value={formatINR(result.futureCost)} highlight /><ResultCard label="Increase" value={formatINR(result.increase)} /></>}>
      <CurrencyField label="Current amount" value={cost} onChange={setCost} min={1000} max={10000000} step={1000} />
      <NumberField label="Inflation rate (%)" value={inflation} onChange={setInflation} min={1} max={15} step={0.5} suffix="%" />
      <NumberField label="Years" value={years} onChange={setYears} min={1} max={40} step={1} suffix=" yrs" />
    </CalculatorShell>
  )
}

function MutualFundReturnsCalculator() {
  const [investment, setInvestment] = useState(100000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(5)
  const result = useMemo(() => calculateMutualFundReturns({ investment, annualRatePct: rate, years }), [investment, rate, years])
  return (
    <CalculatorShell title="Mutual Fund Returns Calculator" results={<><ResultCard label="Absolute return" value={formatINR(result.absoluteReturn)} /><ResultCard label="CAGR" value={formatPercent(result.cagrPct)} highlight /><ResultCard label="Final value" value={formatINR(result.futureValue)} /></>} chart={<FinancialChart data={result.schedule.map((r) => ({ year: `Y${r.period}`, value: r.value }))} xKey="year" series={[{ key: 'value', label: 'Value' }]} />}>
      <CurrencyField label="Investment amount" value={investment} onChange={setInvestment} min={5000} max={10000000} step={5000} />
      <NumberField label="Expected return (%)" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
      <NumberField label="Duration (years)" value={years} onChange={setYears} min={1} max={30} step={1} suffix=" yrs" />
    </CalculatorShell>
  )
}

function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(5)
  const result = useMemo(() => calculateSimpleInterest({ principal, annualRatePct: rate, years }), [principal, rate, years])
  return (
    <CalculatorShell title="Simple Interest Calculator" results={<><ResultCard label="Interest earned" value={formatINR(result.interest)} /><ResultCard label="Total amount" value={formatINR(result.total)} highlight /></>}>
      <CurrencyField label="Principal" value={principal} onChange={setPrincipal} min={1000} max={10000000} step={1000} />
      <NumberField label="Rate (% p.a.)" value={rate} onChange={setRate} min={1} max={25} step={0.25} suffix="%" />
      <NumberField label="Time (years)" value={years} onChange={setYears} min={1} max={30} step={1} suffix=" yrs" />
    </CalculatorShell>
  )
}

function PpfCalculator() {
  const [annual, setAnnual] = useState(150000)
  const [rate, setRate] = useState(7.1)
  const [years, setYears] = useState(15)
  const result = useMemo(() => calculatePPF({ annualInvestment: annual, annualRatePct: rate, years }), [annual, rate, years])
  return (
    <CalculatorShell title="PPF Calculator" results={<><ResultCard label="Total invested" value={formatINR(result.investedAmount)} /><ResultCard label="Interest earned" value={formatINR(result.estimatedReturns)} /><ResultCard label="Maturity value" value={formatINR(result.futureValue)} highlight /></>} chart={<FinancialChart data={result.schedule.map((r) => ({ year: `Y${r.period}`, invested: r.invested, value: r.value }))} xKey="year" series={[{ key: 'invested', label: 'Invested' }, { key: 'value', label: 'Value' }]} />} table={<ScheduleTable columns={['Year', 'Invested', 'Value', 'Interest']} rows={result.schedule.map((r) => [r.period, r.invested, r.value, r.interest])} />}>
      <CurrencyField label="Annual investment" value={annual} onChange={setAnnual} min={500} max={150000} step={500} />
      <NumberField label="Interest rate (%)" value={rate} onChange={setRate} min={5} max={10} step={0.1} suffix="%" />
      <NumberField label="Duration (years)" value={years} onChange={setYears} min={15} max={50} step={1} suffix=" yrs" />
    </CalculatorShell>
  )
}

function RdCalculator() {
  const [monthly, setMonthly] = useState(5000)
  const [rate, setRate] = useState(6.5)
  const [years, setYears] = useState(5)
  const result = useMemo(() => calculateRD({ monthlyDeposit: monthly, annualRatePct: rate, years }), [monthly, rate, years])
  return (
    <CalculatorShell title="Recurring Deposit Calculator" results={<><ResultCard label="Total deposited" value={formatINR(result.investedAmount)} /><ResultCard label="Interest earned" value={formatINR(result.estimatedReturns)} /><ResultCard label="Maturity value" value={formatINR(result.futureValue)} highlight /></>}>
      <CurrencyField label="Monthly deposit" value={monthly} onChange={setMonthly} min={500} max={100000} step={500} />
      <NumberField label="Interest rate (%)" value={rate} onChange={setRate} min={1} max={12} step={0.1} suffix="%" />
      <NumberField label="Tenure (years)" value={years} onChange={setYears} min={1} max={10} step={1} suffix=" yrs" />
    </CalculatorShell>
  )
}

function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retireAge, setRetireAge] = useState(60)
  const [expenses, setExpenses] = useState(50000)
  const [inflation, setInflation] = useState(6)
  const [returns, setReturns] = useState(12)
  const [savings, setSavings] = useState(500000)
  const result = useMemo(() => calculateRetirement({ currentAge, retirementAge: retireAge, currentMonthlyExpenses: expenses, inflationPct: inflation, expectedReturnPct: returns, existingSavings: savings }), [currentAge, retireAge, expenses, inflation, returns, savings])
  return (
    <CalculatorShell title="Retirement Calculator" results={<><ResultCard label="Required corpus" value={formatINR(result.requiredCorpus)} highlight /><ResultCard label="Projected corpus" value={formatINR(result.projectedCorpus)} /><ResultCard label="Shortfall" value={formatINR(result.shortfall)} /><ResultCard label="Suggested monthly SIP" value={formatINR(result.suggestedMonthlySIP)} /></>}>
      <NumberField label="Current age" value={currentAge} onChange={setCurrentAge} min={18} max={65} step={1} showSlider={false} />
      <NumberField label="Retirement age" value={retireAge} onChange={setRetireAge} min={40} max={75} step={1} showSlider={false} />
      <CurrencyField label="Current monthly expenses" value={expenses} onChange={setExpenses} min={10000} max={500000} step={5000} />
      <NumberField label="Inflation (%)" value={inflation} onChange={setInflation} min={1} max={12} step={0.5} suffix="%" />
      <NumberField label="Expected return (%)" value={returns} onChange={setReturns} min={1} max={20} step={0.5} suffix="%" />
      <CurrencyField label="Existing savings" value={savings} onChange={setSavings} min={0} max={50000000} step={50000} />
    </CalculatorShell>
  )
}

function LoanPrepaymentCalculator() {
  const [principal, setPrincipal] = useState(5000000)
  const [rate, setRate] = useState(8.5)
  const [years, setYears] = useState(20)
  const [prepay, setPrepay] = useState(200000)
  const [afterMonths, setAfterMonths] = useState(24)
  const result = useMemo(() => calculateLoanPrepayment({ principal, annualRatePct: rate, years, prepaymentAmount: prepay, prepaymentAfterMonths: afterMonths }), [principal, rate, years, prepay, afterMonths])
  return (
    <CalculatorShell title="Loan Prepayment Calculator" results={<><ResultCard label="Interest saved" value={formatINR(result.interestSaved)} highlight /><ResultCard label="Months saved" value={String(result.monthsSaved)} /><ResultCard label="Original total interest" value={formatINR(result.original.totalInterest)} /><ResultCard label="Revised total interest" value={formatINR(result.revised.totalInterest)} /></>}>
      <CurrencyField label="Loan amount" value={principal} onChange={setPrincipal} min={100000} max={50000000} step={50000} />
      <NumberField label="Interest rate (%)" value={rate} onChange={setRate} min={1} max={20} step={0.1} suffix="%" />
      <NumberField label="Tenure (years)" value={years} onChange={setYears} min={1} max={30} step={1} suffix=" yrs" />
      <CurrencyField label="Prepayment amount" value={prepay} onChange={setPrepay} min={10000} max={5000000} step={10000} />
      <NumberField label="Prepay after (months)" value={afterMonths} onChange={setAfterMonths} min={1} max={120} step={1} showSlider={false} />
    </CalculatorShell>
  )
}

function CreditCardCalculator() {
  const [balance, setBalance] = useState(50000)
  const [rate, setRate] = useState(3.5)
  const result = useMemo(() => calculateCreditCardInterest({ balance, monthlyRatePct: rate }), [balance, rate])
  return (
    <CalculatorShell title="Credit Card Interest Calculator" results={<><ResultCard label="Months to payoff" value={String(result.monthsToPayoff)} highlight /><ResultCard label="Total interest" value={formatINR(result.totalInterest)} /><ResultCard label="Total paid" value={formatINR(result.totalPaid)} /></>}>
      <CurrencyField label="Outstanding balance" value={balance} onChange={setBalance} min={1000} max={500000} step={1000} />
      <NumberField label="Monthly interest rate (%)" value={rate} onChange={setRate} min={1} max={5} step={0.1} suffix="%" />
      <p className="text-xs text-muted-foreground">Assumes 5% minimum payment or ₹500, whichever is higher.</p>
    </CalculatorShell>
  )
}

function SalaryCalculator({ takeHome = false }: { takeHome?: boolean }) {
  const [ctc, setCtc] = useState(1200000)
  const [other, setOther] = useState(0)
  const salary = useMemo(() => calculateSalary({ ctc, otherDeductions: other }), [ctc, other])
  const tax = useMemo(() => calculateIncomeTax({ grossIncome: ctc, regime: 'new', isSalaried: true }), [ctc])
  const net = salary.netMonthly - Math.round(tax.totalTax / 12)
  return (
    <CalculatorShell title={takeHome ? 'Take-Home Salary Calculator' : 'Salary Calculator'} results={<><ResultCard label="Monthly CTC" value={formatINR(salary.monthlyCtc)} /><ResultCard label="Gross monthly" value={formatINR(salary.grossMonthly)} /><ResultCard label={takeHome ? 'Net take-home' : 'Net (before tax)'} value={formatINR(takeHome ? net : salary.netMonthly)} highlight /><ResultCard label="Annual take-home" value={formatINR(takeHome ? net * 12 : salary.annualTakeHome)} /></>}>
      <CurrencyField label="Annual CTC" value={ctc} onChange={setCtc} min={200000} max={50000000} step={50000} />
      <CurrencyField label="Other monthly deductions" value={other} onChange={setOther} min={0} max={50000} step={500} />
      {takeHome && <p className="text-xs text-muted-foreground">Includes estimated new-regime tax for FY 2024-25.</p>}
    </CalculatorShell>
  )
}

function CurrencyConverterCalculator() {
  const [amount, setAmount] = useState(1000)
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('INR')
  const currencies = ['INR', ...Object.keys(DEMO_EXCHANGE_RATES)]
  const result = useMemo(() => convertCurrency({ amount, from, to }), [amount, from, to])
  return (
    <CalculatorShell title="Currency Converter" results={<><ResultCard label="Converted amount" value={to === 'INR' ? formatINR(result.result) : `${result.result.toFixed(2)} ${to}`} highlight /><ResultCard label="Exchange rate" value={result.rate.toFixed(4)} /></>}>
      <CurrencyField label="Amount" value={amount} onChange={setAmount} min={1} max={10000000} step={100} />
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2"><Label>From</Label><select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">{currencies.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
        <div className="space-y-2"><Label>To</Label><select value={to} onChange={(e) => setTo(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">{currencies.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
      </div>
      <p className="text-xs text-muted-foreground">Illustrative exchange rates — not live FX data.</p>
    </CalculatorShell>
  )
}

export const calculatorComponents: Record<string, () => React.JSX.Element> = {
  'sip-calculator': SipCalculator,
  'lumpsum-calculator': LumpsumCalculator,
  'compound-interest-calculator': CompoundInterestCalculator,
  'emi-calculator': () => <EmiCalculator loanLabel="Loan" />,
  'fd-calculator': FdCalculator,
  'cagr-calculator': CagrCalculator,
  'income-tax-calculator': IncomeTaxCalculator,
  'goal-planner': GoalPlannerCalculator,
  'inflation-calculator': InflationCalculator,
  'mutual-fund-returns-calculator': MutualFundReturnsCalculator,
  'simple-interest-calculator': SimpleInterestCalculator,
  'ppf-calculator': PpfCalculator,
  'recurring-deposit-calculator': RdCalculator,
  'retirement-calculator': RetirementCalculator,
  'home-loan-calculator': () => <EmiCalculator loanLabel="Home Loan" />,
  'car-loan-calculator': () => <EmiCalculator loanLabel="Car Loan" />,
  'personal-loan-calculator': () => <EmiCalculator loanLabel="Personal Loan" />,
  'loan-prepayment-calculator': LoanPrepaymentCalculator,
  'credit-card-calculator': CreditCardCalculator,
  'salary-calculator': () => <SalaryCalculator />,
  'take-home-salary-calculator': () => <SalaryCalculator takeHome />,
  'currency-converter': CurrencyConverterCalculator,
}

export function CalculatorRenderer({ slug }: { slug: string }) {
  const Component = calculatorComponents[slug]
  if (!Component) return null
  return <Component />
}
