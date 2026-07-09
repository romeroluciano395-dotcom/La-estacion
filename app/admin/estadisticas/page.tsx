import { getReservations } from "@/services/reservations.service";
import { getDashboardStats } from "@/services/dashboard.service";
import { formatCurrency } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/utils/format";
import type { ServiceCategory } from "@/types";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatCard } from "@/features/dashboard/components/stat-card";

export default async function AdminEstadisticasPage() {
  const [reservations, stats] = await Promise.all([
    getReservations(),
    getDashboardStats(),
  ]);

  // Ingresos por categoría (agregación en memoria; con Prisma sería un groupBy).
  const byCategory = reservations.reduce<Record<string, number>>((acc, r) => {
    acc[r.category] = (acc[r.category] ?? 0) + r.amount;
    return acc;
  }, {});
  const maxCat = Math.max(1, ...Object.values(byCategory));

  return (
    <>
      <AdminTopbar title="Estadísticas" />
      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Ingresos totales"
            value={formatCurrency(stats.totalRevenue)}
            change={stats.revenueChange}
            icon="BarChart3"
          />
          <StatCard
            label="Ticket promedio"
            value={formatCurrency(
              Math.round(stats.totalRevenue / stats.totalReservations),
            )}
            change={4.3}
            icon="Ticket"
          />
          <StatCard
            label="Ocupación media"
            value={`${stats.occupancyRate}%`}
            change={stats.occupancyChange}
            icon="Bus"
          />
          <StatCard
            label="Pasajeros"
            value={stats.activePassengers.toLocaleString("es-AR")}
            change={stats.passengersChange}
            icon="Users"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ingresos por tipo de servicio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(byCategory)
              .sort((a, b) => b[1] - a[1])
              .map(([category, amount]) => (
                <div key={category}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium">
                      {CATEGORY_LABELS[category as ServiceCategory]}
                    </span>
                    <span className="text-muted-foreground">
                      {formatCurrency(amount)}
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${(amount / maxCat) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
