import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Clock,
  MapPin,
  Navigation,
  Users,
  Info,
  ChevronRight,
} from "lucide-react";

import { formatCurrency } from "@/lib/utils";
import { SITE, SITE_URL } from "@/lib/constants";
import { CATEGORY_LABEL } from "@/lib/events-config";
import { JsonLd } from "@/components/shared/json-ld";
import {
  getEventos,
  getEventoBySlug,
  getEventosRelacionados,
} from "@/services/events.service";
import { Reveal } from "@/components/shared/motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CategoryBadge } from "@/features/events/components/category-badge";
import { AvailabilityBadge } from "@/features/events/components/availability-badge";
import { EventGallery } from "@/features/events/components/event-gallery";
import { ReservationDialog } from "@/features/reservations/components/reservation-dialog";
import { ShareButton } from "@/features/events/components/share-button";
import { RelatedEvents } from "@/features/events/components/related-events";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const eventos = await getEventos();
  return eventos.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const evento = await getEventoBySlug(slug);
  if (!evento) return { title: "Evento no encontrado" };
  return {
    title: evento.nombre,
    description: evento.descripcionCorta,
    alternates: { canonical: `/eventos/${evento.slug}` },
    openGraph: {
      type: "website",
      title: evento.nombre,
      description: evento.descripcionCorta,
      url: `/eventos/${evento.slug}`,
      images: [{ url: evento.imagenPrincipal, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: evento.nombre,
      description: evento.descripcionCorta,
      images: [evento.imagenPrincipal],
    },
  };
}

function formatFechaLarga(fecha: string) {
  return new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${fecha}T00:00:00`));
}

export default async function EventoPage({ params }: Props) {
  const { slug } = await params;
  const evento = await getEventoBySlug(slug);
  if (!evento) notFound();

  const relacionados = await getEventosRelacionados(slug);

  const datos = [
    { icon: CalendarDays, label: "Fecha", value: formatFechaLarga(evento.fecha) },
    { icon: Clock, label: "Hora de salida", value: `${evento.hora} hs` },
    { icon: MapPin, label: "Ciudad destino", value: evento.ciudad },
    { icon: Navigation, label: "Lugar de salida", value: evento.lugarSalida },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: evento.nombre,
    description: evento.descripcionCorta,
    startDate: `${evento.fecha}T${evento.hora}:00-03:00`,
    eventStatus:
      evento.estado === "cancelado"
        ? "https://schema.org/EventCancelled"
        : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: [evento.imagenPrincipal],
    location: {
      "@type": "Place",
      name: evento.ciudad,
      address: evento.ciudad,
    },
    organizer: { "@type": "Organization", name: SITE.name, url: SITE_URL },
    offers: {
      "@type": "Offer",
      price: evento.precio,
      priceCurrency: "ARS",
      availability:
        evento.estado === "agotado"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
      url: `${SITE_URL}/eventos/${evento.slug}`,
    },
  };

  return (
    <div className="bg-aurora">
      <JsonLd data={jsonLd} />
      <div className="container-app py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/proximos-viajes" className="hover:text-foreground">
            Próximos Viajes
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="line-clamp-1 text-foreground">{evento.nombre}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Columna principal */}
          <div>
            <Reveal>
              <EventGallery
                imagenPrincipal={evento.imagenPrincipal}
                galeria={evento.galeria}
                alt={evento.nombre}
              />
            </Reveal>

            <div className="mt-8">
              <div className="flex flex-wrap items-center gap-2">
                <CategoryBadge categoria={evento.categoria} />
                <AvailabilityBadge estado={evento.estado} />
              </div>
              <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                {evento.nombre}
              </h1>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {evento.descripcion}
              </p>
            </div>

            {/* Información importante */}
            {evento.informacionImportante.length > 0 && (
              <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/[0.06] p-6">
                <h2 className="flex items-center gap-2 font-semibold">
                  <Info className="h-5 w-5 text-primary" /> Información importante
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {evento.informacionImportante.map((info) => (
                    <li
                      key={info}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {info}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mapa (placeholder) */}
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold">Punto de salida</h2>
              <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="absolute inset-0 bg-grid opacity-40" />
                <div className="relative flex flex-col items-center text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/40">
                    <MapPin className="h-7 w-7" />
                  </span>
                  <p className="mt-3 font-medium">{evento.lugarSalida}</p>
                  <p className="text-sm text-muted-foreground">
                    {evento.coordenadas.lat.toFixed(4)},{" "}
                    {evento.coordenadas.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            {evento.faqs.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-xl font-semibold">Preguntas frecuentes</h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {evento.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger>{faq.pregunta}</AccordionTrigger>
                      <AccordionContent>{faq.respuesta}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          {/* Columna lateral — reserva */}
          <div>
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-white/10 bg-card/70 p-6 shadow-premium backdrop-blur-xl">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground">desde</span>
                  <span className="text-3xl font-bold tracking-tight">
                    {formatCurrency(evento.precio)}
                  </span>
                  <span className="text-sm text-muted-foreground">/ persona</span>
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">
                    {evento.lugaresDisponibles > 0
                      ? `${evento.lugaresDisponibles} lugares disponibles`
                      : "Sin lugares disponibles"}
                  </span>
                </div>

                <dl className="mt-6 space-y-4 border-t border-white/10 pt-6">
                  {datos.map((d) => (
                    <div key={d.label} className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-primary">
                        <d.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                          {d.label}
                        </dt>
                        <dd className="text-sm font-medium capitalize">
                          {d.value}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 space-y-3">
                  <ReservationDialog
                    eventId={evento.id}
                    nombreEvento={evento.nombre}
                    estado={evento.estado}
                    lugaresDisponibles={evento.lugaresDisponibles}
                  />
                  <ShareButton
                    title={evento.nombre}
                    text={`Mirá este viaje a ${evento.ciudad} con La Estación`}
                    className="w-full"
                  />
                </div>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Categoría: {CATEGORY_LABEL[evento.categoria]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Relacionados */}
        <RelatedEvents eventos={relacionados} />
      </div>
    </div>
  );
}
