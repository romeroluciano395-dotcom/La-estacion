import type {
  Event as PrismaEvent,
  Reservation as PrismaReservation,
  Contact as PrismaContact,
  Settings as PrismaSettings,
  User as PrismaUser,
  Prisma,
} from "@prisma/client";

import type { Evento, EventStatus, FaqItem } from "@/types/event";
import type {
  AdminUser,
  Mensaje,
  Reserva,
  ReservaEstado,
  SiteSettings,
  UserRole,
} from "@/types/admin";
import type { EventoInput } from "@/lib/validations";

/* ---------------- Helpers de enums ---------------- */

/** Prisma usa `ultimos_lugares`; el dominio usa `ultimos-lugares`. */
export function statusToDomain(status: string): EventStatus {
  return status.replace(/_/g, "-") as EventStatus;
}
export function statusToDb(status: EventStatus): PrismaEvent["status"] {
  return status.replace(/-/g, "_") as PrismaEvent["status"];
}

function dateToYmd(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/* ---------------- Event ↔ Evento ---------------- */

export function toEvento(e: PrismaEvent): Evento {
  return {
    id: e.id,
    slug: e.slug,
    nombre: e.title,
    descripcion: e.description,
    descripcionCorta: e.shortDescription,
    precio: e.price,
    fecha: dateToYmd(e.date),
    hora: e.time,
    ciudad: e.city,
    lugarSalida: e.departureLocation,
    categoria: e.category,
    estado: statusToDomain(e.status),
    lugaresDisponibles: e.availableSeats,
    imagenPrincipal: e.coverImage,
    galeria: e.gallery,
    destacado: e.featured,
    coordenadas: { lat: e.latitude, lng: e.longitude },
    informacionImportante: e.importantInfo,
    faqs: (e.faqs as unknown as FaqItem[]) ?? [],
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  };
}

/** Datos para crear/actualizar un Event desde el formulario del panel. */
export function toEventCreateData(
  input: EventoInput,
): Prisma.EventCreateInput {
  return {
    slug: input.slug,
    title: input.nombre,
    shortDescription: input.descripcionCorta,
    description: input.descripcion,
    price: input.precio,
    date: new Date(`${input.fecha}T00:00:00.000Z`),
    time: input.hora,
    city: input.ciudad,
    departureLocation: input.lugarSalida,
    category: input.categoria,
    status: statusToDb(input.estado),
    availableSeats: input.lugaresDisponibles,
    featured: input.destacado,
    coverImage: input.imagenPrincipal,
    gallery: input.galeria ?? [],
    latitude: input.lat,
    longitude: input.lng,
    importantInfo: input.informacionImportante
      ? input.informacionImportante
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean)
      : [],
  };
}

/* ---------------- Reservation ↔ Reserva ---------------- */

type ReservationWithEvent = PrismaReservation & {
  event: { title: string; slug: string };
};

export function toReserva(r: ReservationWithEvent): Reserva {
  return {
    id: r.id,
    nombre: r.firstName,
    apellido: r.lastName,
    dni: r.dni,
    telefono: r.phone,
    email: r.email,
    eventoNombre: r.event.title,
    eventoSlug: r.event.slug,
    cantidadPasajeros: r.quantity,
    estado: r.status as ReservaEstado,
    observaciones: r.notes ?? "",
    createdAt: r.createdAt.toISOString(),
  };
}

/* ---------------- Contact ↔ Mensaje ---------------- */

export function toMensaje(c: PrismaContact): Mensaje {
  const asunto =
    c.message.length > 60 ? `${c.message.slice(0, 60).trim()}…` : c.message;
  return {
    id: c.id,
    nombre: c.name,
    email: c.email,
    asunto,
    mensaje: c.message,
    leido: c.read,
    createdAt: c.createdAt.toISOString(),
  };
}

/* ---------------- User ↔ AdminUser ---------------- */

export function toAdminUser(u: PrismaUser): AdminUser {
  return {
    id: u.id,
    nombre: u.name,
    email: u.email,
    rol: u.role as UserRole,
    estado: "activo",
    createdAt: u.createdAt.toISOString(),
  };
}

/* ---------------- Settings ↔ SiteSettings ---------------- */

export function toSiteSettings(s: PrismaSettings): SiteSettings {
  return {
    nombre: s.companyName,
    descripcion: s.description,
    whatsapp: s.whatsapp,
    instagram: s.instagram,
    facebook: s.facebook,
    email: s.email,
    direccion: s.address,
    horarios: s.hours,
    logoUrl: s.logo,
    colorPrimario: s.primaryColor,
    colorAcento: s.secondaryColor,
  };
}

export function toSettingsUpdateData(
  patch: Partial<SiteSettings>,
): Prisma.SettingsUpdateInput {
  const data: Prisma.SettingsUpdateInput = {};
  if (patch.nombre !== undefined) data.companyName = patch.nombre;
  if (patch.descripcion !== undefined) data.description = patch.descripcion;
  if (patch.whatsapp !== undefined) data.whatsapp = patch.whatsapp;
  if (patch.instagram !== undefined) data.instagram = patch.instagram;
  if (patch.facebook !== undefined) data.facebook = patch.facebook;
  if (patch.email !== undefined) data.email = patch.email;
  if (patch.direccion !== undefined) data.address = patch.direccion;
  if (patch.horarios !== undefined) data.hours = patch.horarios;
  if (patch.logoUrl !== undefined) data.logo = patch.logoUrl;
  if (patch.colorPrimario !== undefined) data.primaryColor = patch.colorPrimario;
  if (patch.colorAcento !== undefined) data.secondaryColor = patch.colorAcento;
  return data;
}

/** Domain role helper (spec: admin | editor). */
export type { UserRole };
