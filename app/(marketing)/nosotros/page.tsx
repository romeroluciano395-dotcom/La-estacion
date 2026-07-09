import type { Metadata } from "next";
import { Target, Eye, Heart } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/shared/motion";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conocé a La Estación, empresa de transporte de pasajeros con años de experiencia.",
};

const VALUES = [
  {
    icon: Target,
    title: "Misión",
    text: "Conectar personas con sus destinos brindando un transporte seguro, puntual y cómodo.",
  },
  {
    icon: Eye,
    title: "Visión",
    text: "Ser la empresa de transporte de pasajeros de referencia por su calidad y tecnología.",
  },
  {
    icon: Heart,
    title: "Valores",
    text: "Seguridad, compromiso, cercanía con el pasajero y mejora continua en cada viaje.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <FadeIn>
          <SectionHeading
            eyebrow="Nosotros"
            title="Movemos personas, no solo pasajeros"
            description="Somos una empresa de transporte con años de experiencia coordinando viajes a lo largo del país. Cada traslado es una responsabilidad que asumimos con profesionalismo."
          />
        </FadeIn>

        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <StaggerItem key={v.title}>
              <div className="h-full rounded-2xl border border-border bg-background p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {v.title}
                </h3>
                <p className="mt-3 text-muted-foreground">{v.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </div>
  );
}
