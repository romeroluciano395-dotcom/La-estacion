/**
 * Modelo de dominio de un Evento / Viaje.
 * Fuente de verdad de la UI y alineado con el esquema Prisma
 * (prisma/schema.prisma → model Event) para migrar a PostgreSQL
 * sin reescribir componentes.
 */

export type EventCategory =
  | "recitales"
  | "turismo"
  | "deportivos"
  | "aeropuertos"
  | "privados"
  | "empresas"
  | "especiales";

export type EventStatus =
  | "disponible"
  | "ultimos-lugares"
  | "agotado"
  | "proximamente"
  | "cancelado";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface FaqItem {
  pregunta: string;
  respuesta: string;
}

export interface Evento {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  descripcionCorta: string;
  precio: number;
  fecha: string; // ISO date (YYYY-MM-DD)
  hora: string; // "20:00"
  ciudad: string;
  lugarSalida: string;
  categoria: EventCategory;
  estado: EventStatus;
  lugaresDisponibles: number;
  imagenPrincipal: string;
  galeria: string[];
  destacado: boolean;
  coordenadas: Coordinates;
  informacionImportante: string[];
  faqs: FaqItem[];
  createdAt: string;
  updatedAt: string;
}

/** Opciones de ordenamiento del listado. */
export type EventSort =
  | "fecha-asc"
  | "precio-asc"
  | "precio-desc"
  | "nombre-asc"
  | "lugares-desc";

/** Estado de los filtros del explorador de eventos. */
export interface EventFiltersState {
  query: string;
  categoria: EventCategory | "todas";
  ciudad: string | "todas";
  precioMax: number | null;
  fechaDesde: string | null;
  soloDisponibles: boolean;
  sort: EventSort;
}
