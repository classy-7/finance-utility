export const siteConfig = {
  name: 'FinWise',
  tagline: 'Make Smarter Money Decisions',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://finwise.example.com',
}

export interface NavItem {
  title: string
  href: string
  description?: string
}

export const mainNav: NavItem[] = [
  { title: 'Calculators', href: '/calculators' },
  { title: 'Markets', href: '/markets' },
  { title: 'Mutual Funds', href: '/mutual-funds' },
  { title: 'News', href: '/news' },
  { title: 'Learn', href: '/learn' },
]

export type CalculatorCategory =
  | 'Investment'
  | 'Loans'
  | 'Savings'
  | 'Tax'
  | 'Planning'
  | 'Other'

export interface CalculatorMeta {
  slug: string
  title: string
  shortTitle: string
  category: CalculatorCategory
  description: string
  keywords: string[]
  icon: string // lucide icon name
}

export const calculators: CalculatorMeta[] = [
  {
    slug: 'sip-calculator',
    title: 'SIP Calculator',
    shortTitle: 'SIP',
    category: 'Investment',
    description:
      'Estimate the future value of your monthly SIP investments and see how compounding grows your wealth over time.',
    keywords: [
      'SIP calculator',
      'systematic investment plan',
      'mutual fund SIP returns',
      'monthly SIP calculator India',
    ],
    icon: 'TrendingUp',
  },
  {
    slug: 'lumpsum-calculator',
    title: 'Lumpsum Calculator',
    shortTitle: 'Lumpsum',
    category: 'Investment',
    description:
      'Calculate the maturity value of a one-time lumpsum investment using compound growth.',
    keywords: ['lumpsum calculator', 'one time investment calculator'],
    icon: 'Coins',
  },
  {
    slug: 'compound-interest-calculator',
    title: 'Compound Interest Calculator',
    shortTitle: 'Compound Interest',
    category: 'Investment',
    description:
      'See the power of compounding with optional recurring contributions and a principal-vs-interest breakdown.',
    keywords: [
      'compound interest calculator',
      'power of compounding',
      'compounding calculator India',
    ],
    icon: 'LineChart',
  },
  {
    slug: 'emi-calculator',
    title: 'EMI Calculator',
    shortTitle: 'EMI',
    category: 'Loans',
    description:
      'Calculate your loan EMI, total interest payable and view a full amortization schedule for home, car or personal loans.',
    keywords: [
      'EMI calculator',
      'loan EMI calculator',
      'home loan EMI',
      'car loan EMI',
    ],
    icon: 'Landmark',
  },
  {
    slug: 'fd-calculator',
    title: 'FD Calculator',
    shortTitle: 'Fixed Deposit',
    category: 'Savings',
    description:
      'Calculate fixed deposit maturity amount and interest earned with quarterly, monthly or annual compounding.',
    keywords: [
      'FD calculator',
      'fixed deposit calculator',
      'FD maturity calculator India',
    ],
    icon: 'PiggyBank',
  },
  {
    slug: 'cagr-calculator',
    title: 'CAGR Calculator',
    shortTitle: 'CAGR',
    category: 'Investment',
    description:
      'Measure the compound annual growth rate of any investment between two points in time.',
    keywords: ['CAGR calculator', 'compound annual growth rate calculator'],
    icon: 'Percent',
  },
  {
    slug: 'income-tax-calculator',
    title: 'Income Tax Calculator',
    shortTitle: 'Income Tax',
    category: 'Tax',
    description:
      'Estimate your income tax under the new and old regimes for FY 2024-25 and find out which saves you more.',
    keywords: [
      'income tax calculator',
      'income tax calculator India',
      'new vs old regime',
      'FY 2024-25 tax calculator',
    ],
    icon: 'ReceiptIndianRupee',
  },
  {
    slug: 'goal-planner',
    title: 'Goal Planner',
    shortTitle: 'Goal Planner',
    category: 'Planning',
    description:
      'Find out how much you need to invest every month to reach a financial goal like a home, car, education or retirement.',
    keywords: [
      'financial goal calculator',
      'goal planning calculator',
      'retirement planning India',
    ],
    icon: 'Target',
  },
  {
    slug: 'inflation-calculator',
    title: 'Inflation Calculator',
    shortTitle: 'Inflation',
    category: 'Planning',
    description:
      'Understand how inflation erodes purchasing power and estimate the future cost of goods and expenses.',
    keywords: ['inflation calculator', 'future cost calculator'],
    icon: 'Flame',
  },
  {
    slug: 'mutual-fund-returns-calculator',
    title: 'Mutual Fund Returns Calculator',
    shortTitle: 'MF Returns',
    category: 'Investment',
    description:
      'Estimate absolute and CAGR returns on a mutual fund investment over your chosen period.',
    keywords: ['mutual fund returns calculator', 'MF calculator India'],
    icon: 'TrendingUp',
  },
  {
    slug: 'simple-interest-calculator',
    title: 'Simple Interest Calculator',
    shortTitle: 'Simple Interest',
    category: 'Investment',
    description: 'Calculate simple interest earned on a principal amount over time.',
    keywords: ['simple interest calculator'],
    icon: 'Percent',
  },
  {
    slug: 'ppf-calculator',
    title: 'PPF Calculator',
    shortTitle: 'PPF',
    category: 'Savings',
    description:
      'Project your Public Provident Fund maturity value with annual contributions and compounding.',
    keywords: ['PPF calculator', 'public provident fund calculator'],
    icon: 'PiggyBank',
  },
  {
    slug: 'recurring-deposit-calculator',
    title: 'Recurring Deposit Calculator',
    shortTitle: 'RD',
    category: 'Savings',
    description: 'Calculate RD maturity amount and interest earned on monthly deposits.',
    keywords: ['RD calculator', 'recurring deposit calculator'],
    icon: 'PiggyBank',
  },
  {
    slug: 'retirement-calculator',
    title: 'Retirement Calculator',
    shortTitle: 'Retirement',
    category: 'Planning',
    description:
      'Estimate your retirement corpus, shortfall or surplus, and suggested monthly investment.',
    keywords: ['retirement calculator', 'retirement corpus calculator India'],
    icon: 'Target',
  },
  {
    slug: 'home-loan-calculator',
    title: 'Home Loan EMI Calculator',
    shortTitle: 'Home Loan',
    category: 'Loans',
    description: 'Calculate home loan EMI, total interest and view the amortization schedule.',
    keywords: ['home loan EMI calculator', 'home loan calculator India'],
    icon: 'Landmark',
  },
  {
    slug: 'car-loan-calculator',
    title: 'Car Loan EMI Calculator',
    shortTitle: 'Car Loan',
    category: 'Loans',
    description: 'Calculate car loan EMI, total interest and repayment schedule.',
    keywords: ['car loan EMI calculator'],
    icon: 'Landmark',
  },
  {
    slug: 'personal-loan-calculator',
    title: 'Personal Loan EMI Calculator',
    shortTitle: 'Personal Loan',
    category: 'Loans',
    description: 'Calculate personal loan EMI and total cost of borrowing.',
    keywords: ['personal loan EMI calculator'],
    icon: 'Landmark',
  },
  {
    slug: 'loan-prepayment-calculator',
    title: 'Loan Prepayment Calculator',
    shortTitle: 'Prepayment',
    category: 'Loans',
    description: 'See how a lump-sum prepayment reduces interest and shortens your loan tenure.',
    keywords: ['loan prepayment calculator', 'home loan prepayment'],
    icon: 'Landmark',
  },
  {
    slug: 'credit-card-calculator',
    title: 'Credit Card Interest Calculator',
    shortTitle: 'Credit Card',
    category: 'Loans',
    description:
      'Estimate how long it takes to pay off credit card debt and total interest with minimum payments.',
    keywords: ['credit card interest calculator'],
    icon: 'Landmark',
  },
  {
    slug: 'salary-calculator',
    title: 'Salary Calculator',
    shortTitle: 'Salary',
    category: 'Tax',
    description: 'Break down CTC into basic, HRA, PF and estimate gross monthly salary.',
    keywords: ['salary calculator', 'CTC calculator India'],
    icon: 'ReceiptIndianRupee',
  },
  {
    slug: 'take-home-salary-calculator',
    title: 'Take-Home Salary Calculator',
    shortTitle: 'Take-Home',
    category: 'Tax',
    description: 'Estimate your net monthly take-home pay after PF, tax and other deductions.',
    keywords: ['take home salary calculator', 'in hand salary calculator'],
    icon: 'ReceiptIndianRupee',
  },
  {
    slug: 'currency-converter',
    title: 'Currency Converter',
    shortTitle: 'Currency',
    category: 'Other',
    description: 'Convert between INR and major world currencies using illustrative exchange rates.',
    keywords: ['currency converter', 'INR to USD'],
    icon: 'Coins',
  },
]

export function getCalculator(slug: string): CalculatorMeta | undefined {
  return calculators.find((c) => c.slug === slug)
}

/** The most-used calculators, surfaced on the homepage. */
const POPULAR_SLUGS = [
  'sip-calculator',
  'emi-calculator',
  'fd-calculator',
  'income-tax-calculator',
  'compound-interest-calculator',
  'cagr-calculator',
]

export function getPopularCalculators(): CalculatorMeta[] {
  return POPULAR_SLUGS.map((slug) => getCalculator(slug)).filter(
    (c): c is CalculatorMeta => Boolean(c),
  )
}

export const calculatorCategories: CalculatorCategory[] = [
  'Investment',
  'Loans',
  'Savings',
  'Tax',
  'Planning',
  'Other',
]
