import type { Evento } from "@/types/event";
import { EVENTOS } from "./events.data";

/**
 * Servicio de eventos. Hoy opera sobre datos simulados; mañana, sobre
 * Prisma/PostgreSQL. La firma de las funciones NO cambia al migrar, por
 * eso las páginas y componentes quedan intactos.
 *
 * Ejemplo de migración:
 *   export async function getEventos() {
 *     return prisma.event.findMany({ orderBy: { fecha: "asc" } });
 *   }
 */

function byFecha(a: Evento, b: Evento) {
  return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
}

export async function getEventos(): Promise<Evento[]> {
  return [...EVENTOS].sort(byFecha);
}

export async function getEventoBySlug(
  slug: string,
): Promise<Evento | undefined> {
  return EVENTOS.find((e) => e.slug === slug);
}

export async function getEventosDestacados(): Promise<Evento[]> {
  return EVENTOS.filter((e) => e.destacado).sort(byFecha);
}

/** Eventos relacionados: misma categoría, excluyendo el actual. */
export async function getEventosRelacionados(
  slug: string,
  limite = 3,
): Promise<Evento[]> {
  const actual = EVENTOS.find((e) => e.slug === slug);
  if (!actual) return [];
  return EVENTOS.filter(
    (e) => e.slug !== slug && e.categoria === actual.categoria,
  )
    .sort(byFecha)
    .slice(0, limite);
}

/** Ciudades únicas presentes en los eventos (para el filtro). */
export async function getCiudades(): Promise<string[]> {
  return Array.from(new Set(EVENTOS.map((e) => e.ciudad))).sort();
}
