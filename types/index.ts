/**
 * Tipos de dominio de "La Estación".
 * Estos tipos son la fuente de verdad de la UI y están alineados
 * con el esquema Prisma (prisma/schema.prisma) para una migración
 * a PostgreSQL sin reescribir componentes.
 */

export type ServiceCategory =
  | "recitales"
  | "turismo"
  | "deportivos"
  | "aeropuertos"
  | "privados"
  | "especiales";

export interface Service {
  slug: ServiceCategory;
  title: string;
  shortDescription: string;
  description: string;
  icon: string; // nombre de icono lucide
  highlights: string[];
  fromPrice: number;
  image: string;
}

export type ReservationStatus =
  | "pendiente"
  | "confirmada"
  | "pagada"
  | "cancelada";

export type PaymentStatus = "pendiente" | "aprobado" | "rechazado";

export interface Passenger {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  document: string;
  createdAt: string;
}

export interface Trip {
  id: string;
  category: ServiceCategory;
  title: string;
  origin: string;
  destination: string;
  departureDate: string;
  seatsTotal: number;
  seatsAvailable: number;
  pricePerSeat: number;
}

export interface Reservation {
  id: string;
  code: string;
  category: ServiceCategory;
  tripTitle: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  seats: number;
  amount: number;
  status: ReservationStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  departureDate: string;
}

export interface DashboardStats {
  totalRevenue: number;
  revenueChange: number;
  totalReservations: number;
  reservationsChange: number;
  activePassengers: number;
  passengersChange: number;
  occupancyRate: number;
  occupancyChange: number;
}
