import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getReservaById } from "@/services/reservas.service";
import { ReservaEditForm } from "@/components/forms/reserva-edit-form";

export const metadata = { title: "Editar reserva" };

export default async function EditarReservaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reserva = await getReservaById(id);
  if (!reserva) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`/admin/reservas/${reserva.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al detalle
        </Link>
        <h2 className="mt-3 text-xl font-semibold tracking-tight">
          Editar reserva
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {reserva.nombre} {reserva.apellido} · {reserva.eventoNombre}
        </p>
      </div>

      <ReservaEditForm reserva={reserva} />
    </div>
  );
}
