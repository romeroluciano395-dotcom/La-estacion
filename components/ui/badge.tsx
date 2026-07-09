import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-primary/30 bg-primary/15 text-primary",
        accent: "border-accent/30 bg-accent/15 text-accent",
        secondary: "border-white/10 bg-white/5 text-muted-foreground",
        success: "border-success/30 bg-success/15 text-success",
        danger: "border-destructive/30 bg-destructive/15 text-destructive",
        outline: "border-white/15 text-foreground",
        gradient:
          "border-transparent bg-gradient-to-r from-primary to-accent text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
