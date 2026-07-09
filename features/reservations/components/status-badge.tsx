import type { PaymentStatus, ReservationStatus } from "@/types";
import { cn } from "@/lib/utils";
import {
  PAYMENT_STATUS_META,
  RESERVATION_STATUS_META,
} from "@/utils/format";

export function ReservationStatusBadge({
  status,
}: {
  status: ReservationStatus;
}) {
  const meta = RESERVATION_STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        meta.className,
      )}
    >
      {meta.label}
    </span>
  );
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const meta = PAYMENT_STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        meta.className,
      )}
    >
      {meta.label}
    </span>
  );
}
