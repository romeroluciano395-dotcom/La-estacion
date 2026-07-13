import { PrismaClient, type Prisma, type Event } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80`;

const EVENTS: Prisma.EventCreateInput[] = [
  {
    slug: "lollapalooza-2027",
    title: "Lollapalooza Argentina 2027",
    shortDescription:
      "Viví el festival más grande del país con traslado ida y vuelta asegurado.",
    description:
      "Te llevamos y traemos del festival más esperado del año. Salida coordinada desde el centro, butacas cómodas, aire acondicionado y regreso garantizado al finalizar la última banda.",
    price: 28000,
    date: new Date("2027-03-19T00:00:00.000Z"),
    time: "12:00",
    city: "San Isidro",
    departureLocation: "Obelisco, CABA",
    category: "recitales",
    status: "ultimos_lugares",
    availableSeats: 6,
    featured: true,
    coverImage: img("photo-1470229722913-7c0e2dbbafd3"),
    gallery: [
      img("photo-1459749411175-04bf5292ceea"),
      img("photo-1501281668745-f7f57925c3b4"),
      img("photo-1514525253161-7a46d19cd819"),
    ],
    latitude: -34.4708,
    longitude: -58.5236,
    importantInfo: [
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
        respuesta: "No, el servicio es solo de transporte ida y vuelta.",
      },
    ],
  },
  {
    slug: "coldplay-river-2026",
    title: "Coldplay en River",
    shortDescription:
      "Traslado directo al Monumental para la gira Music of the Spheres.",
    description:
      "Sumate al viaje grupal para ver a Coldplay en el Estadio Monumental. Salida puntual, unidades modernas y regreso asegurado.",
    price: 22000,
    date: new Date("2026-11-14T00:00:00.000Z"),
    time: "18:30",
    city: "CABA",
    departureLocation: "Terminal de Retiro",
    category: "recitales",
    status: "disponible",
    availableSeats: 24,
    featured: true,
    coverImage: img("photo-1501386761578-eac5c94b800a"),
    gallery: [img("photo-1493225457124-a3eb161ffa5f")],
    latitude: -34.5453,
    longitude: -58.4497,
    importantInfo: ["Salida puntual.", "Cada pasajero debe presentar su entrada."],
    faqs: [
      {
        pregunta: "¿Dónde nos deja el micro?",
        respuesta: "En una zona cercana al estadio, coordinada con seguridad.",
      },
    ],
  },
  {
    slug: "escapada-mar-del-plata",
    title: "Escapada a Mar del Plata",
    shortDescription:
      "Fin de semana en la costa con coordinador y paradas programadas.",
    description:
      "Escapada de fin de semana a la ciudad feliz. Incluye coordinador de viaje, paradas técnicas y gastronómicas.",
    price: 45000,
    date: new Date("2026-09-12T00:00:00.000Z"),
    time: "07:00",
    city: "Mar del Plata",
    departureLocation: "Terminal de Retiro",
    category: "turismo",
    status: "disponible",
    availableSeats: 30,
    featured: true,
    coverImage: img("photo-1507525428034-b723cf961d3e"),
    gallery: [img("photo-1506929562872-bb421503ef21")],
    latitude: -38.0055,
    longitude: -57.5426,
    importantInfo: ["Incluye ida y vuelta, no alojamiento."],
    faqs: [
      {
        pregunta: "¿Hay paradas en el camino?",
        respuesta: "Sí, realizamos paradas técnicas y gastronómicas.",
      },
    ],
  },
  {
    slug: "superclasico-bombonera",
    title: "Superclásico en La Bombonera",
    shortDescription: "Viajá con tu peña al clásico más importante del fútbol.",
    description:
      "Traslado grupal al superclásico. Coordinamos horarios con el evento para llegar con tiempo y volver sin complicaciones.",
    price: 18000,
    date: new Date("2026-10-25T00:00:00.000Z"),
    time: "15:00",
    city: "CABA",
    departureLocation: "Plaza Once",
    category: "deportivos",
    status: "agotado",
    availableSeats: 0,
    featured: false,
    coverImage: img("photo-1522778119026-d647f0596c20"),
    gallery: [img("photo-1508098682722-e99c43a406b2")],
    latitude: -34.6355,
    longitude: -58.3646,
    importantInfo: ["Prohibido el ingreso de banderas con caños."],
    faqs: [],
  },
  {
    slug: "cataratas-del-iguazu",
    title: "Cataratas del Iguazú",
    shortDescription:
      "Excursión de varios días a una de las maravillas del mundo.",
    description:
      "Viaje turístico a las Cataratas del Iguazú con coordinador a bordo, paradas programadas y toda la logística resuelta.",
    price: 120000,
    date: new Date("2027-01-15T00:00:00.000Z"),
    time: "20:00",
    city: "Puerto Iguazú",
    departureLocation: "Terminal de Retiro",
    category: "turismo",
    status: "disponible",
    availableSeats: 18,
    featured: true,
    coverImage: img("photo-1470071459604-3b5ec3a7fe05"),
    gallery: [img("photo-1544966503-7cc5ac882d5f")],
    latitude: -25.6953,
    longitude: -54.4367,
    importantInfo: ["Viaje nocturno, llevar abrigo.", "Paquete de 3 días."],
    faqs: [
      {
        pregunta: "¿Cuántos días dura?",
        respuesta: "El paquete es de 3 días y 2 noches.",
      },
    ],
  },
  {
    slug: "traslado-ezeiza-24hs",
    title: "Traslado a Ezeiza 24hs",
    shortDescription: "Servicio puerta a puerta al aeropuerto, a cualquier hora.",
    description:
      "Traslado al Aeropuerto Internacional de Ezeiza con horarios flexibles adaptados a tu vuelo. Seguimiento de vuelos y puntualidad garantizada.",
    price: 26000,
    date: new Date("2026-08-20T00:00:00.000Z"),
    time: "04:30",
    city: "Ezeiza",
    departureLocation: "Puerta a puerta (CABA y GBA)",
    category: "aeropuertos",
    status: "disponible",
    availableSeats: 8,
    featured: false,
    coverImage: img("photo-1436491865332-7a61a109cc05"),
    gallery: [img("photo-1502920917128-1aa500764cbd")],
    latitude: -34.8222,
    longitude: -58.5358,
    importantInfo: ["Confirmá tu vuelo con 24hs de anticipación."],
    faqs: [
      {
        pregunta: "¿Hacen seguimiento del vuelo?",
        respuesta: "Sí, reprogramamos ante demoras.",
      },
    ],
  },
  {
    slug: "casamiento-pilar",
    title: "Traslado de invitados — Casamiento",
    shortDescription: "Logística completa de invitados para tu evento especial.",
    description:
      "Coordinamos el transporte de todos los invitados a tu casamiento, con múltiples puntos de partida y regreso organizado.",
    price: 60000,
    date: new Date("2026-12-06T00:00:00.000Z"),
    time: "19:00",
    city: "Pilar",
    departureLocation: "Múltiples puntos (a coordinar)",
    category: "privados",
    status: "proximamente",
    availableSeats: 40,
    featured: false,
    coverImage: img("photo-1519671482749-fd09be7ccebf"),
    gallery: [img("photo-1464366400600-7168b8af9bc3")],
    latitude: -34.4586,
    longitude: -58.9142,
    importantInfo: ["Servicio a medida según cantidad de invitados."],
    faqs: [],
  },
  {
    slug: "corporativo-convencion",
    title: "Traslado Corporativo — Convención",
    shortDescription: "Transporte de empleados con facturación para empresas.",
    description:
      "Servicio de traslado corporativo para convenciones, capacitaciones y eventos de empresa. Unidades exclusivas y facturación A.",
    price: 95000,
    date: new Date("2026-09-30T00:00:00.000Z"),
    time: "08:00",
    city: "Costa Salguero, CABA",
    departureLocation: "A coordinar con la empresa",
    category: "empresas",
    status: "disponible",
    availableSeats: 45,
    featured: false,
    coverImage: img("photo-1544620347-c4fd4a3d5957"),
    gallery: [img("photo-1517502884422-41eaead166d4")],
    latitude: -34.5709,
    longitude: -58.3922,
    importantInfo: ["Emitimos factura A.", "Chofer asignado al evento."],
    faqs: [],
  },
  {
    slug: "fin-de-ano-pinamar",
    title: "Fin de Año en la Costa",
    shortDescription: "Recibí el año nuevo con una escapada especial.",
    description:
      "Viaje especial de fin de año a la costa atlántica. Salidas organizadas y coordinador a bordo.",
    price: 70000,
    date: new Date("2026-12-30T00:00:00.000Z"),
    time: "22:00",
    city: "Pinamar",
    departureLocation: "Terminal de Retiro",
    category: "especiales",
    status: "cancelado",
    availableSeats: 0,
    featured: false,
    coverImage: img("photo-1533105079780-92b9be482077"),
    gallery: [img("photo-1493246507139-91e8fad9978e")],
    latitude: -37.1117,
    longitude: -56.8608,
    importantInfo: ["Evento reprogramado, consultá nuevas fechas."],
    faqs: [],
  },
];

async function main() {
  console.log("🌱 Seeding…");

  // Usuarios
  const adminPass = await bcrypt.hash("admin123", 10);
  const editorPass = await bcrypt.hash("editor123", 10);

  await db.user.upsert({
    where: { email: "admin@laestacion.com.ar" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@laestacion.com.ar",
      password: adminPass,
      role: "admin",
    },
  });
  await db.user.upsert({
    where: { email: "editor@laestacion.com.ar" },
    update: {},
    create: {
      name: "Lucía Editora",
      email: "editor@laestacion.com.ar",
      password: editorPass,
      role: "editor",
    },
  });

  // Configuración
  const existingSettings = await db.settings.findFirst();
  if (!existingSettings) {
    await db.settings.create({
      data: {
        companyName: "La Estación",
        description:
          "Empresa de transporte de pasajeros. Viajes a recitales, turismo, eventos deportivos, traslados a aeropuertos y servicios privados.",
        phone: "+54 9 11 5555-0000",
        whatsapp: "5491155550000",
        email: "reservas@laestacion.com.ar",
        instagram: "https://instagram.com/laestacion",
        facebook: "https://facebook.com/laestacion",
        address: "Terminal de Ómnibus, Buenos Aires, Argentina",
        hours: "Lun a Vie de 9 a 18 hs · Sáb de 9 a 13 hs",
        logo: "",
        primaryColor: "#2563EB",
        secondaryColor: "#7C3AED",
      },
    });
  }

  // Eventos
  await db.reservation.deleteMany();
  await db.event.deleteMany();
  const created: Event[] = [];
  for (const e of EVENTS) {
    // Capacidad total = lugares iniciales (mínimo 40 para eventos ya agotados).
    const totalSeats = Math.max((e.availableSeats as number) ?? 0, 40);
    created.push(await db.event.create({ data: { ...e, totalSeats } }));
  }

  // Reservas (ligadas a eventos reales)
  const bySlug = (s: string) => created.find((c) => c.slug === s)!;
  await db.reservation.createMany({
    data: [
      {
        firstName: "María",
        lastName: "González",
        dni: "34567890",
        phone: "+54 9 11 4444-1122",
        email: "maria.g@example.com",
        quantity: 2,
        status: "finalizada",
        notes: "Viaje realizado. Pago en efectivo confirmado.",
        eventId: bySlug("lollapalooza-2027").id,
      },
      {
        firstName: "Juan",
        lastName: "Pérez",
        dni: "29111222",
        phone: "+54 9 11 5555-2233",
        email: "juanp@example.com",
        quantity: 4,
        status: "confirmada",
        notes: "Seña abonada, resta el saldo.",
        eventId: bySlug("escapada-mar-del-plata").id,
      },
      {
        firstName: "Lucía",
        lastName: "Fernández",
        dni: "38999000",
        phone: "+54 9 11 6666-3344",
        email: "lucia.f@example.com",
        quantity: 1,
        status: "pendiente",
        eventId: bySlug("coldplay-river-2026").id,
      },
      {
        firstName: "Diego",
        lastName: "Martínez",
        dni: "27333444",
        phone: "+54 9 11 7777-4455",
        email: "diegom@example.com",
        quantity: 3,
        status: "cancelada",
        notes: "Canceló por sobreventa del evento.",
        eventId: bySlug("superclasico-bombonera").id,
      },
    ],
  });

  // Mensajes de contacto
  await db.contact.deleteMany();
  await db.contact.createMany({
    data: [
      {
        name: "Carla Giménez",
        email: "carla.g@example.com",
        message:
          "Hola, quería saber si tienen lugares para el Lollapalooza y desde dónde sale el micro. ¡Gracias!",
        read: false,
      },
      {
        name: "Empresa TechCo",
        email: "eventos@techco.com",
        phone: "+54 11 4000-0000",
        message:
          "Necesitamos trasladar a 40 empleados a una convención. ¿Emiten factura A?",
        read: false,
      },
      {
        name: "Rodrigo Paz",
        email: "rodri.paz@example.com",
        message: "¿El viaje del 12 de septiembre incluye alojamiento?",
        read: true,
      },
    ],
  });

  console.log("✅ Seed completado.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
