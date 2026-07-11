"use server";

import { contactSchema } from "@/lib/validations";
import { contactRepository } from "@/server/repositories/contact.repository";

export interface ContactResult {
  ok: boolean;
  error?: string;
}

/**
 * Guarda una consulta del formulario de contacto en PostgreSQL.
 * Aparece luego en el panel → Mensajes.
 */
export async function enviarContactoAction(
  data: unknown,
): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, error: "Revisá los datos del formulario." };
  }

  await contactRepository.create({
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
  });

  return { ok: true };
}
