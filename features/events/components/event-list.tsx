"use client";

import { motion } from "framer-motion";

import type { Evento } from "@/types/event";
import { EventCard } from "./event-card";

/*
  Usamos animate="visible" (basado en montaje) en lugar de whileInView "once".
  Así, cada tarjeta que se monta al cambiar los filtros o al "Cargar más"
  hereda el estado "visible" del contenedor y aparece correctamente —
  evitando que las nuevas queden ocultas (opacity 0).
*/

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function EventList({ eventos }: { eventos: Evento[] }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
    >
      {eventos.map((evento) => (
        <motion.div
          key={evento.id}
          variants={item}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="h-full"
        >
          <EventCard evento={evento} />
        </motion.div>
      ))}
    </motion.div>
  );
}
