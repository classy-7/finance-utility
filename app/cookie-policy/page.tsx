import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Learn about how FinWise uses cookies and how you can manage your cookie preferences.',
}

export default function CookiePolicyPage() {
  return (
    <>
      <PageHeader
        title="Cookie Policy"
        description="Information about cookies and how we use them on FinWise."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cookie Policy' }]}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
          
          <section className="mt-6">
            <h2>What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences and 
              understanding how you use our site.
            </p>
          </section>

          <section className="mt-6">
            <h2>How We Use Cookies</h2>
            <p>FinWise uses cookies for the following purposes:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website (via Vercel Analytics)</li>
              <li><strong>Preference Cookies:</strong> Remember your theme preference (light/dark mode)</li>
              <li><strong>LocalStorage:</strong> Store your watchlist and calculator preferences locally on your device</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>Third-Party Cookies</h2>
            <p>
              We use Vercel Analytics which may set cookies for analytics purposes. Please refer to 
              Vercel's privacy policy for more information about their cookie usage.
            </p>
          </section>

          <section className="mt-6">
            <h2>Managing Cookies</h2>
            <p>
              You can control and manage cookies in various ways. Please note that removing or blocking 
              cookies may impact your user experience and parts of our website may no longer be fully accessible.
            </p>
            <ul>
              <li><strong>Browser Settings:</strong> Most browsers allow you to control cookies through their settings</li>
              <li><strong>LocalStorage:</strong> You can clear LocalStorage through your browser's developer tools</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>LocalStorage vs Cookies</h2>
            <p>
              FinWise primarily uses LocalStorage for storing your watchlist and preferences. LocalStorage 
              is different from cookies - it stores data directly in your browser and does not automatically 
              send data to servers with each request. This provides better privacy and performance.
            </p>
          </section>

          <section className="mt-6">
            <h2>Changes to This Policy</h2>
            <p>
              We may update this cookie policy from time to time. We will notify you of any significant 
              changes by posting the new policy on this page.
            </p>
          </section>

          <section className="mt-6">
            <h2>Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us at contact@finwise.example.com
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
