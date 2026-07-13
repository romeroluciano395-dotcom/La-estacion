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

/* ------------------------------------------------------------------ */
/*  Fechas — helpers centralizados (evita duplicar Intl en cada vista) */
/* ------------------------------------------------------------------ */

/**
 * Parsea una fecha. Las fechas "YYYY-MM-DD" se interpretan en hora local
 * (evita el corrimiento de día por zona horaria); el resto vía `new Date`.
 */
function parseDate(input: string | Date): Date {
  if (input instanceof Date) return input;
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return new Date(`${input}T00:00:00`);
  return new Date(input);
}

function fmt(
  input: string | Date,
  options: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat("es-AR", options).format(parseDate(input));
}

/** "19 mar 2027" */
export const formatDateShort = (d: string | Date) =>
  fmt(d, { day: "2-digit", month: "short", year: "numeric" });

/** "19 de marzo de 2027" */
export const formatDateLong = (d: string | Date) =>
  fmt(d, { day: "2-digit", month: "long", year: "numeric" });

/** "jueves, 19 de marzo de 2027" */
export const formatDateFull = (d: string | Date) =>
  fmt(d, { weekday: "long", day: "2-digit", month: "long", year: "numeric" });

/** "12/07/2026" */
export const formatDateNumeric = (d: string | Date) =>
  fmt(d, { day: "2-digit", month: "2-digit", year: "numeric" });

/** "12/07/2026, 14:30" */
export const formatDateTime = (d: string | Date) =>
  fmt(d, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

/** "12 mar, 14:30" */
export const formatDateTimeShort = (d: string | Date) =>
  fmt(d, { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
