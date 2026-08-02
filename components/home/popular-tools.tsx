import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getPopularCalculators } from "@/lib/site-config"
import { CalculatorIcon } from "@/components/calculators/calculator-icon"

export function PopularTools() {
  const tools = getPopularCalculators()
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Popular tools</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Accurate, instant calculators for the decisions that matter most.
          </p>
        </div>
        <Link
          href="/calculators"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all calculators
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/calculators/${tool.slug}`}
            className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CalculatorIcon name={tool.icon} className="h-5 w-5" />
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">{tool.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
