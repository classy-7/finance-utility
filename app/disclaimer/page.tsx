import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Important disclaimer about FinWise financial tools and information.',
}

export default function DisclaimerPage() {
  return (
    <>
      <PageHeader
        title="Disclaimer"
        description="Please read this important disclaimer before using our financial tools."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Disclaimer' }]}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 mb-6">
          <p className="font-semibold text-destructive">
            This is an important disclaimer. Please read carefully before using any financial tools or information on this website.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mt-6">
            <h2>General Disclaimer</h2>
            <p>
              Information and calculations provided by FinWise are for educational and informational 
              purposes only and should not be considered financial, investment, tax, or legal advice. 
              Market data may be delayed or inaccurate. Users should independently verify information 
              and consult a qualified professional before making financial decisions.
            </p>
          </section>

          <section className="mt-6">
            <h2>No Investment Advice</h2>
            <p>
              FinWise does not provide personalized investment advice. The content on this website is 
              for general information purposes only. All investments involve risk, and past performance 
              does not guarantee future results. You should conduct your own research and consult with 
              a qualified financial advisor before making any investment decisions.
            </p>
          </section>

          <section className="mt-6">
            <h2>Accuracy of Calculations</h2>
            <p>
              While we strive to ensure that our financial calculators are accurate and use correct 
              formulas, we cannot guarantee that the results are error-free. Calculators are provided 
              as-is without any warranty, express or implied. Always verify calculations with official 
              sources or financial institutions.
            </p>
          </section>

          <section className="mt-6">
            <h2>Market Data</h2>
            <p>
              Market data displayed on FinWise may be delayed and may not reflect real-time prices. 
              We do not guarantee the accuracy of market data and are not responsible for any losses 
              incurred due to reliance on this information. Always verify market data with official 
              exchanges or your broker.
            </p>
          </section>

          <section className="mt-6">
            <h2>No Guarantees</h2>
            <p>
              FinWise does not guarantee any specific returns, profits, or outcomes from using our 
              tools or following any information provided on this website. Financial markets are 
              inherently unpredictable, and you may lose money. Never invest more than you can afford 
              to lose.
            </p>
          </section>

          <section className="mt-6">
            <h2>Tax Information</h2>
            <p>
              Tax laws and regulations are subject to change and may vary based on individual circumstances. 
              Our tax calculators are for estimation purposes only and should not be used for filing tax 
              returns. Please consult a qualified tax professional for personalized tax advice.
            </p>
          </section>

          <section className="mt-6">
            <h2>Limitation of Liability</h2>
            <p>
              In no event shall FinWise, its owners, or its contributors be liable for any damages 
              (including, without limitation, damages for loss of data, profit, or other losses) arising 
              out of the use or inability to use the materials on this website.
            </p>
          </section>

          <section className="mt-6">
            <h2>Professional Advice</h2>
            <p>
              This website is not a substitute for professional financial advice. Before making any 
              significant financial decisions, please consult with a qualified financial advisor, tax 
              professional, or legal counsel who can provide advice tailored to your specific situation.
            </p>
          </section>

          <section className="mt-6">
            <h2>Affiliate Links</h2>
            <p>
              FinWise may contain affiliate links to financial products and services. If you purchase 
              through these links, we may earn a commission at no additional cost to you. This does not 
              influence our recommendations or reviews. We only recommend products and services we 
              believe are genuinely useful.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
