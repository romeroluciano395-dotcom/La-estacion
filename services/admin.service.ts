import type {
  AdminUser,
  CategoryChartPoint,
  ChartPoint,
  DashboardMetrics,
  Mensaje,
  Reserva,
  SiteSettings,
} from "@/types/admin";
import type { EventCategory } from "@/types/event";
import { CATEGORY_LABEL } from "@/lib/events-config";
import { statusToDomain, toAdminUser, toMensaje, toReserva, toSiteSettings, toSettingsUpdateData } from "@/server/mappers";
import { EVENT_STATUS_META } from "@/lib/events-config";
import { eventRepository } from "@/server/repositories/event.repository";
import { reservationRepository } from "@/server/repositories/reservation.repository";
import { contactRepository } from "@/server/repositories/contact.repository";
import { settingsRepository } from "@/server/repositories/settings.repository";
import { userRepository } from "@/server/repositories/user.repository";

/* ---------------- Dashboard ---------------- */

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const [
    totalEventos,
    agotados,
    proximos,
    realizados,
    reservasRecibidas,
    sumaPasajeros,
    activosDisp,
    activosUlt,
    confirmadas,
  ] = await Promise.all([
    eventRepository.count(),
    eventRepository.countByStatus("agotado"),
    eventRepository.countUpcoming(hoy),
    eventRepository.countPast(hoy),
    reservationRepository.count(),
    reservationRepository.sumPassengers(),
    eventRepository.countByStatus("disponible"),
    eventRepository.countByStatus("ultimos_lugares"),
    reservationRepository.findConfirmedWithPrice(),
  ]);

  const ingresos = confirmadas.reduce(
    (acc, r) => acc + (r.event?.price ?? 0) * r.quantity,
    0,
  );

  return {
    totalEventos,
    eventosActivos: activosDisp + activosUlt,
    eventosAgotados: agotados,
    reservasRecibidas,
    proximosViajes: proximos,
    pasajerosRegistrados: sumaPasajeros._sum.quantity ?? 0,
    ingresosEstimados: ingresos,
    viajesRealizados: realizados + 487, // histórico previo al sistema
  };
}

/** Reservas por mes (últimos 6 meses) — datos reales de la base. */
export async function getReservasPorMes(): Promise<ChartPoint[]> {
  const desde = new Date();
  desde.setMonth(desde.getMonth() - 5, 1);
  desde.setHours(0, 0, 0, 0);

  const reservas = await reservationRepository.findCreatedSince(desde);

  const meses: ChartPoint[] = [];
  const cursor = new Date(desde);
  const fmt = new Intl.DateTimeFormat("es-AR", { month: "short" });
  const keys: string[] = [];
  for (let i = 0; i < 6; i++) {
    const key = `${cursor.getFullYear()}-${cursor.getMonth()}`;
    keys.push(key);
    meses.push({ label: fmt.format(cursor).replace(".", ""), value: 0 });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  for (const r of reservas) {
    const d = new Date(r.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const idx = keys.indexOf(key);
    if (idx >= 0) meses[idx].value += 1;
  }

  return meses;
}

export async function getEventosPorCategoria(): Promise<CategoryChartPoint[]> {
  const rows = await eventRepository.groupByCategory();
  return rows
    .map((r) => ({
      categoria: r.category as EventCategory,
      label: CATEGORY_LABEL[r.category as EventCategory],
      value: r._count._all,
    }))
    .filter((p) => p.value > 0)
    .sort((a, b) => b.value - a.value);
}

export async function getOcupacionPorEstado(): Promise<ChartPoint[]> {
  const rows = await eventRepository.groupByStatus();
  return rows
    .map((r) => ({
      label: EVENT_STATUS_META[statusToDomain(r.status)].label,
      value: r._count._all,
    }))
    .filter((p) => p.value > 0);
}

/* ---------------- Listados ---------------- */

export async function getReservas(): Promise<Reserva[]> {
  const rows = await reservationRepository.findMany();
  return rows.map(toReserva);
}

export async function getMensajes(): Promise<Mensaje[]> {
  const rows = await contactRepository.findMany();
  return rows.map(toMensaje);
}

export async function getUsuarios(): Promise<AdminUser[]> {
  const rows = await userRepository.findMany();
  return rows.map(toAdminUser);
}

export async function getSettings(): Promise<SiteSettings | null> {
  const row = await settingsRepository.get();
  return row ? toSiteSettings(row) : null;
}

/* ---------------- Mutaciones ---------------- */

export async function marcarMensajeLeido(id: string, leido: boolean) {
  await contactRepository.setRead(id, leido);
}

export async function eliminarMensaje(id: string) {
  await contactRepository.delete(id);
}

export async function actualizarSettings(patch: Partial<SiteSettings>) {
  const current = await settingsRepository.get();
  if (!current) return;
  await settingsRepository.update(current.id, toSettingsUpdateData(patch));
}
