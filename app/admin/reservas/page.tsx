import { getReservations } from "@/services/reservations.service";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Card, CardContent } from "@/components/ui/card";
import { ReservationsTable } from "@/features/reservations/components/reservations-table";

export default async function AdminReservasPage() {
  const reservations = await getReservations();

  return (
    <>
      <AdminTopbar title="Reservas" />
      <div className="flex-1 space-y-6 p-6">
        <p className="text-sm text-muted-foreground">
          {reservations.length} reservas registradas.
        </p>
        <Card>
          <CardContent className="pt-6">
            <ReservationsTable reservations={reservations} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
