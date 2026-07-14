"use client";

import { motion } from "framer-motion";
import type { ChartPoint } from "@/types/admin";

/**
 * Gráfico de barras verticales. Anima al montar (no con whileInView, que no
 * dispara si ya está en pantalla) y muestra siempre el valor y una guía de
 * fondo, para que se lea bien incluso con datos escasos.
 */
export function BarChart({ data }: { data: ChartPoint[] }) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <div className="flex h-56 items-end gap-3 sm:gap-4">
      {data.map((d, i) => (
        <div
          key={d.label}
          className="flex h-full flex-1 flex-col items-center justify-end gap-2"
        >
          <span className="text-xs font-semibold">{d.value}</span>
          <div className="flex w-full flex-1 items-end overflow-hidden rounded-md bg-white/[0.03]">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(d.value / max) * 100}%` }}
              transition={{
                duration: 0.7,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ minHeight: d.value > 0 ? 6 : 0 }}
              className="w-full rounded-t-lg bg-gradient-to-t from-primary to-accent"
            />
          </div>
          <span className="text-xs text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
