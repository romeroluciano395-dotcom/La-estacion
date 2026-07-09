import { z } from "zod";

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
