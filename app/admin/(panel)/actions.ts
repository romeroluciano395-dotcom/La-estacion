"use server";

import { revalidatePath } from "next/cache";

import { auth, signOut } from "@/auth";
import { eventoSchema, reservaEditSchema } from "@/lib/validations";
import {
  crearEvento,
  actualizarEvento,
  eliminarEvento,
  duplicarEvento,
  cambiarEstadoEvento,
  toggleDestacado,
} from "@/services/events-admin.service";
import {
  eliminarMensaje,
  marcarMensajeLeido,
  actualizarSettings,
} from "@/services/admin.service";
import {
  confirmarReserva,
  cancelarReserva,
  finalizarReserva,
  eliminarReserva,
  actualizarReserva,
} from "@/services/reservas.service";
import type { EventStatus } from "@/types/event";
import type { SiteSettings } from "@/types/admin";

/**
 * Defensa en profundidad: además del middleware, cada acción verifica la
 * sesión en el servidor. Nunca se confía en el cliente.
 */
async function requireSession() {
  const session = await auth();
  if (!session?.user) throw new Error("No autorizado");
  return session;
}

/* ---------------- Sesión ---------------- */

export async function logoutAction() {
  await signOut({ redirectTo: "/admin/login" });
}

/* ---------------- Eventos ---------------- */

function revalidarEventos() {
  revalidatePath("/admin/eventos");
  revalidatePath("/admin");
  revalidatePath("/proximos-viajes");
}

export async function crearEventoAction(data: unknown) {
  await requireSession();
  const parsed = eventoSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false as const, error: "Datos inválidos" };
  }
  const evento = await crearEvento(parsed.data);
  revalidarEventos();
  return { ok: true as const, id: evento.id };
}

export async function actualizarEventoAction(id: string, data: unknown) {
  await requireSession();
  const parsed = eventoSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false as const, error: "Datos inválidos" };
  }
  await actualizarEvento(id, parsed.data);
  revalidarEventos();
  return { ok: true as const, id };
}

export async function eliminarEventoAction(id: string) {
  await requireSession();
  await eliminarEvento(id);
  revalidarEventos();
  return { ok: true as const };
}

export async function duplicarEventoAction(id: string) {
  await requireSession();
  const copia = await duplicarEvento(id);
  revalidarEventos();
  return { ok: !!copia, id: copia?.id };
}

export async function cambiarEstadoEventoAction(
  id: string,
  estado: EventStatus,
) {
  await requireSession();
  await cambiarEstadoEvento(id, estado);
  revalidarEventos();
  return { ok: true as const };
}

export async function toggleDestacadoAction(id: string) {
  await requireSession();
  await toggleDestacado(id);
  revalidarEventos();
  return { ok: true as const };
}

/* ---------------- Mensajes ---------------- */

export async function marcarMensajeLeidoAction(id: string, leido: boolean) {
  await requireSession();
  await marcarMensajeLeido(id, leido);
  revalidatePath("/admin/mensajes");
  return { ok: true as const };
}

export async function eliminarMensajeAction(id: string) {
  await requireSession();
  await eliminarMensaje(id);
  revalidatePath("/admin/mensajes");
  return { ok: true as const };
}

/* ---------------- Reservas ---------------- */

function revalidarReservas() {
  revalidatePath("/admin/reservas");
  revalidatePath("/admin");
  revalidatePath("/proximos-viajes");
}

export async function confirmarReservaAction(id: string) {
  await requireSession();
  await confirmarReserva(id);
  revalidarReservas();
  return { ok: true as const };
}

export async function cancelarReservaAction(id: string) {
  await requireSession();
  await cancelarReserva(id);
  revalidarReservas();
  return { ok: true as const };
}

export async function finalizarReservaAction(id: string) {
  await requireSession();
  await finalizarReserva(id);
  revalidarReservas();
  return { ok: true as const };
}

export async function eliminarReservaAction(id: string) {
  await requireSession();
  await eliminarReserva(id);
  revalidarReservas();
  return { ok: true as const };
}

export async function actualizarReservaAction(id: string, data: unknown) {
  await requireSession();
  const parsed = reservaEditSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false as const, error: "Datos inválidos" };
  }
  const res = await actualizarReserva(id, parsed.data);
  revalidarReservas();
  return res;
}

/* ---------------- Configuración ---------------- */

export async function guardarConfiguracionAction(patch: Partial<SiteSettings>) {
  await requireSession();
  await actualizarSettings(patch);
  revalidatePath("/admin/configuracion");
  revalidatePath("/", "layout");
  return { ok: true as const };
}
