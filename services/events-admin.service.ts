import type { Evento, EventStatus } from "@/types/event";
import type { EventoInput } from "@/lib/validations";
import { EVENTOS } from "./events.data";

/**
 * CRUD de eventos para el panel. Muta el mismo array `EVENTOS` que consume
 * el sitio público, por lo que los cambios se reflejan al instante.
 *
 * Migración a Prisma: reemplazar el cuerpo de cada función por
 * prisma.event.create / update / delete. Las firmas no cambian.
 */

export async function getEventoById(id: string): Promise<Evento | undefined> {
  return EVENTOS.find((e) => e.id === id);
}

function toEvento(input: EventoInput, base?: Evento): Evento {
  const now = new Date().toISOString();
  return {
    id: base?.id ?? `evt_${Date.now()}`,
    slug: input.slug,
    nombre: input.nombre,
    descripcion: input.descripcion,
    descripcionCorta: input.descripcionCorta,
    precio: input.precio,
    fecha: input.fecha,
    hora: input.hora,
    ciudad: input.ciudad,
    lugarSalida: input.lugarSalida,
    categoria: input.categoria,
    estado: input.estado,
    lugaresDisponibles: input.lugaresDisponibles,
    imagenPrincipal: input.imagenPrincipal,
    galeria: input.galeria ?? [],
    destacado: input.destacado,
    coordenadas: { lat: input.lat, lng: input.lng },
    informacionImportante: input.informacionImportante
      ? input.informacionImportante
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean)
      : (base?.informacionImportante ?? []),
    faqs: base?.faqs ?? [],
    createdAt: base?.createdAt ?? now,
    updatedAt: now,
  };
}

export async function crearEvento(input: EventoInput): Promise<Evento> {
  const evento = toEvento(input);
  EVENTOS.push(evento);
  return evento;
}

export async function actualizarEvento(
  id: string,
  input: EventoInput,
): Promise<Evento | null> {
  const i = EVENTOS.findIndex((e) => e.id === id);
  if (i < 0) return null;
  const actualizado = toEvento(input, EVENTOS[i]);
  EVENTOS[i] = actualizado;
  return actualizado;
}

export async function eliminarEvento(id: string): Promise<boolean> {
  const i = EVENTOS.findIndex((e) => e.id === id);
  if (i < 0) return false;
  EVENTOS.splice(i, 1);
  return true;
}

export async function duplicarEvento(id: string): Promise<Evento | null> {
  const original = EVENTOS.find((e) => e.id === id);
  if (!original) return null;
  const now = new Date().toISOString();
  const copia: Evento = {
    ...original,
    id: `evt_${Date.now()}`,
    slug: `${original.slug}-copia`,
    nombre: `${original.nombre} (copia)`,
    destacado: false,
    createdAt: now,
    updatedAt: now,
  };
  EVENTOS.push(copia);
  return copia;
}

export async function cambiarEstadoEvento(
  id: string,
  estado: EventStatus,
): Promise<boolean> {
  const e = EVENTOS.find((x) => x.id === id);
  if (!e) return false;
  e.estado = estado;
  e.updatedAt = new Date().toISOString();
  return true;
}

export async function toggleDestacado(id: string): Promise<boolean> {
  const e = EVENTOS.find((x) => x.id === id);
  if (!e) return false;
  e.destacado = !e.destacado;
  e.updatedAt = new Date().toISOString();
  return true;
}
