import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description: 'Learn about FinWise editorial standards and content guidelines.',
}

export default function EditorialPolicyPage() {
  return (
    <>
      <PageHeader
        title="Editorial Policy"
        description="Our commitment to accurate, unbiased, and helpful financial content."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Editorial Policy' }]}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
          
          <section className="mt-6">
            <h2>Our Mission</h2>
            <p>
              FinWise is committed to providing accurate, unbiased, and helpful financial information 
              to help Indians make smarter money decisions. Our editorial policy ensures that all content 
              meets high standards of quality and integrity.
            </p>
          </section>

          <section className="mt-6">
            <h2>Accuracy</h2>
            <ul>
              <li>All financial calculators use verified mathematical formulas</li>
              <li>We clearly label demo data until real APIs are connected</li>
              <li>We update content regularly to reflect current financial regulations and market conditions</li>
              <li>We correct errors promptly when identified</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>Objectivity</h2>
            <ul>
              <li>We provide balanced information without promoting specific financial products</li>
              <li>We disclose affiliate relationships where applicable</li>
              <liWe do not guarantee returns or make profit claims</li>
              <li>We present multiple perspectives on complex financial topics</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>Clarity</h2>
            <ul>
              <li>We explain financial concepts in simple, accessible language</li>
              <li>We provide examples and practical applications</li>
              <liWe define technical terms when first used</li>
              <li>We structure content with clear headings and logical flow</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>Indian Context</h2>
            <ul>
              <li>All content is tailored for the Indian financial context</li>
              <li>We reference Indian tax laws, regulations, and market practices</li>
              <li>We use Indian Rupee (INR) as the default currency</li>
              <li>We consider Indian cultural and economic factors in our recommendations</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>Disclaimer</h2>
            <p>
              All content on FinWise is for educational and informational purposes only and should not 
              be considered financial, investment, tax, or legal advice. Users should consult qualified 
              professionals for personalized advice.
            </p>
          </section>

          <section className="mt-6">
            <h2>Content Updates</h2>
            <p>
              We review and update our content regularly to ensure it remains accurate and relevant. 
              Each article displays the last updated date. Major changes to our editorial policy will be 
              prominently announced.
            </p>
          </section>

          <section className="mt-6">
            <h2>Feedback</h2>
            <p>
              We welcome feedback on our content. If you find an error or have suggestions for improvement, 
              please contact us at contact@finwise.example.com
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
