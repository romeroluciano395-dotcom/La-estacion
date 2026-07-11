import type { Prisma } from "@prisma/client";
import { db } from "@/server/db";

const includeEvent = {
  include: { event: { select: { title: true, slug: true, price: true } } },
} as const;

export const reservationRepository = {
  findMany() {
    return db.reservation.findMany({
      ...includeEvent,
      orderBy: { createdAt: "desc" },
    });
  },

  create(data: Prisma.ReservationCreateInput) {
    return db.reservation.create({ data, ...includeEvent });
  },

  count() {
    return db.reservation.count();
  },

  sumPassengers() {
    return db.reservation.aggregate({ _sum: { quantity: true } });
  },

  /** Reservas pagadas/confirmadas con precio del evento (para ingresos). */
  findConfirmedWithPrice() {
    return db.reservation.findMany({
      where: { status: { in: ["pagada", "confirmada"] } },
      select: { quantity: true, event: { select: { price: true } } },
    });
  },

  /** Conteo de reservas por mes (últimos N meses). */
  findCreatedSince(since: Date) {
    return db.reservation.findMany({
      where: { createdAt: { gte: since } },
      select: { createdAt: true },
    });
  },
};
