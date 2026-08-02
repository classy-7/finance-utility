export type LearnCategory =
  | 'Investing'
  | 'Mutual Funds'
  | 'Taxes'
  | 'Loans'
  | 'Budgeting'
  | 'Retirement'

export interface LearnArticle {
  slug: string
  title: string
  category: LearnCategory
  excerpt: string
  readingMinutes: number
  updatedAt: string
  keywords: string[]
  /** Simple structured body: array of heading + paragraphs. */
  body: { heading: string; paragraphs: string[] }[]
}

export const learnCategories: LearnCategory[] = [
  'Investing',
  'Mutual Funds',
  'Taxes',
  'Loans',
  'Budgeting',
  'Retirement',
]

export const learnArticles: LearnArticle[] = [
  {
    slug: 'what-is-a-sip',
    title: 'What is a SIP and how does it build wealth?',
    category: 'Mutual Funds',
    excerpt:
      'A Systematic Investment Plan lets you invest a fixed amount regularly. Learn how rupee-cost averaging and compounding work in your favour.',
    readingMinutes: 6,
    updatedAt: '2025-01-12',
    keywords: ['SIP', 'systematic investment plan', 'rupee cost averaging', 'compounding'],
    body: [
      {
        heading: 'The basics of a SIP',
        paragraphs: [
          'A Systematic Investment Plan (SIP) is a method of investing a fixed sum into a mutual fund at regular intervals — most commonly every month. Instead of trying to time the market, you invest consistently regardless of whether prices are high or low.',
          'Because the amount is fixed, you automatically buy more units when prices are low and fewer when prices are high. Over time this averages out your purchase cost, a concept known as rupee-cost averaging.',
        ],
      },
      {
        heading: 'Why compounding matters',
        paragraphs: [
          'The returns your investment earns are reinvested, and those returns then earn returns of their own. Over long periods this compounding effect can be far more powerful than the original contributions.',
          'You can model this precisely using the FinWise SIP Calculator, which shows how your invested amount and estimated returns grow year by year.',
        ],
      },
    ],
  },
  {
    slug: 'new-vs-old-tax-regime',
    title: 'New vs old tax regime: which one should you choose?',
    category: 'Taxes',
    excerpt:
      'The new regime offers lower slab rates but fewer deductions. Understand the trade-offs before you file for FY 2024-25.',
    readingMinutes: 7,
    updatedAt: '2025-02-02',
    keywords: ['income tax', 'new regime', 'old regime', 'deductions', '80C'],
    body: [
      {
        heading: 'How the two regimes differ',
        paragraphs: [
          'The new tax regime offers lower slab rates and a higher standard deduction, but removes most exemptions and deductions such as 80C, 80D and HRA. The old regime keeps those deductions but applies higher slab rates.',
          'Whether you save more depends on how many deductions you actually claim. If you have a home loan, significant 80C investments and HRA, the old regime may still win.',
        ],
      },
      {
        heading: 'Run the numbers',
        paragraphs: [
          'Rather than guessing, use the FinWise Income Tax Calculator to compute your liability under both regimes side by side and see which one leaves more money in your pocket.',
        ],
      },
    ],
  },
  {
    slug: 'understanding-emi',
    title: 'Understanding EMIs: how loan repayment really works',
    category: 'Loans',
    excerpt:
      'Every EMI is split between interest and principal. Learn how amortization works and why early payments are mostly interest.',
    readingMinutes: 5,
    updatedAt: '2025-01-28',
    keywords: ['EMI', 'loan', 'amortization', 'home loan', 'interest'],
    body: [
      {
        heading: 'What makes up an EMI',
        paragraphs: [
          'An Equated Monthly Instalment (EMI) is a fixed payment that repays both the interest and a portion of the principal on your loan. Early in the tenure most of your EMI goes towards interest; later, more goes towards principal.',
          'The amortization schedule in the FinWise EMI Calculator shows this split for every month of your loan.',
        ],
      },
      {
        heading: 'Prepayment can save a lot',
        paragraphs: [
          'Because interest is charged on the outstanding balance, prepaying even small amounts early in the tenure can dramatically reduce the total interest you pay.',
        ],
      },
    ],
  },
  {
    slug: 'emergency-fund-basics',
    title: 'How big should your emergency fund be?',
    category: 'Budgeting',
    excerpt:
      'An emergency fund is your financial safety net. Here is a simple framework for sizing and parking it.',
    readingMinutes: 4,
    updatedAt: '2025-02-10',
    keywords: ['emergency fund', 'budgeting', 'savings', 'liquidity'],
    body: [
      {
        heading: 'The 3-6 month rule',
        paragraphs: [
          'A common guideline is to keep three to six months of essential expenses in a liquid, easily accessible account. If your income is irregular, aim for the higher end.',
          'Keep this money separate from your investments so you are not forced to sell assets at a bad time during an emergency.',
        ],
      },
    ],
  },
  {
    slug: 'index-funds-explained',
    title: 'Index funds explained: low-cost investing for beginners',
    category: 'Investing',
    excerpt:
      'Index funds track a market index like the Nifty 50 at a very low cost. Learn why they are popular with long-term investors.',
    readingMinutes: 6,
    updatedAt: '2025-01-20',
    keywords: ['index fund', 'nifty 50', 'passive investing', 'expense ratio'],
    body: [
      {
        heading: 'What is an index fund?',
        paragraphs: [
          'An index fund is a mutual fund that simply mirrors a market index such as the Nifty 50 or Sensex, holding the same stocks in the same proportion. Because there is no active stock-picking, costs are very low.',
          'Lower expense ratios mean more of your returns stay with you, which compounds significantly over decades.',
        ],
      },
    ],
  },
  {
    slug: 'planning-for-retirement',
    title: 'Retirement planning: how much do you actually need?',
    category: 'Retirement',
    excerpt:
      'Estimate your retirement corpus by accounting for inflation and your desired lifestyle, then work backwards to a monthly plan.',
    readingMinutes: 8,
    updatedAt: '2025-02-05',
    keywords: ['retirement', 'corpus', 'inflation', 'goal planning'],
    body: [
      {
        heading: 'Start with your future expenses',
        paragraphs: [
          'Estimate your current annual expenses, then inflate them to your retirement age. A seemingly comfortable amount today can be eroded significantly by inflation over 20-30 years.',
          'The FinWise Inflation Calculator and Goal Planner together let you estimate the corpus you need and the monthly investment required to get there.',
        ],
      },
    ],
  },
]

export function getArticle(slug: string): LearnArticle | undefined {
  return learnArticles.find((a) => a.slug === slug)
}
export const learnContent = learnArticles