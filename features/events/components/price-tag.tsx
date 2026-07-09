import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";

export function PriceTag({
  precio,
  size = "md",
  className,
}: {
  precio: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-3xl",
  };
  return (
    <div className={cn("flex items-baseline gap-1", className)}>
      <span className="text-xs text-muted-foreground">desde</span>
      <span className={cn("font-bold tracking-tight", sizes[size])}>
        {formatCurrency(precio)}
      </span>
    </div>
  );
}
