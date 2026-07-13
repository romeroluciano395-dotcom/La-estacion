import {
  CalendarDays,
  CircleCheck,
  CircleX,
  Ticket,
  CalendarClock,
  Users,
  DollarSign,
  Bus,
} from "lucide-react";

import { formatCurrency } from "@/lib/utils";
import {
  getDashboardMetrics,
  getReservasPorMes,
  getEventosPorCategoria,
  getOcupacionPorEstado,
} from "@/services/admin.service";
import { StatCard } from "@/components/dashboard/stat-card";
import { BarChart } from "@/components/charts/bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const [metrics, reservasMes, categorias, ocupacion] = await Promise.all([
    getDashboardMetrics(),
    getReservasPorMes(),
    getEventosPorCategoria(),
    getOcupacionPorEstado(),
  ]);

  const stats = [
    { label: "Total de eventos", value: metrics.totalEventos, icon: CalendarDays, accent: "primary" as const },
    { label: "Eventos activos", value: metrics.eventosActivos, icon: CircleCheck, accent: "success" as const },
    { label: "Eventos agotados", value: metrics.eventosAgotados, icon: CircleX, accent: "danger" as const },
    { label: "Reservas recibidas", value: metrics.reservasRecibidas, icon: Ticket, accent: "accent" as const },
    { label: "Próximos viajes", value: metrics.proximosViajes, icon: CalendarClock, accent: "primary" as const },
    { label: "Pasajeros registrados", value: metrics.pasajerosRegistrados, icon: Users, accent: "accent" as const },
    { label: "Ingresos estimados", value: formatCurrency(metrics.ingresosEstimados), icon: DollarSign, accent: "success" as const },
    { label: "Ocupación promedio", value: `${metrics.ocupacionPromedio}%`, icon: Bus, accent: "primary" as const },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Resumen general
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Vista rápida del estado de tu operación.
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Reservas por mes</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={reservasMes} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ocupación por estado</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart data={ocupacion} centerLabel="eventos" />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Eventos por categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart data={categorias} centerLabel="eventos" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
