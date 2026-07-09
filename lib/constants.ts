import type { Service } from "@/types";

export const SITE = {
  name: "La Estación",
  tagline: "Transporte de pasajeros para cada destino",
  description:
    "Empresa de transporte de pasajeros. Viajes a recitales, turismo, eventos deportivos, traslados a aeropuertos y servicios privados.",
  phone: "+54 9 11 5555-0000",
  email: "reservas@laestacion.com.ar",
  address: "Terminal de Ómnibus, Buenos Aires, Argentina",
  whatsapp: "5491155550000", // formato internacional sin signos
} as const;

/** Construye un enlace de WhatsApp con un mensaje personalizado. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Número de WhatsApp listo para usar en enlaces wa.me */
export const WHATSAPP_URL = whatsappLink(
  "¡Hola La Estación! Quiero hacer una consulta sobre un viaje.",
);

export const SOCIALS = {
  instagram: "https://instagram.com/laestacion",
  facebook: "https://facebook.com/laestacion",
  whatsapp: WHATSAPP_URL,
} as const;

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Próximos Viajes", href: "/proximos-viajes" },
  { label: "Servicios", href: "/servicios" },
  { label: "Galería", href: "/galeria" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Reservas", href: "/admin/reservas", icon: "Ticket" },
  { label: "Pasajeros", href: "/admin/pasajeros", icon: "Users" },
  { label: "Viajes", href: "/admin/viajes", icon: "Bus" },
  { label: "Estadísticas", href: "/admin/estadisticas", icon: "BarChart3" },
] as const;

export const SERVICES: Service[] = [
  {
    slug: "recitales",
    title: "Viajes a Recitales",
    shortDescription:
      "Llegá y volvé del show sin preocuparte por el estacionamiento ni el regreso.",
    description:
      "Coordinamos el traslado de ida y vuelta a los principales recitales y festivales del país. Salidas puntuales, unidades cómodas y regreso garantizado al finalizar el evento.",
    icon: "Music",
    highlights: [
      "Regreso asegurado al terminar el show",
      "Unidades con aire y butacas reclinables",
      "Punto de encuentro céntrico",
    ],
    fromPrice: 18000,
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80",
  },
  {
    slug: "turismo",
    title: "Viajes Turísticos",
    shortDescription:
      "Escapadas y excursiones a los mejores destinos, con coordinador a bordo.",
    description:
      "Excursiones de uno o varios días a destinos turísticos seleccionados. Incluye coordinador, paradas programadas y todas las comodidades para disfrutar el viaje.",
    icon: "Palmtree",
    highlights: [
      "Coordinador de viaje incluido",
      "Itinerarios de 1 a 7 días",
      "Paradas técnicas y gastronómicas",
    ],
    fromPrice: 35000,
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80",
  },
  {
    slug: "deportivos",
    title: "Eventos Deportivos",
    shortDescription:
      "Viajá con tu grupo a la cancha o al estadio con total seguridad.",
    description:
      "Traslados grupales a partidos, maratones y eventos deportivos. Logística coordinada con el evento para llegar con tiempo y volver sin complicaciones.",
    icon: "Trophy",
    highlights: [
      "Coordinación con el horario del evento",
      "Ideal para grupos y peñas",
      "Seguimiento en tiempo real",
    ],
    fromPrice: 15000,
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80",
  },
  {
    slug: "aeropuertos",
    title: "Traslados a Aeropuertos",
    shortDescription:
      "Puerta a puerta hacia Ezeiza y Aeroparque, a cualquier hora.",
    description:
      "Servicio de traslado a aeropuertos con horarios flexibles adaptados a tu vuelo. Puntualidad garantizada y seguimiento de vuelos para reprogramar ante demoras.",
    icon: "Plane",
    highlights: [
      "Disponible 24/7",
      "Seguimiento de vuelos",
      "Servicio puerta a puerta",
    ],
    fromPrice: 22000,
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
  },
  {
    slug: "privados",
    title: "Viajes Privados",
    shortDescription:
      "Contratá una unidad exclusiva para tu grupo con recorrido a medida.",
    description:
      "Unidades exclusivas para empresas, contingentes o grupos. Diseñamos el recorrido a tu medida, con chofer asignado y flexibilidad total de horarios.",
    icon: "Users",
    highlights: [
      "Unidad exclusiva para tu grupo",
      "Recorrido personalizado",
      "Facturación para empresas",
    ],
    fromPrice: 90000,
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80",
  },
  {
    slug: "especiales",
    title: "Eventos Especiales",
    shortDescription:
      "Casamientos, cumpleaños y eventos corporativos con logística a medida.",
    description:
      "Coordinamos el transporte de invitados para casamientos, quinceañeras, eventos corporativos y celebraciones. Logística completa para que solo te ocupes de disfrutar.",
    icon: "PartyPopper",
    highlights: [
      "Coordinación integral de invitados",
      "Múltiples puntos de partida",
      "Atención personalizada",
    ],
    fromPrice: 45000,
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&q=80",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
