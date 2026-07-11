import type { Evento, EventStatus } from "@/types/event";
import type { EventoInput } from "@/lib/validations";
import { eventRepository } from "@/server/repositories/event.repository";
import { toEvento, toEventCreateData, statusToDb } from "@/server/mappers";

/**
 * CRUD de eventos del panel. Escribe realmente en PostgreSQL.
 */

export async function getEventoById(id: string): Promise<Evento | undefined> {
  const row = await eventRepository.findById(id);
  return row ? toEvento(row) : undefined;
}

export async function crearEvento(input: EventoInput): Promise<Evento> {
  const row = await eventRepository.create(toEventCreateData(input));
  return toEvento(row);
}

export async function actualizarEvento(
  id: string,
  input: EventoInput,
): Promise<Evento | null> {
  const row = await eventRepository.update(id, toEventCreateData(input));
  return toEvento(row);
}

export async function eliminarEvento(id: string): Promise<boolean> {
  await eventRepository.delete(id);
  return true;
}

export async function duplicarEvento(id: string): Promise<Evento | null> {
  const original = await eventRepository.findById(id);
  if (!original) return null;
  const {
    id: _id,
    createdAt: _c,
    updatedAt: _u,
    faqs,
    ...rest
  } = original;
  const row = await eventRepository.create({
    ...rest,
    slug: `${original.slug}-copia-${Date.now().toString(36)}`,
    title: `${original.title} (copia)`,
    featured: false,
    faqs: faqs ?? undefined,
  });
  return toEvento(row);
}

export async function cambiarEstadoEvento(
  id: string,
  estado: EventStatus,
): Promise<boolean> {
  await eventRepository.setStatus(id, statusToDb(estado));
  return true;
}

export async function toggleDestacado(id: string): Promise<boolean> {
  const res = await eventRepository.toggleFeatured(id);
  return !!res;
}
