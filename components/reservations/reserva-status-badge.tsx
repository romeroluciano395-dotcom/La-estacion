import type { ReservaEstado } from "@/types/admin";
import { cn } from "@/lib/utils";

export const RESERVA_ESTADO_META: Record<
  ReservaEstado,
  { label: string; className: string; dot: string }
> = {
  pendiente: {
    label: "Pendiente",
    className: "border-amber-500/30 bg-amber-500/15 text-amber-400",
    dot: "bg-amber-400",
  },
  confirmada: {
    label: "Confirmada",
    className: "border-primary/30 bg-primary/15 text-primary",
    dot: "bg-primary",
  },
  finalizada: {
    label: "Finalizada",
    className: "border-success/30 bg-success/15 text-success",
    dot: "bg-success",
  },
  cancelada: {
    label: "Cancelada",
    className: "border-destructive/30 bg-destructive/15 text-destructive",
    dot: "bg-destructive",
  },
};

export function ReservaStatusBadge({
  estado,
  className,
}: {
  estado: ReservaEstado;
  className?: string;
}) {
  const meta = RESERVA_ESTADO_META[estado];
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
