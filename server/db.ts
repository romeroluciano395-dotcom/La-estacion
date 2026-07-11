import { PrismaClient } from "@prisma/client";

/**
 * Cliente Prisma (singleton). Única puerta de acceso a PostgreSQL.
 * El resto de la app accede a la base solo a través de los repositorios.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
