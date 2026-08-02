import Link from 'next/link'
import { Logo } from './logo'
import { calculators } from '@/lib/site-config'

const footerCols = [
  {
    heading: 'Calculators',
    links: calculators.slice(0, 5).map((c) => ({
      title: c.title,
      href: `/calculators/${c.slug}`,
    })),
  },
  {
    heading: 'Explore',
    links: [
      { title: 'Markets', href: '/markets' },
      { title: 'Mutual Funds', href: '/mutual-funds' },
      { title: 'News', href: '/news' },
      { title: 'Learn', href: '/learn' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { title: 'About', href: '/about' },
      { title: 'Disclaimer', href: '/disclaimer' },
      { title: 'Privacy Policy', href: '/privacy' },
      { title: 'Contact', href: '/contact' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
              Powerful, accurate financial tools to help you calculate, compare,
              track markets and learn — built for India.
            </p>
          </div>
          {footerCols.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-semibold">{col.heading}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-border bg-muted/40 p-4">
          <p className="text-xs leading-relaxed text-muted-foreground text-pretty">
            <span className="font-semibold text-foreground">Disclaimer:</span>{' '}
            Information and calculations provided by FinWise are for educational
            and informational purposes only and should not be considered
            financial, investment, tax, or legal advice. Market data may be
            delayed or inaccurate. Mutual fund and market investments are subject
            to market risks; past performance does not guarantee future returns.
            Users should independently verify information and consult a qualified
            professional before making financial decisions.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} FinWise. All rights reserved.</p>
          <p>Made for India · Data may be delayed</p>
        </div>
      </div>
    </footer>
  )
}
