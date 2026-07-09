import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combina clases de Tailwind resolviendo conflictos. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formatea un número como precio en pesos argentinos. */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Formatea una fecha ISO a formato legible en español. */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

/** Genera un identificador corto legible (para códigos de reserva). */
export function generateBookingCode(prefix = "LE"): string {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  const time = Date.now().toString(36).slice(-4).toUpperCase();
  return `${prefix}-${time}${rand}`;
}
