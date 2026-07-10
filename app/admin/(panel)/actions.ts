"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { destroySession } from "@/lib/auth";
import { eventoSchema } from "@/lib/validations";
import {
  crearEvento,
  actualizarEvento,
  eliminarEvento,
  duplicarEvento,
  cambiarEstadoEvento,
  toggleDestacado,
} from "@/services/events-admin.service";
import {
  _eliminarMensaje,
  _marcarMensajeLeido,
  _actualizarSettings,
} from "@/services/admin.service";
import type { EventStatus } from "@/types/event";
import type { SiteSettings } from "@/types/admin";

/* ---------------- Sesión ---------------- */

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

/* ---------------- Eventos ---------------- */

function revalidarEventos() {
  revalidatePath("/admin/eventos");
  revalidatePath("/admin");
  revalidatePath("/proximos-viajes");
}

export async function crearEventoAction(data: unknown) {
  const parsed = eventoSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false as const, error: "Datos inválidos" };
  }
  const evento = await crearEvento(parsed.data);
  revalidarEventos();
  return { ok: true as const, id: evento.id };
}

export async function actualizarEventoAction(id: string, data: unknown) {
  const parsed = eventoSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false as const, error: "Datos inválidos" };
  }
  await actualizarEvento(id, parsed.data);
  revalidarEventos();
  return { ok: true as const, id };
}

export async function eliminarEventoAction(id: string) {
  await eliminarEvento(id);
  revalidarEventos();
  return { ok: true as const };
}

export async function duplicarEventoAction(id: string) {
  const copia = await duplicarEvento(id);
  revalidarEventos();
  return { ok: !!copia, id: copia?.id };
}

export async function cambiarEstadoEventoAction(
  id: string,
  estado: EventStatus,
) {
  await cambiarEstadoEvento(id, estado);
  revalidarEventos();
  return { ok: true as const };
}

export async function toggleDestacadoAction(id: string) {
  await toggleDestacado(id);
  revalidarEventos();
  return { ok: true as const };
}

/* ---------------- Mensajes ---------------- */

export async function marcarMensajeLeidoAction(id: string, leido: boolean) {
  _marcarMensajeLeido(id, leido);
  revalidatePath("/admin/mensajes");
  return { ok: true as const };
}

export async function eliminarMensajeAction(id: string) {
  _eliminarMensaje(id);
  revalidatePath("/admin/mensajes");
  return { ok: true as const };
}

/* ---------------- Configuración ---------------- */

export async function guardarConfiguracionAction(patch: Partial<SiteSettings>) {
  _actualizarSettings(patch);
  revalidatePath("/admin/configuracion");
  revalidatePath("/", "layout");
  return { ok: true as const };
}
