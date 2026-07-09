/**
 * Seed de la base de datos. Ejecutar con: npm run db:seed
 * (requiere DATABASE_URL configurado y `prisma db push` aplicado).
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passenger = await prisma.passenger.upsert({
    where: { email: "maria.g@example.com" },
    update: {},
    create: {
      fullName: "María González",
      email: "maria.g@example.com",
      phone: "+54 9 11 4444-1122",
      document: "34567890",
    },
  });

  const trip = await prisma.trip.create({
    data: {
      category: "recitales",
      title: "River Plate — Show Internacional",
      origin: "Obelisco, CABA",
      destination: "Estadio Monumental",
      departureDate: new Date("2026-07-18T19:00:00"),
      seatsTotal: 55,
      seatsAvailable: 8,
      pricePerSeat: 18000,
    },
  });

  await prisma.reservation.create({
    data: {
      code: "LE-8F2K9",
      category: "recitales",
      seats: 2,
      amount: 36000,
      status: "pagada",
      paymentStatus: "aprobado",
      departureDate: trip.departureDate,
      passengerId: passenger.id,
      tripId: trip.id,
    },
  });

  console.log("Seed completado ✔");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
