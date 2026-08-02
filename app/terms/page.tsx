import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using FinWise financial tools and services.',
}

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms of Service"
        description="By using FinWise, you agree to these terms of service."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
          
          <section className="mt-6">
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using FinWise, you accept and agree to be bound by the terms and 
              provisions of this agreement. If you do not agree to abide by these terms, please 
              do not use this service.
            </p>
          </section>

          <section className="mt-6">
            <h2>Use License</h2>
            <p>
              Permission is granted to temporarily use FinWise for personal, non-commercial purposes only. 
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to reverse engineer any software contained on FinWise</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>Disclaimer</h2>
            <p>
              The materials on FinWise are provided on an 'as is' basis. FinWise makes no warranties, 
              expressed or implied, and hereby disclaims and negates all other warranties including, 
              without limitation, implied warranties or conditions of merchantability, fitness for a 
              particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="mt-4">
              <strong>Important:</strong> All financial calculators and information provided by FinWise 
              are for educational and informational purposes only and should not be considered financial, 
              investment, tax, or legal advice. Market data may be delayed or inaccurate. Users should 
              independently verify information and consult a qualified professional before making 
              financial decisions.
            </p>
          </section>

          <section className="mt-6">
            <h2>Limitations</h2>
            <p>
              In no event shall FinWise or its suppliers be liable for any damages (including, without 
              limitation, damages for loss of data or profit, or due to business interruption) arising 
              out of the use or inability to use the materials on FinWise.
            </p>
          </section>

          <section className="mt-6">
            <h2>Accuracy of Materials</h2>
            <p>
              The materials appearing on FinWise could include technical, typographical, or photographic 
              errors. FinWise does not warrant that any of the materials on its website are accurate, 
              complete, or current. FinWise may make changes to the materials at any time without notice.
            </p>
          </section>

          <section className="mt-6">
            <h2>Links to Other Websites</h2>
            <p>
              FinWise may contain links to third-party websites. These links are provided for your 
              convenience and do not signify our endorsement of those websites. We have no responsibility 
              for the content of the linked websites.
            </p>
          </section>

          <section className="mt-6">
            <h2>Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of 
              India and you irrevocably submit to the exclusive jurisdiction of the courts in that state 
              or location.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
