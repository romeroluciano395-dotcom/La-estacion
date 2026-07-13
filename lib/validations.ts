import { z } from "zod";

const EVENT_CATEGORIES = [
  "recitales",
  "turismo",
  "deportivos",
  "aeropuertos",
  "privados",
  "empresas",
  "especiales",
] as const;

const EVENT_STATUSES = [
  "disponible",
  "ultimos-lugares",
  "agotado",
  "proximamente",
  "cancelado",
] as const;

/** Esquema del formulario de evento del panel (RHF + Zod). */
export const eventoSchema = z.object({
  nombre: z.string().min(3, "Ingresá el nombre del evento").max(120),
  slug: z
    .string()
    .min(3, "El slug es obligatorio")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Solo minúsculas, números y guiones (ej: lollapalooza-2027)",
    ),
  descripcionCorta: z
    .string()
    .min(10, "Mínimo 10 caracteres")
    .max(180, "Máximo 180 caracteres"),
  descripcion: z.string().min(20, "Contanos más sobre el viaje (mín. 20)"),
  precio: z.coerce.number().min(0, "El precio no puede ser negativo"),
  fecha: z.string().min(1, "Elegí una fecha"),
  hora: z.string().min(1, "Ingresá la hora"),
  ciudad: z.string().min(2, "Ingresá la ciudad destino"),
  lugarSalida: z.string().min(2, "Ingresá el lugar de salida"),
  categoria: z.enum(EVENT_CATEGORIES, {
    required_error: "Elegí una categoría",
  }),
  estado: z.enum(EVENT_STATUSES, { required_error: "Elegí un estado" }),
  lugaresDisponibles: z.coerce
    .number()
    .int("Debe ser un número entero")
    .min(0, "No puede ser negativo"),
  imagenPrincipal: z.string().min(1, "Subí una imagen principal"),
  galeria: z.array(z.string()).default([]),
  lat: z.coerce.number().default(-34.6037),
  lng: z.coerce.number().default(-58.3816),
  informacionImportante: z.string().default(""),
  destacado: z.boolean().default(false),
});

export type EventoInput = z.infer<typeof eventoSchema>;

const RESERVATION_STATUSES = [
  "pendiente",
  "confirmada",
  "cancelada",
  "finalizada",
] as const;

/** Formulario público de reserva (RHF + Zod). */
export const reservaPublicaSchema = z.object({
  eventId: z.string().min(1, "Evento inválido"),
  nombre: z.string().min(2, "Ingresá tu nombre").max(60),
  apellido: z.string().min(2, "Ingresá tu apellido").max(60),
  dni: z
    .string()
    .min(6, "DNI inválido")
    .max(15, "DNI inválido")
    .regex(/^[0-9.]+$/, "El DNI solo puede tener números"),
  telefono: z.string().min(8, "Teléfono inválido").max(20),
  email: z.string().email("Email inválido"),
  cantidad: z.coerce
    .number()
    .int("Debe ser un número entero")
    .min(1, "Al menos 1 pasajero")
    .max(20, "Máximo 20 pasajeros por reserva"),
  observaciones: z.string().max(500, "Máximo 500 caracteres").optional(),
  aceptaTerminos: z.literal(true, {
    errorMap: () => ({ message: "Tenés que aceptar los términos y condiciones" }),
  }),
});

export type ReservaPublicaInput = z.infer<typeof reservaPublicaSchema>;

/** Edición de una reserva desde el panel. */
export const reservaEditSchema = z.object({
  nombre: z.string().min(2, "Ingresá el nombre").max(60),
  apellido: z.string().min(2, "Ingresá el apellido").max(60),
  dni: z.string().min(6, "DNI inválido").max(15),
  telefono: z.string().min(8, "Teléfono inválido").max(20),
  email: z.string().email("Email inválido"),
  cantidad: z.coerce.number().int().min(1, "Al menos 1"),
  observaciones: z.string().max(500).optional(),
  estado: z.enum(RESERVATION_STATUSES),
});

export type ReservaEditInput = z.infer<typeof reservaEditSchema>;

/** Esquema de inicio de sesión del panel administrador. */
export const loginSchema = z.object({
  email: z.string().email("Ingresá un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginInput = z.infer<typeof loginSchema>;

/** Esquema de contacto. */
export const contactSchema = z.object({
  name: z.string().min(3, "Ingresá tu nombre"),
  email: z.string().email("Ingresá un email válido"),
  message: z.string().min(10, "Contanos un poco más (mín. 10 caracteres)"),
});

export type ContactInput = z.infer<typeof contactSchema>;
