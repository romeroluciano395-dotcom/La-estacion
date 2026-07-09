import type { EventStatus } from "@/types/event";
import { cn } from "@/lib/utils";
import { EVENT_STATUS_META } from "@/lib/events-config";

export function AvailabilityBadge({
  estado,
  className,
}: {
  estado: EventStatus;
  className?: string;
}) {
  const meta = EVENT_STATUS_META[estado];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        meta.className,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </span>
  );
}
