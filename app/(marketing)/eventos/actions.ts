"use server";

import { revalidatePath } from "next/cache";

import { reservaPublicaSchema } from "@/lib/validations";
import { crearReserva } from "@/services/reservas.service";
import { emailService } from "@/server/services/email.service";

export interface CrearReservaActionResult {
  ok: boolean;
  error?: string;
  reservaId?: string;
  slug?: string;
}

/**
 * Crea una reserva desde el sitio público. Valida en el servidor, descuenta
 * lugares atómicamente y (cuando exista el proveedor) dispara el email.
 */
export async function crearReservaAction(
  data: unknown,
): Promise<CrearReservaActionResult> {
  const parsed = reservaPublicaSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, error: "Revisá los datos del formulario." };
  }

  const res = await crearReserva(parsed.data);
  if (!res.ok || !res.reserva) {
    return { ok: false, error: res.error };
  }

  await emailService.notificarReservaCreada(res.reserva);

  revalidatePath(`/eventos/${res.reserva.eventoSlug}`);
  revalidatePath("/proximos-viajes");
  revalidatePath("/admin");
  revalidatePath("/admin/reservas");

  return { ok: true, reservaId: res.reserva.id, slug: res.reserva.eventoSlug };
}
