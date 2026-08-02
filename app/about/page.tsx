import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about FinWise - your trusted source for financial calculators, market data, and educational content in India.',
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About FinWise"
        description="Empowering Indians to make smarter financial decisions with accurate tools and trusted information."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2>Our Mission</h2>
            <p>
              FinWise is dedicated to providing accurate, easy-to-use financial tools and educational content 
              tailored for the Indian market. We believe that everyone deserves access to reliable financial 
              information to make informed decisions about their money.
            </p>
          </section>

          <section className="mb-8">
            <h2>What We Offer</h2>
            <ul>
              <li><strong>Financial Calculators:</strong> SIP, EMI, FD, PPF, income tax, and more - all with accurate formulas</li>
              <li><strong>Market Data:</strong> Indian and global market indices with API-ready architecture</li>
              <li><strong>Mutual Fund Tools:</strong> Search, compare, and analyze mutual funds</li>
              <li><strong>Educational Content:</strong> Learn about investing, banking, loans, tax, and personal finance</li>
              <li><strong>News & Updates:</strong> Stay informed with the latest financial news</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Our Commitment</h2>
            <p>
              We are committed to accuracy, transparency, and user privacy. All our calculators use verified 
              financial formulas, and we clearly label demo data until real APIs are connected. We never 
              guarantee returns or profits - our tools are for educational and informational purposes only.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>Have questions or feedback? We'd love to hear from you.</p>
            <p>Email: contact@finwise.example.com</p>
          </section>
        </div>
      </div>
    </>
  )
}
