import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Pencil,
  User,
  Mail,
  Phone,
  IdCard,
  CalendarDays,
  MapPin,
  Users,
  Clock,
} from "lucide-react";

import { getReservaById } from "@/services/reservas.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReservaStatusBadge } from "@/components/reservations/reserva-status-badge";

export const metadata = { title: "Detalle de reserva" };

function fmtFull(iso: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export default async function ReservaDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reserva = await getReservaById(id);
  if (!reserva) notFound();

  const pasajero = [
    { icon: User, label: "Nombre", value: `${reserva.nombre} ${reserva.apellido}` },
    { icon: IdCard, label: "DNI", value: reserva.dni },
    { icon: Phone, label: "Teléfono", value: reserva.telefono },
    { icon: Mail, label: "Correo", value: reserva.email },
  ];

  const viaje = [
    { icon: MapPin, label: "Evento", value: reserva.eventoNombre },
    { icon: MapPin, label: "Ciudad", value: reserva.eventoCiudad },
    { icon: CalendarDays, label: "Fecha del viaje", value: reserva.eventoFecha },
    { icon: Users, label: "Cantidad", value: String(reserva.cantidadPasajeros) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/reservas"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Volver a reservas
          </Link>
          <h2 className="mt-3 flex items-center gap-3 text-xl font-semibold tracking-tight">
            Reserva {reserva.id.slice(-8).toUpperCase()}
            <ReservaStatusBadge estado={reserva.estado} />
          </h2>
        </div>
        <Button asChild>
          <Link href={`/admin/reservas/${reserva.id}/editar`}>
            <Pencil /> Editar
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pasajero</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pasajero.map((d) => (
              <Row key={d.label} icon={d.icon} label={d.label} value={d.value} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Viaje</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {viaje.map((d) => (
              <Row key={d.label} icon={d.icon} label={d.label} value={d.value} />
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Observaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {reserva.observaciones || "Sin observaciones."}
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Historial</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="relative space-y-5 border-l border-white/10 pl-6">
              <TimelineItem
                title="Reserva creada"
                time={fmtFull(reserva.createdAt)}
              />
              <TimelineItem
                title={`Estado actual: ${reserva.estado}`}
                time={fmtFull(reserva.updatedAt)}
              />
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}

function TimelineItem({ title, time }: { title: string; time: string }) {
  return (
    <li className="relative">
      <span className="absolute -left-[27px] flex h-3 w-3 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
      <p className="font-medium capitalize">{title}</p>
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" /> {time}
      </p>
    </li>
  );
}
