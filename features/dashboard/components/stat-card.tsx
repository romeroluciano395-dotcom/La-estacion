import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Icon, type IconName } from "@/components/shared/icon";

export function StatCard({
  label,
  value,
  change,
  icon,
}: {
  label: string;
  value: string;
  change: number;
  icon: IconName;
}) {
  const positive = change >= 0;
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-primary">
            <Icon name={icon} className="h-5 w-5" />
          </span>
          <span
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              positive ? "text-emerald-600" : "text-red-600",
            )}
          >
            {positive ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}
            {Math.abs(change)}%
          </span>
        </div>
        <div className="mt-4">
          <div className="font-display text-2xl font-bold">{value}</div>
          <div className="mt-1 text-sm text-muted-foreground">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}
