import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EventForm } from "@/components/forms/event-form";

export const metadata = { title: "Nuevo evento" };

export default function NuevoEventoPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/eventos"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a eventos
        </Link>
        <h2 className="mt-3 text-xl font-semibold tracking-tight">
          Crear nuevo evento
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Completá los datos del viaje. Se publicará según el estado elegido.
        </p>
      </div>

      <EventForm />
    </div>
  );
}
