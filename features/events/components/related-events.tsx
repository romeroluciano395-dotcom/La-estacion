import type { Evento } from "@/types/event";
import { EventList } from "./event-list";

export function RelatedEvents({ eventos }: { eventos: Evento[] }) {
  if (eventos.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Eventos relacionados
      </h2>
      <p className="mt-2 text-muted-foreground">
        Otros viajes que también podrían interesarte.
      </p>
      <div className="mt-8">
        <EventList eventos={eventos} />
      </div>
    </section>
  );
}
