"use client"

import useSWR from "swr"
import type { ApiResponse, MarketIndex, Quote, Candle, MutualFund, NewsArticle } from "@/services/types"

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body?.error || `Request failed (${res.status})`)
  }
  return res.json()
}

export function useIndices() {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<MarketIndex[]>>("/api/markets/indices", fetcher, {
    refreshInterval: 60_000,
    revalidateOnFocus: false,
  })
  return { indices: data?.data, meta: data?.meta, error, isLoading, refresh: mutate }
}

export function useStocks() {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Quote[]>>("/api/markets/stocks", fetcher, {
    refreshInterval: 60_000,
    revalidateOnFocus: false,
  })
  return { stocks: data?.data, meta: data?.meta, error, isLoading, refresh: mutate }
}

export function useQuote(symbol: string | null, range: "1M" | "6M" | "1Y" = "1Y") {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<{ quote: Quote | null; history: Candle[] }>>(
    symbol ? `/api/markets/quote/${encodeURIComponent(symbol)}?range=${range}` : null,
    fetcher,
    { refreshInterval: 60_000, revalidateOnFocus: false },
  )
  return {
    quote: data?.data?.quote,
    history: data?.data?.history,
    meta: data?.meta,
    error,
    isLoading,
    refresh: mutate,
  }
}

export function useFunds() {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<MutualFund[]>>("/api/funds", fetcher, {
    revalidateOnFocus: false,
  })
  return { funds: data?.data, meta: data?.meta, error, isLoading, refresh: mutate }
}

export function useNews(category?: string) {
  const key = category && category !== "All" ? `/api/news?category=${encodeURIComponent(category)}` : "/api/news"
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<NewsArticle[]>>(key, fetcher, {
    revalidateOnFocus: false,
  })
  return { articles: data?.data, meta: data?.meta, error, isLoading, refresh: mutate }
}
