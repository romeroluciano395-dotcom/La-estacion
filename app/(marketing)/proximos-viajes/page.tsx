import type { Metadata } from "next";

import {
  getEventos,
  getEventosDestacados,
  getCiudades,
} from "@/services/events.service";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/motion";
import { FeaturedCarousel } from "@/features/events/components/featured-carousel";
import { EventsExplorer } from "@/features/events/components/events-explorer";

export const metadata: Metadata = {
  title: "Próximos Viajes",
  description:
    "Descubrí todos los próximos viajes de La Estación: recitales, turismo, eventos deportivos y más. Reservá tu lugar.",
};

export default async function ProximosViajesPage() {
  const [eventos, destacados, ciudades] = await Promise.all([
    getEventos(),
    getEventosDestacados(),
    getCiudades(),
  ]);

  return (
    <div className="bg-aurora">
      {/* Encabezado */}
      <section className="container-app pt-16 sm:pt-20">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Agenda de viajes
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Próximos <span className="text-gradient">Viajes</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-pretty text-lg text-muted-foreground">
            Elegí tu próximo destino. Recitales, turismo, eventos deportivos y
            mucho más, con la comodidad y seguridad de siempre.
          </p>
        </Reveal>
      </section>

      {/* Destacados */}
      {destacados.length > 0 && (
        <section className="container-app mt-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Destacados
              </h2>
              <p className="mt-1 text-muted-foreground">
                Los viajes más buscados del momento.
              </p>
            </div>
          </div>
          <FeaturedCarousel eventos={destacados} />
        </section>
      )}

      {/* Explorador con buscador, filtros y paginación */}
      <section className="container-app py-16 sm:py-20">
        <SectionHeading
          align="left"
          eyebrow="Todos los viajes"
          title="Encontrá tu viaje ideal"
          description="Usá el buscador y los filtros para encontrar exactamente lo que buscás."
        />
        <div className="mt-10">
          <EventsExplorer eventos={eventos} ciudades={ciudades} />
        </div>
      </section>
    </div>
  );
}
