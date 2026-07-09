"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";

import { WHATSAPP_URL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Hero() {
  return (
    <section className="relative -mt-16 flex min-h-[100svh] items-center overflow-hidden lg:-mt-20">
      {/* Imagen de fondo */}
      <Image
        src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80"
        alt="Micro moderno de larga distancia"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay oscuro con degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-aurora opacity-60" />

      {/* Contenido */}
      <div className="container-app relative z-10 pt-16 lg:pt-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={item}>
            <Badge variant="gradient">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Transporte de pasajeros premium
            </Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Viajá a los mejores{" "}
            <span className="text-gradient">recitales y eventos</span> con total
            comodidad.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground sm:text-xl"
          >
            Organizamos traslados seguros, cómodos y puntuales para recitales,
            eventos deportivos, turismo y mucho más.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <Button size="lg" variant="primary" asChild>
              <Link href="/proximos-viajes">
                Ver Próximos Viajes <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="success" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> Reservar por WhatsApp
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Flecha de scroll animada */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-11 w-7 items-start justify-center rounded-full border border-white/25 p-1.5"
          aria-hidden
        >
          <ChevronDown className="h-4 w-4 text-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
