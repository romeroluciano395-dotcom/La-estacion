import { getEventos } from "@/services/events.service";
import { EventsTable } from "@/components/tables/events-table";

export const metadata = { title: "Eventos" };

export default async function AdminEventosPage() {
  const eventos = await getEventos();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Gestión de eventos
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Creá, editá y administrá todos los viajes publicados en el sitio.
        </p>
      </div>

      <EventsTable eventos={eventos} />
    </div>
  );
}
