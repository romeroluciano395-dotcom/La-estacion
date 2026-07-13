"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Ticket, Loader2, TriangleAlert } from "lucide-react";

import type { EventStatus } from "@/types/event";
import {
  reservaPublicaSchema,
  type ReservaPublicaInput,
} from "@/lib/validations";
import { isReservable } from "@/lib/events-config";
import { crearReservaAction } from "@/app/(marketing)/eventos/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  eventId: string;
  nombreEvento: string;
  estado: EventStatus;
  lugaresDisponibles: number;
}

export function ReservationDialog({
  eventId,
  nombreEvento,
  estado,
  lugaresDisponibles,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<ReservaPublicaInput>({
    resolver: zodResolver(reservaPublicaSchema),
    defaultValues: {
      eventId,
      nombre: "",
      apellido: "",
      dni: "",
      telefono: "",
      email: "",
      cantidad: 1,
      observaciones: "",
      aceptaTerminos: false as unknown as true,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = form;

  const acepta = watch("aceptaTerminos");

  if (!isReservable(estado)) {
    return (
      <Button variant="secondary" size="lg" className="w-full" disabled>
        {estado === "agotado" ? "Agotado" : "No disponible"}
      </Button>
    );
  }

  async function onSubmit(values: ReservaPublicaInput) {
    setFormError(null);
    const res = await crearReservaAction(values);
    if (res.ok && res.reservaId) {
      toast.success("¡Reserva creada!");
      setOpen(false);
      router.push(`/reserva/${res.reservaId}`);
    } else {
      setFormError(res.error ?? "No se pudo crear la reserva.");
      toast.error(res.error ?? "No se pudo crear la reserva.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="lg" className="w-full">
          <Ticket /> Reservar Lugar
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Reservar tu lugar</DialogTitle>
          <DialogDescription>
            {nombreEvento} · {lugaresDisponibles} lugares disponibles
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {formError && (
            <Alert variant="danger">
              <TriangleAlert />
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre" error={errors.nombre?.message}>
              <Input placeholder="Juan" {...register("nombre")} />
            </Field>
            <Field label="Apellido" error={errors.apellido?.message}>
              <Input placeholder="Pérez" {...register("apellido")} />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="DNI" error={errors.dni?.message}>
              <Input placeholder="30123456" {...register("dni")} />
            </Field>
            <Field
              label="Cantidad de pasajeros"
              error={errors.cantidad?.message}
            >
              <Input
                type="number"
                min={1}
                max={lugaresDisponibles}
                {...register("cantidad")}
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Teléfono" error={errors.telefono?.message}>
              <Input placeholder="+54 9 11 ..." {...register("telefono")} />
            </Field>
            <Field label="Correo electrónico" error={errors.email?.message}>
              <Input
                type="email"
                placeholder="tu@email.com"
                {...register("email")}
              />
            </Field>
          </div>

          <Field label="Observaciones (opcional)" error={errors.observaciones?.message}>
            <Textarea
              rows={2}
              placeholder="Punto de encuentro, equipaje especial…"
              {...register("observaciones")}
            />
          </Field>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <input
              type="checkbox"
              checked={!!acepta}
              onChange={(e) =>
                setValue(
                  "aceptaTerminos",
                  e.target.checked as unknown as true,
                  { shouldValidate: true },
                )
              }
              className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
            />
            <span className="text-sm text-muted-foreground">
              Acepto los términos y condiciones y autorizo el uso de mis datos
              para gestionar la reserva.
            </span>
          </label>
          {errors.aceptaTerminos && (
            <p className="text-sm text-destructive">
              {errors.aceptaTerminos.message}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" /> Procesando…
              </>
            ) : (
              <>
                <Ticket /> Confirmar reserva
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
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
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
