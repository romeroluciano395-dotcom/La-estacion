import type { EventCategory } from "@/types/event";

/** Consulta enviada desde el formulario de contacto. */
export interface Mensaje {
  id: string;
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
  leido: boolean;
  createdAt: string;
}

export type UserRole = "admin" | "editor";
export type UserStatus = "activo" | "inactivo";

export interface AdminUser {
  id: string;
  nombre: string;
  email: string;
  rol: UserRole;
  estado: UserStatus;
  createdAt: string;
}

export type ReservaEstado =
  | "pendiente"
  | "confirmada"
  | "pagada"
  | "cancelada";

/** Reserva registrada para un evento. */
export interface Reserva {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  eventoNombre: string;
  eventoSlug: string;
  cantidadPasajeros: number;
  estado: ReservaEstado;
  observaciones: string;
  createdAt: string;
}

/** Configuración global del sitio (editable desde el panel). */
export interface SiteSettings {
  nombre: string;
  descripcion: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  email: string;
  direccion: string;
  horarios: string;
  logoUrl: string;
  colorPrimario: string;
  colorAcento: string;
}

/** Punto de dato para los gráficos. */
export interface ChartPoint {
  label: string;
  value: number;
}

export interface CategoryChartPoint extends ChartPoint {
  categoria: EventCategory;
}

/** Métricas del dashboard. */
export interface DashboardMetrics {
  totalEventos: number;
  eventosActivos: number;
  eventosAgotados: number;
  reservasRecibidas: number;
  proximosViajes: number;
  pasajerosRegistrados: number;
  ingresosEstimados: number;
  viajesRealizados: number;
}
