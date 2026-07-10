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
import { EVENTOS } from "./events.data";
import {
  MENSAJES,
  RESERVAS,
  SITE_SETTINGS,
  USUARIOS,
} from "./admin-data";
import { CATEGORY_LABEL, EVENT_CATEGORIES } from "@/lib/events-config";

/* ---------------------------------------------------------------- */
/*  Dashboard                                                        */
/* ---------------------------------------------------------------- */

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const hoy = new Date().toISOString().slice(0, 10);
  const activos = EVENTOS.filter(
    (e) => e.estado === "disponible" || e.estado === "ultimos-lugares",
  ).length;
  const agotados = EVENTOS.filter((e) => e.estado === "agotado").length;
  const proximos = EVENTOS.filter((e) => e.fecha >= hoy).length;
  const realizados = EVENTOS.filter((e) => e.fecha < hoy).length;

  const pasajeros = RESERVAS.reduce((a, r) => a + r.cantidadPasajeros, 0);

  const ingresos = RESERVAS.filter(
    (r) => r.estado === "pagada" || r.estado === "confirmada",
  ).reduce((acc, r) => {
    const ev = EVENTOS.find((e) => e.slug === r.eventoSlug);
    return acc + (ev?.precio ?? 0) * r.cantidadPasajeros;
  }, 0);

  return {
    totalEventos: EVENTOS.length,
    eventosActivos: activos,
    eventosAgotados: agotados,
    reservasRecibidas: RESERVAS.length,
    proximosViajes: proximos,
    pasajerosRegistrados: pasajeros,
    ingresosEstimados: ingresos,
    viajesRealizados: realizados + 487, // histórico simulado
  };
}

/** Reservas por mes (últimos 6 meses) — datos simulados. */
export async function getReservasPorMes(): Promise<ChartPoint[]> {
  const meses = ["Feb", "Mar", "Abr", "May", "Jun", "Jul"];
  const valores = [18, 24, 31, 27, 39, 46];
  return meses.map((label, i) => ({ label, value: valores[i] }));
}

/** Distribución de eventos por categoría (real). */
export async function getEventosPorCategoria(): Promise<CategoryChartPoint[]> {
  return EVENT_CATEGORIES.map((c) => ({
    categoria: c.slug,
    label: c.label,
    value: EVENTOS.filter((e) => e.categoria === (c.slug as EventCategory))
      .length,
  })).filter((p) => p.value > 0);
}

/** Ocupación: distribución de eventos por estado (real). */
export async function getOcupacionPorEstado(): Promise<ChartPoint[]> {
  const estados: { key: string; label: string }[] = [
    { key: "disponible", label: "Disponible" },
    { key: "ultimos-lugares", label: "Últimos lugares" },
    { key: "agotado", label: "Agotado" },
    { key: "proximamente", label: "Próximamente" },
    { key: "cancelado", label: "Cancelado" },
  ];
  return estados
    .map((s) => ({
      label: s.label,
      value: EVENTOS.filter((e) => e.estado === s.key).length,
    }))
    .filter((p) => p.value > 0);
}

/* ---------------------------------------------------------------- */
/*  Listados                                                         */
/* ---------------------------------------------------------------- */

export async function getReservas(): Promise<Reserva[]> {
  return [...RESERVAS].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getMensajes(): Promise<Mensaje[]> {
  return [...MENSAJES].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getUsuarios(): Promise<AdminUser[]> {
  return [...USUARIOS].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function getSettings(): Promise<SiteSettings> {
  return { ...SITE_SETTINGS };
}

/* ---------------------------------------------------------------- */
/*  Mutaciones (helpers usados por server actions)                   */
/* ---------------------------------------------------------------- */

export function _marcarMensajeLeido(id: string, leido = true) {
  const m = MENSAJES.find((x) => x.id === id);
  if (m) m.leido = leido;
}

export function _eliminarMensaje(id: string) {
  const i = MENSAJES.findIndex((x) => x.id === id);
  if (i >= 0) MENSAJES.splice(i, 1);
}

export function _actualizarSettings(patch: Partial<SiteSettings>) {
  Object.assign(SITE_SETTINGS, patch);
}

export const CATEGORY_LABELS = CATEGORY_LABEL;
