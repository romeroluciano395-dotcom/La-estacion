"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { WHATSAPP_URL } from "@/lib/constants";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/motion";

export function Cta() {
  return (
    <Section>
      <Reveal variant="scale">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 px-6 py-16 text-center sm:px-16 sm:py-20">
          {/* Fondo degradado */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent" />
          <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(60%_60%_at_80%_20%,white,transparent_60%)]" />
          <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl">
              ¿Listo para tu próximo viaje?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-white/85">
              Reservá tu lugar en minutos o escribinos y coordinamos tu traslado
              a medida. Salidas seguras, cómodas y puntuales.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="xl"
                variant="secondary"
                className="w-full bg-white text-primary hover:bg-white/90 sm:w-auto"
                asChild
              >
                <Link href="/proximos-viajes">
                  Reservar ahora <ArrowRight />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="w-full border-white/40 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
                asChild
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> Consultar por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
