import type { Evento } from "@/types/event";
import { eventRepository } from "@/server/repositories/event.repository";
import { toEvento } from "@/server/mappers";

/**
 * Servicio de eventos (lectura pública). Accede a PostgreSQL vía el
 * repositorio y mapea al tipo de dominio `Evento` que consume la UI.
 */

export async function getEventos(): Promise<Evento[]> {
  const rows = await eventRepository.findMany();
  return rows.map(toEvento);
}

export async function getEventoBySlug(
  slug: string,
): Promise<Evento | undefined> {
  const row = await eventRepository.findBySlug(slug);
  return row ? toEvento(row) : undefined;
}

export async function getEventosDestacados(): Promise<Evento[]> {
  const rows = await eventRepository.findFeatured();
  return rows.map(toEvento);
}

export async function getEventosRelacionados(
  slug: string,
  limite = 3,
): Promise<Evento[]> {
  const actual = await eventRepository.findBySlug(slug);
  if (!actual) return [];
  const rows = await eventRepository.findRelated(
    actual.category,
    actual.id,
    limite,
  );
  return rows.map(toEvento);
}

export async function getCiudades(): Promise<string[]> {
  return eventRepository.distinctCities();
}
