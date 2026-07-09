import type { Reservation } from "@/types";
import type { ReservationInput } from "@/lib/validations";
import { generateBookingCode } from "@/lib/utils";
import { getServiceBySlug } from "@/lib/constants";
import { MOCK_RESERVATIONS } from "./mock-data";

/**
 * Servicio de reservas. Hoy opera sobre datos mock; mañana, sobre Prisma.
 * La firma de las funciones no cambia al migrar, por eso la UI queda intacta.
 *
 * Ejemplo de migración:
 *   export async function getReservations() {
 *     return prisma.reservation.findMany({ orderBy: { createdAt: "desc" } });
 *   }
 */

export async function getReservations(): Promise<Reservation[]> {
  return [...MOCK_RESERVATIONS].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function createReservation(
  input: ReservationInput,
): Promise<Reservation> {
  const service = getServiceBySlug(input.category);
  const unitPrice = service?.fromPrice ?? 0;

  const reservation: Reservation = {
    id: `res_${Date.now()}`,
    code: generateBookingCode(),
    category: input.category,
    tripTitle: `${input.origin} → ${input.destination}`,
    passengerName: input.fullName,
    passengerEmail: input.email,
    passengerPhone: input.phone,
    seats: input.seats,
    amount: unitPrice * input.seats,
    status: "pendiente",
    paymentStatus: "pendiente",
    createdAt: new Date().toISOString(),
    departureDate: input.departureDate,
  };

  // TODO: persistir con Prisma → prisma.reservation.create({ data: ... })
  return reservation;
}
