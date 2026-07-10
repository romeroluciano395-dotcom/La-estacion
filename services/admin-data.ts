import type { AdminUser, Mensaje, Reserva, SiteSettings } from "@/types/admin";
import { SITE, SOCIALS } from "@/lib/constants";

/** Datos simulados del panel. Mutables en memoria (persisten en dev). */

export const MENSAJES: Mensaje[] = [
  {
    id: "msg_1",
    nombre: "Carla Giménez",
    email: "carla.g@example.com",
    asunto: "Consulta por viaje a recital",
    mensaje:
      "Hola, quería saber si tienen lugares para el Lollapalooza y desde dónde sale el micro. ¡Gracias!",
    leido: false,
    createdAt: "2026-07-08T14:20:00.000Z",
  },
  {
    id: "msg_2",
    nombre: "Empresa TechCo",
    email: "eventos@techco.com",
    asunto: "Traslado corporativo",
    mensaje:
      "Necesitamos trasladar a 40 empleados a una convención. ¿Emiten factura A? Quedamos a la espera.",
    leido: false,
    createdAt: "2026-07-07T09:05:00.000Z",
  },
  {
    id: "msg_3",
    nombre: "Rodrigo Paz",
    email: "rodri.paz@example.com",
    asunto: "Escapada a Mar del Plata",
    mensaje: "¿El viaje del 12 de septiembre incluye alojamiento?",
    leido: true,
    createdAt: "2026-07-05T18:40:00.000Z",
  },
];

export const USUARIOS: AdminUser[] = [
  {
    id: "usr_1",
    nombre: "Administrador",
    email: "admin@laestacion.com.ar",
    rol: "admin",
    estado: "activo",
    createdAt: "2026-01-10T10:00:00.000Z",
  },
  {
    id: "usr_2",
    nombre: "Lucía Operadora",
    email: "lucia@laestacion.com.ar",
    rol: "operador",
    estado: "activo",
    createdAt: "2026-03-22T12:30:00.000Z",
  },
  {
    id: "usr_3",
    nombre: "Martín Soporte",
    email: "martin@laestacion.com.ar",
    rol: "operador",
    estado: "inactivo",
    createdAt: "2026-05-14T16:15:00.000Z",
  },
];

export const RESERVAS: Reserva[] = [
  {
    id: "res_1",
    nombre: "María",
    apellido: "González",
    dni: "34567890",
    telefono: "+54 9 11 4444-1122",
    email: "maria.g@example.com",
    eventoNombre: "Lollapalooza Argentina 2027",
    eventoSlug: "lollapalooza-2027",
    cantidadPasajeros: 2,
    estado: "pagada",
    observaciones: "Paga en efectivo confirmada.",
    createdAt: "2026-07-01T12:00:00.000Z",
  },
  {
    id: "res_2",
    nombre: "Juan",
    apellido: "Pérez",
    dni: "29111222",
    telefono: "+54 9 11 5555-2233",
    email: "juanp@example.com",
    eventoNombre: "Escapada a Mar del Plata",
    eventoSlug: "escapada-mar-del-plata",
    cantidadPasajeros: 4,
    estado: "confirmada",
    observaciones: "Seña abonada, resta el saldo.",
    createdAt: "2026-07-03T16:20:00.000Z",
  },
  {
    id: "res_3",
    nombre: "Lucía",
    apellido: "Fernández",
    dni: "38999000",
    telefono: "+54 9 11 6666-3344",
    email: "lucia.f@example.com",
    eventoNombre: "Coldplay en River",
    eventoSlug: "coldplay-river-2026",
    cantidadPasajeros: 1,
    estado: "pendiente",
    observaciones: "",
    createdAt: "2026-07-08T08:00:00.000Z",
  },
  {
    id: "res_4",
    nombre: "Diego",
    apellido: "Martínez",
    dni: "27333444",
    telefono: "+54 9 11 7777-4455",
    email: "diegom@example.com",
    eventoNombre: "Superclásico en La Bombonera",
    eventoSlug: "superclasico-bombonera",
    cantidadPasajeros: 3,
    estado: "cancelada",
    observaciones: "Canceló por sobreventa del evento.",
    createdAt: "2026-07-06T20:10:00.000Z",
  },
];

/** Configuración del sitio (mutable en memoria). */
export const SITE_SETTINGS: SiteSettings = {
  nombre: SITE.name,
  descripcion: SITE.description,
  whatsapp: SITE.whatsapp,
  instagram: SOCIALS.instagram,
  facebook: SOCIALS.facebook,
  email: SITE.email,
  direccion: SITE.address,
  horarios: "Lun a Vie de 9 a 18 hs · Sáb de 9 a 13 hs",
  logoUrl: "",
  colorPrimario: "#2563EB",
  colorAcento: "#7C3AED",
};
