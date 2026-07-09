"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";

import type { Evento } from "@/types/event";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "./category-badge";
import { AvailabilityBadge } from "./availability-badge";
import { PriceTag } from "./price-tag";
import { ReservationButton } from "./reservation-button";

function formatFecha(fecha: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${fecha}T00:00:00`));
}

export function EventCard({ evento }: { evento: Evento }) {
  const href = `/eventos/${evento.slug}`;
  const agotado = evento.estado === "agotado" || evento.estado === "cancelado";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/60 shadow-premium backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_28px_60px_-25px_hsl(221_83%_53%/0.5)]">
      {/* Imagen */}
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden">
        <Image
          src={evento.imagenPrincipal}
          alt={evento.nombre}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            "object-cover transition-transform duration-500 group-hover:scale-105",
            agotado && "grayscale",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <div className="absolute left-3 top-3">
          <CategoryBadge categoria={evento.categoria} />
        </div>
        <div className="absolute right-3 top-3">
          <AvailabilityBadge estado={evento.estado} />
        </div>
      </Link>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-5">
        <Link href={href}>
          <h3 className="line-clamp-1 text-lg font-semibold transition-colors group-hover:text-primary">
            {evento.nombre}
          </h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {evento.descripcionCorta}
        </p>

        {/* Datos */}
        <dl className="mt-4 grid grid-cols-2 gap-2.5 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <span className="line-clamp-1">{evento.ciudad}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
            <span>{formatFecha(evento.fecha)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0 text-primary" />
            <span>{evento.hora} hs</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4 shrink-0 text-primary" />
            <span>
              {evento.lugaresDisponibles > 0
                ? `${evento.lugaresDisponibles} lugares`
                : "Sin lugares"}
            </span>
          </div>
        </dl>

        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
          <PriceTag precio={evento.precio} />
        </div>

        {/* Acciones */}
        <div className="mt-4 flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={href}>Ver detalles</Link>
          </Button>
          <ReservationButton
            nombreEvento={evento.nombre}
            estado={evento.estado}
            size="sm"
            className="flex-1"
          />
        </div>
      </div>
    </article>
  );
}
