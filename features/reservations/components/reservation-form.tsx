"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle2,
  CreditCard,
} from "lucide-react";

import type { ServiceCategory } from "@/types";
import { SERVICES } from "@/lib/constants";
import { reservationSchema, type ReservationInput } from "@/lib/validations";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const STEPS = ["Servicio", "Datos", "Confirmar"] as const;

const STEP_FIELDS: Record<number, (keyof ReservationInput)[]> = {
  0: ["category", "origin", "destination", "departureDate", "seats"],
  1: ["fullName", "email", "phone", "document"],
  2: [],
};

export function ReservationForm({
  defaultCategory,
}: {
  defaultCategory?: ServiceCategory;
}) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<{ code: string; url: string } | null>(null);

  const form = useForm<ReservationInput>({
    resolver: zodResolver(reservationSchema),
    mode: "onTouched",
    defaultValues: {
      category: defaultCategory,
      fullName: "",
      email: "",
      phone: "",
      document: "",
      origin: "",
      destination: "",
      departureDate: "",
      seats: 1,
      notes: "",
    },
  });

  const values = form.watch();
  const service = SERVICES.find((s) => s.slug === values.category);
  const total = (service?.fromPrice ?? 0) * (Number(values.seats) || 0);

  async function next() {
    const valid = await form.trigger(STEP_FIELDS[step]);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function onSubmit(input: ReservationInput) {
    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error("Error al crear la reserva");
      const data = await res.json();
      setDone({ code: data.reservation.code, url: data.checkoutUrl });
      toast.success("Reserva creada", {
        description: `Código ${data.reservation.code}`,
      });
    } catch {
      toast.error("No pudimos crear la reserva. Intentá de nuevo.");
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-border bg-background p-10 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-bold">
          ¡Reserva confirmada!
        </h2>
        <p className="mt-2 text-muted-foreground">
          Tu código de reserva es{" "}
          <span className="font-semibold text-foreground">{done.code}</span>.
          Completá el pago para asegurar tu lugar.
        </p>
        <Button size="lg" variant="accent" className="mt-8" asChild>
          <a href={done.url} target="_blank" rel="noopener noreferrer">
            <CreditCard className="h-4 w-4" /> Pagar con MercadoPago
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-background p-6 sm:p-8">
      {/* Stepper */}
      <ol className="mb-8 flex items-center">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  i <= step
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`hidden text-sm font-medium sm:block ${
                  i <= step ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`mx-3 h-0.5 flex-1 rounded ${
                  i < step ? "bg-accent" : "bg-border"
                }`}
              />
            )}
          </li>
        ))}
      </ol>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {step === 0 && (
            <>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de servicio</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Elegí un servicio" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SERVICES.map((s) => (
                          <SelectItem key={s.slug} value={s.slug}>
                            {s.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origen</FormLabel>
                      <FormControl>
                        <Input placeholder="Punto de partida" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destino</FormLabel>
                      <FormControl>
                        <Input placeholder="¿A dónde vas?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="departureDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de salida</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seats"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cantidad de pasajeros</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} max={60} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre y apellido" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="document"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Documento</FormLabel>
                      <FormControl>
                        <Input placeholder="DNI" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="tu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="+54 9 11 ..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="Equipaje especial, punto de encuentro, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-display text-lg font-semibold">
                Revisá tu reserva
              </h3>
              <dl className="divide-y divide-border rounded-2xl border border-border">
                {[
                  ["Servicio", service?.title ?? "—"],
                  ["Recorrido", `${values.origin} → ${values.destination}`],
                  ["Fecha", values.departureDate || "—"],
                  ["Pasajeros", String(values.seats)],
                  ["Titular", values.fullName],
                  ["Contacto", `${values.email} · ${values.phone}`],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                  >
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex items-center justify-between rounded-2xl bg-primary px-5 py-4 text-primary-foreground">
                <span className="text-sm text-white/70">Total estimado</span>
                <span className="font-display text-2xl font-bold text-accent">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          )}

          {/* Nav */}
          <div className="flex items-center justify-between pt-2">
            {step > 0 ? (
              <Button type="button" variant="ghost" onClick={back}>
                <ArrowLeft className="h-4 w-4" /> Atrás
              </Button>
            ) : (
              <span />
            )}

            {step < STEPS.length - 1 ? (
              <Button type="button" variant="accent" onClick={next}>
                Continuar <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="accent"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Procesando...
                  </>
                ) : (
                  <>
                    Confirmar y pagar <CreditCard className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
