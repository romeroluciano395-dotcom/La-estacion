"use client";

import { useState } from "react";
import {
  ArrowRight,
  Bus,
  Check,
  Info,
  Sparkles,
  TriangleAlert,
  X,
} from "lucide-react";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const COLORS = [
  { name: "Background", value: "#09090B", className: "bg-background border border-white/10" },
  { name: "Primary", value: "#2563EB", className: "bg-primary" },
  { name: "Accent", value: "#7C3AED", className: "bg-accent" },
  { name: "Success", value: "#1F9D5B", className: "bg-success" },
  { name: "Danger", value: "#DC2626", className: "bg-destructive" },
  { name: "Muted", value: "muted", className: "bg-muted" },
];

const BUTTON_VARIANTS = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "danger",
  "success",
] as const;

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="scroll-mt-24">
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </h3>
      {children}
    </Reveal>
  );
}

export default function DesignSystemPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {/* Hero del styleguide */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-aurora" />
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]" />
        <div className="container-app relative py-24 sm:py-28">
          <Reveal>
            <Badge variant="gradient">
              <Sparkles className="h-3.5 w-3.5" /> Design System
            </Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
              La base visual de <span className="text-gradient">La Estación</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
              Componentes, colores, tipografía y animaciones que comparten todas
              las páginas. Premium, tecnológico y consistente.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="space-y-24 pt-8">
        {/* PALETA */}
        <Block title="01 · Paleta de color">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {COLORS.map((c) => (
              <div key={c.name} className="space-y-2">
                <div
                  className={`h-24 rounded-xl ${c.className} shadow-premium`}
                />
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {c.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Block>

        {/* TIPOGRAFÍA */}
        <Block title="02 · Tipografía — Geist">
          <div className="space-y-4">
            <p className="text-5xl font-bold tracking-tight sm:text-6xl">
              Titulares grandes
            </p>
            <p className="text-2xl font-semibold">Subtítulos claros</p>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Texto de párrafo con excelente legibilidad y contraste. La
              tipografía Geist aporta un aire moderno y técnico a toda la
              interfaz.
            </p>
            <p className="font-mono text-sm text-primary">
              Monospace · LE-8F2K9 · +54 9 11 5555-0000
            </p>
          </div>
        </Block>

        {/* BOTONES */}
        <Block title="03 · Botones">
          <div className="flex flex-wrap gap-4">
            {BUTTON_VARIANTS.map((v) => (
              <Button key={v} variant={v} className="capitalize">
                {v}
              </Button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">
              Large <ArrowRight />
            </Button>
            <Button variant="outline" size="icon" aria-label="Icono">
              <Bus />
            </Button>
          </div>
        </Block>

        {/* BADGES */}
        <Block title="04 · Badges">
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">
              <Check className="h-3 w-3" /> Confirmado
            </Badge>
            <Badge variant="danger">
              <X className="h-3 w-3" /> Cancelado
            </Badge>
            <Badge variant="gradient">
              <Sparkles className="h-3 w-3" /> Premium
            </Badge>
          </div>
        </Block>

        {/* CARDS */}
        <Block title="05 · Cards premium">
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <StaggerItem key={i}>
                <Card interactive className="h-full">
                  <CardHeader>
                    <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/30">
                      <Bus className="h-6 w-6" />
                    </span>
                    <CardTitle>Card interactiva {i}</CardTitle>
                    <CardDescription>
                      Glassmorphism, sombras y elevación elegante al pasar el
                      cursor.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Ver más <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Block>

        {/* FORM */}
        <Block title="06 · Inputs y formularios">
          <div className="grid max-w-2xl gap-5">
            <div className="grid gap-2">
              <Label htmlFor="ds-name">Nombre</Label>
              <Input id="ds-name" placeholder="Tu nombre completo" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ds-email">Email</Label>
              <Input id="ds-email" type="email" placeholder="tu@email.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ds-msg">Mensaje</Label>
              <Textarea id="ds-msg" placeholder="Escribí tu consulta..." />
            </div>
          </div>
        </Block>

        {/* ALERTS */}
        <Block title="07 · Alertas">
          <div className="grid gap-4 lg:grid-cols-2">
            <Alert variant="info">
              <Info />
              <div>
                <AlertTitle>Información</AlertTitle>
                <AlertDescription>
                  Tu reserva se confirmará una vez acreditado el pago.
                </AlertDescription>
              </div>
            </Alert>
            <Alert variant="success">
              <Check />
              <div>
                <AlertTitle>Todo listo</AlertTitle>
                <AlertDescription>
                  Recibimos tu solicitud correctamente.
                </AlertDescription>
              </div>
            </Alert>
            <Alert variant="warning">
              <TriangleAlert />
              <div>
                <AlertTitle>Atención</AlertTitle>
                <AlertDescription>
                  Quedan pocas plazas disponibles para este viaje.
                </AlertDescription>
              </div>
            </Alert>
            <Alert variant="danger">
              <X />
              <div>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  No pudimos procesar el pago. Intentá nuevamente.
                </AlertDescription>
              </div>
            </Alert>
          </div>
        </Block>

        {/* ACCORDION */}
        <Block title="08 · Accordion">
          <Accordion type="single" collapsible className="max-w-2xl space-y-3">
            {[
              {
                q: "¿Cómo reservo un viaje?",
                a: "Elegís el servicio, completás tus datos y confirmás. Recibís la confirmación al instante.",
              },
              {
                q: "¿Qué medios de pago aceptan?",
                a: "Trabajamos con MercadoPago: tarjetas, transferencia y dinero en cuenta.",
              },
              {
                q: "¿Puedo contratar un viaje privado?",
                a: "Sí, coordinamos unidades exclusivas con recorrido a medida para tu grupo.",
              },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Block>

        {/* MODAL */}
        <Block title="09 · Modal / Dialog">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="primary">Abrir modal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmar reserva</DialogTitle>
                <DialogDescription>
                  Estás por reservar 2 plazas para el viaje a Mar del Plata.
                  ¿Querés continuar?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancelar</Button>
                </DialogClose>
                <Button variant="primary" onClick={() => setDialogOpen(false)}>
                  Confirmar <Check />
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Block>

        {/* ANIMACIONES */}
        <Block title="10 · Animaciones (scroll reveal)">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(["fadeUp", "fadeRight", "fadeLeft", "scale"] as const).map(
              (v, i) => (
                <Reveal
                  key={v}
                  variant={v}
                  delay={i * 0.08}
                  className="glass rounded-xl p-6 text-center"
                >
                  <p className="font-mono text-sm text-primary">{v}</p>
                </Reveal>
              ),
            )}
          </div>
        </Block>
      </Section>
    </>
  );
}
