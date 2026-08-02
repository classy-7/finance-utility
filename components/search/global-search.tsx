'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  TrendingUp,
  BookOpen,
  Landmark,
  FileText,
  BarChart3,
  CornerDownLeft,
  Loader2,
} from 'lucide-react'
import { searchStatic, type SearchEntry } from '@/lib/search-index'
import { cn } from '@/lib/utils'

const groupIcon: Record<SearchEntry['group'], typeof Search> = {
  Calculators: TrendingUp,
  Learn: BookOpen,
  'Mutual Funds': Landmark,
  Pages: FileText,
  Stocks: BarChart3,
}

export function GlobalSearch() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [stockResults, setStockResults] = useState<SearchEntry[]>([])
  const [loadingStocks, setLoadingStocks] = useState(false)
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 30)
    } else {
      document.body.style.overflow = ''
      setQuery('')
      setStockResults([])
      setActive(0)
    }
  }, [open])

  const staticResults = useMemo(() => searchStatic(query), [query])

  // Live stock search (debounced) via server route — keeps API keys server-side.
  useEffect(() => {
    const q = query.trim()
    if (q.length < 2) {
      setStockResults([])
      return
    }
    let cancelled = false
    setLoadingStocks(true)
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/markets/search?q=${encodeURIComponent(q)}`)
        if (!res.ok) throw new Error('search failed')
        const json = await res.json()
        if (cancelled) return
        setStockResults(
          (json.data || []).slice(0, 5).map((s: { symbol: string; name: string; exchange: string }) => ({
            group: 'Stocks' as const,
            title: s.name,
            subtitle: `${s.symbol} · ${s.exchange}`,
            href: `/markets/${s.symbol}`,
            keywords: '',
          })),
        )
      } catch {
        if (!cancelled) setStockResults([])
      } finally {
        if (!cancelled) setLoadingStocks(false)
      }
    }, 250)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [query])

  const allResults = useMemo(
    () => [...staticResults, ...stockResults],
    [staticResults, stockResults],
  )

  const go = useCallback(
    (href: string) => {
      setOpen(false)
      router.push(href)
    },
    [router],
  )

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, allResults.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const r = allResults[active]
      if (r) go(r.href)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-muted',
          'w-full sm:w-56 md:w-64',
        )}
        aria-label="Search FinWise"
      >
        <Search className="size-4 shrink-0" />
        <span className="flex-1 text-left">Search…</span>
        <kbd className="hidden rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-100 flex items-start justify-center bg-foreground/40 p-4 pt-[12vh] backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-popover shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-border px-4">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
                onKeyDown={onInputKey}
                placeholder="Search calculators, stocks, funds, articles…"
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {loadingStocks && (
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
              )}
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {query.trim() === '' && (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  Try “SIP”, “income tax”, “Reliance”, or “index funds”.
                </p>
              )}
              {query.trim() !== '' && allResults.length === 0 && !loadingStocks && (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No results for “{query}”.
                </p>
              )}
              {allResults.map((r, i) => {
                const Icon = groupIcon[r.group]
                return (
                  <button
                    key={`${r.group}-${r.href}-${i}`}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r.href)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                      i === active ? 'bg-muted' : 'hover:bg-muted/60',
                    )}
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {r.title}
                      </span>
                      {r.subtitle && (
                        <span className="block truncate text-xs text-muted-foreground">
                          {r.subtitle}
                        </span>
                      )}
                    </span>
                    <span className="shrink-0 text-[10px] uppercase tracking-wide text-muted-foreground">
                      {r.group}
                    </span>
                    {i === active && (
                      <CornerDownLeft className="size-3.5 shrink-0 text-muted-foreground" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
