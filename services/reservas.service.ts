import type { EventStatus, ReservationStatus, Prisma } from "@prisma/client";
import { db } from "@/server/db";
import type { Reserva } from "@/types/admin";
import type {
  ReservaPublicaInput,
  ReservaEditInput,
} from "@/lib/validations";
import { toReserva } from "@/server/mappers";
import { reservationRepository } from "@/server/repositories/reservation.repository";

/**
 * Servicio de reservas. Toda la lógica de negocio (control de cupos,
 * transacciones y transiciones de estado) vive acá. Las Server Actions
 * solo validan y delegan.
 */

const UMBRAL_ULTIMOS = 5;

/** Estados de reserva que "ocupan" lugares. */
function ocupaLugar(status: ReservationStatus): boolean {
  return status !== "cancelada";
}

/** Recalcula el estado del evento según los lugares disponibles y la capacidad. */
function recalcularEstadoEvento(
  disponibles: number,
  total: number,
  actual: EventStatus,
): EventStatus {
  // Estados gestionados manualmente por el admin no se sobrescriben.
  if (actual === "cancelado" || actual === "proximamente") return actual;
  if (disponibles <= 0) return "agotado";
  // "Últimos lugares" solo si ya se ocupó alguno (no cuando está completo).
  if (disponibles <= UMBRAL_ULTIMOS && disponibles < total)
    return "ultimos_lugares";
  return "disponible";
}

export interface CrearReservaResult {
  ok: boolean;
  error?: string;
  reserva?: Reserva;
}

/** Crea una reserva y descuenta lugares de forma atómica. */
export async function crearReserva(
  input: ReservaPublicaInput,
): Promise<CrearReservaResult> {
  try {
    const reserva = await db.$transaction(async (tx) => {
      const evento = await tx.event.findUnique({
        where: { id: input.eventId },
        select: { id: true, status: true, availableSeats: true },
      });
      if (!evento) throw new Error("El evento no existe.");
      if (evento.status === "cancelado")
        throw new Error("El evento fue cancelado.");

      // Decremento atómico y condicional: la base solo descuenta si hay
      // lugares suficientes y el evento admite reservas. Bloquea la fila,
      // por lo que dos reservas simultáneas nunca sobrevenden.
      const updated = await tx.event.updateMany({
        where: {
          id: evento.id,
          availableSeats: { gte: input.cantidad },
          status: { in: ["disponible", "ultimos_lugares"] },
        },
        data: { availableSeats: { decrement: input.cantidad } },
      });
      if (updated.count === 0) {
        throw new Error(
          evento.availableSeats <= 0
            ? "El evento está agotado."
            : `Solo quedan ${evento.availableSeats} lugares disponibles.`,
        );
      }

      // Recalcula el estado con el valor ya actualizado.
      const fresco = await tx.event.findUnique({
        where: { id: evento.id },
        select: { availableSeats: true, totalSeats: true, status: true },
      });
      if (fresco) {
        const nuevoEstado = recalcularEstadoEvento(
          fresco.availableSeats,
          fresco.totalSeats,
          fresco.status,
        );
        if (nuevoEstado !== fresco.status) {
          await tx.event.update({
            where: { id: evento.id },
            data: { status: nuevoEstado },
          });
        }
      }

      return tx.reservation.create({
        data: {
          firstName: input.nombre,
          lastName: input.apellido,
          dni: input.dni,
          phone: input.telefono,
          email: input.email,
          quantity: input.cantidad,
          notes: input.observaciones || null,
          status: "pendiente",
          event: { connect: { id: evento.id } },
        },
        include: {
          event: {
            select: { title: true, slug: true, city: true, date: true },
          },
        },
      });
    });

    return { ok: true, reserva: toReserva(reserva) };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "No se pudo crear la reserva.",
    };
  }
}

/** Reserva individual (para la pantalla de confirmación y el detalle). */
export async function getReservaById(id: string): Promise<Reserva | null> {
  const row = await reservationRepository.findByIdWithEvent(id);
  return row ? toReserva(row) : null;
}

