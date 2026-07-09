"use client";

import Image from "next/image";
import Link from "next/link";
import { Music, Trophy, Palmtree, Plane, PartyPopper, Building2, ArrowUpRight } from "lucide-react";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/motion";

const SERVICES = [
  {
    icon: Music,
    title: "Viajes a recitales",
    desc: "Ida y vuelta a los shows más esperados, con regreso asegurado.",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
  },
  {
    icon: Trophy,
    title: "Eventos deportivos",
    desc: "Llegá con tu grupo a la cancha o al estadio con total seguridad.",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
  },
  {
    icon: Palmtree,
    title: "Turismo",
    desc: "Excursiones y escapadas a los mejores destinos del país.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
  },
  {
    icon: Plane,
    title: "Aeropuertos",
    desc: "Traslados puerta a puerta hacia Ezeiza y Aeroparque, 24/7.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
  },
  {
    icon: PartyPopper,
    title: "Eventos privados",
    desc: "Casamientos, cumpleaños y celebraciones con logística a medida.",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80",
  },
  {
    icon: Building2,
    title: "Empresas",
    desc: "Traslados corporativos y contingentes con facturación.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
  },
];

export function Services() {
  return (
    <Section className="border-y border-white/5 bg-white/[0.015]">
      <SectionHeading
        eyebrow="Servicios"
        title="Un viaje para cada ocasión"
        description="Elegí el servicio que necesitás. Coordinamos todo de principio a fin."
      />

      <Stagger className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <StaggerItem key={s.title}>
            <Link
              href="/servicios"
              className="group block h-full overflow-hidden rounded-2xl border border-white/10 bg-card/60 shadow-premium backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/40">
                  <s.icon className="h-5 w-5" />
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
