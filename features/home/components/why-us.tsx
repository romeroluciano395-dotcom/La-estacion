"use client";

import {
  UserCheck,
  ShieldCheck,
  Clock,
  Shield,
  Headphones,
  Sofa,
  Snowflake,
  Armchair,
} from "lucide-react";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/motion";

const REASONS = [
  { icon: UserCheck, title: "Choferes profesionales", desc: "Conductores con experiencia y licencia habilitante." },
  { icon: ShieldCheck, title: "Vehículos habilitados", desc: "Unidades con documentación y VTV al día." },
  { icon: Clock, title: "Puntualidad garantizada", desc: "Salidas y regresos coordinados al minuto." },
  { icon: Shield, title: "Seguro para pasajeros", desc: "Cobertura completa en cada viaje." },
  { icon: Headphones, title: "Atención personalizada", desc: "Te acompañamos antes, durante y después." },
  { icon: Sofa, title: "Máximo confort", desc: "Espacio amplio para que viajes relajado." },
  { icon: Snowflake, title: "Aire acondicionado", desc: "Climatización en todas las unidades." },
  { icon: Armchair, title: "Asientos reclinables", desc: "Descansá en trayectos largos o nocturnos." },
];

export function WhyUs() {
  return (
    <Section>
      <SectionHeading
        eyebrow="¿Por qué elegirnos?"
        title="Viajar con nosotros es otra experiencia"
        description="Cuidamos cada detalle para que tu único trabajo sea disfrutar el viaje."
      />

      <Stagger
        className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        staggerChildren={0.07}
      >
        {REASONS.map((r) => (
          <StaggerItem key={r.title} variant="scale">
            <div className="group h-full rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:bg-card hover:shadow-[0_24px_60px_-25px_hsl(221_83%_53%/0.5)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-primary transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30">
                <r.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {r.desc}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
