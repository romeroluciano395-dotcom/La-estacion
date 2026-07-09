import { getDashboardStats } from "@/services/dashboard.service";
import { getReservations } from "@/services/reservations.service";
import { formatCurrency } from "@/lib/utils";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatCard } from "@/features/dashboard/components/stat-card";
import { ReservationsTable } from "@/features/reservations/components/reservations-table";

export default async function AdminDashboardPage() {
  const [stats, reservations] = await Promise.all([
    getDashboardStats(),
    getReservations(),
  ]);

  return (
    <>
      <AdminTopbar title="Dashboard" />
      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Ingresos del mes"
            value={formatCurrency(stats.totalRevenue)}
            change={stats.revenueChange}
            icon="BarChart3"
          />
          <StatCard
            label="Reservas"
            value={String(stats.totalReservations)}
            change={stats.reservationsChange}
            icon="Ticket"
          />
          <StatCard
            label="Pasajeros activos"
            value={stats.activePassengers.toLocaleString("es-AR")}
            change={stats.passengersChange}
            icon="Users"
          />
          <StatCard
            label="Ocupación"
            value={`${stats.occupancyRate}%`}
            change={stats.occupancyChange}
            icon="Bus"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reservas recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <ReservationsTable reservations={reservations} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
