import Link from "next/link";
import { Bus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3", className)}
      aria-label="La Estación — Inicio"
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-105">
        <Bus className="h-5 w-5" />
        <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-accent opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60" />
      </span>
      {showText && (
        <span className="flex flex-col leading-none">
          <span className="text-base font-bold tracking-tight text-white">
            La Estación
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Transporte premium
          </span>
        </span>
      )}
    </Link>
  );
}
