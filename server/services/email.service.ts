import type { Reserva } from "@/types/admin";

/**
 * Arquitectura de envío de emails — PREPARADA, aún no implementada.
 *
 * Para activarla, implementar `deliver()` con un proveedor (Resend,
 * Nodemailer, SendGrid…) usando variables de entorno. El resto de la app
 * ya llama a estas funciones, así que no habrá que tocar nada más.
 */

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
}

/** Punto único de envío. Hoy es un no-op (solo registra). */
async function deliver(message: EmailMessage): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.info(`[email:pendiente] → ${message.to} · ${message.subject}`);
  }
  // TODO: integrar proveedor real. Ej:
  // await resend.emails.send({ from, to: message.to, subject, html });
}

/* ---------------- Plantillas ---------------- */

function layout(title: string, body: string): string {
  return `<div style="font-family:sans-serif;max-width:560px;margin:auto">
    <h2>${title}</h2>${body}
    <p style="color:#888;font-size:12px">La Estación — Transporte de pasajeros</p>
  </div>`;
}

export function reservaCreadaEmail(reserva: Reserva): EmailMessage {
  return {
    to: reserva.email,
    subject: `Reserva recibida — ${reserva.eventoNombre}`,
    html: layout(
      "¡Recibimos tu reserva!",
      `<p>Hola ${reserva.nombre}, registramos tu reserva para
       <strong>${reserva.eventoNombre}</strong> (${reserva.cantidadPasajeros}
       pasajero/s). Te contactaremos para confirmarla.</p>`,
    ),
  };
}

export function reservaConfirmadaEmail(reserva: Reserva): EmailMessage {
  return {
    to: reserva.email,
    subject: `Reserva confirmada — ${reserva.eventoNombre}`,
    html: layout(
      "Tu reserva está confirmada ✅",
      `<p>Hola ${reserva.nombre}, tu reserva para
       <strong>${reserva.eventoNombre}</strong> quedó confirmada. ¡Nos vemos!</p>`,
    ),
  };
}

/* ---------------- API pública ---------------- */

export const emailService = {
  async notificarReservaCreada(reserva: Reserva): Promise<void> {
    await deliver(reservaCreadaEmail(reserva));
  },
  async notificarReservaConfirmada(reserva: Reserva): Promise<void> {
    await deliver(reservaConfirmadaEmail(reserva));
  },
};
