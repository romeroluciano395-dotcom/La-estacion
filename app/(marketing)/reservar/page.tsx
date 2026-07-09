import type { Metadata } from "next";

import type { ServiceCategory } from "@/types";
import { SERVICES } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/shared/motion";
import { ReservationForm } from "@/features/reservations/components/reservation-form";

export const metadata: Metadata = {
  title: "Reservar",
  description: "Reservá tu viaje online en pocos pasos.",
};

interface Props {
  searchParams: Promise<{ servicio?: string }>;
}

export default async function ReservarPage({ searchParams }: Props) {
  const { servicio } = await searchParams;
  const isValid = SERVICES.some((s) => s.slug === servicio);
  const defaultCategory = isValid
    ? (servicio as ServiceCategory)
    : undefined;

  return (
    <div className="py-16 lg:py-24">
      <div className="container max-w-3xl">
        <FadeIn>
          <SectionHeading
            eyebrow="Reservá"
            title="Completá tu reserva"
            description="Tres pasos simples. Recibí la confirmación y pagá de forma segura."
          />
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-12">
            <ReservationForm defaultCategory={defaultCategory} />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
