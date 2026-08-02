import { Hero } from "@/components/home/hero"
import { PopularTools } from "@/components/home/popular-tools"
import { MarketSnapshot } from "@/components/home/market-snapshot"
import { ExploreProducts } from "@/components/home/explore-products"
import { Disclaimer } from "@/components/shared/disclaimer"

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularTools />
      <MarketSnapshot />
      <ExploreProducts />
      <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <Disclaimer />
      </div>
    </>
  )
}
