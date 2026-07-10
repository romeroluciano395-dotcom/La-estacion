import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getEventoById } from "@/services/events-admin.service";
import { EventForm } from "@/components/forms/event-form";

export const metadata = { title: "Editar evento" };

export default async function EditarEventoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const evento = await getEventoById(id);
  if (!evento) notFound();

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
          Editar evento
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{evento.nombre}</p>
      </div>

      <EventForm evento={evento} />
    </div>
  );
}
