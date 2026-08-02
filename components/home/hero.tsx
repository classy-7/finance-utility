import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-card">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:px-6 lg:grid-cols-2 lg:gap-12 lg:py-24">
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden />
            Built for Indian investors
          </span>
          <h1 className="mt-5 text-pretty text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Make Smarter Money Decisions
          </h1>
          <p className="mt-4 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            Calculate, compare, track markets, and learn how to manage your money with powerful financial tools.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/calculators">
                Explore Calculators
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/markets">View Markets</Link>
            </Button>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6">
            <div>
              <dt className="text-sm text-muted-foreground">Calculators</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-foreground">12+</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Market data</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-foreground">NSE/BSE</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Cost to use</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-foreground">Free</dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl border border-border bg-background shadow-lg">
            <Image
              src="/images/dashboard-hero.png"
              alt="FinWise dashboard showing portfolio value, an allocation chart, Indian stock tickers, and a SIP calculator widget"
              width={1200}
              height={750}
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
