import type { Prisma, ReservationStatus } from "@prisma/client";
import { db } from "@/server/db";

const includeEvent = {
  include: {
    event: {
      select: { title: true, slug: true, city: true, date: true, price: true },
    },
  },
} as const;

export const reservationRepository = {
  findMany() {
    return db.reservation.findMany({
      ...includeEvent,
      orderBy: { createdAt: "desc" },
    });
  },

  findByIdWithEvent(id: string) {
    return db.reservation.findUnique({ where: { id }, ...includeEvent });
  },

  create(data: Prisma.ReservationCreateInput) {
    return db.reservation.create({ data, ...includeEvent });
  },

  update(id: string, data: Prisma.ReservationUpdateInput) {
    return db.reservation.update({ where: { id }, data, ...includeEvent });
  },

  updateStatus(id: string, status: ReservationStatus) {
    return db.reservation.update({
      where: { id },
      data: { status },
      ...includeEvent,
    });
  },

  delete(id: string) {
    return db.reservation.delete({ where: { id } });
  },

  count() {
    return db.reservation.count();
  },

  sumPassengers() {
    return db.reservation.aggregate({ _sum: { quantity: true } });
  },

  /** Reservas confirmadas/finalizadas con precio del evento (para ingresos). */
  findConfirmedWithPrice() {
    return db.reservation.findMany({
      where: { status: { in: ["confirmada", "finalizada"] } },
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
