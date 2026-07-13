"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Save, X } from "lucide-react";

import type { Reserva } from "@/types/admin";
import { reservaEditSchema, type ReservaEditInput } from "@/lib/validations";
import { actualizarReservaAction } from "@/app/admin/(panel)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ReservaEditForm({ reserva }: { reserva: Reserva }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReservaEditInput>({
    resolver: zodResolver(reservaEditSchema),
    defaultValues: {
      nombre: reserva.nombre,
      apellido: reserva.apellido,
      dni: reserva.dni,
      telefono: reserva.telefono,
      email: reserva.email,
      cantidad: reserva.cantidadPasajeros,
      observaciones: reserva.observaciones,
      estado: reserva.estado,
    },
  });

  function onSubmit(data: ReservaEditInput) {
    startTransition(async () => {
      const res = await actualizarReservaAction(reserva.id, data);
      if (res.ok) {
        toast.success("Reserva actualizada");
        router.push(`/admin/reservas/${reserva.id}`);
        router.refresh();
      } else {
        toast.error(res.error ?? "No se pudo actualizar la reserva");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Datos del pasajero</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre" error={errors.nombre?.message}>
              <Input {...register("nombre")} />
            </Field>
            <Field label="Apellido" error={errors.apellido?.message}>
              <Input {...register("apellido")} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="DNI" error={errors.dni?.message}>
              <Input {...register("dni")} />
            </Field>
            <Field label="Cantidad" error={errors.cantidad?.message}>
              <Input type="number" min={1} {...register("cantidad")} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Teléfono" error={errors.telefono?.message}>
              <Input {...register("telefono")} />
            </Field>
            <Field label="Correo" error={errors.email?.message}>
              <Input type="email" {...register("email")} />
            </Field>
          </div>
          <Field label="Estado" error={errors.estado?.message}>
            <Controller
              control={control}
              name="estado"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="confirmada">Confirmada</SelectItem>
                    <SelectItem value="finalizada">Finalizada</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
          <Field label="Observaciones" error={errors.observaciones?.message}>
            <Textarea rows={3} {...register("observaciones")} />
          </Field>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push(`/admin/reservas/${reserva.id}`)}
        >
          <X /> Cancelar
        </Button>
        <Button type="submit" disabled={pending}>
          <Save /> {pending ? "Guardando…" : "Guardar cambios"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
