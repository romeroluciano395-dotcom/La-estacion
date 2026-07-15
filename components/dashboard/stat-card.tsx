import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  accent = "primary",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
  accent?: "primary" | "accent" | "success" | "danger";
}) {
  const accents = {
    primary: "text-primary bg-primary/10",
    accent: "text-accent bg-accent/10",
    success: "text-success bg-success/10",
    danger: "text-destructive bg-destructive/10",
  };

  return (
    <div className="group rounded-2xl border border-white/10 bg-card/60 p-4 backdrop-blur-xl transition-colors hover:border-white/20 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm leading-tight text-muted-foreground">{label}</p>
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11",
            accents[accent],
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 truncate text-xl font-bold tracking-tight sm:text-2xl">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
