import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the FinWise team for questions, feedback, or support.',
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Have questions or feedback? We'd love to hear from you."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Get in Touch</h2>
          <p className="mt-2 text-muted-foreground">
            Fill out the form below or reach out to us directly via email.
          </p>
          
          <form className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="How can we help?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                rows={5}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
            >
              Send Message
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-border">
            <h3 className="font-semibold">Email</h3>
            <p className="text-muted-foreground">contact@finwise.example.com</p>
          </div>
        </div>
      </div>
    </>
  )
}
