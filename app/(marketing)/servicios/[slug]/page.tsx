import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import { SERVICES, getServiceBySlug } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/shared/icon";
import { FadeIn } from "@/components/shared/motion";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Servicio no encontrado" };
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <div className="py-16 lg:py-24">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-start">
        <FadeIn>
          <div>
            <Link
              href="/servicios"
              className="text-sm font-medium text-muted-foreground hover:text-accent"
            >
              ← Volver a servicios
            </Link>

            <span className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary">
              <Icon name={service.icon} className="h-7 w-7" />
            </span>

            <h1 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {service.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {service.description}
            </p>

            <ul className="mt-8 space-y-3">
              {service.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="rounded-3xl border border-border bg-secondary/40 p-8">
            <Badge variant="accent">Reserva online</Badge>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-sm text-muted-foreground">Desde</span>
              <span className="font-display text-4xl font-bold">
                {formatCurrency(service.fromPrice)}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Precio por pasajero. El valor final depende del recorrido y la
              cantidad de plazas.
            </p>

            <Button
              size="lg"
              variant="accent"
              className="mt-6 w-full"
              asChild
            >
              <Link href="/proximos-viajes">
                Ver próximos viajes <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Pago seguro con MercadoPago · Confirmación inmediata
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
