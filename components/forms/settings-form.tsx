"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Save } from "lucide-react";

import type { SiteSettings } from "@/types/admin";
import { guardarConfiguracionAction } from "@/app/admin/(panel)/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUploader } from "./image-uploader";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState<SiteSettings>(settings);

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      await guardarConfiguracionAction(form);
      toast.success("Configuración guardada", {
        description: "Los cambios se reflejarán en el sitio.",
      });
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Información de la empresa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Field label="Nombre de la empresa">
              <Input
                value={form.nombre}
                onChange={(e) => set("nombre", e.target.value)}
              />
            </Field>
            <Field label="Descripción">
              <Textarea
                rows={3}
                value={form.descripcion}
                onChange={(e) => set("descripcion", e.target.value)}
              />
            </Field>
            <Field label="Dirección">
              <Input
                value={form.direccion}
                onChange={(e) => set("direccion", e.target.value)}
              />
            </Field>
            <Field label="Horarios">
              <Input
                value={form.horarios}
                onChange={(e) => set("horarios", e.target.value)}
              />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contacto y redes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Field label="WhatsApp (formato internacional)">
              <Input
                value={form.whatsapp}
                onChange={(e) => set("whatsapp", e.target.value)}
                placeholder="5491155550000"
              />
            </Field>
            <Field label="Correo">
              <Input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </Field>
            <Field label="Instagram">
              <Input
                value={form.instagram}
                onChange={(e) => set("instagram", e.target.value)}
              />
            </Field>
            <Field label="Facebook">
              <Input
                value={form.facebook}
                onChange={(e) => set("facebook", e.target.value)}
              />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Logo</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUploader
              value={form.logoUrl ? [form.logoUrl] : []}
              onChange={(u) => set("logoUrl", u[0] ?? "")}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Colores del sitio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <ColorField
              label="Color primario"
              value={form.colorPrimario}
              onChange={(v) => set("colorPrimario", v)}
            />
            <ColorField
              label="Color de acento"
              value={form.colorAcento}
              onChange={(v) => set("colorAcento", v)}
            />
            <p className="text-xs text-muted-foreground">
              Los colores quedan guardados y se aplicarán al sitio cuando se
              conecte la configuración dinámica de tema.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="sticky bottom-0 flex justify-end border-t border-white/10 bg-background/80 py-4 backdrop-blur-xl">
        <Button type="submit" disabled={pending}>
          <Save /> {pending ? "Guardando…" : "Guardar cambios"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-14 cursor-pointer rounded-lg border border-white/10 bg-transparent"
        />
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
}
