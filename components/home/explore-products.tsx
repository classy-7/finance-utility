import Link from "next/link"
import { Wallet, PiggyBank, ShieldCheck, ArrowRight } from "lucide-react"

const PRODUCTS = [
  {
    icon: Wallet,
    title: "Investment accounts",
    description: "Compare demat and investment platforms to start your portfolio.",
  },
  {
    icon: PiggyBank,
    title: "Savings & deposits",
    description: "Explore high-yield savings, fixed deposits, and recurring deposits.",
  },
  {
    icon: ShieldCheck,
    title: "Insurance & protection",
    description: "Understand term, health, and other protection products.",
  },
]

export function ExploreProducts() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Explore Financial Products</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              A curated space for relevant financial products and services.
            </p>
          </div>
          <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            Sponsored placements
          </span>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PRODUCTS.map((product) => (
            <div key={product.title} className="flex flex-col rounded-xl border border-border bg-background p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <product.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-semibold text-foreground">{product.title}</h3>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
                Coming soon
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          Advertising disclosure: This section is reserved for partner products. Where FinWise has an affiliate or
          commercial relationship, it will be clearly disclosed. Listings are not recommendations — always evaluate
          products independently.
        </p>
      </div>
    </section>
  )
}
