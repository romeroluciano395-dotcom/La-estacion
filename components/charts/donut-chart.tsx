"use client";

import { motion } from "framer-motion";
import type { ChartPoint } from "@/types/admin";

const PALETTE = [
  "#2563EB", // primary
  "#7C3AED", // accent
  "#06B6D4", // cyan
  "#10B981", // emerald
  "#F59E0B", // amber
  "#EC4899", // pink
  "#64748B", // slate
];

/** Donut chart SVG con leyenda. */
export function DonutChart({
  data,
  centerLabel,
}: {
  data: ChartPoint[];
  centerLabel?: string;
}) {
  const total = data.reduce((a, d) => a + d.value, 0) || 1;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
      <div className="relative h-44 w-44 shrink-0">
        <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="16"
            opacity="0.4"
          />
          {data.map((d, i) => {
            const fraction = d.value / total;
            const dash = fraction * circumference;
            const seg = (
              <motion.circle
                key={d.label}
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={PALETTE[i % PALETTE.length]}
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              />
            );
            offset += dash;
            return seg;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{total}</span>
          {centerLabel && (
            <span className="text-xs text-muted-foreground">{centerLabel}</span>
          )}
        </div>
      </div>

      <ul className="w-full space-y-2.5">
        {data.map((d, i) => (
          <li
            key={d.label}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="flex items-center gap-2.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: PALETTE[i % PALETTE.length] }}
              />
              <span className="text-muted-foreground">{d.label}</span>
            </span>
            <span className="font-medium">{d.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
