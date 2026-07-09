"use client";

import type { Evento } from "@/types/event";
import { Stagger, StaggerItem } from "@/components/shared/motion";
import { EventCard } from "./event-card";

export function EventList({ eventos }: { eventos: Evento[] }) {
  return (
    <Stagger
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
      staggerChildren={0.06}
    >
      {eventos.map((evento) => (
        <StaggerItem key={evento.id} className="h-full">
          <EventCard evento={evento} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
