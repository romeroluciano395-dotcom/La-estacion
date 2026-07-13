/**
 * Tipos de la sección "Servicios" (contenido de marketing, estático).
 * Los tipos del dominio principal (eventos, reservas, etc.) viven en
 * `types/event.ts` y `types/admin.ts`.
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
