-- AlterEnum
BEGIN;
CREATE TYPE "ReservationStatus_new" AS ENUM ('pendiente', 'confirmada', 'cancelada', 'finalizada');
ALTER TABLE "public"."Reservation" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Reservation" ALTER COLUMN "status" TYPE "ReservationStatus_new" USING ("status"::text::"ReservationStatus_new");
ALTER TYPE "ReservationStatus" RENAME TO "ReservationStatus_old";
ALTER TYPE "ReservationStatus_new" RENAME TO "ReservationStatus";
DROP TYPE "public"."ReservationStatus_old";
ALTER TABLE "Reservation" ALTER COLUMN "status" SET DEFAULT 'pendiente';
COMMIT;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "totalSeats" INTEGER NOT NULL DEFAULT 0;

