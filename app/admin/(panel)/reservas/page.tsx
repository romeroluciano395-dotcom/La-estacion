import { getReservas } from "@/services/admin.service";
import { ReservationsAdminTable } from "@/components/tables/reservations-admin-table";

export const metadata = { title: "Reservas" };

export default async function AdminReservasPage() {
  const reservas = await getReservas();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Gestión de reservas
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Todas las reservas recibidas. Buscá, filtrá y exportá a CSV.
        </p>
      </div>
      <ReservationsAdminTable reservas={reservas} />
    </div>
  );
}
