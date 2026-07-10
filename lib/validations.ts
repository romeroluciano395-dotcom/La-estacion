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

const SERVICE_CATEGORIES = [
  "recitales",
  "turismo",
  "deportivos",
  "aeropuertos",
  "privados",
  "especiales",
] as const;

/** Esquema del formulario de reserva (React Hook Form + Zod). */
export const reservationSchema = z.object({
  category: z.enum(SERVICE_CATEGORIES, {
    required_error: "Seleccioná un tipo de servicio",
  }),
  fullName: z
    .string()
    .min(3, "Ingresá tu nombre completo")
    .max(80, "Nombre demasiado largo"),
  email: z.string().email("Ingresá un email válido"),
  phone: z
    .string()
    .min(8, "Ingresá un teléfono válido")
    .max(20, "Teléfono demasiado largo"),
  document: z
    .string()
    .min(6, "Ingresá un documento válido")
    .max(15, "Documento demasiado largo"),
  origin: z.string().min(2, "Ingresá el punto de partida"),
  destination: z.string().min(2, "Ingresá el destino"),
  departureDate: z.string().min(1, "Elegí una fecha de salida"),
  seats: z.coerce
    .number()
    .int("Debe ser un número entero")
    .min(1, "Al menos 1 pasajero")
    .max(60, "Máximo 60 pasajeros"),
  notes: z.string().max(500, "Máximo 500 caracteres").optional(),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

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
