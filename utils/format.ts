import type {
  PaymentStatus,
  ReservationStatus,
  ServiceCategory,
} from "@/types";

/** Etiquetas legibles y estilos por estado de reserva. */
export const RESERVATION_STATUS_META: Record<
  ReservationStatus,
  { label: string; className: string }
> = {
  pendiente: {
    label: "Pendiente",
    className: "bg-amber-100 text-amber-800 border-amber-200",
  },
  confirmada: {
    label: "Confirmada",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  pagada: {
    label: "Pagada",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  cancelada: {
    label: "Cancelada",
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

export const PAYMENT_STATUS_META: Record<
  PaymentStatus,
  { label: string; className: string }
> = {
  pendiente: {
    label: "Pendiente",
    className: "bg-amber-100 text-amber-800 border-amber-200",
  },
  aprobado: {
    label: "Aprobado",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  rechazado: {
    label: "Rechazado",
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  recitales: "Recitales",
  turismo: "Turismo",
  deportivos: "Deportivos",
  aeropuertos: "Aeropuertos",
  privados: "Privados",
  especiales: "Especiales",
};
