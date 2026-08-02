import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

export function Disclaimer({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div
      role="note"
      className={cn(
        "flex gap-3 rounded-lg border border-border bg-muted/40 p-4 text-sm leading-relaxed text-muted-foreground",
        className,
      )}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
      <p className="text-pretty">
        <span className="font-medium text-foreground">Disclaimer:</span> Information and calculations provided by this
        website are for educational and informational purposes only and should not be considered financial, investment,
        tax, or legal advice.
        {!compact && (
          <>
            {" "}
            Market data may be delayed or inaccurate. Users should independently verify information and consult a
            qualified professional before making financial decisions. Past performance does not guarantee future
            returns.
          </>
        )}
      </p>
    </div>
  )
}
