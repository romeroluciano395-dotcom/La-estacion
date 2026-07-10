"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Save, X, Wand2 } from "lucide-react";

import type { Evento } from "@/types/event";
import { eventoSchema, type EventoInput } from "@/lib/validations";
import { EVENT_CATEGORIES, EVENT_STATUS_META } from "@/lib/events-config";
import {
  crearEventoAction,
  actualizarEventoAction,
} from "@/app/admin/(panel)/actions";
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
import { ImageUploader } from "./image-uploader";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const ESTADOS = Object.entries(EVENT_STATUS_META).map(([value, m]) => ({
  value,
  label: m.label,
}));

export function EventForm({ evento }: { evento?: Evento }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const isEdit = !!evento;

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EventoInput>({
    resolver: zodResolver(eventoSchema),
    defaultValues: evento
      ? {
          nombre: evento.nombre,
          slug: evento.slug,
          descripcionCorta: evento.descripcionCorta,
          descripcion: evento.descripcion,
          precio: evento.precio,
          fecha: evento.fecha,
          hora: evento.hora,
          ciudad: evento.ciudad,
          lugarSalida: evento.lugarSalida,
          categoria: evento.categoria,
          estado: evento.estado,
          lugaresDisponibles: evento.lugaresDisponibles,
          imagenPrincipal: evento.imagenPrincipal,
          galeria: evento.galeria,
          lat: evento.coordenadas.lat,
          lng: evento.coordenadas.lng,
          informacionImportante: evento.informacionImportante.join("\n"),
          destacado: evento.destacado,
        }
      : {
          nombre: "",
          slug: "",
          descripcionCorta: "",
          descripcion: "",
          precio: 0,
          fecha: "",
          hora: "",
          ciudad: "",
          lugarSalida: "",
          categoria: undefined,
          estado: "disponible",
          lugaresDisponibles: 0,
          imagenPrincipal: "",
          galeria: [],
          lat: -34.6037,
          lng: -58.3816,
          informacionImportante: "",
          destacado: false,
        },
  });

  const imagenPrincipal = watch("imagenPrincipal");
  const galeria = watch("galeria");
  const destacado = watch("destacado");

  function onSubmit(data: EventoInput) {
    startTransition(async () => {
      const res = isEdit
        ? await actualizarEventoAction(evento!.id, data)
        : await crearEventoAction(data);

      if (res.ok) {
        toast.success(isEdit ? "Evento actualizado" : "Evento creado", {
          description: data.nombre,
        });
        router.push("/admin/eventos");
        router.refresh();
      } else {
        toast.error(res.error ?? "No se pudo guardar el evento");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Columna principal */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Información general</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <Field label="Nombre del evento" error={errors.nombre?.message}>
                <Input
                  {...register("nombre")}
                  placeholder="Lollapalooza Argentina 2027"
                  onBlur={(e) => {
                    if (!watch("slug")) setValue("slug", slugify(e.target.value));
                  }}
                />
              </Field>

              <Field label="Slug (URL)" error={errors.slug?.message}>
                <div className="flex gap-2">
                  <Input {...register("slug")} placeholder="lollapalooza-2027" />
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    title="Generar desde el nombre"
                    onClick={() => setValue("slug", slugify(watch("nombre")))}
                  >
                    <Wand2 />
                  </Button>
                </div>
              </Field>

              <Field
                label="Descripción corta"
                error={errors.descripcionCorta?.message}
              >
                <Textarea
                  {...register("descripcionCorta")}
                  rows={2}
                  placeholder="Resumen breve que aparece en las tarjetas"
                />
              </Field>

              <Field
                label="Descripción completa"
                error={errors.descripcion?.message}
              >
                <Textarea
                  {...register("descripcion")}
                  rows={5}
                  placeholder="Detalle completo del viaje…"
                />
              </Field>

              <Field
                label="Información importante (una por línea)"
                error={errors.informacionImportante?.message}
              >
                <Textarea
                  {...register("informacionImportante")}
                  rows={3}
                  placeholder={"Presentarse 30 min antes\nLlevar documento"}
                />
              </Field>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Imágenes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ImageUploader
                label="Imagen principal"
                value={imagenPrincipal ? [imagenPrincipal] : []}
                onChange={(u) => setValue("imagenPrincipal", u[0] ?? "")}
              />
              {errors.imagenPrincipal && (
                <p className="text-sm text-destructive">
                  {errors.imagenPrincipal.message}
                </p>
              )}
              <ImageUploader
                label="Galería"
                multiple
                value={galeria ?? []}
                onChange={(u) => setValue("galeria", u)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Columna lateral */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <Field label="Categoría" error={errors.categoria?.message}>
                <Controller
                  control={control}
                  name="categoria"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Elegí una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {EVENT_CATEGORIES.map((c) => (
                          <SelectItem key={c.slug} value={c.slug}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

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
                        {ESTADOS.map((e) => (
                          <SelectItem key={e.value} value={e.value}>
                            {e.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="text-sm font-medium">Destacado</span>
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={!!destacado}
                  onChange={(e) => setValue("destacado", e.target.checked)}
                />
                <span
                  onClick={() => setValue("destacado", !destacado)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${destacado ? "bg-primary" : "bg-white/15"}`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${destacado ? "translate-x-[22px]" : "translate-x-0.5"}`}
                  />
                </span>
              </label>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalles del viaje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <Field label="Precio (ARS)" error={errors.precio?.message}>
                <Input type="number" min={0} step={1000} {...register("precio")} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Fecha" error={errors.fecha?.message}>
                  <Input type="date" {...register("fecha")} />
                </Field>
                <Field label="Hora" error={errors.hora?.message}>
                  <Input type="time" {...register("hora")} />
                </Field>
              </div>
              <Field label="Ciudad destino" error={errors.ciudad?.message}>
                <Input {...register("ciudad")} placeholder="San Isidro" />
              </Field>
              <Field label="Lugar de salida" error={errors.lugarSalida?.message}>
                <Input {...register("lugarSalida")} placeholder="Obelisco, CABA" />
              </Field>
              <Field
                label="Lugares disponibles"
                error={errors.lugaresDisponibles?.message}
              >
                <Input type="number" min={0} {...register("lugaresDisponibles")} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Latitud (mapa)" error={errors.lat?.message}>
                  <Input type="number" step="0.0001" {...register("lat")} />
                </Field>
                <Field label="Longitud (mapa)" error={errors.lng?.message}>
                  <Input type="number" step="0.0001" {...register("lng")} />
                </Field>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Acciones */}
      <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-white/10 bg-background/80 py-4 backdrop-blur-xl">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/admin/eventos")}
        >
          <X /> Cancelar
        </Button>
        <Button type="submit" disabled={pending}>
          <Save /> {pending ? "Guardando…" : "Guardar evento"}
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
