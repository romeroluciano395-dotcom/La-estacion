"use client";

import { motion } from "framer-motion";
import type { ChartPoint } from "@/types/admin";

const MAX_BAR_PX = 170; // alto máximo de barra en píxeles

/**
 * Gráfico de barras verticales. Las alturas se calculan en píxeles (no en %)
 * para evitar el problema de resolver alturas porcentuales dentro de flexbox,
 * y Framer Motion anima el valor en píxeles de forma confiable.
 */
export function BarChart({ data }: { data: ChartPoint[] }) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <div className="flex h-56 items-end gap-3 sm:gap-4">
      {data.map((d, i) => {
        const h =
          d.value > 0 ? Math.max(6, Math.round((d.value / max) * MAX_BAR_PX)) : 0;
        return (
          <div
            key={d.label}
            className="flex flex-1 flex-col items-center justify-end gap-2"
          >
            <span className="text-xs font-semibold">{d.value}</span>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: h }}
              transition={{
                duration: 0.7,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full rounded-t-lg bg-gradient-to-t from-primary to-accent"
            />
            <span className="text-xs text-muted-foreground">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}
