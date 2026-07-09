"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

import type { Evento } from "@/types/event";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "./category-badge";
import { AvailabilityBadge } from "./availability-badge";
import { PriceTag } from "./price-tag";

function formatFecha(fecha: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${fecha}T00:00:00`));
}

/** Card grande para el carrusel de destacados. */
export function FeaturedEvent({ evento }: { evento: Evento }) {
  const href = `/eventos/${evento.slug}`;

  return (
    <Link
      href={href}
      className="group relative flex aspect-[3/4] w-[280px] shrink-0 snap-start overflow-hidden rounded-3xl border border-white/10 shadow-premium sm:aspect-[16/10] sm:w-[560px]"
    >
      <Image
        src={evento.imagenPrincipal}
        alt={evento.nombre}
        fill
        loading="lazy"
        sizes="(max-width: 640px) 280px, 560px"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

      <div className="absolute left-4 top-4 flex gap-2">
        <CategoryBadge categoria={evento.categoria} />
        <AvailabilityBadge estado={evento.estado} />
      </div>

      <div className="relative mt-auto w-full p-6">
        <h3 className="text-2xl font-bold tracking-tight text-white">
          {evento.nombre}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-white/80">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary" /> {evento.ciudad}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-primary" />
            {formatFecha(evento.fecha)}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <PriceTag precio={evento.precio} size="md" />
          <Button size="sm" variant="primary" className="pointer-events-none">
            Ver más <ArrowRight />
          </Button>
        </div>
      </div>
    </Link>
  );
}
