import type { Evento } from "@/types/event";

/**
 * Datos simulados de eventos. Archivo separado de los componentes:
 * ningún evento está escrito dentro de la UI. Mañana, el `events.service`
 * leerá estos mismos objetos desde PostgreSQL (Prisma) sin cambiar la UI.
 */

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80`;

const now = "2026-07-01T10:00:00.000Z";

export const EVENTOS: Evento[] = [
  {
    id: "evt_001",
    slug: "lollapalooza-2027",
    nombre: "Lollapalooza Argentina 2027",
    descripcionCorta:
      "Viví el festival más grande del país con traslado ida y vuelta asegurado.",
    descripcion:
      "Te llevamos y traemos del festival más esperado del año. Salida coordinada desde el centro, butacas cómodas, aire acondicionado y regreso garantizado al finalizar la última banda. Olvidate del estacionamiento y del regreso: nosotros nos ocupamos de todo para que vos solo disfrutes.",
    precio: 28000,
    fecha: "2027-03-19",
    hora: "12:00",
    ciudad: "San Isidro",
    lugarSalida: "Obelisco, CABA",
    categoria: "recitales",
    estado: "ultimos-lugares",
    lugaresDisponibles: 6,
    imagenPrincipal: img("photo-1470229722913-7c0e2dbbafd3"),
    galeria: [
      img("photo-1459749411175-04bf5292ceea"),
      img("photo-1501281668745-f7f57925c3b4"),
      img("photo-1514525253161-7a46d19cd819"),
    ],
    destacado: true,
    coordenadas: { lat: -34.4708, lng: -58.5236 },
    informacionImportante: [
      "Presentarse 30 minutos antes de la salida.",
      "Llevar entrada al evento y documento.",
      "El regreso parte al finalizar el show.",
    ],
    faqs: [
      {
        pregunta: "¿A qué hora es el regreso?",
        respuesta:
          "El micro regresa apenas termina la última banda. No necesitás preocuparte por el horario.",
      },
      {
        pregunta: "¿La entrada al festival está incluida?",
        respuesta:
          "No, el servicio es solo de transporte ida y vuelta. La entrada la gestionás por tu cuenta.",
      },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "evt_002",
    slug: "coldplay-river-2026",
    nombre: "Coldplay en River",
    descripcionCorta:
      "Traslado directo al Monumental para la gira Music of the Spheres.",
    descripcion:
      "Sumate al viaje grupal para ver a Coldplay en el Estadio Monumental. Salida puntual, unidades modernas y regreso asegurado para que disfrutes el show sin pensar en nada más.",
    precio: 22000,
    fecha: "2026-11-14",
    hora: "18:30",
    ciudad: "CABA",
    lugarSalida: "Terminal de Retiro",
    categoria: "recitales",
    estado: "disponible",
    lugaresDisponibles: 24,
    imagenPrincipal: img("photo-1501386761578-eac5c94b800a"),
    galeria: [
      img("photo-1493225457124-a3eb161ffa5f"),
      img("photo-1516450360452-9312f5e86fc7"),
    ],
    destacado: true,
    coordenadas: { lat: -34.5453, lng: -58.4497 },
    informacionImportante: [
      "Salida puntual, no se espera a pasajeros demorados.",
      "Cada pasajero debe presentar su entrada.",
    ],
    faqs: [
      {
        pregunta: "¿Dónde nos deja el micro?",
        respuesta: "En una zona cercana al estadio, coordinada con seguridad.",
      },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "evt_003",
    slug: "escapada-mar-del-plata",
    nombre: "Escapada a Mar del Plata",
    descripcionCorta:
      "Fin de semana en la costa con coordinador y paradas programadas.",
    descripcion:
      "Escapada de fin de semana a la ciudad feliz. Incluye coordinador de viaje, paradas técnicas y gastronómicas, y todas las comodidades para que disfrutes desde el minuto uno.",
    precio: 45000,
    fecha: "2026-09-12",
    hora: "07:00",
    ciudad: "Mar del Plata",
    lugarSalida: "Terminal de Retiro",
    categoria: "turismo",
    estado: "disponible",
    lugaresDisponibles: 30,
    imagenPrincipal: img("photo-1507525428034-b723cf961d3e"),
    galeria: [
      img("photo-1506929562872-bb421503ef21"),
      img("photo-1519046904884-53103b34b206"),
    ],
    destacado: true,
    coordenadas: { lat: -38.0055, lng: -57.5426 },
    informacionImportante: [
      "El viaje incluye ida y vuelta, no alojamiento.",
      "Duración estimada del trayecto: 5 horas.",
    ],
    faqs: [
      {
        pregunta: "¿Hay paradas en el camino?",
        respuesta: "Sí, realizamos paradas técnicas y gastronómicas.",
      },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "evt_004",
    slug: "superclasico-bombonera",
    nombre: "Superclásico en La Bombonera",
    descripcionCorta: "Viajá con tu peña al clásico más importante del fútbol.",
    descripcion:
      "Traslado grupal al superclásico. Coordinamos horarios con el evento para llegar con tiempo y volver sin complicaciones. Ideal para peñas y grupos de amigos.",
    precio: 18000,
    fecha: "2026-10-25",
    hora: "15:00",
    ciudad: "CABA",
    lugarSalida: "Plaza Once",
    categoria: "deportivos",
    estado: "agotado",
    lugaresDisponibles: 0,
    imagenPrincipal: img("photo-1522778119026-d647f0596c20"),
    galeria: [img("photo-1508098682722-e99c43a406b2")],
    destacado: false,
    coordenadas: { lat: -34.6355, lng: -58.3646 },
    informacionImportante: ["Prohibido el ingreso de banderas con caños."],
    faqs: [
      {
        pregunta: "¿Puedo comprar la entrada con ustedes?",
        respuesta: "No, solo brindamos el transporte al estadio.",
      },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "evt_005",
    slug: "cataratas-del-iguazu",
    nombre: "Cataratas del Iguazú",
    descripcionCorta:
      "Excursión de varios días a una de las maravillas del mundo.",
    descripcion:
      "Viaje turístico a las Cataratas del Iguazú con coordinador a bordo, paradas programadas y toda la logística resuelta. Una experiencia inolvidable con la comodidad que merecés.",
    precio: 120000,
    fecha: "2027-01-15",
    hora: "20:00",
    ciudad: "Puerto Iguazú",
    lugarSalida: "Terminal de Retiro",
    categoria: "turismo",
    estado: "disponible",
    lugaresDisponibles: 18,
    imagenPrincipal: img("photo-1470071459604-3b5ec3a7fe05"),
    galeria: [
      img("photo-1544966503-7cc5ac882d5f"),
      img("photo-1552465011-b4e21bf6e79a"),
    ],
    destacado: true,
    coordenadas: { lat: -25.6953, lng: -54.4367 },
    informacionImportante: [
      "Viaje nocturno, se recomienda llevar abrigo.",
      "Consultá el itinerario completo al reservar.",
    ],
    faqs: [
      {
        pregunta: "¿Cuántos días dura la excursión?",
        respuesta: "El paquete es de 3 días y 2 noches.",
      },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "evt_006",
    slug: "traslado-ezeiza-24hs",
    nombre: "Traslado a Ezeiza 24hs",
    descripcionCorta: "Servicio puerta a puerta al aeropuerto, a cualquier hora.",
    descripcion:
      "Traslado al Aeropuerto Internacional de Ezeiza con horarios flexibles adaptados a tu vuelo. Seguimiento de vuelos y puntualidad garantizada para que llegues siempre a tiempo.",
    precio: 26000,
    fecha: "2026-08-20",
    hora: "04:30",
    ciudad: "Ezeiza",
    lugarSalida: "Puerta a puerta (CABA y GBA)",
    categoria: "aeropuertos",
    estado: "disponible",
    lugaresDisponibles: 8,
    imagenPrincipal: img("photo-1436491865332-7a61a109cc05"),
    galeria: [img("photo-1502920917128-1aa500764cbd")],
    destacado: false,
    coordenadas: { lat: -34.8222, lng: -58.5358 },
    informacionImportante: ["Confirmá tu vuelo con 24hs de anticipación."],
    faqs: [
      {
        pregunta: "¿Hacen seguimiento del vuelo?",
        respuesta: "Sí, reprogramamos el traslado ante demoras de tu vuelo.",
      },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "evt_007",
    slug: "casamiento-estancia-villa",
    nombre: "Traslado de invitados — Casamiento",
    descripcionCorta:
      "Logística completa de invitados para tu evento especial.",
    descripcion:
      "Coordinamos el transporte de todos los invitados a tu casamiento, con múltiples puntos de partida y regreso organizado. Vos disfrutás, nosotros nos ocupamos de que todos lleguen y vuelvan bien.",
    precio: 60000,
    fecha: "2026-12-06",
    hora: "19:00",
    ciudad: "Pilar",
    lugarSalida: "Múltiples puntos (a coordinar)",
    categoria: "privados",
    estado: "proximamente",
    lugaresDisponibles: 40,
    imagenPrincipal: img("photo-1519671482749-fd09be7ccebf"),
    galeria: [img("photo-1464366400600-7168b8af9bc3")],
    destacado: false,
    coordenadas: { lat: -34.4586, lng: -58.9142 },
    informacionImportante: ["Servicio a medida según cantidad de invitados."],
    faqs: [
      {
        pregunta: "¿Puedo definir varios puntos de partida?",
        respuesta: "Sí, coordinamos múltiples puntos según tus invitados.",
      },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "evt_008",
    slug: "traslado-corporativo-evento",
    nombre: "Traslado Corporativo — Convención",
    descripcionCorta: "Transporte de empleados con facturación para empresas.",
    descripcion:
      "Servicio de traslado corporativo para convenciones, capacitaciones y eventos de empresa. Unidades exclusivas, chofer asignado y facturación A.",
    precio: 95000,
    fecha: "2026-09-30",
    hora: "08:00",
    ciudad: "Costa Salguero, CABA",
    lugarSalida: "A coordinar con la empresa",
    categoria: "empresas",
    estado: "disponible",
    lugaresDisponibles: 45,
    imagenPrincipal: img("photo-1544620347-c4fd4a3d5957"),
    galeria: [img("photo-1517502884422-41eaead166d4")],
    destacado: false,
    coordenadas: { lat: -34.5709, lng: -58.3922 },
    informacionImportante: ["Emitimos factura A.", "Chofer asignado al evento."],
    faqs: [
      {
        pregunta: "¿Emiten factura A?",
        respuesta: "Sí, trabajamos con facturación para empresas.",
      },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "evt_009",
    slug: "año-nuevo-cataratas",
    nombre: "Fin de Año en la Costa",
    descripcionCorta: "Recibí el año nuevo con una escapada especial.",
    descripcion:
      "Viaje especial de fin de año a la costa atlántica. Salidas organizadas, coordinador a bordo y toda la logística resuelta para arrancar el año a lo grande.",
    precio: 70000,
    fecha: "2026-12-30",
    hora: "22:00",
    ciudad: "Pinamar",
    lugarSalida: "Terminal de Retiro",
    categoria: "especiales",
    estado: "cancelado",
    lugaresDisponibles: 0,
    imagenPrincipal: img("photo-1533105079780-92b9be482077"),
    galeria: [img("photo-1493246507139-91e8fad9978e")],
    destacado: false,
    coordenadas: { lat: -37.1117, lng: -56.8608 },
    informacionImportante: ["Evento reprogramado, consultá nuevas fechas."],
    faqs: [
      {
        pregunta: "¿Por qué se canceló?",
        respuesta: "Por baja demanda. Estamos coordinando una nueva fecha.",
      },
    ],
    createdAt: now,
    updatedAt: now,
  },
];
