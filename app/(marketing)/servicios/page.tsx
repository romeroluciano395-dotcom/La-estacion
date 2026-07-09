import type { Metadata } from "next";

import { SERVICES } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/shared/motion";
import { ServiceCard } from "@/features/services/components/service-card";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Todos los servicios de transporte de pasajeros de La Estación: recitales, turismo, deportivos, aeropuertos, privados y eventos especiales.",
};

export default function ServiciosPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <FadeIn>
          <SectionHeading
            eyebrow="Servicios"
            title="Todo lo que ofrecemos"
            description="Seleccioná un servicio para conocer los detalles y reservar."
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
    </div>
  );
}