export async function confirmarReserva(id: string): Promise<void> {
  await reservationRepository.updateStatus(id, "confirmada");
}

export async function finalizarReserva(id: string): Promise<void> {
  await reservationRepository.updateStatus(id, "finalizada");
}

/** Cancela y devuelve los lugares al evento (si estaban ocupados). */
export async function cancelarReserva(id: string): Promise<void> {
  await db.$transaction(async (tx) => {
    const reserva = await tx.reservation.findUnique({
      where: { id },
      select: { status: true, quantity: true, eventId: true },
    });
    if (!reserva) return;
    if (reserva.status === "cancelada") return;

    const evento = await tx.event.findUnique({
      where: { id: reserva.eventId },
      select: { availableSeats: true, totalSeats: true, status: true },
    });
    if (evento) {
      const nuevos = evento.availableSeats + reserva.quantity;
      await tx.event.update({
        where: { id: reserva.eventId },
        data: {
          availableSeats: nuevos,
          status: recalcularEstadoEvento(nuevos, evento.totalSeats, evento.status),
        },
      });
    }
    await tx.reservation.update({
      where: { id },
      data: { status: "cancelada" },
    });
  });
}

/** Elimina una reserva y repone los lugares si estaban ocupados. */
export async function eliminarReserva(id: string): Promise<void> {
  await db.$transaction(async (tx) => {
    const reserva = await tx.reservation.findUnique({
      where: { id },
      select: { status: true, quantity: true, eventId: true },
    });
    if (!reserva) return;

    if (ocupaLugar(reserva.status)) {
      const evento = await tx.event.findUnique({
        where: { id: reserva.eventId },
        select: { availableSeats: true, totalSeats: true, status: true },
      });
      if (evento) {
        const nuevos = evento.availableSeats + reserva.quantity;
        await tx.event.update({
          where: { id: reserva.eventId },
          data: {
            availableSeats: nuevos,
            status: recalcularEstadoEvento(nuevos, evento.totalSeats, evento.status),
          },
        });
      }
    }
    await tx.reservation.delete({ where: { id } });
  });
}

export interface ActualizarReservaResult {
  ok: boolean;
  error?: string;
}

/** Edita una reserva ajustando los cupos del evento según el cambio. */
export async function actualizarReserva(
  id: string,
  input: ReservaEditInput,
): Promise<ActualizarReservaResult> {
  try {
    await db.$transaction(async (tx) => {
      const actual = await tx.reservation.findUnique({
        where: { id },
        select: { status: true, quantity: true, eventId: true },
      });
      if (!actual) throw new Error("La reserva no existe.");

      const evento = await tx.event.findUnique({
        where: { id: actual.eventId },
        select: { availableSeats: true, totalSeats: true, status: true },
      });
      if (!evento) throw new Error("El evento no existe.");

      const ocupabaAntes = ocupaLugar(actual.status);
      const ocupaAhora = ocupaLugar(input.estado as ReservationStatus);
      const lugaresAntes = ocupabaAntes ? actual.quantity : 0;
      const lugaresAhora = ocupaAhora ? input.cantidad : 0;
      const delta = lugaresAhora - lugaresAntes; // positivo = ocupa más

      const nuevosDisponibles = evento.availableSeats - delta;
      if (nuevosDisponibles < 0)
        throw new Error("No hay lugares suficientes para ese cambio.");

      await tx.event.update({
        where: { id: actual.eventId },
        data: {
          availableSeats: nuevosDisponibles,
          status: recalcularEstadoEvento(
            nuevosDisponibles,
            evento.totalSeats,
            evento.status,
          ),
        },
      });

      const data: Prisma.ReservationUpdateInput = {
        firstName: input.nombre,
        lastName: input.apellido,
        dni: input.dni,
        phone: input.telefono,
        email: input.email,
        quantity: input.cantidad,
        notes: input.observaciones || null,
        status: input.estado as ReservationStatus,
      };
      await tx.reservation.update({ where: { id }, data });
    });

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "No se pudo actualizar.",
    };
  }
}
