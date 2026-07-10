"use client";

import { motion } from "framer-motion";
import type { ChartPoint } from "@/types/admin";

/** Gráfico de barras verticales, animado, con degradado de marca. */
export function BarChart({ data }: { data: ChartPoint[] }) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <div className="flex h-56 items-end gap-3 sm:gap-4">
      {data.map((d, i) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="relative flex w-full flex-1 items-end">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(d.value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative w-full rounded-t-lg bg-gradient-to-t from-primary to-accent"
            >
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold opacity-0 transition-opacity group-hover:opacity-100">
                {d.value}
              </span>
            </motion.div>
          </div>
          <span className="text-xs text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
