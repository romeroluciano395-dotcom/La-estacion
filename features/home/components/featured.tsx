"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/motion";

const CHECKS = [
  "Viajes seguros",
  "Atención personalizada",
  "Micros modernos",
  "Salidas organizadas",
];

export function Featured() {
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Imagen grande */}
        <Reveal variant="fadeRight" className="order-2 lg:order-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-premium">
            <Image
              src="https://images.unsplash.com/photo-1557223562-6c77ef16210f?w=1200&q=80"
              alt="Interior de micro moderno y cómodo"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20" />
          </div>
        </Reveal>

        {/* Texto */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Nos ocupamos de que solamente{" "}
              <span className="text-gradient">disfrutes el viaje.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              Desde la salida hasta el regreso, coordinamos cada detalle para
              que vos y tu grupo viajen tranquilos, cómodos y seguros.
            </p>
          </Reveal>

          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CHECKS.map((c, i) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white">
                  <Check className="h-4 w-4" />
                </span>
                <span className="font-medium">{c}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
