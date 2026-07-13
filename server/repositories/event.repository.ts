import type { Prisma, EventStatus } from "@prisma/client";
import { db } from "@/server/db";

const withOrder = { orderBy: { date: "asc" } } as const;

export const eventRepository = {
  findMany() {
    return db.event.findMany(withOrder);
  },

  findById(id: string) {
    return db.event.findUnique({ where: { id } });
  },

  findBySlug(slug: string) {
    return db.event.findUnique({ where: { slug } });
  },

  findFeatured() {
    return db.event.findMany({ where: { featured: true }, ...withOrder });
  },

  findRelated(category: Prisma.EventCreateInput["category"], excludeId: string, take: number) {
    return db.event.findMany({
      where: { category, id: { not: excludeId } },
      orderBy: { date: "asc" },
      take,
    });
  },

  async distinctCities(): Promise<string[]> {
    const rows = await db.event.findMany({
      distinct: ["city"],
      select: { city: true },
      orderBy: { city: "asc" },
    });
    return rows.map((r) => r.city);
  },

  create(data: Prisma.EventCreateInput) {
    return db.event.create({ data });
  },

  update(id: string, data: Prisma.EventUpdateInput) {
    return db.event.update({ where: { id }, data });
  },

  delete(id: string) {
    return db.event.delete({ where: { id } });
  },

  setStatus(id: string, status: EventStatus) {
    return db.event.update({ where: { id }, data: { status } });
  },

  async toggleFeatured(id: string) {
    const current = await db.event.findUnique({
      where: { id },
      select: { featured: true },
    });
    if (!current) return null;
    return db.event.update({
      where: { id },
      data: { featured: !current.featured },
    });
  },

  count() {
    return db.event.count();
  },

  countByStatus(status: EventStatus) {
    return db.event.count({ where: { status } });
  },

  countUpcoming(from: Date) {
    return db.event.count({ where: { date: { gte: from } } });
  },

  countPast(before: Date) {
    return db.event.count({ where: { date: { lt: before } } });
  },

  groupByCategory() {
    return db.event.groupBy({ by: ["category"], _count: { _all: true } });
  },

  groupByStatus() {
    return db.event.groupBy({ by: ["status"], _count: { _all: true } });
  },

  seatStats() {
    return db.event.findMany({
      select: { totalSeats: true, availableSeats: true },
    });
  },
};
