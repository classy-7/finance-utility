import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'

export const metadata: Metadata = {
  title: 'Data Sources',
  description: 'Information about data sources used on FinWise for market data and financial information.',
}

export default function DataSourcePage() {
  return (
    <>
      <PageHeader
        title="Data Sources"
        description="Information about where our data comes from and how we ensure accuracy."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Data Sources' }]}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
          
          <section className="mt-6">
            <h2>Current Data Status</h2>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="font-semibold text-muted-foreground">Demo Data Mode</p>
              <p className="mt-2">
                FinWise is currently using demo/placeholder data for market indices, stock prices, 
                mutual fund information, and news content. This data is clearly labeled as "Demo Data" 
                throughout the application.
              </p>
            </div>
          </section>

          <section className="mt-6">
            <h2>Planned Data Integrations</h2>
            <p>
              The application is architected to easily integrate with legitimate financial data APIs. 
              When connected, data will be sourced from:
            </p>
            
            <h3 className="mt-4">Market Data</h3>
            <ul>
              <li><strong>Indian Indices:</strong> NSE, BSE official data feeds</li>
              <li><strong>Stock Prices:</strong> Licensed market data providers</li>
              <li><strong>Global Indices:</strong> International market data providers</li>
              <li><strong>Mutual Funds:</strong> AMFI (Association of Mutual Funds in India) or authorized data providers</li>
            </ul>

            <h3 className="mt-4">News Content</h3>
            <ul>
              <li><strong>Financial News:</strong> Reputable financial news agencies</li>
              <li><strong>RBI Announcements:</strong> Reserve Bank of India official communications</li>
              <li><strong>IPO Information:</strong> SEBI or authorized IPO data providers</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>Data Accuracy & Timeliness</h2>
            <ul>
              <li><strong>Delayed Data:</strong> Market data may be delayed by 15-20 minutes as per regulatory requirements</li>
              <li><strong>Data Refresh:</strong> Data will be refreshed at regular intervals during market hours</li>
              <li><strong>Error Handling:</strong> API errors are handled gracefully with clear error states</li>
              <li><strong>Data Validation:</strong> All data will be validated before display</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>API Integration Architecture</h2>
            <p>
              FinWise is built with a clean API service layer that allows easy integration with various 
              data providers. The architecture supports:
            </p>
            <ul>
              <li>Multiple API providers with fallback options</li>
              <li>Environment-based configuration for API keys</li>
              <li>Caching to reduce API calls and improve performance</li>
              <li>Error handling and retry logic</li>
              <li>Rate limiting compliance</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>Calculator Formulas</h2>
            <p>
              All financial calculators use verified mathematical formulas that are implemented 
              deterministically without approximation. The calculation logic is open and transparent, 
              located in the codebase at:
            </p>
            <code className="block mt-2 p-2 bg-muted rounded">lib/finance/calculators.ts</code>
          </section>

          <section className="mt-6">
            <h2>Data Attribution</h2>
            <p>
              When real data sources are integrated, we will provide clear attribution on all pages 
              displaying market data, including:
            </p>
            <ul>
              <li>Data source name</li>
              <li>Last update timestamp</li>
              <li>Data delay information (if applicable)</li>
              <li>Links to original data sources where appropriate</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>Questions About Data</h2>
            <p>
              If you have questions about our data sources or notice any discrepancies, please contact 
              us at contact@finwise.example.com
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
