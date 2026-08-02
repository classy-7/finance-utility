import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how FinWise protects your privacy and handles your data.',
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        description="Your privacy is important to us. Learn how we collect, use, and protect your data."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
          
          <section className="mt-6">
            <h2>Information We Collect</h2>
            <p>
              FinWise collects minimal information necessary to provide our services:
            </p>
            <ul>
              <li><strong>Usage Data:</strong> Anonymous analytics to improve our services (via Vercel Analytics)</li>
              <li><strong>LocalStorage:</strong> Your watchlist and theme preferences are stored locally in your browser</li>
              <li><strong>Contact Form:</strong> Information you voluntarily provide when contacting us</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>How We Use Your Information</h2>
            <ul>
              <li>To improve our calculators and tools</li>
              <li>To provide customer support</li>
              <li>To analyze usage patterns and enhance user experience</li>
              <li>We never sell your personal data to third parties</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>Data Storage & Security</h2>
            <p>
              Your watchlist and preferences are stored locally on your device using LocalStorage. 
              We do not have access to this data unless you choose to share it. Any data we do collect 
              is stored securely and protected using industry-standard practices.
            </p>
          </section>

          <section className="mt-6">
            <h2>Cookies</h2>
            <p>
              We use minimal cookies for analytics purposes. You can control cookie settings through 
              your browser preferences.
            </p>
          </section>

          <section className="mt-6">
            <h2>Third-Party Services</h2>
            <p>
              We use Vercel Analytics for anonymous usage tracking. Please refer to their privacy 
              policy for more information on how they handle data.
            </p>
          </section>

          <section className="mt-6">
            <h2>Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal data. To exercise these 
              rights, please contact us at contact@finwise.example.com.
            </p>
          </section>

          <section className="mt-6">
            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any 
              significant changes by posting the new policy on this page.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
