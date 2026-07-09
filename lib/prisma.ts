import { PrismaClient } from "@prisma/client";

/**
 * Singleton de Prisma para evitar múltiples instancias en desarrollo
 * (hot-reload de Next.js). Cuando se conecte PostgreSQL, esta es la
 * única fuente de acceso a la base de datos.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
