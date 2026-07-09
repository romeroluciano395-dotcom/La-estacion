import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPinned,
  Headphones,
} from "lucide-react";

import { SERVICES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/shared/motion";
import { ServiceCard } from "@/features/services/components/service-card";

const STATS = [
  { value: "+10.000", label: "Pasajeros transportados" },
  { value: "+500", label: "Viajes coordinados" },
  { value: "98%", label: "Satisfacción" },
  { value: "24/7", label: "Atención" },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Viajás seguro",
    description:
      "Unidades habilitadas, choferes profesionales y seguro de pasajeros en cada viaje.",
  },
  {
    icon: Clock,
    title: "Puntualidad garantizada",
    description:
      "Salidas y regresos coordinados al detalle para que nunca llegues tarde.",
  },
  {
    icon: MapPinned,
    title: "Cobertura amplia",
    description:
      "Operamos hacia los principales destinos del país, con recorridos a medida.",
  },
  {
    icon: Headphones,
    title: "Soporte real",
    description:
      "Un equipo humano disponible antes, durante y después de tu viaje.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, hsl(38 92% 50% / 0.4), transparent 40%), radial-gradient(circle at 80% 70%, hsl(210 100% 60% / 0.3), transparent 45%)",
          }}
        />
        <div className="container relative grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <FadeIn>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Reservá online en minutos
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Tu próximo destino{" "}
                <span className="text-accent">empieza acá</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-lg text-lg text-white/70 text-balance">
                Recitales, turismo, eventos deportivos, aeropuertos y viajes
                privados. Transporte de pasajeros profesional, cómodo y seguro.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" variant="accent" asChild>
                  <Link href="/reservar">
                    Reservar ahora <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link href="/servicios">Ver servicios</Link>
                </Button>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <div className="font-display text-3xl font-bold text-accent">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <FadeIn>
            <SectionHeading
              eyebrow="Nuestros servicios"
              title="Un viaje para cada ocasión"
              description="Elegí el servicio que necesitás. Coordinamos todo para que solo te ocupes de disfrutar."
            />
          </FadeIn>

          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <StaggerItem key={service.slug} className="h-full">
                <ServiceCard service={service} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* VENTAJAS */}
      <section className="border-y border-border bg-secondary/40 py-20 lg:py-28">
        <div className="container">
          <FadeIn>
            <SectionHeading
              eyebrow="Por qué elegirnos"
              title="La experiencia de viajar tranquilo"
            />
          </FadeIn>

          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="rounded-2xl border border-border bg-background p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <feature.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground sm:px-16">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 70% 20%, hsl(38 92% 50% / 0.5), transparent 45%)",
                }}
              />
              <div className="relative mx-auto max-w-2xl">
                <h2 className="font-display text-3xl font-bold text-balance sm:text-4xl">
                  ¿Listo para tu próximo viaje?
                </h2>
                <p className="mt-4 text-lg text-white/70 text-balance">
                  Reservá en minutos y recibí la confirmación al instante.
                  Pagá de forma segura con MercadoPago.
                </p>
                <Button size="lg" variant="accent" className="mt-8" asChild>
                  <Link href="/reservar">
                    Reservar mi viaje <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
