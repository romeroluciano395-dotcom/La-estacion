import type { EventCategory, EventStatus, EventSort } from "@/types/event";

/** Metadatos de categorías reutilizables (label + icono lucide). */
export const EVENT_CATEGORIES: {
  slug: EventCategory;
  label: string;
  icon: string;
}[] = [
  { slug: "recitales", label: "Recitales", icon: "Music" },
  { slug: "turismo", label: "Turismo", icon: "Palmtree" },
  { slug: "deportivos", label: "Eventos deportivos", icon: "Trophy" },
  { slug: "aeropuertos", label: "Aeropuertos", icon: "Plane" },
  { slug: "privados", label: "Eventos privados", icon: "PartyPopper" },
  { slug: "empresas", label: "Empresas", icon: "Building2" },
  { slug: "especiales", label: "Especiales", icon: "Sparkles" },
];

export const CATEGORY_LABEL: Record<EventCategory, string> = Object.fromEntries(
  EVENT_CATEGORIES.map((c) => [c.slug, c.label]),
) as Record<EventCategory, string>;

/** Metadatos de estado con clases de color para los badges. */
export const EVENT_STATUS_META: Record<
  EventStatus,
  { label: string; className: string; dot: string }
> = {
  disponible: {
    label: "Disponible",
    className: "border-success/30 bg-success/15 text-success",
    dot: "bg-success",
  },
  "ultimos-lugares": {
    label: "Últimos lugares",
    className: "border-amber-500/30 bg-amber-500/15 text-amber-400",
    dot: "bg-amber-400",
  },
  agotado: {
    label: "Agotado",
    className: "border-destructive/30 bg-destructive/15 text-destructive",
    dot: "bg-destructive",
  },
  proximamente: {
    label: "Próximamente",
    className: "border-primary/30 bg-primary/15 text-primary",
    dot: "bg-primary",
  },
  cancelado: {
    label: "Cancelado",
    className: "border-white/15 bg-white/5 text-muted-foreground",
    dot: "bg-muted-foreground",
  },
};

export const SORT_OPTIONS: { value: EventSort; label: string }[] = [
  { value: "fecha-asc", label: "Fecha más próxima" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "nombre-asc", label: "Nombre (A-Z)" },
  { value: "lugares-desc", label: "Más lugares disponibles" },
];

/** ¿El evento admite reserva? (según su estado) */
export function isReservable(estado: EventStatus): boolean {
  return estado === "disponible" || estado === "ultimos-lugares";
}
