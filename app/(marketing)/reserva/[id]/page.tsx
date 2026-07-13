import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, CalendarDays, MapPin, Users, MessageCircle, Hash } from "lucide-react";

import { getReservaById } from "@/services/reservas.service";
import { getSiteSettings } from "@/services/settings.service";
import { formatDateFull } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/motion";
import { ReservaStatusBadge } from "@/components/reservations/reserva-status-badge";

export const metadata: Metadata = {
  title: "Reserva confirmada",
  robots: { index: false, follow: false },
};

export default async function ReservaConfirmacionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [reserva, settings] = await Promise.all([
    getReservaById(id),
    getSiteSettings(),
  ]);
  if (!reserva) notFound();

  const mensaje = `Hola.
Realicé la reserva para el viaje:
${reserva.eventoNombre}
Mi nombre es:
${reserva.nombre} ${reserva.apellido}
Cantidad de pasajeros:
${reserva.cantidadPasajeros}
Muchas gracias.`;
  const waUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(mensaje)}`;

  const datos = [
    { icon: CalendarDays, label: "Fecha", value: formatDateFull(reserva.eventoFecha) },
    { icon: MapPin, label: "Ciudad", value: reserva.eventoCiudad },
    { icon: Users, label: "Pasajeros", value: String(reserva.cantidadPasajeros) },
    { icon: Hash, label: "Código", value: reserva.id.slice(-8).toUpperCase() },
  ];

  return (
    <div className="bg-aurora">
      <div className="container-app flex min-h-[80vh] items-center py-16">
        <Reveal variant="scale" className="mx-auto w-full max-w-lg">
          <div className="rounded-3xl border border-white/10 bg-card/70 p-8 text-center shadow-premium backdrop-blur-xl sm:p-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
              ¡Reserva confirmada!
            </h1>
            <p className="mt-2 text-muted-foreground">
              Registramos tu reserva para{" "}
              <span className="font-medium text-foreground">
                {reserva.eventoNombre}
              </span>
              . Te vamos a contactar para coordinar los detalles.
            </p>

            <div className="mt-4 flex justify-center">
              <ReservaStatusBadge estado={reserva.estado} />
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-4 text-left">
              {datos.map((d) => (
                <div
                  key={d.label}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                >
                  <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                    <d.icon className="h-3.5 w-3.5" /> {d.label}
                  </dt>
                  <dd className="mt-1 font-medium capitalize">{d.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 space-y-3">
              <Button variant="success" size="lg" className="w-full" asChild>
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> Enviar WhatsApp
                </a>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/proximos-viajes">Ver más viajes</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
