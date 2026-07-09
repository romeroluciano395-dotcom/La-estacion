import Link from "next/link";
import { Bus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-sm transition-transform group-hover:scale-105">
        <Bus className="h-5 w-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-bold tracking-tight",
            inverted ? "text-white" : "text-foreground",
          )}
        >
          La Estación
        </span>
        <span
          className={cn(
            "text-[10px] font-medium uppercase tracking-[0.18em]",
            inverted ? "text-white/60" : "text-muted-foreground",
          )}
        >
          Transporte de pasajeros
        </span>
      </span>
    </Link>
  );
}
