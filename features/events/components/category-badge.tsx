import type { EventCategory } from "@/types/event";
import { cn } from "@/lib/utils";
import { CATEGORY_LABEL } from "@/lib/events-config";
import { Icon } from "@/components/shared/icon";
import { EVENT_CATEGORIES } from "@/lib/events-config";

const ICON_BY_CATEGORY = Object.fromEntries(
  EVENT_CATEGORIES.map((c) => [c.slug, c.icon]),
) as Record<EventCategory, string>;

export function CategoryBadge({
  categoria,
  className,
}: {
  categoria: EventCategory;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md",
        className,
      )}
    >
      <Icon name={ICON_BY_CATEGORY[categoria]} className="h-3.5 w-3.5" />
      {CATEGORY_LABEL[categoria]}
    </span>
  );
}
